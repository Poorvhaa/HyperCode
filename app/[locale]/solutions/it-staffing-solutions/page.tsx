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
      title: `HyperCode | IT & Non-IT Staffing Solutions | ${tc('solutions')}`,
      description: "Enterprise IT & Non-IT Staffing Solutions, contract placement, contract-to-hire, direct placements, executive search, bulk hiring, and recruitment process outsourcing (RPO). Headquartered in Schaumburg, IL.",
    },
    es: {
      title: `HyperCode | Contratación de Personal de TI y No TI | ${tc('solutions')}`,
      description: "Soluciones de contratación de personal de TI y no TI, colocación por contrato, contrato con opción a compra, colocaciones directas, búsqueda ejecutiva, contratación masiva y externalización de procesos de reclutamiento (RPO). Con sede en Schaumburg, IL.",
    }
  };

  const currentSeo = metadataMap[locale as 'en' | 'es'] || metadataMap.en;

  return {
    title: currentSeo.title,
    description: currentSeo.description,
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
