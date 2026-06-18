import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { TechPartnersSection } from '@/components/tech-partners-section';
import { WhoWeHelpSection } from '@/components/who-we-help-section';
import { ServicesSection } from '@/components/services-section';
import { WhyHypercodeSection } from '@/components/why-hypercode-section';
import { CaseStudiesSection } from '@/components/case-studies-section';
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
      <ServicesSection />
      <WhyHypercodeSection />
      <WhoWeHelpSection />
      <CaseStudiesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
