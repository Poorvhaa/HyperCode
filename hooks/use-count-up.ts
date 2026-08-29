'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { countUp, landingViewport } from '@/lib/motion-tokens';

export type CountDirection = 'up' | 'down';

export type UseCountUpOptions = {
  target: number;
  /** Starting value — defaults to 0 (up) or target (down). */
  from?: number;
  direction?: CountDirection;
  duration?: number;
  /** When false, animation does not run. */
  active?: boolean;
  /** Share one viewport observer across paired metrics. */
  containerRef?: RefObject<HTMLElement | null>;
  isInView?: boolean;
};

export type UseCountUpResult = {
  ref: RefObject<HTMLDivElement | null>;
  value: number;
  isInView: boolean;
};

/**
 * Animates a number when the element (or shared container) enters the viewport.
 * Snaps instantly when prefers-reduced-motion is active.
 */
export function useCountUp({
  target,
  from,
  direction = 'up',
  duration = countUp.defaultDuration,
  active = true,
  containerRef,
  isInView: isInViewProp,
}: UseCountUpOptions): UseCountUpResult {
  const localRef = useRef<HTMLDivElement>(null);
  const ref = containerRef ?? localRef;
  const observedInView = useInView(ref, landingViewport);
  const isInView = isInViewProp ?? observedInView;
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(direction === 'down' ? (from ?? target) : 0);

  useEffect(() => {
    if (!active || !isInView) return;

    const end = target;
    const start = from ?? (direction === 'down' ? Math.round(target * 1.2) || target : 0);

    if (prefersReducedMotion) {
      setValue(end);
      return;
    }

    let frame = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = direction === 'down' ? start + (end - start) * eased : start + (end - start) * eased;
      setValue(current);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    setValue(start);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, direction, duration, from, isInView, prefersReducedMotion, target]);

  return { ref: localRef, value, isInView };
}
