'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import {
  Brain,
  Cloud,
  LineChart,
  Code,
  Zap,
  Globe,
  Smartphone,
  Network,
  Shield,
  Database,
  BarChart3,
  Users,
  Layers,
  ArrowRight,
  Sparkles
} from 'lucide-react';

// Technology modules definition with their custom accent colors and coordinates
const TECH_NODES = [
  // Inner Ring (radius = 125px)
  { id: 'ai', name: 'AI', icon: Brain, color: '#145BFF', bgGlow: 'rgba(20,91,255,0.06)', r: 125, angle: 0 },
  { id: 'cloud', name: 'Cloud', icon: Cloud, color: '#25B5FF', bgGlow: 'rgba(37,181,255,0.06)', r: 125, angle: 60 },
  { id: 'software', name: 'Software', icon: Code, color: '#145BFF', bgGlow: 'rgba(20,91,255,0.06)', r: 125, angle: 120 },
  { id: 'web', name: 'Web', icon: Globe, color: '#25B5FF', bgGlow: 'rgba(37,181,255,0.06)', r: 125, angle: 180 },
  { id: 'mobile', name: 'Mobile', icon: Smartphone, color: '#48B900', bgGlow: 'rgba(72,185,0,0.06)', r: 125, angle: 240 },
  { id: 'api', name: 'API', icon: Network, color: '#145BFF', bgGlow: 'rgba(20,91,255,0.06)', r: 125, angle: 300 },

  // Outer Ring (radius = 215px)
  { id: 'analytics', name: 'Analytics', icon: LineChart, color: '#48B900', bgGlow: 'rgba(72,185,0,0.06)', r: 215, angle: 30 },
  { id: 'automation', name: 'Automation', icon: Zap, color: '#B7F400', bgGlow: 'rgba(183,244,0,0.06)', r: 215, angle: 81 },
  { id: 'security', name: 'Cyber Security', icon: Shield, color: '#145BFF', bgGlow: 'rgba(20,91,255,0.06)', r: 215, angle: 132 },
  { id: 'database', name: 'Database', icon: Database, color: '#48B900', bgGlow: 'rgba(72,185,0,0.06)', r: 215, angle: 183 },
  { id: 'bi', name: 'BI', icon: BarChart3, color: '#25B5FF', bgGlow: 'rgba(37,181,255,0.06)', r: 215, angle: 234 },
  { id: 'crm', name: 'CRM', icon: Users, color: '#48B900', bgGlow: 'rgba(72,185,0,0.06)', r: 215, angle: 285 },
  { id: 'erp', name: 'ERP', icon: Layers, color: '#145BFF', bgGlow: 'rgba(20,91,255,0.06)', r: 215, angle: 336 }
];

