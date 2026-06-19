import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SolutionDetailPage } from '@/components/solution-detail-page';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: 'Common' });
  return {
    title: `Enterprise Web Development Services | ${tc('solutions')} | HyperCode`,
    description: "Designing and developing modern, scalable, secure, and high-performance web applications using React, Next.js, and Node.js. Headquartered in Schaumburg, IL.",
    alternates: {
      canonical: `https://www.hypercode.com/${locale}/solutions/web-development-services`,
    },
  };
}

export default async function WebDevelopmentServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tc = await getTranslations('Common');

  return (
    <SolutionDetailPage locale={locale} pageKey="web-development-services" tc={tc} />
  );
}
