'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import { standardReveal } from '@/lib/motion-tokens';

function FinalCTAContent() {
  const t = useTranslations('cta');
  const isReduced = useReducedMotion();

  return (
    <section
      id="consultation-section"
      data-section-theme="final-cta"
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden bg-[#071A3A] text-left"
    >
      {/* Single restrained accent */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#145BFF]/40 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto min-w-0 max-w-[90rem] px-5 py-14 sm:px-8 sm:py-16 md:py-20 lg:px-12 lg:py-24 xl:px-16 xl:py-[8.75rem]">
        <div className="grid min-w-0 grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
          {/* Left: editorial content */}
          <motion.div
            initial={standardReveal.hidden}
            whileInView={standardReveal.visible({ isReduced })}
            viewport={{ once: true, margin: '-80px' }}
            className="min-w-0 lg:col-span-7"
          >
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-[#5B9AFF] sm:text-xs">
              <span className="mr-1.5 text-white/35">//</span>
              {t('badge')}
            </p>

            <h2
              id="final-cta-heading"
              className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.875rem,1.4vw+1.1rem,4rem)] font-bold leading-[1.12] tracking-[-0.025em] text-white sm:mt-5"
            >
              {t('heading')}
            </h2>

            <p className="mt-5 max-w-[34rem] text-[clamp(1rem,0.25vw+0.94rem,1.1875rem)] leading-[1.7] text-[#AFC0D7] sm:mt-6">
              {t('description')}
            </p>
          </motion.div>

          {/* Right: CTAs */}
          <motion.div
            initial={standardReveal.hidden}
            whileInView={standardReveal.visible({ isReduced, delay: 0.08 })}
            viewport={{ once: true, margin: '-80px' }}
            className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center lg:col-span-5 lg:flex-col lg:items-stretch xl:gap-5"
          >
            <Link
              href="/consultation"
              className="PrimaryBrandButton group flex w-full items-center justify-center gap-2 sm:w-auto lg:w-full motion-reduce:hover:translate-y-0"
              aria-label={t('primaryButton')}
            >
              <span>{t('primaryButton')}</span>
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
              />
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-12 min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-white/25 px-7 text-[clamp(0.875rem,1vw,1rem)] font-semibold leading-snug text-white transition-all duration-250 hover:border-white/40 hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071A3A] sm:w-auto lg:w-full"
              aria-label={t('secondaryButton')}
            >
              <span>{t('secondaryButton')}</span>
              <ArrowRight size={16} aria-hidden="true" className="shrink-0 opacity-70" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return <FinalCTAContent />;
}
