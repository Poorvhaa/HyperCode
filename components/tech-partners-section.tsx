'use client';

export function TechPartnersSection() {
  const partners = [
    { name: 'Microsoft', type: 'Gold Partner' },
    { name: 'Azure', type: 'Cloud Platform' },
    { name: 'AWS', type: 'Partner Network' },
    { name: 'Snowflake', type: 'Select Partner' },
    { name: 'Databricks', type: 'Consulting Partner' },
    { name: 'Tableau', type: 'Partner' },
  ];

  return (
    <section className="bg-[#F8FAFC] border-b border-slate-200 py-8 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase">
            Trusted Technology Expertise
          </h2>
          
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-90">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-slate-700 hover:text-[#0F4C81] transition-colors duration-200 cursor-default"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#0F4C81] flex-shrink-0 animate-pulse" />
                <span className="text-xs font-black tracking-tight">{partner.name}</span>
                <span className="text-[9px] font-bold text-slate-400">/ {partner.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
