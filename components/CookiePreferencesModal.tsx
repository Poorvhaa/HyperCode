'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { X, ShieldCheck, Lock, BarChart3, Settings, Share2 } from 'lucide-react';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { CookieToggle } from './CookieToggle';

export function CookiePreferencesModal() {
  const t = useTranslations('CookieConsent.modal');
  
  const {
    consent,
    isPreferencesOpen,
    closePreferences,
    savePreferences,
    acceptAll,
    rejectAll,
  } = useCookieConsent();

  // Local state for toggles
  const [prefs, setPrefs] = useState({
    analytics: false,
    functional: false,
    marketing: false,
  });

  const modalRef = useRef<HTMLDivElement>(null);

  // Sync local states with saved consent when modal opens
  useEffect(() => {
    if (isPreferencesOpen) {
      setPrefs({
        analytics: consent?.analytics ?? false,
        functional: consent?.functional ?? false,
        marketing: consent?.marketing ?? false,
      });
    }
  }, [isPreferencesOpen, consent]);

  // Focus trap and ESC key navigation
  useEffect(() => {
    if (!isPreferencesOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePreferences();
        return;
      }

      if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    const previousFocusedElement = document.activeElement as HTMLElement;

    window.addEventListener('keydown', handleKeyDown);

    // Initial focus on the close button or first element
    setTimeout(() => {
      if (modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input'
        );
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      }
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (previousFocusedElement) {
        previousFocusedElement.focus();
      }
    };
  }, [isPreferencesOpen, closePreferences]);

  const handleToggle = (category: 'analytics' | 'functional' | 'marketing') => (checked: boolean) => {
    setPrefs((prev) => ({ ...prev, [category]: checked }));
  };

  const handleSave = () => {
    savePreferences(prefs);
  };

  return (
    <AnimatePresence>
      {isPreferencesOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closePreferences}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
            aria-describedby="cookie-preferences-desc"
            className="relative w-full max-w-3xl bg-white border border-slate-200 shadow-2xl rounded-3xl overflow-hidden z-10 flex flex-col max-h-[85vh] text-left"
          >
            
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-slate-100 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#0F4C81]">
                  <ShieldCheck size={20} className="stroke-[2.2px]" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{t('title') ? 'Privacy' : 'HyperCode Privacy'}</span>
                </div>
                <h3
                  id="cookie-preferences-title"
                  className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight"
                >
                  {t('title')}
                </h3>
              </div>
              <button
                type="button"
                onClick={closePreferences}
                aria-label={t('close')}
                className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100/80 active:scale-95 transition-all cursor-pointer outline-none focus:ring-2 focus:ring-[#0F4C81]/25"
              >
                <X size={18} className="stroke-[2.2px]" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
              <p id="cookie-preferences-desc" className="text-sm text-slate-500 leading-relaxed font-semibold">
                {t('description')}
              </p>

              {/* Categories Toggles */}
              <div className="space-y-6">
                
                {/* Strictly Necessary */}
                <div className="p-5 sm:p-6 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                      <Lock size={18} />
                    </div>
                    <div className="space-y-1 text-left">
                      <h4 className="text-sm font-bold text-slate-900 tracking-tight">{t('necessary.title')}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-semibold">{t('necessary.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-14 sm:ml-0">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 select-none bg-slate-100 px-2 py-1 rounded-md">
                      {t('necessary.title') ? 'Always On' : 'Necesario'}
                    </span>
                    <CookieToggle
                      id="cookie-necessary"
                      checked={true}
                      disabled={true}
                      onChange={() => {}}
                      ariaLabel={t('necessary.title')}
                    />
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="p-5 sm:p-6 rounded-2xl border border-slate-150 bg-white hover:border-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0">
                      <BarChart3 size={18} />
                    </div>
                    <div className="space-y-1 text-left">
                      <h4 className="text-sm font-bold text-slate-900 tracking-tight">{t('analytics.title')}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-semibold">{t('analytics.description')}</p>
                    </div>
                  </div>
                  <div className="ml-14 sm:ml-0 flex-shrink-0">
                    <CookieToggle
                      id="cookie-analytics"
                      checked={prefs.analytics}
                      onChange={handleToggle('analytics')}
                      ariaLabel={t('analytics.title')}
                    />
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="p-5 sm:p-6 rounded-2xl border border-slate-150 bg-white hover:border-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700 flex-shrink-0">
                      <Settings size={18} />
                    </div>
                    <div className="space-y-1 text-left">
                      <h4 className="text-sm font-bold text-slate-900 tracking-tight">{t('functional.title')}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-semibold">{t('functional.description')}</p>
                    </div>
                  </div>
                  <div className="ml-14 sm:ml-0 flex-shrink-0">
                    <CookieToggle
                      id="cookie-functional"
                      checked={prefs.functional}
                      onChange={handleToggle('functional')}
                      ariaLabel={t('functional.title')}
                    />
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="p-5 sm:p-6 rounded-2xl border border-slate-150 bg-white hover:border-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-700 flex-shrink-0">
                      <Share2 size={18} />
                    </div>
                    <div className="space-y-1 text-left">
                      <h4 className="text-sm font-bold text-slate-900 tracking-tight">{t('marketing.title')}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-semibold">{t('marketing.description')}</p>
                    </div>
                  </div>
                  <div className="ml-14 sm:ml-0 flex-shrink-0">
                    <CookieToggle
                      id="cookie-marketing"
                      checked={prefs.marketing}
                      onChange={handleToggle('marketing')}
                      ariaLabel={t('marketing.title')}
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex w-full sm:w-auto gap-3">
                <button
                  type="button"
                  onClick={rejectAll}
                  className="w-full sm:w-auto text-center px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:border-slate-300 transition-all cursor-pointer outline-none focus:ring-2 focus:ring-[#0F4C81]/25"
                >
                  {t('rejectAll')}
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="w-full sm:w-auto text-center px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-800 bg-white border border-slate-200 hover:border-slate-300 transition-all cursor-pointer outline-none focus:ring-2 focus:ring-[#0F4C81]/25"
                >
                  {t('acceptAll')}
                </button>
              </div>
              <button
                type="button"
                onClick={handleSave}
                className="w-full sm:w-auto text-center px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#0F4C81] hover:bg-[#0D3F6D] shadow-lg shadow-blue-500/10 hover:shadow-blue-500/15 active:scale-98 transition-all cursor-pointer border-none outline-none focus:ring-2 focus:ring-[#0F4C81]/25"
              >
                {t('savePreferences')}
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
