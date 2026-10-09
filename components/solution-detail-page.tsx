'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { getServiceDetails } from '@/lib/services-details';
import { HeroBanner } from '@/components/hero-banner';
import { BrandButton } from '@/components/brand-button';
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
  Activity,
  Award
} from 'lucide-react';

interface SolutionDetailPageProps {
  locale: string;
  pageKey: string;
}

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

export function SolutionDetailPage({ locale, pageKey }: SolutionDetailPageProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Fetch localized service details
  const activeTrans = getServiceDetails(pageKey, locale);
  if (!activeTrans) {
    return (
      <main className="relative w-full min-h-screen bg-white flex flex-col justify-between">
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center p-24 text-center">
          <h1 className="text-3xl font-black text-slate-900 mb-4">Solution Not Found</h1>
          <p className="text-slate-500 mb-8 max-w-md">The service page you are looking for is currently being restructured. Please navigate back to the solutions directory.</p>
          <Link href="/solutions" className="btn-primary">
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
    <main className="relative w-full bg-white text-left bg-dot-pattern">
      <Navigation />

      {/* JSON-LD Schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Premium Hero Section */}
      <HeroBanner
        bgImage={activeTrans.heroImage}
        bgImageAlt={activeTrans.heroImageAlt}
        categoryLabel={activeTrans.categoryLabel}
        title={activeTrans.title}
        titleHighlight={activeTrans.titleHighlight}
        subtitle={activeTrans.description}
        breadcrumbs={[
          { label: isEs ? 'Inicio' : 'Home', href: '/' },
          { label: isEs ? 'Soluciones' : 'Solutions', href: '/solutions' },
          { label: activeTrans.title }
        ]}
      />

      {/* 2. Service Overview Section */}
      <section className="section-padding bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Text details on left */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-eyebrow text-royal-blue block">
                {isEs ? 'Resumen del Servicio' : 'Service Overview'}
              </span>
              <h2 className="text-h2 text-slate-900">
                {activeTrans.overviewTitle}
              </h2>
              <div className="text-body text-slate-655 space-y-6">
                <p>{activeTrans.overviewP1}</p>
                <p>{activeTrans.overviewP2}</p>
              </div>
            </div>
            {/* Context mock/image on right */}
            <div className="lg:col-span-5 relative w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-slate-200 shadow-2xl group">
              <Image
                src={activeTrans.heroImage}
                alt={activeTrans.heroImageAlt || activeTrans.overviewTitle}
                fill
                priority
                sizes="(min-width: 1280px) 520px, (min-width: 1024px) 40vw, 100vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Features Section (Icon Cards) */}
      <section className="section-padding bg-[#F8FAFC] border-b border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-eyebrow text-royal-blue block">
              {activeTrans.keySolutionsLabel}
            </span>
            {activeTrans.slug === 'local-seo' ? (
              <h2 className="text-h2 text-slate-900">{activeTrans.capabilitiesTitle}</h2>
            ) : (
              <h3 className="text-h2 text-slate-900">
                {isEs ? 'Capacidades Tecnológicas Avanzadas' : 'Advanced Technical Capabilities'}
              </h3>
            )}
            <p className="text-body text-slate-655">
              {activeTrans.capabilitiesDesc || (isEs
                ? 'Nuestros ingenieros implementan flujos estructurados de software, seguridad de datos y patrones arquitectónicos modernos.'
                : 'Our engineers deliver fully compliant pipelines, secure cloud data storage structures, and modular UX/UI architectures.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {activeTrans.features.map((feature: any, i: number) => (
              <div
                key={i}
                className="premium-card p-8 bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-royal-blue/30 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="w-12 h-12 rounded-2xl bg-royal-blue/5 border border-royal-blue/15 text-royal-blue flex items-center justify-center shadow-inner">
                    <CheckCircle size={20} />
                  </div>
                  {activeTrans.slug === 'local-seo' ? (
                    <h3 className="text-h3 text-slate-900 leading-[1.2]">{feature.title}</h3>
                  ) : (
                    <h4 className="text-h3 text-slate-900 leading-[1.2]">{feature.title}</h4>
                  )}
                  <p className="text-body text-slate-655">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Business Benefits (ROI, Scalability, Security, Efficiency) */}
      <section className="section-padding bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-eyebrow text-royal-blue block">
              {activeTrans.benefitsTitle}
            </span>
            {activeTrans.slug === 'local-seo' ? (
              <h2 className="text-h2 text-slate-900">{activeTrans.benefitsTitle}</h2>
            ) : (
              <h3 className="text-h2 text-slate-900">{activeTrans.benefitsTitle}</h3>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {activeTrans.benefits.map((benefit: any, i: number) => {
              const icons = [Award, Zap, ShieldCheck, Activity];
              const Icon = icons[i] || CheckCircle;

              return (
                <div key={i} className="premium-card flex gap-5 items-start p-6 bg-[#F8FAFC] border border-slate-200 shadow-sm">
                  <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 text-royal-blue flex items-center justify-center flex-shrink-0 shadow-sm animate-pulse">
                    <Icon size={18} />
                  </div>
                  <div className="space-y-1.5">
                    {activeTrans.slug === 'local-seo' ? (
                      <h3 className="text-h4 text-slate-900">{benefit.title}</h3>
                    ) : (
                      <h4 className="text-h4 text-slate-900">{benefit.title}</h4>
                    )}
                    <p className="text-body-sm text-slate-655">{benefit.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Technologies Used Section */}
      <section className="section-padding bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-eyebrow text-royal-blue block">
              {activeTrans.techTitle}
            </span>
            {activeTrans.slug === 'local-seo' ? (
              <h2 className="text-h2 text-slate-900">{activeTrans.techTitle}</h2>
            ) : (
              <h3 className="text-h2 text-slate-900">{activeTrans.techTitle}</h3>
            )}
            <p className="text-body text-slate-650">
              {activeTrans.techDesc || (isEs
                ? 'Utilizamos componentes modernos, marcos de desarrollo seguros e integraciones de nube de primer nivel.'
                : 'We assemble leading stack architectures, secure framework dependencies, and scalable cloud solutions.')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeTrans.technologies.map((tech: any, i: number) => (
              <div key={i} className="premium-card p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between hover:border-royal-blue hover:shadow-md transition-all duration-300 group">
                <div className="space-y-2">
                  {activeTrans.slug === 'local-seo' ? (
                    <h3 className="text-h3 text-slate-900 group-hover:text-royal-blue transition-colors leading-[1.2]">{tech.name}</h3>
                  ) : (
                    <h4 className="text-h3 text-slate-900 group-hover:text-royal-blue transition-colors leading-[1.2]">{tech.name}</h4>
                  )}
                  <p className="text-eyebrow text-slate-400 mt-1">{tech.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQs Section (Accordion) */}
      <section className="section-padding bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="text-eyebrow text-royal-blue block">
              {isEs ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
            </span>
            {activeTrans.slug === 'local-seo' ? (
              <h2 className="text-h2 text-slate-900">
                {isEs ? 'Preguntas Frecuentes sobre SEO, AEO y GEO' : 'SEO, AEO & GEO FAQs'}
              </h2>
            ) : (
              <h3 className="text-h2 text-slate-900">
                {isEs ? 'Preguntas Frecuentes sobre el Servicio' : 'Got Questions? We Have Answers'}
              </h3>
            )}
          </div>

          <div className="space-y-4">
            {activeTrans.faqs.map((faq: any, idx: number) => {
              const isOpen = expandedFaq === idx;
              return (
                <div key={idx} className="border border-slate-200 rounded-[20px] overflow-hidden bg-slate-50/50 transition-all duration-300">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 text-body font-bold text-slate-900 hover:text-royal-blue transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={16} className={`transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-royal-blue' : 'text-slate-450'}`} />
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
                        <div className="p-6 pt-0 border-t border-slate-200/20 text-body text-slate-655">
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
      <section className="section-padding bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-2">
            <span className="text-eyebrow text-royal-blue block">
              {isEs ? 'Servicios Relacionados' : 'Related Services'}
            </span>
            {activeTrans.slug === 'local-seo' ? (
              <h2 className="text-h3 text-slate-900">
                {isEs ? 'Explore Servicios Complementarios' : 'Explore Complementary Services'}
              </h2>
            ) : (
              <h4 className="text-h3 text-slate-900">
                {isEs ? 'Explore Soluciones Complementarias' : 'Explore Complementary Solutions'}
              </h4>
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            {activeTrans.relatedServices.map((rel: any, idx: number) => (
              <Link
                key={idx}
                href={`/solutions/${rel.slug}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-white hover:border-royal-blue text-button text-slate-700 hover:text-royal-blue shadow-sm transition-all"
              >
                <span>{rel.name}</span>
                <ArrowRight size={12} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CTA Section */}
      <section className="section-padding bg-royal-blue relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_100%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <span className="text-eyebrow text-blue-200 block">{isEs ? 'ENTRE EN CONTACTO' : 'GET IN TOUCH'}</span>
          {activeTrans.slug === 'local-seo' ? (
            <h2 className="text-h2 text-white leading-none">{activeTrans.ctaTitle}</h2>
          ) : (
            <h3 className="text-h2 text-white leading-none">{activeTrans.ctaTitle}</h3>
          )}
          <p className="text-body text-blue-100 max-w-xl mx-auto">
            {activeTrans.ctaDesc}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <BrandButton
              href={
                pageKey === 'api-development'
                  ? '/consultation?service=Software%20Development'
                  : '/consultation'
              }
              variant="primary"
              className="w-full sm:w-auto"
            >
              {isEs ? 'Programar Consulta' : 'Schedule Consultation'}
            </BrandButton>
            <BrandButton
              href={
                pageKey === 'api-development'
                  ? '/contact?service=API%20Development%20%26%20Integration'
                  : '/contact'
              }
              variant="secondary"
              className="w-full sm:w-auto"
            >
              {isEs ? 'Contactar Soporte' : 'Contact Us'}
            </BrandButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
