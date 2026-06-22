import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseServer } from '@/lib/supabase-server';
import { Resend } from 'resend';

// Initialize Resend
const resendApiKey = process.env.RESEND_API_KEY || '';
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const contactRecipient = process.env.HYPERCODE_CONTACT_EMAIL || 'Info@hypercodeus.com';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  phone: z.string().min(10),
  subject: z.string().min(1),
  message: z.string().min(10),
  source: z.string().optional().default('website'),
  locale: z.string().optional().default('en'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = contactSchema.parse(body);

    let savedData = null;
    const supabaseServer = getSupabaseServer();

    // 1. Save to Supabase if configured
    if (supabaseServer) {
      const { data, error } = await supabaseServer
        .from('contact_inquiries')
        .insert([{
          full_name: validated.name,
          company: validated.company,
          email: validated.email,
          phone: validated.phone,
          subject: validated.subject,
          message: validated.message,
          status: 'new',
          source: validated.source
        }])
        .select()
        .single();

      if (error) {
        console.error('Supabase contact insert error:', error);
        return NextResponse.json({ error: 'Database save failed' }, { status: 500 });
      }
      savedData = data;

      // Automatically capture contact inquiry as a chat lead
      const { error: leadError } = await supabaseServer
        .from('chat_leads')
        .insert([{
          name: validated.name,
          email: validated.email,
          phone: validated.phone,
          interest: validated.subject,
          company: validated.company,
          source: 'contact_form',
          conversation_summary: `[Contact Form Submission]\nSubject: ${validated.subject}\nMessage: ${validated.message}`
        }]);

      if (leadError) {
        console.error('Supabase contact lead insert error:', leadError);
      }
    } else {
      console.warn('Supabase is not configured. Running in mock offline mode.');
      savedData = {
        id: 'mock-' + Math.random().toString(36).substring(2, 9),
        created_at: new Date().toISOString(),
        ...validated
      };
    }

    // 2. Trigger Email Notification via Resend
    if (resend) {
      try {
        // A. Email to HyperCode team
        const adminEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f8fafc;">
            <div style="background-color: #0f4c81; color: white; padding: 15px; border-radius: 6px; text-align: center;">
              <h2 style="margin: 0; font-size: 20px;">New Contact Inquiry Received</h2>
            </div>
            <div style="padding: 20px 10px; color: #1e293b; line-height: 1.6;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 120px; color: #475569;">Name:</td>
                  <td style="padding: 8px 0;">${validated.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${validated.email}">${validated.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone:</td>
                  <td style="padding: 8px 0;">${validated.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Company:</td>
                  <td style="padding: 8px 0;">${validated.company}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Subject:</td>
                  <td style="padding: 8px 0; font-weight: bold;">${validated.subject}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Source:</td>
                  <td style="padding: 8px 0;"><span style="background-color: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-size: 11px;">${validated.source}</span></td>
                </tr>
              </table>
              <div style="background-color: white; border: 1px solid #cbd5e1; border-radius: 6px; padding: 15px; margin-top: 10px; white-space: pre-wrap;">
                <strong>Message:</strong><br/>
                ${validated.message}
              </div>
            </div>
            <div style="text-align: center; font-size: 11px; color: #94a3b8; margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
              This is an automated alert from the HyperCode Platform.
            </div>
          </div>
        `;

        await resend.emails.send({
          from: 'HyperCode Platform <onboarding@resend.dev>',
          to: contactRecipient,
          subject: `[Lead Alert] New Contact Inquiry: ${validated.subject}`,
          html: adminEmailHtml,
        });

        // B. Confirmation Email to User
        const isSpanish = validated.locale === 'es';
        const userSubject = isSpanish 
          ? 'Hemos recibido su mensaje - HyperCode' 
          : 'We received your message - HyperCode';

        const userEmailHtml = isSpanish ? `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <div style="text-align: center; padding-bottom: 20px;">
              <h2 style="color: #0f4c81; margin: 0;">HyperCode</h2>
              <p style="color: #64748b; font-size: 14px; margin: 5px 0 0 0;">Soluciones de Datos, Tecnología y Talento</p>
            </div>
            <div style="color: #1e293b; line-height: 1.6; border-top: 1px solid #e2e8f0; padding-top: 20px;">
              <p>Hola <strong>${validated.name}</strong>,</p>
              <p>Gracias por ponerse en contacto con HyperCode.</p>
              <p>Hemos recibido su consulta general sobre <strong>"${validated.subject}"</strong>. Nuestro equipo de desarrollo de negocios la revisará y la dirigirá al asesor técnico adecuado.</p>
              <p>Un miembro de nuestro equipo se pondrá en contacto con usted en un plazo de 24 horas hábiles.</p>
              <div style="margin: 25px 0; padding: 15px; background-color: #f8fafc; border-left: 4px solid #0f4c81; font-size: 13px; color: #475569;">
                <strong>Detalles de su mensaje:</strong><br/>
                <em>"${validated.message.substring(0, 150)}${validated.message.length > 150 ? '...' : ''}"</em>
              </div>
              <p>Atentamente,</p>
              <p style="margin: 0; font-weight: bold; color: #0f4c81;">Equipo de Comunicaciones de HyperCode</p>
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
              <p>Hi <strong>${validated.name}</strong>,</p>
              <p>Thank you for contacting HyperCode.</p>
              <p>We have successfully received your inquiry regarding <strong>"${validated.subject}"</strong>. Our solutions director will review your details and route them to the appropriate practice lead shortly.</p>
              <p>A member of our team will follow up with you within 24 business hours.</p>
              <div style="margin: 25px 0; padding: 15px; background-color: #f8fafc; border-left: 4px solid #0f4c81; font-size: 13px; color: #475569;">
                <strong>Your message preview:</strong><br/>
                <em>"${validated.message.substring(0, 150)}${validated.message.length > 150 ? '...' : ''}"</em>
              </div>
              <p>Best regards,</p>
              <p style="margin: 0; font-weight: bold; color: #0f4c81;">HyperCode Communications Team</p>
              <p style="margin: 0; font-size: 12px; color: #64748b;">Schaumburg, IL</p>
            </div>
          </div>
        `;

        // Send confirmation to user (using onboarding sandbox to support trial keys,
        // but if they have custom domain, they can customize sending)
        await resend.emails.send({
          from: 'HyperCode Team <onboarding@resend.dev>',
          to: validated.email,
          subject: userSubject,
          html: userEmailHtml,
        });
      } catch (emailErr) {
        console.error('Resend contact email error:', emailErr);
        // Do not fail request just because email failed
      }
    } else {
      console.warn('Resend email client is not configured.');
    }

    return NextResponse.json({ success: true, data: savedData });
  } catch (err) {
    console.error('Contact route error:', err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
