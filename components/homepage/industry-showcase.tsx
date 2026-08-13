'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent, useTransform } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { 
  HeartPulse, TrendingUp, ShoppingBag, Factory, GraduationCap, Truck, Coffee, Hammer, Scale, Pill, Landmark, Cpu,
  Brain, Server, Lock, Database, Layers, Sparkles, ArrowRight, ChevronLeft, ChevronRight
} from 'lucide-react';

// Industry definitions mapping to icon components
const industries = [
  { id: 'healthcare', icon: HeartPulse },
  { id: 'finance', icon: TrendingUp },
  { id: 'retail', icon: ShoppingBag },
  { id: 'manufacturing', icon: Factory },
  { id: 'education', icon: GraduationCap },
  { id: 'logistics', icon: Truck },
  { id: 'hospitality', icon: Coffee },
  { id: 'construction', icon: Hammer },
  { id: 'legal', icon: Scale },
  { id: 'pharma', icon: Pill },
  { id: 'government', icon: Landmark },
  { id: 'technology', icon: Cpu }
];

// Helper to fetch translated outcome bullets dynamically based on locale
const getIndustryOutcomes = (industryId: string, locale: string): string[] => {
  const outcomes: Record<string, Record<string, string[]>> = {
    healthcare: {
      en: ['HIPAA-Compliant Vault', 'AI Diagnostics Active', 'Cloud Modernization'],
      es: ['Bóveda conforme a HIPAA', 'Diagnóstico por IA activo', 'Modernización en la nube']
    },
    finance: {
      en: ['PCI-DSS Secure Gateway', 'Real-Time Fraud Shield', 'Ledger Cloud Sync'],
      es: ['Pasarela segura PCI-DSS', 'Protección contra fraudes', 'Nube de contabilidad']
    },
    retail: {
      en: ['Omnichannel E-commerce', 'Real-time Inventory Systems', 'CRM Analytics'],
      es: ['Comercio omnicanal', 'Inventario en tiempo real', 'Análisis de CRM']
    },
    manufacturing: {
      en: ['IIoT Edge Ingestion', 'Supply Chain Visibility', 'Quality AI Trackers'],
      es: ['Ingesta de IoT en el borde', 'Visibilidad de cadena', 'Seguimiento por IA']
    },
    education: {
      en: ['LMS Cloud Hosting', 'Virtual Class Hubs', 'Student Progress Console'],
      es: ['LMS en la nube', 'Aulas virtuales', 'Consola de progreso']
    },
    logistics: {
      en: ['Fleet Routing Engine', 'GPS Telemetry Systems', 'Warehouse Cloud DB'],
      es: ['Enrutamiento de flotas', 'Telemetría por GPS', 'Base de datos en la nube']
    },
    hospitality: {
      en: ['Custom Booking Engines', 'Mobile Check-in Apps', 'Loyalty CRM Systems'],
      es: ['Motores de reserva', 'Check-in móvil', 'Sistemas de CRM']
    },
    construction: {
      en: ['Field Operations Portal', 'CAD Blueprint Storage', 'BIM Collaboration'],
      es: ['Portal de operaciones', 'Almacenamiento de planos', 'Colaboración BIM']
    },
    legal: {
      en: ['SOC 2 Document Vault', 'AI Contract Search', 'Secure Billing Ledgers'],
      es: ['Bóveda SOC 2', 'Búsqueda de contratos por IA', 'Facturación segura']
    },
    pharma: {
      en: ['Genomics Data Cloud', 'FDA Batch Monitor', 'Compliance Infrastructure'],
      es: ['Nube de genómica', 'Monitor de lotes FDA', 'Cumplimiento normativo']
    },
    government: {
      en: ['FedRAMP Citizen Portal', 'Gov Registry DB', 'Compliance Auditing'],
      es: ['Portal ciudadano FedRAMP', 'Base de datos estatal', 'Auditoría de cumplimiento']
    },
    technology: {
      en: ['Kubernetes SaaS Stacks', 'CI/CD Auto-Deploy', 'IAM Secure Gateways'],
      es: ['Pilas Kubernetes', 'Despliegue CI/CD', 'Pasarelas IAM']
    }
  };
  return outcomes[industryId]?.[locale] || outcomes[industryId]?.en || [];
};

