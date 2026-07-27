import { NextResponse } from 'next/server';
import { z } from 'zod';
import OpenAI from 'openai';
import { processConsultantMessage } from '@/lib/chat-conversation';
import { getSupabaseServer, verifySupabaseConnectivity } from '@/lib/supabase-server';
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

    // Verify Hostname and Connection
    try {
      await verifySupabaseConnectivity();
    } catch (connErr: any) {
      console.error('[API Message Error] Supabase hostname unreachable:', connErr.message);
      return NextResponse.json(
        {
          success: false,
          code: 'SUPABASE_CONNECTION_FAILED',
          error: 'Unable to connect to the database service.'
        },
        { status: 503 }
      );
    }

    // 4. Server-only Supabase Client
    let supabase;
    try {
      supabase = getSupabaseServer();
    } catch (configErr: any) {
      console.error('[API Message Error] Supabase server client initialization failed:', configErr.message);
      return NextResponse.json(
        {
          success: false,
          error: 'Supabase server configuration is missing or invalid.'
        },
        { status: 503 }
      );
    }

    // 5. Resolve or verify conversation ID from Supabase
    if (!conversationId) {
      if (!sessionId) {
        return NextResponse.json(
          { success: false, error: 'Either conversation_id or session_id must be provided.' },
          { status: 400 }
        );
      }

      // Query Existing Conversation
      const { data: existingConvo, error: lookupError } = await supabase
        .from('chat_conversations')
        .select('*')
        .eq('session_id', sessionId)
        .maybeSingle();

      if (lookupError) {
        console.error('[API Message] Database conversation lookup failed:', lookupError);
        const isConnErr =
          lookupError.message?.includes('fetch failed') ||
          lookupError.message?.includes('ENOTFOUND') ||
          lookupError.message?.includes('EAI_AGAIN');

        if (isConnErr) {
          return NextResponse.json(
            {
              success: false,
              code: 'SUPABASE_CONNECTION_FAILED',
              error: 'Unable to connect to the database service.'
            },
            { status: 503 }
          );
        }
        return NextResponse.json(
          { success: false, error: lookupError.message || 'Database lookup failed.' },
          { status: 500 }
        );
      }

      if (existingConvo) {
        conversationId = existingConvo.id;
      } else {
        // Create conversation
        const { data: newConvo, error: insertError } = await supabase
          .from('chat_conversations')
          .insert({
            session_id: sessionId,
            language,
            updated_at: new Date().toISOString()
          })
          .select()
          .single();

        if (insertError) {
          console.error('[API Message] Database conversation creation failed:', insertError);
          const isConnErr =
            insertError.message?.includes('fetch failed') ||
            insertError.message?.includes('ENOTFOUND') ||
            insertError.message?.includes('EAI_AGAIN');

          if (isConnErr) {
            return NextResponse.json(
              {
                success: false,
                code: 'SUPABASE_CONNECTION_FAILED',
                error: 'Unable to connect to the database service.'
              },
              { status: 503 }
            );
          }
          return NextResponse.json(
            { success: false, error: insertError.message || 'Database creation failed.' },
            { status: 500 }
          );
        }

        conversationId = newConvo.id;
      }
    }

    // 6. Load/Initialize state
    const currentState: ChatbotState = {
      detectedIntent: (parsed.state?.detectedIntent as any) || 'DEFAULT',
      conversationStage: (parsed.state?.conversationStage as any) || 'Greeting',
      currentQuestion: parsed.state?.currentQuestion !== undefined ? parsed.state.currentQuestion : null,
      leadData: parsed.state?.leadData || {},
      projectData: parsed.state?.projectData || {},
      recommendations: parsed.state?.recommendations || null,
      leadSubmitted: parsed.state?.leadSubmitted || false
    };

    // 7. Save User Message to Supabase
    const { data: savedUserMsg, error: userMsgError } = await supabase
      .from('chat_messages')
      .insert({
        conversation_id: conversationId,
        sender: 'user',
        message: sanitizedMsg,
        language
      })
      .select()
      .single();

    if (userMsgError) {
      console.error('[API Message] Supabase user message save failed:', userMsgError);
      const isConnErr =
        userMsgError.message?.includes('fetch failed') ||
        userMsgError.message?.includes('ENOTFOUND') ||
        userMsgError.message?.includes('EAI_AGAIN');

      if (isConnErr) {
        return NextResponse.json(
          {
            success: false,
            code: 'SUPABASE_CONNECTION_FAILED',
            error: 'Unable to connect to the database service.'
          },
          { status: 503 }
        );
      }
      return NextResponse.json(
        { success: false, error: userMsgError.message || 'Failed to save user message.' },
        { status: 500 }
      );
    }

    // Update conversation timestamp
    const { error: updateConvoError } = await supabase
      .from('chat_conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversationId);

    if (updateConvoError) {
      console.warn('[API Message Warning] Failed to update conversation timestamp:', updateConvoError.message);
    }

    // 8. Run primary deterministic conversation engine
    const advisorResult = processConsultantMessage(
      sanitizedMsg,
      currentState,
      language
    );

    // 9. Optional OpenAI enrichment for technical recommendations
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

    // 10. Sync leadData updates safely
    const updatedLeadData = {
      ...currentState.leadData,
      ...advisorResult.extractedLeadData
    };

    let leadSubmitted = currentState.leadSubmitted || false;
    let flowTrigger = null;

    // 11. Auto-qualification & Resend Mailer invocation
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

    // 12. Save Advisor Response to Supabase
    const { data: savedAssistantMsg, error: assistantMsgError } = await supabase
      .from('chat_messages')
      .insert({
        conversation_id: conversationId,
        sender: 'assistant',
        message: advisorResult.responseMessage,
        language
      })
      .select()
      .single();

    if (assistantMsgError) {
      console.error('[API Message] Supabase assistant message save failed:', assistantMsgError);
      const isConnErr =
        assistantMsgError.message?.includes('fetch failed') ||
        assistantMsgError.message?.includes('ENOTFOUND') ||
        assistantMsgError.message?.includes('EAI_AGAIN');

      if (isConnErr) {
        return NextResponse.json(
          {
            success: false,
            code: 'SUPABASE_CONNECTION_FAILED',
            error: 'Unable to connect to the database service.'
          },
          { status: 503 }
        );
      }
      return NextResponse.json(
        { success: false, error: assistantMsgError.message || 'Failed to save assistant message.' },
        { status: 500 }
      );
    }

    // Update conversation timestamp again
    const { error: updateConvoError2 } = await supabase
      .from('chat_conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversationId);

    if (updateConvoError2) {
      console.warn('[API Message Warning] Failed to update conversation timestamp:', updateConvoError2.message);
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

    const cause =
      err instanceof Error && 'cause' in err
        ? err.cause
        : undefined;

    const isConnErr =
      err?.message?.includes('fetch failed') ||
      (cause && typeof cause === 'object' && 'code' in cause &&
        (cause.code === 'ENOTFOUND' || cause.code === 'EAI_AGAIN' || cause.code === 'ECONNREFUSED' || cause.code === 'ETIMEDOUT'));

    if (isConnErr) {
      return NextResponse.json(
        {
          success: false,
          code: 'SUPABASE_CONNECTION_FAILED',
          error: 'Unable to connect to the database service.'
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'An internal server error occurred while processing your message.' },
      { status: 500 }
    );
  }
}
