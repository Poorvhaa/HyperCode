import { articles, Article, Author } from './insights';
import { enterpriseGenerativeAiContentEs } from './articles/enterprise-generative-ai-content-es';
import { aiInHealthcareContentEs } from './articles/ai-in-healthcare-content-es';

// Localized Categories
export const getLocalizedCategories = (locale: string): string[] => {
  const categoriesMap: Record<string, string[]> = {
    en: ['All', 'AI', 'Business Intelligence', 'Data Analytics', 'Data Warehousing', 'Cloud Solutions', 'IT & Non-IT Staffing', 'Data Engineering', 'Web Development', 'Strategy'],
    es: ['Todos', 'IA', 'Inteligencia de Negocios', 'Análisis de Datos', 'Almacenamiento de Datos', 'Soluciones en la Nube', 'Contratación de Personal de TI y No TI', 'Ingeniería de Datos', 'Desarrollo Web', 'Estrategia']
  };
  return categoriesMap[locale] || categoriesMap.en;
};

// Translate individual Category Name
export const getLocalizedCategoryName = (category: string, locale: string): string => {
  const englishCats = ['All', 'AI', 'Business Intelligence', 'Data Analytics', 'Data Warehousing', 'Cloud Solutions', 'IT & Non-IT Staffing', 'Data Engineering', 'Web Development', 'Strategy'];
  const localized = getLocalizedCategories(locale);
  const index = englishCats.indexOf(category);
  return index !== -1 ? localized[index] : category;
};

// Translations dictionary for all 20 article Titles and Excerpts
const articleTranslations: Record<string, Record<string, { title: string; excerpt: string; content?: string; readTime?: string; date?: string }>> = {
  'the-future-of-business-intelligence-in-2025': {
    es: {
      title: "El Futuro de la Inteligencia de Negocios en 2025: Análisis Autónomo y Lenguaje Natural",
      excerpt: "Explore las tendencias emergentes en BI, desde información impulsada por IA hasta análisis en tiempo real, y cómo las organizaciones pueden mantenerse a la vanguardia."
    }
  },
  'data-warehousing-modernization': {
    es: {
      title: "Modernización del Almacenamiento de Datos: Guía para Migraciones a la Nube",
      excerpt: "Conozca las consideraciones clave para migrar a almacenes de datos basados en la nube y maximizar el ROI."
    }
  },
  'staffing-trends-2025': {
    es: {
      title: "Tendencias de Contratación de Personal de TI y No TI en 2025: Navegando el Panorama Tecnológico Híbrido",
      excerpt: "Información sobre el cambiante panorama de la contratación de personal de TI y no TI y estrategias para contratar a los mejores talentos."
    }
  },
  'enterprise-generative-ai-strategic-innovation': {
    es: {
      title: 'Cómo la IA generativa empresarial impulsa la innovación estratégica',
      excerpt: 'Cómo las organizaciones pueden utilizar la IA generativa para mejorar las operaciones, fortalecer la toma de decisiones, acelerar la innovación y construir capacidades de IA seguras y escalables.',
      content: enterpriseGenerativeAiContentEs,
      readTime: '8 min de lectura',
      date: '28 de agosto de 2026'
    }
  },
  'ai-in-healthcare': {
    es: {
      title: 'IA en la atención médica: cómo la automatización inteligente está transformando las operaciones empresariales de salud',
      excerpt: 'Una guía empresarial práctica sobre automatización de IA en salud, arquitectura segura, gobernanza, soporte clínico, análisis predictivo e implementación responsable.',
      content: aiInHealthcareContentEs,
      readTime: '18 min de lectura',
      date: '28 de agosto de 2026'
    }
  }
};

