import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseServer } from '@/lib/supabase-server';
import { Resend } from 'resend';

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

const emailSchema = z.object({
  email: z.string().email(),
  language: z.enum(['en', 'es']).optional().default('en'),
  sourcePage: z.string().optional(),
  honeypot: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = emailSchema.parse(body);

    // Honeypot spam check
    if (validated.honeypot && validated.honeypot.trim() !== '') {
      console.log(`[Newsletter API] Spam bot detected (honeypot filled: "${validated.honeypot}") for email: ${validated.email}. Faking success.`);
      return NextResponse.json({ success: true });
    }

    const supabaseServer = getSupabaseServer();

    // 1. Save to Supabase
    if (supabaseServer) {
      const { error } = await supabaseServer
        .from('newsletter_subscribers')
        .insert([{
          email: validated.email,
          status: 'subscribed',
          language: validated.language,
          source_page: validated.sourcePage || null
        }]);

      if (error) {
        if (error.code === '23505') {
          return NextResponse.json(
            { success: false, error: 'You are already subscribed' },
            { status: 400 }
          );
        }
        console.error('Supabase newsletter insert error:', error);
        return NextResponse.json(
          { success: false, error: 'Database insert failed' },
          { status: 500 }
        );
      }
    } else {
      console.warn('Supabase is not configured. Running in mock newsletter mode.');
    }

    // 2. Send confirmation email via Resend
    if (resend) {
      try {
        const isSpanish = validated.language === 'es';
        const subject = isSpanish ? '¡Bienvenido a HyperCode Insights!' : 'Welcome to HyperCode Insights!';
        
        const confirmEmailHtml = isSpanish ? `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <div style="text-align: center; padding-bottom: 20px;">
              <h2 style="color: #0f4c81; margin: 0;">HyperCode</h2>
              <p style="color: #64748b; font-size: 14px; margin: 5px 0 0 0;">Soluciones de Datos, Tecnología y Talento</p>
            </div>
            <div style="color: #1e293b; line-height: 1.6; border-top: 1px solid #e2e8f0; padding-top: 20px;">
              <p>Hola,</p>
              <p>¡Gracias por suscribirte al boletín de HyperCode!</p>
              <p>A partir de ahora, recibirás nuestros artículos mensuales de opinión, planos de ingeniería, casos de éxito e ideas de nuestros asesores técnicos directamente en tu bandeja de entrada.</p>
              <p>Puedes cancelar tu suscripción o gestionar tus preferencias en cualquier momento utilizando los enlaces que se encuentran al final de nuestros correos.</p>
              <p>¡Bienvenido a la comunidad!</p>
              <p>Atentamente,</p>
              <p style="margin: 0; font-weight: bold; color: #0f4c81;">El equipo editorial de HyperCode</p>
              <p style="margin: 0; font-size: 12px; color: #64748b;">Schaumburg, IL</p>
            </div>
          </div>
        ` : `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <div style="text-align: center; padding-bottom: 20px;">
              <h2 style="color: #0f4c81; margin: 0;">HyperCode</h2>
              <p style="color: #64748b; font-size: 14px; margin: 5px 0 0 0;">Data, Technology, & Talent Solutions</p>
            </div>
            <div style="color: #1e293b; line-height: 1.6; border-top: 1px solid #e2e8f0; padding-top: 20px;">
              <p>Hi there,</p>
              <p>Thank you for subscribing to the HyperCode newsletter!</p>
              <p>You will now receive our monthly thought leadership pieces, engineering blueprints, case studies, and insights from our technical advisors directly in your inbox.</p>
              <p>You can unsubscribe or manage your preferences at any time using the links at the bottom of our emails.</p>
              <p>Welcome to the community!</p>
              <p>Best regards,</p>
              <p style="margin: 0; font-weight: bold; color: #0f4c81;">HyperCode Editorial Team</p>
              <p style="margin: 0; font-size: 12px; color: #64748b;">Schaumburg, IL</p>
            </div>
          </div>
        `;

        await resend.emails.send({
          from: 'HyperCode Editorial <onboarding@resend.dev>',
          to: validated.email,
          subject: subject,
          html: confirmEmailHtml,
        });
      } catch (emailErr) {
        console.error('Resend newsletter email error:', emailErr);
      }
    }

    return NextResponse.json({ success: true, message: 'Subscription successful' });
  } catch (err) {
    console.error('Newsletter route error:', err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
