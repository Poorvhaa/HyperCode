import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';
import { Resend } from 'resend';

// Initialize Resend
const resendApiKey = process.env.RESEND_API_KEY || '';
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const contactRecipient = process.env.HYPERCODE_CONTACT_EMAIL || 'HR@hypercodeus.com';

export async function POST(req: Request) {
  console.log('\n========================================');
  console.log('[Careers API] Incoming career application submission.');
  console.log('========================================');

  try {
    // 1. Check Supabase client initialization
    const supabaseServer = getSupabaseServer();
    if (!supabaseServer) {
      console.error('[Careers API] ERROR: Supabase server client could not be initialized.');
      return NextResponse.json({ error: 'Supabase client initialization failed' }, { status: 500 });
    }
    console.log('[Careers API] Supabase server client initialized successfully.');

    // 4. Parse Form Data
    console.log('[Careers API] Parsing request form data...');
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = (formData.get('phone') as string) || '';
    const linkedin = (formData.get('linkedin') as string) || '';
    const position = formData.get('position') as string;
    const yearsExperienceStr = (formData.get('yearsExperience') as string) || '0';
    const skills = (formData.get('skills') as string) || '';
    const message = (formData.get('message') as string) || '';
    const locale = (formData.get('locale') as string) || 'en';
    const resumeFile = formData.get('resume') as File | null;

    console.log(`[Careers API] Form fields parsed: name="${name}", email="${email}", position="${position}", yearsExperience="${yearsExperienceStr}", skills="${skills}"`);

    // Validate fields
    if (!name || !email || !position || !resumeFile) {
      console.error('[Careers API] ERROR: Missing required fields: name, email, position, or resume.');
      return NextResponse.json({ error: 'Missing required fields: name, email, position, and resume are required.' }, { status: 400 });
    }

    const yearsExperience = parseInt(yearsExperienceStr, 10) || 0;

    // Validate file type & size (max 5MB)
    console.log(`[Careers API] Validating resume file: name="${resumeFile.name}", type="${resumeFile.type}", size=${resumeFile.size} bytes`);
    const allowedMimeTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
      'application/msword', // doc
    ];

    if (!allowedMimeTypes.includes(resumeFile.type)) {
      console.error(`[Careers API] ERROR: Invalid file type "${resumeFile.type}"`);
      return NextResponse.json({ error: 'Invalid file format. Only PDF and Word (.doc/.docx) files are accepted.' }, { status: 400 });
    }

    if (resumeFile.size > 5 * 1024 * 1024) {
      console.error(`[Careers API] ERROR: File size ${resumeFile.size} bytes exceeds the 5MB limit.`);
      return NextResponse.json({ error: 'File too large. Maximum resume size is 5MB.' }, { status: 400 });
    }

    // 5. Upload File to Storage
    const fileExt = resumeFile.name.split('.').pop() || 'pdf';
    const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const fileName = `${Date.now()}-${cleanName}-resume.${fileExt}`;

    console.log(`[Careers API] Extracting file arrayBuffer for upload...`);
    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log(`[Careers API] Uploading resume file to bucket "resumes" as "${fileName}"...`);
    const { data: uploadData, error: uploadError } = await supabaseServer.storage
      .from('resumes')
      .upload(fileName, buffer, {
        contentType: resumeFile.type,
        upsert: true,
      });

    if (uploadError) {
      console.error('[Careers API] ERROR: Supabase storage upload failed:', uploadError);
      return NextResponse.json({ error: `Supabase Storage upload failed: ${uploadError.message}` }, { status: 500 });
    }
    console.log('[Careers API] SUCCESS: File uploaded successfully. Data:', uploadData);

    // Get public URL
    console.log('[Careers API] Fetching public URL for the uploaded file...');
    const { data: urlData } = supabaseServer.storage.from('resumes').getPublicUrl(fileName);
    const resumeUrl = urlData?.publicUrl || '';
    console.log('[Careers API] Resume public URL:', resumeUrl);

    // 6. Save Application & Candidate Profile to DB
    console.log('[Careers API] Saving job application to "job_applications" table...');
    const { data: appData, error: appError } = await supabaseServer
      .from('job_applications')
      .insert([{
        name,
        email,
        phone,
        linkedin,
        resume_url: resumeUrl,
        position,
        years_experience: yearsExperience,
        skills,
        message,
        status: 'New'
      }])
      .select()
      .single();

    if (appError) {
      console.error('[Careers API] ERROR: Database save failed for job_applications:', appError);
      return NextResponse.json({ error: `Database save failed for job_applications: ${appError.message}` }, { status: 500 });
    }
    console.log('[Careers API] SUCCESS: Application saved successfully. ID:', appData.id);

    console.log('[Careers API] Saving candidate profile to "candidates" table...');
    const { data: candData, error: candError } = await supabaseServer
      .from('candidates')
      .insert([{
        name,
        email,
        phone,
        linkedin,
        resume_url: resumeUrl,
        skills,
        experience: `${yearsExperience} years`,
        availability: 'Available',
        location: 'Remote / US',
        status: 'Available'
      }])
      .select()
      .single();

    if (candError) {
      console.error('[Careers API] WARNING: Candidates talent pool insert failed:', candError);
      // We do not fail the request if the candidate pool insertion fails, as the core application has succeeded.
    } else {
      console.log('[Careers API] SUCCESS: Candidate pool profile created. ID:', candData.id);
    }

    // 7. Trigger Email Notifications via Resend
    if (resend) {
      console.log('[Careers API] Resend configured. Preparing notification emails...');
      try {
        // A. Recruiter Alert Email
        const adminEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f8fafc;">
            <div style="background-color: #0f4c81; color: white; padding: 15px; border-radius: 6px; text-align: center;">
              <h2 style="margin: 0; font-size: 20px;">New Candidate Application</h2>
              <p style="margin: 5px 0 0 0; font-size: 13px;">Position: <strong>${position}</strong></p>
            </div>
            <div style="padding: 20px 10px; color: #1e293b; line-height: 1.6;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #475569;">Candidate Name:</td>
                  <td style="padding: 8px 0; font-weight: bold;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone:</td>
                  <td style="padding: 8px 0;">${phone || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">LinkedIn:</td>
                  <td style="padding: 8px 0;">${linkedin ? `<a href="${linkedin}" target="_blank">${linkedin}</a>` : 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Experience:</td>
                  <td style="padding: 8px 0;">${yearsExperience} years</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Primary Skills:</td>
                  <td style="padding: 8px 0; font-weight: bold; color: #0f4c81;">${skills || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #475569;">Resume File:</td>
                  <td style="padding: 8px 0;"><a href="${resumeUrl}" target="_blank" style="background-color: #0f4c81; color: white; padding: 4px 10px; text-decoration: none; border-radius: 4px; font-size: 11px; font-weight: bold;">Download Resume</a></td>
                </tr>
              </table>
              <div style="background-color: white; border: 1px solid #cbd5e1; border-radius: 6px; padding: 15px; margin-top: 10px; white-space: pre-wrap;">
                <strong>Cover Message:</strong><br/>
                ${message || 'No cover message submitted.'}
              </div>
            </div>
            <div style="text-align: center; font-size: 11px; color: #94a3b8; margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
              This is an automated alert from the HyperCode Recruitment System.
            </div>
          </div>
        `;

        // B. Candidate Confirmation Email
        const isSpanish = locale === 'es';
        const userSubject = isSpanish
          ? 'Hemos recibido su solicitud de empleo - HyperCode'
          : 'Application Received - HyperCode';

        const userEmailHtml = isSpanish ? `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <div style="text-align: center; padding-bottom: 20px;">
              <h2 style="color: #0f4c81; margin: 0;">HyperCode</h2>
              <p style="color: #64748b; font-size: 14px; margin: 5px 0 0 0;">Soluciones de Datos, Tecnología y Talento</p>
            </div>
            <div style="color: #1e293b; line-height: 1.6; border-top: 1px solid #e2e8f0; padding-top: 20px;">
              <p>Hola <strong>${name}</strong>,</p>
              <p>Gracias por postularse para la vacante de <strong>"${position}"</strong> en HyperCode.</p>
              <p>Confirmamos que hemos recibido sus detalles y su currículum correctamente. Nuestro equipo de adquisición de talento técnico revisará su perfil, habilidades y años de experiencia para evaluar la compatibilidad con las necesidades de nuestros clientes.</p>
              <p>Si su perfil coincide con la vacante, un reclutador de HyperCode se pondrá en contacto con usted en un plazo de 3 a 5 días hábiles para programar una llamada de preselección inicial.</p>
              <div style="margin: 20px 0; padding: 15px; background-color: #f8fafc; border-radius: 6px; font-size: 13px; color: #475569;">
                <strong>Detalles de su postulación:</strong><br/>
                • Posición: ${position}<br/>
                • Experiencia: ${yearsExperience} años<br/>
                • Currículum: <a href="${resumeUrl}" target="_blank">Ver Archivo Cargado</a>
              </div>
              <p>Agradecemos su interés en formar parte de nuestro equipo de ingeniería.</p>
              <p>Atentamente,</p>
              <p style="margin: 0; font-weight: bold; color: #0f4c81;">Adquisición de Talento de HyperCode</p>
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
              <p>Hi <strong>${name}</strong>,</p>
              <p>Thank you for applying for the <strong>"${position}"</strong> position at HyperCode.</p>
              <p>We confirm that we have successfully received your candidate profile and resume. Our technical recruitment team will review your credentials, core skills, and background mapping against this role.</p>
              <p>If your background matches our clients' requirements, a HyperCode recruiter will reach out within 3 to 5 business days to coordinate a screening call.</p>
              <div style="margin: 20px 0; padding: 15px; background-color: #f8fafc; border-radius: 6px; font-size: 13px; color: #475569;">
                <strong>Application Highlights:</strong><br/>
                • Position: ${position}<br/>
                • Experience: ${yearsExperience} years<br/>
                • Resume: <a href="${resumeUrl}" target="_blank">View Uploaded File</a>
              </div>
              <p>We appreciate your interest in building your career with HyperCode.</p>
              <p>Best regards,</p>
              <p style="margin: 0; font-weight: bold; color: #0f4c81;">HyperCode Talent Acquisition Squad</p>
              <p style="margin: 0; font-size: 12px; color: #64748b;">Schaumburg, IL</p>
            </div>
          </div>
        `;

        console.log('[Careers API] Sending recruiter and candidate notification emails in parallel...');
        await Promise.all([
          resend.emails.send({
            from: 'HyperCode Careers <HR@hypercodeus.com>',
            to: contactRecipient,
            subject: `[Applicant Alert] New Application: ${name} - ${position}`,
            html: adminEmailHtml,
          }),
          resend.emails.send({
            from: 'HyperCode Careers <HR@hypercodeus.com>>',
            to: email,
            subject: userSubject,
            html: userEmailHtml,
          })
        ]);
        console.log('[Careers API] Recruiter alert email sent to:', contactRecipient);
        console.log('[Careers API] Candidate confirmation email sent to:', email);
      } catch (emailErr) {
        console.error('[Careers API] ERROR: Resend careers email failed:', emailErr);
      }
    } else {
      console.log('[Careers API] Resend not configured. Skipping email notifications.');
    }

    console.log('[Careers API] E2E Careers Application Workflow Completed Successfully.');
    return NextResponse.json({ success: true, data: appData });
  } catch (err: any) {
    console.error('[Careers API] CRITICAL: Unexpected route error:', err);
    return NextResponse.json({ error: `Internal server error: ${err.message || err}` }, { status: 500 });
  }
}
