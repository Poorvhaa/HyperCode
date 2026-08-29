'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLandingMotion } from '@/hooks/use-landing-motion';
import type { CapabilityVisualTheme } from './capabilities-constants';

type CapabilitiesVisualProps = {
  theme: CapabilityVisualTheme;
  className?: string;
  compact?: boolean;
};

function ThemeSvg({ theme, compact }: { theme: CapabilityVisualTheme; compact?: boolean }) {
  const stroke = 'rgba(37,181,255,0.45)';
  const strokeMuted = 'rgba(255,255,255,0.12)';
  const fill = 'rgba(20,91,255,0.08)';

  if (theme === 'automation') {
    return (
      <svg viewBox="0 0 400 360" className="h-full w-full" aria-hidden="true">
        <circle cx="200" cy="180" r="36" fill={fill} stroke={stroke} strokeWidth="1" />
        {[0, 72, 144, 216, 288].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x = 200 + Math.cos(rad) * 110;
          const y = 180 + Math.sin(rad) * 110;
          return (
            <g key={deg}>
              <line x1="200" y1="180" x2={x} y2={y} stroke={strokeMuted} strokeWidth="0.75" />
              <circle cx={x} cy={y} r="8" fill={fill} stroke={stroke} strokeWidth="0.75" />
              <circle cx={x} cy={y} r="3" fill="#25B5FF" fillOpacity="0.7" />
            </g>
          );
        })}
        <path
          d="M 120 220 Q 200 140 280 220"
          fill="none"
          stroke={stroke}
          strokeWidth="1"
          strokeDasharray="4 6"
        />
      </svg>
    );
  }

  if (theme === 'analytics') {
    return (
      <svg viewBox="0 0 400 360" className="h-full w-full" aria-hidden="true">
        {[80, 130, 180, 230, 280, 330].map((x, i) => (
          <rect
            key={x}
            x={x - 18}
            y={260 - (i + 1) * 28}
            width="36"
            height={(i + 1) * 28}
            fill={fill}
            stroke={strokeMuted}
            strokeWidth="0.75"
          />
        ))}
        <line x1="60" y1="280" x2="340" y2="280" stroke={strokeMuted} strokeWidth="0.75" />
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="60"
            y1={280 - i * 40}
            x2="340"
            y2={280 - i * 40}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.5"
          />
        ))}
        <polyline
          points="80,220 130,180 180,200 230,140 280,160 330,100"
          fill="none"
          stroke={stroke}
          strokeWidth="1.25"
        />
      </svg>
    );
  }

  if (theme === 'software') {
    return (
      <svg viewBox="0 0 400 360" className="h-full w-full" aria-hidden="true">
        <polygon
          points="120,100 300,130 280,260 100,230"
          fill={fill}
          stroke={strokeMuted}
          strokeWidth="0.75"
        />
        <polygon
          points="150,140 320,165 300,280 130,255"
          fill="rgba(20,91,255,0.04)"
          stroke={stroke}
          strokeWidth="0.75"
        />
        <line x1="150" y1="140" x2="320" y2="165" stroke={strokeMuted} strokeWidth="0.5" />
        <line x1="130" y1="255" x2="300" y2="280" stroke={strokeMuted} strokeWidth="0.5" />
        <rect x="168" y="178" width="64" height="8" fill={stroke} fillOpacity="0.35" />
        <rect x="168" y="196" width="48" height="6" fill="rgba(255,255,255,0.15)" />
      </svg>
    );
  }

  if (theme === 'cloud') {
    return (
      <svg viewBox="0 0 400 360" className="h-full w-full" aria-hidden="true">
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={90 + col * 58}
              y={90 + row * 52}
              width="44"
              height="36"
              fill={fill}
              stroke={strokeMuted}
              strokeWidth="0.75"
            />
          )),
        )}
        {[
          [112, 108, 260, 160],
          [260, 108, 112, 160],
          [112, 160, 260, 212],
          [260, 160, 112, 212],
          [186, 126, 186, 212],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="0.75" strokeOpacity="0.5" />
        ))}
      </svg>
    );
  }

  // staffing
  return (
    <svg viewBox="0 0 400 360" className="h-full w-full" aria-hidden="true">
      <circle cx="200" cy="160" r="52" fill="none" stroke={strokeMuted} strokeWidth="0.75" />
      {[
        [200, 80],
        [290, 140],
        [260, 250],
        [140, 250],
        [110, 140],
      ].map(([x, y], i) => (
        <g key={i}>
          <line x1="200" y1="160" x2={x} y2={y} stroke={strokeMuted} strokeWidth="0.75" />
          <circle cx={x} cy={y} r="10" fill={fill} stroke={stroke} strokeWidth="0.75" />
        </g>
      ))}
      <circle cx="200" cy="160" r="14" fill={fill} stroke={stroke} strokeWidth="1" />
    </svg>
  );
}

export function CapabilitiesVisual({ theme, className = '', compact = false }: CapabilitiesVisualProps) {
  const { enableMotion, isReduced } = useLandingMotion();

  return (
    <div
      className={`relative overflow-hidden ${compact ? 'aspect-[4/3] max-h-[200px]' : 'aspect-[4/3.6] min-h-[280px] lg:min-h-[320px]'} ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(20,91,255,0.12) 0%, transparent 70%)',
        }}
      />
      {!enableMotion || isReduced ? (
        <ThemeSvg theme={theme} compact={compact} />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            className="absolute inset-0"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: crossfadeTransition(isReduced) },
              exit: { opacity: 0, transition: crossfadeTransition(isReduced) },
            }}
          >
            <ThemeSvg theme={theme} compact={compact} />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

function crossfadeTransition(reduced?: boolean) {
  return {
    duration: reduced ? 0.15 : 0.55,
    ease: [0.22, 1, 0.36, 1] as const,
  };
}