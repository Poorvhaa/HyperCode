import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseServer, verifySupabaseConnectivity } from '@/lib/supabase-server';
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

    // 4. Verify Hostname and Connection
    try {
      await verifySupabaseConnectivity();
    } catch (connErr: any) {
      console.error('[Session API Error] Supabase hostname unreachable:', connErr.message);
      return NextResponse.json(
        {
          success: false,
          code: 'SUPABASE_CONNECTION_FAILED',
          error: 'Unable to connect to the database service.'
        },
        { status: 503 }
      );
    }

    // 5. Server-only Supabase Client
    let supabase;
    try {
      supabase = getSupabaseServer();
    } catch (configErr: any) {
      console.error('[Session API Error] Supabase server client initialization failed:', configErr.message);
      return NextResponse.json(
        {
          success: false,
          error: 'Supabase server configuration is missing or invalid.'
        },
        { status: 503 }
      );
    }

    // 6. Query Existing Conversation
    const { data: existingConversation, error: lookupError } = await supabase
      .from('chat_conversations')
      .select('*')
      .eq('session_id', sessionId)
      .maybeSingle();

    if (lookupError) {
      console.error('[Session API] Conversation lookup failed', {
        code: lookupError.code,
        message: lookupError.message,
        details: lookupError.details,
        hint: lookupError.hint
      });

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
        {
          success: false,
          error: lookupError.message || 'Error looking up conversation.',
          code: lookupError.code || 'CHAT_CONVERSATION_LOOKUP_FAILED'
        },
        { status: 500 }
      );
    }

    if (existingConversation) {
      console.log('[Session API] Found existing conversation:', existingConversation.id);
      return NextResponse.json({
        success: true,
        conversation: existingConversation
      });
    }

    // 7. Create New Conversation
    const { data: createdConversation, error: insertError } = await supabase
      .from('chat_conversations')
      .insert({
        session_id: sessionId,
        language
      })
      .select()
      .single();

    if (insertError) {
      console.error('[Session API] Conversation insert failed', {
        code: insertError.code,
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint
      });

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
        {
          success: false,
          error: insertError.message || 'Unable to create conversation.',
          code: insertError.code || 'CHAT_CONVERSATION_INSERT_FAILED'
        },
        { status: 500 }
      );
    }

    console.log('[Session API] Created new conversation:', createdConversation.id);
    return NextResponse.json({
      success: true,
      conversation: createdConversation
    });

  } catch (err: any) {
    console.error('[Session API Critical Error] Fatal crash:', err.message || err);

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
      { success: false, error: 'An internal server error occurred while preparing your session.' },
      { status: 500 }
    );
  }
}
