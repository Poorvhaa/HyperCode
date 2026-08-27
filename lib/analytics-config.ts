/**
 * Public Google Analytics 4 measurement ID (safe for client-side use).
 * Override via NEXT_PUBLIC_GA_ID in production environment variables.
 */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID?.trim() || 'G-GT9B717VQD';

export function isValidGtmId(id: string | undefined): id is string {
  if (!id) return false;
  const trimmed = id.trim();
  return trimmed.length > 0 && trimmed !== 'GTM-XXXXXX' && trimmed.startsWith('GTM-');
}

export const GTM_CONTAINER_ID = isValidGtmId(process.env.NEXT_PUBLIC_GTM_ID)
  ? process.env.NEXT_PUBLIC_GTM_ID.trim()
  : null;
