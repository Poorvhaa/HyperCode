'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Pauses WebGL/Canvas work when off-screen or tab is hidden.
 */
export function useCanvasActive(rootMargin = '80px') {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const sync = (intersecting: boolean) => {
      setActive(intersecting && !document.hidden);
    };

    const onVisibility = () => {
      if (document.hidden) {
        setActive(false);
        return;
      }
      const rect = el.getBoundingClientRect();
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;
      setActive(inView);
    };

    document.addEventListener('visibilitychange', onVisibility);

    const observer = new IntersectionObserver(
      ([entry]) => sync(entry.isIntersecting),
      { rootMargin, threshold: 0.05 },
    );
    observer.observe(el);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
    };
  }, [rootMargin]);

  return { containerRef, active };
}
