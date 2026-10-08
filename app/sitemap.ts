import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { SERVICE_REGISTRY, ALIAS_MAP, canonicalServiceSlug } from '@/lib/services-details';
import { articles } from '@/lib/insights';
import { getArticleLocales } from '@/lib/insights-localizer';
import { localeUrl } from '@/lib/site-url';

const STATIC_PATHS = [
  '',
  'about',
  'careers',
  'contact',
  'consultation',
  'insights',
  'solutions',
  'staffing',
  'PP',
  'TnC',
  'cookie-policy',
];

function buildUrl(locale: string, path: string): string {
  return localeUrl(locale, path);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: buildUrl(locale, path),
        lastModified: now,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : path === 'solutions' ? 0.9 : 0.8,
      });
    }
  }

  const solutionSlugs = new Set(
    [...Object.keys(SERVICE_REGISTRY), ...Object.keys(ALIAS_MAP)].filter(
      (slug) => canonicalServiceSlug(slug) === slug
    )
  );

  for (const locale of routing.locales) {
    for (const slug of solutionSlugs) {
      entries.push({
        url: buildUrl(locale, `solutions/${slug}`),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.85,
      });
    }
  }

  for (const locale of routing.locales) {
    for (const article of articles) {
      if (!getArticleLocales(article.slug).includes(locale)) continue;
      const articleDate = article.modifiedIso || article.publishedIso;
      entries.push({
        url: buildUrl(locale, `insights/${article.slug}`),
        lastModified: articleDate ? new Date(`${articleDate}T12:00:00Z`) : now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
