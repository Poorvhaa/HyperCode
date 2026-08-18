'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { 
  Target, Eye, ShieldCheck, Award, Lightbulb, Users, Cpu, Zap, BookOpen, 
  ChevronRight, ArrowRight, Activity, Server, Network, Database, Brain, Globe, Laptop
} from 'lucide-react';
import { centerOffset, formatGeometry, roundGeometry } from '@/lib/geometry';
import { cardHoverVariants, transitionPresets } from '@/lib/motion-tokens';

interface AboutClientProps {
  locale: string;
  tAbout: Record<string, any>;
  tCommon: Record<string, string>;
}

export function AboutClient({ locale, tAbout, tCommon }: AboutClientProps) {
  const isReduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState<'strategy' | 'delivery' | 'mentoring'>('strategy');

  // Breadcrumbs data
  const breadcrumbs = [
    { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
    { label: locale === 'es' ? 'Nosotros' : 'About Us' }
  ];

  // Core values list
  const coreValues = [
    { key: 'innovation', icon: Lightbulb },
    { key: 'integrity', icon: ShieldCheck },
    { key: 'excellence', icon: Award },
    { key: 'partnership', icon: Users }
  ];

  // Capability array maps to solutions slugs
  const capabilities = [
    { name: locale === 'es' ? 'Automatización de IA' : 'AI & Automation', slug: 'ai-automation', desc: locale === 'es' ? 'Agentes de voz, LLMs y RAG.' : 'AI voice agents, LLMs, and RAG.' },
    { name: locale === 'es' ? 'Inteligencia de Negocio' : 'Business Intelligence', slug: 'business-intelligence', desc: locale === 'es' ? 'Dashboards corporativos y analítica.' : 'Corporate dashboards and analytics.' },
    { name: locale === 'es' ? 'Análisis de Datos' : 'Data Analytics', slug: 'data-analytics-services', desc: locale === 'es' ? 'Modelado predictivo y ETLs.' : 'Predictive modeling and ETLs.' },
    { name: locale === 'es' ? 'Desarrollo de Software' : 'Software Engineering', slug: 'software-dev', desc: locale === 'es' ? 'Aplicaciones escalables de nivel empresarial.' : 'Scalable enterprise-grade applications.' },
    { name: locale === 'es' ? 'Aplicaciones Web' : 'Web Applications', slug: 'web-dev', desc: locale === 'es' ? 'Sistemas modernos en la nube y portales.' : 'Modern cloud systems and web portals.' },
    { name: locale === 'es' ? 'Aplicaciones Móviles' : 'Mobile Apps', slug: 'mobile-dev', desc: locale === 'es' ? 'Aplicaciones iOS y Android nativas.' : 'Native iOS and Android mobile solutions.' },
    { name: locale === 'es' ? 'Nube y DevOps' : 'Cloud & DevOps', slug: 'cloud-infrastructure', desc: locale === 'es' ? 'Infraestructura Terraform, CI/CD y AWS.' : 'Terraform infrastructure, CI/CD, and AWS.' },
    { name: locale === 'es' ? 'Transformación Digital' : 'Digital Transformation', slug: 'digital-transformation', desc: locale === 'es' ? 'Reingeniería de sistemas y migración legacy.' : 'System re-engineering and legacy migration.' }
  ];

  // Business journey steps (What HyperCode Solves)
  const journeySteps = [
    {
      num: '01',
      title: locale === 'es' ? 'Complejidad Operativa' : 'Business Complexity',
      desc: locale === 'es' ? 'Procesos manuales ineficientes y silos de datos fragmentados.' : 'Unstructured processes, manual inefficiency, and fragmented data silos.'
    },
    {
      num: '02',
      title: locale === 'es' ? 'Claridad Arquitectónica' : 'Technical Clarity',
      desc: locale === 'es' ? 'Auditorías de sistemas e ingeniería de requerimientos iniciales.' : 'Rigorous system audits and target blueprint mapping.'
    },
    {
      num: '03',
      title: locale === 'es' ? 'Sistemas Conectados' : 'Connected Systems',
      desc: locale === 'es' ? 'Integración de APIs y flujos automatizados entre departamentos.' : 'Seamless API integrations and automated pipelines between teams.'
    },
    {
      num: '04',
      title: locale === 'es' ? 'Inteligencia Digital' : 'Digital Intelligence',
      desc: locale === 'es' ? 'Dashboards en tiempo real y agentes cognitivos de apoyo.' : 'Real-time analytics dashboards and cognitive AI agents.'
    },
    {
      num: '05',
      title: locale === 'es' ? 'Progreso Sostenible' : 'Sustainable Progress',
      desc: locale === 'es' ? 'Plena autonomía interna mediante transferencia de conocimiento.' : 'Full internal autonomy achieved through structured team handover.'
    }
  ];

  // Working timeline steps (Consulting Approach)
  const approachSteps = [
    {
      title: locale === 'es' ? 'Auditoría de Datos' : 'Data Audit',
      desc: locale === 'es' ? 'Análisis inicial estricto de la infraestructura y dependencias.' : 'Strict initial scanning of current databases and system infrastructure.'
    },
    {
      title: locale === 'es' ? 'Diseño de Blueprints' : 'Blueprint Architecture',
      desc: locale === 'es' ? 'Planificación técnica modular y selección de stack tecnológico.' : 'Modular technical scoping and platform selection to prevent vendor lock-in.'
    },
    {
      title: locale === 'es' ? 'Entregas en Sprint' : 'Sprint Delivery',
      desc: locale === 'es' ? 'Despliegues iterativos mediante metodologías ágiles continuas.' : 'Iterative feature deployments managed by senior Scrum developers.'
    },
    {
      title: locale === 'es' ? 'Transferencia Completa' : 'Structured Handover',
      desc: locale === 'es' ? 'Programas de capacitación y documentación para autonomía interna.' : 'Mentoring loops and complete documentation handoff for self-sustenance.'
    }
  ];

  // Abstract SVG blueprint layout coordinates (deterministic)
  const svgWidth = 560;
  const svgHeight = 360;
  const nodes = [
    { id: 'core', cx: 280, cy: 180, r: 35, label: 'Core', icon: Cpu },
    { id: 'data', cx: 120, cy: 110, r: 24, label: 'Data', icon: Database },
    { id: 'ai', cx: 440, cy: 110, r: 24, label: 'AI Engine', icon: Brain },
    { id: 'cloud', cx: 160, cy: 260, r: 24, label: 'Cloud', icon: Server },
    { id: 'user', cx: 400, cy: 260, r: 24, label: 'Interface', icon: Laptop }
  ];

  return (
    <div className="w-full bg-white select-none">
      
      {/* 1. Compact Premium Page Hero */}
      <section className="relative w-full pt-32 pb-20 overflow-hidden bg-[#F8FAFC] border-b border-slate-200/60">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.45] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-eyebrow text-slate-500 mb-6" aria-label="Breadcrumb">
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center">
                {i > 0 && <ChevronRight size={10} className="mx-2 text-slate-350" />}
                {b.href ? (
                  <Link href={b.href} className="hover:text-royal-blue transition-colors">{b.label}</Link>
                ) : (
                  <span className="text-slate-500 font-extrabold">{b.label}</span>
                )}
              </span>
            ))}
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-blue/5 border border-royal-blue/10 text-eyebrow text-royal-blue">
                <span className="w-1.5 h-1.5 rounded-full bg-royal-blue animate-pulse" />
                {tAbout.pillars || 'ORGANIZATIONAL MISSION'}
              </span>
              
              <h1 className="text-h1 text-slate-900 max-w-2xl">
                {tAbout.title}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-green">
                  {tAbout.titleHighlight}
                </span>
              </h1>
              
              <p className="text-body text-slate-500 max-w-xl">
                {tAbout.subtitle}
              </p>

              <div className="flex flex-wrap gap-4 pt-3">
                <Link href="/consultation" className="PrimaryBrandButton">
                  {locale === 'es' ? 'Iniciar Consulta Técnica' : 'Initiate Scoping Intake'}
                </Link>
                <Link href="/solutions" className="SecondaryBrandOutlineButton">
                  {locale === 'es' ? 'Ver Especialidades' : 'Explore Capabilities'}
                </Link>
              </div>
            </div>

            {/* Right Abstract SVG Blueprint Visual */}
            <div className="lg:col-span-5 w-full flex justify-center">
              <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.03)] p-4 flex items-center justify-center">
                <svg 
                  className="w-full h-full text-slate-300"
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Schematic background grid */}
                  <g opacity="0.3">
                    <line x1="80" y1="0" x2="80" y2="360" stroke="#CBD5E1" strokeWidth="0.5" strokeDasharray="3 3" />
                    <line x1="200" y1="0" x2="200" y2="360" stroke="#CBD5E1" strokeWidth="0.5" strokeDasharray="3 3" />
                    <line x1="360" y1="0" x2="360" y2="360" stroke="#CBD5E1" strokeWidth="0.5" strokeDasharray="3 3" />
                    <line x1="480" y1="0" x2="480" y2="360" stroke="#CBD5E1" strokeWidth="0.5" strokeDasharray="3 3" />
                    <line x1="0" y1="80" x2="560" y2="80" stroke="#CBD5E1" strokeWidth="0.5" strokeDasharray="3 3" />
                    <line x1="0" y1="180" x2="560" y2="180" stroke="#CBD5E1" strokeWidth="0.5" strokeDasharray="3 3" />
                    <line x1="0" y1="280" x2="560" y2="280" stroke="#CBD5E1" strokeWidth="0.5" strokeDasharray="3 3" />
                  </g>

                  {/* Interconnecting pathways (normalized coordinates) */}
                  {nodes.slice(1).map((n) => {
                    const cx = roundGeometry(n.cx);
                    const cy = roundGeometry(n.cy);
                    const mx = roundGeometry((280 + cx) / 2);
                    const my = roundGeometry((180 + cy) / 2);
                    const dx = cx - 280;
                    const dy = cy - 180;
                    const len = Math.sqrt(dx * dx + dy * dy) || 1;
                    const ox = roundGeometry((-dy / len) * 15);
                    const oy = roundGeometry((dx / len) * 15);
                    const pathD = `M 280 180 Q ${formatGeometry(mx + ox)} ${formatGeometry(my + oy)}, ${formatGeometry(cx)} ${formatGeometry(cy)}`;

                    return (
                      <g key={n.id}>
                        <path 
                          d={pathD}
                          stroke="#E2E8F0"
                          strokeWidth="1.2"
                          fill="none"
                        />
                        {!isReduced && (
                          <circle r="3.5" fill="#145BFF">
                            <animateMotion 
                              dur="3s" 
                              repeatCount="indefinite" 
                              path={pathD} 
                            />
                          </circle>
                        )}
                      </g>
                    );
                  })}

                  {/* Draw Nodes */}
                  {nodes.map((n) => {
                    const Icon = n.icon;
                    const isCore = n.id === 'core';
                    const cx = formatGeometry(n.cx);
                    const cy = formatGeometry(n.cy);
                    const r = formatGeometry(n.r);

                    return (
                      <g key={n.id} className="cursor-pointer">
                        <circle 
                          cx={cx} 
                          cy={cy} 
                          r={r} 
                          fill="white" 
                          stroke={isCore ? '#145BFF' : '#E2E8F0'} 
                          strokeWidth={isCore ? '2.5' : '1.5'}
                          className="transition-all duration-300"
                        />
                        <foreignObject 
                          x={formatGeometry(n.cx - 12)} 
                          y={formatGeometry(n.cy - 12)} 
                          width="24" 
                          height="24"
                        >
                          <div className={`w-full h-full flex items-center justify-center ${isCore ? 'text-royal-blue' : 'text-slate-500'}`}>
                            <Icon size={14} className="stroke-[2.5px]" />
                          </div>
                        </foreignObject>
                        {/* Text coordinates label */}
                        <text 
                          x={cx} 
                          y={formatGeometry(n.cy + n.r + 14)} 
                          textAnchor="middle" 
                          className="fill-slate-500 font-mono font-black text-[9px] tracking-tight uppercase"
                        >
                          {n.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HyperCode Introduction & Story */}
      <section className="py-24 bg-white border-b border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Story copy (Left) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-eyebrow text-royal-blue block">
                {locale === 'es' ? 'NUESTRA HISTORIA' : 'OUR HISTORY'}
              </span>
              <h2 className="text-h2 text-slate-900">
                {tAbout.storyTitle}
              </h2>
              <div className="space-y-6 text-slate-500 text-body">
                <p>{tAbout.storyP1}</p>
                <p>{tAbout.storyP2}</p>
              </div>
            </div>

            {/* Interactive Capability Map (Right) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 text-left">
                <h3 className="text-eyebrow text-slate-800 mb-4 flex items-center gap-2">
                  <Activity size={14} className="text-royal-blue" />
                  <span>{locale === 'es' ? 'Estructura Operativa' : 'Operational Architecture'}</span>
                </h3>
                
                {/* Visual tabs selectors */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {(['strategy', 'delivery', 'mentoring'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-2 px-1 rounded-xl text-eyebrow border cursor-pointer transition-all ${
                        activeTab === tab 
                          ? 'bg-royal-blue border-royal-blue text-white shadow-xs' 
                          : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab content panel */}
                <div className="min-h-[140px] bg-white border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <h4 className="text-h4 text-slate-850">
                        {activeTab === 'strategy' && (locale === 'es' ? '1. Consultoría y Auditoría' : '1. Scoping & Audit')}
                        {activeTab === 'delivery' && (locale === 'es' ? '2. Ingeniería Ágil' : '2. Agile Systems Engineering')}
                        {activeTab === 'mentoring' && (locale === 'es' ? '3. Transferencia y Handoff' : '3. Training & Transfer')}
                      </h4>
                      <p className="text-body-sm text-slate-500">
                        {activeTab === 'strategy' && (locale === 'es' 
                          ? 'Analizamos exhaustivamente los silos de bases de datos antes de trazar cualquier arquitectura.' 
                          : 'A strict database scoping audit is completed prior to mapping target platform dependencies.')}
                        {activeTab === 'delivery' && (locale === 'es' 
                          ? 'Construimos sistemas robustos utilizando ingenieros de desarrollo senior integrados en su flujo de trabajo.' 
                          : 'Senior engineers deploy robust code frameworks using automated CI/CD pipelines.')}
                        {activeTab === 'mentoring' && (locale === 'es' 
                          ? 'Acompañamos a su equipo en la adopción tecnológica para asegurar total independencia operativa.' 
                          : 'Coaching loops are initiated to transfer full operational authority of deployed platforms.')}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-4 text-eyebrow text-slate-500">
                    <span>{locale === 'es' ? 'Estado del Sistema' : 'System Status'}</span>
                    <span className="text-emerald-700 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      {locale === 'es' ? 'OPTIMIZADO' : 'OPTIMIZED'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-16 border-t border-slate-200/80">
            {[
              { key: 'projects', label: tAbout['stats.projectsLabel'] || 'Projects Completed', val: tAbout['stats.projects'] || '250+' },
              { key: 'satisfaction', label: tAbout['stats.satisfactionLabel'] || 'Client Satisfaction', val: tAbout['stats.satisfaction'] || '98%' },
              { key: 'consultants', label: tAbout['stats.consultantsLabel'] || 'Consultants Placed', val: tAbout['stats.consultants'] || '1,200+' },
              { key: 'experience', label: tAbout['stats.experienceLabel'] || 'Years Combined Expertise', val: tAbout['stats.experience'] || '12+' }
            ].map((stat) => (
              <motion.div
                key={stat.key}
                variants={cardHoverVariants}
                initial="rest"
                whileHover="hover"
                custom={isReduced}
                className="bg-white border border-slate-200/85 rounded-2xl p-6 text-center shadow-[0_2px_8px_rgba(15,23,42,0.01)]"
              >
                <div className="text-h2 text-royal-blue">{stat.val}</div>
                <p className="text-eyebrow text-slate-500 mt-2 max-w-[130px] mx-auto leading-normal">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="py-24 bg-[#F8FAFC] border-b border-slate-200/60 relative overflow-hidden">
        {/* Decorative graphic line mapping between Mission and Vision */}
        <div className="absolute inset-0 opacity-[0.25] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#94A3B8" strokeWidth="0.8" strokeDasharray="5 5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch text-left">
            
            {/* Mission */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-royal-blue/5 border border-royal-blue/15 text-royal-blue flex items-center justify-center">
                  <Target size={20} className="stroke-[2.5px]" />
                </div>
                <h3 className="text-h3 text-slate-900">{tAbout.mission}</h3>
                <p className="text-slate-500 text-body">
                  {tAbout.missionDesc}
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6 text-eyebrow text-royal-blue">
                {locale === 'es' ? 'ENFOQUE ACTIVO' : 'ACTIVE INTAKE FOCUS'}
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-green/5 border border-green/15 text-green flex items-center justify-center">
                  <Eye size={20} className="stroke-[2.5px]" />
                </div>
                <h3 className="text-h3 text-slate-900">{tAbout.vision}</h3>
                <p className="text-slate-500 text-body">
                  {tAbout.visionDesc}
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6 text-eyebrow text-green">
                {locale === 'es' ? 'DIRECCIÓN DE FUTURO' : 'FUTURE ARCHITECTURE'}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. What HyperCode Solves */}
      <section className="py-24 bg-white border-b border-slate-200/60 text-left">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl mb-14 space-y-3">
            <span className="text-eyebrow text-royal-blue block">
              {locale === 'es' ? 'NUESTRO PROPÓSITO' : 'OUR PURPOSE'}
            </span>
            <h2 className="text-h2 text-slate-900">
              {locale === 'es' ? 'De la Complejidad al Progreso Digital' : 'Engineering Clarity from System Complexity'}
            </h2>
          </div>

          {/* Connected Pipeline Sequence (Horizontal on Desktop, Vertical on Mobile) */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative">
            {/* Connection line backdrop on Desktop */}
            <div className="hidden lg:block absolute top-[28px] left-[5%] right-[5%] h-[1.5px] bg-slate-200 -z-10" />

            {journeySteps.map((step, idx) => (
              <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_2px_6px_rgba(15,23,42,0.01)] relative flex flex-col justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold font-mono text-royal-blue">{step.num}</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                      <span className="w-1 h-1 rounded-full bg-royal-blue" />
                    </span>
                  </div>
                  <h4 className="text-h4 text-slate-900">{step.title}</h4>
                  <p className="text-body-sm text-slate-500">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Company Capabilities Matrix */}
      <section className="py-24 bg-[#F8FAFC] border-b border-slate-200/60 text-left">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl mb-14 space-y-3">
            <span className="text-eyebrow text-royal-blue block">
              {locale === 'es' ? 'NUESTRO ALCANCE' : 'CAPABILITY MATRIX'}
            </span>
            <h2 className="text-h2 text-slate-900">
              {locale === 'es' ? 'Capacidades de Ingeniería Tecnológica' : 'Enterprise Technology Solutions'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, idx) => (
              <Link 
                key={idx} 
                href={cap.slug === 'staffing' ? '/staffing' : `/solutions/${cap.slug}`}
                className="bg-white border border-slate-200 hover:border-royal-blue/30 rounded-2xl p-6 shadow-xs group transition-all duration-200 text-left flex flex-col justify-between gap-6"
              >
                <div className="space-y-2">
                  <h4 className="text-h4 text-slate-900 group-hover:text-royal-blue transition-colors">
                    {cap.name}
                  </h4>
                  <p className="text-body-sm text-slate-500">
                    {cap.desc}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-eyebrow text-royal-blue">
                  <span>{locale === 'es' ? 'Ver Solución' : 'View Capability'}</span>
                  <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Core Values */}
      <section className="py-24 bg-white border-b border-slate-200/60 text-left">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl mb-14 space-y-3">
            <span className="text-eyebrow text-royal-blue block">
              {tAbout.pillars || 'ORGANIZATIONAL PILLARS'}
            </span>
            <h2 className="text-h2 text-slate-900">
              {tAbout.valuesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreValues.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  variants={cardHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  custom={isReduced}
                  className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-xs flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-royal-blue/5 border border-royal-blue/15 flex items-center justify-center text-royal-blue flex-shrink-0">
                    <Icon size={20} className="stroke-[2px]" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-h4 text-slate-900">
                      {tAbout[`values.${value.key}.title`] || value.key}
                    </h4>
                    <p className="text-body-sm text-slate-500">
                      {tAbout[`values.${value.key}.desc`]}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Working Approach (Delivery Journey) */}
      <section className="py-24 bg-[#F8FAFC] border-b border-slate-200/60 text-left relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Description (Left) */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-eyebrow text-royal-blue block">
                {tAbout.approachTitle || 'OUR APPROACH'}
              </span>
              <h2 className="text-h2 text-slate-900">
                {locale === 'es' ? 'Metodología Transparente' : 'Direct Mentoring & Transparent Process'}
              </h2>
              <p className="text-body-sm text-slate-500">
                {tAbout.approachDesc}
              </p>
            </div>

            {/* Steps Visual Grid (Right) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {approachSteps.map((step, idx) => (
                <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_2px_6px_rgba(15,23,42,0.01)] flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-royal-blue text-[10px] font-black font-mono flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-h4 text-slate-800">{step.title}</h4>
                    <p className="text-body-sm text-slate-500">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nationwide Presence Sub-Section */}
          <div className="pt-12 mt-16 border-t border-slate-200/80 max-w-4xl text-left space-y-4">
            <h3 className="text-h3 text-slate-900">{tAbout.presenceTitle}</h3>
            <p className="text-body-sm text-slate-500">
              {tAbout.presenceDesc}
            </p>
          </div>

        </div>
      </section>

      {/* 8. Final Consultation CTA */}
      <section className="py-24 bg-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(20,91,255,0.015)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 space-y-6">
          <span className="text-eyebrow text-royal-blue block">
            {locale === 'es' ? 'HABLEMOS HOY' : 'LET\'S COLLABORATE'}
          </span>
          <h2 className="text-h2 text-slate-900 leading-none">
            {locale === 'es' ? '¿Listo para Construir el Futuro Digital?' : 'Ready to Engineer Your Transformation?'}
          </h2>
          <p className="text-body text-slate-500 max-w-xl mx-auto">
            {locale === 'es' 
              ? 'Agende una reunión con nuestros arquitectos directores para diagnosticar sus silos y estructurar su infraestructura.' 
              : 'Initiate a technical consultation brief with our solution directors to diagnose system silos.'}
          </p>
          
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link href="/consultation" className="PrimaryBrandButton">
              {tCommon.consultation || 'Schedule Intake'}
            </Link>
            <Link href="/contact" className="SecondaryBrandOutlineButton">
              {locale === 'es' ? 'Contáctenos' : 'Contact Sales'}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
