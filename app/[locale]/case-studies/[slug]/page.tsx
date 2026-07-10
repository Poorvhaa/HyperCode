import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { getCaseStudyBySlug, CASE_STUDIES, CaseStudyItem } from '@/lib/case-studies-data';
import { CaseStudies } from '@/components/case-studies';
import { HeroBanner } from '@/components/hero-banner';
import { Link, routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { Calendar, Tag, ShieldAlert, Cpu, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import { ConsultationForm } from '@/components/consultation-form';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const paths: Array<{ locale: string; slug: string }> = [];
  const slugs = Object.keys(CASE_STUDIES);

  for (const locale of routing.locales) {
    for (const slug of slugs) {
      paths.push({ locale, slug });
    }
  }

  return paths;
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const study = getCaseStudyBySlug(slug, locale);

  if (!study) {
    return {
      title: 'HyperCode | Case Study Not Found',
    };
  }

  return {
    title: study.seo.title,
    description: study.seo.description,
    alternates: {
      canonical: `https://www.hypercode.com/${locale}/case-studies/${slug}`,
      languages: {
        'en-US': `https://www.hypercode.com/en/case-studies/${slug}`,
        'es-US': `https://www.hypercode.com/es/case-studies/${slug}`,
        'x-default': `https://www.hypercode.com/en/case-studies/${slug}`,
      }
    },
    openGraph: {
      title: study.seo.ogTitle,
      description: study.seo.ogDescription,
      url: `https://www.hypercode.com/${locale}/case-studies/${slug}`,
      siteName: 'HyperCode',
      locale: locale === 'en' ? 'en_US' : 'es_ES',
      type: 'article',
      images: [
        {
          url: study.featuredImage,
          width: 1200,
          height: 630,
          alt: study.title,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: study.seo.ogTitle,
      description: study.seo.ogDescription,
      images: [study.featuredImage]
    }
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const study = getCaseStudyBySlug(slug, locale);
  if (!study) {
    notFound();
  }

  const t = await getTranslations('CaseStudies');
  const isEs = locale === 'es';

  // Fetch related studies based on slugs
  const relatedStudies = study.relatedCaseStudies
    .map(s => getCaseStudyBySlug(s, locale))
    .filter((s): s is CaseStudyItem => s !== null);

  // Generate breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': isEs ? 'Inicio' : 'Home',
        'item': `https://www.hypercode.com/${locale}`
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': isEs ? 'Casos de Estudio' : 'Case Studies',
        'item': `https://www.hypercode.com/${locale}/case-studies`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': study.title,
        'item': `https://www.hypercode.com/${locale}/case-studies/${slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="relative w-full bg-white text-left min-h-screen">
        <Navigation />

        {/* Hero Section */}
        <HeroBanner
          bgImage={study.featuredImage}
          categoryLabel={study.industry.toUpperCase()}
          title={study.title}
          titleHighlight=""
          subtitle={study.clientType}
          breadcrumbs={[
            { label: isEs ? 'Inicio' : 'Home', href: '/' },
            { label: isEs ? 'Casos de Estudio' : 'Case Studies', href: '/case-studies' },
            { label: study.title }
          ]}
        />

        {/* Main Content Layout */}
        <section className="section-padding bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Back Button */}
            <div className="mb-10">
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#0F4C81] transition-colors uppercase tracking-wider"
              >
                <ArrowLeft size={14} />
                <span>{t('backToCaseStudies')}</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Column - Detailed Case Study Content (8 columns) */}
              <div className="lg:col-span-8 space-y-12">
                
                {/* 1. Overview */}
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {t('overview')}
                  </h2>
                  <p className="text-[16px] md:text-[17px] text-slate-600 leading-[1.8] font-medium">
                    {study.challenge.substring(0, 150)}...
                  </p>
                </div>

                {/* 2. Business Challenge */}
                <div className="space-y-4 bg-rose-50/20 border border-rose-100/50 rounded-3xl p-6 sm:p-8">
                  <div className="flex items-center gap-3 text-rose-600">
                    <ShieldAlert size={26} />
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                      {t('challenge')}
                    </h3>
                  </div>
                  <p className="text-[16px] md:text-[17px] text-slate-655 leading-[1.8] font-medium">
                    {study.challenge}
                  </p>
                </div>

                {/* 3. HyperCode Solution */}
                <div className="space-y-4 bg-[#0F4C81]/5 border border-[#0F4C81]/10 rounded-3xl p-6 sm:p-8">
                  <div className="flex items-center gap-3 text-[#0F4C81]">
                    <Cpu size={26} />
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                      {t('solution')}
                    </h3>
                  </div>
                  <p className="text-[16px] md:text-[17px] text-slate-655 leading-[1.8] font-medium">
                    {study.solution}
                  </p>
                </div>

                {/* 4. Implementation details */}
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {t('implementation')}
                  </h3>
                  <p className="text-[16px] md:text-[17px] text-slate-600 leading-[1.8] font-medium">
                    {study.implementation}
                  </p>
                </div>

                {/* 5. Business Results & Metrics */}
                <div className="space-y-6 pt-4 border-t border-slate-100">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {t('businessResults')}
                  </h3>
                  <p className="text-[16px] md:text-[17px] text-slate-600 leading-[1.8] font-medium">
                    {study.businessImpact}
                  </p>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                    {study.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl flex flex-col justify-between"
                      >
                        <span className="text-3xl sm:text-4xl font-black text-[#0F4C81] tracking-tight block mb-2">
                          {metric.value}
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-widest leading-normal">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column - Project Sidebar (4 columns) */}
              <div className="lg:col-span-4 space-y-8">
                
                {/* Project Info Card */}
                <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
                  <h4 className="text-lg font-black text-slate-900 tracking-tight border-b border-slate-150 pb-4 uppercase">
                    {isEs ? 'Información del Proyecto' : 'Project Information'}
                  </h4>

                  {/* Client Type */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      {t('clientType')}
                    </span>
                    <span className="text-sm font-semibold text-slate-800">
                      {study.clientType}
                    </span>
                  </div>

                  {/* Industry */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      {t('industry')}
                    </span>
                    <span className="text-sm font-semibold text-slate-800">
                      {study.industry}
                    </span>
                  </div>

                  {/* Project Duration */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      {t('duration')}
                    </span>
                    <span className="text-sm font-semibold text-slate-800">
                      {study.duration}
                    </span>
                  </div>

                  {/* Technology Stack */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      {t('technologies')}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {study.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded-lg bg-slate-50 text-[#0F4C81] text-[10px] font-extrabold uppercase tracking-wide border border-slate-200/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Services Provided */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      {t('services')}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {study.services.map((service) => (
                        <span
                          key={service}
                          className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-extrabold uppercase tracking-wide border border-slate-200"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Related Services */}
                <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm space-y-4">
                  <h4 className="text-md font-black text-slate-900 tracking-tight border-b border-slate-150 pb-4 uppercase">
                    {t('relatedServices')}
                  </h4>
                  <div className="flex flex-col gap-2.5">
                    {study.relatedServices.map((service, idx) => (
                      <Link
                        key={idx}
                        href={`/solutions/${service.slug}`}
                        className="group flex items-center justify-between p-3 rounded-xl border border-slate-150 bg-slate-50/20 hover:border-[#0F4C81]/30 hover:bg-slate-50 transition-all duration-200"
                      >
                        <span className="text-xs font-bold text-slate-700 group-hover:text-[#0F4C81] transition-colors leading-snug">
                          {service.name}
                        </span>
                        <ArrowRight size={13} className="text-slate-400 group-hover:text-[#0F4C81] transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* Related Case Studies */}
        {relatedStudies.length > 0 && (
          <section className="section-padding bg-[#F8FAFC] border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mb-12 space-y-2 text-left">
                <span className="text-[10px] font-extrabold text-[#0F4C81] tracking-widest uppercase">
                  {t('relatedCaseStudies')}
                </span>
                <h4 className="text-[22px] font-bold text-slate-900">
                  {isEs ? 'Explore Otros Casos de Éxito' : 'Read Other Success Stories'}
                </h4>
              </div>

              <CaseStudies studies={relatedStudies} />
            </div>
          </section>
        )}

        {/* Contact Form Section */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-12">
            
            <div className="space-y-4 max-w-2xl mx-auto">
              <span className="text-[10px] font-extrabold text-[#0F4C81] tracking-widest uppercase">
                {t('contactUs')}
              </span>
              <h3 className="text-[28px] sm:text-[32px] lg:text-[40px] font-black tracking-tight leading-[1.2] text-slate-900">
                {isEs ? 'Hablemos de su Proyecto' : 'Initiate a Solutions Briefing'}
              </h3>
              <p className="text-[16px] text-slate-500 leading-[1.7] font-semibold">
                {t('contactUsDesc')}
              </p>
            </div>

            {/* Embedded Consultation Form */}
            <div className="premium-card p-6 sm:p-10 border border-slate-200/80 shadow-lg text-left bg-slate-50/30 rounded-[32px]">
              <ConsultationForm />
            </div>

          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
