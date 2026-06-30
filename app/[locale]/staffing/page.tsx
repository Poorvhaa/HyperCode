import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Briefcase, 
  UserCheck, 
  Clock, 
  Search, 
  GraduationCap, 
  UserPlus, 
  FileText, 
  Cpu 
} from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: 'Common' });
  
  const seo = {
    en: {
      title: `IT & Non-IT Staffing & Augmentation | Talent Solutions | HyperCode`,
      description: "Access pre-screened IT & Non-IT talent, contract placements, permanent hiring, staff augmentation, bulk hiring, and RPO solutions from HyperCode. Headquartered in Schaumburg, IL.",
    },
    es: {
      title: `Contratación de Personal de TI y No TI | Soluciones de Talento | HyperCode`,
      description: "Acceda a personal de TI y No TI preseleccionado, contratación por contrato, contratación permanente, aumento de personal y soluciones de RPO. Con sede en Schaumburg, IL.",
    }
  };

  const currentSeo = seo[locale as 'en' | 'es'] || seo.en;

  return {
    title: currentSeo.title,
    description: currentSeo.description,
    alternates: {
      canonical: `https://www.hypercode.com/${locale}/staffing`,
    },
  };
}

const IconComponent = ({ name, size = 20, className = "" }: { name: string; size?: number; className?: string }) => {
  switch (name) {
    case 'Cpu': return <Cpu size={size} className={className} />;
    case 'Briefcase': return <Briefcase size={size} className={className} />;
    case 'UserCheck': return <UserCheck size={size} className={className} />;
    case 'Clock': return <Clock size={size} className={className} />;
    case 'Search': return <Search size={size} className={className} />;
    case 'Users': return <Users size={size} className={className} />;
    case 'GraduationCap': return <GraduationCap size={size} className={className} />;
    case 'UserPlus': return <UserPlus size={size} className={className} />;
    case 'FileText': return <FileText size={size} className={className} />;
    default: return <Users size={size} className={className} />;
  }
};

