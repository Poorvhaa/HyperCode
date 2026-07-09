'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import Script from 'next/script';
import { CookieConsent, CookieConsentContextType } from '@/types/cookieConsent';
import { getCookieConsent, setCookieConsent } from '@/lib/cookieConsent';

export const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

interface CookieProviderProps {
  children: ReactNode;
}

export function CookieProvider({ children }: CookieProviderProps) {
  const [consent, setConsentState] = useState<CookieConsent | null>(null);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const activeConsent = getCookieConsent();
    if (activeConsent) {
      setConsentState(activeConsent);
    } else {
      setIsBannerVisible(true);
    }
  }, []);

  // Listen to external triggers to reopen preferences or update consent
  useEffect(() => {
    if (!hasMounted) return;

    const handleConsentChange = (e: Event) => {
      const customEvent = e as CustomEvent<CookieConsent>;
      if (customEvent.detail) {
        setConsentState(customEvent.detail);
      } else {
        setConsentState(getCookieConsent());
      }
    };

    window.addEventListener('hypercode-cookie-consent-changed', handleConsentChange);
    return () => {
      window.removeEventListener('hypercode-cookie-consent-changed', handleConsentChange);
    };
  }, [hasMounted]);

  const acceptAll = () => {
    const preferences = {
      analytics: true,
      functional: true,
      marketing: true,
    };
    const updated = setCookieConsent(preferences);
    setConsentState(updated);
    setIsBannerVisible(false);
    console.log('[CookieConsent] Accepted all cookies.');
  };

  const rejectAll = () => {
    const preferences = {
      analytics: false,
      functional: false,
      marketing: false,
    };
    const updated = setCookieConsent(preferences);
    setConsentState(updated);
    setIsBannerVisible(false);
    console.log('[CookieConsent] Rejected all optional cookies (Strictly Necessary only).');
  };

  const savePreferences = (preferences: {
    analytics: boolean;
    functional: boolean;
    marketing: boolean;
  }) => {
    const updated = setCookieConsent(preferences);
    setConsentState(updated);
    setIsBannerVisible(false);
    setIsPreferencesOpen(false);
    console.log('[CookieConsent] Saved preferences:', preferences);
  };

  const openPreferences = () => {
    setIsPreferencesOpen(true);
  };

  const closePreferences = () => {
    setIsPreferencesOpen(false);
  };

  // IDs configuration via Env or Defaults
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXX';
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID || 'clarity-mock-id';
  const linkedinPartnerId = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || 'linkedin-mock-id';
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || 'meta-pixel-mock-id';

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        isPreferencesOpen,
        isBannerVisible,
        acceptAll,
        rejectAll,
        savePreferences,
        openPreferences,
        closePreferences,
      }}
    >
      {children}

      {/* Conditionally Load Tracking Scripts based on Consent */}
      {hasMounted && consent?.analytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
            onLoad={() => console.log('[Scripts] Loaded Google Analytics library')}
          />
          <Script id="google-analytics-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
              });
              console.log('[Scripts] Initialized Google Analytics (gtag)');
            `}
          </Script>

          <Script id="google-tag-manager-init" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
              console.log('[Scripts] Initialized Google Tag Manager (${gtmId})');
            `}
          </Script>

          <Script id="microsoft-clarity-init" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
              console.log('[Scripts] Initialized Microsoft Clarity (${clarityId})');
            `}
          </Script>
        </>
      )}

      {hasMounted && consent?.marketing && (
        <>
          <Script id="linkedin-insight-init" strategy="afterInteractive">
            {`
              _linkedin_partner_id = "${linkedinPartnerId}";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);})(window.lintrk);
              console.log('[Scripts] Initialized LinkedIn Insight (${linkedinPartnerId})');
            `}
          </Script>

          <Script id="meta-pixel-init" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
              console.log('[Scripts] Initialized Meta Pixel (${metaPixelId})');
            `}
          </Script>
        </>
      )}
    </CookieConsentContext.Provider>
  );
}
