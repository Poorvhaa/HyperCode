import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db, supabase } from '@/lib/db';
import { isRateLimited, getClientIp, sanitizeInput } from '@/lib/security';

const schema = z.object({
  session_id: z.string({ message: 'session_id is required' }).min(8, 'session_id must be at least 8 characters').max(100),
  language: z.enum(['en', 'es'], { message: 'language must be either "en" or "es"' }),
});

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check
    const ip = getClientIp(req);
    const limitStatus = isRateLimited(ip, 60, 60000); // 60 requests/min limit
    if (limitStatus.limited) {
      return NextResponse.json({ success: false, error: 'Too many requests.' }, { status: 429 });
    }

    // 2. Parse Request Payload
    let body;
    try {
      body = await req.json();
    } catch (parseErr) {
      return NextResponse.json({ success: false, error: 'Invalid JSON payload.' }, { status: 400 });
    }

    console.log('[Session API] Incoming payload:', JSON.stringify(body, null, 2));

    // 3. Validation via Zod
    const validationResult = schema.safeParse(body);
    if (!validationResult.success) {
      const firstIssue = validationResult.error.issues[0];
      const errorMessage = firstIssue
        ? `${firstIssue.path.join('.') || 'payload'}: ${firstIssue.message}`
        : 'Request validation failed.';
      console.warn('[Session API] Validation failed:', errorMessage);
      return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
    }

    const parsed = validationResult.data;
    const sessionId = sanitizeInput(parsed.session_id);
    const language = parsed.language;

    let conversation = null;

    // 4. Safe conversation lookup or insertion
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('chat_conversations')
          .select('*')
          .eq('session_id', sessionId)
          .maybeSingle();

        if (error) {
          console.warn('[Session API Warning] Error checking conversation existence:', error.message || error);
        }

        if (data) {
          conversation = data;
          console.log('[Session API] Found existing conversation:', conversation.id);
        } else {
          conversation = await db.createChatConversation(sessionId, language);
          console.log('[Session API] Created new conversation:', conversation.id);
        }
      } catch (dbErr: any) {
        console.error('[Session API Error] Safe database fallback triggered:', dbErr.message || dbErr);
      }
    }

    // Fail-safe fallback mock conversation in case DB is not available
    if (!conversation) {
  console.error('[Chat Session API] Unable to create conversation', {
    sessionId,
    language
  });

  return NextResponse.json(
    {
      success: false,
      error:
        'Unable to create the conversation. Please verify the Supabase configuration and chat_conversations table.'
    },
    { status: 503 }
  );
}
console.log('[Session API] Final conversation object:', conversation);
    return NextResponse.json({
      success: true,
      conversation
    });
  } catch (err: any) {
    console.error('[Session API Critical Error] Fatal crash:', err.message || err);
    return NextResponse.json(
      { success: false, error: 'An internal server error occurred while preparing your session.' },
      { status: 500 }
    );
  }
}
