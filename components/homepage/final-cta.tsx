'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import { LandingReveal } from '@/components/motion/landing-reveal';
import { useLandingMotion } from '@/hooks/use-landing-motion';
import { buttonSpringTransition } from '@/lib/motion-tokens';

const MotionLink = motion.create(Link);

function PrimaryCTA({ label, href }: { label: string; href: string }) {
  const { isReduced } = useLandingMotion();
  const spring = buttonSpringTransition(isReduced);

  return (
    <MotionLink
      href={href}
      className="group relative inline-flex h-12 min-h-[48px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-white px-8 text-sm font-semibold tracking-[-0.01em] text-[#131517] shadow-[0_1px_0_rgba(255,255,255,0.08)_inset] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071426] sm:w-auto motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]"
      whileHover={
        isReduced
          ? undefined
          : {
              y: -1,
              boxShadow: '0 12px 40px rgba(255,255,255,0.14)',
            }
      }
      whileTap={
        isReduced
          ? undefined
          : {
              y: 0,
              boxShadow: '0 4px 16px rgba(255,255,255,0.08)',
            }
      }
      transition={spring}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-[110%] skew-x-[-14deg] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-[850ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-[110%] motion-reduce:transition-none motion-reduce:group-hover:translate-x-[-110%]"
      />
      <span className="relative">{label}</span>
      <ArrowRight
        size={16}
        aria-hidden="true"
        className="brand-button-icon-motion relative shrink-0 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
      />
    </MotionLink>
  );
}

function SecondaryContactAction({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="group/link inline-flex min-h-11 w-full items-center justify-center gap-2 text-sm font-medium text-white/45 hover:text-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#071426] sm:w-auto brand-button-motion"
    >
      <span>{label}</span>
      <ArrowRight
        size={15}
        aria-hidden="true"
        className="brand-button-icon-motion shrink-0 opacity-60 group-hover/link:translate-x-0.5 group-hover/link:opacity-100 motion-reduce:group-hover/link:translate-x-0"
      />
    </Link>
  );
}

export function FinalCTA() {
  const t = useTranslations('cta');
  const { enableMotion, isReduced } = useLandingMotion();

  return (
    <section
      id="consultation-section"
      data-section-theme="final-cta"
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden border-t border-slate-300/20 bg-[#071426] text-center"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(20,91,255,0.035) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 mx-auto min-w-0 max-w-[90rem] px-5 sm:px-8 lg:px-12 xl:px-16 landing-section-py">
        <LandingReveal
          enableMotion={enableMotion}
          isReduced={isReduced}
          className="mx-auto flex min-w-0 max-w-[38rem] flex-col items-center"
        >
          <h2
            id="final-cta-heading"
            className="font-[family-name:var(--font-display)] text-[clamp(2rem,1.6vw+1.1rem,3.5rem)] font-bold leading-[1.08] tracking-[-0.035em] text-white"
          >
            {t('heading')}
          </h2>

          <div className="mt-12 flex w-full flex-col items-stretch gap-5 sm:mt-14 sm:flex-row sm:items-center sm:justify-center sm:gap-8 md:mt-16 lg:mt-20">
            <PrimaryCTA label={t('primaryButton')} href="/consultation" />
            <SecondaryContactAction label={t('secondaryButton')} href="/contact" />
          </div>
        </LandingReveal>
      </div>
    </section>
  );
}
