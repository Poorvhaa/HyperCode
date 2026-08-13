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

    // 2. Send confirmation email via Resend
    let userEmailSent = false;

    if (resend) {
      try {
        const isSpanish = validated.language === 'es';
        const subject = isSpanish ? '¡Bienvenido a HyperCode Insights!' : 'Welcome to HyperCode Insights!';
        
        const confirmEmailHtml = isSpanish ? `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 40px 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03); overflow: hidden;">
              <div style="padding: 32px 32px 20px 32px; text-align: center; border-bottom: 1px solid #f1f5f9;">
                <img src="https://www.hypercodeit.com/logo.png" alt="HyperCode Logo" width="180" style="border: 0; display: block; margin: 0 auto; width: 180px; height: auto;" />
                <div style="margin-top: 10px; font-size: 10px; font-weight: 800; letter-spacing: 0.15em; color: #64748b; text-transform: uppercase;">
                  WE SOLVE. WE BUILD. YOU GROW.
                </div>
              </div>
              <div style="padding: 32px; color: #1e293b; line-height: 1.6; font-size: 14px;">
                <p>Hola,</p>
                <p>¡Gracias por suscribirte al boletín de HyperCode!</p>
                <p>A partir de ahora, recibirás nuestros artículos mensuales de opinión, planos de ingeniería, casos de éxito e ideas de nuestros asesores técnicos directamente en tu bandeja de entrada.</p>
                <p>Puedes cancelar tu suscripción o gestionar tus preferencias en cualquier momento utilizando los enlaces que se encuentran al final de nuestros correos.</p>
                <p>¡Bienvenido a la comunidad!</p>
                <p>Atentamente,</p>
                <p style="margin: 0; font-weight: bold; color: #145BFF;">El equipo editorial de HyperCode</p>
              </div>
              <div style="padding: 24px 32px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; font-size: 12px; color: #64748b; line-height: 1.5;">
                <div style="font-weight: bold; color: #475569; margin-bottom: 4px;">HyperCode IT Solutions</div>
                <div><a href="mailto:solutions@hypercodeit.com" style="color: #145BFF; text-decoration: none;">solutions@hypercodeit.com</a></div>
                <div style="margin-top: 4px;"><a href="https://www.hypercodeit.com" target="_blank" style="color: #64748b; text-decoration: none;">https://www.hypercodeit.com</a></div>
              </div>
            </div>
          </div>
        ` : `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 40px 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03); overflow: hidden;">
              <div style="padding: 32px 32px 20px 32px; text-align: center; border-bottom: 1px solid #f1f5f9;">
                <img src="https://www.hypercodeit.com/logo.png" alt="HyperCode Logo" width="180" style="border: 0; display: block; margin: 0 auto; width: 180px; height: auto;" />
                <div style="margin-top: 10px; font-size: 10px; font-weight: 800; letter-spacing: 0.15em; color: #64748b; text-transform: uppercase;">
                  WE SOLVE. WE BUILD. YOU GROW.
                </div>
              </div>
              <div style="padding: 32px; color: #1e293b; line-height: 1.6; font-size: 14px;">
                <p>Hi there,</p>
                <p>Thank you for subscribing to the HyperCode newsletter!</p>
                <p>You will now receive our monthly thought leadership pieces, engineering blueprints, case studies, and insights from our technical advisors directly in your inbox.</p>
                <p>You can unsubscribe or manage your preferences at any time using the links at the bottom of our emails.</p>
                <p>Welcome to the community!</p>
                <p>Best regards,</p>
                <p style="margin: 0; font-weight: bold; color: #145BFF;">HyperCode Editorial Team</p>
              </div>
              <div style="padding: 24px 32px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; font-size: 12px; color: #64748b; line-height: 1.5;">
                <div style="font-weight: bold; color: #475569; margin-bottom: 4px;">HyperCode IT Solutions</div>
                <div><a href="mailto:solutions@hypercodeit.com" style="color: #145BFF; text-decoration: none;">solutions@hypercodeit.com</a></div>
                <div style="margin-top: 4px;"><a href="https://www.hypercodeit.com" target="_blank" style="color: #64748b; text-decoration: none;">https://www.hypercodeit.com</a></div>
              </div>
            </div>
          </div>
        `;

        const { data: customerEmailData, error: customerEmailError } = await resend.emails.send({
          from: resendFromEmail,
          to: validated.email,
          subject: subject,
          html: confirmEmailHtml,
        });

        if (customerEmailError) {
          console.error('[Newsletter API] User confirmation email failed:', {
            name: customerEmailError.name,
            message: customerEmailError.message
          });
        } else {
          userEmailSent = true;
          console.log('[Newsletter API] User confirmation email sent to:', validated.email);
        }
      } catch (emailErr) {
        console.error('Resend newsletter email error:', emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      saved: true,
      userEmailSent,
      warning: userEmailSent ? undefined : 'Your subscription was saved, but the confirmation email could not be sent.'
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