export default async function StaffingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Translations for all languages
  const localTrans: Record<string, {
    title: string;
    titleHighlight: string;
    subtitle: string;
    capabilitiesTitle: string;
    capabilitiesSubtitle: string;
    capabilities: Array<{ title: string; desc: string; iconName: string }>;
    staffingSolutions: Array<{
      title: string;
      description: string;
      duration: string;
      path: string;
      benefits: string[];
    }>;
    learnMore: string;
    expertiseTitle: string;
    expertiseSubtitle: string;
    talentAreas: string[];
    processTitle: string;
    processSubtitle: string;
    processSteps: Array<{ step: string; desc: string }>;
    whyTitle: string;
    whyItems: Array<{ title: string; desc: string }>;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaBtn: string;
  }> = {
    en: {
      title: "IT & Non-IT",
      titleHighlight: "Staffing Solutions",
      subtitle: "Access pre-screened, specialized technology and business professionals for contract, contract-to-hire, direct placement, and team augmentation.",
      capabilitiesTitle: "OUR SERVICES",
      capabilitiesSubtitle: "Comprehensive Staffing Capabilities",
      capabilities: [
        { title: "IT Staffing", desc: "Placing pre-screened React/Next.js developers, cloud architects, database engineers, and security specialists.", iconName: "Cpu" },
        { title: "Non-IT Staffing", desc: "Sourcing business analysts, operations managers, HR specialists, and finance professionals.", iconName: "Briefcase" },
        { title: "Permanent Hiring", desc: "Finding and vetting permanent engineering leaders, department directors, and operational staff.", iconName: "UserCheck" },
        { title: "Contract Staffing", desc: "Deploying temporary experts for 6-to-18-month projects to execute database migrations or rebuilds.", iconName: "Clock" },
        { title: "Executive Search", desc: "Identifying and recruiting high-caliber C-level executives and senior operations directors.", iconName: "Search" },
        { title: "Bulk Hiring", desc: "Scaling entire corporate teams quickly for large-scale operations or new project initialization.", iconName: "Users" },
        { title: "Campus Recruitment", desc: "Sourcing, interviewing, and onboarding top talent from leading universities and graduate programs.", iconName: "GraduationCap" },
        { title: "Staff Augmentation", desc: "Seamlessly scaling your existing teams with dedicated professionals who match your tooling and environments.", iconName: "UserPlus" },
        { title: "Recruitment Process Outsourcing (RPO)", desc: "Managing end-to-end talent acquisition pipelines for your organization to optimize cost, speed, and candidate quality.", iconName: "FileText" }
      ],
      staffingSolutions: [
        {
          title: 'Contract Staffing',
          description: 'Flexible staffing solutions for short-term projects, peak demand periods, and specialized business needs.',
          duration: '3-12 months',
          path: '/solutions/it-staffing-solutions',
          benefits: ['Quick deployment', 'Flexible terms', 'Cost-effective', 'Specialized skills'],
        },
        {
          title: 'Contract-to-Hire',
          description: 'Trial period before permanent commitment, reducing hiring risk and ensuring correct operational alignment.',
          duration: '3-6 months trial',
          path: '/solutions/it-staffing-solutions',
          benefits: ['Reduced risk', 'Evaluation period', 'Seamless transition', 'Team fit verification'],
        },
        {
          title: 'Direct Placement',
          description: 'Permanent placement services with comprehensive vetting, background checks, and onboarding support.',
          duration: 'Permanent',
          path: '/solutions/it-staffing-solutions',
          benefits: ['Permanent placement', 'Full benefits', 'Dedicated support', 'Retention focus'],
        },
        {
          title: 'Staff Augmentation',
          description: 'Extend your active project teams with specialized resources for ongoing development and migrations.',
          duration: 'Ongoing',
          path: '/solutions/staff-augmentation-services',
          benefits: ['Team expansion', 'Scalable resources', 'Full integration', 'Long-term partnership'],
        },
      ],
      learnMore: "Learn More",
      expertiseTitle: "EXPERTISE DEPLOYMENT",
      expertiseSubtitle: "Specialized Talent Areas",
      talentAreas: [
        'Data Engineers',
        'BI Developers',
        'Data Analysts',
        'Business Analysts',
        'Project Managers',
        'Scrum Masters',
        'Full Stack Developers',
        'Database Administrators',
      ],
      processTitle: "METHODOLOGY",
      processSubtitle: "Our Hiring Process",
      processSteps: [
        { step: 'Requirement', desc: 'Define your needs and position requirements' },
        { step: 'Screening', desc: 'Pre-qualified candidate review and screening' },
        { step: 'Interview', desc: 'Technical and cultural fit interviews' },
        { step: 'Deployment', desc: 'Onboarding and integration with your team' },
      ],
      whyTitle: "Why HyperCode",
      whyItems: [
        {
          title: 'Pre-Screened Talent',
          desc: 'Only the most qualified and technically vetted professionals are presented to your team.',
        },
        {
          title: 'Quick Deployment',
          desc: 'Our optimized sourcing workflow enables an average time-to-fill of 2-3 weeks.',
        },
        {
          title: 'Ongoing Support',
          desc: 'Dedicated management and structured check-ins throughout the engagement period.',
        },
      ],
      ctaTitle: "Ready to Build Your Dream Team?",
      ctaSubtitle: "Schedule a consultation with our recruitment managers to source specialized technical and business talent.",
      ctaBtn: "Start Your Hiring Process",
    },
    es: {
      title: "Contratación de",
      titleHighlight: "Personal de TI y No TI",
      subtitle: "Acceda a profesionales tecnológicos y de negocios especializados y preseleccionados para contratos temporales, contratos de prueba, contratación directa y aumento de personal.",
      capabilitiesTitle: "NUESTROS SERVICIOS",
      capabilitiesSubtitle: "Capacidades Integrales de Personal",
      capabilities: [
        { title: "Contratación de Personal de TI", desc: "Colocación de desarrolladores de React/Next.js, arquitectos de nube, ingenieros de datos y administradores de bases de datos preseleccionados.", iconName: "Cpu" },
        { title: "Personal de No TI", desc: "Búsqueda de analistas de negocio, gerentes de operaciones, especialistas en recursos humanos y profesionales financieros.", iconName: "Briefcase" },
        { title: "Contratación Permanente", desc: "Encontrar y evaluar líderes de ingeniería permanentes, directores de departamento y personal de operaciones.", iconName: "UserCheck" },
        { title: "Personal por Contrato", desc: "Despliegue de expertos temporales para proyectos de 6 a 18 meses para ejecutar migraciones o reconstrucciones.", iconName: "Clock" },
        { title: "Búsqueda Ejecutiva", desc: "Identificar y reclutar ejecutivos de nivel C y directores de operaciones senior de alto calibre.", iconName: "Search" },
        { title: "Contratación Masiva", desc: "Escalar equipos corporativos completos rápidamente para operaciones a gran escala o inicio de nuevos proyectos.", iconName: "Users" },
        { title: "Reclutamiento Universitario", desc: "Búsqueda e incorporación de los mejores talentos de las principales universidades y programas de posgrado.", iconName: "GraduationCap" },
        { title: "Aumento de Personal", desc: "Escalamiento fluido de sus equipos existentes con profesionales dedicados que se alinean con sus herramientas y entornos de desarrollo.", iconName: "UserPlus" },
        { title: "Outsourcing de Procesos de Reclutamiento (RPO)", desc: "Gestión de canalizaciones de adquisición de talento de extremo a extremo para su organización para optimizar costos, velocidad y calidad.", iconName: "FileText" }
      ],
      staffingSolutions: [
        {
          title: 'Personal por Contrato',
          description: 'Soluciones flexibles de personal para proyectos a corto plazo, períodos de alta demanda y necesidades específicas de negocio.',
          duration: '3-12 meses',
          path: '/solutions/it-staffing-solutions',
          benefits: ['Despliegue rápido', 'Términos flexibles', 'Rentable', 'Habilidades especializadas'],
        },
        {
          title: 'Contrato con Opción a Compra',
          description: 'Período de prueba antes de un compromiso permanente, reduciendo el riesgo de contratación y garantizando la alineación operativa.',
          duration: 'Prueba de 3-6 meses',
          path: '/solutions/it-staffing-solutions',
          benefits: ['Riesgo reducido', 'Período de evaluación', 'Transición perfecta', 'Verificación de ajuste con el equipo'],
        },
        {
          title: 'Colocación Directa',
          description: 'Servicios de colocación permanente con evaluación integral, verificación de antecedentes y soporte de incorporación.',
          duration: 'Permanente',
          path: '/solutions/it-staffing-solutions',
          benefits: ['Colocación permanente', 'Beneficios completos', 'Soporte dedicado', 'Enfoque en retención'],
        },
        {
          title: 'Aumento de Personal',
          description: 'Amplíe sus equipos de proyecto activos con recursos especializados para el desarrollo continuo y migraciones de datos.',
          duration: 'Continuo',
          path: '/solutions/staff-augmentation-services',
          benefits: ['Expansión del equipo', 'Recursos escalables', 'Integración completa', 'Asociación a largo plazo'],
        },
      ],
      learnMore: "Saber más",
      expertiseTitle: "DESPLIEGUE DE EXPERIENCIA",
      expertiseSubtitle: "Áreas de Talento Especializado",
      talentAreas: [
        'Ingenieros de Datos',
        'Desarrolladores de BI',
        'Analistas de Datos',
        'Analistas de Negocio',
        'Gerentes de Proyecto',
        'Scrum Masters',
        'Desarrolladores Full Stack',
        'Administradores de Bases de Datos',
      ],
      processTitle: "METODOLOGÍA",
      processSubtitle: "Nuestro Proceso de Contratación",
      processSteps: [
        { step: 'Requisito', desc: 'Definir sus necesidades y los requisitos del puesto' },
        { step: 'Selección', desc: 'Revisión y precalificación de candidatos' },
        { step: 'Entrevista', desc: 'Entrevistas técnicas y de ajuste cultural' },
        { step: 'Despliegue', desc: 'Incorporación e integración con su equipo' },
      ],
      whyTitle: "¿Por qué HyperCode?",
      whyItems: [
        {
          title: 'Talento Preseleccionado',
          desc: 'Solo se presentan a su equipo los profesionales más cualificados y técnicamente validados.',
        },
        {
          title: 'Despliegue Rápido',
          desc: 'Nuestro flujo de trabajo optimizado permite un tiempo medio de cobertura de 2-3 semanas.',
        },
        {
          title: 'Soporte Continuo',
          desc: 'Gestión dedicada y revisiones estructuradas a lo largo de todo el compromiso.',
        },
      ],
      ctaTitle: "¿Listo para construir el equipo de tus sueños?",
      ctaSubtitle: "Programe una consulta con nuestros gerentes de reclutamiento para contratar talento técnico y de negocios especializado.",
      ctaBtn: "Comience su proceso de contratación",
    }
  };

  const activeTrans = localTrans[locale] || localTrans.en;

  return (
    <main className="relative w-full bg-white text-left">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-slate-50 pt-36 pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {activeTrans.title} <span className="text-[#0F4C81]">{activeTrans.titleHighlight}</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
              {activeTrans.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Talent Solutions */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activeTrans.staffingSolutions.map((solution, index) => {
              const id = solution.title.toLowerCase().replace(/\s+/g, '-');
              return (
                <div
                  key={index}
                  id={id}
                  className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between scroll-mt-24"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-2xl font-bold text-slate-900">{solution.title}</h3>
                      <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider">
                        {solution.duration}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{solution.description}</p>

                    <div className="pt-4 border-t border-slate-200 space-y-3">
                      {solution.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle size={16} className="text-[#0F4C81] flex-shrink-0" />
                          <span className="text-xs sm:text-sm font-semibold text-slate-600">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link
                      href={`/${locale}${solution.path}`}
                      className="inline-flex items-center justify-center h-10 px-5 bg-white border border-[#0F4C81] hover:bg-slate-50 text-[#0F4C81] font-bold text-xs uppercase tracking-wider rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
                    >
                      <span>{activeTrans.learnMore}</span>
                      <ArrowRight size={14} className="ml-1.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comprehensive Capabilities Grid */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">
              {activeTrans.capabilitiesTitle}
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {activeTrans.capabilitiesSubtitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeTrans.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-350 transition-all duration-300 shadow-sm flex gap-4 items-start"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-[#0F4C81] flex items-center justify-center flex-shrink-0">
                  <IconComponent name={cap.iconName} size={20} />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-slate-900 tracking-tight">{cap.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-medium">
                    {cap.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Talent Areas */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">{activeTrans.expertiseTitle}</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">{activeTrans.expertiseSubtitle}</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {activeTrans.talentAreas.map((area, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm text-center"
              >
                <p className="text-sm font-semibold text-slate-800">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">{activeTrans.processTitle}</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">{activeTrans.processSubtitle}</h3>
          </div>

          <div className="relative">
            <div className="space-y-12">
              {activeTrans.processSteps.map((item, i) => (
                <div key={i} className="flex gap-6 items-start relative">
                  <div className="flex-shrink-0 z-10">
                    <div className="w-10 h-10 rounded-xl bg-[#0F4C81] flex items-center justify-center text-white font-bold text-sm">
                      {i + 1}
                    </div>
                  </div>
                  <div className="flex-1 pt-1.5">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{item.step}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                  {i < activeTrans.processSteps.length - 1 && (
                    <div className="absolute left-[19px] top-10 w-px h-16 bg-slate-200 -z-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why HyperCode */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeTrans.whyItems.map((item, index) => (
              <div key={index} className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#0F4C81]">
                  <Users size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{activeTrans.ctaTitle}</h3>
          <p className="text-base sm:text-lg text-slate-650 max-w-xl mx-auto font-medium">
            {activeTrans.ctaSubtitle}
          </p>
          <div>
            <Link
              href={`/${locale}/consultation`}
              className="inline-flex items-center justify-center h-11 px-7 bg-[#0F4C81] hover:bg-[#0A365D] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              {activeTrans.ctaBtn}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
