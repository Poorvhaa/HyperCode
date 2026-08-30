export type ArticleLocale = 'en' | 'es';

export type ArticleCategorySlug =
  | 'ai-automation'
  | 'business-intelligence'
  | 'data-analytics'
  | 'cloud-it'
  | 'software-development'
  | 'talent-staffing';

export interface ArticleCategory {
  slug: ArticleCategorySlug;
  label: Record<ArticleLocale, string>;
}

export interface ArticleDefinition {
  slug: string;
  image: string;
  title: Record<ArticleLocale, string>;
  excerpt: Record<ArticleLocale, string>;
  category: ArticleCategorySlug;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
  author: {
    name: string;
    role: Record<ArticleLocale, string>;
  };
  content: Record<ArticleLocale, string>;
  relatedSlugs: readonly string[];
}

export interface LocalizedArticle {
  slug: string;
  image: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  publishedAt: string;
  updatedAt: string;
  readingTimeMinutes: number;
  author: {
    name: string;
    role: string;
  };
  content: string;
  relatedSlugs: readonly string[];
}

export const ARTICLE_CATEGORIES: readonly ArticleCategory[] = [
  {
    slug: 'ai-automation',
    label: { en: 'AI & Automation', es: 'IA y Automatización' },
  },
  {
    slug: 'business-intelligence',
    label: { en: 'Business Intelligence', es: 'Inteligencia de Negocios' },
  },
  {
    slug: 'data-analytics',
    label: { en: 'Data & Analytics', es: 'Datos y Analítica' },
  },
  {
    slug: 'cloud-it',
    label: { en: 'Cloud & IT', es: 'Nube y TI' },
  },
  {
    slug: 'software-development',
    label: { en: 'Software Development', es: 'Desarrollo de Software' },
  },
  {
    slug: 'talent-staffing',
    label: { en: 'Talent & Staffing', es: 'Talento y Personal' },
  },
];

export const ARTICLE_LABELS = {
  en: {
    home: 'Home',
    eyebrow: 'ARTICLES',
    title: 'Articles',
    description:
      'Practical perspectives and guidance from HyperCode consultants on technology, data, software, and talent.',
    categories: 'Article categories',
    allCategories: 'All Categories',
    readArticle: 'Read Article',
    readingTime: (minutes: number) => `${minutes} min read`,
    comingSoonTitle: 'More articles are coming soon',
    comingSoonDescription:
      'Our editorial team is preparing practical guidance for technology and business leaders.',
    backToArticles: 'Back to Articles',
    tableOfContents: 'Table of Contents',
    relatedArticles: 'Related Articles',
    serviceCtaEyebrow: 'READY TO EXECUTE?',
    serviceCtaTitle: 'Turn insight into action',
    serviceCtaDescription:
      'Connect with HyperCode specialists to define the right next step for your organization.',
    articleNotFound: 'Article Not Found',
  },
  es: {
    home: 'Inicio',
    eyebrow: 'ARTÍCULOS',
    title: 'Artículos',
    description:
      'Perspectivas prácticas y orientación de los consultores de HyperCode sobre tecnología, datos, software y talento.',
    categories: 'Categorías de artículos',
    allCategories: 'Todas las Categorías',
    readArticle: 'Leer Artículo',
    readingTime: (minutes: number) => `${minutes} min de lectura`,
    comingSoonTitle: 'Próximamente habrá más artículos',
    comingSoonDescription:
      'Nuestro equipo editorial está preparando orientación práctica para líderes de tecnología y negocios.',
    backToArticles: 'Volver a Artículos',
    tableOfContents: 'Tabla de Contenidos',
    relatedArticles: 'Artículos Relacionados',
    serviceCtaEyebrow: '¿LISTO PARA EJECUTAR?',
    serviceCtaTitle: 'Convierta las ideas en acción',
    serviceCtaDescription:
      'Conecte con los especialistas de HyperCode para definir el siguiente paso adecuado para su organización.',
    articleNotFound: 'Artículo no encontrado',
  },
} as const;

