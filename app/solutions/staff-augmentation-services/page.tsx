import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Users, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Staff Augmentation Services | HyperCode',
  description: 'Enterprise IT Staff Augmentation services. Scale your technology, engineering, and data analytics teams with pre-screened specialists. Headquartered in Schaumburg, IL.',
  alternates: {
    canonical: 'https://www.hypercode.com/solutions/staff-augmentation-services',
  },
};

export default function StaffAugmentationServicesPage() {
  const benefits = [
    {
      title: 'Seamless Team Integration',
      desc: 'Our augmented developers join your active Slack channels, participate in daily standups, and write code directly in your repositories.',
    },
    {
      title: 'Rapid Scaling Velocity',
      desc: 'Inject certified Snowflake, Databricks, or cloud engineers into your team within 10 to 14 business days, bypassing slow recruiting loops.',
    },
    {
      title: 'No Long-Term Overhead',
      desc: 'Scale your workforce up during major migration cycles, and scale back down when projects transition to maintenance.',
    },
    {
      title: 'Direct Talent Retention',
      desc: 'Ensure project consistency with dedicated developers assigned to your account for the entire contract duration.',
    },
  ];

  const technologies = [
    { name: 'Sprint Integration', role: 'Align with Jira, GitHub, and Scrum methodology' },
    { name: 'Onboarding Coordination', role: 'Fast setup of secure VPNs, keys, and environments' },
    { name: 'Code Quality Checks', role: 'Strict internal review before deployment to your staging' },
    { name: 'Talent Pool Sourcing', role: 'Access to 12,000+ pre-vetted US-based professionals' },
  ];

  const industries = [
    { name: 'Financial Services', useCase: 'Augmented database developers for migration sprints.' },
    { name: 'Healthcare', useCase: 'Clinical data analysts for custom scheduling reports.' },
    { name: 'Government', useCase: 'Cleared Scrum Masters and developers for secure cloud portals.' },
    { name: 'Technology', useCase: 'Full stack development support during core product releases.' },
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
              Staff Augmentation <span className="text-[#0F4C81]">Services</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
              Extend your existing engineering, analytics, and project teams with specialized technical experts.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Reinforce Your Technology Pipeline with Certified Experts
          </h2>
          <div className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium space-y-4">
            <p>
              When project milestones approach, waiting months to hire permanent team members can result in delayed deliveries or cancelled software migrations. Team leader capacity is stretched, and active development pipelines grind to a halt.
            </p>
            <p>
              HyperCode's Staff Augmentation services resolve this block. We supplement your active engineering teams with experienced data developers, analyst specialists, and project coordinators. Our consultants integrate into your existing workflows, matching your tooling, environments, and coding methodologies.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">Key Solutions</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Measurable Augmentation Benefits</h3>
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
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">Sprint Tools</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Our Integration Methodology</h3>
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
            Ready to Augment Your Technology Team?
          </h3>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto font-medium">
            Schedule a consultation with our technology managers to match pre-screened developers to your active code pipelines.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?service=IT%20Staffing"
              className="inline-flex items-center justify-center h-12 px-7 bg-[#0F4C81] text-white font-semibold text-[14px] rounded-xl hover:bg-[#0c3c66] transition-colors duration-200 shadow-sm"
            >
              Discuss Your Project
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
