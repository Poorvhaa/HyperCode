'use client';

import { useCallback, useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLandingMotion } from '@/hooks/use-landing-motion';
import { CAPABILITY_SERVICES, CAPABILITY_COUNT } from './capabilities-constants';
import { CapabilityActivePanel } from './capability-active-panel';
import { CapabilitySystemDiagram } from './capability-system-diagram';

const panelSwitch = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

export function CapabilityExplorer() {
  const t = useTranslations('HomepageRedesign.ServiceEcosystem');
  const tNav = useTranslations('Navigation');
  const { isReduced } = useLandingMotion();
  const baseId = useId();

  const services = CAPABILITY_SERVICES;
  const total = CAPABILITY_COUNT;

  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileOpenIndex, setMobileOpenIndex] = useState<number | null>(0);

  const selectCapability = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleTabKeyDown = (event: React.KeyboardEvent, index: number) => {
    let nextIndex = index;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        nextIndex = (index + 1) % total;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        nextIndex = (index - 1 + total) % total;
        break;
      case 'Home':
        event.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        nextIndex = total - 1;
        break;
      default:
        return;
    }

    selectCapability(nextIndex);
    document.getElementById(`${baseId}-tab-${nextIndex}`)?.focus();
  };

  const toggleMobileItem = (index: number) => {
    setMobileOpenIndex((prev) => (prev === index ? null : index));
    setActiveIndex(index);
  };

  const activeService = services[activeIndex] ?? services[0];
  const transition = {
    duration: isReduced ? 0.01 : 0.2,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <>
      {/* Desktop / landscape tablet */}
      <div className="hidden lg:grid lg:grid-cols-[minmax(0,34fr)_minmax(0,66fr)] lg:gap-x-10 xl:gap-x-14 lg:items-start">
        <nav
          role="tablist"
          aria-label={t('navLabel')}
          className="min-w-0 border-t border-white/[0.08]"
        >
          {services.map((node, index) => {
            const isActive = index === activeIndex;
            const number = String(index + 1).padStart(2, '0');

            return (
              <button
                key={node.id}
                type="button"
                role="tab"
                id={`${baseId}-tab-${index}`}
                aria-selected={isActive}
                aria-controls={`${baseId}-panel-${index}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectCapability(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={cn(
                  'group flex w-full min-w-0 items-center gap-4 border-b border-white/[0.08] py-4 text-left transition-colors duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25B5FF]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1018]',
                  isActive && 'border-white/[0.14] bg-white/[0.02]',
                )}
              >
                <span
                  className={cn(
                    'shrink-0 text-[0.6875rem] font-semibold tabular-nums tracking-[0.12em]',
                    isActive ? 'text-[#25B5FF]' : 'text-white/30 group-hover:text-white/45',
                  )}
                  aria-hidden="true"
                >
                  {number}
                </span>
                <span
                  className={cn(
                    'min-w-0 flex-1 font-semibold leading-snug text-[clamp(1.0625rem,0.35vw+0.95rem,1.3125rem)]',
                    isActive ? 'text-white' : 'text-white/55 group-hover:text-white/75',
                  )}
                >
                  {tNav(node.titleKey)}
                </span>
                <ArrowRight
                  size={16}
                  className={cn(
                    'shrink-0 transition-transform duration-200',
                    isActive
                      ? 'text-[#25B5FF] translate-x-0.5'
                      : 'text-white/25 group-hover:text-white/40',
                  )}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </nav>

        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              role="tabpanel"
              id={`${baseId}-panel-${activeIndex}`}
              aria-labelledby={`${baseId}-tab-${activeIndex}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={panelSwitch}
              transition={transition}
            >
              <CapabilitySystemDiagram serviceId={activeService.id} className="mb-6 sm:mb-8" />
              <CapabilityActivePanel node={activeService} index={activeIndex} total={total} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile / portrait tablet accordion */}
      <div className="lg:hidden border-t border-white/[0.08]">
        {services.map((node, index) => {
          const isOpen = mobileOpenIndex === index;
          const number = String(index + 1).padStart(2, '0');
          const panelId = `${baseId}-mobile-panel-${index}`;

          return (
            <div key={node.id} className="border-b border-white/[0.08]">
              <button
                type="button"
                id={`${baseId}-mobile-trigger-${index}`}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleMobileItem(index)}
                className={cn(
                  'flex w-full min-w-0 items-center gap-4 py-4 text-left transition-colors duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25B5FF]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1018]',
                  isOpen && 'bg-white/[0.02]',
                )}
              >
                <span
                  className={cn(
                    'shrink-0 text-[0.6875rem] font-semibold tabular-nums tracking-[0.12em]',
                    isOpen ? 'text-[#25B5FF]' : 'text-white/30',
                  )}
                  aria-hidden="true"
                >
                  {number}
                </span>
                <span
                  className={cn(
                    'min-w-0 flex-1 font-semibold leading-snug text-[clamp(1.0625rem,0.35vw+0.95rem,1.1875rem)]',
                    isOpen ? 'text-white' : 'text-white/70',
                  )}
                >
                  {tNav(node.titleKey)}
                </span>
                <ChevronDown
                  size={18}
                  className={cn(
                    'shrink-0 text-white/35 transition-transform duration-200',
                    isOpen && 'rotate-180 text-[#25B5FF]',
                  )}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={`${baseId}-mobile-trigger-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: isReduced ? 0.01 : 0.22,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pt-1">
                      <CapabilitySystemDiagram serviceId={node.id} compact className="mb-5" />
                      <CapabilityActivePanel node={node} index={index} total={total} compact />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </>
  );
}
