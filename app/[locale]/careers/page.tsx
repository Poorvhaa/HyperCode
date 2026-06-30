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
import Link from 'next/link';

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

  // Multi-language local translations for arrays not in the JSON dictionaries
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
      heroSubtitle: "Únase a un equipo estratégico dedicado a transformar datos complejos en inteligencia de nivel empresarial.",
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
    },
    // Adding fallbacks to Spanish for Romance/European languages and localized English for others to ensure high fidelity translation quality
    fr: {
      heroTitle: "Bâtissez votre carrière chez",
      heroTitleHighlight: "HyperCode",
      heroSubtitle: "Rejoignez une équipe stratégique dédiée à la transformation de données complexes en intelligence d'entreprise.",
      badgeWhy: "POURQUOI NOUS REJOINDRE",
      titleWhy: "Pourquoi les professionnels choisissent HyperCode",
      challengingProjectsTitle: "Projets stimulants",
      challengingProjectsDesc: "Travaillez sur des projets de migration complexes et à fort impact pour des organisations de premier plan.",
      collaborativeCultureTitle: "Culture collaborative",
      collaborativeCultureDesc: "Collaborez directement avec des architectes cloud et des analystes chevronnés au sein d'un écosystème ouvert.",
      careerAdvancementTitle: "Évolution de carrière",
      careerAdvancementDesc: "Développez vos compétences grâce à des budgets de formation, des certifications et un mentorat direct.",
      badgePerks: "AVANTAGES ET AVANTAGES SOCIAUX",
      titlePerks: "Avantages compétitifs",
      benefitsList: [
        'Rémunération compétitive',
        'Couverture santé complète (médicale, dentaire, vision)',
        'Programme d\'épargne retraite 401(k) avec abondement',
        'Budget de développement professionnel et de formation',
        'Horaires et modalités de travail flexibles',
        'Environnement de travail adapté au télétravail',
        'Mentorat structuré et accompagnement de carrière',
        'Événements d\'équipe collaboratifs et ateliers d\'innovation',
      ],
      badgeCulture: "NOTRE ENVIRONNEMENT",
      titleCulture: "Culture d'entreprise",
      cultureCards: [
        {
          title: "Environnement collaboratif",
          desc: "Nous croyons que les meilleures idées naissent du partage d'expérience. Nos équipes collaborent étroitement pour résoudre des défis technologiques."
        },
        {
          title: "Formation continue",
          desc: "La technologie évolue constamment. Nous investissons dans nos consultants via des formations qualifiantes et des bootcamps techniques."
        },
        {
          title: "Équilibre vie pro/perso",
          desc: "Nous respectons votre temps. Des horaires flexibles et du télétravail vous aident à concilier vie professionnelle et vie privée."
        },
        {
          title: "Stratégie axée sur l'impact",
          desc: "Votre contribution est mesurable. Chaque tâche est alignée sur des livrables clients concrets pour donner du sens à votre travail."
        }
      ],
      badgeAcquisition: "PROCESSUS D'ACQUISITION DE TALENTS",
      titleAcquisition: "Recrutement et intégration de talents",
      descAcquisition: "Connecter des talents d'exception à des opportunités enrichissantes grâce à des outils de gestion RH de pointe.",
      workflowLabels: [
        'Opportunités de carrière',
        'Examen des candidatures',
        'Entretien de présélection',
        'Appariement client',
        'Processus d\'entretien',
        'Offre et intégration'
      ],
      featureCards: [
        {
          title: "Recrutement piloté par ATS",
          description: "Nos recruteurs utilisent des outils ATS modernes pour cibler rapidement les opportunités correspondant à votre profil.",
          features: ['Ciblage rapide des profils', 'Recherche par compétences', 'Recrutement simplifié']
        },
        {
          title: "Solutions de recrutement d'entreprise",
          description: "HyperCode collabore avec les systèmes VMS d'entreprise pour déployer des profils d'experts qualifiés.",
          features: ['Prestations temporaires', 'Renforcement d\'équipes', 'Recrutement direct']
        },
        {
          title: "Expérience candidat privilégiée",
          description: "La transparence, la communication ouverte et l'accompagnement de votre évolution sont au cœur de nos priorités.",
          features: ['Recruteurs dédiés', 'Orientation de carrière', 'Développement continu']
        }
      ],
      badgePromise: "PROMESSE AUX CANDIDATS",
      titlePromise: "Ce que nous vous offrons",
      candidatePromiseCards: [
        {
          title: 'Crecimiento Profesional',
          description: 'Accédez à des parcours de formation, des certifications financées par l\'entreprise et un accompagnement sur mesure.'
        },
        {
          title: 'Projets stimulants',
          description: 'Prenez part à des projets d\'envergure d\'architecture de données, de migration cloud et de développement moderne.'
        },
        {
          title: 'Rémunération attractive',
          description: 'Bénéficiez de packages de rémunération attractifs incluant une couverture santé complète et des primes de performance.'
        },
        {
          title: 'Flexibilité organisationnelle',
          description: 'Optez pour du télétravail partiel ou total ou des configurations sur site adaptées à votre mode de vie.'
        },
        {
          title: 'Experts du secteur',
          description: 'Travaillez aux côtés d\'architectes cloud seniors et d\'analystes confirmés passionnés d\'excellence technique.'
        },
        {
          title: 'Partenariat à long terme',
          description: 'Construisez votre carrière à nos côtés. Nous vous accompagnons d\'un projet à l\'autre au fil de l\'évolution de vos aspirations.'
        }
      ],
      badgeTimeline: "PLAN D'ENGAGEMENT",
      titleTimeline: "Étapes de recrutement",
      descTimeline: "Notre processus de recrutement clair et structuré garantit un suivi fluide et transparent de votre candidature.",
      badgePositions: "REJOINDRE L'ÉQUIPE",
      titlePositions: "Poste à Pourvoir",
      locationLabel: "Schaumburg, IL / Télétravail",
      jobTypeLabel: "Temps plein",
      bdmTitle: "Responsable du Développement Commercial",
      bdmDescription: "Nous recherchons un Responsable du Développement Commercial performant pour stimuler la croissance et élargir notre clientèle. À ce poste, vous identifierez de nouvelles opportunités commerciales, établirez des partenariats stratégiques et présenterez nos solutions de développement web sur mesure et d'ingénierie de données à des clients de niveau entreprise.",
      bdmResponsibilities: [
        "Identifier et cibler les clients potentiels pour les services de développement web et d'ingénierie de données.",
        "Établir et maintenir des relations solides et durables avec les principaux décideurs et parties prenantes.",
        "Développer et exécuter des plans de vente stratégiques pour atteindre les objectifs de croissance et accroître la part de marché.",
        "Collaborer avec les équipes techniques pour rédiger des propositions personnalisées et réaliser des présentations à fort impact.",
        "Négocier les contrats et conclure des accords commerciaux pour maximiser les revenus de l'entreprise."
      ],
      bdmQualifications: [
        "Licence en commerce, marketing, informatique ou domaine connexe.",
        "Plus de 3 ans d'expérience dans le développement commercial ou la vente au sein de l'industrie du conseil en logiciels / services informatiques.",
        "Antécédents éprouvés de conclusion de transactions d'entreprise et d'atteinte ou de dépassement des objectifs de vente.",
        "Solide compréhension des technologies web modernes, des applications personnalisées et des écosystèmes de données cloud.",
        "Excellentes compétences en communication, présentation, négociation et établissement de relations."
      ],
      bdmBenefits: [
        "Salaire de base hautement compétitif avec structure de commissions non plafonnée.",
        "Forfaits complets d'assurance maladie, dentaire et visuelle.",
        "Horaires de travail flexibles et options de travail à distance/hybride.",
        "Programme de jumelage 401(k).",
        "Congés payés et primes de performance annuelles."
      ],
      readyTitle: "Prêt à nous rejoindre ?",
      readyDesc: "Envoyez-nous votre profil pour commencer à explorer les opportunités technologiques chez HyperCode.",
      getInTouchBtn: "Contactez-nous"
    }
  };

  const activeTrans = localTrans[locale] || localTrans.en;

  // Map Lucide icons dynamically to steps and promises
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

  // Read translated jobs from dictionary files dynamically
  // Since we only have the Business Development Manager role active:
  const openPositions = [
    {
      title: activeTrans.bdmTitle,
      location: activeTrans.locationLabel,
      type: activeTrans.jobTypeLabel,
      description: activeTrans.bdmDescription
    }
  ];

  return (
    <main className="relative w-full bg-white text-left">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-slate-50 pt-36 pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {activeTrans.heroTitle} <span className="text-[#0F4C81]">{activeTrans.heroTitleHighlight}</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
              {activeTrans.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Why Work Here */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4C81]">
                <Briefcase size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{activeTrans.challengingProjectsTitle}</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {activeTrans.challengingProjectsDesc}
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4C81]">
                <Users size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{activeTrans.collaborativeCultureTitle}</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {activeTrans.collaborativeCultureDesc}
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4C81]">
                <TrendingUp size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{activeTrans.careerAdvancementTitle}</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {activeTrans.careerAdvancementDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">{activeTrans.badgePerks}</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">{activeTrans.titlePerks}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeTrans.benefitsList.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#0F4C81] flex-shrink-0" />
                <p className="text-sm text-slate-600 font-semibold">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">{activeTrans.badgeCulture}</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">{activeTrans.titleCulture}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeTrans.cultureCards.map((card, i) => (
              <div key={i} className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-2">
                <h3 className="text-base font-bold text-slate-900">{card.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Talent Acquisition & Delivery */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">
              {activeTrans.badgeAcquisition}
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              {activeTrans.titleAcquisition}
            </h3>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-medium">
              {activeTrans.descAcquisition}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Workflow visualization */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase block mb-6">
                  {activeTrans.badgeTimeline}
                </span>
                
                <div className="flex flex-col items-start space-y-0.5">
                  {workflowSteps.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                      <div key={idx} className="flex flex-col items-start w-full">
                        <div className="flex items-center gap-4 py-2">
                          <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4C81] shadow-sm flex-shrink-0 z-10">
                            <Icon size={16} />
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-wide">
                            {step.label}
                          </span>
                        </div>
                        {idx < workflowSteps.length - 1 && (
                          <div className="w-10 flex justify-center -my-2.5">
                            <div className="w-0.5 h-7 bg-slate-200 border-dashed border-l" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Three Feature Cards */}
            <div className="lg:col-span-7 space-y-6">
              {activeTrans.featureCards.map((card, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-slate-300 transition-colors duration-200 space-y-4"
                >
                  <div className="space-y-1.5">
                    <h4 className="text-base font-bold text-slate-900">{card.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {card.description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-slate-100">
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

      {/* Candidate Benefits Subsection */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">
              {activeTrans.badgePromise}
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
              {activeTrans.titlePromise}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidateBenefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-slate-300 transition-colors duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 text-[#0F4C81] flex items-center justify-center">
                      <Icon size={16} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{benefit.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hiring Process Timeline Section */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">
              {activeTrans.badgeTimeline}
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none mb-4">
              {activeTrans.titleTimeline}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {activeTrans.descTimeline}
            </p>
          </div>

          <HiringTimeline />
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">{activeTrans.badgePositions}</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">{activeTrans.titlePositions}</h3>
          </div>

          <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm hover:shadow-md transition-all duration-350">
            {/* Header: Title, Location, Type */}
            <div className="text-center space-y-4 pb-8 border-b border-slate-100">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-[#0F4C81]/10 text-[#0F4C81] uppercase tracking-wider">
                {activeTrans.jobTypeLabel}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {activeTrans.bdmTitle}
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm font-bold uppercase tracking-wider">
                {activeTrans.locationLabel}
              </p>
            </div>

            {/* Overview / Description */}
            <div className="py-8 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {locale === 'es' ? 'Resumen del Puesto' : locale === 'fr' ? 'Aperçu du Poste' : 'Role Overview'}
              </h4>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                {activeTrans.bdmDescription}
              </p>
            </div>

            {/* Grid for Responsibilities and Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-t border-b border-slate-100">
              {/* Responsibilities */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {locale === 'es' ? 'Responsabilidades Clave' : locale === 'fr' ? 'Responsabilités Clés' : 'Key Responsibilities'}
                </h4>
                <ul className="space-y-3">
                  {activeTrans.bdmResponsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="text-[#0F4C81] w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {locale === 'es' ? 'Requisitos' : locale === 'fr' ? 'Exigences' : 'Requirements'}
                </h4>
                <ul className="space-y-3">
                  {activeTrans.bdmQualifications.map((qual, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0F4C81] mt-2 flex-shrink-0" />
                      <span className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Benefits */}
            <div className="py-8 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {locale === 'es' ? 'Beneficios del Puesto' : locale === 'fr' ? 'Avantages' : 'Role Benefits'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeTrans.bdmBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/50 shadow-sm">
                    <span className="text-sm flex-shrink-0">💼</span>
                    <span className="text-slate-700 text-xs sm:text-sm font-bold leading-none">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA button */}
            <div className="pt-8 text-center">
              <Link
                href={`/${locale}/careers/apply?position=${encodeURIComponent('Business Development Manager')}`}
                className="inline-flex items-center justify-center h-12 px-10 bg-[#0F4C81] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#0c3c66] transition-colors duration-200 shadow-sm"
              >
                {t('applyNow')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CareersFAQ />

      {/* CTA Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{activeTrans.readyTitle}</h3>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto font-medium">
            {activeTrans.readyDesc}
          </p>
          <div>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center h-12 px-7 bg-[#0F4C81] text-white font-semibold text-[14px] rounded-xl hover:bg-[#0c3c66] transition-colors duration-200 shadow-sm"
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
