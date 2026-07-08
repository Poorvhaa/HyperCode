'use client';

import { useState, useEffect, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle, CheckCircle, Check } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { db } from '@/lib/db';
import { trackGAEvent } from '@/lib/analytics';
import { motion } from 'framer-motion';
import { useFormValidation } from '@/hooks/use-form-validation';
import {
  createNameSchema,
  createEmailSchema,
  createPhoneSchema,
  createCompanySchema,
  createDropdownSchema,
  createTextareaSchema,
  filterPhoneInput,
  sanitizePayload
} from '@/lib/validation';

function ContactFormContent() {
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const { formRef, focusAndScrollToError } = useFormValidation({
    navbarSelector: 'header',
    extraOffset: 24,
  });

  const t = useTranslations('Contact.form');
  const tSubjects = useTranslations('Contact.subjects');
  const tNav = useTranslations('Navigation');
  const tConsult = useTranslations('Consultation');
  const tAi = useTranslations('AIConsultant');
  const locale = useLocale();

  // 1. Service options mapping (translates the 13 categories)
  const serviceOptions = [
    { id: 'AI & Automation', label: tNav('aiAutomation') },
    { id: 'Software Development', label: tNav('softwareDev') },
    { id: 'Web Development', label: tNav('webDev') },
    { id: 'Mobile Development', label: tNav('mobileDev') },
    { id: 'Cloud & DevOps', label: tNav('cloudDevOps') },
    { id: 'IT & Non-IT Talent Solutions', label: tNav('talentSolutions') },
    { id: 'Digital Transformation', label: tNav('digitalTrans') },
    { id: 'Data & Analytics', label: tNav('dataAnalytics') },
    { id: 'Cybersecurity', label: tNav('cybersecurity') },
    { id: 'UI/UX Design', label: tNav('uiUx') },
    { id: 'Digital Marketing', label: tNav('marketing') },
    { id: 'E-commerce', label: tNav('ecommerce') },
    { id: 'Technology Consulting', label: tNav('techConsulting') },
  ];

  // 2. Tech options
  const techOptions = [
    'React/Next.js',
    'TypeScript',
    'Node.js',
    'Python',
    'Power BI',
    'Tableau',
    'AWS',
    'Azure',
    'Google Cloud',
    'Docker/Kubernetes',
    'Shopify',
    'WooCommerce',
    'Salesforce',
    'Security Audits/Pen-Testing'
  ];

  // 3. Subject options (maintained for compatibility)
  const subjectOptions = [
    { id: 'General Inquiry', label: tSubjects('general') },
    { id: 'Custom Development', label: tSubjects('web') },
    { id: 'AI Solutions', label: tSubjects('ai') },
    { id: 'Data Engineering & Analytics', label: tSubjects('data') },
    { id: 'IT & Non-IT Staffing', label: tSubjects('talent') },
    { id: 'Partnership Opportunity', label: tSubjects('partnership') },
    { id: 'Other', label: tSubjects('other') },
  ];

  // Zod Validation Schema
  const contactSchema = z.object({
    name: createNameSchema(
      t('nameError'),
      locale === 'es' ? 'El nombre debe tener 80 caracteres o menos' : 'Name must be 80 characters or less',
      locale === 'es' ? 'El nombre solo puede contener letras, espacios, guiones y apóstrofes' : 'Name must contain only letters, spaces, hyphens, and apostrophes'
    ),
    email: createEmailSchema(t('emailError')),
    company: createCompanySchema(
      t('companyError'),
      locale === 'es' ? 'El nombre de la empresa solo puede contener letras, números, espacios, & y .' : 'Company name must contain only letters, numbers, spaces, &, and .'
    ),
    phone: createPhoneSchema(
      t('phoneError'),
      locale === 'es' ? 'El número de teléfono debe tener entre 7 y 15 dígitos' : 'Phone number must be between 7 and 15 digits'
    ),
    subject: createDropdownSchema(t('subjectError')),
    message: createTextareaSchema(
      locale === 'es' ? 'El mensaje debe tener al menos 20 caracteres' : 'Message must be at least 20 characters',
      locale === 'es' ? 'El mensaje debe tener como máximo 2000 caracteres' : 'Message must be at most 2000 characters'
    ),
    services: z.array(z.string()).default([]),
    industry: createDropdownSchema(t('industryError')),
    companySize: z.string().default(''),
    budget: createDropdownSchema(t('budgetError')),
    timeline: createDropdownSchema(t('timelineError')),
    country: z.string().default(''),
    preferredContactMethod: z.string().default('Email'),
    projectType: z.string().default(''),
    requiredTechnologies: z.array(z.string()).default([]),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, touchedFields, isValid },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema) as any,
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      subject: 'General Inquiry',
      message: '',
      services: [],
      industry: '',
      companySize: '',
      budget: '',
      timeline: '',
      country: '',
      preferredContactMethod: 'Email',
      projectType: '',
      requiredTechnologies: [],
    },
  });

  const selectedServices = watch('services') || [];
  const selectedTech = watch('requiredTechnologies') || [];
  const messageValue = watch('message') || '';

  // URL Query parameter pre-filling
  useEffect(() => {
    const subjectParam = searchParams.get('subject');
    const positionParam = searchParams.get('position');
    const serviceParam = searchParams.get('service');

    if (subjectParam) {
      const matched = subjectOptions.find(s => s.id.toLowerCase() === subjectParam.toLowerCase());
      if (matched) {
        setValue('subject', matched.id);
      }
    } else if (positionParam) {
      setValue('subject', 'IT & Non-IT Staffing');
      setValue('services', ['IT & Non-IT Talent Solutions']);
      setValue('message', `Looking for recruitment assistance regarding position: ${positionParam}.`);
    } else if (serviceParam) {
      const matchedService = serviceOptions.find(opt => opt.id.toLowerCase().includes(serviceParam.toLowerCase()));
      if (matchedService) {
        setValue('services', [matchedService.id]);
        setValue('subject', matchedService.id);
      }
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    setError('');

    // Sanitize payload recursively on client side before posting
    const sanitizedData = sanitizePayload(data);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...sanitizedData,
          source: 'website',
          locale,
        }),
      });

      if (!res.ok) {
        throw new Error('Contact submission API returned an error');
      }

      trackGAEvent({
        action: 'contact_form_submission',
        category: 'Leads',
        label: sanitizedData.subject,
      });

      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(t('errorSubmit'));
      console.error('Contact form error:', err);
      // Fallback save in offline / fallback database modes
      try {
        await db.saveContactInquiry(
          sanitizedData.name,
          sanitizedData.company,
          sanitizedData.email,
          sanitizedData.phone,
          sanitizedData.subject,
          sanitizedData.message,
          'website',
          {
            services: sanitizedData.services,
            industry: sanitizedData.industry,
            company_size: sanitizedData.companySize,
            budget: sanitizedData.budget,
            timeline: sanitizedData.timeline,
            country: sanitizedData.country,
            preferred_contact_method: sanitizedData.preferredContactMethod,
            project_type: sanitizedData.projectType,
            required_technologies: sanitizedData.requiredTechnologies,
          }
        );
      } catch (localErr) {
        console.error('Local fallback contact save failed:', localErr);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const toggleService = (serviceId: string) => {
    const current = [...selectedServices];
    const index = current.indexOf(serviceId);
    if (index === -1) {
      current.push(serviceId);
    } else {
      current.splice(index, 1);
    }
    setValue('services', current, { shouldValidate: true, shouldDirty: true });
  };

  const toggleTech = (tech: string) => {
    const current = [...selectedTech];
    const index = current.indexOf(tech);
    if (index === -1) {
      current.push(tech);
    } else {
      current.splice(index, 1);
    }
    setValue('requiredTechnologies', current, { shouldValidate: true, shouldDirty: true });
  };

  const remainingChars = Math.max(0, 2000 - messageValue.trim().length);

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 rounded-2xl border border-green-200 bg-green-50/50 backdrop-blur-md flex gap-4 text-left shadow-lg"
      >
        <CheckCircle size={32} className="text-green-600 flex-shrink-0" />
        <div>
          <h3 className="font-bold text-green-900 text-lg">{t('successTitle')}</h3>
          <p className="text-green-800 text-sm mt-2 leading-relaxed">{t('successText')}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit, (errs) => focusAndScrollToError(errs))}
      className="space-y-8 text-left bg-white/70 backdrop-blur-lg p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-xl"
    >
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex gap-3 text-sm" role="alert">
          <AlertCircle size={20} className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid for Name, Email, Company, Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5" htmlFor="contact-name">{t('name')}</label>
          <div className="relative">
            <input
              id="contact-name"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              {...register('name')}
              className={`w-full h-14 pl-5 pr-11 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 transition-all text-base text-slate-800 placeholder-slate-400 ${
                errors.name
                  ? 'border-red-500 ring-2 ring-red-100 bg-red-50/10'
                  : touchedFields.name
                  ? 'border-green-500 ring-2 ring-green-100 bg-green-50/5'
                  : 'border-slate-200'
              }`}
            />
            {touchedFields.name && !errors.name && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
                <Check size={20} className="stroke-[3px]" />
              </span>
            )}
          </div>
          {errors.name && <span id="name-error" className="text-xs font-semibold text-red-500 mt-1.5 block" role="alert">{errors.name.message}</span>}
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5" htmlFor="contact-email">{t('email')}</label>
          <div className="relative">
            <input
              id="contact-email"
              type="email"
              placeholder="john@company.com"
              autoComplete="email"
              inputMode="email"
              {...register('email')}
              className={`w-full h-14 pl-5 pr-11 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 transition-all text-base text-slate-800 placeholder-slate-400 ${
                errors.email
                  ? 'border-red-500 ring-2 ring-red-100 bg-red-50/10'
                  : touchedFields.email
                  ? 'border-green-500 ring-2 ring-green-100 bg-green-50/5'
                  : 'border-slate-200'
              }`}
            />
            {touchedFields.email && !errors.email && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
                <Check size={20} className="stroke-[3px]" />
              </span>
            )}
          </div>
          {errors.email && <span id="email-error" className="text-xs font-semibold text-red-500 mt-1.5 block" role="alert">{errors.email.message}</span>}
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5" htmlFor="contact-company">{t('company')}</label>
          <div className="relative">
            <input
              id="contact-company"
              type="text"
              placeholder="Enter company name"
              autoComplete="organization"
              {...register('company')}
              className={`w-full h-14 pl-5 pr-11 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 transition-all text-base text-slate-800 placeholder-slate-400 ${
                errors.company
                  ? 'border-red-500 ring-2 ring-red-100 bg-red-50/10'
                  : touchedFields.company
                  ? 'border-green-500 ring-2 ring-green-100 bg-green-50/5'
                  : 'border-slate-200'
              }`}
            />
            {touchedFields.company && !errors.company && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
                <Check size={20} className="stroke-[3px]" />
              </span>
            )}
          </div>
          {errors.company && <span id="company-error" className="text-xs font-semibold text-red-500 mt-1.5 block" role="alert">{errors.company.message}</span>}
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5" htmlFor="contact-phone">{t('phone')}</label>
          <div className="relative">
            <input
              id="contact-phone"
              type="tel"
              placeholder="+1 (555) 012-3456"
              autoComplete="tel"
              inputMode="tel"
              {...register('phone', {
                onChange: (e) => {
                  e.target.value = filterPhoneInput(e.target.value);
                }
              })}
              className={`w-full h-14 pl-5 pr-11 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 transition-all text-base text-slate-800 placeholder-slate-400 ${
                errors.phone
                  ? 'border-red-500 ring-2 ring-red-100 bg-red-50/10'
                  : touchedFields.phone
                  ? 'border-green-500 ring-2 ring-green-100 bg-green-50/5'
                  : 'border-slate-200'
              }`}
            />
            {touchedFields.phone && !errors.phone && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
                <Check size={20} className="stroke-[3px]" />
              </span>
            )}
          </div>
          {errors.phone && <span id="phone-error" className="text-xs font-semibold text-red-500 mt-1.5 block" role="alert">{errors.phone.message}</span>}
        </div>
      </div>

      {/* Multi-Select Services Chips */}
      <div>
        <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-3">{t('services') || 'Services Needed'}</label>
        <div className="flex flex-wrap gap-2.5">
          {serviceOptions.map((opt) => {
            const active = selectedServices.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleService(opt.id)}
                className={`px-4 py-2.5 rounded-full border text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  active
                    ? 'bg-[#0F4C81]/15 border-[#0F4C81] text-[#0F4C81]'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-350 hover:bg-slate-100'
                }`}
              >
                {active && <Check size={14} />}
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid for Select Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5" htmlFor="contact-industry">{t('industry')}</label>
          <div className="relative">
            <select
              id="contact-industry"
              {...register('industry')}
              className={`w-full h-14 pl-5 pr-11 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 transition-all text-base text-slate-800 cursor-pointer ${
                errors.industry
                  ? 'border-red-500 ring-2 ring-red-100 bg-red-50/10'
                  : touchedFields.industry
                  ? 'border-green-500 ring-2 ring-green-100 bg-green-50/5'
                  : 'border-slate-200'
              }`}
            >
              <option value="">-- Select Industry --</option>
              {Object.entries(tAi.raw('industries')).map(([key, val]) => (
                <option key={key} value={val as string}>{val as string}</option>
              ))}
            </select>
            {touchedFields.industry && !errors.industry && (
              <span className="absolute right-8 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none">
                <Check size={20} className="stroke-[3px]" />
              </span>
            )}
          </div>
          {errors.industry && <span id="industry-error" className="text-xs font-semibold text-red-500 mt-1.5 block" role="alert">{errors.industry.message}</span>}
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5" htmlFor="contact-company-size">{t('companySize') || 'Company Size'}</label>
          <select
            id="contact-company-size"
            {...register('companySize')}
            className="w-full h-14 px-5 rounded-[16px] border border-slate-200 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 transition-all text-base text-slate-800 cursor-pointer"
          >
            <option value="">-- Select Size --</option>
            <option value="1-10">1-10 Employees</option>
            <option value="11-50">11-50 Employees</option>
            <option value="51-200">51-200 Employees</option>
            <option value="201-500">201-500 Employees</option>
            <option value="500+">500+ (Enterprise)</option>
          </select>
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5" htmlFor="contact-budget">{t('budget')}</label>
          <div className="relative">
            <select
              id="contact-budget"
              {...register('budget')}
              className={`w-full h-14 pl-5 pr-11 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 transition-all text-base text-slate-800 cursor-pointer ${
                errors.budget
                  ? 'border-red-500 ring-2 ring-red-100 bg-red-50/10'
                  : touchedFields.budget
                  ? 'border-green-500 ring-2 ring-green-100 bg-green-50/5'
                  : 'border-slate-200'
              }`}
            >
              <option value="">-- Select Budget --</option>
              {Object.entries(tConsult.raw('budgets')).map(([key, val]) => (
                <option key={key} value={val as string}>{val as string}</option>
              ))}
            </select>
            {touchedFields.budget && !errors.budget && (
              <span className="absolute right-8 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none">
                <Check size={20} className="stroke-[3px]" />
              </span>
            )}
          </div>
          {errors.budget && <span id="budget-error" className="text-xs font-semibold text-red-500 mt-1.5 block" role="alert">{errors.budget.message}</span>}
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5" htmlFor="contact-timeline">{t('timeline')}</label>
          <div className="relative">
            <select
              id="contact-timeline"
              {...register('timeline')}
              className={`w-full h-14 pl-5 pr-11 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 transition-all text-base text-slate-800 cursor-pointer ${
                errors.timeline
                  ? 'border-red-500 ring-2 ring-red-100 bg-red-50/10'
                  : touchedFields.timeline
                  ? 'border-green-500 ring-2 ring-green-100 bg-green-50/5'
                  : 'border-slate-200'
              }`}
            >
              <option value="">-- Select Timeline --</option>
              {Object.entries(tConsult.raw('timelines')).map(([key, val]) => (
                <option key={key} value={val as string}>{val as string}</option>
              ))}
            </select>
            {touchedFields.timeline && !errors.timeline && (
              <span className="absolute right-8 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none">
                <Check size={20} className="stroke-[3px]" />
              </span>
            )}
          </div>
          {errors.timeline && <span id="timeline-error" className="text-xs font-semibold text-red-500 mt-1.5 block" role="alert">{errors.timeline.message}</span>}
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5" htmlFor="contact-country">{t('country') || 'Country / Region'}</label>
          <input
            id="contact-country"
            type="text"
            placeholder="e.g. United States, United Kingdom"
            {...register('country')}
            className="w-full h-14 px-5 rounded-[16px] border border-slate-200 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 transition-all text-base text-slate-800 placeholder-slate-400"
          />
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5" htmlFor="contact-method">{t('contactMethod') || 'Preferred Contact Method'}</label>
          <select
            id="contact-method"
            {...register('preferredContactMethod')}
            className="w-full h-14 px-5 rounded-[16px] border border-slate-200 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 transition-all text-base text-slate-800 cursor-pointer"
          >
            <option value="Email">Email</option>
            <option value="Phone Call">Phone Call</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Video Conference">Video Conference</option>
          </select>
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5" htmlFor="contact-project-type">{t('projectType') || 'Project Type'}</label>
          <select
            id="contact-project-type"
            {...register('projectType')}
            className="w-full h-14 px-5 rounded-[16px] border border-slate-200 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 transition-all text-base text-slate-800 cursor-pointer"
          >
            <option value="">-- Select Project Type --</option>
            <option value="New Product from Scratch">New Product from Scratch</option>
            <option value="Scale/Augment Engineering Team">Scale/Augment Engineering Team</option>
            <option value="Legacy System Migration">Legacy System Migration</option>
            <option value="Consulting & Feasibility Audit">Consulting & Feasibility Audit</option>
            <option value="Staffing / Recruiting Agency Service">Staffing / Recruiting Agency Service</option>
          </select>
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5" htmlFor="contact-subject">{t('subject')}</label>
          <div className="relative">
            <select
              id="contact-subject"
              {...register('subject')}
              className={`w-full h-14 pl-5 pr-11 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 transition-all text-base text-slate-800 cursor-pointer ${
                errors.subject
                  ? 'border-red-500 ring-2 ring-red-100 bg-red-50/10'
                  : touchedFields.subject
                  ? 'border-green-500 ring-2 ring-green-100 bg-green-50/5'
                  : 'border-slate-200'
              }`}
            >
              <option value="">-- Select Subject --</option>
              {subjectOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
            {touchedFields.subject && !errors.subject && (
              <span className="absolute right-8 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none">
                <Check size={20} className="stroke-[3px]" />
              </span>
            )}
          </div>
          {errors.subject && <span id="subject-error" className="text-xs font-semibold text-red-500 mt-1.5 block" role="alert">{errors.subject.message}</span>}
        </div>
      </div>

      {/* Multi-Select Required Tech Chips */}
      <div>
        <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-3">{t('requiredTech') || 'Preferred Technologies'}</label>
        <div className="flex flex-wrap gap-2.5">
          {techOptions.map((tech) => {
            const active = selectedTech.includes(tech);
            return (
              <button
                key={tech}
                type="button"
                onClick={() => toggleTech(tech)}
                className={`px-3.5 py-2 rounded-full border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  active
                    ? 'bg-[#0F4C81]/15 border-[#0F4C81] text-[#0F4C81]'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                {active && <Check size={12} />}
                {tech}
              </button>
            );
          })}
        </div>
      </div>

      {/* Message Textarea */}
      <div>
        <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5" htmlFor="contact-message">{t('message')}</label>
        <div className="relative">
          <textarea
            id="contact-message"
            rows={5}
            placeholder="Please describe your technology requirements, key challenges, or hiring profiles..."
            {...register('message')}
            className={`w-full pl-5 pr-11 py-4 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/25 transition-all text-base text-slate-800 placeholder-slate-400 ${
              errors.message
                ? 'border-red-500 ring-2 ring-red-100 bg-red-50/10'
                : touchedFields.message
                ? 'border-green-500 ring-2 ring-green-100 bg-green-50/5'
                : 'border-slate-200'
            }`}
          />
          {touchedFields.message && !errors.message && (
            <span className="absolute right-4 top-6 text-green-500">
              <Check size={20} className="stroke-[3px]" />
            </span>
          )}
        </div>
        <div className="flex justify-between items-center mt-1.5">
          {errors.message ? (
            <span id="message-error" className="text-xs font-semibold text-red-500" role="alert">{errors.message.message}</span>
          ) : (
            <span className="text-xs text-slate-400">
              {locale === 'es' ? 'El mensaje debe tener al menos 20 caracteres' : 'Message must be at least 20 characters'}
            </span>
          )}
          <span className={`text-xs font-bold ${remainingChars < 100 ? 'text-amber-500' : 'text-slate-400'}`}>
            {remainingChars} {locale === 'es' ? 'caracteres restantes' : 'characters remaining'}
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting || !isValid}
          className={`btn-primary min-w-[200px] flex items-center justify-center gap-2 transition-all ${
            (!isValid || submitting) ? 'opacity-50 cursor-not-allowed bg-slate-400 hover:bg-slate-400 border-slate-400' : ''
          }`}
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>{t('submitting')}</span>
            </>
          ) : (
            <span>{t('submit')}</span>
          )}
        </button>
      </div>
    </form>
  );
}

export function ContactForm() {
  return (
    <Suspense fallback={
      <div className="flex justify-center p-12">
        <Loader2 className="animate-spin text-[#0F4C81]" size={36} />
      </div>
    }>
      <ContactFormContent />
    </Suspense>
  );
}
