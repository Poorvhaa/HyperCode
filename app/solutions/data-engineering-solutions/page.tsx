import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Data Engineering Solutions | HyperCode',
  description: 'Enterprise Data Engineering solutions, ETL/ELT data pipelines, database integration, Fivetran/dbt modeling, and stream processing. Headquartered in Schaumburg, IL.',
  alternates: {
    canonical: 'https://www.hypercode.com/solutions/data-engineering-solutions',
  },
};

export default function DataEngineeringSolutionsPage() {
  const benefits = [
    {
      title: 'Robust ETL/ELT Pipelines',
      desc: 'Build fault-tolerant data pipelines that extract, transform, and load data from dozens of endpoints into unified cloud systems.',
    },
    {
      title: 'Automated Data Modeling',
      desc: 'Standardize business logic and automate data testing using dbt, improving data accuracy and reducing analysis failures.',
    },
    {
      title: 'Real-Time Ingestion',
      desc: 'Deploy low-latency stream processing pipelines to capture telemetry logs, transaction queues, and clickstreams instantly.',
    },
    {
      title: 'Metadata & Schema Governance',
      desc: 'Configure schema migration tools and data quality checks to monitor format changes and prevent pipeline crashes.',
    },
  ];

  const technologies = [
    { name: 'Apache Airflow', role: 'Workflow orchestration, task scheduling, and pipeline monitoring' },
    { name: 'dbt (Data Build Tool)', role: 'Data transformation, SQL modeling, and unit testing' },
    { name: 'Fivetran', role: 'Automated data ingestion connectors and SaaS sync' },
    { name: 'Prefect', role: 'Modern dataflow orchestration and real-time state alerts' },
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
              Data Engineering <span className="text-[#0F4C81]">Solutions</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
              Architect stable, automated, and tested cloud data pipelines that power modern business analysis.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Build a Resilient, Automated Foundation for Your Data
          </h2>
          <div className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium space-y-4">
            <p>
              Many business intelligence projects fail not because of poor reporting, but because the underlying data pipelines are unstable, untested, or manual. When api structures modify, dashboard elements break, eroding trust and stalling critical executive decisions.
            </p>
            <p>
              HyperCode's Data Engineering solutions ensure your data pipelines are treated with software engineering rigor. We write clean, modular ETL/ELT pipelines using tools like dbt and Airflow, enforce unit tests on database columns, and automate alerting so errors are corrected before users notice.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">Key Solutions</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Measurable Pipeline Benefits</h3>
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
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Our Data Engineering Toolkit</h3>
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



      {/* Lead Gen Call-To-Action (Strategic Placement) */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Ready to Build Resilient Data Pipelines?
          </h3>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto font-medium">
            Schedule a consultation with our senior data engineers to audit your existing database connections and pipeline flows.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/consultation?service=Data%20Engineering"
              className="inline-flex items-center justify-center h-11 px-7 bg-[#0F4C81] hover:bg-[#0A365D] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-11 px-7 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
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
