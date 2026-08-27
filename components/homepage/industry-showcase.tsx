'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { standardReveal } from '@/lib/motion-tokens';

const industries = [
  { id: 'healthcare' },
  { id: 'finance' },
  { id: 'retail' },
  { id: 'manufacturing' },
  { id: 'education' },
  { id: 'logistics' },
  { id: 'hospitality' },
  { id: 'construction' },
  { id: 'legal' },
  { id: 'pharma' },
  { id: 'government' },
  { id: 'technology' },
] as const;

type IndustryId = (typeof industries)[number]['id'];

/** Approved case-study imagery already used across HyperCode */
const INDUSTRY_IMAGES: Partial<Record<IndustryId, string>> = {
  healthcare:
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200',
  finance:
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200',
  retail:
    'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200',
  manufacturing:
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200',
  logistics:
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200',
  technology:
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200',
};

const INDUSTRY_GRADIENTS: Record<IndustryId, string> = {
  healthcare: 'from-[#0B2A4A] via-[#0D1F3C] to-[#08162D]',
  finance: 'from-[#0A2540] via-[#0C1E38] to-[#08162D]',
  retail: 'from-[#0B2838] via-[#0D2235] to-[#08162D]',
  manufacturing: 'from-[#0A2636] via-[#0C2032] to-[#08162D]',
  education: 'from-[#0E2448] via-[#0D1F3C] to-[#08162D]',
  logistics: 'from-[#0A2842] via-[#0C1E38] to-[#08162D]',
  hospitality: 'from-[#102038] via-[#0D1F3C] to-[#08162D]',
  construction: 'from-[#122436] via-[#0E2238] to-[#08162D]',
  legal: 'from-[#0C2240] via-[#0D1F3C] to-[#08162D]',
  pharma: 'from-[#0B2848] via-[#0D2038] to-[#08162D]',
  government: 'from-[#0A2644] via-[#0C1E3A] to-[#08162D]',
  technology: 'from-[#081E42] via-[#0C1F3C] to-[#08162D]',
};

