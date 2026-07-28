'use client';

import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Check, AlertCircle } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useState, type FormEvent } from 'react';
import { EMAIL_REGEX } from '@/lib/validation';
import { useCookieConsent } from '@/hooks/useCookieConsent';

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

  const isValidEmail = EMAIL_REGEX.test(email.trim());

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!email || !isValidEmail) return;
    setSubmitting(true);
    
    const cleanEmail = email.trim().replace(/<[^>]*>/g, '');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, locale, sourcePage: 'footer' })
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail('');
        setTouched(false);
      }
    } catch (err) {
      console.error(err);
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
      style={{
        background: 'linear-gradient(180deg, #0A2360 0%, #071A3A 100%)'
      }}
      className="relative text-left text-[#D7E3F4] overflow-hidden min-h-[500px]"
    >
      {/* Top Accent Gradient Border */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#1769F5] via-[#08A8D8] to-[#2DBD3E] absolute top-0 left-0 right-0 z-20" />
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-slate-800/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-slate-800/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,91,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,91,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-10 relative z-10">
        
        {/* Top section: Newsletter Subscribe Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-14 border-b border-white/10">
          <div className="space-y-2 text-left max-w-xl">
            <h3 className="text-xl font-bold text-white tracking-tight">{tf('newsletterTitle') || 'Subscribe to Insights'}</h3>
            <p className="text-base text-[#C8D5E8] leading-relaxed font-semibold">
              {tf('newsletterDesc') || 'Get monthly technological briefings from our solutions directors.'}
            </p>
          </div>
          
          <div className="w-full lg:w-auto min-w-[320px] md:min-w-[400px]">
            {subscribed ? (
              <div className="p-4 bg-emerald-950/40 border border-emerald-800 text-emerald-400 rounded-2xl text-sm font-bold flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-500" />
                <span>{tf('newsletterSuccess') || 'Thank you for subscribing!'}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="w-full">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      required
                      placeholder={tf('newsletterPlaceholder') || 'email@company.com'}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (e.target.value.length > 5) setTouched(true);
                      }}
                      onBlur={() => setTouched(true)}
                      autoComplete="email"
                      inputMode="email"
                      className={`w-full bg-white/5 border rounded-2xl pl-5 pr-10 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#35C7F4]/25 transition-all outline-none ${
                        touched && !isValidEmail
                          ? 'border-red-500 ring-2 ring-red-100 bg-red-50/10'
                          : touched && isValidEmail
                          ? 'border-green-500 ring-2 ring-green-100 bg-green-50/5'
                          : 'border-white/10 focus:border-[#35C7F4]'
                      }`}
                      disabled={submitting}
                      aria-label="Email address"
                    />
                    {touched && isValidEmail && (
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-green-400">
                        <Check size={18} className="stroke-[3px]" />
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={submitting || !isValidEmail}
                    className={`bg-gradient-to-r from-royal-blue to-green hover:from-royal-blue hover:to-bright-lime hover:shadow-[0_0_15px_rgba(20,91,255,0.4)] active:scale-95 text-white px-6 rounded-2xl text-sm font-bold transition-all flex items-center justify-center cursor-pointer border-none shadow-md ${
                      (!isValidEmail || submitting) ? 'opacity-50 cursor-not-allowed bg-slate-700 hover:bg-slate-700' : ''
                    }`}
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
                {touched && !isValidEmail && (
                  <p className="text-xs font-semibold text-red-400 text-left pl-1 mt-1 flex items-center gap-1 animate-fadeIn" role="alert">
                    <AlertCircle size={14} className="flex-shrink-0" />
                    <span>{locale === 'es' ? 'Por favor introduzca un correo válido.' : 'Please enter a valid email address.'}</span>
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Main Section: Sitemap columns and Company details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr] gap-10 lg:gap-12 py-16 border-b border-white/10 text-left">
          
          {/* Column 1: Company Info & Contact Details */}
          <div className="space-y-6 lg:col-span-1">
            <Link href="/" className="flex items-center">
              <Image
                src="/hypercodeit.logo.png"
                alt="HyperCode Logo"
                width={180}
                height={180}
                priority
                className="h-auto w-[140px] md:w-[160px] lg:w-[180px] object-contain"
                quality={100}
              />
            </Link>
            
            <p className="text-xs text-[#C8D5E8] font-bold uppercase tracking-wider leading-relaxed">
              {tf('tagline') || 'Enterprise AI & Digital Transformation Consulting'}
            </p>
            
            {/* Contact Details */}
            <div className="space-y-4 text-xs sm:text-sm text-[#C8D5E8]">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#35C7F4] mt-0.5 flex-shrink-0" />
                <div className="leading-relaxed font-medium">
                  <span className="block text-white font-bold mb-1">{tf('corporateHq')}</span>
                  <span>2095 Hammond Dr</span><br />
                  <span>Suite C</span><br />
                  <span>Schaumburg, IL 60173</span><br />
                  <span className="text-[#35C7F4] font-bold">{tf('unitedStates')}</span>
                </div>
              </div>
              
              {/* Email */}
              <a 
                href="mailto:solutions@hypercodeit.com" 
                className="flex items-center gap-3 text-[#D7E3F4] hover:text-[#35C7F4] transition-colors duration-200 group font-medium"
              >
                <Mail size={18} className="text-[#35C7F4] group-hover:text-[#35C7F4] transition-colors flex-shrink-0" />
                <span>solutions@hypercodeit.com</span>
              </a>
              
              {/* Phone */}
              <a 
                href="tel:+18005550199" 
                className="flex items-center gap-3 text-[#D7E3F4] hover:text-[#67D94B] transition-colors duration-200 group font-medium"
              >
                <Phone size={18} className="text-[#67D94B] group-hover:text-[#67D94B] transition-colors flex-shrink-0" />
                <span>+1 (800) 555-0199</span>
              </a>
            </div>

            {/* Social media icons */}
            <div className="flex items-center space-x-3.5 pt-2">
              <a
                href="https://www.linkedin.com/company/hypercode-llc/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-icon-btn"
              >
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/hypercodeit?utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-icon-btn"
              >
                <svg
                  className="w-[18px] h-[18px]"
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
            <div className="flex items-center gap-2.5">
              <span className="w-[3px] h-[18px] bg-gradient-to-b from-[#1769F5] to-[#2DBD3E] rounded-full" />
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">{tc('company')}</h4>
            </div>
            <ul className="space-y-4 text-sm font-semibold">
              <li><Link href="/about" className="footer-link">{tNav('about')}</Link></li>
              <li><Link href="/careers" className="footer-link">{tNav('careers')}</Link></li>
              <li><Link href="/contact" className="footer-link">{tNav('contact')}</Link></li>
            </ul>
          </div>

          {/* Column 3: Solutions (Pillar 1) */}
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-2.5">
              <span className="w-[3px] h-[18px] bg-gradient-to-b from-[#1769F5] to-[#2DBD3E] rounded-full" />
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">{tc('solutions')}</h4>
            </div>
            <ul className="space-y-4 text-sm font-semibold">
              {solutionsList.slice(0, 7).map((s, idx) => (
                <li key={idx}>
                  <Link href={s.href} className="footer-link">{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Solutions (Pillar 2) */}
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-2.5 opacity-0 hidden lg:flex select-none">
              <span className="w-[3px] h-[18px] bg-[#1769F5] rounded-full" />
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Continued</h4>
            </div>
            <ul className="space-y-4 text-sm font-semibold lg:mt-[44px]">
              {solutionsList.slice(7).map((s, idx) => (
                <li key={idx}>
                  <Link href={s.href} className="footer-link">{s.name}</Link>
                </li>
              ))}
              <li>
                <Link
                  href="/solutions"
                  className="footer-link font-bold mt-1 inline-flex items-center gap-1"
                >
                  <span>{tNav('viewAllSolutions')}</span>
                  <ArrowRight size={12} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Legal & Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 text-xs font-semibold text-[#AFC0D7] uppercase tracking-widest w-full">
          <p className="text-center sm:text-left">{copyrightText}</p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2.5">
            <Link href="/PP" className="footer-link">{tf('privacy')}</Link>
            <Link href="/TnC" className="footer-link">{tf('terms')}</Link>
            <Link href="/cookie-policy" className="footer-link">{tf('cookiePolicy')}</Link>
            <button
              type="button"
              onClick={openPreferences}
              className="footer-link cursor-pointer bg-transparent border-none p-0 text-left uppercase tracking-widest text-xs font-semibold outline-none"
            >
              {tf('cookieSettings')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
