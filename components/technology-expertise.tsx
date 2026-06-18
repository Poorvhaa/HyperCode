'use client';

import { 
  Database, 
  Cloud, 
  BarChart3, 
  Layers, 
  Cpu, 
  Network, 
  UserCheck, 
  Users, 
  Briefcase, 
  TrendingUp, 
  FileCheck2,
  Code,
  Server
} from 'lucide-react';

export function TechnologyExpertise() {
  const dataAnalytics = [
    { name: 'Microsoft', role: 'Gold Partner', icon: Database },
    { name: 'Azure', role: 'Cloud Platform', icon: Cloud },
    { name: 'AWS', role: 'Partner Network', icon: Network },
    { name: 'Snowflake', role: 'Select Partner', icon: Cpu },
    { name: 'Databricks', role: 'Consulting Partner', icon: Layers },
    { name: 'Tableau', role: 'Partner', icon: BarChart3 },
  ];

  const webDevStack = [
    { name: 'React / Next.js', role: 'Frontend Frameworks', icon: Code },
    { name: 'TypeScript', role: 'Type-Safe Scripting', icon: Layers },
    { name: 'Node.js', role: 'Backend Runtime', icon: Cpu },
    { name: '.NET / Python', role: 'Backend Environments', icon: Briefcase },
    { name: 'SQL / PostgreSQL', role: 'Relational Databases', icon: Server },
    { name: 'AWS / Azure', role: 'Cloud Infrastructure', icon: Cloud },
  ];

  const workforcePlatforms = [
    { name: 'Bullhorn', role: 'ATS Integration', icon: Users },
    { name: 'JobDiva', role: 'Talent Sourcing', icon: UserCheck },
    { name: 'SAP Fieldglass', role: 'VMS Program', icon: FileCheck2 },
    { name: 'Beeline', role: 'Workforce Platform', icon: Network },
    { name: 'Workday', role: 'HRIS Ecosystem', icon: Briefcase },
    { name: 'iCIMS', role: 'Enterprise ATS', icon: TrendingUp },
  ];

  return (
    <section className="bg-slate-50 border-t border-b border-slate-200/60 py-16 select-none text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 mb-10 text-center md:text-left">
          <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-1">
            Certified Competency & Systems
          </h2>
          <h3 className="text-3xl font-extrabold text-[#0F2744] tracking-tight">
            Technology & Platform Expertise
          </h3>
          <p className="text-slate-600 text-sm max-w-2xl font-medium leading-relaxed">
            Our consultant network maintains gold-standard certifications and deep integration expertise across enterprise data architectures and talent ecosystems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Column 1: Data & Analytics */}
          <div className="p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81]">
                <Database size={18} />
              </div>
              <h4 className="text-base font-bold text-[#0F2744] tracking-tight">Data & Analytics Platforms</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {dataAnalytics.map((tech, idx) => {
                const IconComponent = tech.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-150 bg-slate-50 hover:bg-white hover:border-[#0F4C81]/30 hover:shadow-sm transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-[#0F4C81] group-hover:bg-[#0F4C81]/5 transition-colors flex-shrink-0">
                      <IconComponent size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F2744] group-hover:text-[#0F4C81] transition-colors">
                        {tech.name}
                      </div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                        {tech.role}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Web Development Stack */}
          <div className="p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81]">
                <Code size={18} />
              </div>
              <h4 className="text-base font-bold text-[#0F2744] tracking-tight">Web Development Stack</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {webDevStack.map((tech, idx) => {
                const IconComponent = tech.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-150 bg-slate-50 hover:bg-white hover:border-[#0F4C81]/30 hover:shadow-sm transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-[#0F4C81] group-hover:bg-[#0F4C81]/5 transition-colors flex-shrink-0">
                      <IconComponent size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F2744] group-hover:text-[#0F4C81] transition-colors">
                        {tech.name}
                      </div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                        {tech.role}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 3: Workforce & Staffing Platforms */}
          <div className="p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81]">
                <Briefcase size={18} />
              </div>
              <h4 className="text-base font-bold text-[#0F2744] tracking-tight">Workforce & Staffing Ecosystems</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {workforcePlatforms.map((platform, idx) => {
                const IconComponent = platform.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-150 bg-slate-50 hover:bg-white hover:border-[#0F4C81]/30 hover:shadow-sm transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-[#0F4C81] group-hover:bg-[#0F4C81]/5 transition-colors flex-shrink-0">
                      <IconComponent size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F2744] group-hover:text-[#0F4C81] transition-colors">
                        {platform.name}
                      </div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                        {platform.role}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
