'use client';

import { BarChart3, Database, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function ServicesSection() {
  const pillars = [
    {
      title: 'Data & Analytics',
      icon: BarChart3,
      desc: 'Architecting executive BI environments, automated operational dashboards, and predictive forecasting systems.',
      bullets: ['Business Intelligence', 'Data Analytics', 'Reporting', 'Visualization'],
      href: '/solutions',
    },
    {
      title: 'Data Engineering',
      icon: Database,
      desc: 'Consolidating database structures into scalable cloud lakehouses and orchestrating secure ETL pipelines.',
      bullets: ['Data Warehousing', 'ETL Pipelines', 'Big Data', 'Cloud Data Platforms'],
      href: '/solutions',
    },
    {
      title: 'Talent Solutions',
      icon: Users,
      desc: 'Deploying pre-screened technology consultants and engineering teams to accelerate project deliveries.',
      bullets: ['IT Staffing', 'Staff Augmentation', 'Direct Placement'],
      href: '/staffing',
    },
  ];

  return (
    <section id="services" className="py-32 bg-white border-b border-slate-100 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="max-w-3xl mb-20 space-y-4">
          <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase">
            SOLUTIONS PILLARS
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Our Core Consulting Stacks
          </h3>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            We deliver enterprise data solutions and technology placement services through three strategic departments.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl border border-slate-200 bg-white hover:border-slate-300 transition-all duration-300 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-[#0F4C81] flex items-center justify-center">
                    <Icon size={20} />
                  </div>

                  {/* Header & Description */}
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-slate-900 tracking-tight">{pillar.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2 pt-2 border-t border-slate-100">
                    {pillar.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-center space-x-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0F4C81]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learn More Link */}
                <div className="pt-8 mt-6">
                  <Link
                    href={pillar.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] hover:text-[#0c3c66] transition-colors"
                  >
                    <span>Learn More Solutions</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
