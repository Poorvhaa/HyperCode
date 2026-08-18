'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowRight,
  TrendingUp,
  Database,
  Cpu,
  Server,
  BarChart3,
  Award,
  Sparkles,
  Users,
  CheckCircle,
  FileCheck,
  Building2,
  ShieldCheck,
  Zap,
  ChevronDown
} from 'lucide-react';

export function HeroSection() {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [useBottomPlacement, setUseBottomPlacement] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches);
  }, []);

  const t = useTranslations('Hero');
  const tc = useTranslations('Common');
  const locale = useLocale();

  const steps = [
    {
      id: 'sources',
      title: t('nodes.sources'),
      step: `${locale === 'es' ? 'PASO' : 'STEP'} 01`,
      description: t('nodes.sourcesDesc'),
      icon: Database,
      x: '14%',
      y: '15%',
    },
    {
      id: 'engineering',
      title: t('nodes.engineering'),
      step: `${locale === 'es' ? 'PASO' : 'STEP'} 02`,
      description: t('nodes.engineeringDesc'),
      icon: Cpu,
      x: '86%',
      y: '15%',
    },
    {
      id: 'platform',
      title: t('nodes.platform'),
      step: `${locale === 'es' ? 'PASO' : 'STEP'} 03`,
      description: t('nodes.platformDesc'),
      icon: Server,
      x: '86%',
      y: '50%',
    },
    {
      id: 'analytics',
      title: t('nodes.analytics'),
      step: `${locale === 'es' ? 'PASO' : 'STEP'} 04`,
      description: t('nodes.analyticsDesc'),
      icon: TrendingUp,
      x: '14%',
      y: '50%',
    },
    {
      id: 'bi',
      title: t('nodes.bi'),
      step: `${locale === 'es' ? 'PASO' : 'STEP'} 05`,
      description: t('nodes.biDesc'),
      icon: BarChart3,
      x: '14%',
      y: '85%',
    },
    {
      id: 'outcomes',
      title: t('nodes.outcomes'),
      step: `${locale === 'es' ? 'PASO' : 'STEP'} 06`,
      description: t('nodes.outcomesDesc'),
      icon: Award,
      x: '86%',
      y: '85%',
    },
  ];

  useEffect(() => {
    if (activeStep !== 'sources' && activeStep !== 'engineering') {
      setUseBottomPlacement(false);
      return;
    }

    let ticking = false;
    const checkSpace = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const cardEl = document.getElementById(`workflow-card-${activeStep}`);
          const navEl = document.querySelector('nav');
          if (!cardEl) {
            ticking = false;
            return;
          }
          
          const cardRect = cardEl.getBoundingClientRect();
          const navBottom = navEl ? navEl.getBoundingClientRect().bottom : 0;
          const spaceAbove = cardRect.top - navBottom;
          
          if (spaceAbove < 190) {
            setUseBottomPlacement(true);
          } else {
            setUseBottomPlacement(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    checkSpace();
    window.addEventListener('scroll', checkSpace, { passive: true });
    window.addEventListener('resize', checkSpace, { passive: true });
    return () => {
      window.removeEventListener('scroll', checkSpace);
      window.removeEventListener('resize', checkSpace);
    };
  }, [activeStep]);

  const getActiveFlowPath = () => {
    if (activeStep === null) return null;
    switch (activeStep) {
      case 'sources': return 'M 14 15 L 86 15'; 
      case 'engineering': return 'M 86 15 L 86 50'; 
      case 'platform': return 'M 86 50 L 14 50'; 
      case 'analytics': return 'M 14 50 L 14 85'; 
      case 'bi': return 'M 14 85 L 86 85'; 
      default: return null;
    }
  };

  const getAlignment = (id: string) => {
    if (id === 'sources' || id === 'analytics' || id === 'bi') {
      return {
        translateX: '-25%',
        arrowLeft: '25%',
        placement: 'top-left'
      };
    } else if (id === 'engineering' || id === 'platform' || id === 'outcomes') {
      return {
        translateX: '-75%',
        arrowLeft: '75%',
        placement: 'top-right'
      };
    }
    return {
      translateX: '-50%',
      arrowLeft: '50%',
      placement: 'top'
    };
  };

  const activeFlowPath = getActiveFlowPath();

  const heroStats = [
    { 
      value: '50+', 
      label: locale === 'es' ? 'Clientes Corporativos' : 'Enterprise Clients',
      icon: Building2
    },
    { 
      value: '99.9%', 
      label: locale === 'es' ? 'SLA de Operación' : 'SLA Target Uptime',
      icon: ShieldCheck
    },
    { 
      value: '4-6', 
      label: locale === 'es' ? 'Semanas de Despliegue' : 'Weeks Avg Deployment',
      icon: Zap
    }
  ] ; return (
    <section className="relative w-full min-h-screen py-24 sm:py-32 lg:py-40 flex items-center overflow-visible bg-white text-left bg-dot-pattern border-b border-slate-150">
      
      {/* Decorative Orbs Layer with overflow-hidden */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-slate-50/80 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-5 space-y-8 animate-fadeIn z-20">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Glass Enterprise Badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-royal-blue/10 border border-royal-blue/20 rounded-full shadow-[0_0_20px_rgba(15,76,129,0.05)]">
                <Sparkles size={12} className="text-royal-blue animate-pulse" />
                <span className="text-[10px] sm:text-xs font-semibold text-royal-blue tracking-wider uppercase">
                  {t('badge')}
                </span>
              </div>
              
              {/* Ultra bold Headline with Keyword gradient highlights */}
              <h1 className="text-[36px] sm:text-[48px] lg:text-[70px] font-black text-slate-900 tracking-tight leading-[1.2]">
                {t('title')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-blue-600">
                  {t('titleHighlight')}
                </span>
              </h1>
              
              {/* Soft description paragraph */}
              <p className="text-[16px] md:text-[17px] lg:text-[18px] text-slate-600 leading-[1.7] max-w-xl font-medium">
                {t('subtitle')}
              </p>
            </motion.div>

            {/* CTA Buttons with Lift, Glow and Outline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/consultation"
                className="PrimaryBrandButton"
              >
                <span>{t('talkToConsultant')}</span>
                <ArrowRight size={16} className="ml-2" />
              </Link>
              
              <a
                href="#services"
                className="btn-secondary"
              >
                {t('exploreSolutions')}
              </a>
            </motion.div>

            {/* Statistics Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6"
            >
              {heroStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="premium-card flex flex-col items-center justify-center text-center min-h-[190px] p-6 lg:p-7"
                  >
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-10 h-10 rounded-xl bg-royal-blue/10 text-royal-blue border border-royal-blue/25 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                        <Icon size={18} />
                      </div>
                    </div>
                    <div className="space-y-2 w-full text-center">
                      <div className="w-full text-3xl lg:text-4xl font-black text-slate-900 leading-none tracking-tight text-center whitespace-nowrap group-hover:scale-105 transition-transform duration-300">
                        {stat.value}
                      </div>
                      <div className="w-full text-center text-xs sm:text-sm font-semibold text-slate-500 group-hover:text-royal-blue transition-colors leading-snug">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Client trust logos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="space-y-3"
            >
             
            </motion.div>
          </div>

          {/* Right Column: Visual Pipeline Engine (occupies ~58.3% width on desktop) */}
          <div className="lg:col-span-7 w-full flex items-center justify-center min-h-[500px] relative z-20">
            
            {/* Desktop / Tablet Grid flow layout */}
            <div className="hidden md:block w-full h-[540px] relative">
              
              {/* Connection Pipelines (SVG) */}
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {/* Continuous animated flow path */}
                <motion.path
                  d="M 14 15 L 86 15 L 86 50 L 14 50 L 14 85 L 86 85"
                  fill="none"
                  stroke="rgba(15, 76, 129, 0.15)"
                  strokeWidth="2"
                  strokeDasharray="5 10"
                  animate={{ strokeDashoffset: [0, -30] }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 4 }}
                />

                {/* Hover active path */}
                {activeFlowPath && (
                  <motion.path
                    d={activeFlowPath}
                    fill="none"
                    stroke="#145BFF"
                    strokeWidth="3.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="drop-shadow-[0_0_8px_rgba(15,76,129,0.3)]"
                  />
                )}
              </svg>

              {/* Glassmorphic Nodes */}
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = activeStep === step.id;
                const align = getAlignment(step.id);
                
                return (
                  <motion.div
                    key={step.id}
                    id={`workflow-card-${step.id}`}
                    style={{ left: step.x, top: step.y }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-[185px] lg:w-[205px] xl:w-[225px] outline-none group ${
                      isActive ? 'z-[50]' : 'z-20'
                    }`}
                    onMouseEnter={() => setActiveStep(step.id)}
                    onMouseLeave={() => setActiveStep(null)}
                    onFocus={() => setActiveStep(step.id)}
                    onBlur={() => setActiveStep(null)}
                    onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                    tabIndex={0}
                    aria-expanded={isActive}
                    aria-describedby={isActive ? `workflow-description-${step.id}` : undefined}
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 4 + (steps.findIndex(s => s.id === step.id) % 3) * 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: steps.findIndex(s => s.id === step.id) * 0.4
                    }}
                  >
                    <div className="relative w-full h-full">
                      {/* Workflow Step Card */}
                      <motion.div
                        animate={isActive ? {
                          y: -2,
                          scale: 1.01,
                        } : {
                          y: 0,
                          scale: 1,
                        }}
                        transition={{
                          duration: 0.2,
                          ease: "easeOut"
                        }}
                        style={{
                          background: '#FFFFFF',
                          backdropFilter: 'blur(24px)',
                          WebkitBackdropFilter: 'blur(24px)',
                          transformOrigin: step.id === 'sources' || step.id === 'analytics' || step.id === 'bi' ? 'left center' : 'right center'
                        }}
                        className={`flex items-center gap-3.5 p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                          isActive
                            ? 'border-royal-blue bg-blue-50/5 shadow-[0_14px_30px_rgba(23,105,245,0.15),0_6px_18px_rgba(45,189,62,0.1)]'
                            : 'border-slate-200 shadow-lg'
                        } group-focus-visible:border-royal-blue group-focus-visible:ring-2 group-focus-visible:ring-royal-blue/30`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                            isActive 
                              ? 'bg-royal-blue/15 text-royal-blue rotate-12 scale-110'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          <Icon size={20} />
                        </div>
                        
                        <div className="text-left space-y-0.5">
                          <span className="text-xs font-bold text-slate-800 leading-tight block">
                            {step.title}
                          </span>
                          <span className="text-[9px] text-royal-blue font-extrabold tracking-wider uppercase block">
                            {step.step}
                          </span>
                        </div>
                      </motion.div>

                      {/* Floating Popover (above or below card) */}
                      <AnimatePresence>
                        {isActive && (
                          <div
                            style={{
                              position: 'absolute',
                              left: '50%',
                              ...(useBottomPlacement 
                                ? { top: 'calc(100% + 20px)' } 
                                : { bottom: 'calc(100% + 20px)' }
                              ),
                              transform: `translateX(${align.translateX})`,
                              zIndex: 50,
                              pointerEvents: 'none'
                            }}
                          >
                            <motion.div
                              role="tooltip"
                              id={`workflow-description-${step.id}`}
                              initial={{
                                opacity: 0,
                                y: useBottomPlacement ? -8 : 8,
                                scale: 0.98
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1
                              }}
                              exit={{
                                opacity: 0,
                                y: useBottomPlacement ? -6 : 6,
                                scale: 0.98
                              }}
                              transition={{
                                duration: 0.2,
                                ease: "easeOut"
                              }}
                              style={{
                                background: '#FFFFFF',
                                border: '1px solid rgba(23, 105, 245, 0.18)',
                                borderRadius: '20px',
                                boxShadow: '0 22px 55px rgba(7, 18, 38, 0.16), 0 10px 26px rgba(23, 105, 245, 0.12), 0 4px 14px rgba(45, 189, 62, 0.06)',
                                pointerEvents: 'none'
                              }}
                              className="w-[340px] md:w-[300px] lg:w-[340px] p-[24px] text-left flex flex-col justify-center h-auto relative"
                            >
                              <div className="flex flex-col text-left">
                                <span className="text-[12px] font-bold text-[#1769F5] uppercase tracking-wider block mb-1">
                                  {step.step}
                                </span>
                                <h4 className="text-[20px] font-bold text-[#071226] tracking-tight leading-snug mb-2">
                                  {step.title}
                                </h4>
                                <p className="text-[15px] font-medium text-[#475569] leading-[1.65]">
                                  {step.description}
                                </p>
                              </div>

                              {/* Pointer Arrow */}
                              <div 
                                style={{
                                  position: 'absolute',
                                  left: align.arrowLeft,
                                  transform: 'translateX(-50%) rotate(45deg)',
                                  width: '12px',
                                  height: '12px',
                                  backgroundColor: '#FFFFFF',
                                  pointerEvents: 'none',
                                  ...(useBottomPlacement 
                                    ? {
                                        top: '-6px',
                                        borderTop: '1px solid rgba(23, 105, 245, 0.18)',
                                        borderLeft: '1px solid rgba(23, 105, 245, 0.18)'
                                      } 
                                    : {
                                        bottom: '-6px',
                                        borderBottom: '1px solid rgba(23, 105, 245, 0.18)',
                                        borderRight: '1px solid rgba(23, 105, 245, 0.18)'
                                      }
                                  )
                                }}
                              />
                            </motion.div>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Stacked flow layout */}
            <div className="block md:hidden w-full space-y-4 pl-6 relative py-2">
              <div className="absolute left-[17px] top-4 bottom-4 w-[1px] bg-slate-200" />

              {steps.map((step) => {
                const Icon = step.icon;
                const isOpen = activeStep === step.id;
                
                return (
                  <div key={step.id} className="relative flex items-start gap-4">
                    <button
                      onClick={() => setActiveStep(isOpen ? null : step.id)}
                      className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-royal-blue z-10 flex-shrink-0 mt-3.5 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-royal-blue"
                      aria-expanded={isOpen}
                      aria-describedby={isOpen ? `workflow-description-${step.id}` : undefined}
                    >
                      <Icon size={16} />
                    </button>
                    <div 
                      onClick={() => setActiveStep(isOpen ? null : step.id)}
                      className={`bg-white border p-[18px_20px] rounded-2xl shadow-sm text-left flex-1 flex flex-col justify-center cursor-pointer transition-all duration-300 ${
                        isOpen ? 'border-royal-blue bg-blue-50/5' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <div className="space-y-0.5 text-left">
                          <h4 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight leading-tight">{step.title}</h4>
                          <span className="text-[9px] text-royal-blue font-extrabold uppercase tracking-wider block">
                            {step.step}
                          </span>
                        </div>
                        <ChevronDown 
                          size={16} 
                          className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-royal-blue' : ''}`} 
                        />
                      </div>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`workflow-description-${step.id}`}
                            role="region"
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-[1.65]">
                              {step.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
