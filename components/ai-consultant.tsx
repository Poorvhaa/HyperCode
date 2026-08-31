'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import { MessageSquare } from 'lucide-react';
import dynamic from 'next/dynamic';

const AIConsultantPanel = dynamic(() => import('./ai-consultant-panel'), {
  ssr: false,
});

export default function AIConsultant() {
  const t = useTranslations('AIConsultant');
  const locale = useLocale();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  const isHomepage = pathname === '/';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isHomepage) {
      setPastHero(true);
      return;
    }

    const hero = document.querySelector('[data-section-theme="hero"]');
    if (!hero) {
      setPastHero(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHomepage, pathname]);

  if (!mounted) return null;

  const isHeroMode = isHomepage && !pastHero && !isOpen;

  return createPortal(
    <div className="fixed bottom-0 right-0 z-[999999] pointer-events-none">
      {isOpen && (
        <AIConsultantPanel onClose={() => setIsOpen(false)} locale={locale} />
      )}

      {!isOpen && (
        <div className="fixed bottom-24 right-4 sm:bottom-7 sm:right-6 pointer-events-auto">
          <div
            className={`relative flex items-center justify-center ${
              isHeroMode ? 'h-11 w-11' : 'h-14 w-14'
            }`}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full border border-[#2563EB]/25 motion-safe:animate-ping motion-reduce:hidden [animation-duration:2.8s] [animation-timing-function:ease-out]"
            />
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              title={t('tooltip')}
              aria-label={t('tooltip')}
              aria-haspopup="dialog"
              className={`relative z-10 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border-none bg-gradient-to-br from-[#2563EB] to-[#0F4FBF] text-white shadow-[0_8px_24px_rgba(37,99,235,0.30)] outline-none transition-[transform,box-shadow,filter] duration-200 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.04] motion-safe:hover:brightness-110 motion-safe:hover:shadow-[0_12px_28px_rgba(37,99,235,0.38)] motion-safe:active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 cursor-pointer shrink-0 ${
                isHeroMode ? 'h-11 w-11' : 'h-14 w-14'
              }`}
            >
              <MessageSquare
                className={`shrink-0 text-white ${isHeroMode ? 'h-5 w-5' : 'h-6 w-6'}`}
                strokeWidth={2.25}
                aria-hidden="true"
              />

              {!isHeroMode && (
                <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                  <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>,
    document.body,
  );
}
