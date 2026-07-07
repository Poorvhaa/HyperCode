'use client';

import Image from "next/image";
import { useState, useEffect } from 'react';
import { usePathname, useRouter, Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Cpu,
  Globe,
  Database,
  ShieldCheck,
  Layers,
  TrendingUp,
  Settings,
  Zap,
  Network,
  Users,
  ShoppingCart,
  Palette,
  Brain,
  Lock,
  Lightbulb,
  Shuffle,
  Smartphone,
  Cloud,
  ArrowRight
} from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' }
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'solutions' | null>(null);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('ai-automation');
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Navigation');
  const tc = useTranslations('Common');
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };
  const getLinkClass = (href: string) => {
    const base = "font-bold text-sm lg:text-[16px] xl:text-[17px] transition-all duration-200 relative py-2 cursor-pointer bg-transparent border-none outline-none flex items-center h-full text-slate-700 hover:text-[#0F4C81]";
    const activeColor = "text-[#0F4C81] font-extrabold";
    const inactiveColor = "text-slate-750";
    return `${base} ${isActive(href) ? activeColor : inactiveColor}`;
  };

  const getLangButtonClass = () => {
    return "flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold transition-all duration-200 cursor-pointer text-slate-700 hover:bg-slate-50 bg-white shadow-sm";
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('hypercode-mobile-menu-toggle', { detail: { open: isOpen } }));
  }, [isOpen]);

  const handleLanguageChange = (code: string) => {
    localStorage.setItem('NEXT_LOCALE', code);
    router.replace(pathname, { locale: code });
    setIsLangOpen(false);
    setIsMobileLangOpen(false);
  };

  const triggerOpenChat = () => {
    window.dispatchEvent(new CustomEvent('open-hypercode-chat'));
    setIsOpen(false);
  };

  // Grouped 13 service categories
  // Grouped 13 service categories mapped to actual slugs
  const solutionsMegaMenu = [
    {
      id: 'ai-automation',
      title: locale === 'es' ? 'IA y Automatización' : 'AI & Automation',
      icon: Sparkles,
      desc: locale === 'es' ? 'Agentes de voz, chatbots de IA y flujos de RAG.' : 'AI voice agents, chatbots, and RAG pipelines.',
      items: [
        { name: locale === 'es' ? 'Consultoría de IA' : 'AI Consulting', slug: 'ai-consulting' },
        { name: locale === 'es' ? 'Chatbots de IA' : 'AI Chatbots', slug: 'ai-chatbot-development' },
        { name: locale === 'es' ? 'Agentes de Voz' : 'Voice Agents', slug: 'ai-voice-agents' },
        { name: locale === 'es' ? 'Base de Conocimiento (RAG)' : 'AI RAG Systems', slug: 'ai-knowledge-base-rag' },
        { name: locale === 'es' ? 'Automatización de Flujos' : 'AI Workflow Automation', slug: 'ai-workflow-automation' },
        { name: locale === 'es' ? 'Integración de IA' : 'AI Integration', slug: 'ai-integration' }
      ]
    },
    {
      id: 'software-development',
      title: locale === 'es' ? 'Desarrollo de Software' : 'Software Development',
      icon: Layers,
      desc: locale === 'es' ? 'SaaS, ERP, CRM y modernización de sistemas legados.' : 'SaaS, ERP, CRM, and legacy modernization.',
      items: [
        { name: locale === 'es' ? 'Software a Medida' : 'Custom Software', slug: 'custom-software-development' },
        { name: locale === 'es' ? 'Software Empresarial' : 'Enterprise Software', slug: 'enterprise-software' },
        { name: locale === 'es' ? 'SaaS' : 'SaaS Development', slug: 'saas-development' },
        { name: locale === 'es' ? 'CRM' : 'CRM Development', slug: 'crm-development' },
        { name: locale === 'es' ? 'ERP' : 'ERP Development', slug: 'erp-development' },
        { name: locale === 'es' ? 'APIs' : 'APIs Development', slug: 'api-development' }
      ]
    },
    {
      id: 'web-development',
      title: locale === 'es' ? 'Desarrollo Web' : 'Web Development',
      icon: Globe,
      desc: locale === 'es' ? 'Portales corporativos y aplicaciones web de alto rendimiento.' : 'Corporate portals and high-performance web apps.',
      items: [
        { name: locale === 'es' ? 'Sitios Corporativos' : 'Corporate Websites', slug: 'corporate-websites' },
        { name: locale === 'es' ? 'Sitios de Negocios' : 'Business Websites', slug: 'business-websites' },
        { name: locale === 'es' ? 'Comercio Electrónico' : 'Ecommerce Websites', slug: 'ecommerce-websites' },
        { name: locale === 'es' ? 'Portales de Clientes' : 'Customer Portals', slug: 'customer-portals' },
        { name: locale === 'es' ? 'Tableros Admin' : 'Admin Dashboards', slug: 'admin-dashboards' }
      ]
    },
    {
      id: 'mobile-development',
      title: locale === 'es' ? 'Desarrollo Móvil' : 'Mobile Development',
      icon: Smartphone,
      desc: locale === 'es' ? 'Aplicaciones nativas e híbridas (iOS, Android, Flutter).' : 'Native and hybrid apps (iOS, Android, Flutter).',
      items: [
        { name: locale === 'es' ? 'Aplicaciones iOS' : 'iOS Apps', slug: 'ios-apps' },
        { name: locale === 'es' ? 'Aplicaciones Android' : 'Android Apps', slug: 'android-apps' },
        { name: locale === 'es' ? 'Multiplataforma' : 'Cross-Platform Apps', slug: 'cross-platform-apps' },
        { name: locale === 'es' ? 'Flutter' : 'Flutter Development', slug: 'flutter-development' },
        { name: locale === 'es' ? 'React Native' : 'React Native Dev', slug: 'react-native-development' }
      ]
    },
    {
      id: 'cloud-devops',
      title: locale === 'es' ? 'Nube y DevOps' : 'Cloud & DevOps',
      icon: Cloud,
      desc: locale === 'es' ? 'Migración a AWS/Azure, Docker, Kubernetes y CI/CD.' : 'AWS/Azure migration, Kubernetes, and CI/CD.',
      items: [
        { name: locale === 'es' ? 'Migración a la Nube' : 'Cloud Migration', slug: 'cloud-migration' },
        { name: locale === 'es' ? 'AWS' : 'AWS Cloud Solutions', slug: 'aws-cloud-solutions' },
        { name: locale === 'es' ? 'Azure' : 'Azure Cloud Solutions', slug: 'azure-cloud-solutions' },
        { name: locale === 'es' ? 'Kubernetes' : 'Kubernetes Orchestration', slug: 'kubernetes-orchestration' },
        { name: locale === 'es' ? 'CI/CD Pipelines' : 'CI/CD Pipelines', slug: 'ci-cd-pipelines' }
      ]
    },
    {
      id: 'talent-solutions',
      title: locale === 'es' ? 'Talento TI y No TI' : 'IT & Non-IT Talent',
      icon: Users,
      desc: locale === 'es' ? 'Contratación permanente, temporal y aumento de personal.' : 'Permanent, contract, and staff augmentation.',
      items: [
        { name: locale === 'es' ? 'Contratación Permanente' : 'Permanent Staffing', slug: 'permanent-staffing' },
        { name: locale === 'es' ? 'Contratación por Contrato' : 'Contract Staffing', slug: 'contract-staffing' },
        { name: locale === 'es' ? 'Búsqueda Ejecutiva' : 'Executive Search', slug: 'executive-search' },
        { name: locale === 'es' ? 'Aumento de Personal' : 'Staff Augmentation', slug: 'staff-augmentation' },
        { name: locale === 'es' ? 'Equipos Dedicados' : 'Dedicated Teams', slug: 'dedicated-teams' }
      ]
    },
    {
      id: 'digital-transformation',
      title: locale === 'es' ? 'Transformación Digital' : 'Digital Transformation',
      icon: Shuffle,
      desc: locale === 'es' ? 'Optimización de procesos y transformación empresarial.' : 'Process optimization and digital shifts.',
      items: [
        { name: locale === 'es' ? 'Automatización de Procesos' : 'Process Automation', slug: 'business-process-automation' },
        { name: locale === 'es' ? 'Consultoría Digital' : 'Digital Consulting', slug: 'digital-transformation-consulting' },
        { name: locale === 'es' ? 'Modernización Legada' : 'Legacy Modernization', slug: 'legacy-modernization-dt' },
        { name: locale === 'es' ? 'Estrategia Digital' : 'Digital Strategy', slug: 'digital-strategy' }
      ]
    },
    {
      id: 'data-analytics',
      title: locale === 'es' ? 'Datos y Analítica' : 'Data & Analytics',
      icon: Database,
      desc: locale === 'es' ? 'Power BI, Tableau y almacenes de datos en la nube.' : 'Power BI, Tableau, and cloud data warehouses.',
      items: [
        { name: locale === 'es' ? 'Power BI' : 'Power BI Dashboards', slug: 'power-bi-dashboards' },
        { name: locale === 'es' ? 'Tableau' : 'Tableau Dashboards', slug: 'tableau-dashboards' },
        { name: locale === 'es' ? 'Almacenamiento de Datos' : 'Data Warehousing', slug: 'data-warehousing' },
        { name: locale === 'es' ? 'Canalizaciones ETL' : 'ETL Pipelines', slug: 'etl-pipelines' },
        { name: locale === 'es' ? 'Inteligencia de Negocios' : 'Business Intelligence', slug: 'business-intelligence' }
      ]
    },
    {
      id: 'cybersecurity',
      title: locale === 'es' ? 'Ciberseguridad' : 'Cybersecurity',
      icon: Lock,
      desc: locale === 'es' ? 'Auditorías de cumplimiento, pruebas de penetración e IAM.' : 'Compliance audits, pentesting, and IAM.',
      items: [
        { name: locale === 'es' ? 'Evaluación de Seguridad' : 'Security Assessment', slug: 'security-assessment' },
        { name: locale === 'es' ? 'Pruebas de Penetración' : 'Penetration Testing', slug: 'penetration-testing' },
        { name: locale === 'es' ? 'Auditorías de Seguridad' : 'Security Audits', slug: 'security-audits' },
        { name: locale === 'es' ? 'Cumplimiento Normativo' : 'Compliance Consulting', slug: 'compliance-consulting' }
      ]
    },
    {
      id: 'ui-ux-design',
      title: locale === 'es' ? 'Diseño UI/UX' : 'UI/UX Design',
      icon: Palette,
      desc: locale === 'es' ? 'Investigación de usuarios, prototipos y sistemas de diseño.' : 'User research, prototyping, and design systems.',
      items: [
        { name: locale === 'es' ? 'Diseño UI' : 'UI Design', slug: 'ui-design' },
        { name: locale === 'es' ? 'Investigación UX' : 'UX Research', slug: 'ux-research' },
        { name: locale === 'es' ? 'Wireframes' : 'Wireframing', slug: 'wireframing' },
        { name: locale === 'es' ? 'Prototipos' : 'Prototyping', slug: 'prototyping' },
        { name: locale === 'es' ? 'Sistemas de Diseño' : 'Design Systems', slug: 'design-systems' }
      ]
    },
    {
      id: 'digital-marketing',
      title: locale === 'es' ? 'Marketing Digital' : 'Digital Marketing',
      icon: TrendingUp,
      desc: locale === 'es' ? 'SEO local, campañas de Google Ads y LinkedIn.' : 'Local SEO, Google Ads, and LinkedIn marketing.',
      items: [
        { name: locale === 'es' ? 'SEO' : 'SEO Optimization', slug: 'seo-optimization' },
        { name: locale === 'es' ? 'SEO Local' : 'Local SEO', slug: 'local-seo' },
        { name: locale === 'es' ? 'Google Ads' : 'Google Ads', slug: 'google-ads' },
        { name: locale === 'es' ? 'Marketing en LinkedIn' : 'LinkedIn Marketing', slug: 'linkedin-marketing' }
      ]
    },
    {
      id: 'ecommerce',
      title: locale === 'es' ? 'Comercio Electrónico' : 'E-commerce',
      icon: ShoppingCart,
      desc: locale === 'es' ? 'Plataformas Shopify, WooCommerce y pasarelas de pago.' : 'Shopify, WooCommerce, and payment integrations.',
      items: [
        { name: locale === 'es' ? 'Shopify' : 'Shopify Development', slug: 'shopify-development' },
        { name: locale === 'es' ? 'WooCommerce' : 'WooCommerce Dev', slug: 'woocommerce-development' },
        { name: locale === 'es' ? 'Magento' : 'Magento Development', slug: 'magento-development' },
        { name: locale === 'es' ? 'Pasarelas de Pago' : 'Payment Gateways', slug: 'payment-gateway-integration' }
      ]
    },
    {
      id: 'technology-consulting',
      title: locale === 'es' ? 'Consultoría Tecnológica' : 'Technology Consulting',
      icon: Lightbulb,
      desc: locale === 'es' ? 'Estrategia de IA, CTO as a Service y arquitectura.' : 'AI strategy, CTO as a Service, and architecture.',
      items: [
        { name: locale === 'es' ? 'Consultoría de TI' : 'Tech Consulting', slug: 'technology-consulting' },
        { name: locale === 'es' ? 'Estrategia de IA' : 'AI Strategy', slug: 'ai-strategy' },
        { name: locale === 'es' ? 'CTO como Servicio' : 'CTO as a Service', slug: 'cto-as-a-service' },
        { name: locale === 'es' ? 'Arquitectura de Software' : 'Software Architecture', slug: 'software-architecture' }
      ]
    }
  ];

  const activeLangName = languages.find((lang) => lang.code === locale)?.name || 'English';

  const closeDropdowns = () => setActiveDropdown(null);

  return (
    <>
      <motion.nav
        className={`fixed z-50 transition-all duration-300 ease-in-out top-0 left-0 right-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-sm ${
          isScrolled ? 'h-20 shadow-md' : 'h-[88px]'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full w-full">
            <div className="flex items-center h-full">
              <Link href="/" className="flex items-center flex-shrink-0">
                <Image
                  src="/logo.jpg"
                  alt="HyperCode"
                  width={729}
                  height={950}
                  priority
                  className="h-14 lg:h-16 w-auto object-contain py-1 transition-all duration-300"
                />
              </Link>
            </div>

            {/* Center Navigation Links */}
            <div className="hidden lg:flex items-center justify-center space-x-8 h-full rtl:space-x-reverse flex-1">
              <Link href="/" className={`${getLinkClass('/')} group`}>
                <span className="relative py-1">
                  {t('home')}
                </span>
              </Link>

              {/* Solutions Mega Menu Dropdown */}
              <div
                className="h-full flex items-center relative"
                onMouseEnter={() => setActiveDropdown('solutions')}
                onMouseLeave={closeDropdowns}
              >
                <button className={`${getLinkClass('/solutions')} group`}>
                  <span className="relative py-1 flex items-center">
                    <span>{tc('solutions')}</span>
                    <ChevronDown size={12} className={`ml-1 transition-transform duration-300 ${activeDropdown === 'solutions' ? 'rotate-180 text-[#0F4C81]' : ''}`} />
                  </span>
                </button>

                <AnimatePresence>
                  {activeDropdown === 'solutions' && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4 sm:px-6 lg:px-8 z-50 pointer-events-auto"
                    >
                      <div className="bg-white backdrop-blur-xl border border-slate-200/80 rounded-[24px] shadow-2xl shadow-slate-900/5 p-8 flex gap-8 text-left mt-2">
                        
                        {/* Left Panel: Categories Selection */}
                        <div className="w-1/3 border-r border-slate-200 pr-6 space-y-1 max-h-[500px] overflow-y-auto scrollbar-thin">
                          {solutionsMegaMenu.map((cat) => {
                            const CatIcon = cat.icon;
                            const isCatActive = activeCategory === cat.id;
                            return (
                              <button
                                key={cat.id}
                                onMouseEnter={() => setActiveCategory(cat.id)}
                                className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all duration-200 cursor-pointer border-none outline-none ${
                                  isCatActive 
                                    ? 'bg-[#F1F5F9] text-[#0F4C81] font-extrabold shadow-sm'
                                    : 'text-slate-600 hover:bg-slate-50'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`p-1.5 rounded-lg ${isCatActive ? 'bg-[#0F4C81]/10 text-[#0F4C81]' : 'bg-slate-100/85 text-slate-405'}`}>
                                    <CatIcon size={16} />
                                  </div>
                                  <span className="text-xs font-bold tracking-tight">{cat.title}</span>
                                </div>
                                <ArrowRight size={12} className={`opacity-0 transition-opacity ${isCatActive ? 'opacity-100' : ''}`} />
                              </button>
                            );
                          })}
                        </div>

                        {/* Right Panel: Selected Category Services Grid */}
                        {(() => {
                          const activeCatObj = solutionsMegaMenu.find(c => c.id === activeCategory) || solutionsMegaMenu[0];
                          const ActiveCatIcon = activeCatObj.icon;
                          return (
                            <div className="w-2/3 pl-6 flex flex-col justify-between h-[480px]">
                              <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                  <div className="p-3 bg-[#0F4C81]/5 border border-[#0F4C81]/15 text-[#0F4C81] rounded-2xl">
                                    <ActiveCatIcon size={24} />
                                  </div>
                                  <div className="space-y-1">
                                    <h4 className="text-base font-extrabold text-slate-800">{activeCatObj.title}</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed max-w-lg">{activeCatObj.desc}</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  {activeCatObj.items.map((item, idx) => (
                                    <Link
                                      key={idx}
                                      href={`/solutions/${item.slug}`}
                                      onClick={closeDropdowns}
                                      className="group flex items-center justify-between p-3 rounded-2xl border border-slate-100 bg-slate-50/30 hover:border-[#0F4C81]/30 hover:bg-slate-50 transition-all"
                                    >
                                      <span className="text-xs font-bold text-slate-700 group-hover:text-[#0F4C81] transition-colors">
                                        {item.name}
                                      </span>
                                      <ChevronDown size={14} className="text-slate-400 group-hover:text-[#0F4C81] transform -rotate-90 group-hover:translate-x-1 transition-all" />
                                    </Link>
                                  ))}
                                </div>
                              </div>

                              <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                                <Link
                                  href="/solutions"
                                  onClick={closeDropdowns}
                                  className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0F4C81] hover:underline"
                                >
                                  <span>{t('viewAllSolutions')}</span>
                                  <ArrowRight size={14} />
                                </Link>
                                <button
                                  onClick={triggerOpenChat}
                                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#0F4C81] bg-transparent border-none cursor-pointer"
                                >
                                  <span>{t('talkToAI')}</span>
                                  <Sparkles size={12} className="text-blue-500 animate-pulse" />
                                </button>
                              </div>
                            </div>
                          );
                        })()}

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/about" className={`${getLinkClass('/about')} group`}>
                <span className="relative py-1">
                  {t('about')}
                </span>
              </Link>

              <Link href="/careers" className={`${getLinkClass('/careers')} group`}>
                <span className="relative py-1">
                  {t('careers')}
                </span>
              </Link>

              <Link href="/contact" className={`${getLinkClass('/contact')} group`}>
                <span className="relative py-1">
                  {t('contact')}
                </span>
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className={getLangButtonClass()}
                >
                  <Globe size={13} className="text-slate-600" />
                  <span>{activeLangName}</span>
                  <ChevronDown size={11} className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-36 bg-white border border-slate-200 rounded-2xl shadow-xl py-1.5 z-50 overflow-hidden"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-slate-50 cursor-pointer transition-colors ${
                            locale === lang.code ? 'text-[#0F4C81]' : 'text-slate-700'
                          }`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Schedule Consultation highlighted CTA */}
              <Link
                href="/consultation"
                className="px-6 py-3 rounded-full text-sm font-bold text-white bg-[#0F4C81] hover:bg-[#0c3e69] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 cursor-pointer border-none no-underline shadow-sm flex items-center justify-center gap-2"
              >
                <span>{t('schedule') || 'Schedule Consultation'}</span>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-3">
              <button
                onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white"
              >
                {locale.toUpperCase()}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-slate-605 hover:bg-slate-50"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-slate-200 bg-white overflow-hidden shadow-xl absolute top-20 left-0 right-0 z-55 max-h-[calc(100vh-80px)] overflow-y-auto"
            >
              <div className="px-4 pt-2 pb-6 space-y-3">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 text-base font-bold text-slate-800 hover:bg-slate-50 rounded-xl"
                >
                  {t('home')}
                </Link>

                {/* Mobile Solutions Accordion */}
                <div>
                  <button
                    onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-base font-bold text-slate-800 hover:bg-slate-50 rounded-xl text-left"
                  >
                    <span>{tc('solutions')}</span>
                    <ChevronDown size={16} className={`transform transition-transform duration-300 ${mobileSolutionsOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {mobileSolutionsOpen && (
                    <div className="pl-4 space-y-3 mt-2 border-l border-slate-100">
                      {solutionsMegaMenu.map((cat, catIdx) => {
                        const isMobileCatExpanded = mobileExpandedCat === cat.id;
                        const CatIcon = cat.icon;
                        return (
                          <div key={catIdx} className="space-y-1">
                            <button
                              onClick={() => setMobileExpandedCat(isMobileCatExpanded ? null : cat.id)}
                              className="w-full flex items-center justify-between py-2 text-xs font-bold text-slate-600 hover:text-[#0F4C81] text-left bg-transparent border-none outline-none cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <CatIcon size={14} className="text-slate-400" />
                                <span>{cat.title}</span>
                              </div>
                              <ChevronDown size={12} className={`transform transition-transform ${isMobileCatExpanded ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {isMobileCatExpanded && (
                              <div className="pl-6 space-y-2.5 py-1 border-l border-slate-100">
                                {cat.items.map((item, idx) => (
                                  <Link
                                    key={idx}
                                    href={`/solutions/${item.slug}`}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-xs font-semibold text-slate-500 hover:text-[#0F4C81]"
                                  >
                                    {item.name}
                                  </Link>
                                ))}
                                <Link
                                    href="/solutions"
                                    onClick={() => setIsOpen(false)}
                                    className="block text-xs font-extrabold text-[#0F4C81] pt-1"
                                  >
                                    {t('viewAll')}
                                  </Link>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <Link
                    href="/about"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2.5 text-base font-bold text-slate-800 hover:bg-slate-50 rounded-xl"
                  >
                    {t('about')}
                  </Link>

                  <Link
                    href="/careers"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2.5 text-base font-bold text-slate-800 hover:bg-slate-50 rounded-xl"
                  >
                    {t('careers')}
                  </Link>

                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2.5 text-base font-bold text-slate-800 hover:bg-slate-50 rounded-xl"
                  >
                    {t('contact')}
                  </Link>

                  {/* Mobile Consultation CTA */}
                  <div className="pt-4 px-3">
                    <Link
                      href="/consultation"
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center py-3 rounded-full font-bold text-white bg-[#0F4C81] border-none flex items-center justify-center gap-2 cursor-pointer no-underline"
                    >
                      <span>{t('schedule') || 'Schedule Consultation'}</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* Language Mobile Dropdown Panel Overlay */}
        {isMobileLangOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 w-full max-w-xs shadow-2xl border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-550 uppercase tracking-wider">{locale === 'es' ? 'Seleccionar Idioma' : 'Select Language'}</h3>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full py-3 px-4 rounded-2xl border text-sm font-bold text-left transition-all ${
                      locale === lang.code ? 'bg-[#0F4C81] border-[#0F4C81] text-white' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsMobileLangOpen(false)}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-700 font-bold uppercase tracking-widest pt-2 cursor-pointer bg-transparent border-none"
              >
                {locale === 'es' ? 'Cerrar' : 'Close'}
              </button>
            </div>
          </div>
        )}
    </>
  );
}
