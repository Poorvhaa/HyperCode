'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { LandingReveal } from '@/components/motion/landing-reveal';
import { useLandingMotion } from '@/hooks/use-landing-motion';
import { STAGE_NUMBERS, STAGE_COUNT, type StageNumber } from './constants';
import { TransformationRoadmapVisual } from './transformation-roadmap-visual';

type TransformationStage = {
  number: StageNumber;
  key: `stage${StageNumber}`;
  name: string;
  title: string;
  description: string;
  benefits: string[];
};

const stageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
};

function StageBenefits({ benefits }: { benefits: string[] }) {
  if (!benefits.length) return null;

  return (
    <ul className="mt-6 space-y-2.5 sm:mt-7">
      {benefits.map((benefit) => (
        <li key={benefit}>
          <span className="inline-flex min-w-0 items-center gap-2 text-[0.8125rem] font-medium tracking-[0.01em] text-[#5C6470] sm:text-sm">
            <span>{benefit}</span>
            <ArrowUpRight size={14} className="shrink-0 text-[#145BFF]/70" aria-hidden="true" />
          </span>
        </li>
      ))}
    </ul>
  );
}

function StageEditorial({
  stage,
  isReduced,
}: {
  stage: TransformationStage;
  isReduced: boolean;
}) {
  const duration = isReduced ? 0.15 : 0.32;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stage.key}
        initial={isReduced ? false : stageTransition.initial}
        animate={stageTransition.animate}
        exit={isReduced ? undefined : stageTransition.exit}
        transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="text-[0.8125rem] font-semibold tabular-nums tracking-[0.12em] text-[#145BFF] sm:text-sm">
          {String(stage.number).padStart(2, '0')}
          <span className="mx-2 text-[#B8B2A6]">/</span>
          <span className="uppercase">{stage.name}</span>
        </p>
        <h3 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.75rem,2.4vw,3rem)] font-bold leading-[1.12] tracking-[-0.025em] text-[#1A2332]">
          {stage.title}
        </h3>
        <p className="mt-4 max-w-lg text-[clamp(1rem,0.2vw+0.94rem,1.125rem)] leading-[1.72] text-[#5C6470] sm:mt-5">
          {stage.description}
        </p>
        <StageBenefits benefits={stage.benefits} />
      </motion.div>
    </AnimatePresence>
  );
}

