'use client';

import { useState, useEffect, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle, CheckCircle, Briefcase, BarChart3, Users, FileText } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name required'),
  phone: z.string().min(10, 'Valid phone number required'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const categories = [
  { id: 'Consulting Services', label: 'Consulting Services', icon: Briefcase, desc: 'Agile reviews & cloud strategy' },
  { id: 'Data & Analytics Solutions', label: 'Data & Analytics Solutions', icon: BarChart3, desc: 'Dashboards, pipelines & lakes' },
  { id: 'IT Staffing', label: 'IT Staffing', icon: Users, desc: 'Contract & direct placements' },
  { id: 'Career Opportunities', label: 'Career Opportunities', icon: FileText, desc: 'Join HyperCode team' },
];

function ContactFormContent() {
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      service: '',
    },
  });

  const watchedService = watch('service');

  // Sync state between cards and dropdown select
  useEffect(() => {
    if (watchedService) {
      // Find matches in category
      const match = categories.find(c => c.id === watchedService);
      if (match) {
        setActiveCategory(match.id);
      } else {
        // Handle queries from other subpages (e.g. ?service=Business Intelligence)
        if (watchedService.includes('Intelligence') || watchedService.includes('Analytics') || watchedService.includes('Warehousing')) {
          setActiveCategory('Data & Analytics Solutions');
        } else if (watchedService.includes('Staffing')) {
          setActiveCategory('IT Staffing');
        }
      }
    }
  }, [watchedService]);

  // Handle URL search params on mount
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    const positionParam = searchParams.get('position');

    if (serviceParam) {
      if (serviceParam.includes('Intelligence') || serviceParam.includes('Analytics') || serviceParam.includes('Warehousing')) {
        setValue('service', 'Data & Analytics Solutions');
        setValue('message', `I would like to discuss our ${serviceParam} needs.`);
      } else if (serviceParam.includes('Staffing')) {
        setValue('service', 'IT Staffing');
        setValue('message', `I would like to discuss our IT Staffing needs.`);
      }
    } else if (positionParam) {
      setValue('service', 'Career Opportunities');
      setValue('message', `I am interested in applying for the ${positionParam} position.`);
    }
  }, [searchParams, setValue]);

  const selectCategory = (categoryId: string) => {
    setValue('service', categoryId, { shouldValidate: true });
    setActiveCategory(categoryId);
    // Smooth scroll to the inputs
    const formElement = document.getElementById('contact-form-inputs');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    setError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Contact form submitted:', data);
      setSubmitted(true);
      reset();
      setActiveCategory('');
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
        <div className="p-6 rounded-xl border border-green-200 bg-green-50 flex gap-4">
          <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-0.5" />
          <div className="text-left">
            <h3 className="font-bold text-green-900">Message Sent Successfully!</h3>
            <p className="text-green-800 text-sm mt-1">
              Thank you for reaching out. Our team will contact you within 24 hours to route your request.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 text-left">
      {/* Category selection section */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider">
          How Can We Help?
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => selectCategory(cat.id)}
                className={`p-5 rounded-2xl border flex flex-col justify-between items-start text-left cursor-pointer transition-all duration-300 ${
                  isActive
                    ? 'border-[#0F4C81] bg-slate-50/80 shadow-md ring-2 ring-[#0F4C81]/10'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm hover:shadow'
                }`}
              >
                <div className="space-y-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
                    isActive ? 'bg-[#0F4C81] border-[#0F4C81] text-white' : 'bg-slate-50 border-slate-100 text-[#0F4C81]'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">{cat.label}</h4>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-medium leading-normal mt-1">{cat.desc}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Fields inputs */}
      <form onSubmit={handleSubmit(onSubmit)} id="contact-form-inputs" className="space-y-6 pt-4 border-t border-slate-100">
        {error && (
          <div className="p-4 rounded-lg border border-red-200 bg-red-50 flex gap-3">
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
            {errors.name && <p className="text-xs text-red-600 font-bold">{errors.name.message}</p>}
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
            {errors.email && <p className="text-xs text-red-600 font-bold">{errors.email.message}</p>}
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
            {errors.company && <p className="text-xs text-red-600 font-bold">{errors.company.message}</p>}
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
            {errors.phone && <p className="text-xs text-red-600 font-bold">{errors.phone.message}</p>}
          </div>

          {/* Service */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Service Category</label>
            <select
              {...register('service')}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.service && <p className="text-xs text-red-600 font-bold">{errors.service.message}</p>}
          </div>

          {/* Message */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Message</label>
            <textarea
              {...register('message')}
              placeholder="Tell us about your project and needs..."
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm resize-none"
            />
            {errors.message && <p className="text-xs text-red-600 font-bold">{errors.message.message}</p>}
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
          We will review your message and get back to you within 24 hours to route to the correct team.
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
