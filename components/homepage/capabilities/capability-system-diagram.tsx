'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useLandingMotion } from '@/hooks/use-landing-motion';
import { getVisualTheme } from './capabilities-constants';

type CapabilitySystemDiagramProps = {
  serviceId: string;
  className?: string;
  compact?: boolean;
};

function StageNode({
  index,
  label,
  compact,
  isFirst,
  isLast,
}: {
  index: number;
  label: string;
  compact: boolean;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div
      className={cn(
        'min-w-0 flex-1 border border-white/[0.1] bg-[#0B1018]/50 px-3 py-2.5 sm:px-3.5 sm:py-3',
        compact ? 'rounded-sm' : 'rounded-sm md:rounded-none',
        !compact && isFirst && 'md:rounded-l-sm',
        !compact && isLast && 'md:rounded-r-sm',
      )}
    >
      <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-white/35 sm:text-[0.6875rem]">
        {String(index + 1).padStart(2, '0')}
      </p>
      <p className="mt-1 text-[0.6875rem] font-medium leading-snug text-white/75 sm:text-xs">{label}</p>
    </div>
  );
}

export function CapabilitySystemDiagram({
  serviceId,
  className,
  compact = false,
}: CapabilitySystemDiagramProps) {
  const t = useTranslations('HomepageRedesign.ServiceEcosystem');
  const { isReduced } = useLandingMotion();
  const themeId = getVisualTheme(serviceId);
  const stages = t.raw(`flows.${themeId}`) as string[];

  if (!Array.isArray(stages) || stages.length < 2) return null;

  const layoutClass = compact
    ? 'flex-col gap-2'
    : 'flex-col gap-2 md:flex-row md:items-stretch md:gap-0';

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-sm border border-white/[0.08] bg-[#0E1520]/60',
        compact ? 'p-4' : 'p-5 sm:p-6',
        className,
      )}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 40%, rgba(20,91,255,0.1) 0%, transparent 70%)',
        }}
      />

      <div className={cn('relative flex min-w-0', layoutClass)}>
        {stages.map((stage, index) => {
          const node = (
            <StageNode
              index={index}
              label={stage}
              compact={compact}
              isFirst={index === 0}
              isLast={index === stages.length - 1}
            />
          );

          return (
            <div
              key={`${themeId}-${stage}`}
              className={cn('flex min-w-0 flex-1', compact ? 'flex-col gap-2' : 'flex-col gap-2 md:flex-row md:flex-1 md:items-stretch')}
            >
              {index > 0 && (
                <div
                  className={cn(
                    'flex shrink-0 items-center justify-center text-[#25B5FF]/50',
                    compact ? 'py-0.5' : 'py-1 md:w-8 md:py-0',
                  )}
                  aria-hidden="true"
                >
                  <ArrowRight size={compact ? 14 : 16} className="rotate-90 md:rotate-0" />
                </div>
              )}

              {isReduced ? (
                node
              ) : (
                <motion.div
                  className="min-w-0 flex-1"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.04 }}
                >
                  {node}
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
