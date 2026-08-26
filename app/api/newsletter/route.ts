import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseServer } from '@/lib/supabase-server';
import { Resend } from 'resend';
import { EMAIL_REGEX, sanitizePayload } from '@/lib/validation';

// Startup validation for Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
  console.error('[Newsletter API] CRITICAL CONFIGURATION ERROR: Missing Supabase environment variables.', {
    NEXT_PUBLIC_SUPABASE_URL: supabaseUrl ? 'Configured' : 'MISSING',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: supabaseAnonKey ? 'Configured' : 'MISSING',
    SUPABASE_SERVICE_ROLE_KEY: supabaseServiceKey ? 'Configured' : 'MISSING'
  });
}

// Initialize Resend
const resendApiKey = process.env.RESEND_API_KEY || '';
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const resendFromEmail =
  process.env.RESEND_FROM_EMAIL ||
  'HyperCode <HR@hypercodeit.com>';

const emailSchema = z.object({
  email: z.string().trim().regex(EMAIL_REGEX),
  language: z.enum(['en', 'es']).optional().default('en'),
  sourcePage: z.string().optional(),
  honeypot: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const sanitizedBody = sanitizePayload(body);
    const validated = emailSchema.parse(sanitizedBody);

    // Honeypot spam check
    if (validated.honeypot && validated.honeypot.trim() !== '') {
      console.log(`[Newsletter API] Spam bot detected (honeypot filled: "${validated.honeypot}") for email: ${validated.email}. Faking success.`);
      return NextResponse.json({ success: true });
    }

    const supabaseServer = getSupabaseServer();

    if (!supabaseServer) {
      console.error('[Newsletter API] Supabase server configuration is missing.');
      return NextResponse.json(
        {
          success: false,
          error: 'The newsletter service is temporarily unavailable.',
          code: 'SUPABASE_CONFIGURATION_MISSING'
        },
        { status: 503 }
      );
    }

    // 1. Save to Supabase
    const { error: saveError } = await supabaseServer
      .from('newsletter_subscribers')
      .insert([{
        email: validated.email,
        status: 'subscribed',
        language: validated.language,
        source_page: validated.sourcePage || null
      }]);

    if (saveError) {
      if (saveError.code === '23505') {
        return NextResponse.json(
          { success: false, error: 'You are already subscribed', code: 'DUPLICATE_SUBSCRIBER' },
          { status: 400 }
        );
      }
      console.error('Supabase newsletter insert error:', saveError);
      return NextResponse.json(
        { success: false, error: 'Unable to save your newsletter subscription.', code: 'NEWSLETTER_INSERT_FAILED' },
        { status: 500 }
      );
    }

    // 2. Send confirmation email via Resend (required for successful subscription)
    if (!resend) {
      console.error('[Newsletter API] Resend is not configured.');
      await supabaseServer
        .from('newsletter_subscribers')
        .delete()
        .eq('email', validated.email);
      return NextResponse.json(
        {
          success: false,
          error: 'The newsletter service is temporarily unavailable.',
          code: 'EMAIL_SERVICE_UNAVAILABLE',
        },
        { status: 503 }
      );
    }

    const isSpanish = validated.language === 'es';
    const subject = isSpanish ? 'Bienvenido a HyperCode Insights' : 'Welcome to HyperCode Insights';

    const confirmEmailHtml = isSpanish
      ? `<p>Gracias por suscribirse a HyperCode Insights.</p>
         <p>Recibirá información sobre tecnología, actualizaciones de IA, estrategias de transformación digital y novedades de HyperCode.</p>
         <p>— Equipo HyperCode<br/><a href="https://www.hypercodeit.com">hypercodeit.com</a></p>`
      : `<p>Thank you for subscribing to HyperCode Insights.</p>
         <p>You'll receive technology insights, AI updates, digital transformation strategies, and company updates from HyperCode.</p>
         <p>— HyperCode Team<br/><a href="https://www.hypercodeit.com">hypercodeit.com</a></p>`;

    try {
      const { data: customerEmailData, error: customerEmailError } = await resend.emails.send({
        from: resendFromEmail,
        to: validated.email,
        subject,
        html: confirmEmailHtml,
      });

      if (customerEmailError) {
        console.error('[Newsletter API] User confirmation email failed:', {
          name: customerEmailError.name,
          message: customerEmailError.message,
        });
        await supabaseServer
          .from('newsletter_subscribers')
          .delete()
          .eq('email', validated.email);
        return NextResponse.json(
          {
            success: false,
            error: 'Unable to send your confirmation email. Please try again later.',
            code: 'EMAIL_SEND_FAILED',
          },
          { status: 500 }
        );
      }

      console.log('[Newsletter API] User confirmation email sent:', {
        email: validated.email,
        emailId: customerEmailData?.id,
      });
    } catch (emailErr) {
      console.error('[Newsletter API] Resend newsletter email error:', emailErr);
      await supabaseServer
        .from('newsletter_subscribers')
        .delete()
        .eq('email', validated.email);
      return NextResponse.json(
        {
          success: false,
          error: 'Unable to send your confirmation email. Please try again later.',
          code: 'EMAIL_SEND_FAILED',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      saved: true,
      userEmailSent: true,
    });
  } catch (err) {
    console.error('Newsletter route error:', err);
    if (err instanceof z.ZodError) {
      const fieldErrors: Record<string, string> = {};
      err.issues.forEach((e: any) => {
        const path = e.path.join('.');
        if (path) {
          fieldErrors[path] = e.message;
        }
      });
      return NextResponse.json(
        {
          success: false,
          code: 'VALIDATION_ERROR',
          fieldErrors,
        },
        { status: 400 }
      );
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