export function PremiumHero() {
  const t = useTranslations('HomepageRedesign.Hero');
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  const [isMounted, setIsMounted] = useState(false);
  const [scale, setScale] = useState(1);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // References for requestAnimationFrame manipulation
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const particleRefs = useRef<(SVGCircleElement | null)[]>([]);

  // Animation values stored in refs for 60fps performance
  const timeRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  
  // Mouse position tracking
  const mouseRef = useRef({ x: 0, y: 0 });
  const springMouseX = useRef(0);
  const springMouseY = useRef(0);

  const hoveredNodeIdRef = useRef<string | null>(null);

  // Synchronize state hover ID to ref for RAF loop
  useEffect(() => {
    hoveredNodeIdRef.current = hoveredNodeId;
  }, [hoveredNodeId]);

  // Handle mounting and initial responsiveness
  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 1024) {
        setScale(1);
      } else if (w >= 768) {
        setScale(0.8);
      } else {
        // Linear scale down on mobile screens to fit perfectly
        setScale(Math.max(0.46, w / 768));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track global mouse position relative to window center
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      mouseRef.current.y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Main 3D Orbit & Vector Drawing Animation Loop
  useEffect(() => {
    if (!isMounted) return;

    const loop = () => {
      // Rotate if motion is not reduced
      if (!prefersReducedMotion) {
        timeRef.current += 0.003;
      }

      // Smoothly interpolate mouse spring offsets
      springMouseX.current += (mouseRef.current.x - springMouseX.current) * 0.06;
      springMouseY.current += (mouseRef.current.y - springMouseY.current) * 0.06;

      const time = timeRef.current;
      const mx = springMouseX.current;
      const my = springMouseY.current;

      // Parallax shift the camera (wrapper container)
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate3d(${mx * 20}px, ${my * 20}px, 0)`;
      }

      // Orbital tilted plane rotations (pitch and roll angles in radians)
      const baseTiltX = 0.95; // ~54 degrees pitch
      const baseTiltY = -0.35; // ~-20 degrees roll
      
      const tiltX = baseTiltX + my * 0.12;
      const tiltY = baseTiltY + mx * 0.12;

      TECH_NODES.forEach((node, idx) => {
        const cardEl = cardRefs.current[idx];
        const pathEl = pathRefs.current[idx];
        const pEl1 = particleRefs.current[idx * 2];
        const pEl2 = particleRefs.current[idx * 2 + 1];

        if (!cardEl) return;

        // Current orbital angle
        const nodeAngleRad = (node.angle * Math.PI) / 180;
        const orbitAngle = time * 0.3 + nodeAngleRad;

        // 3D Ring Coordinates (local system)
        const xl = node.r * Math.cos(orbitAngle);
        const zl = node.r * Math.sin(orbitAngle);
        
        // Organic floating y-offset (independent wave phase per card)
        const floatY = prefersReducedMotion ? 0 : Math.sin(time * 1.5 + idx) * 7;
        const yl = floatY;

        // Tilted Rotation calculations
        // Step 1: Rotate around Y-axis (tiltY roll)
        const cosY = Math.cos(tiltY);
        const sinY = Math.sin(tiltY);
        const x_yRot = xl * cosY + zl * sinY;
        const z_yRot = -xl * sinY + zl * cosY;
        const y_yRot = yl;

        // Step 2: Rotate around X-axis (tiltX pitch)
        const cosX = Math.cos(tiltX);
        const sinX = Math.sin(tiltX);
        const x_final = x_yRot;
        const y_final = y_yRot * cosX - z_yRot * sinX;
        const z_final = y_yRot * sinX + z_yRot * cosX;

        // Visual projection onto 2D coordinate space (relative to 250,250 viewBox center)
        const screenX = 250 + x_final;
        const screenY = 250 + y_final;

        // Compute perspective scaling, opacity, and Z-sorting relative to core (z=0, index=1000)
        const scaleFactor = 0.84 + (z_final / 215) * 0.15; // 0.69 to 0.99
        const depthOpacity = 0.45 + ((z_final + 215) / 430) * 0.55; // 0.45 to 1.0
        const depthZIndex = Math.round(z_final + 1000);

        // Fetch card-specific hovered offsets
        const hoverTX = parseFloat(cardEl.dataset.hoverTiltX || '0');
        const hoverTY = parseFloat(cardEl.dataset.hoverTiltY || '0');

        // Apply interactive transforms to card container
        cardEl.style.transform = `translate3d(calc(-50% + ${x_final}px), calc(-50% + ${y_final}px), ${z_final}px) scale(${scaleFactor}) rotateX(${hoverTX - my * 5}deg) rotateY(${hoverTY + mx * 5}deg)`;
        cardEl.style.opacity = `${depthOpacity}`;
        cardEl.style.zIndex = `${depthZIndex}`;

        // Compute curved path control point for beautiful technical wiring (bend proportional to radius)
        const midX = 250 + x_final / 2;
        const midY = 250 + y_final / 2;
        
        let nx = 0;
        let ny = 0;
        const len = Math.sqrt(x_final * x_final + y_final * y_final);
        if (len > 0) {
          nx = -y_final / len; // Perpendicular direction X
          ny = x_final / len;  // Perpendicular direction Y
        }
        
        const bendAmt = node.r * 0.14;
        const controlX = midX + nx * bendAmt;
        const controlY = midY + ny * bendAmt;

        // Apply SVG connection path definition
        const pathData = `M 250 250 Q ${controlX} ${controlY} ${screenX} ${screenY}`;
        if (pathEl) {
          pathEl.setAttribute('d', pathData);
          
          const isNodeHovered = hoveredNodeIdRef.current === node.id;
          pathEl.setAttribute('stroke', isNodeHovered ? node.color : 'url(#lineGlowGrad)');
          pathEl.setAttribute('stroke-width', isNodeHovered ? '2.5' : '1.1');
          pathEl.style.filter = isNodeHovered ? `drop-shadow(0 0 5px ${node.color})` : 'none';
          pathEl.setAttribute('opacity', `${isNodeHovered ? 1.0 : depthOpacity * 0.65}`);
        }

        // Animate particles flowing along the Bezier curves
        if (!prefersReducedMotion) {
          const flowSpeed = 0.07 + (idx % 3) * 0.015;
          const progress1 = (time * flowSpeed + (idx * 0.16)) % 1;
          
          // Main particle coordinate math
          const px1 = (1 - progress1) * (1 - progress1) * 250 + 2 * (1 - progress1) * progress1 * controlX + progress1 * progress1 * screenX;
          const py1 = (1 - progress1) * (1 - progress1) * 250 + 2 * (1 - progress1) * progress1 * controlY + progress1 * progress1 * screenY;
          
          const isNodeHovered = hoveredNodeIdRef.current === node.id;
          if (pEl1) {
            pEl1.style.transform = `translate3d(${px1}px, ${py1}px, 0) scale(${isNodeHovered ? 1.5 : 1.0})`;
            // Smoothly fade in/out particle near terminal ends
            const pulseFade = progress1 < 0.1 ? progress1 * 10 : progress1 > 0.9 ? (1 - progress1) * 10 : 1;
            pEl1.setAttribute('opacity', `${pulseFade * depthOpacity * (isNodeHovered ? 1.0 : 0.85)}`);
          }

          // Trail particle coordinate math (lagging behind)
          const progress2 = (progress1 - 0.035 + 1) % 1;
          const px2 = (1 - progress2) * (1 - progress2) * 250 + 2 * (1 - progress2) * progress2 * controlX + progress2 * progress2 * screenX;
          const py2 = (1 - progress2) * (1 - progress2) * 250 + 2 * (1 - progress2) * progress2 * controlY + progress2 * progress2 * screenY;

          if (pEl2) {
            pEl2.style.transform = `translate3d(${px2}px, ${py2}px, 0)`;
            const trailFade = progress2 < 0.1 ? progress2 * 10 : progress2 > 0.9 ? (1 - progress2) * 10 : 0.6;
            pEl2.setAttribute('opacity', `${trailFade * depthOpacity * 0.55}`);
          }
        } else {
          // Hide particles if user prefers reduced motion
          if (pEl1) pEl1.setAttribute('opacity', '0');
          if (pEl2) pEl2.setAttribute('opacity', '0');
        }
      });

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isMounted, prefersReducedMotion]);

  // Card mouse tilt dynamic handlers
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const cardEl = cardRefs.current[idx];
    if (!cardEl) return;

    const rect = cardEl.getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;

    // Map tilt relative values (max 14 degrees)
    const tiltX = -(cy / (rect.height / 2)) * 14;
    const tiltY = (cx / (rect.width / 2)) * 14;

    cardEl.dataset.hoverTiltX = `${tiltX}`;
    cardEl.dataset.hoverTiltY = `${tiltY}`;
  };

  const handleCardMouseLeave = (idx: number) => {
    const cardEl = cardRefs.current[idx];
    if (!cardEl) return;

    cardEl.dataset.hoverTiltX = '0';
    cardEl.dataset.hoverTiltY = '0';
    setHoveredNodeId(null);
  };

  // Easing function variables
  const easePremium = [0.16, 1, 0.3, 1] as const;

  // Motion variants for trust indicators
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.55
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: easePremium }
    }
  } as const;

  const trustIndicators = [
    { key: 'ai', text: t('trust.ai'), icon: Brain, color: 'text-[#145BFF]', bg: 'bg-[#145BFF]/5 border-[#145BFF]/10 hover:border-[#145BFF]/30' },
    { key: 'enterprise', text: t('trust.enterprise'), icon: Shield, color: 'text-[#48B900]', bg: 'bg-[#48B900]/5 border-[#48B900]/10 hover:border-[#48B900]/30' },
    { key: 'cloud', text: t('trust.cloud'), icon: Cloud, color: 'text-[#25B5FF]', bg: 'bg-[#25B5FF]/5 border-[#25B5FF]/10 hover:border-[#25B5FF]/30' },
    { key: 'delivery', text: t('trust.delivery'), icon: Zap, color: 'text-[#48B900]', bg: 'bg-[#48B900]/5 border-[#48B900]/10 hover:border-[#48B900]/30' }
  ];

  return (
    <section
      data-section-theme="light"
      className="relative w-full max-w-full min-w-0 min-h-[94vh] flex items-center justify-center text-[#0F172A] pt-32 sm:pt-36 lg:pt-40 pb-16 overflow-hidden select-none"
      style={{
        background: 'radial-gradient(circle at 20% 35%, rgba(20, 91, 255, 0.05), transparent 45%), radial-gradient(circle at 80% 45%, rgba(72, 185, 0, 0.05), transparent 45%), linear-gradient(135deg, #FFFFFF 0%, #F4F8FF 45%, #F4FBF7 100%)'
      }}
    >
      {/* Scope encapsulation styling block for glassmorphic elements */}
      <style jsx global>{`
        .glass-card-premium {
          background: rgba(255, 255, 255, 0.62) !important;
          backdrop-filter: blur(14px) saturate(130%) !important;
          -webkit-backdrop-filter: blur(14px) saturate(130%) !important;
          border: 1px solid rgba(220, 231, 245, 0.6) !important;
          box-shadow: 
            0 4px 18px rgba(8, 22, 45, 0.025),
            0 1px 3px rgba(8, 22, 45, 0.015),
            inset 0 1.5px 2px rgba(255, 255, 255, 0.8) !important;
          transition: transform 150ms ease-out, opacity 150ms ease-out !important;
        }
        .glass-card-premium::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(255,255,255,0.45) 0%, transparent 50%, transparent 100%);
          pointer-events: none;
          z-index: 1;
        }
        .glass-card-premium:hover {
          background: rgba(255, 255, 255, 0.8) !important;
          box-shadow: 
            0 8px 24px rgba(20, 91, 255, 0.05),
            0 2px 6px rgba(20, 91, 255, 0.02),
            inset 0 1.5px 2px rgba(255, 255, 255, 0.95) !important;
        }
        .glass-card-shine {
          position: relative;
          overflow: hidden;
        }
        .glass-card-shine::before {
          content: '';
          position: absolute;
          top: 0;
          left: -150%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.48),
            transparent
          );
          transform: skewX(-25deg);
          transition: 0.85s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 2;
        }
        .glass-card-shine:hover::before {
          left: 150%;
        }
      `}</style>

      {/* Decorative Background Enclosure */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Subtle blueprint grid overlay with radial fade */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(20, 91, 255, 0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(20, 91, 255, 0.025) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(circle at center, black 35%, transparent 88%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 35%, transparent 88%)'
          }}
        />

        {/* Luxury glowing mesh lighting layout (extremely soft colors) */}
        {/* Soft Royal Blue light top right */}
        <div className="absolute -top-1/4 -right-1/4 w-[750px] h-[750px] rounded-full bg-[radial-gradient(circle,rgba(20,91,255,0.028)_0%,rgba(20,91,255,0.005)_55%,transparent_70%)] blur-[90px]" />
        {/* Soft Sky Blue light bottom left */}
        <div className="absolute -bottom-1/4 -left-1/4 w-[750px] h-[750px] rounded-full bg-[radial-gradient(circle,rgba(37,181,255,0.024)_0%,rgba(37,181,255,0.005)_55%,transparent_70%)] blur-[90px]" />
        {/* Soft Green light mid right */}
        <div className="absolute top-1/4 right-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(72,185,0,0.015)_0%,transparent_70%)] blur-[90px]" />
      </div>

      {/* Main Two-column Responsive Container */}
      <div className="max-w-7xl min-w-0 mx-auto px-5 sm:px-8 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-10 items-center relative z-10">
        
        {/* LEFT COLUMN: Business Story */}
        <div className="col-span-1 lg:col-span-6 min-w-0 w-full space-y-8 text-left max-w-2xl">
          {/* USA-Based badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55, ease: easePremium }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-slate-200/50 backdrop-blur-sm text-eyebrow normal-case text-[#145BFF] shadow-[0_2px_8px_rgba(20,91,255,0.02)]">
              <Sparkles size={11} className="animate-pulse text-[#145BFF]" />
              {t('badge')}
            </span>
          </motion.div>

          {/* Core Redesigned Enterprise Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.65, ease: easePremium }}
            className="text-[clamp(2.25rem,11vw,4rem)] sm:text-display text-slate-900 w-full max-w-3xl min-w-0 leading-[1.15] tracking-[-0.02em] whitespace-normal break-normal"
          >
            {t('headlinePart1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#145BFF] via-[#25B5FF] to-[#48B900] pb-1 whitespace-normal [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
              {t('headlineGradient')}
            </span>
            <br className="hidden md:inline" />{' '}
            {t('headlinePart2')}
          </motion.h1>

          {/* Strictly preserved copy paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.75, ease: easePremium }}
            className="text-body-lg text-slate-600 w-full max-w-xl min-w-0"
          >
            {t('supporting')}
          </motion.p>

          {/* Premium CTAs with slight lifting animation */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.45, duration: 0.85, ease: easePremium }}
            className="flex w-full min-w-0 flex-col sm:flex-row gap-4 pt-3"
          >
            <Link
              href="/consultation"
              className="PrimaryBrandButton flex w-full min-w-0 items-center justify-center gap-2 text-center group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:w-auto"
              aria-label={t('ctaPrimary')}
            >
              <span>{t('ctaPrimary')}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
            <Link
              href="/solutions"
              className="SecondaryBrandButton w-full min-w-0 text-center group sm:w-auto"
              aria-label={t('ctaSecondary')}
            >
              <div className="flex items-center justify-center gap-2">
                <span>{t('ctaSecondary')}</span>
                <ArrowRight size={14} className="transition-transform duration-250 group-hover:translate-x-1" />
              </div>
            </Link>
          </motion.div>

          {/* Staggered trust indicators */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="pt-10 border-t border-slate-100 flex flex-wrap gap-x-8 gap-y-4"
          >
            {trustIndicators.map((indicator) => {
              const IndicatorIcon = indicator.icon;
              return (
                <motion.div
                  key={indicator.key}
                  variants={itemVariants}
                  className="flex items-center gap-2.5 group cursor-default"
                >
                  <div className={`p-1.5 rounded-lg border ${indicator.bg} ${indicator.color} transition-all duration-300 group-hover:scale-110`}>
                    <IndicatorIcon size={14} className="transition-transform duration-300 group-hover:rotate-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest transition-colors duration-300 group-hover:text-slate-900">
                    {indicator.text}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="col-span-1 lg:col-span-6 flex items-center justify-center relative min-h-[460px] sm:min-h-[500px] lg:min-h-[580px] overflow-hidden md:overflow-visible">
          <div
            ref={containerRef}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
              transition: 'transform 300ms ease-out',
              marginTop: `${(scale - 1) * 250}px`,
              marginBottom: `${(scale - 1) * 250}px`,
              marginLeft: `${(scale - 1) * 250}px`,
              marginRight: `${(scale - 1) * 250}px`
            }}
            className="relative w-[500px] h-[500px] flex items-center justify-center"
          >
            {/* Camera Wrapper (shifts with mouse pointer parallax) */}
            <div
              ref={wrapperRef}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Premium Multi-layered Glowing Digital Core (HyperCode Logo) */}
              <div
                style={{ zIndex: 1000, transformStyle: 'preserve-3d' }}
                className="relative w-[150px] h-[150px] rounded-full bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(20,91,255,0.06),inset_0_2px_4px_rgba(255,255,255,0.8)] flex items-center justify-center"
              >
                {/* Rotating technical outer ring */}
                <div
                  className="absolute inset-0.5 rounded-full border border-dashed border-[#145BFF]/25 animate-spin pointer-events-none"
                  style={{ animationDuration: '32s' }}
                />
                {/* Glowing breathing aura */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#145BFF]/5 via-[#25B5FF]/3 to-[#48B900]/5 rounded-full blur-md opacity-75 animate-pulse" />
                
                {/* Logo Image in absolute original state */}
                <div className="relative w-[100px] h-[60px] flex items-center justify-center">
                  <Image
                    src="/hypercodeit.logo.webp"
                    alt="HyperCode Core"
                    width={92}
                    height={52}
                    priority
                    quality={100}
                    style={{ height: 'auto', width: 'auto' }}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Orbit Path Background Mesh Rings */}
              <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0">
                <defs>
                  {/* Subtle grey/blue gradient for resting lines */}
                  <linearGradient id="lineGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#145BFF" stopOpacity={0.06} />
                    <stop offset="50%" stopColor="#25B5FF" stopOpacity={0.04} />
                    <stop offset="100%" stopColor="#48B900" stopOpacity={0.06} />
                  </linearGradient>
                </defs>

                {/* Orbit tracks (elliptical project of 3D orbit) */}
                <ellipse cx="250" cy="250" rx="150" ry="85" fill="none" stroke="rgba(20,91,255,0.04)" strokeWidth="1" strokeDasharray="4 8" />
                <ellipse cx="250" cy="250" rx="230" ry="130" fill="none" stroke="rgba(72,185,0,0.03)" strokeWidth="1" strokeDasharray="3 6" />

                {/* Live programmatically drawn connection paths */}
                {TECH_NODES.map((node, idx) => (
                  <path
                    key={`path-${node.id}`}
                    ref={el => { pathRefs.current[idx] = el; }}
                    fill="none"
                    stroke="url(#lineGlowGrad)"
                    strokeWidth="1.1"
                    className="transition-colors duration-300"
                  />
                ))}

                {/* Live programmatically drawn flowing data particles */}
                {TECH_NODES.map((node, idx) => (
                  <g key={`particles-${node.id}`}>
                    {/* Primary Particle */}
                    <circle
                      ref={el => { particleRefs.current[idx * 2] = el; }}
                      cx="0"
                      cy="0"
                      r="3"
                      fill={node.color}
                      className="transition-opacity duration-300"
                    />
                    {/* Lagging Trail Particle */}
                    <circle
                      ref={el => { particleRefs.current[idx * 2 + 1] = el; }}
                      cx="0"
                      cy="0"
                      r="1.8"
                      fill={node.color}
                      opacity="0.6"
                      className="transition-opacity duration-300"
                    />
                  </g>
                ))}
              </svg>

              {/* Floating HTML 3D Node Cards */}
              {TECH_NODES.map((node, idx) => {
                const NodeIcon = node.icon;
                const isHovered = hoveredNodeId === node.id;
                
                return (
                  <div
                    key={node.id}
                    ref={el => { cardRefs.current[idx] = el; }}
                    className="absolute left-1/2 top-1/2 pointer-events-auto"
                    style={{
                      transformStyle: 'preserve-3d',
                      willChange: 'transform, opacity'
                    }}
                    onMouseMove={(e) => handleCardMouseMove(e, idx)}
                    onMouseLeave={() => handleCardMouseLeave(idx)}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                  >
                    {/* Premium Glass Card Body */}
                    <div
                      className="glass-card-premium glass-card-shine flex items-center gap-2 px-3 py-1.8 rounded-xl select-none cursor-pointer"
                      style={{
                        borderColor: isHovered ? `${node.color}50` : undefined,
                        boxShadow: isHovered ? `0 8px 24px ${node.color}15, inset 0 1.5px 2px rgba(255, 255, 255, 0.9)` : undefined
                      }}
                    >
                      {/* Icon wrapper with soft glow background */}
                      <div
                        className="p-1.2 rounded-lg flex items-center justify-center transition-all duration-300"
                        style={{
                          backgroundColor: isHovered ? `${node.color}15` : node.bgGlow,
                          color: node.color
                        }}
                      >
                        <NodeIcon size={12} className="transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      
                      {/* Technical Module Name */}
                      <span className="text-caption font-bold uppercase tracking-wider text-slate-700">
                        {node.name}
                      </span>

                      {/* Small activity pulse indicator */}
                      <span
                        className="w-1.5 h-1.5 rounded-full transition-transform duration-300"
                        style={{
                          backgroundColor: node.color,
                          boxShadow: `0 0 6px ${node.color}`
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
