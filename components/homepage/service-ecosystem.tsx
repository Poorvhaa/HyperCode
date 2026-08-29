'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { MaskedReveal } from '@/components/motion/masked-reveal';
import { useCanvasActive } from '@/hooks/use-canvas-active';
import {
  CAPABILITY_SERVICES,
  getVisualTheme,
} from './capabilities/capabilities-constants';
import { CapabilitiesVisual } from './capabilities/capabilities-visual';
import { CapabilityServiceRow } from './capabilities/capability-service-row';
import { useActiveCapabilityIndex } from './capabilities/use-active-capability';

export function ServiceEcosystem() {
  const t = useTranslations('HomepageRedesign.ServiceEcosystem');
  const services = CAPABILITY_SERVICES;
  const total = services.length;

  const { activeIndex, setRef } = useActiveCapabilityIndex(total);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const { containerRef, active: sectionVisible } = useCanvasActive('120px');

  const displayIndex = hoverIndex ?? activeIndex;
  const activeTheme = useMemo(
    () => getVisualTheme(services[displayIndex]?.id ?? services[0].id),
    [displayIndex, services],
  );

  const progressCurrent = String(displayIndex + 1).padStart(2, '0');
  const progressTotal = String(total).padStart(2, '0');

  return (
    <section
      id="services"
      data-section-theme="hero"
      className="relative bg-[#0B1018] text-left overflow-hidden border-b border-white/[0.06]"
      aria-labelledby="services-section-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 20% 0%, rgba(20,91,255,0.08) 0%, transparent 55%)',
        }}
      />

      <div ref={containerRef} className="relative max-w-[90rem] min-w-0 mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24">
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

        <div className="lg:grid lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:gap-x-10 xl:gap-x-16">
          {/* Sticky visual — desktop only */}
          <aside className="hidden lg:block min-w-0">
            <div className="sticky top-[5.5rem] xl:top-24 pb-8">
              <div
                className={cn(
                  'transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  sectionVisible ? 'opacity-100' : 'opacity-70 motion-reduce:opacity-100',
                  hoverIndex !== null && 'opacity-100',
                )}
              >
                <CapabilitiesVisual
                  theme={activeTheme}
                  className={cn(
                    'rounded-sm border border-white/[0.06] bg-[#0E1520]/80',
                    hoverIndex !== null && 'border-white/[0.12]',
                  )}
                />
              </div>

              <div
                className="mt-8 flex items-center gap-4 text-[0.6875rem] font-semibold tabular-nums tracking-[0.14em] uppercase text-white/35"
                aria-live="polite"
                aria-atomic="true"
              >
                <span className="text-[#25B5FF]">{progressCurrent}</span>
                <span className="h-px w-8 bg-white/15" aria-hidden="true" />
                <span>{progressTotal}</span>
              </div>

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
            </div>
          </aside>

          {/* Scrolling capability rows */}
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
      </div>
    </section>
  );
}
