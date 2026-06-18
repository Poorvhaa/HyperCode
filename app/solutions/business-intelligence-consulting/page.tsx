import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Business Intelligence Consulting Services | HyperCode',
  description: 'Enterprise Business Intelligence consulting, Power BI/Tableau dashboard creation, self-service BI setups, and data visualization. Headquartered in Schaumburg, IL.',
  alternates: {
    canonical: 'https://www.hypercode.com/solutions/business-intelligence-consulting',
  },
};

export default function BusinessIntelligenceConsultingPage() {
  const benefits = [
    {
      title: 'Executive Reporting Systems',
      desc: 'Deliver automated, high-level dashboards with KPIs tailored for senior leadership and key stakeholders.',
    },
    {
      title: 'Self-Service Analytics',
      desc: 'Empower operational teams to build custom queries and reports without relying on core engineering support.',
    },
    {
      title: 'Real-Time Insights',
      desc: 'Reduce latency by streaming operational and transaction data directly to active visual telemetry dashboards.',
    },
    {
      title: 'Data Harmonization',
      desc: 'Clean, filter, and format fragmented databases to ensure a single source of truth across operations.',
    },
  ];

  const technologies = [
    { name: 'Power BI', role: 'Enterprise reporting & Microsoft integration' },
    { name: 'Tableau', role: 'Advanced visual analysis & interactive maps' },
    { name: 'Looker', role: 'Modern web analytics & custom integrations' },
    { name: 'Qlik', role: 'Data discovery & associative engine analytics' },
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
              Business Intelligence <span className="text-[#0F4C81]">Consulting</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
              Transform raw transaction records and database logs into interactive, automated executive dashboards.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Empower Your Decision-Makers with Data
          </h2>
          <div className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium space-y-4">
            <p>
              In modern enterprise organizations, decisions must be backed by accurate, fresh data. Legacy spreadsheets and fragmented queries lead to operational latency and audit issues. HyperCode's Business Intelligence Consulting services bridge the gap between complex databases and strategic execution.
            </p>
            <p>
              Our certified BI consultants design and deploy custom Power BI, Tableau, and Looker dashboards. We implement robust semantic models, clean database structures, and configure secure report distribution methods so your teams access insights securely from any device.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">Key Solutions</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Measurable BI Benefits</h3>
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
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">Platform Alignment</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Our BI Technology Expertise</h3>
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
            Ready to Accelerate Your Business Intelligence?
          </h3>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto font-medium">
            Schedule a consultation with our senior BI architects to design custom dashboards for your organization.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/consultation?service=Business%20Intelligence"
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
