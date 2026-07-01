// Registry of all 108 services across 13 categories with custom localized data generators.
export interface ServiceDetail {
  slug: string;
  categoryId: string;
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
  features: Array<{ title: string; desc: string }>;
  technologies: Array<{ name: string; role: string }>;
  timeline: Array<{ title: string; desc: string }>;
  industries: string[];
  faqs: Array<{ q: string; a: string }>;
  relatedServices: Array<{ name: string; slug: string }>;
  heroImage: string;
}

// 13 Category localized names
export const CATEGORY_NAMES: Record<string, { en: string; es: string }> = {
  'ai-automation': { en: 'AI & Automation', es: 'IA y Automatización' },
  'software-development': { en: 'Software Development', es: 'Desarrollo de Software' },
  'web-development': { en: 'Web Development', es: 'Desarrollo Web' },
  'mobile-development': { en: 'Mobile Development', es: 'Desarrollo Móvil' },
  'cloud-devops': { en: 'Cloud & DevOps', es: 'Nube y DevOps' },
  'talent-solutions': { en: 'IT & Non-IT Talent Solutions', es: 'Soluciones de Talento TI y No TI' },
  'digital-transformation': { en: 'Digital Transformation', es: 'Transformación Digital' },
  'data-analytics': { en: 'Data & Analytics', es: 'Datos y Analítica' },
  'cybersecurity': { en: 'Cybersecurity', es: 'Ciberseguridad' },
  'ui-ux-design': { en: 'UI/UX Design', es: 'Diseño UI/UX' },
  'digital-marketing': { en: 'Digital Marketing', es: 'Marketing Digital' },
  'ecommerce': { en: 'E-commerce', es: 'Comercio Electrónico' },
  'technology-consulting': { en: 'Consulting', es: 'Consultoría' }
};

