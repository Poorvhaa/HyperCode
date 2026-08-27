'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent, useTransform, useReducedMotion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight, Calendar, Cpu, Lock, X, Activity, CheckCircle, Sparkles, ShoppingBag, HeartPulse, TrendingUp, Globe, Users, Layers, Shield, Brain, Network, Zap, Cloud, ShieldAlert } from 'lucide-react';
import { getCaseStudies } from '@/lib/case-studies-data';
import Image from 'next/image';


// Helper to map industry icons
const getIndustryIcon = (industry: string) => {
const ind = industry.toLowerCase();
if (ind.includes('health')) return HeartPulse;
if (ind.includes('retail') || ind.includes('commerce')) return ShoppingBag;
return TrendingUp;
};

// Data structure for general industries served
const INDUSTRIES_SERVED = [
{ id: 'manufacturing', icon: Cpu, tags: ['IIoT', 'ERP', 'Supply Chain'] },
{ id: 'education', icon: Globe, tags: ['EdTech', 'LMS', 'Portals'] },
{ id: 'logistics', icon: Cloud, tags: ['Fleet Tracking', 'Routing', 'Warehouse'] },
{ id: 'hospitality', icon: Users, tags: ['Booking Systems', 'Automation', 'CRM'] },
{ id: 'construction', icon: Layers, tags: ['Project Management', 'Databases', 'Collaboration'] },
{ id: 'legal', icon: Shield, tags: ['Document Storage', 'Contracts', 'Billing'] },
{ id: 'pharma', icon: Brain, tags: ['Biotech', 'Databases', 'FDA Compliance'] },
{ id: 'government', icon: Network, tags: ['GovTech', 'Citizen Portals', 'Audit Tools'] },
{ id: 'technology', icon: Zap, tags: ['SaaS MVP', 'Cloud scaling', 'Vulnerability Scans'] }
];


// Animated KPI progress ring
function KPIRing({ value, label, active }: { value: string; label: string; active: boolean }) {
const pct = parseFloat(value) || 75; // fallback
const radius = 55;
const strokeWidth = 8;
const circumference = 2 * Math.PI * radius;
const strokeDashoffset = circumference - (pct / 100) * circumference;

return (
<div className="relative flex flex-col items-center justify-center w-36 h-36 mx-auto select-none">
<svg className="w-full h-full transform -rotate-90 overflow-visible">
{/* Background track circle */}
<circle
cx="72"
cy="72"
r={radius}
fill="none"
stroke="#E2E8F0"
strokeWidth={strokeWidth - 2}
strokeDasharray="4 4"
/>
{/* Active glowing progress circle */}
<motion.circle
cx="72"
cy="72"
r={radius}
fill="none"
stroke={active ? '#145BFF' : '#94A3B8'}
strokeWidth={strokeWidth}
strokeDasharray={circumference}
initial={{ strokeDashoffset: circumference }}
animate={{ strokeDashoffset: active ? strokeDashoffset : circumference }}
transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
strokeLinecap="round"
className="transition-colors duration-300"
style={{ filter: active ? 'drop-shadow(0 0 5px rgba(20,91,255,0.35))' : 'none' }}
/>
</svg>
{/* Centered KPI text */}
<div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3">
<span className="text-xl font-black text-slate-900 tracking-tight leading-none">{value}</span>
<span className="text-[7.5px] font-black text-slate-450 uppercase tracking-widest leading-tight mt-1.5 truncate max-w-[100px]">
{label.split(' ')[0]}
</span>
</div>
</div>
);
}

export function CaseStudiesSection() {
const t = useTranslations('CaseStudies');
const tSolutions = useTranslations('SolutionsPage');
const tHero = useTranslations('Hero');
const locale = useLocale();
const prefersReducedMotion = useReducedMotion() ?? false;


// Load the 3 featured case studies
const studies = getCaseStudies(locale).slice(0, 3);

const sectionRef = useRef<HTMLDivElement>(null);
const canvasRef = useRef<HTMLDivElement>(null);

// States
const [activeIdx, setActiveIdx] = useState<number>(0);
  const [clickedIdx, setClickedIdx] = useState<number | null>(null);
  const zoomedStudy = clickedIdx !== null ? studies[clickedIdx] : null;
const [parallax, setParallax] = useState({ x: 0, y: 0 });
const [progressVal, setProgressVal] = useState(0);

// Sticky scroll progress
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ['start 96px', 'end 100%']
});

