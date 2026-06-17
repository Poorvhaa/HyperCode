'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { Shield, Globe2, Award, Building2 } from 'lucide-react';

interface CounterProps {
  value: number;
  duration?: number;
  suffix?: string;
}

function AnimatedCounter({ value, duration = 1.0, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalSteps = 25;
      const stepTime = (duration * 1000) / totalSteps;
      const increment = end / totalSteps;
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function TrustSection() {
  const stats = [
    { value: 250, suffix: '+', label: 'Enterprise Projects Delivered' },
    { value: 98, suffix: '%', label: 'Client Satisfaction Rate' },
    { value: 1200, suffix: '+', label: 'Top-Tier Consultants Placed' },
    { value: 15, suffix: '+', label: 'Years of Enterprise Expertise' },
  ];

  const pillars = [
    {
      icon: Globe2,
      title: 'Nationwide Delivery',
      description: 'Supporting organizations across all 50 states with a highly mobilized consultant workforce.',
    },
    {
      icon: Shield,
      title: 'Government Sector Experience',
      description: 'Approved vendor delivering secure, compliant data and staffing solutions for public agencies.',
    },
    {
      icon: Building2,
      title: 'Enterprise Solutions',
      description: 'Architecting scalable cloud data lakes, BI platforms, and high-performance engineering systems.',
    },
    {
      icon: Award,
      title: 'Certified Consultants',
      description: 'Accredited experts across Microsoft, Snowflake, AWS, Databricks, and modern BI tools.',
    },
  ];

  return (
    <section className="relative py-24 bg-slate-50 border-t border-b border-slate-100 overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4C81]">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-[15px] font-bold text-slate-900 leading-snug">{pillar.title}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">{pillar.description}</p>
              </div>
            );
          })}
        </div>

        {/* Metric Counter Section */}
        <div className="border-t border-slate-200 pt-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-4xl sm:text-5xl font-bold text-[#0F4C81] tracking-tight mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[10px] sm:text-xs font-bold tracking-wider text-slate-500 uppercase max-w-[180px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
