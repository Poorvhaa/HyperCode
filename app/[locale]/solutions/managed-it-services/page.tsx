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

  const metadataMap = {
    en: {
      title: `HyperCode | Managed IT Services | ${tc('solutions')}`,
      description: "Enterprise Managed IT Services, IT infrastructure management, system monitoring, technical support, and cloud/network operations. Headquartered in Schaumburg, IL.",
    },
    es: {
      title: `HyperCode | Servicios de TI Gestionados | ${tc('solutions')}`,
      description: "Servicios de TI gestionados para empresas, gestión de infraestructura de TI, monitoreo de sistemas, soporte técnico y operaciones de nube/red. Con sede en Schaumburg, IL.",
    }
  };

  const currentSeo = metadataMap[locale as 'en' | 'es'] || metadataMap.en;
  const path = `solutions/${canonicalServiceSlug('managed-it-services')}`;

  return {
    title: currentSeo.title,
    description: currentSeo.description,
    alternates: buildAlternates(locale, path),
    openGraph: {
      title: currentSeo.title,
      description: currentSeo.description,
      url: localeUrl(locale, path),
      siteName: 'HyperCode',
      locale: locale === 'es' ? 'es_US' : 'en_US',
      type: 'website',
    },
  };
}

export default async function ManagedITServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <SolutionDetailPage locale={locale} pageKey="managed-it-services" />
  );
}
