'use client';

import { useState, useEffect, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle, CheckCircle, Check } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { db, sanitizePayload } from '@/lib/db';
import { trackGAEvent } from '@/lib/analytics';
import { motion } from 'framer-motion';

function ConsultationFormContent() {
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const t = useTranslations('Consultation.form');
  const tNav = useTranslations('Navigation');
  const tBudgets = useTranslations('Consultation.budgets');
  const tTimelines = useTranslations('Consultation.timelines');
  const tAi = useTranslations('AIConsultant');
  const tc = useTranslations('Common');
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
    name: z.string().min(2, t('serviceError')), 
    email: z.string().email(tc('error') || 'Invalid email'),
    company: z.string().min(2, t('serviceError')),
    phone: z.string().min(10, t('serviceError')),
    service: z.string().min(1, t('serviceError')),
    budget: z.string().min(1, t('budgetError')),
    timeline: z.string().min(1, t('timelineError')),
    message: z.string().min(10, t('messageError')),
    businessGoal: z.string().default(''),
    currentChallenges: z.string().default(''),
    expectedOutcome: z.string().default(''),
    preferredServices: z.array(z.string()).default([]),
    industry: z.string().min(1, t('serviceError')),
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
    formState: { errors },
    reset,
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
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
  const watchedServices = watch('preferredServices');

  // Handle URL query parameters to pre-fill service dropdown/multi-select
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      const matched = serviceOptions.find(
        (opt) => opt.id.toLowerCase() === serviceParam.toLowerCase() ||
                 opt.id.toLowerCase().includes(serviceParam.toLowerCase())
      );
      if (matched) {
        setValue('service', matched.id);
        setValue('preferredServices', [matched.id]);
      }
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: ConsultationFormData) => {
    setSubmitting(true);
    setError('');

    // Structured log for submission payload
    console.log({
      step: 'consultation_form_submission_start',
      payload: data
    });

    try {
      // 1. Sanitize the payload (Circular-safe, Date-safe, undefined-safe, JSON-safe)
      const sanitized = sanitizePayload({
        ...data,
        locale
      });

      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitized),
      });

      // Structured log for API response
      console.log({
        step: 'consultation_api_response',
        status: res.status,
        ok: res.ok
      });

      if (!res.ok) {
        throw new Error(`Consultation API returned status code ${res.status}`);
      }

      trackGAEvent({
        action: 'consultation_request_submission',
        category: 'Leads',
        label: data.service,
      });

      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      // Structured log for API failure
      console.error({
        step: 'consultation_api_failed',
        payload: data,
        error: err,
        message: err?.message || 'API request exception',
        stack: err?.stack
      });

      // 2. Attempt LocalStorage fallback
      try {
        const savedLocal = await db.saveConsultationRequest(
          data.name,
          data.company,
          data.email,
          data.phone,
          data.service,
          data.budget,
          data.timeline,
          data.message,
          {
            business_goal: data.businessGoal,
            current_challenges: data.currentChallenges,
            expected_outcome: data.expectedOutcome,
            preferred_services: data.preferredServices,
            industry: data.industry,
            company_size: data.companySize,
            current_tech_stack: data.currentTechStack,
            preferred_meeting_type: data.preferredMeetingType,
          }
        );

        console.log({
          step: 'consultation_local_fallback_success',
          savedObject: savedLocal
        });

        // Even though remote failed, local fallback succeeded, so present success flow!
        trackGAEvent({
          action: 'consultation_request_fallback_submission',
          category: 'Leads',
          label: data.service,
        });

        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 5000);
      } catch (localErr: any) {
        // Structured log for local fallback failure
        console.error({
          step: 'consultation_local_fallback_failed',
          payload: data,
          error: localErr,
          message: localErr?.message || 'Local storage save failed',
          stack: localErr?.stack
        });

        // Inform user that both online & local saves failed (e.g. storage full or private browsing)
        setError(locale === 'es' 
          ? 'Error de envío: El servidor no está disponible y el almacenamiento local está deshabilitado o lleno.' 
          : 'Submission error: The server is unavailable and local storage is disabled or full.'
        );
      }
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
    setValue('preferredServices', current);
    if (current.length > 0 && !watch('service')) {
      setValue('service', current[0]);
    }
  };

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-left bg-white/70 backdrop-blur-lg p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-xl">
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex gap-3 text-sm">
          <AlertCircle size={20} className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Primary Contact Block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">{t('name')}</label>
          <input
            type="text"
            placeholder="John Doe"
            {...register('name')}
            className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81] transition-all text-slate-800 ${
              errors.name ? 'border-red-300 ring-1 ring-red-300' : 'border-slate-200'
            }`}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">{t('email')}</label>
          <input
            type="email"
            placeholder="john@company.com"
            {...register('email')}
            className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81] transition-all text-slate-800 ${
              errors.email ? 'border-red-300 ring-1 ring-red-300' : 'border-slate-200'
            }`}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">{t('company')}</label>
          <input
            type="text"
            placeholder="Company Name"
            {...register('company')}
            className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81] transition-all text-slate-800 ${
              errors.company ? 'border-red-300 ring-1 ring-red-300' : 'border-slate-200'
            }`}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">{t('phone')}</label>
          <input
            type="tel"
            placeholder="+1 (555) 012-3456"
            {...register('phone')}
            className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81] transition-all text-slate-800 ${
              errors.phone ? 'border-red-300 ring-1 ring-red-300' : 'border-slate-200'
            }`}
          />
        </div>
      </div>

      {/* Multi-Select Services Choice */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">{t('preferredServices') || 'Select Service Areas of Interest'}</label>
        <div className="flex flex-wrap gap-2">
          {serviceOptions.map((opt) => {
            const active = watchedServices.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => togglePreferredService(opt.id)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                  active
                    ? 'bg-[#0F4C81]/10 border-[#0F4C81] text-[#0F4C81]'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                {active && <Check size={14} />}
                {opt.label}
              </button>
            );
          })}
        </div>
        {errors.service && <span className="text-xs text-red-500 mt-1 block">{errors.service.message}</span>}
      </div>

      {/* Advanced Consulting Intake Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">{t('industry') || 'Industry'}</label>
          <select
            {...register('industry')}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81] transition-all text-slate-700"
          >
            <option value="">-- Select Industry --</option>
            {Object.entries(tAi.raw('industries')).map(([key, val]) => (
              <option key={key} value={val as string}>{val as string}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">{t('companySize') || 'Company Size'}</label>
          <select
            {...register('companySize')}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81] transition-all text-slate-700"
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
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">{t('meetingType') || 'Preferred Meeting Type'}</label>
          <select
            {...register('preferredMeetingType')}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81] transition-all text-slate-700"
          >
            <option value="Video Call">Video Conference (Google Meet/Zoom)</option>
            <option value="Phone Call">Direct Phone Call</option>
            <option value="In-person meeting">In-person (HQ or Offices)</option>
            <option value="Email assessment">Written Email Assessment</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">{t('currentTechStack') || 'Current Tech Stack / Key Tools'}</label>
          <input
            type="text"
            placeholder="e.g. AWS, Postgres, Salesforce, React"
            {...register('currentTechStack')}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81] transition-all text-slate-705 text-slate-700"
          />
        </div>
      </div>

      {/* Goal, Challenges, Outcomes Fields */}
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">{t('businessGoal') || 'Primary Business Goal'}</label>
          <input
            type="text"
            placeholder="e.g. Automate support operations, migration to AWS, build a new SaaS product"
            {...register('businessGoal')}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81] transition-all text-slate-700"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">{t('currentChallenges') || 'Current Technology Challenges'}</label>
          <textarea
            rows={2}
            placeholder="e.g. Manual process bottleneck, slow dashboard speed, scaling issues, developer recruitment delay"
            {...register('currentChallenges')}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81] transition-all text-slate-700"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">{t('expectedOutcome') || 'Expected Outcome & Success Criteria'}</label>
          <input
            type="text"
            placeholder="e.g. 50% operational cost reduction, sub-second latency, launch MVP by Q3"
            {...register('expectedOutcome')}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81] transition-all text-slate-700"
          />
        </div>
      </div>

      {/* Budget and Timeline Selection pills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">{t('budget')}</label>
          <div className="flex flex-col gap-2">
            {budgetOptions.map((opt) => {
              const active = watchedBudget === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setValue('budget', opt.id)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all text-left flex items-center justify-between cursor-pointer ${
                    active
                      ? 'bg-[#0F4C81] border-[#0F4C81] text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100'
                  }`}
                >
                  <span>{opt.label}</span>
                  {active && <Check size={16} />}
                </button>
              );
            })}
          </div>
          {errors.budget && <span className="text-xs text-red-500 mt-1 block">{errors.budget.message}</span>}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">{t('timeline')}</label>
          <div className="flex flex-col gap-2">
            {timelineOptions.map((opt) => {
              const active = watchedTimeline === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setValue('timeline', opt.id)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all text-left flex items-center justify-between cursor-pointer ${
                    active
                      ? 'bg-[#0F4C81] border-[#0F4C81] text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-655 hover:bg-slate-100'
                  }`}
                >
                  <span>{opt.label}</span>
                  {active && <Check size={16} />}
                </button>
              );
            })}
          </div>
          {errors.timeline && <span className="text-xs text-red-500 mt-1 block">{errors.timeline.message}</span>}
        </div>
      </div>

      {/* Main message textarea */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">{t('message')}</label>
        <textarea
          rows={4}
          placeholder="Please describe your technology requirements, project background, or team augmentation targets..."
          {...register('message')}
          className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81] transition-all text-slate-800 ${
            errors.message ? 'border-red-300 ring-1 ring-red-300' : 'border-slate-200'
          }`}
        />
        {errors.message && <span className="text-xs text-red-500 mt-1 block">{errors.message.message}</span>}
      </div>

      {/* Submit button */}
      <div className="flex justify-end border-t border-slate-100 pt-6">
        <button
          type="submit"
          disabled={submitting}
          className="px-8 py-4 rounded-xl font-semibold text-white bg-[#0F4C81] hover:bg-[#0D3F6D] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed min-w-[220px]"
        >
          {submitting ? (
            <>
              <Loader2 size={20} className="animate-spin" />
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
        <Loader2 className="animate-spin text-[#0F4C81]" size={36} />
      </div>
    }>
      <ConsultationFormContent />
    </Suspense>
  );
}
