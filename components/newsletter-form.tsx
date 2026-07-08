'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Loader2, CheckCircle } from 'lucide-react';
import { db } from '@/lib/db';
import { useFormValidation } from '@/hooks/use-form-validation';

export function NewsletterForm() {
  const t = useTranslations('Insights');
  const tContact = useTranslations('Contact.form');
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { formRef, focusAndScrollToError } = useFormValidation();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email) {
    focusAndScrollToError({ email: true });
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    setError(tContact('emailError') || 'Please enter a valid email address');

    setTimeout(() => {
      focusAndScrollToError({ email: true });
    }, 0);

    return;
  }

  setSubmitting(true);
  setError('');

  try {
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        language: locale === 'es' ? 'es' : 'en',
        sourcePage:
          typeof window !== 'undefined'
            ? window.location.pathname
            : '',
        honeypot,
      }),
    });

    if (!res.ok) {
      const errorBody = await res.json();

      throw new Error(
        errorBody?.error ||
          errorBody?.message ||
          `Newsletter subscription failed (${res.status})`
      );
    }

    setSuccess(true);
    setEmail('');
    setHoneypot('');
  } catch (err: any) {
    console.error(err);

    const isDuplicate =
      err.message === 'You are already subscribed';

    setError(
      isDuplicate
        ? t('newsletterAlreadySubscribed')
        : t('newsletterError')
    );

    setTimeout(() => {
      focusAndScrollToError({ email: true });
    }, 0);

    if (!isDuplicate) {
      try {
        if (!honeypot) {
          await db.saveNewsletterSubscriber(
            email,
            locale === 'es' ? 'es' : 'en',
            typeof window !== 'undefined'
              ? window.location.pathname
              : ''
          );
        }

        setSuccess(true);
        setEmail('');
        setHoneypot('');
        setError('');
      } catch (localErr: any) {
        console.error('Newsletter subscription error', {
          error: localErr,
          message: localErr?.message,
          code: localErr?.code,
          details: localErr?.details,
          hint: localErr?.hint,
          stack: localErr?.stack,
        });
      }
    }
  } finally {
    setSubmitting(false);
  }
};

  if (success) {
    return (
      <div className="flex items-center justify-center gap-2 p-3 rounded-xl border border-green-200 bg-green-50 bg-opacity-50 text-green-800 text-sm font-semibold max-w-lg mx-auto">
        <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
        <span>{t('newsletterSuccess')}</span>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-w-lg mx-auto">
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        {/* Honeypot field for spam prevention */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
          placeholder={t('newsletterPlaceholder')}
          required
          disabled={submitting}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'email-error' : undefined}
          className={`flex-1 h-14 px-5 rounded-[16px] border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-base font-bold disabled:opacity-70 transition-all ${
            error ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200'
          }`}
        />
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary h-14 px-8 flex items-center justify-center gap-2"
        >
          {submitting && <Loader2 size={16} className="animate-spin" />}
          <span>{t('newsletterButton')}</span>
        </button>
      </form>
      {error && (
        <p id="email-error" className="text-xs text-red-500 font-semibold text-center mt-1 block">
          {error}
        </p>
      )}
    </div>
  );
}
