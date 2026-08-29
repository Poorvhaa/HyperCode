'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  motion,
  animate,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
} from 'framer-motion';
import { Link } from '@/i18n/routing';
import {
  ArrowRight,
  Cpu,
  Globe,
  Users,
  Layers,
  Shield,
  Brain,
  Network,
  Zap,
  Cloud,
} from 'lucide-react';
import { getCaseStudies, type CaseStudyItem, type Metric } from '@/lib/case-studies-data';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MaskedReveal } from '@/components/motion/masked-reveal';
import {
  countUp as countUpConfig,
  landingDurations,
  landingEase,
  parallaxRange,
} from '@/lib/motion-tokens';
import { useLandingMotion } from '@/hooks/use-landing-motion';

const INDUSTRIES_SERVED = [
  { id: 'manufacturing', icon: Cpu, tags: ['IIoT', 'ERP', 'Supply Chain'] },
  { id: 'education', icon: Globe, tags: ['EdTech', 'LMS', 'Portals'] },
  { id: 'logistics', icon: Cloud, tags: ['Fleet Tracking', 'Routing', 'Warehouse'] },
  { id: 'hospitality', icon: Users, tags: ['Booking Systems', 'Automation', 'CRM'] },
  { id: 'construction', icon: Layers, tags: ['Project Management', 'Databases', 'Collaboration'] },
  { id: 'legal', icon: Shield, tags: ['Document Storage', 'Contracts', 'Billing'] },
  { id: 'pharma', icon: Brain, tags: ['Biotech', 'Databases', 'FDA Compliance'] },
  { id: 'government', icon: Network, tags: ['GovTech', 'Citizen Portals', 'Audit Tools'] },
  { id: 'technology', icon: Zap, tags: ['SaaS MVP', 'Cloud scaling', 'Vulnerability Scans'] },
];

function firstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]/);
  return match ? match[0].trim() : text;
}

function solutionSummary(text: string, maxLength = 220): string {
  if (text.length <= maxLength) return text;
  const trimmed = text.slice(0, maxLength);
  const lastSpace = trimmed.lastIndexOf(' ');
  return `${trimmed.slice(0, lastSpace > 0 ? lastSpace : maxLength).trim()}…`;
}

type ParsedMetric = {
  prefix: string;
  numeric: number;
  suffix: string;
  decimals: number;
};

