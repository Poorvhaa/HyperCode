'use client';

import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

interface ParallaxOptions {
  damping?: number;
  stiffness?: number;
  mass?: number;
}

export function usePointerParallax(options: ParallaxOptions = {}) {
  const { damping = 30, stiffness = 120, mass = 0.5 } = options;

  // Raw relative position from -1 to 1
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for smooth movement
  const springX = useSpring(x, { damping, stiffness, mass });
  const springY = useSpring(y, { damping, stiffness, mass });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate position relative to viewport center
      const { innerWidth, innerHeight } = window;
      const relativeX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const relativeY = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      x.set(relativeX);
      y.set(relativeY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [x, y]);

  return { x: springX, y: springY };
}
