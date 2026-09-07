import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SolutionsClient } from '@/components/solutions/solutions-client';
import { buildAlternates, localeUrl } from '@/lib/site-url';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: 'Common' });

  const metadataMap = {
    en: {
      title: `HyperCode | Enterprise Technology Consulting & Solutions | ${tc('solutions')}`,
      description: "Accelerating business value through Custom Software Engineering, Generative AI, cloud scaling, and IT & Non-IT staffing services. Headquartered in Schaumburg, IL.",
    },
    es: {
      title: `HyperCode | Consultoría Tecnológica Empresarial y Soluciones | ${tc('solutions')}`,
      description: "Acelerando el valor empresarial mediante ingeniería de software personalizada, IA generativa, escalabilidad en la nube y dotación de personal de TI y No TI. Con sede en Schaumburg, IL.",
    },
  };

  const currentSeo = metadataMap[locale as 'en' | 'es'] || metadataMap.en;

  return {
    title: currentSeo.title,
    description: currentSeo.description,
    alternates: buildAlternates(locale, 'solutions'),
    openGraph: {
      title: currentSeo.title,
      description: currentSeo.description,
      url: localeUrl(locale, 'solutions'),
      siteName: 'HyperCode',
      locale: locale === 'en' ? 'en_US' : 'es_ES',
      type: 'website',
    },
  };
}

export default async function SolutionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SolutionsClient />;
}
