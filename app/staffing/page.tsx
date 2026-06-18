import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Users, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Talent Solutions | IT Staffing & Augmentation | HyperCode',
  description: 'Access pre-screened technical talent, contract placements, direct placements, and staff augmentation solutions from HyperCode. Headquartered in Schaumburg, IL.',
  alternates: {
    canonical: 'https://www.hypercode.com/staffing',
  },
};

const staffingSolutions = [
  {
    title: 'Contract Staffing',
    description: 'Flexible staffing solutions for short-term projects and specialized needs.',
    duration: '3-12 months',
    path: '/solutions/it-staffing-solutions',
    benefits: ['Quick deployment', 'Flexible terms', 'Cost-effective', 'Specialized skills'],
  },
  {
    title: 'Contract-to-Hire',
    description: 'Trial period before permanent commitment with reduced hiring risk.',
    duration: '3-6 months trial',
    path: '/solutions/it-staffing-solutions',
    benefits: ['Reduced risk', 'Evaluation period', 'Seamless transition', 'Team fit verification'],
  },
  {
    title: 'Direct Placement',
    description: 'Permanent placement services with comprehensive vetting and support.',
    duration: 'Permanent',
    path: '/solutions/it-staffing-solutions',
    benefits: ['Permanent placement', 'Full benefits', 'Dedicated support', 'Retention focus'],
  },
  {
    title: 'Staff Augmentation',
    description: 'Extend your team with specialized resources for ongoing needs.',
    duration: 'Ongoing',
    path: '/solutions/staff-augmentation-services',
    benefits: ['Team expansion', 'Scalable resources', 'Full integration', 'Long-term partnership'],
  },
];

const talentAreas = [
  'Data Engineers',
  'BI Developers',
  'Data Analysts',
  'Business Analysts',
  'Project Managers',
  'Scrum Masters',
  'Full Stack Developers',
  'Database Administrators',
];

const hiringProcess = [
  { step: 'Requirement', desc: 'Define your needs and position requirements' },
  { step: 'Screening', desc: 'Pre-qualified candidate review and screening' },
  { step: 'Interview', desc: 'Technical and cultural fit interviews' },
  { step: 'Deployment', desc: 'Onboarding and integration with your team' },
];

export default function StaffingPage() {
  return (
    <main className="relative w-full bg-white text-left">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-slate-50 pt-36 pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Talent <span className="text-[#0F4C81]">Solutions</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
              Access pre-screened, specialized technology professionals for contract, contract-to-hire, direct placement, and team augmentation.
            </p>
          </div>
        </div>
      </section>

      {/* Talent Solutions */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {staffingSolutions.map((solution, index) => {
              const id = solution.title.toLowerCase().replace(/\s+/g, '-');
              return (
                <div
                  key={index}
                  id={id}
                  className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between scroll-mt-24"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-2xl font-bold text-slate-900">{solution.title}</h3>
                      <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider">
                        {solution.duration}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{solution.description}</p>

                    <div className="pt-4 border-t border-slate-200 space-y-3">
                      {solution.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle size={16} className="text-[#0F4C81] flex-shrink-0" />
                          <span className="text-xs sm:text-sm font-semibold text-slate-600">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link
                      href={solution.path}
                      className="inline-flex items-center justify-center h-10 px-5 bg-white border border-[#0F4C81] hover:bg-slate-50 text-[#0F4C81] font-bold text-xs uppercase tracking-wider rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
                    >
                      <span>Learn More</span>
                      <ArrowRight size={14} className="ml-1.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Talent Areas */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">EXPERTISE DEPLOYMENT</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">Specialized Talent Areas</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {talentAreas.map((area, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm text-center"
              >
                <p className="text-sm font-semibold text-slate-800">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">METHODOLOGY</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">Our Hiring Process</h3>
          </div>

          <div className="relative">
            <div className="space-y-12">
              {hiringProcess.map((item, i) => (
                <div key={i} className="flex gap-6 items-start relative">
                  <div className="flex-shrink-0 z-10">
                    <div className="w-10 h-10 rounded-xl bg-[#0F4C81] flex items-center justify-center text-white font-bold text-sm">
                      {i + 1}
                    </div>
                  </div>
                  <div className="flex-1 pt-1.5">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{item.step}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                  {i < hiringProcess.length - 1 && (
                    <div className="absolute left-[19px] top-10 w-px h-16 bg-slate-200 -z-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why HyperCode */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#0F4C81]">
                <Users size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Pre-Screened Talent</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Only the most qualified and technically vetted professionals are presented to your team.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#0F4C81]">
                <CheckCircle size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Quick Deployment</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Our optimized sourcing workflow enables an average time-to-fill of 2-3 weeks.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#0F4C81]">
                <Users size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Ongoing Support</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Dedicated management and structured check-ins throughout the engagement period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Ready to Build Your Dream Team?</h3>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto font-medium">
            Schedule a consultation with our recruitment managers to source specialized technical talent.
          </p>
          <div>
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center h-11 px-7 bg-[#0F4C81] hover:bg-[#0A365D] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Start Your Hiring Process
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
