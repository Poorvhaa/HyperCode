'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { serviceNodes, getIconComponent } from '@/data/service-ecosystem';
import { standardReveal } from '@/lib/motion-tokens';

export function ServiceEcosystem() {
  const t = useTranslations('HomepageRedesign.ServiceEcosystem');
  const tNav = useTranslations('Navigation');
  const prefersReducedMotion = useReducedMotion();
  const isReduced = !!prefersReducedMotion;

  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [mobileOpenIdx, setMobileOpenIdx] = useState<number | null>(null);

  const activeItem = activeIdx !== null ? serviceNodes[activeIdx] : null;

  const panelTitle = activeItem
    ? tNav(activeItem.titleKey)
    : t('centralDefaultTitle');

  const panelDesc = activeItem
    ? tNav(activeItem.descKey)
    : t('centralDefaultDesc');

  const panelOutcome = activeItem
    ? t(`outcomes.${activeItem.outcomeKey}`)
    : t('centralDefaultOutcome');

  const panelKey = activeIdx !== null ? serviceNodes[activeIdx].id : 'default';

  return (
    <section
      id="services"
      className="relative bg-white text-left overflow-hidden border-b border-slate-200/90"
      aria-label={t('title')}
    >
      <div className="max-w-[90rem] min-w-0 mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-14 sm:py-16 md:py-20 lg:py-24 xl:py-[7rem]">
        {/* Desktop editorial layout */}
        <div className="hidden lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-12 xl:gap-20 items-start">
          {/* Left — heading + detail panel */}
          <motion.div
            initial={standardReveal.hidden}
            whileInView={standardReveal.visible({ isReduced })}
            viewport={{ once: true, margin: '-80px' }}
            className="min-w-0 lg:sticky lg:top-28"
          >
            <p className="text-[0.6875rem] sm:text-xs font-medium tracking-[0.16em] uppercase text-[#145BFF]">
              {t('badge')}
            </p>

            <h2
              className="mt-4 sm:mt-5 font-[family-name:var(--font-display)] font-bold text-[clamp(1.875rem,1.2vw+1.25rem,3.5rem)] leading-[1.12] tracking-[-0.025em] text-[#08162D] w-full min-w-0"
            >
              {t('title')}
            </h2>

            <p className="mt-5 sm:mt-6 text-[clamp(1rem,0.25vw+0.94rem,1.1875rem)] text-slate-600 leading-[1.7] max-w-[28rem] w-full min-w-0">
              {t('subtitle')}
            </p>

            {/* Active service detail panel */}
            <div
              className="mt-10 sm:mt-12 min-h-[12rem] border-l-2 pl-6 sm:pl-7 transition-colors duration-300"
              style={{ borderColor: activeItem ? '#145BFF' : 'rgba(148, 163, 184, 0.35)' }}
              aria-live="polite"
              aria-atomic="true"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={panelKey}
                  initial={{ opacity: 0, y: isReduced ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: isReduced ? 0 : -6 }}
                  transition={{ duration: isReduced ? 0.2 : 0.28 }}
                  className="min-w-0"
                >
                  {activeItem && (
                    <div className="mb-4 text-[#145BFF]" aria-hidden="true">
                      {(() => {
                        const Icon = getIconComponent(activeItem.iconName);
                        return <Icon size={22} strokeWidth={1.5} />;
                      })()}
                    </div>
                  )}

                  <h3 className="font-[family-name:var(--font-display)] font-semibold text-[clamp(1.25rem,0.4vw+1.1rem,1.75rem)] leading-snug tracking-[-0.015em] text-[#08162D] min-w-0">
                    {panelTitle}
                  </h3>

                  <p className="mt-3 text-[clamp(0.9375rem,0.15vw+0.9rem,1.0625rem)] leading-[1.65] text-slate-600 min-w-0">
                    {panelDesc}
                  </p>

                  <p className="mt-4 text-[0.8125rem] sm:text-sm font-medium text-[#48B900] leading-snug min-w-0">
                    {panelOutcome}
                  </p>

                  {activeItem && (
                    <Link
                      href={activeItem.href}
                      className="mt-6 inline-flex items-center gap-2 min-h-[44px] text-[0.8125rem] sm:text-sm font-semibold tracking-wide text-[#145BFF] transition-all duration-200 hover:gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145BFF]/30 focus-visible:ring-offset-2 rounded-sm"
                    >
                      <span>{t('viewService')}</span>
                      <ArrowRight size={16} className="shrink-0" aria-hidden="true" />
                    </Link>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right — interactive service list */}
          <motion.div
            initial={standardReveal.hidden}
            whileInView={standardReveal.visible({ isReduced, delay: isReduced ? 0 : 0.06 })}
            viewport={{ once: true, margin: '-80px' }}
            className="min-w-0 w-full"
          >
            <ul className="divide-y divide-slate-200/90 border-t border-slate-200/90">
              {serviceNodes.map((node, index) => {
                const isActive = activeIdx === index;
                const number = String(index + 1).padStart(2, '0');

                return (
                  <li key={node.id}>
                    <div
                      className="group"
                      onMouseEnter={() => setActiveIdx(index)}
                      onMouseLeave={() => setActiveIdx(null)}
                    >
                      <Link
                        href={node.href}
                        onFocus={() => setActiveIdx(index)}
                        onBlur={() => setActiveIdx(null)}
                        className={`flex items-start gap-4 sm:gap-5 md:gap-6 min-w-0 py-6 sm:py-7 md:py-8 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145BFF]/25 focus-visible:ring-offset-2 rounded-sm ${
                          isActive ? 'text-[#145BFF]' : 'text-[#08162D]'
                        }`}
                      >
                        <span
                          className={`shrink-0 pt-0.5 text-[0.8125rem] sm:text-sm font-medium tabular-nums tracking-wide transition-colors duration-200 ${
                            isActive ? 'text-[#145BFF]' : 'text-slate-400'
                          }`}
                          aria-hidden="true"
                        >
                          {number}
                        </span>

                        <span className="flex-1 min-w-0">
                          <span className="flex items-start justify-between gap-4 min-w-0">
                            <span
                              className={`font-[family-name:var(--font-display)] font-semibold text-[clamp(1.125rem,0.5vw+1rem,1.625rem)] leading-snug tracking-[-0.015em] transition-colors duration-200 min-w-0 ${
                                isActive ? 'text-[#145BFF]' : 'text-[#08162D]'
                              }`}
                            >
                              {tNav(node.titleKey)}
                            </span>

                            <ArrowRight
                              size={18}
                              className={`shrink-0 mt-1 transition-all duration-200 ${
                                isActive
                                  ? 'text-[#145BFF] translate-x-0.5 opacity-100'
                                  : 'text-slate-300 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5'
                              }`}
                              aria-hidden="true"
                            />
                          </span>
                        </span>
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>

        {/* Mobile & tablet — stacked accordion */}
        <div className="lg:hidden min-w-0">
          <motion.div
            initial={standardReveal.hidden}
            whileInView={standardReveal.visible({ isReduced })}
            viewport={{ once: true, margin: '-60px' }}
            className="min-w-0"
          >
            <p className="text-[0.6875rem] sm:text-xs font-medium tracking-[0.16em] uppercase text-[#145BFF]">
              {t('badge')}
            </p>

            <h2 className="mt-4 font-[family-name:var(--font-display)] font-bold text-[clamp(1.875rem,1.2vw+1.25rem,3.5rem)] leading-[1.12] tracking-[-0.025em] text-[#08162D] min-w-0">
              {t('title')}
            </h2>

            <p className="mt-5 text-[clamp(1rem,0.25vw+0.94rem,1.1875rem)] text-slate-600 leading-[1.7] min-w-0">
              {t('subtitle')}
            </p>
          </motion.div>

          <ul className="mt-10 sm:mt-12 divide-y divide-slate-200/90 border-t border-slate-200/90 min-w-0">
            {serviceNodes.map((node, index) => {
              const isOpen = mobileOpenIdx === index;
              const number = String(index + 1).padStart(2, '0');
              const panelId = `service-panel-${node.id}`;

              return (
                <li key={node.id} className="min-w-0">
                  <button
                    type="button"
                    id={`service-trigger-${node.id}`}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setMobileOpenIdx(isOpen ? null : index)}
                    className="flex w-full items-start gap-4 min-h-[44px] py-5 sm:py-6 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145BFF]/25 focus-visible:ring-offset-2 rounded-sm"
                  >
                    <span
                      className={`shrink-0 pt-0.5 text-[0.8125rem] sm:text-sm font-medium tabular-nums tracking-wide ${
                        isOpen ? 'text-[#145BFF]' : 'text-slate-400'
                      }`}
                      aria-hidden="true"
                    >
                      {number}
                    </span>

                    <span className="flex-1 min-w-0">
                      <span className="flex items-start justify-between gap-3 min-w-0">
                        <span
                          className={`font-[family-name:var(--font-display)] font-semibold text-[clamp(1.0625rem,0.4vw+0.95rem,1.375rem)] leading-snug tracking-[-0.015em] min-w-0 ${
                            isOpen ? 'text-[#145BFF]' : 'text-[#08162D]'
                          }`}
                        >
                          {tNav(node.titleKey)}
                        </span>

                        <ChevronDown
                          size={18}
                          className={`shrink-0 mt-0.5 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[#145BFF]' : 'text-slate-400'
                          }`}
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={`service-trigger-${node.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: isReduced ? 0.15 : 0.25, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5 sm:pb-6 pl-9 sm:pl-10 min-w-0">
                          <p className="text-[clamp(0.9375rem,0.15vw+0.9rem,1.0625rem)] leading-[1.65] text-slate-600 min-w-0">
                            {tNav(node.descKey)}
                          </p>

                          <p className="mt-3 text-[0.8125rem] sm:text-sm font-medium text-[#48B900] leading-snug min-w-0">
                            {t(`outcomes.${node.outcomeKey}`)}
                          </p>

                          <Link
                            href={node.href}
                            className="mt-4 inline-flex items-center gap-2 min-h-[44px] text-[0.8125rem] sm:text-sm font-semibold tracking-wide text-[#145BFF] transition-all duration-200 hover:gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145BFF]/30 focus-visible:ring-offset-2 rounded-sm"
                          >
                            <span>{t('viewService')}</span>
                            <ArrowRight size={16} className="shrink-0" aria-hidden="true" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
