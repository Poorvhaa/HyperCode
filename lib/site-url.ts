export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://hypercodeit.com';

export function localeUrl(locale: string, path = ''): string {
  const normalizedPath = path.replace(/^\//, '');
  return normalizedPath
    ? `${SITE_URL}/${locale}/${normalizedPath}`
    : `${SITE_URL}/${locale}`;
}

export function localeAlternates(path = ''): Record<string, string> {
  return {
    'en-US': localeUrl('en', path),
    'es-US': localeUrl('es', path),
    'x-default': localeUrl('en', path),
  };
}

export function absoluteUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}
