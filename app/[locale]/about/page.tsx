import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { AboutClient } from '@/components/about/about-client';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: 'Common' });
  const t = await getTranslations({ locale, namespace: 'About' });
  
  return {
    title: `HyperCode | ${tc('about')}`,
    description: t('subtitle'),
    alternates: {
      canonical: `https://www.hypercodeit.com/${locale}/about`,
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('About');
  const tc = await getTranslations('Common');

  // Serialize the required translation keys into a dictionary object for the client component
  const keysToSerialize = [
    'pillars',
    'title',
    'titleHighlight',
    'subtitle',
    'storyTitle',
    'storyP1',
    'storyP2',
    'mission',
    'missionDesc',
    'vision',
    'visionDesc',
    'valuesTitle',
    'approachTitle',
    'approachDesc',
    'presenceTitle',
    'presenceDesc',
    'stats.projectsLabel',
    'stats.projects',
    'stats.satisfactionLabel',
    'stats.satisfaction',
    'stats.consultantsLabel',
    'stats.consultants',
    'stats.experienceLabel',
    'stats.experience',
    'values.innovation.title',
    'values.innovation.desc',
    'values.integrity.title',
    'values.integrity.desc',
    'values.partnership.title',
    'values.partnership.desc',
    'values.excellence.title',
    'values.excellence.desc'
  ];

  const serializedAbout: Record<string, string> = {};
  keysToSerialize.forEach((key) => {
    serializedAbout[key] = t(key);
  });

  const serializedCommon: Record<string, string> = {
    consultation: tc('consultation')
  };

  return (
    <main className="relative w-full bg-white text-left min-h-screen flex flex-col justify-between">
      <Navigation />
      <div className="flex-grow">
        <AboutClient 
          locale={locale} 
          tAbout={serializedAbout} 
          tCommon={serializedCommon} 
        />
      </div>
      <Footer />
    </main>
  );
}
