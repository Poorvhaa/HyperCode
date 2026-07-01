'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { HeroBanner } from '@/components/hero-banner';
import { SERVICES_CATALOG } from '@/lib/services-data';
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
  HelpCircle
} from 'lucide-react';

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

// Custom capability badges for the 13 categories to display on the cards
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
  const locale = useLocale();

  // Selected Drawer details
  const [selectedCategory, setSelectedCategory] = useState<{
    cat: any;
    catTitle: string;
    IconComponent: any;
  } | null>(null);

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

  return (
    <main className="relative w-full bg-slate-50 text-left min-h-screen">
      <Navigation />

      {/* Hero Banner Component */}
      <HeroBanner
        bgImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600"
        categoryLabel={locale === 'es' ? 'Transformación Digital de Extremo a Extremo' : 'End-to-End Digital Transformation'}
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        ctaButtons={
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center h-12 px-8 bg-[#0F4C81] hover:bg-[#0D3F6D] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              {t('ctaBtn')}
            </Link>
            <button
              onClick={triggerOpenChat}
              className="inline-flex items-center justify-center h-12 px-8 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer border-none"
            >
              {tAi('title') || 'Talk to AI Consultant'}
            </button>
          </div>
        }
      />

      {/* Key Statistics Grid Section */}
      <section className="py-12 bg-white dark:bg-[#0b0f19] border-b border-slate-200/50 dark:border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="space-y-1">
              <span className="block text-4xl sm:text-5xl font-black text-[#0F4C81] dark:text-blue-400 tracking-tight">{t('stats.retentionNum')}</span>
              <span className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">{t('stats.retentionLabel')}</span>
            </div>
            <div className="space-y-1">
              <span className="block text-4xl sm:text-5xl font-black text-[#0F4C81] dark:text-blue-400 tracking-tight">{t('stats.deploymentsNum')}</span>
              <span className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">{t('stats.deploymentsLabel')}</span>
            </div>
            <div className="space-y-1">
              <span className="block text-4xl sm:text-5xl font-black text-[#0F4C81] dark:text-blue-400 tracking-tight">{t('stats.onboardingNum')}</span>
              <span className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">{t('stats.onboardingLabel')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section (13 grand category cards) */}
      <section className="py-28 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#0F4C81] uppercase tracking-widest">{locale === 'es' ? 'Nuestras Prácticas de Consultoría' : 'Our Consulting Practices'}</span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {locale === 'es' ? 'Soluciones Tecnológicas de Grado Empresarial' : 'Enterprise Technology Capabilities'}
            </h3>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              {locale === 'es' 
                ? 'Ofrecemos soluciones integradas para optimizar flujos de trabajo, acelerar lanzamientos de software y desplegar talento certificado.'
                : 'We offer fully integrated delivery teams to structure software, optimize workflows, secure architectures, and scale systems.'}
            </p>
          </div>

          {/* Grid of 13 Premium Category Cards (rounded 28px) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_CATALOG.map((category) => {
              const CategoryIcon = CATEGORY_ICON_MAP[category.id] || Cpu;
              const categoryTitle = tNav(category.id === 'ai-automation' ? 'aiAutomation' : 
                                          category.id === 'software-development' ? 'softwareDev' :
                                          category.id === 'web-development' ? 'webDev' :
                                          category.id === 'mobile-development' ? 'mobileDev' :
                                          category.id === 'cloud-devops' ? 'cloudDevOps' :
                                          category.id === 'talent-solutions' ? 'talentSolutions' :
                                          category.id === 'digital-transformation' ? 'digitalTrans' :
                                          category.id === 'data-analytics' ? 'dataAnalytics' :
                                          category.id === 'cybersecurity' ? 'cybersecurity' :
                                          category.id === 'ui-ux-design' ? 'uiUx' :
                                          category.id === 'digital-marketing' ? 'marketing' :
                                          category.id === 'ecommerce' ? 'ecommerce' : 'techConsulting');

              const categoryDesc = t(`categories.${category.id}.desc`);
              const badges = CAPABILITY_BADGES[category.id] || [];

              return (
                <motion.div
                  key={category.id}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="bg-white rounded-[28px] border border-slate-200/70 p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#0F4C81]/30 transition-all duration-300 relative overflow-hidden group text-left"
                >
                  {/* Decorative Subtle Accent Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0F4C81]/0 to-[#0F4C81]/[0.02] pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0F4C81]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug max-w-[80%]">{categoryTitle}</h3>
                      <div className="p-3.5 rounded-xl bg-slate-50 text-[#0F4C81] group-hover:bg-[#0F4C81]/10 group-hover:scale-110 transition-all">
                        <CategoryIcon size={20} />
                      </div>
                    </div>
                    
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{categoryDesc}</p>

                    {/* Capability badge lists */}
                    <div className="space-y-2.5">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">{locale === 'es' ? 'Especialidades' : 'Specialties'}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {badges.map((badge, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-600 rounded-lg text-xs font-semibold">
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-6 mt-8 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedCategory({ cat: category, catTitle: categoryTitle, IconComponent: CategoryIcon })}
                      className="text-xs font-bold text-[#0F4C81] hover:text-[#0D3F6D] transition-all uppercase tracking-wider flex items-center gap-1 cursor-pointer group/btn"
                    >
                      <span>{t('learnMoreBtn')}</span>
                      <ChevronRight size={14} className="transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <Link
                      href={`/contact?service=${encodeURIComponent(categoryTitle)}`}
                      className="inline-flex items-center justify-center gap-1 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer"
                    >
                      <span>{locale === 'es' ? 'Contratar' : 'Request'}</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Ecosystem Section (Strictly Badge Only) */}
      <section className="py-24 bg-white relative z-10 border-t border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#0F4C81] uppercase tracking-widest">{t('techEcosystemTitle')}</span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{t('techEcosystemSubtitle')}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techEcosystem.map((group, idx) => (
              <div key={idx} className="p-7 bg-slate-50 border border-slate-200/40 rounded-2xl text-left space-y-4">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200/60 pb-2">{group.name}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item, itemIdx) => (
                    <span key={itemIdx} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-650 rounded-lg text-xs font-semibold">
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
      <section className="relative bg-slate-900 text-white py-28 z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0F4C81]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-slate-850 rounded-full blur-2xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#0F4C81] uppercase tracking-widest">{t('industriesTitle')}</span>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{t('industriesSubtitle')}</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industriesWeServe.map((ind) => {
              const IndIcon = INDUSTRY_ICON_MAP[ind.id] || Building;
              const indTitle = t(`industriesList.${ind.key}.title`);
              const indDesc = t(`industriesList.${ind.key}.desc`);

              return (
                <div key={ind.id} className="p-8 rounded-[24px] bg-slate-950 border border-slate-800/80 shadow-sm flex flex-col justify-between hover:border-slate-700/65 transition-all duration-300 group">
                  <div className="space-y-4">
                    <div className="p-3 w-fit rounded-xl bg-slate-900 border border-slate-800 text-[#0F4C81] group-hover:bg-[#0F4C81]/10 group-hover:scale-105 transition-all">
                      <IndIcon size={20} />
                    </div>
                    <h4 className="text-lg font-bold text-white tracking-tight">{indTitle}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">{indDesc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose HyperCode Section */}
      <section className="py-28 bg-slate-50 relative z-10 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#0F4C81] uppercase tracking-widest">{t('why.title')}</span>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t('why.subtitle')}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantagesList.map((adv, idx) => {
              const AdvIcon = adv.icon;
              return (
                <div key={idx} className="bg-white p-8 rounded-[24px] border border-slate-200/60 shadow-sm space-y-4 text-left">
                  <div className="p-3 rounded-xl bg-[#0F4C81]/10 text-[#0F4C81] w-fit">
                    <AdvIcon size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 tracking-tight">{t(adv.titleKey)}</h4>
                  <p className="text-sm text-slate-650 leading-relaxed font-medium">{t(adv.descKey)}</p>
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
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t('faqSubtitle')}</h3>
          </div>

          <div className="space-y-4">
            {[
              {
                q: locale === 'es' ? '¿Cómo determinan el tamaño del equipo y la estimación de plazos?' : 'How do you determine team sizing and timeline estimates?',
                a: locale === 'es' 
                  ? 'Nuestros directores de práctica analizan su pila tecnológica actual, objetivos de negocio y limitaciones presupuestarias para generar un plan técnico detallado que define el perfil ideal de los desarrolladores y la duración de los sprints.' 
                  : 'Our practice leads analyze your current technical stack, business objectives, and budget constraints to generate a detailed sprint plan detailing developer profiles and project milestones.'
              },
              {
                q: locale === 'es' ? '¿Cuáles son los modelos de compromiso para las soluciones de talento?' : 'What are the engagement models for talent solutions?',
                a: locale === 'es'
                  ? 'Ofrecemos contratación permanente, temporal (staff augmentation) y squads dedicados con soporte de project management. Podemos desplegar perfiles pre-evaluados de Next.js, Python o DevOps en un plazo de 5 a 10 días hábiles.'
                  : 'We offer permanent placement, contract staffing (staff augmentation), and dedicated development squads supported by PMs. We can onboard pre-screened Next.js, Python, or DevOps profiles in 5-10 business days.'
              },
              {
                q: locale === 'es' ? '¿Cumplen con los estándares de seguridad de datos (SOC 2, HIPAA)?' : 'Do you comply with data security standards (SOC 2, HIPAA)?',
                a: locale === 'es'
                  ? 'Sí. Todos nuestros proyectos de software y plataformas de datos se diseñan bajo estrictas políticas de gestión de accesos (IAM), encriptación en tránsito y reposo, y auditorías de seguridad constantes.'
                  : 'Yes. All software projects and data platforms are designed under strict access controls (IAM), TLS encryption in transit/at rest, and continuous vulnerability scans.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/20">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 font-bold text-slate-800 cursor-pointer list-none text-sm md:text-base hover:bg-slate-50 select-none">
                    <span>{faq.q}</span>
                    <ChevronRight size={18} className="transform transition-transform group-open:rotate-90 text-slate-400" />
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-sm text-slate-500 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative z-10 border-t border-slate-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{t('ctaSectionTitle')}</h3>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            {t('ctaSectionSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center h-12 px-8 bg-[#0F4C81] hover:bg-[#0D3F6D] text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer w-full sm:w-auto"
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
                    <div className="p-2.5 rounded-xl bg-slate-50 text-[#0F4C81]">
                      <selectedCategory.IconComponent size={22} />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('drawerTitle')}</span>
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
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('businessValue')}</h4>
                  <p className="text-slate-700 text-sm font-semibold leading-relaxed bg-slate-50 border border-slate-200/60 p-5 rounded-2xl shadow-sm">
                    {t(`categories.${selectedCategory.cat.id}.desc`)}
                  </p>
                </div>

                {/* Section 2: Specific capabilities */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{locale === 'es' ? 'Capacidades Detalladas' : 'Detailed Capabilities'}</h4>
                  <div className="space-y-4">
                    {selectedCategory.cat.services.map((srv: any) => (
                      <div key={srv.id} className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm space-y-2">
                        <h5 className="font-bold text-slate-900 text-sm sm:text-base">{t(`categories.${selectedCategory.cat.id}.services.${srv.id}.title`)}</h5>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{t(`categories.${selectedCategory.cat.id}.services.${srv.id}.desc`)}</p>
                        
                        {/* Outcomes */}
                        <div className="pt-2">
                          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">{t('expectedOutcomes')}</span>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {(t.raw(`categories.${selectedCategory.cat.id}.services.${srv.id}.outcomes`) as string[]).map((out, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-600 font-medium">
                                <CheckCircle size={14} className="text-[#0F4C81] flex-shrink-0 mt-0.5" />
                                <span>{out}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3: Technologies Used */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('technologies')}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {useMemo(() => {
                      const techs = new Set<string>();
                      selectedCategory.cat.services.forEach((srv: any) => srv.tech.forEach((tech: string) => techs.add(tech)));
                      return Array.from(techs);
                    }, [selectedCategory]).map((tech, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-slate-900 border border-slate-850 text-slate-200 rounded-lg text-xs font-bold uppercase tracking-wider">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Section 4: Target Industries */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('industries')}</h4>
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
                <div className="p-6.5 rounded-2xl bg-slate-950 text-white relative overflow-hidden border border-slate-850 shadow-md">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#0F4C81]/25 rounded-full blur-xl pointer-events-none" />
                  <div className="space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0F4C81]/30 text-[10px] font-extrabold text-[#74C3FF] uppercase tracking-wider">
                      {t('caseStudyLabel')}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-350 leading-relaxed font-semibold">
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
                  {locale === 'es' ? 'Cerrar' : 'Close'}
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
