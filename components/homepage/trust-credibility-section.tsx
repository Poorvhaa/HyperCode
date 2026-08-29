'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { MaskedReveal } from '@/components/motion/masked-reveal';
import { useLandingMotion } from '@/hooks/use-landing-motion';
import { landingViewport, maskReveal } from '@/lib/motion-tokens';

const TECHNOLOGIES = [
  { name: 'Microsoft', typeKey: 'microsoftType' },
  { name: 'Azure', typeKey: 'azureType' },
  { name: 'AWS', typeKey: 'awsType' },
  { name: 'Snowflake', typeKey: 'snowflakeType' },
  { name: 'Databricks', typeKey: 'databricksType' },
  { name: 'Tableau', typeKey: 'tableauType' },
] as const;

const METRICS = [
  { valueKey: 'stats.deploymentsNum', labelKey: 'stats.deploymentsLabel', ns: 'solutions' as const },
  { valueKey: 'stats.satisfaction', labelKey: 'stats.satisfactionLabel', ns: 'about' as const },
  { valueKey: 'stats.consultants', labelKey: 'stats.consultantsLabel', ns: 'about' as const },
  { valueKey: 'stats.experience', labelKey: 'stats.experienceLabel', ns: 'about' as const },
] as const;

type ParsedMetric = {
  numeric: number;
  suffix: string;
  useComma: boolean;
};

function parseMetricValue(value: string): ParsedMetric | null {
  const match = value.match(/^([\d,]+)(.*)$/);
  if (!match) return null;
  return {
    numeric: parseInt(match[1].replace(/,/g, ''), 10),
    suffix: match[2],
    useComma: match[1].includes(','),
  };
}

function formatMetricNumber(n: number, useComma: boolean) {
  return useComma ? n.toLocaleString('en-US') : String(n);
}

function MetricItem({
  value,
  label,
  index,
  enableMotion,
  isReduced,
  hasMounted,
}: {
  value: string;
  label: string;
  index: number;
  enableMotion: boolean;
  isReduced: boolean;
  hasMounted: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' });
  const [display, setDisplay] = useState(value);
  const parsed = parseMetricValue(value);

  useEffect(() => {
    if (!hasMounted || isReduced || !enableMotion || !isInView || !parsed) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(parsed.numeric * eased);
      setDisplay(`${formatMetricNumber(current, parsed.useComma)}${parsed.suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [hasMounted, isReduced, enableMotion, isInView, value, parsed]);

  const content = (
    <>
      <p className="font-[family-name:var(--font-display)] text-[clamp(2rem,3.2vw,3rem)] font-bold leading-none tracking-[-0.03em] text-[#1A2332]">
        {display}
      </p>
      <p className="mt-2.5 text-[0.6875rem] sm:text-xs font-medium uppercase tracking-[0.1em] text-[#8A8478] leading-snug">
        {label}
      </p>
    </>
  );

  if (!enableMotion) {
    return (
      <div
        ref={ref}
        className={`min-w-0 text-left ${index > 0 ? 'lg:border-l lg:border-[#1A2332]/[0.08] lg:pl-8 xl:pl-10' : ''}`}
      >
        {content}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`min-w-0 overflow-hidden text-left ${index > 0 ? 'lg:border-l lg:border-[#1A2332]/[0.08] lg:pl-8 xl:pl-10' : ''}`}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={landingViewport}
        custom={{ delay: 0.28 + index * 0.07, reduced: isReduced }}
        variants={maskReveal}
      >
        {content}
      </motion.div>
    </div>
  );
}

export function TrustCredibilitySection() {
  const tPartners = useTranslations('HomepageRedesign.TechPartners');
  const tTrust = useTranslations('HomepageRedesign.TrustSection');
  const tSolutions = useTranslations('SolutionsPage');
  const tAbout = useTranslations('About');
  const { enableMotion, isReduced, hasMounted } = useLandingMotion();

  const getMetricText = (ns: 'solutions' | 'about', key: string) =>
    ns === 'solutions' ? tSolutions(key) : tAbout(key);

  return (
    <section
      data-section-theme="light"
      className="relative -mt-px w-full max-w-full min-w-0 overflow-x-clip bg-[#F6F5F1] text-[#1A2332]"
      aria-labelledby="trust-credibility-heading"
    >
      <div className="mx-auto max-w-[90rem] min-w-0 px-5 sm:px-8 lg:px-12 xl:px-16 pt-12 sm:pt-14 lg:pt-16 pb-20 sm:pb-24 lg:pb-[6.25rem] pr-16 sm:pr-20 lg:pr-24">
        {/* Eyebrow */}
        <MaskedReveal className="max-w-[38rem]">
          <p className="text-[0.6875rem] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#8A8478]">
            {tPartners('eyebrow')}
          </p>
        </MaskedReveal>

        {/* Supporting statement */}
        <MaskedReveal className="mt-8 sm:mt-9 max-w-[38rem]" delay={0.08}>
          <p
            id="trust-credibility-heading"
            className="text-[clamp(1.0625rem,0.35vw+0.98rem,1.25rem)] leading-[1.65] text-[#5C6470]"
          >
            {tTrust('subtitle')}
          </p>
        </MaskedReveal>

        {/* Technology ecosystem row */}
        <MaskedReveal className="mt-14 sm:mt-16 lg:mt-[3.5rem]" delay={0.16}>
          <ul
            className="flex flex-wrap items-center justify-start gap-x-8 gap-y-6 sm:gap-x-10 lg:gap-x-12 xl:gap-x-14"
            aria-label={tPartners('eyebrow')}
          >
            {TECHNOLOGIES.map((tech) => (
              <li key={tech.name} className="group min-w-0">
                <div className="flex h-9 sm:h-10 items-center">
                  <span className="font-[family-name:var(--font-display)] text-[0.9375rem] sm:text-base lg:text-[1.0625rem] font-semibold tracking-[-0.02em] text-[#1A2332]/60 transition-colors duration-300 group-hover:text-[#1A2332] motion-reduce:transition-none">
                    {tech.name}
                  </span>
                </div>
                <span className="sr-only">{tPartners(tech.typeKey)}</span>
              </li>
            ))}
          </ul>
        </MaskedReveal>

        {/* Divider */}
        <div className="mt-12 sm:mt-14 lg:mt-16 h-px w-full bg-[#1A2332]/[0.08]" aria-hidden="true" />

        {/* Metrics */}
        <div className="mt-12 sm:mt-14 lg:mt-16 grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-0">
          {METRICS.map((metric, index) => (
            <MetricItem
              key={metric.labelKey}
              value={getMetricText(metric.ns, metric.valueKey)}
              label={getMetricText(metric.ns, metric.labelKey)}
              index={index}
              enableMotion={enableMotion}
              isReduced={isReduced}
              hasMounted={hasMounted}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
