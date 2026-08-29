'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { EngineSceneContent } from './engine-scene-content';

type EngineVisual3DProps = {
  scrollProgress: number;
  className?: string;
};

function EngineCanvas({
  scrollProgress,
  isMobile,
}: {
  scrollProgress: number;
  isMobile: boolean;
}) {
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
      { rootMargin: '100px', threshold: 0.05 },
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
        camera={{ position: [0, 0.4, 5.2], fov: 40, near: 0.1, far: 20 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
        frameloop={active ? 'always' : 'never'}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <EngineSceneContent scrollProgress={scrollProgress} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export function EngineVisual3D({ scrollProgress, className = '' }: EngineVisual3DProps) {
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

  if (!mounted) {
    return (
      <div
        className={`relative w-full aspect-square max-h-[min(88vw,420px)] lg:max-h-none ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`relative w-full aspect-square max-h-[min(88vw,420px)] lg:max-h-none ${className}`}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(ellipse 65% 60% at 50% 48%, rgba(20,91,255,0.08) 0%, transparent 72%)',
        }}
      />
      <EngineCanvas scrollProgress={scrollProgress} isMobile={isMobile} />
    </div>
  );
}