function RoadmapNav({
  stages,
  activeIndex,
  onSelect,
  compact = false,
}: {
  stages: TransformationStage[];
  activeIndex: number;
  onSelect: (index: number) => void;
  compact?: boolean;
}) {
  const progressPct = STAGE_COUNT > 1 ? (activeIndex / (STAGE_COUNT - 1)) * 100 : 0;

  return (
    <div
      className={`relative min-w-0 ${compact ? 'overflow-x-auto pb-1' : ''}`}
      role="tablist"
      aria-label="Transformation roadmap"
    >
      <div
        className={`grid min-w-0 ${compact ? 'min-w-[640px] grid-cols-6 gap-1' : 'grid-cols-3 gap-x-2 gap-y-6 sm:grid-cols-6 sm:gap-x-1'}`}
      >
        {stages.map((stage, i) => {
          const isActive = i === activeIndex;
          const isCompleted = i < activeIndex;

          return (
            <button
              key={stage.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(i)}
              className={`group relative min-h-[44px] min-w-0 px-1 pb-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145BFF]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                isActive ? 'text-[#145BFF]' : isCompleted ? 'text-[#1A2332]' : 'text-[#B8B2A6]'
              }`}
            >
              <span
                className={`block font-[family-name:var(--font-display)] text-[0.8125rem] font-semibold tabular-nums tracking-[0.08em] sm:text-sm ${
                  isActive ? 'text-[#145BFF]' : isCompleted ? 'text-[#145BFF]/70' : 'text-[#B8B2A6]'
                }`}
              >
                {String(stage.number).padStart(2, '0')}
              </span>
              <span
                className={`mt-1 block font-[family-name:var(--font-display)] text-[0.625rem] font-semibold uppercase tracking-[0.1em] leading-tight sm:text-[0.6875rem] ${
                  isActive ? 'text-[#1A2332]' : isCompleted ? 'text-[#1A2332]/80' : 'text-[#B8B2A6]'
                }`}
              >
                {stage.name}
              </span>
              {isActive && (
                <span
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-[#145BFF]"
                  aria-hidden="true"
                />
              )}
              {isCompleted && !isActive && (
                <span
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-[#48B900]/40"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Continuous progress line */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#1A2332]/[0.1]" aria-hidden="true">
        <div
          className="h-full bg-[#145BFF]/50 transition-[width] duration-300 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>
    </div>
  );
}

function MobileStageBlock({ stage, isReduced }: { stage: TransformationStage; isReduced: boolean }) {
  return (
    <article className="border-t border-[#1A2332]/[0.08] py-8 first:border-t-0 first:pt-0 sm:py-10">
      <StageEditorial stage={stage} isReduced={isReduced} />
      <div className="mt-6 sm:mt-8">
        <TransformationRoadmapVisual stageIndex={stage.number - 1} compact />
      </div>
    </article>
  );
}

export function TransformationEngine() {
  const t = useTranslations('HomepageRedesign.TransformationEngine');
  const { isReduced } = useLandingMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const mobileMq = window.matchMedia('(max-width: 767px)');
    const tabletMq = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
    const update = () => {
      setIsMobile(mobileMq.matches);
      setIsTablet(tabletMq.matches);
    };
    update();
    mobileMq.addEventListener('change', update);
    tabletMq.addEventListener('change', update);
    return () => {
      mobileMq.removeEventListener('change', update);
      tabletMq.removeEventListener('change', update);
    };
  }, []);

  const stages: TransformationStage[] = STAGE_NUMBERS.map((number) => {
    const key = `stage${number}` as const;
    const benefits = t.raw(`${key}.benefits`) as string[];

    return {
      number,
      key,
      name: t(`${key}.name`),
      title: t(`${key}.title`),
      description: t(`${key}.description`),
      benefits: Array.isArray(benefits) ? benefits : [],
    };
  });

  const activeStage = stages[activeIndex];

  return (
    <section
      data-section-theme="light"
      className="relative overflow-hidden landing-surface-transformation text-left"
      aria-labelledby="transformation-engine-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 landing-brand-glow-blue"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 landing-brand-glow-green"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 landing-grid-light opacity-[0.18]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[90rem] min-w-0 px-5 sm:px-8 lg:px-12 xl:px-16 landing-section-py">
        {/* Compact header */}
        <LandingReveal className="max-w-3xl">
          <p className="text-[0.8125rem] font-semibold tracking-[0.14em] uppercase text-[#8A8478] sm:text-sm">
            {t('badge')}
          </p>
          <h2
            id="transformation-engine-heading"
            className="mt-3 font-[family-name:var(--font-display)] font-bold text-[clamp(2.5rem,4vw,4rem)] leading-[1.08] tracking-[-0.03em] text-[#1A2332] sm:mt-4"
          >
            {t('headline')}
          </h2>
          <p className="mt-4 max-w-2xl text-[clamp(1rem,0.2vw+0.94rem,1.125rem)] leading-[1.72] text-[#5C6470] sm:mt-5">
            {t('supporting')}
          </p>
        </LandingReveal>

        {isMobile ? (
          /* Mobile — vertical progression, all stages */
          <div className="landing-section-intro-gap min-w-0">
            {stages.map((stage) => (
              <MobileStageBlock key={stage.key} stage={stage} isReduced={isReduced} />
            ))}
          </div>
        ) : (
          /* Desktop / tablet — interactive roadmap */
          <div className="landing-section-intro-gap min-w-0">
            <RoadmapNav
              stages={stages}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
              compact={isTablet}
            />

            <div className="landing-section-block-gap grid min-w-0 grid-cols-1 items-start gap-6 lg:grid-cols-[2fr_3fr] lg:gap-8 xl:gap-10">
              <div className="min-w-0 lg:max-w-[28rem]">
                <StageEditorial stage={activeStage} isReduced={isReduced} />
              </div>
              <div className="min-w-0">
                <TransformationRoadmapVisual stageIndex={activeIndex} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
