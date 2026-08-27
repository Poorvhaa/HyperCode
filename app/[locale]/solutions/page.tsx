import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import SolutionsHubClient from './solutions-hub-client';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SolutionsPage' });
  const url = `https://www.hypercodeit.com/${locale}/solutions`;
  const title = `HyperCode | ${t('heroTitle')}`;
  const description = t('heroSubtitle');

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'en-US': 'https://www.hypercodeit.com/en/solutions',
        'es-US': 'https://www.hypercodeit.com/es/solutions',
        'x-default': 'https://www.hypercodeit.com/en/solutions',
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'HyperCode',
      locale: locale === 'en' ? 'en_US' : 'es_ES',
      type: 'website',
    },
  };
}

export default async function SolutionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SolutionsHubClient />;
}
