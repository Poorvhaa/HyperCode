'use client';

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Database, Zap, Users, Cog } from 'lucide-react';

const services = [
  {
    icon: BarChart3,
    title: 'Business Intelligence',
    description: 'Power BI, Tableau, and advanced reporting solutions to drive data-informed decisions.',
    features: ['Power BI', 'Tableau', 'Custom Reporting'],
  },
  {
    icon: TrendingUp,
    title: 'Data Analytics',
    description: 'Predictive analytics and visualization insights to unlock hidden opportunities.',
    features: ['Predictive Analytics', 'Data Visualization', 'Advanced Insights'],
  },
  {
    icon: Database,
    title: 'Data Warehousing',
    description: 'Enterprise-grade ETL, data lakes, and scalable architecture solutions.',
    features: ['ETL Pipelines', 'Data Lakes', 'Cloud Architecture'],
  },
  {
    icon: Zap,
    title: 'Big Data Solutions',
    description: 'Hadoop, Spark, and cloud-native analytics for massive scale data processing.',
    features: ['Hadoop', 'Apache Spark', 'Cloud Analytics'],
  },
  {
    icon: Users,
    title: 'IT Staffing',
    description: 'Contract, contract-to-hire, and permanent placement for specialized tech talent.',
    features: ['Contract Staffing', 'Direct Hire', 'Staff Augmentation'],
  },
  {
    icon: Cog,
    title: 'Agile Consulting',
    description: 'Scrum, project management, and digital transformation expertise.',
    features: ['Scrum Masters', 'Project Management', 'Transformation'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  hover: {
    y: -8,
    transition: { duration: 0.3 },
  },
};

export function ServicesSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Comprehensive Solutions for Every Challenge
          </h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            From business intelligence to staffing, we deliver enterprise-grade solutions that drive measurable results.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="group relative p-8 rounded-2xl border border-border/40 bg-card hover:border-accent/50 transition-all duration-300"
              >
                {/* Glassmorphism Accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 space-y-4">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                    <Icon size={28} className="text-white" />
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
                    <p className="text-foreground/60 text-sm leading-relaxed">{service.description}</p>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {service.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