export function IndustryShowcase() {
  const t = useTranslations('HomepageRedesign.IndustrySolutions');
  const tList = useTranslations('SolutionsPage.industriesList');
  const prefersReducedMotion = useReducedMotion();
  const isReduced = !!prefersReducedMotion;

  const [activeIdx, setActiveIdx] = useState(0);
  const [mobileOpenIdx, setMobileOpenIdx] = useState<number | null>(0);

  const activeItem = industries[activeIdx];
  const displayTitle = tList(`${activeItem.id}.title`);
  const displayDesc = tList(`${activeItem.id}.desc`);
  const imageSrc = INDUSTRY_IMAGES[activeItem.id];
  const gradient = INDUSTRY_GRADIENTS[activeItem.id];
  const panelId = `industry-panel-${activeItem.id}`;

  const selectIndustry = useCallback((index: number) => {
    setActiveIdx(index);
  }, []);

  return (
    <section
      id="industries"
      className="relative w-full bg-[#08162D] text-white overflow-hidden scroll-mt-24 border-b border-white/[0.06]"
      aria-label={t('title')}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(20, 91, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(20, 91, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-[90rem] min-w-0 mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-14 sm:py-16 md:py-20 lg:py-24 xl:py-[7rem]">
        {/* Section header */}
        <motion.div
          initial={standardReveal.hidden}
          whileInView={standardReveal.visible({ isReduced })}
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl min-w-0 mb-12 sm:mb-14 lg:mb-16 xl:mb-20"
        >
          <p className="text-[0.6875rem] sm:text-xs font-medium tracking-[0.16em] uppercase text-[#48B900]">
            {t('badge')}
          </p>
          <h2 className="mt-4 sm:mt-5 font-[family-name:var(--font-display)] font-bold text-[clamp(1.875rem,1.2vw+1.25rem,3.75rem)] leading-[1.1] tracking-[-0.025em] text-white min-w-0">
            {t('title')}
          </h2>
          <p className="mt-5 sm:mt-6 text-[clamp(1rem,0.25vw+0.94rem,1.1875rem)] text-slate-400 leading-[1.7] max-w-[32rem] min-w-0">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Desktop — split layout: list left, visual right */}
        <div className="hidden lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-12 xl:gap-20 items-start min-w-0">
          {/* Left — editorial industry list */}
          <motion.div
            initial={standardReveal.hidden}
            whileInView={standardReveal.visible({ isReduced, delay: isReduced ? 0 : 0.04 })}
            viewport={{ once: true, margin: '-80px' }}
            className="min-w-0"
            role="tablist"
            aria-label={t('title')}
          >
            <ul className="divide-y divide-white/[0.08] border-t border-white/[0.08] min-w-0">
              {industries.map((ind, index) => {
                const isActive = activeIdx === index;
                const number = String(index + 1).padStart(2, '0');
                const tabId = `industry-tab-${ind.id}`;

                return (
                  <li key={ind.id} className="min-w-0">
                    <button
                      type="button"
                      role="tab"
                      id={tabId}
                      aria-selected={isActive}
                      aria-controls={panelId}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => selectIndustry(index)}
                      onMouseEnter={() => selectIndustry(index)}
                      onFocus={() => selectIndustry(index)}
                      className={`group flex w-full items-start gap-4 sm:gap-5 min-h-[44px] py-6 xl:py-7 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145BFF]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08162D] rounded-sm min-w-0 ${
                        isActive ? 'text-[#145BFF]' : 'text-white/90 hover:text-white'
                      }`}
                    >
                      <span
                        className={`shrink-0 pt-1 text-[0.8125rem] sm:text-sm font-medium tabular-nums tracking-wide transition-colors duration-200 ${
                          isActive ? 'text-[#48B900]' : 'text-slate-500'
                        }`}
                        aria-hidden="true"
                      >
                        {number}
                      </span>

                      <span className="flex-1 min-w-0">
                        <span className="flex items-start justify-between gap-4 min-w-0">
                          <span
                            className={`font-[family-name:var(--font-display)] font-semibold text-[clamp(1.125rem,0.4vw+1rem,1.75rem)] leading-snug tracking-[-0.015em] transition-all duration-200 min-w-0 ${
                              isActive
                                ? 'text-[#145BFF] scale-[1.01] origin-left'
                                : 'text-white/90 group-hover:text-white'
                            }`}
                          >
                            {tList(`${ind.id}.title`)}
                          </span>

                          <ArrowRight
                            size={18}
                            className={`shrink-0 mt-1 transition-all duration-200 ${
                              isActive
                                ? 'text-[#145BFF] translate-x-1 opacity-100'
                                : 'text-slate-600 opacity-0 group-hover:opacity-60 group-hover:translate-x-0.5'
                            }`}
                            aria-hidden="true"
                          />
                        </span>

                        {isActive && (
                          <span
                            className="mt-3 block h-px w-12 bg-gradient-to-r from-[#145BFF] to-[#48B900] transition-all duration-300"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Right — active industry visual panel */}
          <motion.div
            initial={standardReveal.hidden}
            whileInView={standardReveal.visible({ isReduced, delay: isReduced ? 0 : 0.08 })}
            viewport={{ once: true, margin: '-80px' }}
            className="min-w-0 lg:sticky lg:top-28"
          >
            <div
              role="tabpanel"
              id={panelId}
              aria-labelledby={`industry-tab-${activeItem.id}`}
              className="min-w-0"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: isReduced ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: isReduced ? 0 : -8 }}
                  transition={{ duration: isReduced ? 0.2 : 0.32, ease: [0.23, 1, 0.32, 1] }}
                  className="min-w-0"
                >
                  {/* Visual */}
                  <div
                    className={`relative aspect-[4/3] xl:aspect-[16/11] w-full overflow-hidden bg-gradient-to-br ${gradient}`}
                  >
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={displayTitle}
                        fill
                        sizes="(min-width: 1280px) 42vw, 50vw"
                        className="object-cover opacity-75 mix-blend-luminosity"
                        priority={activeIdx === 0}
                      />
                    ) : null}

                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#08162D] via-[#08162D]/60 to-transparent"
                      aria-hidden="true"
                    />

                    <div
                      className="absolute inset-0 bg-gradient-to-r from-[#08162D]/80 via-transparent to-transparent"
                      aria-hidden="true"
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 xl:p-10 min-w-0">
                      <span
                        className="text-[0.6875rem] sm:text-xs font-medium tracking-[0.16em] uppercase text-[#48B900]"
                        aria-hidden="true"
                      >
                        {String(activeIdx + 1).padStart(2, '0')}
                      </span>
                      <h3 className="mt-2 font-[family-name:var(--font-display)] font-bold text-[clamp(1.5rem,0.8vw+1.2rem,2.25rem)] leading-[1.12] tracking-[-0.02em] text-white min-w-0">
                        {displayTitle}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-8 xl:mt-10 min-w-0 border-l-2 border-[#145BFF] pl-6 sm:pl-7">
                    <p className="text-[clamp(1rem,0.2vw+0.94rem,1.1875rem)] leading-[1.7] text-slate-300 min-w-0">
                      {displayDesc}
                    </p>

                    <Link
                      href="/solutions"
                      className="mt-6 sm:mt-8 inline-flex items-center gap-2 min-h-[44px] text-[0.8125rem] sm:text-sm font-semibold tracking-wide text-[#145BFF] transition-all duration-200 hover:gap-2.5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145BFF]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08162D] rounded-sm"
                    >
                      <span>{t('viewSolutions')}</span>
                      <ArrowRight size={16} className="shrink-0" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Mobile & tablet — accordion */}
        <div className="lg:hidden min-w-0">
          <ul className="divide-y divide-white/[0.08] border-t border-white/[0.08] min-w-0">
            {industries.map((ind, index) => {
              const isOpen = mobileOpenIdx === index;
              const number = String(index + 1).padStart(2, '0');
              const itemPanelId = `industry-mobile-panel-${ind.id}`;
              const image = INDUSTRY_IMAGES[ind.id];
              const itemGradient = INDUSTRY_GRADIENTS[ind.id];

              return (
                <li key={ind.id} className="min-w-0">
                  <button
                    type="button"
                    id={`industry-mobile-trigger-${ind.id}`}
                    aria-expanded={isOpen}
                    aria-controls={itemPanelId}
                    onClick={() => setMobileOpenIdx(isOpen ? null : index)}
                    className="flex w-full items-start gap-4 min-h-[44px] py-5 sm:py-6 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145BFF]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08162D] rounded-sm min-w-0"
                  >
                    <span
                      className={`shrink-0 pt-0.5 text-[0.8125rem] sm:text-sm font-medium tabular-nums tracking-wide ${
                        isOpen ? 'text-[#48B900]' : 'text-slate-500'
                      }`}
                      aria-hidden="true"
                    >
                      {number}
                    </span>

                    <span className="flex-1 min-w-0">
                      <span className="flex items-start justify-between gap-3 min-w-0">
                        <span
                          className={`font-[family-name:var(--font-display)] font-semibold text-[clamp(1.0625rem,0.4vw+0.95rem,1.375rem)] leading-snug tracking-[-0.015em] min-w-0 ${
                            isOpen ? 'text-[#145BFF]' : 'text-white/90'
                          }`}
                        >
                          {tList(`${ind.id}.title`)}
                        </span>

                        <ChevronDown
                          size={18}
                          className={`shrink-0 mt-0.5 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[#145BFF]' : 'text-slate-500'
                          }`}
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={itemPanelId}
                        role="region"
                        aria-labelledby={`industry-mobile-trigger-${ind.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: isReduced ? 0.15 : 0.25,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 sm:pb-8 pl-9 sm:pl-10 min-w-0">
                          <div
                            className={`relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br ${itemGradient} mb-5 sm:mb-6`}
                          >
                            {image ? (
                              <Image
                                src={image}
                                alt={tList(`${ind.id}.title`)}
                                fill
                                sizes="100vw"
                                className="object-cover opacity-70 mix-blend-luminosity"
                              />
                            ) : null}
                            <div
                              className="absolute inset-0 bg-gradient-to-t from-[#08162D] via-[#08162D]/50 to-transparent"
                              aria-hidden="true"
                            />
                          </div>

                          <p className="text-[clamp(0.9375rem,0.15vw+0.9rem,1.0625rem)] leading-[1.65] text-slate-300 min-w-0">
                            {tList(`${ind.id}.desc`)}
                          </p>

                          <Link
                            href="/solutions"
                            className="mt-4 sm:mt-5 inline-flex items-center gap-2 min-h-[44px] text-[0.8125rem] sm:text-sm font-semibold tracking-wide text-[#145BFF] transition-all duration-200 hover:gap-2.5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145BFF]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08162D] rounded-sm"
                          >
                            <span>{t('viewSolutions')}</span>
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
