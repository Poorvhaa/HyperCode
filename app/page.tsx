import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { TechnologyExpertise } from '@/components/technology-expertise';
import { ServicesSection } from '@/components/services-section';
import { WhyHypercodeSection } from '@/components/why-hypercode-section';
import { CaseStudiesSection } from '@/components/case-studies-section';
import { CTASection } from '@/components/cta-section';

export const metadata = {
  title: 'Data Analytics, Web Development & IT Staffing Consulting | HyperCode',
  description: 'HyperCode is an enterprise Web Development, Business Intelligence, Data Analytics, and IT Staffing consulting firm. Headquartered in Schaumburg, IL, serving clients nationwide.',
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
    'Web Development Services',
    'Custom Web Applications',
    'Enterprise Web Development',
    'React Development',
    'Next.js Development',
    'Full Stack Development',
    'Software Development Services',
  ],
};

export default function Page() {
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
