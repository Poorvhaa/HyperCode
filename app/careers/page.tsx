import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Briefcase, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Careers | HyperCode',
  description: 'Join HyperCode and help transform organizations through data and technology.',
};

const benefits = [
  'Competitive salary packages',
  'Comprehensive health insurance (medical, dental, vision)',
  '401(k) matching program',
  'Professional development and training budgets',
  'Flexible hours and work arrangements',
  'Remote work-friendly environments',
  'Structured mentorship and career growth programs',
  'Collaborative team events and advisory labs',
];

const openPositions = [
  {
    title: 'Senior Data Engineer',
    location: 'Schaumburg, IL / Remote',
    type: 'Full-time',
    description: 'Design and configure robust ETL pipelines and enterprise cloud data lakehouses for key clients.',
  },
  {
    title: 'BI Developer',
    location: 'Schaumburg, IL / Remote',
    type: 'Full-time',
    description: 'Build executive reporting scorecards and visual dashboards using Power BI and Tableau.',
  },
  {
    title: 'Data Analyst',
    location: 'Schaumburg, IL',
    type: 'Full-time',
    description: 'Analyze complex customer datasets and deliver structured advisory insights to managers.',
  },
  {
    title: 'Solutions Consultant',
    location: 'Schaumburg, IL / Remote',
    type: 'Full-time',
    description: 'Partner with technical leads to audit architectures and configure custom database systems.',
  },
];

export default function CareersPage() {
  return (
    <main className="relative w-full bg-white text-left">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-slate-50 pt-36 pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Build Your Career at <span className="text-[#0F4C81]">HyperCode</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
              Join a strategic team dedicated to transforming complex data into enterprise-grade intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Why Work Here */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4C81]">
                <Briefcase size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Challenging Projects</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Work on complex, high-impact data engineering migrations that drive direct value for major organizations.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4C81]">
                <Users size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Collaborative Culture</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Collaborate directly with certified cloud developers and experienced business analysts in an open environment.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4C81]">
                <TrendingUp size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Career Advancement</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Expand your skills through professional development budgets, technical certifications, and direct mentorship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">PERKS & BENEFITS</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">Competitive Benefits</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#0F4C81] flex-shrink-0" />
                <p className="text-sm text-slate-600 font-semibold">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">JOIN OUR TEAM</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">Open Positions</h3>
          </div>

          <div className="space-y-4 max-w-5xl">
            {openPositions.map((position, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-slate-300 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-bold text-slate-900">{position.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-slate-500 text-xs font-bold uppercase tracking-wider">
                      <span>{position.location}</span>
                      <span>•</span>
                      <span className="text-[#0F4C81]">{position.type}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{position.description}</p>
                  </div>
                  
                  <Link
                    href={`/contact?position=${encodeURIComponent(position.title)}`}
                    className="inline-flex items-center justify-center h-10 px-5 bg-[#0F4C81] text-white font-semibold text-xs rounded-xl hover:bg-[#0c3c66] transition-colors duration-200 flex-shrink-0"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">OUR ENVIRONMENT</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">Company Culture</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-2">
              <h3 className="text-base font-bold text-slate-900">Collaborative Environment</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                We believe that great ideas come from sharing perspectives. Our team works closely together, aligning skill sets to solve challenging data blocks.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-2">
              <h3 className="text-base font-bold text-slate-900">Continuous Education</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Technology evolves rapidly. We invest in our consultants through continuing education structures, certified training cycles, and technical bootcamps.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-2">
              <h3 className="text-base font-bold text-slate-900">Work-Life Integration</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                We respect your time. Flexible schedules, hybrid/remote operations, and generous time-off setups help you balance career with personal goals.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-2">
              <h3 className="text-base font-bold text-slate-900">Impact-Driven Strategy</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Your contributions are visible. We align every engineer's task with concrete client deliverables, meaning you see the real-world value of your work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Ready to Work with Us?</h3>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto font-medium">
            Send us your credentials to start exploring technical opportunities at HyperCode.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-12 px-7 bg-[#0F4C81] text-white font-semibold text-[14px] rounded-xl hover:bg-[#0c3c66] transition-colors duration-200 shadow-sm"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
