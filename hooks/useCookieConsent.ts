import { useContext } from 'react';
import { CookieConsentContext } from '@/components/CookieProvider';
import { CookieConsentContextType } from '@/types/cookieConsent';

/**
 * Hook to consume the CookieConsentContext and manage consent state/actions.
 */
export function useCookieConsent(): CookieConsentContextType {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieProvider');
  }
  return context;
}
