'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Tracks which capability row is in the viewport activation zone (center band).
 * SSR-safe — runs only in useEffect.
 */
export function useActiveCapabilityIndex(count: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const elements = refs.current.filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (intersecting.length > 0) {
          const idx = elements.indexOf(intersecting[0].target as HTMLElement);
          if (idx >= 0) setActiveIndex(idx);
        }
      },
      {
        rootMargin: '-42% 0px -42% 0px',
        threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [count]);

  const setRef = (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  };

  return { activeIndex, setRef };
}