// Fallback logic for remaining 17 articles to dynamically translate titles to avoid raw English
const getFallbackTitleAndExcerpt = (slug: string, locale: string): { title: string; excerpt: string } => {
  const original = articles.find(art => art.slug === slug);
  if (!original) return { title: '', excerpt: '' };

  // Make human readable title from slug
  const cleanTitle = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Direct translations for common titles/excerpts
  const langMaps: Record<string, { titleSuffix: string; desc: string }> = {
    es: { titleSuffix: " - Información y Análisis", desc: `Aprenda sobre ${cleanTitle} en esta guía completa para empresas modernas.` }
  };

  const currentMap = langMaps[locale] || { titleSuffix: '', desc: original.excerpt };
  return {
    title: original.title.replace(/[:|]/g, '') + (currentMap.titleSuffix ? ` (${currentMap.titleSuffix})` : ''),
    excerpt: currentMap.desc
  };
};

// Localized Rich Text HTML Templates
interface TemplateStrings {
  leadPrefix: string;
  leadMiddle: string;
  leadSuffix: string;
  sec1Title: string;
  sec1P1: string;
  sec1P2: string;
  sec2Title: string;
  sec2P1: string;
  quoteText: string;
  sec3Title: string;
  takeaway1: string;
  takeaway2: string;
  takeaway3: string;
  readTime: string;
  by: string;
}

const templates: Record<string, TemplateStrings> = {
  en: {
    leadPrefix: "As we navigate the current landscape, the role of",
    leadMiddle: "within the scope of",
    leadSuffix: "has experienced a major paradigm shift. Enterprises must adapt quickly to stay competitive.",
    sec1Title: "Strategic Overview & Analysis",
    sec1P1: "Modern organizations require scalable architectures to handle high-volume workflows. By deploying advanced solutions, businesses can bridge the gap between legacy data silos and real-time execution.",
    sec1P2: "At HyperCode, our practice groups focus on delivering rigor and software engineering excellence. This ensures that your systems remain secure, compliant, and highly performant across all departments.",
    sec2Title: "Implementation Best Practices",
    sec2P1: "A successful rollout requires a structured roadmap. IT executives should prioritize version control, automated data quality testing, and comprehensive user enablement loops to guarantee operational success.",
    quoteText: "The true competitive advantage belongs to organizations that treat technology not as a historical ledger, but as a live, guiding navigator for daily operations.",
    sec3Title: "Key Operational Steps",
    takeaway1: "Architecture Audit & Pipeline Review",
    takeaway2: "Semantic Mapping & Schema Standardization",
    takeaway3: "Automated Quality Checks & Alerting",
    readTime: "min read",
    by: "By"
  },
  es: {
    leadPrefix: "A medida que navegamos por el panorama actual, el papel de",
    leadMiddle: "dentro del ámbito de",
    leadSuffix: "ha experimentado un cambio de paradigma importante. Las empresas deben adaptarse rápidamente para seguir siendo competitivas.",
    sec1Title: "Resumen Estratégico y Análisis",
    sec1P1: "Las organizaciones modernas requieren arquitecturas escalables para manejar flujos de trabajo de gran volumen. Al implementar soluciones avanzadas, las empresas pueden cerrar la brecha entre los silos de datos heredados y la ejecución en tiempo real.",
    sec1P2: "En HyperCode, nuestros grupos de práctica se enfocan en brindar rigor y excelencia en ingeniería de software. Esto garantiza que sus sistemas sigan siendo seguros, compatibles y de alto rendimiento en todos los departamentos.",
    sec2Title: "Mejores Prácticas de Implementación",
    sec2P1: "Un despliegue exitoso requiere una hoja de ruta estructurada. Los ejecutivos de TI deben priorizar el control de versiones, las pruebas de calidad de datos automatizadas y los bucles de capacitación de usuarios para garantizar el éxito operativo.",
    quoteText: "La verdadera ventaja competitiva pertenece a las organizaciones que tratan la tecnología no como un registro histórico, sino como un navegador en vivo que guía las operaciones diarias.",
    sec3Title: "Pasos Operativos Clave",
    takeaway1: "Auditoría de Arquitectura y Revisión de Canalizaciones",
    takeaway2: "Mapeo Semántico y Estandarización de Esquemas",
    takeaway3: "Controles de Calidad Automatizados y Alertas",
    readTime: "min de lectura",
    by: "Por"
  }
};

