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
    <section className="relative w-full h-[480px] sm:h-[520px] lg:h-[560px] flex items-center overflow-hidden bg-[#F8FAFC] border-b border-slate-200 bg-dot-pattern text-left">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 pt-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          
          {/* Content Block */}
          <div className="max-w-3xl space-y-5">
            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav className="flex items-center gap-1.5 text-[10px] font-extrabold text-slate-500 tracking-widest uppercase mb-2">
                {breadcrumbs.map((crumb, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    {crumb.href ? (
                      <Link href={crumb.href} className="hover:text-[#0F4C81] transition-colors">
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
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#0F4C81] tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C81]" />
                {categoryLabel}
              </span>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-slate-900 tracking-tight leading-[1.1]">
              {title}{' '}
              {titleHighlight && (
                <span className="text-[#0F4C81]">
                  {titleHighlight}
                </span>
              )}
            </h1>
            
            <p className="text-[16px] md:text-[17px] lg:text-[18px] text-slate-600 leading-[1.7] max-w-xl font-medium">
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
