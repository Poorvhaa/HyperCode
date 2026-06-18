import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Data Warehousing Services | HyperCode',
  description: 'Enterprise Cloud Data Warehousing services, database migration, Snowflake/BigQuery architectures, and data lakehouse deployment. Headquartered in Schaumburg, IL.',
  alternates: {
    canonical: 'https://www.hypercode.com/solutions/data-warehousing-services',
  },
};

export default function DataWarehousingServicesPage() {
  const benefits = [
    {
      title: 'Cloud-Native Architecture',
      desc: 'Migrate legacy physical server clusters into high-performance, cost-efficient cloud databases like Snowflake and BigQuery.',
    },
    {
      title: 'Data Lakehouse Consolidation',
      desc: 'Store structured transaction records and unstructured log documents in a unified storage framework for easy querying.',
    },
    {
      title: 'Cost Control Optimization',
      desc: 'Fine-tune query parameters, index structures, and compute cluster schedules to reduce database overhead costs by up to 40%.',
    },
    {
      title: 'Enterprise Security & Audit',
      desc: 'Configure row-level security, column masking, and access logs to meet strict HIPAA, SOC 2, and public audit standards.',
    },
  ];

  const technologies = [
    { name: 'Snowflake', role: 'Multi-cluster compute warehousing and secure data sharing' },
    { name: 'Google BigQuery', role: 'Serverless analytics warehousing with built-in ML queries' },
    { name: 'Amazon Redshift', role: 'High-performance AWS-integrated analytical databases' },
    { name: 'Azure Synapse', role: 'Integrated enterprise analytics and database pipelines' },
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
              Data Warehousing <span className="text-[#0F4C81]">Services</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
              Consolidate databases, reduce query latency, and optimize cloud storage costs with modern architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Consolidate Your Data Silos into a High-Performance Warehouse
          </h2>
          <div className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium space-y-4">
            <p>
              When database tables are locked in separate business applications, running cross-department reports is slow and prone to errors. To make data-driven decisions at scale, modern organizations require a centralized, high-performance cloud data warehouse.
            </p>
            <p>
              At HyperCode, we specialize in cloud data warehouse migrations and performance optimization. We design data schemas, configure secure ETL workflows, and partition tables to ensure sub-second query speeds, even on billions of rows.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">Key Solutions</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Measurable Warehousing Benefits</h3>
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
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Our Warehousing Platform Focus</h3>
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
            Ready to Optimize Your Cloud Data Warehouse?
          </h3>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto font-medium">
            Schedule a consultation with our database architects to discuss migration strategies, cost management, and schema design.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/consultation?service=Data%20Warehousing"
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
