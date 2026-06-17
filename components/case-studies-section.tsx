'use client';

import { HeartPulse, Truck, Building2 } from 'lucide-react';

interface CaseStudy {
  category: string;
  title: string;
  icon: any;
  result: string;
  resultLabel: string;
  challenge: string;
  solution: string;
  outcome: string;
}

export function CaseStudiesSection() {
  const cases: CaseStudy[] = [
    {
      category: 'DATA WAREHOUSING',
      title: 'Enterprise HIPAA Cloud Consolidations',
      icon: HeartPulse,
      result: '$3.2M Saved',
      resultLabel: 'Annual Database Overhead',
      challenge: 'Patient records across 15 separate locations were fragmented in legacy databases, creating analysis delays and HIPAA audit concerns.',
      solution: 'Consolidated all databases into a secure, HIPAA-compliant Snowflake data lakehouse using Azure data integration pipelines.',
      outcome: 'Reduced data ingestion times by 200% and secured 100% compliance audit marks.',
    },
    {
      category: 'BUSINESS INTELLIGENCE',
      title: 'Sub-Second Logistics Analytics Engine',
      icon: Truck,
      result: '22% Reduced',
      resultLabel: 'Transit Fleet Delays',
      challenge: 'A national supply chain provider suffered penalties due to stale dispatch reports delaying fleet route adjustments.',
      solution: 'Deployed real-time analytics with Databricks connected to live Power BI telemetry reporting dashboards.',
      outcome: 'Dispatchers now access real-time route alerts, reducing transit delays immediately.',
    },
    {
      category: 'STRATEGIC IT STAFFING',
      title: 'Engineering Squad Mobilization',
      icon: Building2,
      result: '45+ Engineers',
      resultLabel: 'Placed in 6 Weeks',
      challenge: 'A public sector agency faced project cancellations due to shortfalls in certified, security-cleared cloud developers.',
      solution: 'Leveraged our nationwide talent network to recruit, screen, and augment their teams within a strict 6-week window.',
      outcome: 'Delivered squad of cleared engineers to successfully migrate the federal cloud databases.',
    },
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-100 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">CASE STUDIES</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
            Success Stories
          </h3>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-medium">
            Discover how we help enterprise organizations solve data blockages, streamline compliance, and recruit tech talent.
          </p>
        </div>

        {/* Clean Static List */}
        <div className="space-y-6">
          {cases.map((cs, idx) => {
            const Icon = cs.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 shadow-sm"
              >
                {/* Left Description Column */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-[#0F4C81] flex items-center justify-center flex-shrink-0">
                      <Icon size={16} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      {cs.category}
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">
                    {cs.title}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mt-4">
                    <div>
                      <span className="font-bold text-slate-800 uppercase tracking-wider block mb-1">Challenge</span>
                      <span className="text-slate-600 leading-relaxed font-medium">{cs.challenge}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 uppercase tracking-wider block mb-1">Solution</span>
                      <span className="text-slate-600 leading-relaxed font-medium">{cs.solution}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 uppercase tracking-wider block mb-1">Outcome</span>
                      <span className="text-slate-600 leading-relaxed font-medium">{cs.outcome}</span>
                    </div>
                  </div>
                </div>

                {/* Right Result Column (whitespace-driven highlight) */}
                <div className="w-full lg:w-48 bg-white border border-slate-200 rounded-xl p-5 text-center flex flex-col justify-center flex-shrink-0">
                  <div className="text-2xl font-bold text-[#0F4C81] tracking-tight">
                    {cs.result}
                  </div>
                  <div className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mt-1">
                    {cs.resultLabel}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
