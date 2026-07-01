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
  overlayOpacity?: number; // base opacity e.g. 0.65
  categoryLabel?: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  breadcrumbs?: Breadcrumb[];
  ctaButtons?: React.ReactNode;
}

export function HeroBanner({
  bgImage,
  overlayOpacity = 0.52,
  categoryLabel,
  title,
  titleHighlight,
  subtitle,
  breadcrumbs,
  ctaButtons
}: HeroBannerProps) {
  // Compute top, middle, and bottom opacity levels for the gradient overlay matching the 45-60% requirement
  const topOpacity = Math.min(overlayOpacity + 0.08, 0.60);
  const midOpacity = Math.min(overlayOpacity - 0.04, 0.52);
  const botOpacity = Math.min(overlayOpacity + 0.06, 0.60);

  return (
    <section className="relative w-full h-[750px] sm:h-[850px] lg:h-[900px] flex items-center overflow-hidden bg-[#050f1e] border-b border-white/5">
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
            alt={title}
            fill
            priority
            className="object-cover object-center opacity-70 select-none pointer-events-none"
          />
        </motion.div>
        
        {/* Custom Gradient Overlay with Cool Blue Brand Tint (45-60% opacity range) */}
        <div 
          className="absolute inset-0 z-10" 
          style={{
            background: `linear-gradient(to bottom, rgba(5,15,30,${topOpacity}), rgba(8,25,45,${midOpacity}), rgba(5,10,20,${botOpacity}))`
          }}
        />
        
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.35))] z-10 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 pt-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          
          {/* Content Block */}
          <div className="max-w-3xl space-y-5">
            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav className="flex items-center gap-1.5 text-[10px] font-extrabold text-slate-300 tracking-widest uppercase mb-2 drop-shadow-md">
                {breadcrumbs.map((crumb, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    {crumb.href ? (
                      <Link href={crumb.href} className="hover:text-blue-300 transition-colors">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-slate-400">{crumb.label}</span>
                    )}
                    {idx < breadcrumbs.length - 1 && <span className="text-slate-500">/</span>}
                  </div>
                ))}
              </nav>
            )}

            {/* Category Badge */}
            {categoryLabel && (
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-blue-300 tracking-widest uppercase drop-shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                {categoryLabel}
              </span>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-white tracking-tight leading-[1.08] drop-shadow-lg">
              {title}{' '}
              {titleHighlight && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                  {titleHighlight}
                </span>
              )}
            </h1>
            
            <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-bold max-w-xl drop-shadow-md">
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
