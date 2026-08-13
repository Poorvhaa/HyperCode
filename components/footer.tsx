'use client';

import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Check, AlertCircle } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useState, type FormEvent } from 'react';
import { EMAIL_REGEX } from '@/lib/validation';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { useFormValidation } from '@/hooks/use-form-validation';

export function Footer() {
  const tNav = useTranslations('Navigation');
  const tf = useTranslations('Footer');
  const tc = useTranslations('Common');
  const locale = useLocale();
  const { openPreferences } = useCookieConsent();

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
        setError(result?.error || (locale === 'es' ? 'Error al suscribirse.' : 'Failed to subscribe.'));
        setTimeout(() => {
          focusAndScrollToError({ email: true });
        }, 0);
      }
    } catch (err) {
      console.error(err);
      setError(locale === 'es' ? 'Error al suscribirse.' : 'Failed to subscribe.');
      setTimeout(() => {
        focusAndScrollToError({ email: true });
      }, 0);
    } finally {
      setSubmitting(false);
    }
  };

  const solutionsList = [
    { name: tNav('aiAutomation') || 'Enterprise AI', href: `/solutions/ai-automation` },
    { name: tNav('softwareDev') || 'Software Engineering', href: `/solutions/custom-software` },
    { name: tNav('webDev') || 'Web Applications', href: `/solutions/web-development` },
    { name: tNav('mobileDev') || 'Mobile Apps', href: `/solutions/mobile-apps` },
    { name: tNav('cloudDevOps') || 'Cloud & DevOps', href: `/solutions/cloud-infrastructure` },
    { name: tNav('cybersecurity') || 'Cybersecurity', href: `/solutions/cybersecurity` },
    { name: tNav('staffing') || 'Staffing', href: `/staffing` },
    { name: tNav('digitalTransformation') || 'Digital Transformation', href: `/solutions/digital-transformation` },
    { name: tNav('businessIntelligence') || 'BI & Analytics', href: `/solutions/business-intelligence` },
    { name: tNav('uiUx') || 'UI/UX Design', href: `/solutions/ui-design` },
    { name: tNav('marketing') || 'Digital Marketing', href: `/solutions/seo-optimization` },
    { name: tNav('ecommerce') || 'E-commerce', href: `/solutions/shopify-development` },
    { name: tNav('techConsulting') || 'Technology Consulting', href: `/solutions/technology-consulting` },
  ];

  const currentYear = new Date().getFullYear();
  const copyrightText = (tf('copyright') || `© ${currentYear} HyperCode. All rights reserved.`).replace('2026', currentYear.toString());

  return (
    <footer 
      className="relative text-left bg-[#F4F7FB] border-t border-slate-200 text-slate-650 overflow-hidden min-h-[500px] select-none bg-[radial-gradient(circle_at_top,rgba(20,91,255,0.035)_0%,transparent_50%)]"
    >
      {/* Decorative top accent line */}
      <div className="h-[2.5px] w-full bg-gradient-to-r from-[#1769F5] via-[#08A8D8] to-[#2DBD3E] absolute top-0 left-0 right-0 z-20" />

      {/* Quieter continued global network background vector */}
      <div className="absolute inset-0 opacity-[0.25] pointer-events-none -z-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="30%" y1="40%" x2="50%" y2="25%" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="50%" y1="25%" x2="75%" y2="55%" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="75%" y1="55%" x2="90%" y2="30%" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="3 3" />
          <circle cx="10%" cy="20%" r="2" fill="#94A3B8" />
          <circle cx="30%" cy="40%" r="2.5" fill="#94A3B8" />
          <circle cx="50%" cy="25%" r="2" fill="#94A3B8" />
          <circle cx="75%" cy="55%" r="3" fill="#94A3B8" />
          <circle cx="90%" cy="30%" r="2.5" fill="#94A3B8" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 pb-6 md:pt-16 md:pb-8 lg:pt-24 lg:pb-12 relative z-10">
        
        {/* Top section: Newsletter Subscribe Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-14 border-b border-slate-200/80">
          <div className="space-y-1.5 text-left max-w-xl">
            <h3 className="text-h3 text-slate-900">{tf('newsletterTitle') || 'Subscribe to Insights'}</h3>
            <p className="text-body-sm text-slate-500">
              {tf('newsletterDesc') || 'Get monthly technological briefings from our solutions directors.'}
            </p>
          </div>
          
          <div className="w-full lg:w-auto min-w-[320px] md:min-w-[400px]">
            {subscribed ? (
              <div className="p-3.5 bg-green/5 border border-green/20 text-green rounded-xl text-xs font-bold flex items-center gap-2" role="status" aria-live="polite">
                <ShieldCheck size={16} className="text-green" />
                <span>{tf('newsletterSuccess') || 'Thank you for subscribing!'}</span>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubscribe} className="w-full">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder={tf('newsletterPlaceholder') || 'email@company.com'}
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
                      className={`w-full bg-white border rounded-xl pl-4 pr-10 py-3 text-body-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-royal-blue/20 transition-all outline-none ${
                        hasEmailError
                          ? 'border-red-500 bg-red-50/5 focus:border-red-600 focus:ring-red-200/50'
                          : touched && isValidEmail
                          ? 'border-green focus:border-green'
                          : 'border-slate-200 focus:border-royal-blue'
                      }`}
                      disabled={submitting}
                    />
                    {touched && isValidEmail && !error && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green">
                        <Check size={15} className="stroke-[3px]" />
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    aria-label="Submit newsletter subscription"
                    className={`bg-royal-blue hover:bg-deep-navy text-white px-5 rounded-xl text-button transition flex items-center justify-center cursor-pointer border-none ${
                      submitting ? 'opacity-50 cursor-not-allowed bg-slate-400' : ''
                    }`}
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
                {error && (
                  <p id="footer-email-error" className="text-caption font-semibold text-red-500 text-left pl-1 mt-1 flex items-center gap-1 animate-fadeIn" role="alert">
                    <AlertCircle size={12} className="flex-shrink-0" />
                    <span>{error}</span>
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Main Section: Sitemap columns and Company details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(320px,1.25fr)_minmax(160px,0.75fr)_minmax(220px,1fr)_minmax(210px,0.9fr)] items-start gap-12 md:gap-14 lg:gap-16 py-20 border-b border-slate-200/80 text-left">
          
          {/* Column 1: Company Info & Contact Details */}
          <div className="flex flex-col items-start space-y-6 lg:col-span-1">
            <Link href="/" className="inline-flex mb-4" aria-label="HyperCode Home">
              <div 
                style={{
                  background: 'rgba(255, 255, 255, 0.98)',
                  borderRadius: '20px',
                  padding: '14px 18px',
                  border: '1px solid rgba(15, 23, 42, 0.08)',
                  boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04)'
                }}
                className="inline-flex items-center justify-center hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src="/hypercodeit.logo.png"
                  alt="HyperCode Logo"
                  width={150}
                  height={115}
                  quality={100}
                  className="h-auto w-[130px] md:w-[140px] lg:w-[150px]"
                  priority
                />
              </div>
            </Link>
            
            <p className="text-body text-slate-500 max-w-[360px]">
              {tf('tagline') || 'Enterprise AI & Digital Transformation Consulting'}
            </p>
            
            {/* Contact Details */}
            <div className="space-y-6 text-slate-500">
              {/* Address */}
              <div className="flex items-start gap-4">
                <MapPin className="text-royal-blue mt-1.5 flex-shrink-0 w-[20px] h-[20px]" />
                <address className="not-italic text-body-sm text-slate-550 space-y-1">
                  <span className="block text-h4 text-slate-800 mb-2">{tf('corporateHq')}</span>
                  <span className="block">2095 Hammond Dr</span>
                  <span className="block">Suite C</span>
                  <span className="block">Schaumburg, IL 60173</span>
                  <span className="block text-royal-blue font-bold mt-1.5">{tf('unitedStates')}</span>
                </address>
              </div>
              
              {/* Email */}
              <a 
                href="mailto:hello@hypercodeit.com" 
                className="flex items-center gap-4 text-slate-550 hover:text-royal-blue transition-colors group font-semibold text-body-sm"
              >
                <Mail className="text-royal-blue group-hover:text-royal-blue transition-colors flex-shrink-0 w-[20px] h-[20px]" />
                <span>hello@hypercodeit.com</span>
              </a>
              
              {/* Phone */}
              <a 
                href="tel:+18005550199" 
                className="flex items-center gap-4 text-green hover:text-royal-blue transition-colors group font-semibold text-body-sm"
              >
                <Phone className="text-green group-hover:text-royal-blue transition-colors flex-shrink-0 w-[20px] h-[20px]" />
                <span>2243510727</span>
              </a>
            </div>

            {/* Social media links */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://www.linkedin.com/company/hypercode-llc/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with HyperCode on LinkedIn"
                className="w-[44px] h-[44px] rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-royal-blue hover:border-royal-blue/30 hover:shadow-lg hover:shadow-royal-blue/10 hover:-translate-y-1 transition-all duration-250 ease-out"
              >
                <svg className="w-[20px] h-[20px] fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/hypercodeit?utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow HyperCode on Instagram"
                className="w-[44px] h-[44px] rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-royal-blue hover:border-royal-blue/30 hover:shadow-lg hover:shadow-royal-blue/10 hover:-translate-y-1 transition-all duration-250 ease-out"
              >
                <svg
                  className="w-[20px] h-[20px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-royal-blue" />
              <h4 className="text-eyebrow text-slate-800">{tc('company')}</h4>
            </div>
            <ul className="space-y-5 text-body-sm font-semibold">
              <li><Link href="/about" className="text-slate-500 inline-block transform transition-all duration-250 ease-out hover:translate-x-[3px] hover:text-royal-blue">{tNav('about')}</Link></li>
              <li><Link href="/careers" className="text-slate-500 inline-block transform transition-all duration-250 ease-out hover:translate-x-[3px] hover:text-royal-blue">{tNav('careers')}</Link></li>
              <li><Link href="/contact" className="text-slate-500 inline-block transform transition-all duration-250 ease-out hover:translate-x-[3px] hover:text-royal-blue">{tNav('contact')}</Link></li>
            </ul>
          </div>

          {/* Column 3: Solutions (Pillar 1) */}
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-royal-blue" />
              <h4 className="text-eyebrow text-slate-800">{tc('solutions')}</h4>
            </div>
            <ul className="space-y-5 text-body-sm font-semibold">
              {solutionsList.slice(0, 7).map((s, idx) => (
                <li key={idx}>
                  <Link href={s.href} className="text-slate-500 inline-block transform transition-all duration-250 ease-out hover:translate-x-[3px] hover:text-royal-blue">{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Solutions (Pillar 2) */}
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-royal-blue" />
              <h4 className="text-eyebrow text-slate-800">{tc('moreSolutions')}</h4>
            </div>
            <ul className="space-y-5 text-body-sm font-semibold">
              {solutionsList.slice(7).map((s, idx) => (
                <li key={idx}>
                  <Link href={s.href} className="text-slate-500 inline-block transform transition-all duration-250 ease-out hover:translate-x-[3px] hover:text-royal-blue">{s.name}</Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/solutions"
                  className="relative inline-flex items-center gap-2 text-button text-royal-blue group transition-all duration-250 ease-out hover:translate-x-[3px]"
                >
                  <span className="relative pb-0.5">
                    {tNav('viewAllSolutions')}
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-royal-blue to-blue-500 transform scale-x-0 origin-left transition-transform duration-250 ease-out group-hover:scale-x-100" />
                  </span>
                  <ArrowRight className="h-4.5 w-4.5 transition-transform duration-250 ease-out group-hover:translate-x-[2px]" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Legal & Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 text-eyebrow text-slate-450 w-full">
          <p className="text-center sm:text-left">{copyrightText}</p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2.5">
            <Link href="/PP" className="hover:text-royal-blue transition-colors">{tf('privacy')}</Link>
            <Link href="/TnC" className="hover:text-royal-blue transition-colors">{tf('terms')}</Link>
            <Link href="/cookie-policy" className="hover:text-royal-blue transition-colors">{tf('cookiePolicy')}</Link>
            <button
              type="button"
              onClick={openPreferences}
              className="hover:text-royal-blue cursor-pointer bg-transparent border-none p-0 text-left text-eyebrow text-slate-450 outline-none"
            >
              {tf('cookieSettings')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
