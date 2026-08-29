'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Hydration-safe motion gate for landing page sections.
 * Server and first client paint: enableMotion=false, isReduced=false.
 */
export function useLandingMotion() {
  const prefersReducedMotion = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const isReduced = hasMounted && prefersReducedMotion === true;
  const enableMotion = hasMounted && !isReduced;

  return { hasMounted, isReduced, enableMotion };
}
