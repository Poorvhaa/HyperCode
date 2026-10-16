'use client';

import { useTranslations } from 'next-intl';
import { MaskedReveal } from '@/components/motion/masked-reveal';
import { CapabilityExplorer } from './capabilities/capability-explorer';

export function ServiceEcosystem() {
  const t = useTranslations('HomepageRedesign.ServiceEcosystem');

  return (
    <section
      id="services"
      data-section-theme="hero"
      className="relative bg-[#0B1018] text-left overflow-hidden border-b border-white/[0.06]"
      aria-labelledby="services-section-heading"
    >
      <div className="relative z-[2] max-w-[90rem] min-w-0 mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pt-10 sm:pt-12 md:pt-16 lg:pt-20 pb-10 sm:pb-14 md:pb-16 lg:pb-20 xl:pb-24">
        <header className="max-w-3xl landing-section-header-gap">
          <MaskedReveal>
            <p className="text-[0.6875rem] sm:text-xs font-semibold tracking-[0.14em] uppercase text-white/45">
              {t('badge')}
            </p>
          </MaskedReveal>
          <MaskedReveal delay={0.06} className="mt-5 sm:mt-6">
            <h2
              id="services-section-heading"
              className="font-[family-name:var(--font-display)] font-bold text-[clamp(2.75rem,2.2vw+1.25rem,3.75rem)] leading-[1.12] tracking-[-0.03em] text-white max-w-[18ch]"
            >
              {t('title')}
            </h2>
          </MaskedReveal>
          <MaskedReveal delay={0.12} className="mt-5 sm:mt-6">
            <p className="text-[clamp(1.0625rem,0.2vw+0.98rem,1.1875rem)] leading-[1.75] text-white/55 max-w-2xl">
              {t('subtitle')}
            </p>
          </MaskedReveal>
        </header>

        <CapabilityExplorer />
      </div>
    </section>
  );
}
