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
  ShieldCheck, 
  Code, 
  Server, 
  Terminal,
  Activity,
  Workflow
} from 'lucide-react';

type TabKey = 'ai_analytics' | 'engineering' | 'cloud_devops' | 'database_security';

export function TechnologyExpertise() {
  const locale = useLocale() as 'en' | 'es';
  const [activeTab, setActiveTab] = useState<TabKey>('ai_analytics');

  const translations = {
    en: {
      badge: "Enterprise Tech Stack",
      title: "Technology & Platform Ecosystem",
      subtitle: "We architect custom software, scale automated workflows, and orchestrate cloud databases using gold-standard certified tools.",
      tabs: {
        ai_analytics: "AI & Analytics",
        engineering: "Frontend & Backend",
        cloud_devops: "Cloud & DevOps",
        database_security: "Database & Security"
      }
    },
    es: {
      badge: "Pila Tecnológica Empresarial",
      title: "Ecosistema de Tecnología y Plataformas",
      subtitle: "Diseñamos software a medida, escalamos flujos automatizados y orquestamos bases de datos en la nube con herramientas certificadas.",
      tabs: {
        ai_analytics: "IA y Analítica",
        engineering: "Frontend y Backend",
        cloud_devops: "Nube y DevOps",
        database_security: "Bases de Datos y Seguridad"
      }
    }
  };

  const activeTranslation = translations[locale] || translations.en;

  const categories = {
    ai_analytics: {
      badges: {
        en: ['Generative AI', 'Large Language Models', 'Data Visualization', 'Predictive Modeling'],
        es: ['IA Generativa', 'Modelos de Lenguaje Grandes', 'Visualización de Datos', 'Modelado Predictivo']
      },
      items: [
        { name: 'OpenAI / Claude API', icon: Cpu, desc: { en: 'Generative agents & RAG pipelines', es: 'Agentes generativos y flujos RAG' } },
        { name: 'Python / PyTorch', icon: Workflow, desc: { en: 'Machine learning development', es: 'Desarrollo de aprendizaje automático' } },
        { name: 'Power BI', icon: BarChart3, desc: { en: 'Executive dashboards & analytics', es: 'Tableros e informes ejecutivos' } },
        { name: 'Tableau', icon: Database, desc: { en: 'Self-service business intelligence', es: 'Inteligencia de negocios autoservicio' } },
        { name: 'LangChain', icon: Network, desc: { en: 'Agentic framework orchestration', es: 'Orquestación de marcos de trabajo agentes' } },
        { name: 'Hugging Face', icon: Layers, desc: { en: 'Model fine-tuning & integration', es: 'Ajuste fino e integración de modelos' } },
      ]
    },
    engineering: {
      badges: {
        en: ['Custom Web Apps', 'SaaS Architectures', 'Type-Safe Systems', 'API Services'],
        es: ['Apps Web a Medida', 'Arquitecturas SaaS', 'Sistemas con Tipado Seguro', 'Servicios API']
      },
      items: [
        { name: 'React / Next.js', icon: Code, desc: { en: 'High-availability frontend portals', es: 'Portales frontend de alta disponibilidad' } },
        { name: 'TypeScript', icon: ShieldCheck, desc: { en: 'Robust client and server logic', es: 'Lógica robusta de cliente y servidor' } },
        { name: 'Node.js', icon: Terminal, desc: { en: 'Scalable API & event gateways', es: 'Puertas de enlace de API y eventos escalables' } },
        { name: '.NET Core', icon: Server, desc: { en: 'Enterprise C# backends & services', es: 'Servicios y backends empresariales en C#' } },
        { name: 'Go (Golang)', icon: Workflow, desc: { en: 'High-performance microservices', es: 'Microservicios de alto rendimiento' } },
        { name: 'Tailwind CSS', icon: Layers, desc: { en: 'Premium responsive design systems', es: 'Sistemas de diseño responsivos premium' } },
      ]
    },
    cloud_devops: {
      badges: {
        en: ['Cloud Platforms', 'Container Orchestration', 'CI/CD Pipelines', 'Infrastructure as Code'],
        es: ['Plataformas Nube', 'Orquestación de Contenedores', 'Flujos CI/CD', 'Infraestructura como Código']
      },
      items: [
        { name: 'AWS Cloud', icon: Cloud, desc: { en: 'Elastic computing & architectures', es: 'Cómputo elástico y arquitecturas en la nube' } },
        { name: 'Microsoft Azure', icon: Network, desc: { en: 'Hybrid integrations & directory services', es: 'Integraciones híbridas y directorios' } },
        { name: 'Docker / Kubernetes', icon: Layers, desc: { en: 'Microservices containerization', es: 'Contenedorización de microservicios' } },
        { name: 'Terraform', icon: Workflow, desc: { en: 'Declarative infrastructure setups', es: 'Configuración declarativa de infraestructura' } },
        { name: 'GitHub Actions', icon: Terminal, desc: { en: 'Automated software deployments', es: 'Implementaciones automatizadas de software' } },
        { name: 'Vercel / Netlify', icon: Server, desc: { en: 'Next-gen edge server deployments', es: 'Implementaciones de servidores perimetrales' } },
      ]
    },
    database_security: {
      badges: {
        en: ['Data Lakes', 'Relational Databases', 'Access Management', 'Compliance Auditing'],
        es: ['Lagos de Datos', 'Bases de Datos Relacionales', 'Gestión de Accesos', 'Auditoría de Cumplimiento']
      },
      items: [
        { name: 'Snowflake', icon: Database, desc: { en: 'Cloud-native data warehousing', es: 'Almacén de datos nativo de la nube' } },
        { name: 'Databricks', icon: Cpu, desc: { en: 'Unified Lakehouse & engineering', es: 'Lago de datos y análisis unificado' } },
        { name: 'PostgreSQL / SQL Server', icon: Server, desc: { en: 'High-volume transaction engines', es: 'Motores transaccionales de alto volumen' } },
        { name: 'Auth0 / Okta (IAM)', icon: ShieldCheck, desc: { en: 'Enterprise identity security', es: 'Seguridad de identidad corporativa' } },
        { name: 'Supabase / Firebase', icon: Workflow, desc: { en: 'Backend as a Service integration', es: 'Integración de backend como servicio' } },
        { name: 'Cloudflare WAF', icon: Activity, desc: { en: 'Edge firewall and DDoS shielding', es: 'Cortafuegos perimetral y blindaje DDoS' } },
      ]
    }
  };

  const activeCategory = categories[activeTab];
  const activeBadges = activeCategory.badges[locale] || activeCategory.badges.en;
  
  const tabIcons = {
    ai_analytics: Cpu,
    engineering: Code,
    cloud_devops: Cloud,
    database_security: ShieldCheck
  };

  return (
    <section className="relative bg-[#fcfdfe] dark:bg-[#07090e] border-t border-b border-slate-100 dark:border-slate-900 py-32 select-none text-left overflow-hidden bg-dot-pattern">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#0F4C81]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C81]" />
            {activeTranslation.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {activeTranslation.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-semibold leading-relaxed max-w-2xl mx-auto">
            {activeTranslation.subtitle}
          </p>
        </div>

        {/* Tab Selectors */}
        <div className="flex flex-wrap md:flex-row justify-center gap-2 p-2 bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl max-w-3xl mx-auto mb-10 shadow-inner backdrop-blur-md">
          {(Object.keys(categories) as TabKey[]).map((tabKey) => {
            const TabIcon = tabIcons[tabKey];
            const isActive = activeTab === tabKey;
            return (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={`flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm rounded-xl font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-white dark:bg-[#0B0F19] text-[#0F4C81] dark:text-blue-400 border border-slate-250/50 dark:border-slate-800 shadow-md"
                    : "text-slate-655 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-900/20"
                }`}
              >
                <TabIcon size={16} className={isActive ? "text-[#0F4C81] dark:text-blue-400" : "text-slate-400"} />
                {activeTranslation.tabs[tabKey]}
              </button>
            );
          })}
        </div>

        {/* Capability Badges */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {activeBadges.map((badgeText, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[10px] sm:text-xs font-bold bg-[#0F4C81]/5 text-[#0F4C81] dark:bg-blue-950/20 dark:text-blue-400 border border-[#0F4C81]/10 dark:border-blue-900/30"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C81] dark:bg-blue-400" />
              {badgeText}
            </span>
          ))}
        </div>

        {/* Cards Grid with Framer Motion Transition */}
        <div className="min-h-[260px]">
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
                    className="flex items-center gap-4.5 p-6 bg-white dark:bg-[#0b0f19] border border-slate-200/50 dark:border-slate-800/40 rounded-2xl transition-all duration-300 shadow-sm hover:-translate-y-1 hover:border-[#0F4C81] dark:hover:border-blue-500 hover:shadow-lg dark:hover:shadow-blue-950/10 group relative overflow-hidden min-h-[110px]"
                  >
                    {/* Hover border glow highlight */}
                    <div className="absolute inset-x-0 bottom-0 h-[2.5px] bg-gradient-to-r from-[#0F4C81] to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Icon Container */}
                    <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-[#0F4C81] dark:group-hover:text-blue-400 group-hover:bg-[#0F4C81]/5 dark:group-hover:bg-[#0F4C81]/10 group-hover:border-[#0F4C81]/15 dark:group-hover:border-blue-900/30 transition-all duration-300 flex-shrink-0">
                      <IconComponent size={22} className="group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-1">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-200 group-hover:text-[#0F4C81] dark:group-hover:text-blue-400 transition-colors duration-300">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
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