// 108 Services registry (slug -> categoryId, EN name, ES name)
export const SERVICE_REGISTRY: Record<string, {
  categoryId: string;
  enName: string;
  esName: string;
  tech: string[];
  related: string[];
}> = {
  // AI & Automation
  'ai-consulting': {
    categoryId: 'ai-automation',
    enName: 'AI Consulting',
    esName: 'Consultoría de IA',
    tech: ['OpenAI', 'Gemini', 'LangChain', 'LlamaIndex'],
    related: ['generative-ai-solutions', 'ai-strategy', 'custom-ai-model-development']
  },
  'generative-ai-solutions': {
    categoryId: 'ai-automation',
    enName: 'Generative AI Solutions',
    esName: 'Soluciones de IA Generativa',
    tech: ['GPT-4', 'Claude', 'HuggingFace', 'Stable Diffusion'],
    related: ['ai-chatbot-development', 'custom-ai-model-development', 'ai-workflow-automation']
  },
  'ai-chatbot-development': {
    categoryId: 'ai-automation',
    enName: 'AI Chatbot Development',
    esName: 'Desarrollo de Chatbots de IA',
    tech: ['Vercel AI SDK', 'Pinecone', 'Next.js', 'Node.js'],
    related: ['ai-voice-agents', 'ai-customer-support-automation', 'generative-ai-solutions']
  },
  'ai-voice-agents': {
    categoryId: 'ai-automation',
    enName: 'AI Voice Agents',
    esName: 'Agentes de Voz de IA',
    tech: ['ElevenLabs', 'Vapi', 'Twilio', 'Python'],
    related: ['ai-chatbot-development', 'ai-customer-support-automation', 'ai-sales-assistants']
  },
  'ai-customer-support-automation': {
    categoryId: 'ai-automation',
    enName: 'AI Customer Support Automation',
    esName: 'Automatización de Soporte con IA',
    tech: ['Zendesk API', 'Intercom API', 'Pinecone', 'OpenAI'],
    related: ['ai-chatbot-development', 'ai-voice-agents', 'ai-workflow-automation']
  },
  'ai-sales-assistants': {
    categoryId: 'ai-automation',
    enName: 'AI Sales Assistants',
    esName: 'Asistentes de Ventas con IA',
    tech: ['HubSpot API', 'Salesforce API', 'GPT-4', 'Python'],
    related: ['ai-voice-agents', 'ai-workflow-automation', 'ai-analytics']
  },
  'ai-hr-automation': {
    categoryId: 'ai-automation',
    enName: 'AI HR Automation',
    esName: 'Automatización de RRHH con IA',
    tech: ['Workday API', 'Python', 'LangChain', 'OpenAI'],
    related: ['ai-workflow-automation', 'ai-document-processing', 'permanent-staffing']
  },
  'ai-workflow-automation': {
    categoryId: 'ai-automation',
    enName: 'AI Workflow Automation',
    esName: 'Automatización de Flujos con IA',
    tech: ['n8n', 'Zapier', 'Make.com', 'Python'],
    related: ['ai-customer-support-automation', 'ai-sales-assistants', 'ai-hr-automation']
  },
  'ai-document-processing': {
    categoryId: 'ai-automation',
    enName: 'AI Document Processing',
    esName: 'Procesamiento de Documentos con IA',
    tech: ['AWS Textract', 'Google Document AI', 'Python', 'OpenAI'],
    related: ['ai-workflow-automation', 'ai-knowledge-base-rag', 'custom-ai-model-development']
  },
  'ai-knowledge-base-rag': {
    categoryId: 'ai-automation',
    enName: 'AI Knowledge Base (RAG)',
    esName: 'Base de Conocimiento de IA (RAG)',
    tech: ['Pinecone', 'Weaviate', 'LangChain', 'OpenAI'],
    related: ['ai-chatbot-development', 'ai-document-processing', 'generative-ai-solutions']
  },
  'ai-analytics': {
    categoryId: 'ai-automation',
    enName: 'AI Analytics',
    esName: 'Analítica de IA',
    tech: ['Python', 'Pandas', 'TensorFlow', 'Scikit-learn'],
    related: ['predictive-analytics', 'data-visualization', 'ai-consulting']
  },
  'custom-ai-model-development': {
    categoryId: 'ai-automation',
    enName: 'Custom AI Model Development',
    esName: 'Desarrollo de Modelos de IA a Medida',
    tech: ['PyTorch', 'TensorFlow', 'HuggingFace', 'AWS Sagemaker'],
    related: ['ai-consulting', 'generative-ai-solutions', 'ai-integration']
  },
  'ai-integration': {
    categoryId: 'ai-automation',
    enName: 'AI Integration',
    esName: 'Integración de IA',
    tech: ['Node.js', 'Python', 'FastAPI', 'Next.js'],
    related: ['custom-ai-model-development', 'ai-workflow-automation', 'generative-ai-solutions']
  },

  // Software Development
  'custom-software-development': {
    categoryId: 'software-development',
    enName: 'Custom Software Development',
    esName: 'Desarrollo de Software a Medida',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    related: ['enterprise-software', 'saas-development', 'api-development']
  },
  'enterprise-software': {
    categoryId: 'software-development',
    enName: 'Enterprise Software',
    esName: 'Software Empresarial',
    tech: ['C#/.NET', 'Java/Spring', 'Kubernetes', 'Oracle'],
    related: ['custom-software-development', 'erp-development', 'crm-development']
  },
  'saas-development': {
    categoryId: 'software-development',
    enName: 'SaaS Development',
    esName: 'Desarrollo SaaS',
    tech: ['Next.js', 'Supabase', 'Stripe', 'TailwindCSS'],
    related: ['custom-software-development', 'api-development', 'workflow-systems']
  },
  'crm-development': {
    categoryId: 'software-development',
    enName: 'CRM Development',
    esName: 'Desarrollo CRM',
    tech: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    related: ['enterprise-software', 'erp-development', 'billing-systems']
  },
  'erp-development': {
    categoryId: 'software-development',
    enName: 'ERP Development',
    esName: 'Desarrollo ERP',
    tech: ['C#/.NET', 'SQL Server', 'Azure', 'Angular'],
    related: ['enterprise-software', 'crm-development', 'inventory-systems']
  },
  'inventory-systems': {
    categoryId: 'software-development',
    enName: 'Inventory Systems',
    esName: 'Sistemas de Inventario',
    tech: ['Node.js', 'React', 'MongoDB', 'AWS'],
    related: ['erp-development', 'billing-systems', 'pos-systems']
  },
  'billing-systems': {
    categoryId: 'software-development',
    enName: 'Billing Systems',
    esName: 'Sistemas de Facturación',
    tech: ['Stripe', 'Node.js', 'PostgreSQL', 'Next.js'],
    related: ['saas-development', 'inventory-systems', 'pos-systems']
  },
  'pos-systems': {
    categoryId: 'software-development',
    enName: 'POS Systems',
    esName: 'Sistemas POS',
    tech: ['React Native', 'Node.js', 'SQLite', 'PostgreSQL'],
    related: ['billing-systems', 'inventory-systems', 'ecommerce-websites']
  },
  'workflow-systems': {
    categoryId: 'software-development',
    enName: 'Workflow Systems',
    esName: 'Sistemas de Flujo de Trabajo',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    related: ['custom-software-development', 'saas-development', 'api-development']
  },
  'api-development': {
    categoryId: 'software-development',
    enName: 'API Development',
    esName: 'Desarrollo de API',
    tech: ['Express', 'FastAPI', 'GraphQL', 'PostgreSQL'],
    related: ['custom-software-development', 'saas-development', 'legacy-modernization']
  },
  'legacy-modernization': {
    categoryId: 'software-development',
    enName: 'Legacy Modernization',
    esName: 'Modernización de Sistemas Legados',
    tech: ['Docker', 'Kubernetes', 'Next.js', 'AWS'],
    related: ['custom-software-development', 'enterprise-software', 'api-development']
  },

  // Web Development
  'corporate-websites': {
    categoryId: 'web-development',
    enName: 'Corporate Websites',
    esName: 'Sitios Web Corporativos',
    tech: ['Next.js', 'TailwindCSS', 'Framer Motion', 'Sanity CMS'],
    related: ['business-websites', 'portfolio-websites', 'landing-pages']
  },
  'business-websites': {
    categoryId: 'web-development',
    enName: 'Business Websites',
    esName: 'Sitios Web de Negocios',
    tech: ['Next.js', 'TailwindCSS', 'WordPress', 'React'],
    related: ['corporate-websites', 'landing-pages', 'booking-systems']
  },
  'portfolio-websites': {
    categoryId: 'web-development',
    enName: 'Portfolio Websites',
    esName: 'Sitios Web de Portafolio',
    tech: ['Next.js', 'Framer Motion', 'TailwindCSS', 'MDX'],
    related: ['corporate-websites', 'business-websites', 'landing-pages']
  },
  'landing-pages': {
    categoryId: 'web-development',
    enName: 'Landing Pages',
    esName: 'Páginas de Destino',
    tech: ['Next.js', 'TailwindCSS', 'Figma', 'Vercel'],
    related: ['corporate-websites', 'business-websites', 'ecommerce-websites']
  },
  'ecommerce-websites': {
    categoryId: 'web-development',
    enName: 'Ecommerce Websites',
    esName: 'Sitios Web de Comercio Electrónico',
    tech: ['Next.js', 'Shopify API', 'Stripe', 'TailwindCSS'],
    related: ['marketplace-development', 'shopify-development', 'payment-gateway-integration']
  },
  'marketplace-development': {
    categoryId: 'web-development',
    enName: 'Marketplace Development',
    esName: 'Desarrollo de Marketplaces',
    tech: ['Next.js', 'GraphQL', 'Node.js', 'PostgreSQL'],
    related: ['ecommerce-websites', 'customer-portals', 'payment-gateway-integration']
  },
  'booking-systems': {
    categoryId: 'web-development',
    enName: 'Booking Systems',
    esName: 'Sistemas de Reserva',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Twilio'],
    related: ['customer-portals', 'business-websites', 'admin-dashboards']
  },
  'customer-portals': {
    categoryId: 'web-development',
    enName: 'Customer Portals',
    esName: 'Portales de Clientes',
    tech: ['Next.js', 'Supabase', 'TailwindCSS', 'Stripe'],
    related: ['admin-dashboards', 'booking-systems', 'marketplace-development']
  },
  'admin-dashboards': {
    categoryId: 'web-development',
    enName: 'Admin Dashboards',
    esName: 'Tableros de Administración',
    tech: ['React', 'TypeScript', 'Tremor UI', 'Supabase'],
    related: ['customer-portals', 'cms-development', 'data-visualization']
  },
  'cms-development': {
    categoryId: 'web-development',
    enName: 'CMS Development',
    esName: 'Desarrollo CMS',
    tech: ['Sanity.io', 'Strapi', 'Next.js', 'PostgreSQL'],
    related: ['corporate-websites', 'admin-dashboards', 'progressive-web-apps']
  },
  'progressive-web-apps': {
    categoryId: 'web-development',
    enName: 'Progressive Web Apps',
    esName: 'Aplicaciones Web Progresivas',
    tech: ['React', 'Workbox', 'Next.js', 'TailwindCSS'],
    related: ['corporate-websites', 'customer-portals', 'ios-apps']
  },

  // Mobile Development
  'android-apps': {
    categoryId: 'mobile-development',
    enName: 'Android Apps',
    esName: 'Aplicaciones Android',
    tech: ['Kotlin', 'Android Jetpack', 'Firebase', 'Java'],
    related: ['ios-apps', 'cross-platform-apps', 'flutter-development']
  },
  'ios-apps': {
    categoryId: 'mobile-development',
    enName: 'iOS Apps',
    esName: 'Aplicaciones iOS',
    tech: ['Swift', 'SwiftUI', 'CoreData', 'GraphQL'],
    related: ['android-apps', 'cross-platform-apps', 'react-native-development']
  },
  'cross-platform-apps': {
    categoryId: 'mobile-development',
    enName: 'Cross Platform Apps',
    esName: 'Aplicaciones Multiplataforma',
    tech: ['Flutter', 'React Native', 'TypeScript', 'Dart'],
    related: ['ios-apps', 'android-apps', 'flutter-development']
  },
  'flutter-development': {
    categoryId: 'mobile-development',
    enName: 'Flutter Development',
    esName: 'Desarrollo con Flutter',
    tech: ['Flutter', 'Dart', 'Bloc', 'Firebase'],
    related: ['react-native-development', 'cross-platform-apps', 'ios-apps']
  },
  'react-native-development': {
    categoryId: 'mobile-development',
    enName: 'React Native Development',
    esName: 'Desarrollo con React Native',
    tech: ['React Native', 'TypeScript', 'Redux', 'Expo'],
    related: ['flutter-development', 'cross-platform-apps', 'android-apps']
  },
  'enterprise-mobile-apps': {
    categoryId: 'mobile-development',
    enName: 'Enterprise Apps',
    esName: 'Aplicaciones Empresariales',
    tech: ['React Native', 'Swift', 'Kotlin', 'AWS'],
    related: ['ios-apps', 'android-apps', 'cross-platform-apps']
  },
  'on-demand-apps': {
    categoryId: 'mobile-development',
    enName: 'On Demand Apps',
    esName: 'Aplicaciones Bajo Demanda',
    tech: ['Flutter', 'Node.js', 'Google Maps API', 'Firebase'],
    related: ['cross-platform-apps', 'react-native-development', 'android-apps']
  },

  // Cloud & DevOps
  'cloud-migration': {
    categoryId: 'cloud-devops',
    enName: 'Cloud Migration',
    esName: 'Migración a la Nube',
    tech: ['AWS Migration Hub', 'Azure Migrate', 'Terraform', 'Ansible'],
    related: ['aws-cloud-solutions', 'azure-cloud-solutions', 'kubernetes-orchestration']
  },
  'aws-cloud-solutions': {
    categoryId: 'cloud-devops',
    enName: 'AWS Solutions',
    esName: 'Soluciones AWS',
    tech: ['AWS EC2', 'AWS RDS', 'AWS Lambda', 'Terraform'],
    related: ['cloud-migration', 'kubernetes-orchestration', 'ci-cd-pipelines']
  },
  'azure-cloud-solutions': {
    categoryId: 'cloud-devops',
    enName: 'Azure Solutions',
    esName: 'Soluciones Azure',
    tech: ['Azure VMs', 'Azure DevOps', 'Azure Functions', 'Terraform'],
    related: ['cloud-migration', 'kubernetes-orchestration', 'ci-cd-pipelines']
  },
  'google-cloud-solutions': {
    categoryId: 'cloud-devops',
    enName: 'Google Cloud Solutions',
    esName: 'Soluciones Google Cloud',
    tech: ['GCP Compute Engine', 'GKE', 'BigQuery', 'Terraform'],
    related: ['cloud-migration', 'kubernetes-orchestration', 'ci-cd-pipelines']
  },
  'docker-containerization': {
    categoryId: 'cloud-devops',
    enName: 'Docker Containerization',
    esName: 'Contenedores Docker',
    tech: ['Docker', 'Docker Compose', 'AWS ECR', 'Registry'],
    related: ['kubernetes-orchestration', 'ci-cd-pipelines', 'server-deployment']
  },
  'kubernetes-orchestration': {
    categoryId: 'cloud-devops',
    enName: 'Kubernetes Orchestration',
    esName: 'Orquestación con Kubernetes',
    tech: ['Kubernetes', 'Helm', 'ArgoCD', 'Docker'],
    related: ['docker-containerization', 'cloud-migration', 'infrastructure-automation']
  },
  'ci-cd-pipelines': {
    categoryId: 'cloud-devops',
    enName: 'CI/CD Pipelines',
    esName: 'Canalizaciones CI/CD',
    tech: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'ArgoCD'],
    related: ['docker-containerization', 'kubernetes-orchestration', 'server-deployment']
  },
  'server-deployment': {
    categoryId: 'cloud-devops',
    enName: 'Server Deployment',
    esName: 'Despliegue de Servidores',
    tech: ['Nginx', 'Ubuntu', 'PM2', 'Docker'],
    related: ['monitoring-observability', 'ci-cd-pipelines', 'docker-containerization']
  },
  'monitoring-observability': {
    categoryId: 'cloud-devops',
    enName: 'Monitoring & Observability',
    esName: 'Monitoreo y Observabilidad',
    tech: ['Prometheus', 'Grafana', 'Datadog', 'New Relic'],
    related: ['server-deployment', 'infrastructure-automation', 'ci-cd-pipelines']
  },
  'infrastructure-automation': {
    categoryId: 'cloud-devops',
    enName: 'Infrastructure Automation',
    esName: 'Automatización de Infraestructura',
    tech: ['Terraform', 'Ansible', 'Pulumi', 'AWS CloudFormation'],
    related: ['cloud-migration', 'kubernetes-orchestration', 'monitoring-observability']
  },

  // IT & Non-IT Talent Solutions
  'permanent-staffing': {
    categoryId: 'talent-solutions',
    enName: 'Permanent Staffing',
    esName: 'Contratación Permanente',
    tech: ['Sourcing Platforms', 'ATS Systems', 'Behavioral Screening'],
    related: ['contract-staffing', 'executive-search', 'recruitment-process-outsourcing']
  },
  'contract-staffing': {
    categoryId: 'talent-solutions',
    enName: 'Contract Staffing',
    esName: 'Contratación por Contrato',
    tech: ['VMS Systems', 'Contract Management', 'Payroll Services'],
    related: ['permanent-staffing', 'contract-to-hire', 'staff-augmentation']
  },
  'contract-to-hire': {
    categoryId: 'talent-solutions',
    enName: 'Contract-to-Hire',
    esName: 'Contrato con Opción a Compra',
    tech: ['Performance Vetting', 'HR Alignment', 'Trial Frameworks'],
    related: ['contract-staffing', 'permanent-staffing', 'staff-augmentation']
  },
  'executive-search': {
    categoryId: 'talent-solutions',
    enName: 'Executive Search',
    esName: 'Búsqueda Ejecutiva',
    tech: ['Leadership Mapping', 'Network Analysis', 'Executive Screening'],
    related: ['permanent-staffing', 'bulk-hiring', 'recruitment-process-outsourcing']
  },
  'bulk-hiring': {
    categoryId: 'talent-solutions',
    enName: 'Bulk Hiring',
    esName: 'Contratación Masiva',
    tech: ['ATS Automation', 'Mass Testing', 'Assessment Centers'],
    related: ['permanent-staffing', 'campus-recruitment', 'recruitment-process-outsourcing']
  },
  'campus-recruitment': {
    categoryId: 'talent-solutions',
    enName: 'Campus Recruitment',
    esName: 'Reclutamiento Universitario',
    tech: ['University Portals', 'Hackathons', 'Cognitive Tests'],
    related: ['bulk-hiring', 'permanent-staffing', 'dedicated-teams']
  },
  'recruitment-process-outsourcing': {
    categoryId: 'talent-solutions',
    enName: 'RPO (Recruitment Process Outsourcing)',
    esName: 'RPO (Tercerización del Proceso de Reclutamiento)',
    tech: ['Full Lifecycle ATS', 'Talent CRM', 'Metrics Dashboards'],
    related: ['permanent-staffing', 'bulk-hiring', 'executive-search']
  },
  'staff-augmentation': {
    categoryId: 'talent-solutions',
    enName: 'Staff Augmentation',
    esName: 'Aumento de Personal',
    tech: ['Next.js SREs', 'Cloud Specialists', 'Data Engineers'],
    related: ['dedicated-teams', 'contract-staffing', 'offshore-development-center']
  },
  'dedicated-teams': {
    categoryId: 'talent-solutions',
    enName: 'Dedicated Teams',
    esName: 'Equipos Dedicados',
    tech: ['Scrum Frameworks', 'Jira Boards', 'GitHub Workflows'],
    related: ['staff-augmentation', 'offshore-development-center', 'contract-staffing']
  },
  'offshore-development-center': {
    categoryId: 'talent-solutions',
    enName: 'Offshore Development Center',
    esName: 'Centro de Desarrollo Offshore',
    tech: ['Virtual Office Teams', 'Secure SD-WAN', 'Agile Operations'],
    related: ['dedicated-teams', 'staff-augmentation', 'contract-staffing']
  },

  // Digital Transformation
  'business-process-automation': {
    categoryId: 'digital-transformation',
    enName: 'Business Process Automation',
    esName: 'Automatización de Procesos de Negocio',
    tech: ['n8n', 'Zapier', 'Python Scripts', 'Make.com'],
    related: ['digital-transformation-consulting', 'process-optimization', 'paperless-office']
  },
  'digital-transformation-consulting': {
    categoryId: 'digital-transformation',
    enName: 'Digital Transformation Consulting',
    esName: 'Consultoría de Transformación Digital',
    tech: ['Value Stream Map', 'Cloud Integration', 'Change Management'],
    related: ['business-process-automation', 'digital-strategy', 'legacy-modernization-dt']
  },
  'legacy-modernization-dt': {
    categoryId: 'digital-transformation',
    enName: 'Legacy Modernization',
    esName: 'Modernización de Sistemas Legados',
    tech: ['Docker', 'AWS', 'Next.js', 'REST APIs'],
    related: ['digital-transformation-consulting', 'process-optimization', 'digital-strategy']
  },
  'digital-strategy': {
    categoryId: 'digital-transformation',
    enName: 'Digital Strategy',
    esName: 'Estrategia Digital',
    tech: ['Maturity Assessment', 'Architecture Blueprint', 'ROI Forecasting'],
    related: ['digital-transformation-consulting', 'legacy-modernization-dt', 'process-optimization']
  },
  'process-optimization': {
    categoryId: 'digital-transformation',
    enName: 'Process Optimization',
    esName: 'Optimización de Procesos',
    tech: ['n8n', 'Python scripts', 'Data Analytics', 'BI Dashboards'],
    related: ['business-process-automation', 'digital-transformation-consulting', 'paperless-office']
  },
  'paperless-office': {
    categoryId: 'digital-transformation',
    enName: 'Paperless Office',
    esName: 'Oficina sin Papel',
    tech: ['Google Document AI', 'Cloud Storage', 'OCR Engines', 'PDF APIs'],
    related: ['business-process-automation', 'process-optimization', 'digital-strategy']
  },

  // Data & Analytics
  'power-bi-dashboards': {
    categoryId: 'data-analytics',
    enName: 'Power BI',
    esName: 'Power BI',
    tech: ['Power BI', 'DAX', 'SQL Server', 'Power Query'],
    related: ['tableau-dashboards', 'business-intelligence', 'data-visualization']
  },
  'tableau-dashboards': {
    categoryId: 'data-analytics',
    enName: 'Tableau',
    esName: 'Tableau',
    tech: ['Tableau Desktop', 'Tableau Server', 'SQL', 'Python'],
    related: ['power-bi-dashboards', 'business-intelligence', 'data-visualization']
  },
  'data-warehousing': {
    categoryId: 'data-analytics',
    enName: 'Data Warehousing',
    esName: 'Almacenamiento de Datos',
    tech: ['Snowflake', 'BigQuery', 'Amazon Redshift', 'dbt'],
    related: ['etl-pipelines', 'business-intelligence', 'power-bi-dashboards']
  },
  'etl-pipelines': {
    categoryId: 'data-analytics',
    enName: 'ETL Pipelines',
    esName: 'Canalizaciones ETL',
    tech: ['Apache Airflow', 'dbt', 'Python', 'Fivetran'],
    related: ['data-warehousing', 'business-intelligence', 'data-visualization']
  },
  'business-intelligence': {
    categoryId: 'data-analytics',
    enName: 'Business Intelligence',
    esName: 'Inteligencia de Negocios',
    tech: ['Power BI', 'Tableau', 'Looker', 'SQL Server'],
    related: ['power-bi-dashboards', 'data-warehousing', 'data-visualization']
  },
  'data-visualization': {
    categoryId: 'data-analytics',
    enName: 'Data Visualization',
    esName: 'Visualización de Datos',
    tech: ['D3.js', 'Tableau', 'Power BI', 'Python Matplotlib'],
    related: ['business-intelligence', 'predictive-analytics', 'power-bi-dashboards']
  },
  'predictive-analytics': {
    categoryId: 'data-analytics',
    enName: 'Predictive Analytics',
    esName: 'Analítica Predictiva',
    tech: ['Python', 'R', 'TensorFlow', 'Apache Spark'],
    related: ['data-visualization', 'business-intelligence', 'data-warehousing']
  },

  // Cybersecurity
  'security-assessment': {
    categoryId: 'cybersecurity',
    enName: 'Security Assessment',
    esName: 'Evaluación de Seguridad',
    tech: ['Kali Linux', 'Nmap', 'Nessus', 'Wireshark'],
    related: ['vulnerability-assessment', 'penetration-testing', 'security-audits']
  },
  'vulnerability-assessment': {
    categoryId: 'cybersecurity',
    enName: 'Vulnerability Assessment',
    esName: 'Evaluación de Vulnerabilidades',
    tech: ['Nessus', 'Qualys', 'OpenVAS', 'Nmap'],
    related: ['security-assessment', 'penetration-testing', 'compliance-consulting']
  },
  'penetration-testing': {
    categoryId: 'cybersecurity',
    enName: 'Penetration Testing',
    esName: 'Pruebas de Penetración',
    tech: ['Burp Suite', 'Metasploit', 'OWASP ZAP', 'Kali Linux'],
    related: ['security-assessment', 'vulnerability-assessment', 'security-audits']
  },
  'security-audits': {
    categoryId: 'cybersecurity',
    enName: 'Security Audits',
    esName: 'Auditorías de Seguridad',
    tech: ['SOC 2 Compliance', 'ISO 27001', 'HIPAA Mapping', 'Audit Checklists'],
    related: ['penetration-testing', 'compliance-consulting', 'identity-access-management']
  },
  'compliance-consulting': {
    categoryId: 'cybersecurity',
    enName: 'Compliance Consulting',
    esName: 'Consultoría de Cumplimiento',
    tech: ['SOC 2 Audits', 'HIPAA Mapping', 'GDPR Verification', 'ISO 27001'],
    related: ['security-audits', 'identity-access-management', 'vulnerability-assessment']
  },
  'identity-access-management': {
    categoryId: 'cybersecurity',
    enName: 'Identity & Access Management',
    esName: 'Gestión de Identidades y Accesos',
    tech: ['Okta', 'Auth0', 'AWS IAM', 'Azure Active Directory'],
    related: ['security-audits', 'compliance-consulting', 'security-assessment']
  },

  // UI / UX Design
  'ui-design': {
    categoryId: 'ui-ux-design',
    enName: 'UI Design',
    esName: 'Diseño de Interfaz de Usuario (UI)',
    tech: ['Figma', 'Adobe XD', 'Sketch', 'TailwindCSS'],
    related: ['ux-research', 'wireframing', 'design-systems']
  },
  'ux-research': {
    categoryId: 'ui-ux-design',
    enName: 'UX Research',
    esName: 'Investigación de Experiencia de Usuario (UX)',
    tech: ['Hotjar', 'UserTesting', 'Maze', 'Figma prototypes'],
    related: ['ui-design', 'wireframing', 'prototyping']
  },
  'wireframing': {
    categoryId: 'ui-ux-design',
    enName: 'Wireframing',
    esName: 'Estructuración de Wireframes',
    tech: ['Balsamiq', 'Figma', 'Sketch', 'Miro'],
    related: ['ui-design', 'ux-research', 'prototyping']
  },
  'prototyping': {
    categoryId: 'ui-ux-design',
    enName: 'Prototyping',
    esName: 'Creación de Prototipos',
    tech: ['Figma interactive', 'InVision', 'Proto.io', 'Framer'],
    related: ['ui-design', 'wireframing', 'design-systems']
  },
  'design-systems': {
    categoryId: 'ui-ux-design',
    enName: 'Design Systems',
    esName: 'Sistemas de Diseño',
    tech: ['Figma variables', 'Storybook', 'Tailwind tokens', 'Tokens Studio'],
    related: ['ui-design', 'prototyping', 'product-design']
  },
  'product-design': {
    categoryId: 'ui-ux-design',
    enName: 'Product Design',
    esName: 'Diseño de Producto',
    tech: ['Figma', 'UX Research', 'Design Systems', 'Product Strategy'],
    related: ['design-systems', 'branding', 'ui-design']
  },
  'branding': {
    categoryId: 'ui-ux-design',
    enName: 'Branding',
    esName: 'Desarrollo de Marca',
    tech: ['Adobe Illustrator', 'Brand Guidelines', 'Logo Design', 'Vector tools'],
    related: ['product-design', 'ui-design', 'seo-optimization']
  },

  // Digital Marketing
  'seo-optimization': {
    categoryId: 'digital-marketing',
    enName: 'SEO',
    esName: 'SEO',
    tech: ['SEMrush', 'Ahrefs', 'Google Search Console', 'Screaming Frog'],
    related: ['local-seo', 'content-marketing', 'conversion-rate-optimization']
  },
  'local-seo': {
    categoryId: 'digital-marketing',
    enName: 'Local SEO',
    esName: 'SEO Local',
    tech: ['Google Business Profile', 'BrightLocal', 'Yext', 'SEMrush'],
    related: ['seo-optimization', 'google-ads', 'social-media-marketing']
  },
  'google-ads': {
    categoryId: 'digital-marketing',
    enName: 'Google Ads',
    esName: 'Google Ads',
    tech: ['Google Ads dashboard', 'Google Tag Manager', 'Keyword Planner', 'GA4'],
    related: ['seo-optimization', 'linkedin-marketing', 'conversion-rate-optimization']
  },
  'social-media-marketing': {
    categoryId: 'digital-marketing',
    enName: 'Social Media Marketing',
    esName: 'Marketing en Redes Sociales',
    tech: ['Meta Business Suite', 'Buffer', 'Hootsuite', 'Canva'],
    related: ['content-marketing', 'linkedin-marketing', 'email-marketing']
  },
  'linkedin-marketing': {
    categoryId: 'digital-marketing',
    enName: 'LinkedIn Marketing',
    esName: 'Marketing en LinkedIn',
    tech: ['LinkedIn Campaign Manager', 'LinkedIn Sales Navigator', 'GA4', 'AeroLeads'],
    related: ['google-ads', 'social-media-marketing', 'content-marketing']
  },
  'content-marketing': {
    categoryId: 'digital-marketing',
    enName: 'Content Marketing',
    esName: 'Marketing de Contenidos',
    tech: ['WordPress', 'SEO tools', 'Copy.ai', 'Semrush'],
    related: ['seo-optimization', 'social-media-marketing', 'email-marketing']
  },
  'email-marketing': {
    categoryId: 'digital-marketing',
    enName: 'Email Marketing',
    esName: 'Marketing por Correo Electrónico',
    tech: ['Klaviyo', 'Mailchimp', 'HubSpot', 'ActiveCampaign'],
    related: ['content-marketing', 'conversion-rate-optimization', 'shopify-development']
  },
  'conversion-rate-optimization': {
    categoryId: 'digital-marketing',
    enName: 'CRO',
    esName: 'CRO (Optimización de Conversión)',
    tech: ['Hotjar', 'Google Optimize', 'VWO', 'GA4'],
    related: ['seo-optimization', 'google-ads', 'email-marketing']
  },

  // Ecommerce
  'shopify-development': {
    categoryId: 'ecommerce',
    enName: 'Shopify',
    esName: 'Shopify',
    tech: ['Shopify Liquid', 'Hydrogen', 'Stripe', 'Klaviyo'],
    related: ['woocommerce-development', 'payment-gateway-integration', 'order-management-systems']
  },
  'woocommerce-development': {
    categoryId: 'ecommerce',
    enName: 'WooCommerce',
    esName: 'WooCommerce',
    tech: ['WordPress', 'WooCommerce API', 'Stripe', 'PHP'],
    related: ['shopify-development', 'payment-gateway-integration', 'marketplace-development-ecommerce']
  },
  'magento-development': {
    categoryId: 'ecommerce',
    enName: 'Magento',
    esName: 'Magento',
    tech: ['Magento 2', 'PHP', 'MySQL', 'Elasticsearch'],
    related: ['shopify-development', 'marketplace-development-ecommerce', 'order-management-systems']
  },
  'payment-gateway-integration': {
    categoryId: 'ecommerce',
    enName: 'Payment Gateway',
    esName: 'Pasarelas de Pago',
    tech: ['Stripe API', 'PayPal SDK', 'Adyen', 'Authorize.Net'],
    related: ['shopify-development', 'woocommerce-development', 'order-management-systems']
  },
  'marketplace-development-ecommerce': {
    categoryId: 'ecommerce',
    enName: 'Marketplace Development',
    esName: 'Desarrollo de Marketplaces',
    tech: ['Next.js', 'Stripe Connect', 'PostgreSQL', 'Node.js'],
    related: ['shopify-development', 'woocommerce-development', 'magento-development']
  },
  'order-management-systems': {
    categoryId: 'ecommerce',
    enName: 'Order Management',
    esName: 'Sistemas de Gestión de Pedidos',
    tech: ['Node.js', 'PostgreSQL', 'AWS', 'ERP API integrations'],
    related: ['shopify-development', 'payment-gateway-integration', 'magento-development']
  },

  // Consulting
  'technology-consulting': {
    categoryId: 'technology-consulting',
    enName: 'Technology Consulting',
    esName: 'Consultoría Tecnológica',
    tech: ['Architecture Blueprints', 'Tech Audit Reports', 'System Diagrams'],
    related: ['ai-strategy', 'cto-as-a-service', 'software-architecture']
  },
  'ai-strategy': {
    categoryId: 'technology-consulting',
    enName: 'AI Strategy',
    esName: 'Estrategia de IA',
    tech: ['LLM Vetting', 'AI Feasibility Audits', 'Prompt Engineering Frameworks'],
    related: ['technology-consulting', 'cto-as-a-service', 'ai-consulting']
  },
  'cto-as-a-service': {
    categoryId: 'technology-consulting',
    enName: 'CTO as a Service',
    esName: 'CTO como Servicio',
    tech: ['Tech Stack Vetting', 'Agile Roadmaps', 'Security Audits'],
    related: ['technology-consulting', 'startup-consulting', 'software-architecture']
  },
  'startup-consulting': {
    categoryId: 'technology-consulting',
    enName: 'Startup Consulting',
    esName: 'Consultoría para Startups',
    tech: ['MVP Blueprinting', 'Architecture Consulting', 'SaaS setup'],
    related: ['cto-as-a-service', 'product-consulting', 'technology-consulting']
  },
  'product-consulting': {
    categoryId: 'technology-consulting',
    enName: 'Product Consulting',
    esName: 'Consultoría de Producto',
    tech: ['Figma Prototypes', 'Roadmaps', 'Jira alignment'],
    related: ['startup-consulting', 'software-architecture', 'cto-as-a-service']
  },
  'software-architecture': {
    categoryId: 'technology-consulting',
    enName: 'Software Architecture',
    esName: 'Arquitectura de Software',
    tech: ['System Blueprints', 'AWS/Azure Diagrams', 'UML Modeling'],
    related: ['technology-consulting', 'cto-as-a-service', 'product-consulting']
  }
};

