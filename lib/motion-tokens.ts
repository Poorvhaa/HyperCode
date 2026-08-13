/**
 * Shared Motion Tokens for the HyperCode Homepage
 * Standardized easing, springs, durations, and variants
 */

export const easings = {
  // Cubic Beziers
  easeOutQuint: [0.23, 1, 0.32, 1] as const,
  easeInOutQuart: [0.76, 0, 0.24, 1] as const,
  easeOutQuad: [0.25, 0.46, 0.45, 0.94] as const,
  easeOutBack: [0.34, 1.56, 0.64, 1] as const,
};

export const springs = {
  stiff: {
    type: 'spring' as const,
    stiffness: 110,
    damping: 14,
    mass: 0.8
  },
  smooth: {
    type: 'spring' as const,
    stiffness: 80,
    damping: 22,
    mass: 0.95
  },
  slow: {
    type: 'spring' as const,
    stiffness: 45,
    damping: 20,
    mass: 1.0
  }
};

export const durations = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.8,
  cinematic: 1.5
};

// Transition configurations combining variables
export const transitionPresets = {
  hoverFast: {
    type: 'tween' as const,
    ease: easings.easeOutQuint,
    duration: durations.fast
  },
  hoverNormal: {
    type: 'tween' as const,
    ease: easings.easeOutQuint,
    duration: durations.normal
  },
  springSmooth: springs.smooth,
  springStiff: springs.stiff,
  springSlow: springs.slow
};

// Standardized animation variants for components (supports reduced-motion overrides)
export const standardReveal = {
  hidden: { opacity: 0, y: 15 },
  visible: (custom: { delay?: number; isReduced?: boolean } = {}) => ({
    opacity: 1,
    y: 0,
    transition: custom.isReduced 
      ? { duration: 0.3, delay: custom.delay || 0 }
      : { type: 'spring', stiffness: 90, damping: 18, delay: custom.delay || 0 }
  })
};

export const cardHoverVariants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)',
    transition: transitionPresets.hoverNormal
  },
  hover: (isReduced?: boolean) => ({
    y: isReduced ? 0 : -6,
    scale: isReduced ? 1 : 1.02,
    boxShadow: '0 10px 25px rgba(15, 23, 42, 0.06)',
    transition: transitionPresets.hoverNormal
  })
};
