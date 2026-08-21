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

function ConsultationFormContent({ defaultIndustryKey }: { defaultIndustryKey?: string }) {
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
  const tTimelines = useTranslations('Consultation.timelines');
  const tAi = useTranslations('AIConsultant');
  const tConsult = useTranslations('Consultation');
  const locale = useLocale();

  const industriesObj = tConsult.raw('industries') as Record<string, string>;
  const defaultIndustryValue = defaultIndustryKey ? (industriesObj[defaultIndustryKey] || '') : '';

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
    timeline: createDropdownSchema(t('timelineError')),
    message: createTextareaSchema(
      locale === 'es' ? 'El mensaje debe tener al menos 20 caracteres' : 'Message must be at least 20 characters',
      locale === 'es' ? 'El mensaje debe tener como máximo 2000 caracteres' : 'Message must be at most 2000 characters'
    ),
    preferredServices: z.array(z.string()).default([]),
    industry: createDropdownSchema(tContact('industryError')),
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
      timeline: '',
      message: '',
      preferredServices: [],
      industry: defaultIndustryValue,
      preferredMeetingType: 'Video Call',
    },
  });

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
          <h3 className="text-h3 text-green-900">{t('successTitle')}</h3>
          <p className="text-body text-green-800 mt-2">{t('successDesc')}</p>
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
          <label className="block text-eyebrow text-slate-500 mb-2.5" htmlFor="consultation-name">{t('name')}</label>
          <div className="relative">
            <input
              id="consultation-name"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              {...register('name')}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'consultation-name-error' : undefined}
              className={`w-full h-[56px] md:h-[60px] lg:h-[64px] px-[20px] rounded-[18px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/25 transition-all text-body text-slate-800 placeholder-slate-400 placeholder:text-[16px] placeholder:font-medium ${
                errors.name
                  ? 'border-red-500 bg-red-50/70 focus:border-red-600 focus:ring-2 focus:ring-red-200 shadow-[0_0_0_1px_#ef4444]'
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
            <span id="consultation-name-error" className="text-caption text-red-500 mt-1.5 block" role="alert">
              {errors.name.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-eyebrow text-slate-500 mb-2.5" htmlFor="consultation-email">{t('email')}</label>
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
              className={`w-full h-[56px] md:h-[60px] lg:h-[64px] px-[20px] rounded-[18px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/25 transition-all text-body text-slate-800 placeholder-slate-400 placeholder:text-[16px] placeholder:font-medium ${
                errors.email
                  ? 'border-red-500 bg-red-50/70 focus:border-red-600 focus:ring-2 focus:ring-red-200 shadow-[0_0_0_1px_#ef4444]'
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
            <span id="consultation-email-error" className="text-caption text-red-500 mt-1.5 block" role="alert">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-eyebrow text-slate-500 mb-2.5" htmlFor="consultation-company">{t('company')}</label>
          <div className="relative">
            <input
              id="consultation-company"
              type="text"
              placeholder="Company Name"
              autoComplete="organization"
              {...register('company')}
              aria-invalid={Boolean(errors.company)}
              aria-describedby={errors.company ? 'consultation-company-error' : undefined}
              className={`w-full h-[56px] md:h-[60px] lg:h-[64px] px-[20px] rounded-[18px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/25 transition-all text-body text-slate-800 placeholder-slate-400 placeholder:text-[16px] placeholder:font-medium ${
                errors.company
                  ? 'border-red-500 bg-red-50/70 focus:border-red-600 focus:ring-2 focus:ring-red-200 shadow-[0_0_0_1px_#ef4444]'
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
            <span id="consultation-company-error" className="text-caption text-red-500 mt-1.5 block" role="alert">
              {errors.company.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-eyebrow text-slate-500 mb-2.5" htmlFor="consultation-phone">{t('phone')}</label>
          <div className="relative">
            <input
              id="consultation-phone"
              type="tel"
              placeholder=" +1 (224) 351-9727"
              autoComplete="tel"
              inputMode="tel"
              {...register('phone', {
                onChange: (e) => {
                  e.target.value = filterPhoneInput(e.target.value);
                }
              })}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'consultation-phone-error' : undefined}
              className={`w-full h-[56px] md:h-[60px] lg:h-[64px] px-[20px] rounded-[18px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/25 transition-all text-body text-slate-800 placeholder-slate-400 placeholder:text-[16px] placeholder:font-medium ${
                errors.phone
                  ? 'border-red-500 bg-red-50/70 focus:border-red-600 focus:ring-2 focus:ring-red-200 shadow-[0_0_0_1px_#ef4444]'
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
            <span id="consultation-phone-error" className="text-caption text-red-500 mt-1.5 block" role="alert">
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
        <label className="block text-eyebrow text-slate-500 mb-3">{t('preferredServices') || 'Select Service Areas of Interest'}</label>
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
                className={`px-4 py-2.5 rounded-full border text-body-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
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
          <span id="consultation-service-error" className="text-caption text-red-500 mt-1.5 block" role="alert">
            {errors.service.message}
          </span>
        )}
      </div>

      {/* Advanced Consulting Intake Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-eyebrow text-slate-500 mb-2.5" htmlFor="consultation-industry">{t('industry') || 'Industry'}</label>
          <div className="relative">
            <select
              id="consultation-industry"
              {...register('industry')}
              aria-invalid={Boolean(errors.industry)}
              aria-describedby={errors.industry ? 'consultation-industry-error' : undefined}
              className={`w-full h-[56px] md:h-[60px] lg:h-[64px] pl-5 pr-12 rounded-[18px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/25 transition-all text-body text-slate-800 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%209l3%203%203-3%22%20stroke%3D%22%2364748B%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-[right_20px_center] bg-no-repeat ${
                errors.industry
                  ? 'border-red-500 bg-red-50/70 focus:border-red-600 focus:ring-2 focus:ring-red-200 shadow-[0_0_0_1px_#ef4444]'
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
          {errors.industry && (
            <span id="consultation-industry-error" className="text-caption text-red-500 mt-1.5 block" role="alert">
              {errors.industry.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-eyebrow text-slate-500 mb-2.5" htmlFor="consultation-meeting-type">{t('meetingType') || 'Preferred Meeting Type'}</label>
          <div className="relative">
            <select
              id="consultation-meeting-type"
              {...register('preferredMeetingType')}
              className="w-full h-[56px] md:h-[60px] lg:h-[64px] px-[20px] pr-12 rounded-[18px] border border-slate-200 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue transition-all text-body text-slate-800 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%209l3%203%203-3%22%20stroke%3D%22%2364748B%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-[right_20px_center] bg-no-repeat"
            >
              <option value="Video Call">Video Conference (Google Meet/Zoom)</option>
              <option value="Phone Call">Direct Phone Call</option>
              <option value="In-person meeting">In-person (HQ or Offices)</option>
              <option value="Email assessment">Written Email Assessment</option>
            </select>
          </div>
        </div>


      </div>





      {/* Timeline Selection pills */}
      <div className="relative">
        <input
          type="text"
          {...register('timeline')}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
        />
        <label className="block text-eyebrow text-slate-500 mb-3">{t('timeline')}</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
                className={`h-[60px] px-[20px] rounded-[18px] border text-body font-semibold transition-all text-left flex items-center justify-between cursor-pointer ${
                  active
                    ? 'bg-royal-blue border-royal-blue text-white shadow-sm'
                    : errors.timeline
                    ? 'border-red-500 bg-red-50/70 focus:border-red-656 focus:ring-2 focus:ring-red-200 text-slate-700'
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
          <span id="consultation-timeline-error" className="text-caption text-red-500 mt-1.5 block" role="alert">
            {errors.timeline.message}
          </span>
        )}
      </div>

      {/* Main message textarea */}
      <div>
        <label className="block text-eyebrow text-slate-500 mb-2.5" htmlFor="consultation-message">{t('message')}</label>
        <div className="relative">
          <textarea
            id="consultation-message"
            placeholder="Please describe your technology requirements, project background, or team augmentation targets..."
            {...register('message')}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'consultation-message-error' : undefined}
            className={`w-full h-[170px] p-[20px] rounded-[18px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/25 transition-all text-body text-slate-800 placeholder-slate-400 placeholder:text-[16px] placeholder:font-medium resize-none ${
              errors.message
                ? 'border-red-500 bg-red-50/70 focus:border-red-656 focus:ring-2 focus:ring-red-200 shadow-[0_0_0_1px_#ef4444]'
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
            <span id="consultation-message-error" className="text-caption text-red-500" role="alert">{errors.message.message}</span>
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

      {/* Submit button */}
      <div className="flex justify-end border-t border-slate-100 pt-6">
        <button
          type="submit"
          disabled={submitting}
          className={`btn-primary h-[60px] min-w-[220px] rounded-[18px] flex items-center justify-center gap-2 text-button transition-all ${
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

interface ConsultationFormProps {
  defaultIndustryKey?: string;
}

export function ConsultationForm({ defaultIndustryKey }: ConsultationFormProps) {
  return (
    <Suspense fallback={
      <div className="flex justify-center p-12">
        <Loader2 className="animate-spin text-royal-blue" size={36} />
      </div>
    }>
      <ConsultationFormContent defaultIndustryKey={defaultIndustryKey} />
    </Suspense>
  );
}
