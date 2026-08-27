'use client';

import { motion, useReducedMotion } from 'framer-motion';

type HeroGlobeProps = {
  className?: string;
};

export function HeroGlobe({ className = '' }: HeroGlobeProps) {
  const prefersReducedMotion = useReducedMotion();
  const isReduced = !!prefersReducedMotion;

  return (
    <div
      className={`relative w-full min-w-0 ${className}`}
      aria-hidden="true"
    >
      <motion.div
        initial={{ opacity: 0, y: isReduced ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: isReduced ? 0.25 : 0.85,
          ease: [0.23, 1, 0.32, 1],
          delay: isReduced ? 0 : 0.08,
        }}
        className="relative w-full aspect-[5/4] sm:aspect-[4/3] lg:aspect-[1.05/1] max-w-[480px] mx-auto lg:mx-0 lg:max-w-none"
      >
        <svg
          viewBox="0 0 480 460"
          className="relative w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="heroAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#25B5FF" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#48B900" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="heroLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(37,181,255,0)" />
              <stop offset="50%" stopColor="rgba(37,181,255,0.4)" />
              <stop offset="100%" stopColor="rgba(72,185,0,0.15)" />
            </linearGradient>
          </defs>

          {/* Editorial frame */}
          <rect
            x="48"
            y="40"
            width="384"
            height="380"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
          <line
            x1="48"
            y1="40"
            x2="48"
            y2="420"
            stroke="url(#heroAccent)"
            strokeWidth="1.5"
            strokeLinecap="square"
            opacity="0.7"
          />

          {/* Structural grid — minimal */}
          {[120, 200, 280, 360].map((y) => (
            <line
              key={`h-${y}`}
              x1="48"
              y1={y}
              x2="432"
              y2={y}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="0.75"
            />
          ))}
          {[140, 240, 340].map((x) => (
            <line
              key={`v-${x}`}
              x1={x}
              y1="40"
              x2={x}
              y2="420"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="0.75"
            />
          ))}

          {/* System arc — single meaningful connection */}
          <path
            d="M 72 320 C 140 180, 260 140, 400 200"
            fill="none"
            stroke="url(#heroLine)"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
          <path
            d="M 400 200 L 400 280"
            fill="none"
            stroke="rgba(37,181,255,0.25)"
            strokeWidth="1"
            strokeLinecap="square"
          />
          <path
            d="M 72 320 L 72 260"
            fill="none"
            stroke="rgba(72,185,0,0.2)"
            strokeWidth="1"
            strokeLinecap="square"
          />

          {/* Focal nodes — sparse */}
          <circle cx="72" cy="320" r="3" fill="#25B5FF" opacity="0.7" />
          <circle cx="400" cy="200" r="3" fill="#48B900" opacity="0.65" />
          <circle cx="400" cy="280" r="2" fill="rgba(255,255,255,0.35)" />

          {/* Globe silhouette — outline only, secondary */}
          <ellipse
            cx="260"
            cy="248"
            rx="108"
            ry="108"
            fill="none"
            stroke="rgba(37,181,255,0.1)"
            strokeWidth="0.75"
          />
          <ellipse
            cx="260"
            cy="248"
            rx="108"
            ry="28"
            fill="none"
            stroke="rgba(37,181,255,0.06)"
            strokeWidth="0.75"
          />
          <ellipse
            cx="260"
            cy="248"
            rx="108"
            ry="68"
            fill="none"
            stroke="rgba(37,181,255,0.05)"
            strokeWidth="0.75"
          />
          <path
            d="M 260 140 Q 340 248 260 356 Q 180 248 260 140"
            fill="none"
            stroke="rgba(37,181,255,0.06)"
            strokeWidth="0.75"
          />
        </svg>
      </motion.div>
    </div>
  );
}
