import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { isRateLimited, getClientIp } from '@/lib/security';

const schema = z.object({
  conversation_id: z.string().min(8).max(100),
  language: z.enum(['en', 'es']),
});

export async function POST(req: Request) {
  try {
    // Rate Limiting Check
    const ip = getClientIp(req);
    const limitStatus = isRateLimited(ip, 20, 60000); // 20 language switches/min limit
    if (limitStatus.limited) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = schema.parse(body);

    const conversationId = parsed.conversation_id;
    const language = parsed.language;

    try {
      await db.updateChatConversationLanguage(conversationId, language);
    } catch (dbError) {
      console.warn('[DB Warning] Fallback language-switch database update:', dbError);
      // Suppress error in offline fallback mode
    }

    return NextResponse.json({ success: true, language });
  } catch (err) {
    console.error('Language switch route error:', err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: err.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
