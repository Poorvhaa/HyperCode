'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { softReveal, landingViewport } from '@/lib/motion-tokens';
import { useLandingMotion } from '@/hooks/use-landing-motion';

type LandingRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  enableMotion?: boolean;
  isReduced?: boolean;
  as?: 'div' | 'section' | 'header' | 'article' | 'li' | 'p';
};

export function LandingReveal({
  children,
  className,
  delay = 0,
  enableMotion: enableMotionProp,
  isReduced: isReducedProp,
  as = 'div',
}: LandingRevealProps) {
  const hook = useLandingMotion();
  const enableMotion = enableMotionProp ?? hook.enableMotion;
  const isReduced = isReducedProp ?? hook.isReduced;
  const Tag = motion[as] as typeof motion.div;

  if (!enableMotion) {
    const StaticTag = as;
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={landingViewport}
      custom={{ delay, reduced: isReduced }}
      variants={softReveal}
    >
      {children}
    </Tag>
  );
}
