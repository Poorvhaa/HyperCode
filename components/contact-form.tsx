'use client';

import { useState, useEffect, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { db } from '@/lib/db';

function ContactFormContent() {
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const t = useTranslations('Contact.form');
  const tSubjects = useTranslations('Contact.subjects');

  // Define subject options dynamically using translated labels
  const subjectOptions = [
    { id: 'General Inquiry', label: tSubjects('general') },
    { id: 'Web Development Inquiry', label: tSubjects('web') },
    { id: 'Partnership Opportunity', label: tSubjects('partnership') },
    { id: 'Vendor Inquiry', label: tSubjects('vendor') },
    { id: 'Career Question', label: tSubjects('career') },
    { id: 'Media Request', label: tSubjects('media') },
    { id: 'Other', label: tSubjects('other') },
  ];

  // Schema defined inside the component to use next-intl translation hooks
  const contactSchema = z.object({
    name: z.string().min(2, t('nameError')),
    email: z.string().email(t('emailError')),
    company: z.string().min(2, t('companyError')),
    phone: z.string().min(10, t('phoneError')),
    subject: z.string().min(1, t('subjectError')),
    message: z.string().min(10, t('messageError')),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: '',
      message: '',
    },
  });

  // Handle URL search params on mount to support prefilling
  useEffect(() => {
    const subjectParam = searchParams.get('subject');
    const positionParam = searchParams.get('position');

    if (subjectParam) {
      const matchedSubject = subjectOptions.find(
        (s) => s.id.toLowerCase() === subjectParam.toLowerCase()
      );
      if (matchedSubject) {
        setValue('subject', matchedSubject.id);
      }
    } else if (positionParam) {
      setValue('subject', 'Career Question');
      setValue('message', `I am interested in career opportunities, specifically regarding the ${positionParam} position.`);
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    setError('');

    try {
      await db.saveContactInquiry(
        data.name,
        data.company,
        data.email,
        data.phone,
        data.subject,
        data.message
      );
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

  if (submitted) {
    return (
      <div className="space-y-6">
        <div className="p-6 rounded-2xl border border-green-200 bg-green-50 flex gap-4">
          <CheckCircle size={24} className="text-green-650 flex-shrink-0 mt-0.5" />
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
      <form onSubmit={handleSubmit(onSubmit)} id="contact-form-inputs" className="space-y-6">
        {error && (
          <div className="p-4 rounded-xl border border-red-200 bg-red-50 flex gap-3">
            <AlertCircle size={20} className="text-red-655 flex-shrink-0 mt-0.5" />
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">{t('fullName')}</label>
            <input
              {...register('name')}
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm"
            />
            {errors.name && <p className="text-xs text-red-655 font-semibold">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">{t('emailAddress')}</label>
            <input
              {...register('email')}
              type="email"
              placeholder="john@company.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm"
            />
            {errors.email && <p className="text-xs text-red-655 font-semibold">{errors.email.message}</p>}
          </div>

          {/* Company */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">{t('companyName')}</label>
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
            <label className="block text-sm font-semibold text-slate-700">{t('phoneNumber')}</label>
            <input
              {...register('phone')}
              type="tel"
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm"
            />
            {errors.phone && <p className="text-xs text-red-655 font-semibold">{errors.phone.message}</p>}
          </div>

          {/* Subject Options select dropdown */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-semibold text-slate-700">{t('subject')}</label>
            <select
              {...register('subject')}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm"
            >
              <option value="">{t('selectSubject')}</option>
              {subjectOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.subject && <p className="text-xs text-red-655 font-semibold">{errors.subject.message}</p>}
          </div>

          {/* Message */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-semibold text-slate-700">{t('message')}</label>
            <textarea
              {...register('message')}
              placeholder="How can we help you?"
              rows={5}
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
              <span>{t('sendMessage')}</span>
            </>
          ) : (
            <span>{t('sendMessage')}</span>
          )}
        </button>

        <p className="text-xs text-slate-500 text-center font-medium">
          We respect your privacy. Submitting this form sends a message to our general communications squad.
        </p>
      </form>
    </div>
  );
}

export function ContactForm() {
  return (
    <Suspense fallback={<div className="text-center p-8"><Loader2 size={24} className="animate-spin text-[#0F4C81] inline" /></div>}>
      <ContactFormContent />
    </Suspense>
  );
}
