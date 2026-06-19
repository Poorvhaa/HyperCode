import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SolutionDetailPage } from '@/components/solution-detail-page';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: 'Common' });
  return {
    title: `Data Analytics Services | ${tc('solutions')} | HyperCode`,
    description: "Enterprise Data Analytics services, predictive modeling, statistical research, customer analytics, and business forecasting. Headquartered in Schaumburg, IL.",
    alternates: {
      canonical: `https://www.hypercode.com/${locale}/solutions/data-analytics-services`,
    },
  };
}

export default async function DataAnalyticsServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tc = await getTranslations('Common');

  return (
    <SolutionDetailPage locale={locale} pageKey="data-analytics-services" tc={tc} />
  );
}
