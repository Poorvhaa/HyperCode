import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseServer } from '@/lib/supabase-server';
import { Resend } from 'resend';
import { isRateLimited, getClientIp, sanitizeInput } from '@/lib/security';
import {
  NAME_REGEX,
  EMAIL_REGEX,
  PHONE_REGEX,
  COMPANY_REGEX,
  getPhoneDigitCount,
  sanitizePayload
} from '@/lib/validation';

// Initialize Resend
const resendApiKey = process.env.RESEND_API_KEY || '';
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const contactRecipient = process.env.HYPERCODE_CONTACT_EMAIL || 'HR@hypercodeus.com';
const resendFromEmail =
  process.env.RESEND_FROM_EMAIL ||
  'HyperCode <HR@hypercodeit.com>';

const schema = z.object({
  name: z.string().trim().min(2).max(80).regex(NAME_REGEX),
  email: z.string().trim().regex(EMAIL_REGEX),
  phone: z.string().trim().regex(PHONE_REGEX).refine(val => {
    const digits = getPhoneDigitCount(val);
    return digits >= 7 && digits <= 15;
  }),
  company: z.string().trim().min(2).regex(COMPANY_REGEX),
  service: z.string().trim().min(1),
  message: z.string().trim().min(20).max(2000),
  preferred_date: z.string().trim().min(5).max(100),
  language: z.enum(['en', 'es']),
});

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check
    const ip = getClientIp(req);
    const limitStatus = isRateLimited(ip, 5, 60000); // 5 bookings/min limit
    if (limitStatus.limited) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const sanitizedBody = sanitizePayload(body);
    const parsed = schema.parse(sanitizedBody);

    const name = sanitizeInput(parsed.name);
    const email = sanitizeInput(parsed.email);
    const phone = sanitizeInput(parsed.phone);
    const company = sanitizeInput(parsed.company);
    const service = sanitizeInput(parsed.service);
    const message = sanitizeInput(parsed.message);
    const preferredDate = sanitizeInput(parsed.preferred_date);
    const language = parsed.language;

    const supabase = getSupabaseServer();

    if (!supabase) {
      console.error('[Chat Consultation API] Supabase server configuration is missing.');
      return NextResponse.json(
        {
          success: false,
          saved: false,
          error: 'The consultation service is temporarily unavailable.',
          code: 'SUPABASE_CONFIGURATION_MISSING'
        },
        { status: 503 }
      );
    }

    const { data: savedRequest, error: saveError } = await supabase
      .from('consultation_requests')
      .insert({
        full_name: name,
        company: company || null,
        email,
        phone: phone || null,
        service_interest: service,
        project_description: message,
        budget: 'Chat Consultant',
        timeline: 'Chat',
        status: 'New', // Capitalized to pass database CHECK constraint
        name,
        service,
        message,
        preferred_date: preferredDate || null,
        language
      })
      .select()
      .single();

    if (saveError || !savedRequest) {
      console.error('[Chat Consultation API] Consultation insert failed:', saveError);
      return NextResponse.json(
        {
          success: false,
          saved: false,
          error: 'Unable to save your consultation request.',
          code: 'CONSULTATION_INSERT_FAILED'
        },
        { status: 500 }
      );
    }

    // 2. Send Emails via Resend (reusing main consultation logic)
    let adminEmailSent = false;
    let userEmailSent = false;

    if (resend) {
      try {
        // Admin Alert Email HTML
        const adminEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f8fafc;">
            <div style="background-color: #0F4C81; color: white; padding: 15px; border-radius: 6px; text-align: center;">
              <h2 style="margin: 0; font-size: 20px;">New Consultation Request via AI Consultant</h2>
              <p style="margin: 5px 0 0 0; font-size: 13px;">Selected Service: <strong>${service}</strong></p>
            </div>
            <div style="padding: 20px 10px; color: #1e293b; line-height: 1.6;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #475569;">Company:</td>
                  <td style="padding: 8px 0; font-weight: bold;">${company}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Contact Name:</td>
                  <td style="padding: 8px 0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone:</td>
                  <td style="padding: 8px 0;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Preferred Date:</td>
                  <td style="padding: 8px 0; color: #059669; font-weight: bold;">${preferredDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Language:</td>
                  <td style="padding: 8px 0; text-transform: uppercase;">${language}</td>
                </tr>
              </table>
              <div style="background-color: white; border: 1px solid #cbd5e1; border-radius: 6px; padding: 15px; margin-top: 10px; white-space: pre-wrap;">
                <strong>Project Description:</strong><br/>
                ${message}
              </div>
            </div>
            <div style="text-align: center; font-size: 11px; color: #94a3b8; margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
              This is an automated alert from the HyperCode AI Platform.
            </div>
          </div>
        `;

        try {
          const { data: adminEmailData, error: adminEmailError } = await resend.emails.send({
            from: resendFromEmail,
            to: contactRecipient,
            replyTo: email,
            subject: `[AI Consultant Call] ${company} - ${service}`,
            html: adminEmailHtml,
          });

          if (adminEmailError) {
            console.error('[Chat Consultation API] Admin email failed:', {
              name: adminEmailError.name,
              message: adminEmailError.message
            });
          } else {
            adminEmailSent = true;
            console.log('[Chat Consultation API] Admin email sent successfully.');
          }
        } catch (adminErr) {
          console.error('[Chat Consultation API] Admin email exception:', adminErr);
        }

        // Visitor Confirmation Email
        const isSpanish = language === 'es';
        const userSubject = isSpanish
          ? 'Confirmación de solicitud de consulta - HyperCode'
          : 'Consultation Request Confirmed - HyperCode';

        const userEmailHtml = isSpanish ? `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <div style="text-align: center; padding-bottom: 20px;">
              <h2 style="color: #0f4c81; margin: 0;">HyperCode</h2>
              <p style="color: #64748b; font-size: 14px; margin: 5px 0 0 0;">Soluciones de Transformación Digital</p>
            </div>
            <div style="color: #1e293b; line-height: 1.6; border-top: 1px solid #e2e8f0; padding-top: 20px;">
              <p>Hola <strong>${name}</strong>,</p>
              <p>Gracias por programar una consulta a través de nuestro Consultor de IA de HyperCode.</p>
              <p>Hemos recibido sus requisitos para <strong>"${service}"</strong>. Uno de nuestros Directores de Soluciones Técnicas revisará su caso para preparar la llamada.</p>
              <div style="margin: 20px 0; padding: 15px; background-color: #f8fafc; border-radius: 6px; font-size: 13px;">
                <strong>Detalles de su Consulta:</strong><br/>
                • Empresa: ${company}<br/>
                • Fecha sugerida: ${preferredDate}<br/>
                • Servicio: ${service}
              </div>
              <p>Nos pondremos en contacto con usted en un plazo de 24 horas hábiles con invitaciones de calendario (Zoom/Teams).</p>
              <p>Esperamos trabajar con usted.</p>
              <p>Atentamente,</p>
              <p style="margin: 0; font-weight: bold; color: #0f4c81;">Práctica de Consultoría de HyperCode</p>
              <p style="margin: 0; font-size: 12px; color: #64748b;">Schaumburg, IL</p>
            </div>
          </div>
        ` : `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <div style="text-align: center; padding-bottom: 20px;">
              <h2 style="color: #0f4c81; margin: 0;">HyperCode</h2>
              <p style="color: #64748b; font-size: 14px; margin: 5px 0 0 0;">Digital Transformation Solutions</p>
            </div>
            <div style="color: #1e293b; line-height: 1.6; border-top: 1px solid #e2e8f0; padding-top: 20px;">
              <p>Hi <strong>${name}</strong>,</p>
              <p>Thank you for scheduling a technical review call with HyperCode via our AI Consultant.</p>
              <p>We have successfully logged your request for <strong>"${service}"</strong>. A Solutions Director is evaluating your project scope details.</p>
              <div style="margin: 20px 0; padding: 15px; background-color: #f8fafc; border-radius: 6px; font-size: 13px;">
                <strong>Meeting Parameters:</strong><br/>
                • Company: ${company}<br/>
                • Suggested Date: ${preferredDate}<br/>
                • Service Interest: ${service}
              </div>
              <p>We will contact you within 24 business hours with custom videoconference calendar invites.</p>
              <p>We look forward to working on this initiative.</p>
              <p style="margin: 0; font-weight: bold; color: #0f4c81;">HyperCode Consulting Practice</p>
              <p style="margin: 0; font-size: 12px; color: #64748b;">Schaumburg, IL</p>
            </div>
          </div>
        `;

        try {
          const { data: userEmailData, error: userEmailError } = await resend.emails.send({
            from: resendFromEmail,
            to: email,
            subject: userSubject,
            html: userEmailHtml,
          });

          if (userEmailError) {
            console.error('[Chat Consultation API] Confirmation email failed:', {
              name: userEmailError.name,
              message: userEmailError.message
            });
          } else {
            userEmailSent = true;
            console.log('[Chat Consultation API] Confirmation email sent successfully.');
          }
        } catch (userErr) {
          console.error('[Chat Consultation API] Confirmation email exception:', userErr);
        }
      } catch (emailErr) {
        console.error('Resend chat consultation email error:', emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      saved: true,
      adminEmailSent,
      userEmailSent,
      data: savedRequest,
      warning:
        adminEmailSent && userEmailSent
          ? undefined
          : 'Your consultation request was saved, but one or more emails could not be sent.'
    });
  } catch (err) {
    console.error('Save chat consultation route error:', err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Validation failed', details: err.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
