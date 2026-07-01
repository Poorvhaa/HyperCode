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
  FileCheck
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

  const mockClientLogos = [
    { name: 'Vercel', class: 'opacity-50 hover:opacity-100 transition-opacity' },
    { name: 'Stripe', class: 'opacity-50 hover:opacity-100 transition-opacity' },
    { name: 'Linear', class: 'opacity-50 hover:opacity-100 transition-opacity' },
    { name: 'Framer', class: 'opacity-50 hover:opacity-100 transition-opacity' },
    { name: 'AWS', class: 'opacity-50 hover:opacity-100 transition-opacity' },
  ];

  const heroStats = [
    { value: '50+', label: locale === 'es' ? 'Clientes Corporativos' : 'Enterprise Clients' },
    { value: '99.9%', label: locale === 'es' ? 'SLA de Operación' : 'SLA Target Uptime' },
    { value: '4-6', label: locale === 'es' ? 'Semanas de Despliegue' : 'Weeks Avg Deployment' }
  ];

  return (
    <section className="relative min-h-screen bg-[#07090e] pt-40 pb-28 flex items-center overflow-hidden text-left">
      
      {/* Full-width Enterprise Immersive Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-enterprise.png"
          alt="HyperCode Enterprise AI Consulting"
          fill
          priority
          className="object-cover object-center opacity-30 scale-105 select-none pointer-events-none"
        />
        {/* Sleek luxury gradient dark overlays for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40 z-10" />
        <div className="absolute inset-0 bg-[#07090e]/50 z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Content: Glassmorphic Sidebar Container */}
          <div className="lg:col-span-7 bg-slate-950/40 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-[32px] shadow-2xl space-y-8 animate-fadeIn">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full shadow-sm">
                <Sparkles size={14} className="text-[#3b82f6]" />
                <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest">
                  {t('badge')}
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-white tracking-tight leading-[1.1]">
                {t('title')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  {t('titleHighlight')}
                </span>
              </h1>
              
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl font-semibold">
                {t('subtitle')}
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center h-12 px-8 bg-gradient-to-r from-[#0F4C81] to-[#3b82f6] hover:from-[#0d3f6b] hover:to-[#2563eb] text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 gap-2 border-none shadow-lg shadow-blue-500/10 cursor-pointer hover:scale-[1.02]"
              >
                <span>{t('talkToConsultant')}</span>
                <ArrowRight size={14} />
              </Link>
              
              <a
                href="#services"
                className="inline-flex items-center justify-center h-12 px-8 bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-2xl hover:bg-white/10 transition-colors shadow-sm cursor-pointer"
              >
                {tc('solutions')}
              </a>
            </motion.div>

            {/* Statistics Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5"
            >
              {heroStats.map((stat, index) => (
                <div key={index} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
                  <div className="text-[9px] sm:text-[10px] font-extrabold text-slate-400 uppercase tracking-widest leading-tight">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Client trust logos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="space-y-3"
            >
              <div className="text-[9px] font-extrabold text-slate-450 uppercase tracking-widest">
                {locale === 'es' ? 'TECNOLOGÍA RECONOCIDA POR LÍDERES' : 'ENGINEERING RECOGNIZED BY LEADERS'}
              </div>
              <div className="flex flex-wrap gap-6 items-center">
                {mockClientLogos.map((logo, idx) => (
                  <span key={idx} className="text-xs font-black text-slate-400 tracking-wider">
                    {logo.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Pipeline Engine */}
          <div className="lg:col-span-5 w-full flex items-center justify-center min-h-[500px] relative z-20">
            
            {/* Desktop / Tablet Grid flow layout */}
            <div className="hidden md:block w-full h-[540px] relative">
              
              {/* Connection Pipelines (SVG) */}
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <path
                  d="M 20 15 L 80 15 L 80 50 L 20 50 L 20 85 L 80 85"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                />

                {/* Hover active path */}
                {activeFlowPath && (
                  <motion.path
                    d={activeFlowPath}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                )}
              </svg>

              {/* Glassmorphic Nodes */}
              {nodes.map((node) => {
                const Icon = node.icon;
                const isHovered = hoveredNode === node.id;
                
                return (
                  <div
                    key={node.id}
                    style={{ left: node.x, top: node.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-[210px] lg:w-[230px] z-10"
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <div
                      className={`flex items-center gap-3.5 p-4 rounded-2xl border transition-all duration-300 ${
                        isHovered
                          ? 'bg-slate-900 border-blue-500 shadow-xl shadow-blue-500/10 -translate-y-1 scale-[1.02]'
                          : 'bg-[#0b0f19]/80 border-white/5 shadow-sm backdrop-blur-md'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                          isHovered 
                            ? 'bg-[#3b82f6] text-white' 
                            : 'bg-white/5 text-blue-400'
                        }`}
                      >
                        <Icon size={20} />
                      </div>
                      
                      <div className="text-left space-y-0.5">
                        <span className="text-xs font-bold text-slate-200 leading-tight block">
                          {node.label}
                        </span>
                        <span className="text-[9px] text-slate-500 font-extrabold tracking-wider uppercase block">
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
                          <p className="text-[11px] font-bold text-slate-450 leading-relaxed">
                            {node.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
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
                        <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-wider">0{node.id + 1}</span>
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

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 opacity-60">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-9 rounded-full border-2 border-white/30 flex justify-center p-1"
        >
          <div className="w-1.5 h-2 bg-white rounded-full" />
        </motion.div>
        <span className="text-[9px] font-extrabold tracking-widest text-white/40 uppercase">Scroll</span>
      </div>

    </section>
  );
}
