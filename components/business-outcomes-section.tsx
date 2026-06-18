'use client';

import { BarChart3, Clock, Zap, Users2, Database, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
    <section className="py-24 bg-white border-b border-slate-100 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">
            BUSINESS IMPACT
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
            Delivering Measurable Business Impact
          </h3>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-medium">
            We focus on concrete database and organizational outcomes, not generic marketing indicators.
          </p>
        </div>

        {/* Outcomes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outcomes.map((outcome, index) => {
            const Icon = outcome.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#0F4C81]">
                      <Icon size={18} />
                    </div>
                    <span className="text-[10px] font-bold text-[#0F4C81] uppercase tracking-wider bg-white border border-slate-200 px-2 py-0.5 rounded">
                      {outcome.metric}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{outcome.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {outcome.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Strategic CTA Section */}
        <div className="mt-16 bg-slate-50 border border-slate-200 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-slate-900">Are you ready to optimize your data systems?</h4>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Schedule a data-readiness assessment to review architectures and identify bottlenecks.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-11 px-6 bg-[#0F4C81] text-white font-semibold text-[13px] rounded-xl hover:bg-[#0c3c66] transition-colors duration-200"
            >
              <span>Schedule Consultation</span>
              <ArrowRight size={14} className="ml-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
