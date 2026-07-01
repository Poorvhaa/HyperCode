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
    <section className="relative w-full h-[750px] sm:h-[850px] lg:h-[950px] flex items-center overflow-hidden bg-[#050f1e] border-b border-white/5 text-left">
      
      {/* Background Image Container with Slow Zoom and Gradient Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: 'easeOut' }}
          className="relative w-full h-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600"
            alt="HyperCode Enterprise AI Systems"
            fill
            priority
            className="object-cover object-center opacity-45 select-none pointer-events-none"
          />
        </motion.div>
        
        {/* Custom Gradient Overlay with Transparent Center & Slightly Brighter Left Side */}
        <div 
          className="absolute inset-0 z-10" 
          style={{
            background: 'linear-gradient(180deg, rgba(5,15,30,0.8) 0%, rgba(5,18,35,0.3) 50%, rgba(5,10,20,0.9) 100%), radial-gradient(circle at center, rgba(30,58,138,0.15) 0%, rgba(5,15,30,0.8) 85%)'
          }}
        />
        
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.4))] z-10 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Content Column (occupies ~41.6% width on desktop) */}
          <div className="lg:col-span-5 space-y-8 animate-fadeIn z-20">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              {/* Glass Enterprise Badge */}
              <div className="inline-flex items-center space-x-2.5 px-4 py-2.5 bg-slate-950/60 backdrop-blur-xl border border-blue-500/50 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300">
                <Sparkles size={14} className="text-cyan-300 animate-pulse drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                <span className="text-[10px] font-black text-white tracking-widest uppercase drop-shadow-sm">
                  {t('badge')}
                </span>
              </div>
              
              {/* Ultra bold Headline with Keyword gradient highlights */}
              <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black text-white tracking-tight leading-[1.05] drop-shadow-[0_4px_12px_rgba(0,0,0,0.55)]">
                {t('title')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 drop-shadow-none">
                  {t('titleHighlight')}
                </span>
              </h1>
              
              {/* Soft White description paragraph */}
              <p className="text-base sm:text-[18px] text-white/95 leading-relaxed max-w-xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]">
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
                className="inline-flex items-center justify-center h-14 px-9 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 gap-2 border-none shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] cursor-pointer hover:scale-[1.03] active:scale-97"
              >
                <span>{t('talkToConsultant')}</span>
                <ArrowRight size={14} />
              </Link>
              
              <a
                href="#services"
                className="inline-flex items-center justify-center h-14 px-9 bg-white/5 border border-white/20 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] text-white font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all duration-300 shadow-sm cursor-pointer hover:scale-[1.03] active:scale-97"
              >
                {tc('solutions')}
              </a>
            </motion.div>

            {/* Statistics Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10"
            >
              {heroStats.map((stat, index) => (
                <div key={index} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-white drop-shadow-sm">{stat.value}</div>
                  <div className="text-[9px] sm:text-[10px] font-extrabold text-slate-350 uppercase tracking-widest leading-tight drop-shadow-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Client trust logos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="space-y-3"
            >
              <div className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest drop-shadow-sm">
                {locale === 'es' ? 'TECNOLOGÍA RECONOCIDA POR LÍDERES' : 'ENGINEERING RECOGNIZED BY LEADERS'}
              </div>
              <div className="flex flex-wrap gap-6 items-center">
                {mockClientLogos.map((logo, idx) => (
                  <span key={idx} className="text-xs font-black text-slate-300 tracking-wider drop-shadow-sm">
                    {logo.name}
                  </span>
                ))}
              </div>
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
