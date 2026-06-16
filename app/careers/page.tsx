import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ArrowRight, Briefcase, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Careers | HyperCode',
  description: 'Join HyperCode and help transform organizations through data and technology.',
};

const benefits = [
  'Competitive salary and benefits',
  'Health insurance (medical, dental, vision)',
  '401(k) matching program',
  'Professional development budget',
  'Flexible work arrangements',
  'Remote work opportunities',
  'Annual company events',
  'Collaborative team environment',
];

const openPositions = [
  {
    title: 'Senior Data Engineer',
    location: 'Schaumburg, IL / Remote',
    type: 'Full-time',
    description: 'Design and build scalable data pipelines and warehouses for enterprise clients.',
  },
  {
    title: 'BI Developer',
    location: 'Schaumburg, IL / Remote',
    type: 'Full-time',
    description: 'Create compelling dashboards and reports using Power BI and Tableau.',
  },
  {
    title: 'Data Analyst',
    location: 'Schaumburg, IL',
    type: 'Full-time',
    description: 'Analyze complex datasets and provide strategic insights to clients.',
  },
  {
    title: 'Solutions Consultant',
    location: 'Schaumburg, IL / Remote',
    type: 'Full-time',
    description: 'Partner with clients to design and implement data solutions.',
  },
];

export default function CareersPage() {
  return (
    <main className="relative w-full">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-[50vh] bg-gradient-to-b from-background to-muted/30 pt-32 pb-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Build Your Career at HyperCode
            </h1>
            <p className="text-xl text-foreground/60 max-w-3xl mx-auto">
              Join a team of talented professionals dedicated to transforming data into strategic intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Why Work Here */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="space-y-4">
              <Briefcase size={32} className="text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Challenging Work</h3>
              <p className="text-foreground/70">
                Work on complex, impactful projects that transform how organizations use data.
              </p>
            </div>
            <div className="space-y-4">
              <Users size={32} className="text-accent" />
              <h3 className="text-2xl font-bold text-foreground">Great Team</h3>
              <p className="text-foreground/70">
                Collaborate with talented professionals who are passionate about their work.
              </p>
            </div>
            <div className="space-y-4">
              <TrendingUp size={32} className="text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Growth Opportunities</h3>
              <p className="text-foreground/70">
                Develop your skills and advance your career with mentorship and training.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12">Competitive Benefits & Perks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border/40">
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <p className="text-foreground/70">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-2">Open Positions</h2>
            <p className="text-xl text-foreground/60">Join our growing team</p>
          </div>

          {openPositions.length > 0 ? (
            <div className="space-y-4">
              {openPositions.map((position, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl border border-border/40 bg-card hover:border-accent/50 transition-all hover:shadow-lg"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">{position.title}</h3>
                      <div className="flex flex-col sm:flex-row gap-4 text-foreground/60 text-sm">
                        <span>{position.location}</span>
                        <span>•</span>
                        <span>{position.type}</span>
                      </div>
                      <p className="text-foreground/70 mt-3">{position.description}</p>
                    </div>
                    <Link
  href={`/contact?position=${encodeURIComponent(position.title)}`}
  className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg"
>
  Apply Now
</Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-xl border border-border/40 bg-card text-center">
              <p className="text-foreground/60 mb-4">
                We don&apos;t have open positions listed right now, but we&apos;re always looking for talented professionals.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Send Your Resume
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold text-foreground">Our Culture</h2>
            <p className="text-xl text-foreground/60">
              What it&apos;s like to be part of the HyperCode team
            </p>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-border/40 bg-card">
              <h3 className="text-xl font-bold text-foreground mb-3">Collaborative Environment</h3>
              <p className="text-foreground/70">
                We believe that great ideas come from collaboration. Our team works together, shares knowledge, and supports each other to achieve common goals.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border/40 bg-card">
              <h3 className="text-xl font-bold text-foreground mb-3">Continuous Learning</h3>
              <p className="text-foreground/70">
                Technology evolves rapidly. We invest in our team&apos;s professional development with training, certifications, and conference attendance.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border/40 bg-card">
              <h3 className="text-xl font-bold text-foreground mb-3">Work-Life Balance</h3>
              <p className="text-foreground/70">
                We understand the importance of balance. Flexible hours, remote work options, and generous time off help you manage your life outside of work.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border/40 bg-card">
              <h3 className="text-xl font-bold text-foreground mb-3">Impact-Driven Work</h3>
              <p className="text-foreground/70">
                Your work matters. You&apos;ll see the direct impact of your contributions on client success and organizational growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-primary/10 to-accent/10 border-y border-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-4xl font-bold text-foreground">Ready to Join Our Team?</h2>
          <p className="text-xl text-foreground/60">
            Send us your resume and let&apos;s talk about your future at HyperCode.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-1 group"
          >
            Get in Touch
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
