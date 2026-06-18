'use client';

import { ShieldAlert, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CaseStudiesSection() {
  const featured = {
    category: 'FEATURED SUCCESS STORY',
    title: 'Data Warehouse Modernization',
    subtitle: 'HIPAA Cloud Consolidation',
    challenge: 'Patient records across 15 separate locations were fragmented in legacy databases, creating analysis delays and HIPAA audit concerns.',
    solution: 'Consolidated all databases into a secure, HIPAA-compliant Snowflake data lakehouse using Azure data integration pipelines.',
    outcome: 'Reduced data ingestion times by 200%, saved $3.2M in annual database overhead, and secured 100% compliance audit marks.',
  };

  return (
    <section className="py-32 bg-white border-b border-slate-100 text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="max-w-3xl mb-20 space-y-4">
          <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase">
            CASE STUDY
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Featured Success Story
          </h3>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            Learn how we help enterprise organizations resolve data blockages and configure scalable architectures.
          </p>
        </div>

        {/* Featured Case Study Card */}
        <div className="p-8 sm:p-10 rounded-3xl border border-slate-200 bg-slate-50 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#0F4C81] uppercase tracking-widest block">
                {featured.category}
              </span>
              <h4 className="text-2xl font-bold text-slate-900 tracking-tight">
                {featured.title}
              </h4>
            </div>
            <span className="px-3 py-1 bg-white border border-slate-200 text-slate-500 text-xs font-bold rounded-lg uppercase tracking-wider">
              {featured.subtitle}
            </span>
          </div>

          {/* Flow Layout: Challenge -> Solution -> Outcome */}
          <div className="space-y-8 relative">
            
            {/* Challenge */}
            <div className="flex gap-4 items-start relative">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#0F4C81] flex items-center justify-center flex-shrink-0 shadow-sm">
                <ShieldAlert size={18} />
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Challenge</h5>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                  {featured.challenge}
                </p>
              </div>
            </div>

            {/* Down Arrow 1 */}
            <div className="pl-5 -my-4 text-slate-300 select-none">
              <span className="text-xl">↓</span>
            </div>

            {/* Solution */}
            <div className="flex gap-4 items-start relative">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#0F4C81] flex items-center justify-center flex-shrink-0 shadow-sm">
                <Cpu size={18} />
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Solution</h5>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                  {featured.solution}
                </p>
              </div>
            </div>

            {/* Down Arrow 2 */}
            <div className="pl-5 -my-4 text-slate-300 select-none">
              <span className="text-xl">↓</span>
            </div>

            {/* Outcome */}
            <div className="flex gap-4 items-start relative">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#0F4C81] flex items-center justify-center flex-shrink-0 shadow-sm">
                <CheckCircle2 size={18} />
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Outcome</h5>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                  {featured.outcome}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* View Case Studies CTA Button */}
        <div className="text-center mt-12">
          <Link
            href="/insights"
            className="inline-flex items-center justify-center h-12 px-7 bg-[#0F4C81] text-white font-semibold text-[14px] rounded-xl hover:bg-[#0c3c66] transition-colors duration-200 shadow-sm gap-2"
          >
            <span>View Case Studies</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}
