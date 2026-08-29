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
        <button
          onClick={() => setIsOpen(true)}
          title={t('tooltip')}
          aria-label="Open AI Consultant"
          aria-haspopup="dialog"
          className={`fixed bottom-24 right-4 sm:bottom-7 sm:right-6 flex items-center justify-center rounded-full bg-[#145BFF] text-white pointer-events-auto cursor-pointer transition-[transform,opacity,box-shadow] duration-300 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#145BFF] border-none ${
            isHeroMode
              ? 'h-10 w-10 opacity-50 shadow-md shadow-blue-900/15 hover:opacity-75'
              : 'h-14 w-14 opacity-100 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          <MessageSquare className={isHeroMode ? 'h-5 w-5' : 'h-6 w-6'} />

          {!isHeroMode && (
            <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
            </span>
          )}
        </button>
      )}
    </div>,
    document.body,
  );
}
