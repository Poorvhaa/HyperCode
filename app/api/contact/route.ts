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
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(20).max(2000),
  source: z.string().optional().default('website'),
  locale: z.string().optional().default('en'),
  services: z.array(z.string()).optional().default([]),
  industry: z.string().optional().default(''),
  companySize: z.string().optional().default(''),
  budget: z.string().optional().default(''),
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
const supabase = getSupabaseServer();

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
    subject: validated.subject,
    message: validated.message,
    status: 'New',
    source: validated.source,
    services: validated.services,
    industry: validated.industry || null,
    company_size: validated.companySize || null,
    budget: validated.budget || null,
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
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f8fafc;">
            <div style="background-color: #0f4c81; color: white; padding: 15px; border-radius: 6px; text-align: center;">
              <h2 style="margin: 0; font-size: 20px;">New Enterprise Contact Inquiry</h2>
            </div>
            <div style="padding: 20px 10px; color: #1e293b; line-height: 1.6;">
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
                  <td style="padding: 8px 0;">${validated.company} (${validated.companySize || 'Unknown size'})</td>
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
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Subject:</td>
                  <td style="padding: 8px 0; font-weight: bold;">${validated.subject}</td>
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
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Budget Range:</td>
                  <td style="padding: 8px 0; font-weight: bold; color: #0f4c81;">${validated.budget || 'Not specified'}</td>
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
              <div style="background-color: white; border: 1px solid #cbd5e1; border-radius: 6px; padding: 15px; margin-top: 10px; white-space: pre-wrap;">
                <strong>Message:</strong><br/>
                ${validated.message}
              </div>
            </div>
            <div style="text-align: center; font-size: 11px; color: #94a3b8; margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
              This is an automated alert from the HyperCode Enterprise Platform.
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
    subject: `[Lead Alert] New Contact Inquiry: ${validated.subject}`,
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
              <p style="margin: 0; font-size: 12px; color: #64748b;">2095 Hammond Dr
Suite C
Schaumburg, IL 60173
United States</p>
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
              <p style="margin: 0; font-size: 12px; color: #64748b;">2095 Hammond Dr
Suite C
Schaumburg, IL 60173
United States, CA</p>
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
    return NextResponse.json(
      {
        success: false,
        error: 'Validation failed',
        details: err.issues
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