function parseMetricValue(value: string): ParsedMetric | null {
  const match = value.match(/^([^\d.-]*)(-?\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, numStr, suffix] = match;
  const numeric = parseFloat(numStr);
  if (Number.isNaN(numeric)) return null;
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
  return { prefix, numeric, suffix, decimals };
}

function formatParsedValue(parsed: ParsedMetric, value: number): string {
  const formatted =
    parsed.decimals > 0 ? value.toFixed(parsed.decimals) : String(Math.round(value));
  return `${parsed.prefix}${formatted}${parsed.suffix}`;
}

function AnimatedMetric({
  metric,
  enableMotion,
  className,
}: {
  metric: Metric;
  enableMotion: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const parsed = useMemo(() => parseMetricValue(metric.value), [metric.value]);

  const prefix = parsed?.prefix ?? '';
  const numericTarget = parsed?.numeric ?? null;
  const suffix = parsed?.suffix ?? '';
  const decimals = parsed?.decimals ?? 0;

  const count = useMotionValue(0);
  const display = useTransform(count, (v) => {
    if (numericTarget === null) return metric.value;
    const formatted =
      decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString();
    return `${prefix}${formatted}${suffix}`;
  });

  const showFinal = !enableMotion || numericTarget === null || !isInView;

  useEffect(() => {
    if (numericTarget === null) return;

    if (!enableMotion) {
      count.set(numericTarget);
      return;
    }

    if (!isInView) return;

    count.set(0);
    const controls = animate(count, numericTarget, {
      duration: landingDurations.slow,
      ease: landingEase,
    });

    return () => controls.stop();
  }, [enableMotion, isInView, numericTarget, count]);

  return (
    <div ref={ref} className={cn('min-w-0', className)}>
      <p
        className="font-[family-name:var(--font-display)] font-bold leading-none tracking-[-0.04em] text-white tabular-nums text-[clamp(3.25rem,8vw,6.5rem)]"
        aria-label={`${metric.value} ${metric.label}`}
      >
        {showFinal ? metric.value : <motion.span>{display}</motion.span>}
      </p>
      <p className="mt-3 sm:mt-4 text-[0.6875rem] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#5B9AFF] max-w-[14rem] leading-relaxed">
        {metric.label}
      </p>
    </div>
  );
}

function BeforeAfterMetric({
  metric,
  enableMotion,
  tHome,
}: {
  metric: Metric;
  enableMotion: boolean;
  tHome: ReturnType<typeof useTranslations<'HomepageRedesign.OurWork'>>;
}) {
  const comparison = metric.comparison;
  if (!comparison) return null;

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const afterParsed = useMemo(() => parseMetricValue(metric.value), [metric.value]);
  const beforeParsed = useMemo(
    () => parseMetricValue(comparison.beforeValue),
    [comparison.beforeValue],
  );

  const canAnimate =
    enableMotion &&
    afterParsed !== null &&
    beforeParsed !== null &&
    isInView;

  const beforeAnimation = useCountUp({
    target: beforeParsed?.numeric ?? 0,
    direction: 'down',
    active: canAnimate,
    containerRef,
    isInView,
  });

  const afterAnimation = useCountUp({
    target: afterParsed?.numeric ?? 0,
    direction: 'up',
    active: canAnimate,
    containerRef,
    isInView,
  });

  const [hasFinished, setHasFinished] = useState(false);

  useEffect(() => {
    if (!canAnimate) {
      setHasFinished(false);
      return;
    }

    const timer = window.setTimeout(() => setHasFinished(true), countUpConfig.defaultDuration);
    return () => window.clearTimeout(timer);
  }, [canAnimate, metric.value, comparison.beforeValue]);

  const beforeDisplay =
    canAnimate && beforeParsed && !hasFinished
      ? formatParsedValue(beforeParsed, beforeAnimation.value)
      : comparison.beforeValue;

  const afterDisplay =
    canAnimate && afterParsed && !hasFinished
      ? formatParsedValue(afterParsed, afterAnimation.value)
      : metric.value;

  return (
    <div ref={containerRef} className="min-w-0">
      <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-[22rem]">
        <div
          className={cn(
            'min-w-0 transition-opacity duration-700',
            canAnimate && !hasFinished ? 'opacity-45' : 'opacity-55',
          )}
        >
          <p className="text-[0.625rem] sm:text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white/35 mb-3 sm:mb-4">
            {tHome('metricWithout')}
          </p>
          <p
            className="font-[family-name:var(--font-display)] font-bold leading-none tracking-[-0.04em] text-white/50 tabular-nums text-[clamp(2rem,5.5vw,3.75rem)] line-through decoration-white/20"
            aria-label={`${comparison.beforeValue} ${metric.label}`}
          >
            {beforeDisplay}
          </p>
        </div>

        <div className="min-w-0">
          <p className="text-[0.625rem] sm:text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[#5B9AFF] mb-3 sm:mb-4">
            {tHome('metricWith')}
          </p>
          <p
            className="font-[family-name:var(--font-display)] font-bold leading-none tracking-[-0.04em] text-white tabular-nums text-[clamp(2.75rem,6.5vw,4.25rem)]"
            aria-label={`${metric.value} ${metric.label}`}
          >
            {afterDisplay}
          </p>
        </div>
      </div>

      <p className="mt-3 sm:mt-4 text-[0.6875rem] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#5B9AFF] max-w-[14rem] leading-relaxed">
        {metric.label}
      </p>
    </div>
  );
}

function CaseStudyMetric({
  metric,
  enableMotion,
  tHome,
}: {
  metric: Metric;
  enableMotion: boolean;
  tHome: ReturnType<typeof useTranslations<'HomepageRedesign.OurWork'>>;
}) {
  if (metric.comparison?.beforeValue) {
    return <BeforeAfterMetric metric={metric} enableMotion={enableMotion} tHome={tHome} />;
  }

  return <AnimatedMetric metric={metric} enableMotion={enableMotion} />;
}

function ParallaxImage({
  study,
  priority = false,
  enableParallax,
}: {
  study: CaseStudyItem;
  priority?: boolean;
  enableParallax: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], parallaxRange.subtle);

  return (
    <div
      ref={ref}
      className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#0D2444]"
    >
      <motion.div
        className="absolute inset-0 scale-[1.08]"
        style={{ y: enableParallax ? y : 0 }}
      >
        <Image
          src={study.featuredImage}
          alt={study.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 55vw, 720px"
          className="object-cover"
        />
      </motion.div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08162D]/80 via-transparent to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}

function EditorialCaseStudy({
  study,
  index,
  enableMotion,
  isReduced,
  tHome,
}: {
  study: CaseStudyItem;
  index: number;
  enableMotion: boolean;
  isReduced: boolean;
  tHome: ReturnType<typeof useTranslations<'HomepageRedesign.OurWork'>>;
}) {
  const reversed = index % 2 === 1;
  const primaryMetric = study.metrics[0];
  const problem = firstSentence(study.challenge);
  const solution = solutionSummary(study.solution);
  const num = String(index + 1).padStart(2, '0');

  return (
    <article
      className={cn(
        'border-b border-white/[0.07] py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 last:border-b-0',
        index === 0 && 'pt-0',
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-end">
        {/* Metric + meta */}
        <div
          className={cn(
            'lg:col-span-5 flex flex-col justify-end min-w-0 order-2 lg:order-none',
            reversed ? 'lg:col-start-8' : 'lg:col-start-1',
          )}
        >
          {primaryMetric && (
            <CaseStudyMetric metric={primaryMetric} enableMotion={enableMotion} tHome={tHome} />
          )}

          <MaskedReveal enableMotion={enableMotion} isReduced={isReduced} delay={0.08} className="mt-8 sm:mt-10">
            <p className="text-[0.6875rem] sm:text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
              {study.industry}
              <span className="mx-2 text-white/20">·</span>
              {study.clientType}
            </p>
          </MaskedReveal>

          <MaskedReveal enableMotion={enableMotion} isReduced={isReduced} delay={0.12} className="mt-3">
            <h3 className="font-[family-name:var(--font-display)] font-semibold text-[clamp(1.125rem,0.6vw+0.95rem,1.5rem)] leading-snug tracking-[-0.015em] text-white/90">
              {study.title}
            </h3>
          </MaskedReveal>
        </div>

        {/* Image */}
        <div
          className={cn(
            'lg:col-span-7 min-w-0 order-1 lg:order-none',
            reversed ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-6',
          )}
        >
          <ParallaxImage
            study={study}
            priority={index === 0}
            enableParallax={enableMotion}
          />
        </div>
      </div>

      {/* Editorial narrative */}
      <div
        className={cn(
          'mt-12 sm:mt-14 lg:mt-16 max-w-3xl',
          reversed ? 'lg:ml-auto lg:text-right lg:max-w-2xl' : '',
        )}
      >
        <MaskedReveal enableMotion={enableMotion} isReduced={isReduced} delay={0.06}>
          <p className="text-[0.6875rem] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#145BFF] mb-3 sm:mb-4">
            <span className="text-white/30 mr-2" aria-hidden="true">
              {num}
            </span>
            {tHome('businessChallenge')}
          </p>
          <p className="font-[family-name:var(--font-display)] font-bold text-[clamp(1.375rem,1.2vw+1rem,2.125rem)] leading-[1.2] tracking-[-0.02em] text-white">
            {problem}
          </p>
        </MaskedReveal>

        <MaskedReveal enableMotion={enableMotion} isReduced={isReduced} delay={0.14} className="mt-6 sm:mt-8">
          <p className="text-[0.6875rem] sm:text-xs font-semibold uppercase tracking-[0.14em] text-white/35 mb-3">
            {tHome('solution')}
          </p>
          <p className="text-[clamp(1rem,0.2vw+0.94rem,1.125rem)] leading-[1.75] text-white/55">
            {solution}
          </p>
        </MaskedReveal>

        <div
          className={cn(
            'mt-8 sm:mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
            reversed && 'lg:flex-row-reverse',
          )}
        >
          <Link
            href={`/case-studies/${study.slug}`}
            className="group/link inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#5B9AFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08162D]"
          >
            <span>{index === 0 ? tHome('viewCaseStudy') : tHome('viewProject')}</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover/link:translate-x-1 motion-reduce:group-hover/link:translate-x-0"
              aria-hidden="true"
            />
          </Link>

          <p className="text-[0.6875rem] sm:text-xs font-medium text-white/35 max-w-md leading-relaxed">
            {study.technologies.slice(0, 4).join(' · ')}
          </p>
        </div>

        {/* Full challenge preserved for SEO — visually compact */}
        <p className="sr-only">{study.challenge}</p>
        <p className="sr-only">{study.solution}</p>
      </div>
    </article>
  );
}

export function CaseStudiesSection() {
  const tHome = useTranslations('HomepageRedesign.OurWork');
  const tCase = useTranslations('CaseStudies');
  const tSolutions = useTranslations('SolutionsPage');
  const tHero = useTranslations('Hero');
  const locale = useLocale();
  const { enableMotion, isReduced } = useLandingMotion();

  const studies = getCaseStudies(locale).slice(0, 3);

  return (
    <>
      <section
        id="our-work"
        data-section-theme="dark"
        className="relative w-full overflow-hidden border-b landing-divider-dark bg-[var(--landing-dark-elevated)] text-white scroll-mt-24"
        aria-label={tHome('title')}
      >
        <div
          className="pointer-events-none absolute inset-0 landing-grid-dark opacity-[0.3]"
          aria-hidden="true"
          style={{
            maskImage: 'linear-gradient(to bottom, black 45%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 45%, transparent 100%)',
          }}
        />

        <div className="relative z-10 mx-auto min-w-0 max-w-[90rem] px-5 sm:px-8 lg:px-12 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32">
          <header className="mb-14 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-28 max-w-3xl">
            <MaskedReveal enableMotion={enableMotion} isReduced={isReduced}>
              <p className="text-[0.6875rem] sm:text-xs font-semibold tracking-[0.14em] uppercase text-[#5B9AFF]">
                <span className="mr-2 text-white/35">//</span>
                {tHome('badge')}
              </p>
            </MaskedReveal>
            <MaskedReveal enableMotion={enableMotion} isReduced={isReduced} delay={0.06} className="mt-5 sm:mt-6">
              <h2 className="font-[family-name:var(--font-display)] font-bold text-[clamp(2rem,1.4vw+1.2rem,3.25rem)] leading-[1.1] tracking-[-0.03em] text-white">
                {tHome('title')}
              </h2>
            </MaskedReveal>
            <MaskedReveal enableMotion={enableMotion} isReduced={isReduced} delay={0.12} className="mt-5 sm:mt-6">
              <p className="text-[clamp(1.0625rem,0.25vw+0.98rem,1.1875rem)] leading-[1.75] text-white/50 max-w-2xl">
                {tHome('subtitle')}
              </p>
            </MaskedReveal>
          </header>

          <div>
            {studies.map((study, index) => (
              <EditorialCaseStudy
                key={study.slug}
                study={study}
                index={index}
                enableMotion={enableMotion}
                isReduced={isReduced}
                tHome={tHome}
              />
            ))}
          </div>

          <MaskedReveal enableMotion={enableMotion} isReduced={isReduced} className="mt-14 sm:mt-16 lg:mt-20">
            <Link
              href="/case-studies"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/18 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-[450ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-white/30 hover:bg-white/[0.06] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--landing-dark-elevated)] motion-reduce:hover:translate-y-0"
            >
              <span>{tCase('viewAll')}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </MaskedReveal>
        </div>
      </section>

      {/* Industries We Serve — preserved subsection */}
      <section
        className="relative w-full overflow-hidden scroll-mt-24 border-b landing-divider-light bg-[var(--landing-light)]"
        aria-labelledby="industries-served-heading"
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 landing-grid-light opacity-30" aria-hidden="true" />
        </div>

        <div className="relative z-10 mx-auto min-w-0 max-w-[90rem] px-5 sm:px-8 lg:px-12 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32">
          <div className="mb-12 min-w-0 max-w-3xl sm:mb-14 lg:mb-16">
            <p className="landing-eyebrow landing-eyebrow-light">
              {tSolutions('industries')}
            </p>
            <h2
              id="industries-served-heading"
              className="mt-5 sm:mt-6 landing-headline text-[#08162D] min-w-0"
            >
              {tSolutions('industriesTitle')}
            </h2>
            <p className="mt-6 sm:mt-7 landing-lead text-[#5A6578] max-w-[32rem] min-w-0">
              {tSolutions('industriesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {INDUSTRIES_SERVED.map((ind) => {
              const IndIcon = ind.icon;
              return (
                <div
                  key={ind.id}
                  className="group flex min-h-[220px] select-none flex-col justify-between landing-depth-panel rounded-xl p-6 transition-all duration-[450ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 motion-reduce:hover:translate-y-0"
                >
                  <div className="space-y-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(8,22,45,0.08)] bg-[var(--landing-light)] text-[#64748B] transition-all duration-300 group-hover:border-[#145BFF]/20 group-hover:bg-[#145BFF]/5 group-hover:text-[#145BFF]">
                      <IndIcon size={20} />
                    </div>
                    <div className="space-y-2 text-left min-w-0">
                      <h3 className="font-[family-name:var(--font-display)] font-semibold text-[clamp(1rem,0.4vw+0.9rem,1.125rem)] leading-snug tracking-[-0.015em] text-[#08162D] min-w-0">
                        {tSolutions(`industriesList.${ind.id}.title`)}
                      </h3>
                      <p className="line-clamp-3 text-[clamp(0.875rem,0.15vw+0.85rem,0.9375rem)] font-medium leading-[1.65] text-[#5A6578] min-w-0">
                        {tSolutions(`industriesList.${ind.id}.desc`)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[rgba(8,22,45,0.06)] pt-4 mt-4">
                    <div className="flex max-w-[65%] min-w-0 flex-wrap gap-1.5">
                      {ind.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-[rgba(8,22,45,0.08)] bg-[var(--landing-light)] px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wide text-[#64748B]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href="/solutions"
                      className="-my-[14px] inline-flex min-h-11 shrink-0 items-center gap-1 px-2 py-[14px] text-[0.6875rem] font-semibold uppercase tracking-wider text-[#145BFF] transition-all duration-300 hover:gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145BFF]/30 rounded-lg"
                    >
                      <span>{tHero('exploreSolutions')}</span>
                      <ArrowRight size={10} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
