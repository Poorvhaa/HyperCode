'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Tracks which capability row is closest to the viewport center.
 * SSR-safe — runs only in useEffect.
 */
export function useActiveCapabilityIndex(count: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  const updateActiveIndex = useCallback(() => {
    const elements = refs.current.filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    const viewportCenter = window.innerHeight / 2;
    let bestIdx = 0;
    let bestDistance = Infinity;

    elements.forEach((el, idx) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;

      const center = rect.top + rect.height / 2;
      const distance = Math.abs(center - viewportCenter);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIdx = idx;
      }
    });

    setActiveIndex((prev) => (prev === bestIdx ? prev : bestIdx));
  }, []);

  useEffect(() => {
    const elements = refs.current.filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      () => {
        updateActiveIndex();
      },
      {
        rootMargin: '-15% 0px -15% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));

    window.addEventListener('scroll', updateActiveIndex, { passive: true });
    window.addEventListener('resize', updateActiveIndex);
    updateActiveIndex();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateActiveIndex);
      window.removeEventListener('resize', updateActiveIndex);
    };
  }, [count, updateActiveIndex]);

  const setRef = (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  };

  return { activeIndex, setRef };
}
