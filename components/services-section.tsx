'use client';

import { BarChart3, Settings2, Users2, ArrowRight } from 'lucide-react';

export function ServicesSection() {
  const serviceGroups = [
    {
      title: 'Data & Analytics',
      icon: BarChart3,
      desc: 'Architecting modern cloud pipelines, database consolidations, and executive reporting dashboards.',
      services: [
        {
          name: 'Business Intelligence',
          desc: 'Power BI and Tableau enterprise setups with DAX reporting filters.',
        },
        {
          name: 'Data Analytics',
          desc: 'Predictive analytics modeling, behavioral trends, and statistical insights.',
        },
        {
          name: 'Data Engineering',
          desc: 'Automated ETL pipeline development with Apache Spark and Apache Airflow.',
        },
        {
          name: 'Data Warehousing',
          desc: 'Scalable data warehousing setups on Snowflake and Amazon Redshift.',
        },
      ],
    },
    {
      title: 'Consulting Services',
      icon: Settings2,
      desc: 'Aligning technology stacks, database configurations, and sprints with core business revenue targets.',
      services: [
        {
          name: 'Business Analysis',
          desc: 'Documenting engineering needs and auditing compliance requirements.',
        },
        {
          name: 'Agile Consulting',
          desc: 'Agile scrum coaching, sprint management, and digital transformation.',
        },
        {
          name: 'Technology Strategy',
          desc: 'Expert guidance on stack selections, cloud hosting, and security layouts.',
        },
      ],
    },
    {
      title: 'Staffing & Augmentation',
      icon: Users2,
      desc: 'Deploying highly vetted developers, cloud architects, and data leads to reinforce active project squads.',
      services: [
        {
          name: 'IT Staffing',
          desc: 'Sourcing and recruiting specialized data and software engineers.',
        },
        {
          name: 'Staff Augmentation',
          desc: 'Scaling internal development resources with flexible contractors.',
        },
        {
          name: 'Direct Placement',
          desc: 'Accessing our national pipeline to fill permanent technical leadership roles.',
        },
      ],
    },
  ];

  return (
    <section id="services" className="py-24 bg-white border-b border-slate-100 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-20">
          <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">SERVICES EXCHANGE</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
            Enterprise Solutions & IT Staffing
          </h3>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-medium">
            We group our capabilities logically to support your digital transformations, data engineering, and project staffing needs.
          </p>
        </div>

        {/* Categories Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {serviceGroups.map((group, idx) => {
            const GroupIcon = group.icon;
            return (
              <div key={idx} className="space-y-6">
                {/* Category Header */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-150">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-[#0F4C81] flex items-center justify-center flex-shrink-0">
                      <GroupIcon size={18} />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">{group.title}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {group.desc}
                  </p>
                </div>

                {/* Sub-services Cards */}
                <div className="space-y-4">
                  {group.services.map((service, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-sm text-left"
                    >
                      <h5 className="text-[15px] font-bold text-slate-900 mb-1">
                        {service.name}
                      </h5>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {service.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
