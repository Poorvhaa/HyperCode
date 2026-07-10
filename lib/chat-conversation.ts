import type {
  ChatbotState,
  ConsultantResponse,
  ServiceIntent,
  ConversationStage,
  LeadData,
  ProjectData
} from '@/lib/chat-types';

import { validateChatAnswer } from '@/lib/chat-validation';

interface FlowQuestion {
  id: string;
  text: { en: string; es: string };
  prompts?: { en: string[]; es: string[] };
  field: {
    target: 'projectData' | 'leadData';
    key: keyof ProjectData | keyof LeadData;
  };
  stage: ConversationStage;
}

const SERVICES_CONFIG: Record<
  Exclude<ServiceIntent, 'DEFAULT'>,
  {
    explanation: { en: string; es: string };
    questions: FlowQuestion[];
    defaultRecommendations: {
      techStack: string[];
      architecture: string;
      timelineEstimate: string;
      teamSizeEstimate: string;
      potentialRisks: string[];
      nextSteps: string;
    };
  }
> = {
  'Web Development': {
    explanation: {
      en: 'HyperCode builds secure, scalable, and high-performance digital platforms, including corporate websites, web applications, e-commerce platforms, customer portals, and SaaS products.',
      es: 'HyperCode crea plataformas digitales seguras, escalables y de alto rendimiento, incluyendo sitios web corporativos, aplicaciones web, plataformas de comercio electrónico, portales de clientes y productos SaaS.'
    },
    questions: [
      {
        id: 'web_project_type',
        text: { en: 'What type of website are you planning?', es: '¿Qué tipo de sitio web está planificando?' },
        prompts: {
          en: ['Corporate Website', 'Web Application', 'E-commerce', 'Customer Portal', 'SaaS Platform', 'Not Sure'],
          es: ['Sitio Corporativo', 'Aplicación Web', 'Comercio Electrónico', 'Portal de Clientes', 'Plataforma SaaS', 'No Estoy Seguro']
        },
        field: { target: 'projectData', key: 'projectType' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'web_project_status',
        text: {
          en: 'Is this a completely new website, a redesign, or an upgrade to an existing platform?',
          es: '¿Es este un sitio web completamente nuevo, un rediseño o una actualización de una plataforma existente?'
        },
        prompts: {
          en: ['New Website', 'Website Redesign', 'Existing Platform Upgrade'],
          es: ['Sitio Nuevo', 'Rediseño de Sitio', 'Actualización de Plataforma Existente']
        },
        field: { target: 'projectData', key: 'projectStatus' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'web_required_features',
        text: {
          en: 'What are the main features you need? For example: customer login, payments, booking, CMS, dashboards, or third-party integrations.',
          es: '¿Cuáles son las características principales que necesita? Por ejemplo: inicio de sesión de clientes, pagos, reservas, CMS, tableros o integraciones de terceros.'
        },
        prompts: {
          en: ['Customer Login', 'Online Payments', 'Booking System', 'CMS', 'Dashboard', 'Third-Party Integrations', 'Not Sure Yet'],
          es: ['Inicio de Sesión', 'Pagos en Línea', 'Sistema de Reservas', 'CMS', 'Tablero de Control', 'Integraciones', 'No Estoy Seguro']
        },
        field: { target: 'projectData', key: 'requiredFeatures' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'web_timeline',
        text: { en: 'When should it launch?', es: '¿Cuándo debería lanzarse?' },
        prompts: {
          en: ['Within 1 Month', '1–3 Months', '3–6 Months', 'Flexible'],
          es: ['En menos de 1 mes', '1–3 meses', '3–6 meses', 'Flexible']
        },
        field: { target: 'projectData', key: 'timeline' },
        stage: 'Project Qualification'
      },
      {
        id: 'web_budget',
        text: { en: 'What is the budget range allocated?', es: '¿Qué rango de presupuesto se ha asignado?' },
        prompts: {
          en: ['Under $10K', '$10K–$25K', '$25K–$50K', '$50K+', 'Not Decided'],
          es: ['Menos de $10K', '$10K–$25K', '$25K–$50K', '$50K+', 'No Decidido']
        },
        field: { target: 'projectData', key: 'budgetRange' },
        stage: 'Project Qualification'
      }
    ],
    defaultRecommendations: {
      techStack: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Supabase', 'Vercel'],
      architecture: 'Serverless App Router architecture hosted on Vercel Edge Network, utilizing Supabase (PostgreSQL) for auth & data.',
      timelineEstimate: '4–8 Weeks',
      teamSizeEstimate: '1 UI/UX Designer, 1 Tech Lead, 1 Frontend Developer',
      potentialRisks: ['SEO indexing configuration errors', 'Cold start handling for API routing'],
      nextSteps: 'Schedule a tailored scoping workshop with a HyperCode engineering lead.'
    }
  },
  'AI & Automation': {
    explanation: {
      en: 'HyperCode builds enterprise AI assistants, workflow automation, intelligent document processing, RAG systems, data extraction solutions, and internal knowledge assistants.',
      es: 'HyperCode crea asistentes de IA empresariales, automatización de flujos de trabajo, procesamiento inteligente de documentos, sistemas RAG, soluciones de extracción de datos y asistentes de conocimiento interno.'
    },
    questions: [
      {
        id: 'ai_process_to_automate',
        text: { en: 'What process should be automated?', es: '¿Qué proceso de negocio debería automatizarse?' },
        prompts: {
          en: ['Customer Support', 'Data Extraction', 'Document Processing', 'Internal Knowledge Search', 'Workflow Automation', 'Not Sure'],
          es: ['Soporte al Cliente', 'Extracción de Datos', 'Procesamiento de Documentos', 'Búsqueda de Conocimiento', 'Automatización de Flujo', 'No Estoy Seguro']
        },
        field: { target: 'projectData', key: 'projectType' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'ai_customer_facing',
        text: { en: 'Is it customer-facing or internal?', es: '¿La automatización estará de cara al cliente o será interna?' },
        prompts: {
          en: ['Customer-Facing', 'Internal', 'Both', 'Not Sure'],
          es: ['De Cara al Cliente', 'Interna', 'Ambas', 'No Estoy Seguro']
        },
        field: { target: 'projectData', key: 'projectStatus' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'ai_data_sources',
        text: { en: 'What data sources will be used?', es: '¿Qué fuentes de datos se utilizarán?' },
        prompts: {
          en: ['SQL Databases', 'APIs', 'PDF / Documents', 'Spreadsheets', 'Not Sure'],
          es: ['Bases de Datos SQL', 'APIs', 'PDF / Documentos', 'Planillas de Cálculo', 'No Estoy Seguro']
        },
        field: { target: 'projectData', key: 'currentTechnology' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'ai_compliance_requirements',
        text: { en: 'Are there privacy, security, or compliance requirements?', es: '¿Existen requisitos de privacidad, seguridad o cumplimiento?' },
        prompts: {
          en: ['Yes', 'No', 'Not Sure'],
          es: ['Sí', 'No', 'No Estoy Seguro']
        },
        field: { target: 'projectData', key: 'projectDescription' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'ai_existing_systems',
        text: { en: 'Is there an existing system to integrate with?', es: '¿Existe algún sistema actual con el que se deba integrar?' },
        prompts: {
          en: ['Salesforce', 'HubSpot', 'Custom ERP', 'None', 'Not Sure'],
          es: ['Salesforce', 'HubSpot', 'ERP Personalizado', 'Ninguno', 'No Estoy Seguro']
        },
        field: { target: 'projectData', key: 'requiredFeatures' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'ai_timeline',
        text: { en: 'When should it launch?', es: '¿Cuándo debería lanzarse?' },
        prompts: {
          en: ['Within 1 Month', '1–3 Months', '3–6 Months', 'Flexible'],
          es: ['En menos de 1 mes', '1–3 meses', '3–6 meses', 'Flexible']
        },
        field: { target: 'projectData', key: 'timeline' },
        stage: 'Project Qualification'
      },
      {
        id: 'ai_budget',
        text: { en: 'What is the budget range?', es: '¿Qué rango de presupuesto se ha asignado?' },
        prompts: {
          en: ['Under $15K', '$15K–$30K', '$30K–$60K', '$60K+', 'Not Decided'],
          es: ['Menos de $15K', '$15K–$30K', '$30K–$60K', '$60K+', 'No Decidido']
        },
        field: { target: 'projectData', key: 'budgetRange' },
        stage: 'Project Qualification'
      }
    ],
    defaultRecommendations: {
      techStack: ['OpenAI API', 'LangChain / LlamaIndex', 'Pinecone / pgvector', 'Next.js', 'Python', 'FastAPI'],
      architecture: 'Retrieval-Augmented Generation (RAG) pipeline querying vector database storage for semantic context injection.',
      timelineEstimate: '6–10 Weeks',
      teamSizeEstimate: '1 AI Architect, 1 Full-Stack Developer, 1 QA Engineer',
      potentialRisks: ['Token cost limits', 'Response hallucination scoping'],
      nextSteps: 'Define vector embedding schemas in a technical workshop with our AI practice director.'
    }
  },
  'Cloud & DevOps': {
    explanation: {
      en: 'HyperCode provides elite cloud architecture, migration, cost optimization, CI/CD pipelines, and DevOps infrastructure orchestration.',
      es: 'HyperCode ofrece arquitectura de nube de élite, migración, optimización de costos, pipelines de CI/CD y orquestación de infraestructura DevOps.'
    },
    questions: [
      {
        id: 'cloud_service_type',
        text: { en: 'Cloud migration, optimization, DevOps, or new infrastructure?', es: '¿Migración a la nube, optimización, DevOps o una nueva infraestructura?' },
        prompts: {
          en: ['Cloud Migration', 'Cost Optimization', 'DevOps CI/CD', 'New Infrastructure'],
          es: ['Migración a la Nube', 'Optimización de Costos', 'DevOps CI/CD', 'Nueva Infraestructura']
        },
        field: { target: 'projectData', key: 'projectType' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'cloud_current_environment',
        text: { en: 'Current environment: On-premise, AWS, Azure, GCP, Hybrid', es: '¿Entorno actual: On-premise, AWS, Azure, GCP o híbrido?' },
        prompts: {
          en: ['On-Premise', 'AWS', 'Azure', 'GCP', 'Hybrid'],
          es: ['Local (On-Premise)', 'AWS', 'Azure', 'GCP', 'Híbrido']
        },
        field: { target: 'projectData', key: 'currentTechnology' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'cloud_main_challenge',
        text: { en: 'What is the main challenge?', es: '¿Cuál es el principal desafío?' },
        prompts: {
          en: ['Scaling Issues', 'High Cloud Costs', 'Slow Deployments', 'Downtime', 'Lack of Automation'],
          es: ['Problemas de Escalado', 'Altos Costos de Nube', 'Despliegues Lentos', 'Caídas de Servicio', 'Falta de Automatización']
        },
        field: { target: 'projectData', key: 'projectDescription' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'cloud_compliance_requirements',
        text: { en: 'Are there security/compliance requirements?', es: '¿Existen requisitos de seguridad o cumplimiento?' },
        prompts: {
          en: ['SOC 2', 'HIPAA', 'PCI-DSS', 'None', 'Not Sure'],
          es: ['SOC 2', 'HIPAA', 'PCI-DSS', 'Ninguno', 'No Estoy Seguro']
        },
        field: { target: 'projectData', key: 'requiredFeatures' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'cloud_timeline',
        text: { en: 'When should it launch?', es: '¿Cuándo debería lanzarse?' },
        prompts: {
          en: ['Within 1 Month', '1–3 Months', '3–6 Months', 'Flexible'],
          es: ['En menos de 1 mes', '1–3 meses', '3–6 meses', 'Flexible']
        },
        field: { target: 'projectData', key: 'timeline' },
        stage: 'Project Qualification'
      },
      {
        id: 'cloud_budget',
        text: { en: 'What is the budget range?', es: '¿Qué rango de presupuesto se ha asignado?' },
        prompts: {
          en: ['Under $20K', '$20K–$50K', '$50K–$100K', '$100K+', 'Not Decided'],
          es: ['Menos de $20K', '$20K–$50K', '$50K–$100K', '$100K+', 'No Decidido']
        },
        field: { target: 'projectData', key: 'budgetRange' },
        stage: 'Project Qualification'
      }
    ],
    defaultRecommendations: {
      techStack: ['AWS', 'Terraform', 'Docker', 'Kubernetes (EKS)', 'GitHub Actions'],
      architecture: 'Containerized workloads deployed on Amazon EKS with Infrastructure as Code (Terraform) and automated CI/CD.',
      timelineEstimate: '6–8 Weeks',
      teamSizeEstimate: '1 DevOps Architect, 2 Cloud Engineers',
      potentialRisks: ['Legacy migration downtime', 'Network security group configurations'],
      nextSteps: 'Conduct a secure cloud architectural audit of your current assets.'
    }
  },
  'Data Analytics': {
    explanation: {
      en: 'HyperCode designs unified data analytics solutions, predictive statistical modeling, data warehousing, and custom reporting pipelines.',
      es: 'HyperCode diseña soluciones unificadas de análisis de datos, modelos estadísticos predictivos, almacenamiento de datos y pipelines de informes personalizados.'
    },
    questions: [
      {
        id: 'data_business_objective',
        text: { en: 'Main business objective', es: 'Objetivo de negocio principal' },
        prompts: {
          en: ['Customer Insights', 'Operational Efficiency', 'Revenue Forecasting', 'Financial Analytics', 'Not Sure'],
          es: ['Conocimiento del Cliente', 'Eficiencia Operativa', 'Pronóstico de Ingresos', 'Análisis Financiero', 'No Estoy Seguro']
        },
        field: { target: 'projectData', key: 'primaryGoal' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'data_current_sources',
        text: { en: 'Current data sources', es: 'Fuentes de datos actuales' },
        prompts: {
          en: ['PostgreSQL / SQL Server', 'CRM (Salesforce/HubSpot)', 'Google Analytics', 'Multiple APIs', 'Spreadsheets'],
          es: ['PostgreSQL / SQL Server', 'CRM (Salesforce/HubSpot)', 'Google Analytics', 'Múltiples APIs', 'Planillas de Cálculo']
        },
        field: { target: 'projectData', key: 'currentTechnology' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'data_reporting_type',
        text: { en: 'Reporting, forecasting, customer analytics, operations, or financial analytics', es: 'Informes, pronósticos, analítica de clientes, operaciones o finanzas' },
        prompts: {
          en: ['Reporting / Dashboards', 'Forecasting / Predictive', 'Customer Analytics', 'Operational Analytics', 'Financial Analytics'],
          es: ['Informes / Tableros', 'Pronósticos / Predictivo', 'Análisis de Clientes', 'Análisis Operativo', 'Análisis Financiero']
        },
        field: { target: 'projectData', key: 'projectType' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'data_current_tools',
        text: { en: 'Current tools', es: 'Herramientas actuales' },
        prompts: {
          en: ['Excel / Spreadsheets', 'PostgreSQL / MySQL', 'Snowflake / BigQuery', 'None'],
          es: ['Excel / Planillas', 'PostgreSQL / MySQL', 'Snowflake / BigQuery', 'Ninguna']
        },
        field: { target: 'projectData', key: 'requiredFeatures' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'data_volume_complexity',
        text: { en: 'Data volume or complexity', es: 'Volumen o complejidad de los datos' },
        prompts: {
          en: ['Under 100 GB', '100 GB–1 TB', '1 TB–10 TB', '10 TB+', 'Not Sure'],
          es: ['Menos de 100 GB', '100 GB–1 TB', '1 TB–10 TB', '10 TB+', 'No Estoy Seguro']
        },
        field: { target: 'projectData', key: 'projectDescription' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'data_timeline',
        text: { en: 'When should it launch?', es: '¿Cuándo debería lanzarse?' },
        prompts: {
          en: ['Within 1 Month', '1–3 Months', '3–6 Months', 'Flexible'],
          es: ['En menos de 1 mes', '1–3 meses', '3–6 meses', 'Flexible']
        },
        field: { target: 'projectData', key: 'timeline' },
        stage: 'Project Qualification'
      },
      {
        id: 'data_budget',
        text: { en: 'What is the budget range?', es: '¿Qué rango de presupuesto se ha asignado?' },
        prompts: {
          en: ['Under $15K', '$15K–$30K', '$30K–$60K', '$60K+', 'Not Decided'],
          es: ['Menos de $15K', '$15K–$30K', '$30K–$60K', '$60K+', 'No Decidido']
        },
        field: { target: 'projectData', key: 'budgetRange' },
        stage: 'Project Qualification'
      }
    ],
    defaultRecommendations: {
      techStack: ['Python', 'Pandas', 'dbt', 'Snowflake', 'Fivetran', 'Apache Airflow'],
      architecture: 'Modern Data Stack (MDS) pipeline using ELT orchestration to consolidate source systems into a unified warehouse.',
      timelineEstimate: '8–12 Weeks',
      teamSizeEstimate: '1 Data Engineer, 1 Analytics Engineer, 1 BI Analyst',
      potentialRisks: ['Schema variance in third-party APIs', 'Incremental sync load times'],
      nextSteps: 'Map core transactional database schemas and target analytical data sinks.'
    }
  },
  'Business Intelligence': {
    explanation: {
      en: 'HyperCode develops real-time interactive business intelligence dashboards, KPI mapping, and robust ETL pipelines.',
      es: 'HyperCode desarrolla tableros de inteligencia de negocios interactivos en tiempo real, mapeo de KPIs y pipelines de ETL robustos.'
    },
    questions: [
      {
        id: 'bi_dashboard_goal',
        text: { en: 'Dashboard or reporting goal', es: 'Objetivo del tablero o reporte' },
        prompts: {
          en: ['Sales Performance', 'Financial KPI', 'Executive Overview', 'Operations Tracking', 'Customer Behavior'],
          es: ['Rendimiento de Ventas', 'KPI Financiero', 'Vista Ejecutiva', 'Seguimiento de Operaciones', 'Comportamiento del Cliente']
        },
        field: { target: 'projectData', key: 'primaryGoal' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'bi_source_systems',
        text: { en: 'Current source systems', es: 'Sistemas de origen actuales' },
        prompts: {
          en: ['Excel / Spreadsheets', 'ERP / CRM', 'SQL Database', 'SaaS Applications', 'Not Sure'],
          es: ['Excel / Planillas', 'ERP / CRM', 'Base de Datos SQL', 'Aplicaciones SaaS', 'No Estoy Seguro']
        },
        field: { target: 'projectData', key: 'currentTechnology' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'bi_preferred_tool',
        text: { en: 'Preferred BI tool', es: 'Herramienta de BI preferida' },
        prompts: {
          en: ['Power BI', 'Tableau', 'Looker Studio', 'Custom BI Panel', 'Not Decided'],
          es: ['Power BI', 'Tableau', 'Looker Studio', 'Panel BI Personalizado', 'No Decido']
        },
        field: { target: 'projectData', key: 'projectType' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'bi_num_users',
        text: { en: 'Number of users', es: 'Número de usuarios' },
        prompts: {
          en: ['Under 10 Users', '10–50 Users', '50–100 Users', '100+ Users'],
          es: ['Menos de 10 Usuarios', '10–50 Usuarios', '50–100 Usuarios', 'Más de 100']
        },
        field: { target: 'projectData', key: 'teamSize' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'bi_refresh_frequency',
        text: { en: 'Refresh frequency', es: 'Frecuencia de actualización' },
        prompts: {
          en: ['Real-Time', 'Hourly', 'Daily', 'Weekly'],
          es: ['Tiempo Real', 'Por Hora', 'Diario', 'Semanal']
        },
        field: { target: 'projectData', key: 'requiredFeatures' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'bi_timeline',
        text: { en: 'When should it launch?', es: '¿Cuándo debería lanzarse?' },
        prompts: {
          en: ['Within 1 Month', '1–3 Months', '3–6 Months', 'Flexible'],
          es: ['En menos de 1 mes', '1–3 meses', '3–6 meses', 'Flexible']
        },
        field: { target: 'projectData', key: 'timeline' },
        stage: 'Project Qualification'
      },
      {
        id: 'bi_budget',
        text: { en: 'What is the budget range?', es: '¿Qué rango de presupuesto se ha asignado?' },
        prompts: {
          en: ['Under $10K', '$10K–$25K', '$25K–$50K', '$50K+', 'Not Decided'],
          es: ['Menos de $10K', '$10K–$25K', '$25K–$50K', '$50K+', 'No Decidido']
        },
        field: { target: 'projectData', key: 'budgetRange' },
        stage: 'Project Qualification'
      }
    ],
    defaultRecommendations: {
      techStack: ['Power BI', 'Tableau', 'Looker Studio', 'SQL', 'Azure Data Factory'],
      architecture: 'Automated ETL flow staging transactional database views into specialized star-schema analytical models.',
      timelineEstimate: '4–6 Weeks',
      teamSizeEstimate: '1 BI Solutions Architect, 1 Data Analyst',
      potentialRisks: ['User permissions and dashboard licensing', 'Data source extraction rate limits'],
      nextSteps: 'Identify the exact business metrics and KPIs to define mapping parameters.'
    }
  },
  'Mobile Development': {
    explanation: {
      en: 'HyperCode designs high-performance iOS, Android, and cross-platform React Native/Flutter mobile applications.',
      es: 'HyperCode diseña aplicaciones móviles de alto rendimiento para iOS, Android y multiplataforma con React Native/Flutter.'
    },
    questions: [
      {
        id: 'mobile_platform',
        text: { en: 'iOS, Android, or cross-platform', es: 'iOS, Android o multiplataforma' },
        prompts: {
          en: ['iOS', 'Android', 'Cross-Platform (Recommended)'],
          es: ['iOS', 'Android', 'Multiplataforma (Recomendado)']
        },
        field: { target: 'projectData', key: 'projectType' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'mobile_project_status',
        text: { en: 'New app or existing app upgrade', es: 'Aplicación nueva o actualización de aplicación existente' },
        prompts: {
          en: ['New App', 'Existing App Upgrade'],
          es: ['Aplicación Nueva', 'Actualización de Aplicación Existente']
        },
        field: { target: 'projectData', key: 'projectStatus' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'mobile_main_features',
        text: { en: 'Main features', es: 'Características principales' },
        prompts: {
          en: ['User Login & Profile', 'Social Feed', 'E-commerce / Cart', 'Real-Time Chat', 'Interactive Map'],
          es: ['Login & Perfil de Usuario', 'Feed Social', 'E-commerce / Carrito', 'Chat en Tiempo Real', 'Mapa Interactivo']
        },
        field: { target: 'projectData', key: 'requiredFeatures' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'mobile_specific_features',
        text: { en: 'Login, payments, notifications, location, or integrations', es: 'Login, pagos, notificaciones, ubicación o integraciones' },
        prompts: {
          en: ['Yes - Login & Payments', 'Yes - Notifications & GPS', 'Yes - All of the above', 'Not Sure Yet'],
          es: ['Sí - Login y Pagos', 'Sí - Notificaciones y GPS', 'Sí - Todo lo anterior', 'No Estoy Seguro']
        },
        field: { target: 'projectData', key: 'projectDescription' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'mobile_timeline',
        text: { en: 'When should it launch?', es: '¿Cuándo debería lanzarse?' },
        prompts: {
          en: ['Within 1 Month', '1–3 Months', '3–6 Months', 'Flexible'],
          es: ['En menos de 1 mes', '1–3 meses', '3–6 meses', 'Flexible']
        },
        field: { target: 'projectData', key: 'timeline' },
        stage: 'Project Qualification'
      },
      {
        id: 'mobile_budget',
        text: { en: 'What is the budget range?', es: '¿Qué rango de presupuesto se ha asignado?' },
        prompts: {
          en: ['Under $15K', '$15K–$30K', '$30K–$60K', '$60K+', 'Not Decided'],
          es: ['Menos de $15K', '$15K–$30K', '$30K–$60K', '$60K+', 'No Decidido']
        },
        field: { target: 'projectData', key: 'budgetRange' },
        stage: 'Project Qualification'
      }
    ],
    defaultRecommendations: {
      techStack: ['React Native', 'Expo', 'TypeScript', 'Node.js', 'PostgreSQL', 'App Store / Play Store'],
      architecture: 'Cross-platform native compilation connected to a centralized REST/GraphQL backend with secure JWT authentication.',
      timelineEstimate: '10–14 Weeks',
      teamSizeEstimate: '1 UI/UX Designer, 1 Mobile Developer, 1 Backend Engineer',
      potentialRisks: ['App Store guidelines review delay', 'Offline data syncing consistency'],
      nextSteps: 'Create interactive Figma layout prototypes to define screens and flows.'
    }
  },
  'Software Development': {
    explanation: {
      en: 'HyperCode builds bespoke enterprise software, custom CRM/ERP platforms, and high-performance business applications.',
      es: 'HyperCode crea software empresarial a medida, plataformas CRM/ERP personalizadas y aplicaciones de negocio de alto rendimiento.'
    },
    questions: [
      {
        id: 'software_type',
        text: { en: 'Type of software', es: 'Tipo de software' },
        prompts: {
          en: ['Custom CRM', 'ERP System', 'Client Portal', 'SaaS Platform', 'Inventory Management'],
          es: ['CRM Personalizado', 'Sistema ERP', 'Portal de Clientes', 'Plataforma SaaS', 'Gestión de Inventario']
        },
        field: { target: 'projectData', key: 'projectType' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'software_project_status',
        text: { en: 'New development, modernization, or integration', es: 'Desarrollo nuevo, modernización o integración' },
        prompts: {
          en: ['New Development', 'Modernization', 'Integration'],
          es: ['Desarrollo Nuevo', 'Modernización', 'Integración']
        },
        field: { target: 'projectData', key: 'projectStatus' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'software_main_users',
        text: { en: 'Main users', es: 'Usuarios principales' },
        prompts: {
          en: ['Internal Employees', 'External Clients', 'Partners / Vendors', 'Both'],
          es: ['Empleados Internos', 'Clientes Externos', 'Socios / Proveedores', 'Ambos']
        },
        field: { target: 'projectData', key: 'primaryGoal' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'software_required_features',
        text: { en: 'Required features', es: 'Características requeridas' },
        prompts: {
          en: ['User Access Roles', 'Dashboard Reports', 'API Integrations', 'Payment Gateways', 'Document Management'],
          es: ['Roles de Acceso de Usuario', 'Informes de Tablero', 'Integración de APIs', 'Pasarelas de Pago', 'Gestión de Documentos']
        },
        field: { target: 'projectData', key: 'requiredFeatures' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'software_current_tech',
        text: { en: 'Current technology if applicable', es: 'Tecnología actual si aplica' },
        prompts: {
          en: ['PHP / MySQL', '.NET', 'Excel Sheets', 'None'],
          es: ['PHP / MySQL', '.NET', 'Planillas Excel', 'Ninguno']
        },
        field: { target: 'projectData', key: 'currentTechnology' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'software_timeline',
        text: { en: 'When should it launch?', es: '¿Cuándo debería lanzarse?' },
        prompts: {
          en: ['Within 1 Month', '1–3 Months', '3–6 Months', 'Flexible'],
          es: ['En menos de 1 mes', '1–3 meses', '3–6 meses', 'Flexible']
        },
        field: { target: 'projectData', key: 'timeline' },
        stage: 'Project Qualification'
      },
      {
        id: 'software_budget',
        text: { en: 'What is the budget range?', es: '¿Qué rango de presupuesto se ha asignado?' },
        prompts: {
          en: ['Under $20K', '$20K–$50K', '$50K–$100K', '$100K+', 'Not Decided'],
          es: ['Menos de $20K', '$20K–$50K', '$50K–$100K', '$100K+', 'No Decidido']
        },
        field: { target: 'projectData', key: 'budgetRange' },
        stage: 'Project Qualification'
      }
    ],
    defaultRecommendations: {
      techStack: ['React / Next.js', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'AWS'],
      architecture: 'Modular multi-tier web application using secure RESTful APIs, custom OAuth2 access controls, and containerized hosting.',
      timelineEstimate: '12–16 Weeks',
      teamSizeEstimate: '1 Project Manager, 1 Tech Lead, 2 Full-Stack Engineers',
      potentialRisks: ['Scope expansion during MVP development', 'Third-party system API version changes'],
      nextSteps: 'Draft a technical specification document with our software solutions architect.'
    }
  },
  'IT Staffing': {
    explanation: {
      en: 'HyperCode provides tech talent acquisition, team augmentation, and dedicated software development engineering squads.',
      es: 'HyperCode proporciona adquisición de talento tecnológico, aumento de personal y equipos dedicados de ingeniería de desarrollo de software.'
    },
    questions: [
      {
        id: 'it_role_required',
        text: { en: 'Role required', es: 'Rol requerido' },
        prompts: {
          en: ['React/Next.js Engineer', 'Full-Stack Developer', 'DevOps Engineer', 'QA Automation Engineer', 'Tech Lead/Architect'],
          es: ['Ingeniero React/Next.js', 'Desarrollador Full-Stack', 'Ingeniero DevOps', 'Ingeniero QA Automation', 'Líder Técnico/Arquitecto']
        },
        field: { target: 'projectData', key: 'projectType' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'it_num_professionals',
        text: { en: 'Number of professionals', es: 'Número de profesionales' },
        prompts: {
          en: ['1 Professional', '2–3 Professionals', 'Dedicated Squad (4+)', 'Not Sure'],
          es: ['1 Profesional', '2–3 Profesionales', 'Equipo Dedicado (4+)', 'No Estoy Seguro']
        },
        field: { target: 'projectData', key: 'teamSize' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'it_contract_type',
        text: { en: 'Contract, contract-to-hire, or permanent', es: 'Contratación temporal, temporal a permanente o permanente' },
        prompts: {
          en: ['Contract', 'Contract-to-Hire', 'Permanent Placement'],
          es: ['Contrato Temporal', 'Temporal a Permanente', 'Colocación Permanente']
        },
        field: { target: 'projectData', key: 'projectStatus' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'it_work_model',
        text: { en: 'Remote, hybrid, or onsite', es: 'Remoto, híbrido o presencial' },
        prompts: {
          en: ['Remote', 'Hybrid', 'Onsite'],
          es: ['Remoto', 'Híbrido', 'Presencial']
        },
        field: { target: 'projectData', key: 'requiredFeatures' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'it_location',
        text: { en: 'Location', es: 'Ubicación' },
        prompts: {
          en: ['US Timezones', 'Latin America (Nearshore)', 'Europe', 'Any / Global'],
          es: ['Zonas Horarias de EE.UU.', 'América Latina (Nearshore)', 'Europa', 'Cualquiera / Global']
        },
        field: { target: 'projectData', key: 'projectDescription' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'it_required_skills',
        text: { en: 'Required skills', es: 'Habilidades requeridas' },
        prompts: {
          en: ['TypeScript / React', 'Python / Django', 'AWS / Terraform', 'Java / Spring Boot'],
          es: ['TypeScript / React', 'Python / Django', 'AWS / Terraform', 'Java / Spring Boot']
        },
        field: { target: 'projectData', key: 'currentTechnology' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'it_start_date',
        text: { en: 'Start date', es: 'Fecha de inicio' },
        prompts: {
          en: ['Immediate', 'Within 2 Weeks', 'Within 1 Month', 'Flexible'],
          es: ['Inmediato', 'En 2 Semanas', 'En 1 Mes', 'Flexible']
        },
        field: { target: 'projectData', key: 'timeline' },
        stage: 'Project Qualification'
      }
    ],
    defaultRecommendations: {
      techStack: ['React / Next.js', 'Node.js', 'Python', 'AWS', 'Java', 'SQL'],
      architecture: 'Augmented engineering resources matching your codebase stack integrated directly into your daily agile workflows.',
      timelineEstimate: '1–2 Weeks',
      teamSizeEstimate: 'Pre-vetted engineering candidates',
      potentialRisks: ['Timezone synchronization and communication alignment', 'Onboarding delay due to database/code permissions'],
      nextSteps: 'Schedule candidate technical interviews with our recruiters.'
    }
  },
  'Non-IT Staffing': {
    explanation: {
      en: 'HyperCode offers professional staffing solutions for administrative, operations, executive, and non-technical business roles.',
      es: 'HyperCode ofrece soluciones de personal profesional para roles administrativos, operativos, ejecutivos y comerciales no técnicos.'
    },
    questions: [
      {
        id: 'non_it_role_dept',
        text: { en: 'Role or department', es: 'Rol o departamento' },
        prompts: {
          en: ['Operations', 'Sales & Marketing', 'Customer Support', 'Administrative', 'Finance / Accounting'],
          es: ['Operaciones', 'Ventas & Marketing', 'Atención al Cliente', 'Administrativo', 'Finanzas / Contabilidad']
        },
        field: { target: 'projectData', key: 'projectType' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'non_it_num_candidates',
        text: { en: 'Number of candidates', es: 'Número de candidatos' },
        prompts: {
          en: ['1 Candidate', '2–4 Candidates', '5+ Candidates'],
          es: ['1 Candidato', '2–4 Candidatos', '5+ Candidatos']
        },
        field: { target: 'projectData', key: 'teamSize' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'non_it_contract_type',
        text: { en: 'Contract or permanent', es: 'Contratación temporal o permanente' },
        prompts: {
          en: ['Contract', 'Permanent Placement'],
          es: ['Contrato Temporal', 'Colocación Permanente']
        },
        field: { target: 'projectData', key: 'projectStatus' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'non_it_location',
        text: { en: 'Location', es: 'Ubicación' },
        prompts: {
          en: ['Remote', 'Onsite (US)', 'Hybrid'],
          es: ['Remoto', 'Presencial (EE.UU.)', 'Híbrido']
        },
        field: { target: 'projectData', key: 'projectDescription' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'non_it_experience_level',
        text: { en: 'Experience level', es: 'Nivel de experiencia' },
        prompts: {
          en: ['Entry Level', 'Mid-Level', 'Senior / Executive'],
          es: ['Nivel Inicial', 'Nivel Medio', 'Senior / Ejecutivo']
        },
        field: { target: 'projectData', key: 'requiredFeatures' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'non_it_start_date',
        text: { en: 'Start date', es: 'Fecha de inicio' },
        prompts: {
          en: ['Immediate', 'Within 2 Weeks', 'Within 1 Month', 'Flexible'],
          es: ['Inmediato', 'En 2 Semanas', 'En 1 Mes', 'Flexible']
        },
        field: { target: 'projectData', key: 'timeline' },
        stage: 'Project Qualification'
      }
    ],
    defaultRecommendations: {
      techStack: ['ATS Sourcing', 'Operational testing protocols'],
      architecture: 'Dedicated recruitment service targeting qualified non-technical business candidates based on role description scorecards.',
      timelineEstimate: '2–3 Weeks',
      teamSizeEstimate: 'Pre-screened candidates matching specifications',
      potentialRisks: ['Onboarding timeline mismatch', 'Local labor compliance alignment'],
      nextSteps: 'Align on specific scorecards and schedule interviews with our talent team.'
    }
  },
  'Digital Transformation': {
    explanation: {
      en: 'HyperCode accelerates digital transformation by modernizing legacy monoliths into cloud-native microservices, optimizing operations, and auditing technical debt.',
      es: 'HyperCode acelera la transformación digital mediante la modernización de monolitos heredados a microservicios nativos de la nube, optimización de operaciones y auditorías de deuda técnica.'
    },
    questions: [
      {
        id: 'dig_legacy_system',
        text: {
          en: 'What is the primary legacy system or process you want to modernize?',
          es: '¿Cuál es el principal sistema o proceso heredado (legacy) que desea modernizar?'
        },
        prompts: {
          en: ['Legacy On-Premise Monolith', 'Manual Spreadsheets / Paper', 'Old CRM/ERP', 'None / Starting Fresh'],
          es: ['Monolito Local (Legacy)', 'Planillas Manuales / Papel', 'CRM/ERP Antiguo', 'Ninguno / Comenzando de Cero']
        },
        field: { target: 'projectData', key: 'currentTechnology' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'dig_bottleneck',
        text: { en: 'What is the main operational bottleneck you are experiencing?', es: '¿Cuál es el principal cuello de botella operativo que experimenta?' },
        prompts: {
          en: ['Slow Manual Processes', 'Data Silos', 'High Maintenance Costs', 'System Downtime'],
          es: ['Procesos Manuales Lentos', 'Silos de Datos', 'Altos Costos de Mantenimiento', 'Caídas del Sistema']
        },
        field: { target: 'projectData', key: 'projectDescription' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'dig_timeline',
        text: { en: 'What is the target timeline for the modernization phase?', es: '¿Cuál es el plazo previsto para la fase de modernización?' },
        prompts: {
          en: ['Within 1 Month', '1–3 Months', '3–6 Months', 'Flexible'],
          es: ['En menos de 1 mes', '1–3 meses', '3–6 meses', 'Flexible']
        },
        field: { target: 'projectData', key: 'timeline' },
        stage: 'Project Qualification'
      },
      {
        id: 'dig_budget',
        text: { en: 'What is the budget range allocated?', es: '¿Qué rango de presupuesto se ha asignado?' },
        prompts: {
          en: ['Under $25K', '$25K–$50K', '$50K–$100K', '$100K+', 'Not Decided'],
          es: ['Menos de $25K', '$25K–$50K', '$50K–$100K', '$100K+', 'No Decidido']
        },
        field: { target: 'projectData', key: 'budgetRange' },
        stage: 'Project Qualification'
      }
    ],
    defaultRecommendations: {
      techStack: ['Cloud Migrations', 'Microservices Architecture', 'API Gateways', 'Legacy Systems Refactoring'],
      architecture: 'Deconstruction of legacy monolithic applications into domain-driven cloud-native microservices integrated via secure API layers.',
      timelineEstimate: '16–24 Weeks',
      teamSizeEstimate: '1 Principal Architect, 2 Senior Engineers, 1 Business Analyst',
      potentialRisks: ['Database refactoring complexity', 'Legacy code logic discovery challenges'],
      nextSteps: 'Conduct a legacy codebase technical audit with a HyperCode solutions director.'
    }
  },
  'Enterprise Data Platforms': {
    explanation: {
      en: 'HyperCode engineers enterprise-grade data platforms, data lakes, Snowflake/BigQuery warehouses, and real-time streaming architectures.',
      es: 'HyperCode diseña plataformas de datos de nivel empresarial, lagos de datos, almacenes de Snowflake/BigQuery y arquitecturas de transmisión en tiempo real.'
    },
    questions: [
      {
        id: 'ent_volume_sources',
        text: { en: 'What is the current volume and sources of your enterprise data?', es: '¿Cuál es el volumen y fuentes actuales de sus datos empresariales?' },
        prompts: {
          en: ['Under 500 GB (Multiple Sources)', '500 GB–5 TB (Cloud/DBs)', '5 TB–50 TB', '50 TB+', 'Not Sure'],
          es: ['Menos de 500 GB', '500 GB–5 TB', '5 TB–50 TB', '50 TB+', 'No Estoy Seguro']
        },
        field: { target: 'projectData', key: 'currentTechnology' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'ent_platform_type',
        text: { en: 'Are you looking to build a data warehouse, data lake, or real-time pipeline?', es: '¿Busca construir un almacén de datos, un lago de datos o un pipeline en tiempo real?' },
        prompts: {
          en: ['Cloud Data Warehouse', 'Data Lake', 'Real-Time ETL Pipeline', 'Hybrid Platform'],
          es: ['Data Warehouse en la Nube', 'Data Lake', 'Pipeline ETL en Tiempo Real', 'Plataforma Híbrida']
        },
        field: { target: 'projectData', key: 'projectType' },
        stage: 'Requirement Gathering'
      },
      {
        id: 'ent_timeline',
        text: { en: 'When do you plan to kick off this enterprise data initiative?', es: '¿Cuándo planea iniciar esta iniciativa de datos empresariales?' },
        prompts: {
          en: ['Within 1 Month', '1–3 Months', '3–6 Months', 'Flexible'],
          es: ['En menos de 1 mes', '1–3 meses', '3–6 meses', 'Flexible']
        },
        field: { target: 'projectData', key: 'timeline' },
        stage: 'Project Qualification'
      },
      {
        id: 'ent_budget',
        text: { en: 'What budget range has been allocated for the enterprise data platform?', es: '¿Qué rango de presupuesto se ha asignado para la plataforma de datos empresariales?' },
        prompts: {
          en: ['Under $30K', '$30K–$70K', '$70K–$150K', '$150K+', 'Not Decided'],
          es: ['Menos de $30K', '$30K–$70K', '$70K–$150K', '$150K+', 'No Decidido']
        },
        field: { target: 'projectData', key: 'budgetRange' },
        stage: 'Project Qualification'
      }
    ],
    defaultRecommendations: {
      techStack: ['Snowflake', 'Databricks', 'Spark', 'Kafka', 'AWS S3', 'Terraform'],
      architecture: 'Enterprise-wide lakehouse blueprint supporting near-real-time ingestion pipelines and secure column-level access control.',
      timelineEstimate: '12–18 Weeks',
      teamSizeEstimate: '1 Data Architect, 2 Data Platform Engineers, 1 Data Steward',
      potentialRisks: ['Complex access control policy enforcement', 'Database migration schema version locks'],
      nextSteps: 'Map target warehouse destinations and run source ingestion assessments.'
    }
  }
};

const LEAD_QUESTIONS: {
  id: string;
  text: { en: string; es: string };
  prompts?: { en: string[]; es: string[] };
  field: {
    target: 'leadData';
    key: keyof LeadData;
  };
  stage: ConversationStage;
}[] = [
  {
    id: 'lead_name',
    text: {
      en: 'Thank you. To prepare a tailored consulting strategy, please enter your full name.',
      es: 'Gracias. Para preparar una estrategia de consultoría a su medida, por favor ingrese su nombre completo.'
    },
    field: { target: 'leadData', key: 'name' },
    stage: 'Lead Qualification'
  },
  {
    id: 'lead_company',
    text: {
      en: 'Thank you, {name}. What is your company name?',
      es: 'Gracias, {name}. ¿Cuál es el nombre de su empresa?'
    },
    field: { target: 'leadData', key: 'company' },
    stage: 'Lead Qualification'
  },
  {
    id: 'lead_email',
    text: {
      en: 'What is your business email address?',
      es: '¿Cuál es su dirección de correo electrónico corporativo?'
    },
    field: { target: 'leadData', key: 'email' },
    stage: 'Lead Qualification'
  },
  {
    id: 'lead_phone',
    text: {
      en: 'Please enter your phone number. You may include the country code.',
      es: 'Por favor, ingrese su número de teléfono. Puede incluir el código de país.'
    },
    field: { target: 'leadData', key: 'phone' },
    stage: 'Lead Qualification'
  },
  {
    id: 'lead_industry',
    text: {
      en: 'What industry does your business operate in?',
      es: '¿En qué industria opera su empresa?'
    },
    prompts: {
      en: ['Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing', 'Education', 'Other'],
      es: ['Tecnología', 'Salud', 'Finanzas', 'Retail', 'Manufactura', 'Educación', 'Otro']
    },
    field: { target: 'leadData', key: 'industry' },
    stage: 'Lead Qualification'
  },
  {
    id: 'lead_preferred_contact',
    text: {
      en: 'How would you prefer HyperCode to contact you?',
      es: '¿Cómo prefiere que HyperCode se contacte con usted?'
    },
    prompts: {
      en: ['Email', 'Phone', 'Either'],
      es: ['Email', 'Teléfono', 'Cualquiera']
    },
    field: { target: 'leadData', key: 'preferredContact' },
    stage: 'Lead Qualification'
  }
];

function createResponse(
  state: ChatbotState,
  responseMessage: string,
  suggestedPrompts: string[] = [],
  navigationActions: string[] = []
): ConsultantResponse {
  return {
    detectedIntent: state.detectedIntent,
    conversationStage: state.conversationStage,
    currentQuestion: state.currentQuestion,
    responseMessage,
    suggestedPrompts,
    navigationActions,
    extractedLeadData: state.leadData,
    projectData: state.projectData,
    recommendations: state.recommendations
  };
}

export function detectServiceIntent(message: string): ServiceIntent {
  const normalized = message.toLowerCase().trim();
  const services: ServiceIntent[] = [
    'Web Development',
    'Mobile Development',
    'Software Development',
    'AI & Automation',
    'Cloud & DevOps',
    'Data Analytics',
    'Business Intelligence',
    'Digital Transformation',
    'Enterprise Data Platforms',
    'IT Staffing',
    'Non-IT Staffing'
  ];

  for (const s of services) {
    if (normalized === s.toLowerCase()) {
      return s;
    }
  }

  if (normalized.includes('web dev') || normalized.includes('website') || normalized.includes('web app') || normalized.includes('ecommerce') || normalized.includes('e-commerce') || normalized.includes('saas') || normalized.includes('portal') || normalized.includes('next.js') || normalized.includes('react')) {
    return 'Web Development';
  }
  if (normalized.includes('mobile app') || normalized.includes('android') || normalized.includes('ios') || normalized.includes('flutter') || normalized.includes('react native') || normalized.includes('móvil') || normalized.includes('aplicación móvil')) {
    return 'Mobile Development';
  }
  if (normalized.includes('ai') || normalized.includes('automation') || normalized.includes('chatbot') || normalized.includes('assistant') || normalized.includes('rag') || normalized.includes('llm') || normalized.includes('voice agent') || normalized.includes('ia') || normalized.includes('automatización')) {
    return 'AI & Automation';
  }
  if (normalized.includes('cloud') || normalized.includes('devops') || normalized.includes('migration') || normalized.includes('aws') || normalized.includes('azure') || normalized.includes('gcp') || normalized.includes('nube') || normalized.includes('migración')) {
    return 'Cloud & DevOps';
  }
  if (normalized.includes('snowflake') || normalized.includes('bigquery') || normalized.includes('enterprise data')) {
    return 'Enterprise Data Platforms';
  }
  if (normalized.includes('data analytics') || normalized.includes('analytics') || normalized.includes('analítica')) {
    return 'Data Analytics';
  }
  if (normalized.includes('business intelligence') || normalized.includes('power bi') || normalized.includes('tableau') || normalized.includes('dashboard') || normalized.includes(' bi ') || normalized.startsWith('bi') || normalized.endsWith('bi') || normalized.includes('tableros')) {
    return 'Business Intelligence';
  }
  if (normalized.includes('non-it staffing') || normalized.includes('non-technical staffing') || normalized.includes('personal no-ti')) {
    return 'Non-IT Staffing';
  }
  if (normalized.includes('it staffing') || normalized.includes('developer hiring') || normalized.includes('hire developers') || normalized.includes('staff augmentation') || normalized.includes('technical talent') || normalized.includes('personal ti')) {
    return 'IT Staffing';
  }
  if (normalized.includes('digital transformation') || normalized.includes('modernization') || normalized.includes('legacy') || normalized.includes('transformación digital') || normalized.includes('modernización')) {
    return 'Digital Transformation';
  }

  return 'DEFAULT';
}

function getServicePrompts(lang: 'en' | 'es'): string[] {
  return [
    'Web Development',
    'AI & Automation',
    'Cloud & DevOps',
    'Data Analytics',
    'Business Intelligence',
    'Mobile Development',
    'Software Development',
    'IT Staffing',
    'Non-IT Staffing'
  ];
}

export function processConsultantMessage(
  userMessage: string,
  currentState: ChatbotState,
  language: 'en' | 'es' = 'en'
): ConsultantResponse {
  const state: ChatbotState = {
    ...currentState,
    leadData: { ...currentState.leadData },
    projectData: { ...currentState.projectData }
  };

  const normalized = userMessage.toLowerCase().trim();

  // 1. Service switching / restart commands
  const isRestart = [
    'back to start',
    'explore another service',
    'start over',
    'main menu',
    'volver al inicio',
    'explorar otro servicio',
    'comenzar de nuevo',
    'menú principal'
  ].some(cmd => normalized.includes(cmd));

  if (isRestart) {
    state.detectedIntent = 'DEFAULT';
    state.conversationStage = 'Greeting';
    state.currentQuestion = 'service_selection';
    state.projectData = {};
    state.recommendations = null;
    state.leadSubmitted = false;

    return createResponse(
      state,
      language === 'es'
        ? 'Entendido. Volvamos al inicio. ¿Con cuál de nuestros servicios de consultoría tecnológica le gustaría comenzar hoy?'
        : 'Understood. Let\'s go back to the beginning. Which of our technology consulting services would you like to explore today?',
      getServicePrompts(language),
      []
    );
  }

  // 2. Resolve ServiceIntent Selection
  let detectedIntent = state.detectedIntent;
  if (detectedIntent === 'DEFAULT') {
    const detected = detectServiceIntent(userMessage);
    if (detected !== 'DEFAULT') {
      detectedIntent = detected;
      state.detectedIntent = detected;
      state.currentQuestion = null; // trigger introduction flow for the service
    } else {
      // Check for basic greeting or offer help
      const isGreeting = [
        'hello', 'hi', 'hey', 'greetings', 'hola', 'buenos dias', 'buenas tardes', 'buen día'
      ].some(g => normalized.includes(g));

      if (isGreeting) {
        return createResponse(
          state,
          language === 'es'
            ? '¡Hola! Soy su asesor técnico de HyperCode. Puedo recomendarle soluciones, sugerir tecnologías, estimar plazos de proyectos y calcular el tamaño de los equipos. ¿Qué le gustaría construir o escalar hoy?'
            : 'Hello! I am your HyperCode Technical Advisor. I can recommend solutions, suggest technologies, estimate project timelines, and calculate team sizes based on your goals. What are you looking to build or scale today?',
          getServicePrompts(language)
        );
      }

      // Off-topic / generic input handler
      return createResponse(
        state,
        language === 'es'
          ? 'Puedo ayudarle con la consultoría tecnológica de HyperCode, IA, desarrollo de software, datos, nube y servicios de personal. ¿Qué servicio le gustaría explorar?'
          : 'I can help with HyperCode\'s technology consulting, AI, software development, data, cloud, and staffing services. Which service would you like to explore?',
        getServicePrompts(language)
      );
    }
  }

  // 3. Process service specific deterministic flows
  const flow = SERVICES_CONFIG[detectedIntent];
  let currentQuestion = state.currentQuestion;

  if (currentQuestion === 'service_selection') {
    // If they were prompted to select a service and we just detected it
    currentQuestion = null;
  }

  if (currentQuestion === null) {
    // First question initialization
    const firstQ = flow.questions[0];
    state.currentQuestion = firstQ.id;
    state.conversationStage = 'Service Introduction';

    const introText = flow.explanation[language];
    const firstQText = firstQ.text[language];

    return createResponse(
      state,
      `${introText} ${firstQText}`,
      firstQ.prompts?.[language] || []
    );
  }

  // Find if it is a project flow question
  const projectQIndex = flow.questions.findIndex(q => q.id === currentQuestion);

  if (projectQIndex !== -1) {
    // 4. Validate and process Project Flow Question
    const currentQ = flow.questions[projectQIndex];
    const validation = validateChatAnswer(currentQuestion, userMessage);

    if (!validation.valid) {
      return createResponse(
        state,
        validation.error || (language === 'es' ? 'Por favor proporcione una respuesta válida.' : 'Please provide a valid answer.'),
        currentQ.prompts?.[language] || []
      );
    }

    // Save answer
    const val = validation.value || userMessage.trim();
    state.projectData[currentQ.field.key as keyof ProjectData] = val;

    // Advance to next question
    if (projectQIndex < flow.questions.length - 1) {
      const nextQ = flow.questions[projectQIndex + 1];
      state.currentQuestion = nextQ.id;
      state.conversationStage = nextQ.stage;

      return createResponse(
        state,
        nextQ.text[language],
        nextQ.prompts?.[language] || []
      );
    } else {
      // Reached the end of project questions, move to Lead Qualification
      state.recommendations = flow.defaultRecommendations; // set initial offline recommendation
      const firstLeadQ = LEAD_QUESTIONS[0];
      state.currentQuestion = firstLeadQ.id;
      state.conversationStage = firstLeadQ.stage;

      return createResponse(
        state,
        firstLeadQ.text[language],
        firstLeadQ.prompts?.[language] || []
      );
    }
  }

  // Find if it is a lead qualification question
  const leadQIndex = LEAD_QUESTIONS.findIndex(q => q.id === currentQuestion);

  if (leadQIndex !== -1) {
    // 5. Validate and process Lead Qualification Flow Question
    const currentQ = LEAD_QUESTIONS[leadQIndex];
    const validation = validateChatAnswer(currentQuestion, userMessage);

    if (!validation.valid) {
      return createResponse(
        state,
        validation.error || (language === 'es' ? 'Por favor proporcione una respuesta válida.' : 'Please provide a valid answer.'),
        currentQ.prompts?.[language] || []
      );
    }

    // Save answer
    const val = validation.value || userMessage.trim();
    if (currentQ.field.key === 'preferredContact') {
      const normalizedContact = val.toLowerCase();
      if (normalizedContact.includes('email') || normalizedContact.includes('correo')) {
        state.leadData.preferredContact = 'Email';
      } else if (normalizedContact.includes('phone') || normalizedContact.includes('teléfono') || normalizedContact.includes('telefono')) {
        state.leadData.preferredContact = 'Phone';
      } else {
        state.leadData.preferredContact = 'Either';
      }
    } else {
      state.leadData[currentQ.field.key as keyof LeadData] = val as any;
    }

    // Advance to next lead question
    if (leadQIndex < LEAD_QUESTIONS.length - 1) {
      const nextQ = LEAD_QUESTIONS[leadQIndex + 1];
      state.currentQuestion = nextQ.id;
      state.conversationStage = nextQ.stage;

      // Format text replacing {name} template
      let nextText = nextQ.text[language];
      if (nextText.includes('{name}')) {
        nextText = nextText.replace('{name}', state.leadData.name || '');
      }

      return createResponse(
        state,
        nextText,
        nextQ.prompts?.[language] || []
      );
    } else {
      // Reached the end of Lead Qualification, move to Consultation scheduling offer
      state.currentQuestion = null;
      state.conversationStage = 'Consultation';

      const serviceNameLocalized = detectedIntent;
      const responseText = language === 'es'
        ? `Gracias. Se han recopilado los requisitos de su proyecto de **${serviceNameLocalized}**. Un consultor de HyperCode ahora puede revisar las especificaciones, el plazo y el presupuesto de su proyecto. ¿Le gustaría programar una consulta técnica?`
        : `Thank you. Your **${serviceNameLocalized}** project requirements have been collected. A HyperCode consultant can now review your project specifications, timeline, and budget. Would you like to schedule a technical consultation call?`;

      const suggested = language === 'es'
        ? ['Agendar Consulta', 'Solicitar Correo de Seguimiento', 'Explorar Otro Servicio']
        : ['Schedule Consultation', 'Request Email Follow-up', 'Explore Another Service'];

      return createResponse(
        state,
        responseText,
        suggested,
        ['Schedule Consultation']
      );
    }
  }

  // Catch-all fallback
  return createResponse(
    state,
    language === 'es'
      ? '¿En qué más puedo ayudarle?'
      : 'How else can I assist you today?',
    language === 'es' ? ['Explorar Otro Servicio'] : ['Explore Another Service']
  );
}