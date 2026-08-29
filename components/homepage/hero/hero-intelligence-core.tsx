'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useLandingMotion } from '@/hooks/use-landing-motion';

type HeroIntelligenceCoreProps = {
  className?: string;
};

const NODES: { angle: number; color: string; ring: number }[] = [
  { angle: -72, color: '#25B5FF', ring: 1 },
  { angle: -18, color: '#48B900', ring: 1 },
  { angle: 36, color: '#25B5FF', ring: 2 },
  { angle: 108, color: '#48B900', ring: 2 },
  { angle: 162, color: '#25B5FF', ring: 1 },
];

function polarToCartesian(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: 240 + Math.cos(rad) * radius,
    y: 240 + Math.sin(rad) * radius,
  };
}

export function HeroIntelligenceCore({ className = '' }: HeroIntelligenceCoreProps) {
  const { enableMotion, isReduced } = useLandingMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const springX = useSpring(parallaxX, { stiffness: 60, damping: 20 });
  const springY = useSpring(parallaxY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enableMotion || isMobile || isReduced) return;

    const handleMove = (event: PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      parallaxX.set(nx * 10);
      parallaxY.set(ny * 8);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, [enableMotion, isMobile, isReduced, parallaxX, parallaxY]);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`} aria-hidden="true">
      <motion.div
        className="relative mx-auto w-full max-w-[min(100%,28rem)] xl:max-w-[min(100%,32rem)] aspect-square"
        style={{
          x: enableMotion && !isMobile && !isReduced ? springX : 0,
          y: enableMotion && !isMobile && !isReduced ? springY : 0,
        }}
      >
        <div
          className="pointer-events-none absolute inset-[8%] rounded-full opacity-40"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(20,91,255,0.22) 0%, rgba(37,181,255,0.06) 42%, transparent 72%)',
          }}
        />

        <svg
          viewBox="0 0 480 480"
          className="relative h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="hcCoreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#25B5FF" stopOpacity="0.45" />
              <stop offset="55%" stopColor="#145BFF" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#030A14" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="hcCoreFace" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0A1F6B" />
              <stop offset="100%" stopColor="#145BFF" />
            </linearGradient>
            <filter id="hcCoreSoftGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Architectural rings */}
          {[118, 148, 178].map((r, i) => (
            <circle
              key={r}
              cx="240"
              cy="240"
              r={r}
              fill="none"
              stroke={i === 0 ? 'rgba(37,181,255,0.18)' : i === 1 ? 'rgba(72,185,0,0.12)' : 'rgba(255,255,255,0.06)'}
              strokeWidth={i === 0 ? 1 : 0.75}
              strokeDasharray={i === 2 ? '4 8' : undefined}
              className={enableMotion && !isReduced ? 'hero-core-ring' : undefined}
              style={{ animationDelay: `${i * 0.6}s` }}
            />
          ))}

          {/* Cross-axis grid */}
          <line x1="240" y1="62" x2="240" y2="418" stroke="rgba(37,181,255,0.06)" strokeWidth="0.75" />
          <line x1="62" y1="240" x2="418" y2="240" stroke="rgba(37,181,255,0.06)" strokeWidth="0.75" />

          {/* Connection spokes */}
          {NODES.map((node, i) => {
            const radius = node.ring === 1 ? 118 : 148;
            const { x, y } = polarToCartesian(node.angle, radius);
            return (
              <g key={i}>
                <line
                  x1="240"
                  y1="240"
                  x2={x}
                  y2={y}
                  stroke={node.color}
                  strokeOpacity="0.14"
                  strokeWidth="0.75"
                />
              </g>
            );
          })}

          {/* Outer nodes — ecosystem pillars */}
          {NODES.map((node, i) => {
            const radius = node.ring === 1 ? 118 : 148;
            const { x, y } = polarToCartesian(node.angle, radius);
            return (
              <g key={`node-${i}`}>
                <circle cx={x} cy={y} r="14" fill="none" stroke={node.color} strokeOpacity="0.2" strokeWidth="0.75" />
                <circle cx={x} cy={y} r="5" fill={node.color} fillOpacity="0.85" filter="url(#hcCoreSoftGlow)" />
                <circle cx={x} cy={y} r="9" fill={node.color} fillOpacity="0.08" />
              </g>
            );
          })}

          {/* Intelligence core */}
          <circle cx="240" cy="240" r="72" fill="url(#hcCoreGlow)" />
          <polygon
            points="240,188 276,228 262,284 218,284 204,228"
            fill="url(#hcCoreFace)"
            fillOpacity="0.92"
            stroke="rgba(37,181,255,0.45)"
            strokeWidth="1"
            className={enableMotion && !isReduced ? 'hero-core-pulse' : undefined}
          />
          <circle cx="240" cy="240" r="22" fill="#145BFF" fillOpacity="0.35" stroke="rgba(37,181,255,0.55)" strokeWidth="1" />
          <circle cx="240" cy="240" r="8" fill="#25B5FF" fillOpacity="0.9" />
        </svg>

        {/* Ambient bloom */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full opacity-50 mix-blend-screen"
          style={{
            background:
              'radial-gradient(circle at 52% 48%, rgba(37,181,255,0.14) 0%, transparent 58%)',
          }}
        />
      </motion.div>
    </div>
  );
}
