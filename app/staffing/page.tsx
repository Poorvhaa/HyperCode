import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Users, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'IT Staffing Solutions | HyperCode',
  description: 'Contract, contract-to-hire, permanent placement, and staff augmentation solutions from HyperCode.',
};

const staffingSolutions = [
  {
    title: 'Contract Staffing',
    description: 'Flexible staffing solutions for short-term projects and specialized needs.',
    duration: '3-12 months',
    benefits: ['Quick deployment', 'Flexible terms', 'Cost-effective', 'Specialized skills'],
  },
  {
    title: 'Contract-to-Hire',
    description: 'Trial period before permanent commitment with reduced hiring risk.',
    duration: '3-6 months trial',
    benefits: ['Reduced risk', 'Evaluation period', 'Seamless transition', 'Team fit verification'],
  },
  {
    title: 'Direct Hire',
    description: 'Permanent placement services with comprehensive vetting and support.',
    duration: 'Permanent',
    benefits: ['Permanent placement', 'Full benefits', 'Dedicated support', 'Retention focus'],
  },
  {
    title: 'Staff Augmentation',
    description: 'Extend your team with specialized resources for ongoing needs.',
    duration: 'Ongoing',
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
    <main className="relative w-full">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-[60vh] bg-gradient-to-b from-background to-muted/30 pt-32 pb-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Top-Tier IT Staffing Solutions
            </h1>
            <p className="text-xl text-foreground/60 max-w-3xl mx-auto">
              Access specialized talent for contract, contract-to-hire, direct hire, and staff augmentation needs.
            </p>
          </div>
        </div>
      </section>

      {/* Staffing Solutions */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {staffingSolutions.map((solution, index) => {
              const id = solution.title.toLowerCase().replace(/\s+/g, '-');
              return (
                <div
                  key={index}
                  id={id}
                  className="group p-8 rounded-xl border border-border/40 bg-card hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 scroll-mt-24"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-foreground">{solution.title}</h3>
                      <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                        {solution.duration}
                      </span>
                    </div>

                    <p className="text-foreground/60 text-lg">{solution.description}</p>

                    <div className="pt-4 border-t border-border/40 space-y-3">
                      {solution.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle size={18} className="text-accent flex-shrink-0" />
                          <span className="text-foreground/70">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-accent font-medium pt-2 group-hover:gap-3 transition-all"
                    >
                      Learn More
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Talent Areas */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Specialized Talent Areas</h2>
            <p className="text-xl text-foreground/60">
              Access deep expertise across critical technology disciplines
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {talentAreas.map((area, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-border/40 bg-card hover:border-accent/50 transition-all text-center"
              >
                <p className="font-semibold text-foreground">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Our Hiring Process</h2>
            <p className="text-xl text-foreground/60">
              Streamlined, efficient, and focused on finding the perfect fit
            </p>
          </div>

          <div className="relative">
            <div className="space-y-8">
              {hiringProcess.map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                      {i + 1}
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">{item.step}</h3>
                    <p className="text-foreground/60">{item.desc}</p>
                  </div>
                  {i < hiringProcess.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-12 bg-border/40" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why HyperCode */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <Users size={32} className="text-accent" />
              <h3 className="text-xl font-bold text-foreground">Pre-Screened Talent</h3>
              <p className="text-foreground/60">
                Only the most qualified and vetted professionals are presented to you.
              </p>
            </div>
            <div className="space-y-3">
              <CheckCircle size={32} className="text-accent" />
              <h3 className="text-xl font-bold text-foreground">Quick Deployment</h3>
              <p className="text-foreground/60">
                Average time-to-fill of 2-3 weeks with our efficient process.
              </p>
            </div>
            <div className="space-y-3">
              <Users size={32} className="text-accent" />
              <h3 className="text-xl font-bold text-foreground">Ongoing Support</h3>
              <p className="text-foreground/60">
                Dedicated support throughout the engagement period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-primary/10 to-accent/10 border-y border-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-4xl font-bold text-foreground">Ready to Build Your Dream Team?</h2>
          <p className="text-xl text-foreground/60">
            Let us help you find the specialized talent you need to succeed.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-1 group"
          >
            Start Your Hiring Process
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
