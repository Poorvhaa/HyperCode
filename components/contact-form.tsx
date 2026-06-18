'use client';

import { useState, useEffect, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { db } from '@/lib/db';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name required'),
  phone: z.string().min(10, 'Valid phone number required'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const subjectOptions = [
  { id: 'General Inquiry', label: 'General Inquiry' },
  { id: 'Web Development Inquiry', label: 'Web Development Inquiry' },
  { id: 'Partnership Opportunity', label: 'Partnership Opportunity' },
  { id: 'Vendor Inquiry', label: 'Vendor Inquiry' },
  { id: 'Career Question', label: 'Career Question' },
  { id: 'Media Request', label: 'Media Request' },
  { id: 'Other', label: 'Other' },
];

function ContactFormContent() {
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

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

  // Handle URL search params on mount to support prefilling (e.g. Careers page redirection)
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
      setError('Failed to submit form. Please try again.');
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
            <h3 className="font-bold text-green-900">Message Sent Successfully!</h3>
            <p className="text-green-800 text-sm mt-1">
              Thank you for reaching out. Our team will review your inquiry and get back to you within 24 hours.
            </p>
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
            <AlertCircle size={20} className="text-red-650 flex-shrink-0 mt-0.5" />
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Full Name</label>
            <input
              {...register('name')}
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm"
            />
            {errors.name && <p className="text-xs text-red-650 font-semibold">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Email Address</label>
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

          {/* Subject Options select dropdown */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Subject</label>
            <select
              {...register('subject')}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm"
            >
              <option value="">Select an inquiry subject</option>
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
            <label className="block text-sm font-semibold text-slate-700">Message</label>
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
              <span>Sending...</span>
            </>
          ) : (
            <span>Send Message</span>
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
