'use client';

import { useState, useEffect, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { db } from '@/lib/db';

function ConsultationFormContent() {
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const t = useTranslations('Consultation.form');
  const tNav = useTranslations('Navigation');
  const tBudgets = useTranslations('Consultation.budgets');
  const tTimelines = useTranslations('Consultation.timelines');
  const tc = useTranslations('Common');

  // Define dynamic services list matching translated mega menu headers
  const serviceOptions = [
    { id: 'Business Intelligence', label: tNav('businessIntelligence') },
    { id: 'Data Analytics', label: tNav('predictiveAnalytics') },
    { id: 'Data Warehousing', label: tNav('dataWarehousing') },
    { id: 'Data Engineering', label: tNav('dataEngineering') },
    { id: 'Web Development', label: tNav('webDevelopment') },
    { id: 'Technology Consulting', label: tNav('technologyConsulting') },
    { id: 'IT Staffing', label: tNav('itStaffing') },
    { id: 'Staff Augmentation', label: tNav('staffAugmentation') },
    { id: 'Contract Staffing', label: tNav('contractStaffing') },
    { id: 'Direct Placement', label: tNav('directPlacement') },
  ];

  // Localized budget range pill labels
  const budgetOptions = [
    { id: 'Less than $10K', label: tBudgets('b1') },
    { id: '$10K-$50K', label: tBudgets('b2') },
    { id: '$50K-$100K', label: tBudgets('b3') },
    { id: '$100K+', label: tBudgets('b4') },
    { id: 'Not Sure Yet', label: tBudgets('b5') },
  ];

  // Localized expected timeline pill labels
  const timelineOptions = [
    { id: 'Immediately', label: tTimelines('t1') },
    { id: 'Within 30 Days', label: tTimelines('t2') },
    { id: 'Within 3 Months', label: tTimelines('t3') },
    { id: 'Exploring Options', label: tTimelines('t4') },
  ];

  // Schema defined inside component to read localization files dynamically
  const consultationSchema = z.object({
    name: z.string().min(2, t('serviceError')), // falls back or maps to name errors
    email: z.string().email(tc('error') || 'Invalid email'),
    company: z.string().min(2, t('serviceError')),
    phone: z.string().min(10, t('serviceError')),
    service: z.string().min(1, t('serviceError')),
    budget: z.string().min(1, t('budgetError')),
    timeline: z.string().min(1, t('timelineError')),
    message: z.string().min(10, t('messageError')),
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
    },
  });

  const watchedBudget = watch('budget');
  const watchedTimeline = watch('timeline');

  // Handle URL query parameters to pre-fill service dropdown
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      const matched = serviceOptions.find(
        (opt) => opt.id.toLowerCase() === serviceParam.toLowerCase() ||
                 opt.id.toLowerCase().includes(serviceParam.toLowerCase())
      );
      if (matched) {
        setValue('service', matched.id);
      }
    }
  }, [searchParams, setValue]);

  const selectBudget = (val: string) => {
    setValue('budget', val, { shouldValidate: true });
  };

  const selectTimeline = (val: string) => {
    setValue('timeline', val, { shouldValidate: true });
  };

  const locale = useLocale();

  const onSubmit = async (data: ConsultationFormData) => {
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          company: data.company,
          email: data.email,
          phone: data.phone,
          service: data.service,
          budget: data.budget,
          timeline: data.timeline,
          message: data.message,
          locale
        }),
      });

      if (!res.ok) {
        throw new Error('Consultation submission API returned an error');
      }

      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(t('errorSubmit'));
      console.error('Consultation form error:', err);
      // Fallback save to local storage in offline mode
      try {
        await db.saveConsultationRequest(
          data.name,
          data.company,
          data.email,
          data.phone,
          data.service,
          data.budget,
          data.timeline,
          data.message
        );
      } catch (localErr) {
        console.error('Local fallback consultation save failed:', localErr);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        <div className="p-6 rounded-2xl border border-green-200 bg-green-50 flex gap-4">
          <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-0.5" />
          <div className="text-left">
            <h3 className="font-bold text-green-900">{t('successTitle')}</h3>
            <p className="text-green-800 text-sm mt-1">{t('successText')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="p-4 rounded-xl border border-red-200 bg-red-50 flex gap-3">
            <AlertCircle size={20} className="text-red-655 flex-shrink-0 mt-0.5" />
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">{tc('submit') === 'Enviar' ? 'Nombre Completo' : 'Full Name'}</label>
            <input
              {...register('name')}
              type="text"
              placeholder="Sarah Jenkins"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm"
            />
            {errors.name && <p className="text-xs text-red-655 font-semibold">{errors.name.message}</p>}
          </div>

          {/* Business Email */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">{tc('submit') === 'Enviar' ? 'Correo Electrónico' : 'Business Email'}</label>
            <input
              {...register('email')}
              type="email"
              placeholder="sjenkins@company.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm"
            />
            {errors.email && <p className="text-xs text-red-655 font-semibold">{errors.email.message}</p>}
          </div>

          {/* Company */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">{tc('submit') === 'Enviar' ? 'Nombre de la Empresa' : 'Company Name'}</label>
            <input
              {...register('company')}
              type="text"
              placeholder="Your Company"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm"
            />
            {errors.company && <p className="text-xs text-red-655 font-semibold">{errors.company.message}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">{tc('submit') === 'Enviar' ? 'Número de Teléfono' : 'Phone Number'}</label>
            <input
              {...register('phone')}
              type="tel"
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm"
            />
            {errors.phone && <p className="text-xs text-red-655 font-semibold">{errors.phone.message}</p>}
          </div>

          {/* Service Interested In select dropdown */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-semibold text-slate-700">{t('serviceInterest')}</label>
            <select
              {...register('service')}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm"
            >
              <option value="">{t('selectService')}</option>
              {serviceOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.service && <p className="text-xs text-red-655 font-semibold">{errors.service.message}</p>}
          </div>

          {/* Project Budget pill selectors */}
          <div className="md:col-span-2 space-y-3">
            <label className="block text-sm font-semibold text-slate-700">{t('budgetRange')}</label>
            <div className="flex flex-wrap gap-2">
              {budgetOptions.map((opt) => {
                const isActive = watchedBudget === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => selectBudget(opt.id)}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      isActive
                        ? 'border-[#0F4C81] bg-[#0F4C81]/5 text-[#0F4C81] ring-2 ring-[#0F4C81]/15'
                        : 'border-slate-200 bg-white text-slate-655 hover:border-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            {errors.budget && <p className="text-xs text-red-655 font-semibold">{errors.budget.message}</p>}
          </div>

          {/* Project Timeline pill selectors */}
          <div className="md:col-span-2 space-y-3">
            <label className="block text-sm font-semibold text-slate-700">{t('timeline')}</label>
            <div className="flex flex-wrap gap-2">
              {timelineOptions.map((opt) => {
                const isActive = watchedTimeline === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => selectTimeline(opt.id)}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      isActive
                        ? 'border-[#0F4C81] bg-[#0F4C81]/5 text-[#0F4C81] ring-2 ring-[#0F4C81]/15'
                        : 'border-slate-200 bg-white text-slate-655 hover:border-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            {errors.timeline && <p className="text-xs text-red-655 font-semibold">{errors.timeline.message}</p>}
          </div>

          {/* Project Description/Requirements */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-semibold text-slate-700">{t('description')}</label>
            <textarea
              {...register('message')}
              placeholder={t('placeholderDescription')}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm resize-none"
            />
            {errors.message && <p className="text-xs text-red-655 font-semibold">{errors.message.message}</p>}
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
              <span>{tc('sending')}</span>
            </>
          ) : (
            <span>{t('submitRequest')}</span>
          )}
        </button>

        <p className="text-xs text-slate-500 text-center font-medium">
          We respect your privacy. Submitting this form routes your inquiry to our solutions directors under NDA.
        </p>
      </form>
    </div>
  );
}

export function ConsultationForm() {
  return (
    <Suspense fallback={<div className="text-center p-8"><Loader2 size={24} className="animate-spin text-[#0F4C81] inline" /></div>}>
      <ConsultationFormContent />
    </Suspense>
  );
}
