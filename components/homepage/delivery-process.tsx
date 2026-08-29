'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { LandingReveal } from '@/components/motion/landing-reveal';
import {
  landingViewport,
  staggerContainer,
  staggerItem,
} from '@/lib/motion-tokens';
import { useLandingMotion } from '@/hooks/use-landing-motion';

const STEP_IDS = ['scoping', 'architecture', 'engineering', 'launch'] as const;

function cleanStepTitle(title: string): string {
  return title.replace(/^\d+\.\s*/, '');
}

export function DeliveryProcess() {
  const t = useTranslations('HomepageRedesign.DeliveryProcess');
  const { enableMotion, isReduced } = useLandingMotion();

  const steps = STEP_IDS.map((id, idx) => ({
    id,
    num: String(idx + 1).padStart(2, '0'),
    title: cleanStepTitle(t(`step${idx + 1}Title` as 'step1Title')),
    desc: t(`step${idx + 1}Desc` as 'step1Desc'),
  }));

  const gridClassName =
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8 xl:gap-10 min-w-0 list-none m-0 p-0';

  const stepCardClassName =
    'min-w-0 border-t border-[#08162D]/[0.08] pt-6 sm:pt-7 lg:pt-8';

  return (
    <section
      data-section-theme="light"
      className="relative bg-[var(--landing-surface)] text-left overflow-hidden border-b landing-divider-light"
      aria-label={t('title')}
    >
      <div
        className="pointer-events-none absolute inset-0 landing-grid-light opacity-20"
        aria-hidden="true"
      />
      <div className="relative max-w-[90rem] min-w-0 mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32">
        <LandingReveal className="max-w-3xl min-w-0 mb-12 sm:mb-14 md:mb-16 lg:mb-20">
          <p className="landing-eyebrow landing-eyebrow-light">
            <span className="text-[#B0BAC8] mr-2">//</span>
            {t('badge')}
          </p>
          <h2 className="mt-5 sm:mt-6 landing-headline text-[#08162D] w-full min-w-0">
            {t('title')}
          </h2>
          <p className="mt-6 sm:mt-7 landing-lead text-[#5A6578] max-w-[32rem] w-full min-w-0">
            {t('subtitle')}
          </p>
        </LandingReveal>

        {enableMotion ? (
          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={landingViewport}
            custom={{ reduced: isReduced }}
            className={gridClassName}
            aria-label={t('title')}
          >
            {steps.map((step) => (
              <motion.li
                key={step.id}
                variants={staggerItem}
                custom={{ reduced: isReduced }}
                className={stepCardClassName}
              >
                <span
                  className="font-[family-name:var(--font-display)] font-bold text-[clamp(2.25rem,3vw,3.5rem)] leading-none tracking-[-0.04em] text-[#145BFF] tabular-nums"
                  aria-hidden="true"
                >
                  {step.num}
                </span>
                <h3 className="mt-4 sm:mt-5 font-[family-name:var(--font-display)] font-semibold text-[clamp(1.0625rem,0.35vw+0.95rem,1.25rem)] leading-snug tracking-[-0.015em] text-[#08162D]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[clamp(0.9375rem,0.15vw+0.9rem,1.0625rem)] text-[#5A6578] leading-[1.7]">
                  {step.desc}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        ) : (
          <ol className={gridClassName} aria-label={t('title')}>
            {steps.map((step) => (
              <li key={step.id} className={stepCardClassName}>
                <span
                  className="font-[family-name:var(--font-display)] font-bold text-[clamp(2.25rem,3vw,3.5rem)] leading-none tracking-[-0.04em] text-[#145BFF] tabular-nums"
                  aria-hidden="true"
                >
                  {step.num}
                </span>
                <h3 className="mt-4 sm:mt-5 font-[family-name:var(--font-display)] font-semibold text-[clamp(1.0625rem,0.35vw+0.95rem,1.25rem)] leading-snug tracking-[-0.015em] text-[#08162D]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[clamp(0.9375rem,0.15vw+0.9rem,1.0625rem)] text-[#5A6578] leading-[1.7]">
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
