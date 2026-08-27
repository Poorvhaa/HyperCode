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
      className="relative w-full max-w-full min-w-0 text-white pt-[5.75rem] sm:pt-24 lg:pt-[7rem] pb-12 sm:pb-16 lg:pb-20 min-h-0"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[#020B18]" />
        <div
          className="absolute inset-y-0 right-0 w-[48%] opacity-70"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 100% 40%, rgba(20,91,255,0.09) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative max-w-[90rem] min-w-0 mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:gap-x-10 xl:gap-x-16 lg:items-center">
          {/* Content — mobile order 1 */}
          <motion.div
            initial={standardReveal.hidden}
            animate={standardReveal.visible({ isReduced })}
            className="relative z-10 min-w-0 w-full order-1 lg:max-w-[42rem] xl:max-w-[44rem]"
          >
            <p className="text-[0.6875rem] sm:text-[0.75rem] font-medium tracking-[0.16em] uppercase text-[#5BA8FF] leading-relaxed">
              {t('badge')}
            </p>

            <h1 className="mt-4 sm:mt-5 font-[family-name:var(--font-display)] font-extrabold text-[clamp(2rem,1.5vw+1.2rem,4.5rem)] leading-[1.06] tracking-[-0.03em] text-white w-full min-w-0 text-balance">
              {t('headlineLine1')}
              {headlineLine2 ? (
                <>
                  {' '}
                  {headlineLine2}
                </>
              ) : null}{' '}
              <span className="whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[#25B5FF] to-[#48B900] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                {t('headlineGradient')}
              </span>
            </h1>

            <p className="mt-4 sm:mt-5 lg:mt-6 text-[clamp(0.9375rem,0.2vw+0.9rem,1.125rem)] text-[#B8C8DC] w-full min-w-0 max-w-[34rem] leading-[1.65]">
              {t('supporting')}
            </p>

            <div className="mt-6 sm:mt-7 lg:mt-8 flex w-full min-w-0 flex-col sm:flex-row flex-wrap gap-3 sm:gap-3.5">
              <Link
                href="/consultation"
                className="inline-flex w-full sm:w-auto min-w-0 min-h-[44px] items-center justify-center gap-2 rounded-sm px-6 sm:px-7 text-[0.9375rem] sm:text-base font-semibold leading-snug text-white !whitespace-normal bg-gradient-to-r from-[#145BFF] to-[#48B900] transition-[opacity,transform,box-shadow] duration-200 hover:opacity-[0.94] hover:-translate-y-px hover:shadow-[0_4px_18px_rgba(20,91,255,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25B5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020B18] active:translate-y-0 group"
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
                className="inline-flex w-full sm:w-auto min-w-0 min-h-[44px] items-center justify-center gap-2 rounded-sm px-6 sm:px-7 text-[0.9375rem] sm:text-base font-semibold leading-snug text-white !whitespace-normal border border-[rgba(255,255,255,0.22)] bg-transparent transition-[background-color,border-color,transform] duration-200 hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.34)] hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25B5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020B18] active:translate-y-0 group"
              >
                <span>{t('ctaSecondary')}</span>
                <ArrowRight
                  size={16}
                  className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/* Trust strip — typography only, verified facts */}
            <p
              className="mt-5 sm:mt-6 lg:mt-7 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.6875rem] sm:text-[0.75rem] font-medium tracking-[0.04em] text-[#7A8FA8] leading-relaxed"
              aria-label={`${t('trustStripUsa')}, ${t('trustStripConsulting')}, ${t('trustStripCapabilities')}`}
            >
              <span>{t('trustStripUsa')}</span>
              <span className="text-[#4A5E78] select-none" aria-hidden="true">
                |
              </span>
              <span>{t('trustStripConsulting')}</span>
              <span className="text-[#4A5E78] select-none" aria-hidden="true">
                |
              </span>
              <span className="text-[#8A9BB2]">{t('trustStripCapabilities')}</span>
            </p>
          </motion.div>

          {/* Visual — mobile order 2, after content + trust strip */}
          <motion.div
            initial={standardReveal.hidden}
            animate={standardReveal.visible({ isReduced, delay: isReduced ? 0 : 0.1 })}
            className="relative z-[1] min-w-0 w-full order-2 mt-8 sm:mt-10 lg:mt-0 lg:flex lg:items-center lg:justify-end"
          >
            <HeroGlobe className="max-w-[min(100%,22rem)] sm:max-w-[min(100%,26rem)] lg:max-w-[min(100%,28rem)] xl:max-w-[min(100%,34rem)] lg:ml-auto opacity-[0.92] lg:opacity-100" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
