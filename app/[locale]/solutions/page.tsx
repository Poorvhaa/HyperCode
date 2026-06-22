import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navigation } from '@/components/navigation';
import { CaseStudiesSection } from '@/components/case-studies-section';
import { Footer } from '@/components/footer';
import { 
  BarChart3, 
  TrendingUp, 
  Database, 
  Cpu, 
  Globe, 
  FileText, 
  Layers, 
  Lightbulb, 
  Users, 
  UserCheck, 
  Clock, 
  ShieldCheck, 
  Check, 
  ArrowRight,
  Code
} from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: 'Common' });
  const t = await getTranslations({ locale, namespace: 'Solutions' });

  return {
    title: `${tc('solutions')} | HyperCode`,
    description: t('subtitle'),
    alternates: {
      canonical: `https://www.hypercode.com/${locale}/solutions`,
    },
  };
}

export default async function SolutionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Solutions');
  const tc = await getTranslations('Common');

  // Translations map for categories and details
  const localTrans: Record<string, {
    heroTitle: string;
    heroTitleHighlight: string;
    heroSubtitle: string;
    stickyAnchors: Record<string, string>;
    serviceCategoryLabel: string;
    keyBenefitsLabel: string;
    techStandardsLabel: string;
    learnMoreBtn: string;
    practiceProcessLabel: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaBtn: string;
    categories: Array<{
      id: string;
      title: string;
      description: string;
      services: Array<{
        id: string;
        title: string;
        shortDesc: string;
        path: string;
        benefits: string[];
        technologies: string[];
        process: string[];
      }>;
    }>;
  }> = {
    en: {
      heroTitle: "Enterprise",
      heroTitleHighlight: "Solutions",
      heroSubtitle: "Comprehensive cloud data systems, strategic consulting frameworks, and specialized talent recruitment architectures.",
      stickyAnchors: {
        'data-analytics': 'Data & Analytics',
        'digital-solutions': 'Digital Solutions',
        'consulting-services': 'Consulting Services',
        'talent-solutions': 'Talent Solutions'
      },
      serviceCategoryLabel: "Service Category",
      keyBenefitsLabel: "Key Benefits",
      techStandardsLabel: "Technologies & Standards",
      learnMoreBtn: "Learn More",
      practiceProcessLabel: "Our Practice Process",
      ctaTitle: "Ready to Deploy Certified Solutions?",
      ctaDesc: "Schedule a consultation with our practice directors to align your data pipelines, tech strategy, or recruiting requirements.",
      ctaBtn: "Get Started",
      categories: [
        {
          id: 'data-analytics',
          title: 'Data & Analytics',
          description: 'Transforming complex databases, cloud formats, and raw telemetry into unified enterprise insights.',
          services: [
            {
              id: 'business-intelligence',
              title: 'Business Intelligence',
              shortDesc: 'Power BI, Tableau, and Advanced Reporting',
              path: '/solutions/business-intelligence-consulting',
              benefits: [
                'Real-time dashboard creation',
                'Interactive data visualization',
                'Automated reporting workflows',
                'Data-informed decision making',
                'Executive scorecards',
                'Self-service analytics',
              ],
              technologies: ['Power BI', 'Tableau', 'Qlik', 'Looker'],
              process: ['Assessment', 'Design', 'Implementation', 'Training', 'Support'],
            },
            {
              id: 'data-analytics-services',
              title: 'Data Analytics',
              shortDesc: 'Predictive Modeling, ML & Insights',
              path: '/solutions/data-analytics-services',
              benefits: [
                'Predictive ML modeling',
                'Statistical analysis',
                'Machine learning loops',
                'Customer lifetime analytics',
                'Market trend forecasting',
                'Operations optimization',
              ],
              technologies: ['Python', 'R', 'SQL', 'Apache Spark'],
              process: ['Data Collection', 'Analysis', 'Modeling', 'Validation', 'Deployment'],
            },
            {
              id: 'data-warehousing',
              title: 'Data Warehousing',
              shortDesc: 'Cloud Warehousing, Data Lakes & ETL',
              path: '/solutions/data-warehousing-services',
              benefits: [
                'Enterprise integration',
                'Cloud-native architecture',
                'Scalable data lakes',
                'ETL pipeline automation',
                'Data quality management',
                'Cloud billing optimization',
              ],
              technologies: ['Snowflake', 'BigQuery', 'Redshift', 'Azure Synapse'],
              process: ['Planning', 'Design', 'Migration', 'Optimization', 'Maintenance'],
            },
            {
              id: 'data-engineering',
              title: 'Data Engineering',
              shortDesc: 'Tested Data Pipelines & Integrations',
              path: '/solutions/data-engineering-solutions',
              benefits: [
                'Robust ETL/ELT pipelines',
                'Real-time stream ingestion',
                'Data quality schema checks',
                'Third-party API syncs',
                'Pipeline health monitoring',
                'Schema migration scripts',
              ],
              technologies: ['Airflow', 'dbt', 'Fivetran', 'Prefect'],
              process: ['Assessment', 'Pipeline Design', 'Development', 'Testing', 'Deployment'],
            }
          ]
        },
        {
          id: 'digital-solutions',
          title: 'Digital Solutions',
          description: 'Designing and developing modern, scalable, secure, and high-performance web applications.',
          services: [
            {
              id: 'web-development',
              title: 'Web Development',
              shortDesc: 'Corporate Websites, Custom Applications & SaaS',
              path: '/solutions/web-development-services',
              benefits: [
                'Modern React & Next.js architectures',
                'Responsive, mobile-first design system',
                'Secure API & ERP integrations',
                'High-performance PageSpeed scores',
                'Scalable serverless cloud deployments',
                'Clean, well-documented source code',
              ],
              technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'AWS', 'Azure'],
              process: [
                'Discovery & Planning',
                'UI/UX Architecture Design',
                'Full-Stack Development',
                'API Integration & Security Audit',
                'Performance Optimization & Cloud Deployment'
              ],
            }
          ]
        },
        {
          id: 'consulting-services',
          title: 'Consulting Services',
          description: 'Bridging the gap between corporate technology investments and strategic operational results.',
          services: [
            {
              id: 'business-analysis',
              title: 'Business Analysis',
              shortDesc: 'Strategy alignment, requirements gathering, and process mapping',
              path: '/contact',
              benefits: [
                'Align technology with business goals',
                'Detailed requirement documents',
                'Process flow optimization',
                'Stakeholder alignment',
                'Gap analysis audits',
                'Risk mitigation roadmaps',
              ],
              technologies: ['Jira', 'Confluence', 'Visio', 'Miro'],
              process: ['Stakeholder Interviews', 'Requirements Gathering', 'Process Mapping', 'Gap Analysis', 'Strategic Recommendation'],
            },
            {
              id: 'technology-consulting',
              title: 'Technology Consulting',
              shortDesc: 'Tech stack selection, architecture advisory, and cloud strategy',
              path: '/contact',
              benefits: [
                'Optimal tech stack design',
                'Future-proof architecture',
                'Cloud readiness audits',
                'Cost optimization plans',
                'Vendor evaluation metrics',
                'Security audit alignment',
              ],
              technologies: ['Cloud Architecture', 'SaaS Strategy', 'Migration Plans', 'ROI Analysis'],
              process: ['Infrastructure Audit', 'Stack Evaluation', 'Architecture Design', 'Cost Modeling', 'Execution Roadmap'],
            },
            {
              id: 'agile-project-management',
              title: 'Agile Project Management',
              shortDesc: 'Scrum, Kanban, and modern agile program delivery',
              path: '/contact',
              benefits: [
                'Improved sprint velocity',
                'Predictable delivery cycles',
                'Clear task accountability',
                'Minimized project creep',
                'CI/CD release alignment',
                'Team resource utilization',
              ],
              technologies: ['Scrum', 'Agile Principles', 'Azure DevOps', 'Jira Align'],
              process: ['Sprint Planning', 'Daily Standups', 'Backlog Grooming', 'Retrospectives', 'Velocity Tracking'],
            }
          ]
        },
        {
          id: 'talent-solutions',
          title: 'Talent Solutions',
          description: 'Sourcing, vetting, and deploying top-tier database, cloud, and engineering specialists.',
          services: [
            {
              id: 'it-staffing',
              title: 'IT Staffing',
              shortDesc: 'Placing database, cloud, and analytics specialists',
              path: '/solutions/it-staffing-solutions',
              benefits: [
                'Access to 12,000+ candidates',
                'Technical screen filters',
                'Background check vetting',
                'VMS billing compliance',
                'Fast 14-day placement loop',
                'Direct compliance oversight',
              ],
              technologies: ['Bullhorn', 'JobDiva', 'Technical Screens', 'Code Vetting'],
              process: ['Requirement Intake', 'Sourcing & Screening', 'Technical Evaluation', 'Client Interviews', 'Onboarding Support'],
            },
            {
              id: 'staff-augmentation',
              title: 'Staff Augmentation',
              shortDesc: 'Scale active tech teams with specialized consultants',
              path: '/solutions/staff-augmentation-services',
              benefits: [
                'Seamless team integration',
                'No long-term liability',
                'Active sprint alignment',
                'Flexible contract durations',
                'Direct task reporting',
                'Immediate scaling velocity',
              ],
              technologies: ['Slack Integration', 'Git Collaboration', 'Agile Sprints', 'VPN Setups'],
              process: ['Skills Audit', 'Consultant Matching', 'Environment Setup', 'Standup Integration', 'Performance Reviews'],
            }
          ]
        }
      ]
    },
    es: {
      heroTitle: "Soluciones",
      heroTitleHighlight: "Empresariales",
      heroSubtitle: "Sistemas integrales de datos en la nube, marcos de consultoría estratégica y arquitecturas especializadas en contratación de talento.",
      stickyAnchors: {
        'data-analytics': 'Datos y Analítica',
        'digital-solutions': 'Soluciones Digitales',
        'consulting-services': 'Servicios de Consultoría',
        'talent-solutions': 'Soluciones de Talento'
      },
      serviceCategoryLabel: "Categoría de Servicio",
      keyBenefitsLabel: "Beneficios Clave",
      techStandardsLabel: "Tecnologías y Estándares",
      learnMoreBtn: "Más Información",
      practiceProcessLabel: "Nuestro Proceso de Práctica",
      ctaTitle: "¿Listo para Implementar Soluciones Certificadas?",
      ctaDesc: "Programe una consulta con nuestros directores de práctica para alinear sus canalizaciones de datos, estrategia tecnológica o requisitos de contratación.",
      ctaBtn: "Comenzar",
      categories: [
        {
          id: 'data-analytics',
          title: 'Datos y Analítica',
          description: 'Transformación de bases de datos complejas, formatos en la nube y telemetría sin procesar en conocimientos empresariales unificados.',
          services: [
            {
              id: 'business-intelligence',
              title: 'Inteligencia de Negocios',
              shortDesc: 'Power BI, Tableau y Generación de Informes Avanzados',
              path: '/solutions/business-intelligence-consulting',
              benefits: [
                'Creación de paneles en tiempo real',
                'Visualización interactiva de datos',
                'Flujos de trabajo de informes automatizados',
                'Toma de decisiones informada por datos',
                'Cuadros de mando ejecutivos',
                'Análisis de autoservicio',
              ],
              technologies: ['Power BI', 'Tableau', 'Qlik', 'Looker'],
              process: ['Evaluación', 'Diseño', 'Implementación', 'Capacitación', 'Soporte'],
            },
            {
              id: 'data-analytics-services',
              title: 'Análisis de Datos',
              shortDesc: 'Modelado Predictivo, ML y Conocimientos',
              path: '/solutions/data-analytics-services',
              benefits: [
                'Modelado predictivo de ML',
                'Análisis estadístico',
                'Bucles de aprendizaje automático',
                'Análisis del valor de vida del cliente',
                'Previsión de tendencias del mercado',
                'Optimización de operaciones',
              ],
              technologies: ['Python', 'R', 'SQL', 'Apache Spark'],
              process: ['Recopilación de Datos', 'Análisis', 'Modelado', 'Validación', 'Implementación'],
            },
            {
              id: 'data-warehousing',
              title: 'Almacenamiento de Datos',
              shortDesc: 'Almacenamiento en la Nube, Lagos de Datos y ETL',
              path: '/solutions/data-warehousing-services',
              benefits: [
                'Integración empresarial',
                'Arquitectura nativa de la nube',
                'Lagos de datos escalables',
                'Automatización de canalizaciones ETL',
                'Gestión de calidad de datos',
                'Optimización de facturación en la nube',
              ],
              technologies: ['Snowflake', 'BigQuery', 'Redshift', 'Azure Synapse'],
              process: ['Planificación', 'Diseño', 'Migración', 'Optimización', 'Mantenimiento'],
            },
            {
              id: 'data-engineering',
              title: 'Ingeniería de Datos',
              shortDesc: 'Canalizaciones de Datos Probadas e Integraciones',
              path: '/solutions/data-engineering-solutions',
              benefits: [
                'Canalizaciones ETL/ELT robustas',
                'Ingesta de flujos en tiempo real',
                'Verificaciones de esquemas de calidad de datos',
                'Sincronizaciones de API de terceros',
                'Monitoreo de salud de canalizaciones',
                'Scripts de migración de esquemas',
              ],
              technologies: ['Airflow', 'dbt', 'Fivetran', 'Prefect'],
              process: ['Evaluación', 'Diseño de Canalización', 'Desarrollo', 'Pruebas', 'Implementación'],
            }
          ]
        },
        {
          id: 'digital-solutions',
          title: 'Soluciones Digitales',
          description: 'Diseño y desarrollo de aplicaciones web modernas, escalables, seguras y de alto rendimiento.',
          services: [
            {
              id: 'web-development',
              title: 'Desarrollo Web',
              shortDesc: 'Sitios Web Corporativos, Aplicaciones Personalizadas y SaaS',
              path: '/solutions/web-development-services',
              benefits: [
                'Arquitecturas modernas de React y Next.js',
                'Sistema de diseño responsivo y primero en móviles',
                'Integraciones seguras de API y ERP',
                'Puntajes de PageSpeed de alto rendimiento',
                'Implementaciones escalables en la nube sin servidor',
                'Código fuente limpio y bien documentado',
              ],
              technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'AWS', 'Azure'],
              process: [
                'Descubrimiento y Planificación',
                'Diseño de Arquitectura UI/UX',
                'Desarrollo Full-Stack',
                'Integración de API y Auditoría de Seguridad',
                'Optimización de Rendimiento y Despliegue en la Nube'
              ],
            }
          ]
        },
        {
          id: 'consulting-services',
          title: 'Servicios de Consultoría',
          description: 'Cerrando la brecha entre las inversiones en tecnología corporativa y los resultados operativos estratégicos.',
          services: [
            {
              id: 'business-analysis',
              title: 'Análisis de Negocios',
              shortDesc: 'Alineación de estrategia, recopilación de requisitos y mapeo de procesos',
              path: '/contact',
              benefits: [
                'Alinear la tecnología con las metas de negocio',
                'Documentos de requisitos detallados',
                'Optimización del flujo de procesos',
                'Alineación de partes interesadas',
                'Auditorías de análisis de brechas',
                'Hojas de ruta de mitigación de riesgos',
              ],
              technologies: ['Jira', 'Confluence', 'Visio', 'Miro'],
              process: ['Entrevistas con Interesados', 'Recopilación de Requisitos', 'Mapeo de Procesos', 'Análisis de Brechas', 'Recomendación Estratégica'],
            },
            {
              id: 'technology-consulting',
              title: 'Consultoría Tecnológica',
              shortDesc: 'Selección de pila tecnológica, asesoría de arquitectura y estrategia de nube',
              path: '/contact',
              benefits: [
                'Diseño de pila tecnológica óptima',
                'Arquitectura preparada para el futuro',
                'Auditorías de preparación para la nube',
                'Planes de optimización de costos',
                'Métricas de evaluación de proveedores',
                'Alineación de auditoría de seguridad',
              ],
              technologies: ['Arquitectura Cloud', 'Estrategia SaaS', 'Planes de Migración', 'Análisis de ROI'],
              process: ['Auditoría de Infraestructura', 'Evaluación de Pila', 'Diseño de Arquitectura', 'Modelado de Costos', 'Hoja de Ruta de Ejecución'],
            },
            {
              id: 'agile-project-management',
              title: 'Gestión Ágil de Proyectos',
              shortDesc: 'Scrum, Kanban y entrega de programas ágiles modernos',
              path: '/contact',
              benefits: [
                'Velocidad de sprint mejorada',
                'Ciclos de entrega predecibles',
                'Responsabilidad clara de tareas',
                'Desviación del proyecto minimizada',
                'Alineación de lanzamiento CI/CD',
                'Utilización de recursos del equipo',
              ],
              technologies: ['Scrum', 'Principios Ágiles', 'Azure DevOps', 'Jira Align'],
              process: ['Planificación de Sprint', 'Standups Diarios', 'Refinamiento de Backlog', 'Retrospectivas', 'Seguimiento de Velocidad'],
            }
          ]
        },
        {
          id: 'talent-solutions',
          title: 'Soluciones de Talento',
          description: 'Búsqueda, evaluación e implementación de especialistas en bases de datos, nube e ingeniería de primer nivel.',
          services: [
            {
              id: 'it-staffing',
              title: 'Personal de TI',
              shortDesc: 'Colocación de especialistas en bases de datos, nube y analítica',
              path: '/solutions/it-staffing-solutions',
              benefits: [
                'Acceso a más de 12,000 candidatos',
                'Filtros de evaluación técnica',
                'Verificación de antecedentes',
                'Cumplimiento de facturación VMS',
                'Bucle de colocación rápido de 14 días',
                'Supervisión directa de cumplimiento',
              ],
              technologies: ['Bullhorn', 'JobDiva', 'Evaluaciones Técnicas', 'Validación de Código'],
              process: ['Ingesta de Requisitos', 'Búsqueda y Selección', 'Evaluación Técnica', 'Entrevistas de Clientes', 'Soporte de Incorporación'],
            },
            {
              id: 'staff-augmentation',
              title: 'Aumento de Personal',
              shortDesc: 'Escale equipos tecnológicos activos con consultores especializados',
              path: '/solutions/staff-augmentation-services',
              benefits: [
                'Integración fluida del equipo',
                'Sin responsabilidad a largo plazo',
                'Alineación de sprints activos',
                'Duraciones de contrato flexibles',
                'Informe directo de tareas',
                'Velocidad de escalado inmediata',
              ],
              technologies: ['Integración de Slack', 'Colaboración Git', 'Sprints Ágiles', 'Configuraciones VPN'],
              process: ['Auditoría de Habilidades', 'Emparejamiento de Consultores', 'Configuración de Entorno', 'Integración de Standups', 'Revisiones de Rendimiento'],
            }
          ]
        }
      ]
    }
  };

  const activeTrans = localTrans[locale] || localTrans.en;
  const serviceCategories = activeTrans.categories;

  // Map Lucide icons dynamically to categories
  const categoryIcons: Record<string, Record<string, any>> = {
    'data-analytics': {
      'business-intelligence': BarChart3,
      'data-analytics-services': TrendingUp,
      'data-warehousing': Database,
      'data-engineering': Cpu,
    },
    'digital-solutions': {
      'web-development': Code
    },
    'consulting-services': {
      'business-analysis': FileText,
      'technology-consulting': Lightbulb,
      'agile-project-management': Layers
    },
    'talent-solutions': {
      'it-staffing': Users,
      'staff-augmentation': UserCheck
    }
  };

  return (
    <main className="relative w-full bg-white text-left">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-slate-50 pt-36 pb-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F2744] tracking-tight leading-[1.15]">
              {activeTrans.heroTitle} <span className="text-[#0F4C81]">{activeTrans.heroTitleHighlight}</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-650 font-medium leading-relaxed">
              {activeTrans.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Quick Anchors Bar */}
      <div className="sticky top-20 bg-white border-b border-slate-200/80 z-30 py-3.5 shadow-sm flex items-center justify-center gap-6 md:gap-10">
        {serviceCategories.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.id}`}
            className="text-xs font-bold uppercase tracking-widest text-[#0F2744] hover:text-[#0F4C81] transition-colors"
          >
            {activeTrans.stickyAnchors[cat.id] || cat.title}
          </a>
        ))}
      </div>

      {/* Categories Content Sections */}
      <section className="bg-white">
        {serviceCategories.map((category) => (
          <div key={category.id} id={category.id} className="py-24 border-b border-slate-150 scroll-mt-36">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Category Header */}
              <div className="max-w-3xl mb-16 space-y-3">
                <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase">
                  {activeTrans.serviceCategoryLabel}
                </h2>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0F2744] tracking-tight">
                  {category.title}
                </h3>
                <p className="text-slate-600 text-base font-medium leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Service Cards Loop */}
              <div className="space-y-20">
                {category.services.map((service) => {
                  const Icon = (categoryIcons[category.id] && categoryIcons[category.id][service.id]) || Code;
                  return (
                    <div 
                      key={service.id} 
                      id={service.id} 
                      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch scroll-mt-36"
                    >
                      {/* Left: Content Card */}
                      <div className="space-y-6 flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                              <Icon size={20} />
                            </div>
                            <h4 className="text-2xl font-bold text-[#0F2744] tracking-tight">{service.title}</h4>
                          </div>
                          <p className="text-sm font-bold text-[#0F4C81] uppercase tracking-wide leading-none">{service.shortDesc}</p>
                        </div>

                        <div className="space-y-3">
                          <h5 className="text-xs font-bold text-[#0F2744] uppercase tracking-widest">{activeTrans.keyBenefitsLabel}</h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-slate-600">
                            {service.benefits.map((benefit, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <Check size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h5 className="text-xs font-bold text-[#0F2744] uppercase tracking-widest">{activeTrans.techStandardsLabel}</h5>
                          <div className="flex flex-wrap gap-1.5">
                            {service.technologies.map((tech, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-slate-50 border border-slate-200/80 text-slate-550 rounded-lg text-xs font-bold uppercase tracking-wider"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2">
                          <Link
                            href={service.path.startsWith('/solutions/') ? `/${locale}${service.path}` : `/${locale}${service.path}`}
                            className="inline-flex items-center justify-center h-10 px-5 bg-[#0F4C81] hover:bg-[#0A365D] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
                          >
                            <span>{activeTrans.learnMoreBtn}</span>
                            <ArrowRight size={14} className="ml-1.5" />
                          </Link>
                        </div>
                      </div>

                      {/* Right: Process Card */}
                      <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6 sm:p-8 space-y-6">
                        <h5 className="text-xs font-bold text-[#0F2744] uppercase tracking-widest">{activeTrans.practiceProcessLabel}</h5>
                        <div className="space-y-4">
                          {service.process.map((step, i) => (
                            <div key={i} className="flex gap-4">
                              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs">
                                {i + 1}
                              </div>
                              <div className="flex-1 pt-1.5 text-left">
                                <p className="text-sm font-bold text-slate-800 leading-none">{step}</p>
                                {i < service.process.length - 1 && (
                                  <div className="w-px h-8 bg-slate-200 ml-4 mt-2" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-3xl font-extrabold text-[#0F2744] tracking-tight">{activeTrans.ctaTitle}</h3>
          <p className="text-base sm:text-lg text-slate-650 max-w-xl mx-auto font-medium">
            {activeTrans.ctaDesc}
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

      <CaseStudiesSection />

      <Footer />
    </main>
  );
}

