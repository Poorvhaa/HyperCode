'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { useLandingMotion } from '@/hooks/use-landing-motion';

type HeroArchitectureVisualProps = {
  className?: string;
  scrollProgress?: MotionValue<number>;
  entranceDelay?: number;
};

export function HeroArchitectureVisual({
  className = '',
  scrollProgress,
  entranceDelay = 0.48,
}: HeroArchitectureVisualProps) {
  const { enableMotion, isReduced } = useLandingMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);
  const [isTablet, setIsTablet] = useState(false);

  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const springX = useSpring(parallaxX, { stiffness: 42, damping: 22 });
  const springY = useSpring(parallaxY, { stiffness: 42, damping: 22 });
  const fallbackProgress = useMotionValue(0);
  const progress = scrollProgress ?? fallbackProgress;
  const depthShift = useTransform(
    progress,
    [0, 0.35, 0.82, 1],
    [0, isReduced ? 0 : 8, isReduced ? 0 : 14, isReduced ? 0 : 24],
  );

  useEffect(() => {
    const mobileMq = window.matchMedia('(max-width: 767px)');
    const tabletMq = window.matchMedia('(max-width: 1023px)');
    const update = () => {
      setIsMobile(mobileMq.matches);
      setIsTablet(tabletMq.matches);
    };
    update();
    mobileMq.addEventListener('change', update);
    tabletMq.addEventListener('change', update);
    return () => {
      mobileMq.removeEventListener('change', update);
      tabletMq.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (!enableMotion || isMobile || isReduced) return;

    const handleMove = (event: PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      parallaxX.set(nx * 6);
      parallaxY.set(ny * 4);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, [enableMotion, isMobile, isReduced, parallaxX, parallaxY]);

  const showDetail = !isMobile && !isTablet;

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full ${className}`}
      aria-hidden="true"
    >
      <motion.div
        className="relative h-full w-full"
        initial={enableMotion ? { opacity: 0, x: 28, scale: 0.96 } : false}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{
          duration: isReduced ? 0.15 : 0.9,
          delay: isReduced ? 0 : entranceDelay,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          x: enableMotion && !isMobile && !isReduced ? springX : 0,
          y: enableMotion && !isMobile && !isReduced ? springY : 0,
          translateY: enableMotion && !isReduced ? depthShift : 0,
        }}
      >
        <svg
          viewBox="0 0 720 640"
          className="h-full w-full"
          preserveAspectRatio="xMaxYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hcArchPlaneA" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#145BFF" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#0A1F6B" stopOpacity="0.04" />
            </linearGradient>
            <linearGradient id="hcArchPlaneB" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#25B5FF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#030A14" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hcArchLight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#25B5FF" stopOpacity="0" />
              <stop offset="50%" stopColor="#25B5FF" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#25B5FF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {showDetail &&
            [-120, -80, -40, 0, 40, 80, 120].map((offset, i) => (
              <line
                key={`grid-h-${i}`}
                x1={120 + offset * 0.6}
                y1={420 + i * 8}
                x2={680 - offset * 0.3}
                y2={580}
                stroke="rgba(37,181,255,0.07)"
                strokeWidth="0.75"
              />
            ))}
          {showDetail &&
            [280, 340, 400, 460, 520, 580, 640].map((x, i) => (
              <line
                key={`grid-v-${i}`}
                x1={x}
                y1={380}
                x2={360 + (x - 360) * 0.15}
                y2={600}
                stroke="rgba(37,181,255,0.05)"
                strokeWidth="0.75"
              />
            ))}

          <polygon
            points="380,80 680,140 620,340 300,280"
            fill="url(#hcArchPlaneA)"
            stroke="rgba(37,181,255,0.16)"
            strokeWidth="0.75"
          />
          <polygon
            points="420,160 660,210 590,400 340,350"
            fill="url(#hcArchPlaneB)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.5"
          />
          {!isMobile && (
            <polygon
              points="460,240 640,280 580,460 360,420"
              fill="rgba(20,91,255,0.04)"
              stroke="rgba(37,181,255,0.1)"
              strokeWidth="0.5"
            />
          )}

          <line x1="300" y1="280" x2="300" y2="520" stroke="rgba(255,255,255,0.06)" strokeWidth="0.75" />
          <line x1="420" y1="200" x2="420" y2="540" stroke="rgba(37,181,255,0.08)" strokeWidth="0.75" />
          <line x1="560" y1="180" x2="560" y2="560" stroke="rgba(255,255,255,0.05)" strokeWidth="0.75" />

          <path
            d="M 180 320 Q 280 300 380 310 T 580 290"
            fill="none"
            stroke="url(#hcArchLight)"
            strokeWidth="1"
            className={enableMotion && !isReduced ? 'hero-arch-path' : undefined}
          />
          <path
            d="M 200 380 Q 320 360 440 370 T 640 350"
            fill="none"
            stroke="rgba(37,181,255,0.12)"
            strokeWidth="0.75"
            strokeDasharray="3 6"
            className={enableMotion && !isReduced ? 'hero-arch-path-delayed' : undefined}
          />
          <path
            d="M 240 440 L 520 420 L 660 480"
            fill="none"
            stroke="rgba(72,185,0,0.08)"
            strokeWidth="0.75"
          />

          {[
            [380, 310],
            [440, 370],
            [520, 420],
            [580, 290],
            [420, 200],
            [560, 180],
          ]
            .slice(0, isMobile ? 3 : isTablet ? 4 : 6)
            .map(([x, y], i) => (
              <g key={i}>
                <rect
                  x={x - 3}
                  y={y - 3}
                  width="6"
                  height="6"
                  fill={i % 3 === 0 ? '#25B5FF' : '#E8EEF7'}
                  fillOpacity={i % 3 === 0 ? 0.55 : 0.25}
                  transform={`rotate(45 ${x} ${y})`}
                />
                <circle cx={x} cy={y} r="1.5" fill="#25B5FF" fillOpacity="0.7" />
              </g>
            ))}

          <rect
            x="480"
            y="120"
            width="140"
            height="2"
            fill="rgba(37,181,255,0.2)"
            transform="rotate(-8 550 121)"
          />
          <rect
            x="500"
            y="160"
            width="100"
            height="1"
            fill="rgba(255,255,255,0.08)"
            transform="rotate(-8 550 160)"
          />
        </svg>

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, transparent 40%, rgba(37,181,255,0.04) 72%, transparent 100%)',
          }}
        />
      </motion.div>
    </div>
  );
}
