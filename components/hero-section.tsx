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
    { name: 'Vercel', class: 'opacity-40 hover:opacity-100 transition-opacity' },
    { name: 'Stripe', class: 'opacity-40 hover:opacity-100 transition-opacity' },
    { name: 'Linear', class: 'opacity-40 hover:opacity-100 transition-opacity' },
    { name: 'Framer', class: 'opacity-40 hover:opacity-100 transition-opacity' },
    { name: 'AWS', class: 'opacity-40 hover:opacity-100 transition-opacity' },
  ];

  const heroStats = [
    { value: '50+', label: locale === 'es' ? 'Clientes Corporativos' : 'Enterprise Clients' },
    { value: '99.9%', label: locale === 'es' ? 'Acuerdo de Nivel de Servicio' : 'SLA Target Uptime' },
    { value: '4-6', label: locale === 'es' ? 'Semanas de Despliegue' : 'Weeks Avg Deployment' }
  ];

  return (
    <section className="relative min-h-[95vh] bg-[#fcfdfe] dark:bg-[#07090e] pt-40 pb-20 flex items-center overflow-hidden text-left bg-dot-pattern">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 dark:bg-blue-950/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-slate-50/70 dark:bg-indigo-950/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Content Column (55% space) */}
          <div className="lg:col-span-7 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-full shadow-sm">
                <Sparkles size={14} className="text-[#0F4C81]" />
                <span className="text-[10px] font-extrabold text-[#0F4C81] dark:text-blue-400 uppercase tracking-widest">
                  {t('badge')}
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.12]">
                {t('title')}{' '}
                <span className="text-[#0F4C81] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:to-cyan-300">
                  {t('titleHighlight')}
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-350 leading-relaxed max-w-xl font-medium">
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
                className="inline-flex items-center justify-center h-12 px-7 bg-gradient-to-r from-[#0F4C81] to-[#1a5b94] hover:shadow-lg hover:shadow-blue-500/10 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all duration-300 gap-2 border-none"
              >
                <span>{t('talkToConsultant')}</span>
                <ArrowRight size={14} />
              </Link>
              
              <a
                href="#services"
                className="inline-flex items-center justify-center h-12 px-7 bg-white dark:bg-slate-900 border border-[#0F4C81] dark:border-slate-800 text-[#0F4C81] dark:text-slate-300 font-bold text-xs uppercase tracking-wider rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors shadow-sm"
              >
                {tc('solutions')}
              </a>
            </motion.div>

            {/* Statistics Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200/60 dark:border-slate-800/60"
            >
              {heroStats.map((stat, index) => (
                <div key={index} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Client trust logos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="space-y-3"
            >
              <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                {locale === 'es' ? 'TECNOLOGÍA AVALADA POR LÍDERES' : 'ENGINEERING TRUSTED BY LEADERS'}
              </div>
              <div className="flex flex-wrap gap-8 items-center">
                {mockClientLogos.map((logo, idx) => (
                  <span key={idx} className="text-sm sm:text-base font-extrabold text-slate-400 dark:text-slate-600 tracking-wider">
                    {logo.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Visual Column - Ecosystem Engine (45% space) */}
          <div className="lg:col-span-5 w-full flex items-center justify-center min-h-[500px] relative z-10">
            
            {/* Desktop / Tablet Grid flow layout */}
            <div className="hidden md:block w-full h-[540px] relative">
              {/* Central Illustration background */}
              <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-30 dark:opacity-10 scale-90 pointer-events-none">
                <Image
                  src="/images/hero-enterprise.png"
                  alt="Enterprise engine mockup"
                  width={400}
                  height={400}
                  className="object-contain"
                />
              </div>

              {/* Connection Pipelines (SVG) */}
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {/* Background static line */}
                <path
                  d="M 20 15 L 80 15 L 80 50 L 20 50 L 20 85 L 80 85"
                  fill="none"
                  stroke="rgba(15, 76, 129, 0.1)"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                />

                {/* Hover active path */}
                {activeFlowPath && (
                  <motion.path
                    d={activeFlowPath}
                    fill="none"
                    stroke="#0F4C81"
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
                          ? 'bg-white dark:bg-slate-900 border-[#0F4C81] dark:border-blue-500 shadow-xl shadow-[#0f4c81]/5 -translate-y-1 scale-[1.02]'
                          : 'bg-white/80 dark:bg-slate-950/70 border-slate-200/50 dark:border-slate-800/40 shadow-sm backdrop-blur-md'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                          isHovered 
                            ? 'bg-[#0F4C81] text-white' 
                            : 'bg-slate-50 dark:bg-slate-900 text-[#0F4C81] dark:text-blue-400'
                        }`}
                      >
                        <Icon size={20} />
                      </div>
                      
                      <div className="text-left space-y-0.5">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight block">
                          {node.label}
                        </span>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-extrabold tracking-wider uppercase block">
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
                          className="absolute z-30 top-[115%] left-1/2 -translate-x-1/2 w-[230px] bg-white dark:bg-[#0B0F19] border border-slate-250 dark:border-slate-800 shadow-xl p-3.5 rounded-2xl text-left pointer-events-none backdrop-blur-md"
                        >
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 rotate-45 w-2 h-2 bg-white dark:bg-[#0B0F19] border-t border-l border-slate-250 dark:border-slate-800" />
                          <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400 leading-relaxed">
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
              {/* Vertical flow path */}
              <div className="absolute left-[17px] top-4 bottom-4 w-[2px] bg-slate-100 dark:bg-slate-800" />

              {nodes.map((node) => {
                const Icon = node.icon;
                return (
                  <div key={node.id} className="relative flex items-start gap-4">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#0F4C81] dark:text-blue-400 z-10 flex-shrink-0">
                      <Icon size={16} />
                    </div>
                    <div className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl shadow-sm text-left flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{node.label}</h4>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-wider">0{node.id + 1}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
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
