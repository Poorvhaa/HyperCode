'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Cloud, 
  Layers, 
  Cpu, 
  Network, 
  ShieldCheck, 
  Code, 
  Server, 
  Terminal,
  Activity,
  Workflow,
  Sparkles,
  Brain,
  Smartphone,
  Globe,
  Zap,
  Palette
} from 'lucide-react';

type TabKey = 'ai' | 'cloud' | 'frontend' | 'backend' | 'mobile' | 'database' | 'devops';

export function TechnologyExpertise() {
  const locale = useLocale() as 'en' | 'es';
  const [activeTab, setActiveTab] = useState<TabKey>('ai');

  const translations = {
    en: {
      badge: "Technologies We Master",
      title: "Enterprise Technology Stack",
      subtitle: "We architect custom software, scale automated workflows, and orchestrate cloud databases using gold-standard certified tools.",
      tabs: {
        ai: "AI",
        cloud: "Cloud",
        frontend: "Frontend",
        backend: "Backend",
        mobile: "Mobile",
        database: "Database",
        devops: "DevOps"
      }
    },
    es: {
      badge: "Tecnologías que Dominamos",
      title: "Pila Tecnológica Empresarial",
      subtitle: "Diseñamos software a medida, escalamos flujos automatizados y orquestamos bases de datos en la nube con herramientas certificadas.",
      tabs: {
        ai: "IA",
        cloud: "Nube",
        frontend: "Frontend",
        backend: "Backend",
        mobile: "Móvil",
        database: "Bases de Datos",
        devops: "DevOps"
      }
    }
  };

  const activeTranslation = translations[locale] || translations.en;

  const categories = {
    ai: {
      badges: {
        en: ['Generative AI', 'Agentic Systems', 'Cognitive Search', 'ML Ops'],
        es: ['IA Generativa', 'Sistemas Agentes', 'Búsqueda Cognitiva', 'ML Ops']
      },
      items: [
        { name: 'OpenAI GPT-4', icon: Sparkles, desc: { en: 'Generative LLM agents & models', es: 'Modelos y agentes LLM generativos' } },
        { name: 'Anthropic Claude', icon: Cpu, desc: { en: 'Contextual reasoning & automation', es: 'Razonamiento contextual y automatización' } },
        { name: 'LangChain', icon: Network, desc: { en: 'Multi-agent system orchestration', es: 'Orquestación de sistemas multi-agente' } },
        { name: 'LlamaIndex', icon: Brain, desc: { en: 'RAG knowledge engines & pipelines', es: 'Flujos y motores de conocimiento RAG' } },
        { name: 'Hugging Face', icon: Layers, desc: { en: 'Custom model training & hosting', es: 'Alojamiento y entrenamiento de modelos' } },
        { name: 'PyTorch / Python', icon: Activity, desc: { en: 'Deep learning & neural networks', es: 'Redes neuronales y aprendizaje profundo' } }
      ]
    },
    cloud: {
      badges: {
        en: ['Multi-Cloud', 'Edge Computing', 'Scalable Networks', 'Serverless'],
        es: ['Multi-Nube', 'Cómputo Perimetral', 'Redes Escalables', 'Serverless']
      },
      items: [
        { name: 'AWS Cloud', icon: Cloud, desc: { en: 'Scalable computing infrastructure', es: 'Infraestructura de cómputo escalable' } },
        { name: 'Microsoft Azure', icon: Server, desc: { en: 'Enterprise cloud ecosystem', es: 'Ecosistema de nube empresarial' } },
        { name: 'Google Cloud Platform', icon: Globe, desc: { en: 'Big data analytics & cloud tools', es: 'Análisis de datos y herramientas de nube' } },
        { name: 'Vercel Edge', icon: Zap, desc: { en: 'Serverless deployment & rendering', es: 'Implementación y renderizado serverless' } },
        { name: 'Netlify Services', icon: Layers, desc: { en: 'Modern static and dynamic hosting', es: 'Alojamiento moderno estático y dinámico' } }
      ]
    },
    frontend: {
      badges: {
        en: ['Type-Safe UI', 'Single Page Apps', 'Design Systems', 'Modern CSS'],
        es: ['IU con Tipado Seguro', 'Aplicaciones de Una Página', 'Sistemas de Diseño', 'CSS Moderno']
      },
      items: [
        { name: 'React', icon: Code, desc: { en: 'Interactive component state engine', es: 'Motor de estado de componentes interactivos' } },
        { name: 'Next.js', icon: Terminal, desc: { en: 'Server-side rendered frameworks', es: 'Marcos de trabajo renderizados en servidor' } },
        { name: 'TypeScript', icon: ShieldCheck, desc: { en: 'Robust static typing declarations', es: 'Declaraciones robustas de tipado estático' } },
        { name: 'Tailwind CSS', icon: Palette, desc: { en: 'Utility-first utility styling systems', es: 'Sistemas de diseño basados en utilidades' } },
        { name: 'HTML5 & JavaScript', icon: Code, desc: { en: 'Modern web scripting and structures', es: 'Estructuras y scripts web modernos' } }
      ]
    },
    backend: {
      badges: {
        en: ['Microservices', 'RESTful APIs', 'Concurrency', 'Security'],
        es: ['Microservicios', 'APIs RESTful', 'Concurrencia', 'Seguridad']
      },
      items: [
        { name: 'Node.js', icon: Terminal, desc: { en: 'Event-driven server-side scripts', es: 'Scripts en el servidor basados en eventos' } },
        { name: '.NET Core', icon: Server, desc: { en: 'High-performance C# microservices', es: 'Microservicios de C# de alto rendimiento' } },
        { name: 'Go (Golang)', icon: Cpu, desc: { en: 'Fast execution, concurrent structures', es: 'Estructuras concurrentes de rápida ejecución' } },
        { name: 'Python Backend', icon: Workflow, desc: { en: 'Data APIs & analytical backends', es: 'APIs de datos y backends analíticos' } }
      ]
    },
    mobile: {
      badges: {
        en: ['Native iOS/Android', 'Hybrid Apps', 'Responsive Flow', 'Cross-Platform'],
        es: ['iOS/Android Nativo', 'Apps Híbridas', 'Flujo Responsivo', 'Multiplataforma']
      },
      items: [
        { name: 'iOS / Swift', icon: Smartphone, desc: { en: 'Elite native Apple experience', es: 'Experiencia nativa de Apple de élite' } },
        { name: 'Android / Kotlin', icon: Smartphone, desc: { en: 'Premium native Google mobile OS', es: 'SO móvil nativo premium de Google' } },
        { name: 'Flutter', icon: Workflow, desc: { en: 'Fast cross-platform rendering engine', es: 'Motor rápido de renderizado multiplataforma' } },
        { name: 'React Native', icon: Layers, desc: { en: 'Component-based hybrid mobile apps', es: 'Apps móviles híbridas basadas en componentes' } }
      ]
    },
    database: {
      badges: {
        en: ['Data Lakehouse', 'ACID Transactions', 'Real-Time Sync', 'Cloud Analytics'],
        es: ['Lago de Datos', 'Transacciones ACID', 'Sincronización en Tiempo Real', 'Analítica en Nube']
      },
      items: [
        { name: 'PostgreSQL', icon: Database, desc: { en: 'Robust relational database engines', es: 'Motores de bases de datos relacionales' } },
        { name: 'Snowflake', icon: Database, desc: { en: 'Cloud elasticity data warehouse', es: 'Almacén de datos con elasticidad en nube' } },
        { name: 'Databricks', icon: Cpu, desc: { en: 'Unified data intelligence platforms', es: 'Plataforma unificada de inteligencia de datos' } },
        { name: 'Supabase / Firebase', icon: Layers, desc: { en: 'Real-time database sync & backends', es: 'Sincronización de base de datos en tiempo real' } },
        { name: 'Microsoft SQL Server', icon: Server, desc: { en: 'High-availability corporate data engine', es: 'Motor corporativo de bases de datos relacionales' } }
      ]
    },
    devops: {
      badges: {
        en: ['Infrastructure as Code', 'Orchestration', 'Continuous Delivery', 'GitOps'],
        es: ['Infraestructura como Código', 'Orquestación', 'Entrega Continua', 'GitOps']
      },
      items: [
        { name: 'Docker Containers', icon: Layers, desc: { en: 'Consistent isolated runtime packages', es: 'Paquetes de ejecución aislados consistentes' } },
        { name: 'Kubernetes', icon: Network, desc: { en: 'Automated container scaling clusters', es: 'Clústeres automatizados de escalado' } },
        { name: 'Terraform', icon: Workflow, desc: { en: 'Declarative system resource builders', es: 'Creadores declarativos de recursos del sistema' } },
        { name: 'GitHub Actions', icon: Terminal, desc: { en: 'Automated script build pipelines', es: 'Canalizaciones de compilación automatizadas' } },
        { name: 'CI/CD Pipelines', icon: Activity, desc: { en: 'Continuous code delivery gates', es: 'Pasarelas de entrega de código continua' } }
      ]
    }
  };

  const activeCategory = categories[activeTab];
  const activeBadges = activeCategory.badges[locale] || activeCategory.badges.en;
  
  const tabIcons = {
    ai: Sparkles,
    cloud: Cloud,
    frontend: Code,
    backend: Server,
    mobile: Smartphone,
    database: Database,
    devops: Network
  };

  // Local helpers removed, standard lucide-react icons imported instead

  return (
    <section className="relative bg-[#fcfdfe] dark:bg-[#07090e] border-t border-b border-slate-100 dark:border-slate-900 py-32 select-none text-left overflow-hidden bg-dot-pattern">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#0F4C81]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] dark:text-blue-400 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C81] dark:bg-blue-400" />
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
        <div className="flex flex-wrap justify-center gap-2 p-2 bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl max-w-5xl mx-auto mb-10 shadow-inner backdrop-blur-md">
          {(Object.keys(categories) as TabKey[]).map((tabKey) => {
            const TabIcon = tabIcons[tabKey];
            const isActive = activeTab === tabKey;
            return (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={`flex-grow md:flex-initial flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm rounded-xl font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-white dark:bg-[#0B0F19] text-[#0F4C81] dark:text-blue-400 border border-slate-250/50 dark:border-slate-800 shadow-md"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-900/20"
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
