import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { WhyHypercodeSection } from '@/components/why-hypercode-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { CTASection } from '@/components/cta-section';

export const metadata = {
  title: 'HyperCode | Data-Driven Solutions for Modern Enterprises',
  description: 'Transform your business with HyperCode - Business Intelligence, Data Analytics, and IT Staffing Solutions. Trusted by Fortune 500 companies and government agencies.',
  keywords: ['Business Intelligence', 'Data Analytics', 'IT Staffing', 'Data Warehousing', 'Consulting'],
};

export default function Page() {
  return (
    <main className="relative w-full">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <WhyHypercodeSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
