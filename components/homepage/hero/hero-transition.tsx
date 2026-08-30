'use client';

import { motion, type MotionValue } from 'framer-motion';
import { useLandingMotion } from '@/hooks/use-landing-motion';

type HeroTrustBridgeProps = {
  scrollProgress: MotionValue<number>;
};

/** Light surface + curve flush with hero bottom — overlaps into trust section */
export function HeroTrustBridge(_props: HeroTrustBridgeProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[9] h-16 sm:h-20" aria-hidden="true">
      <div className="absolute inset-x-0 bottom-0 h-full bg-[#F6F5F1]" />
      <div className="absolute inset-x-0 bottom-0 leading-[0]">
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          className="block h-7 w-full sm:h-8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 48V22C240 8 480 0 720 0s480 8 720 22v26H0z"
            fill="#F6F5F1"
          />
        </svg>
      </div>
    </div>
  );
}

export function HeroScrollCue() {
  const { enableMotion, isReduced } = useLandingMotion();

  return (
    <div
      className="pointer-events-none absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-1.5 sm:bottom-6 sm:flex lg:bottom-7"
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
