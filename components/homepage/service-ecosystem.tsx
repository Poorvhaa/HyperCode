'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { 
  ArrowRight, Sparkles, Cpu, X, Smartphone, Layers, TrendingUp, Code, Cloud, Brain, Database, Users, Check 
} from 'lucide-react';
import { serviceNodes, getIconComponent } from '@/data/service-ecosystem';

const CAPABILITY_SERVICES: Record<string, Record<string, string[]>> = {
  en: {
    ai: ['AI Assistants', 'Workflow Automation', 'Intelligent Integrations'],
    bi: ['Executive Dashboards', 'KPI Tracking', 'Operational Reporting'],
    data: ['Predictive Modeling', 'Data Pipelines', 'Customer Analytics'],
    software: ['Custom SaaS Platforms', 'Enterprise Web Apps', 'API Development'],
    web: ['Performant Websites', 'E-commerce Solutions', 'CMS Integration'],
    mobile: ['iOS & Android Apps', 'Cross-Platform Dev', 'Mobile UI/UX Design'],
    cloud: ['Cloud Migration', 'Kubernetes Orchestration', 'CI/CD Pipelines'],
    digital: ['Digital Strategy', 'Process Modernization', 'Legacy System Auditing'],
    platforms: ['Data Lake Setup', 'Database Migration', 'Data Warehousing'],
    staffing: ['Dedicated Squads', 'On-Demand Engineers', 'Contract Staffing']
  },
  es: {
    ai: ['Asistentes de IA', 'Automatización de Procesos', 'Integraciones Inteligentes'],
    bi: ['Tableros Ejecutivos', 'Seguimiento de KPIs', 'Reportes Operativos'],
    data: ['Modelado Predictivo', 'Tuberías de Datos', 'Análisis de Clientes'],
    software: ['Plataformas SaaS a Medida', 'Aplicaciones Web Corporativas', 'Desarrollo de APIs'],
    web: ['Sitios Web de Alto Rendimiento', 'Soluciones E-commerce', 'Integración de CMS'],
    mobile: ['Aplicaciones iOS y Android', 'Desarrollo Multiplataforma', 'Diseño UI/UX Móvil'],
    cloud: ['Migración a la Nube', 'Orquestación Kubernetes', 'Tuberías CI/CD'],
    digital: ['Estrategia Digital', 'Modernización de Procesos', 'Auditoría de Sistemas'],
    platforms: ['Configuración de Lagos de Datos', 'Migración de Bases de Datos', 'Almacenamiento de Datos'],
    staffing: ['Equipos Dedicados', 'Ingenieros Bajo Demanda', 'Personal Temporal']
  }
};

const MICRO_LABELS: Record<string, Record<string, string>> = {
  en: {
    staffing: 'Strategy & Talent',
    digital: 'Process Modernization',
    platforms: 'Data Core',
    cloud: 'Infrastructure',
    ai: 'Cognitive Automation',
    bi: 'Insights & Reporting',
    data: 'Predictive Modeling',
    software: 'Custom Platform',
    web: 'Web Experience',
    mobile: 'Mobile Touchpoint'
  },
  es: {
    staffing: 'Estrategia y Talento',
    digital: 'Modernización de Procesos',
    platforms: 'Núcleo de Datos',
    cloud: 'Infraestructura',
    ai: 'Automatización Cognitiva',
    bi: 'Información y Reportes',
    data: 'Modelado Predictivo',
    software: 'Plataforma a Medida',
    web: 'Experiencia Web',
    mobile: 'Punto de Contacto Móvil'
  }
};

