'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocale } from 'next-intl';
import { Loader2, Upload, FileText, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';

interface CareersFormProps {
  initialPosition?: string;
}

const formTranslations = {
  en: {
    fullName: "Full Name",
    emailAddress: "Email Address",
    phoneNumber: "Phone Number",
    linkedinUrl: "LinkedIn Profile URL (Optional)",
    positionApplied: "Applying For",
    yearsExp: "Years of Professional Experience",
    skills: "Primary Technical Skills (comma separated)",
    skillsPlaceholder: "e.g. SQL, Python, Snowflake, Power BI",
    coverLetter: "Cover Letter / Additional Information",
    coverLetterPlaceholder: "Tell us about your technical background and why you want to join HyperCode...",
    resumeUpload: "Resume Upload",
    resumeDesc: "Drag & drop or click to upload your resume (PDF, DOC, DOCX up to 5MB)",
    selectedFile: "Selected File",
    submitting: "Submitting Application...",
    submitBtn: "Submit Application",
    successTitle: "Application Submitted Successfully!",
    successText: "Thank you for applying to HyperCode. Our talent acquisition squad has received your resume and credentials. We will review your profile and follow up with you within 3-5 business days.",
    fileFormatError: "Invalid file format. Please upload a PDF, DOC, or DOCX document.",
    fileSizeError: "File too large. Maximum resume size is 5MB.",
    nameError: "Name must be at least 2 characters.",
    emailError: "Please enter a valid email address.",
    positionError: "Please enter the position.",
    skillsError: "Please list your primary skills.",
    messageError: "Message must be at least 10 characters.",
    yearsError: "Please enter your years of experience.",
    requiredResume: "Please upload your resume.",
    errorSubmit: "An error occurred during submission. Please try again.",
    backToCareers: "Back to Careers"
  },
  es: {
    fullName: "Nombre Completo",
    emailAddress: "Correo Electrónico",
    phoneNumber: "Número de Teléfono",
    linkedinUrl: "URL del Perfil de LinkedIn (Opcional)",
    positionApplied: "Postulando para",
    yearsExp: "Años de Experiencia Profesional",
    skills: "Habilidades Técnicas Principales (separadas por comas)",
    skillsPlaceholder: "ej. SQL, Python, Snowflake, Power BI",
    coverLetter: "Carta de Presentación / Información Adicional",
    coverLetterPlaceholder: "Cuéntenos sobre su perfil técnico y por qué desea unirse a HyperCode...",
    resumeUpload: "Subir Currículum",
    resumeDesc: "Arrastre y suelte o haga clic para subir su currículum (PDF, DOC, DOCX hasta 5MB)",
    selectedFile: "Archivo Seleccionado",
    submitting: "Enviando Postulación...",
    submitBtn: "Enviar Postulación",
    successTitle: "¡Postulación Enviada con Éxito!",
    successText: "Gracias por postularse en HyperCode. Nuestro equipo de adquisición de talento ha recibido su currículum y credenciales. Revisaremos su perfil y nos comunicaremos con usted en un plazo de 3 a 5 días hábiles.",
    fileFormatError: "Formato de archivo inválido. Por favor suba un documento PDF, DOC o DOCX.",
    fileSizeError: "Archivo demasiado grande. El tamaño máximo del currículum es de 5MB.",
    nameError: "El nombre debe tener al menos 2 caracteres.",
    emailError: "Por favor introduzca un correo válido.",
    positionError: "Por favor introduzca el puesto.",
    skillsError: "Por favor indique sus habilidades clave.",
    messageError: "El mensaje debe tener al menos 10 caracteres.",
    yearsError: "Por favor introduzca los años de experiencia.",
    requiredResume: "Por favor suba su currículum.",
    errorSubmit: "Ocurrió un error en el envío. Intente de nuevo.",
    backToCareers: "Volver a Carreras"
  }
};

const jobPositions = [
  'Business Development Manager'
];

export function CareersForm({ initialPosition }: CareersFormProps) {
  const locale = useLocale() as 'en' | 'es';
  const t = formTranslations[locale] || formTranslations.en;

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fileError, setFileError] = useState('');
  const [submitError, setSubmitError] = useState('');
  
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form Validation Schema
  const schema = z.object({
    name: z.string().min(2, t.nameError),
    email: z.string().email(t.emailError),
    phone: z.string().optional(),
    linkedin: z.string().url().or(z.string().length(0)).optional(),
    position: z.string().min(1, t.positionError),
    yearsExperience: z.number().min(0, t.yearsError),
    skills: z.string().min(2, t.skillsError),
    message: z.string().min(10, t.messageError),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      position: 'Business Development Manager',
      yearsExperience: 0,
      skills: '',
      message: '',
    }
  });

  // Handle Drag & Drop Events
  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const validateAndSetFile = (file: File) => {
    setFileError('');
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];

    if (!allowedTypes.includes(file.type)) {
      setFileError(t.fileFormatError);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError(t.fileSizeError);
      return;
    }

    setResumeFile(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setResumeFile(null);
    setFileError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!resumeFile) {
      setFileError(t.requiredResume);
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      const payload = new FormData();
      payload.append('name', data.name);
      payload.append('email', data.email);
      payload.append('phone', data.phone || '');
      payload.append('linkedin', data.linkedin || '');
      payload.append('position', data.position);
      payload.append('yearsExperience', String(data.yearsExperience));
      payload.append('skills', data.skills);
      payload.append('message', data.message);
      payload.append('locale', locale);
      payload.append('resume', resumeFile);

      const res = await fetch('/api/careers', {
        method: 'POST',
        body: payload,
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || t.errorSubmit);
      }

      setSubmitted(true);
      reset();
      setResumeFile(null);

      // If Supabase fails or doesn't exist, we save to localstorage too for visual testing
      const isConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
      if (!isConfigured) {
        const currentApps = JSON.parse(localStorage.getItem('hypercode_db_job_applications') || '[]');
        currentApps.push({
          id: 'local-' + Math.random().toString(36).substring(2, 9),
          name: data.name,
          email: data.email,
          phone: data.phone,
          linkedin: data.linkedin,
          resume_url: 'https://mock.hypercode.com/resumes/' + resumeFile.name,
          position: data.position,
          years_experience: data.yearsExperience,
          skills: data.skills,
          message: data.message,
          status: 'New',
          created_at: new Date().toISOString()
        });
        localStorage.setItem('hypercode_db_job_applications', JSON.stringify(currentApps));

        // Sync candidate pool
        const currentCands = JSON.parse(localStorage.getItem('hypercode_db_candidates') || '[]');
        currentCands.push({
          id: 'local-' + Math.random().toString(36).substring(2, 9),
          name: data.name,
          email: data.email,
          phone: data.phone,
          linkedin: data.linkedin,
          resume_url: 'https://mock.hypercode.com/resumes/' + resumeFile.name,
          skills: data.skills,
          experience: `${data.yearsExperience} years`,
          availability: 'Available',
          location: 'Remote / US',
          status: 'Available',
          created_at: new Date().toISOString()
        });
        localStorage.setItem('hypercode_db_candidates', JSON.stringify(currentCands));
      }
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || t.errorSubmit);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="space-y-8 max-w-xl mx-auto text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 border border-green-200 text-green-600 mb-4">
          <CheckCircle size={36} />
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-extrabold text-slate-900">{t.successTitle}</h3>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto">
            {t.successText}
          </p>
        </div>
        <div className="pt-6">
          <button
            onClick={() => setSubmitted(false)}
            className="inline-flex h-11 px-6 items-center justify-center bg-[#0F4C81] text-white font-semibold text-xs rounded-xl hover:bg-[#0c3c66] transition-colors cursor-pointer border-none"
          >
            {t.backToCareers}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left max-w-3xl mx-auto bg-white p-6 sm:p-10 border border-slate-200 rounded-3xl shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {submitError && (
          <div className="p-4 rounded-xl border border-red-200 bg-red-50 flex gap-3">
            <AlertCircle size={20} className="text-red-655 flex-shrink-0 mt-0.5" />
            <p className="text-red-800 text-sm">{submitError}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">{t.fullName}</label>
            <input
              {...register('name')}
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm"
            />
            {errors.name && <p className="text-xs text-red-655 font-semibold">{errors.name.message}</p>}
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">{t.emailAddress}</label>
            <input
              {...register('email')}
              type="email"
              placeholder="john@company.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm"
            />
            {errors.email && <p className="text-xs text-red-655 font-semibold">{errors.email.message}</p>}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">{t.phoneNumber}</label>
            <input
              {...register('phone')}
              type="tel"
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm"
            />
            {errors.phone && <p className="text-xs text-red-655 font-semibold">{errors.phone.message}</p>}
          </div>

          {/* LinkedIn URL */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">{t.linkedinUrl}</label>
            <input
              {...register('linkedin')}
              type="text"
              placeholder="https://linkedin.com/in/username"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm"
            />
            {errors.linkedin && <p className="text-xs text-red-655 font-semibold">{errors.linkedin.message}</p>}
          </div>

          {/* Position Applied For */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">{t.positionApplied}</label>
            <div className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-bold shadow-sm select-none">
              Business Development Manager
            </div>
            <input type="hidden" {...register('position')} value="Business Development Manager" />
          </div>

          {/* Years of Experience */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">{t.yearsExp}</label>
            <input
              {...register('yearsExperience', { valueAsNumber: true })}
              type="number"
              min="0"
              placeholder="5"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm"
            />
            {errors.yearsExperience && <p className="text-xs text-red-655 font-semibold">{errors.yearsExperience.message}</p>}
          </div>

          {/* Core Technical Skills */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-semibold text-slate-700">{t.skills}</label>
            <input
              {...register('skills')}
              type="text"
              placeholder={t.skillsPlaceholder}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm"
            />
            {errors.skills && <p className="text-xs text-red-655 font-semibold">{errors.skills.message}</p>}
          </div>

          {/* Cover Message */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-semibold text-slate-700">{t.coverLetter}</label>
            <textarea
              {...register('message')}
              placeholder={t.coverLetterPlaceholder}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm resize-none"
            />
            {errors.message && <p className="text-xs text-red-655 font-semibold">{errors.message.message}</p>}
          </div>

          {/* File Upload Zone */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-semibold text-slate-700">{t.resumeUpload}</label>
            
            {!resumeFile ? (
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`w-full p-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                  isDragActive 
                    ? 'border-[#0F4C81] bg-[#0F4C81]/5 text-[#0F4C81]' 
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-500'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />
                <Upload size={28} className={isDragActive ? 'animate-bounce text-[#0F4C81]' : 'text-slate-400'} />
                <p className="text-xs font-semibold text-slate-700 text-center">{t.resumeDesc}</p>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 rounded-xl border border-[#0F4C81]/20 bg-[#0F4C81]/5 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#0F4C81]/15 flex items-center justify-center text-[#0F4C81]">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 truncate max-w-[200px] sm:max-w-[400px]">
                      {resumeFile.name}
                    </p>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase">
                      {(resumeFile.size / 1024).toFixed(0)} KB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-2 text-slate-400 hover:text-red-550 transition-colors cursor-pointer border-none bg-transparent"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
            
            {fileError && <p className="text-xs text-red-655 font-semibold mt-1">{fileError}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full h-12 flex items-center justify-center bg-[#0F4C81] text-white font-semibold text-sm rounded-xl hover:bg-[#0c3c66] transition-colors duration-200 shadow-sm disabled:opacity-75 disabled:cursor-not-allowed gap-2 cursor-pointer border-none"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>{t.submitting}</span>
            </>
          ) : (
            <span>{t.submitBtn}</span>
          )}
        </button>
      </form>
    </div>
  );
}
