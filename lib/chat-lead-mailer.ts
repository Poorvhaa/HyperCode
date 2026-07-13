import { getSupabaseServer } from '@/lib/supabase-server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || '';
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const contactRecipient = process.env.HYPERCODE_CONTACT_EMAIL || 'HR@hypercodeus.com';
const resendFromEmail =
  process.env.RESEND_FROM_EMAIL ||
  'HyperCode <HR@hypercodeit.com>';

interface LeadInput {
  conversation_id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  industry: string;
  service_interest: string;
  budget_range: string;
  timeline: string;
  message?: string;
  language: 'en' | 'es';
}

function calculateLeadScore(
  company: string,
  industry: string,
  email: string,
  budgetRange: string,
  timeline: string
): number {
  let score = 0;

  // 1. Budget Range Scoring
  const budget = budgetRange.toLowerCase();
  if (budget.includes('50k+') || budget.includes('250k') || budget.includes('enterprise')) {
    score += 45;
  } else if (budget.includes('25k') || budget.includes('100k') || budget.includes('50k')) {
    score += 35;
  } else if (budget.includes('10k') || budget.includes('25k')) {
    score += 25;
  } else if (budget.includes('5k') || budget.includes('10k')) {
    score += 15;
  } else {
    score += 5;
  }

  // 2. Timeline Scoring
  const time = timeline.toLowerCase();
  if (time.includes('immediate') || time.includes('urgent') || time.includes('1 month')) {
    score += 30;
  } else if (time.includes('1-3 months') || time.includes('3 months')) {
    score += 20;
  } else if (time.includes('3-6 months')) {
    score += 10;
  } else {
    score += 5;
  }

  // 3. Industry & Enterprise Indicator
  const ind = industry.toLowerCase();
  const comp = company.toLowerCase();
  const corporateKeywords = ['enterprise', 'inc', 'corp', 'corporation', 'healthcare', 'financial', 'bank', 'retail', 'tech'];
  const matchesCorporate = corporateKeywords.some(kw => ind.includes(kw) || comp.includes(kw));
  
  if (matchesCorporate || ind.includes('enterprise')) {
    score += 15;
  } else if (comp.length > 2) {
    score += 5;
  }

  // 4. Corporate Email check
  const freeEmailProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com', 'icloud.com', 'aol.com', 'mail.com'];
  const emailDomain = email.split('@')[1]?.toLowerCase() || '';
  const isFreeEmail = freeEmailProviders.includes(emailDomain);
  
  if (emailDomain && !isFreeEmail) {
    score += 15;
  }

  return score;
}