export function ServiceEcosystem() {
  const t = useTranslations('HomepageRedesign.ServiceEcosystem');
  const tNav = useTranslations('Navigation');
  const locale = useLocale();

  const parentRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // States
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [clickedIdx, setClickedIdx] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [lineCoords, setLineCoords] = useState<{ id: string; path: string }[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const focusedIdx = clickedIdx !== null ? clickedIdx : activeIdx;
  const activeItem = focusedIdx !== null ? serviceNodes[focusedIdx] : null;

  const displayTitle = activeItem
    ? tNav(activeItem.titleKey) || activeItem.titleKey
    : t('centralDefaultTitle');

  const displayDesc = activeItem
    ? tNav(activeItem.descKey) || activeItem.descKey
    : t('centralDefaultDesc');

  const displayOutcome = activeItem
    ? t(`outcomes.${activeItem.outcomeKey}`) || activeItem.outcomeKey
    : t('centralDefaultOutcome');

  const leftNodes = serviceNodes.filter(n => ['staffing', 'digital', 'platforms', 'cloud'].includes(n.id));
  const rightNodes = serviceNodes.filter(n => ['ai', 'bi', 'data', 'software', 'web', 'mobile'].includes(n.id));

  // Compute SVG connection paths dynamically based on elements position
  const updateLineCoords = () => {
    if (!parentRef.current || !coreRef.current) return;
    const parentRect = parentRef.current.getBoundingClientRect();
    const coreRect = coreRef.current.getBoundingClientRect();

    const coreCenterY = coreRect.top - parentRect.top + coreRect.height / 2;
    const coreLeftX = coreRect.left - parentRect.left;
    const coreRightX = coreRect.right - parentRect.left;

    const coords = serviceNodes.map((node) => {
      const el = cardRefs.current[node.id];
      if (!el) return null;
      const elRect = el.getBoundingClientRect();

      const elLeft = elRect.left - parentRect.left;
      const elRight = elRect.right - parentRect.left;
      const elTop = elRect.top - parentRect.top;
      const elHeight = elRect.height;
      const centerY = elTop + elHeight / 2;

      const isLeftNode = ['staffing', 'digital', 'platforms', 'cloud'].includes(node.id);
      
      let path = '';
      if (isLeftNode) {
        // Flows inward from card right edge to core left edge
        const cp = (elRight + coreLeftX) / 2;
        path = `M ${elRight} ${centerY} Q ${cp} ${centerY}, ${coreLeftX} ${coreCenterY}`;
      } else {
        // Flows outward from core right edge to card left edge
        const cp = (coreRightX + elLeft) / 2;
        path = `M ${coreRightX} ${coreCenterY} Q ${cp} ${centerY}, ${elLeft} ${centerY}`;
      }

      return {
        id: node.id,
        path
      };
    }).filter(Boolean) as { id: string; path: string }[];

    setLineCoords(coords);
  };

  useEffect(() => {
    if (isMounted) {
      // Small timeout to allow Layout render calculations to stabilize
      const timer = setTimeout(updateLineCoords, 100);
      window.addEventListener('resize', updateLineCoords);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', updateLineCoords);
      };
    }
  }, [isMounted, focusedIdx]);

  return (
    <section
      id="services"
      className="relative py-24 lg:py-32 bg-[#F4F8FF] border-b border-slate-200 overflow-hidden text-left bg-[linear-gradient(to_right,rgba(20,91,255,0.004)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,91,255,0.004)_1px,transparent_1px)] bg-[size:40px_40px]"
    >
      {/* Ambient spotlights */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-royal-blue/4 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-green/2 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* DESKTOP VIEWPORT LAYOUT */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-center min-h-[620px] relative">
          
          {/* Left Narrative Column & Details Card */}
          <div className="col-span-4 flex flex-col justify-center space-y-6 z-20">
            {/* Header */}
            <div className="space-y-2 select-none">
              <span className="inline-flex items-center gap-1.5 text-eyebrow text-royal-blue">
                <span className="w-1.5 h-1.5 rounded-full bg-royal-blue animate-pulse" />
                {t('badge')}
              </span>
              <h2 className="text-h2 text-slate-900">
                {t('title')}
              </h2>
              <p className="text-body-sm text-slate-500 max-w-sm">
                {t('subtitle')}
              </p>
            </div>

            {/* Dynamic Console Info Panel */}
            <div className="relative group w-full max-w-[340px]">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-royal-blue/6 to-green/4 rounded-3xl blur opacity-60 transition duration-1000" />
              
              <div className="relative w-full min-h-[290px] rounded-3xl border border-slate-200/80 bg-white/95 backdrop-blur-xl p-7 shadow-[0_8px_20px_rgba(0,0,0,0.015)] flex flex-col justify-between select-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={focusedIdx !== null ? focusedIdx : 'default'}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="space-y-4 flex-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        {/* Service Icon Capsule */}
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-royal-blue/8 to-green/4 border border-royal-blue/10 text-royal-blue flex items-center justify-center">
                          {activeItem ? (
                            (() => {
                              const Icon = getIconComponent(activeItem.iconName);
                              return <Icon size={18} />;
                            })()
                          ) : (
                            <Cpu size={18} className="animate-spin text-royal-blue" style={{ animationDuration: '10s' }} />
                          )}
                        </div>

                        {/* Reset Zoom Close Button */}
                        {clickedIdx !== null && (
                          <button
                            onClick={() => setClickedIdx(null)}
                            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:border-slate-350 text-slate-500 hover:text-slate-700 transition shadow-2xs flex items-center gap-1 text-[8.5px] font-black uppercase tracking-wider cursor-pointer"
                          >
                            <X size={8} />
                            <span>{locale === 'es' ? 'Cerrar' : 'Close'}</span>
                          </button>
                        )}
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-h3 text-slate-900">
                        {focusedIdx !== null ? displayTitle : (locale === 'es' ? 'Motor de Transformación' : 'Transformation Engine')}
                      </h3>
                      <p className="text-caption text-slate-500 mt-2 max-w-[280px]">
                        {focusedIdx !== null ? displayDesc : (locale === 'es' ? 'Un ecosistema tecnológico integrado que conecta estrategia, inteligencia, ingeniería, nube, datos y talento para acelerar la transformación empresarial.' : 'An integrated technology ecosystem connecting strategy, intelligence, engineering, cloud, data, and talent to accelerate business transformation.')}
                      </p>
 
                      {/* Dynamic Services List */}
                      {focusedIdx !== null && activeItem && (
                        <div className="space-y-1.5 pt-3 mt-1">
                          {CAPABILITY_SERVICES[locale]?.[activeItem.id]?.map((srv) => (
                            <div key={srv} className="flex items-center gap-2 text-caption font-semibold text-slate-650">
                              <Check size={11} className="text-royal-blue stroke-[3px]" />
                              <span>{srv}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Outcome Badge & View Link */}
                    <div className="space-y-3 pt-3 border-t border-slate-100 mt-auto">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-green/8 text-[8.5px] font-black tracking-wider uppercase text-green">
                        <Sparkles size={9} className="animate-pulse" />
                        <span>{focusedIdx !== null ? displayOutcome : (locale === 'es' ? 'ACELERAR EL VALOR EMPRESARIAL' : 'ACCELERATE BUSINESS VALUE')}</span>
                      </div>

                      {focusedIdx !== null && activeItem && (
                        <div className="flex items-center">
                          <Link
                            href={activeItem.href}
                            className="inline-flex items-center gap-1 text-[9.5px] font-black uppercase tracking-wider text-royal-blue hover:gap-1.5 transition-all"
                          >
                            <span>{locale === 'es' ? 'Ver Detalles' : 'View Service'}</span>
                            <ArrowRight size={11} />
                          </Link>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Transformation Engine Grid (60-65% width) */}
          <div
            ref={parentRef}
            className="col-span-8 relative w-full h-[550px] xl:h-[650px] flex items-center justify-center pointer-events-auto overflow-visible bg-white/70 border border-[#94a3b8]/18 shadow-soft backdrop-blur-md rounded-[32px] p-6 lg:translate-x-[20px]"
          >
            {/* Dynamic SVG Connections Overlay */}
            {isMounted && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                <defs>
                  <filter id="flow-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {lineCoords.map((line) => {
                  const nodeIdx = serviceNodes.findIndex(n => n.id === line.id);
                  const isActive = focusedIdx === nodeIdx;
                  return (
                    <g key={line.id}>
                      {/* Underlay glow path */}
                      <motion.path
                        d={line.path}
                        fill="none"
                        stroke="#145BFF"
                        strokeWidth="2.5"
                        animate={{ opacity: isActive ? 0.25 : 0 }}
                        className="transition-all duration-300"
                      />
                      {/* Main connection line */}
                      <motion.path
                        d={line.path}
                        fill="none"
                        stroke={isActive ? '#145BFF' : '#E2E8F0'}
                        strokeWidth={isActive ? '1.5' : '1'}
                        strokeDasharray={isActive ? 'none' : '3,3'}
                        className="transition-all duration-300"
                      />
                      {/* Flowing animated light dot */}
                      {isActive && (
                        <circle r="3.5" fill="#145BFF" filter="url(#flow-glow)">
                          <animateMotion
                            dur="1.8s"
                            repeatCount="indefinite"
                            path={line.path}
                            keyTimes="0;1"
                            calcMode="linear"
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}
              </svg>
            )}

            {/* Grid structure */}
            <div className="w-full grid grid-cols-12 gap-4 items-center relative z-20">
              
              {/* Left Column: Input Capabilities (4 cards) */}
              <div className="col-span-4 flex flex-col gap-6 justify-center py-2">
                {leftNodes.map((node) => {
                  const idx = serviceNodes.findIndex(n => n.id === node.id);
                  const isHighlighted = focusedIdx === idx;
                  const Icon = getIconComponent(node.iconName);
                  const microLabel = MICRO_LABELS[locale]?.[node.id] || '';
                  
                  return (
                    <div
                      key={node.id}
                      ref={el => { cardRefs.current[node.id] = el; }}
                      onMouseEnter={() => { if (clickedIdx === null) setActiveIdx(idx); }}
                      onMouseLeave={() => { if (clickedIdx === null) setActiveIdx(null); }}
                      onClick={() => {
                        if (clickedIdx === idx) {
                          setClickedIdx(null);
                        } else {
                          setClickedIdx(idx);
                          setActiveIdx(null);
                        }
                      }}
                      className={`px-4 py-3.5 rounded-2xl border bg-white/95 backdrop-blur-md shadow-3xs cursor-pointer transition-all duration-300 flex items-center gap-3.5 select-none ${
                        isHighlighted 
                          ? 'border-royal-blue shadow-md -translate-x-1 ring-1 ring-royal-blue/15 text-royal-blue' 
                          : 'border-slate-200/80 hover:border-slate-350 text-slate-700'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl border transition-colors ${
                        isHighlighted ? 'bg-royal-blue/10 border-royal-blue/20 text-royal-blue' : 'bg-slate-50 border-slate-200 text-slate-550'
                      }`}>
                        <Icon size={16} />
                      </div>
                      <div className="text-left leading-tight space-y-0.5">
                        <span className="text-[12px] font-black tracking-tight block">
                          {tNav(node.titleKey) || node.titleKey}
                        </span>
                        {microLabel && (
                          <span className="text-[8.5px] font-bold text-slate-400 block tracking-wider uppercase">
                            {microLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Center Column: Core Engine */}
              <div className="col-span-4 flex justify-center items-center">
                <div
                  ref={coreRef}
                  className="relative w-full max-w-[200px] aspect-square rounded-[36px] border border-slate-250 bg-white/90 backdrop-blur-xl shadow-md p-6 flex flex-col items-center justify-center text-center select-none bg-[radial-gradient(circle_at_center,rgba(20,91,255,0.03)_0%,transparent_75%)]"
                >
                  {/* Glowing core indicator */}
                  <div className="absolute inset-0 bg-royal-blue/10 rounded-[36px] blur-xl animate-pulse pointer-events-none -z-10" />
                  
                  <div className="space-y-3.5 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-royal-blue/10 to-green/5 border border-royal-blue/15 text-royal-blue flex items-center justify-center shadow-2xs">
                      <Cpu size={22} className="animate-spin" style={{ animationDuration: '14s' }} />
                    </div>
                    <div className="leading-none space-y-1">
                      <span className="text-[10px] font-black tracking-widest text-slate-800 uppercase block">
                        HYPERCODE
                      </span>
                      <span className="text-[7.5px] font-bold text-slate-400 font-mono tracking-widest block leading-tight">
                        TRANSFORMATION ENGINE
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Output Capabilities (6 cards) */}
              <div className="col-span-4 flex flex-col gap-4 justify-center py-2">
                {rightNodes.map((node) => {
                  const idx = serviceNodes.findIndex(n => n.id === node.id);
                  const isHighlighted = focusedIdx === idx;
                  const Icon = getIconComponent(node.iconName);
                  const microLabel = MICRO_LABELS[locale]?.[node.id] || '';

                  return (
                    <div
                      key={node.id}
                      ref={el => { cardRefs.current[node.id] = el; }}
                      onMouseEnter={() => { if (clickedIdx === null) setActiveIdx(idx); }}
                      onMouseLeave={() => { if (clickedIdx === null) setActiveIdx(null); }}
                      onClick={() => {
                        if (clickedIdx === idx) {
                          setClickedIdx(null);
                        } else {
                          setClickedIdx(idx);
                          setActiveIdx(null);
                        }
                      }}
                      className={`px-4 py-2.5 rounded-2xl border bg-white/95 backdrop-blur-md shadow-3xs cursor-pointer transition-all duration-300 flex items-center gap-3 select-none ${
                        isHighlighted 
                          ? 'border-royal-blue shadow-md translate-x-1 ring-1 ring-royal-blue/15 text-royal-blue' 
                          : 'border-slate-200/80 hover:border-slate-350 text-slate-700'
                      }`}
                    >
                      <div className={`p-2 rounded-xl border transition-colors ${
                        isHighlighted ? 'bg-royal-blue/10 border-royal-blue/20 text-royal-blue' : 'bg-slate-50 border-slate-200 text-slate-550'
                      }`}>
                        <Icon size={14} />
                      </div>
                      <div className="text-left leading-tight space-y-0.5">
                        <span className="text-[11.5px] font-black tracking-tight block">
                          {tNav(node.titleKey) || node.titleKey}
                        </span>
                        {microLabel && (
                          <span className="text-[8px] font-bold text-slate-400 block tracking-wider uppercase">
                            {microLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

        {/* RESPONSIVE TABLET & MOBILE STACKED LAYOUT */}
        <div className="lg:hidden flex flex-col gap-10">
          
          {/* Header block */}
          <div className="space-y-2 text-center max-w-2xl mx-auto select-none">
            <span className="inline-flex items-center gap-1.5 text-eyebrow text-royal-blue">
              <span className="w-1.5 h-1.5 rounded-full bg-royal-blue animate-pulse" />
              {t('badge')}
            </span>
            <h2 className="text-h2 text-slate-900">
              {t('title')}
            </h2>
            <p className="text-body-sm text-slate-500">
              {t('subtitle')}
            </p>
          </div>

          {/* Dynamic Console details display placed at the top */}
          <div className="w-full max-w-md rounded-2xl border border-slate-200/60 bg-white p-6 shadow-soft text-left mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={focusedIdx !== null ? focusedIdx : 'default'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-h4 text-slate-900">
                    {focusedIdx !== null ? displayTitle : (locale === 'es' ? 'Motor de Transformación' : 'Transformation Engine')}
                  </h3>
                  <p className="text-caption text-slate-500 mt-1">
                    {focusedIdx !== null ? displayDesc : (locale === 'es' ? 'Un ecosistema tecnológico integrado que conecta estrategia, inteligencia, ingeniería, nube, datos y talento.' : 'An integrated technology ecosystem connecting strategy, intelligence, engineering, cloud, data, and talent.')}
                  </p>
 
                  {/* Dynamic checklist list */}
                  {focusedIdx !== null && activeItem && (
                    <div className="space-y-1 pt-3">
                      {CAPABILITY_SERVICES[locale]?.[activeItem.id]?.map((srv) => (
                        <div key={srv} className="flex items-center gap-2 text-caption font-semibold text-slate-650">
                          <Check size={10} className="text-royal-blue stroke-[3px]" />
                          <span>{srv}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100">
                  <span className="text-[8px] font-black text-green bg-green/8 px-2 py-1 rounded-lg uppercase tracking-wider">
                    {focusedIdx !== null ? displayOutcome : (locale === 'es' ? 'ACELERAR VALOR' : 'ACCELERATE VALUE')}
                  </span>
                  {activeItem && (
                    <Link
                      href={activeItem.href}
                      className="inline-flex items-center gap-1 text-[10px] font-black text-royal-blue uppercase tracking-wider hover:underline"
                    >
                      <span>{locale === 'es' ? 'Ver Detalles' : 'View Service'}</span>
                      <ArrowRight size={11} />
                    </Link>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive core & capability stack cards list */}
          <div className="w-full max-w-md mx-auto space-y-3.5">
            {/* Core engine anchor block */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between shadow-2xs select-none">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-royal-blue text-white shadow-3xs">
                  <Cpu size={16} className="animate-spin" style={{ animationDuration: '16s' }} />
                </div>
                <span className="text-[11px] font-black tracking-widest text-slate-800 uppercase">
                  HYPERCODE ENGINE
                </span>
              </div>
              <span className="text-[7.5px] font-bold text-slate-400 uppercase tracking-widest border border-slate-200 bg-white px-2 py-0.5 rounded-md">
                CORE
              </span>
            </div>

            {/* List grid (2 columns on tablet, 1 column on mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {serviceNodes.map((node, idx) => {
                const isSelected = clickedIdx === idx;
                const Icon = getIconComponent(node.iconName);
                
                return (
                  <button
                    key={node.id}
                    onClick={() => {
                      setClickedIdx(clickedIdx === idx ? null : idx);
                    }}
                    className={`p-3.5 rounded-2xl border bg-white flex items-center gap-3 shadow-3xs text-left cursor-pointer transition-all duration-300 w-full focus:outline-none focus:ring-1 focus:ring-royal-blue/20 ${
                      isSelected ? 'border-royal-blue text-royal-blue ring-1 ring-royal-blue/15 shadow-2xs' : 'border-slate-200/80 text-slate-700'
                    }`}
                  >
                    <div className={`p-2 rounded-xl border transition-colors ${
                      isSelected ? 'bg-royal-blue/10 border-royal-blue/20 text-royal-blue' : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}>
                      <Icon size={14} />
                    </div>
                    <span className="text-xs font-black tracking-tight">
                      {tNav(node.titleKey) || node.titleKey}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
