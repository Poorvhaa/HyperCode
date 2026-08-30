'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import { crossfade } from '@/lib/motion-tokens';
import { useLandingMotion } from '@/hooks/use-landing-motion';
import type { ServiceNode } from '@/data/service-ecosystem';

type CapabilityActivePanelProps = {
  node: ServiceNode;
  index: number;
  total: number;
};

export function CapabilityActivePanel({ node, index, total }: CapabilityActivePanelProps) {
  const t = useTranslations('HomepageRedesign.ServiceEcosystem');
  const tNav = useTranslations('Navigation');
  const { isReduced } = useLandingMotion();

  const number = String(index + 1).padStart(2, '0');

  return (
    <div className="min-h-[14rem] sm:min-h-[16rem]" aria-live="polite" aria-atomic="true">
      <AnimatePresence mode="wait">
        <motion.div
          key={node.id}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={crossfade}
          custom={{ reduced: isReduced }}
        >
          <span
            className="text-[0.6875rem] sm:text-xs font-semibold tabular-nums tracking-[0.12em] text-[#25B5FF]"
            aria-hidden="true"
          >
            {number}
          </span>

          <Link
            href={node.href}
            className="group mt-4 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25B5FF]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1018]"
          >
            <h3 className="font-[family-name:var(--font-display)] font-bold text-[clamp(1.75rem,2.2vw+0.75rem,3.25rem)] leading-[1.08] tracking-[-0.03em] text-white transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 motion-reduce:group-hover:translate-x-0">
              {tNav(node.titleKey)}
            </h3>

            <p className="mt-4 sm:mt-5 max-w-xl text-[clamp(1rem,0.2vw+0.94rem,1.125rem)] leading-[1.75] text-white/60">
              {tNav(node.descKey)}
            </p>

            <p className="mt-3 sm:mt-4 max-w-lg text-[0.8125rem] sm:text-sm font-medium leading-snug text-[#5BC46A]/90">
              {t(`outcomes.${node.outcomeKey}`)}
            </p>

            <span className="mt-6 sm:mt-7 inline-flex items-center gap-2 text-[0.8125rem] sm:text-sm font-semibold text-[#25B5FF] transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:gap-3">
              {t('viewService')}
              <ArrowRight
                size={15}
                className="shrink-0 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                aria-hidden="true"
              />
            </span>
          </Link>

          <span className="sr-only">
            {number} of {String(total).padStart(2, '0')}: {tNav(node.titleKey)}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
