'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  industry: string;
  content: string;
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
    },
    {
      name: 'Michael Rodriguez',
      role: 'Chief Information Officer',
      company: 'Healthcare Systems Inc',
      industry: 'Healthcare Systems',
      content: 'The IT & Non-IT staffing squad deployed by HyperCode was stellar. We needed certified AWS and Snowflake developers with active security checks within 14 days, and they delivered exactly what we needed to meet our compliance deadline.',
    },
    {
      name: 'Jennifer Thompson',
      role: 'Director of Operations',
      company: 'Retail & Logistics Corp',
      industry: 'Retail & Supply Chain',
      content: 'HyperCode is not just another IT vendor—they are a trusted strategic partner. Their Agile consultants restructured our logistics sprints, increasing delivery performance and saving us millions in operational overhead.',
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-white border-b border-slate-100 text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">TESTIMONIALS</h2>
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
            Trusted by Enterprise Leaders
          </h3>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 text-center shadow-sm">
          {/* Quote Icon Overlay */}
          <div className="absolute top-6 left-6 text-slate-200 pointer-events-none">
            <Quote size={60} />
          </div>

          <div className="relative min-h-[200px] flex flex-col justify-between items-center z-10 space-y-6">
            <blockquote className="text-lg sm:text-xl text-slate-800 font-semibold leading-relaxed max-w-2xl italic">
              "{testimonials[activeIndex].content}"
            </blockquote>

            <div className="space-y-1">
              <cite className="not-italic text-sm font-extrabold text-slate-900 block">
                {testimonials[activeIndex].name}
              </cite>
              <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">
                {testimonials[activeIndex].role} — <span className="text-[#0F4C81]">{testimonials[activeIndex].company}</span>
              </span>
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-widest pt-0.5">
                Industry: {testimonials[activeIndex].industry}
              </span>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center w-full pt-4">
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Indicator Dots */}
              <div className="flex gap-1.5">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 cursor-pointer border-none ${
                      activeIndex === idx ? 'bg-[#0F4C81] w-4' : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
