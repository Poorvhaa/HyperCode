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
              <span className="block text-4xl sm:text-5xl font-black text-[#0F4C81] tracking-tight">{t('stats.retentionNum')}</span>
              <span className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">{t('stats.retentionLabel')}</span>
            </div>
            <div className="space-y-1">
              <span className="block text-4xl sm:text-5xl font-black text-[#0F4C81] tracking-tight">{t('stats.deploymentsNum')}</span>
              <span className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">{t('stats.deploymentsLabel')}</span>
            </div>
            <div className="space-y-1">
              <span className="block text-4xl sm:text-5xl font-black text-[#0F4C81] tracking-tight">{t('stats.onboardingNum')}</span>
              <span className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">{t('stats.onboardingLabel')}</span>
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
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  {locale === 'es' ? 'Navegación de Soluciones' : 'Solutions Navigation'}
                </span>
                <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
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
                          ? 'bg-[#0F4C81]/10 text-[#0F4C81] font-bold' 
                          : 'text-slate-600 hover:bg-slate-100/50 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-1.5 rounded-lg transition-colors ${
                          isActive 
                            ? 'bg-[#0F4C81] text-white' 
                            : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                        }`}>
                          <CategoryIcon size={16} />
                        </div>
                        <span className="text-xs truncate tracking-wide">{categoryTitle}</span>
                      </div>
                      <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-all ${
                        isActive ? 'opacity-100 text-[#0F4C81]' : 'text-slate-400'
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
                    <div className="p-8 rounded-[24px] bg-gradient-to-r from-slate-900 to-[#0F4C81] text-white space-y-6 shadow-xl relative overflow-hidden my-12 text-left">
                      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                      <div className="max-w-2xl space-y-3 relative z-10">
                        <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">
                          {locale === 'es' ? '¿TIENE UN PROYECTO EN MENTE?' : 'HAVE A PROJECT IN MIND?'}
                        </span>
                        <h4 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                          {locale === 'es' 
                            ? 'Acelere su desarrollo de software con ingenieros expertos' 
                            : 'Accelerate your software roadmap with dedicated engineering squads'}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                          {locale === 'es'
                            ? 'Ofrecemos soluciones personalizadas adaptadas a sus necesidades comerciales y de escala operativa.'
                            : 'We deploy certified SRE engineers and developers to architect custom systems under strict access controls.'}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3 relative z-10 pt-2">
                        <Link
                          href="/consultation"
                          className="px-5 py-2.5 bg-[#0F4C81] hover:bg-[#0D3F6D] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow"
                        >
                          {locale === 'es' ? 'Agendar Consulta' : 'Schedule Consultation'}
                        </Link>
                        <Link
                          href="/contact"
                          className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
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
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                          {locale === 'es' ? 'INTELIGENCIA DE DATOS' : 'DATA INTELLIGENCE'}
                        </span>
                        <h4 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                          {locale === 'es' 
                            ? 'Tome mejores decisiones basadas en datos e inteligencia empresarial' 
                            : 'Maximize performance with real-time analytics and data lakes'}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                          {locale === 'es'
                            ? 'Integramos lagos de datos modernos con paneles interactivos de Power BI para el monitoreo de inventario y KPI.'
                            : 'We build scalable data warehousing pipelines and deploy custom business intelligence dashboards.'}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3 relative z-10 pt-2">
                        <button
                          onClick={triggerOpenChat}
                          className="px-5 py-2.5 bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow border-none cursor-pointer"
                        >
                          {locale === 'es' ? 'Hablar con Consultor IA' : 'Talk to AI Consultant'}
                        </button>
                        <Link
                          href="/contact"
                          className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                        >
                          {locale === 'es' ? 'Contactar Especialista' : 'Contact Specialist'}
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Section Title Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-150">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-100 text-[#0F4C81]">
                        <CategoryIcon size={22} />
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                          {category.services.length} {locale === 'es' ? 'Servicios Disponibles' : 'Services Available'}
                        </span>
                        <h3 className="text-[28px] font-bold text-slate-900 tracking-tight leading-[1.2]">
                          {categoryTitle}
                        </h3>
                      </div>
                    </div>

                    {/* Mobile Toggle Collapse Indicator */}
                    <button
                      onClick={() => toggleMobileCollapse(category.id)}
                      className="lg:hidden flex items-center justify-between gap-2 px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl border-none cursor-pointer"
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
                          <p className="text-[16px] text-slate-655 leading-[1.7] font-semibold">
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
                            className="w-full inline-flex items-center justify-center gap-1.5 py-3 bg-[#0F4C81]/5 hover:bg-[#0F4C81]/15 text-[#0F4C81] font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer border-none"
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
                                className="premium-card bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#0F4C81]/25 transition-all duration-300 h-full text-left group"
                              >
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[#0F4C81] group-hover:scale-105 transition-transform duration-300">
                                      <ServiceIcon size={18} />
                                    </div>
                                    <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase">
                                      {srv.tech[0] || 'Core Tech'}
                                    </span>
                                  </div>

                                  <h4 className="text-[22px] font-bold text-slate-900 leading-[1.2] group-hover:text-[#0F4C81] transition-colors">
                                    {srvTitle}
                                  </h4>

                                  <p className="text-[16px] text-slate-655 leading-[1.7] font-semibold line-clamp-3">
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
                                    className="text-[11px] font-bold text-[#0F4C81] hover:underline tracking-wider uppercase flex items-center gap-1.5"
                                  >
                                    <span>{locale === 'es' ? 'Ver Detalles' : 'Learn More'}</span>
                                    <ArrowRight size={12} />
                                  </Link>
                                  <Link
                                    href={`/contact?service=${encodeURIComponent(srvTitle)}`}
                                    className="p-1.5 bg-slate-50 hover:bg-[#0F4C81]/10 text-slate-400 hover:text-[#0F4C81] rounded-lg transition-colors border-none"
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
                                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-[#0F4C81]">
                                      <ServiceIcon size={16} />
                                    </div>
                                    <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase">
                                      {srv.tech[0] || 'Core Tech'}
                                    </span>
                                  </div>

                                  <h4 className="text-[22px] font-bold text-slate-900 leading-[1.2]">
                                    {srvTitle}
                                  </h4>

                                  <p className="text-slate-655 text-[16px] leading-[1.7] font-semibold line-clamp-3">
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
                                    className="text-[10px] font-bold text-[#0F4C81] hover:underline tracking-wider uppercase flex items-center gap-1"
                                  >
                                    <span>{locale === 'es' ? 'Ver Detalles' : 'Learn More'}</span>
                                    <ArrowRight size={10} />
                                  </Link>
                                  <Link
                                    href={`/contact?service=${encodeURIComponent(srvTitle)}`}
                                    className="p-1.5 bg-slate-50 hover:bg-[#0F4C81]/10 text-slate-400 hover:text-[#0F4C81] rounded-lg transition-colors border-none"
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
                        <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest mr-2">
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
                              className="px-3 py-1 bg-slate-100 hover:bg-[#0F4C81]/10 text-slate-650 hover:text-[#0F4C81] rounded-full text-xs font-semibold transition-all"
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
      <section className="py-24 bg-white relative z-10 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#0F4C81] uppercase tracking-widest">{t('techEcosystemTitle')}</span>
            <h3 className="text-[28px] sm:text-[32px] lg:text-[40px] font-black text-slate-900 tracking-tight leading-[1.2]">{t('techEcosystemSubtitle')}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techEcosystem.map((group, idx) => (
              <div key={idx} className="premium-card p-7 bg-[#F8FAFC] border border-slate-200 rounded-2xl text-left space-y-4 shadow-sm">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2">{group.name}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item, itemIdx) => (
                    <span key={itemIdx} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-655 rounded-lg text-xs font-semibold">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve Section */}
      <section className="relative bg-[#0F4C81] text-white py-28 z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          <div className="max-w-3xl space-y-4 text-left">
            <span className="text-xs font-bold text-blue-200 uppercase tracking-widest">{t('industriesTitle')}</span>
            <h3 className="text-[28px] sm:text-[32px] lg:text-[40px] font-black tracking-tight leading-[1.2]">{t('industriesSubtitle')}</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industriesWeServe.map((ind) => {
              const IndIcon = INDUSTRY_ICON_MAP[ind.id] || Building;
              const indTitle = t(`industriesList.${ind.key}.title`);
              const indDesc = t(`industriesList.${ind.key}.desc`);

              return (
                <div key={ind.id} className="p-8 rounded-[24px] bg-white/10 border border-white/10 shadow-sm flex flex-col justify-between hover:bg-white/15 transition-all duration-300 group text-left">
                  <div className="space-y-4">
                    <div className="p-3 w-fit rounded-xl bg-white/10 border border-white/5 text-blue-200 group-hover:scale-105 transition-all">
                      <IndIcon size={20} />
                    </div>
                    <h4 className="text-lg font-bold text-white tracking-tight">{indTitle}</h4>
                    <p className="text-xs text-blue-100 leading-relaxed font-medium">{indDesc}</p>
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
            <span className="text-xs font-bold text-[#0F4C81] uppercase tracking-widest">{t('why.title')}</span>
            <h3 className="text-[28px] sm:text-[32px] lg:text-[40px] font-black text-slate-900 tracking-tight leading-[1.2]">{t('why.subtitle')}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantagesList.map((adv, idx) => {
              const AdvIcon = adv.icon;
              return (
                <div key={idx} className="premium-card bg-white p-8 rounded-[24px] border border-slate-200 shadow-sm space-y-4 text-left hover:border-slate-355 transition-colors duration-300">
                  <div className="p-3 rounded-xl bg-[#0F4C81]/10 text-[#0F4C81] w-fit">
                    <AdvIcon size={20} />
                  </div>
                  <h4 className="text-[22px] font-bold text-slate-900 tracking-tight leading-[1.2]">{t(adv.titleKey)}</h4>
                  <p className="text-[16px] text-slate-655 leading-[1.7] font-semibold">{t(adv.descKey)}</p>
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
            <h2 className="text-xs font-bold text-[#0F4C81] uppercase tracking-widest">{t('faqTitle')}</h2>
            <h3 className="text-[28px] sm:text-[32px] lg:text-[40px] font-black text-slate-900 tracking-tight leading-[1.2]">{t('faqSubtitle')}</h3>
          </div>

          <div className="space-y-4">
            {[
              { q: tSolutions('faqQ1'), a: tSolutions('faqA1') },
              { q: tSolutions('faqQ2'), a: tSolutions('faqA2') },
              { q: tSolutions('faqQ3'), a: tSolutions('faqA3') }
            ].map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-[#F8FAFC]">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 font-bold text-slate-800 cursor-pointer list-none text-sm md:text-base hover:bg-slate-50 select-none">
                    <span>{faq.q}</span>
                    <ChevronRight size={18} className="transform transition-transform group-open:rotate-90 text-slate-450" />
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-[16px] text-slate-655 leading-[1.7] font-semibold border-t border-slate-100 text-left">
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
          <h3 className="text-[28px] sm:text-[32px] lg:text-[40px] font-black text-slate-900 tracking-tight leading-[1.2]">{t('ctaSectionTitle')}</h3>
          <p className="text-[16px] md:text-[17px] text-slate-655 max-w-2xl mx-auto font-semibold leading-[1.7]">
            {t('ctaSectionSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/consultation"
              className="btn-primary w-full sm:w-auto"
            >
              {t('ctaBtn')}
            </Link>
            <button
              onClick={triggerOpenChat}
              className="inline-flex items-center justify-center h-12 px-8 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer w-full sm:w-auto border-none"
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
            className="fixed bottom-24 right-6 z-40 p-3 bg-[#0F4C81] text-white rounded-full shadow-xl hover:bg-[#0D3F6D] transition-colors border-none cursor-pointer hidden lg:block"
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
                className="flex items-center justify-center w-full h-12 bg-[#0F4C81] hover:bg-[#0D3F6D] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-transform active:scale-[0.98]"
              >
                {locale === 'es' ? 'Programar Consulta' : 'Schedule Consultation'}
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
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[#0F4C81]">
                      <selectedCategory.IconComponent size={22} />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-slate-450 uppercase tracking-widest">{t('drawerTitle')}</span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
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
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('drawerTitle')}</h4>
                  <p className="text-slate-700 text-sm font-semibold leading-relaxed bg-slate-50 border border-slate-200 p-5 rounded-2xl shadow-sm">
                    {t(`categories.${selectedCategory.cat.id}.desc`)}
                  </p>
                </div>

                {/* Section 2: Specific capabilities */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{tc('detailedCapabilities')}</h4>
                  <div className="space-y-4">
                    {selectedCategory.cat.services.map((srv: any) => {
                      const srvDetails = getServiceDetails(srv.id, locale);
                      const srvTitle = srvDetails ? srvDetails.title : t(`categories.${selectedCategory.cat.id}.services.${srv.id}.title`);
                      const srvDesc = srvDetails ? srvDetails.description : t(`categories.${selectedCategory.cat.id}.services.${srv.id}.desc`);
                      const srvPath = srvDetails ? `/solutions/${srv.id}` : srv.path;

                      return (
                        <div key={srv.id} className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm space-y-3 text-left">
                          <h5 className="font-bold text-slate-900 text-sm sm:text-base">{srvTitle}</h5>
                          <p className="text-xs sm:text-sm text-slate-550 leading-relaxed">{srvDesc}</p>
                          
                          {/* Link to dedicated landing page */}
                          <div className="pt-2 border-t border-slate-100/50 mt-1 flex items-center justify-between">
                            <Link 
                              href={srvPath}
                              onClick={() => setSelectedCategory(null)}
                              className="text-xs font-bold text-[#0F4C81] hover:underline flex items-center gap-1"
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
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{tc('technologies')}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {useMemo(() => {
                      const techs = new Set<string>();
                      selectedCategory.cat.services.forEach((srv: any) => srv.tech.forEach((tech: string) => techs.add(tech)));
                      return Array.from(techs);
                    }, [selectedCategory]).map((tech, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-[#0F4C81]/5 border border-[#0F4C81]/15 text-[#0F4C81] rounded-lg text-xs font-bold uppercase tracking-wider">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Section 4: Target Industries */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{tc('industries')}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {useMemo(() => {
                      const inds = new Set<string>();
                      selectedCategory.cat.services.forEach((srv: any) => {
                        const translatedInds = t.raw(`categories.${selectedCategory.cat.id}.services.${srv.id}.industries`) as string[];
                        translatedInds.forEach(ind => inds.add(ind));
                      });
                      return Array.from(inds);
                    }, [selectedCategory]).map((ind, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-[#0F4C81]/5 border border-[#0F4C81]/15 text-[#0F4C81] rounded-lg text-xs font-bold">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Section 5: Case Study Success */}
                <div className="p-6.5 rounded-2xl bg-slate-900 text-white relative overflow-hidden border border-slate-800 shadow-md text-left">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#0F4C81]/25 rounded-full blur-xl pointer-events-none" />
                  <div className="space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0F4C81]/30 text-[10px] font-extrabold text-blue-200 uppercase tracking-wider">
                      {t('caseStudyLabel')}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold">
                      {getCaseStudySummary(selectedCategory.cat.id, locale === 'es')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Drawer footer actions */}
              <div className="flex items-center gap-4 pt-8 border-t border-slate-200 mt-10">
                <Link
                  href={`/consultation?service=${encodeURIComponent(selectedCategory.catTitle)}`}
                  className="flex-1 inline-flex items-center justify-center h-12 bg-[#0F4C81] hover:bg-[#0D3F6D] text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
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
        <Loader2 className="animate-spin text-[#0F4C81]" size={40} />
      </div>
    }>
      <SolutionsPageContent />
    </Suspense>
  );
}
