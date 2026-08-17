'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { HeroBanner } from '@/components/hero-banner';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  ChevronRight, 
  ArrowRight, 
  Cpu, 
  Loader2,
  X,
  Brain,
  Code,
  Globe,
  Smartphone,
  Cloud,
  Users,
  Shuffle,
  Database,
  Lock,
  Palette,
  TrendingUp,
  ShoppingCart,
  Lightbulb,
  HeartPulse,
  Building2,
  ShoppingBag,
  Factory,
  GraduationCap,
  Truck,
  Hotel,
  HardHat,
  Scale,
  FileText,
  Building,
  Terminal,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Activity,
  Maximize,
  Sparkles,
  Layers,
  ChevronDown,
  ArrowUp
} from 'lucide-react';
import { getServiceDetails, SERVICE_REGISTRY } from '@/lib/services-details';
import { SERVICES_CATALOG } from '@/lib/services-data';

// Industry Icon Mapping for "Industries We Serve" section
const INDUSTRY_ICON_MAP: Record<string, any> = {
  healthcare: HeartPulse,
  finance: Building2,
  retail: ShoppingBag,
  manufacturing: Factory,
  education: GraduationCap,
  logistics: Truck,
  hospitality: Hotel,
  construction: HardHat,
  legal: Scale,
  pharma: FileText,
  government: Building,
  technology: Terminal
};

// Lucide icon mapping for the 13 Categories
const CATEGORY_ICON_MAP: Record<string, any> = {
  'ai-automation': Brain,
  'software-development': Code,
  'web-development': Globe,
  'mobile-development': Smartphone,
  'cloud-devops': Cloud,
  'talent-solutions': Users,
  'digital-transformation': Shuffle,
  'data-analytics': Database,
  'cybersecurity': Lock,
  'ui-ux-design': Palette,
  'digital-marketing': TrendingUp,
  'ecommerce': ShoppingCart,
  'technology-consulting': Lightbulb
};

// Unique background image mapping for the 13 Categories
const CATEGORY_IMAGE_MAP: Record<string, string> = {
  'ai-automation': '/images/ai-automation.png',
  'software-development': '/images/software-development.png',
  'web-development': '/images/web-development.png',
  'mobile-development': '/images/mobile-development.png',
  'cloud-devops': '/images/cloud-infrastructure.png',
  'talent-solutions': '/images/staffing-team.png',
  'digital-transformation': '/images/digital-transformation.png',
  'data-analytics': '/images/case-study-dashboard.png',
  'cybersecurity': '/images/cybersecurity.png',
  'ui-ux-design': '/images/ui-ux-design.png',
  'digital-marketing': '/images/digital-marketing.png',
  'ecommerce': '/images/ecommerce.png',
  'technology-consulting': '/images/contact-office.png'
};

// Lucide icon mapping for Services
const SERVICE_ICON_MAP: Record<string, any> = {
  Sparkles: Sparkles,
  Layers: Layers,
  Globe: Globe,
  Smartphone: Smartphone,
  Cloud: Cloud,
  Users: Users,
  Shuffle: Shuffle,
  Database: Database,
  ShieldCheck: ShieldCheck,
  Palette: Palette,
  TrendingUp: TrendingUp,
  ShoppingCart: ShoppingCart,
  Lightbulb: Lightbulb
};

// Custom capability badges for display on the cards as backup tags
const CAPABILITY_BADGES: Record<string, string[]> = {
  'ai-automation': ['Generative AI', 'RAG Pipelines', 'Voice Agents', 'AI Chatbots', 'LLM Tuning', 'Agentic Workflows'],
  'software-development': ['Next.js', 'Node.js', 'C#/.NET', 'Kubernetes', 'SaaS MVPs', 'Enterprise ERP'],
  'web-development': ['Next.js', 'TailwindCSS', 'Headless CMS', 'GraphQL', 'Customer Portals', 'Storybook'],
  'mobile-development': ['iOS Swift', 'Android Kotlin', 'Flutter', 'React Native', 'Mobile UX', 'App Store Deploy'],
  'cloud-devops': ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform IaC', 'CI/CD Pipelines'],
  'talent-solutions': ['Permanent Hiring', 'Staff Augmentation', 'Executive Search', 'Dedicated Squads', 'Tech Screening'],
  'digital-transformation': ['Workflow Automation', 'Zapier/Make.com', 'n8n', 'Legacy Migrations', 'System Audits'],
  'data-analytics': ['Power BI Dashboards', 'Snowflake Lakes', 'BigQuery', 'dbt Pipelines', 'DAX / SQL', 'ETL Modeling'],
  'cybersecurity': ['Penetration Testing', 'SOC 2 Audits', 'HIPAA Compliance', 'Vulnerability Scans', 'IAM Management'],
  'ui-ux-design': ['Design Systems', 'UX Research', 'Figma Prototyping', 'Wireframes', 'Heuristic Audits'],
  'digital-marketing': ['Technical SEO', 'Content Strategy', 'Google Search Console', 'LinkedIn Ads', 'Email Campaigns'],
  'ecommerce': ['Shopify Liquid', 'Hydrogen Headless', 'Stripe Integration', 'Order Management', 'Klaviyo Flows'],
  'technology-consulting': ['CTO Advisory', 'Architecture Blueprints', 'Technical Debt Audits', 'Sourcing Strategy']
};

