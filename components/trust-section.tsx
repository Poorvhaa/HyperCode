'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { standardReveal } from '@/lib/motion-tokens';

const PILLAR_IDS = ['nationwide', 'government', 'enterprise', 'certified'] as const;

const pillarReveal = {
  hidden: { opacity: 0, y: 12 },
  visible: (custom: { delay?: number; isReduced?: boolean } = {}) => ({
    opacity: 1,
    y: 0,
    transition: custom.isReduced
      ? { duration: 0.3, delay: custom.delay ?? 0 }
      : { type: 'spring' as const, stiffness: 90, damping: 20, delay: custom.delay ?? 0 },
  }),
};

export function TrustSection() {
  const t = useTranslations('HomepageRedesign.TrustSection');
  const prefersReducedMotion = useReducedMotion();
  const isReduced = !!prefersReducedMotion;

  const pillars = PILLAR_IDS.map((id, index) => ({
    id,
    number: String(index + 1).padStart(2, '0'),
    title: t(`pillars.${id}.title`),
    description: t(`pillars.${id}.description`),
  }));

  return (
    <section
      className="relative bg-white text-left overflow-hidden border-b border-slate-200/90"
      aria-labelledby="trust-section-heading"
    >
      <div className="max-w-[90rem] min-w-0 mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-14 sm:py-16 md:py-20 lg:py-24 xl:py-[7rem]">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,9fr)_minmax(0,11fr)] gap-12 md:gap-14 lg:gap-16 xl:gap-20 items-start">
          {/* Introductory column — ~45% */}
          <motion.div
            initial={standardReveal.hidden}
            whileInView={standardReveal.visible({ isReduced })}
            viewport={{ once: true, margin: '-80px' }}
            className="min-w-0 lg:sticky lg:top-28"
          >
            <p className="text-[0.6875rem] sm:text-xs font-medium tracking-[0.16em] uppercase text-[#145BFF]">
              <span className="text-slate-400 mr-1.5">//</span>
              {t('eyebrow')}
            </p>

            <h2
              id="trust-section-heading"
              className="mt-4 sm:mt-5 font-[family-name:var(--font-display)] font-bold text-[clamp(1.875rem,1.2vw+1.25rem,3.75rem)] leading-[1.12] tracking-[-0.025em] text-[#08162D] w-full min-w-0"
            >
              {t('title')}
            </h2>

            <p className="mt-5 sm:mt-6 text-[clamp(1rem,0.25vw+0.94rem,1.1875rem)] text-slate-600 leading-[1.7] max-w-[28rem] w-full min-w-0">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Differentiators column — ~55% */}
          <div className="min-w-0 w-full">
            <ol className="list-none m-0 p-0">
              {pillars.map((pillar, index) => (
                <li key={pillar.id} className="relative">
                  {index > 0 && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileInView={{ scaleX: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={
                        isReduced
                          ? { duration: 0.3, delay: index * 0.04 }
                          : { duration: 0.55, ease: [0.23, 1, 0.32, 1], delay: index * 0.06 }
                      }
                      className="h-px bg-slate-200/90 origin-left"
                      aria-hidden="true"
                    />
                  )}

                  <motion.article
                    custom={{ delay: index * 0.07, isReduced }}
                    initial={pillarReveal.hidden}
                    whileInView={pillarReveal.visible}
                    viewport={{ once: true, margin: '-60px' }}
                    className="group py-7 sm:py-8 md:py-9 lg:py-10"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5 md:gap-7 min-w-0">
                      <span
                        className="shrink-0 font-[family-name:var(--font-display)] font-bold text-[clamp(2.5rem,2.5vw+1.25rem,4rem)] leading-none tracking-[-0.03em] tabular-nums text-slate-200 transition-colors duration-300 sm:group-hover:text-[#145BFF] motion-reduce:transition-none"
                        aria-hidden="true"
                      >
                        {pillar.number}
                      </span>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-[family-name:var(--font-display)] font-semibold text-[clamp(1.25rem,0.5vw+1.05rem,1.75rem)] leading-snug tracking-[-0.015em] text-[#08162D] min-w-0">
                          {pillar.title}
                        </h3>

                        <p className="mt-2.5 sm:mt-3 text-[clamp(1rem,0.15vw+0.94rem,1.125rem)] leading-[1.65] text-slate-600 min-w-0">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
