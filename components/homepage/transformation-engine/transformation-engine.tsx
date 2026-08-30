'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { LandingReveal } from '@/components/motion/landing-reveal';
import { crossfade } from '@/lib/motion-tokens';
import { useLandingMotion } from '@/hooks/use-landing-motion';
import { STAGE_COUNT, STAGE_NUMBERS, type StageNumber } from './constants';
import { EngineStaticVisual } from './engine-static-visual';
import { useTransformationScrollPin } from './use-transformation-scroll-pin';

const EngineVisual3D = dynamic(
  () => import('./engine-visual-3d').then((m) => m.EngineVisual3D),
  { ssr: false },
);

type TransformationStage = {
  number: StageNumber;
  key: `stage${StageNumber}`;
  name: string;
  title: string;
  description: string;
  benefits: string[];
};

export function TransformationEngine() {
  const t = useTranslations('HomepageRedesign.TransformationEngine');
  const { isReduced, enableMotion } = useLandingMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const useScrollPin = mounted && enableMotion && !isReduced && !isMobile;

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const handleScrollProgress = useCallback((progress: number) => {
    setScrollProgress(progress);
  }, []);

  const handleStageChange = useCallback((index: number) => {
    setActiveStageIndex(index);
  }, []);

  useTransformationScrollPin({
    enabled: useScrollPin,
    scrollTrackRef,
    pinRef,
    onProgress: handleScrollProgress,
    onStageChange: handleStageChange,
  });

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

  const activeIndex = useScrollPin ? activeStageIndex : selectedIndex;

  const activeStage = stages[activeIndex];
  const visualLabels = stages.map((stage) => stage.name);
  const useStaticVisual = isReduced || isMobile || !useScrollPin;

  const scrollHeight = useScrollPin ? `${STAGE_COUNT * 100}vh` : 'auto';

  return (
    <section
      ref={sectionRef}
      data-section-theme="light"
      className="relative bg-[#ECEAE4] text-left overflow-hidden"
      aria-labelledby="transformation-engine-heading"
    >
      <div className="relative max-w-[90rem] min-w-0 mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pt-16 sm:pt-20 lg:pt-24 pb-10 sm:pb-12">
        <LandingReveal className="max-w-2xl">
          <p className="text-[0.6875rem] sm:text-xs font-semibold tracking-[0.14em] uppercase text-[#8A8478]">
            {t('badge')}
          </p>
          <h2
            id="transformation-engine-heading"
            className="mt-4 sm:mt-5 font-[family-name:var(--font-display)] font-bold text-[clamp(1.875rem,1.1vw+1.2rem,2.75rem)] leading-[1.14] tracking-[-0.025em] text-[#1A2332]"
          >
            {t('headline')}
          </h2>
          <p className="mt-4 sm:mt-5 text-[clamp(1rem,0.2vw+0.94rem,1.0625rem)] leading-[1.7] text-[#5C6470] max-w-xl">
            {t('supporting')}
          </p>
        </LandingReveal>
      </div>

      <div ref={scrollTrackRef} className="relative" style={{ height: scrollHeight }}>
        <div
          ref={pinRef}
          className={`${useScrollPin ? '' : 'relative'} min-h-[100svh] flex items-center py-10 sm:py-12 lg:py-16`}
        >
          <div className="w-full max-w-[90rem] min-w-0 mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-10 lg:gap-14 xl:gap-20 items-start lg:items-center">
              <div className="order-2 lg:order-1 min-w-0 lg:self-start">
                <p className="text-[0.6875rem] sm:text-xs font-semibold tracking-[0.14em] uppercase text-[#8A8478] mb-6 sm:mb-8">
                  {t('coreLabel')}
                </p>

                <ol className="space-y-1 sm:space-y-1.5 m-0 p-0 list-none" role="tablist" aria-label={t('headline')}>
                  {stages.map((stage, i) => {
                    const isActive = i === activeIndex;
                    const isCompleted = i < activeIndex;

                    return (
                      <li key={stage.key} role="presentation">
                        <button
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => setSelectedIndex(i)}
                          className={`flex w-full items-center gap-3 sm:gap-4 min-h-[44px] py-2.5 text-left transition-colors duration-300 rounded-lg -mx-2 px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145BFF]/30 ${
                            isActive
                              ? 'text-[#145BFF]'
                              : isCompleted
                                ? 'text-[#1A2332]'
                                : 'text-[#B8B2A6]'
                          }`}
                        >
                          <span
                            className="font-[family-name:var(--font-display)] text-[0.6875rem] sm:text-xs font-semibold tabular-nums tracking-[0.08em] text-[#B8B2A6] w-6 shrink-0"
                            aria-hidden="true"
                          >
                            {String(stage.number).padStart(2, '0')}
                          </span>
                          {isActive ? (
                            <span
                              className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center"
                              aria-hidden="true"
                            >
                              <span className="absolute inset-0 rounded-full bg-[#145BFF]/25 scale-[2.25]" />
                              <span className="relative h-2 w-2 rounded-full bg-[#145BFF]" />
                            </span>
                          ) : isCompleted ? (
                            <span
                              className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#145BFF]/35 bg-[#145BFF]/[0.07]"
                              aria-hidden="true"
                            >
                              <Check className="h-2.5 w-2.5 text-[#145BFF]/70" strokeWidth={2.5} />
                            </span>
                          ) : (
                            <span
                              className="h-1.5 w-1.5 rounded-full shrink-0 border border-[#D4CFC4] bg-transparent"
                              aria-hidden="true"
                            />
                          )}
                          <span
                            className={`font-[family-name:var(--font-display)] text-[0.9375rem] sm:text-base tracking-[-0.01em] ${
                              isActive ? 'font-bold' : isCompleted ? 'font-semibold' : 'font-medium'
                            }`}
                          >
                            {stage.name}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div className="order-1 lg:order-2 min-w-0">
                <div className="min-h-[12rem] sm:min-h-[14rem]" aria-live="polite" aria-atomic="true">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStage.key}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={crossfade}
                      custom={{ reduced: isReduced }}
                    >
                      <p className="text-[0.6875rem] sm:text-xs font-semibold tracking-[0.12em] uppercase text-[#145BFF] mb-2">
                        {activeStage.name}
                      </p>
                      <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.375rem,1vw+1rem,2rem)] font-semibold leading-snug tracking-[-0.02em] text-[#1A2332] max-w-xl">
                        {activeStage.title}
                      </h3>
                      <p className="mt-4 text-[clamp(0.9375rem,0.15vw+0.9rem,1.0625rem)] leading-[1.72] text-[#5C6470] max-w-xl">
                        {activeStage.description}
                      </p>
                      {activeStage.benefits.length > 0 && (
                        <ul className="mt-5 sm:mt-6 flex flex-wrap gap-2">
                          {activeStage.benefits.map((benefit) => (
                            <li
                              key={benefit}
                              className="inline-flex items-center rounded-full border border-[#1A2332]/[0.08] bg-white/50 px-3 py-1.5 text-[0.6875rem] sm:text-xs font-medium tracking-[0.02em] text-[#5C6470]"
                            >
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-8 sm:mt-10 min-w-0 flex justify-center lg:justify-end">
                  <div className="relative w-full max-w-[min(100%,420px)] aspect-square overflow-hidden">
                    <div className="absolute inset-[10%] sm:inset-[9%]">
                      {mounted && !useStaticVisual ? (
                        <EngineVisual3D
                          scrollProgress={scrollProgress}
                          className="h-full w-full max-h-none max-w-none"
                        />
                      ) : (
                        <EngineStaticVisual
                          scrollProgress={
                            useScrollPin ? scrollProgress : selectedIndex / Math.max(STAGE_COUNT - 1, 1)
                          }
                          activeIndex={activeIndex}
                          labels={visualLabels}
                          coreLabel={t('coreLabel')}
                          className="h-full w-full max-h-none max-w-none"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
