'use client';

import { MotionValue, useTransform, motion } from 'framer-motion';
import { useLandingMotion } from '@/hooks/use-landing-motion';

type HeroBackgroundProps = {
  scrollProgress: MotionValue<number>;
};

export function HeroBackground({ scrollProgress }: HeroBackgroundProps) {
  const { enableMotion, isReduced } = useLandingMotion();

  const gridY = useTransform(
    scrollProgress,
    [0, 0.35, 0.82, 1],
    [0, isReduced ? 0 : 16, isReduced ? 0 : -12, isReduced ? 0 : -36],
  );
  const bgShiftY = useTransform(
    scrollProgress,
    [0.82, 1],
    [0, isReduced ? 0 : -32],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute inset-0"
        style={{ y: enableMotion && !isReduced ? bgShiftY : 0 }}
      >
        <div className="absolute inset-0 bg-[#030A14]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(165deg, #030A14 0%, #050F1E 48%, #061018 100%)',
          }}
        />

        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 12% 18%, rgba(10,31,107,0.22) 0%, transparent 58%)',
          }}
        />

        <motion.div
          className="absolute inset-[-8%] opacity-[0.28]"
          style={{
            y: enableMotion && !isReduced ? gridY : 0,
            backgroundImage:
              'linear-gradient(rgba(20,91,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(20,91,255,0.03) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
          }}
        />

        <div className="hero-noise absolute inset-0 opacity-[0.032]" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
      </motion.div>
    </div>
  );
}
