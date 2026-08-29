'use client';

import { useCountUp } from '@/hooks/use-count-up';
import type { TrustMetricSuffix } from '@/data/trust-metrics';

type TrustMetricStatProps = {
  target: number;
  suffix: TrustMetricSuffix;
  label: string;
};

export function TrustMetricStat({ target, suffix, label }: TrustMetricStatProps) {
  const { ref, value } = useCountUp({ target });

  return (
    <div ref={ref} className="min-w-0 text-left">
      <p className="font-[family-name:var(--font-display)] text-[clamp(2rem,3.2vw,3rem)] font-bold leading-none tracking-[-0.03em] text-[#1A2332] tabular-nums">
        {value}
        {suffix}
      </p>
      <p className="mt-2.5 text-[0.6875rem] sm:text-xs font-medium uppercase tracking-[0.1em] text-[#8A8478] leading-snug">
        {label}
      </p>
    </div>
  );
}
