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
    <section className="bg-slate-50 border-b border-slate-100 py-6 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h2 className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase">
            Trusted Technology Expertise
          </h2>
          
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-50">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center space-x-1.5 text-slate-700 hover:text-[#0F4C81] transition-colors duration-200 cursor-default"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                <span className="text-xs font-bold tracking-tight">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
