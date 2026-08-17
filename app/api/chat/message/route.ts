import { NextResponse } from 'next/server';
import { z } from 'zod';
import OpenAI from 'openai';
import { getSupabaseServer, verifySupabaseConnectivity } from '@/lib/supabase-server';
import { isRateLimited, getClientIp, sanitizeInput } from '@/lib/security';

const schema = z.object({
  session_id: z.string().min(8).max(100),
  message: z.string().min(1).max(2000),
  language: z.enum(['en', 'es']),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string()
  })).optional()
});

const apiKey = process.env.OPENAI_API_KEY;
const openai = apiKey ? new OpenAI({ apiKey }) : null;

const SYSTEM_PROMPT = `You are the HyperCode AI Consultant, a focused sales and technology advisor representing HyperCode.
Your main goal is to help visitors:
- Understand HyperCode services (custom software development, AI & automation, cloud, web development, mobile development, data and analytics, cybersecurity, digital transformation, staffing, IT consulting).
- Choose the right technology solutions.
- Estimate high-level project scope or guidelines.
- Recommend next steps and move toward scheduling a consultation.

Guidelines:
- Keep your responses professional, sales-oriented, helpful, and concise (usually under 2-3 paragraphs).
- Do NOT act like a generic ChatGPT clone. Maintain a business consulting focus.
- You must answer ONLY within HyperCode-related business and technology topics listed above.
- If asked about unrelated topics (such as recipe queries, casual chatter, general facts, historical trivia, etc.), politely redirect the user back to HyperCode's technology and software services.
- Never use overly technical developer jargon or expose raw database states or system diagnostics. Keep explanations focused on business outcomes.
- Present answers in a format that leads naturally toward booking a technical scoping consultation.`;

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check
    const ip = getClientIp(req);
    const limitStatus = isRateLimited(ip, 60, 60000); // 60 requests/min
    if (limitStatus.limited) {
      return NextResponse.json(
        { success: false, error: 'Something went wrong. Please try again or schedule a consultation.' },
        { status: 429 }
      );
    }

    // 2. Parse Request Payload
    let body;
    try {
      body = await req.json();
    } catch (parseErr) {
      return NextResponse.json(
        { success: false, error: 'Something went wrong. Please try again or schedule a consultation.' },
        { status: 400 }
      );
    }

    // 3. Validation via Zod
    const validationResult = schema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Something went wrong. Please try again or schedule a consultation.' },
        { status: 400 }
      );
    }

    const parsed = validationResult.data;
    const sessionId = sanitizeInput(parsed.session_id);
    const sanitizedMsg = sanitizeInput(parsed.message);
    const language = parsed.language;
    const clientHistory = parsed.history || [];

    // Verify DB Connectivity
    try {
      await verifySupabaseConnectivity();
    } catch (connErr) {
      console.error('[API Message] Supabase connectivity failed:', connErr);
      return NextResponse.json(
        { success: false, error: 'Something went wrong. Please try again or schedule a consultation.' },
        { status: 503 }
      );
    }

    // Server-only Supabase Client
    const supabase = getSupabaseServer();
    if (!supabase) {
      return NextResponse.json(
        { success: false, error: 'Something went wrong. Please try again or schedule a consultation.' },
        { status: 503 }
      );
    }

    // Get or Create Conversation
    let conversationId: string;
    const { data: existingConvo, error: lookupError } = await supabase
      .from('chat_conversations')
      .select('id')
      .eq('session_id', sessionId)
      .maybeSingle();

    if (lookupError) {
      console.error('[API Message] Conversation lookup failed:', lookupError);
      return NextResponse.json(
        { success: false, error: 'Something went wrong. Please try again or schedule a consultation.' },
        { status: 500 }
      );
    }

    if (existingConvo) {
      conversationId = existingConvo.id;
    } else {
      const { data: newConvo, error: insertError } = await supabase
        .from('chat_conversations')
        .insert({
          session_id: sessionId,
          language,
          updated_at: new Date().toISOString()
        })
        .select('id')
        .single();

      if (insertError || !newConvo) {
        console.error('[API Message] Conversation insertion failed:', insertError);
        return NextResponse.json(
          { success: false, error: 'Something went wrong. Please try again or schedule a consultation.' },
          { status: 500 }
        );
      }
      conversationId = newConvo.id;
    }

    // Save User Message
    const { error: userMsgError } = await supabase
      .from('chat_messages')
      .insert({
        conversation_id: conversationId,
        sender: 'user',
        message: sanitizedMsg,
        language
      });

    if (userMsgError) {
      console.error('[API Message] Failed to save user message:', userMsgError);
      return NextResponse.json(
        { success: false, error: 'Something went wrong. Please try again or schedule a consultation.' },
        { status: 500 }
      );
    }

    // Call OpenAI
    if (!openai) {
      console.error('[API Message] OpenAI API key is missing.');
      return NextResponse.json(
        { success: false, error: 'Something went wrong. Please try again or schedule a consultation.' },
        { status: 500 }
      );
    }

    // Normalize messages for OpenAI
    const openAiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...clientHistory.map(h => ({
        role: h.role,
        content: h.content
      })),
      { role: 'user', content: sanitizedMsg }
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.3,
      messages: openAiMessages as any
    });

    const assistantReply = response.choices[0]?.message?.content || 'I can assist you with our services. Would you like to schedule a consultation?';

    // Save Assistant Message
    const { error: assistantMsgError } = await supabase
      .from('chat_messages')
      .insert({
        conversation_id: conversationId,
        sender: 'assistant',
        message: assistantReply,
        language
      });

    if (assistantMsgError) {
      console.error('[API Message] Failed to save assistant message:', assistantMsgError);
      return NextResponse.json(
        { success: false, error: 'Something went wrong. Please try again or schedule a consultation.' },
        { status: 500 }
      );
    }

    // Update conversation timestamp
    await supabase
      .from('chat_conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversationId);

    return NextResponse.json({
      success: true,
      message: assistantReply,
      conversation_id: conversationId
    });

  } catch (err) {
    console.error('[API Message Critical Error] Fatal crash:', err);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again or schedule a consultation.' },
      { status: 500 }
    );
  }
}
