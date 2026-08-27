export type MenuService = {
  slug: string;
  href?: string;
  label?: { en: string; es: string };
};

export type MenuCategory = {
  label: { en: string; es: string };
  services: MenuService[];
};

export const solutionMenu: MenuCategory[] = [
  {
    label: { en: 'AI & Automation', es: 'IA y Automatización' },
    services: [
      { slug: 'ai-consulting' },
      { slug: 'generative-ai-solutions' },
      { slug: 'ai-chatbot-development', label: { en: 'AI Chatbots', es: 'Chatbots de IA' } },
      { slug: 'ai-workflow-automation' },
      { slug: 'ai-integration' }
    ]
  },
  {
    label: { en: 'Software Development', es: 'Desarrollo de Software' },
    services: [
      { slug: 'custom-software-development' },
      { slug: 'enterprise-software' },
      { slug: 'api-development', label: { en: 'API Development & Integration', es: 'Desarrollo e Integración de API' } },
      { slug: 'saas-development' },
      { slug: 'legacy-modernization', label: { en: 'Legacy Application Modernization', es: 'Modernización de Aplicaciones Heredadas' } }
    ]
  },
  {
    label: { en: 'Web & Mobile', es: 'Web y Móvil' },
    services: [
      { slug: 'web-development-services', label: { en: 'Web Development', es: 'Desarrollo Web' } },
      { slug: 'ecommerce-websites', label: { en: 'E-commerce Development', es: 'Desarrollo de Comercio Electrónico' } },
      { slug: 'ios-apps' },
      { slug: 'android-apps' },
      { slug: 'flutter-development' }
    ]
  },
  {
    label: { en: 'Cloud & DevOps', es: 'Nube y DevOps' },
    services: [
      { slug: 'cloud-migration', label: { en: 'Cloud Consulting & Migration', es: 'Consultoría y Migración a la Nube' } },
      { slug: 'infrastructure-automation', label: { en: 'DevOps & Infrastructure', es: 'DevOps e Infraestructura' } },
      { slug: 'docker-containerization' },
      { slug: 'managed-it-services', label: { en: 'Managed IT Services', es: 'Servicios de TI Gestionados' } }
    ]
  },
  {
    label: { en: 'Data & Analytics', es: 'Datos y Analítica' },
    services: [
      { slug: 'data-engineering-solutions', label: { en: 'Data Engineering', es: 'Ingeniería de Datos' } },
      { slug: 'data-warehousing-services' },
      { slug: 'data-visualization' },
      { slug: 'data-analytics-services' },
      { slug: 'business-intelligence-consulting' }
    ]
  },
  {
    label: { en: 'Cybersecurity', es: 'Ciberseguridad' },
    services: [
      { slug: 'security-assessment', label: { en: 'Cybersecurity', es: 'Ciberseguridad' } },
      { slug: 'security-audits' },
      { slug: 'identity-access-management' }
    ]
  },
  {
    label: { en: 'Talent & Staffing', es: 'Talento y Contratación' },
    services: [
      { slug: 'it-staffing-solutions', label: { en: 'IT Staffing & Staff Augmentation', es: 'Contratación de TI y Aumento de Personal' } },
      { slug: 'dedicated-teams' },
      { slug: 'executive-search' }
    ]
  },
  {
    label: { en: 'Digital & Experience', es: 'Digital y Experiencia' },
    services: [
      { slug: 'ui-design', label: { en: 'UI/UX Design', es: 'Diseño UI/UX' } },
      { slug: 'design-systems' },
      { slug: 'digital-marketing', href: '/solutions#digital-marketing', label: { en: 'Digital Marketing', es: 'Marketing Digital' } },
      { slug: 'local-seo', label: { en: 'Local SEO', es: 'SEO Local' } }
    ]
  }
];

/** Three-column mega menu layout — balanced for laptop viewports */
export const solutionMenuColumns: MenuCategory[][] = [
  [solutionMenu[0], solutionMenu[2]],
  [solutionMenu[1], solutionMenu[3]],
  [solutionMenu[4], solutionMenu[5], solutionMenu[6], solutionMenu[7]],
];

export type FooterServiceLink = {
  labelKey: string;
  href: string;
};

export const footerServicesList: FooterServiceLink[] = [
  { labelKey: 'aiAutomation', href: '/solutions#ai-automation' },
  { labelKey: 'softwareDev', href: '/solutions#software-development' },
  { labelKey: 'cloudDevOps', href: '/solutions#cloud-devops' },
  { labelKey: 'dataAnalytics', href: '/solutions#data-analytics' },
  { labelKey: 'itStaffingConsulting', href: '/solutions#talent-solutions' },
  { labelKey: 'cybersecurity', href: '/solutions#cybersecurity' },
];
