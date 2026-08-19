'use client';

import { useState, useEffect, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle, CheckCircle, Check } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
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

  const contactFieldOrder = [
    'name',
    'email',
    'company',
    'phone',
    'services',
    'industry',
    'timeline',
    'message'
  ];

  const { formRef, focusAndScrollToError } = useFormValidation({
    navbarSelector: 'header',
    extraOffset: 24,
    fieldOrder: contactFieldOrder,
  });

  const t = useTranslations('Contact.form');
  const tNav = useTranslations('Navigation');
  const tConsult = useTranslations('Consultation');
  const tAi = useTranslations('AIConsultant');
  const locale = useLocale();

  // 1. Service options mapping (translates the 25 options)
  const serviceOptions = [
    { id: 'AI & Generative AI', label: t('serviceOptions.aiGenerativeAI') },
    { id: 'AI Automation & Agents', label: t('serviceOptions.aiAutomationAgents') },
    { id: 'Custom Software Development', label: t('serviceOptions.customSoftwareDev') },
    { id: 'Enterprise Application Development', label: t('serviceOptions.enterpriseAppDev') },
    { id: 'Web Development', label: t('serviceOptions.webDev') },
    { id: 'Mobile App Development', label: t('serviceOptions.mobileAppDev') },
    { id: 'Cloud Consulting & Migration', label: t('serviceOptions.cloudConsultingMigration') },
    { id: 'DevOps & Infrastructure', label: t('serviceOptions.devOpsInfrastructure') },
    { id: 'Data Engineering', label: t('serviceOptions.dataEngineering') },
    { id: 'Data Analytics', label: t('serviceOptions.dataAnalytics') },
    { id: 'Business Intelligence', label: t('serviceOptions.businessIntelligence') },
    { id: 'Digital Transformation', label: t('serviceOptions.digitalTransformation') },
    { id: 'Cybersecurity', label: t('serviceOptions.cybersecurity') },
    { id: 'UI/UX Design', label: t('serviceOptions.uiUxDesign') },
    { id: 'E-commerce Development', label: t('serviceOptions.ecommerceDev') },
    { id: 'API Development & Integration', label: t('serviceOptions.apiDevIntegration') },
    { id: 'Legacy Application Modernization', label: t('serviceOptions.legacyAppModernization') },
    { id: 'ERP & CRM Solutions', label: t('serviceOptions.erpCrmSolutions') },
    { id: 'Quality Assurance & Testing', label: t('serviceOptions.qualityAssuranceTesting') },
    { id: 'IT Consulting', label: t('serviceOptions.itConsulting') },
    { id: 'Technology Consulting', label: t('serviceOptions.technologyConsulting') },
    { id: 'IT Staffing & Staff Augmentation', label: t('serviceOptions.itStaffingAugmentation') },
    { id: 'Managed IT Services', label: t('serviceOptions.managedItServices') },
    { id: 'Digital Marketing', label: t('serviceOptions.digitalMarketing') },
    { id: 'Other Technology Requirement', label: t('serviceOptions.otherTechRequirement') },
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
    services: createDropdownSchema(t('servicesError') || 'Please select a service'),
    message: createTextareaSchema(
      locale === 'es' ? 'El mensaje debe tener al menos 20 caracteres' : 'Message must be at least 20 characters',
      locale === 'es' ? 'El mensaje debe tener como máximo 2000 caracteres' : 'Message must be at most 2000 characters'
    ),
    industry: createDropdownSchema(t('industryError')),
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
    formState: { errors, touchedFields, submitCount },
    reset,
    setError: setFieldError,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema) as any,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      services: '',
      message: '',
      industry: '',
      timeline: '',
      country: '',
      preferredContactMethod: 'Email',
      projectType: '',
      requiredTechnologies: [],
    },
  });

  const selectedTech = watch('requiredTechnologies') || [];
  const messageValue = watch('message') || '';

  // URL Query parameter pre-filling
  useEffect(() => {
    const subjectParam = searchParams.get('subject');
    const positionParam = searchParams.get('position');
    const serviceParam = searchParams.get('service');

    if (subjectParam) {
      const matched = serviceOptions.find(opt => opt.id.toLowerCase().includes(subjectParam.toLowerCase()));
      if (matched) {
        setValue('services', matched.id);
      }
    } else if (positionParam) {
      setValue('services', 'IT Staffing & Staff Augmentation');
      setValue('message', `Looking for recruitment assistance regarding position: ${positionParam}.`);
    } else if (serviceParam) {
      const matchedService = serviceOptions.find(opt => opt.id.toLowerCase().includes(serviceParam.toLowerCase()));
      if (matchedService) {
        setValue('services', matchedService.id);
      }
    }
  }, [searchParams, setValue, serviceOptions]);

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
          services: [sanitizedData.services], // Pass as array for backend compatibility
          source: 'website',
          locale,
        }),
      });

      const result = await res.json().catch(() => null);

      if (!res.ok || !result?.success) {
        if (result?.code === 'VALIDATION_ERROR' && result?.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, msg]) => {
            setFieldError(field as any, {
              type: 'server',
              message: msg as string,
            });
          });
          setTimeout(() => {
            focusAndScrollToError(result.fieldErrors);
          }, 50);
          return;
        }
        throw new Error(
          result?.error || 'Contact submission API returned an error'
        );
      }

      trackGAEvent({
        action: 'contact_form_submission',
        category: 'Leads',
        label: sanitizedData.services,
      });

      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(t('errorSubmit'));
      console.error('Contact form error:', err);
    } finally {
      setSubmitting(false);
    }
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
          <h3 className="text-h3 text-green-900">{t('successTitle')}</h3>
          <p className="text-body text-green-800 mt-2">{t('successText')}</p>
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

      {submitCount > 0 && Object.keys(errors).length > 0 && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex gap-3 text-sm animate-fadeIn" role="alert" aria-live="assertive">
          <AlertCircle size={20} className="flex-shrink-0" />
          <span>
            {locale === 'es' 
              ? 'Por favor, corrija los campos resaltados.' 
              : 'Please correct the highlighted fields.'}
          </span>
        </div>
      )}

      {/* Grid for Name, Email, Company, Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-body font-bold text-slate-855 mb-2.5" htmlFor="contact-name">{t('name')}</label>
          <div className="relative">
            <input
              id="contact-name"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              {...register('name')}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              className={`w-full h-14 pl-5 pr-11 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/25 transition-all text-body text-slate-800 placeholder-slate-400 ${
                errors.name
                  ? 'border-red-500 bg-red-50/70 focus:border-red-600 focus:ring-2 focus:ring-red-200'
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
          {errors.name && <span id="contact-name-error" className="text-caption text-red-500 mt-1.5 block" role="alert">{errors.name.message}</span>}
        </div>

        <div>
          <label className="block text-body font-bold text-slate-855 mb-2.5" htmlFor="contact-email">{t('email')}</label>
          <div className="relative">
            <input
              id="contact-email"
              type="email"
              placeholder="john@company.com"
              autoComplete="email"
              inputMode="email"
              {...register('email')}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              className={`w-full h-14 pl-5 pr-11 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/25 transition-all text-body text-slate-800 placeholder-slate-400 ${
                errors.email
                  ? 'border-red-500 bg-red-50/70 focus:border-red-600 focus:ring-2 focus:ring-red-200'
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
          {errors.email && <span id="contact-email-error" className="text-caption text-red-500 mt-1.5 block" role="alert">{errors.email.message}</span>}
        </div>

        <div>
          <label className="block text-body font-bold text-slate-855 mb-2.5" htmlFor="contact-company">{t('company')}</label>
          <div className="relative">
            <input
              id="contact-company"
              type="text"
              placeholder="Enter company name"
              autoComplete="organization"
              {...register('company')}
              aria-invalid={Boolean(errors.company)}
              aria-describedby={errors.company ? 'contact-company-error' : undefined}
              className={`w-full h-14 pl-5 pr-11 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/25 transition-all text-body text-slate-800 placeholder-slate-400 ${
                errors.company
                  ? 'border-red-500 bg-red-50/70 focus:border-red-600 focus:ring-2 focus:ring-red-200'
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
          {errors.company && <span id="contact-company-error" className="text-caption text-red-500 mt-1.5 block" role="alert">{errors.company.message}</span>}
        </div>

        <div>
          <label className="block text-body font-bold text-slate-855 mb-2.5" htmlFor="contact-phone">{t('phone')}</label>
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
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
              className={`w-full h-14 pl-5 pr-11 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/25 transition-all text-body text-slate-800 placeholder-slate-400 ${
                errors.phone
                  ? 'border-red-500 bg-red-50/70 focus:border-red-600 focus:ring-2 focus:ring-red-200'
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
          {errors.phone && <span id="contact-phone-error" className="text-caption text-red-500 mt-1.5 block" role="alert">{errors.phone.message}</span>}
        </div>
      </div>

      {/* Grid for Select Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-body font-bold text-slate-855 mb-2.5" htmlFor="contact-industry">{t('industry')}</label>
          <div className="relative">
            <select
              id="contact-industry"
              {...register('industry')}
              aria-invalid={Boolean(errors.industry)}
              aria-describedby={errors.industry ? 'contact-industry-error' : undefined}
              className={`w-full h-14 pl-5 pr-11 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/25 transition-all text-body text-slate-800 cursor-pointer ${
                errors.industry
                  ? 'border-red-500 bg-red-50/70 focus:border-red-656 focus:ring-2 focus:ring-red-200'
                  : touchedFields.industry
                  ? 'border-green-500 ring-2 ring-green-100 bg-green-50/5'
                  : 'border-slate-200'
              }`}
            >
              <option value="">{tConsult('selectIndustry')}</option>
              {Object.entries(tConsult.raw('industries')).map(([key, val]) => (
                <option key={key} value={val as string}>{val as string}</option>
              ))}
            </select>
            {touchedFields.industry && !errors.industry && (
              <span className="absolute right-8 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none">
                <Check size={20} className="stroke-[3px]" />
              </span>
            )}
          </div>
          {errors.industry && <span id="contact-industry-error" className="text-caption text-red-500 mt-1.5 block" role="alert">{errors.industry.message}</span>}
        </div>

        <div>
          <label className="block text-body font-bold text-slate-855 mb-2.5" htmlFor="contact-timeline">{t('timeline')}</label>
          <div className="relative">
            <select
              id="contact-timeline"
              {...register('timeline')}
              aria-invalid={Boolean(errors.timeline)}
              aria-describedby={errors.timeline ? 'contact-timeline-error' : undefined}
              className={`w-full h-14 pl-5 pr-11 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/25 transition-all text-body text-slate-800 cursor-pointer ${
                errors.timeline
                  ? 'border-red-500 bg-red-50/70 focus:border-red-656 focus:ring-2 focus:ring-red-200'
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
          {errors.timeline && <span id="contact-timeline-error" className="text-caption text-red-500 mt-1.5 block" role="alert">{errors.timeline.message}</span>}
        </div>

        <div>
          <label className="block text-body font-bold text-slate-855 mb-2.5" htmlFor="contact-country">{t('country') || 'Country / Region'}</label>
          <input
            id="contact-country"
            type="text"
            placeholder="e.g. United States, United Kingdom"
            {...register('country')}
            className="w-full h-14 px-5 rounded-[16px] border border-slate-200 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/25 transition-all text-body text-slate-800 placeholder-slate-400"
          />
        </div>

        <div>
          <label className="block text-body font-bold text-slate-855 mb-2.5" htmlFor="contact-method">{t('contactMethod') || 'Preferred Contact Method'}</label>
          <select
            id="contact-method"
            {...register('preferredContactMethod')}
            className="w-full h-14 px-5 rounded-[16px] border border-slate-200 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/25 transition-all text-body text-slate-800 cursor-pointer"
          >
            <option value="Email">Email</option>
            <option value="Phone Call">Phone Call</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Video Conference">Video Conference</option>
          </select>
        </div>

        <div>
          <label className="block text-body font-bold text-slate-855 mb-2.5" htmlFor="contact-project-type">{t('projectType') || 'Project Type'}</label>
          <select
            id="contact-project-type"
            {...register('projectType')}
            className="w-full h-14 px-5 rounded-[16px] border border-slate-200 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/25 transition-all text-body text-slate-800 cursor-pointer"
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
          <label className="block text-body font-bold text-slate-855 mb-2.5" htmlFor="contact-services">{t('services') || 'Services Needed'}</label>
          <div className="relative">
            <select
              id="contact-services"
              {...register('services')}
              aria-invalid={Boolean(errors.services)}
              aria-describedby={errors.services ? 'contact-services-error' : undefined}
              className={`w-full h-14 pl-5 pr-11 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/25 transition-all text-body text-slate-800 cursor-pointer ${
                errors.services
                  ? 'border-red-500 bg-red-50/70 focus:border-red-656 focus:ring-2 focus:ring-red-200'
                  : touchedFields.services
                  ? 'border-green-500 ring-2 ring-green-100 bg-green-50/5'
                  : 'border-slate-200'
              }`}
            >
              <option value="">{t('selectService') || '-- Select Service / Focus Area --'}</option>
              {serviceOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
            {touchedFields.services && !errors.services && (
              <span className="absolute right-8 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none">
                <Check size={20} className="stroke-[3px]" />
              </span>
            )}
          </div>
          {errors.services && <span id="contact-services-error" className="text-caption text-red-500 mt-1.5 block" role="alert">{errors.services.message}</span>}
        </div>
      </div>

      {/* Multi-Select Required Tech Chips */}
      <div>
        <label className="block text-body font-bold text-slate-855 mb-3">{t('requiredTech') || 'Preferred Technologies'}</label>
        <div className="flex flex-wrap gap-2.5">
          {techOptions.map((tech) => {
            const active = selectedTech.includes(tech);
            return (
              <button
                key={tech}
                type="button"
                onClick={() => toggleTech(tech)}
                className={`px-3.5 py-2 rounded-full border text-caption font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  active
                    ? 'bg-royal-blue/15 border-royal-blue text-royal-blue'
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
        <label className="block text-body font-bold text-slate-855 mb-2.5" htmlFor="contact-message">{t('message')}</label>
        <div className="relative">
          <textarea
            id="contact-message"
            rows={5}
            placeholder="Please describe your technology requirements, key challenges, or hiring profiles..."
            {...register('message')}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            className={`w-full pl-5 pr-11 py-4 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/25 transition-all text-body text-slate-800 placeholder-slate-400 ${
              errors.message
                ? 'border-red-500 bg-red-50/70 focus:border-red-656 focus:ring-2 focus:ring-red-200'
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
            <span id="contact-message-error" className="text-caption text-red-500" role="alert">{errors.message.message}</span>
          ) : (
            <span className="text-caption text-slate-400">
              {locale === 'es' ? 'El mensaje debe tener al menos 20 caracteres' : 'Message must be at least 20 characters'}
            </span>
          )}
          <span className={`text-caption font-bold ${remainingChars < 100 ? 'text-amber-500' : 'text-slate-400'}`}>
            {remainingChars} {locale === 'es' ? 'caracteres restantes' : 'characters remaining'}
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className={`btn-primary min-w-[200px] flex items-center justify-center gap-2 text-button transition-all ${
            submitting ? 'opacity-50 cursor-not-allowed bg-slate-400 hover:bg-slate-400 border-slate-400' : ''
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
        <Loader2 className="animate-spin text-royal-blue" size={36} />
      </div>
    }>
      <ContactFormContent />
    </Suspense>
  );
}