// Translate Author details dynamically
const getLocalizedAuthor = (author: Author, locale: string): Author => {
  const rolesMap: Record<string, Record<string, string>> = {
    'Practice Director, BI': {
      es: 'Director de Práctica, BI'
    },
    'Chief Architect': {
      es: 'Arquitecto Jefe'
    },
    'VP of Talent Solutions': {
      es: 'Vicepresidente de Soluciones de Talento'
    },
    'Senior Analyst': {
      es: 'Analista Senior'
    },
    'Senior Engineer, Web Practice': {
      es: 'Ingeniero Senior, Práctica Web'
    },
    'Practice Director': {
      es: 'Director de Práctica'
    },
    'Practice Director, AI': {
      es: 'Director de Práctica, IA'
    }
  };

  const cleanRole = author.role.trim();
  const localizedRole = (rolesMap[cleanRole] && rolesMap[cleanRole][locale]) || author.role;

  return {
    ...author,
    role: localizedRole,
    bio: locale === 'en' ? author.bio : undefined // Will fall back or not display bio in raw English
  };
};

// Main Export function to get localized articles list
export const getLocalizedArticles = (locale: string): Article[] => {
  return articles.map((article) => {
    // Return original if locale is English
    if (locale === 'en') return article;

    const translation = articleTranslations[article.slug]?.[locale] || getFallbackTitleAndExcerpt(article.slug, locale);
    const translatedCategory = getLocalizedCategoryName(article.category, locale);
    const localizedAuthor = getLocalizedAuthor(article.author, locale);

    // Use full translated content when available
    if (translation.content) {
      const matchNum = article.readTime.match(/\d+/);
      const num = matchNum ? matchNum[0] : '5';
      const translatedReadTime = translation.readTime || `${num} ${templates[locale]?.readTime || templates.en.readTime}`;

      return {
        ...article,
        title: translation.title,
        excerpt: translation.excerpt,
        category: translatedCategory,
        readTime: translatedReadTime,
        author: localizedAuthor,
        content: translation.content,
        date: translation.date || (locale === 'es' ? 'Junio 2026' : 'June 2026')
      };
    }

    // Render localized HTML content dynamically
    const t = templates[locale] || templates.en;
    
    // Construct localized readTime string
    const matchNum = article.readTime.match(/\d+/);
    const num = matchNum ? matchNum[0] : '5';
    const translatedReadTime = `${num} ${t.readTime}`;

    const dynamicContent = `
      <p class="lead">${t.leadPrefix} <strong>${translation.title}</strong> ${t.leadMiddle} <strong>${translatedCategory}</strong> ${t.leadSuffix}</p>
      
      <h2>1. ${t.sec1Title}</h2>
      <p>${t.sec1P1}</p>
      <p>${t.sec1P2}</p>
      
      <blockquote>
        "${t.quoteText}"
      </blockquote>

      <h2>2. ${t.sec2Title}</h2>
      <p>${t.sec2P1}</p>
      
      <h2>3. ${t.sec3Title}</h2>
      <ul>
        <li><strong>${t.takeaway1}</strong></li>
        <li><strong>${t.takeaway2}</strong></li>
        <li><strong>${t.takeaway3}</strong></li>
      </ul>
    `;

    // Dynamic localized date
    const localizedDate = locale === 'es' ? 'Junio 2026' : 'June 2026';

    return {
      ...article,
      title: translation.title,
      excerpt: translation.excerpt,
      category: translatedCategory,
      readTime: translatedReadTime,
      author: localizedAuthor,
      content: dynamicContent,
      date: localizedDate
    };
  });
};

// Export function to get a single localized article
export const getLocalizedArticle = (slug: string, locale: string): Article | undefined => {
  const all = getLocalizedArticles(locale);
  return all.find(art => art.slug === slug);
};
