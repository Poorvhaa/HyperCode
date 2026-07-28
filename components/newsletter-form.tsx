'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Loader2, CheckCircle, Check, AlertCircle } from 'lucide-react';
import { db } from '@/lib/db';
import { useFormValidation } from '@/hooks/use-form-validation';
import { EMAIL_REGEX, sanitizePayload } from '@/lib/validation';

export function NewsletterForm() {
  const t = useTranslations('Insights');
  const tContact = useTranslations('Contact.form');
  const locale = useLocale();
  
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const { formRef, focusAndScrollToError } = useFormValidation();

  const isValidEmail = EMAIL_REGEX.test(email.trim());
  const hasEmailError = (touched && !isValidEmail) || Boolean(error);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (!email.trim()) {
      setError(tContact('emailError') || 'Please enter a valid email address');
      setTimeout(() => {
        focusAndScrollToError({ email: true });
      }, 0);
      return;
    }

    if (!isValidEmail) {
      setError(tContact('emailError') || 'Please enter a valid email address');
      setTimeout(() => {
        focusAndScrollToError({ email: true });
      }, 0);
      return;
    }

    setSubmitting(true);
    setError('');

    // Sanitize input
    const cleanEmail = email.trim().replace(/<[^>]*>/g, '');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: cleanEmail,
          language: locale === 'es' ? 'es' : 'en',
          sourcePage: typeof window !== 'undefined' ? window.location.pathname : '',
          honeypot,
        }),
      });

      const result = await res.json().catch(() => null);

      if (!res.ok || !result?.success) {
        throw new Error(result?.error || result?.message || `Newsletter subscription failed (${res.status})`);
      }

      setSuccess(true);
      setEmail('');
      setHoneypot('');
    } catch (err: any) {
      console.error(err);
      const isDuplicate = err.message === 'You are already subscribed';
      setError(isDuplicate ? t('newsletterAlreadySubscribed') : t('newsletterError'));

      setTimeout(() => {
        focusAndScrollToError({ email: true });
      }, 0);

      if (!isDuplicate) {
        try {
          if (!honeypot) {
            await db.saveNewsletterSubscriber(
              cleanEmail,
              locale === 'es' ? 'es' : 'en',
              typeof window !== 'undefined' ? window.location.pathname : ''
            );
          }
          setSuccess(true);
          setEmail('');
          setHoneypot('');
          setError('');
        } catch (localErr: any) {
          console.error('Newsletter subscription error', localErr);
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
        <div className="relative flex-1">
          <input
            type="email"
            name="email"
            placeholder={tContact('email') || 'Corporate Email'}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
              if (e.target.value.length > 5) setTouched(true);
            }}
            onBlur={() => setTouched(true)}
            autoComplete="email"
            inputMode="email"
            aria-invalid={hasEmailError}
            aria-describedby={hasEmailError ? 'email-error' : undefined}
            className={`w-full h-12 pl-4 pr-10 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-blue/25 transition-all text-sm text-slate-800 placeholder-slate-400 ${
              hasEmailError
                ? 'border-red-500 bg-red-50/70 focus:border-red-600 focus:ring-2 focus:ring-red-200'
                : touched && isValidEmail
                ? 'border-green-500 ring-2 ring-green-100 bg-green-50/5'
                : 'border-slate-200'
            }`}
            disabled={submitting}
            required
          />
          {touched && isValidEmail && !error && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-green-500">
              <Check size={18} className="stroke-[3px]" />
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={submitting}
          className={`h-12 bg-royal-blue hover:bg-deep-navy active:scale-95 text-white px-6 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center cursor-pointer border-none shadow-md shadow-blue-500/10 shrink-0 ${
            submitting ? 'opacity-50 cursor-not-allowed bg-slate-400 hover:bg-slate-400' : ''
          }`}
        >
          {submitting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <span>{t('newsletterButton') || 'Subscribe'}</span>
          )}
        </button>
      </form>
      {error && (
        <p id="email-error" className="text-xs font-semibold text-red-500 text-left pl-1 flex items-center gap-1 mt-1 animate-fadeIn" role="alert">
          <AlertCircle size={14} className="flex-shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
