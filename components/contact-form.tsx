'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name required'),
  phone: z.string().min(10, 'Valid phone number required'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const services = [
  'Business Intelligence',
  'Data Analytics',
  'Data Warehousing',
  'Big Data Solutions',
  'IT Staffing',
  'Agile Consulting',
  'Other',
];

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    setError('');

    try {
      // TODO: Connect to Supabase or API endpoint
      // For now, we'll simulate submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('[v0] Contact form submitted:', data);
      setSubmitted(true);
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Failed to submit form. Please try again.');
      console.error('[v0] Contact form error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        <div className="p-6 rounded-xl border border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800 flex gap-4">
          <CheckCircle size={24} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-green-900 dark:text-green-100">Message Sent Successfully!</h3>
            <p className="text-green-800 dark:text-green-200 text-sm mt-1">
              Thank you for reaching out. Our team will contact you within 24 hours.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="p-4 rounded-lg border border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800 flex gap-3">
          <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Full Name</label>
          <input
            {...register('name')}
            type="text"
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {errors.name && <p className="text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Email Address</label>
          <input
            {...register('email')}
            type="email"
            placeholder="john@company.com"
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {errors.email && <p className="text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>}
        </div>

        {/* Company */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Company Name</label>
          <input
            {...register('company')}
            type="text"
            placeholder="Your Company"
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {errors.company && <p className="text-sm text-red-600 dark:text-red-400">{errors.company.message}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Phone Number</label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="+1 (555) 123-4567"
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {errors.phone && <p className="text-sm text-red-600 dark:text-red-400">{errors.phone.message}</p>}
        </div>

        {/* Service */}
        <div className="md:col-span-2 space-y-2">
          <label className="block text-sm font-medium text-foreground">Service Interested In</label>
          <select
            {...register('service')}
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          {errors.service && <p className="text-sm text-red-600 dark:text-red-400">{errors.service.message}</p>}
        </div>

        {/* Message */}
        <div className="md:col-span-2 space-y-2">
          <label className="block text-sm font-medium text-foreground">Message</label>
          <textarea
            {...register('message')}
            placeholder="Tell us about your project and needs..."
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
          {errors.message && <p className="text-sm text-red-600 dark:text-red-400">{errors.message.message}</p>}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>

      <p className="text-sm text-foreground/60 text-center">
        We&apos;ll review your message and get back to you within 24 hours.
      </p>
    </form>
  );
}
