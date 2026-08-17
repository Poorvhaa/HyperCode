import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { PremiumHero } from '@/components/homepage/premium-hero';
import { TrustSection } from '@/components/trust-section';
import { TechPartnersSection } from '@/components/tech-partners-section';
import { TransformationEngine } from '@/components/homepage/transformation-engine/transformation-engine';
import { ServiceEcosystem } from '@/components/homepage/service-ecosystem';
import { IndustryShowcase } from '@/components/homepage/industry-showcase';
import { CaseStudiesSection } from '@/components/case-studies-section';
import { DeliveryProcess } from '@/components/homepage/delivery-process';
import { FinalCTA } from '@/components/homepage/final-cta';
import { ThemeObserver } from '@/components/homepage/theme-observer';
import { setRequestLocale } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative w-full bg-white">
      {/* Client theme observer to monitor scrolling states */}
      <ThemeObserver />
      
      <Navigation />
      
      {/* 1. Premium animated hero */}
      <PremiumHero />
      
      {/* 2. Trust and measurable impact */}
      <div data-section-theme="light">
        <TechPartnersSection />
        <TrustSection />
      </div>
      
      {/* 3. HyperCode Transformation Engine */}
      <TransformationEngine />
      
      {/* 4. Interactive service ecosystem */}
      <ServiceEcosystem />
      
      {/* 5. Industry solutions */}
      <IndustryShowcase />
      
      {/* 6. Selected case studies */}
      <div data-section-theme="light">
        <CaseStudiesSection />
      </div>
      
      {/* 7. Delivery process */}
      <DeliveryProcess />
      
      {/* 9. Final CTA */}
      <FinalCTA />
      
      <Footer />
    </main>
  );
}
