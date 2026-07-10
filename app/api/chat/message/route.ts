import { NextResponse } from 'next/server';
import { z } from 'zod';
import OpenAI from 'openai';
import { processConsultantMessage } from '@/lib/chat-conversation';
import { db, supabase } from '@/lib/db';
import { isRateLimited, getClientIp, sanitizeInput } from '@/lib/security';
import { submitChatLead } from '@/lib/chat-lead-mailer';

import type { ChatbotState } from '@/lib/chat-types';

// Zod validation matching the updated ChatbotState schema
const stateSchema = z.object({
  detectedIntent: z.string().optional(),
  conversationStage: z.string().optional(),
  currentQuestion: z.string().nullable().optional(),
  leadData: z.object({
    name: z.string().optional(),
    company: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    industry: z.string().optional(),
    preferredContact: z.enum(['Email', 'Phone', 'Either']).optional()
  }).optional(),
  projectData: z.object({
    projectType: z.string().optional(),
    projectStatus: z.string().optional(),
    requiredFeatures: z.string().optional(),
    timeline: z.string().optional(),
    budgetRange: z.string().optional(),
    projectDescription: z.string().optional(),
    teamSize: z.string().optional(),
    currentTechnology: z.string().optional(),
    primaryGoal: z.string().optional()
  }).optional(),
  recommendations: z.record(z.string(), z.unknown()).nullable().optional(),
  leadSubmitted: z.boolean().optional()
}).optional();

const schema = z.object({
  conversation_id: z.string().min(8).max(100).optional(),
  session_id: z.string().min(8).max(100).optional(),
  sender: z.literal('user'),
  message: z.string().min(1, 'message cannot be empty').max(2000, 'message is too long'),
  language: z.enum(['en', 'es']),
  history: z.array(z.object({
    sender: z.enum(['user', 'assistant']),
    message: z.string()
  })).optional(),
  state: stateSchema
});

