'use client';

import { Building2, HeartPulse, Landmark, ShoppingBag, Factory, Laptop } from 'lucide-react';

interface Industry {
  title: string;
  icon: any;
  desc: string;
}

export function WhoWeHelpSection() {
  const industries: Industry[] = [
    {
      title: 'Government',
      icon: Building2,
      desc: 'Delivering secure, FedRAMP-aligned cloud databases and cleared engineering squads.',
    },
    {
      title: 'Healthcare',
      icon: HeartPulse,
      desc: 'Building interoperable FHIR pipelines and HIPAA-compliant analytical dashboards.',
    },
    {
      title: 'Financial Services',
      icon: Landmark,
      desc: 'Integrating sub-second streaming ledgers, risk analysis, and transaction dashboards.',
    },
    {
      title: 'Retail & E-commerce',
      icon: ShoppingBag,
      desc: 'Optimizing supply chain visibility and omnichannel customer telemetry datasets.',
    },
    {
      title: 'Manufacturing',
      icon: Factory,
      desc: 'Deploying IoT sensor integration and predictive analytics maintenance modules.',
    },
    {
      title: 'Technology',
      icon: Laptop,
      desc: 'Architecting modern cloud lakehouses and augmenting database engineering pipelines.',
    },
  ];

  return (
    <section className="py-32 bg-slate-50 border-b border-slate-100 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="max-w-3xl mb-20 space-y-4">
          <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase">
            INDUSTRIES WE SERVE
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Strategic Domain Experience
          </h3>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            We adapt our data frameworks and tech placement services to match your specific industry compliance standards.
          </p>
        </div>

        {/* Clean Static Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, index) => {
            const Icon = ind.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between hover:border-slate-350 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                    <Icon size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {ind.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      {ind.desc}
                    </p>
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
