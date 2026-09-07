export const SITE_URL = 'https://hypercodeit.com';

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
 * Generates absolute canonical URL, e.g. "https://hypercodeit.com/en/contact"
 */
export function localeUrl(locale: string, path = ''): string {
  return `${SITE_URL}${localePath(locale, path)}`;
}

/**
 * Generates hreflang alternates dictionary matching Next.js Metadata API:
 * Includes standard language codes ('en', 'es'), region codes ('en-US', 'es-US'),
 * and default fallback ('x-default').
 */
export function localeAlternates(path = ''): Record<string, string> {
  const clean = normalizePath(path);
  return {
    en: localeUrl('en', clean),
    es: localeUrl('es', clean),
    'en-US': localeUrl('en', clean),
    'es-US': localeUrl('es', clean),
    'x-default': localeUrl('en', clean),
  };
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
