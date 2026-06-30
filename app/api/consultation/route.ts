import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
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
    const validated = consultationSchema.parse(body);

    // Save to Supabase using db client
    const savedData = await db.saveConsultationRequest(
      validated.name,
      validated.company,
      validated.email,
      validated.phone,
      validated.service,
      validated.budget,
      validated.timeline,
      validated.message,
      {
        business_goal: validated.businessGoal,
        current_challenges: validated.currentChallenges,
        expected_outcome: validated.expectedOutcome,
        preferred_services: validated.preferredServices,
        industry: validated.industry,
        company_size: validated.companySize,
        current_tech_stack: validated.currentTechStack,
        preferred_meeting_type: validated.preferredMeetingType
      }
    );

    // Send Emails via Resend
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

        await resend.emails.send({
          from: 'HyperCode Platform <onboarding@resend.dev>',
          to: contactRecipient,
          subject: `[Consultation Intake] New Request from ${validated.company}`,
          html: adminEmailHtml,
        });

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

        await resend.emails.send({
          from: 'HyperCode Team <onboarding@resend.dev>',
          to: validated.email,
          subject: clientSubject,
          html: clientEmailHtml,
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
