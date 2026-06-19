'use client';

import { BarChart3, Database, Users, ArrowRight, Code } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export function ServicesSection() {
  const t = useTranslations('Services');
  const tNav = useTranslations('Navigation');
  const tc = useTranslations('Common');

  const pillars = [
    {
      title: tNav('dataAnalytics'),
      icon: BarChart3,
      desc: t('items.bi.desc'),
      bullets: [tNav('businessIntelligence'), tNav('predictiveAnalytics'), 'Reporting', 'Visualization'],
      href: '/solutions',
    },
    {
      title: tNav('dataEngineering'),
      icon: Database,
      desc: t('items.de.desc'),
      bullets: [tNav('dataWarehousing'), 'ETL Pipelines', 'Big Data', 'Cloud Data Platforms'],
      href: '/solutions',
    },
    {
      title: tNav('webDevelopment'),
      icon: Code,
      desc: t('items.web.desc'),
      bullets: [tNav('customApplications'), 'Next.js & React', tNav('apiIntegrations'), tNav('cloudApplications')],
      href: '/solutions/web-development-services',
    },
    {
      title: tNav('staffingSolutions'),
      icon: Users,
      desc: t('items.staffing.desc'),
      bullets: [tNav('itStaffing'), tNav('staffAugmentation'), tNav('directPlacement')],
      href: '/staffing',
    },
  ];

  return (
    <section id="services" className="py-32 bg-white border-b border-slate-100 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="max-w-3xl mb-20 space-y-4">
          <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase">
            {t('badge')}
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t('title')}
          </h3>
          <p className="text-base sm:text-lg text-[#5a718c] leading-relaxed font-medium">
            {t('subtitle')}
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl border border-slate-200 bg-white hover:border-slate-300 transition-all duration-300 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-[#0F4C81] flex items-center justify-center">
                    <Icon size={20} />
                  </div>

                  {/* Header & Description */}
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-slate-900 tracking-tight">{pillar.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2 pt-2 border-t border-slate-100">
                    {pillar.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-center space-x-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0F4C81]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learn More Link */}
                <div className="pt-8 mt-6">
                  <Link
                    href={pillar.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] hover:text-[#0c3c66] transition-colors"
                  >
                    <span>{tc('readMore') === 'Read Article' ? 'Learn More Solutions' : (tc('readMore') === 'Leer Artículo' ? 'Conocer Más Soluciones' : 'Learn More')}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
