import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Building2, HeartPulse, Landmark, ShoppingBag, Factory, Laptop, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Industries | HyperCode',
  description: 'HyperCode serves Financial Services, Healthcare, Government, Retail, Manufacturing, and Technology.',
};

const industries = [
  {
    icon: Landmark,
    title: 'Financial Services',
    description: 'Drive compliance, reduce risk, and unlock insights from complex transaction records.',
    solutions: ['Risk Analytics', 'Fraud Detection', 'Customer Analytics', 'Regulatory Reporting'],
  },
  {
    icon: HeartPulse,
    title: 'Healthcare',
    description: 'Improve patient outcomes and operational scheduling with data-driven insights.',
    solutions: ['Patient Analytics', 'Operational Efficiency', 'Clinical Analytics', 'HIPAA Compliance'],
  },
  {
    icon: Building2,
    title: 'Government',
    description: 'Support mission-critical operations with secure, FedRAMP-aligned data systems.',
    solutions: ['Data Governance', 'Security Compliance', 'Business Intelligence', 'Auditing Solutions'],
  },
  {
    icon: ShoppingBag,
    title: 'Retail & E-commerce',
    description: 'Optimize inventory levels, enhance customer tracking, and increase basket value.',
    solutions: ['Customer Insights', 'Inventory Analytics', 'Sales Forecasting', 'Customer Data Platforms'],
  },
  {
    icon: Factory,
    title: 'Manufacturing',
    description: 'Improve production metrics and cut downtime using IoT sensor telemetry analytics.',
    solutions: ['Production Analytics', 'Supply Chain', 'Predictive Maintenance', 'Quality Control'],
  },
  {
    icon: Laptop,
    title: 'Technology',
    description: 'Build scalable pipelines and recruit certified cloud engineering squads.',
    solutions: ['Real-time Analytics', 'Data Pipelines', 'Cloud Architecture', 'IT Placement'],
  },
];

export default function IndustriesPage() {
  return (
    <main className="relative w-full bg-white text-left">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-slate-50 pt-36 pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Industry-Specific <span className="text-[#0F4C81]">Solutions</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
              Deep data engineering and recruitment expertise across Financial Services, Healthcare, Government, Retail, Manufacturing, and Technology.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <div
                  key={index}
                  className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4C81]">
                      <Icon size={20} />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{industry.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{industry.description}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Key Solutions</div>
                      <div className="space-y-1.5 text-xs font-semibold text-slate-600">
                        {industry.solutions.map((solution, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <div className="w-1 h-1 rounded-full bg-[#0F4C81]" />
                            <span>{solution}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] hover:text-[#0c3c66] transition-colors"
                    >
                      <span>Inquire Industry Solutions</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase">CASE RESULTS</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Enterprise Results</h3>
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
                className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4"
              >
                <span className="inline-block px-2.5 py-0.5 rounded bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                  Case Brief
                </span>
                <h3 className="text-base font-bold text-slate-900">{caseStudy.title}</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">{caseStudy.industry}</p>
                <div className="pt-4 border-t border-slate-100">
                  <p className="font-bold text-[#0F4C81] text-sm">{caseStudy.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Industry Solutions, Enterprise Results</h3>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto font-medium">
            Discover how HyperCode can resolve your industry-specific database, pipeline, or staffing needs.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-12 px-7 bg-[#0F4C81] text-white font-semibold text-[14px] rounded-xl hover:bg-[#0c3c66] transition-colors duration-200 shadow-sm"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