export const ARTICLE_DEFINITIONS: readonly ArticleDefinition[] = [
  {
    slug: 'building-better-digital-foundations',
    image: '/placeholder.svg',
    title: {
      en: 'Building Better Digital Foundations',
      es: 'Construyendo Mejores Bases Digitales',
    },
    excerpt: {
      en: 'A practical starting point for aligning technology decisions with measurable business outcomes.',
      es: 'Un punto de partida práctico para alinear las decisiones tecnológicas con resultados empresariales medibles.',
    },
    category: 'software-development',
    publishedAt: '2026-08-31',
    readingTimeMinutes: 4,
    author: {
      name: 'HyperCode Team',
      role: {
        en: 'Technology Consulting',
        es: 'Consultoría Tecnológica',
      },
    },
    content: {
      en: `
        <p class="lead">Strong digital foundations help organizations move from ideas to dependable delivery. The right starting point combines clear priorities, maintainable systems, and a practical plan for growth.</p>
        <h2>Start with the outcome</h2>
        <p>Before selecting a framework or platform, define the business outcome the technology must support. A shared definition of success keeps teams focused and makes progress measurable.</p>
        <h2>Design for the next stage</h2>
        <p>Simple, well-documented architecture gives teams room to improve without creating unnecessary complexity. Establishing reliable integrations, observability, and ownership early makes future changes easier.</p>
        <h2>Build a path to execution</h2>
        <p>Break the work into focused increments, validate assumptions with users, and use each release to improve the next decision. This approach turns strategy into a delivery rhythm the organization can sustain.</p>
      `,
      es: `
        <p class="lead">Una base digital sólida ayuda a las organizaciones a pasar de las ideas a una entrega confiable. El punto de partida adecuado combina prioridades claras, sistemas mantenibles y un plan práctico de crecimiento.</p>
        <h2>Comience con el resultado</h2>
        <p>Antes de elegir un marco o una plataforma, defina el resultado empresarial que la tecnología debe respaldar. Una definición compartida del éxito mantiene al equipo enfocado y permite medir el progreso.</p>
        <h2>Diseñe para la siguiente etapa</h2>
        <p>Una arquitectura sencilla y bien documentada permite mejorar sin crear complejidad innecesaria. Establecer integraciones confiables, observabilidad y responsabilidades desde el inicio facilita los cambios futuros.</p>
        <h2>Construya un camino hacia la ejecución</h2>
        <p>Divida el trabajo en incrementos enfocados, valide las suposiciones con los usuarios y use cada lanzamiento para mejorar la siguiente decisión. Así, la estrategia se convierte en un ritmo de entrega sostenible.</p>
      `,
    },
    relatedSlugs: [],
  },
];

function getCategory(slug: ArticleCategorySlug): ArticleCategory {
  return ARTICLE_CATEGORIES.find((category) => category.slug === slug) ?? ARTICLE_CATEGORIES[0];
}

export function getLocalizedArticles(locale: ArticleLocale): LocalizedArticle[] {
  return ARTICLE_DEFINITIONS.map((article) => ({
    slug: article.slug,
    image: article.image,
    title: article.title[locale],
    excerpt: article.excerpt[locale],
    category: getCategory(article.category),
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt ?? article.publishedAt,
    readingTimeMinutes: article.readingTimeMinutes,
    author: {
      name: article.author.name,
      role: article.author.role[locale],
    },
    content: article.content[locale],
    relatedSlugs: article.relatedSlugs,
  }));
}

export function getLocalizedArticle(
  slug: string,
  locale: ArticleLocale
): LocalizedArticle | undefined {
  return getLocalizedArticles(locale).find((article) => article.slug === slug);
}

export function getRelatedArticles(
  article: LocalizedArticle,
  locale: ArticleLocale,
  limit = 3
): LocalizedArticle[] {
  const articles = getLocalizedArticles(locale);
  const explicitRelated = article.relatedSlugs
    .map((relatedSlug) => articles.find((candidate) => candidate.slug === relatedSlug))
    .filter((candidate): candidate is LocalizedArticle => candidate !== undefined);
  const sameCategory = articles.filter(
    (candidate) =>
      candidate.slug !== article.slug &&
      candidate.category.slug === article.category.slug &&
      !explicitRelated.some((related) => related.slug === candidate.slug)
  );

  return [...explicitRelated, ...sameCategory]
    .filter((candidate) => candidate.slug !== article.slug)
    .slice(0, limit);
}
