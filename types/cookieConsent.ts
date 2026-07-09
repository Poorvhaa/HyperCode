export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;
}

export type CookieCategory = 'necessary' | 'analytics' | 'functional' | 'marketing';

export interface CookieConsentContextType {
  consent: CookieConsent | null;
  isPreferencesOpen: boolean;
  isBannerVisible: boolean;
  acceptAll: () => void;
  rejectAll: () => void; // Rejects all optional cookies (accepts only necessary)
  savePreferences: (preferences: { analytics: boolean; functional: boolean; marketing: boolean }) => void;
  openPreferences: () => void;
  closePreferences: () => void;
}
