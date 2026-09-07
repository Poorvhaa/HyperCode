import { enterpriseGenerativeAiContentEn } from './articles/enterprise-generative-ai-content';
import { aiInHealthcareContentEn } from './articles/ai-in-healthcare-content';

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML-friendly rich text content
  date: string;
  category: string;
  readTime: string;
  author: Author;
  related: string[]; // Slugs of related articles
  image?: string;
  imageAlt?: string;
}

export const ARTICLE_IMAGES: Record<string, string> = {
  'enterprise-generative-ai-strategic-innovation':
    '/images/articles/enterprise-generative-ai-strategic-innovation.webp',
  'ai-in-healthcare':
    '/images/articles/ai-in-healthcare-intelligent-operations.webp',
};

export const ARTICLE_ALT_TEXTS: Record<string, Record<string, string>> = {
  'enterprise-generative-ai-strategic-innovation': {
    en: 'Modern enterprise executive boardroom table with a tablet displaying a network data graph, with technology strategists conversing before city skyline windows',
    es: 'Mesa de sala de juntas ejecutiva moderna con una tableta que muestra un gráfico de red de datos, con estrategas tecnológicos conversando ante ventanas con vista a la ciudad',
  },
  'ai-in-healthcare': {
    en: 'Healthcare physician in a white coat reviewing diagnostic imaging and clinical data on a dual-monitor workstation in a hospital clinical center',
    es: 'Médica con bata blanca revisando imágenes de diagnóstico y datos clínicos en una estación de trabajo de dos monitores en un centro hospitalario',
  },
};

export const articles: Article[] = [
  {
    slug: 'enterprise-generative-ai-strategic-innovation',
    title: 'How Enterprise Generative AI Drives Strategic Innovation',
    excerpt: 'How organizations can use generative AI to improve operations, strengthen decision-making, accelerate innovation, and build secure, scalable AI capabilities.',
    date: 'August 28, 2026',
    category: 'AI',
    readTime: '8 min read',
    author: {
      name: 'Robert Vance',
      role: 'Practice Director, AI',
      avatar: '/placeholder-user.jpg',
      bio: 'Robert directs our AI practice, engineering secure custom large language model integrations and agent networks for enterprises.'
    },
    related: ['ai-in-healthcare'],
    content: enterpriseGenerativeAiContentEn,
    image: ARTICLE_IMAGES['enterprise-generative-ai-strategic-innovation'],
    imageAlt: ARTICLE_ALT_TEXTS['enterprise-generative-ai-strategic-innovation'].en,
  },
  {
    slug: 'ai-in-healthcare',
    title: 'AI in Healthcare: How Intelligent Automation Is Transforming Enterprise Healthcare Operations',
    excerpt: 'A practical enterprise guide to healthcare AI automation, secure architecture, governance, clinical support, predictive analytics, and responsible implementation.',
    date: 'August 28, 2026',
    category: 'AI',
    readTime: '18 min read',
    author: {
      name: 'Robert Vance',
      role: 'Practice Director, AI',
      avatar: '/placeholder-user.jpg',
      bio: 'Robert directs our AI practice, engineering secure custom large language model integrations and agent networks for enterprises.'
    },
    related: ['enterprise-generative-ai-strategic-innovation'],
    content: aiInHealthcareContentEn,
    image: ARTICLE_IMAGES['ai-in-healthcare'],
    imageAlt: ARTICLE_ALT_TEXTS['ai-in-healthcare'].en,
  }
];

/** Approved featured images - unique, brand-aligned WebP assets */
export const ARTICLE_FEATURED_IMAGES: Record<string, string> = ARTICLE_IMAGES;

export const HOMEPAGE_INSIGHT_SLUGS = [
  'enterprise-generative-ai-strategic-innovation',
  'ai-in-healthcare',
] as const;

export const HOMEPAGE_FEATURED_SLUG = 'enterprise-generative-ai-strategic-innovation';
