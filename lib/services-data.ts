import {
  Sparkles,
  Layers,
  Globe,
  Smartphone,
  Cloud,
  Users,
  Shuffle,
  Database,
  ShieldCheck,
  Palette,
  TrendingUp,
  ShoppingCart,
  Lightbulb
} from 'lucide-react';

export interface ServiceItem {
  id: string;
  iconName: string;
  tech: string[];
  industries: string[];
  challenges: ('cost' | 'scale' | 'migration' | 'ai' | 'security' | 'reporting' | 'store')[];
  related: string[];
  path: string;
}

export interface ServiceCategory {
  id: string;
  iconName: string;
  services: ServiceItem[];
}

export const CATEGORY_ICON_MAP: Record<string, any> = {
  'ai-automation': Sparkles,
  'software-development': Layers,
  'web-development': Globe,
  'mobile-development': Smartphone,
  'cloud-devops': Cloud,
  'talent-solutions': Users,
  'digital-transformation': Shuffle,
  'data-analytics': Database,
  'cybersecurity': ShieldCheck,
  'ui-ux-design': Palette,
  'digital-marketing': TrendingUp,
  'ecommerce': ShoppingCart,
  'technology-consulting': Lightbulb
};

export const SERVICES_CATALOG: ServiceCategory[] = [
  {
    id: 'ai-automation',
    iconName: 'Sparkles',
    services: [
      {
        id: 'ai-consulting',
        iconName: 'Sparkles',
        tech: ['OpenAI', 'Gemini', 'LangChain', 'LlamaIndex'],
        industries: ['Finance', 'Healthcare', 'Startups'],
        challenges: ['ai', 'scale'],
        related: ['ai-strategy', 'generative-ai-solutions'],
        path: '/solutions/ai-consulting'
      },
      {
        id: 'generative-ai-solutions',
        iconName: 'Sparkles',
        tech: ['GPT-4', 'Claude', 'HuggingFace', 'Python'],
        industries: ['Retail', 'Education', 'Large Enterprises'],
        challenges: ['ai', 'cost'],
        related: ['ai-chatbot-development', 'ai-workflow-automation'],
        path: '/solutions/generative-ai-solutions'
      },
      {
        id: 'ai-chatbot-development',
        iconName: 'Sparkles',
        tech: ['Pinecone', 'Next.js', 'Vercel AI SDK', 'Node.js'],
        industries: ['Retail', 'Finance', 'Logistics'],
        challenges: ['ai', 'cost', 'scale'],
        related: ['generative-ai-solutions', 'ai-customer-support-automation'],
        path: '/solutions/ai-chatbot-development'
      },
      {
        id: 'ai-voice-agents',
        iconName: 'Sparkles',
        tech: ['ElevenLabs', 'Twilio', 'Vapi', 'Python'],
        industries: ['Hospitality', 'Logistics', 'SMEs'],
        challenges: ['ai', 'cost'],
        related: ['ai-customer-support-automation', 'ai-sales-assistants'],
        path: '/solutions/ai-voice-agents'
      }
    ]
  },
  {
    id: 'software-development',
    iconName: 'Layers',
    services: [
      {
        id: 'custom-software-development',
        iconName: 'Layers',
        tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker'],
        industries: ['Healthcare', 'Finance', 'Logistics'],
        challenges: ['scale', 'migration'],
        related: ['enterprise-software', 'saas-development'],
        path: '/solutions/custom-software-development'
      },
      {
        id: 'enterprise-software',
        iconName: 'Layers',
        tech: ['Java/Spring', 'C#/.NET', 'Kubernetes', 'Oracle'],
        industries: ['Large Enterprises', 'Government', 'Pharma'],
        challenges: ['scale', 'migration'],
        related: ['erp-development', 'crm-development'],
        path: '/solutions/enterprise-software'
      },
      {
        id: 'saas-development',
        iconName: 'Layers',
        tech: ['React', 'NestJS', 'Supabase', 'Stripe'],
        industries: ['Startups', 'SMEs', 'Finance'],
        challenges: ['scale', 'cost'],
        related: ['custom-software-development', 'api-development'],
        path: '/solutions/saas-development'
      }
    ]
  },
  {
    id: 'web-development',
    iconName: 'Globe',
    services: [
      {
        id: 'corporate-websites',
        iconName: 'Globe',
        tech: ['Next.js', 'TailwindCSS', 'Framer Motion', 'Sanity CMS'],
        industries: ['Finance', 'Legal', 'Real Estate'],
        challenges: ['reporting', 'scale'],
        related: ['business-websites', 'ui-design'],
        path: '/solutions/corporate-websites'
      },
      {
        id: 'marketplace-development',
        iconName: 'Globe',
        tech: ['GraphQL', 'Next.js', 'Node.js', 'Redis'],
        industries: ['Retail', 'Logistics', 'Hospitality'],
        challenges: ['store', 'scale'],
        related: ['ecommerce-websites', 'customer-portals'],
        path: '/solutions/marketplace-development'
      },
      {
        id: 'admin-dashboards',
        iconName: 'Globe',
        tech: ['React', 'TypeScript', 'Tremor', 'Supabase'],
        industries: ['Large Enterprises', 'Startups', 'Logistics'],
        challenges: ['reporting', 'cost'],
        related: ['customer-portals', 'power-bi-dashboards'],
        path: '/solutions/admin-dashboards'
      }
    ]
  },
  {
    id: 'mobile-development',
    iconName: 'Smartphone',
    services: [
      {
        id: 'ios-apps',
        iconName: 'Smartphone',
        tech: ['Swift', 'SwiftUI', 'GraphQL', 'CoreData'],
        industries: ['Retail', 'Healthcare', 'Startups'],
        challenges: ['scale'],
        related: ['android-apps', 'flutter-development'],
        path: '/solutions/ios-apps'
      },
      {
        id: 'flutter-development',
        iconName: 'Smartphone',
        tech: ['Flutter', 'Dart', 'Bloc', 'Firebase'],
        industries: ['SMEs', 'Logistics', 'Hospitality'],
        challenges: ['cost', 'scale'],
        related: ['react-native-development', 'ios-apps'],
        path: '/solutions/flutter-development'
      }
    ]
  },
  {
    id: 'cloud-devops',
    iconName: 'Cloud',
    services: [
      {
        id: 'cloud-migration',
        iconName: 'Cloud',
        tech: ['AWS', 'Azure', 'Terraform', 'Ansible'],
        industries: ['Finance', 'Healthcare', 'Large Enterprises'],
        challenges: ['migration', 'cost'],
        related: ['kubernetes-orchestration', 'infrastructure-automation'],
        path: '/solutions/cloud-migration'
      },
      {
        id: 'kubernetes-orchestration',
        iconName: 'Cloud',
        tech: ['Docker', 'Kubernetes', 'Helm', 'ArgoCD'],
        industries: ['Large Enterprises', 'Startups', 'Finance'],
        challenges: ['scale', 'cost'],
        related: ['ci-cd-pipelines', 'cloud-migration'],
        path: '/solutions/kubernetes-orchestration'
      }
    ]
  },
  {
    id: 'talent-solutions',
    iconName: 'Users',
    services: [
      {
        id: 'permanent-staffing',
        iconName: 'Users',
        tech: ['Sourcing Frameworks', 'ATS Integration', 'Behavioral Screening'],
        industries: ['Finance', 'Healthcare', 'Large Enterprises'],
        challenges: ['scale'],
        related: ['executive-search', 'staff-augmentation'],
        path: '/solutions/permanent-staffing'
      },
      {
        id: 'staff-augmentation',
        iconName: 'Users',
        tech: ['Next.js Squads', 'Cloud SREs', 'Data Pipelines Engineers'],
        industries: ['Startups', 'SMEs', 'Finance'],
        challenges: ['scale', 'cost'],
        related: ['dedicated-teams', 'contract-staffing'],
        path: '/solutions/staff-augmentation'
      }
    ]
  },
  {
    id: 'digital-transformation',
    iconName: 'Shuffle',
    services: [
      {
        id: 'business-process-automation',
        iconName: 'Shuffle',
        tech: ['Zapier', 'Make.com', 'Python scripts', 'n8n'],
        industries: ['Logistics', 'Retail', 'SMEs'],
        challenges: ['cost', 'ai'],
        related: ['digital-strategy', 'process-optimization'],
        path: '/solutions/business-process-automation'
      },
      {
        id: 'digital-strategy',
        iconName: 'Shuffle',
        tech: ['Agile Maturity Audits', 'Value Stream Maps', 'Architecture Assessments'],
        industries: ['Large Enterprises', 'Government', 'Finance'],
        challenges: ['migration'],
        related: ['legacy-modernization-dt', 'technology-consulting'],
        path: '/solutions/digital-strategy'
      }
    ]
  },
  {
    id: 'data-analytics',
    iconName: 'Database',
    services: [
      {
        id: 'power-bi-dashboards',
        iconName: 'Database',
        tech: ['Power BI', 'DAX', 'SQL Server', 'Power Query'],
        industries: ['Finance', 'Manufacturing', 'Large Enterprises'],
        challenges: ['reporting'],
        related: ['business-intelligence', 'data-visualization'],
        path: '/solutions/power-bi-dashboards'
      },
      {
        id: 'data-warehousing',
        iconName: 'Database',
        tech: ['Snowflake', 'BigQuery', 'Redshift', 'dbt'],
        industries: ['Finance', 'Retail', 'Healthcare'],
        challenges: ['migration', 'scale'],
        related: ['etl-pipelines', 'business-intelligence'],
        path: '/solutions/data-warehousing'
      }
    ]
  },
  {
    id: 'cybersecurity',
    iconName: 'ShieldCheck',
    services: [
      {
        id: 'penetration-testing',
        iconName: 'ShieldCheck',
        tech: ['Kali Linux', 'OWASP ZAP', 'Burp Suite', 'Metasploit'],
        industries: ['Finance', 'Healthcare', 'Government'],
        challenges: ['security'],
        related: ['security-assessment', 'security-audits'],
        path: '/solutions/penetration-testing'
      },
      {
        id: 'compliance-consulting',
        iconName: 'ShieldCheck',
        tech: ['SOC 2 Auditing', 'HIPAA Mapping', 'GDPR Verification'],
        industries: ['Healthcare', 'Finance', 'Large Enterprises'],
        challenges: ['security'],
        related: ['security-audits', 'identity-access-management'],
        path: '/solutions/compliance-consulting'
      }
    ]
  },
  {
    id: 'ui-ux-design',
    iconName: 'Palette',
    services: [
      {
        id: 'design-systems',
        iconName: 'Palette',
        tech: ['Figma', 'Storybook', 'Tailwind tokens', 'Tokens Studio'],
        industries: ['Startups', 'SMEs', 'Large Enterprises'],
        challenges: ['scale', 'cost'],
        related: ['ui-design', 'product-design'],
        path: '/solutions/design-systems'
      },
      {
        id: 'ux-research',
        iconName: 'Palette',
        tech: ['Hotjar', 'UserTesting', 'Maze', 'Figma prototypes'],
        industries: ['Healthcare', 'Retail', 'Finance'],
        challenges: ['reporting'],
        related: ['wireframing', 'prototyping'],
        path: '/solutions/ux-research'
      }
    ]
  },
  {
    id: 'digital-marketing',
    iconName: 'TrendingUp',
    services: [
      {
        id: 'seo-optimization',
        iconName: 'TrendingUp',
        tech: ['SEMrush', 'Ahrefs', 'Google Search Console', 'Screaming Frog'],
        industries: ['Retail', 'Legal', 'SMEs'],
        challenges: ['scale'],
        related: ['local-seo', 'content-marketing'],
        path: '/solutions/seo-optimization'
      }
    ]
  },
  {
    id: 'ecommerce',
    iconName: 'ShoppingCart',
    services: [
      {
        id: 'shopify-development',
        iconName: 'ShoppingCart',
        tech: ['Shopify Liquid', 'Hydrogen', 'Stripe', 'Klaviyo'],
        industries: ['Retail', 'Startups', 'SMEs'],
        challenges: ['store', 'scale'],
        related: ['woocommerce-development', 'payment-gateway-integration'],
        path: '/solutions/shopify-development'
      }
    ]
  },
  {
    id: 'technology-consulting',
    iconName: 'Lightbulb',
    services: [
      {
        id: 'technology-consulting',
        iconName: 'Lightbulb',
        tech: ['Architecture Diagrams', 'Technical Auditing', 'Tech Debt Analysis'],
        industries: ['Large Enterprises', 'Finance', 'Healthcare'],
        challenges: ['migration', 'cost'],
        related: ['ai-strategy', 'software-architecture'],
        path: '/solutions/technology-consulting'
      },
      {
        id: 'cto-as-a-service',
        iconName: 'Lightbulb',
        tech: ['Team management', 'Scale diagrams', 'Technology vetting'],
        industries: ['Startups', 'SMEs', 'Finance'],
        challenges: ['scale', 'cost'],
        related: ['product-consulting', 'software-architecture'],
        path: '/solutions/cto-as-a-service'
      }
    ]
  }
];
