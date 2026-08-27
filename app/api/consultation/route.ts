import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
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
const contactRecipient = process.env.HYPERCODE_CONTACT_EMAIL || 'hr@hypercodeit.com';
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
  timeline: z.string().trim().min(1),
  message: z.string().trim().min(20).max(2000),
  locale: z.string().optional().default('en'),
  preferredServices: z.array(z.string()).optional().default([]),
  industry: z.string().optional().default(''),
  preferredMeetingType: z.string().optional().default(''),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const sanitizedBody = sanitizePayload(body);
    const validated = consultationSchema.parse(sanitizedBody);

    // Save the consultation directly through the server-only Supabase client
const supabase = getSupabaseAdmin();

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
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 40px 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03); overflow: hidden;">
              <div style="padding: 32px 32px 20px 32px; text-align: center; border-bottom: 1px solid #f1f5f9;">
                <img src="https://www.hypercodeit.com/logo.png" alt="HyperCode Logo" width="180" style="border: 0; display: block; margin: 0 auto; width: 180px; height: auto;" />
                <div style="margin-top: 10px; font-size: 10px; font-weight: 800; letter-spacing: 0.15em; color: #64748b; text-transform: uppercase;">
                  WE SOLVE. WE BUILD. YOU GROW.
                </div>
              </div>
              <div style="padding: 32px; color: #1e293b; line-height: 1.6; font-size: 14px;">
                <div style="background-color: #145BFF; color: white; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 24px;">
                  <h2 style="margin: 0; font-size: 18px;">New Consultation Request</h2>
                </div>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; width: 180px; color: #475569;">Company Name:</td>
                    <td style="padding: 8px 0;">${validated.company}</td>
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
                    <td style="padding: 8px 0; font-weight: bold; color: #145BFF;">${validated.service}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #475569;">Preferred Services:</td>
                    <td style="padding: 8px 0;">${validated.preferredServices.join(', ') || 'None selected'}</td>
                  </tr>

                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #475569;">Deployment Timeline:</td>
                    <td style="padding: 8px 0;">${validated.timeline}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #475569;">Meeting Type:</td>
                    <td style="padding: 8px 0;">${validated.preferredMeetingType || 'Video Call'}</td>
                  </tr>


                </table>
                <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 15px; margin-top: 10px; white-space: pre-wrap;">
                  <strong>Project Overview:</strong><br/>
                  ${validated.message}
                </div>
              </div>
              <div style="padding: 24px 32px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; font-size: 12px; color: #64748b; line-height: 1.5;">
                <div style="font-weight: bold; color: #475569; margin-bottom: 4px;">HyperCode LLC</div>
                <div><a href="mailto:hr@hypercodeit.com" style="color: #145BFF; text-decoration: none;">hr@hypercodeit.com</a></div>
                <div style="margin-top: 4px;"><a href="https://www.hypercodeit.com" target="_blank" style="color: #64748b; text-decoration: none;">https://www.hypercodeit.com</a></div>
              </div>
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
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 40px 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03); overflow: hidden;">
              <div style="padding: 32px 32px 20px 32px; text-align: center; border-bottom: 1px solid #f1f5f9;">
                <img src="https://www.hypercodeit.com/logo.png" alt="HyperCode Logo" width="180" style="border: 0; display: block; margin: 0 auto; width: 180px; height: auto;" />
                <div style="margin-top: 10px; font-size: 10px; font-weight: 800; letter-spacing: 0.15em; color: #64748b; text-transform: uppercase;">
                  WE SOLVE. WE BUILD. YOU GROW.
                </div>
              </div>
              <div style="padding: 32px; color: #1e293b; line-height: 1.6; font-size: 14px;">
                <p>Hola <strong>${validated.name}</strong>,</p>
                <p>Hemos recibido su solicitud de videoconsulta tecnológica para su empresa, <strong>${validated.company}</strong>.</p>
                <p>Nuestros directores de soluciones están revisando sus objetivos de negocio en torno al enfoque de <strong>"${validated.service}"</strong> y coordinando una agenda técnica adecuada.</p>
                <p>Una invitación de Zoom o Google Meet con fechas propuestas le será enviada a este correo en un plazo de 24 horas hábiles.</p>
                <div style="margin: 25px 0; padding: 15px; background-color: #f8fafc; border-left: 4px solid #145BFF; font-size: 13px; color: #475569;">
                  <strong>Resumen de desafíos técnicos:</strong><br/>
                  <em>"${validated.message}"</em>
                </div>
                <p>Atentamente,</p>
                <p style="margin: 0; font-weight: bold; color: #145BFF;">Práctica de Transformación Digital</p>
              </div>
              <div style="padding: 24px 32px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; font-size: 12px; color: #64748b; line-height: 1.5;">
                <div style="font-weight: bold; color: #475569; margin-bottom: 4px;">HyperCode LLC</div>
                <div><a href="mailto:hr@hypercodeit.com" style="color: #145BFF; text-decoration: none;">hr@hypercodeit.com</a></div>
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
                <p>Hi <strong>${validated.name}</strong>,</p>
                <p>We have successfully received your video consultation request for <strong>${validated.company}</strong>.</p>
                <p>Our solutions director is reviewing your business goal of <strong>"${validated.service}"</strong> and aligning it with our practice engineers.</p>
                <p>A calendar invite with Google Meet/Zoom options will be dispatched to your corporate email shortly.</p>
                <div style="margin: 25px 0; padding: 15px; background-color: #f8fafc; border-left: 4px solid #145BFF; font-size: 13px; color: #475569;">
                  <strong>Challenge summary:</strong><br/>
                  <em>"${validated.message}"</em>
                </div>
                <p>Best regards,</p>
                <p style="margin: 0; font-weight: bold; color: #145BFF;">Digital Transformation Practice</p>
              </div>
              <div style="padding: 24px 32px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; font-size: 12px; color: #64748b; line-height: 1.5;">
                <div style="font-weight: bold; color: #475569; margin-bottom: 4px;">HyperCode LLC</div>
                <div><a href="mailto:hr@hypercodeit.com" style="color: #145BFF; text-decoration: none;">hr@hypercodeit.com</a></div>
                <div style="margin-top: 4px;"><a href="https://www.hypercodeit.com" target="_blank" style="color: #64748b; text-decoration: none;">https://www.hypercodeit.com</a></div>
              </div>
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
