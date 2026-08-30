'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import type { ServiceNode } from '@/data/service-ecosystem';

type CapabilityActivePanelProps = {
  node: ServiceNode;
  index: number;
  total: number;
  compact?: boolean;
};

export function CapabilityActivePanel({
  node,
  index,
  total,
  compact = false,
}: CapabilityActivePanelProps) {
  const t = useTranslations('HomepageRedesign.ServiceEcosystem');
  const tNav = useTranslations('Navigation');

  const number = String(index + 1).padStart(2, '0');

  return (
    <article aria-live="polite" aria-atomic="true">
      <p className="text-[0.6875rem] sm:text-xs font-semibold tabular-nums tracking-[0.12em] uppercase text-[#25B5FF]">
        {number}
        <span className="mx-2 text-white/25" aria-hidden="true">
          /
        </span>
        {tNav(node.titleKey)}
      </p>

      <h3
        className={cnTitle(compact)}
      >
        {tNav(node.titleKey)}
      </h3>

      <p className="mt-3 sm:mt-4 max-w-2xl text-[clamp(1.0625rem,0.2vw+0.98rem,1.1875rem)] leading-[1.75] text-white/60">
        {tNav(node.descKey)}
      </p>

      <Link
        href={node.href}
        className="group mt-5 sm:mt-6 inline-flex items-center gap-2 text-[0.8125rem] sm:text-sm font-semibold text-[#25B5FF] transition-all duration-200 group-hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25B5FF]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1018]"
      >
        {t('viewService')}
        <ArrowRight
          size={15}
          className="shrink-0 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
          aria-hidden="true"
        />
      </Link>

      <span className="sr-only">
        {number} of {String(total).padStart(2, '0')}: {tNav(node.titleKey)}
      </span>
    </article>
  );
}

function cnTitle(compact: boolean) {
  return compact
    ? 'mt-2 font-[family-name:var(--font-display)] font-bold text-[clamp(1.5rem,1.5vw+0.85rem,2rem)] leading-[1.12] tracking-[-0.03em] text-white'
    : 'mt-3 sm:mt-4 font-[family-name:var(--font-display)] font-bold text-[clamp(1.75rem,1.8vw+0.85rem,2.75rem)] leading-[1.1] tracking-[-0.03em] text-white';
}
