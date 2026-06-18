import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { TechPartnersSection } from '@/components/tech-partners-section';
import { TrustSection } from '@/components/trust-section';
import { WhoWeHelpSection } from '@/components/who-we-help-section';
import { ServicesSection } from '@/components/services-section';
import { BusinessOutcomesSection } from '@/components/business-outcomes-section';
import { WhyHypercodeSection } from '@/components/why-hypercode-section';
import { TechnologyEcosystem } from '@/components/technology-ecosystem';
import { StaffingExperience } from '@/components/staffing-experience';
import { CaseStudiesSection } from '@/components/case-studies-section';
import { HumanCenteredSection } from '@/components/human-centered-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { InsightsSection } from '@/components/insights-section';
import { CTASection } from '@/components/cta-section';

export const metadata = {
  title: 'Business Intelligence & Data Analytics Consulting | HyperCode',
  description: 'HyperCode is an enterprise Business Intelligence, Data Analytics, Data Engineering, and IT Staffing consulting firm. Headquartered in Schaumburg, IL.',
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
      <TechPartnersSection />
      <TrustSection />
      <WhoWeHelpSection />
      <ServicesSection />
      <BusinessOutcomesSection />
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
