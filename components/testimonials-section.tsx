'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star, Play, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  industry: string;
  content: string;
  avatar: string;
  rating: number;
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      name: 'Sarah Chen',
      role: 'VP of Analytics',
      company: 'Global Financial Services',
      industry: 'Financial Services',
      content: 'HyperCode transformed our entire data pipeline infrastructure. Their custom cloud data warehouse reduced our dashboard load times from weeks to real-time, allowing our executives to execute trade decisions instantly.',
      avatar: '/placeholder-user.jpg',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'Chief Information Officer',
      company: 'Healthcare Systems Inc',
      industry: 'Healthcare Systems',
      content: 'The IT & Non-IT staffing squad deployed by HyperCode was stellar. We needed certified AWS and Snowflake developers with active security checks within 14 days, and they delivered exactly what we needed to meet our compliance deadline.',
      avatar: '/placeholder-user.jpg',
      rating: 5
    },
    {
      name: 'Jennifer Thompson',
      role: 'Director of Operations',
      company: 'Retail & Logistics Corp',
      industry: 'Retail & Supply Chain',
      content: 'HyperCode is not just another IT vendor—they are a trusted strategic partner. Their Agile consultants restructured our logistics sprints, increasing delivery performance and saving us millions in operational overhead.',
      avatar: '/placeholder-user.jpg',
      rating: 5
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-32 bg-slate-50/50 dark:bg-[#07090e] border-b border-slate-100 dark:border-slate-900 text-left overflow-hidden bg-dot-pattern">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C81]" />
            TESTIMONIALS
          </span>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Trusted by Enterprise Leaders
          </h3>
        </div>

        {/* Outer Split Layout - Testimonial & Video Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Testimonials Slider (7 columns) */}
          <div className="lg:col-span-7 relative bg-white dark:bg-[#0b0f19] border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-8 sm:p-12 shadow-xl">
            {/* Quote Icon Overlay */}
            <div className="absolute top-6 left-6 text-slate-100 dark:text-slate-900/60 pointer-events-none">
              <Quote size={80} />
            </div>

            <div className="relative min-h-[320px] flex flex-col justify-between z-10 space-y-8">
              
              {/* Rating */}
              <div className="flex gap-1 text-amber-500">
                {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              {/* Content Animation */}
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={activeIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-base sm:text-lg lg:text-xl text-slate-700 dark:text-slate-300 font-bold leading-relaxed italic"
                  >
                    "{testimonials[activeIndex].content}"
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Profile Card & Indicator Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-6 border-t border-slate-100 dark:border-slate-900">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 dark:border-slate-800 overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonials[activeIndex].avatar}
                      alt={testimonials[activeIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <cite className="not-italic text-sm font-extrabold text-slate-900 dark:text-white block">
                      {testimonials[activeIndex].name}
                    </cite>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-bold block uppercase tracking-wider">
                      {testimonials[activeIndex].role} — <span className="text-[#0F4C81] dark:text-blue-400">{testimonials[activeIndex].company}</span>
                    </span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <button
                      onClick={handlePrev}
                      className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-655 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-655 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Indicator Dots */}
                  <div className="flex gap-1">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-200 cursor-pointer border-none ${
                          activeIndex === idx ? 'bg-[#0F4C81] dark:bg-blue-400 w-3' : 'bg-slate-300 dark:bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Video Testimonial Placeholder (5 columns) */}
          <div className="lg:col-span-5 relative w-full h-[360px] rounded-3xl bg-[#030712] border border-slate-800 overflow-hidden shadow-2xl group flex items-center justify-center">
            
            {/* Background Thumbnail Image */}
            <div className="absolute inset-0 opacity-40 group-hover:scale-105 transition-transform duration-500">
              <Image
                src="/images/contact-office.png"
                alt="Executive Interview video thumbnail"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

            {/* Glowing Play Button */}
            <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
              <motion.button
                className="w-16 h-16 rounded-full bg-white dark:bg-slate-900 text-[#0F4C81] dark:text-blue-400 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-300 border-none cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={24} className="ml-1" fill="currentColor" />
              </motion.button>
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest block">Executive Interview</span>
                <h4 className="text-sm font-bold text-white tracking-tight">Watch Jennifer Thompson discuss ROI outcomes</h4>
              </div>
            </div>

            {/* Absolute badge */}
            <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm border border-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
              <Award size={12} className="text-blue-400" />
              <span>Verified Case Discussion</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
