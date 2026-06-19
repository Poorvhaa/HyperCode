import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { TechnologyExpertise } from '@/components/technology-expertise';
import { ServicesSection } from '@/components/services-section';
import { WhyHypercodeSection } from '@/components/why-hypercode-section';
import { CaseStudiesSection } from '@/components/case-studies-section';
import { CTASection } from '@/components/cta-section';
import { setRequestLocale } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative w-full">
      <Navigation />
      <HeroSection />
      <TechnologyExpertise />
      <ServicesSection />
      <WhyHypercodeSection />
      <CaseStudiesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
