'use client';

export function TechPartnersSection() {
  const partners = [
    { name: 'Microsoft', type: 'Gold Partner' },
    { name: 'Azure', type: 'Cloud Platform' },
    { name: 'AWS', type: 'Partner Network' },
    { name: 'Snowflake', type: 'Select Partner' },
    { name: 'Databricks', type: 'Consulting Partner' },
    { name: 'Tableau', type: 'Partner' },
    { name: 'Power BI', type: 'Reporting Stack' },
    { name: 'SQL Server', type: 'Data Core' },
  ];

  return (
    <section className="bg-slate-50 border-b border-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <h2 className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase">
            Trusted Technology & Consulting Expertise
          </h2>
          
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 select-none opacity-60">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-slate-700 hover:text-[#0F4C81] transition-colors duration-200 cursor-default"
              >
                <div className="w-2.5 h-2.5 rounded-sm bg-slate-400 flex-shrink-0" />
                <span className="text-sm font-bold tracking-tight">{partner.name}</span>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider bg-slate-200/50 px-1 rounded">
                  {partner.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
