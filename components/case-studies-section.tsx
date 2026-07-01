'use client';

import { useState, useEffect } from 'react';
import { ShieldAlert, Cpu, CheckCircle2, ArrowRight, Loader2, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { db, CaseStudy } from '@/lib/db';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export function CaseStudiesSection() {
  const t = useTranslations('CaseStudies');
  const tc = useTranslations('Common');
  const locale = useLocale();

  const [dbCaseStudies, setDbCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const list = await db.getAllCaseStudies();
        const published = (list || []).filter(c => c && c.is_published && c.language === locale);
        setDbCaseStudies(published);
      } catch (err) {
        console.warn('[Warning] Failed to fetch case studies, falling back to static studies:', err);
        setDbCaseStudies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStudies();
  }, [locale]);

  // Default featured static case studies if database is empty
  const staticStudies = [
    {
      category: t('story.category') || 'Enterprise Solutions',
      title: t('story.title') || 'Accelerating Global Cloud Infrastructure',
      subtitle: t('story.subtitle') || 'Cloud Architecture & Data Engineering',
      challenge: t('story.challengeText') || 'The client suffered from 12-hour batch sync delays and rising data warehousing overhead.',
      solution: t('story.solutionText') || 'Orchestrated dbt & Snowflake lakehouse pipeline and automated schema migration.',
      outcome: t('story.outcomeText') || 'Reduced data loading time to 15 minutes and lowered cloud server spend by 45%.',
      image: '/images/case-study-dashboard.png',
      logo: 'NEXCODE',
      metrics: [
        { val: '-45%', label: locale === 'es' ? 'Gasto en Nube' : 'Cloud Spend' },
        { val: '15 Min', label: locale === 'es' ? 'Latencia de Datos' : 'Data Latency' },
        { val: '+300%', label: locale === 'es' ? 'Rendimiento' : 'Pipeline Speed' }
      ]
    },
    {
      category: locale === 'es' ? 'Automatización de IA' : 'AI & Intelligent Automation',
      title: locale === 'es' ? 'Agente de IA para el Servicio de Atención al Cliente' : 'Agentic AI Customer Support System',
      subtitle: locale === 'es' ? 'Integración de Agente y Flujos Conversacionales' : 'LLM Operations & Orchestration',
      challenge: locale === 'es' ? 'Saturación en el volumen de tickets semanales y soporte 24/7 ineficiente.' : 'Weekly support ticket overflows and lack of automated resolution.',
      solution: locale === 'es' ? 'Configuración de un Agente de Voz de IA con tecnología RAG y acceso a API de base de datos.' : 'Deployed custom voice and text RAG agents connected to internal CRM APIs.',
      outcome: locale === 'es' ? 'Resolución del 70% de las dudas de soporte en el primer contacto.' : 'Automated 70% of common support inquiries with instant resolution.',
      image: '/images/ai-automation.png',
      logo: 'LOGISTIX',
      metrics: [
        { val: '70%', label: locale === 'es' ? 'Resolución Auto' : 'Self-Resolution' },
        { val: '24/7', label: locale === 'es' ? 'Disponibilidad' : 'Availability SLA' },
        { val: '-30%', label: locale === 'es' ? 'Costes de Soporte' : 'Support Overhead' }
      ]
    }
  ];

  const activeStudies = dbCaseStudies.length > 0 
    ? dbCaseStudies.map(s => ({
        category: s.industry,
        title: s.title,
        subtitle: locale === 'es' ? 'Caso de Éxito' : 'Success Story',
        challenge: s.challenge,
        solution: s.solution,
        outcome: s.results,
        image: '/images/case-study-dashboard.png',
        logo: s.client || 'CLIENT',
        metrics: [
          { val: 'ROI 2.5x', label: locale === 'es' ? 'Retorno' : 'Est. Project ROI' },
          { val: '100%', label: locale === 'es' ? 'Entrega A tiempo' : 'On-Time Delivery' },
          { val: 'SOC 2', label: locale === 'es' ? 'Seguridad' : 'Compliance Level' }
        ]
      }))
    : staticStudies;

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? activeStudies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === activeStudies.length - 1 ? 0 : prev + 1));
  };

  const currentStudy = activeStudies[currentIndex];

  return (
    <section className="py-32 bg-slate-50/50 dark:bg-[#07090e] border-b border-slate-100 dark:border-slate-900 text-left overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C81]" />
              {t('badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {t('title')}
            </h2>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              {t('subtitle')}
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-350 transition-all cursor-pointer shadow-sm"
              aria-label="Previous story"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-350 transition-all cursor-pointer shadow-sm"
              aria-label="Next story"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-24 text-slate-400">
            <Loader2 className="animate-spin mr-2" size={20} />
            <span className="text-xs font-semibold">Loading success stories...</span>
          </div>
        ) : (
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                {/* Left side info panel (7 columns) */}
                <div className="lg:col-span-7 space-y-8 bg-white dark:bg-[#0b0f19] border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
                  
                  {/* Category logo/badge header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-900 pb-6">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-[#0F4C81] dark:text-blue-400 uppercase tracking-widest block">
                        {currentStudy.category}
                      </span>
                      <h4 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                        {currentStudy.title}
                      </h4>
                    </div>
                    <div className="px-4 py-1.5 bg-[#0F4C81]/5 border border-[#0F4C81]/15 text-[#0F4C81] dark:text-blue-400 text-xs font-black rounded-xl tracking-wider uppercase">
                      {currentStudy.logo}
                    </div>
                  </div>

                  {/* Flow Steps (Challenge, Solution, Outcome) */}
                  <div className="relative space-y-8 pl-1 md:pl-2">
                    
                    {/* Continuous Vertical Timeline Connector */}
                    <div className="absolute left-[28px] top-[28px] bottom-[28px] w-[2px] bg-slate-100 dark:bg-slate-900 z-[1]" />

                    {/* Challenge */}
                    <div className="flex gap-6 items-start relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-center flex-shrink-0 shadow-sm text-rose-500">
                        <ShieldAlert size={22} />
                      </div>
                      <div className="space-y-1.5 pt-1.5 flex-1">
                        <h5 className="text-xs font-extrabold text-rose-500 uppercase tracking-widest">
                          {t('challenge')}
                        </h5>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                          {currentStudy.challenge}
                        </p>
                      </div>
                    </div>

                    {/* Solution */}
                    <div className="flex gap-6 items-start relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-center flex-shrink-0 shadow-sm text-[#0F4C81] dark:text-blue-400">
                        <Cpu size={22} />
                      </div>
                      <div className="space-y-1.5 pt-1.5 flex-1">
                        <h5 className="text-xs font-extrabold text-[#0F4C81] dark:text-blue-400 uppercase tracking-widest">
                          {t('solution')}
                        </h5>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                          {currentStudy.solution}
                        </p>
                      </div>
                    </div>

                    {/* Outcome */}
                    <div className="flex gap-6 items-start relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-center flex-shrink-0 shadow-sm text-emerald-500">
                        <CheckCircle2 size={22} />
                      </div>
                      <div className="space-y-1.5 pt-1.5 flex-1">
                        <h5 className="text-xs font-extrabold text-emerald-500 uppercase tracking-widest">
                          {t('outcome')}
                        </h5>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                          {currentStudy.outcome}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Metric Grid */}
                  <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-100 dark:border-slate-900">
                    {currentStudy.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="space-y-1 bg-slate-50 dark:bg-slate-900/30 p-3 rounded-2xl border border-slate-100/50 dark:border-slate-850">
                        <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">{metric.val}</div>
                        <div className="text-[9px] sm:text-[10px] font-extrabold text-slate-400 dark:text-slate-550 uppercase tracking-widest">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Right side mockup panel (5 columns) */}
                <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[400px] flex items-center justify-center bg-gradient-to-tr from-[#0F4C81]/10 to-transparent dark:from-slate-900 rounded-3xl border border-slate-200/40 dark:border-slate-800/40 overflow-hidden shadow-inner">
                  
                  {/* Laptop Mockup Box */}
                  <div className="relative w-[90%] h-[80%] rounded-2xl overflow-hidden shadow-2xl border border-slate-250/70 dark:border-slate-800 bg-[#0B0F19]">
                    <div className="h-5 bg-slate-900 dark:bg-black px-4 flex items-center gap-1.5 border-b border-slate-850">
                      <div className="w-2 h-2 rounded-full bg-rose-500" />
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <div className="relative w-full h-[calc(100%-20px)]">
                      <Image
                        src={currentStudy.image}
                        alt="Analytics Dashboard"
                        fill
                        className="object-cover object-top opacity-95"
                      />
                    </div>
                  </div>

                  {/* Absolute Badge */}
                  <div className="absolute bottom-6 right-6 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200/50 dark:border-slate-850 shadow-lg text-[10px] font-bold text-slate-800 dark:text-slate-250 flex items-center gap-1.5">
                    <Award size={14} className="text-[#0F4C81] dark:text-blue-400 animate-bounce" />
                    <span>Verified Project Outcomes</span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* View Case Studies CTA Button */}
        <div className="text-center mt-16">
          <Link
            href="/insights"
            className="inline-flex items-center justify-center h-12 px-7 bg-white dark:bg-slate-900 border border-[#0F4C81] dark:border-slate-800 text-[#0F4C81] dark:text-slate-250 font-bold text-xs uppercase tracking-wider rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-850 transition-all shadow-sm gap-2 cursor-pointer"
          >
            <span>{tc('viewCaseStudies')}</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}
