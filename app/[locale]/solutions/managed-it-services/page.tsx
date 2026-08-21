import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SolutionDetailPage } from '@/components/solution-detail-page';

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

  return {
    title: currentSeo.title,
    description: currentSeo.description,
    alternates: {
      canonical: `https://www.hypercodeit.com/${locale}/solutions/managed-it-services`,
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
