'use client';

import { useState, useCallback, useRef, KeyboardEvent } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { standardReveal } from '@/lib/motion-tokens';

const STEP_IDS = ['scoping', 'architecture', 'engineering', 'launch'] as const;

function cleanStepTitle(title: string): string {
  return title.replace(/^\d+\.\s*/, '');
}

export function DeliveryProcess() {
  const t = useTranslations('HomepageRedesign.DeliveryProcess');
  const prefersReducedMotion = useReducedMotion();
  const isReduced = !!prefersReducedMotion;

  const [activeIdx, setActiveIdx] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const steps = STEP_IDS.map((id, idx) => ({
    id,
    num: String(idx + 1).padStart(2, '0'),
    title: cleanStepTitle(t(`step${idx + 1}Title` as 'step1Title')),
    desc: t(`step${idx + 1}Desc` as 'step1Desc'),
  }));

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
      let next = idx;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        next = (idx + 1) % steps.length;
        e.preventDefault();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        next = (idx - 1 + steps.length) % steps.length;
        e.preventDefault();
      } else if (e.key === 'Home') {
        next = 0;
        e.preventDefault();
      } else if (e.key === 'End') {
        next = steps.length - 1;
        e.preventDefault();
      } else {
        return;
      }
      setActiveIdx(next);
      tabRefs.current[next]?.focus();
    },
    [steps.length],
  );

  return (
    <section
      data-section-theme="light"
      className="relative bg-white text-left overflow-hidden border-b border-slate-200/90"
      aria-label={t('title')}
    >
      <div className="max-w-[90rem] min-w-0 mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-14 sm:py-16 md:py-20 lg:py-24 xl:py-[7rem]">
        {/* Section intro */}
        <motion.div
          initial={standardReveal.hidden}
          whileInView={standardReveal.visible({ isReduced })}
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl min-w-0 mb-12 sm:mb-14 md:mb-16 lg:mb-20"
        >
          <p className="text-[0.6875rem] sm:text-xs font-medium tracking-[0.16em] uppercase text-[#145BFF]">
            <span className="text-slate-400 mr-1.5">//</span>
            {t('badge')}
          </p>
          <h2 className="mt-4 sm:mt-5 font-[family-name:var(--font-display)] font-bold text-[clamp(1.875rem,1.2vw+1.25rem,3.5rem)] leading-[1.12] tracking-[-0.025em] text-[#08162D] w-full min-w-0">
            {t('title')}
          </h2>
          <p className="mt-5 sm:mt-6 text-[clamp(1rem,0.25vw+0.94rem,1.1875rem)] text-slate-600 leading-[1.7] max-w-[32rem] w-full min-w-0">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* ── Desktop / landscape tablet: horizontal progression ── */}
        <div className="hidden lg:block min-w-0">
          <div
            role="tablist"
            aria-label={t('title')}
            className="grid grid-cols-4 gap-4 xl:gap-6 min-w-0"
          >
            {steps.map((step, idx) => {
              const isActive = idx === activeIdx;
              const isCompleted = idx < activeIdx;
              const segmentFilled = idx < activeIdx;

              return (
                <button
                  key={step.id}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  role="tab"
                  id={`process-tab-${step.id}`}
                  aria-selected={isActive}
                  aria-controls={`process-panel-${step.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIdx(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className="group flex flex-col items-start text-left min-h-[44px] min-w-0 bg-transparent border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145BFF] focus-visible:ring-offset-2 rounded-sm"
                >
                  <span
                    className={`font-[family-name:var(--font-display)] font-bold text-[clamp(2rem,2.5vw,3.5rem)] leading-none tracking-[-0.04em] transition-colors duration-300 ${
                      isActive
                        ? 'text-[#145BFF]'
                        : isCompleted
                          ? 'text-slate-500'
                          : 'text-slate-300 group-hover:text-slate-400'
                    }`}
                  >
                    {step.num}
                  </span>
                  <span
                    className={`mt-3 text-[0.6875rem] xl:text-xs font-semibold tracking-[0.14em] uppercase leading-snug transition-colors duration-300 ${
                      isActive
                        ? 'text-[#08162D]'
                        : isCompleted
                          ? 'text-slate-500 group-hover:text-slate-600'
                          : 'text-slate-400 group-hover:text-slate-500'
                    }`}
                  >
                    {step.title}
                  </span>

                  {/* Progress node + connectors — below labels */}
                  <div className="relative mt-6 xl:mt-8 flex w-full justify-center items-center h-2">
                    {idx > 0 && (
                      <div
                        className="absolute right-1/2 top-1/2 -translate-y-1/2 w-full h-px bg-slate-200"
                        aria-hidden="true"
                      >
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#145BFF] to-[#48B900] origin-left"
                          initial={false}
                          animate={{ width: segmentFilled ? '100%' : '0%' }}
                          transition={
                            isReduced
                              ? { duration: 0.15 }
                              : { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
                          }
                        />
                      </div>
                    )}

                    <span
                      className={`relative z-10 block w-2 h-2 rounded-full transition-colors duration-300 ${
                        isActive
                          ? 'bg-[#145BFF]'
                          : isCompleted
                            ? 'bg-gradient-to-br from-[#145BFF] to-[#48B900]'
                            : 'bg-white border border-slate-300 group-hover:border-slate-400'
                      }`}
                      aria-hidden="true"
                    />

                    {idx < steps.length - 1 && (
                      <div
                        className="absolute left-1/2 top-1/2 -translate-y-1/2 w-full h-px bg-slate-200"
                        aria-hidden="true"
                      >
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#145BFF] to-[#48B900] origin-left"
                          initial={false}
                          animate={{ width: segmentFilled ? '100%' : '0%' }}
                          transition={
                            isReduced
                              ? { duration: 0.15 }
                              : { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
                          }
                        />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active step detail */}
          <div className="mt-10 xl:mt-14 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={steps[activeIdx].id}
                role="tabpanel"
                id={`process-panel-${steps[activeIdx].id}`}
                aria-labelledby={`process-tab-${steps[activeIdx].id}`}
                initial={{ opacity: 0, y: isReduced ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: isReduced ? 0 : -8 }}
                transition={{ duration: isReduced ? 0.15 : 0.32 }}
                className="min-w-0 border-l-2 pl-6 sm:pl-8 xl:pl-10"
                style={{ borderColor: '#145BFF' }}
              >
                <p className="text-[0.6875rem] font-semibold tracking-[0.16em] uppercase text-[#145BFF] mb-3">
                  {t('badge')} · {steps[activeIdx].num}
                </p>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-[clamp(1.25rem,1vw+1rem,1.75rem)] leading-[1.2] tracking-[-0.02em] text-[#08162D]">
                  {steps[activeIdx].title}
                </h3>
                <p className="mt-4 text-[clamp(1rem,0.2vw+0.94rem,1.1875rem)] text-slate-600 leading-[1.7] max-w-[36rem]">
                  {steps[activeIdx].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile / portrait tablet: vertical stepper ── */}
        <ol className="lg:hidden min-w-0 space-y-0">
          {steps.map((step, idx) => {
            const isLast = idx === steps.length - 1;
            return (
              <li key={step.id} className="relative flex gap-4 sm:gap-5 min-w-0">
                {/* Node + vertical connector */}
                <div className="flex flex-col items-center flex-shrink-0 w-2 pt-1.5">
                  <span
                    className="block w-2 h-2 rounded-full bg-gradient-to-br from-[#145BFF] to-[#48B900] flex-shrink-0"
                    aria-hidden="true"
                  />
                  {!isLast && (
                    <div
                      className="flex-1 w-px min-h-[2.5rem] mt-2 bg-slate-200"
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Step content — always visible */}
                <div className={`min-w-0 flex-1 ${isLast ? 'pb-0' : 'pb-10 sm:pb-12'}`}>
                  <span className="font-[family-name:var(--font-display)] font-bold text-[clamp(1.5rem,4vw,2rem)] leading-none tracking-[-0.03em] text-[#145BFF]">
                    {step.num}
                  </span>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] font-bold text-[clamp(1.125rem,2.5vw,1.375rem)] leading-[1.25] tracking-[-0.015em] text-[#08162D]">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 sm:mt-3 text-[clamp(0.9375rem,2vw,1.0625rem)] text-slate-600 leading-[1.65]">
                    {step.desc}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
