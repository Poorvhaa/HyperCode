import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { HiringTimeline } from '@/components/hiring-timeline';
import { CareersFAQ } from '@/components/careers-faq';
import {
  Briefcase,
  Users,
  TrendingUp,
  Check,
  FileText,
  Phone,
  GitMerge,
  CheckCircle,
  Database,
  Clock,
  GraduationCap,
  HeartHandshake,
  DollarSign
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { HeroBanner } from '@/components/hero-banner';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: 'Common' });
  const t = await getTranslations({ locale, namespace: 'Careers' });

  return {
    title: `HyperCode | ${tc('careers')}`,
    description: t('subtitle'),
    alternates: {
      canonical: `https://www.hypercode.com/${locale}/careers`,
    },
  };
}

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Careers');
  const tc = await getTranslations('Common');

  const localTrans: Record<string, {
    heroTitle: string;
    heroTitleHighlight: string;
    heroSubtitle: string;
    badgeWhy: string;
    titleWhy: string;
    challengingProjectsTitle: string;
    challengingProjectsDesc: string;
    collaborativeCultureTitle: string;
    collaborativeCultureDesc: string;
    careerAdvancementTitle: string;
    careerAdvancementDesc: string;
    badgePerks: string;
    titlePerks: string;
    benefitsList: string[];
    badgeCulture: string;
    titleCulture: string;
    cultureCards: Array<{ title: string; desc: string }>;
    badgeAcquisition: string;
    titleAcquisition: string;
    descAcquisition: string;
    workflowLabels: string[];
    featureCards: Array<{ title: string; description: string; features: string[] }>;
    badgePromise: string;
    titlePromise: string;
    candidatePromiseCards: Array<{ title: string; description: string }>;
    badgeTimeline: string;
    titleTimeline: string;
    descTimeline: string;
    badgePositions: string;
    titlePositions: string;
    locationLabel: string;
    jobTypeLabel: string;
    bdmTitle: string;
    bdmDescription: string;
    bdmResponsibilities: string[];
    bdmQualifications: string[];
    bdmBenefits: string[];
    readyTitle: string;
    readyDesc: string;
    getInTouchBtn: string;
  }> = {
    en: {
      heroTitle: "Build Your Career at",
      heroTitleHighlight: "HyperCode",
      heroSubtitle: "Join a strategic team dedicated to transforming complex data into enterprise-grade intelligence.",
      badgeWhy: "WHY JOIN US",
      titleWhy: "Why Professionals Choose HyperCode",
      challengingProjectsTitle: "Challenging Projects",
      challengingProjectsDesc: "Work on complex, high-impact data engineering migrations that drive direct value for major organizations.",
      collaborativeCultureTitle: "Collaborative Culture",
      collaborativeCultureDesc: "Collaborate directly with certified cloud developers and experienced business analysts in an open environment.",
      careerAdvancementTitle: "Career Advancement",
      careerAdvancementDesc: "Expand your skills through professional development budgets, technical certifications, and direct mentorship.",
      badgePerks: "PERKS & BENEFITS",
      titlePerks: "Competitive Benefits",
      benefitsList: [
        'Competitive salary packages',
        'Comprehensive health insurance (medical, dental, vision)',
        '401(k) matching program',
        'Professional development and training budgets',
        'Flexible hours and work arrangements',
        'Remote work-friendly environments',
        'Structured mentorship and career growth programs',
        'Collaborative team events and advisory labs',
      ],
      badgeCulture: "OUR ENVIRONMENT",
      titleCulture: "Company Culture",
      cultureCards: [
        {
          title: "Collaborative Environment",
          desc: "We believe that great ideas come from sharing perspectives. Our team works closely together, aligning skill sets to solve challenging data blocks."
        },
        {
          title: "Continuous Education",
          desc: "Technology evolves rapidly. We invest in our consultants through continuing education structures, certified training cycles, and technical bootcamps."
        },
        {
          title: "Work-Life Integration",
          desc: "We respect your time. Flexible schedules, hybrid/remote operations, and generous time-off setups help you balance career with personal goals."
        },
        {
          title: "Impact-Driven Strategy",
          desc: "Your contributions are visible. We align every engineer's task with concrete client deliverables, meaning you see the real-world value of your work."
        }
      ],
      badgeAcquisition: "TALENT ACQUISITION PROCESS",
      titleAcquisition: "Modern Talent Acquisition & Delivery",
      descAcquisition: "Connecting exceptional talent with meaningful opportunities through industry-leading recruiting practices and workforce management technologies.",
      workflowLabels: [
        'Career Opportunities',
        'Application Review',
        'Recruiter Screening',
        'Client Matching',
        'Interview Process',
        'Offer & Onboarding'
      ],
      featureCards: [
        {
          title: "ATS-Driven Recruiting",
          description: "Our recruiting team leverages modern Applicant Tracking Systems (ATS) to efficiently match skilled professionals with opportunities aligned to their expertise and career goals.",
          features: ['Faster Candidate Matching', 'Skill-Based Search', 'Streamlined Hiring Process']
        },
        {
          title: "Enterprise Workforce Solutions",
          description: "HyperCode supports organizations utilizing Vendor Management Systems (VMS) and contingent workforce programs to efficiently deliver top technology talent.",
          features: ['Contract Staffing', 'Staff Augmentation', 'Direct Placement']
        },
        {
          title: "Candidate-Centric Experience",
          description: "We prioritize transparency, communication, and long-term career growth throughout every stage of the hiring process.",
          features: ['Dedicated Recruiters', 'Career Guidance', 'Professional Development']
        }
      ],
      badgePromise: "CANDIDATE PROMISE",
      titlePromise: "What Candidates Can Expect",
      candidatePromiseCards: [
        {
          title: 'Professional Growth',
          description: 'Access structured technical learning paths, client-sponsored certification cycles, and direct mentoring to expand your consulting capabilities.'
        },
        {
          title: 'Meaningful Projects',
          description: 'Engage with enterprise clients on high-impact data engineering migrations, cloud analytics setups, and strategic modernizations.'
        },
        {
          title: 'Competitive Compensation',
          description: 'Benefit from industry-leading salary packages, complete with comprehensive health benefits, retirement matches, and performance bonuses.'
        },
        {
          title: 'Flexible Opportunities',
          description: 'Choose from hybrid, fully remote, or on-site project configurations designed to align with your geographic preference and scheduling needs.'
        },
        {
          title: 'Industry Experts',
          description: 'Work alongside senior cloud architects, seasoned data modelers, and certified business analysts committed to engineering excellence.'
        },
        {
          title: 'Long-Term Partnerships',
          description: 'Build a long-term career path with HyperCode. We work proactively to align you with successive client projects as technologies and needs evolve.'
        }
      ],
      badgeTimeline: "ENGAGEMENT BLUEPRINT",
      titleTimeline: "Hiring Process Timeline",
      descTimeline: "Our structured timeline ensures clarity, prompt communication, and complete alignment at every stage of your candidacy.",
      badgePositions: "JOIN OUR TEAM",
      titlePositions: "Open Position",
      locationLabel: "Schaumburg, IL / Remote",
      jobTypeLabel: "Full-time",
      bdmTitle: "Business Development Manager",
      bdmDescription: "We are seeking a high-performing Business Development Manager to drive growth and expand our client base. In this role, you will identify new business opportunities, build strategic partnerships, and present our custom web application and data engineering solutions to enterprise clients.",
      bdmResponsibilities: [
        "Identify and target potential enterprise clients for web development and data engineering services.",
        "Build and maintain strong, long-lasting relationships with key decision-makers and stakeholders.",
        "Develop and execute strategic sales plans to achieve growth targets and expand market share.",
        "Collaborate with technical teams to draft tailored proposals and conduct high-impact presentations.",
        "Negotiate contracts and close business agreements to maximize company revenue."
      ],
      bdmQualifications: [
        "Bachelor's degree in Business, Marketing, Computer Science, or related field.",
        "3+ years of experience in business development or sales within the software consulting / IT service industry.",
        "Proven track record of closing enterprise-level deals and meeting or exceeding sales targets.",
        "Strong understanding of modern web technologies, custom applications, and cloud data ecosystems.",
        "Excellent communication, presentation, negotiation, and relationship-building skills."
      ],
      bdmBenefits: [
        "Highly competitive base salary with uncapped commission structure.",
        "Comprehensive health, dental, and vision insurance packages.",
        "Flexible work hours and remote/hybrid work options.",
        "401(k) matching program.",
        "Paid time off and annual performance bonuses."
      ],
      readyTitle: "Ready to Work with Us?",
      readyDesc: "Send us your credentials to start exploring technical opportunities at HyperCode.",
      getInTouchBtn: "Get in Touch"
    },
    es: {
      heroTitle: "Construya su Carrera en",
      heroTitleHighlight: "HyperCode",
      heroSubtitle: "Únase a un equipo estratégico debido a la transformación de datos complejos en inteligencia de nivel empresarial.",
      badgeWhy: "POR QUÉ UNIRSE A NOSOTROS",
      titleWhy: "Por Qué los Profesionales Eligen HyperCode",
      challengingProjectsTitle: "Proyectos Desafiantes",
      challengingProjectsDesc: "Trabaje en migraciones de ingeniería de datos complejas y de alto impacto que aportan valor directo a organizaciones importantes.",
      collaborativeCultureTitle: "Cultura Colaborativa",
      collaborativeCultureDesc: "Colabore directamente con desarrolladores certificados en la nube y analistas de negocios con experiencia en un entorno abierto.",
      careerAdvancementTitle: "Progreso Profesional",
      careerAdvancementDesc: "Amplíe sus habilidades a través de presupuestos de desarrollo profesional, certificaciones técnicas y tutoría directa.",
      badgePerks: "VENTAJAS Y BENEFICIOS",
      titlePerks: "Beneficios Competitivos",
      benefitsList: [
        'Paquetes salariales competitivos',
        'Seguro médico completo (médico, dental, visión)',
        'Programa de emparejamiento 401(k)',
        'Presupuestos para formación y desarrollo profesional',
        'Horarios y modalidades de trabajo flexibles',
        'Entornos adaptados al trabajo remoto',
        'Programas estructurados de tutoría y crecimiento profesional',
        'Eventos de equipo colaborativos y laboratorios asesores',
      ],
      badgeCulture: "NUESTRO ENTORNO",
      titleCulture: "Cultura de la Empresa",
      cultureCards: [
        {
          title: "Entorno Colaborativo",
          desc: "Creemos que las grandes ideas surgen de compartir perspectivas. Nuestro equipo trabaja estrechamente, alineando conjuntos de habilidades para resolver bloques de datos desafiantes."
        },
        {
          title: "Educación Continua",
          desc: "La tecnología evoluciona rápidamente. Invertimos en nuestros consultores a través de estructuras de educación continua, ciclos de formación certificada y campamentos técnicos."
        },
        {
          title: "Integración Trabajo-Vida",
          desc: "Respetamos su tiempo. Horarios flexibles, operaciones híbridas/remotas y configuraciones generosas de tiempo libre le ayudan a equilibrar su carrera con metas personales."
        },
        {
          title: "Estrategia Orientada al Impacto",
          desc: "Sus contribuciones son visibles. Alineamos cada tarea del ingeniero con entregables concretos del cliente, lo que significa que ve el valor real de su trabajo."
        }
      ],
      badgeAcquisition: "PROCESO DE ADQUISICIÓN DE TALENTO",
      titleAcquisition: "Adquisición y Entrega de Talento Moderno",
      descAcquisition: "Conectando talento excepcional con oportunidades significativas a través de prácticas de reclutamiento líderes en la industria y tecnologías de gestión de la fuerza laboral.",
      workflowLabels: [
        'Oportunidades Profesionales',
        'Revisión de la Solicitud',
        'Evaluación del Reclutador',
        'Emparejamiento con Clientes',
        'Proceso de Entrevista',
        'Oferta e Incorporación'
      ],
      featureCards: [
        {
          title: "Reclutamiento Impulsado por ATS",
          description: "Nuestro equipo de reclutamiento aprovecha los Sistemas de Seguimiento de Candidatos (ATS) modernos para emparejar eficientemente a profesionales capacitados con oportunidades alineadas con su experiencia.",
          features: ['Emparejamiento Rápido de Candidatos', 'Búsqueda Basada en Habilidades', 'Proceso de Contratación Agilizado']
        },
        {
          title: "Soluciones de Personal Corporativo",
          description: "HyperCode apoya a las organizaciones que utilizan Sistemas de Gestión de Proveedores (VMS) y programas de fuerza laboral contingente para entregar eficientemente talento tecnológico de primer nivel.",
          features: ['Personal Temporal', 'Aumento de Personal', 'Colocación Directa']
        },
        {
          title: "Experiencia Centrada en el Candidato",
          description: "Priorizamos la transparencia, la comunicación y el crecimiento profesional a largo plazo en cada etapa del proceso de contratación.",
          features: ['Reclutadores Dedicados', 'Orientación Profesional', 'Desarrollo Profesional']
        }
      ],
      badgePromise: "PROMESA AL CANDIDATO",
      titlePromise: "Lo Que los Candidatos Pueden Esperar",
      candidatePromiseCards: [
        {
          title: 'Crecimiento Profesional',
          description: 'Acceda a rutas de aprendizaje técnico estructuradas, ciclos de certificación patrocinados por el cliente y tutoría directa para expandir sus capacidades de consultoría.'
        },
        {
          title: 'Proyectos Significativos',
          description: 'Participe con clientes empresariales en migraciones de ingeniería de datos de alto impacto, configuraciones de análisis en la nube y modernizaciones estratégicas.'
        },
        {
          title: 'Compensación Competitiva',
          description: 'Benefíciese de paquetes salariales líderes en la industria, completos con beneficios de salud integrales, emparejamientos de jubilación y bonos de rendimiento.'
        },
        {
          title: 'Oportunidades Flexibles',
          description: 'Elija entre configuraciones de proyectos híbridas, totalmente remotas o en el sitio diseñadas para alinearse con su preferencia geográfica y necesidades de programación.'
        },
        {
          title: 'Expertos de la Industria',
          description: 'Trabaje junto a arquitectos de la nube senior, modeladores de datos experimentados y analistas de negocios certificados comprometidos con la excelencia en ingeniería.'
        },
        {
          title: 'Asociaciones a Largo Plazo',
          description: 'Construya una trayectoria profesional a largo plazo con HyperCode. Trabajamos proactivamente para alinearle con proyectos sucesivos de clientes a medida que las tecnologías y necesidades evolucionan.'
        }
      ],
      badgeTimeline: "PLANO DE COMPROMISO",
      titleTimeline: "Cronograma del Proceso de Contratación",
      descTimeline: "Nuestro cronograma estructurado garantiza claridad, comunicación rápida y alineación completa en cada etapa de su candidatura.",
      badgePositions: "ÚNASE A NUESTRO EQUIPO",
      titlePositions: "Vacante Actual",
      locationLabel: "Schaumburg, IL / Remoto",
      jobTypeLabel: "Tiempo completo",
      bdmTitle: "Gerente de Desarrollo de Negocios",
      bdmDescription: "Buscamos un Gerente de Desarrollo de Negocios de alto rendimiento para impulsar el crecimiento y expandir nuestra base de clientes. En esta función, identificará nuevas oportunidades comerciales, construirá asociaciones estratégicas y presentará nuestras soluciones de desarrollo web personalizado e ingeniería de datos a clientes empresariales.",
      bdmResponsibilities: [
        "Identificar y dirigirse a clientes empresariales potenciales para servicios de desarrollo web e ingeniería de datos.",
        "Construir y mantener relaciones sólidas y duraderas con tomadores de decisiones clave.",
        "Desarrollar y ejecutar planes de ventas estratégicos para lograr objetivos de crecimiento y expandir la cuota de mercado.",
        "Colaborar con equipos técnicos para redactar propuestas personalizadas y realizar presentaciones de alto impacto.",
        "Negociar contratos y cerrar acuerdos comerciales para maximizar los ingresos de la empresa."
      ],
      bdmQualifications: [
        "Licenciatura en Negocios, Marketing, Ciencias de la Computación o campo relacionado.",
        "Más de 3 años de experiencia en desarrollo de negocios o ventas dentro del sector de consultoría de software / servicios de TI.",
        "Historial comprobado de cierre de acuerdos a nivel empresarial y cumplimiento o superación de objetivos de ventas.",
        "Comprensión sólida de tecnologías de desarrollo web moderno, aplicaciones personalizadas y ecosistemas de datos en la nube.",
        "Excelentes habilidades de comunicación, presentación, negociación y construcción de relaciones."
      ],
      bdmBenefits: [
        "Salario base altamente competitivo con estructura de comisiones sin límite.",
        "Paquetes completos de seguro médico, dental y de la vista.",
        "Horarios de trabajo flexibles y opciones de trabajo remoto/híbrido.",
        "Programa de emparejamiento 401(k).",
        "Tiempo libre remunerado y bonos anuales por rendimiento."
      ],
      readyTitle: "¿Listo para Trabajar con Nosotros?",
      readyDesc: "Envíenos sus credenciales para comenzar a explorar oportunidades técnicas en HyperCode.",
      getInTouchBtn: "Ponerse en Contacto"
    }
  };

  const activeTrans = localTrans[locale] || localTrans.en;

  const workflowIcons = [Briefcase, FileText, Phone, GitMerge, Users, CheckCircle];
  const workflowSteps = activeTrans.workflowLabels.map((label, idx) => ({
    label,
    icon: workflowIcons[idx] || Briefcase
  }));

  const promiseIcons = [TrendingUp, Database, DollarSign, Clock, GraduationCap, HeartHandshake];
  const candidateBenefits = activeTrans.candidatePromiseCards.map((card, idx) => ({
    ...card,
    icon: promiseIcons[idx] || TrendingUp
  }));

  return (
    <main className="relative w-full bg-white text-left min-h-screen bg-dot-pattern">
      <Navigation />

      {/* Careers Reusable Hero Banner */}
      <HeroBanner
        bgImage="https://images.unsplash.com/photo-152202176988-66273c2fd55f?q=80&w=1600"
        categoryLabel={activeTrans.badgeWhy}
        title={activeTrans.heroTitle}
        titleHighlight={activeTrans.heroTitleHighlight}
        subtitle={activeTrans.heroSubtitle}
        breadcrumbs={[
          { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
          { label: locale === 'es' ? 'Carreras' : 'Careers' }
        ]}
      />

      {/* Why Work Here */}
      <section className="section-padding bg-white border-b border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            <div className="premium-card p-8 bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0F4C81]">
                <Briefcase size={20} />
              </div>
              <h3 className="text-[22px] font-bold text-slate-900 leading-[1.2]">{activeTrans.challengingProjectsTitle}</h3>
              <p className="text-[16px] md:text-[17px] text-slate-655 leading-[1.7] font-semibold">
                {activeTrans.challengingProjectsDesc}
              </p>
            </div>
            
            <div className="premium-card p-8 bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0F4C81]">
                <Users size={20} />
              </div>
              <h3 className="text-[22px] font-bold text-slate-900 leading-[1.2]">{activeTrans.collaborativeCultureTitle}</h3>
              <p className="text-[16px] md:text-[17px] text-slate-655 leading-[1.7] font-semibold">
                {activeTrans.collaborativeCultureDesc}
              </p>
            </div>

            <div className="premium-card p-8 bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0F4C81]">
                <TrendingUp size={20} />
              </div>
              <h3 className="text-[22px] font-bold text-slate-900 leading-[1.2]">{activeTrans.careerAdvancementTitle}</h3>
              <p className="text-[16px] md:text-[17px] text-slate-655 leading-[1.7] font-semibold">
                {activeTrans.careerAdvancementDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C81]" />
              {activeTrans.badgePerks}
            </span>
            <h3 className="text-[28px] sm:text-[32px] lg:text-[40px] font-black text-slate-900 tracking-tight leading-[1.2]">{activeTrans.titlePerks}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeTrans.benefitsList.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3.5 p-4.5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-2 h-2 rounded-full bg-[#0F4C81] flex-shrink-0" />
                <p className="text-[16px] text-slate-700 font-bold">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="section-padding bg-white relative border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C81]" />
              {activeTrans.badgeCulture}
            </span>
            <h3 className="text-[28px] sm:text-[32px] lg:text-[40px] font-black text-slate-900 tracking-tight leading-[1.2]">{activeTrans.titleCulture}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {activeTrans.cultureCards.map((card, i) => (
              <div key={i} className="premium-card p-8 bg-white border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-[22px] font-bold text-slate-900 leading-[1.2]">{card.title}</h3>
                <p className="text-[16px] md:text-[17px] text-slate-655 leading-[1.7] font-semibold">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Talent Acquisition & Delivery */}
      <section className="section-padding bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C81]" />
              {activeTrans.badgeAcquisition}
            </span>
            <h3 className="text-[28px] sm:text-[32px] lg:text-[40px] font-black text-slate-900 tracking-tight leading-[1.2]">
              {activeTrans.titleAcquisition}
            </h3>
            <p className="text-[16px] md:text-[17px] lg:text-[18px] text-slate-650 font-semibold leading-relaxed">
              {activeTrans.descAcquisition}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Workflow */}
            <div className="lg:col-span-5">
              <div className="premium-card bg-white border border-slate-200 rounded-[24px] p-8 shadow-sm">
                <span className="text-[10px] font-extrabold text-[#0F4C81] tracking-widest uppercase block mb-8">
                  {activeTrans.badgeTimeline}
                </span>
                
                <div className="flex flex-col items-start space-y-0.5">
                  {workflowSteps.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                      <div key={idx} className="flex flex-col items-start w-full">
                        <div className="flex items-center gap-4 py-2">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4C81] shadow-sm flex-shrink-0 z-10">
                            <Icon size={16} />
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-wide">
                            {step.label}
                          </span>
                        </div>
                        {idx < workflowSteps.length - 1 && (
                          <div className="w-10 flex justify-center -my-2.5">
                            <div className="w-[1.5px] h-7 bg-slate-200 border-dashed border-l" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Feature Cards */}
            <div className="lg:col-span-7 space-y-6">
              {activeTrans.featureCards.map((card, idx) => (
                <div
                  key={idx}
                  className="premium-card p-8 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-5"
                >
                  <div className="space-y-2">
                    <h4 className="text-[22px] font-bold text-slate-900 leading-[1.2]">{card.title}</h4>
                    <p className="text-[16px] md:text-[17px] text-slate-655 leading-[1.7] font-semibold">
                      {card.description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-5 border-t border-slate-200">
                    {card.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2">
                        <Check size={14} className="text-[#0F4C81] flex-shrink-0" />
                        <span className="text-[11px] sm:text-xs font-bold text-slate-700">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Candidate Promise */}
      <section className="section-padding bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C81]" />
              {activeTrans.badgePromise}
            </span>
            <h3 className="text-[28px] sm:text-[32px] lg:text-[40px] font-black text-slate-900 tracking-tight leading-[1.2]">
              {activeTrans.titlePromise}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidateBenefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="premium-card p-8 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-[#0F4C81] flex items-center justify-center">
                      <Icon size={18} />
                    </div>
                    <h4 className="text-[22px] font-bold text-slate-900 leading-[1.2]">{benefit.title}</h4>
                    <p className="text-[16px] md:text-[17px] text-slate-655 leading-[1.7] font-semibold">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hiring Timeline */}
      <section className="section-padding bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C81]" />
              {activeTrans.badgeTimeline}
            </span>
            <h3 className="text-[28px] sm:text-[32px] lg:text-[40px] font-black text-slate-900 tracking-tight leading-[1.2] mb-4">
              {activeTrans.titleTimeline}
            </h3>
            <p className="text-[16px] md:text-[17px] text-slate-650 leading-relaxed font-semibold">
              {activeTrans.descTimeline}
            </p>
          </div>

          <HiringTimeline />
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C81]" />
              {activeTrans.badgePositions}
            </span>
            <h3 className="text-[28px] sm:text-[32px] lg:text-[40px] font-black text-slate-900 tracking-tight leading-[1.2]">{activeTrans.titlePositions}</h3>
          </div>

          <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-[24px] p-8 sm:p-12 shadow-lg">
            {/* Header */}
            <div className="text-center space-y-4 pb-8 border-b border-slate-200">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold bg-[#0F4C81]/10 text-[#0F4C81] uppercase tracking-wider">
                {activeTrans.jobTypeLabel}
              </span>
              <h3 className="text-[28px] sm:text-[32px] font-black text-slate-900 tracking-tight leading-[1.2]">
                {activeTrans.bdmTitle}
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-extrabold uppercase tracking-widest">
                {activeTrans.locationLabel}
              </p>
            </div>

            {/* Overview */}
            <div className="py-8 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {locale === 'es' ? 'Resumen del Puesto' : 'Role Overview'}
              </h4>
              <p className="text-slate-655 text-[16px] md:text-[17px] leading-[1.7] font-semibold">
                {activeTrans.bdmDescription}
              </p>
            </div>

            {/* Grid for Responsibilities and Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-t border-b border-slate-200">
              {/* Responsibilities */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {locale === 'es' ? 'Responsabilidades Clave' : 'Key Responsibilities'}
                </h4>
                <ul className="space-y-3">
                  {activeTrans.bdmResponsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="text-[#0F4C81] w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-655 text-[16px] font-semibold leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {locale === 'es' ? 'Requisitos' : 'Requirements'}
                </h4>
                <ul className="space-y-3">
                  {activeTrans.bdmQualifications.map((qual, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0F4C81] mt-2 flex-shrink-0" />
                      <span className="text-slate-655 text-[16px] font-semibold leading-relaxed">{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Benefits */}
            <div className="py-8 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {locale === 'es' ? 'Beneficios del Puesto' : 'Role Benefits'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeTrans.bdmBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                    <span className="text-sm flex-shrink-0">💼</span>
                    <span className="text-slate-700 text-[16px] font-bold leading-none">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <div className="pt-8 text-center">
              <Link
                href={`/careers/apply?position=${encodeURIComponent('Business Development Manager')}`}
                className="btn-primary inline-flex min-w-[200px]"
              >
                {t('applyNow')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CareersFAQ />

      {/* CTA Section */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-[28px] sm:text-[32px] lg:text-[40px] font-black text-slate-900 tracking-tight leading-[1.2]">{activeTrans.readyTitle}</h3>
          <p className="text-[16px] md:text-[17px] lg:text-[18px] text-slate-655 max-w-xl mx-auto font-semibold leading-[1.7]">
            {activeTrans.readyDesc}
          </p>
          <div>
            <Link
              href="/contact"
              className="btn-primary inline-flex min-w-[200px]"
            >
              {activeTrans.getInTouchBtn}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
