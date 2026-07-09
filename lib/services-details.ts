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
  'software-development': 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1600',
  'web-development': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1600',
  'mobile-development': 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1600',
  'cloud-devops': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600',
  'talent-solutions': 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1600',
  'digital-transformation': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600',
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

const TAILORED_FAQS: Record<string, {
  en: Array<{ q: string; a: string }>;
  es: Array<{ q: string; a: string }>;
}> = {
  'ai-automation': {
    en: [
      { q: 'How does HyperCode ensure our AI initiatives deliver tangible business value?', a: 'We align every AI project with specific key performance indicators (KPIs), such as operational cost reduction, increased throughput, or improved customer satisfaction. Before writing code, our practice directors conduct a feasibility study and ROI projection. We focus on automating high-frequency, manual tasks and extracting insights from unstructured data, ensuring that your AI investments result in measurable efficiency gains and a clear path to profitability within the first fiscal year.' },
      { q: 'What does the implementation roadmap look like for an enterprise AI solution?', a: 'Our structured implementation process follows a four-phase model: Discovery, Prototyping, Integration, and Optimization. During discovery, we audit your existing data pipelines and workflows. We then build a proof-of-concept (POC) within 3–4 weeks to validate model accuracy and performance. Once approved, we integrate the solution into your production environment using secure API endpoints. Finally, we establish continuous monitoring and feedback loops to refine model performance and ensure long-term alignment with business needs.' },
      { q: 'How do you address data privacy and security concerns during model training and deployment?', a: 'We prioritize data security by adhering to strict enterprise standards, including SOC 2, HIPAA, and GDPR. All customer data remains isolated within your virtual private cloud (VPC) or local infrastructure; we do not use your proprietary data to train public models. We implement transport-layer security (TLS 1.3) for data in transit and AES-256 encryption at rest. Furthermore, we establish strict role-based access controls (RBAC) to ensure only authorized personnel can access sensitive information.' },
      { q: 'Can your AI models integrate seamlessly with our legacy systems and databases?', a: 'Yes. We design our AI solutions with a modular architecture, using RESTful APIs, GraphQL, and message brokers like Apache Kafka or RabbitMQ to integrate with existing legacy databases, ERP systems (such as SAP), and CRMs (like Salesforce). Our engineers conduct a thorough integration assessment during the discovery phase to identify potential compatibility bottlenecks, ensuring minimal disruption to your day-to-day operations and preserving the value of your historical data.' }
    ],
    es: [
      { q: '¿Cómo garantiza HyperCode que nuestras iniciativas de IA aporten un valor comercial tangible?', a: 'Alineamos cada proyecto de IA con indicadores clave de rendimiento (KPI) específicos, como la reducción de costos operativos, el aumento del rendimiento o la mejora de la satisfacción del cliente. Antes de desarrollar código, nuestros directores de práctica realizan un estudio de viabilidad y una proyección de ROI. Nos enfocamos en automatizar tareas manuales de alta frecuencia y extraer información de datos no estructurados, asegurando que sus inversiones en IA generen ganancias de eficiencia mensurables y un camino claro hacia la rentabilidad dentro del primer año fiscal.' },
      { q: '¿Cómo es la hoja de ruta de implementación para una solución de IA empresarial?', a: 'Nuestro proceso estructurado de implementación sigue un modelo de cuatro fases: Descubrimiento, Prototipado, Integración y Optimización. Durante el descubrimiento, auditamos sus flujos de trabajo y canalizaciones de datos existentes. Luego, construimos una prueba de concepto (POC) en 3 o 4 semanas para validar la precisión y el rendimiento del modelo. Una vez aprobada, integramos la solución en su entorno de producción utilizando endpoints de API seguros. Finalmente, establecemos monitoreo continuo y bucles de retroalimentación para perfeccionar el rendimiento del modelo.' },
      { q: '¿Cómo abordan las preocupaciones de privacidad y seguridad de datos durante el entrenamiento e implementación de modelos?', a: 'Priorizamos la seguridad de los datos adhiriéndonos a estrictos estándares empresariales, incluidos SOC 2, HIPAA y GDPR. Todos los datos de los clientes permanecen aislados dentro de su nube privada virtual (VPC) o infraestructura local; no utilizamos sus datos patentados para entrenar modelos públicos. Implementamos seguridad de capa de transporte (TLS 1.3) para datos en tránsito y cifrado AES-256 en reposo. Además, establecemos controles de acceso basados en roles (RBAC) para garantizar que solo el personal autorizado acceda a la información confidencial.' },
      { q: '¿Pueden sus modelos de IA integrarse sin problemas con nuestros sistemas y bases de datos heredados?', a: 'Sí. Diseñamos nuestras soluciones de IA con una arquitectura modular, utilizando APIs RESTful, GraphQL y agentes de mensajería como Apache Kafka o RabbitMQ para integrarse con bases de datos heredadas, sistemas ERP (como SAP) y CRM (como Salesforce). Nuestros ingenieros realizan una evaluación de integración de sistemas durante la fase de descubrimiento para garantizar que no haya interrupción en sus operaciones.' }
    ]
  },
  'business-intelligence': {
    en: [
      { q: 'To what extent can the business intelligence dashboards be customized for our organization?', a: 'We build fully customized BI dashboards tailored to the specific roles and reporting needs of your organization, from executive summary scorecards to deep-dive operational logs. We design visual components to align with your corporate branding and design guidelines. Our team works closely with your business analysts to define custom metrics, key performance indicators (KPIs), and intuitive layouts, ensuring that every user has immediate access to the actionable insights they need.' },
      { q: 'Can HyperCode consolidate data from multiple disparate sources into a single dashboard?', a: 'Yes, dashboard consolidation is a core strength of our BI practice. We integrate structured and unstructured data from diverse sources—including SQL databases, cloud data warehouses like Snowflake, ERPs, CRMs, flat files, and third-party SaaS APIs. Using robust ETL/ELT pipelines, we clean, transform, and map these data points into a unified data model, providing your leadership team with a single source of truth for accurate cross-departmental reporting.' },
      { q: 'What reporting options are available, and do you support automated distributions?', a: 'We implement comprehensive reporting capabilities, including real-time operational reports, historical trend analyses, interactive drill-downs, and self-service analytics models. To streamline communication, we configure automated report distribution schedules via email, Slack, or Microsoft Teams. This ensures that executive sponsors and operational teams receive automated weekly or monthly PDF reports, while push notifications alert key stakeholders when specific operational thresholds are breached.' },
      { q: 'How does your business intelligence solution improve executive decision-making?', a: 'By replacing manual spreadsheets with real-time, centralized dashboards, we eliminate information latency and human error. Our solutions provide your executive team with high-level visual summaries and the ability to drill down into root causes instantly. This visibility allows leadership to identify operational bottlenecks, detect market trends, allocate resources efficiently, and make proactive, data-driven decisions that directly improve margins and business outcomes.' }
    ],
    es: [
      { q: '¿Hasta qué punto se pueden personalizar los tableros de inteligencia de negocios para nuestra organización?', a: 'Desarrollamos tableros de BI completamente personalizados y adaptados a los roles específicos y las necesidades de reporte de su organización, desde resúmenes ejecutivos hasta registros operativos detallados. Diseñamos componentes visuales para alinear con su marca corporativa y pautas de diseño. Nuestro equipo trabaja con sus analistas para definir métricas e indicadores de rendimiento que garanticen el acceso a la información.' },
      { q: '¿Puede HyperCode consolidar datos de múltiples fuentes dispares en un solo tablero?', a: 'Sí, la consolidación de tableros es una fortaleza de nuestra práctica de BI. Integramos datos estructurados y no estructurados de diversas fuentes, incluyendo bases de datos SQL, almacenes de datos en la nube como Snowflake, ERP, CRM y APIs de SaaS de terceros. Mediante canalizaciones ETL/ELT robustas, limpiamos y transformamos estos puntos de datos en un modelo unificado para informes interdepartamentales.' },
      { q: '¿Qué opciones de informes están disponibles y admiten distribuciones automatizadas?', a: 'Implementamos capacidades de informes que incluyen reportes operativos en tiempo real, análisis de tendencias históricas e informes de autoservicio. Configuramos programas automatizados de distribución de informes por correo electrónico, Slack o Microsoft Teams. Esto garantiza que los patrocinadores ejecutivos y equipos operativos reciban informes PDF semanales o mensuales automáticos.' },
      { q: '¿Cómo mejora su solución de inteligencia de negocios la toma de decisiones ejecutivas?', a: 'Al reemplazar las hojas de cálculo manuales con tableros centralizados en tiempo real, eliminamos la latencia de la información y el error humano. Nuestras soluciones brindan a su equipo ejecutivo resúmenes visuales de alto nivel y la capacidad de profundizar en las causas de raíz al instante. Esta visibilidad permite a la dirección identificar cuellos de botella y tomar decisiones.' }
    ]
  },
  'data-analytics': {
    en: [
      { q: 'What types of data analytics services does HyperCode provide?', a: 'We offer a comprehensive suite of data analytics services categorized into descriptive, diagnostic, predictive, and prescriptive analytics. Our team analyzes historical data to explain what happened and why, builds predictive models using machine learning to forecast future trends, and engineers prescriptive analytics systems that recommend optimal business actions. This end-to-end service helps your organization transform raw data into a strategic business asset.' },
      { q: 'How do you handle poor data quality or incomplete historical datasets?', a: 'We address data quality challenges immediately during our initial discovery and data audit phase. Our data engineers implement automated cleaning, deduplication, and validation protocols to resolve inconsistencies. If historical datasets are incomplete, we employ statistical imputation methods and data enrichment techniques to fill gaps securely. We also help establish long-term data governance frameworks to ensure your team maintains high data quality moving forward.' },
      { q: 'What business applications can we build using your predictive analytics services?', a: 'Our predictive analytics services can be applied to a wide range of business use cases, including customer churn prediction, demand forecasting, inventory optimization, equipment predictive maintenance, and fraud detection. By training custom machine learning algorithms on your historical operation data, we help your business anticipate customer behaviors and operational challenges, allowing you to optimize resource allocation and mitigate risks before they impact your bottom line.' },
      { q: 'What is the typical timeline to deploy a production-ready analytics model?', a: 'A standard data analytics engagement takes between 6 and 14 weeks to deploy, depending on dataset complexity and integration requirements. The first 2–3 weeks are focused on data discovery, audits, and ingestion. We spend the following 4–6 weeks on feature engineering, model training, and validation. The final phase involves integrating the model into your production environment, building visualization dashboards, and training your team, ensuring a smooth handoff.' }
    ],
    es: [
      { q: '¿Qué tipos de servicios de analítica de datos proporciona HyperCode?', a: 'Ofrecemos una suite integral de servicios de analítica de datos categorizados en descriptiva, diagnóstica, predictiva y prescriptiva. Nuestro equipo analiza datos históricos para explicar qué sucedió y por qué, construye modelos predictivos utilizando aprendizaje automático para pronosticar tendencias y diseña sistemas prescriptivos que recomiendan acciones comerciales óptimas.' },
      { q: '¿Cómo manejan la mala calidad de los datos o los conjuntos de datos históricos incompletos?', a: 'Abordamos los desafíos de calidad de datos durante nuestra fase de descubrimiento y auditoría. Nuestros ingenieros implementan protocolos automatizados de limpieza y validación. Si los conjuntos de datos están incompletos, empleamos métodos de imputación estadística para llenar los vacíos y establecemos marcos de gobernanza a largo plazo.' },
      { q: '¿Qué aplicaciones comerciales podemos construir utilizando sus servicios de analítica predictiva?', a: 'Nuestros servicios predictivos se aplican a la predicción de fuga de clientes, pronóstico de demanda, optimización de inventario, mantenimiento predictivo de equipos y detección de fraudes. Al entrenar algoritmos con sus datos históricos de operación, ayudamos a su empresa a anticipar comportamientos y desafíos operativos para mitigar riesgos.' },
      { q: '¿Cuál es el cronograma típico para implementar un modelo de analítica listo para producción?', a: 'Un proyecto estándar de analítica de datos toma entre 6 y 14 semanas para su implementación, dependiendo de la complejidad y requisitos de integración. Las primeras semanas se centran en el descubrimiento e ingesta de datos. Luego realizamos la ingeniería de características y validación, antes de la integración final y capacitación de su equipo.' }
    ]
  },
  'software-development': {
    en: [
      { q: 'What is HyperCode\'s process for designing and engineering custom software?', a: 'We follow a disciplined, Agile-driven product development lifecycle. It begins with architectural discovery and user journey mapping, followed by rapid prototyping. We structure development into two-week sprints, providing you with working software demos at the end of each cycle. Our continuous integration and deployment (CI/CD) pipelines ensure code is tested, validated, and updated continuously, resulting in predictable delivery times and software that aligns precisely with your operations.' },
      { q: 'How do you select the appropriate technology stack for our custom software project?', a: 'We select technology stacks based on your existing infrastructure, scaling requirements, internal team skills, and long-term business goals. We avoid proprietary lock-ins, preferring modern, production-proven open-source and cloud-native frameworks such as React, Next.js, Node.js, C#/.NET, Python, and Java/Spring. Our architects evaluate licensing costs, cloud compute efficiency, and developer ecosystem support to recommend a balanced stack that optimizes performance and lifecycle costs.' },
      { q: 'How do you design custom software applications to handle high traffic and user growth?', a: 'We architect applications using microservices, containerization (Docker and Kubernetes), and elastic cloud-native infrastructure. By decoupling core application components, we ensure that individual services can scale independently without affecting the rest of the system. We implement distributed caching (such as Redis), database read-replicas, and content delivery networks (CDNs) to optimize response times, allowing your application to handle sudden traffic spikes and user growth seamlessly.' },
      { q: 'What post-launch maintenance and technical support options do you offer?', a: 'We offer comprehensive post-launch support and maintenance plans backed by service-level agreements (SLAs). Our services include 24/7 uptime monitoring, automated security patch application, bug resolution, database query optimization, and minor feature updates. We assign a dedicated delivery manager to your account, holding regular reviews to analyze performance metrics and recommend infrastructure optimizations to keep your software running efficiently.' }
    ],
    es: [
      { q: '¿Cuál es el proceso de HyperCode para diseñar y desarrollar software a medida?', a: 'Seguimos un ciclo de vida de desarrollo de productos ágil y disciplinado. Comienza con el descubrimiento arquitectónico y el mapeo del recorrido del usuario, seguido de un prototipado rápido. Estructuramos el desarrollo en sprints de dos semanas, proporcionándole demostraciones funcionales al final de cada ciclo. Nuestras canalizaciones de integración y despliegue continuos (CI/CD) garantizan que el código se pruebe y valide constantemente, logrando entregas predecibles.' },
      { q: '¿Cómo seleccionan el stack tecnológico adecuado para nuestro proyecto de software a medida?', a: 'Seleccionamos los stacks tecnológicos en función de su infraestructura existente, requisitos de escala, habilidades de su equipo interno y objetivos comerciales a largo plazo. Evitamos bloqueos propietarios, prefiriendo marcos de código abierto modernos y nativos de la nube probados en producción como React, Next.js, Node.js, C#/.NET, Python y Java/Spring. Evaluamos los costos de licencia, la eficiencia informática en la nube y el soporte del ecosistema.' },
      { q: '¿Cómo diseñan las aplicaciones de software a medida para manejar el alto tráfico y el crecimiento de usuarios?', a: 'Diseñamos aplicaciones utilizando microservicios, contenedorización (Docker y Kubernetes) e infraestructura elástica nativa de la nube. Al desacoplar los componentes principales, garantizamos que los servicios individuales escalen de forma independiente sin afectar al resto del sistema. Implementamos almacenamiento en caché distribuido (como Redis), réplicas de lectura de bases de datos y redes de distribución de contenido (CDN).' },
      { q: '¿Qué opciones de mantenimiento y soporte técnico continuo ofrecen después del lanzamiento?', a: 'Ofrecemos planes integrales de soporte y mantenimiento post-lanzamiento respaldados por acuerdos de nivel de servicio (SLA). Nuestros servicios incluyen monitoreo de disponibilidad las 24 horas, los 7 días de la semana, aplicación automatizada de parches de seguridad, resolución de errores, optimización de consultas de bases de datos y actualizaciones menores. Asignamos un gerente de entrega dedicado a su cuenta para revisiones periódicas.' }
    ]
  },
  'web-development': {
    en: [
      { q: 'How does HyperCode ensure our website delivers a premium experience across all devices?', a: 'We employ a mobile-first design methodology, engineering fluid responsive layouts using CSS Grid and Flexbox. Every interface is tested across a wide array of devices, screen sizes, and browser engines to guarantee consistent layout rendering, interactive responsiveness, and typographic readability. We focus on touch target sizes, dynamic navigation structures, and high-DPI image assets, ensuring mobile users enjoy the same high-performance, premium brand experience as desktop visitors.' },
      { q: 'What search engine optimization (SEO) practices do you implement during web development?', a: 'We build search engine optimization directly into the website\'s codebase. This includes optimizing semantic HTML5 structures, managing metadata dynamically, generating clean XML sitemaps, and structuring schema markup (JSON-LD) for rich search listings. We also focus on server-side rendering (SSR) or static site generation (SSG) with frameworks like Next.js to ensure fast page indexing, giving your enterprise website a solid technical foundation for search visibility and organic traffic growth.' },
      { q: 'Can you integrate custom web solutions with our existing content management systems?', a: 'Yes. We regularly connect custom frontends with leading content management systems (CMS) including headless platforms like Sanity, Contentful, or Strapi, as well as traditional environments like WordPress. We build secure API integrations and design custom editor layouts, enabling your marketing team to publish content independently. This separation of frontend layout from backend content management ensures maximum performance, security, and editing flexibility.' },
      { q: 'How do you optimize web applications to achieve maximum load speeds and high Core Web Vitals?', a: 'We optimize performance by focusing on Core Web Vitals, targeting high scores across Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS). Our practices include code splitting, asset optimization (WebP/AVIF formats), lazy loading, database query optimization, and globally distributed Content Delivery Network (CDN) caching. By minimizing main-thread execution and payload sizes, we ensure your website loads in under a second, improving user engagement and conversion rates.' }
    ],
    es: [
      { q: '¿Cómo garantiza HyperCode que nuestro sitio web ofrezca una experiencia premium en todos los dispositivos?', a: 'Empleamos una metodología de diseño móvil primero, desarrollando diseños responsivos fluidos utilizando CSS Grid y Flexbox. Cada interfaz se prueba en una amplia gama de dispositivos, tamaños de pantalla y motores de búsqueda para garantizar la coherencia del diseño, la capacidad de respuesta interactiva y la legibilidad tipográfica. Nos enfocamos en tamaños de objetivos táctiles, estructuras de navegación dinámicas y recursos de imagen de alta densidad.' },
      { q: '¿Qué prácticas de optimización de motores de búsqueda (SEO) implementan durante el desarrollo web?', a: 'Integramos la optimización de motores de búsqueda directamente en el código base del sitio web. Esto incluye optimizar estructuras HTML5 semánticas, administrar metadatos dinámicamente, generar mapas de sitio XML limpios y estructurar el marcado de esquema (JSON-LD) para listados enriquecidos. También nos enfocamos en la renderización del lado del servidor (SSR) o la generación de sitios estáticos (SSG) con Next.js.' },
      { q: '¿Pueden integrar soluciones web a medida con nuestros sistemas de gestión de contenidos existentes?', a: 'Sí. Conectamos regularmente frontends personalizados con sistemas de gestión de contenidos (CMS) líderes, incluyendo plataformas headless como Sanity, Contentful o Strapi, así como entornos tradicionales como WordPress. Creamos integraciones de API seguras y diseñamos interfaces de edición personalizadas, lo que permite a su equipo de marketing publicar contenido de forma independiente.' },
      { q: '¿Cómo optimizan las aplicaciones web para lograr velocidades máximas de carga y Core Web Vitals óptimos?', a: 'Optimizamos el rendimiento centrándonos en Core Web Vitals, apuntando a puntajes altos en Largest Contentful Paint (LCP) y Cumulative Layout Shift (CLS). Nuestras prácticas incluyen la división de código, la optimización de recursos (formatos WebP/AVIF), la carga diferida, la optimización de consultas de bases de datos y el almacenamiento en caché en redes de distribución de contenido (CDN).' }
    ]
  },
  'mobile-development': {
    en: [
      { q: 'Should our organization build a native app or a cross-platform mobile application?', a: 'The decision depends on your performance requirements, budget, and feature complexity. Native development (using Swift for iOS and Kotlin for Android) is ideal for resource-intensive apps, complex 3D rendering, or deep hardware integrations. For most business operations and SaaS products, cross-platform frameworks like React Native or Flutter offer native-like performance while reducing development costs and time-to-market by 40% through a single shared codebase.' },
      { q: 'What is the process for keeping our mobile applications updated after deployment?', a: 'Mobile apps require ongoing updates to maintain compatibility with new iOS and Android OS releases, resolve bugs, and introduce new features. We offer structured mobile maintenance programs that include SDK updates, security patches, third-party library maintenance, and minor UI updates. We also monitor crash logs and user analytics, ensuring that any production issues are identified and resolved before they impact the user experience.' },
      { q: 'How does HyperCode protect sensitive client data within our mobile apps?', a: 'We implement multi-layered security protocols across all mobile applications. This includes secure local storage using Keychain (iOS) and Keystore (Android), encrypting local databases, and enforcing HTTPS/TLS pinning for backend API communications. We also integrate multi-factor authentication (MFA), biometric login options (Face ID/Touch ID), and automated session timeouts, protecting your users\' sensitive information and complying with industry-specific security regulations.' },
      { q: 'Do you handle the submission and compliance process for Apple App Store and Google Play?', a: 'Yes, we manage the entire publishing lifecycle. Our team reviews your application against Apple\'s App Store Review Guidelines and Google Play policies to avoid common rejection triggers. We prepare metadata, screenshots, and privacy policy linkages, and configure store configurations (including in-app purchases and push notification certificates). We guide the app through the review process, addressing any feedback until your app is approved and live.' }
    ],
    es: [
      { q: '¿Debería nuestra organización crear una aplicación nativa o una aplicación móvil multiplataforma?', a: 'La decisión depende de sus requisitos de rendimiento, presupuesto y complejidad de las funciones. El desarrollo nativo (usando Swift para iOS y Kotlin para Android) es ideal para aplicaciones que requieren un uso intensivo de recursos, renderizado 3D complejo o integraciones profundas de hardware. Para la mayoría de los productos SaaS, React Native o Flutter ofrecen un rendimiento similar al nativo reduciendo costos.' },
      { q: '¿Cuál es el proceso para mantener actualizadas nuestras aplicaciones móviles después de la implementación?', a: 'Las aplicaciones móviles requieren actualizaciones constantes para mantener la compatibilidad con las nuevas versiones de los sistemas operativos iOS y Android, resolver errores e introducir nuevas funciones. Ofrecemos programas estructurados de mantenimiento móvil que incluyen actualizaciones de SDK, parches de seguridad, mantenimiento de bibliotecas de terceros y actualizaciones menores de la interfaz de usuario.' },
      { q: '¿Cómo protege HyperCode los datos confidenciales de los clientes dentro de nuestras aplicaciones móviles?', a: 'Implementamos protocolos de seguridad multicapa en todas las aplicaciones móviles. Esto incluye almacenamiento local seguro mediante Keychain (iOS) y Keystore (Android), cifrado de bases de datos locales y la aplicación de HTTPS/TLS pinning para las comunicaciones de la API del backend. También integramos autenticación multifactor (MFA), opciones de inicio de sesión biométrico y tiempos de espera de sesión.' },
      { q: '¿Se encargan del proceso de envío y cumplimiento para Apple App Store y Google Play Store?', a: 'Sí, gestionamos todo el ciclo de vida de publicación. Nuestro equipo revisa su aplicación de acuerdo con las directrices de Apple App Store y las políticas de Google Play para evitar rechazos comunes. Preparamos metadatos, capturas de pantalla y enlaces de políticas de privacidad, y configuramos la consola (incluyendo compras dentro de la aplicación y certificados de notificaciones).' }
    ]
  },
  'cloud-devops': {
    en: [
      { q: 'What strategy does HyperCode use to migrate legacy workloads to the cloud?', a: 'We utilize a structured migration framework tailored to your infrastructure needs: Rehost (lift-and-shift), Replatform, or Refactor. Our certified cloud architects conduct a detailed inventory audit to identify application dependencies. We then design a secure landing zone, establish data sync protocols, and execute migrations in phases. This minimizes downtime and ensures data integrity, resulting in a modern cloud infrastructure that improves operational resilience.' },
      { q: 'How does implementing a CI/CD pipeline benefit our engineering teams?', a: 'Implementing automated Continuous Integration and Continuous Deployment (CI/CD) pipelines eliminates manual deployment bottlenecks and reduces human error. We configure automated builds, unit tests, vulnerability scanning, and environment deployments using tools like GitHub Actions, GitLab CI, or Jenkins. This automation shortens release cycles, increases deployment frequency, and allows your engineering teams to deliver high-quality code updates to production with minimal operational risk.' },
      { q: 'How do you secure cloud environments and manage identity and access?', a: 'We design cloud environments using a Zero Trust architecture, implementing the principle of least privilege. We write Infrastructure as Code (IaC) templates using Terraform to ensure configuration consistency. We configure private networks, firewalls, and Security Information and Event Management (SIEM) systems. All access is controlled using multi-factor authentication (MFA) and single sign-on (SSO) integrations, while continuous threat detection tools monitor the environment for anomalies.' },
      { q: 'How does HyperCode help our business reduce and manage ongoing cloud compute costs?', a: 'We conduct comprehensive FinOps assessments to identify wasted cloud spend and compute inefficiencies. Our engineers configure auto-scaling rules, shut down unused resources, resize underutilized instances, and set up billing alerts. We also help your organization leverage discounted pricing models, such as reserved instances and savings plans. These practices regularly reduce our clients\' ongoing cloud hosting costs by 20% to 40% while maintaining high performance.' }
    ],
    es: [
      { q: '¿Qué estrategia utiliza HyperCode para migrar cargas de trabajo heredadas a la nube?', a: 'Utilizamos un marco de migración estructurado adaptado a sus necesidades: Rehost (lift-and-shift), Replatform o Refactor. Nuestros arquitectos de nube certificados realizan una auditoría de inventario detallada para identificar las dependencias de las aplicaciones. Luego diseñamos una zona de aterrizaje segura, establecemos protocolos de sincronización de datos y ejecutamos la migración por fases.' },
      { q: '¿Cómo beneficia la implementación de una canalización CI/CD a nuestros equipos de ingeniería?', a: 'La implementación de canalizaciones automatizadas de Integración Continua y Despliegue Continuo (CI/CD) elimina los cuellos de botella de los despliegues manuales y reduce el error humano. Configuramos compilaciones automatizadas, pruebas unitarias, escaneo de vulnerabilidades y despliegues de entornos utilizando herramientas como GitHub Actions, GitLab CI o Jenkins, acelerando los lanzamientos.' },
      { q: '¿Cómo aseguran los entornos en la nube y gestionan la identidad y el acceso?', a: 'Diseñamos entornos en la nube utilizando una arquitectura Zero Trust, implementando el principio de menor privilegio. Escribimos plantillas de Infraestructura como Código (IaC) con Terraform para garantizar la coherencia de la configuración. Configuramos redes privadas, firewalls y sistemas SIEM. Todo el acceso se controla mediante autenticación multifactor (MFA) e integraciones SSO.' },
      { q: '¿Cómo ayuda HyperCode a nuestra empresa a reducir y gestionar los costos continuos de computación en la nube?', a: 'Realizamos evaluaciones exhaustivas de FinOps para identificar gastos innecesarios de nube e ineficiencias informáticas. Nuestros ingenieros configuran reglas de escalado automático, apagan recursos no utilizados y configuran alertas de facturación. También ayudamos a su organización a aprovechar modelos de precios con descuento, reduciendo los costos de alojamiento continuo entre un 20% y un 40%.' }
    ]
  },
  'digital-transformation': {
    en: [
      { q: 'What key steps are involved in establishing a digital transformation roadmap?', a: 'A transformation roadmap starts with a comprehensive assessment of your business processes, legacy technologies, and culture. We identify operational bottlenecks and clarify growth goals. Our consultants then design a strategic roadmap that outlines the technical architecture, resource allocation, and project timelines. We prioritize high-impact initiatives first to deliver quick wins, ensuring that your digital investments build a scalable foundation for modern business growth.' },
      { q: 'How do you support change management to ensure adoption of new technology?', a: 'Technology adoption succeeds only when paired with structured change management. We work alongside your leadership team to design clear communication channels, address staff concerns, and align incentives. Our team provides role-based training programs, interactive documentation, and post-launch support. By involving stakeholders early in the project lifecycle, we reduce resistance, accelerate learning curves, and ensure your workforce adopts the new digital systems.' },
      { q: 'How do we measure and validate the return on investment of transformation projects?', a: 'We define key business metrics during the project alignment phase, establishing baseline values for operational costs, cycle times, or revenue conversion. As we implement new systems, we build analytics dashboards to monitor these performance indicators in real time. We compare post-launch data against your historical baselines, allowing your leadership team to validate ROI, calculate cost savings, and measure efficiency improvements across your business.' },
      { q: 'What does modernizing our business workflows mean for our competitive positioning?', a: 'Modernizing workflows replaces slow, paper-based, or legacy processes with automated cloud-native solutions. This modernization enables your organization to respond faster to market changes, improve customer satisfaction, and reduce operational errors. By freeing your employees from repetitive manual tasks, you allow them to focus on innovation and high-value strategic work, securing a stronger competitive advantage and positioning your business for long-term growth.' }
    ],
    es: [
      { q: '¿Qué pasos clave implica el establecimiento de una hoja de ruta de transformación digital?', a: 'Una hoja de ruta de transformación comienza con una evaluación integral de sus procesos de negocio, tecnologías heredadas y cultura. Identificamos los cuellos de botella operativos y aclaramos los objetivos de crecimiento. Nuestros consultores diseñan un plan estratégico que describe la arquitectura técnica, la asignación de recursos y los cronogramas, priorizando las iniciativas de alto impacto.' },
      { q: '¿Cómo apoyan la gestión del cambio para garantizar la adopción de nuevas tecnologías?', a: 'El éxito de la adopción tecnológica solo se logra si se combina con una gestión del cambio estructurada. Trabajamos junto a su equipo de liderazgo para diseñar canales de comunicación claros, abordar las inquietudes del personal y alinear incentivos. Proporcionamos programas de capacitación basados en roles, documentación interactiva y soporte post-lanzamiento para acelerar el aprendizaje.' },
      { q: '¿Cómo medimos y validamos el retorno de la inversión de los proyectos de transformación?', a: 'Definimos métricas comerciales clave durante la fase de alineación del proyecto, estableciendo valores de referencia para costos operativos, tiempos de ciclo o conversión de ingresos. A medida que implementamos nuevos sistemas, creamos tableros analíticos para monitorear estos indicadores en tiempo real y comparar los datos posteriores al lanzamiento con las líneas de base.' },
      { q: '¿Qué significa modernizar nuestros flujos de trabajo comerciales para nuestro posicionamiento competitivo?', a: 'Modernizar los flujos de trabajo reemplaza los procesos lentos o heredados con soluciones automatizadas nativas de la nube. Esta modernización permite a su organización responder más rápido a los cambios del mercado, mejorar la satisfacción del cliente y reducir errores. Al liberar a sus empleados de tareas repetitivas, les permite centrarse en el trabajo estratégico.' }
    ]
  },
  'enterprise-data-platforms': {
    en: [
      { q: 'How does HyperCode build and optimize enterprise data warehouses?', a: 'We engineer modern, cloud-based data warehouses utilizing leading architectures like Snowflake, Google BigQuery, or Amazon Redshift. Our practice engineers design clean schemas (star or snowflake schemas) optimized for high-speed analytical query performance. We implement efficient data partitioning, clustering, and materialized views, ensuring that your business intelligence tools can query petabytes of historical data with sub-second response times and minimal cloud compute costs.' },
      { q: 'How do you design data platforms to handle petabyte-scale data growth?', a: 'We build modern data platforms using decoupled compute and storage architectures. This decoupling ensures that your storage can grow infinitely at low cost, while compute clusters scale up or down dynamically to handle heavy analytical query workloads. We utilize distributed processing engines (such as Apache Spark) and modern table formats (like Apache Iceberg or Delta Lake), allowing your data platform to scale seamlessly as ingestion volumes grow.' },
      { q: 'What data governance and compliance controls do you integrate into the platform?', a: 'We integrate strict data governance, lineage tracking, and security controls into the platform architecture. We configure column-level and row-level access controls to protect sensitive data. We implement automatic data cataloging using platforms like Apache Atlas or dbt to maintain metadata and track data lineage. Our designs ensure compliance with privacy regulations (including GDPR, HIPAA, and SOC 2) by masking personally identifiable information (PII) at the ingestion layer.' },
      { q: 'Can the enterprise data platform ingest and sync data from all our SaaS tools?', a: 'Yes, our platforms support comprehensive ingestion capabilities. We engineer automated ELT pipelines that sync data from hundreds of sources, including ERP systems, CRM databases, marketing tools, and internal proprietary applications. We design both batch processing schedules and real-time streaming architectures (using Apache Kafka or AWS Kinesis), consolidating all your disparate data streams into a single, analytics-ready repository.' }
    ],
    es: [
      { q: '¿Cómo construye y optimiza HyperCode los almacenes de datos empresariales?', a: 'Diseñamos almacenes de datos modernos basados en la nube utilizando arquitecturas líderes como Snowflake, Google BigQuery o Amazon Redshift. Nuestros ingenieros de práctica diseñan esquemas limpios optimizados para un rendimiento de consultas analíticas de alta velocidad. Implementamos particionamiento de datos eficiente, agrupamiento y vistas materializadas para agilizar las respuestas.' },
      { q: '¿Cómo diseñan las plataformas de datos para manejar el crecimiento de datos a escala de petabytes?', a: 'Construimos plataformas de datos modernas utilizando arquitecturas desacopladas de cómputo y almacenamiento. Este desacoplamiento garantiza que su almacenamiento pueda crecer infinitamente a bajo costo, mientras que los clústeres de cómputo se escalan de forma dinámica. Utilizamos motores de procesamiento distribuido (como Apache Spark) y formatos de tabla modernos (como Apache Iceberg).' },
      { q: '¿Qué controles de gobernanza de datos y cumplimiento integran en la plataforma?', a: 'Integramos estrictos controles de seguridad, gobernanza y linaje de datos en la arquitectura. Configuramos controles de acceso a nivel de columna y fila para proteger datos confidenciales. Implementamos catalogación automática de datos utilizando plataformas como Apache Atlas o dbt para mantener metadatos, garantizando el cumplimiento de GDPR, HIPAA y SOC 2.' },
      { q: '¿Puede la plataforma de datos empresarial ingerir y sincronizar datos de todas nuestras herramientas SaaS?', a: 'Sí, nuestras plataformas admiten capacidades integrales de ingesta. Diseñamos canalizaciones ELT automatizadas que sincronizan datos de cientos de fuentes, incluidos sistemas ERP, bases de datos CRM, herramientas de marketing y aplicaciones internas. Diseñamos programas de procesamiento por lotes y arquitecturas de transmisión en tiempo real (con Apache Kafka o AWS Kinesis).' }
    ]
  },
  'talent-solutions': {
    en: [
      { q: 'How does HyperCode source and recruit qualified candidates for our vacancies?', a: 'We leverage an expansive candidate network and an AI-driven sourcing engine to identify top talent. Our recruitment team proactively builds pipelines of certified software engineers, data analysts, cloud architects, and business professionals. We manage the entire recruiting process—from initial headhunting and resume reviews to conducting technical assessments—delivering a curated shortlist of high-quality profiles that match your project requirements.' },
      { q: 'What technical and background screening processes do candidates undergo?', a: 'Every candidate undergoes a rigorous screening process tailored to the role. For technical positions, candidates complete live coding challenges, system design interviews, and code quality reviews evaluated by our senior engineering leads. We also conduct thorough behavioral interviews, professional reference checks, and employment background verifications. This ensures that every professional we submit possesses both the technical skills and cultural alignment needed for your team.' },
      { q: 'What hiring models and contract flexibility options do you provide?', a: 'We provide flexible staffing models to meet your changing operational needs. Our services include contract staffing (staff augmentation) for short-term support, contract-to-hire arrangements to evaluate candidates before permanent placement, and direct permanent hiring for key leadership roles. We write flexible contract terms, allowing you to scale your team size up or down as project demands change.' },
      { q: 'What is the typical timeframe to source and onboard a new contractor?', a: 'For contract roles from our active network of pre-screened professionals, we submit qualified profiles within 48 to 72 hours. The onboarding process typically takes between 5 and 10 business days, depending on your background check and system access requirements. For specialized direct-hire searches, we deliver a curated shortlist of qualified candidates within 2 to 3 weeks, keeping your hiring process fast and efficient.' }
    ],
    es: [
      { q: '¿Cómo busca y recluta HyperCode candidatos calificados para nuestras vacantes?', a: 'Aprovechamos una red expansiva de candidatos y un motor de búsqueda impulsado por IA para identificar a los mejores talentos. Nuestro equipo de reclutamiento crea de forma proactiva canales de ingenieros de software, analistas de datos y arquitectos de nube certificados. Gestionamos todo el proceso de contratación, desde el acercamiento inicial hasta la preselección.' },
      { q: '¿Qué procesos de evaluación técnica y de antecedentes pasan los candidatos?', a: 'Cada candidato pasa por un riguroso proceso de evaluación adaptado al puesto. Para puestos técnicos, completan desafíos de código en vivo, entrevistas de diseño de sistemas y revisiones de calidad de código evaluadas por ingenieros senior. También realizamos entrevistas de comportamiento detalladas y verificaciones de antecedentes.' },
      { q: '¿Qué modelos de contratación y opciones de flexibilidad de contrato ofrecen?', a: 'Ofrecemos modelos de personal flexibles para satisfacer sus cambiantes necesidades operativas. Nuestros servicios incluyen personal temporal (aumento de personal) para soporte a corto plazo, acuerdos de contrato a contratación para evaluar a los candidatos antes de la colocación permanente y contratación directa para roles de liderazgo.' },
      { q: '¿Cuál es el plazo típico para buscar e incorporar a un nuevo contratista?', a: 'Para puestos de contrato de nuestra red activa de profesionales preseleccionados, enviamos perfiles calificados en un plazo de 48 a 72 horas. El proceso de incorporación suele tardar entre 5 y 10 días hábiles. Para búsquedas de contratación directa especializada, entregamos una lista seleccionada en un plazo de 2 a 3 semanas.' }
    ]
  },
  'cybersecurity': {
    en: [
      { q: 'How does HyperCode identify vulnerabilities within our active applications and infrastructure?', a: 'We perform detailed security audits and penetration testing to identify weaknesses across your networks, APIs, cloud environments, and codebases. Our certified cybersecurity experts simulate real-world attacks using advanced tools. We provide a prioritized remediation report mapping vulnerabilities to CVE databases and CVSS severity scores, helping your team fix critical issues first.' },
      { q: 'Can you help our company achieve compliance with standards like SOC 2, HIPAA, or ISO 27001?', a: 'Yes. We align your infrastructure, software, and administrative controls with leading compliance standards. We conduct readiness assessments, identify compliance gaps, and implement required security controls (such as audit logging, encryption, and access management). We also assist in writing security policies and compiling documentation, guiding your organization through the audit process until compliance is achieved.' },
      { q: 'What threat detection and response capabilities do you establish for cloud platforms?', a: 'We configure continuous threat detection and monitoring solutions utilizing cloud-native security tools and SIEM integrations. We set up automated alerts for suspicious activities, unauthorized configuration changes, and brute-force access attempts. Our security engineers establish incident response runbooks to isolate compromised resources automatically, minimizing the impact of potential security breaches and protecting your operational integrity.' },
      { q: 'How do you implement data encryption protocols to protect sensitive customer records?', a: 'We enforce strong data encryption standards across all layers of your technology stack. For data in transit, we configure HTTPS using TLS 1.3 with secure cipher suites. For data at rest, we apply AES-256 encryption to databases, object storage, and backups. We also set up secure key management practices using cloud services (like AWS KMS) to manage and rotate encryption keys regularly.' }
    ],
    es: [
      { q: '¿Cómo identifica HyperCode las vulnerabilidades dentro de nuestras aplicaciones e infraestructura activas?', a: 'Realizamos auditorías de seguridad detalladas y pruebas de penetración para identificar debilidades en sus redes, APIs, entornos en la nube y bases de código. Nuestros expertos simulan ataques del mundo real y proporcionan un informe de remediación priorizado que mapea las vulnerabilidades con puntajes CVSS.' },
      { q: '¿Pueden ayudar a nuestra empresa a cumplir con estándares como SOC 2, HIPAA o ISO 27001?', a: 'Sí. Alineamos su infraestructura, software y controles administrativos con los estándares de cumplimiento líderes. Realizamos evaluaciones de preparación, identificamos brechas de cumplimiento e implementamos controles de seguridad requeridos (como registro de auditoría, cifrado y gestión de accesos).' },
      { q: '¿Qué capacidades de detección y respuesta a amenazas establecen para plataformas en la nube?', a: 'Configuramos soluciones de monitoreo y detección continua de amenazas mediante herramientas de seguridad nativas de la nube e integraciones SIEM. Establecemos alertas automatizadas para actividades sospechosas y configuramos flujos de respuesta para aislar recursos comprometidos, minimizando el impacto de brechas de seguridad.' },
      { q: '¿Cómo implementan los protocolos de cifrado de datos para proteger los registros confidenciales de los clientes?', a: 'Aplicamos estándares sólidos de cifrado de datos en todas las capas de su pila tecnológica. Para datos en tránsito, configuramos HTTPS utilizando TLS 1.3 con suites de cifrado seguras. Para datos en reposo, aplicamos cifrado AES-256 a bases de datos, almacenamiento de objetos y copias de seguridad. También configuramos servicios de gestión de claves KMS.' }
    ]
  },
  'ui-ux-design': {
    en: [
      { q: 'How does HyperCode gather user insights to inform the UI/UX design process?', a: 'We begin with user research, conducting stakeholder interviews, user surveys, and competitive analyses. Our designers create detailed user personas and map user journeys to understand your audience\'s needs and pain points. We run usability testing sessions on interactive prototypes, gathering feedback to refine layouts and navigation before starting full-scale software development.' },
      { q: 'What types of prototypes and design deliverables will our team receive?', a: 'We deliver a comprehensive set of design assets, starting with low-fidelity wireframes to align on page layouts and content structure. Once approved, we create high-fidelity, interactive prototypes in Figma that simulate actual user flows, transitions, and interactions. We also deliver a structured design system with reusable components, typography scales, and color palettes to ensure frontend development consistency.' },
      { q: 'How do you measure and validate the usability of your design concepts?', a: 'We validate design usability by conducting structured testing sessions with real users. We assign specific tasks to participants and observe how they navigate the prototype, noting any points of confusion or friction. We track usability metrics, including task completion rates, error rates, and time-on-task, using these insights to iterate on layout structures and improve overall usability.' },
      { q: 'What is a design system, and why is it important for our digital products?', a: 'A design system is a centralized repository of reusable UI components, styling guidelines, and design tokens (such as colors and typography). Implementing a design system ensures visual and functional consistency across all your web and mobile applications. It also accelerates frontend development by providing pre-styled components, reducing design debt and improving long-term product maintenance.' }
    ],
    es: [
      { q: '¿Cómo recopila HyperCode información de los usuarios para guiar el proceso de diseño UI/UX?', a: 'Comenzamos con la investigación de usuarios, realizando entrevistas a las partes interesadas, encuestas y análisis competitivos. Nuestros diseñadores crean personas de usuario detalladas y mapean los recorridos del usuario. Realizamos pruebas de usabilidad en prototipos interactivos para recopilar comentarios antes del desarrollo.' },
      { q: '¿Qué tipos de prototipos y entregables de diseño recibirá nuestro equipo?', a: 'Entregamos un conjunto completo de activos de diseño, comenzando con bocetos de baja fidelidad para definir la estructura del contenido. Una vez aprobados, creamos prototipos interactivos de alta fidelidad en Figma que simulan los flujos de usuario. También entregamos un sistema de diseño estructurado con componentes reutilizables.' },
      { q: '¿Cómo miden y validan la usabilidad de sus conceptos de diseño?', a: 'Validamos la usabilidad mediante sesiones estructuradas de prueba con usuarios reales. Asignamos tareas específicas a los participantes y observamos cómo navegan por el prototipo, registrando puntos de confusión o fricción. Realizamos un seguimiento de métricas clave como la tasa de finalización de tareas.' },
      { q: '¿Qué es un sistema de diseño y por qué es importante para nuestros productos digitales?', a: 'Un sistema de diseño es un repositorio centralizado de componentes de interfaz de usuario reutilizables, pautas de estilo y tokens de diseño. Su implementación garantiza la coherencia visual y funcional en todas las aplicaciones web y móviles, acelerando el desarrollo frontend al proporcionar componentes preestilizados.' }
    ]
  },
  'digital-marketing': {
    en: [
      { q: 'How does HyperCode design a digital marketing strategy that aligns with our goals?', a: 'We analyze your current marketing performance, target audience, competitor strategies, and business objectives. Our consultants then design a multichannel digital marketing strategy that prioritizes high-ROI channels. We define key performance indicators (KPIs), map customer acquisition funnels, and establish attribution models to ensure every marketing campaign delivers measurable growth and efficient customer acquisition.' },
      { q: 'What practices do you use to optimize performance marketing and paid search campaigns?', a: 'We optimize paid campaigns by conducting keyword research, writing compelling ad copy, and building targeted landing pages. We implement structured A/B testing for ad designs, bidding strategies, and audience targeting parameters. By monitoring conversion data continuously, we reallocate budget to high-performing campaigns, reducing your cost per acquisition (CPA) and improving advertising spend efficiency.' },
      { q: 'How do you improve the conversion rates of visitors on our existing website?', a: 'We optimize conversion rates (CRO) by analyzing user behavior using heatmaps, session recordings, and funnel drop-off reports. We identify friction points in your signup or checkout processes and implement A/B testing on call-to-action buttons, page layouts, and form fields. These data-driven improvements help increase the percentage of website visitors who convert into qualified business leads or sales.' },
      { q: 'How do you track marketing performance and report campaigns progress?', a: 'We set up comprehensive tracking solutions using Google Analytics, tag managers, and custom tracking pixels. We build real-time marketing dashboards that consolidate performance metrics from all your active channels, including paid search, social media, and email marketing campaigns. We provide weekly performance reports and monthly reviews, giving your team complete transparency into marketing ROI and acquisition metrics.' }
    ],
    es: [
      { q: '¿Cómo diseña HyperCode una estrategia de marketing digital que se alinee con nuestros objetivos?', a: 'Analizamos su rendimiento de marketing actual, público objetivo, estrategias de competidores y objetivos comerciales. Nuestros consultores diseñan una estrategia de marketing digital multicanal que prioriza los canales de alto ROI, definiendo KPIs y mapeando embudos de adquisición de clientes.' },
      { q: '¿Qué prácticas utilizan para optimizar el marketing de rendimiento y las campañas de búsqueda pagadas?', a: 'Optimizamos las campañas de pago mediante la investigación de palabras clave, la redacción de anuncios persuasivos y la creación de páginas de destino específicas. Implementamos pruebas A/B estructuradas para diseños de anuncios, estrategias de oferta y parámetros de segmentación de audiencia.' },
      { q: '¿Cómo mejoran las tasas de conversión de los visitantes en nuestro sitio web existente?', a: 'Optimizamos las tasas de conversión (CRO) analizando el comportamiento de los usuarios mediante mapas de calor, grabaciones de sesiones e informes de abandono del embudo. Identificamos puntos de fricción e implementamos pruebas A/B en botones de llamada a la acción, diseños de páginas y campos de formularios.' },
      { q: '¿Cómo realizan el seguimiento del rendimiento de marketing y notifican el progreso de las campañas?', a: 'Configuramos soluciones integrales de seguimiento con Google Analytics, administradores de etiquetas y píxeles de seguimiento. Creamos tableros de marketing en tiempo real que consolidan métricas de todos los canales activos, proporcionando informes semanales y revisiones mensuales sobre el ROI.' }
    ]
  },
  'ecommerce': {
    en: [
      { q: 'How do you help our company choose the right e-commerce platform?', a: 'We evaluate your product catalog size, transaction volumes, integration requirements, and budget to recommend the optimal platform. We specialize in configuring SaaS solutions like Shopify for fast time-to-market, as well as building headless e-commerce architectures using platforms like Medusa or Shopify Headless for maximum customization. Our goal is to select a platform that scales with your sales growth while minimizing licensing and maintenance costs.' },
      { q: 'What payment gateways and security integrations do you support?', a: 'We integrate leading payment gateways including Stripe, PayPal, Adyen, and Authorize.Net, supporting credit cards, digital wallets (Apple Pay, Google Pay), and regional payment methods. We ensure all payment integrations comply with PCI-DSS standards, utilizing tokenization and secure hosted fields to protect cardholder data, reducing your compliance scope while delivering a frictionless checkout experience.' },
      { q: 'Can our e-commerce site sync in real time with our ERP and physical inventory?', a: 'Yes. We build automated integrations that sync inventory levels, product catalog details, and order statuses between your e-commerce platform and backend systems, including ERPs (like SAP or NetSuite), warehouse management systems (WMS), and physical point-of-sale (POS) systems. This real-time synchronization prevents overselling, automates order fulfillment updates, and simplifies cross-channel inventory management.' },
      { q: 'What design practices do you implement to reduce checkout abandonment?', a: 'We reduce checkout abandonment by designing a simplified, single-page checkout flow with minimal form fields. We implement address autocomplete, inline input validation, and clear error notifications. We also support guest checkouts and display security badges and transparent pricing (including taxes and shipping fees) upfront, reducing friction and helping increase your conversion rate.' }
    ],
    es: [
      { q: '¿Cómo ayudan a nuestra empresa a elegir la plataforma de comercio electrónico adecuada?', a: 'Evaluamos el tamaño de su catálogo, volumen de transacciones, requisitos de integración y presupuesto para recomendar la plataforma óptima. Nos especializamos tanto en configurar soluciones SaaS como Shopify, como en construir arquitecturas headless utilizando plataformas como Medusa o Shopify Headless.' },
      { q: '¿Qué pasarelas de pago e integraciones de seguridad admiten?', a: 'Integramos pasarelas de pago líderes como Stripe, PayPal, Adyen y Authorize.Net, admitiendo tarjetas de crédito, billeteras digitales y métodos locales. Garantizamos que todas las integraciones cumplan con PCI-DSS, utilizando tokenización para proteger los datos de los titulares de tarjetas.' },
      { q: '¿Puede nuestro sitio de comercio electrónico sincronizarse en tiempo real con nuestro ERP e inventario físico?', a: 'Sí. Creamos integraciones automatizadas que sincronizan los niveles de inventario, detalles del catálogo y estados de pedidos entre su tienda online y sistemas backend como ERP (SAP o NetSuite), sistemas de gestión de almacenes (WMS) y sistemas de punto de venta (POS) físicos.' },
      { q: '¿Qué prácticas de diseño implementan para reducir el abandono de la compra?', a: 'Reducimos el abandono del carrito diseñando un flujo de pago simplificado de una sola página con campos de formulario mínimos. Implementamos autocompletado de direcciones, validación de entrada en línea y notificaciones claras de error, además de admitir compras como invitado y mostrar precios transparentes.' }
    ]
  },
  'technology-consulting': {
    en: [
      { q: 'What is involved in a technology stack audit conducted by HyperCode?', a: 'Our practice leads conduct a comprehensive review of your active applications, databases, cloud hosting structures, and third-party integrations. We analyze code quality, security vulnerabilities, database performance, and compute costs. We deliver a detailed audit report that identifies operational risks and recommends stack consolidations, modernization pathways, and cost-saving measures to optimize your technology investments.' },
      { q: 'How do you design an IT roadmap that supports our long-term business goals?', a: 'We align your IT investments with your corporate business objectives. Our consultants work with your leadership team to define key milestones, estimate budgets, and plan resource requirements. We design a phased implementation roadmap that details technology migrations, architecture modernizations, and team training plans, ensuring your organization builds a modern technical foundation that supports sustainable business growth.' },
      { q: 'How does HyperCode assist in selecting the right software vendors and platforms?', a: 'We act as an objective advisor, assisting your team in evaluating software vendors and SaaS platforms. We help write requests for proposals (RFPs), define technical evaluation criteria, and conduct comparative analyses based on functionality, security compliance, scaling capabilities, and total cost of ownership (TCO). This structured selection process ensures you choose vendor solutions that align with your architecture and budget.' },
      { q: 'Can your consulting team design the software architecture for our new system?', a: 'Yes. Our software architects design blueprints for complex enterprise systems. We define microservices boundaries, design database schemas, configure messaging patterns, and establish security architectures. We provide complete documentation, including UML diagrams, API specifications, and cloud deployment templates, giving your development team a clear, reliable blueprint to build the new system successfully.' }
    ],
    es: [
      { q: '¿Qué implica una auditoría de stack tecnológico realizada por HyperCode?', a: 'Nuestros líderes de práctica realizan una revisión de sus aplicaciones activas, bases de datos, estructuras de nube e integraciones de terceros. Analizamos la calidad de código, vulnerabilidades de seguridad y costos de computación, entregando un informe de auditoría detallado con recomendaciones de modernización.' },
      { q: '¿Cómo diseñan una hoja de ruta de TI que respalde nuestros objetivos comerciales a largo plazo?', a: 'Alineamos sus inversiones en TI con sus objetivos comerciales corporativos. Nuestros consultores trabajan con su equipo de liderazgo para definir hitos clave, presupuestos y requisitos de recursos. Diseñamos una hoja de ruta de implementación por fases que detalla migraciones y modernizaciones tecnológicas.' },
      { q: '¿Cómo ayuda HyperCode a seleccionar las plataformas y proveedores de software adecuados?', a: 'Actuamos como asesores objetivos, ayudando a evaluar proveedores de software y plataformas SaaS. Ayudamos a redactar solicitudes de propuesta (RFP), definir criterios técnicos de evaluación y realizar análisis comparativos basados en funcionalidad, cumplimiento y costo total de propiedad (TCO).' },
      { q: '¿Puede su equipo de consultoría diseñar la arquitectura de software para nuestro nuevo sistema?', a: 'Sí. Nuestros arquitectos diseñan planos para sistemas empresariales complejos. Definimos límites de microservicios, esquemas de bases de datos, patrones de mensajería y arquitecturas de seguridad, entregando diagramas UML y especificaciones de API para guiar a sus desarrolladores.' }
    ]
  }
};

function getTailoredFaqs(targetSlug: string, categoryId: string, isEs: boolean): Array<{ q: string; a: string }> {
  let theme = categoryId;
  if (categoryId === 'data-analytics') {
    if (['business-intelligence', 'power-bi-dashboards', 'tableau-dashboards', 'data-visualization'].includes(targetSlug)) {
      theme = 'business-intelligence';
    } else if (['data-warehousing', 'etl-pipelines'].includes(targetSlug)) {
      theme = 'enterprise-data-platforms';
    }
  }

  const group = TAILORED_FAQS[theme] || TAILORED_FAQS['software-development'];
  return isEs ? group.es : group.en;
}

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
  const faqs = getTailoredFaqs(targetSlug, categoryId, isEs);

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
