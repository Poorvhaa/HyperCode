import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { FileDown, Calendar, ChevronRight, FileText } from 'lucide-react';
import { HeroBanner } from '@/components/hero-banner';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'TermsAndConditions' });
  
  return {
    title: `HyperCode | ${t('title')}`,
    description: t('subtitle'),
    alternates: {
      canonical: `https://www.hypercodeus.com/${locale}/TnC`,
    },
  };
}

export default async function TermsAndConditionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('TermsAndConditions');

  const pdfUrl =
    locale === 'es'
      ? '/legal/es/TnC.pdf'
      : '/legal/en/TnC.pdf';

  const sectionKeys = [
    'agreement',
    'intellectual',
    'user',
    'prohibited',
    'services',
    'termination',
    'liability',
    'governing',
    'contact'
  ] as const;

  return (
    <main className="relative w-full bg-white text-left">
      <Navigation />

      {/* Terms & Conditions Reusable Hero Banner */}
      <HeroBanner
        bgImage="https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1600"
        categoryLabel={t('legal')}
        title={t('title')}
        subtitle={`${t('subtitle')} • ${t('lastUpdated')}`}
        breadcrumbs={[
          { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
          { label: t('title') }
        ]}
        ctaButtons={
          <div className="flex-shrink-0 z-20">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F4C81] hover:bg-[#0c3c66] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>{t('downloadPdf')}</span>
            </a>
          </div>
        }
      />

      {/* Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Table of Contents - Desktop Sticky Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t('toc')}
              </h3>
              <nav className="flex flex-col space-y-1">
                {sectionKeys.map((key) => (
                  <a
                    key={key}
                    href={`#${key}`}
                    className="group flex items-center justify-between py-2 text-sm font-semibold text-slate-600 hover:text-[#0F4C81] transition-colors"
                  >
                    <span>{t(`sections.${key}.title`)}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-[#0F4C81] transition-all -translate-x-2 group-hover:translate-x-0" />
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Legal Content */}
          <article className="col-span-1 lg:col-span-3 max-w-none">
            <div className="prose prose-slate max-w-none space-y-10">
              {sectionKeys.map((key) => (
                <section
                  key={key}
                  id={key}
                  className="scroll-mt-28 border-b border-slate-100 pb-8 last:border-0"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                    {t(`sections.${key}.title`)}
                  </h2>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line font-medium text-[15px]">
                    {t(`sections.${key}.content`)}
                  </p>
                </section>
              ))}
            </div>
          </article>

        </div>
      </section>

      <Footer />
    </main>
  );
}
