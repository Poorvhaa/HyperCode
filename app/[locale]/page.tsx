import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { PremiumHero } from '@/components/homepage/premium-hero';
import { TrustCredibilitySection } from '@/components/homepage/trust-credibility-section';
import { setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';

const TransformationEngine = dynamic(() => import('@/components/homepage/transformation-engine/transformation-engine').then(m => m.TransformationEngine));
const ServiceEcosystem = dynamic(() => import('@/components/homepage/service-ecosystem').then(m => m.ServiceEcosystem));
const IndustryShowcase = dynamic(() => import('@/components/homepage/industry-showcase').then(m => m.IndustryShowcase));
const CaseStudiesSection = dynamic(() => import('@/components/case-studies-section').then(m => m.CaseStudiesSection));
const DeliveryProcess = dynamic(() => import('@/components/homepage/delivery-process').then(m => m.DeliveryProcess));
const InsightsSection = dynamic(() => import('@/components/insights-section').then(m => m.InsightsSection));
const FinalCTA = dynamic(() => import('@/components/homepage/final-cta').then(m => m.FinalCTA));
const ThemeObserver = dynamic(() => import('@/components/homepage/theme-observer').then(m => m.ThemeObserver));

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative w-full max-w-full min-w-0 bg-[var(--landing-light)]">
      {/* Client theme observer to monitor scrolling states */}
      <ThemeObserver />
      
      <Navigation />
      
      {/* 1. Premium animated hero */}
      <PremiumHero />
      
      {/* 2. Trust and credibility */}
      <TrustCredibilitySection />
      
      {/* 3. HyperCode Transformation Engine */}
      <TransformationEngine />
      
      {/* 4. Interactive service ecosystem */}
      <ServiceEcosystem />
      
      {/* 5. Industry solutions */}
      <IndustryShowcase />
      
      {/* 6. Selected case studies */}
      <CaseStudiesSection />
      
      {/* 7. Delivery process */}
      <DeliveryProcess />
      
      {/* 8. Insights / thought leadership */}
      <InsightsSection />
      
      {/* 9. Final CTA */}
      <FinalCTA />
      
      <Footer />
    </main>
  );
}
