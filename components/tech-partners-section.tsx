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
          
          <div
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
            role="list"
            aria-label="Technology partner accreditations"
          >
            {partners.map((partner, index) => (
              <span
                key={index}
                role="listitem"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-body-sm shadow-sm whitespace-nowrap"
              >
                <span className="font-bold tracking-tight text-slate-800">{partner.name}</span>
                <span className="text-slate-300 select-none" aria-hidden="true">/</span>
                <span className="text-caption font-semibold text-slate-500">{partner.type}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
