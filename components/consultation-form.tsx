'use client';

import { useState, useEffect, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { db } from '@/lib/db';

const consultationSchema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name required'),
  phone: z.string().min(10, 'Valid phone number required'),
  service: z.string().min(1, 'Please select a service interest'),
  budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline'),
  message: z.string().min(10, 'Please share some details about your project (min 10 characters)'),
});

type ConsultationFormData = z.infer<typeof consultationSchema>;

const serviceOptions = [
  { id: 'Business Intelligence', label: 'Business Intelligence' },
  { id: 'Data Analytics', label: 'Data Analytics' },
  { id: 'Data Warehousing', label: 'Data Warehousing' },
  { id: 'Data Engineering', label: 'Data Engineering' },
  { id: 'Web Development', label: 'Web Development' },
  { id: 'Technology Consulting', label: 'Technology Consulting' },
  { id: 'IT Staffing', label: 'IT Staffing' },
  { id: 'Staff Augmentation', label: 'Staff Augmentation' },
  { id: 'Contract Staffing', label: 'Contract Staffing' },
  { id: 'Direct Placement', label: 'Direct Placement' },
];

const budgetOptions = [
  { id: 'Less than $10K', label: 'Less than $10K' },
  { id: '$10K-$50K', label: '$10K-$50K' },
  { id: '$50K-$100K', label: '$50K-$100K' },
  { id: '$100K+', label: '$100K+' },
  { id: 'Not Sure Yet', label: 'Not Sure Yet' },
];

const timelineOptions = [
  { id: 'Immediately', label: 'Immediately' },
  { id: 'Within 30 Days', label: 'Within 30 Days' },
  { id: 'Within 3 Months', label: 'Within 3 Months' },
  { id: 'Exploring Options', label: 'Exploring Options' },
];

function ConsultationFormContent() {
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

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
      // Find case-insensitive or partial match
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

  const onSubmit = async (data: ConsultationFormData) => {
    setSubmitting(true);
    setError('');

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
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Failed to submit consultation request. Please try again.');
      console.error('Consultation form error:', err);
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
            <h3 className="font-bold text-green-900">Consultation Requested!</h3>
            <p className="text-green-800 text-sm mt-1">
              Thank you for your request. Our solutions architect will contact you within 24 hours to schedule our project introduction.
            </p>
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
            <AlertCircle size={20} className="text-red-650 flex-shrink-0 mt-0.5" />
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Full Name</label>
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
            <label className="block text-sm font-semibold text-slate-700">Business Email</label>
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
            <label className="block text-sm font-semibold text-slate-700">Company Name</label>
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
            <label className="block text-sm font-semibold text-slate-700">Phone Number</label>
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
            <label className="block text-sm font-semibold text-slate-700">Service Interested In</label>
            <select
              {...register('service')}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm"
            >
              <option value="">Select a service category</option>
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
            <label className="block text-sm font-semibold text-slate-700">Estimated Project Budget</label>
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
            <label className="block text-sm font-semibold text-slate-700">Expected Timeline</label>
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
            <label className="block text-sm font-semibold text-slate-700">Project Requirements & Scope</label>
            <textarea
              {...register('message')}
              placeholder="Please describe your project, technical stack, or staffing needs..."
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
              <span>Submitting Request...</span>
            </>
          ) : (
            <span>Request Consultation</span>
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
