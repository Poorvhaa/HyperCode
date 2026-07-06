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
  ];  return (
    <section className="relative w-full min-h-screen py-24 sm:py-32 lg:py-40 flex items-center overflow-hidden bg-[#030712] border-b border-white/5 text-left">
      
      {/* Background Image Container with Slow Zoom and Gradient Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15, ease: 'easeOut' }}
          className="relative w-full h-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000"
            alt="HyperCode Enterprise IT Consulting & AI Solutions"
            fill
            priority
            className="object-cover object-center opacity-40 select-none pointer-events-none filter contrast-110 saturate-75"
          />
        </motion.div>
        
        {/* Custom Gradient Overlay with Deeper Dark Colors and Blue Glow */}
        <div 
          className="absolute inset-0 z-10" 
          style={{
            background: 'linear-gradient(180deg, rgba(3,7,18,0.92) 0%, rgba(3,7,18,0.55) 50%, rgba(3,7,18,0.96) 100%), radial-gradient(circle at 30% 40%, rgba(37,99,235,0.2) 0%, transparent 60%)'
          }}
        />
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
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.15)] backdrop-blur-md">
                <Sparkles size={12} className="text-cyan-400 animate-pulse" />
                <span className="text-[10px] sm:text-xs font-semibold text-blue-300 tracking-wider uppercase">
                  {t('badge')}
                </span>
              </div>
              
              {/* Ultra bold Headline with Keyword gradient highlights */}
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-sm">
                {t('title')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 drop-shadow-none animate-gradient">
                  {t('titleHighlight')}
                </span>
              </h1>
              
              {/* Soft White description paragraph */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
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
                className="inline-flex items-center justify-center h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide rounded-xl transition-all duration-200 gap-2 border-none shadow-[0_4px_20px_rgba(37,99,235,0.4)] hover:shadow-[0_4px_25px_rgba(37,99,235,0.6)] cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{t('talkToConsultant')}</span>
                <ArrowRight size={16} />
              </Link>
              
              <a
                href="#services"
                className="inline-flex items-center justify-center h-12 px-8 bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-white font-bold text-sm tracking-wide rounded-xl transition-all duration-200 shadow-md cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
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
                     className="flex flex-col items-center justify-center p-7 lg:p-8 rounded-3xl bg-slate-900/40 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-blue-500/60 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] hover:bg-slate-900/60 transition-all duration-300 group min-h-[190px]"
                  >
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-300 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:text-blue-200 transition-all duration-300">
                        <Icon size={18} />
                      </div>
                    </div>
                    <div className="space-y-2 w-full text-center">
                      <div
  className="
    w-full
    text-4xl
    lg:text-5xl
    font-black
    text-white
    leading-none
    tracking-tight
    text-center
    whitespace-nowrap
    drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]
    group-hover:scale-105
    transition-transform
    duration-300
  "
>
</div>
                      <div className="w-full text-center text-xs sm:text-sm font-semibold text-slate-300 group-hover:text-white transition-colors leading-snug">
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
                  stroke="rgba(96, 165, 250, 0.20)"
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
                    stroke="#60A5FA"
                    strokeWidth="3.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]"
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
                        background: isHovered 
                          ? 'linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(30,58,138,0.5) 100%)' 
                          : 'linear-gradient(135deg, rgba(10,18,32,0.8) 0%, rgba(15,23,42,0.65) 100%)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)'
                      }}
                      className={`flex items-center gap-3.5 p-4 rounded-2xl border transition-all duration-300 shadow-2xl shadow-black/40 ${
                        isHovered
                          ? 'border-blue-400 shadow-blue-500/20 scale-[1.04]'
                          : 'border-white/15'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          isHovered 
                            ? 'bg-blue-500/20 text-[#60A5FA] rotate-12 scale-110 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]'
                            : 'bg-white/5 text-slate-350'
                        }`}
                      >
                        <Icon size={20} />
                      </div>
                      
                      <div className="text-left space-y-0.5">
                        <span className="text-xs font-bold text-slate-100 leading-tight block">
                          {node.label}
                        </span>
                        <span className="text-[9px] text-[#60A5FA] font-extrabold tracking-wider uppercase block">
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
                          className="absolute z-30 top-[115%] left-1/2 -translate-x-1/2 w-[230px] bg-slate-900 border border-white/10 shadow-2xl p-4 rounded-2xl text-left pointer-events-none backdrop-blur-md"
                        >
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 rotate-45 w-2 h-2 bg-slate-900 border-t border-l border-white/10" />
                          <p className="text-[11px] font-bold text-slate-300 leading-relaxed">
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
              <div className="absolute left-[17px] top-4 bottom-4 w-[1px] bg-white/10" />

              {nodes.map((node) => {
                const Icon = node.icon;
                return (
                  <div key={node.id} className="relative flex items-start gap-4">
                    <div className="w-8 h-8 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-blue-400 z-10 flex-shrink-0">
                      <Icon size={16} />
                    </div>
                    <div className="bg-[#0b0f19]/90 border border-white/5 p-4 rounded-2xl shadow-sm text-left flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-xs font-bold text-slate-200">{node.label}</h4>
                        <span className="text-[9px] text-[#60A5FA] font-extrabold uppercase tracking-wider">0{node.id + 1}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
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
