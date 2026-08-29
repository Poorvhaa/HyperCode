'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { HeroSceneContent } from './hero-scene-content';

type HeroVisual3DProps = {
  className?: string;
  isReduced?: boolean;
};

function HeroStaticFallback({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative w-full aspect-[4/3] sm:aspect-[5/4] lg:aspect-[1.05/1] max-h-[420px] ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-[12%] rounded-full opacity-30"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(37,181,255,0.2) 0%, rgba(72,185,0,0.08) 45%, transparent 70%)',
        }}
      />
      <svg viewBox="0 0 480 460" className="relative w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="heroFallbackGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#25B5FF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#25B5FF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="240" cy="230" r="90" fill="url(#heroFallbackGlow)" />
        <ellipse cx="240" cy="230" rx="110" ry="110" fill="none" stroke="rgba(37,181,255,0.2)" strokeWidth="1" />
        <ellipse cx="240" cy="230" rx="110" ry="40" fill="none" stroke="rgba(37,181,255,0.12)" strokeWidth="0.75" />
        <ellipse cx="240" cy="230" rx="110" ry="70" fill="none" stroke="rgba(72,185,0,0.1)" strokeWidth="0.75" transform="rotate(55 240 230)" />
        <circle cx="240" cy="230" r="28" fill="rgba(20,91,255,0.25)" stroke="rgba(37,181,255,0.5)" strokeWidth="1" />
        {[
          [340, 160],
          [130, 180],
          [360, 300],
          [120, 320],
          [240, 100],
          [240, 360],
        ].map(([x, y], i) => (
          <g key={i}>
            <line x1="240" y1="230" x2={x} y2={y} stroke="rgba(37,181,255,0.15)" strokeWidth="0.75" />
            <circle cx={x} cy={y} r="4" fill={i % 2 === 0 ? '#25B5FF' : '#48B900'} opacity="0.7" />
          </g>
        ))}
      </svg>
    </div>
  );
}

function HeroCanvas({ isMobile }: { isMobile: boolean }) {
  const [active, setActive] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onVisibility = () => setActive(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);

    const el = containerRef.current;
    if (!el) {
      return () => document.removeEventListener('visibilitychange', onVisibility);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting && !document.hidden),
      { rootMargin: '80px', threshold: 0.05 },
    );
    observer.observe(el);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      <Canvas
        dpr={isMobile ? [1, 1.25] : [1, 1.75]}
        camera={{ position: [0, 0.15, 5.8], fov: 42, near: 0.1, far: 20 }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        frameloop={active ? 'always' : 'never'}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <HeroSceneContent isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export function HeroVisual3D({ className = '', isReduced = false }: HeroVisual3DProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  if (!mounted || isReduced) {
    return <HeroStaticFallback className={className} />;
  }

  return (
    <div
      className={`relative w-full aspect-[4/3] sm:aspect-[5/4] lg:aspect-[1.05/1] max-h-[420px] lg:max-h-none ${className}`}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(20,91,255,0.12) 0%, transparent 70%)',
        }}
      />
      <div className="relative z-[1] h-full w-full">
        <HeroCanvas isMobile={isMobile} />
      </div>
    </div>
  );
}
