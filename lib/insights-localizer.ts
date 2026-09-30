import { articles, Article, Author } from './insights';
import { enterpriseGenerativeAiContentEs } from './articles/enterprise-generative-ai-content-es';
import { aiInHealthcareContentEs } from './articles/ai-in-healthcare-content-es';

// Localized Categories
export const getLocalizedCategories = (locale: string): string[] => {
  const categoriesMap: Record<string, string[]> = {
    en: ['All', 'AI', 'Software Development'],
    es: ['Todos', 'IA', 'Desarrollo de Software']
  };
  return categoriesMap[locale] || categoriesMap.en;
};

// Translate individual Category Name
export const getLocalizedCategoryName = (category: string, locale: string): string => {
  const englishCats = ['All', 'AI', 'Software Development'];
  const localized = getLocalizedCategories(locale);
  const index = englishCats.indexOf(category);
  return index !== -1 ? localized[index] : category;
};

// Translations dictionary for the 2 retained articles
const articleTranslations: Record<string, Record<string, { title: string; excerpt: string; content?: string; readTime?: string; date?: string; imageAlt?: string }>> = {
  'enterprise-generative-ai-strategic-innovation': {
    es: {
      title: 'Cómo la IA generativa empresarial impulsa la innovación estratégica',
      excerpt: 'Cómo las organizaciones pueden utilizar la IA generativa para mejorar las operaciones, fortalecer la toma de decisiones, acelerar la innovación y construir capacidades de IA seguras y escalables.',
      content: enterpriseGenerativeAiContentEs,
      readTime: '8 min de lectura',
      date: '28 de agosto de 2026',
      imageAlt: 'Núcleo de IA generativa empresarial conectado a paneles de automatización, análisis de datos, innovación y crecimiento empresarial sobre fondo azul marino, con el logotipo de HyperCode'
    }
  },
  'ai-in-healthcare': {
    es: {
      title: 'IA en la atención médica: cómo la automatización inteligente está transformando las operaciones empresariales de salud',
      excerpt: 'Una guía empresarial práctica sobre automatización de IA en salud, arquitectura segura, gobernanza, soporte clínico, análisis predictivo e implementación responsable.',
      content: aiInHealthcareContentEs,
      readTime: '18 min de lectura',
      date: '28 de agosto de 2026',
      imageAlt: 'Médica con bata blanca revisando imágenes de diagnóstico y datos clínicos en una estación de trabajo de dos monitores en un centro hospitalario'
    }
  }
};

// Translate Author details dynamically
const getLocalizedAuthor = (author: Author, locale: string): Author => {
  const rolesMap: Record<string, Record<string, string>> = {
    'Practice Director, AI': {
      es: 'Director de Práctica, IA'
    }
  };

  const cleanRole = author.role.trim();
  const localizedRole = (rolesMap[cleanRole] && rolesMap[cleanRole][locale]) || author.role;

  return {
    ...author,
    role: localizedRole,
    bio: locale === 'en' ? author.bio : undefined
  };
};

// Main Export function to get localized articles list
export const getLocalizedArticles = (locale: string): Article[] => {
  return articles.map((article) => {
    // Return original if locale is English
    if (locale === 'en') return article;

    const translation = articleTranslations[article.slug]?.[locale];
    const translatedCategory = getLocalizedCategoryName(article.category, locale);
    const localizedAuthor = getLocalizedAuthor(article.author, locale);

    if (translation && translation.content) {
      return {
        ...article,
        title: translation.title,
        excerpt: translation.excerpt,
        category: translatedCategory,
        readTime: translation.readTime || article.readTime,
        author: localizedAuthor,
        content: translation.content,
        date: translation.date || '28 de agosto de 2026',
        seoTitle: undefined,
        seoDescription: undefined,
        image: article.image,
        imageAlt: translation.imageAlt || article.imageAlt
      };
    }

    return {
      ...article,
      category: translatedCategory,
      author: localizedAuthor,
      image: article.image,
      imageAlt: translation?.imageAlt || article.imageAlt
    };
  });
};

// Export function to get a single localized article
export const getLocalizedArticle = (slug: string, locale: string): Article | undefined => {
  const all = getLocalizedArticles(locale);
  return all.find(art => art.slug === slug);
};
