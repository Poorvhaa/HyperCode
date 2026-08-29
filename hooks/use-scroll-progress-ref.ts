'use client';

import { useRef, useState } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';

type Options = {
  /** Quantize UI updates to reduce React re-renders during scroll */
  uiSteps?: number;
};

/**
 * Keeps scroll progress in a ref for rAF/WebGL consumers while throttling
 * React state updates for UI that depends on scroll.
 */
export function useScrollProgressRef(
  motionValue: MotionValue<number>,
  { uiSteps = 24 }: Options = {},
) {
  const progressRef = useRef(0);
  const [uiProgress, setUiProgress] = useState(0);

  useMotionValueEvent(motionValue, 'change', (v) => {
    progressRef.current = v;
    const step = Math.round(v * uiSteps);
    setUiProgress((prev) => {
      const prevStep = Math.round(prev * uiSteps);
      return step !== prevStep ? v : prev;
    });
  });

  return { progressRef, uiProgress };
}
