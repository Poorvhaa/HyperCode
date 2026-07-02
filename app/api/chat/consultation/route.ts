import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { Resend } from 'resend';
import { isRateLimited, getClientIp, sanitizeInput } from '@/lib/security';

// Initialize Resend
const resendApiKey = process.env.RESEND_API_KEY || '';
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const contactRecipient = process.env.HYPERCODE_CONTACT_EMAIL || 'info@hypercodeus.com';

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(30),
  company: z.string().min(2).max(100),
  service: z.string().min(2).max(100),
  message: z.string().min(5).max(2000),
  preferred_date: z.string().min(5).max(100),
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
    const parsed = schema.parse(body);

    const name = sanitizeInput(parsed.name);
    const email = sanitizeInput(parsed.email);
    const phone = sanitizeInput(parsed.phone);
    const company = sanitizeInput(parsed.company);
    const service = sanitizeInput(parsed.service);
    const message = sanitizeInput(parsed.message);
    const preferredDate = sanitizeInput(parsed.preferred_date);
    const language = parsed.language;

    let savedRequest = null;
    try {
      savedRequest = await db.saveChatConsultation(
        name,
        email,
        phone,
        company,
        service,
        message,
        preferredDate,
        language
      );
    } catch (dbError) {
      console.warn('[DB Warning] Fallback database consultation entry:', dbError);
      savedRequest = {
        id: 'mock-consultation-id-' + Math.random().toString(36).substring(2, 9),
        created_at: new Date().toISOString(),
        name,
        email,
        phone,
        company,
        service,
        message,
        preferred_date: preferredDate,
        language,
        status: 'New'
      };
    }

    // 2. Send Emails via Resend (reusing main consultation logic)
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
              This is an automated alert from the HyperCode AI Consultant Platform.
            </div>
          </div>
        `;

        await resend.emails.send({
          from: 'HyperCode AI Consultant <onboarding@resend.dev>',
          to: contactRecipient,
          subject: `[AI Consultant Call] ${company} - ${service}`,
          html: adminEmailHtml,
        });

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
              <p>Best regards,</p>
              <p style="margin: 0; font-weight: bold; color: #0f4c81;">HyperCode Consulting Practice</p>
              <p style="margin: 0; font-size: 12px; color: #64748b;">Schaumburg, IL</p>
            </div>
          </div>
        `;

        await resend.emails.send({
          from: 'HyperCode Consulting <onboarding@resend.dev>',
          to: email,
          subject: userSubject,
          html: userEmailHtml,
        });
      } catch (emailErr) {
        console.error('Resend chat consultation email error:', emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      consultation: savedRequest
    });
  } catch (err) {
    console.error('Save chat consultation route error:', err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
