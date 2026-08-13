'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Eye, Layers, Terminal, Rocket } from 'lucide-react';

export function DeliveryProcess() {
  const t = useTranslations('HomepageRedesign.DeliveryProcess');

  const steps = [
    { id: 'scoping', icon: Eye, title: t('step1Title'), desc: t('step1Desc') },
    { id: 'architecture', icon: Layers, title: t('step2Title'), desc: t('step2Desc') },
    { id: 'engineering', icon: Terminal, title: t('step3Title'), desc: t('step3Desc') },
    { id: 'launch', icon: Rocket, title: t('step4Title'), desc: t('step4Desc') }
  ];

  return (
    <section
      data-section-theme="light"
      className="py-24 bg-white border-b border-slate-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="max-w-3xl mb-20 text-left space-y-4">
          <span className="inline-flex items-center gap-1.5 text-eyebrow text-royal-blue">
            <span className="w-1.5 h-1.5 rounded-full bg-royal-blue" />
            {t('badge')}
          </span>
          <h2 className="text-h2 text-slate-900">
            {t('title')}
          </h2>
          <p className="text-body text-slate-600">
            {t('subtitle')}
          </p>
        </div>

        {/* Steps Pipeline Layout */}
        <div className="relative">
          {/* Horizontal connecting line SVG for desktop */}
          <div 
            className="hidden lg:block absolute h-[2px] bg-slate-100 pointer-events-none z-0"
            style={{ top: '28px', left: '28px', right: 'calc(25% - 28px)' }}
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-royal-blue via-cyan-400 to-green"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
                >
                  {/* Step Bubble Indicator */}
                  <div className="relative flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-slate-950 border border-slate-800 text-royal-blue flex items-center justify-center shadow-md relative z-10 transition-colors duration-300 hover:border-royal-blue/60">
                      <StepIcon size={24} />
                    </div>
                    {/* Pulsing ring outer */}
                    <div className="absolute inset-0 rounded-full bg-royal-blue/5 animate-ping opacity-70" />
                  </div>

                  {/* Narrative details */}
                  <div className="space-y-2">
                    <h3 className="text-h4 text-slate-900">{step.title}</h3>
                    <p className="text-body-sm text-slate-500 max-w-[240px] mx-auto lg:mx-0">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