// Dynamic metric cards floating alongside the sphere
const getFloatingWidget = (industryId: string, locale: string) => {
  const widgets: Record<string, { title: string; subtitle: string; val: string; metricName?: string }> = {
    healthcare: {
      title: locale === 'es' ? 'Precisión de IA' : 'AI Accuracy',
      subtitle: 'HIPAA SECURE',
      val: '99.8%',
      metricName: 'AGENTS ACTIVE'
    },
    finance: {
      title: locale === 'es' ? 'Transacciones' : 'Transactions',
      subtitle: 'PCI-DSS LEVEL 1',
      val: '4.8k/s',
      metricName: 'FRAUD SHIELD ACTIVE'
    },
    retail: {
      title: locale === 'es' ? 'Crecimiento de Ventas' : 'Sales growth',
      subtitle: 'OMS INTEGRATED',
      val: '+34.2%',
      metricName: 'NEXT.JS CORE'
    },
    manufacturing: {
      title: locale === 'es' ? 'Eficiencia' : 'OEE Efficiency',
      subtitle: 'IIOT NODE 04',
      val: '96.4%',
      metricName: 'EDGE STACK ACTIVE'
    },
    education: {
      title: locale === 'es' ? 'Participación' : 'Student Engagement',
      subtitle: 'LMS CLOUD',
      val: '94.2%',
      metricName: 'ACTIVE CLUSTERS'
    },
    logistics: {
      title: locale === 'es' ? 'Rutas Optimizadas' : 'Optimal Routing',
      subtitle: 'GPS TELEMETRY',
      val: '99.9%',
      metricName: 'DISPATCH ENG'
    },
    hospitality: {
      title: locale === 'es' ? 'Ocupación' : 'Occupancy Rate',
      subtitle: 'SABRE SYNC',
      val: '89.5%',
      metricName: 'CHECK-IN API'
    },
    construction: {
      title: locale === 'es' ? 'Progreso' : 'Project Progress',
      subtitle: 'BIM COLLAB',
      val: '87%',
      metricName: 'CAD BLUEPRINT'
    },
    legal: {
      title: locale === 'es' ? 'Documentos' : 'Secure Archives',
      subtitle: 'SOC-2 VAULT',
      val: '4.2k',
      metricName: 'AI SEARCH INDEXED'
    },
    pharma: {
      title: locale === 'es' ? 'Rendimiento' : 'Batch Yield',
      subtitle: 'FDA COMPLIANT',
      val: '99.92%',
      metricName: 'GENOMICS CLOUD'
    },
    government: {
      title: locale === 'es' ? 'Disponibilidad' : 'Gov Uptime',
      subtitle: 'FEDRAMP SECURE',
      val: '99.99%',
      metricName: 'CITIZEN PORTAL'
    },
    technology: {
      title: locale === 'es' ? 'Despliegues' : 'Auto Deployments',
      subtitle: 'K8S ENGINE',
      val: '100%',
      metricName: 'CI/CD PIPELINES'
    }
  };
  return widgets[industryId] || widgets.technology;
};

