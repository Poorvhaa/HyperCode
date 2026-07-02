'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export function CTASection() {
  const t = useTranslations();

  return (
    <section className="py-36 bg-gradient-to-br from-slate-950 via-[#0a0e17] to-slate-950 text-white text-center relative overflow-hidden border-t border-b border-white/5">
      {/* Background radial gradient decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        <h2 className="text-xs font-bold text-[#60A5FA] tracking-widest uppercase">
          {t('cta.badge')}
        </h2>
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight max-w-2xl mx-auto">
          {t('cta.heading')}
        </h3>
        <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
          {t('cta.description')}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(59,130,246,0.35)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.6)] cursor-pointer hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
          >
            {t('cta.primaryButton')}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-12 px-8 bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-white font-bold text-sm tracking-wide rounded-xl transition-all duration-300 shadow-md cursor-pointer hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
          >
            {t('cta.secondaryButton')}
          </Link>
        </div>
      </div>
    </section>
  );
}
