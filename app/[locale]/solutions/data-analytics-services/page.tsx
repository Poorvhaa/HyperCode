import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SolutionDetailPage } from '@/components/solution-detail-page';
import { localeUrl } from '@/lib/site-url';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: 'Common' });
  return {
    title: `HyperCode | Data Analytics Services | ${tc('solutions')}`,
    description: "Enterprise Data Analytics services, predictive modeling, statistical research, customer analytics, and business forecasting. Headquartered in Schaumburg, IL.",
    alternates: {
      canonical: localeUrl(locale, 'solutions/data-analytics-services'),
    },
  };
}

export default async function DataAnalyticsServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  
  return (
    <SolutionDetailPage locale={locale} pageKey="data-analytics-services"  />
  );
}
