import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SolutionDetailPage } from '@/components/solution-detail-page';
import { buildAlternates, localeUrl } from '@/lib/site-url';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: 'Common' });
  const title = `HyperCode | Staff Augmentation Services | ${tc('solutions')}`;
  const description = "Enterprise IT Staff Augmentation services. Scale your technology, engineering, and data analytics teams with pre-screened specialists. Headquartered in Schaumburg, IL.";
  const path = 'solutions/staff-augmentation-services';

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

export default async function StaffAugmentationServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  
  return (
    <SolutionDetailPage locale={locale} pageKey="staff-augmentation-services"  />
  );
}
