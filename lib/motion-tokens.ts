/**
 * HyperCode Landing Page Motion System
 * Tween-based transitions for consistent, low-jank motion across the homepage.
 */

export const landingEase = [0.23, 1, 0.32, 1] as const;

/** Premium editorial entrance — hero headlines & nav */
export const heroEase = [0.22, 1, 0.36, 1] as const;

export const landingDurations = {
  instant: 0.15,
  fast: 0.4,
  reveal: 0.65,
  mask: 0.75,
  slow: 0.85,
} as const;

export const landingViewport = {
  once: true as const,
  margin: '-60px' as const,
};

export type LandingMotionCustom = {
  delay?: number;
  reduced?: boolean;
};

function revealTransition(custom: LandingMotionCustom = {}, duration: number) {
  return {
    duration: custom.reduced ? landingDurations.instant : duration,
    delay: custom.delay ?? 0,
    ease: landingEase,
  };
}

/** Soft scroll reveal — default for section blocks (minimal 8px lift). */
export const softReveal = {
  hidden: { opacity: 0, y: 8 },
  visible: (custom: LandingMotionCustom = {}) => ({
    opacity: 1,
    y: 0,
    transition: revealTransition(custom, landingDurations.reveal),
  }),
};

/** Masked clip reveal — headlines, labels, editorial copy. */
export const maskReveal = {
  hidden: { y: 80, opacity: 0 },
  visible: (custom: LandingMotionCustom = {}) => ({
    y: 0,
    opacity: 1,
    transition: revealTransition(custom, landingDurations.mask),
  }),
};

/** Hero editorial headline — rising from clipped container */
export const heroMaskReveal = {
  hidden: { y: 80, opacity: 0 },
  visible: (custom: LandingMotionCustom = {}) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: custom.reduced ? landingDurations.instant : landingDurations.slow,
      delay: custom.delay ?? 0,
      ease: heroEase,
    },
  }),
};

/** Opacity-only — tab/panel switches without vertical bounce. */
export const crossfade = {
  hidden: { opacity: 0 },
  visible: (custom: LandingMotionCustom = {}) => ({
    opacity: 1,
    transition: revealTransition(custom, landingDurations.fast),
  }),
  exit: (custom: LandingMotionCustom = {}) => ({
    opacity: 0,
    transition: revealTransition(custom, landingDurations.instant),
  }),
};

/** Parent variant — stagger chips, tags, or cards in sequence. */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: (custom: LandingMotionCustom = {}) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.reduced ? 0 : 0.08,
      delayChildren: custom.reduced ? 0 : 0.1,
    },
  }),
};

/** Child variant — pair with staggerContainer for list item reveals. */
export const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  visible: (custom: LandingMotionCustom = {}) => ({
    opacity: 1,
    y: 0,
    transition: custom.reduced
      ? revealTransition(custom, landingDurations.instant)
      : {
          type: 'spring' as const,
          stiffness: 100,
          damping: 15,
        },
  }),
};

/** Count-up animation defaults — pair with useCountUp hook. */
export const countUp = {
  defaultDuration: 1200,
} as const;

/** Standard spring for interactive buttons — hover, press, layout (MorphingButton parity). */
export const buttonSpring = {
  type: 'spring' as const,
  stiffness: 240,
  damping: 18,
  mass: 1.1,
} as const;

/** CSS fallback matching buttonSpring settle for non-motion buttons. */
export const buttonSpringCss = {
  duration: '380ms',
  ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
} as const;

export function buttonSpringTransition(reduced?: boolean) {
  if (reduced) {
    return {
      type: 'tween' as const,
      duration: landingDurations.instant,
      ease: landingEase,
    };
  }
  return buttonSpring;
}

/** Transform + shadow states for PrimaryBrandButton / SecondaryBrandButton motion wrappers. */
export const brandButtonMotion = {
  primary: {
    rest: { y: 0, boxShadow: '0 4px 14px 0 rgba(20, 91, 255, 0.25)' },
    hover: { y: -2, boxShadow: '0 8px 24px 0 rgba(20, 91, 255, 0.45)' },
    tap: { y: 0, boxShadow: '0 4px 10px 0 rgba(20, 91, 255, 0.25)' },
  },
  secondary: {
    rest: { y: 0, boxShadow: '0 0 0 rgba(0,0,0,0)' },
    hover: { y: -2, boxShadow: '0 4px 14px 0 rgba(20, 91, 255, 0.2)' },
    tap: { y: 0, boxShadow: '0 0 0 rgba(0,0,0,0)' },
  },
} as const;

export type StaggerVariants = typeof staggerContainer | typeof staggerItem;
export type CountUpConfig = typeof countUp;

/** @deprecated Use softReveal */
export const standardReveal = softReveal;

export const parallaxRange = {
  subtle: ['-4%', '4%'] as [string, string],
  medium: ['-5%', '5%'] as [string, string],
};

export function staggerDelay(index: number, step = 0.04, cap = 0.2): number {
  return Math.min(index * step, cap);
}

export function crossfadeTransition(reduced?: boolean) {
  return revealTransition({ reduced }, landingDurations.fast);
}

// Legacy exports — map to landing tokens
export const easings = {
  easeOutQuint: landingEase,
  easeInOutQuart: [0.76, 0, 0.24, 1] as const,
  easeOutQuad: [0.25, 0.46, 0.45, 0.94] as const,
  easeOutBack: [0.34, 1.56, 0.64, 1] as const,
};

export const durations = {
  fast: landingDurations.instant,
  normal: landingDurations.fast,
  slow: landingDurations.reveal,
  cinematic: landingDurations.slow,
};

export const transitionPresets = {
  hoverFast: {
    type: 'tween' as const,
    ease: landingEase,
    duration: landingDurations.instant,
  },
  hoverNormal: {
    type: 'tween' as const,
    ease: landingEase,
    duration: landingDurations.fast,
  },
};

export const cardHoverVariants = {
  rest: {
    y: 0,
    boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)',
    transition: transitionPresets.hoverNormal,
  },
  hover: (isReduced?: boolean) => ({
    y: isReduced ? 0 : -3,
    boxShadow: '0 8px 20px rgba(15, 23, 42, 0.05)',
    transition: transitionPresets.hoverNormal,
  }),
};
