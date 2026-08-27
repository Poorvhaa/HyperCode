import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { SERVICE_REGISTRY, ALIAS_MAP } from '@/lib/services-details';
import { articles } from '@/lib/insights';
import { CASE_STUDIES } from '@/lib/case-studies-data';
import { SITE_URL } from '@/lib/site-url';

const STATIC_PATHS = [
  '',
  'about',
  'careers',
  'careers/apply',
  'contact',
  'consultation',
  'insights',
  'solutions',
  'staffing',
  'case-studies',
  'PP',
  'TnC',
  'cookie-policy',
];

function buildUrl(locale: string, path: string): string {
  if (!path) return `${SITE_URL}/${locale}`;
  return `${SITE_URL}/${locale}/${path}`;
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

  const solutionSlugs = new Set([
    ...Object.keys(SERVICE_REGISTRY),
    ...Object.keys(ALIAS_MAP),
  ]);

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
      entries.push({
        url: buildUrl(locale, `insights/${article.slug}`),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  for (const locale of routing.locales) {
    for (const slug of Object.keys(CASE_STUDIES)) {
      entries.push({
        url: buildUrl(locale, `case-studies/${slug}`),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.75,
      });
    }
  }

  return entries;
}
