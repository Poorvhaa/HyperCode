'use client';

import { Award } from 'lucide-react';

export function TechnologyEcosystem() {
  const technologies = [
    { name: 'Power BI', category: 'BI & Analytics' },
    { name: 'Tableau', category: 'BI & Analytics' },
    { name: 'Azure', category: 'Cloud Infrastructure' },
    { name: 'AWS', category: 'Cloud Infrastructure' },
    { name: 'Snowflake', category: 'Data Warehousing' },
    { name: 'Databricks', category: 'Data & AI Platform' },
    { name: 'SQL Server', category: 'Databases' },
    { name: 'Python', category: 'Data Science' },
    { name: 'Spark', category: 'Big Data Processing' },
    { name: 'React', category: 'Web Development' },
    { name: 'Next.js', category: 'Web Development' },
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-100 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">
                INTEGRATED STACK
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Enterprise Tech Ecosystem
              </h3>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              We leverage modern analytics architectures, cloud platforms, and engineering frameworks to deliver stable, high-performance data systems. Our consultants maintain gold-standard certifications and deep advisory knowledge.
            </p>
            <div className="pt-4 flex items-center space-x-3 text-xs text-slate-500 font-bold uppercase tracking-wider">
              <Award size={18} className="text-[#0F4C81]" />
              <span>Certified Partner Ecosystem</span>
            </div>
          </div>

          {/* Right technology grid wall */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white transition-colors duration-200 flex flex-col justify-between h-28 shadow-sm"
              >
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  {tech.category}
                </span>
                <h4 className="text-[16px] font-bold text-slate-900 tracking-tight leading-none">
                  {tech.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
