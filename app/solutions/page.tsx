import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Database, Zap, Users, Cog, Check, ArrowRight, Cpu } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Solutions | HyperCode',
  description: 'Explore HyperCode\'s comprehensive business solutions including Business Intelligence, Data Analytics, Data Warehousing, and IT Staffing.',
};

const solutions = [
  {
    id: 1,
    icon: BarChart3,
    title: 'Business Intelligence',
    shortDesc: 'Power BI, Tableau, and Advanced Reporting',
    benefits: [
      'Real-time dashboard creation',
      'Interactive data visualization',
      'Automated reporting workflows',
      'Data-driven decision making',
      'Executive scorecards',
      'Self-service analytics',
    ],
    technologies: ['Power BI', 'Tableau', 'Qlik', 'Looker'],
    process: ['Assessment', 'Design', 'Implementation', 'Training', 'Support'],
  },
  {
    id: 2,
    icon: TrendingUp,
    title: 'Data Analytics',
    shortDesc: 'Predictive Analytics & Insights',
    benefits: [
      'Predictive modeling',
      'Statistical analysis',
      'Machine learning integration',
      'Customer behavior analysis',
      'Market trend identification',
      'Performance optimization',
    ],
    technologies: ['Python', 'R', 'SQL', 'Apache Spark'],
    process: ['Data Collection', 'Analysis', 'Modeling', 'Validation', 'Deployment'],
  },
  {
    id: 3,
    icon: Database,
    title: 'Data Warehousing',
    shortDesc: 'ETL, Data Lakes & Cloud Architecture',
    benefits: [
      'Enterprise data integration',
      'Cloud-native architecture',
      'Scalable data lakes',
      'ETL automation',
      'Data quality management',
      'Cost optimization',
    ],
    technologies: ['Snowflake', 'BigQuery', 'Redshift', 'Azure Synapse'],
    process: ['Planning', 'Design', 'Migration', 'Optimization', 'Maintenance'],
  },
  {
    id: 4,
    icon: Cpu,
    title: 'Data Engineering',
    shortDesc: 'Data Integration, Pipelines & Automation',
    benefits: [
      'Robust ETL/ELT pipelines',
      'Real-time data ingestion',
      'Data quality and validation',
      'API integrations',
      'Pipeline monitoring',
      'Schema migration automation',
    ],
    technologies: ['Airflow', 'dbt', 'Fivetran', 'Prefect'],
    process: ['Assessment', 'Pipeline Design', 'Development', 'Testing', 'Deployment'],
  },
  {
    id: 5,
    icon: Zap,
    title: 'Big Data Solutions',
    shortDesc: 'Hadoop, Spark & Cloud Analytics',
    benefits: [
      'Large-scale data processing',
      'Real-time streaming analytics',
      'Distributed computing',
      'Data pipeline orchestration',
      'Performance optimization',
      'Cost efficiency at scale',
    ],
    technologies: ['Hadoop', 'Spark', 'Kafka', 'Flink'],
    process: ['Architecture', 'Setup', 'Development', 'Testing', 'Deployment'],
  },
];

export default function SolutionsPage() {
  return (
    <main className="relative w-full">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-[60vh] bg-gradient-to-b from-background to-muted/30 pt-32 pb-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Enterprise Solutions for Data Success
            </h1>
            <p className="text-xl text-foreground/60 max-w-3xl mx-auto">
              Comprehensive solutions designed to transform your data into strategic intelligence and drive business growth.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {solutions.map((solution) => {
              const Icon = solution.icon;
              const id = solution.title === 'Big Data Solutions' ? 'big-data' : solution.title.toLowerCase().replace(/\s+/g, '-');
              return (
                <div key={solution.id} id={id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center scroll-mt-24">
                  {/* Left: Content */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <Icon size={24} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-foreground">{solution.title}</h2>
                      </div>
                      <p className="text-lg text-accent font-medium">{solution.shortDesc}</p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-bold text-foreground">Key Benefits</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {solution.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-foreground/70">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-bold text-foreground">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {solution.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-1 group"
                    >
                      Learn More
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Right: Process */}
                  <div className="bg-card rounded-2xl border border-border/40 p-8 space-y-6">
                    <h3 className="text-xl font-bold text-foreground">Our Process</h3>
                    <div className="space-y-4">
                      {solution.process.map((step, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                            {i + 1}
                          </div>
                          <div className="flex-1 pt-1">
                            <p className="font-medium text-foreground">{step}</p>
                            {i < solution.process.length - 1 && (
                              <div className="w-0.5 h-8 bg-border/40 ml-4 mt-2" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-primary/10 to-accent/10 border-y border-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-4xl font-bold text-foreground">Ready to Transform Your Data?</h2>
          <p className="text-xl text-foreground/60">
            Schedule a consultation with our experts to discuss your specific needs and opportunities.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-1 group"
          >
            Get Started
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
