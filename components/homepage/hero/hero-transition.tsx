'use client';

import { MotionValue, useTransform, motion } from 'framer-motion';
import { useLandingMotion } from '@/hooks/use-landing-motion';

type HeroTrustBridgeProps = {
  scrollProgress: MotionValue<number>;
};

/** Rising light surface + architectural curve — ~80–120px transition zone */
export function HeroTrustBridge({ scrollProgress }: HeroTrustBridgeProps) {
  const { enableMotion, isReduced } = useLandingMotion();

  const lightY = useTransform(scrollProgress, [0.84, 1], [72, 0]);
  const curveY = useTransform(scrollProgress, [0.84, 1], [24, 0]);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[9] h-28 sm:h-32" aria-hidden="true">
      <motion.div
        className="absolute inset-x-0 bottom-0 h-full bg-[#F6F5F1]"
        style={{ y: enableMotion && !isReduced ? lightY : 0 }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 leading-[0]"
        style={{ y: enableMotion && !isReduced ? curveY : 0 }}
      >
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          className="block h-8 w-full sm:h-9 lg:h-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 48V22C240 8 480 0 720 0s480 8 720 22v26H0z"
            fill="#F6F5F1"
          />
        </svg>
      </motion.div>
    </div>
  );
}

export function HeroScrollCue() {
  const { enableMotion, isReduced } = useLandingMotion();

  return (
    <div
      className="pointer-events-none absolute bottom-[3.25rem] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-[3.5rem]"
      aria-hidden="true"
    >
      <span className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-[#5C7088]">
        Scroll to explore
      </span>
      <div className="relative h-7 w-px bg-white/15">
        {enableMotion && !isReduced ? (
          <motion.span
            className="absolute left-0 top-0 block h-2 w-px bg-white/45"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : (
          <span className="absolute left-0 top-0 block h-2 w-px bg-white/45" />
        )}
      </div>
    </div>
  );
}
