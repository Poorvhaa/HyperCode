import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { isRateLimited, getClientIp, sanitizeInput } from '@/lib/security';
import { generateAdvisorResponse } from './advisor';

const schema = z.object({
  conversation_id: z.string().min(8).max(100),
  sender: z.literal('user'),
  message: z.string().min(1).max(2000),
  language: z.enum(['en', 'es']),
  history: z.array(z.object({
    sender: z.enum(['user', 'assistant']),
    message: z.string()
  })).optional()
});

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check
    const ip = getClientIp(req);
    const limitStatus = isRateLimited(ip, 60, 60000); // 60 requests/min limit for messages
    if (limitStatus.limited) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = schema.parse(body);

    const conversationId = parsed.conversation_id;
    const sanitizedMsg = sanitizeInput(parsed.message);
    const language = parsed.language;

    // Load Chat History for Context
    let history = parsed.history;
    if (!history) {
      try {
        history = await db.getChatMessages(conversationId);
      } catch (dbError) {
        console.warn('[DB Warning] Could not fetch chat messages history:', dbError);
        history = [];
      }
    }

    // A. Log User Message to Database
    let savedUserMsg = null;
    try {
      savedUserMsg = await db.addChatMessage(conversationId, 'user', sanitizedMsg, language);
    } catch (dbError) {
      console.warn('[DB Warning] Fallback logging user message:', dbError);
      savedUserMsg = {
        id: 'mock-user-msg-' + Math.random().toString(36).substring(2, 9),
        conversation_id: conversationId,
        sender: 'user',
        message: sanitizedMsg,
        language,
        created_at: new Date().toISOString()
      };
    }

    // B. Generate Advisor Response
    const advisorResult = generateAdvisorResponse(sanitizedMsg, language, history);

    // C. Log Advisor Message to Database
    let savedAssistantMsg = null;
    try {
      savedAssistantMsg = await db.addChatMessage(
        conversationId,
        'assistant',
        advisorResult.message,
        language
      );
    } catch (dbError) {
      console.warn('[DB Warning] Fallback logging assistant message:', dbError);
      savedAssistantMsg = {
        id: 'mock-assistant-msg-' + Math.random().toString(36).substring(2, 9),
        conversation_id: conversationId,
        sender: 'assistant',
        message: advisorResult.message,
        language,
        created_at: new Date().toISOString()
      };
    }

    return NextResponse.json({
      success: true,
      userMessage: savedUserMsg,
      assistantMessage: savedAssistantMsg,
      flowTrigger: advisorResult.flowTrigger || null,
      suggestedPrompts: advisorResult.suggestedPrompts
    });
  } catch (err) {
    console.error('Chat message route error:', err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: err.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
