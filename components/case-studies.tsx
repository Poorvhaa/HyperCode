'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { CaseStudyItem } from '@/lib/case-studies-data';
import { ArrowRight, Calendar, Cpu, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface CaseStudiesProps {
  studies: CaseStudyItem[];
  limit?: number;
  featuredOnly?: boolean;
}

export function CaseStudies({ studies, limit, featuredOnly }: CaseStudiesProps) {
  const t = useTranslations('CaseStudies');
  
  let displayed = [...studies];
  if (featuredOnly) {
    // Fictional: first 3 are featured
    displayed = displayed.slice(0, 3);
  }
  if (limit) {
    displayed = displayed.slice(0, limit);
  }

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  } as const;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {displayed.map((study) => (
        <motion.div
          key={study.slug}
          variants={cardVariants}
          className="group flex flex-col h-full bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden text-left"
        >
          {/* Featured Image */}
          <div className="relative w-full h-56 bg-slate-50 overflow-hidden">
            <Image
              src={study.featuredImage}
              alt={study.title}
              fill
              sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Industry Badge */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl border border-slate-100 shadow-sm">
              <span className="text-[10px] font-black text-[#0F4C81] uppercase tracking-wider">
                {study.industry}
              </span>
            </div>
            {/* Project Duration Badge */}
            <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-xl text-white shadow-sm flex items-center gap-1.5">
              <Calendar size={11} className="text-blue-300" />
              <span className="text-[10px] font-black tracking-wider uppercase">
                {study.duration}
              </span>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex flex-col flex-1 p-6 sm:p-7 space-y-5">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-450 tracking-widest uppercase block">
                {study.clientType}
              </span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug group-hover:text-[#0F4C81] transition-colors duration-200">
                {study.title}
              </h3>
            </div>

            {/* Quick Summary / Challenge */}
            <p className="text-sm font-semibold text-slate-550 line-clamp-3 leading-relaxed">
              {study.challenge}
            </p>

            {/* Outcome Highlight Box */}
            <div className="bg-[#F8FAFC] border border-slate-100/80 rounded-2xl p-4 space-y-3">
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block">
                {t('impact')}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {study.metrics.slice(0, 2).map((m, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="text-lg font-black text-slate-900 leading-tight">
                      {m.value}
                    </div>
                    <div className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wide leading-tight line-clamp-2">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5">
              {study.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-lg bg-slate-50 text-[#0F4C81] text-[9px] font-extrabold uppercase tracking-wide border border-slate-200/40"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
              <Link
                href={`/case-studies/${study.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-black text-[#0F4C81] hover:text-[#0c3e69] transition-colors duration-200 group/link uppercase tracking-wider"
              >
                <span>{t('readStory')}</span>
                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