export async function submitChatLead(lead: LeadInput) {
  const name = lead.name.trim();
  const email = lead.email.trim();
  const phone = lead.phone ? lead.phone.trim() : '';
  const company = lead.company.trim();
  const industry = lead.industry.trim();
  const serviceInterest = lead.service_interest.trim();
  const budgetRange = lead.budget_range.trim();
  const timeline = lead.timeline.trim();
  const message = lead.message ? lead.message.trim() : '';
  const language = lead.language;

  const leadScore = calculateLeadScore(company, industry, email, budgetRange, timeline);

  // 1. Save to Supabase (using server-only client, throwing on failure)
  const supabase = getSupabaseServer();
  if (!supabase) {
    console.error('[Chat Lead Mailer] Supabase server configuration is missing.');
    throw new Error('Database service unavailable: Supabase client is not configured.');
  }

  const { data: savedLead, error: saveError } = await supabase
    .from('chat_leads')
    .insert([{
      conversation_id: lead.conversation_id,
      name,
      email,
      phone: phone || null,
      company,
      industry,
      service_interest: serviceInterest,
      budget_range: budgetRange,
      timeline,
      message: message || null,
      lead_score: leadScore,
      language
    }])
    .select()
    .single();

  if (saveError || !savedLead) {
    console.error('[Chat Lead Mailer] Database save failed:', saveError);
    throw new Error(saveError?.message || 'Database insert failed for chat_leads');
  }

  // Update conversation
  const { error: updateError } = await supabase
    .from('chat_conversations')
    .update({
      visitor_name: name,
      visitor_email: email,
      updated_at: new Date().toISOString()
    })
    .eq('id', lead.conversation_id);

  if (updateError) {
    console.warn('[Chat Lead Mailer] Conversation visitor info update failed:', updateError);
  }

  // 2. Dispatch Emails via Resend
  let adminEmailSent = false;
  let userEmailSent = false;

  if (resend) {
    try {
      // Admin Alert Email HTML
      const adminEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f8fafc;">
          <div style="background-color: #0F4C81; color: white; padding: 15px; border-radius: 6px; text-align: center;">
            <h2 style="margin: 0; font-size: 20px;">New Lead via Enterprise AI Consultant</h2>
            <p style="margin: 5px 0 0 0; font-size: 13px;">Service Interest: <strong>${serviceInterest}</strong></p>
          </div>
          <div style="padding: 20px 10px; color: #1e293b; line-height: 1.6;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #475569;">Company Name:</td>
                <td style="padding: 8px 0; font-weight: bold;">${company}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Contact Name:</td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email Address:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone Number:</td>
                <td style="padding: 8px 0;">${phone || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Industry:</td>
                <td style="padding: 8px 0;">${industry}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Budget Range:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #059669;">${budgetRange}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Timeline Target:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #2563eb;">${timeline}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Lead Priority Score:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #d97706;">${leadScore} / 105</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Language:</td>
                <td style="padding: 8px 0; text-transform: uppercase;">${language}</td>
              </tr>
            </table>
            <div style="background-color: white; border: 1px solid #cbd5e1; border-radius: 6px; padding: 15px; margin-top: 10px; white-space: pre-wrap;">
              <strong>Project Description & Context:</strong><br/>
              ${message || 'No description provided.'}
            </div>
          </div>
          <div style="text-align: center; font-size: 11px; color: #94a3b8; margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
            This is an automated alert from the HyperCode AI Consultant platform.
          </div>
        </div>
      `;

      try {
        const { data: adminEmailData, error: adminEmailError } = await resend.emails.send({
          from: resendFromEmail,
          to: contactRecipient,
          replyTo: email,
          subject: `[AI Consultant Lead] ${company} - ${serviceInterest}`,
          html: adminEmailHtml,
        });

        if (adminEmailError) {
          console.error('[Chat Lead Mailer] Admin email failed:', {
            name: adminEmailError.name,
            message: adminEmailError.message
          });
        } else {
          adminEmailSent = true;
          console.log('[Chat Lead Mailer] Admin email sent successfully.');
        }
      } catch (adminErr) {
        console.error('[Chat Lead Mailer] Admin email exception:', adminErr);
      }

      // Visitor Confirmation Email
      const isSpanish = language === 'es';
      const userSubject = isSpanish
        ? 'Hemos recibido los detalles de su proyecto - HyperCode'
        : 'Project Blueprint Scoping Request Confirmed - HyperCode';

      const userEmailHtml = isSpanish ? `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <div style="text-align: center; padding-bottom: 20px;">
            <h2 style="color: #0f4c81; margin: 0;">HyperCode</h2>
            <p style="color: #64748b; font-size: 14px; margin: 5px 0 0 0;">Soluciones de Transformación Digital</p>
          </div>
          <div style="color: #1e293b; line-height: 1.6; border-top: 1px solid #e2e8f0; padding-top: 20px;">
            <p>Estimado/a <strong>${name}</strong>,</p>
            <p>Gracias por interactuar con nuestro Consultor de IA de HyperCode para calificar los requisitos de su proyecto.</p>
            <p>Hemos registrado con éxito sus detalles de interés para <strong>"${serviceInterest}"</strong>. Un Director de Soluciones de HyperCode está evaluando sus necesidades técnicas y comerciales para preparar su propuesta de blueprint.</p>
            <div style="margin: 20px 0; padding: 15px; background-color: #f8fafc; border-radius: 6px; font-size: 13px;">
              <strong>Resumen de Calificación del Proyecto:</strong><br/>
              • Empresa: ${company}<br/>
              • Rango de Presupuesto: ${budgetRange}<br/>
              • Plazo Estimado: ${timeline}<br/>
              • Enfoque de Servicio: ${serviceInterest}
            </div>
            <p>Un consultor senior se pondrá en contacto con usted en un plazo de 24 horas hábiles para coordinar los siguientes pasos.</p>
            <p>Esperamos colaborar con usted para impulsar sus objetivos tecnológicos.</p>
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
            <p>Dear <strong>${name}</strong>,</p>
            <p>Thank you for consulting with HyperCode's Enterprise AI Advisor to qualify your project requirements.</p>
            <p>We have successfully logged your project specifications for <strong>"${serviceInterest}"</strong>. A Solutions Director is currently auditing your target parameters to outline an initial architectural blueprint.</p>
            <div style="margin: 20px 0; padding: 15px; background-color: #f8fafc; border-radius: 6px; font-size: 13px;">
              <strong>Project Scoping Summary:</strong><br/>
              • Company: ${company}<br/>
              • Budget Range: ${budgetRange}<br/>
              • Targeted Timeline: ${timeline}<br/>
              • Practice Focus: ${serviceInterest}
            </div>
            <p>Expect a senior practice partner to contact you within 24 business hours to share our initial findings.</p>
            <p>We look forward to partnering on this digital initiative.</p>
            <p>Best regards,</p>
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
          console.error('[Chat Lead Mailer] Confirmation email failed:', {
            name: userEmailError.name,
            message: userEmailError.message
          });
        } else {
          userEmailSent = true;
          console.log('[Chat Lead Mailer] Confirmation email sent successfully.');
        }
      } catch (userErr) {
        console.error('[Chat Lead Mailer] Confirmation email exception:', userErr);
      }
    } catch (emailErr) {
      console.error('[Resend Error] Failed to send chat lead emails:', emailErr);
    }
  }

  return {
    ...savedLead,
    adminEmailSent,
    userEmailSent
  };
}
