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
    <h4 className="mb-2.5 text-sm font-semibold text-white sm:mb-3">
      {children}
    </h4>
  );
}

const footerLinkClass =
  'text-body-sm text-[#AFC0D7] hover:text-white transition-colors duration-200 inline-flex items-center py-0.5 min-h-[40px] sm:min-h-0';

const socialLinkClass =
  'inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white/45 transition-colors duration-200 hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B9AFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071A3A]';

function SocialLinks() {
  return (
    <div className="flex items-center gap-2">
      <a
        href="https://www.linkedin.com/company/hypercode-llc/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Connect with HyperCode on LinkedIn"
        className={socialLinkClass}
      >
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      </a>
      <a
        href="https://www.instagram.com/hypercodeit?utm_source=qr"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow HyperCode on Instagram"
        className={socialLinkClass}
      >
        <svg
          className="h-4 w-4"
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
  );
}

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
    { href: '/case-studies', label: tNav('ourWork') },
    { href: '/insights', label: tNav('insights') },
    { href: '/careers', label: tNav('careers') },
    { href: '/contact', label: tNav('contact') },
  ] as const;

  const legalLinks = [
    { href: '/PP', label: tf('privacy') },
    { href: '/TnC', label: tf('terms') },
  ] as const;

  const currentYear = new Date().getFullYear();
  const copyrightText = tf('copyright').replace('2026', currentYear.toString());
  const mapsQuery = `2095 Hammond Dr Suite C Schaumburg, IL 60173 ${tf('unitedStates')}`;

  const newsletterBlock = (
    <div className="min-w-0">
      <FooterHeading>{tf('newsletterTitle')}</FooterHeading>
      <p className="mb-2.5 text-body-sm leading-snug text-[#AFC0D7]">{tf('newsletterDesc')}</p>
      {subscribed ? (
        <div
          className="flex items-center gap-2 rounded-md border border-[#2DBD3E]/25 bg-[#2DBD3E]/10 px-3 py-2 text-body-sm font-medium text-[#7DE892]"
          role="status"
          aria-live="polite"
        >
          <ShieldCheck size={15} className="shrink-0" aria-hidden="true" />
          <span>{tf('newsletterSuccess')}</span>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubscribe} className="w-full min-w-0">
          <div className="flex w-full min-w-0 gap-2">
            <div className="relative min-w-0 flex-1">
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
                className={`w-full min-w-0 rounded-md border bg-white/[0.06] py-2 pl-3 pr-9 text-body-sm text-white placeholder-white/35 transition-all focus:outline-none focus:ring-2 focus:ring-[#145BFF]/30 ${
                  hasEmailError
                    ? 'border-red-400/60 focus:border-red-400'
                    : touched && isValidEmail
                    ? 'border-[#2DBD3E]/50'
                    : 'border-white/12 focus:border-[#5B9AFF]/50'
                }`}
                disabled={submitting}
              />
              {touched && isValidEmail && !error && (
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#2DBD3E]" aria-hidden="true">
                  <Check size={14} className="stroke-[3px]" />
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={submitting}
              aria-label="Submit newsletter subscription"
              className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md border-none bg-[#145BFF] text-white transition hover:bg-[#0A1F6B] ${
                submitting ? 'cursor-not-allowed bg-white/20 opacity-50' : ''
              }`}
            >
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
          {error && (
            <p id="footer-email-error" className="mt-1.5 flex items-center gap-1 text-caption font-medium text-red-400" role="alert">
              <AlertCircle size={12} className="shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </p>
          )}
        </form>
      )}
    </div>
  );

  return (
    <footer className="relative overflow-x-hidden bg-[#071A3A] text-left text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#145BFF]/35 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full min-w-0 max-w-[90rem] px-5 py-8 sm:px-8 sm:py-9 lg:px-12 lg:py-10 xl:px-16">
        <div className="grid grid-cols-1 items-start gap-x-8 gap-y-7 md:grid-cols-2 md:gap-x-10 md:gap-y-8 lg:grid-cols-[1.5fr_1fr_0.9fr_1fr] lg:gap-x-10 lg:gap-y-0">
          {/* Column 1 — Brand + Contact */}
          <div className="flex min-w-0 flex-col gap-2.5 lg:gap-3">
            <Link href="/" className="inline-flex w-fit rounded-md bg-white/[0.97] px-2.5 py-1.5" aria-label="HyperCode Home">
              <Image
                src="/hypercodeit.logo.webp"
                alt="HyperCode Logo"
                width={130}
                height={100}
                quality={100}
                className="h-auto w-[88px] sm:w-[92px]"
                priority
              />
            </Link>

            <p className="max-w-[18rem] text-body-sm leading-snug text-[#AFC0D7] lg:max-w-none">{tf('tagline')}</p>

            <div className="flex flex-col gap-1.5 text-body-sm text-[#AFC0D7]">
              <a
                href={googleMapsSearchUrl(mapsQuery)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={locale === 'es' ? 'Abrir la ubicación de HyperCode en Google Maps' : 'Open HyperCode location in Google Maps'}
                className="inline-flex min-h-[40px] items-start gap-2 rounded-md transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B9AFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071A3A] sm:min-h-0"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#5B9AFF]" aria-hidden="true" />
                <address className="not-italic leading-snug">
                  <span className="block">2095 Hammond Dr, Suite C</span>
                  <span className="block">Schaumburg, IL 60173</span>
                  <span className="block">{tf('unitedStates')}</span>
                </address>
              </a>
              <a
                href="tel:+12243519727"
                className="inline-flex min-h-[40px] items-center gap-2 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B9AFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071A3A] sm:min-h-0"
              >
                <Phone className="h-4 w-4 shrink-0 text-[#2DBD3E]" aria-hidden="true" />
                <span>+1 (224) 351-9727</span>
              </a>
              <a
                href="mailto:hr@hypercodeit.com"
                className="inline-flex min-h-[40px] items-center gap-2 break-all transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B9AFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071A3A] sm:min-h-0"
              >
                <Mail className="h-4 w-4 shrink-0 text-[#5B9AFF]" aria-hidden="true" />
                <span>hr@hypercodeit.com</span>
              </a>
            </div>
          </div>

          {/* Column 2 — What We Do */}
          <nav className="min-w-0" aria-label={tNav('solutions')}>
            <FooterHeading>{tNav('solutions')}</FooterHeading>
            <ul className="flex flex-col">
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
                  className="group inline-flex min-h-[40px] items-center gap-1.5 text-body-sm font-semibold text-[#5B9AFF] transition-colors hover:text-white sm:min-h-0"
                >
                  {tNav('viewAllSolutions')}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Column 3 — Company */}
          <nav className="min-w-0" aria-label={tc('company')}>
            <FooterHeading>{tc('company')}</FooterHeading>
            <ul className="flex flex-col">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4 — Social + Newsletter */}
          <div className="flex min-w-0 flex-col gap-5 lg:gap-6">
            <div>
              <FooterHeading>{tf('connect')}</FooterHeading>
              <SocialLinks />
            </div>
            {newsletterBlock}
          </div>
        </div>

        {/* Bottom bar — legal + copyright (no duplicate nav column) */}
        <div className="mt-6 flex w-full flex-col items-start justify-between gap-2.5 border-t border-white/10 pt-4 text-caption text-white/45 sm:mt-7 sm:flex-row sm:items-center sm:pt-5">
          <p>{copyrightText}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-[40px] items-center transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B9AFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071A3A] sm:min-h-0"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