const smoothScroll = useSpring(scrollYProgress, {
stiffness: 100,
damping: 30,
mass: 1
});

// 3 cards, so scrollPosition goes from 0 to 2
const scrollPosition = useTransform(smoothScroll, [0, 1], [0, studies.length - 1]);

useMotionValueEvent(scrollPosition, 'change', (latest) => {
setProgressVal(latest);
const rounded = Math.min(studies.length - 1, Math.max(0, Math.round(latest)));
if (rounded !== activeIdx && clickedIdx === null) {
setActiveIdx(rounded);
}
});

// Cursor Parallax handlers (disabled when reduced motion is on)
const handleMouseMove = (e: React.MouseEvent) => {
if (!canvasRef.current || clickedIdx !== null || prefersReducedMotion) return;
const rect = canvasRef.current.getBoundingClientRect();
const x = (e.clientX - rect.left) / rect.width - 0.5;
const y = (e.clientY - rect.top) / rect.height - 0.5;
setParallax({ x: x * 20, y: y * 20 });
};

const handleMouseLeave = () => {
setParallax({ x: 0, y: 0 });
};

// Card 0 motion values
const relPos0 = useTransform(scrollPosition, (pos) => 0 - pos);
const x0 = useTransform(relPos0, [-1.5, -1, 0, 1, 1.5], ['-290%', '-170%', '-50%', '70%', '190%']);
const scale0 = useTransform(relPos0, [-1.5, -1, 0, 1, 1.5], [0.85, 0.9, 1.0, 0.9, 0.85]);
const opacity0 = useTransform(relPos0, [-1.1, -1, 0, 1, 1.1], [0, 0.15, 1.0, 0.15, 0]);

// Card 1 motion values
const relPos1 = useTransform(scrollPosition, (pos) => 1 - pos);
const x1 = useTransform(relPos1, [-1.5, -1, 0, 1, 1.5], ['-290%', '-170%', '-50%', '70%', '190%']);
const scale1 = useTransform(relPos1, [-1.5, -1, 0, 1, 1.5], [0.85, 0.9, 1.0, 0.9, 0.85]);
const opacity1 = useTransform(relPos1, [-1.1, -1, 0, 1, 1.1], [0, 0.15, 1.0, 0.15, 0]);

// Card 2 motion values
const relPos2 = useTransform(scrollPosition, (pos) => 2 - pos);
const x2 = useTransform(relPos2, [-1.5, -1, 0, 1, 1.5], ['-290%', '-170%', '-50%', '70%', '190%']);
const scale2 = useTransform(relPos2, [-1.5, -1, 0, 1, 1.5], [0.85, 0.9, 1.0, 0.9, 0.85]);
const opacity2 = useTransform(relPos2, [-1.1, -1, 0, 1, 1.1], [0, 0.15, 1.0, 0.15, 0]);

const cardMotionValues = [
{ x: x0, scale: scale0, opacity: opacity0 },
{ x: x1, scale: scale1, opacity: opacity1 },
{ x: x2, scale: scale2, opacity: opacity2 }
];

// Jump scroll target mapper
const handleTimelineClick = (idx: number) => {
if (!sectionRef.current) return;
setClickedIdx(null);
setActiveIdx(idx);

const rect = sectionRef.current.getBoundingClientRect();
const scrollTop = window.scrollY || document.documentElement.scrollTop;
const scrollableHeight = rect.height - window.innerHeight;

const targetProgress = idx / (studies.length - 1);
const targetScrollY = scrollTop + rect.top + targetProgress * scrollableHeight;
window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
};

const SCROLL_PER_CARD_VH = 50;
const totalScrollHeightVh = studies.length * SCROLL_PER_CARD_VH; // 150vh

