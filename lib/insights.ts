import { enterpriseGenerativeAiContentEn } from './articles/enterprise-generative-ai-content';
import { aiInHealthcareContentEn } from './articles/ai-in-healthcare-content';
import { scalingSuccessCustomEnterpriseSoftwareContentEn } from './articles/scaling-success-custom-enterprise-software-content';
import { choosingEnterpriseAiPlatformContentEn, choosingEnterpriseAiPlatformFaqs } from './articles/choosing-right-enterprise-ai-platform-content';
import { enterpriseAiStrategyContentEn } from './articles/how-to-build-an-enterprise-ai-strategy-content';
import { topAiUseCasesContentEn } from './articles/top-5-ai-enterprise-software-use-cases-content';
import { enterpriseAutomationRoiContentEn } from './articles/maximizing-roi-with-enterprise-automation-tools-content';

export interface ArticleFaq {
  question: string;
  answer: string;
}

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
  /** Detail-page hero when it should differ from the card / social image. */
  heroImage?: string;
  heroImageAlt?: string;
  faqs?: ArticleFaq[];
  seoTitle?: string;
  seoDescription?: string;
  ctaHeading?: string;
  ctaBody?: string;
  publishedIso?: string;
  modifiedIso?: string;
}

export const ARTICLE_IMAGES: Record<string, string> = {
  'enterprise-generative-ai-strategic-innovation':
    '/images/articles/enterprise-generative-ai-strategic-innovation-hero.webp',
  'ai-in-healthcare':
    '/images/articles/ai-in-healthcare-intelligent-operations.webp',
  'scaling-success-custom-enterprise-software':
    '/images/articles/scaling-success-custom-enterprise-software.webp',
  'choosing-right-enterprise-ai-platform-for-scale':
    '/images/articles/choosing-right-enterprise-ai-platform-for-scale.webp',
  'how-to-build-an-enterprise-ai-strategy':
    '/images/articles/how-to-build-an-enterprise-ai-strategy.webp',
  'top-5-ai-enterprise-software-use-cases-2026':
    '/images/articles/top-5-ai-enterprise-software-use-cases-2026.webp',
  'maximizing-roi-with-enterprise-automation-tools':
    '/images/articles/maximizing-roi-with-enterprise-automation-tools.webp',
};

export const ARTICLE_ALT_TEXTS: Record<string, Record<string, string>> = {
  'enterprise-generative-ai-strategic-innovation': {
    en: 'Enterprise generative AI core connected to automation, data insights, innovation and business growth panels on a deep navy background, with the HyperCode logo',
    es: 'Núcleo de IA generativa empresarial conectado a paneles de automatización, análisis de datos, innovación y crecimiento empresarial sobre fondo azul marino, con el logotipo de HyperCode',
  },
  'ai-in-healthcare': {
    en: 'Healthcare physician in a white coat reviewing diagnostic imaging and clinical data on a dual-monitor workstation in a hospital clinical center',
    es: 'Médica con bata blanca revisando imágenes de diagnóstico y datos clínicos en una estación de trabajo de dos monitores en un centro hospitalario',
  },
  'scaling-success-custom-enterprise-software': {
    en: 'Layered enterprise software platform with dashboards, workflow automation, data and cloud tiers connected by integration lines to ERP, CRM, payment and cloud systems, in HyperCode blue, cyan and green',
  },
  'choosing-right-enterprise-ai-platform-for-scale': {
    en: 'Layered enterprise AI platform with data and cloud infrastructure, an AI orchestration tier and business application dashboards, connected to security, governance, API, analytics, automation and cloud icons, with the HyperCode logo',
  },
  'how-to-build-an-enterprise-ai-strategy': {
    en: 'Central enterprise intelligence core connected to business goals, people, data, AI, cloud technology, governance and growth tiles on a deep navy background, with the HyperCode logo',
  },
  'top-5-ai-enterprise-software-use-cases-2026': {
    en: 'Enterprise AI core connected to five use-case tiles for customer service, document workflow automation, enterprise knowledge search, AI-assisted software development and analytics, with the HyperCode logo',
  },
  'maximizing-roi-with-enterprise-automation-tools': {
    en: 'Automation engine connected to workflow, database, cloud, document approval and AI tiles beneath a dashboard with a rising green trend line, on a deep navy background with the HyperCode logo',
  },
};

