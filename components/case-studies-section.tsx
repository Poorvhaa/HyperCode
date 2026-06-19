'use client';

import { ShieldAlert, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export function CaseStudiesSection() {
  const t = useTranslations('CaseStudies');
  const tc = useTranslations('Common');

  const featured = {
    category: t('story.category'),
    title: t('story.title'),
    subtitle: t('story.subtitle'),
    challenge: t('story.challengeText'),
    solution: t('story.solutionText'),
    outcome: t('story.outcomeText'),
  };

  return (
    <section className="py-32 bg-white border-b border-slate-100 text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="max-w-3xl mb-20 space-y-4">
          <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase">
            {t('badge')}
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t('title')}
          </h3>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            {t('subtitle')}
          </p>
        </div>

        {/* Featured Case Study Card */}
        <div className="p-8 sm:p-10 rounded-3xl border border-slate-200 bg-slate-50 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#0F4C81] uppercase tracking-widest block">
                {featured.category}
              </span>
              <h4 className="text-2xl font-bold text-slate-900 tracking-tight">
                {featured.title}
              </h4>
            </div>
            <span className="px-3 py-1 bg-white border border-slate-200 text-slate-500 text-xs font-bold rounded-lg uppercase tracking-wider">
              {featured.subtitle}
            </span>
          </div>

          {/* Flow Layout: Challenge -> Solution -> Outcome */}
          <div className="space-y-8 relative">
            
            {/* Challenge */}
            <div className="flex gap-4 items-start relative">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#0F4C81] flex items-center justify-center flex-shrink-0 shadow-sm">
                <ShieldAlert size={18} />
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{t('challenge')}</h5>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                  {featured.challenge}
                </p>
              </div>
            </div>

            {/* Down Arrow 1 */}
            <div className="pl-5 -my-4 text-slate-300 select-none">
              <span className="text-xl">↓</span>
            </div>

            {/* Solution */}
            <div className="flex gap-4 items-start relative">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#0F4C81] flex items-center justify-center flex-shrink-0 shadow-sm">
                <Cpu size={18} />
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{t('solution')}</h5>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                  {featured.solution}
                </p>
              </div>
            </div>

            {/* Down Arrow 2 */}
            <div className="pl-5 -my-4 text-slate-300 select-none">
              <span className="text-xl">↓</span>
            </div>

            {/* Outcome */}
            <div className="flex gap-4 items-start relative">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#0F4C81] flex items-center justify-center flex-shrink-0 shadow-sm">
                <CheckCircle2 size={18} />
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{t('outcome')}</h5>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                  {featured.outcome}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* View Case Studies CTA Button */}
        <div className="text-center mt-12">
          <Link
            href="/insights"
            className="inline-flex items-center justify-center h-12 px-7 bg-[#0F4C81] text-white font-semibold text-[14px] rounded-xl hover:bg-[#0c3c66] transition-colors duration-200 shadow-sm gap-2 cursor-pointer border-none"
          >
            <span>{tc('viewCaseStudies')}</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}
