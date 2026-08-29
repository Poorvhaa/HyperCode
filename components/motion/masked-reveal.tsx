'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { maskReveal, landingViewport } from '@/lib/motion-tokens';
import { useLandingMotion } from '@/hooks/use-landing-motion';

type MaskedRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Pass from parent when batching motion state in one section */
  enableMotion?: boolean;
  isReduced?: boolean;
};

export function MaskedReveal({
  children,
  className,
  delay = 0,
  enableMotion: enableMotionProp,
  isReduced: isReducedProp,
}: MaskedRevealProps) {
  const hook = useLandingMotion();
  const enableMotion = enableMotionProp ?? hook.enableMotion;
  const isReduced = isReducedProp ?? hook.isReduced;

  if (!enableMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={landingViewport}
        custom={{ delay, reduced: isReduced }}
        variants={maskReveal}
      >
        {children}
      </motion.div>
    </div>
  );
}
