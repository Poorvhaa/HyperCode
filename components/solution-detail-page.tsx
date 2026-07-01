'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { CaseStudiesSection } from '@/components/case-studies-section';
import { getServiceDetails } from '@/lib/services-details';
import { HeroBanner } from '@/components/hero-banner';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
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
  Activity,
  Award
} from 'lucide-react';

interface SolutionDetailPageProps {
  locale: string;
  pageKey: string;
  tc: any;
}

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
  technology: Terminal,
  salud: HeartPulse,
  finanzas: Building2,
  'comercio minorista': ShoppingBag,
  manufactura: Factory,
  educación: GraduationCap,
  logística: Truck
};

// Lucide icon mapping for categories
const CATEGORY_ICON_MAP: Record<string, any> = {
  'ai-automation': BrainIcon,
  'software-development': Layers,
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

function BrainIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  );
}

export function SolutionDetailPage({ locale, pageKey, tc }: SolutionDetailPageProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Fetch localized service details
  const activeTrans = getServiceDetails(pageKey, locale);

  if (!activeTrans) {
    return (
      <main className="relative w-full min-h-screen bg-[#fcfdfe] dark:bg-[#07090e] flex flex-col justify-between">
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center p-24 text-center">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Solution Not Found</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">The service page you are looking for is currently being restructured. Please navigate back to the solutions directory.</p>
          <Link href="/solutions" className="px-6 py-3 bg-[#0F4C81] text-white rounded-xl font-bold text-xs uppercase tracking-wider">
            View All Solutions
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const isEs = locale === 'es';

  // Toggle FAQ Accordion
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Structured FAQs JSON-LD Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': activeTrans.faqs.map((faq: any) => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a
      }
    }))
  };

  return (
    <main className="relative w-full bg-[#fcfdfe] dark:bg-[#07090e] text-left bg-dot-pattern">
      <Navigation />

      {/* JSON-LD Schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Premium Hero Section */}
      <HeroBanner
        bgImage={activeTrans.heroImage}
        categoryLabel={activeTrans.categoryLabel}
        title={activeTrans.title}
        titleHighlight={activeTrans.titleHighlight}
        subtitle={activeTrans.description}
        breadcrumbs={[
          { label: isEs ? 'Inicio' : 'Home', href: `/${locale}` },
          { label: isEs ? 'Soluciones' : 'Solutions', href: `/${locale}/solutions` },
          { label: activeTrans.title }
        ]}
        ctaButtons={
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href={`/${locale}/consultation`}
              className="inline-flex items-center justify-center h-12 px-8 bg-[#0F4C81] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#0c3c66] transition-colors duration-200 shadow-lg shadow-blue-500/10"
            >
              {activeTrans.ctaBtn}
            </Link>
          </div>
        }
      />

      {/* 2. Service Overview Section */}
      <section className="py-28 bg-white dark:bg-[#07090e] relative overflow-hidden border-b border-slate-100 dark:border-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Text details on left */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] font-extrabold text-[#0F4C81] dark:text-blue-400 tracking-widest uppercase block">
                {isEs ? 'Resumen del Servicio' : 'Service Overview'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {activeTrans.overviewTitle}
              </h2>
              <div className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold space-y-6">
                <p>{activeTrans.overviewP1}</p>
                <p>{activeTrans.overviewP2}</p>
              </div>
            </div>
            {/* Context mock/image on right */}
            <div className="lg:col-span-5 relative w-full h-[380px] rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-800 shadow-2xl group">
              <Image
                src={activeTrans.heroImage}
                alt={activeTrans.overviewTitle}
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-slate-950/20" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Features Section (Icon Cards) */}
      <section className="py-28 bg-slate-50/50 dark:bg-slate-950/20 relative border-b border-slate-100 dark:border-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-[10px] font-extrabold text-[#0F4C81] dark:text-blue-400 tracking-widest uppercase">
              {activeTrans.keySolutionsLabel}
            </span>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {isEs ? 'Capacidades Tecnológicas Avanzadas' : 'Advanced Technical Capabilities'}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              {isEs 
                ? 'Nuestros ingenieros implementan flujos estructurados de software, seguridad de datos y patrones arquitectónicos modernos.'
                : 'Our engineers deliver fully compliant pipelines, secure cloud data storage structures, and modular UX/UI architectures.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {activeTrans.features.map((feature: any, i: number) => (
              <div
                key={i}
                className="p-8 bg-white dark:bg-[#0b0f19] border border-slate-200/50 dark:border-slate-850 rounded-[24px] shadow-sm hover:shadow-xl hover:border-[#0F4C81]/30 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F4C81]/5 border border-[#0F4C81]/15 text-[#0F4C81] dark:text-blue-400 flex items-center justify-center shadow-inner">
                    <CheckCircle size={20} />
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">{feature.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Business Benefits (ROI, Scalability, Security, Efficiency) */}
      <section className="py-28 bg-white dark:bg-[#07090e] border-b border-slate-100 dark:border-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-[10px] font-extrabold text-[#0F4C81] dark:text-blue-400 tracking-widest uppercase">
              {activeTrans.benefitsTitle}
            </span>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{activeTrans.benefitsTitle}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {activeTrans.benefits.map((benefit: any, i: number) => {
              const icons = [Award, Zap, ShieldCheck, Activity];
              const Icon = icons[i] || CheckCircle;

              return (
                <div key={i} className="flex gap-5 items-start p-6 bg-slate-50/50 dark:bg-slate-950/20 rounded-3xl border border-slate-100 dark:border-slate-850">
                  <div className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 text-[#0F4C81] dark:text-blue-400 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Icon size={18} />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">{benefit.title}</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">{benefit.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Process Timeline Section */}
      <section className="py-28 bg-slate-50/30 dark:bg-slate-950/10 border-b border-slate-100 dark:border-slate-900/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-20 space-y-4">
            <span className="text-[10px] font-extrabold text-[#0F4C81] dark:text-blue-400 tracking-widest uppercase">
              {isEs ? 'Metodología de Entrega' : 'Delivery Methodology'}
            </span>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {isEs ? 'Nuestra Ruta de Implementación de 7 Pasos' : 'Our Structured 7-Step Deployment Process'}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              {isEs 
                ? 'Desde la auditoría inicial hasta el soporte en producción 24/7, seguimos un flujo iterativo y ágil.'
                : 'From the initial audit discovery through 24/7 support SLA monitoring, we execute in transparent, iterative agile sprints.'}
            </p>
          </div>

          <div className="relative">
            {/* Central progress line */}
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800 -translate-x-1/2 hidden md:block" />

            <div className="space-y-12">
              {activeTrans.timeline.map((step: any, i: number) => {
                const isEven = i % 2 === 0;
                return (
                  <div key={i} className="flex flex-col md:flex-row items-stretch gap-8 relative">
                    {/* Number badge on timeline */}
                    <div className="absolute left-4 lg:left-1/2 w-8 h-8 rounded-full bg-[#0F4C81] text-white font-black text-xs flex items-center justify-center -translate-x-1/2 border-4 border-slate-50 dark:border-[#07090e] z-10 hidden md:flex" />

                    <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-end md:text-right' : 'md:justify-start md:text-left'}`}>
                      <div className={`p-6 md:p-8 bg-white dark:bg-[#0b0f19] border border-slate-200/50 dark:border-slate-850 rounded-[24px] shadow-sm max-w-xl space-y-3 relative group hover:border-[#0F4C81]/30 transition-all ${isEven ? 'md:mr-8' : 'md:ml-8'}`}>
                        <div className={`flex items-center gap-3 ${isEven ? 'md:flex-row-reverse' : 'flex-row'}`}>
                          <span className="text-xs font-black text-white px-2.5 py-1 bg-[#0F4C81] rounded-lg">Step 0{i + 1}</span>
                          <h4 className="text-base font-extrabold text-slate-900 dark:text-white">{step.title}</h4>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">{step.desc}</p>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 hidden md:block" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Technologies Used Section */}
      <section className="py-28 bg-white dark:bg-[#07090e] border-b border-slate-100 dark:border-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-[10px] font-extrabold text-[#0F4C81] dark:text-blue-400 tracking-widest uppercase">
              {activeTrans.techTitle}
            </span>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{activeTrans.techTitle}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              {isEs 
                ? 'Utilizamos componentes modernos, marcos de desarrollo seguros e integraciones de nube de primer nivel.'
                : 'We assemble leading stack architectures, secure framework dependencies, and scalable cloud solutions.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeTrans.technologies.map((tech: any, i: number) => (
              <div key={i} className="p-6 rounded-2xl border border-slate-200/60 dark:border-slate-850 bg-white dark:bg-[#0b0f19] shadow-sm flex flex-col justify-between hover:border-[#0F4C81] dark:hover:border-blue-500 hover:shadow-md transition-all duration-300 group">
                <div className="space-y-2">
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-200 group-hover:text-[#0F4C81] dark:group-hover:text-blue-400 transition-colors">{tech.name}</h4>
                  <p className="text-[9px] text-slate-400 dark:text-slate-500 leading-relaxed font-extrabold uppercase tracking-widest">{tech.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Industries Served Section */}
      <section className="py-28 bg-slate-50/50 dark:bg-slate-950/20 border-b border-slate-100 dark:border-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-[10px] font-extrabold text-[#0F4C81] dark:text-blue-400 tracking-widest uppercase">
              {isEs ? 'Industrias que Servimos' : 'Industries We Serve'}
            </span>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {isEs ? 'Alineación de Soluciones en Todos los Sectores' : 'Enterprise Solutions Designed for Your Sector'}
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {activeTrans.industries.map((ind: string, i: number) => {
              const iconKey = ind.toLowerCase();
              const Icon = INDUSTRY_ICON_MAP[iconKey] || Terminal;
              return (
                <div key={i} className="bg-white dark:bg-[#0b0f19] p-6 rounded-2xl border border-slate-200/50 dark:border-slate-850 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-[#0F4C81] dark:text-blue-400">
                    <Icon size={18} />
                  </div>
                  <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">{ind}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Related Case Studies (Filtered Automatically) */}
      <CaseStudiesSection categoryFilter={activeTrans.categoryId} />

      {/* 9. FAQs Section (Accordion) */}
      <section className="py-28 bg-white dark:bg-[#07090e] border-b border-slate-100 dark:border-slate-900/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="text-[10px] font-extrabold text-[#0F4C81] dark:text-blue-400 tracking-widest uppercase">
              {isEs ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
            </span>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {isEs ? 'Preguntas Frecuentes sobre el Servicio' : 'Got Questions? We Have Answers'}
            </h3>
          </div>

          <div className="space-y-4">
            {activeTrans.faqs.map((faq: any, idx: number) => {
              const isOpen = expandedFaq === idx;
              return (
                <div key={idx} className="border border-slate-200/60 dark:border-slate-850 rounded-[20px] overflow-hidden bg-slate-50/50 dark:bg-slate-950/20 transition-all duration-300">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-extrabold text-sm text-slate-900 dark:text-white hover:text-[#0F4C81] dark:hover:text-blue-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={16} className={`transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-[#0F4C81] dark:text-blue-400' : 'text-slate-450'}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="p-6 pt-0 border-t border-slate-200/20 dark:border-slate-800/40 text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed font-semibold">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. Related Services (Internal Linking) */}
      <section className="py-20 bg-slate-50/20 dark:bg-[#07090e] border-b border-slate-100 dark:border-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-2">
            <span className="text-[10px] font-extrabold text-[#0F4C81] dark:text-blue-400 tracking-widest uppercase">
              {isEs ? 'Servicios Relacionados' : 'Related Services'}
            </span>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">
              {isEs ? 'Explore Soluciones Complementarias' : 'Explore Complementary Solutions'}
            </h4>
          </div>

          <div className="flex flex-wrap gap-4">
            {activeTrans.relatedServices.map((rel: any, idx: number) => (
              <Link
                key={idx}
                href={`/solutions/${rel.slug}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-[#0b0f19] hover:border-[#0F4C81] dark:hover:border-blue-500 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-[#0F4C81] dark:hover:text-blue-400 shadow-sm transition-all"
              >
                <span>{rel.name}</span>
                <ArrowRight size={12} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CTA Section */}
      <section className="py-28 bg-[#030712] relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,76,129,0.15)_0%,transparent_100%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <span className="text-xs font-black text-blue-400 tracking-widest uppercase">{isEs ? 'ENTRE EN CONTACTO' : 'GET IN TOUCH'}</span>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight max-w-2xl mx-auto">
            {activeTrans.ctaTitle}
          </h3>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-semibold">
            {activeTrans.ctaDesc}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link
              href={`/${locale}/consultation`}
              className="inline-flex items-center justify-center h-12 px-8 bg-[#0F4C81] hover:bg-[#0D3F6D] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md w-full sm:w-auto"
            >
              {isEs ? 'Programar Consulta' : 'Schedule Consultation'}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center h-12 px-8 bg-slate-900 border border-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-850 hover:border-slate-750 transition-all w-full sm:w-auto"
            >
              {isEs ? 'Contactar Soporte' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
