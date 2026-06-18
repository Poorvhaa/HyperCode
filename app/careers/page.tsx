import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { HiringTimeline } from '@/components/hiring-timeline';
import { CareersFAQ } from '@/components/careers-faq';
import {
  Briefcase,
  Users,
  TrendingUp,
  Check,
  FileText,
  Phone,
  GitMerge,
  CheckCircle,
  Database,
  Clock,
  GraduationCap,
  HeartHandshake,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Technology Careers & Staffing Opportunities | HyperCode',
  description: 'Explore technology careers, IT staffing placements, contract roles, and consultant opportunities at HyperCode. Headquartered in Schaumburg, IL.',
  alternates: {
    canonical: 'https://www.hypercode.com/careers',
  },
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

const workflowSteps = [
  { label: 'Career Opportunities', icon: Briefcase },
  { label: 'Application Review', icon: FileText },
  { label: 'Recruiter Screening', icon: Phone },
  { label: 'Client Matching', icon: GitMerge },
  { label: 'Interview Process', icon: Users },
  { label: 'Offer & Onboarding', icon: CheckCircle },
];

const featureCards = [
  {
    title: 'ATS-Driven Recruiting',
    description: 'Our recruiting team leverages modern Applicant Tracking Systems (ATS) to efficiently match skilled professionals with opportunities aligned to their expertise and career goals.',
    features: ['Faster Candidate Matching', 'Skill-Based Search', 'Streamlined Hiring Process'],
  },
  {
    title: 'Enterprise Workforce Solutions',
    description: 'HyperCode supports organizations utilizing Vendor Management Systems (VMS) and contingent workforce programs to efficiently deliver top technology talent.',
    features: ['Contract Staffing', 'Staff Augmentation', 'Direct Placement'],
  },
  {
    title: 'Candidate-Centric Experience',
    description: 'We prioritize transparency, communication, and long-term career growth throughout every stage of the hiring process.',
    features: ['Dedicated Recruiters', 'Career Guidance', 'Professional Development'],
  },
];

const techPlatforms = [
  {
    name: 'Bullhorn',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19c-4.97 0-9-1.34-9-3s4.03-3 9-3 9 1.34 9 3-4.03 3-9 3z" />
        <path d="M12 13V5c0-1.1.9-2 2-2h1" />
        <path d="M9 13V9c0-1.1.9-2 2-2" />
        <circle cx="12" cy="16" r="1" />
      </svg>
    ),
  },
  {
    name: 'JobDiva',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    name: 'SAP Fieldglass',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    name: 'Beeline',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 6v12M8 10h8M8 14h8" />
      </svg>
    ),
  },
  {
    name: 'Workday',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
        <path d="M7 11.5c1.5-2.5 4.5-3.5 5-3.5s3.5 1 5 3.5" />
        <path d="M6 14.5c2-3.5 5.5-4.5 6-4.5s4 1 6 4.5" />
      </svg>
    ),
  },
  {
    name: 'iCIMS',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

const candidateBenefits = [
  {
    title: 'Professional Growth',
    description: 'Access structured technical learning paths, client-sponsored certification cycles, and direct mentoring to expand your consulting capabilities.',
    icon: TrendingUp,
  },
  {
    title: 'Meaningful Projects',
    description: 'Engage with enterprise clients on high-impact data engineering migrations, cloud analytics setups, and strategic modernizations.',
    icon: Database,
  },
  {
    title: 'Competitive Compensation',
    description: 'Benefit from industry-leading salary packages, complete with comprehensive health benefits, retirement matches, and performance bonuses.',
    icon: DollarSign,
  },
  {
    title: 'Flexible Opportunities',
    description: 'Choose from hybrid, fully remote, or on-site project configurations designed to align with your geographic preference and scheduling needs.',
    icon: Clock,
  },
  {
    title: 'Industry Experts',
    description: 'Work alongside senior cloud architects, seasoned data modelers, and certified business analysts committed to engineering excellence.',
    icon: GraduationCap,
  },
  {
    title: 'Long-Term Partnerships',
    description: 'Build a long-term career path with HyperCode. We work proactively to align you with successive client projects as technologies and needs evolve.',
    icon: HeartHandshake,
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

      {/* Why Work Here (Why Join HyperCode) */}
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

      {/* Company Culture */}
      <section className="py-24 bg-white border-b border-slate-100">
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

      {/* Modern Talent Acquisition & Delivery */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">
              TALENT ACQUISITION PROCESS
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Modern Talent Acquisition & Delivery
            </h3>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-medium">
              Connecting exceptional talent with meaningful opportunities through industry-leading recruiting practices and workforce management technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Workflow visualization */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase block mb-6">
                  Talent Delivery Workflow
                </span>
                
                <div className="flex flex-col items-start space-y-0.5">
                  {workflowSteps.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                      <div key={idx} className="flex flex-col items-start w-full">
                        <div className="flex items-center gap-4 py-2">
                          <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4C81] shadow-sm flex-shrink-0 z-10">
                            <Icon size={16} />
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-wide">
                            {step.label}
                          </span>
                        </div>
                        {idx < workflowSteps.length - 1 && (
                          <div className="w-10 flex justify-center -my-2.5">
                            <div className="w-0.5 h-7 bg-slate-200 border-dashed border-l" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Three Feature Cards */}
            <div className="lg:col-span-7 space-y-6">
              {featureCards.map((card, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-slate-300 transition-colors duration-200 space-y-4"
                >
                  <div className="space-y-1.5">
                    <h4 className="text-base font-bold text-slate-900">{card.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {card.description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-slate-100">
                    {card.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2">
                        <Check size={14} className="text-[#0F4C81] flex-shrink-0" />
                        <span className="text-[11px] sm:text-xs font-bold text-slate-700">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Bar */}
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="text-center space-y-6">
              <h5 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                Recruiting Technologies & Workforce Platforms
              </h5>
              <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                {techPlatforms.map((platform, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors duration-200 cursor-default"
                  >
                    {platform.logo}
                    <span className="text-xs font-bold uppercase tracking-wider">{platform.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Candidate Benefits Subsection */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">
              CANDIDATE PROMISE
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
              What Candidates Can Expect
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidateBenefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-slate-300 transition-colors duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 text-[#0F4C81] flex items-center justify-center">
                      <Icon size={16} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{benefit.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hiring Process Timeline Section */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">
              ENGAGEMENT BLUEPRINT
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none mb-4">
              Hiring Process Timeline
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Our structured timeline ensures clarity, prompt communication, and complete alignment at every stage of your candidacy.
            </p>
          </div>

          <HiringTimeline />
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 bg-white border-b border-slate-100">
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

      <CareersFAQ />

      {/* CTA Section */}
      <section className="py-24 bg-slate-50">
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
