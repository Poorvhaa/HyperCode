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
console.log('[Contact API] Email configuration:', {
  resendConfigured: Boolean(process.env.RESEND_API_KEY),
  senderConfigured: Boolean(process.env.RESEND_FROM_EMAIL),
  recipientConfigured: Boolean(process.env.HYPERCODE_CONTACT_EMAIL),
  sender: resendFromEmail,
  recipient: contactRecipient
});
const contactSchema = z.object({
  name: z.string().trim().min(2).max(80).regex(NAME_REGEX),
  email: z.string().trim().regex(EMAIL_REGEX),
  company: z.string().trim().min(2).regex(COMPANY_REGEX),
  phone: z.string().trim().regex(PHONE_REGEX).refine(val => {
    const digits = getPhoneDigitCount(val);
    return digits >= 7 && digits <= 15;
  }),
  message: z.string().trim().min(20).max(2000),
  source: z.string().optional().default('website'),
  locale: z.string().optional().default('en'),
  services: z.array(z.string()).optional().default([]),
  industry: z.string().optional().default(''),
  timeline: z.string().optional().default(''),
  country: z.string().optional().default(''),
  preferredContactMethod: z.string().optional().default(''),
  projectType: z.string().optional().default(''),
  requiredTechnologies: z.array(z.string()).optional().default([]),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const sanitizedBody = sanitizePayload(body);
    const validated = contactSchema.parse(sanitizedBody);

    // Save the inquiry directly through the server-only Supabase client
const supabase = getSupabaseAdmin();

if (!supabase) {
  console.error('[Contact API] Supabase server configuration is missing.');

  return NextResponse.json(
    {
      success: false,
      error: 'The contact service is temporarily unavailable.',
      code: 'SUPABASE_CONFIGURATION_MISSING'
    },
    { status: 503 }
  );
}

const { data: savedData, error: saveError } = await supabase
  .from('contact_inquiries')
  .insert({
    full_name: validated.name,
    company: validated.company || null,
    email: validated.email,
    phone: validated.phone || null,
    subject: validated.services.join(', ') || 'Website Inquiry',
    message: validated.message,
    status: 'New',
    source: validated.source,
    services: validated.services,
    industry: validated.industry || null,
    timeline: validated.timeline || null,
    country: validated.country || null,
    preferred_contact_method:
      validated.preferredContactMethod || null,
    project_type: validated.projectType || null,
    required_technologies: validated.requiredTechnologies
  })
  .select()
  .single();

if (saveError || !savedData) {
  console.error('[Contact API] Contact inquiry insert failed:', {
    code: saveError?.code,
    message: saveError?.message,
    details: saveError?.details,
    hint: saveError?.hint
  });

  return NextResponse.json(
    {
      success: false,
      error: 'Unable to save your contact inquiry.',
      code: 'CONTACT_INSERT_FAILED'
    },
    { status: 500 }
  );
}

    // Trigger Email Notification via Resend
let adminEmailSent = false;
let userEmailSent = false;

if (resend) {
        // A. Email to HyperCode team
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
                  <h2 style="margin: 0; font-size: 18px;">New Enterprise Contact Inquiry</h2>
                </div>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #475569;">Name:</td>
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
                    <td style="padding: 8px 0; font-weight: bold; color: #475569;">Industry:</td>
                    <td style="padding: 8px 0;">${validated.industry || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #475569;">Country:</td>
                    <td style="padding: 8px 0;">${validated.country || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #475569;">Services Requested:</td>
                    <td style="padding: 8px 0;">${validated.services.join(', ') || 'None selected'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #475569;">Project Type:</td>
                    <td style="padding: 8px 0;">${validated.projectType || 'Not specified'}</td>
                  </tr>

                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #475569;">Timeline:</td>
                    <td style="padding: 8px 0;">${validated.timeline || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #475569;">Technologies:</td>
                    <td style="padding: 8px 0;">${validated.requiredTechnologies.join(', ') || 'None selected'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #475569;">Contact Method:</td>
                    <td style="padding: 8px 0;">${validated.preferredContactMethod || 'Email'}</td>
                  </tr>
                </table>
                <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 15px; margin-top: 10px; white-space: pre-wrap;">
                  <strong>Message:</strong><br/>
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
  const {
    data: adminEmailData,
    error: adminEmailError
  } = await resend.emails.send({
    from: resendFromEmail,
    to: contactRecipient,
    replyTo: validated.email,
    subject: `[Lead Alert] New Contact Inquiry: ${validated.services.join(', ') || 'None selected'}`,
    html: adminEmailHtml
  });

  if (adminEmailError) {
    console.error('[Contact API] Admin email failed:', {
      name: adminEmailError.name,
      message: adminEmailError.message
    });
  } else {
    console.log('[Contact API] Admin email sent:', {
      emailId: adminEmailData?.id
    });
    adminEmailSent = true;
  }
} catch (err) {
  console.error('[Contact API] Admin email exception:', err);
}

        // B. Confirmation Email to User
        const isSpanish = validated.locale === 'es';
        const userSubject = isSpanish 
          ? 'Hemos recibido su mensaje - HyperCode' 
          : 'We received your message - HyperCode';

        const userEmailHtml = isSpanish ? `
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
                <p>Gracias por ponerse en contacto con HyperCode.</p>
                <p>Hemos recibido su consulta sobre <strong>"${validated.services.join(', ') || 'nuestros servicios'}"</strong>. Nuestro equipo de desarrollo de negocios la revisará y la dirigirá al asesor técnico adecuado.</p>
                <p>Un miembro de nuestro equipo se pondrá en contacto con usted en un plazo de 24 horas hábiles.</p>
                <div style="margin: 25px 0; padding: 15px; background-color: #f8fafc; border-left: 4px solid #145BFF; font-size: 13px; color: #475569;">
                  <strong>Detalles de su mensaje:</strong><br/>
                  <em>"${validated.message.substring(0, 150)}${validated.message.length > 150 ? '...' : ''}"</em>
                </div>
                <p>Atentamente,</p>
                <p style="margin: 0; font-weight: bold; color: #145BFF;">Equipo de Comunicaciones de HyperCode</p>
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
                <p>Thank you for contacting HyperCode.</p>
                <p>We have successfully received your inquiry regarding <strong>"${validated.services.join(', ') || 'our services'}"</strong>. Our solutions director will review your details and route them to the appropriate practice lead shortly.</p>
                <p>A member of our team will follow up with you within 24 business hours.</p>
                <div style="margin: 25px 0; padding: 15px; background-color: #f8fafc; border-left: 4px solid #145BFF; font-size: 13px; color: #475569;">
                  <strong>Your message preview:</strong><br/>
                  <em>"${validated.message.substring(0, 150)}${validated.message.length > 150 ? '...' : ''}"</em>
                </div>
                <p>Best regards,</p>
                <p style="margin: 0; font-weight: bold; color: #145BFF;">HyperCode Communications Team</p>
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
    const {
      data: userEmailData,
      error: userEmailError
    } = await resend.emails.send({
      from: resendFromEmail,
      to: validated.email,
      subject: userSubject,
      html: userEmailHtml
    });

    if (userEmailError) {
      console.error(
        '[Contact API] User confirmation email failed:',
        {
          name: userEmailError.name,
          message: userEmailError.message
        }
      );
    } else {
      userEmailSent = true;

      console.log(
        '[Contact API] User confirmation email sent:',
        {
          emailId: userEmailData?.id
        }
      );
    }
    } catch (emailErr) {
    console.error(
      '[Contact API] User confirmation email exception:',
      emailErr
    );
  }
} else {
  console.error('[Contact API] Resend is not configured.');
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
} catch (err) {
  console.error('Contact route error:', err);

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

  return NextResponse.json(
    {
      success: false,
      error: 'Internal server error'
    },
    { status: 500 }
  );
}
}
