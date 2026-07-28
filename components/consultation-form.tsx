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

function ConsultationFormContent() {
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const consultationFieldOrder = [
    'name',
    'email',
    'company',
    'phone',
    'service',
    'industry',
    'budget',
    'timeline',
    'message'
  ];

  const { formRef, focusAndScrollToError } = useFormValidation({
    navbarSelector: 'header',
    extraOffset: 24,
    fieldOrder: consultationFieldOrder,
  });

  const t = useTranslations('Consultation.form');
  const tContact = useTranslations('Contact.form');
  const tNav = useTranslations('Navigation');
  const tBudgets = useTranslations('Consultation.budgets');
  const tTimelines = useTranslations('Consultation.timelines');
  const tAi = useTranslations('AIConsultant');
  const locale = useLocale();

  // Define dynamic services list matching translated mega menu headers
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

  // Localized budget range pill labels
  const budgetOptions = [
    { id: 'Less than $25K', label: tBudgets('b1') },
    { id: '$25K-$100K', label: tBudgets('b2') },
    { id: '$100K-$250K', label: tBudgets('b3') },
    { id: '$250K+', label: tBudgets('b4') },
    { id: 'Not Sure Yet', label: tBudgets('b5') },
  ];

  // Localized expected timeline pill labels
  const timelineOptions = [
    { id: 'Immediately', label: tTimelines('t1') },
    { id: 'Within 3 Months', label: tTimelines('t2') },
    { id: 'Within 6 Months', label: tTimelines('t3') },
    { id: 'Exploring Options', label: tTimelines('t4') },
  ];

  // Validation schema
  const consultationSchema = z.object({
    name: createNameSchema(
      tContact('nameError'),
      locale === 'es' ? 'El nombre debe tener 80 caracteres o menos' : 'Name must be 80 characters or less',
      locale === 'es' ? 'El nombre solo puede contener letras, espacios, guiones y apóstrofes' : 'Name must contain only letters, spaces, hyphens, and apostrophes'
    ),
    email: createEmailSchema(tContact('emailError')),
    company: createCompanySchema(
      tContact('companyError'),
      locale === 'es' ? 'El nombre de la empresa solo puede contener letras, números, espacios, & y .' : 'Company name must contain only letters, numbers, spaces, &, and .'
    ),
    phone: createPhoneSchema(
      tContact('phoneError'),
      locale === 'es' ? 'El número de teléfono debe tener entre 7 y 15 dígitos' : 'Phone number must be between 7 and 15 digits'
    ),
    service: createDropdownSchema(t('serviceError')),
    budget: createDropdownSchema(t('budgetError')),
    timeline: createDropdownSchema(t('timelineError')),
    message: createTextareaSchema(
      locale === 'es' ? 'El mensaje debe tener al menos 20 caracteres' : 'Message must be at least 20 characters',
      locale === 'es' ? 'El mensaje debe tener como máximo 2000 caracteres' : 'Message must be at most 2000 characters'
    ),
    businessGoal: z.string().default(''),
    currentChallenges: z.string().default(''),
    expectedOutcome: z.string().default(''),
    preferredServices: z.array(z.string()).default([]),
    industry: createDropdownSchema(tContact('industryError')),
    companySize: z.string().default(''),
    currentTechStack: z.string().default(''),
    preferredMeetingType: z.string().default('Video Call'),
  });

  type ConsultationFormData = z.infer<typeof consultationSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, touchedFields, submitCount },
    reset,
    setError: setFieldError,
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema) as any,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      service: '',
      budget: '',
      timeline: '',
      message: '',
      businessGoal: '',
      currentChallenges: '',
      expectedOutcome: '',
      preferredServices: [],
      industry: '',
      companySize: '',
      currentTechStack: '',
      preferredMeetingType: 'Video Call',
    },
  });

  const watchedBudget = watch('budget');
  const watchedTimeline = watch('timeline');
  const watchedServices = watch('preferredServices') || [];
  const messageValue = watch('message') || '';

  // Handle URL query parameters to pre-fill service dropdown/multi-select
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      const matched = serviceOptions.find(
        (opt) => opt.id.toLowerCase() === serviceParam.toLowerCase() ||
                 opt.id.toLowerCase().includes(serviceParam.toLowerCase())
      );
      if (matched) {
        setValue('service', matched.id, { shouldValidate: true, shouldDirty: true });
        setValue('preferredServices', [matched.id], { shouldValidate: true, shouldDirty: true });
      }
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: ConsultationFormData) => {
    setSubmitting(true);
    setError('');

    const sanitized = sanitizePayload({
      ...data,
      locale
    });

    console.log({
      step: 'consultation_form_submission_start',
      payload: sanitized
    });

    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sanitized)
      });

      const result = await res.json().catch(() => null);

      console.log({
        step: 'consultation_api_response',
        status: res.status,
        ok: res.ok,
        result
      });

      if (!res.ok || !result?.success || !result?.saved) {
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
          result?.error ||
            `Consultation API returned status code ${res.status}`
        );
      }

      trackGAEvent({
        action: 'consultation_request_submission',
        category: 'Leads',
        label: sanitized.service
      });

      setSubmitted(true);
      reset();

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : locale === 'es'
            ? 'No se pudo enviar su solicitud de consulta. Inténtelo de nuevo.'
            : 'Unable to submit your consultation request. Please try again.';

      console.warn('[Consultation Form] Submission failed:', message);
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const togglePreferredService = (serviceId: string) => {
    const current = [...watchedServices];
    const index = current.indexOf(serviceId);
    if (index === -1) {
      current.push(serviceId);
    } else {
      current.splice(index, 1);
    }
    setValue('preferredServices', current, { shouldValidate: true, shouldDirty: true });
    if (current.length > 0) {
      setValue('service', current[0], { shouldValidate: true, shouldDirty: true });
    } else {
      setValue('service', '', { shouldValidate: true, shouldDirty: true });
    }
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
          <p className="text-green-800 text-sm mt-2 leading-relaxed">{t('successDesc')}</p>
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

      {/* Primary Contact Block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5" htmlFor="consultation-name">{t('name')}</label>
          <div className="relative">
            <input
              id="consultation-name"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              {...register('name')}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'consultation-name-error' : undefined}
              className={`w-full h-14 pl-5 pr-11 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/25 transition-all text-base text-slate-800 placeholder-slate-400 ${
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
          {errors.name && (
            <span id="consultation-name-error" className="text-xs font-semibold text-red-500 mt-1.5 block" role="alert">
              {errors.name.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5" htmlFor="consultation-email">{t('email')}</label>
          <div className="relative">
            <input
              id="consultation-email"
              type="email"
              placeholder="john@company.com"
              autoComplete="email"
              inputMode="email"
              {...register('email')}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'consultation-email-error' : undefined}
              className={`w-full h-14 pl-5 pr-11 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/25 transition-all text-base text-slate-800 placeholder-slate-400 ${
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
          {errors.email && (
            <span id="consultation-email-error" className="text-xs font-semibold text-red-500 mt-1.5 block" role="alert">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5" htmlFor="consultation-company">{t('company')}</label>
          <div className="relative">
            <input
              id="consultation-company"
              type="text"
              placeholder="Company Name"
              autoComplete="organization"
              {...register('company')}
              aria-invalid={Boolean(errors.company)}
              aria-describedby={errors.company ? 'consultation-company-error' : undefined}
              className={`w-full h-14 pl-5 pr-11 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/25 transition-all text-base text-slate-800 placeholder-slate-400 ${
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
          {errors.company && (
            <span id="consultation-company-error" className="text-xs font-semibold text-red-500 mt-1.5 block" role="alert">
              {errors.company.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5" htmlFor="consultation-phone">{t('phone')}</label>
          <div className="relative">
            <input
              id="consultation-phone"
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
              aria-describedby={errors.phone ? 'consultation-phone-error' : undefined}
              className={`w-full h-14 pl-5 pr-11 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/25 transition-all text-base text-slate-800 placeholder-slate-400 ${
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
          {errors.phone && (
            <span id="consultation-phone-error" className="text-xs font-semibold text-red-500 mt-1.5 block" role="alert">
              {errors.phone.message}
            </span>
          )}
        </div>
      </div>

      {/* Multi-Select Services Choice */}
      <div className="relative">
        <input
          type="text"
          {...register('service')}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
        />
        <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-3">{t('preferredServices') || 'Select Service Areas of Interest'}</label>
        <div className="flex flex-wrap gap-2.5">
          {serviceOptions.map((opt, index) => {
            const active = watchedServices.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => togglePreferredService(opt.id)}
                aria-invalid={Boolean(errors.service)}
                aria-describedby={errors.service ? 'consultation-service-error' : undefined}
                data-field-name={index === 0 ? 'service' : undefined}
                className={`px-4 py-2.5 rounded-full border text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  active
                    ? 'bg-royal-blue/15 border-royal-blue text-royal-blue'
                    : errors.service
                    ? 'border-red-500 bg-red-50/70 focus:border-red-600 focus:ring-2 focus:ring-red-200 text-slate-600'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-350 hover:bg-slate-100'
                }`}
              >
                {active && <Check size={14} />}
                {opt.label}
              </button>
            );
          })}
        </div>
        {errors.service && (
          <span id="consultation-service-error" className="text-xs font-semibold text-red-500 mt-1.5 block" role="alert">
            {errors.service.message}
          </span>
        )}
      </div>

      {/* Advanced Consulting Intake Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5" htmlFor="consultation-industry">{t('industry') || 'Industry'}</label>
          <div className="relative">
            <select
              id="consultation-industry"
              {...register('industry')}
              aria-invalid={Boolean(errors.industry)}
              aria-describedby={errors.industry ? 'consultation-industry-error' : undefined}
              className={`w-full h-14 pl-5 pr-11 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/25 transition-all text-base text-slate-800 cursor-pointer ${
                errors.industry
                  ? 'border-red-500 bg-red-50/70 focus:border-red-600 focus:ring-2 focus:ring-red-200'
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
          {errors.industry && (
            <span id="consultation-industry-error" className="text-xs font-semibold text-red-500 mt-1.5 block" role="alert">
              {errors.industry.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5" htmlFor="consultation-company-size">{t('companySize') || 'Company Size'}</label>
          <select
            id="consultation-company-size"
            {...register('companySize')}
            className="w-full h-14 px-5 rounded-[16px] border border-slate-200 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue transition-all text-base text-slate-800 cursor-pointer"
          >
            <option value="">-- Select Size --</option>
            <option value="1-10">1-10 Employees</option>
            <option value="11-50">11-50 Employees</option>
            <option value="51-200">51-200 Employees</option>
            <option value="201-500">201-500 Employees</option>
            <option value="500+">500+ Employees</option>
          </select>
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5" htmlFor="consultation-meeting-type">{t('meetingType') || 'Preferred Meeting Type'}</label>
          <select
            id="consultation-meeting-type"
            {...register('preferredMeetingType')}
            className="w-full h-14 px-5 rounded-[16px] border border-slate-200 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue transition-all text-base text-slate-800 cursor-pointer"
          >
            <option value="Video Call">Video Conference (Google Meet/Zoom)</option>
            <option value="Phone Call">Direct Phone Call</option>
            <option value="In-person meeting">In-person (HQ or Offices)</option>
            <option value="Email assessment">Written Email Assessment</option>
          </select>
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5" htmlFor="consultation-tech-stack">{t('currentTechStack') || 'Current Tech Stack / Key Tools'}</label>
          <input
            id="consultation-tech-stack"
            type="text"
            placeholder="e.g. AWS, Postgres, Salesforce, React"
            {...register('currentTechStack')}
            className="w-full h-14 px-5 rounded-[16px] border border-slate-200 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue transition-all text-base text-slate-800 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Goal, Challenges, Outcomes Fields */}
      <div className="space-y-6">
        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5" htmlFor="consultation-goal">{t('businessGoal') || 'Primary Business Goal'}</label>
          <input
            id="consultation-goal"
            type="text"
            placeholder="e.g. Automate support operations, migration to AWS, build a new SaaS product"
            {...register('businessGoal')}
            className="w-full h-14 px-5 rounded-[16px] border border-slate-200 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue transition-all text-base text-slate-800 placeholder-slate-400"
          />
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5" htmlFor="consultation-challenges">{t('currentChallenges') || 'Current Technology Challenges'}</label>
          <textarea
            id="consultation-challenges"
            rows={2}
            placeholder="e.g. Manual process bottleneck, slow dashboard speed, scaling issues, developer recruitment delay"
            {...register('currentChallenges')}
            className="w-full px-5 py-4 rounded-[16px] border border-slate-200 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue transition-all text-base text-slate-800 placeholder-slate-400"
          />
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5" htmlFor="consultation-outcome">{t('expectedOutcome') || 'Expected Outcome & Success Criteria'}</label>
          <input
            id="consultation-outcome"
            type="text"
            placeholder="e.g. 50% operational cost reduction, sub-second latency, launch MVP by Q3"
            {...register('expectedOutcome')}
            className="w-full h-14 px-5 rounded-[16px] border border-slate-200 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue transition-all text-base text-slate-800 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Budget and Timeline Selection pills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <input
            type="text"
            {...register('budget')}
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
          />
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-3">{t('budget')}</label>
          <div className="flex flex-col gap-2.5">
            {budgetOptions.map((opt, index) => {
              const active = watchedBudget === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setValue('budget', opt.id, { shouldValidate: true, shouldDirty: true })}
                  aria-invalid={Boolean(errors.budget)}
                  aria-describedby={errors.budget ? 'consultation-budget-error' : undefined}
                  data-field-name={index === 0 ? 'budget' : undefined}
                  className={`w-full px-5 py-3.5 rounded-[16px] border text-base font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                    active
                      ? 'bg-royal-blue border-royal-blue text-white shadow-sm'
                      : errors.budget
                      ? 'border-red-500 bg-red-50/70 focus:border-red-600 focus:ring-2 focus:ring-red-200 text-slate-700'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{opt.label}</span>
                  {active && <Check size={16} />}
                </button>
              );
            })}
          </div>
          {errors.budget && (
            <span id="consultation-budget-error" className="text-xs font-semibold text-red-500 mt-1.5 block" role="alert">
              {errors.budget.message}
            </span>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            {...register('timeline')}
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
          />
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-3">{t('timeline')}</label>
          <div className="flex flex-col gap-2.5">
            {timelineOptions.map((opt, index) => {
              const active = watchedTimeline === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setValue('timeline', opt.id, { shouldValidate: true, shouldDirty: true })}
                  aria-invalid={Boolean(errors.timeline)}
                  aria-describedby={errors.timeline ? 'consultation-timeline-error' : undefined}
                  data-field-name={index === 0 ? 'timeline' : undefined}
                  className={`w-full px-5 py-3.5 rounded-[16px] border text-base font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                    active
                      ? 'bg-royal-blue border-royal-blue text-white shadow-sm'
                      : errors.timeline
                      ? 'border-red-500 bg-red-50/70 focus:border-red-600 focus:ring-2 focus:ring-red-200 text-slate-700'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{opt.label}</span>
                  {active && <Check size={16} />}
                </button>
              );
            })}
          </div>
          {errors.timeline && (
            <span id="consultation-timeline-error" className="text-xs font-semibold text-red-500 mt-1.5 block" role="alert">
              {errors.timeline.message}
            </span>
          )}
        </div>
      </div>

      {/* Main message textarea */}
      <div>
        <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5" htmlFor="consultation-message">{t('message')}</label>
        <div className="relative">
          <textarea
            id="consultation-message"
            rows={4}
            placeholder="Please describe your technology requirements, project background, or team augmentation targets..."
            {...register('message')}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'consultation-message-error' : undefined}
            className={`w-full pl-5 pr-11 py-4 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/25 transition-all text-base text-slate-800 placeholder-slate-400 ${
              errors.message
                ? 'border-red-500 bg-red-50/70 focus:border-red-600 focus:ring-2 focus:ring-red-200'
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
            <span id="consultation-message-error" className="text-xs font-semibold text-red-500" role="alert">{errors.message.message}</span>
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

      {/* Submit button */}
      <div className="flex justify-end border-t border-slate-100 pt-6">
        <button
          type="submit"
          disabled={submitting}
          className={`btn-primary min-w-[220px] flex items-center justify-center gap-2 transition-all ${
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

export function ConsultationForm() {
  return (
    <Suspense fallback={
      <div className="flex justify-center p-12">
        <Loader2 className="animate-spin text-royal-blue" size={36} />
      </div>
    }>
      <ConsultationFormContent />
    </Suspense>
  );
}
