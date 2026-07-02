import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { isRateLimited, getClientIp, sanitizeInput } from '@/lib/security';

const schema = z.object({
  session_id: z.string().min(8).max(100),
  language: z.enum(['en', 'es']),
  visitor_name: z.string().max(100).optional(),
  visitor_email: z.string().email().optional(),
});

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check
    const ip = getClientIp(req);
    const limitStatus = isRateLimited(ip, 30, 60000); // 30 requests/min limit for session creation
    if (limitStatus.limited) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = schema.parse(body);

    const sessionId = sanitizeInput(parsed.session_id);
    const language = parsed.language;
    const visitorName = parsed.visitor_name ? sanitizeInput(parsed.visitor_name) : undefined;
    const visitorEmail = parsed.visitor_email ? sanitizeInput(parsed.visitor_email) : undefined;

    let conversation = null;

    try {
      conversation = await db.createChatConversation(sessionId, language, visitorName, visitorEmail);
    } catch (dbError) {
      console.warn('[DB Warning] Fallback database session generation:', dbError);
      // Fail-safe mock session in case migration hasn't been run yet on remote Supabase
      conversation = {
        id: 'fallback-session-id-' + Math.random().toString(36).substring(2, 9),
        session_id: sessionId,
        language,
        visitor_name: visitorName || null,
        visitor_email: visitorEmail || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }

    return NextResponse.json({ success: true, conversation });
  } catch (err) {
    console.error('Conversation creation route error:', err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
