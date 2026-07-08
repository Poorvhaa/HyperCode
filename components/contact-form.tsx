'use client';

import { useState, useEffect, Suspense } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle, CheckCircle, HelpCircle, Check } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { db } from '@/lib/db';
import { trackGAEvent } from '@/lib/analytics';
import { motion } from 'framer-motion';
import { useFormValidation } from '@/hooks/use-form-validation';

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
    name: z.string().min(2, t('nameError')),
    email: z.string().email(t('emailError')),
    company: z.string().min(2, t('companyError')),
    phone: z.string().min(10, t('phoneError')),
    subject: z.string().min(1, t('subjectError')),
    message: z.string().min(10, t('messageError')),
    services: z.array(z.string()).default([]),
    industry: z.string().min(1, t('industryError')),
    companySize: z.string().default(''),
    budget: z.string().min(1, t('budgetError')),
    timeline: z.string().min(1, t('timelineError')),
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
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema) as any,
    mode: 'onChange',
    defaultValues: {
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

  const selectedServices = watch('services');
  const selectedTech = watch('requiredTechnologies');

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

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
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
        label: data.subject,
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
          data.name,
          data.company,
          data.email,
          data.phone,
          data.subject,
          data.message,
          'website',
          {
            services: data.services,
            industry: data.industry,
            company_size: data.companySize,
            budget: data.budget,
            timeline: data.timeline,
            country: data.country,
            preferred_contact_method: data.preferredContactMethod,
            project_type: data.projectType,
            required_technologies: data.requiredTechnologies,
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
    setValue('services', current);
  };

  const toggleTech = (tech: string) => {
    const current = [...selectedTech];
    const index = current.indexOf(tech);
    if (index === -1) {
      current.push(tech);
    } else {
      current.splice(index, 1);
    }
    setValue('requiredTechnologies', current);
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
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex gap-3 text-sm">
          <AlertCircle size={20} className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid for Name, Email, Company, Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-850 mb-2.5">{t('name')}</label>
          <input
            type="text"
            placeholder="John Doe"
            {...register('name')}
            className={`w-full h-14 px-5 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all text-base text-slate-800 placeholder-slate-400 ${
              errors.name ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200'
            }`}
          />
          {errors.name && <span className="text-xs font-semibold text-red-500 mt-1.5 block">{errors.name.message}</span>}
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-850 mb-2.5">{t('email')}</label>
          <input
            type="email"
            placeholder="john@company.com"
            {...register('email')}
            className={`w-full h-14 px-5 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all text-base text-slate-800 placeholder-slate-400 ${
              errors.email ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200'
            }`}
          />
          {errors.email && <span className="text-xs font-semibold text-red-500 mt-1.5 block">{errors.email.message}</span>}
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-850 mb-2.5">{t('company')}</label>
          <input
            type="text"
            placeholder="Enter company name"
            {...register('company')}
            className={`w-full h-14 px-5 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all text-base text-slate-800 placeholder-slate-400 ${
              errors.company ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200'
            }`}
          />
          {errors.company && <span className="text-xs font-semibold text-red-500 mt-1.5 block">{errors.company.message}</span>}
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-850 mb-2.5">{t('phone')}</label>
          <input
            type="tel"
            placeholder="+1 (555) 012-3456"
            {...register('phone')}
            className={`w-full h-14 px-5 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all text-base text-slate-800 placeholder-slate-400 ${
              errors.phone ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200'
            }`}
          />
          {errors.phone && <span className="text-xs font-semibold text-red-500 mt-1.5 block">{errors.phone.message}</span>}
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
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-850 mb-2.5">{t('industry')}</label>
          <select
            {...register('industry')}
            className={`w-full h-14 px-5 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all text-base text-slate-800 ${
              errors.industry ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200'
            }`}
          >
            <option value="">-- Select Industry --</option>
            {Object.entries(tAi.raw('industries')).map(([key, val]) => (
              <option key={key} value={val as string}>{val as string}</option>
            ))}
          </select>
          {errors.industry && <span className="text-xs font-semibold text-red-500 mt-1.5 block">{errors.industry.message}</span>}
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5">{t('companySize') || 'Company Size'}</label>
          <select
            {...register('companySize')}
            className="w-full h-14 px-5 rounded-[16px] border border-slate-200 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all text-base text-slate-800"
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
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-850 mb-2.5">{t('budget')}</label>
          <select
            {...register('budget')}
            className={`w-full h-14 px-5 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all text-base text-slate-800 ${
              errors.budget ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200'
            }`}
          >
            <option value="">-- Select Budget --</option>
            {Object.entries(tConsult.raw('budgets')).map(([key, val]) => (
              <option key={key} value={val as string}>{val as string}</option>
            ))}
          </select>
          {errors.budget && <span className="text-xs font-semibold text-red-500 mt-1.5 block">{errors.budget.message}</span>}
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-850 mb-2.5">{t('timeline')}</label>
          <select
            {...register('timeline')}
            className={`w-full h-14 px-5 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all text-base text-slate-800 ${
              errors.timeline ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200'
            }`}
          >
            <option value="">-- Select Timeline --</option>
            {Object.entries(tConsult.raw('timelines')).map(([key, val]) => (
              <option key={key} value={val as string}>{val as string}</option>
            ))}
          </select>
          {errors.timeline && <span className="text-xs font-semibold text-red-500 mt-1.5 block">{errors.timeline.message}</span>}
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5">{t('country') || 'Country / Region'}</label>
          <input
            type="text"
            placeholder="e.g. United States, United Kingdom"
            {...register('country')}
            className="w-full h-14 px-5 rounded-[16px] border border-slate-200 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all text-base text-slate-800 placeholder-slate-400"
          />
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5">{t('contactMethod') || 'Preferred Contact Method'}</label>
          <select
            {...register('preferredContactMethod')}
            className="w-full h-14 px-5 rounded-[16px] border border-slate-200 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all text-base text-slate-800"
          >
            <option value="Email">Email</option>
            <option value="Phone Call">Phone Call</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Video Conference">Video Conference</option>
          </select>
        </div>

        <div>
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-855 mb-2.5">{t('projectType') || 'Project Type'}</label>
          <select
            {...register('projectType')}
            className="w-full h-14 px-5 rounded-[16px] border border-slate-200 bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all text-base text-slate-800"
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
          <label className="block text-[15px] lg:text-[18px] font-bold text-slate-850 mb-2.5">{t('subject')}</label>
          <select
            {...register('subject')}
            className={`w-full h-14 px-5 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all text-base text-slate-800 ${
              errors.subject ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200'
            }`}
          >
            {subjectOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
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
        <label className="block text-[15px] lg:text-[18px] font-bold text-slate-850 mb-2.5">{t('message')}</label>
        <textarea
          rows={5}
          placeholder="Please describe your technology requirements, key challenges, or hiring profiles..."
          {...register('message')}
          className={`w-full px-5 py-4 rounded-[16px] border bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all text-base text-slate-800 placeholder-slate-400 ${
            errors.message ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200'
          }`}
        />
        {errors.message && <span className="text-xs font-semibold text-red-500 mt-1.5 block">{errors.message.message}</span>}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary min-w-[200px] flex items-center justify-center gap-2"
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
