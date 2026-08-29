'use client';

import { useTranslations } from 'next-intl';
import { LandingReveal } from '@/components/motion/landing-reveal';
import { LogoMarquee } from '@/components/motion/logo-marquee';
import { TrustMetricStat } from '@/components/trust-section/trust-metric-stat';
import { CLIENT_LOGOS } from '@/data/client-logos';
import { TRUST_METRICS } from '@/data/trust-metrics';

const PILLAR_IDS = ['nationwide', 'government', 'enterprise', 'certified'] as const;

export function TrustSection() {
  const t = useTranslations('HomepageRedesign.TrustSection');

  const pillars = PILLAR_IDS.map((id, index) => ({
    id,
    number: String(index + 1).padStart(2, '0'),
    title: t(`pillars.${id}.title`),
    description: t(`pillars.${id}.description`),
  }));

  return (
    <section
      className="relative bg-[#F5F2EB] text-left overflow-hidden"
      aria-labelledby="trust-section-heading"
    >
      <div className="relative max-w-[90rem] min-w-0 mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pt-14 sm:pt-16 lg:pt-20 pb-20 sm:pb-24 md:pb-28 lg:pb-32 xl:pb-36">
        <LandingReveal className="mb-12 sm:mb-14 lg:mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-10 sm:gap-y-0">
            {TRUST_METRICS.map((metric) => (
              <TrustMetricStat
                key={metric.id}
                target={metric.target}
                suffix={metric.suffix}
                label={t(metric.labelKey)}
              />
            ))}
          </div>
        </LandingReveal>

        <LogoMarquee
          logos={CLIENT_LOGOS}
          ariaLabel={t('logoMarqueeAriaLabel')}
          className="mb-12 sm:mb-14 lg:mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-14 lg:gap-20 xl:gap-28 items-start">
          <LandingReveal className="min-w-0 lg:sticky lg:top-28 lg:max-w-[22rem]">
            <p className="text-[0.6875rem] sm:text-xs font-semibold tracking-[0.14em] uppercase text-[#8A8478]">
              {t('eyebrow')}
            </p>

            <h2
              id="trust-section-heading"
              className="mt-5 sm:mt-6 font-[family-name:var(--font-display)] font-bold text-[clamp(1.875rem,1.1vw+1.2rem,2.75rem)] leading-[1.14] tracking-[-0.025em] text-[#1A2332] w-full min-w-0"
            >
              {t('title')}
            </h2>

            <p className="mt-5 sm:mt-6 text-[clamp(1rem,0.2vw+0.94rem,1.125rem)] leading-[1.75] text-[#5C6470] max-w-[26rem] w-full min-w-0">
              {t('subtitle')}
            </p>
          </LandingReveal>

          <ol className="list-none m-0 p-0 min-w-0 w-full">
            {pillars.map((pillar, index) => (
              <li
                key={pillar.id}
                className={`py-8 sm:py-9 md:py-10 ${index > 0 ? 'border-t border-[#1A2332]/[0.07]' : ''}`}
              >
                <article className="grid grid-cols-[3rem_1fr] sm:grid-cols-[3.5rem_1fr] gap-x-5 sm:gap-x-7 min-w-0">
                  <span
                    className="pt-0.5 font-[family-name:var(--font-display)] text-sm font-semibold tabular-nums tracking-[0.06em] text-[#B8B2A6]"
                    aria-hidden="true"
                  >
                    {pillar.number}
                  </span>

                  <div className="min-w-0">
                    <h3 className="font-[family-name:var(--font-display)] font-semibold text-[clamp(1.125rem,0.4vw+1rem,1.375rem)] leading-snug tracking-[-0.015em] text-[#1A2332]">
                      {pillar.title}
                    </h3>

                    <p className="mt-2.5 sm:mt-3 text-[clamp(0.9375rem,0.15vw+0.9rem,1.0625rem)] leading-[1.7] text-[#5C6470] max-w-[34rem]">
                      {pillar.description}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#1A2332]/[0.06]"
        aria-hidden="true"
      />
    </section>
  );
}
