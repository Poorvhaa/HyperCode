'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Cloud, 
  BarChart3, 
  Layers, 
  Cpu, 
  Network, 
  UserCheck, 
  Users, 
  Briefcase, 
  FileCheck2,
  Code,
  Server,
  TrendingUp
} from 'lucide-react';

type TabKey = 'analytics' | 'webdev' | 'staffing';

export function TechnologyExpertise() {
  const locale = useLocale() as 'en' | 'es';
  const [activeTab, setActiveTab] = useState<TabKey>('analytics');

  const translations = {
    en: {
      badge: "Certified Competency & Systems",
      title: "Technology & Platform Expertise",
      subtitle: "Leveraging industry-leading technologies, cloud platforms, and workforce ecosystems to deliver scalable digital solutions and high-performing talent strategies.",
      tabs: {
        analytics: "Data & Analytics",
        webdev: "Web Development",
        staffing: "Staffing Ecosystems"
      }
    },
    es: {
      badge: "Competencia y Sistemas Certificados",
      title: "Experiencia en Tecnología y Plataformas",
      subtitle: "Aprovechando tecnologías líderes en la industria, plataformas en la nube y ecosistemas de fuerza laboral para ofrecer soluciones digitales escalables y estrategias de talento de alto rendimiento.",
      tabs: {
        analytics: "Datos y Analítica",
        webdev: "Desarrollo Web",
        staffing: "Ecosistemas de Personal"
      }
    }
  };

  const activeTranslation = translations[locale] || translations.en;

  const categories = {
    analytics: {
      badges: {
        en: ['Cloud Architecture', 'Data Engineering', 'Business Intelligence'],
        es: ['Arquitectura en la Nube', 'Ingeniería de Datos', 'Inteligencia de Negocios']
      },
      items: [
        { name: 'Microsoft', icon: Database, desc: { en: 'Enterprise Data & Systems', es: 'Sistemas y Datos Empresariales' } },
        { name: 'Azure', icon: Cloud, desc: { en: 'Cloud Infrastructure & Services', es: 'Infraestructura y Servicios en la Nube' } },
        { name: 'AWS', icon: Network, desc: { en: 'Cloud Computing & Architecture', es: 'Computación y Arquitectura en la Nube' } },
        { name: 'Snowflake', icon: Cpu, desc: { en: 'Cloud Data Warehousing & Analytics', es: 'Almacenamiento de Datos y Analítica en la Nube' } },
        { name: 'Databricks', icon: Layers, desc: { en: 'Unified Data Lakehouse & AI', es: 'Lago de Datos Unificado e IA' } },
        { name: 'Tableau', icon: BarChart3, desc: { en: 'Business Intelligence & Visualization', es: 'Inteligencia de Negocios y Visualización' } },
      ]
    },
    webdev: {
      badges: {
        en: ['Web Applications', 'API Integration', 'Scalable Systems'],
        es: ['Aplicaciones Web', 'Integración de API', 'Sistemas Escalables']
      },
      items: [
        { name: 'React / Next.js', icon: Code, desc: { en: 'Modern enterprise frontend applications', es: 'Aplicaciones frontend empresariales modernas' } },
        { name: 'TypeScript', icon: Layers, desc: { en: 'Type-safe systems development', es: 'Desarrollo de sistemas con seguridad de tipos' } },
        { name: 'Node.js', icon: Cpu, desc: { en: 'Scalable backend services', es: 'Servicios backend escalables' } },
        { name: '.NET', icon: Server, desc: { en: 'Enterprise server applications', es: 'Aplicaciones de servidor empresariales' } },
        { name: 'Python', icon: Briefcase, desc: { en: 'Automation, AI, and data solutions', es: 'Soluciones de automatización, IA y datos' } },
        { name: 'SQL / PostgreSQL', icon: Database, desc: { en: 'Relational database engineering', es: 'Ingeniería de bases de datos relacionales' } },
      ]
    },
    staffing: {
      badges: {
        en: ['IT Staffing', 'Talent Acquisition', 'Vendor Management'],
        es: ['Personal de TI', 'Adquisición de Talento', 'Gestión de Proveedores']
      },
      items: [
        { name: 'Bullhorn', icon: Users, desc: { en: 'ATS & Recruitment Operations', es: 'Operaciones de ATS y Reclutamiento' } },
        { name: 'JobDiva', icon: UserCheck, desc: { en: 'Talent Sourcing & Recruiting', es: 'Búsqueda y Reclutamiento de Talento' } },
        { name: 'SAP Fieldglass', icon: FileCheck2, desc: { en: 'Vendor Management System', es: 'Sistema de Gestión de Proveedores' } },
        { name: 'Beeline', icon: Network, desc: { en: 'VMS & Contingent Workforce', es: 'Fuerza de Trabajo Contingente y VMS' } },
        { name: 'Workday', icon: Briefcase, desc: { en: 'Enterprise HRIS & Workforce Planning', es: 'Planificación de Personal y HRIS Empresarial' } },
        { name: 'iCIMS', icon: TrendingUp, desc: { en: 'Enterprise Talent Acquisition', es: 'Adquisición de Talento Empresarial' } },
      ]
    }
  };

  const activeCategory = categories[activeTab];
  const activeBadges = activeCategory.badges[locale] || activeCategory.badges.en;
  const tabIcons = {
    analytics: Database,
    webdev: Code,
    staffing: Briefcase
  };

  return (
    <section className="relative bg-gradient-to-b from-white to-slate-50 border-t border-b border-slate-200/60 py-24 select-none text-left overflow-hidden">
      {/* Decorative Dot Matrix Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />
      
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#0F4C81]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C81]" />
            {activeTranslation.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2744] tracking-tight leading-tight">
            {activeTranslation.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed mt-3">
            {activeTranslation.subtitle}
          </p>
        </div>

        {/* Tab Selectors */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 p-1.5 bg-slate-100/70 border border-slate-200/60 rounded-2xl max-w-2xl mx-auto mb-8 shadow-inner">
          {(Object.keys(categories) as TabKey[]).map((tabKey) => {
            const TabIcon = tabIcons[tabKey];
            const isActive = activeTab === tabKey;
            return (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm rounded-xl font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white text-[#0F4C81] border border-slate-200/60 shadow-sm"
                    : "text-slate-600 hover:text-[#0F2744] hover:bg-white/40"
                }`}
              >
                <TabIcon size={16} className={isActive ? "text-[#0F4C81]" : "text-slate-400"} />
                {activeTranslation.tabs[tabKey]}
              </button>
            );
          })}
        </div>

        {/* Capability Badges */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {activeBadges.map((badgeText, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#0F4C81]/5 text-[#0F4C81] border border-[#0F4C81]/10"
            >
              <span className="w-1 h-1 rounded-full bg-[#0F4C81]" />
              {badgeText}
            </span>
          ))}
        </div>

        {/* Cards Grid with Framer Motion Transition */}
        <div className="min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {activeCategory.items.map((item, idx) => {
                const IconComponent = item.icon;
                const description = item.desc[locale] || item.desc.en;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-5 bg-white border border-slate-200/80 rounded-2xl transition-all duration-300 shadow-sm hover:-translate-y-1 hover:border-[#0F4C81]/80 hover:shadow-md group relative overflow-hidden min-h-[96px]"
                  >
                    {/* Hover border glow highlight */}
                    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#0F4C81] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Icon Container */}
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 group-hover:text-[#0F4C81] group-hover:bg-[#0F4C81]/5 group-hover:border-[#0F4C81]/15 transition-all duration-300 flex-shrink-0">
                      <IconComponent size={20} className="group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-bold text-[#0F2744] group-hover:text-[#0F4C81] transition-colors duration-300">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-semibold leading-normal">
                        {description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
