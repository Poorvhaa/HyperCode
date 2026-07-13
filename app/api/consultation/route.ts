import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseServer } from '@/lib/supabase-server';
import { Resend } from 'resend';
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

const consultationSchema = z.object({
  name: z.string().trim().min(2).max(80).regex(NAME_REGEX),
  email: z.string().trim().regex(EMAIL_REGEX),
  company: z.string().trim().min(2).regex(COMPANY_REGEX),
  phone: z.string().trim().regex(PHONE_REGEX).refine(val => {
    const digits = getPhoneDigitCount(val);
    return digits >= 7 && digits <= 15;
  }),
  service: z.string().trim().min(1),
  budget: z.string().trim().min(1),
  timeline: z.string().trim().min(1),
  message: z.string().trim().min(20).max(2000),
  locale: z.string().optional().default('en'),
  businessGoal: z.string().optional().default(''),
  currentChallenges: z.string().optional().default(''),
  expectedOutcome: z.string().optional().default(''),
  preferredServices: z.array(z.string()).optional().default([]),
  industry: z.string().optional().default(''),
  companySize: z.string().optional().default(''),
  currentTechStack: z.string().optional().default(''),
  preferredMeetingType: z.string().optional().default(''),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const sanitizedBody = sanitizePayload(body);
    const validated = consultationSchema.parse(sanitizedBody);

    // Save the consultation directly through the server-only Supabase client
const supabase = getSupabaseServer();

if (!supabase) {
  console.error(
    '[Consultation API] Supabase server configuration is missing.'
  );

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

const { data: savedData, error: saveError } = await supabase
  .from('consultation_requests')
  .insert({
    full_name: validated.name,
    company: validated.company,
    email: validated.email,
    phone: validated.phone,
    service_interest: validated.service,
    budget: validated.budget,
    timeline: validated.timeline,
    status: 'New',
    project_description: validated.message,
  })
  .select()
  .single();

if (saveError || !savedData) {
  console.error('[Consultation API] Consultation insert failed:', {
    code: saveError?.code || 'NO_CODE',
    message: saveError?.message || 'No data returned',
    details: saveError?.details || null,
    hint: saveError?.hint || null
  });

  return NextResponse.json(
    {
      success: false,
      saved: false,
      error:
        saveError?.message ||
        'Supabase did not return the saved consultation.',
      code: saveError?.code || 'CONSULTATION_INSERT_FAILED',
      details: saveError?.details || null,
      hint: saveError?.hint || null
    },
    { status: 500 }
  );
}

    // Send Emails via Resend
    let adminEmailSent = false;
    let userEmailSent = false;

    if (resend) {
      try {
        // A. Admin Alert Email
        const adminEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f8fafc;">
            <div style="background-color: #0f4c81; color: white; padding: 15px; border-radius: 6px; text-align: center;">
              <h2 style="margin: 0; font-size: 20px;">New Consultation Request</h2>
            </div>
            <div style="padding: 20px 10px; color: #1e293b; line-height: 1.6;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 180px; color: #475569;">Company Name:</td>
                  <td style="padding: 8px 0;">${validated.company} (${validated.companySize || 'Unknown size'})</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Industry:</td>
                  <td style="padding: 8px 0;">${validated.industry || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Contact Name:</td>
                  <td style="padding: 8px 0;">${validated.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email Address:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${validated.email}">${validated.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone Number:</td>
                  <td style="padding: 8px 0;">${validated.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Primary Service Interest:</td>
                  <td style="padding: 8px 0; font-weight: bold; color: #0f4c81;">${validated.service}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Preferred Services:</td>
                  <td style="padding: 8px 0;">${validated.preferredServices.join(', ') || 'None selected'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Estimated Budget:</td>
                  <td style="padding: 8px 0;">${validated.budget}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Deployment Timeline:</td>
                  <td style="padding: 8px 0;">${validated.timeline}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Meeting Type:</td>
                  <td style="padding: 8px 0;">${validated.preferredMeetingType || 'Video Call'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Current Tech Stack:</td>
                  <td style="padding: 8px 0;">${validated.currentTechStack || 'None specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Business Goal:</td>
                  <td style="padding: 8px 0;">${validated.businessGoal || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Current Challenges:</td>
                  <td style="padding: 8px 0;">${validated.currentChallenges || 'None specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Expected Outcomes:</td>
                  <td style="padding: 8px 0;">${validated.expectedOutcome || 'None specified'}</td>
                </tr>
              </table>
              <div style="background-color: white; border: 1px solid #cbd5e1; border-radius: 6px; padding: 15px; margin-top: 10px; white-space: pre-wrap;">
                <strong>Project Overview:</strong><br/>
                ${validated.message}
              </div>
            </div>
            <div style="text-align: center; font-size: 11px; color: #94a3b8; margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
              This is an automated alert from the HyperCode Enterprise Platform.
            </div>
          </div>
        `;

        try {
          const { data: adminEmailData, error: adminEmailError } = await resend.emails.send({
            from: resendFromEmail,
            to: contactRecipient,
            replyTo: validated.email,
            subject: `[Consultation Intake] New Request from ${validated.company}`,
            html: adminEmailHtml,
          });

          if (adminEmailError) {
            console.error('[Consultation API] Admin email failed:', {
              name: adminEmailError.name,
              message: adminEmailError.message
            });
          } else {
            console.log('[Consultation API] Admin email sent:', {
              emailId: adminEmailData?.id
            });
            adminEmailSent = true;
          }
        } catch (err) {
          console.error('[Consultation API] Admin email exception:', err);
        }

        // B. Client Confirmation Email
        const isSpanish = validated.locale === 'es';
        const clientSubject = isSpanish 
          ? 'Confirmación de solicitud de videoconsulta - HyperCode' 
          : 'Video Consultation Request Received - HyperCode';

        const clientEmailHtml = isSpanish ? `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <div style="text-align: center; padding-bottom: 20px;">
              <h2 style="color: #0f4c81; margin: 0;">HyperCode</h2>
              <p style="color: #64748b; font-size: 14px; margin: 5px 0 0 0;">Consultoría de IA y Transformación Digital</p>
            </div>
            <div style="color: #1e293b; line-height: 1.6; border-top: 1px solid #e2e8f0; padding-top: 20px;">
              <p>Hola <strong>${validated.name}</strong>,</p>
              <p>Hemos recibido su solicitud de videoconsulta tecnológica para su empresa, <strong>${validated.company}</strong>.</p>
              <p>Nuestros directores de soluciones están revisando sus objetivos de negocio en torno al enfoque de <strong>"${validated.service}"</strong> y coordinando una agenda técnica adecuada.</p>
              <p>Una invitación de Zoom o Google Meet con fechas propuestas le será enviada a este correo en un plazo de 24 horas hábiles.</p>
              <div style="margin: 25px 0; padding: 15px; background-color: #f8fafc; border-left: 4px solid #0f4c81; font-size: 13px; color: #475569;">
                <strong>Resumen de desafíos técnicos:</strong><br/>
                <em>"${validated.currentChallenges || validated.message}"</em>
              </div>
              <p>Atentamente,</p>
              <p style="margin: 0; font-weight: bold; color: #0f4c81;">Práctica de Transformación Digital</p>
              <p style="margin: 0; font-size: 12px; color: #64748b;">HyperCode Consulting</p>
            </div>
          </div>
        ` : `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <div style="text-align: center; padding-bottom: 20px;">
              <h2 style="color: #0f4c81; margin: 0;">HyperCode</h2>
              <p style="color: #64748b; font-size: 14px; margin: 5px 0 0 0;">AI & Digital Transformation Consulting</p>
            </div>
            <div style="color: #1e293b; line-height: 1.6; border-top: 1px solid #e2e8f0; padding-top: 20px;">
              <p>Hi <strong>${validated.name}</strong>,</p>
              <p>We have successfully received your video consultation request for <strong>${validated.company}</strong>.</p>
              <p>Our solutions director is reviewing your business goal of <strong>"${validated.service}"</strong> and aligning it with our practice engineers.</p>
              <p>A calendar invite with Google Meet/Zoom options will be dispatched to your corporate email shortly.</p>
              <div style="margin: 25px 0; padding: 15px; background-color: #f8fafc; border-left: 4px solid #0f4c81; font-size: 13px; color: #475569;">
                <strong>Challenge summary:</strong><br/>
                <em>"${validated.currentChallenges || validated.message}"</em>
              </div>
              <p>Best regards,</p>
              <p style="margin: 0; font-weight: bold; color: #0f4c81;">Digital Transformation Practice</p>
              <p style="margin: 0; font-size: 12px; color: #64748b;">HyperCode Consulting</p>
            </div>
          </div>
        `;

        try {
          const { data: clientEmailData, error: clientEmailError } = await resend.emails.send({
            from: resendFromEmail,
            to: validated.email,
            subject: clientSubject,
            html: clientEmailHtml,
          });

          if (clientEmailError) {
            console.error('[Consultation API] Client confirmation email failed:', {
              name: clientEmailError.name,
              message: clientEmailError.message
            });
          } else {
            console.log('[Consultation API] Client confirmation email sent:', {
              emailId: clientEmailData?.id
            });
            userEmailSent = true;
          }
        } catch (emailErr) {
          console.error('[Consultation API] Client confirmation email exception:', emailErr);
        }
      } catch (emailErr) {
        console.error('Resend consultation email error:', emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      saved: true,
      adminEmailSent,
      userEmailSent,
      data: savedData,
      warning:
        adminEmailSent && userEmailSent
          ? undefined
          : 'Your inquiry was saved, but one or more emails could not be sent.'
    });
  } catch (err: any) {
  console.error('[Consultation API Error]', {
    message: err?.message,
    stack: err?.stack,
    error: err
  });

  return NextResponse.json(
    {
      success: false,
      saved: false,
      error: err?.message || 'Internal server error'
    },
    { status: 500 }
  );

}
}
