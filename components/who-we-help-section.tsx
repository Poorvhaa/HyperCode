'use client';

import { Building2, HeartPulse, Landmark, ShoppingBag, Factory, Laptop } from 'lucide-react';

interface Industry {
  title: string;
  icon: any;
  desc: string;
  challenge: string;
  solution: string;
}

export function WhoWeHelpSection() {
  const industries: Industry[] = [
    {
      title: 'Government',
      icon: Building2,
      desc: 'Approved IT consultant delivering secure, compliant data structures and staffing solutions for public sector agencies.',
      challenge: 'Migrating siloed legacy databases under strict FISMA/FedRAMP regulatory frameworks.',
      solution: 'Secure cloud data migration, automated compliance auditing, and cleared tech teams.',
    },
    {
      title: 'Healthcare',
      icon: HeartPulse,
      desc: 'Improving patient coordination and clinical tracking with HIPAA-compliant analytical dashboards.',
      challenge: 'Patient data fragmentation and strict HIPAA privacy mandates across EHR systems.',
      solution: 'Interoperable FHIR pipelines, HIPAA-compliant storage, and clinical BI dashboards.',
    },
    {
      title: 'Financial Services',
      icon: Landmark,
      desc: 'Accelerating transaction streams, predictive risk analysis, and real-time fraud dashboards.',
      challenge: 'Slow batch processing preventing real-time fraud detection and risk modeling.',
      solution: 'Sub-second streaming pipelines with Databricks and real-time risk dashboards.',
    },
    {
      title: 'Retail',
      icon: ShoppingBag,
      desc: 'Optimizing supply chain visibility, inventory flow, and omnichannel customer telemetry.',
      challenge: 'Inconsistent omnichannel customer tracking and disconnected inventory visibility.',
      solution: 'Unified Customer Data Platforms (CDP) and real-time supply chain analytics.',
    },
    {
      title: 'Manufacturing',
      icon: Factory,
      desc: 'Implementing IoT telemetry streaming to enable predictive maintenance and operational checks.',
      challenge: 'Unplanned equipment downtime and high defect rates in manual quality checks.',
      solution: 'IoT sensor telemetry integration and predictive maintenance analytics models.',
    },
    {
      title: 'Technology',
      icon: Laptop,
      desc: 'Designing scalable cloud data architectures, pipelines, and direct hiring for tech squads.',
      challenge: 'Scaling distributed computing nodes and recruiting highly certified engineers.',
      solution: 'Lakehouse setups, automatic pipeline orchestration, and direct talent sourcing.',
    },
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-100 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">INDUSTRIES WE SERVE</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
            Strategic Industry Solutions
          </h3>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-medium">
            We understand the regulatory requirements, compliance guardrails, and data architectures unique to your industry.
          </p>
        </div>

        {/* Clean Static Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, index) => {
            const Icon = ind.icon;
            return (
              <div
                key={index}
                className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4C81] mb-6">
                    <Icon size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-3">
                    {ind.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6">
                    {ind.desc}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-slate-100 space-y-3.5 text-xs">
                  <div>
                    <span className="font-bold text-rose-600 tracking-wider uppercase block mb-0.5">Challenge</span>
                    <span className="text-slate-600 leading-relaxed font-medium">{ind.challenge}</span>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-600 tracking-wider uppercase block mb-0.5">Solution</span>
                    <span className="text-slate-600 leading-relaxed font-medium">{ind.solution}</span>
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
