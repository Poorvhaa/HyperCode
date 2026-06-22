'use client';

import { useState, useEffect } from 'react';
import { ShieldAlert, Cpu, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { db, CaseStudy } from '@/lib/db';

export function CaseStudiesSection() {
  const t = useTranslations('CaseStudies');
  const tc = useTranslations('Common');
  const locale = useLocale();

  const [dbCaseStudies, setDbCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const list = await db.getAllCaseStudies();
        const published = list.filter(c => c.is_published && c.language === locale);
        setDbCaseStudies(published);
      } catch (err) {
        console.error('Failed to fetch case studies:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudies();
  }, [locale]);

  // Default featured static case study
  const staticFeatured = {
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
          <p className="text-base sm:text-lg text-slate-655 leading-relaxed font-medium">
            {t('subtitle')}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-12 text-slate-400">
            <Loader2 className="animate-spin mr-2" size={20} />
            <span className="text-xs font-semibold">Loading success stories...</span>
          </div>
        ) : dbCaseStudies.length > 0 ? (
          <div className="space-y-12">
            {dbCaseStudies.map((study) => (
              <div key={study.id} className="p-8 sm:p-10 rounded-3xl border border-slate-200 bg-slate-50 shadow-sm space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#0F4C81] uppercase tracking-widest block">
                      {study.industry}
                    </span>
                    <h4 className="text-2xl font-bold text-slate-900 tracking-tight">
                      {study.title}
                    </h4>
                  </div>
                  <span className="px-3 py-1 bg-white border border-slate-200 text-slate-500 text-xs font-bold rounded-lg uppercase tracking-wider">
                    {locale === 'es' ? 'Caso de Éxito' : 'Success Story'}
                  </span>
                </div>

                <div className="space-y-8 relative">
                  {/* Challenge */}
                  <div className="flex gap-4 items-start relative">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#0F4C81] flex items-center justify-center flex-shrink-0 shadow-sm">
                      <ShieldAlert size={18} />
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{t('challenge')}</h5>
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                        {study.challenge}
                      </p>
                    </div>
                  </div>

                  <div className="pl-5 -my-4 text-slate-350 select-none">
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
                        {study.solution}
                      </p>
                    </div>
                  </div>

                  <div className="pl-5 -my-4 text-slate-350 select-none">
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
                        {study.results}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Static Fallback */
          <div className="p-8 sm:p-10 rounded-3xl border border-slate-200 bg-slate-50 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#0F4C81] uppercase tracking-widest block">
                  {staticFeatured.category}
                </span>
                <h4 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {staticFeatured.title}
                </h4>
              </div>
              <span className="px-3 py-1 bg-white border border-slate-200 text-slate-500 text-xs font-bold rounded-lg uppercase tracking-wider">
                {staticFeatured.subtitle}
              </span>
            </div>

            <div className="space-y-8 relative">
              {/* Challenge */}
              <div className="flex gap-4 items-start relative">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#0F4C81] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <ShieldAlert size={18} />
                </div>
                <div className="space-y-1">
                  <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{t('challenge')}</h5>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                    {staticFeatured.challenge}
                  </p>
                </div>
              </div>

              <div className="pl-5 -my-4 text-slate-350 select-none">
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
                    {staticFeatured.solution}
                  </p>
                </div>
              </div>

              <div className="pl-5 -my-4 text-slate-350 select-none">
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
                    {staticFeatured.outcome}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

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
