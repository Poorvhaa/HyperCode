import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Data Analytics Services | HyperCode',
  description: 'Enterprise Data Analytics services, predictive modeling, statistical research, customer analytics, and business forecasting. Headquartered in Schaumburg, IL.',
  alternates: {
    canonical: 'https://www.hypercode.com/solutions/data-analytics-services',
  },
};

export default function DataAnalyticsServicesPage() {
  const benefits = [
    {
      title: 'Predictive Modeling',
      desc: 'Build custom machine learning and statistical models to forecast customer demand, sales volumes, and market trends.',
    },
    {
      title: 'Customer Behavior Tracking',
      desc: 'Map user journeys, calculate customer lifetime value (CLV), and build retention strategies backed by quantitative statistics.',
    },
    {
      title: 'Operational Optimization',
      desc: 'Identify database inefficiencies, resource bottlenecks, and supply chain delays using structured data science dashboards.',
    },
    {
      title: 'Advanced Machine Learning',
      desc: 'Integrate artificial intelligence pipelines to automate categorization, anomaly detection, and classification tasks.',
    },
  ];

  const technologies = [
    { name: 'Python', role: 'Machine learning, predictive algorithms, and statistical analysis' },
    { name: 'R', role: 'Advanced academic statistics and deep database research' },
    { name: 'SQL', role: 'Complex queries, dataset manipulation, and staging setups' },
    { name: 'Apache Spark', role: 'Distributed compute processing for high-volume datasets' },
  ];

  const industries = [
    { name: 'Financial Services', useCase: 'Portfolio optimization, stock forecasts, and predictive risk management.' },
    { name: 'Healthcare', useCase: 'Patient readmission predictions and clinical dataset reporting.' },
    { name: 'Retail & E-commerce', useCase: 'Inventory demand forecasts, churn analytics, and product recommendation.' },
    { name: 'Technology', useCase: 'Product analytics, feature engagement reports, and operational downtime prediction.' },
  ];

  return (
    <main className="relative w-full bg-white text-left">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-slate-50 pt-36 pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-4">
            <span className="text-[10px] font-bold text-[#0F4C81] tracking-widest uppercase bg-white border border-slate-150 px-2.5 py-1 rounded-md">
              Enterprise Solutions
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Data Analytics <span className="text-[#0F4C81]">Services</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
              Unlock strategic advantage with predictive models, statistical forecasting, and machine learning integration.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Drive Growth with Advanced Predictive Science
          </h2>
          <div className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium space-y-4">
            <p>
              Traditional reporting models look backward, telling you what happened in the past. Modern enterprises, however, require predictive analytics to anticipate user preferences, adjust operational strategies, and prevent churn before it impacts revenue.
            </p>
            <p>
              At HyperCode, our data science teams help you deploy advanced analytics capabilities. We clean complex datasets, develop custom predictive models in Python and R, and build analytics loops that feed directly back into your core business applications.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">Key Solutions</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Measurable Analytics Impact</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                  <CheckCircle size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900">{benefit.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Expertise Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">Technology Stack</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Our Analytics Toolkit</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, i) => (
              <div key={i} className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="px-3 py-1 bg-slate-50 border border-slate-150 text-[#0F4C81] rounded-lg text-xs font-bold uppercase tracking-wider inline-block">
                    {tech.name}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {tech.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served Section */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">Domain Experience</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Industries We Serve</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industries.map((ind, i) => (
              <div key={i} className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-2">
                <h4 className="text-base font-bold text-slate-900">{ind.name}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{ind.useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Gen Call-To-Action (Strategic Placement) */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Ready to Leverage Advanced Analytics?
          </h3>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto font-medium">
            Schedule a consultation with our data science team to review your data assets and plan predictive modeling.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?service=Data%20Analytics"
              className="inline-flex items-center justify-center h-12 px-7 bg-[#0F4C81] text-white font-semibold text-[14px] rounded-xl hover:bg-[#0c3c66] transition-colors duration-200 shadow-sm"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-12 px-7 bg-white border border-slate-200 text-slate-700 font-semibold text-[14px] rounded-xl hover:bg-slate-50 transition-colors duration-200"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