// Dynamic visual config for active state glows
const industryGlows: Record<string, { gradient: string; glow: string; borderGlow: string }> = {
  healthcare: {
    gradient: 'from-blue-500/10 via-cyan-400/5 to-transparent',
    glow: 'rgba(56, 189, 248, 0.15)',
    borderGlow: 'rgba(20, 91, 255, 0.25)'
  },
  finance: {
    gradient: 'from-emerald-500/10 via-teal-400/5 to-transparent',
    glow: 'rgba(16, 185, 129, 0.15)',
    borderGlow: 'rgba(16, 185, 129, 0.25)'
  },
  retail: {
    gradient: 'from-violet-500/10 via-pink-400/5 to-transparent',
    glow: 'rgba(168, 85, 247, 0.15)',
    borderGlow: 'rgba(236, 72, 153, 0.25)'
  },
  manufacturing: {
    gradient: 'from-amber-500/10 via-orange-400/5 to-transparent',
    glow: 'rgba(245, 158, 11, 0.15)',
    borderGlow: 'rgba(249, 115, 22, 0.25)'
  },
  education: {
    gradient: 'from-indigo-500/10 via-blue-400/5 to-transparent',
    glow: 'rgba(99, 102, 241, 0.15)',
    borderGlow: 'rgba(59, 130, 246, 0.25)'
  },
  logistics: {
    gradient: 'from-sky-500/10 via-blue-400/5 to-transparent',
    glow: 'rgba(14, 165, 233, 0.15)',
    borderGlow: 'rgba(37, 99, 235, 0.25)'
  },
  hospitality: {
    gradient: 'from-rose-500/10 via-orange-300/5 to-transparent',
    glow: 'rgba(244, 63, 94, 0.15)',
    borderGlow: 'rgba(251, 146, 60, 0.25)'
  },
  construction: {
    gradient: 'from-yellow-600/10 via-stone-400/5 to-transparent',
    glow: 'rgba(202, 138, 4, 0.15)',
    borderGlow: 'rgba(120, 113, 108, 0.25)'
  },
  legal: {
    gradient: 'from-slate-700/15 via-slate-400/5 to-transparent',
    glow: 'rgba(71, 85, 105, 0.15)',
    borderGlow: 'rgba(15, 23, 42, 0.25)'
  },
  pharma: {
    gradient: 'from-teal-500/10 via-emerald-300/5 to-transparent',
    glow: 'rgba(20, 184, 166, 0.15)',
    borderGlow: 'rgba(52, 211, 153, 0.25)'
  },
  government: {
    gradient: 'from-blue-700/10 via-indigo-400/5 to-transparent',
    glow: 'rgba(29, 78, 216, 0.15)',
    borderGlow: 'rgba(79, 70, 229, 0.25)'
  },
  technology: {
    gradient: 'from-royal-blue/15 via-green/5 to-transparent',
    glow: 'rgba(20, 91, 255, 0.15)',
    borderGlow: 'rgba(72, 185, 0, 0.25)'
  }
};

// 7 Orbiting Capabilities
const orbitingCapabilities = [
  { label: 'AI', icon: Brain },
  { label: 'Cloud', icon: Server },
  { label: 'Analytics', icon: TrendingUp },
  { label: 'Security', icon: Lock },
  { label: 'Automation', icon: Sparkles },
  { label: 'Data', icon: Database },
  { label: 'Apps', icon: Layers }
];

