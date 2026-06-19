import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SolutionDetailPage } from '@/components/solution-detail-page';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: 'Common' });
  return {
    title: `IT Staffing Solutions | ${tc('solutions')} | HyperCode`,
    description: "Enterprise IT Staffing Solutions, contract placement, contract-to-hire, direct placements, and recruiting technologies. Headquartered in Schaumburg, IL.",
    alternates: {
      canonical: `https://www.hypercode.com/${locale}/solutions/it-staffing-solutions`,
    },
  };
}

export default async function ITStaffingSolutionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tc = await getTranslations('Common');

  return (
    <SolutionDetailPage locale={locale} pageKey="it-staffing-solutions" tc={tc} />
  );
}
