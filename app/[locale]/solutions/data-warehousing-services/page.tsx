import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SolutionDetailPage } from '@/components/solution-detail-page';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: 'Common' });
  return {
    title: `HyperCode | Data Warehousing Services | ${tc('solutions')}`,
    description: "Enterprise Cloud Data Warehousing services, database migration, Snowflake/BigQuery architectures, and data lakehouse deployment. Headquartered in Schaumburg, IL.",
    alternates: {
      canonical: `https://www.hypercode.com/${locale}/solutions/data-warehousing-services`,
    },
  };
}

export default async function DataWarehousingServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tc = await getTranslations('Common');

  return (
    <SolutionDetailPage locale={locale} pageKey="data-warehousing-services" tc={tc} />
  );
}
