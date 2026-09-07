import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SolutionDetailPage } from '@/components/solution-detail-page';
import { buildAlternates, localeUrl } from '@/lib/site-url';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: 'Common' });
  const title = `HyperCode | Enterprise Web Development Services | ${tc('solutions')}`;
  const description = "Designing and developing modern, scalable, secure, and high-performance web applications using React, Next.js, and Node.js. Headquartered in Schaumburg, IL.";
  const path = 'solutions/web-development-services';

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

export default async function WebDevelopmentServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  
  return (
    <SolutionDetailPage locale={locale} pageKey="web-development-services"  />
  );
}
