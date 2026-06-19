import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SolutionDetailPage } from '@/components/solution-detail-page';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: 'Common' });
  return {
    title: `Data Engineering Solutions | ${tc('solutions')} | HyperCode`,
    description: "Enterprise Data Engineering solutions, ETL/ELT data pipelines, database integration, Fivetran/dbt modeling, and stream processing. Headquartered in Schaumburg, IL.",
    alternates: {
      canonical: `https://www.hypercode.com/${locale}/solutions/data-engineering-solutions`,
    },
  };
}

export default async function DataEngineeringSolutionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tc = await getTranslations('Common');

  return (
    <SolutionDetailPage locale={locale} pageKey="data-engineering-solutions" tc={tc} />
  );
}
