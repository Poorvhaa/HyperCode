import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { BarChart3, TrendingUp, Database, Check, ArrowRight, Cpu, Binary } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Data Analytics, BI & Data Engineering Services | HyperCode',
  description: 'Explore HyperCode\'s comprehensive enterprise business services including Business Intelligence, Data Analytics, Data Warehousing, and Data Engineering. Headquartered in Schaumburg, IL.',
  alternates: {
    canonical: 'https://www.hypercode.com/solutions',
  },
};

const solutions = [
  {
    id: 1,
    icon: BarChart3,
    title: 'Business Intelligence',
    shortDesc: 'Power BI, Tableau, and Advanced Reporting',
    path: '/solutions/business-intelligence-consulting',
    benefits: [
      'Real-time dashboard creation',
      'Interactive data visualization',
      'Automated reporting workflows',
      'Data-informed decision making',
      'Executive scorecards',
      'Self-service analytics',
    ],
    technologies: ['Power BI', 'Tableau', 'Qlik', 'Looker'],
    process: ['Assessment', 'Design', 'Implementation', 'Training', 'Support'],
  },
  {
    id: 2,
    icon: TrendingUp,
    title: 'Data Analytics',
    shortDesc: 'Predictive Analytics & Insights',
    path: '/solutions/data-analytics-services',
    benefits: [
      'Predictive modeling',
      'Statistical analysis',
      'Machine learning integration',
      'Customer behavior analysis',
      'Market trend identification',
      'Performance optimization',
    ],
    technologies: ['Python', 'R', 'SQL', 'Apache Spark'],
    process: ['Data Collection', 'Analysis', 'Modeling', 'Validation', 'Deployment'],
  },
  {
    id: 3,
    icon: Database,
    title: 'Data Warehousing',
    shortDesc: 'ETL, Data Lakes & Cloud Architecture',
    path: '/solutions/data-warehousing-services',
    benefits: [
      'Enterprise data integration',
      'Cloud-native architecture',
      'Scalable data lakes',
      'ETL automation',
      'Data quality management',
      'Cost optimization',
    ],
    technologies: ['Snowflake', 'BigQuery', 'Redshift', 'Azure Synapse'],
    process: ['Planning', 'Design', 'Migration', 'Optimization', 'Maintenance'],
  },
  {
    id: 4,
    icon: Cpu,
    title: 'Data Engineering',
    shortDesc: 'Data Integration, Pipelines & Automation',
    path: '/solutions/data-engineering-solutions',
    benefits: [
      'Robust ETL/ELT pipelines',
      'Real-time data ingestion',
      'Data quality and validation',
      'API integrations',
      'Pipeline monitoring',
      'Schema migration automation',
    ],
    technologies: ['Airflow', 'dbt', 'Fivetran', 'Prefect'],
    process: ['Assessment', 'Pipeline Design', 'Development', 'Testing', 'Deployment'],
  },
  {
    id: 5,
    icon: Binary,
    title: 'Big Data Solutions',
    shortDesc: 'Hadoop, Spark & Cloud Analytics',
    path: '/contact',
    benefits: [
      'Large-scale data processing',
      'Real-time streaming analytics',
      'Distributed computing',
      'Data pipeline orchestration',
      'Performance optimization',
      'Cost efficiency at scale',
    ],
    technologies: ['Hadoop', 'Spark', 'Kafka', 'Flink'],
    process: ['Architecture', 'Setup', 'Development', 'Testing', 'Deployment'],
  },
];

export default function SolutionsPage() {
  return (
    <main className="relative w-full bg-white text-left">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-slate-50 pt-36 pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Enterprise Solutions for <span className="text-[#0F4C81]">Data Success</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
              Comprehensive database architectures and reporting tools designed to transform your operations and drive business growth.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {solutions.map((solution) => {
              const Icon = solution.icon;
              const id = solution.title === 'Big Data Solutions' ? 'big-data' : solution.title.toLowerCase().replace(/\s+/g, '-');
              return (
                <div key={solution.id} id={id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch scroll-mt-24">
                  {/* Left: Content */}
                  <div className="space-y-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                          <Icon size={20} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">{solution.title}</h2>
                      </div>
                      <p className="text-sm font-bold text-[#0F4C81] uppercase tracking-wide">{solution.shortDesc}</p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-sm font-bold text-slate-900">Key Benefits</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-slate-600">
                        {solution.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <Check size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-sm font-bold text-slate-900">Technologies</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {solution.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-slate-50 border border-slate-150 text-slate-500 rounded-lg text-xs font-bold uppercase tracking-wider"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={solution.path}
                        className="inline-flex items-center justify-center h-10 px-5 bg-[#0F4C81] text-white font-semibold text-xs rounded-xl hover:bg-[#0c3c66] transition-colors duration-200"
                      >
                        <span>Learn More</span>
                        <ArrowRight size={14} className="ml-1.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Right: Process Card */}
                  <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
                    <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">Our Process</h3>
                    <div className="space-y-4">
                      {solution.process.map((step, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs">
                            {i + 1}
                          </div>
                          <div className="flex-1 pt-1.5">
                            <p className="text-sm font-bold text-slate-800">{step}</p>
                            {i < solution.process.length - 1 && (
                              <div className="w-px h-8 bg-slate-200 ml-4 mt-2" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Ready to Transform Your Data?</h3>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto font-medium">
            Schedule a consultation with our principal consultants to analyze your databases and reporting tools.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-12 px-7 bg-[#0F4C81] text-white font-semibold text-[14px] rounded-xl hover:bg-[#0c3c66] transition-colors duration-200 shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
