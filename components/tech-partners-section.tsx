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
          <h2 className="text-eyebrow text-slate-500">
            Trusted Technology Expertise
          </h2>
          
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-90">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-slate-700 hover:text-royal-blue transition-colors duration-200 cursor-default"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-royal-blue flex-shrink-0 animate-pulse" />
                <span className="text-body-sm font-bold tracking-tight">{partner.name}</span>
                <span className="text-caption font-semibold text-slate-400">/ {partner.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
