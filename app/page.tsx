import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { TrustSection } from '@/components/trust-section';
import { WhoWeHelpSection } from '@/components/who-we-help-section';
import { ServicesSection } from '@/components/services-section';
import { WhyHypercodeSection } from '@/components/why-hypercode-section';
import { TechnologyEcosystem } from '@/components/technology-ecosystem';
import { StaffingExperience } from '@/components/staffing-experience';
import { CaseStudiesSection } from '@/components/case-studies-section';
import { HumanCenteredSection } from '@/components/human-centered-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { InsightsSection } from '@/components/insights-section';
import { CTASection } from '@/components/cta-section';

export const metadata = {
  title: 'HyperCode | Transforming Data Into Strategic Intelligence',
  description: 'HyperCode helps organizations unlock growth through Business Intelligence, Data Analytics, Data Engineering, and Strategic IT Staffing. Trusted by Fortune 500 companies and government agencies.',
  keywords: [
    'Business Intelligence',
    'Data Analytics',
    'IT Staffing',
    'Data Warehousing',
    'Consulting',
    'Data Engineering',
    'Microsoft Fabric',
    'Snowflake',
    'Databricks',
    'Agile Consulting',
  ],
};

export default function Page() {
  return (
    <main className="relative w-full">
      <Navigation />
      <HeroSection />
      <TrustSection />
      <WhoWeHelpSection />
      <ServicesSection />
      <WhyHypercodeSection />
      <TechnologyEcosystem />
      <StaffingExperience />
      <CaseStudiesSection />
      <HumanCenteredSection />
      <TestimonialsSection />
      <InsightsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