// Map old slugs to their standard counterparts in SERVICE_REGISTRY
export const ALIAS_MAP: Record<string, string> = {
  'business-intelligence-consulting': 'business-intelligence',
  'data-analytics-services': 'predictive-analytics',
  'data-engineering-solutions': 'etl-pipelines',
  'data-warehousing-services': 'data-warehousing',
  'it-staffing-solutions': 'permanent-staffing',
  'staff-augmentation-services': 'staff-augmentation',
  'web-development-services': 'corporate-websites'
};

// Localized images mapping
export const CATEGORY_HERO_IMAGES: Record<string, string> = {
  'ai-automation': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1600',
  'software-development': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600',
  'web-development': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1600',
  'mobile-development': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600',
  'cloud-devops': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600',
  'talent-solutions': 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1600',
  'digital-transformation': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600',
  'data-analytics': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600',
  'cybersecurity': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1600',
  'ui-ux-design': 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1600',
  'digital-marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600',
  'ecommerce': 'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?q=80&w=1600',
  'technology-consulting': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600'
};

// Localized Timeline steps descriptions per category
const TIMELINE_TEMPLATES: Record<string, { steps: Array<{ titleEn: string; descEn: string; titleEs: string; descEs: string }> }> = {
  'ai-automation': {
    steps: [
      { titleEn: 'Discovery & Audit', descEn: 'We examine your business workflows, data sources, and repetitive processes to identify optimal AI opportunities.', titleEs: 'Descubrimiento y Auditoría', descEs: 'Examinamos sus flujos de trabajo de negocio, fuentes de datos y procesos repetitivos para identificar oportunidades óptimas de IA.' },
      { titleEn: 'Pipeline Strategy', descEn: 'Design security guardrails, data filtering methods, latency SLAs, and choose appropriate LLM systems.', titleEs: 'Estrategia de Canalización', descEs: 'Diseñar salvaguardas de seguridad, métodos de filtrado de datos, SLA de latencia y elegir los sistemas LLM adecuados.' },
      { titleEn: 'Context Engineering', descEn: 'Architect vector databases, document processing pipelines, prompt blueprints, and semantic indexes (RAG).', titleEs: 'Ingeniería de Contexto', descEs: 'Diseñar bases de datos vectoriales, canales de procesamiento de documentos, esquemas de prompts e índices semánticos (RAG).' },
      { titleEn: 'Agent Development', descEn: 'Build agentic logic flows, connect tools, register databases, and implement conversational UI modules.', titleEs: 'Desarrollo de Agentes', descEs: 'Construir flujos de lógica de agentes, conectar herramientas, registrar bases de datos e implementar módulos de interfaz conversacional.' },
      { titleEn: 'Model Testing & Red-Teaming', descEn: 'Rigorous validation of agent behaviors, guardrail checks, hallucinations tests, and system stress runs.', titleEs: 'Pruebas y Red-Teaming', descEs: 'Validación rigurosa del comportamiento de los agentes, verificación de salvaguardas, pruebas de alucinaciones y ejecución de estrés.' },
      { titleEn: 'Enterprise Launch', descEn: 'Roll out secure endpoints, configure role-based access, and sync telemetry loggers.', titleEs: 'Lanzamiento Empresarial', descEs: 'Desplegar endpoints seguros, configurar accesos basados en roles y sincronizar registradores de telemetría.' },
      { titleEn: 'SLA Support & Tuning', descEn: 'Continuous prompt tuning, model temperature adjustments, database updates, and live health metrics monitoring.', titleEs: 'Soporte y Ajuste Continuo', descEs: 'Ajuste continuo de prompts, control de temperaturas del modelo, actualizaciones de base de datos y monitoreo de métricas.' }
    ]
  },
  'software-development': {
    steps: [
      { titleEn: 'Requirements & Scoping', descEn: 'Collaborate with your stakeholders to outline business requirements, workflow dependencies, and user stories.', titleEs: 'Requisitos y Alcance', descEs: 'Colaborar con las partes interesadas para definir requisitos comerciales, dependencias de flujos y usuarios.' },
      { titleEn: 'System Architecture', descEn: 'Draft relational database schemas, select tech stack components, and map microservices diagrams.', titleEs: 'Arquitectura del Sistema', descEs: 'Diseñar esquemas de bases de datos relacionales, seleccionar tecnologías y planificar diagramas de microservicios.' },
      { titleEn: 'UX & Wireframing', descEn: 'Design interactive, responsive screen layouts, brand colors, navigation patterns, and mockups.', titleEs: 'Diseño UX y Wireframing', descEs: 'Diseñar interfaces de pantalla interactivas y adaptables, patrones de navegación y prototipos de prueba.' },
      { titleEn: 'Sprint Execution', descEn: 'Write robust, clean code in weekly sprints, utilizing type-safe architectures and testing suites.', titleEs: 'Ejecución de Sprints', descEs: 'Escribir código robusto y limpio en sprints semanales, utilizando arquitecturas seguras y pruebas automáticas.' },
      { titleEn: 'Integration Testing', descEn: 'Validate API endpoints, complete security audits, run unit tests, and perform end-to-end user checks.', titleEs: 'Pruebas de Integración', descEs: 'Validar endpoints de API, auditorías de seguridad, pruebas unitarias y validaciones de flujo de usuario.' },
      { titleEn: 'Production Deployment', descEn: 'Configure container configurations, manage databases, and trigger zero-downtime server launches.', titleEs: 'Despliegue de Producción', descEs: 'Configurar contenedores, migrar bases de datos y activar lanzamientos de servidores sin interrupciones.' },
      { titleEn: 'Maintenance & Upgrades', descEn: 'Ongoing patches, security reviews, feature releases, and scalability adjustments to match traffic volumes.', titleEs: 'Soporte y Actualizaciones', descEs: 'Actualizaciones continuas, parches de seguridad, lanzamientos de características y ajustes de escalado.' }
    ]
  }
};

