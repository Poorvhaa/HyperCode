'use client';

import { useTranslations } from 'next-intl';
import {
  BadgeCheck,
  Building2,
  Landmark,
  MapPin,
  type LucideIcon,
} from 'lucide-react';
import { LandingReveal } from '@/components/motion/landing-reveal';
import { MaskedReveal } from '@/components/motion/masked-reveal';
import { LogoMarquee } from '@/components/motion/logo-marquee';
import { TrustMetricStat } from '@/components/trust-section/trust-metric-stat';
import { CLIENT_LOGOS } from '@/data/client-logos';
import { TRUST_METRICS } from '@/data/trust-metrics';
import { useLandingMotion } from '@/hooks/use-landing-motion';

const PILLAR_IDS = ['nationwide', 'government', 'enterprise', 'certified'] as const;

type PillarId = (typeof PILLAR_IDS)[number];

const PILLAR_ICONS: Record<PillarId, LucideIcon> = {
  nationwide: MapPin,
  government: Landmark,
  enterprise: Building2,
  certified: BadgeCheck,
};

const TECH_PARTNER_NAMES = [
  'Microsoft',
  'Azure',
  'AWS',
  'Snowflake',
  'Databricks',
  'Tableau',
] as const;

export function TrustSection() {
  const t = useTranslations('HomepageRedesign.TrustSection');
  const tPartners = useTranslations('HomepageRedesign.TechPartners');
  const { enableMotion, isReduced } = useLandingMotion();

  const pillars = PILLAR_IDS.map((id, index) => ({
    id,
    number: String(index + 1).padStart(2, '0'),
    icon: PILLAR_ICONS[id],
    title: t(`pillars.${id}.title`),
    description: t(`pillars.${id}.description`),
  }));

  const hasClientLogos = CLIENT_LOGOS.length > 0;

  return (
    <section
      data-section-theme="light"
      className="relative w-full max-w-full min-w-0 overflow-x-clip text-[#1A2332]"
      aria-labelledby="trust-section-heading"
    >
      {/* Metrics — warm neutral surface */}
      <div className="relative landing-surface-metrics">
        <div
          className="pointer-events-none absolute inset-0 landing-brand-glow-blue"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[90rem] min-w-0 px-5 sm:px-8 lg:px-12 xl:px-16 landing-section-py-after-hero">
          <LandingReveal className="mb-0">
            <div className="landing-card-enterprise px-6 py-7 sm:px-10 sm:py-9 lg:px-12">
              <div className="grid grid-cols-1 gap-y-7 sm:grid-cols-3 sm:gap-y-0 sm:divide-x sm:divide-[#1A2332]/[0.08]">
                {TRUST_METRICS.map((metric, index) => (
                  <div
                    key={metric.id}
                    className={`min-w-0 ${index > 0 ? 'sm:pl-8 lg:pl-10 xl:pl-12' : ''} ${index > 0 ? 'border-t border-[#1A2332]/[0.08] pt-7 sm:border-t-0 sm:pt-0' : ''}`}
                  >
                    <TrustMetricStat
                      target={metric.target}
                      suffix={metric.suffix}
                      label={t(metric.labelKey)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </LandingReveal>
        </div>
      </div>

      {/* Trusted Technology Expertise — compact trust strip */}
      <div className="relative landing-surface-trust-strip">
        <div className="mx-auto max-w-[90rem] min-w-0 px-5 sm:px-8 lg:px-12 xl:px-16 py-4 sm:py-5 lg:py-6">
          {hasClientLogos ? (
            <LogoMarquee logos={CLIENT_LOGOS} ariaLabel={t('logoMarqueeAriaLabel')} />
          ) : (
            <MaskedReveal delay={0.04}>
              <p className="text-[0.6875rem] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#8A8478]">
                {tPartners('eyebrow')}
              </p>
              <ul
                className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 sm:gap-x-8 lg:gap-x-10"
                aria-label={tPartners('eyebrow')}
              >
                {TECH_PARTNER_NAMES.map((name) => (
                  <li key={name}>
                    <span className="font-[family-name:var(--font-display)] text-[0.875rem] sm:text-[0.9375rem] font-semibold tracking-[-0.02em] text-[#1A2332]/60">
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            </MaskedReveal>
          )}
        </div>
      </div>

      {/* Why HyperCode — tinted pillar section */}
      <div className="relative landing-surface-trust-pillars">
        <div
          className="pointer-events-none absolute inset-0 landing-brand-glow-blue"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 landing-brand-glow-green"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 landing-grid-light opacity-[0.22]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[90rem] min-w-0 px-5 sm:px-8 lg:px-12 xl:px-16 landing-section-py-join pb-10 sm:pb-14 md:pb-16 lg:pb-20 xl:pb-24">
          <div className="grid grid-cols-1 items-start gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-x-12 xl:gap-x-16">
            <MaskedReveal className="min-w-0 lg:max-w-[24rem]">
              <p className="text-[0.6875rem] sm:text-xs font-semibold tracking-[0.14em] uppercase text-[#8A8478]">
                {t('eyebrow')}
              </p>

              <h2
                id="trust-section-heading"
                className="mt-4 sm:mt-5 font-[family-name:var(--font-display)] font-bold text-[clamp(1.875rem,1.1vw+1.2rem,2.75rem)] leading-[1.14] tracking-[-0.025em] text-[#1A2332] w-full min-w-0"
              >
                {t('title')}
              </h2>

              <p className="mt-4 sm:mt-5 text-[clamp(1rem,0.2vw+0.94rem,1.125rem)] leading-[1.75] text-[#5C6470] max-w-[26rem] w-full min-w-0">
                {t('subtitle')}
              </p>
            </MaskedReveal>

            <ol className="m-0 grid min-w-0 list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 sm:gap-5">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;

                return (
                  <li key={pillar.id}>
                    <MaskedReveal
                      enableMotion={enableMotion}
                      isReduced={isReduced}
                      delay={0.08 + index * 0.05}
                      className="h-full"
                    >
                      <article className="group relative flex h-full flex-col landing-card-enterprise p-5 transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[#145BFF]/20 hover:shadow-[0_18px_44px_rgba(20,91,255,0.07)] sm:p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#145BFF]/12 bg-gradient-to-br from-[#F4F8FF] to-[#F3FAF8] text-[#145BFF] transition-colors duration-300 group-hover:border-[#145BFF]/22 group-hover:from-[#EEF4FF] group-hover:to-[#ECFAF5]">
                            <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                          </div>
                          <span
                            className="pt-0.5 font-[family-name:var(--font-display)] text-xs font-semibold tabular-nums tracking-[0.08em] text-[#B8B2A6]"
                            aria-hidden="true"
                          >
                            {pillar.number}
                          </span>
                        </div>

                        <h3 className="mt-4 font-[family-name:var(--font-display)] font-semibold text-[clamp(1.0625rem,0.35vw+0.98rem,1.25rem)] leading-snug tracking-[-0.015em] text-[#1A2332]">
                          {pillar.title}
                        </h3>

                        <p className="mt-2.5 text-[clamp(0.9375rem,0.15vw+0.9rem,1.0625rem)] leading-[1.68] text-[#5C6470]">
                          {pillar.description}
                        </p>
                      </article>
                    </MaskedReveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#1A2332]/[0.07]"
        aria-hidden="true"
      />
    </section>
  );
}
