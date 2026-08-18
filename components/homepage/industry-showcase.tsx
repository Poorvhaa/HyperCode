'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { 
  HeartPulse, TrendingUp, ShoppingBag, Factory, GraduationCap, Truck, Coffee, Hammer, Scale, Pill, Landmark, Cpu,
  Brain, Server, Lock, Database, Layers, Sparkles, ArrowRight
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

// Dynamic metric cards data
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

// Orbiting Capabilities config
const orbitingCapabilities = [
  { label: 'AI', icon: Brain },
  { label: 'Cloud', icon: Server },
  { label: 'Analytics', icon: TrendingUp },
  { label: 'Security', icon: Lock },
  { label: 'Automation', icon: Sparkles },
  { label: 'Data', icon: Database },
  { label: 'Apps', icon: Layers }
];

// Mapper defining top 5 capabilities specifically per industry
const INDUSTRY_CAPABILITY_IDS: Record<string, string[]> = {
  healthcare: ['AI', 'Cloud', 'Security', 'Data', 'Apps'],
  finance: ['Security', 'Analytics', 'Data', 'Cloud', 'AI'],
  retail: ['Apps', 'Analytics', 'Cloud', 'AI', 'Data'],
  manufacturing: ['Automation', 'Data', 'Cloud', 'AI', 'Security'],
  education: ['Apps', 'Cloud', 'Data', 'AI', 'Security'],
  logistics: ['Automation', 'Cloud', 'Data', 'Analytics', 'Apps'],
  hospitality: ['Apps', 'Cloud', 'Data', 'Automation', 'Analytics'],
  construction: ['Apps', 'Data', 'Cloud', 'Automation', 'Analytics'],
  legal: ['Automation', 'Security', 'Analytics', 'Cloud', 'AI'],
  pharma: ['AI', 'Data', 'Security', 'Cloud', 'Analytics'],
  government: ['Security', 'Cloud', 'Data', 'Apps', 'Analytics'],
  technology: ['Cloud', 'Security', 'AI', 'Data', 'Apps']
};

