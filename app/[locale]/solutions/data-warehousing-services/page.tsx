import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SolutionDetailPage } from '@/components/solution-detail-page';
import { buildAlternates, localeUrl } from '@/lib/site-url';
import { canonicalServiceSlug } from '@/lib/services-details';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: 'Common' });
  const title = `HyperCode | Data Warehousing Services | ${tc('solutions')}`;
  const description = "Enterprise Cloud Data Warehousing services, database migration, Snowflake/BigQuery architectures, and data lakehouse deployment. Headquartered in Schaumburg, IL.";
  const path = `solutions/${canonicalServiceSlug('data-warehousing-services')}`;

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

export default async function DataWarehousingServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  
  return (
    <SolutionDetailPage locale={locale} pageKey="data-warehousing-services"  />
  );
}
