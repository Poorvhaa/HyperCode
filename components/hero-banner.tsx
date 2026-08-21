'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface HeroBannerProps {
  bgImage: string;
  bgImageAlt?: string;
  overlayOpacity?: number; // base opacity e.g. 0.65
  categoryLabel?: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  breadcrumbs?: Breadcrumb[];
  ctaButtons?: React.ReactNode;
  isCompact?: boolean;
}

export function HeroBanner({
  bgImage,
  bgImageAlt,
  overlayOpacity = 0.52,
  categoryLabel,
  title,
  titleHighlight,
  subtitle,
  breadcrumbs,
  ctaButtons,
  isCompact = false
}: HeroBannerProps) {
  // Compute top, middle, and bottom opacity levels for the gradient overlay matching the 45-60% requirement
  const topOpacity = Math.min(overlayOpacity + 0.08, 0.60);
  const midOpacity = Math.min(overlayOpacity - 0.04, 0.52);
  const botOpacity = Math.min(overlayOpacity + 0.06, 0.60);

  return (
    <section className={
      isCompact 
        ? "relative w-full overflow-hidden bg-[#F8FAFC] border-b border-slate-200 bg-dot-pattern text-left pt-[104px] pb-[24px] sm:pt-[112px] sm:pb-[32px] lg:pt-[152px] lg:pb-[32px]" 
        : "relative w-full h-[480px] sm:h-[520px] lg:h-[560px] flex items-center overflow-hidden bg-[#F8FAFC] border-b border-slate-200 bg-dot-pattern text-left"
    }>
      {/* Background Image Container with Slow Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: 'easeOut' }}
          className="relative w-full h-full"
        >
          <Image
            src={bgImage}
            alt={bgImageAlt || title}
            fill
            priority
            className="object-cover object-center opacity-[0.06] select-none pointer-events-none filter saturate-50"
          />
        </motion.div>
        
        {/* Custom Light Gradient Overlay */}
        <div 
          className="absolute inset-0 z-10" 
          style={{
            background: 'linear-gradient(to bottom, rgba(248,250,252,0.85) 0%, rgba(241,245,249,0.95) 100%)'
          }}
        />
      </div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 ${isCompact ? '' : 'pt-12'}`}>
        <div className={ctaButtons ? "flex flex-col md:flex-row md:items-center md:justify-between gap-8" : "w-full"}>
          
          {/* Content Block */}
          <div className={`${
            isCompact ? "space-y-2" : "space-y-5"
          } ${ctaButtons ? "max-w-3xl" : "max-w-4xl"}`}>
            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav className={`flex items-center gap-1.5 text-[10px] font-extrabold text-slate-500 tracking-widest uppercase ${isCompact ? 'mb-0.5' : 'mb-2'}`}>
                {breadcrumbs.map((crumb, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    {crumb.href ? (
                      <Link href={crumb.href} className="hover:text-royal-blue transition-colors">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-slate-400">{crumb.label}</span>
                    )}
                    {idx < breadcrumbs.length - 1 && <span className="text-slate-450">/</span>}
                  </div>
                ))}
              </nav>
            )}

            {/* Category Badge */}
            {categoryLabel && (
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-royal-blue tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-royal-blue" />
                {categoryLabel}
              </span>
            )}

            <h1 className={`font-black text-slate-900 tracking-tight leading-[1.15] ${
              isCompact 
                ? 'text-[clamp(1.75rem,3.8vw,2.875rem)] max-w-[760px]' 
                : 'text-4xl sm:text-5xl lg:text-[56px]'
            }`}>
              {title}{' '}
              {titleHighlight && (
                <span className="text-royal-blue">
                  {titleHighlight}
                </span>
              )}
            </h1>
            
            <p className={
              isCompact 
                ? "text-[14px] sm:text-[15px] lg:text-[16px] text-slate-605 leading-[1.65] max-w-2xl md:max-w-3xl font-medium"
                : (ctaButtons ? "text-[16px] md:text-[17px] lg:text-[18px] text-slate-600 leading-[1.7] max-w-xl font-medium" : "text-[16px] md:text-[17px] lg:text-[18px] text-slate-600 leading-[1.7] max-w-2xl md:max-w-3xl font-medium")
            }>
              {subtitle}
            </p>
          </div>

          {/* Optional Action CTA Block */}
          {ctaButtons && (
            <div className="flex-shrink-0 z-20">
              {ctaButtons}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
