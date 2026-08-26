import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { getCaseStudies } from '@/lib/case-studies-data';
import { CaseStudies } from '@/components/case-studies';
import { HeroBanner } from '@/components/hero-banner';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CaseStudies' });
  return {
    title: `HyperCode | ${t('title')}`,
    description: t('subtitle'),
    alternates: {
      canonical: `https://www.hypercodeit.com/${locale}/case-studies`,
    },
  };
}

export default async function CaseStudiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('CaseStudies');
  const studies = getCaseStudies(locale);

  return (
    <main className="relative w-full bg-white text-left min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <HeroBanner
        bgImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600"
        categoryLabel={locale === 'es' ? 'CASOS DE ÉXITO' : 'CASE STUDIES'}
        title={locale === 'es' ? 'Historias de Éxito Empresariales' : 'Enterprise Success Stories'}
        titleHighlight=""
        subtitle={t('subtitle')}
        breadcrumbs={[
          { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
          { label: locale === 'es' ? 'Casos de Estudio' : 'Case Studies' }
        ]}
      />

      {/* Main Case Studies Grid Section */}
      <section className="section-padding bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-h2 text-slate-900">
              {locale === 'es' ? 'Impacto Empresarial Real' : 'Real Business Impact'}
            </h2>
            <p className="text-body text-slate-500 font-medium">
              {locale === 'es' ? 'Explore cómo ayudamos a organizaciones de todo el mundo a optimizar sus arquitecturas de datos, automatizar flujos de trabajo con inteligencia artificial y modernizar sus sistemas.' :
               'Explore how we partner with leading enterprises to build scalable data platforms, automate complex workflows with generative AI, and deliver modern software solutions.'}
            </p>
          </div>

          <CaseStudies studies={studies} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
