'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2, CheckCircle } from 'lucide-react';
import { db } from '@/lib/db';

export function NewsletterForm() {
  const t = useTranslations('Insights');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error('Newsletter subscription failed');
      }

      setSuccess(true);
      setEmail('');
    } catch (err: any) {
      console.error(err);
      setError('Subscription failed. Please check your email or try again.');
      
      // Local fallback in offline mode
      try {
        await db.saveNewsletterSubscriber(email);
        setSuccess(true);
        setEmail('');
      } catch (localErr) {
        console.error('Local fallback subscriber save failed:', localErr);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center gap-2 p-3 rounded-xl border border-green-200 bg-green-50 text-green-800 text-sm font-semibold max-w-lg mx-auto">
        <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
        <span>{t('newsletterSuccess')}</span>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('newsletterPlaceholder')}
          required
          disabled={submitting}
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm font-semibold disabled:opacity-70"
        />
        <button
          type="submit"
          disabled={submitting}
          className="h-11 px-6 bg-[#0F4C81] text-white rounded-xl font-semibold text-xs hover:bg-[#0c3c66] transition-colors duration-200 cursor-pointer border-none disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
        >
          {submitting && <Loader2 size={14} className="animate-spin" />}
          <span>{t('newsletterButton')}</span>
        </button>
      </form>
      {error && <p className="text-xs text-red-655 font-semibold text-center">{error}</p>}
    </div>
  );
}
