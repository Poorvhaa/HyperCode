import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseServer } from '@/lib/supabase-server';
import { Resend } from 'resend';

// Initialize Resend
const resendApiKey = process.env.RESEND_API_KEY || '';
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const emailSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = emailSchema.parse(body);

    // 1. Save to Supabase
    if (supabaseServer) {
      const { error } = await supabaseServer
        .from('newsletter_subscribers')
        .insert([{
          email: validated.email,
          status: 'subscribed'
        }]);

      // If subscriber already exists, ignore constraint error but return success
      if (error && error.code !== '23505') {
        console.error('Supabase newsletter insert error:', error);
        return NextResponse.json({ error: 'Database save failed' }, { status: 500 });
      }
    } else {
      console.warn('Supabase is not configured. Running in mock newsletter mode.');
    }

    // 2. Send confirmation email via Resend
    if (resend) {
      try {
        const confirmEmailHtml = `
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
          subject: 'Welcome to HyperCode Insights!',
          html: confirmEmailHtml,
        });
      } catch (emailErr) {
        console.error('Resend newsletter email error:', emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Newsletter route error:', err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
