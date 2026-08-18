'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useScroll, useSpring, useMotionValueEvent, useTransform } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

function FinalCTAContent() {
  const t = useTranslations('cta');
  const locale = useLocale();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progressVal, setProgressVal] = useState(0);

  // Track entry scroll progress to fade streams into global network
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start']
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25
  });

  useMotionValueEvent(smoothScroll, 'change', (latest) => {
    setProgressVal(latest);
  });

  const mapScale = useTransform(smoothScroll, [0, 0.6], [0.85, 1.0], { clamp: true });
  const mapOpacity = useTransform(smoothScroll, [0, 0.5], [0.3, 1.0], { clamp: true });
  return (
    <section
      ref={sectionRef}
      id="consultation-section"
      className="relative py-24 md:py-28 bg-white border-t border-slate-200 overflow-hidden"
    >
      {/* Blueprint grid ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-royal-blue/5 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-green/3 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div 
          className="rounded-[36px] border border-[#94a3b8]/18 p-8 md:p-12 lg:p-16 shadow-soft bg-[radial-gradient(circle,rgba(20,91,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]"
          style={{
            background: 'linear-gradient(120deg, rgba(37,99,235,0.06) 0%, rgba(34,197,94,0.05) 100%)'
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT ZONE: Title, Description, and CTAs */}
            <div className="col-span-1 lg:col-span-5 flex flex-col justify-start space-y-6 text-left">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 text-eyebrow text-royal-blue">
                  <span className="w-1.5 h-1.5 rounded-full bg-royal-blue animate-pulse" />
                  {t('badge') || 'GET IN TOUCH'}
                </span>
                <h2 className="text-h2 text-slate-900">
                  {t('heading') || 'Ready to Build Your Next Digital Solution?'}
                </h2>
                <p className="text-body text-slate-500">
                  {t('description') || 'Partner with our elite engineering squads and technology consultants to build secure, scalable, and AI-first systems.'}
                </p>
              </div>
 
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/consultation"
                  className="PrimaryBrandButton flex items-center justify-center gap-2 group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg h-[48px] min-h-[48px]"
                  aria-label={t('primaryButton') || 'Schedule Consultation'}
                >
                  <span>{t('primaryButton') || 'Schedule Consultation'}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center h-[48px] px-7 text-button rounded-full border border-royal-blue/20 bg-white text-royal-blue hover:bg-royal-blue/5 hover:border-royal-blue/50 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue/25"
                  aria-label={t('secondaryButton') || 'Contact HyperCode'}
                >
                  {t('secondaryButton') || 'Contact HyperCode'}
                </Link>
              </div>
            </div>

            {/* RIGHT ZONE: Visual Network Map */}
            <div className="col-span-1 lg:col-span-7 w-full flex items-center justify-center">
              <motion.div
                style={{
                  scale: mapScale,
                  opacity: mapOpacity
                }}
                className="relative w-full h-[320px] sm:h-[360px] md:h-[400px] rounded-3xl border border-slate-200 bg-white flex items-center justify-center overflow-hidden shadow-soft select-none"
              >
                {/* Coordinate overlay grid */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,91,255,0.03)_0%,transparent_80%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,91,255,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,91,255,0.008)_1px,transparent_1px)] bg-[size:20px_20px]" />

                <svg className="w-[85%] h-[80%] opacity-90 overflow-visible relative z-10" viewBox="0 0 400 200" aria-hidden="true">
                  {/* Dotted World Grid Map Representation */}
                  <path
                    d="M 50 100 Q 100 40, 200 100 T 350 100"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <path
                    d="M 70 120 Q 150 180, 250 120 T 330 110"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  
                  {/* Deployed target nodes */}
                  {[
                    { cx: 70, cy: 90, label: 'AI Engine', color: '#145BFF' },
                    { cx: 160, cy: 60, label: 'US East Core', color: '#145BFF' },
                    { cx: 220, cy: 140, label: 'LatAm Squads', color: '#48B900' },
                    { cx: 330, cy: 80, label: 'Security Hub', color: '#145BFF' }
                  ].map((node, idx) => (
                    <g key={idx}>
                      <circle cx={node.cx} cy={node.cy} r="5" fill={node.color} className="animate-pulse" />
                      <circle cx={node.cx} cy={node.cy} r="10" fill="none" stroke={node.color} strokeWidth="1.5" className="animate-ping" style={{ animationDuration: '3s' }} />
                      <text x={node.cx - 25} y={node.cy - 12} fill="#64748B" fontSize="6.5" fontWeight="900" letterSpacing="0.5">{node.label}</text>
                    </g>
                  ))}

                  {/* Animated data data routes flowing along map */}
                  <motion.circle
                    cx="0"
                    cy="0"
                    r="3.5"
                    fill="#145BFF"
                    animate={{
                      x: [70, 160, 330],
                      y: [90, 60, 80]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.circle
                    cx="0"
                    cy="0"
                    r="3"
                    fill="#48B900"
                    animate={{
                      x: [220, 160, 70],
                      y: [140, 60, 90]
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  />
                </svg>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <FinalCTAContent />
  );
}
