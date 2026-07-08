'use client';

import { Link } from '@/i18n/routing';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useState, type FormEvent } from 'react';

export function Footer() {
  const tNav = useTranslations('Navigation');
  const tf = useTranslations('Footer');
  const tc = useTranslations('Common');
  const locale = useLocale();

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale, sourcePage: 'footer' })
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 5000);
      }
    } catch (err) {
      console.error('Newsletter subscribe error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const triggerOpenChat = () => {
    window.dispatchEvent(new CustomEvent('open-hypercode-chat'));
  };

  const solutionsList = [
    { name: tNav('aiAutomation') || 'AI & Automation', href: `/solutions/ai-consulting` },
    { name: tNav('softwareDev') || 'Software Development', href: `/solutions/custom-software-development` },
    { name: tNav('webDev') || 'Web Development', href: `/solutions/corporate-websites` },
    { name: tNav('mobileDev') || 'Mobile Development', href: `/solutions/ios-apps` },
    { name: tNav('cloudDevOps') || 'Cloud & DevOps', href: `/solutions/cloud-migration` },
    { name: tNav('talentSolutions') || 'IT & Non-IT Talent Solutions', href: `/solutions/permanent-staffing` },
    { name: tNav('digitalTrans') || 'Digital Transformation', href: `/solutions/business-process-automation` },
    { name: tNav('dataAnalytics') || 'Data & Analytics', href: `/solutions/business-intelligence` },
    { name: tNav('cybersecurity') || 'Cybersecurity', href: `/solutions/security-assessment` },
    { name: tNav('uiUx') || 'UI/UX Design', href: `/solutions/ui-design` },
    { name: tNav('marketing') || 'Digital Marketing', href: `/solutions/seo-optimization` },
    { name: tNav('ecommerce') || 'E-commerce', href: `/solutions/shopify-development` },
    { name: tNav('techConsulting') || 'Technology Consulting', href: `/solutions/technology-consulting` },
  ];

  return (
    <footer className="relative bg-[#F8FAFC] border-t border-slate-200 text-left text-slate-550 overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-slate-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-slate-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,76,129,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,76,129,0.015)_1px,transparent_1px)] bg-[size:32px_32px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10">
        
        {/* Top section: Newsletter Subscribe Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-16 border-b border-slate-200">
          <div className="space-y-2 text-left max-w-xl">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">{tf('newsletterTitle') || 'Subscribe to Insights'}</h3>
            <p className="text-[16px] text-slate-550 leading-relaxed font-semibold">
              {tf('newsletterDesc') || 'Get monthly technological briefings from our solutions directors.'}
            </p>
          </div>
          
          <div className="w-full lg:w-auto min-w-[320px] md:min-w-[400px]">
            {subscribed ? (
              <div className="p-4 bg-emerald-50 border border-emerald-250 text-emerald-700 rounded-2xl text-sm font-bold flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-600" />
                <span>{tf('newsletterSuccess') || 'Thank you for subscribing!'}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder={tf('newsletterPlaceholder') || 'email@company.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-sm text-slate-800 focus:outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/25 transition-all outline-none"
                  disabled={submitting}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#0F4C81] hover:bg-[#0D3F6D] active:scale-95 text-white px-6 rounded-2xl text-sm font-bold transition-all flex items-center justify-center cursor-pointer border-none shadow-md shadow-blue-500/10"
                >
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Section: Sitemap columns and Company details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-20 border-b border-slate-200 text-left">
          
          {/* Column 1: Company Info & Contact Details */}
          <div className="space-y-8 lg:col-span-1">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0F4C81] to-[#1e6cb3] flex items-center justify-center text-white font-black text-base shadow-lg shadow-blue-500/20">H</span>
                HyperCode
              </span>
            </Link>
            
            <p className="text-xs text-slate-400 font-extrabold uppercase tracking-widest leading-relaxed">
              {tf('tagline') || 'Enterprise AI & Digital Transformation Consulting'}
            </p>
            
            {/* Contact Details */}
            <div className="space-y-5 text-xs sm:text-sm font-semibold text-slate-550">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-slate-400 mt-1 flex-shrink-0" />
                <div className="leading-relaxed">
                  <span className="block text-slate-900 font-extrabold mb-1">{tf('corporateHq')}</span>
                  <span className="text-slate-655 font-semibold">2095 Hammond Dr</span><br />
                  <span className="text-slate-655 font-semibold">Suite C</span><br />
                  <span className="text-slate-655 font-semibold">Schaumburg, IL 60173</span><br />
                  <span className="text-[#0F4C81] font-bold">{tf('unitedStates')}</span>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-450 font-extrabold uppercase tracking-widest mb-0.5">{tf('phone')}</span>
                  <a href="tel:+15102039270" className="hover:text-[#0F4C81] transition-colors duration-200 text-slate-655 font-bold">
                    +1 (510) 203-9270
                  </a>
                </div>
              </div>
              
              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-455 font-extrabold uppercase tracking-widest mb-0.5">{tf('email')}</span>
                  <a href="mailto:HR@hypercodeus.com" className="hover:text-[#0F4C81] transition-colors duration-200 text-slate-655 font-bold">
                    HR@hypercodeus.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social media icons */}
            <div className="flex items-center space-x-3.5 pt-2">
              <a
                href="https://www.linkedin.com/company/hypercode-llc/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 hover:border-[#0F4C81] hover:bg-[#0F4C81]/5 text-slate-400 hover:text-[#0F4C81] hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 ease-out cursor-pointer"
              >
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-6 text-left">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-l-2 border-[#0F4C81] pl-2">{tc('company')}</h4>
            <ul className="space-y-4 text-sm font-semibold">
              <li><Link href="/about" className="hover:text-[#0F4C81] hover:pl-1.5 inline-block transition-all duration-300 ease-out text-slate-550">{tNav('about')}</Link></li>
              <li><Link href="/careers" className="hover:text-[#0F4C81] hover:pl-1.5 inline-block transition-all duration-300 ease-out text-slate-550">{tNav('careers')}</Link></li>
              <li><Link href="/contact" className="hover:text-[#0F4C81] hover:pl-1.5 inline-block transition-all duration-300 ease-out text-slate-550">{tNav('contact')}</Link></li>
            </ul>
          </div>

          {/* Column 3: Solutions (Pillar 1) */}
          <div className="space-y-6 text-left">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-l-2 border-[#0F4C81] pl-2">{tc('solutions')}</h4>
            <ul className="space-y-4 text-sm font-semibold">
              {solutionsList.slice(0, 7).map((s, idx) => (
                <li key={idx}>
                  <Link href={s.href} className="hover:text-[#0F4C81] hover:pl-1.5 inline-block transition-all duration-300 ease-out text-slate-550">{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Solutions (Pillar 2) */}
          <div className="space-y-6 text-left">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-l-2 border-[#0F4C81] pl-2 opacity-0 hidden lg:block select-none">Continued</h4>
            <ul className="space-y-4 text-sm font-semibold lg:mt-[44px]">
              {solutionsList.slice(7).map((s, idx) => (
                <li key={idx}>
                  <Link href={s.href} className="hover:text-[#0F4C81] hover:pl-1.5 inline-block transition-all duration-300 ease-out text-slate-550">{s.name}</Link>
                </li>
              ))}
              <li>
                <Link
                  href="/solutions"
                  className="hover:text-[#0F4C81] hover:pl-1.5 inline-flex items-center gap-1 transition-all duration-300 ease-out text-[#0F4C81] font-extrabold mt-1"
                >
                  <span>{tNav('viewAllSolutions')}</span>
                  <ArrowRight size={12} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Legal & Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-12 text-xs font-semibold text-slate-400 uppercase tracking-widest">
          <p>{tf('copyright')}</p>
          <div className="flex space-x-6">
            <Link href="/PP" className="hover:text-slate-900 transition-colors duration-200">{tf('privacy')}</Link>
            <Link href="/TnC" className="hover:text-slate-900 transition-colors duration-200">{tf('terms')}</Link>
            <Link href="/sitemap" className="hover:text-slate-900 transition-colors duration-200">{tf('sitemap') || 'Sitemap'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
