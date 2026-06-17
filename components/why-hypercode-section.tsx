'use client';

import { Award, Users, TrendingUp, Zap, Handshake } from 'lucide-react';

export function WhyHypercodeSection() {
  const reasons = [
    {
      icon: Award,
      title: 'Enterprise Expertise',
      desc: 'Proven architecture blueprints deployed across Fortune 500 financial institutions, government departments, and healthcare providers.',
    },
    {
      icon: Users,
      title: 'Nationwide Talent Network',
      desc: 'A mobilized network of over 12,000 pre-screened, certified data and software consultants ready to reinforce active engineering pipelines.',
    },
    {
      icon: TrendingUp,
      title: 'Data-Driven Strategy',
      desc: 'We do not guess. Our advisory teams conduct strict data-readiness assessments and pipeline stress tests before recommending stacks.',
    },
    {
      icon: Zap,
      title: 'Rapid Deployment',
      desc: 'Accelerated onboarding pipelines allow us to resource, vet, and place highly certified developers on-site within 10 to 14 business days.',
    },
    {
      icon: Handshake,
      title: 'Long-Term Partnerships',
      desc: 'We guarantee continuous quality control, training support, and monthly performance checkouts, achieving a 98% client retention rate.',
    },
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-b border-slate-100 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Timeline Comparison */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">WHY PARTNER WITH US</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
              Redefining Project Timelines
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              Traditional enterprise IT consulting models require months of audits, spec drafting, and bloated onboarding cycles. HyperCode merges strategic blueprints with a pre-vetted national staffing pool to cut deployment speed in half.
            </p>

            {/* Comparison timelines */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase block">
                AVERAGE DEPLOYMENT TIMELINE
              </span>
              
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px] text-slate-500 font-bold uppercase">
                  <span>Traditional Integrators</span>
                  <span className="text-rose-600">18-24 Weeks</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-rose-500/30 rounded-full" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px] text-slate-800 font-bold uppercase">
                  <span>HyperCode Accelerated Engine</span>
                  <span className="text-emerald-600 font-bold">4-6 Weeks</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0F4C81] rounded-full w-[25%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Grid of Differentiators */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div
                  key={index}
                  className={`p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between ${
                    index === reasons.length - 1 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 text-[#0F4C81] flex items-center justify-center mb-4">
                      <Icon size={18} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                      {reason.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {reason.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
