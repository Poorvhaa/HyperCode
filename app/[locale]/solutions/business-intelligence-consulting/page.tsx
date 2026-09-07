import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SolutionDetailPage } from '@/components/solution-detail-page';
import { buildAlternates, localeUrl } from '@/lib/site-url';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: 'Common' });
  const title = `HyperCode | Business Intelligence Consulting | ${tc('solutions')}`;
  const description = "Enterprise Business Intelligence consulting, Power BI/Tableau dashboard creation, self-service BI setups, and data visualization. Headquartered in Schaumburg, IL.";
  const path = 'solutions/business-intelligence-consulting';

  return {
    title,
    description,
    alternates: buildAlternates(locale, path),
    openGraph: {
      title,
      description,
      url: localeUrl(locale, path),
      siteName: 'HyperCode',
      locale: locale === 'es' ? 'es_US' : 'en_US',
      type: 'website',
    },
  };
}

export default async function BusinessIntelligenceConsultingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  
  return (
    <SolutionDetailPage locale={locale} pageKey="business-intelligence-consulting"  />
  );
}