function SolutionsPageContent() {
  const t = useTranslations('SolutionsPage');
  const tNav = useTranslations('Navigation');
  const tAi = useTranslations('AIConsultant');
  const tc = useTranslations('Common');
  const tSolutions = useTranslations('Solutions');
  const locale = useLocale();

  // Selected Drawer details
  const [selectedCategory, setSelectedCategory] = useState<{
    cat: any;
    catTitle: string;
    IconComponent: any;
  } | null>(null);

  // Active section for Scrollspy highlighting
  const [activeSection, setActiveSection] = useState('ai-automation');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showMobileStickyBtn, setShowMobileStickyBtn] = useState(false);
  
  // Mobile accordion collapse states (first open by default)
  const [collapsedCats, setCollapsedCats] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initialCollapse: Record<string, boolean> = {};
    SERVICES_CATALOG.forEach((cat, idx) => {
      initialCollapse[cat.id] = idx !== 0;
    });
    setCollapsedCats(initialCollapse);
  }, []);

  // Monitor scroll for Scrollspy, Back to Top, and Mobile Sticky Button
  useEffect(() => {
    const handleScroll = () => {
      // Back to top visibility
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // Mobile sticky CTA visibility
      if (window.scrollY > 400) {
        setShowMobileStickyBtn(true);
      } else {
        setShowMobileStickyBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Scrollspy Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0.1
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    SERVICES_CATALOG.forEach(cat => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Smooth scroll helper accounting for fixed header height
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // offset for sticky navigation
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Helper to translate categories
  const getCategoryTitle = (id: string) => {
    const keyMap: Record<string, string> = {
      'ai-automation': 'aiAutomation',
      'software-development': 'softwareDev',
      'web-development': 'webDev',
      'mobile-development': 'mobileDev',
      'cloud-devops': 'cloudDevOps',
      'talent-solutions': 'talentSolutions',
      'digital-transformation': 'digitalTrans',
      'data-analytics': 'dataAnalytics',
      'cybersecurity': 'cybersecurity',
      'ui-ux-design': 'uiUx',
      'digital-marketing': 'marketing',
      'ecommerce': 'ecommerce',
      'technology-consulting': 'techConsulting'
    };
    return tNav(keyMap[id] || 'techConsulting');
  };

  // Helper to retrieve related service title
  const getRelatedName = (slug: string) => {
    const reg = SERVICE_REGISTRY[slug];
    if (!reg) return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return locale === 'es' ? reg.esName : reg.enName;
  };

  // Helper to generate mock case studies dynamically by category ID
  const getCaseStudySummary = (catId: string, isEs: boolean) => {
    const caseStudies: Record<string, { en: string; es: string }> = {
      'ai-automation': {
        en: "A leading logistics provider automated 85% of customer support intake using our custom RAG-driven voice agents, reducing queue latency by 12 minutes.",
        es: "Un proveedor logístico líder automatizó el 85% del soporte mediante agentes de voz RAG, reduciendo la latencia de espera en 12 minutos."
      },
      'software-development': {
        en: "Engineered a bespoke SaaS platform supporting 1M+ active telemetry streams with sub-second API endpoints and integrated Stripe billing.",
        es: "Diseñó una plataforma SaaS personalizada que soporta más de 1M de flujos de telemetría con endpoints API de subsegundo y facturación Stripe."
      },
      'web-development': {
        en: "Delivered a headless corporate website optimized with Next.js, boosting search indexation by 45% and PageSpeed score to 98/100.",
        es: "Entregó un sitio web corporativo headless optimizado con Next.js, impulsando la indexación de búsqueda en un 45% y la puntuación PageSpeed a 98/100."
      },
      'cloud-devops': {
        en: "Orchestrated zero-downtime cloud migration, structuring container pods with Kubernetes to yield 30% cost efficiency.",
        es: "Orquestó una migración a la nube con cero tiempo de inactividad, estructurando pods de Kubernetes para lograr un 30% de eficiencia de costos."
      },
      'talent-solutions': {
        en: "Deployed a dedicated squad of Next.js and Go SRE engineers within 8 business days, accelerating project delivery by 3 months.",
        es: "Desplegó un equipo dedicado de ingenieros Next.js y Go SRE en 8 días hábiles, acelerando la entrega del proyecto por 3 meses."
      },
      'data-analytics': {
        en: "Integrated Snowflake data lakes with custom Power BI dashboards, enabling real-time supply chain inventory monitoring.",
        es: "Integró lagos de datos de Snowflake con paneles de Power BI, permitiendo el monitoreo de inventario de cadena de suministro en tiempo real."
      },
      'cybersecurity': {
        en: "Conducted pentesting and compliance mapping for a digital healthcare provider, securing SOC 2 and HIPAA certifications.",
        es: "Realizó pruebas de penetración y mapeo de cumplimiento para un proveedor de salud, asegurando certificaciones SOC 2 e HIPAA."
      },
      'technology-consulting': {
        en: "Served as virtual CTO for a scale-up fintech client, structuring their engineering roadmap and reducing cloud overspend by $150K/year.",
        es: "Actuó como CTO virtual para una fintech a escala, estructurando su roadmap de ingeniería y reduciendo el sobrecosto en la nube en $150K/año."
      }
    };
    return (caseStudies[catId] || caseStudies['software-development'])[isEs ? 'es' : 'en'];
  };

  const triggerOpenChat = () => {
    window.dispatchEvent(new CustomEvent('open-hypercode-chat'));
  };

  // Industries We Serve Dataset
  const industriesWeServe = [
    { id: 'healthcare', key: 'healthcare' },
    { id: 'finance', key: 'finance' },
    { id: 'retail', key: 'retail' },
    { id: 'manufacturing', key: 'manufacturing' },
    { id: 'education', key: 'education' },
    { id: 'logistics', key: 'logistics' },
    { id: 'hospitality', key: 'hospitality' },
    { id: 'construction', key: 'construction' },
    { id: 'legal', key: 'legal' },
    { id: 'pharma', key: 'pharma' },
    { id: 'government', key: 'government' },
    { id: 'technology', key: 'technology' }
  ];

  // Tech Ecosystem Groups
  const techEcosystem = [
    { name: 'Cloud', items: ['AWS', 'Azure', 'Google Cloud', 'Cloudflare'] },
    { name: 'AI & ML', items: ['OpenAI', 'Anthropic', 'HuggingFace', 'LangChain', 'TensorFlow', 'LlamaIndex'] },
    { name: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'GraphQL'] },
    { name: 'Backend', items: ['Node.js', 'Python', 'NestJS', 'Go', 'Java', '.NET'] },
    { name: 'Database', items: ['PostgreSQL', 'Supabase', 'Snowflake', 'BigQuery', 'Redis', 'MongoDB'] },
    { name: 'DevOps', items: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'ArgoCD'] },
    { name: 'Analytics', items: ['Power BI', 'dbt', 'Tableau', 'Looker'] }
  ];

  // Why HyperCode Advantages List
  const advantagesList = [
    { icon: Users, titleKey: 'why.engineersTitle', descKey: 'why.engineersDesc' },
    { icon: Zap, titleKey: 'why.deliveryTitle', descKey: 'why.deliveryDesc' },
    { icon: ShieldCheck, titleKey: 'why.securityTitle', descKey: 'why.securityDesc' },
    { icon: Maximize, titleKey: 'why.scalabilityTitle', descKey: 'why.scalabilityDesc' },
    { icon: Activity, titleKey: 'why.supportTitle', descKey: 'why.supportDesc' }
  ];

  const toggleMobileCollapse = (catId: string) => {
    setCollapsedCats(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  return (
    <main className="relative w-full bg-white text-left min-h-screen bg-dot-pattern">
      <Navigation />

      {/* Reusable Hero Banner */}
      <HeroBanner
        bgImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600"
        categoryLabel={locale === 'es' ? 'NUESTRAS SOLUCIONES' : 'OUR SOLUTIONS'}
        title={t('heroTitle')}
        titleHighlight=""
        subtitle={t('heroSubtitle')}
        breadcrumbs={[
          { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
          { label: locale === 'es' ? 'Soluciones' : 'Solutions' }
        ]}
      />

      {/* Key Statistics Grid Section */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="space-y-1">
              <span className="block text-h1 text-royal-blue leading-none">{t('stats.retentionNum')}</span>
              <span className="block text-eyebrow text-slate-500">{t('stats.retentionLabel')}</span>
            </div>
            <div className="space-y-1">
              <span className="block text-h1 text-royal-blue leading-none">{t('stats.deploymentsNum')}</span>
              <span className="block text-eyebrow text-slate-500">{t('stats.deploymentsLabel')}</span>
            </div>
            <div className="space-y-1">
              <span className="block text-h1 text-royal-blue leading-none">{t('stats.onboardingNum')}</span>
              <span className="block text-eyebrow text-slate-500">{t('stats.onboardingLabel')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Sticky Sidebar + Category Sections */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Desktop Sticky Navigation Sidebar */}
          <aside className="col-span-3 sticky top-28 h-fit max-h-[80vh] overflow-y-auto pr-4 hidden lg:block scrollbar-thin">
            <div className="space-y-6">
              <div>
                <span className="text-eyebrow text-slate-400 block mb-1">
                  {locale === 'es' ? 'Navegación de Soluciones' : 'Solutions Navigation'}
                </span>
                <h4 className="text-h4 text-slate-900">
                  {locale === 'es' ? 'Áreas de Práctica' : 'Practice Areas'}
                </h4>
              </div>
              
              <nav className="space-y-1">
                {SERVICES_CATALOG.map((category) => {
                  const CategoryIcon = CATEGORY_ICON_MAP[category.id] || Cpu;
                  const categoryTitle = getCategoryTitle(category.id);
                  const isActive = activeSection === category.id;

                  return (
                    <button
                      key={category.id}
                      onClick={() => scrollToSection(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all group border-none cursor-pointer ${
                        isActive 
                          ? 'bg-royal-blue/10 text-royal-blue font-bold' 
                          : 'text-slate-600 hover:bg-slate-100/50 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-1.5 rounded-lg transition-colors ${
                          isActive 
                            ? 'bg-royal-blue text-white' 
                            : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                        }`}>
                          <CategoryIcon size={16} />
                        </div>
                        <span className="text-body-sm font-bold truncate">{categoryTitle}</span>
                      </div>
                      <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-all ${
                        isActive ? 'opacity-100 text-royal-blue' : 'text-slate-400'
                      }`} />
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Right Content Column */}
          <div className="col-span-1 lg:col-span-9 space-y-24">
            {SERVICES_CATALOG.map((category, catIdx) => {
              const CategoryIcon = CATEGORY_ICON_MAP[category.id] || Cpu;
              const categoryTitle = getCategoryTitle(category.id);
              const categoryDesc = t(`categories.${category.id}.desc`);
              const isCollapsed = collapsedCats[category.id] ?? false;

              return (
                <div key={category.id} className="space-y-12">
                  {/* Category Anchor ID for Scrollspy & Native Offsets */}
                  <div id={category.id} className="scroll-mt-28" />

                  {/* Interleaved CTA 1: After Category 4 (Mobile Apps) */}
                  {catIdx === 4 && (
                    <div className="p-8 rounded-[24px] bg-gradient-to-r from-slate-900 to-royal-blue text-white space-y-6 shadow-xl relative overflow-hidden my-12 text-left">
                      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                      <div className="max-w-2xl space-y-3 relative z-10">
                        <span className="text-eyebrow text-blue-300">
                          {locale === 'es' ? '¿TIENE UN PROYECTO EN MENTE?' : 'HAVE A PROJECT IN MIND?'}
                        </span>
                        <h4 className="text-h3 text-white">
                          {locale === 'es' 
                            ? 'Acelere su desarrollo de software con ingenieros expertos' 
                            : 'Accelerate your software roadmap with dedicated engineering squads'}
                        </h4>
                        <p className="text-body-sm text-slate-300">
                          {locale === 'es'
                            ? 'Ofrecemos soluciones personalizadas adaptadas a sus necesidades comerciales y de escala operativa.'
                            : 'We deploy certified SRE engineers and developers to architect custom systems under strict access controls.'}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3 relative z-10 pt-2">
                        <Link
                          href="/consultation"
                          className="PrimaryBrandButton"
                        >
                          {tNav('schedule')}
                        </Link>
                        <Link
                          href="/contact"
                          className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 text-button text-white rounded-xl transition-all"
                        >
                          {locale === 'es' ? 'Solicitar Propuesta' : 'Request Proposal'}
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Interleaved CTA 2: After Category 8 (Data Analytics) */}
                  {catIdx === 8 && (
                    <div className="p-8 rounded-[24px] bg-slate-900 border border-slate-800 text-white space-y-6 shadow-xl relative overflow-hidden my-12 text-left">
                      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                      <div className="max-w-2xl space-y-3 relative z-10">
                        <span className="text-eyebrow text-emerald-400">
                          {locale === 'es' ? 'INTELIGENCIA DE DATOS' : 'DATA INTELLIGENCE'}
                        </span>
                        <h4 className="text-h3 text-white">
                          {locale === 'es' 
                            ? 'Tome mejores decisiones basadas en datos e inteligencia empresarial' 
                            : 'Maximize performance with real-time analytics and data lakes'}
                        </h4>
                        <p className="text-body-sm text-slate-300">
                          {locale === 'es'
                            ? 'Integramos lagos de datos modernos con paneles interactivos de Power BI para el monitoreo de inventario y KPI.'
                            : 'We build scalable data warehousing pipelines and deploy custom business intelligence dashboards.'}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3 relative z-10 pt-2">
                        <button
                          onClick={triggerOpenChat}
                          className="px-5 py-2.5 bg-slate-800 hover:bg-slate-750 text-button text-white rounded-xl transition-all shadow border-none cursor-pointer"
                        >
                          {locale === 'es' ? 'Hablar con Consultor IA' : 'Talk to AI Consultant'}
                        </button>
                        <Link
                          href="/contact"
                          className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-button text-white rounded-xl transition-all"
                        >
                          {locale === 'es' ? 'Contactar Especialista' : 'Contact Specialist'}
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Section Title Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-150">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-100 text-royal-blue">
                        <CategoryIcon size={22} />
                      </div>
                      <div>
                        <span className="block text-eyebrow text-slate-400">
                          {category.services.length} {locale === 'es' ? 'Servicios Disponibles' : 'Services Available'}
                        </span>
                        <h3 className="text-h2 text-slate-900">
                          {categoryTitle}
                        </h3>
                      </div>
                    </div>

                    {/* Mobile Toggle Collapse Indicator */}
                    <button
                      onClick={() => toggleMobileCollapse(category.id)}
                      className="lg:hidden flex items-center justify-between gap-2 px-4 py-2 bg-slate-100 text-slate-600 text-body-sm font-semibold rounded-xl border-none cursor-pointer"
                    >
                      <span>{isCollapsed ? (locale === 'es' ? 'Mostrar' : 'Expand') : (locale === 'es' ? 'Ocultar' : 'Collapse')}</span>
                      <ChevronDown size={14} className={`transform transition-transform ${isCollapsed ? '' : 'rotate-180'}`} />
                    </button>
                  </div>

                  {/* Category Details Container (Grid view on desktop, Collapsible container on mobile) */}
                  <div className={`lg:block ${isCollapsed ? 'hidden' : 'block'}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      
                      {/* Left: Category Summary Cover Card */}
                      <div className="lg:col-span-4 bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm flex flex-col justify-between hover:border-slate-355 transition-all text-left relative overflow-hidden group">
                        <div className="space-y-4 relative z-10">
                          <p className="text-body text-slate-655">
                            {categoryDesc}
                          </p>
                          
                          {/* Image Thumbnail */}
                          <div className="relative w-full h-44 rounded-2xl overflow-hidden mt-4 shadow-inner border border-slate-100">
                            <Image
                              src={CATEGORY_IMAGE_MAP[category.id] || '/placeholder.jpg'}
                              alt={categoryTitle}
                              fill
                              sizes="(max-w-768px) 100vw, 300px"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent" />
                          </div>
                        </div>

                        <div className="pt-6 relative z-10">
                          <button
                            onClick={() => setSelectedCategory({ cat: category, catTitle: categoryTitle, IconComponent: CategoryIcon })}
                            className="w-full inline-flex items-center justify-center gap-1.5 py-3 bg-royal-blue/5 hover:bg-royal-blue/15 text-button text-royal-blue rounded-xl transition-all cursor-pointer border-none"
                          >
                            <span>{locale === 'es' ? 'Ver Detalles de la Práctica' : 'Explore Category Scope'}</span>
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Right: Grid of specific capabilities/services cards */}
                      <div className="lg:col-span-8">
                        {/* Desktop Services Grid (grid format) */}
                        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-6">
                          {category.services.map((srv) => {
                            const srvDetails = getServiceDetails(srv.id, locale);
                            const srvTitle = srvDetails ? srvDetails.title : t(`categories.${category.id}.services.${srv.id}.title`);
                            const srvDesc = srvDetails ? srvDetails.description : t(`categories.${category.id}.services.${srv.id}.desc`);
                            const srvPath = srvDetails ? `/solutions/${srv.id}` : srv.path;
                            const ServiceIcon = SERVICE_ICON_MAP[srv.iconName] || Cpu;

                            return (
                              <div
                                key={srv.id}
                                className="premium-card bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md hover:border-royal-blue/25 transition-all duration-300 h-full text-left group"
                              >
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-royal-blue group-hover:scale-105 transition-transform duration-300">
                                      <ServiceIcon size={18} />
                                    </div>
                                    <span className="text-eyebrow text-slate-400">
                                      {srv.tech[0] || 'Core Tech'}
                                    </span>
                                  </div>

                                  <h4 className="text-h3 text-slate-900 group-hover:text-royal-blue transition-colors">
                                    {srvTitle}
                                  </h4>

                                  <p className="text-body text-slate-655 line-clamp-3">
                                    {srvDesc}
                                  </p>

                                  {/* Outcomes Highlights */}
                                  {srvDetails?.features && srvDetails.features.length > 0 && (
                                    <ul className="space-y-1.5 pt-2 border-t border-slate-100">
                                      {srvDetails.features.slice(0, 2).map((feat: any, idx: number) => (
                                        <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                                          <CheckCircle size={11} className="text-emerald-500 shrink-0 mt-0.5" />
                                          <span className="font-medium line-clamp-1">{feat.title}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}

                                  {/* Technologies Stack Tags */}
                                  <div className="flex flex-wrap gap-1 pt-2">
                                    {srv.tech.slice(0, 3).map((techItem, idx) => (
                                      <span key={idx} className="px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-md text-[10px] font-semibold">
                                        {techItem}
                                      </span>
                                    ))}
                                    {srv.tech.length > 3 && (
                                      <span className="px-2 py-0.5 bg-slate-50 text-slate-400 rounded-md text-[10px] font-semibold">
                                        +{srv.tech.length - 3}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between">
                                  <Link
                                    href={srvPath}
                                    className="text-button text-royal-blue hover:underline flex items-center gap-1.5"
                                  >
                                    <span>{locale === 'es' ? 'Ver Detalles' : 'Learn More'}</span>
                                    <ArrowRight size={12} />
                                  </Link>
                                  <Link
                                    href={`/contact?service=${encodeURIComponent(srvTitle)}`}
                                    className="p-1.5 bg-slate-50 hover:bg-royal-blue/10 text-slate-400 hover:text-royal-blue rounded-lg transition-colors border-none"
                                  >
                                    <ArrowUpRight size={14} />
                                  </Link>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Mobile Services Carousel (horizontal scroll, touch optimized) */}
                        <div className="lg:hidden flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none px-4 -mx-4">
                          {category.services.map((srv) => {
                            const srvDetails = getServiceDetails(srv.id, locale);
                            const srvTitle = srvDetails ? srvDetails.title : t(`categories.${category.id}.services.${srv.id}.title`);
                            const srvDesc = srvDetails ? srvDetails.description : t(`categories.${category.id}.services.${srv.id}.desc`);
                            const srvPath = srvDetails ? `/solutions/${srv.id}` : srv.path;
                            const ServiceIcon = SERVICE_ICON_MAP[srv.iconName] || Cpu;

                            return (
                              <div
                                key={srv.id}
                                className="snap-center shrink-0 w-[80vw] max-w-[280px] bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between shadow-sm text-left"
                              >
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-royal-blue">
                                      <ServiceIcon size={16} />
                                    </div>
                                    <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase">
                                      {srv.tech[0] || 'Core Tech'}
                                    </span>
                                  </div>

                                  <h4 className="text-h3 text-slate-900">
                                    {srvTitle}
                                  </h4>

                                  <p className="text-body text-slate-655 line-clamp-3">
                                    {srvDesc}
                                  </p>

                                  <div className="flex flex-wrap gap-1 pt-1">
                                    {srv.tech.slice(0, 2).map((techItem, idx) => (
                                      <span key={idx} className="px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-600 rounded text-[9px] font-semibold">
                                        {techItem}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
                                  <Link
                                    href={srvPath}
                                    className="text-button text-royal-blue hover:underline flex items-center gap-1"
                                  >
                                    <span>{locale === 'es' ? 'Ver Detalles' : 'Learn More'}</span>
                                    <ArrowRight size={10} />
                                  </Link>
                                  <Link
                                    href={`/contact?service=${encodeURIComponent(srvTitle)}`}
                                    className="p-1.5 bg-slate-50 hover:bg-royal-blue/10 text-slate-400 hover:text-royal-blue rounded-lg transition-colors border-none"
                                  >
                                    <ArrowUpRight size={12} />
                                  </Link>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                      </div>
                    </div>

                    {/* Related Services Chips Footer inside Category */}
                    <div className="pt-8 border-t border-slate-100 mt-8 text-left">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-eyebrow text-slate-450 mr-2">
                          {locale === 'es' ? 'Relacionado:' : 'Related:'}
                        </span>
                        
                        {useMemo(() => {
                          const slugs = new Set<string>();
                          category.services.forEach(s => s.related?.forEach(r => slugs.add(r)));
                          return Array.from(slugs).slice(0, 5);
                        }, [category]).map((relSlug, idx) => {
                          const relPath = SERVICE_REGISTRY[relSlug] ? `/solutions/${relSlug}` : `/solutions`;
                          return (
                            <Link
                              key={idx}
                              href={relPath}
                              className="px-3 py-1 bg-slate-100 hover:bg-royal-blue/10 text-slate-650 hover:text-royal-blue rounded-full text-body-sm font-semibold transition-all"
                            >
                              {getRelatedName(relSlug)}
                            </Link>
                          );
                        })}
                    </div>

                  </div>

                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Ecosystem Section */}
      <section 
        className="py-16 md:py-24 relative z-10 border-t border-b border-slate-200 overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(135deg, #F8FBFF 0%, #FFFFFF 50%, #F7FCF9 100%)'
        }}
      >
        {/* Faint ambient background glows */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-royal-blue/5 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-green/3 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 w-full space-y-12">
          {/* Header block aligned with global content container */}
          <div className="max-w-[1100px] text-left space-y-4">
            <span className="text-xs font-bold text-royal-blue tracking-widest uppercase block">
              {t('techEcosystemTitle')}
            </span>
            <h3 className="text-3xl sm:text-[clamp(42px,4vw,64px)] font-black text-slate-900 leading-[1.1] tracking-tight">
              {t('techEcosystemSubtitle')}
            </h3>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {techEcosystem.map((group, idx) => {
              let CategoryIcon = Cpu;
              if (group.name === 'Cloud') CategoryIcon = Cloud;
              else if (group.name === 'AI & ML') CategoryIcon = Brain;
              else if (group.name === 'Frontend') CategoryIcon = Code;
              else if (group.name === 'Backend') CategoryIcon = Terminal;
              else if (group.name === 'Database') CategoryIcon = Database;
              else if (group.name === 'DevOps') CategoryIcon = Layers;
              else if (group.name === 'Analytics') CategoryIcon = TrendingUp;

              return (
                <div 
                  key={idx} 
                  className="bg-[#F8FAFC]/90 border border-slate-200/80 rounded-[24px] p-7 md:p-8 text-left min-h-[260px] flex flex-col justify-between hover:-translate-y-1 hover:border-royal-blue/30 hover:bg-[#F4F8FF]/80 hover:shadow-md transition-all duration-300 ease-in-out group shadow-2xs select-none"
                >
                  <div className="space-y-5">
                    {/* Header with name and category icon */}
                    <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                        {group.name}
                      </h4>
                      <CategoryIcon size={15} className="text-royal-blue group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    {/* Wrapping Technology Chips */}
                    <div className="flex flex-wrap gap-2.5">
                      {group.items.map((item, itemIdx) => (
                        <span 
                          key={itemIdx} 
                          className="px-3.5 py-2 bg-white border border-[#DDE6F2] hover:border-royal-blue/40 text-slate-700 rounded-full text-sm font-semibold tracking-tight transition-colors duration-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries We Serve Section */}
      <section 
        className="relative py-20 md:py-24 z-10 border-t border-b border-slate-200 overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(135deg, #F5F9FF 0%, #FFFFFF 48%, #F4FBF7 100%)'
        }}
      >
        {/* Pale light ambient glows */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-royal-blue/5 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-green/3 rounded-full blur-[100px] pointer-events-none -z-10" />
        
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 relative z-10 w-full space-y-12">
          {/* Header container */}
          <div className="max-w-[1100px] text-left space-y-4">
            <span className="text-xs font-bold text-royal-blue tracking-widest uppercase block">{t('industriesTitle')}</span>
            <h3 className="text-3xl sm:text-[clamp(42px,4vw,64px)] font-black text-slate-900 leading-[1.08] tracking-tight">{t('industriesSubtitle')}</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industriesWeServe.map((ind) => {
              const IndIcon = INDUSTRY_ICON_MAP[ind.id] || Building;
              const indTitle = t(`industriesList.${ind.key}.title`);
              const indDesc = t(`industriesList.${ind.key}.desc`);

              // Define individual pale industry accents
              const getIndustryAccent = (id: string) => {
                const mapping: Record<string, { bg: string; border: string; text: string; topLine: string }> = {
                  healthcare: { bg: 'bg-blue-50/60', border: 'border-blue-100', text: 'text-blue-600', topLine: 'from-blue-400 to-cyan-300' },
                  finance: { bg: 'bg-cyan-50/60', border: 'border-cyan-100', text: 'text-cyan-600', topLine: 'from-cyan-400 to-teal-300' },
                  retail: { bg: 'bg-green-50/60', border: 'border-green-100', text: 'text-green-600', topLine: 'from-green-400 to-emerald-300' },
                  manufacturing: { bg: 'bg-teal-50/60', border: 'border-teal-100', text: 'text-teal-600', topLine: 'from-teal-400 to-emerald-300' },
                  education: { bg: 'bg-indigo-50/60', border: 'border-indigo-100', text: 'text-indigo-600', topLine: 'from-indigo-400 to-blue-300' },
                  logistics: { bg: 'bg-sky-50/60', border: 'border-sky-100', text: 'text-sky-600', topLine: 'from-sky-400 to-blue-300' },
                  hospitality: { bg: 'bg-rose-50/60', border: 'border-rose-100', text: 'text-rose-600', topLine: 'from-rose-400 to-orange-300' },
                  construction: { bg: 'bg-amber-50/60', border: 'border-amber-100', text: 'text-amber-600', topLine: 'from-amber-400 to-yellow-300' },
                  legal: { bg: 'bg-slate-100/60', border: 'border-slate-200', text: 'text-slate-700', topLine: 'from-slate-500 to-slate-400' },
                  pharma: { bg: 'bg-emerald-50/60', border: 'border-emerald-100', text: 'text-emerald-600', topLine: 'from-emerald-400 to-teal-300' },
                  government: { bg: 'bg-blue-100/60', border: 'border-blue-200', text: 'text-blue-700', topLine: 'from-blue-600 to-indigo-500' },
                  technology: { bg: 'bg-royal-blue/10', border: 'border-royal-blue/20', text: 'text-royal-blue', topLine: 'from-royal-blue to-green' }
                };
                return mapping[id] || { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-royal-blue', topLine: 'from-royal-blue to-cyan-400' };
              };

              const accent = getIndustryAccent(ind.id);

              return (
                <div 
                  key={ind.id} 
                  className="relative p-8 rounded-[24px] bg-white/88 border border-[#DDE7F2] flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 group text-left shadow-2xs select-none"
                  style={{
                    boxShadow: '0 12px 35px rgba(15, 23, 42, 0.06)'
                  }}
                >
                  {/* Subtle top border line on card hover */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accent.topLine} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-[24px]`} />

                  <div className="space-y-4">
                    <div className={`p-3 w-fit rounded-xl ${accent.bg} border ${accent.border} ${accent.text} group-hover:scale-105 transition-transform duration-300`}>
                      <IndIcon size={20} />
                    </div>
                    <h4 className="text-lg font-black text-slate-900 tracking-tight">{indTitle}</h4>
                    <p className="text-sm font-semibold text-slate-500 leading-relaxed">{indDesc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose HyperCode Section */}
      <section className="py-28 bg-[#F8FAFC] relative z-10 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-eyebrow text-royal-blue block">{t('why.title')}</span>
            <h3 className="text-h2 text-slate-900">{t('why.subtitle')}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantagesList.map((adv, idx) => {
              const AdvIcon = adv.icon;
              return (
                <div key={idx} className="premium-card bg-white p-8 rounded-[24px] border border-slate-200 shadow-sm space-y-4 text-left hover:border-slate-355 transition-colors duration-300">
                  <div className="p-3 rounded-xl bg-royal-blue/10 text-royal-blue w-fit">
                    <AdvIcon size={20} />
                  </div>
                  <h4 className="text-h3 text-slate-900">{t(adv.titleKey)}</h4>
                  <p className="text-body text-slate-655">{t(adv.descKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

        {/* FAQ Accordion Section */}
        <section className="py-24 bg-white relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-eyebrow text-royal-blue block">{t('faqTitle')}</span>
            <h3 className="text-h2 text-slate-900">{t('faqSubtitle')}</h3>
          </div>

          <div className="space-y-4">
            {[
              { q: tSolutions('faqQ1'), a: tSolutions('faqA1') },
              { q: tSolutions('faqQ2'), a: tSolutions('faqA2') },
              { q: tSolutions('faqQ3'), a: tSolutions('faqA3') }
            ].map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-[#F8FAFC]">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 text-body font-bold text-slate-800 cursor-pointer list-none hover:bg-slate-50 select-none">
                    <span>{faq.q}</span>
                    <ChevronRight size={18} className="transform transition-transform group-open:rotate-90 text-slate-450" />
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-body text-slate-655 border-t border-slate-100 text-left">
                    {faq.a}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative z-10 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h3 className="text-h2 text-slate-900">{t('ctaSectionTitle')}</h3>
          <p className="text-body text-slate-655 max-w-2xl mx-auto">
            {t('ctaSectionSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/consultation"
              className="PrimaryBrandButton w-full sm:w-auto"
            >
              {t('ctaBtn')}
            </Link>
            <button
              onClick={triggerOpenChat}
              className="inline-flex items-center justify-center h-12 px-8 bg-slate-900 hover:bg-slate-800 text-white text-button rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer w-full sm:w-auto border-none"
            >
              {tAi('title') || 'Talk to AI Consultant'}
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Desktop Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-6 z-40 p-3 bg-royal-blue text-white rounded-full shadow-xl hover:bg-deep-navy transition-colors border-none cursor-pointer hidden lg:block"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Action Button */}
      <AnimatePresence>
        {showMobileStickyBtn && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="lg:hidden fixed bottom-6 left-0 right-0 z-40 px-4 pointer-events-none"
          >
            <div className="max-w-md mx-auto pointer-events-auto shadow-2xl rounded-xl">
              <Link
                href="/consultation"
                className="PrimaryBrandButton w-full"
              >
                {tNav('schedule')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Enterprise Details Drawer (Sheet) */}
      <AnimatePresence>
        {selectedCategory && (
          <>
            {/* Dark Overlay Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950 backdrop-blur-sm z-50 cursor-pointer"
              onClick={() => setSelectedCategory(null)}
            />

            {/* Slide-in Details Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 180 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-white shadow-2xl z-50 overflow-y-auto border-l border-slate-200 p-8 md:p-12 flex flex-col justify-between"
            >
              <div className="space-y-8 text-left">
                {/* Header block */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-royal-blue">
                      <selectedCategory.IconComponent size={22} />
                    </div>
                    <div>
                      <span className="block text-eyebrow text-slate-450">{t('drawerTitle')}</span>
                      <h3 className="text-h3 text-slate-900">
                        {selectedCategory.catTitle}
                      </h3>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors border-none cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Section 1: Overview */}
                <div className="space-y-3">
                  <h4 className="text-eyebrow text-slate-400">{t('drawerTitle')}</h4>
                  <p className="text-slate-700 text-body bg-slate-50 border border-slate-200 p-5 rounded-2xl shadow-sm">
                    {t(`categories.${selectedCategory.cat.id}.desc`)}
                  </p>
                </div>

                {/* Section 2: Specific capabilities */}
                <div className="space-y-4">
                  <h4 className="text-eyebrow text-slate-400">{tc('detailedCapabilities')}</h4>
                  <div className="space-y-4">
                    {selectedCategory.cat.services.map((srv: any) => {
                      const srvDetails = getServiceDetails(srv.id, locale);
                      const srvTitle = srvDetails ? srvDetails.title : t(`categories.${selectedCategory.cat.id}.services.${srv.id}.title`);
                      const srvDesc = srvDetails ? srvDetails.description : t(`categories.${selectedCategory.cat.id}.services.${srv.id}.desc`);
                      const srvPath = srvDetails ? `/solutions/${srv.id}` : srv.path;

                      return (
                        <div key={srv.id} className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm space-y-3 text-left">
                          <h5 className="text-body font-bold text-slate-900">{srvTitle}</h5>
                          <p className="text-body-sm text-slate-555 leading-relaxed">{srvDesc}</p>
                          
                          {/* Link to dedicated landing page */}
                          <div className="pt-2 border-t border-slate-100/50 mt-1 flex items-center justify-between">
                            <Link 
                              href={srvPath}
                              onClick={() => setSelectedCategory(null)}
                              className="text-button text-royal-blue hover:underline flex items-center gap-1"
                            >
                              <span>{t('viewServiceDetails')}</span>
                              <ArrowRight size={12} />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section 3: Technologies Used */}
                <div className="space-y-3">
                  <h4 className="text-eyebrow text-slate-400">{tc('technologies')}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {useMemo(() => {
                      const techs = new Set<string>();
                      selectedCategory.cat.services.forEach((srv: any) => srv.tech.forEach((tech: string) => techs.add(tech)));
                      return Array.from(techs);
                    }, [selectedCategory]).map((tech, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-royal-blue/5 border border-royal-blue/15 text-eyebrow text-royal-blue rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Section 4: Target Industries */}
                <div className="space-y-3">
                  <h4 className="text-eyebrow text-slate-400">{tc('industries')}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {useMemo(() => {
                      const inds = new Set<string>();
                      selectedCategory.cat.services.forEach((srv: any) => {
                        const translatedInds = t.raw(`categories.${selectedCategory.cat.id}.services.${srv.id}.industries`) as string[];
                        translatedInds.forEach(ind => inds.add(ind));
                      });
                      return Array.from(inds);
                    }, [selectedCategory]).map((ind, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-royal-blue/5 border border-royal-blue/15 text-body-sm font-bold text-royal-blue rounded-lg">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Section 5: Case Study Success */}
                <div className="p-6.5 rounded-2xl bg-slate-900 text-white relative overflow-hidden border border-slate-800 shadow-md text-left">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-royal-blue/25 rounded-full blur-xl pointer-events-none" />
                  <div className="space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-royal-blue/30 text-eyebrow text-blue-200">
                      {t('caseStudyLabel')}
                    </span>
                    <p className="text-body-sm text-slate-300">
                      {getCaseStudySummary(selectedCategory.cat.id, locale === 'es')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Drawer footer actions */}
              <div className="flex items-center gap-4 pt-8 border-t border-slate-200 mt-10">
                <Link
                  href={`/consultation?service=${encodeURIComponent(selectedCategory.catTitle)}`}
                  className="flex-1 inline-flex items-center justify-center h-12 bg-royal-blue hover:bg-deep-navy text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                  onClick={() => setSelectedCategory(null)}
                >
                  {tc('solutions') || 'Request Consultation'}
                </Link>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-6 h-12 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm uppercase tracking-wider rounded-xl transition-all cursor-pointer border-none"
                >
                  {tc('close')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function SolutionsPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-royal-blue" size={40} />
      </div>
    }>
      <SolutionsPageContent />
    </Suspense>
  );
}
