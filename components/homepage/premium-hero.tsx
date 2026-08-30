'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import { HeroHeadlineMask, HeroTextReveal } from '@/components/homepage/hero/hero-text-reveal';
import { HeroBackground } from '@/components/homepage/hero/hero-background';
import { HeroScrollCue } from '@/components/homepage/hero/hero-transition';
import { HeroArchitectureVisual } from '@/components/homepage/hero/hero-architecture-visual';
import { buildHeroHeadlineLines } from '@/components/homepage/hero/hero-headline-lines';
import { useLandingMotion } from '@/hooks/use-landing-motion';
import { staggerContainer, staggerItem } from '@/lib/motion-tokens';

const PROOF_CHIP_KEYS = ['0', '1', '2', '3'] as const;

const proofChipClassName =
  'inline-flex items-center rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-[0.6875rem] font-medium tracking-[0.03em] text-[#9BB0C8] leading-none backdrop-blur-sm';

export function PremiumHero() {
  const t = useTranslations('HomepageRedesign.Hero');
  const { enableMotion, isReduced } = useLandingMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(
    scrollYProgress,
    [0, 0.35, 0.82, 1],
    [0, isReduced ? 0 : -20, isReduced ? 0 : -28, isReduced ? 0 : -44],
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.78, 0.92, 1],
    [1, 1, isReduced ? 1 : 0.88, isReduced ? 1 : 0.72],
  );
  const visualY = useTransform(
    scrollYProgress,
    [0, 0.35, 0.82, 1],
    [0, isReduced ? 0 : 10, isReduced ? 0 : 18, isReduced ? 0 : 32],
  );
  const visualScale = useTransform(scrollYProgress, [0, 0.82, 1], [1, isReduced ? 1 : 0.97, isReduced ? 1 : 0.94]);
  const visualOpacity = useTransform(
    scrollYProgress,
    [0, 0.82, 1],
    [1, isReduced ? 1 : 0.92, isReduced ? 1 : 0.78],
  );

  const headlineLines = buildHeroHeadlineLines(t('headlineLine1'), t('headlineGradient'));
  const proofChips = PROOF_CHIP_KEYS.map((key) => t(`proofChips.${key}`));

  return (
    <section
      ref={sectionRef}
      data-section-theme="hero"
      className="relative w-full max-w-full min-w-0 overflow-x-clip bg-[#030A14] text-white"
    >
      <HeroBackground scrollProgress={scrollYProgress} />

      <div className="relative w-full pt-[4.75rem] pb-12 sm:pt-[5rem] sm:pb-14 lg:pt-[5.25rem] lg:pb-16">
        <motion.div
          className="relative mx-auto w-full min-w-0 max-w-[90rem] px-5 sm:px-8 lg:px-12 xl:px-16 pt-3 sm:pt-4 lg:pt-5 xl:pt-6"
          style={{
            y: enableMotion && !isReduced ? contentY : 0,
            opacity: enableMotion && !isReduced ? contentOpacity : 1,
          }}
        >
          <div className="relative lg:grid lg:grid-cols-[55fr_45fr] lg:items-center lg:gap-x-0">
            {/* Readability scrim where visual bleeds inward */}
            <div
              className="pointer-events-none absolute inset-y-[-10%] left-0 z-10 hidden w-[62%] lg:block"
              aria-hidden="true"
              style={{
                background:
                  'linear-gradient(to right, rgba(3,10,20,0.55) 0%, rgba(3,10,20,0.28) 45%, transparent 100%)',
              }}
            />

            {/* Editorial content — 55% */}
            <div className="relative z-20 order-1 w-full min-w-0 max-w-[36rem] lg:max-w-none lg:pr-8 xl:pr-12">
              <HeroHeadlineMask
                className="font-[family-name:var(--font-display)] font-bold text-[clamp(2.125rem,2.4vw+0.85rem,3.625rem)] leading-[1.06] tracking-[-0.038em] text-[#F4F7FB] w-full min-w-0"
                lines={headlineLines}
                lineBaseDelay={0.14}
              />

              <HeroTextReveal
                delay={0.46}
                as="p"
                className="mt-5 sm:mt-6 text-[clamp(0.9375rem,0.15vw+0.88rem,1.0625rem)] text-[#8FA3BA] leading-[1.72] w-full min-w-0"
              >
                <span className="block max-w-[36rem]">{t('supporting')}</span>
              </HeroTextReveal>

              <HeroTextReveal delay={0.58} as="div" className="mt-7 sm:mt-8 flex w-full min-w-0 flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 lg:gap-8">
                <Link
                  href="/consultation"
                  className="hero-cta-primary group inline-flex w-full sm:w-auto min-w-0 min-h-[46px] items-center justify-center gap-2 rounded-lg px-6 sm:px-7 text-[0.9375rem] font-semibold leading-snug text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25B5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030A14]"
                >
                  <span>{t('ctaPrimary')}</span>
                  <ArrowRight
                    size={15}
                    className="brand-button-icon-motion shrink-0 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/case-studies"
                  className="hero-cta-ghost group inline-flex w-full sm:w-auto min-w-0 min-h-[46px] items-center justify-center gap-2 px-1 text-[0.9375rem] font-medium text-[#C5D3E3] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25B5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030A14] rounded-sm"
                >
                  <span>{t('ctaSecondary')}</span>
                  <ArrowRight
                    size={15}
                    className="brand-button-icon-motion shrink-0 opacity-60 group-hover:translate-x-0.5 group-hover:opacity-100 motion-reduce:group-hover:translate-x-0"
                    aria-hidden="true"
                  />
                </Link>
              </HeroTextReveal>

              {enableMotion ? (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  custom={{ reduced: isReduced }}
                  className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2"
                  aria-label={proofChips.join(', ')}
                >
                  {proofChips.map((chip) => (
                    <motion.span
                      key={chip}
                      variants={staggerItem}
                      custom={{ reduced: isReduced }}
                      className={proofChipClassName}
                    >
                      {chip}
                    </motion.span>
                  ))}
                </motion.div>
              ) : (
                <div
                  className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2"
                  aria-label={proofChips.join(', ')}
                >
                  {proofChips.map((chip) => (
                    <span key={chip} className={proofChipClassName}>
                      {chip}
                    </span>
                  ))}
                </div>
              )}

              <HeroTextReveal
                delay={0.68}
                as="p"
                className="mt-6 sm:mt-7 hidden sm:flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] font-medium tracking-[0.05em] text-[#5C7088] leading-relaxed"
                aria-label={`${t('trustStripUsa')}, ${t('trustStripConsulting')}, ${t('trustStripCapabilities')}`}
              >
                <span>{t('trustStripUsa')}</span>
                <span className="text-[#3A4F66] select-none" aria-hidden="true">
                  ·
                </span>
                <span>{t('trustStripConsulting')}</span>
                <span className="text-[#3A4F66] select-none" aria-hidden="true">
                  ·
                </span>
                <span>{t('trustStripCapabilities')}</span>
              </HeroTextReveal>
            </div>

            {/* Architecture visual — 45%, bleeds center */}
            <motion.div
              className="relative order-2 mt-10 w-full min-w-0 sm:mt-12 lg:absolute lg:inset-y-0 lg:right-[-8%] lg:mt-0 lg:w-[58%] xl:right-[-10%] xl:w-[62%]"
              style={{
                y: enableMotion && !isReduced ? visualY : 0,
                scale: enableMotion && !isReduced ? visualScale : 1,
                opacity: enableMotion && !isReduced ? visualOpacity : 1,
              }}
            >
              <div className="relative h-[min(52vw,360px)] sm:h-[min(44vw,400px)] lg:h-[min(58vh,500px)] lg:max-h-[520px] w-full">
                <HeroArchitectureVisual
                  scrollProgress={scrollYProgress}
                  entranceDelay={0.48}
                  className="absolute inset-0 lg:-ml-[12%]"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <HeroScrollCue />
    </section>
  );
}
