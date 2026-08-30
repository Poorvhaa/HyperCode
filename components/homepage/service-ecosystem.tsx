'use client';

import { useTranslations } from 'next-intl';
import { MaskedReveal } from '@/components/motion/masked-reveal';
import { CapabilityExplorer } from './capabilities/capability-explorer';

/** Light surface from TransformationEngine — used to blend the section seam */
const TRANSFORMATION_LIGHT = '#ECEAE4';

export function ServiceEcosystem() {
  const t = useTranslations('HomepageRedesign.ServiceEcosystem');

  return (
    <section
      id="services"
      data-section-theme="hero"
      className="relative bg-[#0B1018] text-left overflow-hidden border-b border-white/[0.06]"
      aria-labelledby="services-section-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-20 sm:h-24 lg:h-28"
        aria-hidden="true"
        style={{
          background: `linear-gradient(to bottom, ${TRANSFORMATION_LIGHT} 0%, rgba(236,234,228,0.72) 22%, rgba(11,16,24,0.52) 62%, #0B1018 100%)`,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 20% 0%, rgba(20,91,255,0.08) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-[2] max-w-[90rem] min-w-0 mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 landing-section-py">
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
