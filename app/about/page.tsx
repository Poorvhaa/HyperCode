import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Target, Eye, ShieldCheck, HeartHandshake, Compass, Users } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About HyperCode | Our Story & Mission',
  description: 'Learn about HyperCode\'s mission, values, approach, and nationwide presence as a premier strategic consulting firm.',
};

export default function AboutPage() {
  const coreValues = [
    {
      icon: HeartHandshake,
      title: 'Empathy-First Partnership',
      description: 'Your success is our success. We listen deeply to understand your business objectives and design systems that solve human problems.',
    },
    {
      icon: ShieldCheck,
      title: 'Enterprise Integrity',
      description: 'Transparency guides every action. We maintain strict security compliance, code reviews, and honest communication.',
    },
    {
      icon: Users,
      title: 'Nationwide Delivery',
      description: 'We leverage our network of over 12,000 pre-vetted consultants to deploy certified data architects and software engineers across all 50 states.',
    },
    {
      icon: Compass,
      title: 'Continuous Strategy',
      description: 'We do not just hand over code. We audit tech stacks, run optimization reviews, and support your teams post-deployment.',
    },
  ];

  return (
    <main className="relative w-full bg-white text-left">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-slate-50 pt-36 pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Transforming Data Into <span className="text-[#0F4C81]">Strategic Intelligence</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
              We combine enterprise data engineering, cloud analytics strategy, and strategic IT staffing to accelerate growth.
            </p>
          </div>
        </div>
      </section>

      {/* Storytelling Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Our Story</h2>
            <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              <p>
                HyperCode was founded with a clear objective: to bridge the gap between raw data pipelines and executive decision-making. Over the years, we have grown to become a trusted strategic partner for Fortune 500 enterprises and government agencies across the United States.
              </p>
              <p>
                What sets us apart is our commitment to combining technical execution with human-centered consulting. We believe modern dashboards and databases are only as effective as the teams utilizing them.
              </p>
            </div>
          </div>

          {/* Simple Clean Metrics Grid */}
          <div className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-200">
            <div>
              <div className="text-3xl font-bold text-[#0F4C81]">250+</div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">Projects Completed</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#0F4C81]">98%</div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">Client Satisfaction</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#0F4C81]">1,200+</div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">Consultants Placed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-9 h-9 bg-slate-50 border border-slate-100 rounded-lg text-[#0F4C81] flex items-center justify-center">
                  <Target size={18} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
              </div>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                To empower organizations by transforming raw data into actionable intelligence, enabling fast, compliant decision-making and driving business growth through strategic cloud architectures and staffing.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-9 h-9 bg-slate-50 border border-slate-100 rounded-lg text-[#0F4C81] flex items-center justify-center">
                  <Eye size={18} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
              </div>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                To serve as the premier consulting and talent partner of choice for organizations leveraging data and cloud technology as distinct competitive advantages, known for technical clarity and execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">ORGANIZATIONAL PILLARS</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">Our Core Values</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreValues.map((value, i) => {
              const Icon = value.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                    <Icon size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-slate-900">{value.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Approach & Nationwide Presence Section */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Our Approach</h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              We operate with a sprint-based, transparent consulting approach. Every engagement begins with a strict data audit and ends with mentoring loops to guarantee that your internal team fully controls the modern cloud systems we deploy.
            </p>
          </div>

          <div className="space-y-6 pt-10 border-t border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Nationwide Presence</h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              HyperCode supports corporate and public sector clients across the United States. With consulting resources distributed in all 50 states, we quickly mobilize Scrum teams, developers, and analysts to match your exact timeline.
            </p>
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-11 px-6 bg-[#0F4C81] text-white font-semibold text-[13px] rounded-xl hover:bg-[#0c3c66] transition-colors duration-200"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
