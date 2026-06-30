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
        related: ['ai-strategy', 'generative-ai'],
        path: '/solutions/business-intelligence-consulting#ai'
      },
      {
        id: 'generative-ai',
        iconName: 'Sparkles',
        tech: ['GPT-4', 'Claude', 'HuggingFace', 'Python'],
        industries: ['Retail', 'Education', 'Large Enterprises'],
        challenges: ['ai', 'cost'],
        related: ['ai-chatbots', 'ai-workflow-automation'],
        path: '/solutions/business-intelligence-consulting#ai'
      },
      {
        id: 'ai-chatbots',
        iconName: 'Sparkles',
        tech: ['Pinecone', 'Next.js', 'Vercel AI SDK', 'Node.js'],
        industries: ['Retail', 'Finance', 'Logistics'],
        challenges: ['ai', 'cost', 'scale'],
        related: ['generative-ai', 'ai-customer-support'],
        path: '/solutions/business-intelligence-consulting#ai'
      },
      {
        id: 'ai-voice-agents',
        iconName: 'Sparkles',
        tech: ['ElevenLabs', 'Twilio', 'Vapi', 'Python'],
        industries: ['Hospitality', 'Logistics', 'SMEs'],
        challenges: ['ai', 'cost'],
        related: ['ai-customer-support', 'ai-sales-assistants'],
        path: '/solutions/business-intelligence-consulting#ai'
      }
    ]
  },
  {
    id: 'software-development',
    iconName: 'Layers',
    services: [
      {
        id: 'custom-software',
        iconName: 'Layers',
        tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker'],
        industries: ['Healthcare', 'Finance', 'Logistics'],
        challenges: ['scale', 'migration'],
        related: ['enterprise-software', 'saas-development'],
        path: '/solutions/web-development-services#software'
      },
      {
        id: 'enterprise-software',
        iconName: 'Layers',
        tech: ['Java/Spring', 'C#/.NET', 'Kubernetes', 'Oracle'],
        industries: ['Large Enterprises', 'Government', 'Pharma'],
        challenges: ['scale', 'migration'],
        related: ['erp', 'crm'],
        path: '/solutions/web-development-services#software'
      },
      {
        id: 'saas-development',
        iconName: 'Layers',
        tech: ['React', 'NestJS', 'Supabase', 'Stripe'],
        industries: ['Startups', 'SMEs', 'Finance'],
        challenges: ['scale', 'cost'],
        related: ['custom-software', 'api-development'],
        path: '/solutions/web-development-services#software'
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
        path: '/solutions/web-development-services'
      },
      {
        id: 'marketplace-platforms',
        iconName: 'Globe',
        tech: ['GraphQL', 'Next.js', 'Node.js', 'Redis'],
        industries: ['Retail', 'Logistics', 'Hospitality'],
        challenges: ['store', 'scale'],
        related: ['ecommerce-websites', 'customer-portals'],
        path: '/solutions/web-development-services'
      },
      {
        id: 'admin-dashboards',
        iconName: 'Globe',
        tech: ['React', 'TypeScript', 'Tremor', 'Supabase'],
        industries: ['Large Enterprises', 'Startups', 'Logistics'],
        challenges: ['reporting', 'cost'],
        related: ['customer-portals', 'power-bi'],
        path: '/solutions/web-development-services'
      }
    ]
  },
  {
    id: 'mobile-development',
    iconName: 'Smartphone',
    services: [
      {
        id: 'ios',
        iconName: 'Smartphone',
        tech: ['Swift', 'SwiftUI', 'GraphQL', 'CoreData'],
        industries: ['Retail', 'Healthcare', 'Startups'],
        challenges: ['scale'],
        related: ['android', 'flutter'],
        path: '/solutions/web-development-services#mobile'
      },
      {
        id: 'flutter',
        iconName: 'Smartphone',
        tech: ['Flutter', 'Dart', 'Bloc', 'Firebase'],
        industries: ['SMEs', 'Logistics', 'Hospitality'],
        challenges: ['cost', 'scale'],
        related: ['react-native', 'ios'],
        path: '/solutions/web-development-services#mobile'
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
        related: ['kubernetes', 'infrastructure-automation'],
        path: '/solutions/data-engineering-solutions#cloud'
      },
      {
        id: 'kubernetes',
        iconName: 'Cloud',
        tech: ['Docker', 'Kubernetes', 'Helm', 'ArgoCD'],
        industries: ['Large Enterprises', 'Startups', 'Finance'],
        challenges: ['scale', 'cost'],
        related: ['ci-cd', 'cloud-migration'],
        path: '/solutions/data-engineering-solutions#cloud'
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
        path: '/solutions/it-staffing-solutions'
      },
      {
        id: 'staff-augmentation',
        iconName: 'Users',
        tech: ['Next.js Squads', 'Cloud SREs', 'Data Pipelines Engineers'],
        industries: ['Startups', 'SMEs', 'Finance'],
        challenges: ['scale', 'cost'],
        related: ['dedicated-teams', 'contract-staffing'],
        path: '/solutions/it-staffing-solutions'
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
        path: '/solutions/business-intelligence-consulting#digital'
      },
      {
        id: 'digital-strategy',
        iconName: 'Shuffle',
        tech: ['Agile Maturity Audits', 'Value Stream Maps', 'Architecture Assessments'],
        industries: ['Large Enterprises', 'Government', 'Finance'],
        challenges: ['migration'],
        related: ['legacy-modernization-dt', 'technology-consulting-service'],
        path: '/solutions/business-intelligence-consulting#digital'
      }
    ]
  },
  {
    id: 'data-analytics',
    iconName: 'Database',
    services: [
      {
        id: 'power-bi',
        iconName: 'Database',
        tech: ['Power BI', 'DAX', 'SQL Server', 'Power Query'],
        industries: ['Finance', 'Manufacturing', 'Large Enterprises'],
        challenges: ['reporting'],
        related: ['business-intelligence', 'data-visualization'],
        path: '/solutions/data-analytics-services'
      },
      {
        id: 'data-warehousing',
        iconName: 'Database',
        tech: ['Snowflake', 'BigQuery', 'Redshift', 'dbt'],
        industries: ['Finance', 'Retail', 'Healthcare'],
        challenges: ['migration', 'scale'],
        related: ['etl', 'business-intelligence'],
        path: '/solutions/data-analytics-services'
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
        path: '/solutions/business-intelligence-consulting#security'
      },
      {
        id: 'compliance',
        iconName: 'ShieldCheck',
        tech: ['SOC 2 Auditing', 'HIPAA Mapping', 'GDPR Verification'],
        industries: ['Healthcare', 'Finance', 'Large Enterprises'],
        challenges: ['security'],
        related: ['security-audits', 'iam'],
        path: '/solutions/business-intelligence-consulting#security'
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
        path: '/solutions/web-development-services#design'
      },
      {
        id: 'ux-research',
        iconName: 'Palette',
        tech: ['Hotjar', 'UserTesting', 'Maze', 'Figma prototypes'],
        industries: ['Healthcare', 'Retail', 'Finance'],
        challenges: ['reporting'],
        related: ['wireframes', 'prototype'],
        path: '/solutions/web-development-services#design'
      }
    ]
  },
  {
    id: 'digital-marketing',
    iconName: 'TrendingUp',
    services: [
      {
        id: 'seo',
        iconName: 'TrendingUp',
        tech: ['SEMrush', 'Ahrefs', 'Google Search Console', 'Screaming Frog'],
        industries: ['Retail', 'Legal', 'SMEs'],
        challenges: ['scale'],
        related: ['local-seo', 'content-marketing'],
        path: '/solutions/web-development-services#marketing'
      }
    ]
  },
  {
    id: 'ecommerce',
    iconName: 'ShoppingCart',
    services: [
      {
        id: 'shopify',
        iconName: 'ShoppingCart',
        tech: ['Shopify Liquid', 'Hydrogen', 'Stripe', 'Klaviyo'],
        industries: ['Retail', 'Startups', 'SMEs'],
        challenges: ['store', 'scale'],
        related: ['woocommerce', 'payment-gateway'],
        path: '/solutions/web-development-services#ecommerce'
      }
    ]
  },
  {
    id: 'technology-consulting',
    iconName: 'Lightbulb',
    services: [
      {
        id: 'technology-consulting-service',
        iconName: 'Lightbulb',
        tech: ['Architecture Diagrams', 'Technical Auditing', 'Tech Debt Analysis'],
        industries: ['Large Enterprises', 'Finance', 'Healthcare'],
        challenges: ['migration', 'cost'],
        related: ['ai-strategy', 'architecture-consulting'],
        path: '/solutions/business-intelligence-consulting#cto'
      },
      {
        id: 'cto-as-a-service',
        iconName: 'Lightbulb',
        tech: ['Team management', 'Scale diagrams', 'Technology vetting'],
        industries: ['Startups', 'SMEs', 'Finance'],
        challenges: ['scale', 'cost'],
        related: ['product-consulting', 'digital-transformation-strategy'],
        path: '/solutions/business-intelligence-consulting#cto'
      }
    ]
  }
];
