/**
 * Google Analytics Event Tracking Utility
 */

export interface GTagEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

/**
 * Dispatches a custom tracking event to Google Analytics (gtag)
 */
export const trackGAEvent = ({ action, category, label, value, ...rest }: GTagEvent) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...rest,
    });
    console.log(`[Analytics] Tracked Event: ${action}`, { category, label, value, ...rest });
  } else {
    // Development fallback logging
    console.log(`[Analytics Mock] Event: ${action}`, { category, label, value, ...rest });
  }
};
