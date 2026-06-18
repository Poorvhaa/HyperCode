import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Users, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'IT Staffing Solutions | HyperCode',
  description: 'Enterprise IT Staffing Solutions, contract placement, contract-to-hire, direct placements, and recruiting technologies. Headquartered in Schaumburg, IL.',
  alternates: {
    canonical: 'https://www.hypercode.com/solutions/it-staffing-solutions',
  },
};

export default function ITStaffingSolutionsPage() {
  const benefits = [
    {
      title: 'Vetted Technology Talent',
      desc: 'Access pre-screened developers, cloud engineers, database administrators, and BI experts with validated credentials.',
    },
    {
      title: 'Flexible Contract Placements',
      desc: 'Quickly resource temporary engineering tasks or fill core skills gaps with developers contracted for 3 to 12 months.',
    },
    {
      title: 'Direct Hire Vetting',
      desc: 'Source key permanent technology managers, directors, and developers, leveraging our database of over 12,000 specialists.',
    },
    {
      title: 'VMS & ATS Compliance',
      desc: 'Integrate seamlessly with your internal Vendor Management Systems (VMS) and Applicant Tracking Systems (ATS) for easy billing.',
    },
  ];

  const technologies = [
    { name: 'ATS Integrations', role: 'Sourcing compliance via Bullhorn & JobDiva' },
    { name: 'VMS Coordination', role: 'Enterprise workforce tracking via SAP Fieldglass & Beeline' },
    { name: 'HRIS Alignment', role: 'Onboarding coordination via Workday & iCIMS' },
    { name: 'Vetting Engine', role: 'Internal code evaluation & technical screens' },
  ];

  const industries = [
    { name: 'Financial Services', useCase: 'Secured database architects and risk analyst placement.' },
    { name: 'Healthcare', useCase: 'HIPAA-trained compliance officers and HL7 data engineers.' },
    { name: 'Government', useCase: 'Security-cleared cloud developers and project coordinators.' },
    { name: 'Technology', useCase: 'React/Node full stack developers and Scrum Masters.' },
  ];

  return (
    <main className="relative w-full bg-white text-left">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-slate-50 pt-36 pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-4">
            <span className="text-[10px] font-bold text-[#0F4C81] tracking-widest uppercase bg-white border border-slate-150 px-2.5 py-1 rounded-md">
              Staffing Solutions
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              IT Staffing <span className="text-[#0F4C81]">Solutions</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
              Source and place pre-screened, certified data, software, and management experts to hit project timelines.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Deploy Highly-Certified Technology Talent in Days, Not Months
          </h2>
          <div className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium space-y-4">
            <p>
              In a competitive technology landscape, finding qualified software developers, data modelers, and systems architects is slow and expensive. Hiring errors drag down project timelines and waste internal engineering management bandwidth.
            </p>
            <p>
              HyperCode simplifies technology staffing. We run rigorous screening filters, checking coding standards, security records, and database architecture proficiency. Whether you require a single developer to assist a short-term migration, or a permanent database administrator to manage infrastructure, we deliver pre-vetted specialists quickly.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">Key Solutions</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Measurable Staffing Benefits</h3>
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
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">Workforce Platforms</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Our Sourcing & Vendor Ecosystem</h3>
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
            Ready to Build Your Engineering Squad?
          </h3>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto font-medium">
            Schedule a consultation with our recruitment managers to source pre-screened technical professionals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?service=IT%20Staffing"
              className="inline-flex items-center justify-center h-12 px-7 bg-[#0F4C81] text-white font-semibold text-[14px] rounded-xl hover:bg-[#0c3c66] transition-colors duration-200 shadow-sm"
            >
              Request Talent
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
