'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { 
  ArrowRight, Check, Sparkles, Layers, Users, Cloud, Database, Brain, Zap, Globe, Smartphone, Cpu, Activity, Building2, ArrowDown, ArrowUpRight
} from 'lucide-react';

export function TransformationEngine() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="py-24 bg-white text-center text-slate-900 select-none">
        <div className="w-8 h-8 rounded-full border-2 border-royal-blue border-t-transparent animate-spin mx-auto mb-4" />
        <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">Loading Engine...</span>
      </div>
    );
  }

  return <TransformationEngineContent />;
}

function TransformationEngineContent() {
  const t = useTranslations('HomepageRedesign.TransformationEngine');
  const locale = useLocale();
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: 'discover',
      number: '01',
      name: t('stage1.name'),
      title: t('stage1.title'),
      description: t('stage1.description'),
      benefits: [
        t('stage1.benefits.0'),
        t('stage1.benefits.1'),
        t('stage1.benefits.2')
      ]
    },
    {
      id: 'architect',
      number: '02',
      name: t('stage2.name'),
      title: t('stage2.title'),
      description: t('stage2.description'),
      benefits: [
        t('stage2.benefits.0'),
        t('stage2.benefits.1'),
        t('stage2.benefits.2')
      ]
    },
    {
      id: 'engineer',
      number: '03',
      name: t('stage3.name'),
      title: t('stage3.title'),
      description: t('stage3.description'),
      benefits: [
        t('stage3.benefits.0'),
        t('stage3.benefits.1'),
        t('stage3.benefits.2')
      ]
    },
    {
      id: 'connect',
      number: '04',
      name: t('stage4.name'),
      title: t('stage4.title'),
      description: t('stage4.description'),
      benefits: [
        t('stage4.benefits.0'),
        t('stage4.benefits.1'),
        t('stage4.benefits.2')
      ]
    },
    {
      id: 'automate',
      number: '05',
      name: t('stage5.name'),
      title: t('stage5.title'),
      description: t('stage5.description'),
      benefits: [
        t('stage5.benefits.0'),
        t('stage5.benefits.1'),
        t('stage5.benefits.2')
      ]
    },
    {
      id: 'scale',
      number: '06',
      name: t('stage6.name'),
      title: t('stage6.title'),
      description: t('stage6.description'),
      benefits: [
        t('stage6.benefits.0'),
        t('stage6.benefits.1'),
        t('stage6.benefits.2')
      ]
    }
  ];

  const renderVisual = (stageIndex: number) => {
    switch (stageIndex) {
      case 0:
        return <DiscoverVisual />;
      case 1:
        return <ArchitectVisual />;
      case 2:
        return <EngineerVisual />;
      case 3:
        return <ConnectVisual />;
      case 4:
        return <AutomateVisual />;
      case 5:
        return <ScaleVisual />;
      default:
        return null;
    }
  };

  return (
    <section className="relative bg-white text-left overflow-hidden border-b border-slate-200/90">
      <div className="max-w-[90rem] min-w-0 mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-14 sm:py-16 md:py-20 lg:py-24 xl:py-[7rem]">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold text-royal-blue tracking-widest uppercase">
            {t('badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight">
            {t('headline')}
          </h2>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            {t('supporting')}
          </p>
        </div>

        {/* Process Stepper Navigation */}
        <div className="max-w-4xl mx-auto relative mb-10 md:mb-12">
          {/* Thin connecting line behind steps (Desktop/Tablet) */}
          <div className="absolute top-4 left-[8%] right-[8%] h-[2px] bg-slate-100 -z-10 hidden md:block">
            <motion.div
              className="h-full bg-royal-blue origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: activeStage / 5 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </div>

          {/* Stepper buttons wrapper */}
          <div 
            className="flex items-center justify-start md:justify-between overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 scrollbar-none gap-6 md:gap-0 px-4 md:px-0 w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {stages.map((stage, idx) => {
              const isActive = activeStage === idx;
              const isCompleted = activeStage > idx;

              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(idx)}
                  className="flex flex-col items-center gap-2 focus:outline-none group relative cursor-pointer flex-shrink-0"
                  aria-label={`Go to stage ${stage.number}: ${stage.name}`}
                >
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? 'border-royal-blue bg-royal-blue text-white shadow-[0_0_12px_rgba(20,91,255,0.25)]'
                      : isCompleted
                      ? 'border-green bg-green/5 text-green'
                      : 'border-slate-300 bg-white text-slate-600 group-hover:border-slate-400'
                  }`}>
                    {stage.number}
                  </div>
                  <span className={`text-xs md:text-sm font-semibold tracking-tight transition-colors duration-300 ${
                    isActive
                      ? 'text-royal-blue font-bold'
                      : isCompleted
                      ? 'text-slate-700'
                      : 'text-slate-500 group-hover:text-slate-700'
                  }`}>
                    {stage.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area Card */}
        <div className="max-w-5xl mx-auto bg-white border border-slate-200/80 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.015)] p-6 md:p-10 lg:p-12 min-h-[480px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column (approximately 45%) */}
              <div className="col-span-1 min-w-0 lg:col-span-5 space-y-6">
                <div className="flex items-baseline gap-2 text-royal-blue">
                  <span className="text-xl md:text-2xl font-extrabold">
                    {stages[activeStage].number}
                  </span>
                  <span className="text-xs font-black tracking-widest uppercase">
                    / {stages[activeStage].name}
                  </span>
                </div>

                <h3 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  {stages[activeStage].title}
                </h3>

                <p className="text-sm text-slate-550 leading-relaxed">
                  {stages[activeStage].description}
                </p>

                {/* Checklist */}
                <ul className="space-y-2.5">
                  {stages[activeStage].benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
                      <div className="p-0.5 rounded-full bg-green/10 border border-green/20 text-green flex-shrink-0">
                        <Check size={10} className="stroke-[3px]" />
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button (Desktop) */}
                <div className="hidden lg:block pt-4">
                  <Link
                    href="/consultation"
                    className="PrimaryBrandButton flex items-center justify-center gap-2 group transition-all duration-300"
                    aria-label="Schedule Consultation"
                  >
                    <span>{locale === 'es' ? 'Programar Consulta' : 'Schedule Consultation'}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </Link>
                </div>
              </div>

              {/* Right Column (approximately 55%) */}
              <div className="col-span-1 min-w-0 lg:col-span-7 flex justify-center items-center">
                <div className="w-full flex justify-center">
                  {renderVisual(activeStage)}
                </div>
              </div>

              {/* CTA Button (Mobile/Tablet Stacked) */}
              <div className="col-span-1 min-w-0 flex lg:hidden justify-center pt-2">
                <Link
                  href="/consultation"
                  className="PrimaryBrandButton flex items-center justify-center gap-2 group transition-all duration-300 w-full sm:w-auto"
                  aria-label="Schedule Consultation"
                >
                  <span>{locale === 'es' ? 'Programar Consulta' : 'Schedule Consultation'}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* Stage-specific Visual Components */

function DiscoverVisual() {
  return (
    <div className="relative w-full max-w-[400px] h-[280px] bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center p-6 overflow-hidden">
      {/* Background blueprint pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(to right, #145BFF 1px, transparent 1px), linear-gradient(to bottom, #145BFF 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      
      {/* Visual Title */}
      <div className="absolute top-4 left-0 right-0 text-center">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Your Digital Ecosystem
        </span>
      </div>

      {/* SVG Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 280">
        {/* ERP line */}
        <line x1="200" y1="140" x2="90" y2="70" stroke="#E2E8F0" strokeWidth="1.5" />
        {/* CRM line */}
        <line x1="200" y1="140" x2="310" y2="70" stroke="#E2E8F0" strokeWidth="1.5" />
        {/* Data line */}
        <line x1="200" y1="140" x2="90" y2="200" stroke="#E2E8F0" strokeWidth="1.5" />
        {/* Web line */}
        <line x1="200" y1="140" x2="310" y2="200" stroke="#E2E8F0" strokeWidth="1.5" />
        {/* Mobile line */}
        <line x1="200" y1="140" x2="200" y2="225" stroke="#E2E8F0" strokeWidth="1.5" />
      </svg>

      {/* Center Business Node */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="flex flex-col items-center gap-1 px-4 py-2.5 rounded-lg bg-white border border-slate-200 shadow-md">
          <Building2 size={16} className="text-royal-blue animate-pulse" />
          <span className="text-xs font-black text-slate-900 tracking-wider">BUSINESS</span>
        </div>
      </div>

      {/* Technology Cards */}
      <div className="absolute left-[30px] top-[45px] z-10">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
          <Layers size={11} className="text-slate-500" />
          <span className="text-xs font-bold text-slate-700">ERP</span>
        </div>
      </div>

      <div className="absolute right-[30px] top-[45px] z-10">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
          <Users size={11} className="text-slate-455" />
          <span className="text-xs font-bold text-slate-700">CRM</span>
        </div>
      </div>

      <div className="absolute left-[30px] top-[175px] z-10">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
          <Database size={11} className="text-slate-500" />
          <span className="text-xs font-bold text-slate-700">Data</span>
        </div>
      </div>

      <div className="absolute right-[30px] top-[175px] z-10">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
          <Globe size={11} className="text-slate-455" />
          <span className="text-xs font-bold text-slate-700">Web</span>
        </div>
      </div>

      <div className="absolute left-1/2 bottom-[30px] -translate-x-1/2 z-10">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
          <Smartphone size={11} className="text-slate-455" />
          <span className="text-xs font-bold text-slate-700">Mobile</span>
        </div>
      </div>
    </div>
  );
}

function ArchitectVisual() {
  return (
    <div className="relative w-full max-w-[400px] h-[280px] bg-slate-50 border border-slate-100 rounded-lg flex flex-col justify-center items-center gap-2.5 p-6 overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(to right, #145BFF 1px, transparent 1px), linear-gradient(to bottom, #145BFF 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      
      {/* Experience */}
      <div className="w-full max-w-[240px] py-2 px-4 rounded-lg border border-slate-200 bg-white shadow-2xs flex items-center justify-center gap-2">
        <Globe size={13} className="text-royal-blue" />
        <span className="text-xs font-bold text-slate-700">Experience</span>
      </div>
      
      <ArrowDown size={14} className="text-slate-355" />
      
      {/* Applications */}
      <div className="w-full max-w-[240px] py-2 px-4 rounded-lg border border-slate-200 bg-white shadow-2xs flex items-center justify-center gap-2">
        <Cpu size={13} className="text-royal-blue" />
        <span className="text-xs font-bold text-slate-700">Applications</span>
      </div>
      
      <ArrowDown size={14} className="text-slate-355" />
      
      {/* Data */}
      <div className="w-full max-w-[240px] py-2 px-4 rounded-lg border border-slate-200 bg-white shadow-2xs flex items-center justify-center gap-2">
        <Database size={13} className="text-royal-blue" />
        <span className="text-xs font-bold text-slate-700">Data</span>
      </div>
      
      <ArrowDown size={14} className="text-slate-355" />
      
      {/* Cloud */}
      <div className="w-full max-w-[240px] py-2 px-4 rounded-lg border border-slate-200 bg-white shadow-2xs flex items-center justify-center gap-2">
        <Cloud size={13} className="text-royal-blue" />
        <span className="text-xs font-bold text-slate-700">Cloud</span>
      </div>
    </div>
  );
}

function EngineerVisual() {
  return (
    <div className="relative w-full max-w-[400px] h-[280px] bg-slate-50 border border-slate-100 rounded-lg flex flex-col sm:flex-row justify-center items-center gap-3 p-6 overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(to right, #145BFF 1px, transparent 1px), linear-gradient(to bottom, #145BFF 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      
      {/* Design */}
      <div className="flex-1 w-full sm:w-auto py-3.5 px-2 rounded-lg border border-slate-200 bg-white text-center shadow-2xs flex flex-col items-center gap-1.5">
        <Sparkles size={14} className="text-royal-blue" />
        <span className="text-xs font-bold text-slate-705">Design</span>
      </div>
      
      <span className="hidden sm:inline text-slate-300 font-bold">→</span>
      <span className="sm:hidden text-slate-300 font-bold">↓</span>
      
      {/* Develop */}
      <div className="flex-1 w-full sm:w-auto py-3.5 px-2 rounded-lg border border-slate-200 bg-white text-center shadow-2xs flex flex-col items-center gap-1.5">
        <Cpu size={14} className="text-royal-blue" />
        <span className="text-xs font-bold text-slate-705">Develop</span>
      </div>
      
      <span className="hidden sm:inline text-slate-300 font-bold">→</span>
      <span className="sm:hidden text-slate-300 font-bold">↓</span>
      
      {/* Test */}
      <div className="flex-1 w-full sm:w-auto py-3.5 px-2 rounded-lg border border-slate-200 bg-white text-center shadow-2xs flex flex-col items-center gap-1.5">
        <Check size={14} className="text-royal-blue" />
        <span className="text-xs font-bold text-slate-705">Test</span>
      </div>
      
      <span className="hidden sm:inline text-slate-300 font-bold">→</span>
      <span className="sm:hidden text-slate-300 font-bold">↓</span>
      
      {/* Deploy */}
      <div className="flex-1 w-full sm:w-auto py-3.5 px-2 rounded-lg border border-slate-200 bg-white text-center shadow-2xs flex flex-col items-center gap-1.5">
        <Cloud size={14} className="text-royal-blue" />
        <span className="text-xs font-bold text-slate-705">Deploy</span>
      </div>
    </div>
  );
}

function ConnectVisual() {
  return (
    <div className="relative w-full max-w-[400px] h-[280px] bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center gap-4 sm:gap-6 p-6 overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(to right, #145BFF 1px, transparent 1px), linear-gradient(to bottom, #145BFF 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      
      {/* Left items */}
      <div className="flex flex-col gap-2.5 z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white shadow-2xs w-24">
          <Users size={11} className="text-royal-blue" />
          <span className="text-xs font-bold text-slate-700">CRM</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white shadow-2xs w-24">
          <Layers size={11} className="text-royal-blue" />
          <span className="text-xs font-bold text-slate-700">ERP</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white shadow-2xs w-24">
          <Database size={11} className="text-royal-blue" />
          <span className="text-xs font-bold text-slate-700">Data</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white shadow-2xs w-24">
          <Globe size={11} className="text-royal-blue" />
          <span className="text-xs font-bold text-slate-700">Apps</span>
        </div>
      </div>
      
      {/* Connecting SVG lines */}
      <div className="w-[30px] sm:w-[50px] h-[160px] relative z-0">
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 50 160" fill="none">
          <path d="M 0 20 L 25 20 L 25 80 L 50 80" stroke="#E2E8F0" strokeWidth="1.5" />
          <path d="M 0 60 L 25 60 L 25 80 L 50 80" stroke="#E2E8F0" strokeWidth="1.5" />
          <path d="M 0 100 L 25 100 L 25 80 L 50 80" stroke="#E2E8F0" strokeWidth="1.5" />
          <path d="M 0 140 L 25 140 L 25 80 L 50 80" stroke="#E2E8F0" strokeWidth="1.5" />
        </svg>
      </div>
      
      {/* Integration layer */}
      <div className="flex flex-col items-center justify-center p-3 rounded-lg border border-green/20 bg-green/5 shadow-2xs text-center w-28 h-28 gap-1.5 z-10 relative">
        <Cpu size={16} className="text-green animate-pulse" />
        <span className="text-xs font-black text-slate-900 tracking-wider">INTEGRATION LAYER</span>
      </div>
    </div>
  );
}

function AutomateVisual() {
  return (
    <div className="relative w-full max-w-[400px] h-[280px] bg-slate-50 border border-slate-100 rounded-lg flex flex-col justify-center items-center gap-2.5 p-6 overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(to right, #145BFF 1px, transparent 1px), linear-gradient(to bottom, #145BFF 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      
      {/* Business Process */}
      <div className="w-full max-w-[240px] py-2 px-4 rounded-lg border border-slate-200 bg-white shadow-2xs flex items-center justify-center gap-2">
        <Activity size={13} className="text-royal-blue" />
        <span className="text-xs font-bold text-slate-700">Business Process</span>
      </div>
      
      <ArrowDown size={14} className="text-slate-355" />
      
      {/* AI + Automation */}
      <div className="w-full max-w-[240px] py-2.5 px-4 rounded-lg border-2 border-purple-200 bg-purple-50/50 shadow-2xs flex items-center justify-center gap-2">
        <Brain size={13} className="text-purple-650 animate-pulse" />
        <span className="text-xs font-black text-purple-950">AI + Automation</span>
      </div>
      
      <ArrowDown size={14} className="text-slate-355" />
      
      {/* Faster Decisions */}
      <div className="w-full max-w-[240px] py-2 px-4 rounded-lg border border-slate-200 bg-white shadow-2xs flex items-center justify-center gap-2">
        <Zap size={13} className="text-green" />
        <span className="text-xs font-bold text-slate-700">Faster Decisions</span>
      </div>
    </div>
  );
}

function ScaleVisual() {
  return (
    <div className="relative w-full max-w-[400px] h-[280px] bg-slate-50 border border-slate-100 rounded-lg flex flex-col sm:flex-row justify-center items-center gap-3 p-6 overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(to right, #145BFF 1px, transparent 1px), linear-gradient(to bottom, #145BFF 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      
      {/* Launch */}
      <div className="flex-1 w-full sm:w-auto py-3.5 px-2 rounded-lg border border-slate-200 bg-white text-center shadow-2xs flex flex-col items-center gap-1.5">
        <ArrowUpRight size={14} className="text-royal-blue" />
        <span className="text-xs font-bold text-slate-705">Launch</span>
      </div>
      
      <span className="hidden sm:inline text-slate-300 font-bold">→</span>
      <span className="sm:hidden text-slate-300 font-bold">↓</span>
      
      {/* Optimize */}
      <div className="flex-1 w-full sm:w-auto py-3.5 px-2 rounded-lg border border-slate-200 bg-white text-center shadow-2xs flex flex-col items-center gap-1.5">
        <Activity size={14} className="text-royal-blue" />
        <span className="text-xs font-bold text-slate-705">Optimize</span>
      </div>
      
      <span className="hidden sm:inline text-slate-300 font-bold">→</span>
      <span className="sm:hidden text-slate-300 font-bold">↓</span>
      
      {/* Scale */}
      <div className="flex-1 w-full sm:w-auto py-3.5 px-2 rounded-lg border-2 border-green/20 bg-green/5 text-center shadow-2xs flex flex-col items-center gap-1.5">
        <Zap size={14} className="text-green animate-bounce" />
        <span className="text-xs font-black text-green">Scale</span>
      </div>
    </div>
  );
}
