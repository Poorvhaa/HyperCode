'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { heroEase } from '@/lib/motion-tokens';
import { useLandingMotion } from '@/hooks/use-landing-motion';
import type { ServiceNode } from '@/data/service-ecosystem';
import { CapabilitiesVisual } from './capabilities-visual';
import { getVisualTheme } from './capabilities-constants';

type CapabilityServiceRowProps = {
  node: ServiceNode;
  index: number;
  total: number;
  isActive: boolean;
  setRef: (el: HTMLElement | null) => void;
  onHover: (index: number | null) => void;
};

export function CapabilityServiceRow({
  node,
  index,
  total,
  isActive,
  setRef,
  onHover,
}: CapabilityServiceRowProps) {
  const t = useTranslations('HomepageRedesign.ServiceEcosystem');
  const tNav = useTranslations('Navigation');
  const { enableMotion, isReduced } = useLandingMotion();

  const number = String(index + 1).padStart(2, '0');
  const visualServiceId = getVisualTheme(node.id);

  return (
    <article
      ref={setRef}
      className={cn(
        'group border-b border-white/[0.08] py-12 sm:py-14 lg:py-16 transition-[opacity,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        isActive ? 'opacity-100 border-white/[0.14]' : 'opacity-[0.42] lg:opacity-[0.38]',
      )}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Mobile inline visual */}
      <div className="mb-8 lg:hidden">
        <CapabilitiesVisual serviceId={visualServiceId} compact />
      </div>

      <div className="flex items-start gap-6 sm:gap-8">
        <span
          className={cn(
            'shrink-0 pt-1 text-[0.6875rem] sm:text-xs font-semibold tabular-nums tracking-[0.12em] transition-colors duration-400',
            isActive ? 'text-[#25B5FF]' : 'text-white/30 group-hover:text-white/50',
          )}
          aria-hidden="true"
        >
          {number}
        </span>

        <div className="min-w-0 flex-1">
          <Link
            href={node.href}
            className={cn(
              'block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25B5FF]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1018]',
            )}
          >
            <div className="overflow-hidden">
              {enableMotion && isActive && !isReduced ? (
                <motion.h3
                  key={`title-${node.id}-active`}
                  initial={{ y: 56, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.65, ease: heroEase }}
                  className={cn(
                    'font-[family-name:var(--font-display)] font-bold text-[clamp(1.75rem,2.2vw+0.75rem,3.25rem)] leading-[1.08] tracking-[-0.03em] text-white',
                    'transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 motion-reduce:group-hover:translate-x-0',
                  )}
                >
                  {tNav(node.titleKey)}
                </motion.h3>
              ) : (
                <h3
                  className={cn(
                    'font-[family-name:var(--font-display)] font-bold text-[clamp(1.75rem,2.2vw+0.75rem,3.25rem)] leading-[1.08] tracking-[-0.03em] text-white',
                    'transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 motion-reduce:group-hover:translate-x-0',
                  )}
                >
                  {tNav(node.titleKey)}
                </h3>
              )}
            </div>

            <div className="overflow-hidden">
              {enableMotion && isActive && !isReduced ? (
                <motion.p
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.08, ease: heroEase }}
                  className="mt-4 sm:mt-5 max-w-xl text-[clamp(1rem,0.2vw+0.94rem,1.125rem)] leading-[1.75] text-white/60"
                >
                  {tNav(node.descKey)}
                </motion.p>
              ) : (
                <p className="mt-4 sm:mt-5 max-w-xl text-[clamp(1rem,0.2vw+0.94rem,1.125rem)] leading-[1.75] text-white/60">
                  {tNav(node.descKey)}
                </p>
              )}
            </div>

            <p className="mt-3 sm:mt-4 max-w-lg text-[0.8125rem] sm:text-sm font-medium leading-snug text-[#5BC46A]/90">
              {t(`outcomes.${node.outcomeKey}`)}
            </p>

            <span
              className={cn(
                'mt-6 sm:mt-7 inline-flex items-center gap-2 text-[0.8125rem] sm:text-sm font-semibold text-[#25B5FF]',
                'transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:gap-3',
              )}
            >
              {t('viewService')}
              <ArrowRight
                size={15}
                className="shrink-0 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                aria-hidden="true"
              />
            </span>
          </Link>
        </div>
      </div>

      <span className="sr-only">
        {number} of {String(total).padStart(2, '0')}: {tNav(node.titleKey)}
      </span>
    </article>
  );
}
