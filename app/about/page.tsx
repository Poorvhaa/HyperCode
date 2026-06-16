import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Target, Eye, Award, Users, Globe, Zap } from 'lucide-react';

export const metadata = {
  title: 'About HyperCode | Our Story & Mission',
  description: 'Learn about HyperCode - a strategic consulting firm dedicated to transforming data into strategic intelligence.',
};

const coreValues = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'We pursue the highest standards in every project and engagement.',
  },
  {
    icon: Users,
    title: 'Partnership',
    description: 'Your success is our success. We act as true partners, not just vendors.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We stay ahead of technology trends to deliver cutting-edge solutions.',
  },
  {
    icon: Globe,
    title: 'Integrity',
    description: 'Transparency and honesty guide every decision we make.',
  },
];

const teamAreas = [
  'Business Intelligence & Analytics',
  'Data Engineering & Architecture',
  'IT Staffing & Talent Management',
  'Cloud Solutions & Infrastructure',
  'Project Management & Consulting',
];

export default function AboutPage() {
  return (
    <main className="relative w-full">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-[50vh] bg-gradient-to-b from-background to-muted/30 pt-32 pb-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Transforming Data Into Strategic Intelligence
            </h1>
            <p className="text-xl text-foreground/60 max-w-3xl mx-auto">
              Learn about HyperCode&apos;s mission, values, and commitment to delivering exceptional results.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-lg text-foreground/70 leading-relaxed">
              <p>
                Founded with a vision to bridge the gap between raw data and strategic business intelligence, HyperCode has grown to become a trusted partner for Fortune 500 companies and government agencies across the United States.
              </p>
              <p>
                With over 15 years of combined expertise, our team has delivered more than 100 successful projects, ranging from enterprise business intelligence implementations to large-scale data migrations and specialized IT staffing solutions.
              </p>
              <p>
                What sets us apart is our commitment to not just implementing technology, but truly understanding our clients&apos; business challenges and delivering solutions that drive measurable ROI.
              </p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/40">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <p className="text-foreground/60">Projects Delivered</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <p className="text-foreground/60">Client Satisfaction Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-foreground/60">Expert Consultants</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Target size={32} className="text-primary" />
                <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-lg text-foreground/70 leading-relaxed">
                To empower organizations by transforming their data into actionable intelligence, enabling informed decision-making and driving sustainable business growth through innovative technology solutions and strategic partnerships.
              </p>
            </div>

            {/* Vision */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Eye size={32} className="text-accent" />
                <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
              </div>
              <p className="text-lg text-foreground/70 leading-relaxed">
                To be the trusted partner of choice for organizations seeking to leverage data and technology as competitive advantages, known for our expertise, integrity, and unwavering commitment to client success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Our Core Values</h2>
            <p className="text-xl text-foreground/60">
              These values guide every decision and action we take
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreValues.map((value, i) => {
              const Icon = value.icon;
              return (
                <div
                  key={i}
                  className="p-8 rounded-xl border border-border/40 bg-card hover:border-accent/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                      <p className="text-foreground/60">{value.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Expertise */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Our Expertise Areas</h2>
            <p className="text-xl text-foreground/60">
              Deep knowledge across key technology and consulting domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {teamAreas.map((area, i) => (
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

      {/* Culture */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold text-foreground">Our Culture</h2>
            <p className="text-xl text-foreground/60">
              We believe great work comes from great people
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Innovation First</h3>
              <p className="text-foreground/70 leading-relaxed">
                We encourage our team to explore new technologies, methodologies, and approaches. Continuous learning is part of our DNA.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Collaborative</h3>
              <p className="text-foreground/70 leading-relaxed">
                We work together as one team, sharing knowledge and supporting each other to deliver exceptional results for our clients.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Client-Centric</h3>
              <p className="text-foreground/70 leading-relaxed">
                Everything we do is driven by a deep commitment to understanding and solving our clients&apos; most pressing challenges.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Excellence</h3>
              <p className="text-foreground/70 leading-relaxed">
                We set high standards for ourselves and maintain them across every project, interaction, and deliverable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
