'use client';

import { motion } from 'framer-motion';
import { Award, Zap, Clock, Handshake } from 'lucide-react';

const reasons = [
  {
    icon: Award,
    title: 'Deep Industry Expertise',
    description: 'Years of experience working with Fortune 500 companies and government agencies across diverse sectors.',
  },
  {
    icon: Zap,
    title: 'Enterprise Scalability',
    description: 'Solutions designed to grow with your business, from initial implementation to enterprise-wide deployment.',
  },
  {
    icon: Clock,
    title: 'Rapid Deployment',
    description: 'Accelerated timelines with agile methodologies ensuring quick time-to-value without sacrificing quality.',
  },
  {
    icon: Handshake,
    title: 'Long-Term Partnerships',
    description: 'Dedicated support and continuous optimization to ensure sustained success and measurable ROI.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export function WhyHypercodeSection() {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why Choose HyperCode?
          </h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            We&apos;re not just a vendor—we&apos;re a trusted partner committed to your success.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative p-8 rounded-xl border border-border/40 bg-card hover:border-primary/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/40 group-hover:to-accent/40 transition-all duration-300">
                    <Icon size={24} className="text-primary" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{reason.title}</h3>
                    <p className="text-foreground/60 text-sm leading-relaxed">{reason.description}</p>
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