// OpenAI Safe Client
const apiKey = process.env.OPENAI_API_KEY;
const openai = apiKey ? new OpenAI({ apiKey }) : null;

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check
    const ip = getClientIp(req);
    const limitStatus = isRateLimited(ip, 60, 60000); // 60 requests/min
    if (limitStatus.limited) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // 2. Parse Request Payload
    let body;
    try {
      body = await req.json();
    } catch (parseErr) {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON payload in request body.' },
        { status: 400 }
      );
    }

    // 3. Validation via Zod
    const validationResult = schema.safeParse(body);
    if (!validationResult.success) {
      const firstIssue = validationResult.error.issues[0];
      const errorMessage = firstIssue
        ? `${firstIssue.path.join('.') || 'payload'}: ${firstIssue.message}`
        : 'Request payload validation failed.';
      return NextResponse.json(
        { success: false, error: errorMessage, details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const parsed = validationResult.data;
    let conversationId = parsed.conversation_id;
    const sessionId = parsed.session_id;
    const sanitizedMsg = sanitizeInput(parsed.message);
    const language = parsed.language;

    // 4. Resolve or verify conversation ID from Supabase
    if (!conversationId) {
      if (!sessionId) {
        return NextResponse.json(
          { success: false, error: 'Either conversation_id or session_id must be provided.' },
          { status: 400 }
        );
      }

      if (supabase) {
        try {
          const { data, error } = await supabase
            .from('chat_conversations')
            .select('*')
            .eq('session_id', sessionId)
            .maybeSingle();

          if (data) {
            conversationId = data.id;
          } else {
            const newConvo = await db.createChatConversation(sessionId, language);
            conversationId = newConvo.id;
          }
        } catch (dbErr: any) {
          console.error('[API Message] Database conversation lookup/creation failed:', dbErr.message);
        }
      }

      if (!conversationId) {
        return NextResponse.json(
          { success: false, error: 'Unable to resolve the conversation. Please verify the Supabase configuration.' },
          { status: 503 }
        );
      }
    }

    // 5. Load/Initialize state
    const currentState: ChatbotState = {
      detectedIntent: (parsed.state?.detectedIntent as any) || 'DEFAULT',
      conversationStage: (parsed.state?.conversationStage as any) || 'Greeting',
      currentQuestion: parsed.state?.currentQuestion !== undefined ? parsed.state.currentQuestion : null,
      leadData: parsed.state?.leadData || {},
      projectData: parsed.state?.projectData || {},
      recommendations: parsed.state?.recommendations || null,
      leadSubmitted: parsed.state?.leadSubmitted || false
    };

    // 6. Save User Message to Supabase
    let savedUserMsg = null;
    try {
      savedUserMsg = await db.addChatMessage(conversationId, 'user', sanitizedMsg, language);
    } catch (dbError: any) {
      console.warn('[API Message] Supabase user message save failed, creating fallback:', dbError.message);
      savedUserMsg = {
        id: 'mock-user-msg-' + Math.random().toString(36).substring(2, 9),
        conversation_id: conversationId,
        sender: 'user' as const,
        message: sanitizedMsg,
        language,
        created_at: new Date().toISOString()
      };
    }

    // 7. Run primary deterministic conversation engine
    const advisorResult = processConsultantMessage(
      sanitizedMsg,
      currentState,
      language
    );

    // 8. Optional OpenAI enrichment for technical recommendations
    // Trigger when we transition to Lead Qualification and have collected the required project details
    const transitionedToLeadQual = 
      currentState.conversationStage !== 'Lead Qualification' && 
      advisorResult.conversationStage === 'Lead Qualification';

    if (transitionedToLeadQual && openai) {
      try {
        console.log('[API Message] Calling OpenAI to generate custom technical recommendations...');
        const prompt = `
You are a Principal Software Architect at HyperCode.
Given the following project specifications collected from the client:
- Service Focus: ${advisorResult.detectedIntent}
- Project Type: ${advisorResult.projectData.projectType || 'N/A'}
- Status: ${advisorResult.projectData.projectStatus || 'N/A'}
- Required Features: ${advisorResult.projectData.requiredFeatures || 'N/A'}
- Target Timeline: ${advisorResult.projectData.timeline || 'N/A'}
- Budget Range: ${advisorResult.projectData.budgetRange || 'N/A'}
- Current Tech Stack: ${advisorResult.projectData.currentTechnology || 'N/A'}
- Primary Goal: ${advisorResult.projectData.primaryGoal || 'N/A'}

Please generate a professional, enterprise-grade technical recommendation matching HyperCode's high consulting standards.
Return ONLY a valid JSON object matching this schema:
{
  "techStack": ["technology 1", "technology 2"],
  "architecture": "A brief explanation of the proposed architecture.",
  "timelineEstimate": "e.g., 6-8 weeks",
  "teamSizeEstimate": "e.g., 1 Tech Lead, 2 Engineers",
  "potentialRisks": ["risk 1", "risk 2"],
  "nextSteps": "e.g., Schedule a scoping call."
}

Do NOT use code blocks, do NOT write markdown, and do NOT include any surrounding explanation. Return raw JSON only.
Language: ${language === 'es' ? 'Spanish' : 'English'}
`;

        const response = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          temperature: 0.2,
          messages: [{ role: 'user', content: prompt }]
        });

        const rawText = response.choices[0]?.message?.content || '{}';
        const parsedRecommendations = JSON.parse(rawText.trim().replace(/^```json\s*/, '').replace(/```$/, ''));
        
        if (parsedRecommendations.techStack && parsedRecommendations.architecture) {
          advisorResult.recommendations = parsedRecommendations;
          console.log('[API Message] OpenAI recommendations generated successfully.');
        }
      } catch (aiErr: any) {
        console.warn('[API Message Warning] OpenAI recommendation generation failed (retaining default):', aiErr.message);
      }
    }

    // 9. Sync leadData updates safely
    const updatedLeadData = {
      ...currentState.leadData,
      ...advisorResult.extractedLeadData
    };

    let leadSubmitted = currentState.leadSubmitted || false;
    let flowTrigger = null;

    // 10. Auto-qualification & Resend Mailer invocation
    // Triggered when lead qualification is finished and conversationStage becomes Consultation
    if (!leadSubmitted && advisorResult.conversationStage === 'Consultation') {
      const hasRequiredLeadInfo = updatedLeadData.name && updatedLeadData.email && updatedLeadData.company;
      if (hasRequiredLeadInfo) {
        try {
          console.log('[API Message] Executing lead qualification mailer...');
          
          // Formulate project details string
          const projectDetails = Object.entries(advisorResult.projectData)
            .map(([k, v]) => `${k}: ${v}`)
            .join(' | ');

          await submitChatLead({
            conversation_id: conversationId,
            name: updatedLeadData.name!,
            email: updatedLeadData.email!,
            phone: updatedLeadData.phone || 'N/A',
            company: updatedLeadData.company!,
            industry: updatedLeadData.industry || 'Technology',
            service_interest: advisorResult.detectedIntent || 'General Tech Consulting',
            budget_range: advisorResult.projectData.budgetRange || 'Flexible',
            timeline: advisorResult.projectData.timeline || 'Immediate',
            message: projectDetails || sanitizedMsg,
            language
          });
          leadSubmitted = true;
          console.log('[API Message] Lead qualified mailer successfully sent.');
        } catch (submitErr: any) {
          console.error('[API Message Error] Lead qualification mailer failed:', submitErr.message);
        }
      }
    }

    // Translate navigation actions to flow triggers for UI popups
    if (advisorResult.navigationActions?.includes('Schedule Consultation')) {
      flowTrigger = 'consultation_form';
    }

    const updatedState = {
      detectedIntent: advisorResult.detectedIntent,
      conversationStage: advisorResult.conversationStage,
      currentQuestion: advisorResult.currentQuestion,
      leadData: updatedLeadData,
      projectData: advisorResult.projectData,
      recommendations: advisorResult.recommendations,
      leadSubmitted
    };

    // 11. Save Advisor Response to Supabase
    let savedAssistantMsg = null;
    try {
      savedAssistantMsg = await db.addChatMessage(
        conversationId,
        'assistant',
        advisorResult.responseMessage,
        language
      );
    } catch (dbError: any) {
      console.warn('[API Message] Supabase assistant message save failed, creating fallback:', dbError.message);
      savedAssistantMsg = {
        id: 'mock-assistant-msg-' + Math.random().toString(36).substring(2, 9),
        conversation_id: conversationId,
        sender: 'assistant' as const,
        message: advisorResult.responseMessage,
        language,
        created_at: new Date().toISOString()
      };
    }

    return NextResponse.json({
      success: true,
      userMessage: savedUserMsg,
      assistantMessage: savedAssistantMsg,
      flowTrigger,
      suggestedPrompts: advisorResult.suggestedPrompts || [],
      state: updatedState
    });

  } catch (err: any) {
    console.error('[API Message Critical Error] Fatal route crash:', err.message || err);
    return NextResponse.json(
      { success: false, error: 'An internal server error occurred while processing your message.' },
      { status: 500 }
    );
  }
}
