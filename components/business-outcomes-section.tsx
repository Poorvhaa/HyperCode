'use client';

import { BrandButton } from '@/components/brand-button';
import { BarChart3, Clock, Zap, Users2, Database, ArrowRight } from 'lucide-react';

export function BusinessOutcomesSection() {
  const outcomes = [
    {
      icon: BarChart3,
      title: 'Improved Reporting Efficiency',
      metric: '60% Faster Reports',
      description: 'Automating extraction, transformation, and semantic rendering processes to eliminate manual weekly reporting delays.',
    },
    {
      icon: Clock,
      title: 'Faster Data-Driven Decisions',
      metric: 'Real-Time Telemetry',
      description: 'Transitioning from batch queries to sub-second streaming pipelines, allowing immediate responses to operational issues.',
    },
    {
      icon: Zap,
      title: 'Accelerated Project Delivery',
      metric: 'Half the Deployment Time',
      description: 'Applying pre-built database templates and structured scrum frameworks to cut custom data lakehouse setup schedules in half.',
    },
    {
      icon: Users2,
      title: 'Scalable Talent Acquisition',
      metric: '14-Day Placement SLA',
      description: 'Leveraging our national recruitment pipeline of 12,000 specialists to deploy vetted engineers within two weeks.',
    },
    {
      icon: Database,
      title: 'Analytics Modernization',
      metric: '40% Cloud Cost Reduction',
      description: 'Auditing index structures and partitioning query schedules to reduce compute overheads on modern cloud databases.',
    },
  ];

  return (
    <section className="section-padding bg-white border-b border-slate-200 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <h2 className="text-xs font-bold text-royal-blue tracking-widest uppercase mb-3">
            BUSINESS IMPACT
          </h2>
          <h3 className="text-h2 text-slate-900">
            Delivering Measurable Business Impact
          </h3>
          <p className="text-lead text-slate-650 mt-4 font-medium">
            We focus on concrete database and organizational outcomes, not generic marketing indicators.
          </p>
        </div>

        {/* Outcomes Grid - 40px Gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {outcomes.map((outcome, index) => {
            const Icon = outcome.icon;
            return (
              <div
                key={index}
                className="premium-card flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-royal-blue">
                      <Icon size={24} />
                    </div>
                    <span className="text-caption font-semibold text-royal-blue uppercase tracking-wider bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg">
                      {outcome.metric}
                    </span>
                  </div>
                  <h4 className="text-card-title text-slate-900">{outcome.title}</h4>
                  <p className="text-body text-slate-605 font-medium">
                    {outcome.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Strategic CTA Section */}
        <div className="mt-20 bg-[#F8FAFC] border border-slate-200 rounded-[24px] p-8 sm:p-10 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
          <div className="space-y-1">
            <h4 className="text-card-title text-slate-900">Are you ready to optimize your data systems?</h4>
            <p className="text-body text-slate-600 font-medium">
              Schedule a data-readiness assessment to review architectures and identify bottlenecks.
            </p>
          </div>
          <div className="flex gap-4 flex-shrink-0">
            <BrandButton href="/consultation" variant="primary">
              <span>Schedule Consultation</span>
              <ArrowRight size={16} className="ml-2" />
            </BrandButton>
          </div>
        </div>
      </div>
    </section>
  );
}
