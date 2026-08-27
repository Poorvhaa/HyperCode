'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations, useLocale } from 'next-intl';
import { MessageSquare } from 'lucide-react';
import dynamic from 'next/dynamic';

const AIConsultantPanel = dynamic(() => import('./ai-consultant-panel'), {
  ssr: false,
});

export default function AIConsultant() {
  const t = useTranslations('AIConsultant');
  const locale = useLocale();

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed bottom-0 right-0 z-[999999] pointer-events-none">
      
      {/* 1. Dynamic Chat Panel loaded only when open */}
      {isOpen && (
        <AIConsultantPanel 
          onClose={() => setIsOpen(false)} 
          locale={locale} 
        />
      )}

      {/* 2. Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          title={t('tooltip')}
          aria-label="Open AI Consultant"
          aria-haspopup="dialog"
          className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 w-14 h-14 rounded-full bg-gradient-to-tr from-[#145BFF] to-[#00C9A7] text-white flex items-center justify-center shadow-xl shadow-blue-500/25 pointer-events-auto cursor-pointer hover:shadow-blue-500/35 transition duration-200 shrink-0 hover:scale-105 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#145BFF] border-none group"
        >
          <MessageSquare className="w-6 h-6 group-hover:scale-105 transition duration-200" />
          
          {/* Subtle outer glowing pulsing ring */}
          <div
            className="absolute -inset-1 rounded-full border border-blue-500/20 pointer-events-none animate-ping"
            style={{ animationDuration: '3s' }}
          />

          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
          </span>
        </button>
      )}

    </div>,
    document.body
  );
}