// Catch-all default timeline if category timeline is not specified
const DEFAULT_TIMELINE = [
  { titleEn: 'Discovery', descEn: 'Deep discovery alignment sessions to scope project parameters, resource requests, and target milestones.', titleEs: 'Descubrimiento', descEs: 'Sesiones de descubrimiento profundo para definir parámetros del proyecto, recursos y objetivos clave.' },
  { titleEn: 'Planning', descEn: 'Align technology stack options, write specification manuals, and outline deployment architectures.', titleEs: 'Planificación', descEs: 'Alinear opciones de tecnologías, redactar manuales de especificación y esquematizar arquitecturas.' },
  { titleEn: 'Design', descEn: 'Figma mockups, interactive interface layouts, brand alignments, and user flows designs.', titleEs: 'Diseño', descEs: 'Prototipos en Figma, esquemas de interfaz interactiva, alineación de marca y flujos de usuario.' },
  { titleEn: 'Development', descEn: 'Clean coding, repository branching setup, backend API setups, and dashboard layouts construction.', titleEs: 'Desarrollo', descEs: 'Escritura de código limpio, configuración de ramas de repositorio, API backend y diseño de interfaces.' },
  { titleEn: 'Testing', descEn: 'Rigorous unit testing, QA reviews, security checks, and cross-browser responsiveness validations.', titleEs: 'Pruebas', descEs: 'Pruebas unitarias rigurosas, revisiones de control de calidad, análisis de seguridad y compatibilidad.' },
  { titleEn: 'Deployment', descEn: 'Configuring servers, containerization, DNS setup, and zero-downtime production deployment.', titleEs: 'Despliegue', descEs: 'Configuración de servidores, contenedores, ajustes de DNS y despliegue en producción sin interrupciones.' },
  { titleEn: 'Support', descEn: 'Ongoing maintenance, error logs monitoring, database indexing, and feature updates iterations.', titleEs: 'Soporte', descEs: 'Mantenimiento continuo, monitoreo de registros de errores, indexación de bases de datos y actualizaciones.' }
];

