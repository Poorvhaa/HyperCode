import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseServer, verifySupabaseConnectivity } from '@/lib/supabase-server';
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
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    let body;
    try {
      body = await req.json();
    } catch (parseErr) {
      return NextResponse.json({ success: false, error: 'Invalid JSON payload.' }, { status: 400 });
    }

    const parsed = schema.parse(body);
    const conversationId = parsed.conversation_id;
    const language = parsed.language;

    // Verify Hostname and Connection
    try {
      await verifySupabaseConnectivity();
    } catch (connErr: any) {
      console.error('[Language Switch API Error] Supabase hostname unreachable:', connErr.message);
      return NextResponse.json(
        {
          success: false,
          code: 'SUPABASE_CONNECTION_FAILED',
          error: 'Unable to connect to the database service.'
        },
        { status: 503 }
      );
    }

    // Server-only Supabase Client
    let supabase;
    try {
      supabase = getSupabaseServer();
    } catch (configErr: any) {
      console.error('[Language Switch API Error] Supabase server client initialization failed:', configErr.message);
      return NextResponse.json(
        {
          success: false,
          error: 'Supabase server configuration is missing or invalid.'
        },
        { status: 503 }
      );
    }

    const { error: updateError } = await supabase
      .from('chat_conversations')
      .update({
        language,
        updated_at: new Date().toISOString(),
      })
      .eq('id', conversationId);

    if (updateError) {
      console.error('[Language Switch API Error] Database update failed:', {
        code: updateError.code,
        message: updateError.message,
        details: updateError.details,
        hint: updateError.hint
      });

      const isConnErr =
        updateError.message?.includes('fetch failed') ||
        updateError.message?.includes('ENOTFOUND') ||
        updateError.message?.includes('EAI_AGAIN');

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
        {
          success: false,
          error: updateError.message || 'Failed to update conversation language.'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, language });
  } catch (err: any) {
    console.error('Language switch route error:', err);

    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Validation failed', details: err.issues }, { status: 400 });
    }

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

    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
