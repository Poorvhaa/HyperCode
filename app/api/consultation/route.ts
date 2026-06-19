import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseServer } from '@/lib/supabase-server';
import { Resend } from 'resend';

// Initialize Resend
const resendApiKey = process.env.RESEND_API_KEY || '';
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const contactRecipient = process.env.HYPERCODE_CONTACT_EMAIL || 'Info@hypercodeus.com';

const consultationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  phone: z.string().min(10),
  service: z.string().min(1),
  budget: z.string().min(1),
  timeline: z.string().min(1),
  message: z.string().min(10),
  locale: z.string().optional().default('en'),
});

// Automatic service interest classifier for lead routing
function classifyService(service: string): string {
  const s = service.toLowerCase();
  if (s.includes('business intelligence') || s.includes('bi') || s.includes('reporting') || s.includes('dashboard')) {
    return 'Business Intelligence';
  }
  if (s.includes('analytics') || s.includes('predictive') || s.includes('machine learning') || s.includes('ml')) {
    return 'Data Analytics';
  }
  if (s.includes('warehouse') || s.includes('warehousing') || s.includes('engineering') || s.includes('pipeline') || s.includes('dbt') || s.includes('etl')) {
    return 'Data Warehousing';
  }
  if (s.includes('web') || s.includes('development') || s.includes('next.js') || s.includes('react') || s.includes('custom application')) {
    return 'Web Development';
  }
  if (s.includes('staffing') || s.includes('augmentation') || s.includes('contract') || s.includes('placement') || s.includes('hiring')) {
    return 'IT Staffing';
  }
  return 'Technology Consulting'; // default / fallback
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = consultationSchema.parse(body);
    const classification = classifyService(validated.service);

    let savedData = null;

    // 1. Save to Supabase
    if (supabaseServer) {
      const { data, error } = await supabaseServer
        .from('consultation_requests')
        .insert([{
          full_name: validated.name,
          company: validated.company,
          email: validated.email,
          phone: validated.phone,
          service_interest: classification, // Save classified lead category
          project_description: validated.message,
          budget: validated.budget,
          timeline: validated.timeline,
          status: 'new'
        }])
        .select()
        .single();

      if (error) {
        console.error('Supabase consultation insert error:', error);
        return NextResponse.json({ error: 'Database save failed' }, { status: 500 });
      }
      savedData = data;
    } else {
      console.warn('Supabase is not configured. Running in mock offline mode.');
      savedData = {
        id: 'mock-' + Math.random().toString(36).substring(2, 9),
        created_at: new Date().toISOString(),
        service_interest: classification,
        status: 'new',
        ...validated
      };
    }

    // 2. Send Emails via Resend
    if (resend) {
      try {
        // A. Admin Alert Email
        const adminEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f8fafc;">
            <div style="background-color: #0f4c81; color: white; padding: 15px; border-radius: 6px; text-align: center;">
              <h2 style="margin: 0; font-size: 20px;">New Consultation Request Received</h2>
              <p style="margin: 5px 0 0 0; font-size: 13px;">Classified Priority: <strong>${classification}</strong></p>
            </div>
            <div style="padding: 20px 10px; color: #1e293b; line-height: 1.6;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #475569;">Company Name:</td>
                  <td style="padding: 8px 0; font-weight: bold;">${validated.company}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Contact Name:</td>
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
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Original Service:</td>
                  <td style="padding: 8px 0;">${validated.service}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Project Budget:</td>
                  <td style="padding: 8px 0; color: #059669; font-weight: bold;">${validated.budget}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Project Timeline:</td>
                  <td style="padding: 8px 0; color: #d97706; font-weight: bold;">${validated.timeline}</td>
                </tr>
              </table>
              <div style="background-color: white; border: 1px solid #cbd5e1; border-radius: 6px; padding: 15px; margin-top: 10px; white-space: pre-wrap;">
                <strong>Project Description:</strong><br/>
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
          subject: `[Consultation Booked] ${validated.company} - ${classification}`,
          html: adminEmailHtml,
        });

        // B. User Confirmation Email
        const isSpanish = validated.locale === 'es';
        const userSubject = isSpanish
          ? 'Confirmación de solicitud de consulta - HyperCode'
          : 'Consultation Request Confirmed - HyperCode';

        const userEmailHtml = isSpanish ? `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <div style="text-align: center; padding-bottom: 20px;">
              <h2 style="color: #0f4c81; margin: 0;">HyperCode</h2>
              <p style="color: #64748b; font-size: 14px; margin: 5px 0 0 0;">Soluciones de Datos, Tecnología y Talento</p>
            </div>
            <div style="color: #1e293b; line-height: 1.6; border-top: 1px solid #e2e8f0; padding-top: 20px;">
              <p>Hola <strong>${validated.name}</strong>,</p>
              <p>Gracias por solicitar una consulta técnica con HyperCode.</p>
              <p>Hemos recibido sus requisitos para el servicio de <strong>"${classification}"</strong>. Un Director de Soluciones Técnicas revisará su descripción y preparará un análisis inicial del alcance de su proyecto.</p>
              <p>Nos pondremos en contacto con usted en un plazo de 24 horas hábiles para coordinar una reunión por videoconferencia.</p>
              <div style="margin: 20px 0; padding: 15px; background-color: #f8fafc; border-radius: 6px; font-size: 13px;">
                <strong>Detalles registrados:</strong><br/>
                • Empresa: ${validated.company}<br/>
                • Presupuesto: ${validated.budget}<br/>
                • Cronograma: ${validated.timeline}
              </div>
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
              <p style="color: #64748b; font-size: 14px; margin: 5px 0 0 0;">Data, Technology, & Talent Solutions</p>
            </div>
            <div style="color: #1e293b; line-height: 1.6; border-top: 1px solid #e2e8f0; padding-top: 20px;">
              <p>Hi <strong>${validated.name}</strong>,</p>
              <p>Thank you for requesting a technical consultation with HyperCode.</p>
              <p>We have successfully registered your request for <strong>"${classification}"</strong> solutions. A Technical Solutions Director is reviewing your scope details and will compile an initial blueprint outline before our call.</p>
              <p>We will contact you within 24 business hours with calendar invites to schedule our videoconference.</p>
              <div style="margin: 20px 0; padding: 15px; background-color: #f8fafc; border-radius: 6px; font-size: 13px;">
                <strong>Logged Parameters:</strong><br/>
                • Company: ${validated.company}<br/>
                • Est. Budget: ${validated.budget}<br/>
                • Timeline: ${validated.timeline}
              </div>
              <p>We look forward to collaborating on this initiative.</p>
              <p>Best regards,</p>
              <p style="margin: 0; font-weight: bold; color: #0f4c81;">HyperCode Consulting Practice</p>
              <p style="margin: 0; font-size: 12px; color: #64748b;">Schaumburg, IL</p>
            </div>
          </div>
        `;

        await resend.emails.send({
          from: 'HyperCode Consulting <onboarding@resend.dev>',
          to: validated.email,
          subject: userSubject,
          html: userEmailHtml,
        });
      } catch (emailErr) {
        console.error('Resend consultation email error:', emailErr);
      }
    }

    return NextResponse.json({ success: true, data: savedData });
  } catch (err) {
    console.error('Consultation route error:', err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
