'use client';

import { useCountUp } from '@/hooks/use-count-up';
import type { TrustMetricSuffix } from '@/data/trust-metrics';

type TrustMetricStatProps = {
  target: number;
  suffix: TrustMetricSuffix;
  label: string;
};

/** Whole numbers only during count-up — never expose raw interpolation floats. */
function formatMetricValue(value: number, target: number): number {
  if (value >= target) return target;
  return Math.min(target, Math.floor(value));
}

export function TrustMetricStat({ target, suffix, label }: TrustMetricStatProps) {
  const { ref, value } = useCountUp({ target });
  const displayValue = formatMetricValue(value, target);

  return (
    <div ref={ref} className="min-w-0 overflow-hidden text-left">
      <p
        className="font-[family-name:var(--font-display)] text-[clamp(2rem,3.2vw,3rem)] font-bold leading-none tracking-[-0.03em] text-[#1A2332] tabular-nums whitespace-nowrap"
        aria-label={`${target}${suffix} ${label}`}
      >
        <span className="inline-block min-w-[3.25ch]">{displayValue}{suffix}</span>
      </p>
      <p className="mt-2.5 text-[0.6875rem] sm:text-xs font-medium uppercase tracking-[0.1em] text-[#8A8478] leading-snug">
        {label}
      </p>
    </div>
  );
}
