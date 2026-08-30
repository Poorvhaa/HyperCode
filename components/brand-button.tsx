'use client';

import { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { brandButtonMotion, buttonSpringTransition } from '@/lib/motion-tokens';

const MotionLink = motion.create(Link);

type BrandButtonProps = {
  variant?: 'primary' | 'secondary';
  href: string;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, 'href' | 'className' | 'children'>;

export function BrandButton({
  variant = 'primary',
  href,
  className,
  children,
  ...rest
}: BrandButtonProps) {
  const reducedMotion = useReducedMotion();
  const isReduced = reducedMotion === true;
  const spring = buttonSpringTransition(isReduced);
  const states = brandButtonMotion[variant];

  return (
    <MotionLink
      href={href}
      className={cn(variant === 'primary' ? 'PrimaryBrandButton' : 'SecondaryBrandButton', className)}
      initial={states.rest}
      animate={states.rest}
      whileHover={isReduced ? states.rest : states.hover}
      whileTap={isReduced ? states.rest : states.tap}
      transition={spring}
      {...rest}
    >
      {children}
    </MotionLink>
  );
}
