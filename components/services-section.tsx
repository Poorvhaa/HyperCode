'use client';

import { BarChart3, Database, Users, ArrowRight, Code, Cpu, Award } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function ServicesSection() {
  const t = useTranslations('Services');
  const tNav = useTranslations('Navigation');
  const tc = useTranslations('Common');
  const locale = useLocale();

  const pillars = [
    {
      title: tNav('dataAnalytics'),
      icon: BarChart3,
      desc: t('items.bi.desc'),
      bullets: [tNav('businessIntelligence'), tNav('predictiveAnalytics'), 'Executive Reporting', 'Self-Service BI Setups'],
      href: '/solutions/data-analytics-services',
      image: '/images/case-study-dashboard.png',
      statValue: '99.2%',
      statLabel: locale === 'es' ? 'Precisión de Pronóstico' : 'Forecast Accuracy Rate',
    },
    {
      title: tNav('dataEngineering'),
      icon: Database,
      desc: t('items.de.desc'),
      bullets: [tNav('dataWarehousing'), 'ETL/ELT Pipelines', 'Cloud Data Lakehouses', 'dbt & Airflow Automation'],
      href: '/solutions/data-engineering-solutions',
      image: '/images/cloud-infrastructure.png',
      statValue: '99.99%',
      statLabel: locale === 'es' ? 'Tiempo de Actividad' : 'Data Pipeline Uptime',
    },
    {
      title: tNav('webDev') || tNav('webDevelopment'),
      icon: Code,
      desc: t('items.web.desc'),
      bullets: [tNav('customApplications'), 'Next.js & React Architectures', tNav('apiIntegrations'), 'Serverless & Cloud Native'],
      href: '/solutions/web-development-services',
      image: '/images/ai-automation.png',
      statValue: '< 1.2s',
      statLabel: locale === 'es' ? 'Carga de Página' : 'Largest Contentful Paint',
    },
    {
      title: tNav('talentSolutions') || tNav('staffingSolutions'),
      icon: Users,
      desc: t('items.staffing.desc'),
      bullets: [tNav('itStaffing'), tNav('staffAugmentation'), tNav('directPlacement'), 'Executive Talent Sourcing'],
      href: '/staffing',
      image: '/images/staffing-team.png',
      statValue: '48 Hrs',
      statLabel: locale === 'es' ? 'SLA de Perfiles' : 'Resume Submission SLA',
    },
  ];

  return (
    <section id="services" className="relative py-32 bg-slate-50/50 dark:bg-[#07090e] border-b border-slate-100 dark:border-slate-900 text-left overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-blue-100/30 dark:bg-blue-950/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-slate-100/50 dark:bg-indigo-950/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="max-w-3xl mb-24 space-y-4">
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

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                className="group flex flex-col justify-between rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-[#0b0f19] shadow-sm hover:shadow-xl hover:border-[#0F4C81] dark:hover:border-blue-500/80 transition-all duration-400 overflow-hidden"
                whileHover={{ y: -6 }}
              >
                {/* Header Image & Badge */}
                <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />
                  
                  {/* Floating Icon */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/90 dark:bg-slate-950/90 backdrop-blur-md text-[#0F4C81] dark:text-blue-400 flex items-center justify-center shadow-md">
                    <Icon size={18} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-150 tracking-tight group-hover:text-[#0F4C81] dark:group-hover:text-blue-400 transition-colors">
                      {pillar.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                      {pillar.desc}
                    </p>

                    {/* Bullet Benefits */}
                    <ul className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-900">
                      {pillar.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-center space-x-2 text-[10px] sm:text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0F4C81]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Statistic */}
                  <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl flex items-center justify-between border border-slate-100/50 dark:border-slate-850">
                    <div className="text-lg font-black text-slate-900 dark:text-white">{pillar.statValue}</div>
                    <div className="text-[9px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right max-w-[110px]">
                      {pillar.statLabel}
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="pt-2">
                    <Link
                      href={pillar.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] dark:text-blue-400 hover:gap-2.5 transition-all"
                    >
                      <span>{tc('readMore') === 'Read Article' ? 'Explore Solutions' : (tc('readMore') === 'Leer Artículo' ? 'Explorar Soluciones' : 'Explore')}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
