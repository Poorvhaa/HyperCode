'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { ShieldCheck } from 'lucide-react';

export function CookieBanner() {
  const t = useTranslations('CookieConsent.banner');
  const locale = useLocale();
  const { isBannerVisible, acceptAll, rejectAll, openPreferences } = useCookieConsent();

  return (
    <AnimatePresence>
      {isBannerVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 md:p-8"
        >
          <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.12)] rounded-3xl p-6 md:p-7 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                <ShieldCheck size={22} className="stroke-[2.2px]" />
              </div>
              <div className="space-y-1 text-left">
                <h4 className="text-sm font-extrabold text-slate-900 tracking-tight uppercase tracking-wider text-[11px] text-slate-400">
                  {locale === 'es' ? 'Aviso de Cookies' : 'Cookie Notice'}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                  {t('text')}{' '}
                  <Link
                    href="/cookie-policy"
                    className="text-[#0F4C81] hover:text-[#0D3F6D] font-extrabold underline underline-offset-4 decoration-2 decoration-[#0F4C81]/30 hover:decoration-[#0D3F6D] transition-colors"
                  >
                    {t('policyLink')}
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto justify-end">
              <button
                type="button"
                onClick={openPreferences}
                className="w-full sm:w-auto text-center px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-slate-350 transition-all cursor-pointer outline-none focus:ring-2 focus:ring-[#0F4C81]/25"
              >
                {t('managePreferences')}
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="w-full sm:w-auto text-center px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-550 hover:text-slate-800 bg-white border border-slate-200 hover:border-slate-350 transition-all cursor-pointer outline-none focus:ring-2 focus:ring-[#0F4C81]/25"
              >
                {t('rejectNonEssential')}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="w-full sm:w-auto text-center px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#0F4C81] hover:bg-[#0c3d69] shadow-lg shadow-blue-900/10 hover:shadow-blue-900/15 active:scale-98 transition-all cursor-pointer border-none outline-none focus:ring-2 focus:ring-[#0F4C81]/25"
              >
                {t('acceptAll')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