return (
<>
{/* ==========================================
DESKTOP VIEW: STICKY HORIZONTAL TIMELINE (>= 1024px)
========================================== */}
<div
  tabIndex={0}
  aria-label={t('title')}
  onKeyDown={(e) => {
    if (prefersReducedMotion) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIdx = Math.max(0, activeIdx - 1);
      handleTimelineClick(prevIdx);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIdx = Math.min(studies.length - 1, activeIdx + 1);
      handleTimelineClick(nextIdx);
    }
  }}
  className="hidden lg:block relative w-full bg-[#F5F7FB] border-b border-slate-200 focus-visible:outline-none"
>
  {/* 1. Header (Static Layout) */}
  <div className="max-w-7xl mx-auto px-8 pt-24 xl:pt-[120px] pb-6 w-full relative z-20">
    <div className="max-w-3xl text-left flex flex-col">
      <span className="inline-flex items-center gap-1.5 text-eyebrow text-royal-blue mb-4 lg:mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-royal-blue animate-pulse" />
        {t('badge')}
      </span>
      <h2 className="text-h2 text-slate-900 mb-4 lg:mb-5">
        {t('title')}
      </h2>
      <p className="text-body text-slate-500 max-w-xl">
        {t('subtitle')}
      </p>
    </div>
  </div>

  {/* 2. Scroll Track with Sticky cards */}
  <div
    ref={sectionRef}
    style={prefersReducedMotion ? {} : { height: `${totalScrollHeightVh}vh` }}
    className="relative w-full overflow-visible"
  >
    <div
      className={`${
        prefersReducedMotion ? 'relative top-0 h-auto' : 'sticky top-[96px] h-[calc(100vh-96px)]'
      } w-full overflow-hidden flex flex-col justify-center bg-[#F5F7FB] bg-[linear-gradient(to_right,rgba(20,91,255,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,91,255,0.008)_1px,transparent_1px)] bg-[size:40px_40px] z-10`}
    >
      <div className="max-w-7xl mx-auto px-8 w-full relative z-20 flex flex-col">
        {/* Horizontal Timeline Track Canvas */}
        <div
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`relative w-full ${
            prefersReducedMotion ? 'h-auto py-8' : 'h-[440px] xl:h-[500px]'
          } flex items-center justify-center pointer-events-auto z-20`}
        >
          {/* Timeline Track Wrapper */}
          <div
            className={`relative w-full h-full flex ${
              prefersReducedMotion ? 'flex-row justify-center gap-8' : 'items-center justify-center'
            } overflow-visible`}
          >
            {/* Horizontal Guide Blueprint Line */}
            {!prefersReducedMotion && (
              <div 
                className="absolute left-0 right-0 h-[1.5px] bg-slate-200/80 z-0"
              />
            )}

            {/* Glowing Data pulse traveling down path */}
            {!prefersReducedMotion && clickedIdx === null && (
              <motion.div
                animate={{ left: ['0%', '100%'] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                className="absolute h-1 w-12 bg-gradient-to-r from-royal-blue/0 via-royal-blue to-royal-blue/0 rounded-full shadow-[0_0_8px_rgba(20,91,255,0.8)] z-10"
                style={{ top: 'calc(50% - 2px)' }}
              />
            )}

            {studies.map((study, idx) => {
              const isFoc = activeIdx === idx;
              const isClicked = clickedIdx === idx;

              const IndustryIcon = getIndustryIcon(study.industry);
              const firstMetric = study.metrics[0] || { value: '100%', label: 'Success' };

              // Highlighting mechanics
              let capsuleBorder = 'border-slate-200/80';
              let scaleTarget = 1;
              let opacityTarget = 1;

              if (clickedIdx !== null) {
                if (isClicked) {
                  scaleTarget = 1.05;
                  opacityTarget = 1.0;
                  capsuleBorder = 'border-royal-blue shadow-lg';
                } else {
                  scaleTarget = 0.9;
                  opacityTarget = 0.15;
                }
              } else {
                if (isFoc) {
                  capsuleBorder = 'border-royal-blue shadow-md';
                }
              }

              return (
                <motion.div
                  key={study.slug}
                  tabIndex={prefersReducedMotion || isFoc ? 0 : -1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (isFoc || prefersReducedMotion) {
                        setClickedIdx(idx);
                      } else {
                        handleTimelineClick(idx);
                      }
                    }
                  }}
                  style={
                    prefersReducedMotion
                      ? {
                          position: 'relative'
                        }
                      : {
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          x: cardMotionValues[idx]?.x,
                          y: '-50%',
                          ...(clickedIdx === null
                            ? {
                                scale: cardMotionValues[idx]?.scale,
                                opacity: cardMotionValues[idx]?.opacity,
                              }
                            : {})
                        }
                  }
                  animate={
                    prefersReducedMotion
                      ? { scale: 1, opacity: 1 }
                      : clickedIdx !== null
                        ? { scale: scaleTarget, opacity: opacityTarget }
                        : {}
                  }
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => {
                    if (prefersReducedMotion || isFoc) {
                      setClickedIdx(idx);
                    } else {
                      handleTimelineClick(idx);
                    }
                  }}
                  className={`w-[330px] h-[390px] xl:h-[450px] rounded-[36px] border backdrop-blur-xl p-7 flex flex-col justify-between relative overflow-hidden select-none hover:border-royal-blue/30 cursor-pointer shadow-xs transition-all duration-300 z-20 ${
                    prefersReducedMotion
                      ? 'pointer-events-auto border-slate-200/80 bg-white/95 shadow-md'
                      : isFoc
                      ? 'pointer-events-auto border-royal-blue bg-[#F4F8FF]/95 ring-1 ring-royal-blue/20 shadow-sm scale-102 z-30'
                      : 'pointer-events-none border-slate-200/80 bg-white/95 opacity-18'
                  } ${capsuleBorder}`}
                >
                  {/* Glass Shimmer Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/20 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />

                  {/* Header block */}
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-150 text-[9px] font-black text-slate-500 uppercase tracking-wider">
                      <IndustryIcon size={11} className="text-royal-blue" />
                      <span>{study.industry}</span>
                    </span>
                    <span className="text-[8px] font-black text-green tracking-wider uppercase bg-green/10 px-2 py-0.5 rounded-md">
                      DEPLOYED
                    </span>
                  </div>

                  {/* Center: KPI progress ring */}
                  <div className="my-2">
                    <KPIRing value={firstMetric.value} label={firstMetric.label} active={prefersReducedMotion || isFoc || isClicked} />
                  </div>

                  {/* Bottom contents */}
                  <div className="space-y-3">
                    <div className="space-y-1 text-left">
                      <span className="text-eyebrow text-slate-400">
                        {study.clientType}
                      </span>
                      <h3 className="text-h4 text-slate-900 line-clamp-2">
                        {study.title}
                      </h3>
                    </div>

                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {study.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-lg bg-slate-50 border border-slate-150 text-slate-500 text-[8.5px] font-extrabold uppercase tracking-wide"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[9px] font-black text-slate-400 tracking-wider uppercase">
                      <div className="flex items-center gap-1">
                        <CheckCircle size={12} className="text-green" />
                        <span>100% SUCCESS</span>
                      </div>
                      <span className="text-royal-blue tracking-tight hover:underline flex items-center gap-0.5">
                        {locale === 'es' ? 'Ver Detalles' : 'View Details'}
                        <ArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Timeline navigation dots */}
        <div className="flex justify-center gap-3 mt-8">
          {studies.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleTimelineClick(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeIdx === idx
                  ? 'bg-royal-blue w-6'
                  : 'bg-slate-200 hover:bg-slate-350'
              }`}
              aria-label={`Go to case study ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
</div>

{/* ==========================================
TABLET VIEW: CONDENSED TIMELINE (768px - 1023px)
========================================== */}
    <div className="hidden md:block lg:hidden pt-[72px] pb-[72px] md:pt-[96px] md:pb-[96px] bg-[#F5F7FB] border-b border-slate-200 text-slate-800 text-center relative overflow-visible select-none">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 text-eyebrow text-royal-blue mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-royal-blue animate-pulse" />
            {t('badge')}
          </span>
          <h2 className="text-h2 text-slate-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-body-sm text-slate-500">
            {t('subtitle')}
          </p>
        </div>

          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none">
{studies.map((study, idx) => {
const IndustryIcon = getIndustryIcon(study.industry);
const firstMetric = study.metrics[0] || { value: '100%', label: 'Success' };

return (
<div
key={study.slug}
onClick={() => setClickedIdx(idx)}
className="snap-center shrink-0 w-[300px] h-[420px] rounded-3xl border border-slate-200 bg-white p-6 flex flex-col justify-between cursor-pointer focus:outline-none shadow-2xs relative"
>
<div className="flex justify-between items-center">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-50 border border-slate-150 text-[8px] font-black text-slate-500 uppercase tracking-wider">
<IndustryIcon size={10} className="text-royal-blue" />
<span>{study.industry}</span>
</span>
<span className="text-[8px] font-black text-green uppercase tracking-wider bg-green/10 px-2 py-0.5 rounded">
STABLE
</span>
</div>

<div className="my-2 scale-90">
<KPIRing value={firstMetric.value} label={firstMetric.label} active={true} />
</div>

<div className="space-y-3 text-left">
<div className="leading-tight">
<span className="text-eyebrow text-slate-400 block">{study.clientType}</span>
<h3 className="text-h4 text-slate-900 line-clamp-2 mt-0.5">{study.title}</h3>
</div>
<div className="flex flex-wrap gap-1">
{study.technologies.slice(0, 3).map((tech) => (
<span key={tech} className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-150 text-[8px] text-slate-500 font-extrabold uppercase">
{tech}
</span>
))}
</div>
</div>
</div>
);
})}
</div>

<div className="pt-4 border-t border-slate-200 flex justify-center">
<Link
href="/case-studies"
className="px-6 py-3.5 rounded-xl border border-slate-200 bg-white inline-flex items-center font-black text-[10px] uppercase tracking-wider text-slate-700 hover:text-royal-blue transition"
>
<span>{t('viewAll')}</span>
<ArrowRight size={13} className="ml-1.5" />
</Link>
</div>

</div>
</div>

{/* ==========================================
MOBILE VIEW: VERTICAL BLUEPRINT TIMELINE (< 768px)
========================================== */}
    <div className="block md:hidden pt-[56px] pb-[56px] bg-[#F5F7FB] border-b border-slate-200 overflow-visible text-left bg-[linear-gradient(to_right,rgba(20,91,255,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,91,255,0.008)_1px,transparent_1px)] bg-[size:30px_30px]">
      <div className="max-w-7xl mx-auto px-6 space-y-10">

        {/* Header */}
        <div className="flex flex-col text-left">
          <span className="inline-flex items-center gap-1.5 text-eyebrow text-royal-blue mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-royal-blue animate-pulse" />
            {t('badge')}
          </span>
          <h2 className="text-h2 text-slate-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-body-sm text-slate-500">
            {t('subtitle')}
          </p>
        </div>

{/* Vertical Storytelling Timeline */}
<div className="relative pl-10 space-y-8">
<div className="absolute left-[17px] top-4 bottom-4 w-[2px] bg-slate-200" />

<motion.div
animate={{ top: ['2%', '98%'] }}
transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
className="absolute left-[15px] w-1.5 h-1.5 rounded-full bg-royal-blue shadow-[0_0_6px_rgba(20,91,255,0.7)]"
/>

{studies.map((study, idx) => {
const IndustryIcon = getIndustryIcon(study.industry);
const firstMetric = study.metrics[0] || { value: '100%', label: 'Success' };

return (
<div key={study.slug} className="relative">
{/* Timeline Module Dot */}
<div className="absolute -left-[35px] top-1.5 w-7 h-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center shadow-2xs z-10">
<IndustryIcon size={12} className="text-slate-500" />
</div>

{/* Expandable Glass Card */}
<button
onClick={() => setClickedIdx(idx)}
className="w-full text-left p-5 rounded-2xl border border-slate-200 bg-[#F8FAFC]/90 hover:bg-[#F8FAFC] transition-all cursor-pointer flex flex-col justify-between"
>
<div className="space-y-3 w-full">
<div className="flex justify-between items-center w-full">
<span className="text-eyebrow text-slate-400">{study.clientType}</span>
<span className="text-[7.5px] font-black text-green bg-green/10 px-2 py-0.5 rounded uppercase">DEPLOYED</span>
</div>
<h3 className="text-h4 text-slate-900">{study.title}</h3>
<p className="text-body-sm text-slate-500 line-clamp-3">{study.challenge}</p>

{/* Metric highlights */}
<div className="flex items-center gap-3 pt-3 border-t border-slate-200/60 mt-1">
<div className="text-lg font-black text-royal-blue leading-none">{firstMetric.value}</div>
<div className="text-[8px] font-bold text-slate-400 uppercase tracking-wide leading-none">{firstMetric.label}</div>
</div>
</div>

<div className="pt-4 border-t border-slate-200/60 w-full mt-4 flex items-center justify-between text-[9px] font-black text-royal-blue uppercase tracking-wider">
<span>100% Success</span>
<span className="flex items-center gap-0.5">
{locale === 'es' ? 'Ver Detalles' : 'View Details'}
<ArrowRight size={10} />
</span>
</div>
</button>
</div>
);
})}
</div>

<div className="pt-4 border-t border-slate-200 flex justify-center">
<Link
href="/case-studies"
className="px-6 py-3 rounded-xl border border-slate-200 bg-white inline-flex items-center font-black text-[10px] uppercase tracking-wider text-slate-700"
>
<span>{t('viewAll')}</span>
<ArrowRight size={13} className="ml-1.5" />
</Link>
</div>

</div>
</div>

{/* ==========================================
ZOOM DETAIL MODAL OVERLAY (BEFORE -> AFTER TRANSFORMATION STORY)
========================================== */}
<AnimatePresence>
{clickedIdx !== null && zoomedStudy && (
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/35 backdrop-blur-md">
<motion.div
initial={{ scale: 0.95, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl bg-white rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[850px] z-50 text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setClickedIdx(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-slate-150 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all z-50 shadow-sm cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Column 1: Image & Basic Info (40% width) */}
              <div className="w-full md:w-[40%] bg-slate-50 border-r border-slate-100 p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-20 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(20,91,255,0.1),transparent_70%)]" />
                
                <div className="space-y-6">
                  {/* Image */}
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-md border border-slate-200/50">
                    <Image
                      src={zoomedStudy.featuredImage}
                      alt={zoomedStudy.title}
                      fill
                      sizes="(max-w-768px) 100vw, 30vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Header info */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-royal-blue uppercase tracking-widest block">
                      {zoomedStudy.industry}
                    </span>
                    <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">
                      {zoomedStudy.clientType}
                    </span>
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest pt-1">
                      <Calendar size={11} className="text-royal-blue" />
                      <span>{zoomedStudy.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="pt-6 border-t border-slate-200/60 mt-6">
                  <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-3">Technologies Used</div>
                  <div className="flex flex-wrap gap-1.5">
                    {zoomedStudy.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-lg bg-white border border-slate-150 text-slate-600 text-[9.5px] font-extrabold uppercase tracking-wide shadow-3xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Column 2 & 3: Content (60% width) */}
              <div className="flex-1 p-8 overflow-y-auto space-y-6">
                <div className="space-y-2">
                  <h3 className="text-h3 text-slate-900">
                    {zoomedStudy.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                  {/* Before (Challenge) */}
                  <div className="space-y-3 p-5 rounded-2xl bg-rose-500/[0.02] border border-rose-500/10">
                    <div className="flex items-center gap-1.5 text-rose-500">
                      <ShieldAlert size={14} />
                      <h4 className="text-eyebrow text-slate-800">{t('challenge')}</h4>
                    </div>
                    <p className="text-body-sm text-slate-600">
                      {zoomedStudy.challenge}
                    </p>
                  </div>

                  {/* Implementation & Solution */}
                  <div className="space-y-3 p-5 rounded-2xl bg-royal-blue/[0.02] border border-royal-blue/10">
                    <div className="flex items-center gap-1.5 text-royal-blue">
                      <Cpu size={14} />
                      <h4 className="text-eyebrow text-slate-800">{t('solution')}</h4>
                    </div>
                    <p className="text-body-sm text-slate-600">
                      {zoomedStudy.solution}
                    </p>
                    <div className="pt-3 border-t border-slate-100/60 mt-1">
                      <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">Deployed Architecture</div>
                      <p className="text-[10px] font-semibold text-slate-500 leading-relaxed">{zoomedStudy.implementation}</p>
                    </div>
                  </div>
                </div>

                {/* Outcome & Metrics */}
                <div className="space-y-5 p-5 rounded-2xl bg-green/5 border border-green/10 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-1.5 text-green">
                      <CheckCircle size={14} />
                      <h4 className="text-eyebrow text-slate-800">{t('outcome')}</h4>
                    </div>
                    <p className="text-body-sm text-slate-755">
                      {zoomedStudy.businessImpact}
                    </p>
                  </div>

                  {/* All metrics list dynamically rendered */}
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100/60">
                    {zoomedStudy.metrics.map((m, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-150 flex flex-col justify-between shadow-3xs">
                        <span className="text-[7.5px] font-black text-slate-450 uppercase tracking-wider leading-none">{m.label}</span>
                        <span className="text-base font-black text-slate-900 leading-tight mt-1.5 text-transparent bg-clip-text bg-gradient-to-r from-royal-blue to-green">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <Link
                    href={`/case-studies/${zoomedStudy.slug}`}
>
<span>{t('readStory')}</span>
<ArrowRight size={13} />
</Link>
</div>

</div>
</motion.div>
</div>
)}

{/* ==========================================
INDUSTRIES WE SERVE SHOWCASE SECTION (All Viewports)
========================================== */}
<section className="relative w-full bg-slate-50 border-b border-slate-200 py-24 lg:py-28 overflow-visible scroll-mt-24">
{/* Blueprint background grid enclosure */}
<div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
  <div
    className="absolute inset-0 opacity-[0.25]"
    style={{
      backgroundImage: `linear-gradient(to right, rgba(20, 91, 255, 0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(20, 91, 255, 0.015) 1px, transparent 1px)`,
      backgroundSize: '36px 36px',
      maskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)',
      WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)'
    }}
  />
</div>

<div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10 space-y-12">

{/* Section Header */}
<div className="max-w-3xl text-left space-y-3">
<span className="inline-flex items-center gap-1.5 text-xs font-bold text-royal-blue tracking-widest uppercase">
<span className="w-1.5 h-1.5 rounded-full bg-royal-blue animate-pulse" />
{tSolutions('industries')}
</span>
<h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
{tSolutions('industriesTitle')}
</h2>
<p className="text-sm text-slate-500 font-semibold leading-relaxed max-w-xl">
{tSolutions('industriesSubtitle')}
</p>
</div>

{/* Industry Cards Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
{INDUSTRIES_SERVED.map((ind) => {
const IndIcon = ind.icon;
return (
<div
key={ind.id}
className="flex flex-col justify-between p-6 rounded-2xl border border-slate-200 bg-white shadow-2xs hover:border-royal-blue/30 hover:shadow-xs transition-all duration-300 group select-none min-h-[220px]"
>
<div className="space-y-4">
{/* Icon wrapper */}
<div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-150 flex items-center justify-center text-slate-500 group-hover:text-royal-blue group-hover:bg-royal-blue/5 group-hover:border-royal-blue/15 transition-all duration-300">
<IndIcon size={20} />
</div>

{/* Content */}
<div className="space-y-2 text-left">
<h3 className="text-sm font-black text-slate-900 tracking-tight leading-snug">
{tSolutions(`industriesList.${ind.id}.title`)}
</h3>
<p className="text-[11.5px] font-medium text-slate-500 leading-relaxed line-clamp-3">
{tSolutions(`industriesList.${ind.id}.desc`)}
</p>
</div>
</div>

{/* Tags & Action */}
<div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1 items-center justify-between">
<div className="flex flex-wrap gap-1 max-w-[65%]">
{ind.tags.slice(0, 2).map((tag) => (
<span
key={tag}
className="px-1.5 py-0.5 rounded-md bg-slate-50 border border-slate-150 text-slate-400 text-[8px] font-black uppercase tracking-wide"
>
{tag}
</span>
))}
</div>

<Link
href="/solutions"
className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-royal-blue hover:gap-1.5 transition-all focus:outline-none focus:ring-1 focus:ring-royal-blue/30 rounded"
>
<span>{tHero('exploreSolutions')}</span>
<ArrowRight size={10} />
</Link>
</div>
</div>
);
})}
</div>

</div>
</section>

</AnimatePresence>
</>
);
}
