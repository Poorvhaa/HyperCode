'use client';

import { Users, HeartHandshake, ShieldCheck } from 'lucide-react';

export function HumanCenteredSection() {
  const values = [
    {
      title: 'Empathy-First Consulting',
      desc: 'We study your organizational structure and business blockers to ensure our data architectures solve human problems, not just systems specs.',
      icon: HeartHandshake,
    },
    {
      title: 'Collaborative Squads',
      desc: 'We integrate our consultants directly into your team, operating as cohesive units sharing code, logs, and sprint targets.',
      icon: Users,
    },
    {
      title: 'Strategic Trust Guarantee',
      desc: 'We hold strict security clearances and run deep background checks, making us a secure choice for sensitive financial, healthcare, and federal programs.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-b border-slate-100 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left copy column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">HUMAN-CENTERED CONSULTING</h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none mb-4">
                Technology Powered by People
              </h3>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
                At HyperCode, we believe digital transformation is a human journey. Advanced dashboards and cloud pipelines are only as strong as the teams who configure them.
              </p>
            </div>

            {/* Values listing */}
            <div className="space-y-4">
              {values.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex gap-4"
                  >
                    <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-[#0F4C81] flex-shrink-0 flex items-center justify-center h-10 w-10">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-1">
                        {val.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Simple node diagram */}
          <div className="lg:col-span-6 flex flex-col justify-center items-center">
            <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase block mb-6">
                Consulting Connection Model
              </span>

              {/* Simple Clean Node Drawing */}
              <div className="h-56 w-full relative flex items-center justify-center mb-6">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200">
                  {/* Slate Connection Lines */}
                  <g stroke="#cbd5e1" strokeWidth="1.5">
                    <line x1="50" y1="50" x2="150" y2="100" />
                    <line x1="250" y1="50" x2="150" y2="100" />
                    <line x1="50" y1="150" x2="150" y2="100" />
                    <line x1="250" y1="150" x2="150" y2="100" />
                  </g>

                  {/* Core Node */}
                  <circle cx="150" cy="100" r="30" fill="#0F4C81" />
                  
                  {/* Outer Nodes */}
                  <circle cx="50" cy="50" r="20" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
                  <circle cx="250" cy="50" r="20" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
                  <circle cx="50" cy="150" r="20" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
                  <circle cx="250" cy="150" r="20" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

                  {/* Node Labels */}
                  <text x="150" y="103" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CORE</text>
                  <text x="50" y="53" fill="#334155" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CLIENT</text>
                  <text x="250" y="53" fill="#334155" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">STRATEGY</text>
                  <text x="50" y="153" fill="#334155" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">STAFF</text>
                  <text x="250" y="153" fill="#334155" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SYSTEMS</text>
                </svg>
              </div>

              {/* Quote Block */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left">
                <blockquote className="text-xs text-slate-600 leading-relaxed font-semibold italic">
                  "The difference with HyperCode was their collaborative approach. They didn't just build pipelines; they integrated with our leads to design a sustainable platform."
                </blockquote>
                <div className="mt-4 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-[10px] text-slate-700">
                    JG
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-900 block">Jonathan Green</span>
                    <span className="text-[9px] text-slate-500 block">VP of Technology, BlueCross Illinois</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
