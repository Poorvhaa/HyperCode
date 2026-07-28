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
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches);
  }, []);
  
  const t = useTranslations('Hero');
  const tc = useTranslations('Common');
  const locale = useLocale();

  const nodes = [
    {
      id: 0,
      label: t('nodes.sources'),
      icon: Database,
      description: t('nodes.sourcesDesc'),
      x: '14%',
      y: '15%',
    },
    {
      id: 1,
      label: t('nodes.engineering'),
      icon: Cpu,
      description: t('nodes.engineeringDesc'),
      x: '86%',
      y: '15%',
    },
    {
      id: 2,
      label: t('nodes.platform'),
      icon: Server,
      description: t('nodes.platformDesc'),
      x: '86%',
      y: '50%',
    },
    {
      id: 3,
      label: t('nodes.analytics'),
      icon: TrendingUp,
      description: t('nodes.analyticsDesc'),
      x: '14%',
      y: '50%',
    },
    {
      id: 4,
      label: t('nodes.bi'),
      icon: BarChart3,
      description: t('nodes.biDesc'),
      x: '14%',
      y: '85%',
    },
    {
      id: 5,
      label: t('nodes.outcomes'),
      icon: Award,
      description: t('nodes.outcomesDesc'),
      x: '86%',
      y: '85%',
    },
  ];

  const getActiveFlowPath = () => {
    if (hoveredNode === null) return null;
    switch (hoveredNode) {
      case 0: return 'M 14 15 L 86 15'; 
      case 1: return 'M 86 15 L 86 50'; 
      case 2: return 'M 86 50 L 14 50'; 
      case 3: return 'M 14 50 L 14 85'; 
      case 4: return 'M 14 85 L 86 85'; 
      default: return null;
    }
  };

  const activeFlowPath = getActiveFlowPath();

  const tooltipPositions = [
    { // Hover Sources (0) -> Above Engineering (1: 86%, 15%)
      left: '86%',
      top: '15%',
      offsetX: '-50%',
      offsetY: 'calc(-100% - 52px)',
      arrowClass: 'bottom-[-6px] left-1/2 -translate-x-1/2'
    },
    { // Hover Engineering (1) -> Above Platform (2: 86%, 50%)
      left: '86%',
      top: '50%',
      offsetX: '-50%',
      offsetY: 'calc(-100% - 52px)',
      arrowClass: 'bottom-[-6px] left-1/2 -translate-x-1/2'
    },
    { // Hover Platform (2) -> Above Analytics (3: 14%, 50%)
      left: '14%',
      top: '50%',
      offsetX: '-50%',
      offsetY: 'calc(-100% - 52px)',
      arrowClass: 'bottom-[-6px] left-1/2 -translate-x-1/2'
    },
    { // Hover Analytics (3) -> Above BI (4: 14%, 85%)
      left: '14%',
      top: '85%',
      offsetX: '-50%',
      offsetY: 'calc(-100% - 52px)',
      arrowClass: 'bottom-[-6px] left-1/2 -translate-x-1/2'
    },
    { // Hover BI (4) -> Above Outcomes (5: 86%, 85%)
      left: '86%',
      top: '85%',
      offsetX: '-50%',
      offsetY: 'calc(-100% - 52px)',
      arrowClass: 'bottom-[-6px] left-1/2 -translate-x-1/2'
    },
    { // Hover Outcomes (5) -> Above/Beside itself (Outcomes: 86%, 85%)
      left: '86%',
      top: '85%',
      offsetX: 'calc(-100% + 50px)',
      offsetY: 'calc(-100% - 52px)',
      arrowClass: 'bottom-[-6px] right-[40px]'
    }
  ];



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
    <section className="relative w-full min-h-screen py-24 sm:py-32 lg:py-40 flex items-center overflow-hidden bg-white text-left bg-dot-pattern border-b border-slate-150">
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-slate-50/80 rounded-full blur-3xl -z-10 pointer-events-none" />

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

              {/* Floating Above-Next-Step Tooltip */}
              <AnimatePresence>
                {hoveredNode !== null && (() => {
                  const pos = tooltipPositions[hoveredNode];
                  const activeNode = nodes[hoveredNode];
                  return (
                    <div
                      key={hoveredNode}
                      style={{
                        position: 'absolute',
                        left: pos.left,
                        top: pos.top,
                        transform: `translate(${pos.offsetX}, ${pos.offsetY})`,
                        zIndex: 30,
                        pointerEvents: 'none'
                      }}
                    >
                      <motion.div
                        role="tooltip"
                        id={`workflow-description-${hoveredNode}`}
                        initial={{
                          opacity: 0,
                          y: 8,
                          scale: 0.98
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1
                        }}
                        exit={{
                          opacity: 0,
                          y: 6,
                          scale: 0.98
                        }}
                        transition={{
                          duration: 0.2,
                          ease: "easeOut"
                        }}
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid rgba(23, 105, 245, 0.22)',
                          borderRadius: '20px',
                          boxShadow: '0 18px 40px rgba(18, 54, 199, 0.14), 0 8px 18px rgba(10, 166, 58, 0.08)',
                          pointerEvents: 'none'
                        }}
                        className="w-[260px] lg:w-[290px] xl:w-[320px] p-5 lg:p-6 text-left flex flex-col justify-center h-auto"
                      >
                        <div className="flex flex-col space-y-2 relative">
                          <div className="space-y-0.5">
                            <h4 className="text-sm lg:text-base font-bold text-[#0A1F6B] tracking-tight leading-snug">
                              {activeNode.label}
                            </h4>
                            <span className="text-[9px] xl:text-[10px] font-extrabold text-[#145BFF] tracking-wider uppercase block">
                              {locale === 'es' ? 'Paso' : 'Step'} 0{activeNode.id + 1}
                            </span>
                          </div>
                          
                          <p className="text-[11px] lg:text-xs xl:text-sm font-medium text-slate-605 leading-[1.6] tracking-normal">
                            {activeNode.description}
                          </p>
                        </div>

                        {/* Pointer Arrow */}
                        <div 
                          style={{
                            borderBottom: '1px solid rgba(23, 105, 245, 0.22)',
                            borderRight: '1px solid rgba(23, 105, 245, 0.22)',
                          }}
                          className={`absolute rotate-45 w-3 h-3 bg-white pointer-events-none ${pos.arrowClass}`}
                        />
                      </motion.div>
                    </div>
                  );
                })()}
              </AnimatePresence>

              {/* Glassmorphic Nodes */}
              {nodes.map((node) => {
                const Icon = node.icon;
                const isHovered = hoveredNode === node.id;
                
                return (
                  <motion.div
                    key={node.id}
                    style={{ left: node.x, top: node.y }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-[185px] lg:w-[205px] xl:w-[225px] outline-none group ${
                      isHovered ? 'z-30' : 'z-20'
                    }`}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onFocus={() => setHoveredNode(node.id)}
                    onBlur={() => setHoveredNode(null)}
                    tabIndex={0}
                    aria-expanded={hoveredNode === node.id}
                    aria-describedby={hoveredNode === node.id ? `workflow-description-${node.id}` : undefined}
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 4 + (node.id % 3) * 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: node.id * 0.4
                    }}
                  >
                    <motion.div
                      whileHover={isTouch ? undefined : {
                        y: -3,
                        scale: 1.02
                      }}
                      transition={{
                        duration: 0.22,
                        ease: "easeOut"
                      }}
                      style={{
                        background: '#FFFFFF',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        transformOrigin: node.id === 0 || node.id === 3 || node.id === 4 ? 'left center' : 'right center'
                      }}
                      className={`flex items-center gap-3.5 p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isHovered
                          ? 'border-royal-blue bg-blue-50/5 shadow-[0_14px_30px_rgba(18,54,199,0.12),0_6px_18px_rgba(10,166,58,0.08)]'
                          : 'border-slate-200 shadow-lg'
                      } group-focus-visible:border-royal-blue group-focus-visible:ring-2 group-focus-visible:ring-royal-blue/30`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          isHovered 
                            ? 'bg-royal-blue/15 text-royal-blue rotate-12 scale-110'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <Icon size={20} />
                      </div>
                      
                      <div className="text-left space-y-0.5">
                        <span className="text-xs font-bold text-slate-800 leading-tight block">
                          {node.label}
                        </span>
                        <span className="text-[9px] text-royal-blue font-extrabold tracking-wider uppercase block">
                          {locale === 'es' ? 'Paso' : 'Step'} 0{node.id + 1}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Stacked flow layout */}
            <div className="block md:hidden w-full space-y-4 pl-6 relative py-2">
              <div className="absolute left-[17px] top-4 bottom-4 w-[1px] bg-slate-200" />

              {nodes.map((node) => {
                const Icon = node.icon;
                const isOpen = hoveredNode === node.id;
                
                return (
                  <div key={node.id} className="relative flex items-start gap-4">
                    <button
                      onClick={() => setHoveredNode(isOpen ? null : node.id)}
                      className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-royal-blue z-10 flex-shrink-0 mt-3.5 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-royal-blue"
                    >
                      <Icon size={16} />
                    </button>
                    <div 
                      onClick={() => setHoveredNode(isOpen ? null : node.id)}
                      className={`bg-white border p-[18px_20px] rounded-2xl shadow-sm text-left flex-1 flex flex-col justify-center cursor-pointer transition-all duration-300 ${
                        isOpen ? 'border-royal-blue bg-blue-50/5' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <div className="space-y-0.5 text-left">
                          <h4 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight leading-tight">{node.label}</h4>
                          <span className="text-[9px] text-royal-blue font-extrabold uppercase tracking-wider block">
                            {locale === 'es' ? 'Paso' : 'Step'} 0{node.id + 1}
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
                            id={`workflow-description-${node.id}`}
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-[1.65]">
                              {node.description}
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
