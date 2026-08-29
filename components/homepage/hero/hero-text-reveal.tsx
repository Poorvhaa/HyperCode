'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { heroEase, landingDurations } from '@/lib/motion-tokens';
import { useLandingMotion } from '@/hooks/use-landing-motion';

type HeroTextRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'p' | 'div' | 'h1' | 'span';
};

export function HeroTextReveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: HeroTextRevealProps) {
  const { enableMotion, isReduced } = useLandingMotion();
  const Tag = as;

  if (!enableMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag className={`overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: isReduced ? landingDurations.instant : 0.55,
          delay,
          ease: heroEase,
        }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}

type HeroHeadlineMaskProps = {
  lines: ReactNode[];
  className?: string;
  lineBaseDelay?: number;
};

export function HeroHeadlineMask({ lines, className = '', lineBaseDelay = 0.14 }: HeroHeadlineMaskProps) {
  const { enableMotion, isReduced } = useLandingMotion();

  if (!enableMotion) {
    return (
      <h1 className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <h1 className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: isReduced ? landingDurations.instant : 0.62,
              delay: lineBaseDelay + i * 0.1,
              ease: heroEase,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
