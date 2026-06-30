import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { FileDown, Calendar, ChevronRight, Shield } from 'lucide-react';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PrivacyPolicy' });
  
  return {
    title: `HyperCode | ${t('title')}`,
    description: t('subtitle'),
    alternates: {
      canonical: `https://www.hypercodeus.com/${locale}/PP`,
    },
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('PrivacyPolicy');

  const pdfUrl =
    locale === 'es'
      ? '/legal/es/PP.pdf'
      : '/legal/en/PP.pdf';

  const sectionKeys = [
    'introduction',
    'collect',
    'use',
    'cookies',
    'sharing',
    'security',
    'rights',
    'changes',
    'contact'
  ] as const;

  return (
    <main className="relative w-full bg-white text-left">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-slate-50 pt-36 pb-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0F4C81] text-xs font-bold uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5" />
                <span>{t('legal')}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                {t('title')}
              </h1>
              <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl">
                {t('subtitle')}
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-400 uppercase tracking-wider">
                <Calendar className="w-4 h-4 text-slate-300" />
                <span>{t('lastUpdated')}</span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F4C81] hover:bg-[#0c3c66] text-white font-bold rounded-xl text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>{t('downloadPdf')}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

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