export const articles: Article[] = [
  {
    slug: 'maximizing-roi-with-enterprise-automation-tools',
    title: 'Maximizing ROI with Enterprise Automation Tools',
    excerpt: 'A practical framework for turning automation investment into measurable business value.',
    date: 'October 2, 2026',
    category: 'AI',
    readTime: '8 min read',
    author: {
      name: 'HyperCode',
      role: 'Technology Consulting',
      avatar: '/placeholder-user.jpg',
      bio: 'HyperCode is a Schaumburg, Illinois-based technology consulting and engineering company founded in 2014.'
    },
    related: ['top-5-ai-enterprise-software-use-cases-2026', 'how-to-build-an-enterprise-ai-strategy'],
    content: enterpriseAutomationRoiContentEn,
    image: ARTICLE_IMAGES['maximizing-roi-with-enterprise-automation-tools'],
    imageAlt: ARTICLE_ALT_TEXTS['maximizing-roi-with-enterprise-automation-tools'].en,
    heroImage: '/images/articles/maximizing-roi-with-enterprise-automation-tools-hero.webp',
    heroImageAlt: 'A connected journey of six platforms from a workflow map and automation gear through integration, a metrics dashboard and optimization to stacked blocks with a rising green arrow',
    seoTitle: 'Maximizing ROI with Enterprise Automation Tools | HyperCode',
    seoDescription: 'Learn how enterprise automation tools can improve efficiency, reduce friction, connect workflows, and create measurable business value with a practical ROI framework.',
    ctaHeading: 'Ready to Turn Automation Into Measurable Business Value?',
    ctaBody: 'HyperCode helps organizations connect workflows, applications, data, AI and cloud technologies to build practical automation solutions around real business operations.',
    publishedIso: '2026-10-02',
    modifiedIso: '2026-10-02',
  },
  {
    slug: 'top-5-ai-enterprise-software-use-cases-2026',
    title: 'Top 5 AI Enterprise Software Use Cases for 2026',
    excerpt: 'A practical guide to where enterprise AI software creates measurable business value.',
    date: 'October 1, 2026',
    category: 'AI',
    readTime: '12 min read',
    author: {
      name: 'HyperCode',
      role: 'Technology Consulting',
      avatar: '/placeholder-user.jpg',
      bio: 'HyperCode is a Schaumburg, Illinois-based technology consulting and engineering company founded in 2014.'
    },
    related: ['how-to-build-an-enterprise-ai-strategy', 'choosing-right-enterprise-ai-platform-for-scale'],
    content: topAiUseCasesContentEn,
    image: ARTICLE_IMAGES['top-5-ai-enterprise-software-use-cases-2026'],
    imageAlt: ARTICLE_ALT_TEXTS['top-5-ai-enterprise-software-use-cases-2026'].en,
    heroImage: '/images/articles/top-5-ai-enterprise-software-use-cases-2026-hero.webp',
    heroImageAlt: 'Central enterprise AI hub connected to five use cases: a customer service headset, a document workflow, a knowledge search book, a laptop with code and a rising analytics chart',
    seoTitle: 'Top 5 AI Enterprise Software Use Cases for 2026 | HyperCode',
    seoDescription: 'Explore 5 practical AI enterprise software use cases for 2026, from customer service and workflow automation to knowledge, AI-assisted IT and analytics.',
    ctaHeading: 'Ready to Put AI to Work in Your Enterprise?',
    ctaBody: 'HyperCode connects AI and automation with custom applications, data, cloud and existing business systems, so intelligence becomes part of the work.',
    publishedIso: '2026-10-01',
    modifiedIso: '2026-10-01',
  },
  {
    slug: 'how-to-build-an-enterprise-ai-strategy',
    title: 'How to Build an Enterprise AI Strategy: A Practical Roadmap for 2026',
    excerpt: 'A business-led guide to moving from AI opportunity to practical, secure and scalable enterprise execution.',
    date: 'October 1, 2026',
    category: 'AI',
    readTime: '7 min read',
    author: {
      name: 'HyperCode',
      role: 'Technology Consulting',
      avatar: '/placeholder-user.jpg',
      bio: 'HyperCode is a Schaumburg, Illinois-based technology consulting and engineering company founded in 2014.'
    },
    related: ['choosing-right-enterprise-ai-platform-for-scale', 'enterprise-generative-ai-strategic-innovation'],
    content: enterpriseAiStrategyContentEn,
    image: ARTICLE_IMAGES['how-to-build-an-enterprise-ai-strategy'],
    imageAlt: ARTICLE_ALT_TEXTS['how-to-build-an-enterprise-ai-strategy'].en,
    heroImage: '/images/articles/how-to-build-an-enterprise-ai-strategy-hero.webp',
    heroImageAlt: 'People, business goals, data, intelligence, cloud technology and governance flowing together into rising steps and a growth chart representing measurable enterprise impact, in HyperCode blue and green',
    seoTitle: 'How to Build an Enterprise AI Strategy: 2026 Roadmap | HyperCode',
    seoDescription: 'Learn how to build an enterprise AI strategy for 2026 with a practical roadmap covering business goals, data, architecture, governance, automation, adoption and scale.',
    ctaHeading: 'Ready to Build an Enterprise AI Strategy That Can Scale?',
    ctaBody: 'HyperCode helps organizations connect business strategy, data, AI, software engineering, cloud and automation to build practical technology solutions around real business requirements.',
    publishedIso: '2026-10-01',
    modifiedIso: '2026-10-01',
  },
  {
    slug: 'choosing-right-enterprise-ai-platform-for-scale',
    title: 'Choosing the Right Enterprise AI Platform for Scale',
    excerpt: 'A practical guide to choosing an enterprise AI platform that can scale with your business across data, security, integration, governance, flexibility, performance, and cost.',
    date: 'September 30, 2026',
    category: 'AI',
    readTime: '9 min read',
    author: {
      name: 'HyperCode',
      role: 'Technology Consulting',
      avatar: '/placeholder-user.jpg',
      bio: 'HyperCode is a Schaumburg, Illinois-based technology consulting and engineering company founded in 2014.'
    },
    related: ['enterprise-generative-ai-strategic-innovation', 'scaling-success-custom-enterprise-software'],
    content: choosingEnterpriseAiPlatformContentEn,
    image: ARTICLE_IMAGES['choosing-right-enterprise-ai-platform-for-scale'],
    imageAlt: ARTICLE_ALT_TEXTS['choosing-right-enterprise-ai-platform-for-scale'].en,
    heroImage: '/images/articles/choosing-right-enterprise-ai-platform-for-scale-hero.webp',
    heroImageAlt: 'Enterprise AI journey from data sources to AI models, applications, automated workflows, security, governance and business outcomes, shown as connected platforms in HyperCode blue, cyan and green',
    faqs: choosingEnterpriseAiPlatformFaqs,
    seoTitle: 'Choosing the Right Enterprise AI Platform for Scale | HyperCode',
    seoDescription: 'Learn how to choose an enterprise AI platform for scale by evaluating security, data integration, governance, flexibility, performance, cost, and long-term business value.',
    ctaHeading: 'Ready to Explore Enterprise AI for Your Business?',
    ctaBody: 'HyperCode helps organizations evaluate AI opportunities and design solutions around their existing technology, data, workflows, and business objectives. WE SOLVE. WE BUILD. YOU GROW.',
    publishedIso: '2026-09-30',
  },
  {
    slug: 'scaling-success-custom-enterprise-software',
    title: 'Scaling Success with Custom Enterprise Software',
    excerpt: 'How purpose-built enterprise software helps organizations connect systems, automate workflows, modernize operations and create a scalable foundation for growth.',
    date: 'September 29, 2026',
    category: 'Software Development',
    readTime: '9 min read',
    author: {
      name: 'HyperCode',
      role: 'Technology Consulting',
      avatar: '/placeholder-user.jpg',
      bio: 'HyperCode is a Schaumburg, Illinois-based technology consulting and engineering company founded in 2014.'
    },
    related: ['enterprise-generative-ai-strategic-innovation', 'ai-in-healthcare'],
    content: scalingSuccessCustomEnterpriseSoftwareContentEn,
    image: ARTICLE_IMAGES['scaling-success-custom-enterprise-software'],
    imageAlt: ARTICLE_ALT_TEXTS['scaling-success-custom-enterprise-software'].en,
    seoTitle: 'Scaling Success with Custom Enterprise Software | HyperCode',
    seoDescription: 'Learn how custom enterprise software development helps organizations connect systems, automate workflows, modernize operations, and build scalable digital platforms.',
    ctaHeading: 'Ready to Build a Scalable Enterprise Platform?',
    ctaBody: 'HyperCode helps organizations move from business challenge to production-ready digital systems through custom software, AI, cloud, data and enterprise integration.',
    publishedIso: '2026-09-29',
  },
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
    seoTitle: 'How Enterprise Generative AI Drives Strategic Innovation | HyperCode',
    publishedIso: '2026-08-28',
    modifiedIso: '2026-09-30',
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
