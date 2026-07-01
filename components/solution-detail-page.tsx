import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { HeroBanner } from '@/components/hero-banner';

const HERO_IMAGES: Record<string, string> = {
  'business-intelligence-consulting': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600',
  'data-analytics-services': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600',
  'data-engineering-solutions': 'https://images.unsplash.com/photo-1597852074816-d933c4d2b988?q=80&w=1600',
  'data-warehousing-services': 'https://images.unsplash.com/photo-1597852074816-d933c4d2b988?q=80&w=1600',
  'it-staffing-solutions': 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1600',
  'staff-augmentation-services': 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1600',
  'web-development-services': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1600'
};


interface SolutionDetailPageProps {
  locale: string;
  pageKey: string;
  tc: any;
}

export function SolutionDetailPage({ locale, pageKey, tc }: SolutionDetailPageProps) {
  // Multilingual translation maps for all 7 detail pages
  const localTrans: Record<string, Record<string, {
    categoryLabel: string;
    title: string;
    titleHighlight: string;
    description: string;
    overviewTitle: string;
    overviewP1: string;
    overviewP2: string;
    keySolutionsLabel: string;
    benefitsTitle: string;
    techTitle: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaBtn: string;
    benefits: Array<{ title: string; desc: string }>;
    technologies: Array<{ name: string; role: string }>;
  }>> = {
    en: {
      'business-intelligence-consulting': {
        categoryLabel: "Enterprise Solutions",
        title: "Business Intelligence",
        titleHighlight: "Consulting",
        description: "Transform raw transaction records and database logs into interactive, automated executive dashboards.",
        overviewTitle: "Empower Your Decision-Makers with Data",
        overviewP1: "In modern enterprise organizations, decisions must be backed by accurate, fresh data. Legacy spreadsheets and fragmented queries lead to operational latency and audit issues. HyperCode's Business Intelligence Consulting services bridge the gap between complex databases and strategic execution.",
        overviewP2: "Our certified BI consultants design and deploy custom Power BI, Tableau, and Looker dashboards. We implement robust semantic models, clean database structures, and configure secure report distribution methods so your teams access insights securely from any device.",
        keySolutionsLabel: "Key Solutions",
        benefitsTitle: "Measurable BI Benefits",
        techTitle: "Technologies & Tools",
        ctaTitle: "Ready to Optimize Your Business Intelligence?",
        ctaDesc: "Schedule a consultation with our practice directors to align your data analytics, dashboards, or reporting workflows.",
        ctaBtn: "Schedule Consultation",
        benefits: [
          { title: 'Executive Reporting Systems', desc: 'Deliver automated, high-level dashboards with KPIs tailored for senior leadership and key stakeholders.' },
          { title: 'Self-Service Analytics', desc: 'Empower operational teams to build custom queries and reports without relying on core engineering support.' },
          { title: 'Real-Time Insights', desc: 'Reduce latency by streaming operational and transaction data directly to active visual telemetry dashboards.' },
          { title: 'Data Harmonization', desc: 'Clean, filter, and format fragmented databases to ensure a single source of truth across operations.' },
        ],
        technologies: [
          { name: 'Power BI', role: 'Enterprise reporting & Microsoft integration' },
          { name: 'Tableau', role: 'Advanced visual analysis & interactive maps' },
          { name: 'Looker', role: 'Modern web analytics & custom integrations' },
          { name: 'Qlik', role: 'Data discovery & associative engine analytics' },
        ]
      },
      'data-analytics-services': {
        categoryLabel: "Enterprise Solutions",
        title: "Data Analytics",
        titleHighlight: "Services",
        description: "Unlock strategic advantage with predictive models, statistical forecasting, and machine learning integration.",
        overviewTitle: "Drive Growth with Advanced Predictive Science",
        overviewP1: "Traditional reporting models look backward, telling you what happened in the past. Modern enterprises, however, require predictive analytics to anticipate user preferences, adjust operational strategies, and prevent churn before it impacts revenue.",
        overviewP2: "At HyperCode, our data science teams help you deploy advanced analytics capabilities. We clean complex datasets, develop custom predictive models in Python and R, and build analytics loops that feed directly back into your core business applications.",
        keySolutionsLabel: "Key Solutions",
        benefitsTitle: "Measurable Analytics Impact",
        techTitle: "Technologies & Tools",
        ctaTitle: "Ready to Optimize Your Data Analytics?",
        ctaDesc: "Schedule a consultation with our practice directors to align your machine learning, statistical research, or database analytics.",
        ctaBtn: "Schedule Consultation",
        benefits: [
          { title: 'Predictive Modeling', desc: 'Build custom machine learning and statistical models to forecast customer demand, sales volumes, and market trends.' },
          { title: 'Customer Behavior Tracking', desc: 'Map user journeys, calculate customer lifetime value (CLV), and build retention strategies backed by quantitative statistics.' },
          { title: 'Operational Optimization', desc: 'Identify database inefficiencies, resource bottlenecks, and supply chain delays using structured data science dashboards.' },
          { title: 'Advanced Machine Learning', desc: 'Integrate artificial intelligence pipelines to automate categorization, anomaly detection, and classification tasks.' },
        ],
        technologies: [
          { name: 'Python', role: 'Machine learning, predictive algorithms, and statistical analysis' },
          { name: 'R', role: 'Advanced academic statistics and deep database research' },
          { name: 'SQL', role: 'Complex queries, dataset manipulation, and staging setups' },
          { name: 'Apache Spark', role: 'Distributed compute processing for high-volume datasets' },
        ]
      },
      'data-engineering-solutions': {
        categoryLabel: "Enterprise Solutions",
        title: "Data Engineering",
        titleHighlight: "Solutions",
        description: "Architect stable, automated, and tested cloud data pipelines that power modern business analysis.",
        overviewTitle: "Build a Resilient, Automated Foundation for Your Data",
        overviewP1: "Many business intelligence projects fail not because of poor reporting, but because the underlying data pipelines are unstable, untested, or manual. When API structures modify, dashboard elements break, eroding trust and stalling critical executive decisions.",
        overviewP2: "HyperCode's Data Engineering solutions ensure your data pipelines are treated with software engineering rigor. We write clean, modular ETL/ELT pipelines using tools like dbt and Airflow, enforce unit tests on database columns, and automate alerting so errors are corrected before users notice.",
        keySolutionsLabel: "Key Solutions",
        benefitsTitle: "Measurable Engineering Benefits",
        techTitle: "Technologies & Tools",
        ctaTitle: "Ready to Optimize Your Data Engineering?",
        ctaDesc: "Schedule a consultation with our practice directors to align your ETL pipelines, dbt setups, or stream processing.",
        ctaBtn: "Schedule Consultation",
        benefits: [
          { title: 'Robust ETL/ELT Pipelines', desc: 'Build fault-tolerant data pipelines that extract, transform, and load data from dozens of endpoints into unified cloud systems.' },
          { title: 'Automated Data Modeling', desc: 'Standardize business logic and automate data testing using dbt, improving data accuracy and reducing analysis failures.' },
          { title: 'Real-Time Ingestion', desc: 'Deploy low-latency stream processing pipelines to capture telemetry logs, transaction queues, and clickstreams instantly.' },
          { title: 'Metadata & Schema Governance', desc: 'Configure schema migration tools and data quality checks to monitor format changes and prevent pipeline crashes.' },
        ],
        technologies: [
          { name: 'Apache Airflow', role: 'Workflow orchestration, task scheduling, and pipeline monitoring' },
          { name: 'dbt (Data Build Tool)', role: 'Data transformation, SQL modeling, and unit testing' },
          { name: 'Fivetran', role: 'Automated data ingestion connectors and SaaS sync' },
          { name: 'Prefect', role: 'Modern dataflow orchestration and real-time state alerts' },
        ]
      },
      'data-warehousing-services': {
        categoryLabel: "Enterprise Solutions",
        title: "Data Warehousing",
        titleHighlight: "Services",
        description: "Consolidate databases, reduce query latency, and optimize cloud storage costs with modern architecture.",
        overviewTitle: "Consolidate Your Data Silos into a High-Performance Warehouse",
        overviewP1: "When database tables are locked in separate business applications, running cross-department reports is slow and prone to errors. To make data-driven decisions at scale, modern organizations require a centralized, high-performance cloud data warehouse.",
        overviewP2: "At HyperCode, we specialize in cloud data warehouse migrations and performance optimization. We design data schemas, configure secure ETL workflows, and partition tables to ensure sub-second query speeds, even on billions of rows.",
        keySolutionsLabel: "Key Solutions",
        benefitsTitle: "Measurable Warehousing Benefits",
        techTitle: "Technologies & Tools",
        ctaTitle: "Ready to Optimize Your Data Warehouse?",
        ctaDesc: "Schedule a consultation with our practice directors to align your cloud database schemas, Snowflake migrations, or storage partitions.",
        ctaBtn: "Schedule Consultation",
        benefits: [
          { title: 'Cloud-Native Architecture', desc: 'Migrate legacy physical server clusters into high-performance, cost-efficient cloud databases like Snowflake and BigQuery.' },
          { title: 'Data Lakehouse Consolidation', desc: 'Store structured transaction records and unstructured log documents in a unified storage framework for easy querying.' },
          { title: 'Cost Control Optimization', desc: 'Fine-tune query parameters, index structures, and compute cluster schedules to reduce database overhead costs by up to 40%.' },
          { title: 'Enterprise Security & Audit', desc: 'Configure row-level security, column masking, and access logs to meet strict HIPAA, SOC 2, and public audit standards.' },
        ],
        technologies: [
          { name: 'Snowflake', role: 'Multi-cluster compute warehousing and secure data sharing' },
          { name: 'Google BigQuery', role: 'Serverless analytics warehousing with built-in ML queries' },
          { name: 'Amazon Redshift', role: 'High-performance AWS-integrated analytical databases' },
          { name: 'Azure Synapse', role: 'Integrated enterprise analytics and database pipelines' },
        ]
      },
      'it-staffing-solutions': {
        categoryLabel: "Talent Solutions",
        title: "IT & Non-IT Staffing",
        titleHighlight: "Solutions",
        description: "Source and place pre-screened, certified technology and business professionals to hit project timelines.",
        overviewTitle: "Deploy Highly-Qualified Technology & Business Talent in Days, Not Months",
        overviewP1: "In a competitive business landscape, finding qualified software developers, data modelers, systems architects, business analysts, project coordinators, and operational managers is slow and expensive. Hiring errors drag down project timelines and waste internal management bandwidth.",
        overviewP2: "HyperCode simplifies talent acquisition. We run rigorous screening filters, checking professional standards, background records, technical code quality, and operational expertise. Whether you require a single specialized developer to assist a short-term migration, or an entire project team to manage digital transformation, we deliver pre-vetted specialists quickly.",
        keySolutionsLabel: "Key Solutions",
        benefitsTitle: "Measurable Staffing Benefits",
        techTitle: "Technologies & Tools",
        ctaTitle: "Ready to Optimize Your IT & Non-IT Staffing?",
        ctaDesc: "Schedule a consultation with our recruitment practice directors to align your contract or permanent technical and business staffing needs.",
        ctaBtn: "Schedule Consultation",
        benefits: [
          { title: 'Vetted IT & Non-IT Talent', desc: 'Access pre-screened developers, cloud engineers, operations managers, and business specialists with validated credentials.' },
          { title: 'Flexible Contract Placements', desc: 'Quickly resource temporary business or engineering tasks with professionals contracted for 3 to 12 months.' },
          { title: 'Direct Placement Vetting', desc: 'Source key permanent managers, directors, and specialists, leveraging our database of over 12,000 candidates.' },
          { title: 'VMS & ATS Compliance', desc: 'Integrate seamlessly with your internal Vendor Management Systems (VMS) and Applicant Tracking Systems (ATS) for easy billing.' },
        ],
        technologies: [
          { name: 'ATS Integrations', role: 'Sourcing compliance via Bullhorn & JobDiva' },
          { name: 'VMS Coordination', role: 'Enterprise workforce tracking via SAP Fieldglass & Beeline' },
          { name: 'HRIS Alignment', role: 'Onboarding coordination via Workday & iCIMS' },
          { name: 'Vetting Engine', role: 'Internal code evaluation & technical screens' },
        ]
      },
      'staff-augmentation-services': {
        categoryLabel: "Talent Solutions",
        title: "Staff Augmentation",
        titleHighlight: "Services",
        description: "Extend your existing engineering, analytics, and project teams with specialized technical experts.",
        overviewTitle: "Reinforce Your Technology Pipeline with Certified Experts",
        overviewP1: "When project milestones approach, waiting months to hire permanent team members can result in delayed deliveries or cancelled software migrations. Team leader capacity is stretched, and active development pipelines grind to a halt.",
        overviewP2: "HyperCode's Staff Augmentation services resolve this block. We supplement your active engineering teams with experienced data developers, analyst specialists, and project coordinators. Our consultants integrate into your existing workflows, matching your tooling, environments, and coding methodologies.",
        keySolutionsLabel: "Key Solutions",
        benefitsTitle: "Measurable Augmentation Benefits",
        techTitle: "Technologies & Tools",
        ctaTitle: "Ready to Optimize Your Staff Augmentation?",
        ctaDesc: "Schedule a consultation with our staffing directors to scale your software, cloud data, or project management capacity.",
        ctaBtn: "Schedule Consultation",
        benefits: [
          { title: 'Seamless Team Integration', desc: 'Our augmented developers join your active Slack channels, participate in daily standups, and write code directly in your repositories.' },
          { title: 'Rapid Scaling Velocity', desc: 'Inject certified Snowflake, Databricks, or cloud engineers into your team within 10 to 14 business days, bypassing slow recruiting loops.' },
          { title: 'No Long-Term Overhead', desc: 'Scale your workforce up during major migration cycles, and scale back down when projects transition to maintenance.' },
          { title: 'Direct Talent Retention', desc: 'Ensure project consistency with dedicated developers assigned to your account for the entire contract duration.' },
        ],
        technologies: [
          { name: 'Sprint Integration', role: 'Align with Jira, GitHub, and Scrum methodology' },
          { name: 'Onboarding Coordination', role: 'Fast setup of secure VPNs, keys, and environments' },
          { name: 'Code Quality Checks', role: 'Strict internal review before deployment to your staging' },
          { name: 'Talent Pool Sourcing', role: 'Access to 12,000+ pre-vetted US-based professionals' },
        ]
      },
      'web-development-services': {
        categoryLabel: "Digital Solutions",
        title: "Web Development",
        titleHighlight: "Services",
        description: "Designing and developing modern, scalable, secure, and high-performance web applications that drive growth.",
        overviewTitle: "Build Future-Proof Digital Platforms",
        overviewP1: "In a digital-first economy, your web presence is the center of your operations. Static, legacy architectures create performance bottlenecks, security vulnerabilities, and scaling challenges. HyperCode's web development practice builds modern, custom web applications that scale seamlessly.",
        overviewP2: "Our software engineering teams build on top of React, Next.js, and TypeScript to deliver responsive corporate websites, high-speed SaaS platforms, client portals, and custom dashboard interfaces. We combine solid frontend patterns with secure API integrations and reliable cloud hosting on AWS and Azure.",
        keySolutionsLabel: "Core Capabilities",
        benefitsTitle: "Web Engineering Differentiators",
        techTitle: "Technologies & Tools",
        ctaTitle: "Ready to Optimize Your Web Development?",
        ctaDesc: "Schedule a consultation with our solutions directors to align your React applications, cloud platforms, or API integration pipelines.",
        ctaBtn: "Schedule Consultation",
        benefits: [
          { title: 'Modern Front-End Architectures', desc: 'Deliver blazing-fast user interfaces using React, Next.js, and TypeScript, optimized for Core Web Vitals.' },
          { title: 'Scalable Full-Stack Engineering', desc: 'Build secure, robust backend systems with Node.js, .NET, or Python, backed by relational and cloud databases.' },
          { title: 'Secure API & ERP Integrations', desc: 'Seamlessly connect your custom web portal or SaaS platform to internal databases, CRM systems, and enterprise ERPs.' },
          { title: 'Responsive Cross-Device Layouts', desc: 'Ensure consistency across desktops, tablets, and mobile devices using modern Tailwind CSS frameworks.' },
        ],
        technologies: [
          { name: 'React / Next.js', role: 'Component architectures & SSR speed' },
          { name: 'TypeScript', role: 'Type-safe, robust code execution' },
          { name: 'Node.js / .NET', role: 'Enterprise scalability & API structures' },
          { name: 'AWS / Azure', role: 'Secure, high-availability cloud hosting' },
        ]
      }
    }
  };

  // Populate Spanish
  localTrans.es = {
    'business-intelligence-consulting': {
      categoryLabel: "Soluciones Empresariales",
      title: "Inteligencia de",
      titleHighlight: "Negocios",
      description: "Transforme registros de transacciones sin procesar y registros de bases de datos en paneles ejecutivos interactivos y automatizados.",
      overviewTitle: "Empodere a sus Tomadores de Decisiones con Datos",
      overviewP1: "En las organizaciones empresariales modernas, las decisiones deben estar respaldadas por datos precisos y recientes. Las hojas de cálculo heredadas y las consultas fragmentadas generan latencia operativa y problemas de auditoría. Los servicios de consultoría de inteligencia de negocios de HyperCode cierran la brecha entre las bases de datos complejas y la ejecución estratégica.",
      overviewP2: "Nuestros consultores de BI certificados diseñan e implementan paneles personalizados de Power BI, Tableau y Looker. Implementamos modelos semánticos robustos, estructuras de bases de datos limpias y configuramos métodos seguros de distribución de informes para que sus equipos accedan a la información de forma segura desde cualquier dispositivo.",
      keySolutionsLabel: "Soluciones Clave",
      benefitsTitle: "Beneficios de BI Medibles",
      techTitle: "Tecnologías y Herramientas",
      ctaTitle: "¿Listo para Optimizar su Inteligencia de Negocios?",
      ctaDesc: "Programe una consulta con nuestros directores de práctica para alinear sus análisis de datos, paneles o flujos de trabajo de informes.",
      ctaBtn: "Programar Consulta",
      benefits: [
        { title: 'Sistemas de Informes Ejecutivos', desc: 'Entregue paneles automatizados de alto nivel con KPI adaptados a la alta dirección y partes interesadas clave.' },
        { title: 'Análisis de Autoservicio', desc: 'Empodere a los equipos operativos para crear consultas e informes personalizados sin depender del soporte de ingeniería central.' },
        { title: 'Conocimientos en Tiempo Real', desc: 'Reduzca la latencia mediante la transmisión de datos operativos y de transacciones directamente a paneles de telemetría visual activos.' },
        { title: 'Armonización de Datos', desc: 'Limpie, filtre y formatee bases de datos fragmentadas para garantizar una única fuente de verdad en todas las operaciones.' },
      ],
      technologies: [
        { name: 'Power BI', role: 'Informes empresariales e integración con Microsoft' },
        { name: 'Tableau', role: 'Análisis visual avanzado y mapas interactivos' },
        { name: 'Looker', role: 'Análisis web moderno e integraciones personalizadas' },
        { name: 'Qlik', role: 'Descubrimiento de datos y análisis de motores asociativos' },
      ]
    },
    'data-analytics-services': {
      categoryLabel: "Soluciones Empresariales",
      title: "Análisis de Datos",
      titleHighlight: "Empresarial",
      description: "Desbloquee ventajas estratégicas con modelos predictivos, pronósticos estadísticos e integración de aprendizaje automático.",
      overviewTitle: "Impulse el Crecimiento con Ciencia Predictiva Avanzada",
      overviewP1: "Los modelos de informes tradicionales miran hacia atrás, diciéndole lo que sucedió en el pasado. Las empresas modernas, sin embargo, requieren análisis predictivos para anticipar las preferencias de los usuarios, ajustar las estrategias operativas y evitar la pérdida de clientes antes de que afecte los ingresos.",
      overviewP2: "En HyperCode, nuestros equipos de ciencia de datos le ayudan a implementar capacidades analíticas avanzadas. Limpiamos conjuntos de datos complejos, desarrollamos modelos predictivos personalizados en Python y R, y creamos bucles analíticos que se integran directamente en sus aplicaciones comerciales principales.",
      keySolutionsLabel: "Soluciones Clave",
      benefitsTitle: "Impacto Analítico Medible",
      techTitle: "Tecnologías y Herramientas",
      ctaTitle: "¿Listo para Optimizar sus Análisis de Datos?",
      ctaDesc: "Programe una consulta con nuestros directores de práctica para alinear su aprendizaje automático, investigación estadística o análisis de bases de datos.",
      ctaBtn: "Programar Consulta",
      benefits: [
        { title: 'Modelado Predictivo', desc: 'Construya modelos estadísticos y de aprendizaje automático personalizados para pronosticar la demanda de clientes, volúmenes de ventas y tendencias.' },
        { title: 'Seguimiento del Comportamiento del Cliente', desc: 'Mapee los recorridos de los usuarios, calcule el valor de vida del cliente (CLV) y cree estrategias de retención respaldadas por estadísticas cuantitativas.' },
        { title: 'Optimización Operativa', desc: 'Identifique ineficiencias en bases de datos, cuellos de botella de recursos y retrasos en la cadena de suministro mediante paneles de ciencia de datos estructurados.' },
        { title: 'Aprendizaje Automático Avanzado', desc: 'Integre canalizaciones de inteligencia artificial para automatizar las tareas de categorización, detección de anomalías y clasificación.' },
      ],
      technologies: [
        { name: 'Python', role: 'Aprendizaje automático, algoritmos predictivos y análisis estadístico' },
        { name: 'R', role: 'Estadísticas académicas avanzadas e investigación profunda de bases de datos' },
        { name: 'SQL', role: 'Consultas complejas, manipulación de conjuntos de datos y configuraciones de preparación' },
        { name: 'Apache Spark', role: 'Procesamiento de cómputo distribuido para conjuntos de datos de gran volumen' },
      ]
    },
    'data-engineering-solutions': {
      categoryLabel: "Soluciones Empresariales",
      title: "Ingeniería de",
      titleHighlight: "Datos",
      description: "Arquitecte canalizaciones de datos en la nube estables, automatizadas y probadas que impulsen el análisis empresarial moderno.",
      overviewTitle: "Construya una Base Resiliente y Automatizada para sus Datos",
      overviewP1: "Muchos proyectos de inteligencia de negocios fallan no por informes deficientes, sino porque las canalizaciones de datos subyacentes son inestables, no probadas o manuales. Cuando las estructuras de las API cambian, los elementos del panel se rompen, erosionando la confianza.",
      overviewP2: "Las soluciones de ingeniería de datos de HyperCode garantizan que sus canalizaciones se traten con rigor de ingeniería de software. Escribimos canalizaciones ETL/ELT limpias y modulares usando dbt y Airflow, aplicamos pruebas unitarias y automatizamos alertas.",
      keySolutionsLabel: "Soluciones Clave",
      benefitsTitle: "Beneficios de Ingeniería Medibles",
      techTitle: "Tecnologías y Herramientas",
      ctaTitle: "¿Listo para Optimizar su Ingeniería de Datos?",
      ctaDesc: "Programe una consulta con nuestros directores de práctica para alinear sus canalizaciones ETL, configuraciones dbt o procesamiento de flujos.",
      ctaBtn: "Programar Consulta",
      benefits: [
        { title: 'Canalizaciones ETL/ELT Robustas', desc: 'Construya canalizaciones de datos tolerantes a fallas que extraigan, transformen y carguen datos de docenas de puntos finales en sistemas unificados.' },
        { title: 'Modelado Automatizado de Datos', desc: 'Estandarice la lógica de negocios y automatice las pruebas de datos con dbt, mejorando la precisión y reduciendo las fallas de análisis.' },
        { title: 'Ingesta en Tiempo Real', desc: 'Implemente canalizaciones de procesamiento de flujos de baja latencia para capturar registros de telemetría, colas de transacciones e clics al instante.' },
        { title: 'Gobernanza de Metadatos y Esquemas', desc: 'Configure herramientas de migración de esquemas y controles de calidad de datos para monitorear cambios de formato y evitar fallas.' },
      ],
      technologies: [
        { name: 'Apache Airflow', role: 'Orquestación de flujos de trabajo, programación de tareas y monitoreo de canalizaciones' },
        { name: 'dbt (Data Build Tool)', role: 'Transformación de datos, modelado SQL y pruebas unitarias' },
        { name: 'Fivetran', role: 'Conectores de ingesta de datos automatizados y sincronización SaaS' },
        { name: 'Prefect', role: 'Orquestación moderna de flujos de datos y alertas de estado en tiempo real' },
      ]
    },
    'data-warehousing-services': {
      categoryLabel: "Soluciones Empresariales",
      title: "Almacenamiento de",
      titleHighlight: "Datos",
      description: "Consolide bases de datos, reduzca la latencia de las consultas y optimice los costos de almacenamiento con arquitectura moderna.",
      overviewTitle: "Consolide sus Silos de Datos en un Almacén de Alto Rendimiento",
      overviewP1: "Cuando las tablas de bases de datos están bloqueadas en aplicaciones comerciales separadas, ejecutar informes interdepartamentales es lento y propenso a errores. Para tomar decisiones a escala, se requiere un almacén centralizado.",
      overviewP2: "En HyperCode, nos especializamos en migraciones y optimización de rendimiento de almacenes de datos. Diseñamos esquemas, configuramos flujos ETL seguros y particionamos tablas para garantizar velocidades de consulta de subsegundos.",
      keySolutionsLabel: "Soluciones Clave",
      benefitsTitle: "Beneficios de Almacenamiento Medibles",
      techTitle: "Tecnologías y Herramientas",
      ctaTitle: "¿Listo para Optimizar su Almacén de Datos?",
      ctaDesc: "Programe una consulta con nuestros directores de práctica para alinear sus esquemas, migraciones a Snowflake o particiones de almacenamiento.",
      ctaBtn: "Programar Consulta",
      benefits: [
        { title: 'Arquitectura Nativa de la Nube', desc: 'Migre clústeres de servidores físicos heredados a bases de datos en la nube de alto rendimiento y rentables como Snowflake y BigQuery.' },
        { title: 'Consolidación de Lagos de Datos', desc: 'Almacene registros de transacciones estructurados y registros no estructurados en un marco unificado para consultas sencillas.' },
        { title: 'Optimización de Control de Costos', desc: 'Ajuste los parámetros de consulta, las estructuras de índice y los horarios para reducir los costos de base de datos hasta en un 40%.' },
        { title: 'Seguridad y Auditoría Empresarial', desc: 'Configure seguridad a nivel de fila, enmascaramiento de columnas y registros de acceso para cumplir con las estrictas normas HIPAA y SOC 2.' },
      ],
      technologies: [
        { name: 'Snowflake', role: 'Almacenamiento de cómputo multi-clúster y uso compartido seguro de datos' },
        { name: 'Google BigQuery', role: 'Almacenamiento analítico sin servidor con consultas de ML integradas' },
        { name: 'Amazon Redshift', role: 'Bases de datos analíticas integradas con AWS de alto rendimiento' },
        { name: 'Azure Synapse', role: 'Análisis empresarial integrado y canalizaciones de bases de datos' },
      ]
    },
    'it-staffing-solutions': {
      categoryLabel: "Soluciones de Talento",
      title: "Contratación de",
      titleHighlight: "Personal de TI y No TI",
      description: "Busque y coloque expertos de TI y no TI preseleccionados y certificados en datos, software y gestión para cumplir con los plazos.",
      overviewTitle: "Despliegue Talento de TI y No TI Altamente Calificado en Días, No Meses",
      overviewP1: "En un panorama empresarial altamente competitivo, encontrar desarrolladores de software, especialistas de TI y profesionales de no TI calificados es lento y costoso. Los errores de contratación retrasan los plazos del proyecto y desperdician ancho de banda.",
      overviewP2: "HyperCode simplifica la contratación de personal de TI y no TI. Realizamos filtros de detección rigurosos, verificando las capacidades técnicas, de gestión y los antecedentes de los candidatos. Entregamos especialistas preseleccionados rápidamente.",
      keySolutionsLabel: "Soluciones Clave",
      benefitsTitle: "Beneficios de Personal Medibles",
      techTitle: "Tecnologías y Herramientas",
      ctaTitle: "¿Listo para Optimizar su Personal de TI y No TI?",
      ctaDesc: "Programe una consulta con nuestros directores de reclutamiento para alinear sus necesidades de personal de TI y no TI temporal o permanente.",
      ctaBtn: "Programar Consulta",
      benefits: [
        { title: 'Talento de TI y No TI Evaluado', desc: 'Acceda a profesionales de TI y no TI preseleccionados con credenciales validadas y experiencia comprobada.' },
        { title: 'Colocaciones de Contrato Flexibles', desc: 'Resuelva rápidamente tareas de TI y de negocio temporales con profesionales contratados de 3 a 12 meses.' },
        { title: 'Evaluación de Colocación Directa', desc: 'Busque gerentes, directores y profesionales permanentes clave, aprovechando nuestra base de datos de más de 12,000 especialistas.' },
        { title: 'Cumplimiento de VMS y ATS', desc: 'Intégrese sin problemas con sus sistemas internos de gestión de proveedores (VMS) y sistemas de seguimiento de candidatos (ATS) para facturación.' },
      ],
      technologies: [
        { name: 'Integraciones ATS', role: 'Cumplimiento de abastecimiento a través de Bullhorn y JobDiva' },
        { name: 'Coordinación VMS', role: 'Seguimiento de personal a través de SAP Fieldglass y Beeline' },
        { name: 'Alineación de HRIS', role: 'Coordinación de incorporación a través de Workday e iCIMS' },
        { name: 'Motor de Evaluación', role: 'Evaluación interna de código y filtros técnicos de detección' },
      ]
    },
    'staff-augmentation-services': {
      categoryLabel: "Soluciones de Talento",
      title: "Aumento de",
      titleHighlight: "Personal",
      description: "Extienda sus equipos de ingeniería, análisis y proyectos existentes con expertos técnicos especializados.",
      overviewTitle: "Refuerce su Canalización Tecnológica con Expertos Certificados",
      overviewP1: "Cuando se acercan los hitos del proyecto, esperar meses para contratar miembros permanentes puede retrasar las entregas. La capacidad del líder del equipo se agota y las canalizaciones de desarrollo activas se detienen.",
      overviewP2: "El aumento de personal de HyperCode resuelve este bloqueo. Complementamos sus equipos con desarrolladores de datos experimentados, especialistas analíticos y coordinadores de proyectos que se integran en sus flujos de trabajo.",
      keySolutionsLabel: "Soluciones Clave",
      benefitsTitle: "Beneficios de Aumento Medibles",
      techTitle: "Tecnologías y Herramientas",
      ctaTitle: "¿Listo para Optimizar su Aumento de Personal?",
      ctaDesc: "Programe una consulta con nuestros directores para escalar su capacidad de software, datos en la nube o gestión de proyectos.",
      ctaBtn: "Programar Consulta",
      benefits: [
        { title: 'Integración Fluida del Equipo', desc: 'Nuestros desarrolladores se unen a sus canales de Slack activos, participan en standups y escriben código directamente en sus repositorios.' },
        { title: 'Velocidad de Escalado Rápido', desc: 'Inyecte ingenieros certificados en Snowflake, Databricks o la nube en su equipo dentro de 10 a 14 días hábiles, evitando bucles de reclutamiento lentos.' },
        { title: 'Sin Gastos Generales a Largo Plazo', desc: 'Escale su fuerza laboral durante los ciclos de migración importantes y vuelva a reducirla cuando los proyectos pasen al mantenimiento.' },
        { title: 'Retención Directa de Talento', desc: 'Garantice la coherencia del proyecto con desarrolladores dedicados asignados a su cuenta durante toda la duración del contrato.' },
      ],
      technologies: [
        { name: 'Integración Sprint', role: 'Alineación con Jira, GitHub y metodología ágil Scrum' },
        { name: 'Coordinación de Incorporación', role: 'Configuración rápida de redes VPN seguras, claves y entornos de desarrollo' },
        { name: 'Controles de Calidad de Código', role: 'Revisión interna estricta antes del despliegue en su entorno de preparación' },
        { name: 'Búsqueda en Grupo de Talentos', role: 'Acceso a más de 12,000 profesionales calificados basados en los EE. UU.' },
      ]
    },
    'web-development-services': {
      categoryLabel: "Soluciones Digitales",
      title: "Desarrollo",
      titleHighlight: "Web",
      description: "Diseño y desarrollo de aplicaciones web modernas, escalables, seguras y de alto rendimiento que impulsan el crecimiento.",
      overviewTitle: "Construya Plataformas Digitales Preparadas para el Futuro",
      overviewP1: "En una economía digital, su presencia web es el centro de sus operaciones. Las arquitecturas estáticas y heredadas crean cuellos de botella de rendimiento, vulnerabilidades de seguridad y desafíos de escalabilidad.",
      overviewP2: "Nuestros equipos de ingeniería de software construyen sobre React, Next.js y TypeScript para ofrecer sitios corporativos receptivos, plataformas SaaS de alta velocidad, portales de clientes e interfaces de paneles personalizados.",
      keySolutionsLabel: "Capacidades Principales",
      benefitsTitle: "Diferenciadores de Ingeniería Web",
      techTitle: "Tecnologías y Herramientas",
      ctaTitle: "¿Listo para Optimizar su Desarrollo Web?",
      ctaDesc: "Programe una consulta con nuestros directores de soluciones para alinear sus aplicaciones React, plataformas en la nube o integraciones de API.",
      ctaBtn: "Programar Consulta",
      benefits: [
        { title: 'Arquitecturas Front-End Modernas', desc: 'Entregue interfaces de usuario ultrarrápidas con React, Next.js y TypeScript, optimizadas para Core Web Vitals.' },
        { title: 'Ingeniería Full-Stack Escalable', desc: 'Construya sistemas backend seguros con Node.js, .NET o Python, respaldados por bases de datos relacionales y en la nube.' },
        { title: 'Integraciones Seguras de API y ERP', desc: 'Conecte sin problemas su portal web o plataforma SaaS a bases de datos internas, sistemas CRM y ERP corporativos.' },
        { title: 'Diseños Responsivos Multidispositivo', desc: 'Garantice la coherencia en computadoras de escritorio, tabletas y dispositivos móviles utilizando marcos modernos de Tailwind CSS.' },
      ],
      technologies: [
        { name: 'React / Next.js', role: 'Arquitecturas de componentes y velocidad de SSR' },
        { name: 'TypeScript', role: 'Ejecución de código robusta y tipada segura' },
        { name: 'Node.js / .NET', role: 'Escalabilidad empresarial y estructuras de API' },
        { name: 'AWS / Azure', role: 'Alojamiento en la nube seguro y de alta disponibilidad' },
      ]
    }
  };

  const activeTrans = (localTrans[locale] && localTrans[locale][pageKey]) || localTrans.en[pageKey] || localTrans.en['business-intelligence-consulting'];

  return (
    <main className="relative w-full bg-[#fcfdfe] dark:bg-[#07090e] text-left bg-dot-pattern">
      <Navigation />

      {/* Solutions Reusable Hero Banner */}
      <HeroBanner
        bgImage={HERO_IMAGES[pageKey] || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600'}
        categoryLabel={activeTrans.categoryLabel}
        title={activeTrans.title}
        titleHighlight={activeTrans.titleHighlight}
        subtitle={activeTrans.description}
        breadcrumbs={[
          { label: locale === 'es' ? 'Inicio' : 'Home', href: `/${locale}` },
          { label: locale === 'es' ? 'Soluciones' : 'Solutions', href: `/${locale}/solutions` },
          { label: activeTrans.title }
        ]}
      />

      {/* Overview Section (Alternating Left) */}
      <section className="py-24 bg-white dark:bg-[#07090e] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text left */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {activeTrans.overviewTitle}
              </h2>
              <div className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed font-semibold space-y-4">
                <p>{activeTrans.overviewP1}</p>
                <p>{activeTrans.overviewP2}</p>
              </div>
            </div>
            {/* Image right */}
            <div className="lg:col-span-5 relative w-full h-[340px] rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-800 shadow-xl">
              <Image
                src={HERO_IMAGES[pageKey] || '/images/hero-enterprise.png'}
                alt={activeTrans.overviewTitle}
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section (Alternating Right) */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950/40 border-t border-b border-slate-100 dark:border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image left */}
            <div className="lg:col-span-5 relative w-full h-[400px] rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-800 shadow-xl order-last lg:order-first">
              <Image
                src={pageKey.includes('staffing') ? '/images/contact-office.png' : '/images/hero-enterprise.png'}
                alt={activeTrans.benefitsTitle}
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/20" />
            </div>

            {/* Text right */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <span className="text-[10px] font-extrabold text-[#0F4C81] dark:text-blue-400 tracking-widest uppercase">
                  {activeTrans.keySolutionsLabel}
                </span>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {activeTrans.benefitsTitle}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {activeTrans.benefits.map((benefit, i) => (
                  <div key={i} className="bg-white dark:bg-[#0b0f19] p-6 rounded-2xl border border-slate-200/50 dark:border-slate-850 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-[#0F4C81] dark:text-blue-400 flex-shrink-0">
                      <CheckCircle size={18} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">{benefit.title}</h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-450 leading-relaxed font-semibold">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-24 bg-white dark:bg-[#07090e] border-b border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-3">
            <span className="text-[10px] font-extrabold text-[#0F4C81] dark:text-blue-400 tracking-widest uppercase">
              {activeTrans.techTitle}
            </span>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{activeTrans.techTitle}</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeTrans.technologies.map((tech, i) => (
              <div key={i} className="p-6 rounded-2xl border border-slate-200/60 dark:border-slate-850 bg-white dark:bg-[#0b0f19] shadow-sm flex flex-col justify-between hover:border-[#0F4C81] dark:hover:border-blue-500 hover:shadow-md transition-all duration-300">
                <div className="space-y-2">
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-200">{tech.name}</h4>
                  <p className="text-[9px] text-slate-400 dark:text-slate-500 leading-relaxed font-extrabold uppercase tracking-widest">{tech.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none">{activeTrans.ctaTitle}</h3>
          <p className="text-base sm:text-lg text-slate-550 dark:text-slate-400 max-w-xl mx-auto font-semibold">
            {activeTrans.ctaDesc}
          </p>
          <div>
            <Link
              href={`/${locale}/consultation`}
              className="inline-flex items-center justify-center h-12 px-8 bg-[#0F4C81] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#0c3c66] transition-colors duration-200 shadow-sm"
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
