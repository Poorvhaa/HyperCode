'use client';

import { useTranslations } from 'next-intl';
import { LandingReveal } from '@/components/motion/landing-reveal';

const PARTNERS = [
  { name: 'Microsoft', typeKey: 'microsoftType' },
  { name: 'Azure', typeKey: 'azureType' },
  { name: 'AWS', typeKey: 'awsType' },
  { name: 'Snowflake', typeKey: 'snowflakeType' },
  { name: 'Databricks', typeKey: 'databricksType' },
  { name: 'Tableau', typeKey: 'tableauType' },
] as const;

export function TechPartnersSection() {
  const t = useTranslations('HomepageRedesign.TechPartners');

  return (
    <div className="relative bg-[#F5F2EB]">
      <div className="max-w-[90rem] min-w-0 mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pt-14 sm:pt-16 lg:pt-[4.5rem] pb-12 sm:pb-14">
        <LandingReveal>
          <p className="text-[0.6875rem] sm:text-xs font-semibold tracking-[0.14em] uppercase text-[#8A8478]">
            {t('eyebrow')}
          </p>

          <ul
            className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-8 sm:gap-y-10"
            aria-label={t('eyebrow')}
          >
            {PARTNERS.map((partner) => (
              <li key={partner.name} className="min-w-0">
                <p className="font-[family-name:var(--font-display)] text-[0.9375rem] sm:text-base font-semibold tracking-[-0.015em] text-[#1A2332] leading-snug">
                  {partner.name}
                </p>
                <p className="mt-1.5 text-[0.6875rem] sm:text-xs font-medium tracking-[0.02em] text-[#8A8478] leading-relaxed">
                  {t(partner.typeKey)}
                </p>
              </li>
            ))}
          </ul>
        </LandingReveal>
      </div>

      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12 xl:px-16" aria-hidden="true">
        <div className="h-px bg-[#1A2332]/[0.07]" />
      </div>
    </div>
  );
}
