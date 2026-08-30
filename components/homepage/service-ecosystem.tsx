'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { MaskedReveal } from '@/components/motion/masked-reveal';
import { useLandingMotion } from '@/hooks/use-landing-motion';
import { CAPABILITY_SERVICES, CAPABILITY_COUNT, type CapabilityServiceId } from './capabilities/capabilities-constants';
import { CapabilitiesVisual } from './capabilities/capabilities-visual';
import { CapabilityServiceRow } from './capabilities/capability-service-row';
import { CapabilityActivePanel } from './capabilities/capability-active-panel';
import { useActiveCapabilityIndex } from './capabilities/use-active-capability';
import { useCapabilityScrollPin } from './capabilities/use-capability-scroll-pin';

/** Light surface from TransformationEngine — used to blend the section seam */
const TRANSFORMATION_LIGHT = '#ECEAE4';

export function ServiceEcosystem() {
  const t = useTranslations('HomepageRedesign.ServiceEcosystem');
  const tNav = useTranslations('Navigation');
  const { isReduced, enableMotion } = useLandingMotion();

  const services = CAPABILITY_SERVICES;
  const total = CAPABILITY_COUNT;

  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const [pinnedStepIndex, setPinnedStepIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { activeIndex: observedIndex, setRef } = useActiveCapabilityIndex(total);

  const useScrollPin = mounted && enableMotion && !isReduced && !isMobile;

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const handleStepChange = useCallback((index: number) => {
    setPinnedStepIndex(index);
  }, []);

  useCapabilityScrollPin({
    enabled: useScrollPin,
    stepCount: total,
    scrollTrackRef,
    pinRef,
    onStepChange: handleStepChange,
  });

  const activeIndex = useScrollPin ? pinnedStepIndex : observedIndex;
  const displayIndex = hoverIndex ?? activeIndex;
  const activeService = services[displayIndex] ?? services[0];
  const activeServiceLabel = tNav(activeService.titleKey);

  const progressCurrent = String(displayIndex + 1).padStart(2, '0');
  const progressTotal = String(total).padStart(2, '0');
  const scrollHeight = useScrollPin ? `${total * 100}vh` : 'auto';

  const progressDots = (
    <ol
      className="mt-5 flex flex-wrap gap-x-3 gap-y-2"
      aria-label="Capability progress"
    >
      {services.map((service, i) => (
        <li key={service.id}>
          <span
            className={cn(
              'text-[0.625rem] font-semibold tabular-nums tracking-[0.08em] transition-colors duration-300',
              i === displayIndex ? 'text-[#25B5FF]' : 'text-white/20',
            )}
            aria-current={i === displayIndex ? 'step' : undefined}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
        </li>
      ))}
    </ol>
  );

  return (
    <section
      id="services"
      data-section-theme="hero"
      className="relative bg-[#0B1018] text-left overflow-hidden border-b border-white/[0.06]"
      aria-labelledby="services-section-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-20 sm:h-24 lg:h-28"
        aria-hidden="true"
        style={{
          background: `linear-gradient(to bottom, ${TRANSFORMATION_LIGHT} 0%, rgba(236,234,228,0.72) 22%, rgba(11,16,24,0.52) 62%, #0B1018 100%)`,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 20% 0%, rgba(20,91,255,0.08) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-[2] max-w-[90rem] min-w-0 mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-12">
        <header className="max-w-3xl mb-16 sm:mb-20 lg:mb-24">
          <MaskedReveal>
            <p className="text-[0.6875rem] sm:text-xs font-semibold tracking-[0.14em] uppercase text-white/45">
              {t('badge')}
            </p>
          </MaskedReveal>
          <MaskedReveal delay={0.06} className="mt-5 sm:mt-6">
            <h2
              id="services-section-heading"
              className="font-[family-name:var(--font-display)] font-bold text-[clamp(2rem,1.8vw+1rem,3rem)] leading-[1.12] tracking-[-0.03em] text-white max-w-[18ch]"
            >
              {t('title')}
            </h2>
          </MaskedReveal>
          <MaskedReveal delay={0.12} className="mt-5 sm:mt-6">
            <p className="text-[clamp(1.0625rem,0.2vw+0.98rem,1.1875rem)] leading-[1.75] text-white/55 max-w-2xl">
              {t('subtitle')}
            </p>
          </MaskedReveal>
        </header>
      </div>

      <div ref={scrollTrackRef} className="relative z-[2]" style={{ height: scrollHeight }}>
        <div
          ref={pinRef}
          className={`${useScrollPin ? '' : 'relative'} min-h-[100svh] flex items-center py-10 sm:py-12 lg:py-16`}
        >
          <div className="w-full max-w-[90rem] min-w-0 mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
            {useScrollPin ? (
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:gap-x-10 xl:gap-x-16 items-start lg:items-center">
                <aside className="hidden lg:block min-w-0">
                  <CapabilitiesVisual
                    serviceId={activeService.id as CapabilityServiceId}
                    activeLabel={activeServiceLabel}
                    className={cn(
                      'rounded-sm border border-white/[0.06] bg-[#0E1520]/80',
                      hoverIndex !== null && 'border-white/[0.12]',
                    )}
                  />

                  <div
                    className="mt-8 flex items-center gap-4 text-[0.6875rem] font-semibold tabular-nums tracking-[0.14em] uppercase text-white/35"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    <span className="text-[#25B5FF]">{progressCurrent}</span>
                    <span className="h-px w-8 bg-white/15" aria-hidden="true" />
                    <span>{progressTotal}</span>
                  </div>

                  {progressDots}
                </aside>

                <div className="min-w-0">
                  <CapabilityActivePanel
                    node={activeService}
                    index={displayIndex}
                    total={total}
                  />
                </div>
              </div>
            ) : (
              <div className="lg:grid lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:gap-x-10 xl:gap-x-16">
                <aside className="hidden lg:block min-w-0">
                  <div className="sticky top-[5.5rem] xl:top-24 pb-8">
                    <CapabilitiesVisual
                      serviceId={activeService.id as CapabilityServiceId}
                      activeLabel={activeServiceLabel}
                      className={cn(
                        'rounded-sm border border-white/[0.06] bg-[#0E1520]/80',
                        hoverIndex !== null && 'border-white/[0.12]',
                      )}
                    />

                    <div
                      className="mt-8 flex items-center gap-4 text-[0.6875rem] font-semibold tabular-nums tracking-[0.14em] uppercase text-white/35"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      <span className="text-[#25B5FF]">{progressCurrent}</span>
                      <span className="h-px w-8 bg-white/15" aria-hidden="true" />
                      <span>{progressTotal}</span>
                    </div>

                    {progressDots}
                  </div>
                </aside>

                <div className="min-w-0 border-t border-white/[0.08] lg:border-t-0">
                  {services.map((node, index) => (
                    <CapabilityServiceRow
                      key={node.id}
                      node={node}
                      index={index}
                      total={total}
                      isActive={index === activeIndex}
                      setRef={setRef(index)}
                      onHover={setHoverIndex}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-[2] pb-16 sm:pb-20 lg:pb-24" aria-hidden="true" />
    </section>
  );
}
