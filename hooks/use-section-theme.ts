'use client';

import { useEffect } from 'react';

export type NavThemeType = 'hero' | 'light' | 'transformation' | 'final-cta';

export function useSectionTheme() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies the active zone
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const theme = entry.target.getAttribute('data-section-theme') as NavThemeType;
          if (theme) {
            window.dispatchEvent(
              new CustomEvent('hypercode-theme-change', { detail: { theme } })
            );
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = document.querySelectorAll('[data-section-theme]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);
}
