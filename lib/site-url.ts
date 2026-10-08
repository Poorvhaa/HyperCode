export const SITE_URL = 'https://www.hypercodeit.com';

/**
 * Normalizes a route path for SEO/canonical URL generation:
 * - Strips query parameters (?...) and hash fragments (#...)
 * - Strips leading and trailing slashes
 * - Strips duplicate/nested locale segments (e.g. en/, es/, en/en/, es/es/)
 */
export function normalizePath(path = ''): string {
  if (!path) return '';
  let clean = path.split('?')[0].split('#')[0].trim();
  clean = clean.replace(/^\/+|\/+$/g, '');
  while (/^(en|es)(\/|$)/i.test(clean)) {
    clean = clean.replace(/^(en|es)(\/|$)/i, '').replace(/^\/+/, '');
  }
  return clean;
}

/**
 * Generates relative locale path, e.g. "/en" or "/en/contact"
 */
export function localePath(locale: string, path = ''): string {
  const clean = normalizePath(path);
  const loc = locale === 'es' ? 'es' : 'en';
  return clean ? `/${loc}/${clean}` : `/${loc}`;
}

/**
 * Generates absolute canonical URL, e.g. "https://www.hypercodeit.com/en/contact"
 */
export function localeUrl(locale: string, path = ''): string {
  return `${SITE_URL}${localePath(locale, path)}`;
}

/**
 * Generates hreflang alternates dictionary matching Next.js Metadata API:
 * Includes standard language codes ('en', 'es'), region codes ('en-US', 'es-US'),
 * and default fallback ('x-default').
 */
export function localeAlternates(path = '', locales: string[] = ['en', 'es']): Record<string, string> {
  const clean = normalizePath(path);
  const languages: Record<string, string> = {};
  if (locales.includes('en')) {
    languages.en = localeUrl('en', clean);
  }
  if (locales.includes('es')) {
    languages.es = localeUrl('es', clean);
  }
  if (locales.includes('en')) {
    languages['en-US'] = localeUrl('en', clean);
  }
  if (locales.includes('es')) {
    languages['es-US'] = localeUrl('es', clean);
  }
  languages['x-default'] = localeUrl('en', clean);
  return languages;
}

/**
 * Helper to build standard Next.js alternates object containing both canonical and languages.
 */
export function buildAlternates(locale: string, path = '') {
  return {
    canonical: localeUrl(locale, path),
    languages: localeAlternates(path),
  };
}

/**
 * Generates absolute URL for static assets or root resources.
 */
export function absoluteUrl(path: string): string {
  const clean = (path || '').split('?')[0].split('#')[0].trim();
  const normalizedPath = clean.startsWith('/') ? clean : `/${clean}`;
  return `${SITE_URL}${normalizedPath}`;
}
