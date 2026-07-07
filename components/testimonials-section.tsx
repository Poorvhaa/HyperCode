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
    <section className="section-padding bg-[#F1F5F9] border-b border-slate-200 text-left overflow-hidden bg-dot-pattern">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C81]" />
            TESTIMONIALS
          </span>
          <h3 className="text-[28px] sm:text-[32px] lg:text-[40px] font-black text-slate-900 tracking-tight leading-[1.2]">
            Trusted by Enterprise Leaders
          </h3>
        </div>

        {/* Outer Split Layout - Testimonial & Video Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Testimonials Slider (7 columns) */}
          <div className="lg:col-span-7 relative premium-card shadow-xl border border-slate-200 p-8 sm:p-12 rounded-[24px] bg-white">
            {/* Quote Icon Overlay */}
            <div className="absolute top-6 left-6 text-slate-100/80 pointer-events-none">
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
                    className="text-[18px] sm:text-[20px] lg:text-[22px] text-slate-850 font-bold leading-relaxed italic"
                  >
                    "{testimonials[activeIndex].content}"
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Profile Card & Indicator Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonials[activeIndex].avatar}
                      alt={testimonials[activeIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <cite className="not-italic text-sm font-extrabold text-slate-900 block">
                      {testimonials[activeIndex].name}
                    </cite>
                    <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">
                      {testimonials[activeIndex].role} — <span className="text-[#0F4C81]">{testimonials[activeIndex].company}</span>
                    </span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <button
                      onClick={handlePrev}
                      className="p-2 rounded-xl bg-white border border-slate-200 text-slate-655 hover:text-slate-900 transition-colors cursor-pointer"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-2 rounded-xl bg-white border border-slate-200 text-slate-655 hover:text-slate-900 transition-colors cursor-pointer"
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
                          activeIndex === idx ? 'bg-[#0F4C81] w-3' : 'bg-slate-350'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Video Testimonial Placeholder (5 columns) */}
          <div className="lg:col-span-5 relative w-full h-[360px] rounded-[24px] bg-white border border-slate-200 overflow-hidden shadow-xl group flex items-center justify-center">
            
            {/* Background Thumbnail Image */}
            <div className="absolute inset-0 opacity-80 group-hover:scale-105 transition-transform duration-500">
              <Image
                src="/images/contact-office.png"
                alt="Executive Interview video thumbnail"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-slate-900/10 to-transparent" />

            {/* Glowing Play Button */}
            <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
              <motion.button
                className="w-16 h-16 rounded-full bg-white text-[#0F4C81] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-300 border-none cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={24} className="ml-1 text-[#0F4C81]" fill="currentColor" />
              </motion.button>
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-white uppercase tracking-widest block drop-shadow-md">Executive Interview</span>
                <h4 className="text-sm font-bold text-white tracking-tight drop-shadow-md">Watch Jennifer Thompson discuss ROI outcomes</h4>
              </div>
            </div>

            {/* Absolute badge */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border border-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-[10px] font-bold text-slate-650 shadow-sm">
              <Award size={12} className="text-[#0F4C81]" />
              <span>Verified Case Discussion</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
