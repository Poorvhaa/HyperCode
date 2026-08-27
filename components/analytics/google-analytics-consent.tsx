'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import { GA_MEASUREMENT_ID } from '@/lib/analytics-config';

/**
 * Loads GA4 site-wide when analytics cookie consent is granted.
 * Rendered once from CookieProvider — covers all App Router pages and client navigations.
 */
export function GoogleAnalyticsConsent() {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    return null;
  }

  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
