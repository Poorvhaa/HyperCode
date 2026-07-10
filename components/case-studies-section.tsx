'use client';

import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { getCaseStudies } from '@/lib/case-studies-data';
import { CaseStudies } from './case-studies';
import { motion } from 'framer-motion';

export function CaseStudiesSection() {
  const t = useTranslations('CaseStudies');
  const locale = useLocale();
  const studies = getCaseStudies(locale);

  return (
    <section className="section-padding bg-[#F8FAFC] border-b border-slate-200 text-left overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="max-w-3xl space-y-4 mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C81]" />
            {t('badge')}
          </span>
          <h2 className="text-[28px] sm:text-[32px] lg:text-[40px] font-black text-slate-900 tracking-tight leading-[1.2]">
            {t('title')}
          </h2>
          <p className="text-[16px] md:text-[17px] lg:text-[18px] text-slate-600 leading-[1.7] font-semibold">
            {t('subtitle')}
          </p>
        </div>

        {/* 3 Featured Case Studies Grid */}
        <div className="relative">
          <CaseStudies studies={studies} limit={3} />
        </div>

        {/* View Case Studies CTA Button */}
        <div className="text-center mt-16">
          <Link
            href="/case-studies"
            className="px-8 py-4 rounded-xl border border-slate-200 bg-white inline-flex items-center justify-center font-bold text-xs uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:border-[#0F4C81]/30 hover:text-[#0F4C81] transition-all cursor-pointer shadow-sm hover:shadow-md"
          >
            <span>{t('viewAll')}</span>
            <ArrowRight size={15} className="ml-2" />
          </Link>
        </div>

      </div>
    </section>
  );
}