export function IndustryShowcase() {
  const t = useTranslations('HomepageRedesign.IndustrySolutions');
  const tList = useTranslations('SolutionsPage.industriesList');
  const locale = useLocale();

  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Active industry index
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Pinned scroll behavior for desktop
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.8
  });

  useMotionValueEvent(smoothScroll, 'change', (latest) => {
    // Map scroll progress from 0.08 to 0.92 cleanly to 12 industries
    if (latest > 0.08 && latest <= 0.92) {
      const scaled = (latest - 0.08) / 0.84;
      const targetIdx = Math.min(11, Math.floor(scaled * 12));
      setActiveIdx(targetIdx);
    } else if (latest > 0.92) {
      setActiveIdx(11);
    } else {
      setActiveIdx(0);
    }
  });

  // Mouse Parallax movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: x * 35, y: y * 35 });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  const activeItem = industries[activeIdx];
  const displayTitle = tList(`${activeItem.id}.title`);
  const displayDesc = tList(`${activeItem.id}.desc`);
  const ActiveIcon = activeItem.icon;
  const glowConfig = industryGlows[activeItem.id] || industryGlows.technology;
  const widget = getFloatingWidget(activeItem.id, locale);

  return (
    <>
      {/* DESKTOP VIEW STICKY SCROLL CONTAINER */}
      <div 
        ref={sectionRef} 
        className="hidden lg:block relative w-full h-[320vh] bg-white overflow-visible border-b border-slate-200 scroll-mt-24"
        style={{ scrollMarginTop: '96px' }}
      >
        <div className="sticky top-[96px] w-full h-[calc(100vh-96px)] min-h-[650px] xl:min-h-[700px] overflow-visible flex flex-col justify-center bg-white bg-[radial-gradient(circle,rgba(20,91,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px] py-10 lg:py-16">
          
          {/* Background Enclosure to contain glow/particle overflow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {/* Decorative background glowing particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -25, 0],
                  x: [0, i % 2 === 0 ? 15 : -15, 0],
                  opacity: [0.15, 0.45, 0.15]
                }}
                transition={{
                  duration: 8 + i * 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.4
                }}
                className="absolute w-2 h-2 rounded-full bg-royal-blue/10 pointer-events-none"
                style={{
                  left: `${12 + i * 11}%`,
                  top: `${18 + (i * 9) % 62}%`,
                  filter: 'blur(1px)'
                }}
              />
            ))}

            {/* Blueprint grid ambient spotlight */}
            <div className="absolute top-1/4 left-1/3 w-[650px] h-[650px] bg-royal-blue/6 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '10s' }} />
            <div className="absolute bottom-1/4 right-1/3 w-[650px] h-[650px] bg-green/4 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '13s' }} />
          </div>

          <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-12 gap-12 items-center relative z-10">
            
            {/* LEFT COLUMN: Sectors title, description, dynamic outcome indicators */}
            <div className="col-span-5 flex flex-col justify-start space-y-6 select-none pr-6">
              
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 text-eyebrow text-royal-blue">
                  <span className="w-1.5 h-1.5 rounded-full bg-royal-blue animate-pulse" />
                  {t('badge') || 'SECTORS WE SERVE'}
                </span>
                <h2 className="text-h2 text-slate-900 pt-2">
                  {t('title') || 'Enter the Digital World of Every Industry'}
                </h2>
                <p className="text-body text-slate-500">
                  {t('subtitle') || 'Custom engineering and architecture tailored to your specific sector.'}
                </p>
              </div>

              {/* Dynamic Information Morph Card */}
              <div className="pt-6 border-t border-slate-100 space-y-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4 bg-gradient-to-tr from-royal-blue/5 via-transparent to-green/5 p-6 rounded-3xl border border-slate-200/50 shadow-sm"
                  >
                    <span className="text-eyebrow text-slate-400">
                      {locale === 'es' ? 'Sector Seleccionado' : 'Current Sector'}
                    </span>
                    <h3 className="text-h3 text-slate-900 flex items-center gap-2.5">
                      {displayTitle}
                      <Sparkles size={16} className="text-royal-blue animate-pulse" />
                    </h3>
                    <p className="text-body-sm text-slate-500 max-w-md">
                      {displayDesc}
                    </p>

                    {/* Business outcome indicators */}
                    <div className="space-y-2.5 pt-2">
                      {getIndustryOutcomes(activeItem.id, locale).map((outcome, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <span className="w-5 h-5 rounded-full bg-royal-blue/5 border border-royal-blue/10 flex items-center justify-center text-royal-blue font-bold text-[10px] select-none">
                            ✓
                          </span>
                          <span className="text-body-sm text-slate-650">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Premium Magnetic CTA */}
                <div className="pt-4">
                  <Link
                    href="/solutions"
                    className="PrimaryBrandButton flex items-center justify-center gap-2 group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg h-[48px] min-h-[48px]"
                  >
                    <span>{locale === 'es' ? 'Ver Soluciones de Sector' : 'Explore Industry Solutions'}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </Link>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Massive 3D Rotating Sphere with Billboarding Orbit Nodes */}
            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="col-span-7 flex items-center justify-center relative select-none"
              style={{ perspective: '1400px' }}
            >
              {/* Bounded Container for 3D Camera */}
              <motion.div
                animate={{
                  x: parallax.x,
                  y: parallax.y
                }}
                transition={{ type: 'spring', stiffness: 80, damping: 24 }}
                className="relative w-[500px] h-[500px] flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                
                {/* 3D Orbit Ring Planes tilted */}
                <div className="absolute w-[460px] h-[460px] border border-slate-200/40 rounded-full pointer-events-none transform rotate-x-[76deg] rotate-y-[12deg] z-0" />
                <div className="absolute w-[420px] h-[420px] border border-dashed border-slate-200/30 rounded-full pointer-events-none transform rotate-x-[72deg] rotate-y-[-15deg] z-0 animate-[spin_50s_linear_infinite]" />

                {/* Orbit System Wrapper */}
                <motion.div
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-full h-full"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Render 7 orbit nodes */}
                  {orbitingCapabilities.map((node, idx) => {
                    const angle = (idx * 360) / 7;
                    const rad = (angle * Math.PI) / 180;
                    const radius = 210; // Orbit span radius
                    const x = radius * Math.cos(rad);
                    const z = radius * Math.sin(rad);

                    return (
                      <motion.div
                        key={idx}
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          x,
                          z,
                          translateX: '-50%',
                          translateY: '-50%',
                          transformStyle: 'preserve-3d'
                        } as any}
                        className="z-35 pointer-events-auto"
                      >
                        {/* Billboard wrapper that cancels orbit rotation */}
                        <motion.div
                          animate={{ rotateY: -360 }}
                          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
                          whileHover={{ scale: 1.12, y: -4 }}
                          className="px-3.5 py-2 rounded-2xl border border-slate-200/70 bg-white/95 backdrop-blur-md text-[10px] font-bold text-slate-800 shadow-md flex items-center gap-2 hover:border-royal-blue/30 transition-all cursor-pointer relative group/tooltip"
                        >
                          <node.icon size={13} className="text-royal-blue" />
                          <span>{node.label}</span>

                          {/* Hover Tooltip */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-slate-900 text-white text-[8px] font-black tracking-wider uppercase opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none select-none whitespace-nowrap z-50 shadow-md">
                            {node.label} {locale === 'es' ? 'Nodo' : 'Node'}
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Massive central 3D Intelligence Sphere */}
                <div 
                  className="w-[260px] h-[260px] md:w-[280px] md:h-[280px] rounded-full relative bg-white/75 border border-slate-250/90 shadow-2xl flex items-center justify-center overflow-hidden z-10"
                  style={{ transform: 'translateZ(0)' }}
                >
                  {/* Spherical Dynamic Shader Shader Accent Glow */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-tr ${glowConfig.gradient} transition-all duration-700`}
                    style={{
                      boxShadow: `inset -12px -12px 35px rgba(0,0,0,0.04), inset 12px 12px 35px rgba(255,255,255,0.75), 0 0 70px ${glowConfig.glow}`
                    }}
                  />

                  {/* 3D Wireframe sphere coordinates */}
                  <div className="absolute w-[82%] h-[82%] border border-slate-200/30 rounded-full pointer-events-none z-10 flex items-center justify-center">
                    <motion.div
                      animate={{ rotateY: 360 }}
                      transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                      className="absolute w-full h-[32%] border border-slate-300/30 rounded-full"
                      style={{ transformStyle: 'preserve-3d', rotateX: 74 }}
                    />
                    <motion.div
                      animate={{ rotateX: 360 }}
                      transition={{ duration: 19, repeat: Infinity, ease: 'linear' }}
                      className="absolute w-[32%] h-full border border-slate-300/30 rounded-full"
                      style={{ transformStyle: 'preserve-3d', rotateY: 74 }}
                    />
                    <motion.div
                      animate={{ rotateZ: 360 }}
                      transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
                      className="absolute w-[60%] h-[60%] border border-dashed border-royal-blue/10 rounded-full"
                    />
                  </div>

                  {/* Morphing Center Icon */}
                  <div className="relative w-16 h-16 rounded-2xl bg-white/95 border border-slate-200/50 flex items-center justify-center shadow-lg z-20">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeItem.id}
                        initial={{ opacity: 0, scale: 0.8, rotate: -25 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotate: 25 }}
                        transition={{ duration: 0.3 }}
                        className="text-royal-blue"
                      >
                        <ActiveIcon size={26} />
                      </motion.div>
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-royal-blue/5 rounded-2xl blur-md -z-10" />
                  </div>
                </div>

                {/* Translucent Live Floating Metrics Dashboard */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`widget-${activeItem.id}`}
                    initial={{ opacity: 0, scale: 0.85, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: -15 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    className="absolute top-10 right-4 bg-white/80 backdrop-blur-md border border-slate-200/40 p-4 rounded-2xl shadow-lg w-[150px] select-none text-left z-35"
                  >
                    <div className="flex flex-col space-y-1">
                      <span className="text-[7.5px] font-black text-slate-450 tracking-widest uppercase">{widget.subtitle}</span>
                      <span className="text-xs font-bold text-slate-800 tracking-tight truncate">{widget.title}</span>
                      <span className="text-xl font-extrabold text-royal-blue leading-none py-1">{widget.val}</span>
                      <span className="text-[7px] font-black text-green tracking-wider uppercase mt-1 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                        {widget.metricName}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

              </motion.div>
            </div>

          </div>
        </div>
      </div>

      {/* TABLET VIEW CONTAINER (768px - 1023px) */}
      <div className="hidden md:block lg:hidden py-28 bg-white border-b border-slate-200 relative overflow-visible scroll-mt-24 bg-[radial-gradient(circle,rgba(20,91,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px]">
        
        {/* Spotlights Enclosure */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-royal-blue/6 rounded-full blur-[90px] pointer-events-none -z-10" />
        </div>

        <div className="max-w-4xl mx-auto px-6 space-y-12 text-center">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 text-eyebrow text-royal-blue justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-royal-blue animate-pulse" />
              {t('badge') || 'SECTORS WE SERVE'}
            </span>
            <h2 className="text-h2 text-slate-900">
              {t('title') || 'Enter the Digital World of Every Industry'}
            </h2>
            <p className="text-body-sm text-slate-500">
              {t('subtitle') || 'Custom engineering and architecture tailored to your specific sector.'}
            </p>
          </div>

          {/* Interactive Tablet Sphere with selector dots */}
          <div className="grid grid-cols-12 gap-8 items-center">
            
            {/* Left Console */}
            <div className="col-span-5 text-left bg-gradient-to-tr from-royal-blue/5 via-transparent to-green/5 border border-slate-200/50 p-6 rounded-3xl shadow-sm space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3"
                >
                  <span className="text-eyebrow text-slate-400">Active Sector</span>
                  <h3 className="text-h3 text-slate-900 flex items-center gap-2">
                    {displayTitle}
                    <ActiveIcon size={18} className="text-royal-blue" />
                  </h3>
                  <p className="text-body-sm text-slate-500">{displayDesc}</p>
                  
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {getIndustryOutcomes(activeItem.id, locale).map((outcome, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-royal-blue text-[10px]">✓</span>
                        <span className="text-body-sm text-slate-650">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="pt-2">
                <Link
                  href="/solutions"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-royal-blue hover:underline"
                >
                  <span>{locale === 'es' ? 'Ver Soluciones de Sector' : 'Explore Industry Solutions'}</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* Right Sphere Visual */}
            <div className="col-span-7 flex flex-col items-center justify-center">
              <div 
                className="w-[200px] h-[200px] rounded-full relative border border-slate-200 flex items-center justify-center overflow-hidden shadow-lg"
              >
                <div 
                  className={`absolute inset-0 bg-gradient-to-tr ${glowConfig.gradient} transition-all duration-500`}
                  style={{ boxShadow: `inset -8px -8px 24px rgba(0,0,0,0.03), inset 8px 8px 24px rgba(255,255,255,0.7), 0 0 50px ${glowConfig.glow}` }}
                />
                
                <div className="relative w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow">
                  <ActiveIcon size={20} className="text-royal-blue" />
                </div>
              </div>

              {/* Grid Selector Dots */}
              <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-sm">
                {industries.map((ind, i) => (
                  <button
                    key={ind.id}
                    onClick={() => setActiveIdx(i)}
                    className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase transition-all ${
                      activeIdx === i 
                        ? 'bg-royal-blue text-white shadow-sm' 
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {tList(`${ind.id}.title`).split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* MOBILE VIEW CONTAINER (< 768px TIMELINE GESTURES) */}
      <div className="block md:hidden py-20 bg-white border-b border-slate-200 overflow-visible scroll-mt-24 relative bg-[radial-gradient(circle,rgba(20,91,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="max-w-7xl mx-auto px-6 space-y-8 flex flex-col items-center text-center">
          
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 text-eyebrow text-royal-blue">
              <span className="w-1.5 h-1.5 rounded-full bg-royal-blue animate-pulse" />
              {t('badge') || 'SECTORS WE SERVE'}
            </span>
            <h2 className="text-h2 text-slate-900">
              {t('title') || 'Enter the Digital World of Every Industry'}
            </h2>
            <p className="text-body-sm text-slate-500">
              {t('subtitle') || 'Custom engineering and architecture tailored to your specific sector.'}
            </p>
          </div>

          {/* Swipeable Centered 3D-like Sphere */}
          <div className="relative w-full flex items-center justify-center py-6">
            
            {/* Left Nav Button */}
            <button
              onClick={() => setActiveIdx((prev) => (prev === 0 ? industries.length - 1 : prev - 1))}
              className="absolute left-0 w-10 h-10 rounded-full border border-slate-200 bg-white/95 flex items-center justify-center text-slate-500 hover:text-slate-800 shadow-sm z-20 cursor-pointer focus:outline-none"
              aria-label="Previous Industry"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Swipeable sphere container */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 50) {
                  setActiveIdx((prev) => (prev === 0 ? industries.length - 1 : prev - 1));
                } else if (info.offset.x < -50) {
                  setActiveIdx((prev) => (prev === industries.length - 1 ? 0 : prev + 1));
                }
              }}
              whileTap={{ scale: 0.95 }}
              className="w-[180px] h-[180px] rounded-full relative border border-slate-200 flex items-center justify-center overflow-hidden shadow-lg cursor-grab active:cursor-grabbing z-10"
            >
              <div 
                className={`absolute inset-0 bg-gradient-to-tr ${glowConfig.gradient} transition-all duration-500`}
                style={{ boxShadow: `inset -8px -8px 24px rgba(0,0,0,0.03), inset 8px 8px 24px rgba(255,255,255,0.7), 0 0 50px ${glowConfig.glow}` }}
              />
              
              <div className="relative w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow">
                <ActiveIcon size={20} className="text-royal-blue" />
              </div>
            </motion.div>

            {/* Right Nav Button */}
            <button
              onClick={() => setActiveIdx((prev) => (prev === industries.length - 1 ? 0 : prev + 1))}
              className="absolute right-0 w-10 h-10 rounded-full border border-slate-200 bg-white/95 flex items-center justify-center text-slate-500 hover:text-slate-800 shadow-sm z-20 cursor-pointer focus:outline-none"
              aria-label="Next Industry"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Swipe / Drag helper label */}
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
            {locale === 'es' ? 'Deslice la esfera para cambiar' : 'Swipe sphere to switch'}
          </span>

          {/* Dynamic Console Card for Mobile */}
          <div className="w-full max-w-sm rounded-2xl border border-slate-200/60 bg-gradient-to-tr from-royal-blue/5 via-transparent to-green/5 p-5 shadow-sm text-left space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-3.5"
              >
                <div>
                  <span className="text-eyebrow text-slate-400">Active Sector</span>
                  <h3 className="text-h4 text-slate-900">{displayTitle}</h3>
                  <p className="text-body-sm text-slate-500 mt-1">{displayDesc}</p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100">
                  {getIndustryOutcomes(activeItem.id, locale).map((outcome, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-royal-blue text-[10px]">✓</span>
                      <span className="text-body-sm text-slate-650">{outcome}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/solutions"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-royal-blue uppercase tracking-wider"
              >
                <span>{locale === 'es' ? 'Ver Soluciones de Sector' : 'Explore Solutions'}</span>
                <ArrowRight size={11} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
