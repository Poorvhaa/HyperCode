'use client';

import { useState } from 'react';
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
  Zap
} from 'lucide-react';

export function HeroSection() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  
  const t = useTranslations('Hero');
  const tc = useTranslations('Common');
  const locale = useLocale();

  const nodes = [
    {
      id: 0,
      label: t('nodes.sources'),
      icon: Database,
      description: t('nodes.sourcesDesc'),
      x: '20%',
      y: '15%',
    },
    {
      id: 1,
      label: t('nodes.engineering'),
      icon: Cpu,
      description: t('nodes.engineeringDesc'),
      x: '80%',
      y: '15%',
    },
    {
      id: 2,
      label: t('nodes.platform'),
      icon: Server,
      description: t('nodes.platformDesc'),
      x: '80%',
      y: '50%',
    },
    {
      id: 3,
      label: t('nodes.analytics'),
      icon: TrendingUp,
      description: t('nodes.analyticsDesc'),
      x: '20%',
      y: '50%',
    },
    {
      id: 4,
      label: t('nodes.bi'),
      icon: BarChart3,
      description: t('nodes.biDesc'),
      x: '20%',
      y: '85%',
    },
    {
      id: 5,
      label: t('nodes.outcomes'),
      icon: Award,
      description: t('nodes.outcomesDesc'),
      x: '80%',
      y: '85%',
    },
  ];

  const getActiveFlowPath = () => {
    if (hoveredNode === null) return null;
    switch (hoveredNode) {
      case 0: return 'M 20 15 L 80 15'; 
      case 1: return 'M 80 15 L 80 50'; 
      case 2: return 'M 80 50 L 20 50'; 
      case 3: return 'M 20 50 L 20 85'; 
      case 4: return 'M 20 85 L 80 85'; 
      default: return null;
    }
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
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#0F4C81]/10 border border-[#0F4C81]/20 rounded-full shadow-[0_0_20px_rgba(15,76,129,0.05)]">
                <Sparkles size={12} className="text-[#0F4C81] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-semibold text-[#0F4C81] tracking-wider uppercase">
                  {t('badge')}
                </span>
              </div>
              
              {/* Ultra bold Headline with Keyword gradient highlights */}
              <h1 className="text-[36px] sm:text-[48px] lg:text-[70px] font-black text-slate-900 tracking-tight leading-[1.2]">
                {t('title')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F4C81] to-blue-600">
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
                className="btn-primary"
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
                      <div className="w-10 h-10 rounded-xl bg-[#0F4C81]/10 text-[#0F4C81] border border-[#0F4C81]/25 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                        <Icon size={18} />
                      </div>
                    </div>
                    <div className="space-y-2 w-full text-center">
                      <div className="w-full text-3xl lg:text-4xl font-black text-slate-900 leading-none tracking-tight text-center whitespace-nowrap group-hover:scale-105 transition-transform duration-300">
                        {stat.value}
                      </div>
                      <div className="w-full text-center text-xs sm:text-sm font-semibold text-slate-500 group-hover:text-[#0F4C81] transition-colors leading-snug">
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
                  d="M 20 15 L 80 15 L 80 50 L 20 50 L 20 85 L 80 85"
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
                    stroke="#0F4C81"
                    strokeWidth="3.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="drop-shadow-[0_0_8px_rgba(15,76,129,0.3)]"
                  />
                )}
              </svg>

              {/* Glassmorphic Nodes */}
              {nodes.map((node) => {
                const Icon = node.icon;
                const isHovered = hoveredNode === node.id;
                
                return (
                  <motion.div
                    key={node.id}
                    style={{ left: node.x, top: node.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-[210px] lg:w-[230px] z-10"
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
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
                    <div
                      style={{
                        background: '#FFFFFF',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)'
                      }}
                      className={`flex items-center gap-3.5 p-4 rounded-2xl border transition-all duration-300 shadow-lg ${
                        isHovered
                          ? 'border-[#0F4C81] shadow-slate-200 scale-[1.04]'
                          : 'border-slate-200'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          isHovered 
                            ? 'bg-[#0F4C81]/15 text-[#0F4C81] rotate-12 scale-110'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <Icon size={20} />
                      </div>
                      
                      <div className="text-left space-y-0.5">
                        <span className="text-xs font-bold text-slate-800 leading-tight block">
                          {node.label}
                        </span>
                        <span className="text-[9px] text-[#0F4C81] font-extrabold tracking-wider uppercase block">
                          {locale === 'es' ? 'Paso' : 'Step'} 0{node.id + 1}
                        </span>
                      </div>
                    </div>

                    {/* Description Tooltip */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-35 top-[115%] left-1/2 -translate-x-1/2 w-[230px] bg-white border border-slate-200 shadow-2xl p-4 rounded-2xl text-left pointer-events-none"
                        >
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 rotate-45 w-2 h-2 bg-white border-t border-l border-slate-200" />
                          <p className="text-[11px] font-bold text-slate-600 leading-relaxed">
                            {node.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Stacked flow layout */}
            <div className="block md:hidden w-full space-y-4 pl-6 relative py-2">
              <div className="absolute left-[17px] top-4 bottom-4 w-[1px] bg-slate-200" />

              {nodes.map((node) => {
                const Icon = node.icon;
                return (
                  <div key={node.id} className="relative flex items-start gap-4">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0F4C81] z-10 flex-shrink-0">
                      <Icon size={16} />
                    </div>
                    <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm text-left flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-xs font-bold text-slate-800">{node.label}</h4>
                        <span className="text-[9px] text-[#0F4C81] font-extrabold uppercase tracking-wider">0{node.id + 1}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                        {node.description}
                      </p>
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