export function getServiceDetails(slug: string, locale: string): any {
  // Resolve alias
  const targetSlug = ALIAS_MAP[slug] || slug;
  const service = SERVICE_REGISTRY[targetSlug];

  if (!service) {
    return null;
  }

  const isEs = locale === 'es';
  const categoryId = service.categoryId;
  const categoryLabel = CATEGORY_NAMES[categoryId] ? CATEGORY_NAMES[categoryId][isEs ? 'es' : 'en'] : 'Solutions';

  const serviceName = isEs ? service.esName : service.enName;

  // Curated hero titles
  const title = serviceName;
  const titleHighlight = '';

  // Curated descriptions
  const description = isEs 
    ? `Implemente soluciones avanzadas de ${serviceName.toLowerCase()} diseñadas para escalar su negocio, automatizar operaciones y maximizar su retorno de inversión.`
    : `Deploy advanced ${serviceName.toLowerCase()} solutions tailored to scale operations, automate processes, and drive measurable business ROI.`;

  const overviewTitle = isEs
    ? `Acelere su Crecimiento con ${serviceName}`
    : `Accelerate Growth with ${serviceName}`;

  const overviewP1 = isEs
    ? `En el panorama tecnológico moderno, las organizaciones de nivel empresarial requieren ${serviceName.toLowerCase()} robusto para mantener su ventaja competitiva. Los enfoques fragmentados y las herramientas heredadas crean latencia operativa e ineficiencias críticas. El equipo de ingenieros de HyperCode une la experiencia práctica y la tecnología de punta para diseñar sistemas alineados con sus necesidades.`
    : `In the modern technological landscape, enterprise organizations require robust ${serviceName.toLowerCase()} to sustain a strong competitive advantage. Legacy approaches and manual workflows lead to high operational latency and critical bottlenecks. HyperCode's engineering team bridges the gap between complex infrastructures and your target business milestones.`;

  const overviewP2 = isEs
    ? `Nuestros consultores y arquitectos certificados colaboran estrechamente con sus equipos de operaciones e ingeniería. Construimos soluciones utilizando metodologías provistas que aseguran sub-segundos de latencia, seguridad de grado corporativo, y un control de costos eficiente. Nos encargamos de todo el ciclo de vida, desde el descubrimiento hasta el soporte en producción.`
    : `Our certified architects and engineers work closely with your operations teams. We implement systems utilizing proven development frameworks that ensure sub-second response times, enterprise-grade data security, and efficient infrastructure overhead control. We handle the entire lifecycle from discovery through production deployment.`;

  // Curated Features
  const features = isEs ? [
    { title: `Estrategia de ${serviceName}`, desc: `Definición de objetivos, análisis de brechas técnicas y diseño de hojas de ruta de implementación corporativa.` },
    { title: `Integración sin Costuras`, desc: `Conecte de forma segura con sus API existentes, ERP, CRM y bases de datos locales sin interrumpir su operación.` },
    { title: `Monitoreo y Telemetría`, desc: `Paneles interactivos y alertas en tiempo real para rastrear la salud del sistema, rendimiento y consultas activas.` },
    { title: `Soporte y Optimización`, desc: `Acuerdos de nivel de servicio (SLA) dedicados, parches de seguridad automatizados y actualizaciones periódicas.` }
  ] : [
    { title: `${serviceName} Strategy`, desc: `Align execution blueprints with your business KPIs, mapping technical gaps and roadmap milestones.` },
    { title: `Seamless Integration`, desc: `Securely connect custom system engines with your active APIs, ERP, CRM, and cloud storage systems.` },
    { title: `Live Observability`, desc: `Real-time health telemetry dashboards and automated alerting to track latency, usage patterns, and load spikes.` },
    { title: `SLA Maintenance`, desc: `Dedicated production support SLA, automated patch application, and ongoing software optimization reviews.` }
  ];

  // Curated Benefits
  const benefits = isEs ? [
    { title: 'Retorno de Inversión (ROI)', desc: 'Reducción de costos de infraestructura y optimización del gasto en desarrollo por sprint.' },
    { title: 'Escalabilidad Elástica', desc: 'Sistemas diseñados con microservicios para procesar cargas de tráfico impredecibles sin latencia.' },
    { title: 'Seguridad y Cumplimiento', desc: 'Aislamiento de bases de datos, auditorías SOC 2 y cifrado de datos TLS de extremo a extremo.' },
    { title: 'Eficiencia Operativa', desc: 'Automatización de tareas repetitivas para liberar el ancho de banda del equipo interno.' }
  ] : [
    { title: 'Measurable ROI', desc: 'Optimize resource overhead and reduce software development lifecycles in every sprint.' },
    { title: 'Elastic Scalability', desc: 'Microservices architectures designed to auto-scale dynamically during high traffic surges.' },
    { title: 'Compliance & Security', desc: 'Strict column-level data masking, SOC 2 compliance readiness, and TLS data encryption.' },
    { title: 'Operational Efficiency', desc: 'Automate manual repetitive developer tasks, saving significant engineering cycles.' }
  ];

  // Process Timeline
  const timelineData = TIMELINE_TEMPLATES[categoryId] || TIMELINE_TEMPLATES['software-development'] || { steps: DEFAULT_TIMELINE };
  const timeline = timelineData.steps.map(s => ({
    title: isEs ? s.titleEs : s.titleEn,
    desc: isEs ? s.descEs : s.descEn
  }));

  // Curated Technologies mapping based on registry or category defaults
  const technologies = service.tech.map(name => {
    let role = 'Platform integration';
    if (name.includes('React') || name.includes('Next.js') || name.includes('Tailwind')) {
      role = isEs ? 'Desarrollo Frontend e Interfaz' : 'Frontend UI & client-side rendering';
    } else if (name.includes('Node') || name.includes('FastAPI') || name.includes('Express') || name.includes('PHP')) {
      role = isEs ? 'Lógica Backend e Integración de API' : 'Backend APIs & logic processing';
    } else if (name.includes('AWS') || name.includes('Azure') || name.includes('GCP') || name.includes('Cloud')) {
      role = isEs ? 'Alojamiento en Nube Segura' : 'Secure cloud architecture hosting';
    } else if (name.includes('Docker') || name.includes('Kubernetes') || name.includes('Terraform')) {
      role = isEs ? 'Orquestación e Infraestructura' : 'IaC Deployment & orchestration';
    } else if (name.includes('PostgreSQL') || name.includes('MongoDB') || name.includes('Snowflake') || name.includes('BigQuery')) {
      role = isEs ? 'Almacén de Datos y Consultas' : 'Structured query database storage';
    } else if (name.includes('OpenAI') || name.includes('GPT') || name.includes('Claude') || name.includes('HuggingFace') || name.includes('LangChain')) {
      role = isEs ? 'Modelos de Lenguaje e IA' : 'LLM Orchestration & prompt processing';
    }
    return { name, role };
  });

  // Industries served
  const industries = [
    isEs ? 'Salud' : 'Healthcare',
    isEs ? 'Finanzas' : 'Finance',
    isEs ? 'Comercio Minorista' : 'Retail',
    isEs ? 'Manufactura' : 'Manufacturing',
    isEs ? 'Tecnología' : 'Technology',
    isEs ? 'Logística' : 'Logistics'
  ];

  // Related services
  const relatedServices = service.related.map(relSlug => {
    const relService = SERVICE_REGISTRY[relSlug];
    return {
      name: relService ? (isEs ? relService.esName : relService.enName) : relSlug,
      slug: relSlug
    };
  });

  // FAQs
  const faqs = isEs ? [
    { q: `¿Qué es el servicio de ${serviceName}?`, a: `El servicio de ${serviceName.toLowerCase()} de HyperCode consiste en consultoría y desarrollo a medida utilizando metodologías ágiles de nivel empresarial. Diseñamos soluciones personalizadas que se alinean exactamente con los requerimientos operativos de su negocio.` },
    { q: `¿Cómo garantiza HyperCode la seguridad en ${serviceName}?`, a: `La seguridad es un pilar fundamental en todos nuestros proyectos. Implementamos cifrado de datos SSL/TLS en reposo y en tránsito, control de acceso basado en roles (RBAC) y alineamos la arquitectura con certificaciones como SOC 2, HIPAA y GDPR.` },
    { q: `¿Cuánto tiempo toma la implementación de ${serviceName}?`, a: `El cronograma de entrega varía según el alcance y la complejidad, oscilando típicamente entre 4 y 12 semanas. Estructuramos el trabajo en sprints de 2 semanas para garantizar una visibilidad total y entregables verificados de forma continua.` },
    { q: `¿Qué tecnologías se utilizan en las soluciones de ${serviceName}?`, a: `Utilizamos tecnologías líderes en el mercado como ${service.tech.slice(0, 3).join(', ')} y otras herramientas de primer nivel. Seleccionamos el stack óptimo basado en la infraestructura existente de su empresa y sus planes de crecimiento.` },
    { q: `¿Se integra ${serviceName} con nuestros sistemas CRM/ERP actuales?`, a: `Sí, todas nuestras soluciones de software se diseñan con capacidades avanzadas de integración. Conectamos bases de datos y motores a través de APIs RESTful o GraphQL seguras con plataformas como SAP, Salesforce, Workday u otros desarrollos propietarios.` },
    { q: `¿Ofrecen soporte después del lanzamiento del proyecto?`, a: `Absolutamente. Proporcionamos soporte post-lanzamiento dedicado bajo acuerdos de nivel de servicio (SLA) para resolver incidentes rápidamente, aplicar parches de seguridad, monitorear la salud de los servidores e implementar actualizaciones de características.` },
    { q: `¿Cómo estructuran las tarifas de consultoría de ${serviceName}?`, a: `Ofrecemos modelos de contratación flexibles que se adaptan a su presupuesto y alcance, incluyendo presupuestos fijos basados en hitos o recursos dedicados en modalidad de tiempo y materiales.` },
    { q: `¿Cuál es el siguiente paso para iniciar con ${serviceName}?`, a: `El primer paso es hacer clic en 'Programar Consulta' para reservar una reunión de descubrimiento técnico de 30 minutos sin costo con nuestros directores de práctica.` }
  ] : [
    { q: `What is HyperCode's ${serviceName} service?`, a: `Our ${serviceName.toLowerCase()} service involves bespoke consulting, systems architecture, and custom engineering. We specialize in building tailored blueprints that align with your operational processes and target goals.` },
    { q: `How does HyperCode ensure security in ${serviceName}?`, a: `Security is integrated into every phase of our delivery. We enforce TLS end-to-end data encryption, implement role-based access control (RBAC), and build layouts complying with SOC 2, HIPAA, and GDPR standards.` },
    { q: `How long does a typical ${serviceName} deployment take?`, a: `Delivery schedules range from 4 to 12 weeks depending on the technical scope. We leverage Agile development loops with 2-week sprints, ensuring you get continuous visibility and verified outcomes.` },
    { q: `What stack components are used in ${serviceName} solutions?`, a: `We utilize modern framework integrations like ${service.tech.slice(0, 3).join(', ')} and other industry-leading platforms. We select the best technology to complement your active systems and scaling roadmap.` },
    { q: `Can ${serviceName} integrate with our active CRM or ERP systems?`, a: `Yes, all our platforms are engineered to connect. We build custom API hooks linking workflows with Salesforce, SAP, HubSpot, Workday, or proprietary legacy databases securely.` },
    { q: `Do you provide ongoing post-launch support and SLAs?`, a: `Yes. We provide dedicated post-launch support agreements (SLAs) covering server health monitoring, security audits, database query tuning, and progressive feature updates.` },
    { q: `What are your project billing structures for ${serviceName}?`, a: `We offer flexible billing models tailored to your requirements, including fixed-bid projects based on deliverables, or dedicated team placements on a time-and-materials basis.` },
    { q: `How do we initiate a ${serviceName} project with HyperCode?`, a: `Simply click the 'Schedule Consultation' button to book a 30-minute introductory meeting with our practice directors to discuss your business requirements.` }
  ];

  const heroImage = CATEGORY_HERO_IMAGES[categoryId] || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600';

  return {
    slug: targetSlug,
    categoryId,
    categoryLabel,
    title,
    titleHighlight,
    description,
    overviewTitle,
    overviewP1,
    overviewP2,
    keySolutionsLabel: isEs ? 'Características Clave' : 'Key Features',
    benefitsTitle: isEs ? 'Beneficios de Negocio' : 'Measurable Business Benefits',
    techTitle: isEs ? 'Ecosistema Tecnológico' : 'Technologies & Tools',
    ctaTitle: isEs ? '¿Listo para Construir su Solución?' : "Let's Build Your Solution",
    ctaDesc: isEs 
      ? 'Hable con nuestros directores de práctica hoy mismo para diseñar su plan de implementación a medida.'
      : 'Connect with our solutions directors today to structure a customized delivery roadmap for your enterprise.',
    ctaBtn: isEs ? 'Programar Consulta' : 'Schedule Consultation',
    features,
    benefits,
    timeline,
    technologies,
    industries,
    relatedServices,
    faqs,
    heroImage
  };
}
