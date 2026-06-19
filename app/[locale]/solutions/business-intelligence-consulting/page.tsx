import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SolutionDetailPage } from '@/components/solution-detail-page';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: 'Common' });
  return {
    title: `Business Intelligence Consulting | ${tc('solutions')} | HyperCode`,
    description: "Enterprise Business Intelligence consulting, Power BI/Tableau dashboard creation, self-service BI setups, and data visualization. Headquartered in Schaumburg, IL.",
    alternates: {
      canonical: `https://www.hypercode.com/${locale}/solutions/business-intelligence-consulting`,
    },
  };
}

export default async function BusinessIntelligenceConsultingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tc = await getTranslations('Common');

  return (
    <SolutionDetailPage locale={locale} pageKey="business-intelligence-consulting" tc={tc} />
  );
}
