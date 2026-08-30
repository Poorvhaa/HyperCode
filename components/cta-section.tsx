'use client';

import { BrandButton } from '@/components/brand-button';
import { useTranslations } from 'next-intl';

export function CTASection() {
  const t = useTranslations();

  return (
    <section 
      style={{
        background: 'linear-gradient(135deg, #061126 0%, #0A1D3F 50%, #07152E 100%)'
      }}
      className="py-32 text-white text-center relative overflow-hidden border-t border-b border-white/5"
    >
      {/* Background radial gradient decorations */}
      <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-[350px] h-[350px] bg-[#1769F5]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-[350px] h-[350px] bg-[#2DBD3E]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,91,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,91,255,0.012)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10 space-y-8">
        <h2 className="text-eyebrow text-[#35C7F4]">
          {t('cta.badge')}
        </h2>
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight max-w-2xl mx-auto text-white">
          {t('cta.heading')}
        </h3>
        <p className="text-lead text-[#C8D5E8] max-w-3xl mx-auto font-medium">
          {t('cta.description')}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <BrandButton href="/consultation" variant="primary" className="w-full sm:w-auto">
            {t('cta.primaryButton')}
          </BrandButton>
          <BrandButton href="/contact" variant="secondary" className="w-full sm:w-auto">
            {t('cta.secondaryButton')}
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
