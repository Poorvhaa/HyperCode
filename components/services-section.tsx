'use client';

import { 
  Sparkles, 
  Layers, 
  Globe, 
  Smartphone, 
  Cloud, 
  Database, 
  Lock, 
  Palette, 
  Users, 
  Shuffle, 
  Lightbulb, 
  ShoppingCart,
  ArrowRight
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function ServicesSection() {
  const locale = useLocale();

  const trans: Record<string, {
    badge: string;
    title: string;
    subtitle: string;
    explore: string;
    items: Record<string, { title: string; desc: string }>;
  }> = {
    en: {
      badge: "ENTERPRISE SOLUTIONS",
      title: "Solutions We Engineer",
      subtitle: "Deploying integrated engineering squads and strategic consultants to solve your most complex technology challenges.",
      explore: "Explore Services",
      items: {
        ai: { title: "AI & Automation", desc: "Deploy agentic workflows, conversational AI agents, and secure RAG search systems to automate operations." },
        software: { title: "Software Development", desc: "Engineering secure, scalable custom web applications, SaaS platforms, and enterprise integrations." },
        web: { title: "Web Development", desc: "High-performance web applications, customer portals, and optimized digital web products." },
        mobile: { title: "Mobile Development", desc: "Premium native and cross-platform mobile apps for iOS, Android, and Flutter." },
        cloud: { title: "Cloud & DevOps", desc: "Seamless cloud migration, infrastructure as code, CI/CD pipelines, and cloud security governance." },
        data: { title: "Data & Analytics", desc: "Cloud-native data warehousing, ETL pipelines, Power BI/Tableau reporting, and analytics." },
        security: { title: "Cybersecurity", desc: "Compliance audits, penetration testing, identity access management, and threat prevention." },
        design: { title: "UI/UX Design", desc: "User research, prototyping, design systems, and beautiful enterprise product layouts." },
        talent: { title: "IT & Talent Solutions", desc: "Permanent, contract, and staff augmentation solutions to scale your engineering squads." },
        transformation: { title: "Digital Transformation", desc: "Process automation, legacy modernization, and comprehensive digital strategy." },
        consulting: { title: "Technology Consulting", desc: "Strategic technology planning, CTO as a Service, and software architecture blueprints." },
        ecommerce: { title: "E-commerce Development", desc: "Shopify, WooCommerce, payment integrations, and customized digital stores." }
      }
    },
    es: {
      badge: "SOLUCIONES EMPRESARIALES",
      title: "Soluciones que Diseñamos",
      subtitle: "Implementación de equipos de ingeniería integrados y consultores estratégicos para deconstruir y resolver sus desafíos tecnológicos.",
      explore: "Explorar Servicios",
      items: {
        ai: { title: "IA y Automatización", desc: "Implemente flujos de trabajo agentes, agentes de voz de IA y sistemas de búsqueda RAG seguros para automatizar operaciones." },
        software: { title: "Desarrollo de Software", desc: "Ingeniería de aplicaciones web personalizadas, seguras y escalables, plataformas SaaS e integraciones empresariales." },
        web: { title: "Desarrollo Web", desc: "Aplicaciones web de alto rendimiento, portales de clientes y productos web digitales optimizados." },
        mobile: { title: "Desarrollo Móvil", desc: "Aplicaciones móviles nativas y multiplataforma de primera calidad para iOS, Android y Flutter." },
        cloud: { title: "Nube y DevOps", desc: "Migración a la nube fluida, infraestructura como código, canalizaciones de CI/CD y gobernanza de seguridad en la nube." },
        data: { title: "Datos y Analítica", desc: "Almacenamiento de datos nativo de la nube, flujos de datos ETL, informes en Power BI/Tableau y analítica." },
        security: { title: "Ciberseguridad", desc: "Auditorías de cumplimiento, pruebas de penetración, gestión de accesos de identidad y prevención de amenazas." },
        design: { title: "Diseño UI/UX", desc: "Investigación de usuarios, prototipos, sistemas de diseño y hermosos diseños de productos empresariales." },
        talent: { title: "Soluciones de Talento TI", desc: "Soluciones de personal permanentes, por contrato y de aumento de personal para escalar sus equipos de ingeniería." },
        transformation: { title: "Transformación Digital", desc: "Automatización de procesos, modernización de sistemas heredados y estrategia digital integral." },
        consulting: { title: "Consultoría Tecnológica", desc: "Planificación tecnológica estratégica, CTO como servicio y planos de arquitectura de software." },
        ecommerce: { title: "Desarrollo de E-commerce", desc: "Shopify, WooCommerce, integraciones de pasarelas de pago y tiendas digitales personalizadas." }
      }
    }
  };

  const curr = trans[locale] || trans.en;

  const services = [
    {
      key: 'ai',
      icon: Sparkles,
      image: '/images/ai-automation.png',
      href: '/solutions/ai-consulting'
    },
    {
      key: 'software',
      icon: Layers,
      image: '/images/software-development.png',
      href: '/solutions/custom-software-development'
    },
    {
      key: 'web',
      icon: Globe,
      image: '/images/web-development.png',
      href: '/solutions/corporate-websites'
    },
    {
      key: 'mobile',
      icon: Smartphone,
      image: '/images/mobile-development.png',
      href: '/solutions/cross-platform-apps'
    },
    {
      key: 'cloud',
      icon: Cloud,
      image: '/images/cloud-infrastructure.png',
      href: '/solutions/cloud-migration'
    },
    {
      key: 'data',
      icon: Database,
      image: '/images/case-study-dashboard.png',
      href: '/solutions/data-warehousing'
    },
    {
      key: 'security',
      icon: Lock,
      image: '/images/cybersecurity.png',
      href: '/solutions/security-assessment'
    },
    {
      key: 'design',
      icon: Palette,
      image: '/images/ui-ux-design.png',
      href: '/solutions/ui-design'
    },
    {
      key: 'talent',
      icon: Users,
      image: '/images/staffing-team.png',
      href: '/solutions/permanent-staffing'
    },
    {
      key: 'transformation',
      icon: Shuffle,
      image: '/images/digital-transformation.png',
      href: '/solutions/business-process-automation'
    },
    {
      key: 'consulting',
      icon: Lightbulb,
      image: '/images/hero-enterprise.png',
      href: '/solutions/technology-consulting'
    },
    {
      key: 'ecommerce',
      icon: ShoppingCart,
      image: '/images/ecommerce.png',
      href: '/solutions/shopify-development'
    }
  ];

  return (
    <section id="services" className="relative py-32 bg-slate-50/50 dark:bg-[#07090e] border-b border-slate-100 dark:border-slate-900 text-left overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-blue-100/30 dark:bg-blue-950/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-slate-100/50 dark:bg-indigo-950/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="max-w-3xl mb-20 space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] dark:text-blue-400 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C81] dark:bg-blue-400" />
            {curr.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {curr.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
            {curr.subtitle}
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const itemTranslation = curr.items[service.key];
            return (
              <motion.div
                key={service.key}
                className="group flex flex-col justify-between rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-[#0b0f19] shadow-sm hover:shadow-xl hover:border-[#0F4C81] dark:hover:border-blue-500/80 transition-all duration-400 overflow-hidden min-h-[420px]"
                whileHover={{ y: -6 }}
              >
                {/* Header Image & Badge */}
                <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={itemTranslation.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />
                  
                  {/* Floating Icon */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/95 dark:bg-slate-950/95 backdrop-blur-md text-[#0F4C81] dark:text-blue-400 flex items-center justify-center shadow-md border border-white/20 dark:border-white/5 group-hover:scale-110 transition-transform">
                    <Icon size={18} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-150 tracking-tight group-hover:text-[#0F4C81] dark:group-hover:text-blue-400 transition-colors">
                      {itemTranslation.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                      {itemTranslation.desc}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-900/80">
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] dark:text-blue-400 hover:gap-2.5 transition-all group/link"
                    >
                      <span>{curr.explore}</span>
                      <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
