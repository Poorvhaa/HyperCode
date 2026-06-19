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
import { useLocale } from 'next-intl';

export function TechnologyExpertise() {
  const locale = useLocale();

  const translations: Record<string, {
    badge: string;
    title: string;
    description: string;
    col1Title: string;
    col2Title: string;
    col3Title: string;
    roles: Record<string, string>;
  }> = {
    en: {
      badge: "Certified Competency & Systems",
      title: "Technology & Platform Expertise",
      description: "Our consultant network maintains gold-standard certifications and deep integration expertise across enterprise data architectures and talent ecosystems.",
      col1Title: "Data & Analytics Platforms",
      col2Title: "Web Development Stack",
      col3Title: "Workforce & Staffing Ecosystems",
      roles: {
        goldPartner: "Gold Partner",
        cloudPlatform: "Cloud Platform",
        partnerNetwork: "Partner Network",
        selectPartner: "Select Partner",
        consultingPartner: "Consulting Partner",
        partner: "Partner",
        frontendFrameworks: "Frontend Frameworks",
        typeSafeScripting: "Type-Safe Scripting",
        backendRuntime: "Backend Runtime",
        backendEnvironments: "Backend Environments",
        relationalDatabases: "Relational Databases",
        cloudInfrastructure: "Cloud Infrastructure",
        atsIntegration: "ATS Integration",
        talentSourcing: "Talent Sourcing",
        vmsProgram: "VMS Program",
        workforcePlatform: "Workforce Platform",
        hrisEcosystem: "HRIS Ecosystem",
        enterpriseAts: "Enterprise ATS"
      }
    },
    es: {
      badge: "Competencia y Sistemas Certificados",
      title: "Experiencia en Tecnología y Plataformas",
      description: "Nuestra red de consultores mantiene certificaciones estándar de oro y una profunda experiencia en integración en arquitecturas de datos empresariales y ecosistemas de talento.",
      col1Title: "Plataformas de Datos y Analítica",
      col2Title: "Pila de Desarrollo Web",
      col3Title: "Ecosistemas de Personal y Fuerza de Trabajo",
      roles: {
        goldPartner: "Socio de Oro",
        cloudPlatform: "Plataforma en la Nube",
        partnerNetwork: "Red de Socios",
        selectPartner: "Socio Selecto",
        consultingPartner: "Socio de Consultoría",
        partner: "Socio",
        frontendFrameworks: "Marcos de Frontend",
        typeSafeScripting: "Scripting Seguro de Tipos",
        backendRuntime: "Tiempo de Ejecución Backend",
        backendEnvironments: "Entornos Backend",
        relationalDatabases: "Bases de Datos Relacionales",
        cloudInfrastructure: "Infraestructura en la Nube",
        atsIntegration: "Integración de ATS",
        talentSourcing: "Búsqueda de Talento",
        vmsProgram: "Programa VMS",
        workforcePlatform: "Plataforma de Personal",
        hrisEcosystem: "Ecosistema HRIS",
        enterpriseAts: "ATS Empresarial"
      }
    }
  };

  const activeTranslation = translations[locale] || translations.en;

  const dataAnalytics = [
    { name: 'Microsoft', role: activeTranslation.roles.goldPartner, icon: Database },
    { name: 'Azure', role: activeTranslation.roles.cloudPlatform, icon: Cloud },
    { name: 'AWS', role: activeTranslation.roles.partnerNetwork, icon: Network },
    { name: 'Snowflake', role: activeTranslation.roles.selectPartner, icon: Cpu },
    { name: 'Databricks', role: activeTranslation.roles.consultingPartner, icon: Layers },
    { name: 'Tableau', role: activeTranslation.roles.partner, icon: BarChart3 },
  ];

  const webDevStack = [
    { name: 'React / Next.js', role: activeTranslation.roles.frontendFrameworks, icon: Code },
    { name: 'TypeScript', role: activeTranslation.roles.typeSafeScripting, icon: Layers },
    { name: 'Node.js', role: activeTranslation.roles.backendRuntime, icon: Cpu },
    { name: '.NET / Python', role: activeTranslation.roles.backendEnvironments, icon: Briefcase },
    { name: 'SQL / PostgreSQL', role: activeTranslation.roles.relationalDatabases, icon: Server },
    { name: 'AWS / Azure', role: activeTranslation.roles.cloudInfrastructure, icon: Cloud },
  ];

  const workforcePlatforms = [
    { name: 'Bullhorn', role: activeTranslation.roles.atsIntegration, icon: Users },
    { name: 'JobDiva', role: activeTranslation.roles.talentSourcing, icon: UserCheck },
    { name: 'SAP Fieldglass', role: activeTranslation.roles.vmsProgram, icon: FileCheck2 },
    { name: 'Beeline', role: activeTranslation.roles.workforcePlatform, icon: Network },
    { name: 'Workday', role: activeTranslation.roles.hrisEcosystem, icon: Briefcase },
    { name: 'iCIMS', role: activeTranslation.roles.enterpriseAts, icon: TrendingUp },
  ];

  return (
    <section className="bg-slate-50 border-t border-b border-slate-200/60 py-16 select-none text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 mb-10 text-center md:text-left">
          <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-1">
            {activeTranslation.badge}
          </h2>
          <h3 className="text-3xl font-extrabold text-[#0F2744] tracking-tight">
            {activeTranslation.title}
          </h3>
          <p className="text-slate-600 text-sm max-w-2xl font-medium leading-relaxed">
            {activeTranslation.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Column 1: Data & Analytics */}
          <div className="p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81]">
                <Database size={18} />
              </div>
              <h4 className="text-base font-bold text-[#0F2744] tracking-tight">{activeTranslation.col1Title}</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {dataAnalytics.map((tech, idx) => {
                const IconComponent = tech.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-150 bg-slate-50 hover:bg-white hover:border-[#0F4C81]/30 hover:shadow-sm transition-all duration-200 group h-20"
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
              <h4 className="text-base font-bold text-[#0F2744] tracking-tight">{activeTranslation.col2Title}</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {webDevStack.map((tech, idx) => {
                const IconComponent = tech.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-150 bg-slate-50 hover:bg-white hover:border-[#0F4C81]/30 hover:shadow-sm transition-all duration-200 group h-20"
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
              <h4 className="text-base font-bold text-[#0F2744] tracking-tight">{activeTranslation.col3Title}</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {workforcePlatforms.map((platform, idx) => {
                const IconComponent = platform.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-150 bg-slate-50 hover:bg-white hover:border-[#0F4C81]/30 hover:shadow-sm transition-all duration-200 group h-20"
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

