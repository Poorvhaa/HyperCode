import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Building2, TrendingUp, Shield, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Industries | HyperCode',
  description: 'HyperCode serves Financial Services, Healthcare, Government, Retail, Manufacturing, Technology, Logistics, and Telecommunications.',
};

const industries = [
  {
    icon: Building2,
    title: 'Financial Services',
    description: 'Drive compliance, reduce risk, and unlock insights from complex financial data.',
    solutions: ['Risk Analytics', 'Fraud Detection', 'Customer Analytics', 'Regulatory Reporting'],
    caseStudies: 2,
  },
  {
    icon: Shield,
    title: 'Healthcare',
    description: 'Improve patient outcomes and operational efficiency with data-driven insights.',
    solutions: ['Patient Analytics', 'Operational Efficiency', 'Clinical Analytics', 'Revenue Cycle'],
    caseStudies: 2,
  },
  {
    icon: Zap,
    title: 'Government',
    description: 'Support mission-critical operations with secure, scalable data solutions.',
    solutions: ['Data Governance', 'Security Compliance', 'Business Intelligence', 'Analytics'],
    caseStudies: 2,
  },
  {
    icon: TrendingUp,
    title: 'Retail & E-commerce',
    description: 'Optimize inventory, enhance customer experience, and maximize revenue.',
    solutions: ['Customer Insights', 'Inventory Analytics', 'Sales Forecasting', 'Pricing Intelligence'],
    caseStudies: 1,
  },
  {
    icon: Building2,
    title: 'Manufacturing',
    description: 'Improve production efficiency and reduce costs with predictive analytics.',
    solutions: ['Production Analytics', 'Supply Chain', 'Predictive Maintenance', 'Quality Control'],
    caseStudies: 1,
  },
  {
    icon: Zap,
    title: 'Technology',
    description: 'Build scalable platforms and optimize operations with modern data architecture.',
    solutions: ['Real-time Analytics', 'Data Pipelines', 'Cloud Architecture', 'AI/ML Integration'],
    caseStudies: 2,
  },
  {
    icon: Building2,
    title: 'Logistics',
    description: 'Optimize routes, predict demand, and streamline operations.',
    solutions: ['Route Optimization', 'Demand Forecasting', 'Fleet Analytics', 'Supply Chain'],
    caseStudies: 1,
  },
  {
    icon: Zap,
    title: 'Telecommunications',
    description: 'Enhance network performance and customer retention with advanced analytics.',
    solutions: ['Customer Churn', 'Network Analytics', 'Service Quality', 'Revenue Analytics'],
    caseStudies: 1,
  },
];

export default function IndustriesPage() {
  return (
    <main className="relative w-full">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-[60vh] bg-gradient-to-b from-background to-muted/30 pt-32 pb-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Industry-Specific Solutions
            </h1>
            <p className="text-xl text-foreground/60 max-w-3xl mx-auto">
              Deep expertise across Financial Services, Healthcare, Government, Retail, Manufacturing, Technology, Logistics, and Telecommunications.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <div
                  key={index}
                  className="group relative p-8 rounded-xl border border-border/40 bg-card hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Icon size={24} className="text-white" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{industry.title}</h3>
                      <p className="text-foreground/60 text-sm leading-relaxed">{industry.description}</p>
                    </div>

                    <div className="pt-4 border-t border-border/40 space-y-3">
                      <div className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">Key Solutions</div>
                      <div className="space-y-1">
                        {industry.solutions.map((solution, i) => (
                          <div key={i} className="text-sm text-foreground/60">• {solution}</div>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1 text-accent font-medium text-sm group-hover:gap-2 transition-all"
                    >
                      Learn More
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-foreground">See How We Drive Results</h2>
            <p className="text-xl text-foreground/60">Real examples of transformation across industries</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'BI Dashboard Modernization',
                industry: 'Financial Services',
                result: '60% reduction in reporting time',
              },
              {
                title: 'Cloud Data Warehouse Migration',
                industry: 'Retail & E-commerce',
                result: '40% cost reduction year-over-year',
              },
              {
                title: 'Enterprise Staffing Transformation',
                industry: 'Technology',
                result: '35% improvement in hiring velocity',
              },
            ].map((caseStudy, i) => (
              <div
                key={i}
                className="group p-8 rounded-xl border border-border/40 bg-card hover:border-accent/50 transition-all duration-300"
              >
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                    Case Study
                  </span>
                  <h3 className="text-lg font-bold text-foreground">{caseStudy.title}</h3>
                  <p className="text-sm text-foreground/60">{caseStudy.industry}</p>
                  <div className="pt-4 border-t border-border/40">
                    <p className="font-semibold text-primary">{caseStudy.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-primary/10 to-accent/10 border-y border-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-4xl font-bold text-foreground">Industry Solutions, Enterprise Results</h2>
          <p className="text-xl text-foreground/60">
            Discover how HyperCode can solve your industry-specific challenges.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-1 group"
          >
            Schedule Consultation
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
