import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SolutionDetailPage } from '@/components/solution-detail-page';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: 'Common' });
  return {
    title: `HyperCode | Staff Augmentation Services | ${tc('solutions')}`,
    description: "Enterprise IT Staff Augmentation services. Scale your technology, engineering, and data analytics teams with pre-screened specialists. Headquartered in Schaumburg, IL.",
    alternates: {
      canonical: `https://www.hypercode.com/${locale}/solutions/staff-augmentation-services`,
    },
  };
}

export default async function StaffAugmentationServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  
  return (
    <SolutionDetailPage locale={locale} pageKey="staff-augmentation-services"  />
  );
}
