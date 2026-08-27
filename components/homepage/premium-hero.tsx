'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import { standardReveal } from '@/lib/motion-tokens';
import { HeroGlobe } from '@/components/homepage/hero-globe';

export function PremiumHero() {
  const t = useTranslations('HomepageRedesign.Hero');
  const prefersReducedMotion = useReducedMotion();
  const isReduced = !!prefersReducedMotion;

  const headlineLine2 = t('headlineLine2');

  return (
    <section
      data-section-theme="hero"
      className="relative w-full max-w-full min-w-0 text-white pt-24 sm:pt-28 lg:pt-[8.5rem] pb-16 sm:pb-20 lg:pb-24 min-h-0"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[#020B18]" />
        <div
          className="absolute inset-y-0 right-0 w-[45%] opacity-60"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 100% 40%, rgba(20,91,255,0.07) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative max-w-[90rem] min-w-0 mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:gap-x-12 xl:gap-x-16 lg:items-center">
          {/* Content — mobile order 1 */}
          <motion.div
            initial={standardReveal.hidden}
            animate={standardReveal.visible({ isReduced })}
            className="relative z-10 min-w-0 w-full order-1 lg:max-w-[42rem] xl:max-w-[44rem]"
          >
            <p className="text-[0.6875rem] sm:text-[0.75rem] font-medium tracking-[0.16em] uppercase text-[#5BA8FF] leading-relaxed">
              {t('badge')}
            </p>

            <h1 className="mt-5 sm:mt-6 font-[family-name:var(--font-display)] font-extrabold text-[clamp(2.125rem,1.6vw+1.25rem,4.75rem)] leading-[1.06] tracking-[-0.03em] text-white w-full min-w-0">
              {t('headlineLine1')}
              {headlineLine2 ? (
                <>
                  {' '}
                  {headlineLine2}
                </>
              ) : null}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#25B5FF] to-[#48B900] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                {t('headlineGradient')}
              </span>
            </h1>

            <p className="mt-5 sm:mt-6 lg:mt-7 text-[clamp(1rem,0.25vw+0.94rem,1.1875rem)] text-[#B8C8DC] w-full min-w-0 max-w-[36rem] leading-[1.7]">
              {t('supporting')}
            </p>

            <div className="mt-7 sm:mt-8 lg:mt-10 flex w-full min-w-0 flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/consultation"
                className="inline-flex w-full sm:w-auto min-w-0 min-h-[44px] items-center justify-center gap-2 rounded-sm px-6 sm:px-7 text-[0.9375rem] sm:text-base font-semibold leading-snug text-white !whitespace-normal bg-gradient-to-r from-[#145BFF] to-[#48B900] transition-[opacity,transform] duration-200 hover:opacity-[0.92] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25B5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020B18] group"
              >
                <span>{t('ctaPrimary')}</span>
                <ArrowRight
                  size={16}
                  className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex w-full sm:w-auto min-w-0 min-h-[44px] items-center justify-center gap-2 rounded-sm px-6 sm:px-7 text-[0.9375rem] sm:text-base font-semibold leading-snug text-white !whitespace-normal border border-[rgba(255,255,255,0.22)] bg-transparent transition-colors duration-200 hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25B5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020B18] group"
              >
                <span>{t('ctaSecondary')}</span>
                <ArrowRight
                  size={16}
                  className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </motion.div>

          {/* Visual — mobile order 2, after CTAs */}
          <motion.div
            initial={standardReveal.hidden}
            animate={standardReveal.visible({ isReduced, delay: isReduced ? 0 : 0.1 })}
            className="relative z-[1] min-w-0 w-full order-2 mt-12 sm:mt-14 lg:mt-0 lg:flex lg:items-center lg:justify-end"
          >
            <HeroGlobe className="lg:max-w-[min(100%,32rem)] xl:max-w-[min(100%,36rem)] lg:ml-auto" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