export function IndustryShowcase() {
  const t = useTranslations('HomepageRedesign.IndustrySolutions');
  const tList = useTranslations('SolutionsPage.industriesList');
  const locale = useLocale();

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [hoveredPill, setHoveredPill] = useState<number | null>(null);

  const activeItem = industries[activeIdx];
  const displayTitle = tList(`${activeItem.id}.title`);
  const displayDesc = tList(`${activeItem.id}.desc`);
  const ActiveIcon = activeItem.icon;
  const widget = getFloatingWidget(activeItem.id, locale);

  const activeCaps = INDUSTRY_CAPABILITY_IDS[activeItem.id] || INDUSTRY_CAPABILITY_IDS.technology;

  // Visual ellipse coordinates centered on Core (280, 240) in 560x480 container
  const positions = [
    { x: 0, y: -130 },   // Top (Automation)
    { x: -185, y: -25 }, // Left (Security)
    { x: 185, y: -25 },  // Right (Analytics)
    { x: -125, y: 105 }, // Bottom-Left (AI)
    { x: 125, y: 105 }   // Bottom-Right (Cloud)
  ];

  return (
    <section className="relative w-full bg-white border-b border-slate-200 py-16 md:py-24 lg:py-28 overflow-hidden scroll-mt-24">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(20, 91, 255, 0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(20, 91, 255, 0.015) 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
            maskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl text-left">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-royal-blue tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-royal-blue animate-pulse" />
            {t('badge') || 'SECTORS WE SERVE'}
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-5">
            {t('title') || 'Enter the Digital World of Every Industry'}
          </h2>
          <p className="text-base md:text-lg text-slate-500 font-semibold leading-relaxed max-w-2xl">
            {t('subtitle') || 'Custom engineering and architecture tailored to your specific sector.'}
          </p>
        </div>

        {/* Industry Navigation Chips Selector */}
        <div className="w-full relative py-2 border-b border-slate-100">
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none justify-start px-1">
            {industries.map((ind, i) => {
              const active = activeIdx === i;
              const IndIcon = ind.icon;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveIdx(i)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-royal-blue ${
                    active
                      ? 'bg-royal-blue/10 border-royal-blue/30 text-royal-blue shadow-xs'
                      : 'border-slate-200/60 bg-white text-slate-655 hover:bg-slate-50 hover:border-slate-350'
                  }`}
                >
                  <IndIcon size={13} className={active ? "text-royal-blue" : "text-slate-500"} />
                  <span>{tList(`${ind.id}.title`)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Grid: Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-20 items-start">
          {/* LEFT COLUMN: Active Industry Panel (45% split) */}
          <div className="lg:col-span-5 w-full max-w-[600px] mx-auto lg:mx-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white border border-slate-200/80 p-8 rounded-[32px] shadow-xs flex flex-col justify-between min-h-[360px]"
              >
                <div className="space-y-4">
                  <span className="text-[11px] font-black text-slate-600 tracking-widest uppercase block">
                    {locale === 'es' ? 'Sector Seleccionado' : 'Current Sector'}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-snug flex items-center gap-3">
                    {displayTitle}
                    <ActiveIcon size={24} className="text-royal-blue animate-pulse" />
                  </h3>
                  <p className="text-sm md:text-base text-slate-500 leading-relaxed">
                    {displayDesc}
                  </p>

                  {/* Business outcomes indicators */}
                  <div className="space-y-3 pt-4 border-t border-slate-100/60">
                    {getIndustryOutcomes(activeItem.id, locale).map((outcome, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-royal-blue/5 border border-royal-blue/10 flex items-center justify-center text-royal-blue font-black text-[9px] select-none">
                          ✓
                        </span>
                        <span className="text-sm font-semibold text-slate-655">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Integrated Statistics / Metric Widget */}
                <div className="mt-6 pt-4 border-t border-slate-150 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-black text-slate-600 tracking-widest uppercase block">{widget.subtitle}</span>
                    <span className="text-xs font-bold text-slate-700 block">{widget.title}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-royal-blue block leading-none">{widget.val}</span>
                    <span className="text-[11px] font-bold text-emerald-700 tracking-wider uppercase block mt-1">{widget.metricName}</span>
                  </div>
                </div>

                {/* Explore solutions button */}
                <div className="pt-6 mt-4">
                  <Link
                    href="/solutions"
                    className="inline-flex items-center justify-center gap-2 w-full px-6 h-12 rounded-2xl bg-royal-blue text-white text-xs font-bold uppercase tracking-wider hover:bg-royal-blue/90 hover:shadow-md transition-all duration-300"
                  >
                    <span>{locale === 'es' ? 'Ver Soluciones de Sector' : 'Explore Industry Solutions'}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: Capability Map Model (55% split) */}
          <div className="lg:col-span-7 w-full flex items-center justify-center relative select-none">
            {/* Desktop View Orbital Model */}
            <div className="hidden md:flex w-full max-w-[620px] aspect-square relative items-center justify-center rounded-[32px] bg-gradient-to-tr from-royal-blue/[0.02] to-green/[0.015] border border-slate-200/50 shadow-2xs overflow-hidden bg-[radial-gradient(circle,rgba(20,91,255,0.025)_1px,transparent_1px)] bg-[size:20px_20px]">
              
              {/* Scaled-down vector frame to fit intermediate viewports */}
              <div className="relative w-[560px] h-[480px] scale-85 xl:scale-100 origin-center transition-transform duration-300 flex items-center justify-center">
                {/* SVG connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 560 480">
                  <defs>
                    <linearGradient id="blueGreenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#145BFF" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#48B900" stopOpacity="0.75" />
                    </linearGradient>
                  </defs>
                  
                  {positions.map((pos, idx) => (
                    <line
                      key={idx}
                      x1={280}
                      y1={240}
                      x2={280 + pos.x}
                      y2={240 + pos.y}
                      stroke={hoveredPill === idx ? "url(#blueGreenGlow)" : "#E2E8F0"}
                      strokeWidth={hoveredPill === idx ? "2.5" : "1.5"}
                      strokeDasharray={hoveredPill === idx ? "none" : "4 4"}
                      className="transition-all duration-300"
                    />
                  ))}
                </svg>

                {/* Central active core bubble */}
                <div className="absolute left-[280px] top-[240px] -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-white border border-slate-200/85 shadow-md flex flex-col items-center justify-center gap-1.5 z-20 hover:border-royal-blue/30 transition-colors duration-300">
                  <ActiveIcon size={22} className="text-royal-blue" />
                  <span className="text-[8px] font-black text-slate-500 tracking-wider text-center px-2 line-clamp-2 uppercase">
                    {displayTitle}
                  </span>
                </div>

                {/* Render the 5 capability pills */}
                {activeCaps.map((capId, idx) => {
                  const capConfig = orbitingCapabilities.find(c => c.label === capId) || orbitingCapabilities[0];
                  const pos = positions[idx];
                  return (
                    <motion.div
                      key={capId}
                      style={{
                        position: 'absolute',
                        left: '280px',
                        top: '240px',
                        x: pos.x,
                        y: pos.y,
                      }}
                      className="-translate-x-1/2 -translate-y-1/2"
                      whileHover={{ scale: 1.05 }}
                      onMouseEnter={() => setHoveredPill(idx)}
                      onMouseLeave={() => setHoveredPill(null)}
                    >
                      <div className="px-5 py-2.5 rounded-full border border-slate-200/80 bg-white shadow-sm flex items-center gap-2.5 text-[15px] font-bold text-slate-800 hover:border-royal-blue/30 hover:shadow-md transition-all duration-300 select-none cursor-pointer">
                        <capConfig.icon size={15} className="text-royal-blue" />
                        <span>{capId}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>

            {/* Mobile View Capability Grid Fallback */}
            <div className="flex md:hidden w-full space-y-6 flex-col">
              {/* Compact centered core industry icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-2xl bg-royal-blue/5 border border-royal-blue/15 flex items-center justify-center text-royal-blue">
                  <ActiveIcon size={26} />
                </div>
              </div>
              
              {/* Capability Grid */}
              <div className="grid grid-cols-2 gap-3 max-w-sm w-full mx-auto">
                {activeCaps.map((capId) => {
                  const capConfig = orbitingCapabilities.find(c => c.label === capId) || orbitingCapabilities[0];
                  return (
                    <div
                      key={capId}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs flex items-center gap-2.5 text-sm font-bold text-slate-850"
                    >
                      <capConfig.icon size={14} className="text-royal-blue flex-shrink-0" />
                      <span className="truncate">{capId}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
