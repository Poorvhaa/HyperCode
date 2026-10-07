import { enterpriseGenerativeAiContentEn } from './articles/enterprise-generative-ai-content';
import { aiInHealthcareContentEn } from './articles/ai-in-healthcare-content';
import { scalingSuccessCustomEnterpriseSoftwareContentEn } from './articles/scaling-success-custom-enterprise-software-content';
import { choosingEnterpriseAiPlatformContentEn, choosingEnterpriseAiPlatformFaqs } from './articles/choosing-right-enterprise-ai-platform-content';
import { enterpriseAiStrategyContentEn } from './articles/how-to-build-an-enterprise-ai-strategy-content';
import { topAiUseCasesContentEn } from './articles/top-5-ai-enterprise-software-use-cases-content';
import { enterpriseAutomationRoiContentEn } from './articles/maximizing-roi-with-enterprise-automation-tools-content';
import { intelligentSystemsContentEn } from './articles/building-intelligent-systems-enterprise-ai-companies-2026-content';
import { customSoftwareLifecycleContentEn } from './articles/lifecycle-of-custom-software-design-and-development-content';
import { enterpriseModernizationContentEn } from './articles/enterprise-software-development-modernizing-core-systems-content';
import { customSoftwareSolutionsContentEn } from './articles/why-enterprises-need-custom-software-development-solutions-content';
import { roiCustomBusinessSoftwareContentEn } from './articles/the-roi-of-custom-business-software-development-content';

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
    '/images/articles/how-to-build-an-enterprise-ai-strategy-workshop.webp',
  'top-5-ai-enterprise-software-use-cases-2026':
    '/images/articles/top-5-ai-enterprise-software-use-cases-2026-workshop.webp',
  'maximizing-roi-with-enterprise-automation-tools':
    '/images/articles/maximizing-roi-with-enterprise-automation-tools.webp',
  'building-intelligent-systems-enterprise-ai-companies-2026':
    '/images/articles/building-intelligent-systems-enterprise-ai-companies-2026.webp',
  'lifecycle-of-custom-software-design-and-development':
    '/images/articles/lifecycle-of-custom-software-design-and-development.webp',
  'enterprise-software-development-modernizing-core-systems':
    '/images/articles/enterprise-software-development-modernizing-core-systems.webp',
  'why-enterprises-need-custom-software-development-solutions':
    '/images/articles/why-enterprises-need-custom-software-development-solutions.webp',
  'the-roi-of-custom-business-software-development':
    '/images/articles/the-roi-of-custom-business-software-development.webp',
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
    en: 'HyperCode enterprise AI strategy workshop: a consultant presents the Discover to Scale roadmap and its foundations of goals, data, people, technology and governance to business leaders',
  },
  'top-5-ai-enterprise-software-use-cases-2026': {
    en: 'HyperCode consultant presenting five enterprise AI use cases, customer service, development, analytics, knowledge and automation, to a business technology team',
  },
  'maximizing-roi-with-enterprise-automation-tools': {
    en: 'Automation engine connected to workflow, database, cloud, document approval and AI tiles beneath a dashboard with a rising green trend line, on a deep navy background with the HyperCode logo',
  },
  'building-intelligent-systems-enterprise-ai-companies-2026': {
    en: 'Enterprise AI leaders collaborating at a wall display showing a layered intelligent system of data, workflow, governance and business value, with the HyperCode logo',
  },
  'lifecycle-of-custom-software-design-and-development': {
    en: 'HyperCode software team collaborating across discovery, design, development, testing, deployment, and continuous improvement.',
  },
  'enterprise-software-development-modernizing-core-systems': {
    en: 'HyperCode technology team planning the modernization of legacy enterprise systems into a connected cloud, data, API, and application platform.',
  },
  'why-enterprises-need-custom-software-development-solutions': {
    en: 'HyperCode software team designing a custom enterprise application around business workflows, integrations, data, and user needs.',
  },
  'the-roi-of-custom-business-software-development': {
    en: 'HyperCode team reviewing the ROI of custom business software, with a display showing manual work flowing through a custom application, integrations and data into rising business value.',
  },
};

