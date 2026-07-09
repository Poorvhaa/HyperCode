import { CookieConsent } from '@/types/cookieConsent';

const STORAGE_KEY = 'hypercode_cookie_consent';
const CONSENT_VERSION = '1.0';
const EXPIRATION_DAYS = 180;

/**
 * Retrieves the stored cookie consent and checks for expiration (180 days).
 */
export const getCookieConsent = (): CookieConsent | null => {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored) as CookieConsent;

    // Validate properties and version
    if (
      typeof parsed.necessary !== 'boolean' ||
      typeof parsed.analytics !== 'boolean' ||
      typeof parsed.functional !== 'boolean' ||
      typeof parsed.marketing !== 'boolean' ||
      !parsed.timestamp ||
      parsed.version !== CONSENT_VERSION
    ) {
      return null;
    }

    // Check if the consent has expired (180 days)
    const consentTime = new Date(parsed.timestamp).getTime();
    const currentTime = new Date().getTime();
    const diffInDays = (currentTime - consentTime) / (1000 * 60 * 60 * 24);

    if (diffInDays > EXPIRATION_DAYS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return parsed;
  } catch (error) {
    console.error('Error retrieving cookie consent from localStorage:', error);
    return null;
  }
};

/**
 * Saves cookie consent preferences to localStorage and triggers a change event.
 */
export const setCookieConsent = (preferences: {
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}): CookieConsent => {
  const consent: CookieConsent = {
    necessary: true,
    analytics: preferences.analytics,
    functional: preferences.functional,
    marketing: preferences.marketing,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
      // Dispatch a custom event to notify listeners (e.g. analytics scripts) in real-time
      window.dispatchEvent(new CustomEvent('hypercode-cookie-consent-changed', { detail: consent }));
    } catch (error) {
      console.error('Error saving cookie consent to localStorage:', error);
    }
  }

  return consent;
};

/**
 * Quick checks for specific categories of consent.
 */
export const hasAnalyticsConsent = (): boolean => {
  const consent = getCookieConsent();
  return consent ? consent.analytics : false;
};

export const hasMarketingConsent = (): boolean => {
  const consent = getCookieConsent();
  return consent ? consent.marketing : false;
};

export const hasFunctionalConsent = (): boolean => {
  const consent = getCookieConsent();
  return consent ? consent.functional : false;
};
