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
    title: `HyperCode | Data Engineering Solutions | ${tc('solutions')}`,
    description: "Enterprise Data Engineering solutions, ETL/ELT data pipelines, database integration, Fivetran/dbt modeling, and stream processing. Headquartered in Schaumburg, IL.",
    alternates: {
      canonical: localeUrl(locale, 'solutions/data-engineering-solutions'),
    },
  };
}

export default async function DataEngineeringSolutionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  
  return (
    <SolutionDetailPage locale={locale} pageKey="data-engineering-solutions"  />
  );
}