export const articles: Article[] = [
  {
    slug: 'the-roi-of-custom-business-software-development',
    title: 'The ROI of Custom Business Software Development',
    excerpt: 'Learn how custom business software development helps organizations improve efficiency, integrate systems, automate workflows, and generate long-term ROI through scalable digital solutions.',
    date: 'October 8, 2026',
    category: 'Software Development',
    readTime: '8 min read',
    author: {
      name: 'HyperCode',
      role: 'Technology Consulting',
      avatar: '/placeholder-user.jpg',
      bio: 'HyperCode is a Schaumburg, Illinois-based technology consulting and engineering company founded in 2014.'
    },
    related: ['why-enterprises-need-custom-software-development-solutions', 'lifecycle-of-custom-software-design-and-development'],
    content: roiCustomBusinessSoftwareContentEn,
    image: ARTICLE_IMAGES['the-roi-of-custom-business-software-development'],
    imageAlt: ARTICLE_ALT_TEXTS['the-roi-of-custom-business-software-development'].en,
    seoTitle: 'The ROI of Custom Business Software Development | HyperCode',
    seoDescription: 'Discover how custom business software development improves efficiency, connects systems, automates workflows, and delivers long-term ROI for growing organizations.',
    ctaHeading: 'Ready to Increase ROI with Custom Business Software?',
    ctaBody: 'HyperCode helps organizations design, build, integrate, and scale custom software solutions that improve operations, automate workflows, and support long-term growth.',
    publishedIso: '2026-10-08',
    modifiedIso: '2026-10-08',
  },
  {
    slug: 'why-enterprises-need-custom-software-development-solutions',
    title: 'Why Enterprises Need Custom Software Development Solutions',
    excerpt: 'Learn why custom software development solutions help enterprises align technology with unique workflows, integrations, data, customer experiences, and long-term business growth.',
    date: 'October 7, 2026',
    category: 'Software Development',
    readTime: '7 min read',
    author: {
      name: 'HyperCode',
      role: 'Technology Consulting',
      avatar: '/placeholder-user.jpg',
      bio: 'HyperCode is a Schaumburg, Illinois-based technology consulting and engineering company founded in 2014.'
    },
    related: ['lifecycle-of-custom-software-design-and-development', 'enterprise-software-development-modernizing-core-systems'],
    content: customSoftwareSolutionsContentEn,
    image: ARTICLE_IMAGES['why-enterprises-need-custom-software-development-solutions'],
    imageAlt: ARTICLE_ALT_TEXTS['why-enterprises-need-custom-software-development-solutions'].en,
    seoTitle: 'Why Enterprises Need Custom Software Development Solutions | HyperCode',
    seoDescription: 'Learn why enterprises need custom software development solutions to support unique workflows, integrations, data, customer experiences, scalability, and future growth.',
    ctaHeading: 'Ready to Build Software Around the Way Your Business Actually Works?',
    ctaBody: 'HyperCode helps organizations turn unique business requirements into scalable custom applications through discovery, architecture, software engineering, integration, deployment, and continuous improvement.',
    publishedIso: '2026-10-07',
    modifiedIso: '2026-10-07',
  },
  {
    slug: 'enterprise-software-development-modernizing-core-systems',
    title: 'Enterprise Software Development: Modernizing Core Systems',
    excerpt: 'Learn how organizations can modernize core enterprise systems while preserving valuable business logic, data, integrations, and operational knowledge.',
    date: 'October 6, 2026',
    category: 'Software Development',
    readTime: '8 min read',
    author: {
      name: 'HyperCode',
      role: 'Technology Consulting',
      avatar: '/placeholder-user.jpg',
      bio: 'HyperCode is a Schaumburg, Illinois-based technology consulting and engineering company founded in 2014.'
    },
    related: ['lifecycle-of-custom-software-design-and-development', 'scaling-success-custom-enterprise-software'],
    content: enterpriseModernizationContentEn,
    image: ARTICLE_IMAGES['enterprise-software-development-modernizing-core-systems'],
    imageAlt: ARTICLE_ALT_TEXTS['enterprise-software-development-modernizing-core-systems'].en,
    seoTitle: 'Enterprise Software Development: Modernizing Core Systems | HyperCode',
    seoDescription: 'Learn how enterprise software development can modernize legacy core systems while preserving critical business logic, data, integrations, and operational knowledge.',
    ctaHeading: 'Ready to Modernize Your Core Systems?',
    ctaBody: 'HyperCode helps organizations assess legacy systems, preserve valuable business capabilities, modernize architecture, connect data and applications, and build scalable platforms for what comes next.',
    publishedIso: '2026-10-06',
    modifiedIso: '2026-10-06',
  },
  {
    slug: 'lifecycle-of-custom-software-design-and-development',
    title: 'The Lifecycle of Custom Software Design and Development',
    excerpt: 'Learn how custom software moves from business idea to dependable digital product through planning, design, engineering, testing, deployment, and continuous improvement.',
    date: 'October 5, 2026',
    category: 'Software Development',
    readTime: '7 min read',
    author: {
      name: 'HyperCode',
      role: 'Technology Consulting',
      avatar: '/placeholder-user.jpg',
      bio: 'HyperCode is a Schaumburg, Illinois-based technology consulting and engineering company founded in 2014.'
    },
    related: ['scaling-success-custom-enterprise-software', 'building-intelligent-systems-enterprise-ai-companies-2026'],
    content: customSoftwareLifecycleContentEn,
    image: ARTICLE_IMAGES['lifecycle-of-custom-software-design-and-development'],
    imageAlt: ARTICLE_ALT_TEXTS['lifecycle-of-custom-software-design-and-development'].en,
    seoTitle: 'Custom Software Design and Development Lifecycle | HyperCode',
    seoDescription: 'Explore the lifecycle of custom software design and development, from discovery and architecture through engineering, testing, deployment, security, and continuous improvement.',
    ctaHeading: 'Ready to Turn Your Software Idea Into a Scalable Product?',
    ctaBody: 'HyperCode helps organizations move from business requirements to dependable digital products through strategy, design, software engineering, integration, cloud, testing, deployment, and ongoing improvement.',
    publishedIso: '2026-10-05',
    modifiedIso: '2026-10-05',
  },
  {
    slug: 'building-intelligent-systems-enterprise-ai-companies-2026',
    title: 'Building Intelligent Systems: Enterprise AI Companies in 2026',
    excerpt: 'A practical guide to how enterprise AI companies design intelligent systems through strategy, data, architecture, automation, and scalable implementation.',
    date: 'October 5, 2026',
    category: 'AI',
    readTime: '9 min read',
    author: {
      name: 'HyperCode',
      role: 'Technology Consulting',
      avatar: '/placeholder-user.jpg',
      bio: 'HyperCode is a Schaumburg, Illinois-based technology consulting and engineering company founded in 2014.'
    },
    related: ['how-to-build-an-enterprise-ai-strategy', 'choosing-right-enterprise-ai-platform-for-scale'],
    content: intelligentSystemsContentEn,
    image: ARTICLE_IMAGES['building-intelligent-systems-enterprise-ai-companies-2026'],
    imageAlt: ARTICLE_ALT_TEXTS['building-intelligent-systems-enterprise-ai-companies-2026'].en,
    heroImage: '/images/articles/building-intelligent-systems-enterprise-ai-companies-2026-hero.webp',
    heroImageAlt: 'Two enterprise technology leaders at laptops review a five-layer intelligent system architecture rising from data to a green business outcome layer on a wide screen, with the HyperCode logo',
    seoTitle: 'Building Intelligent Systems: Enterprise AI Companies in 2026 | HyperCode',
    seoDescription: 'Learn how enterprise AI companies build intelligent systems through strategy, architecture, data, automation, governance, and scalable implementation.',
    ctaHeading: 'Ready to Build Intelligent Enterprise Systems?',
    ctaBody: 'HyperCode helps organizations design and implement scalable AI-powered systems through software engineering, data, cloud, automation, and enterprise integration.',
    publishedIso: '2026-10-05',
    modifiedIso: '2026-10-05',
  },
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
    heroImage: '/images/articles/top-5-ai-enterprise-software-use-cases-2026-workshop-hero.webp',
    heroImageAlt: 'Five enterprise teams, a customer service agent, a software developer, a data analyst, a knowledge worker and an operations manager, connected to a shared enterprise AI platform',
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
    heroImage: '/images/articles/how-to-build-an-enterprise-ai-strategy-workshop-hero.webp',
    heroImageAlt: 'Business and technology leaders around a planning table tracing an illuminated AI roadmap from a business goal through six milestones to a green growth chart',
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
