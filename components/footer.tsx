'use client';

import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Check, AlertCircle } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useState, type FormEvent, type ReactNode } from 'react';
import { EMAIL_REGEX } from '@/lib/validation';
import { useFormValidation } from '@/hooks/use-form-validation';
import { footerServicesList } from '@/lib/navigation-links';
import { googleMapsSearchUrl } from '@/lib/utils';

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="w-1.5 h-1.5 rounded-full bg-royal-blue shrink-0" aria-hidden="true" />
      <h4 className="text-footer-heading text-slate-800">{children}</h4>
    </div>
  );
}

const footerLinkClass =
  'text-body-sm text-slate-500 hover:text-royal-blue transition-colors duration-200 inline-block';

export function Footer() {
  const tNav = useTranslations('Navigation');
  const tf = useTranslations('Footer');
  const tc = useTranslations('Common');
  const locale = useLocale();

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');

  const { formRef, focusAndScrollToError } = useFormValidation();

  const isValidEmail = EMAIL_REGEX.test(email.trim());
  const hasEmailError = (touched && !isValidEmail) || Boolean(error);

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setError('');

    if (!email.trim() || !isValidEmail) {
      setError(locale === 'es' ? 'Por favor introduzca un correo válido.' : 'Please enter a valid email address.');
      setTimeout(() => {
        focusAndScrollToError({ email: true });
      }, 0);
      return;
    }

    setSubmitting(true);
    const cleanEmail = email.trim().replace(/<[^>]*>/g, '');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, language: locale === 'es' ? 'es' : 'en', sourcePage: 'footer' })
      });
      const result = await res.json().catch(() => null);
      if (res.ok && result?.success) {
        setSubscribed(true);
        setEmail('');
        setTouched(false);
      } else {
        const isDuplicate = result?.code === 'DUPLICATE_SUBSCRIBER';
        setError(
          isDuplicate
            ? (locale === 'es' ? 'Ya se encuentra suscrito.' : 'You are already subscribed.')
            : (result?.error || (locale === 'es' ? 'No es posible suscribirse en este momento. Por favor, inténtelo de nuevo más tarde.' : 'Unable to subscribe right now. Please try again later.'))
        );
        setTimeout(() => {
          focusAndScrollToError({ email: true });
        }, 0);
      }
    } catch (err) {
      console.error(err);
      setError(locale === 'es' ? 'No es posible suscribirse en este momento. Por favor, inténtelo de nuevo más tarde.' : 'Unable to subscribe right now. Please try again later.');
      setTimeout(() => {
        focusAndScrollToError({ email: true });
      }, 0);
    } finally {
      setSubmitting(false);
    }
  };

  const servicesList = footerServicesList.map((s) => ({
    name: tNav(s.labelKey),
    href: s.href,
  }));

  const companyLinks = [
    { href: '/about', label: tNav('about') },
    { href: '/careers', label: tNav('careers') },
    { href: '/contact', label: tNav('contact') },
    { href: '/PP', label: tf('privacy') },
    { href: '/TnC', label: tf('terms') },
  ] as const;

  const currentYear = new Date().getFullYear();
  const copyrightText = tf('copyright').replace('2026', currentYear.toString());
  const mapsQuery = `2095 Hammond Dr Suite C Schaumburg, IL 60173 ${tf('unitedStates')}`;

  return (
    <footer className="relative text-left bg-[#F4F7FB] border-t border-slate-200 text-slate-650 overflow-x-hidden select-none bg-[radial-gradient(circle_at_top,rgba(20,91,255,0.035)_0%,transparent_50%)]">
      <div className="h-[2.5px] w-full bg-gradient-to-r from-[#1769F5] via-[#08A8D8] to-[#2DBD3E] absolute top-0 left-0 right-0 z-20" />

      <div className="max-w-[1440px] mx-auto px-[clamp(1.25rem,4vw,4rem)] pt-6 pb-4 md:pt-8 md:pb-5 relative z-10 w-full">
        {/* Top CTA strip */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-8 pb-6 md:pb-8 mb-6 md:mb-8 border-b border-slate-200/80">
          <div className="space-y-1.5 min-w-0">
            <h3 className="text-h3 text-slate-900">{tf('ctaTitle')}</h3>
            <p className="text-body-sm text-slate-500 max-w-xl">{tf('tagline')}</p>
          </div>
          <Link
            href="/consultation"
            className="PrimaryBrandButton inline-flex items-center justify-center gap-2 shrink-0 self-start lg:self-center h-11 px-6"
            aria-label={tNav('schedule')}
          >
            <span>{tNav('schedule')}</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.3fr_1fr_0.8fr_1.3fr] items-start gap-x-8 gap-y-7 md:gap-x-10 xl:gap-x-12 pb-6 md:pb-7 border-b border-slate-200/80">
          {/* Brand */}
          <div className="flex flex-col gap-3 min-w-0">
            <Link href="/" className="inline-flex w-fit" aria-label="HyperCode Home">
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.98)',
                  borderRadius: '16px',
                  padding: '10px 14px',
                  border: '1px solid rgba(15, 23, 42, 0.08)',
                  boxShadow: '0 6px 24px rgba(15, 23, 42, 0.04)',
                }}
                className="inline-flex items-center justify-center hover:shadow-lg transition-shadow duration-300"
              >
                <Image
                  src="/hypercodeit.logo.webp"
                  alt="HyperCode Logo"
                  width={130}
                  height={100}
                  quality={100}
                  className="h-auto w-[112px] sm:w-[120px]"
                  priority
                />
              </div>
            </Link>

            <p className="text-body-sm text-slate-500 max-w-xs leading-relaxed">{tf('tagline')}</p>

            <div className="flex items-center gap-2.5 pt-0.5">
              <a
                href="https://www.linkedin.com/company/hypercode-llc/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with HyperCode on LinkedIn"
                className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-royal-blue hover:border-royal-blue/30 transition-all duration-200"
              >
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/hypercodeit?utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow HyperCode on Instagram"
                className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-royal-blue hover:border-royal-blue/30 transition-all duration-200"
              >
                <svg
                  className="w-[18px] h-[18px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="flex flex-col min-w-0">
            <FooterHeading>{tc('solutions')}</FooterHeading>
            <ul className="flex flex-col gap-2">
              {servicesList.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className={footerLinkClass}>
                    {s.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/solutions"
                  className="inline-flex items-center gap-1.5 text-button text-royal-blue hover:text-deep-navy transition-colors"
                >
                  {tNav('viewAllSolutions')}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col min-w-0">
            <FooterHeading>{tc('company')}</FooterHeading>
            <ul className="flex flex-col gap-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="flex flex-col gap-4 min-w-0">
            <div>
              <FooterHeading>{tc('contact')}</FooterHeading>
              <div className="flex flex-col gap-2.5 text-body-sm text-slate-550">
                <a
                  href={googleMapsSearchUrl(mapsQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={locale === 'es' ? 'Abrir la ubicación de HyperCode en Google Maps' : 'Open HyperCode location in Google Maps'}
                  className="flex items-start gap-2.5 hover:text-royal-blue transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue focus-visible:ring-offset-2"
                >
                  <MapPin className="text-royal-blue mt-0.5 shrink-0 w-[18px] h-[18px]" aria-hidden="true" />
                  <address className="not-italic leading-relaxed">
                    <span className="block">2095 Hammond Dr, Suite C</span>
                    <span className="block">Schaumburg, IL 60173</span>
                    <span className="block">{tf('unitedStates')}</span>
                  </address>
                </a>
                <a href="tel:+12243519727" className="flex items-center gap-2.5 hover:text-royal-blue transition-colors">
                  <Phone className="text-green shrink-0 w-[18px] h-[18px]" aria-hidden="true" />
                  <span>+1 (224) 351-9727</span>
                </a>
                <a href="mailto:hr@hypercodeit.com" className="flex items-center gap-2.5 hover:text-royal-blue transition-colors break-all">
                  <Mail className="text-royal-blue shrink-0 w-[18px] h-[18px]" aria-hidden="true" />
                  <span>hr@hypercodeit.com</span>
                </a>
              </div>
            </div>

            <div className="min-w-0">
              <p className="text-footer-heading text-slate-800 mb-2">{tf('newsletterTitle')}</p>
              {subscribed ? (
                <div
                  className="py-2.5 px-3 bg-green/5 border border-green/20 text-green rounded-lg text-body-sm font-medium flex items-center gap-2"
                  role="status"
                  aria-live="polite"
                >
                  <ShieldCheck size={15} className="text-green shrink-0" aria-hidden="true" />
                  <span>{tf('newsletterSuccess')}</span>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubscribe} className="w-full min-w-0">
                  <div className="flex gap-2 w-full min-w-0">
                    <div className="relative flex-1 min-w-0">
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder={tf('newsletterPlaceholder')}
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
                        aria-describedby={hasEmailError ? 'footer-email-error' : undefined}
                        className={`w-full min-w-0 bg-white border rounded-lg pl-3 pr-9 py-2 text-body-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 transition-all ${
                          hasEmailError
                            ? 'border-red-500 bg-red-50/5 focus:border-red-600 focus:ring-red-200/50'
                            : touched && isValidEmail
                            ? 'border-green focus:border-green'
                            : 'border-slate-200 focus:border-royal-blue'
                        }`}
                        disabled={submitting}
                      />
                      {touched && isValidEmail && !error && (
                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-green" aria-hidden="true">
                          <Check size={14} className="stroke-[3px]" />
                        </span>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      aria-label="Submit newsletter subscription"
                      className={`bg-royal-blue hover:bg-deep-navy text-white h-[38px] w-[38px] rounded-lg text-button transition flex items-center justify-center cursor-pointer border-none shrink-0 ${
                        submitting ? 'opacity-50 cursor-not-allowed bg-slate-400' : ''
                      }`}
                    >
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                  {error && (
                    <p id="footer-email-error" className="text-caption font-medium text-red-500 mt-1.5 flex items-center gap-1" role="alert">
                      <AlertCircle size={12} className="shrink-0" aria-hidden="true" />
                      <span>{error}</span>
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom legal bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2.5 pt-4 text-caption text-slate-450 w-full">
          <p>{copyrightText}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link href="/PP" className="hover:text-royal-blue transition-colors">
              {tf('privacy')}
            </Link>
            <span className="text-slate-300 hidden sm:inline" aria-hidden="true">
              |
            </span>
            <Link href="/TnC" className="hover:text-royal-blue transition-colors">
              {tf('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
