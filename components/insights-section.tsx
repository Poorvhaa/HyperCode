'use client';

import { BookOpen, Clock, CalendarDays, ArrowRight } from 'lucide-react';

interface Article {
  category: string;
  title: string;
  desc?: string;
  date: string;
  readTime: string;
  href: string;
}

export function InsightsSection() {
  const featuredArticle: Article = {
    category: 'AI & CLOUD ARCHITECTURE',
    title: 'The Guide to Microsoft Fabric and Snowflake Coexistence',
    desc: 'How enterprise CIOs are structuring modern Lakehouses to balance interactive Power BI dashboards with real-time Databricks machine learning workloads without doubling storage costs.',
    date: 'June 14, 2026',
    readTime: '8 min read',
    href: '/insights/microsoft-fabric-and-snowflake-coexistence',
  };

  const supportingArticles: Article[] = [
    {
      category: 'BUSINESS INTELLIGENCE',
      title: 'Designing Executive Power BI Dashboards: Beyond the Metrics',
      date: 'June 8, 2026',
      readTime: '5 min read',
      href: '/insights/designing-executive-power-bi-dashboards',
    },
    {
      category: 'DATA ENGINEERING',
      title: 'Optimizing dbt Incremental Models on Enterprise Snowflake Warehouses',
      date: 'June 3, 2026',
      readTime: '6 min read',
      href: '/insights/optimizing-dbt-incremental-models-snowflake',
    },
    {
      category: 'IT & NON-IT STAFFING & LEADERSHIP',
      title: 'Vetting Senior Data Engineers: The Technical Rubric Apex Teams Use',
      date: 'May 28, 2026',
      readTime: '7 min read',
      href: '/insights/vetting-senior-data-engineers-rubric',
    },
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-100 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">KNOWLEDGE & INSIGHTS</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
              Thought Leadership
            </h3>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-medium">
              Explore key perspectives, design patterns, and staffing strategies curated by HyperCode consultants.
            </p>
          </div>
          <div>
            <a
              href="/insights"
              className="inline-flex items-center justify-center h-10 px-5 bg-[#0F4C81] text-white rounded-xl font-bold text-xs hover:bg-[#0c3c66] transition-colors duration-200"
            >
              <span>Explore All Insights</span>
            </a>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Featured Article Card */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-slate-50 p-8 sm:p-10 flex flex-col justify-between group">
            <div className="space-y-4">
              <span className="text-[10px] font-extrabold text-[#0F4C81] uppercase tracking-widest block">
                {featuredArticle.category}
              </span>
              <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight group-hover:text-[#0F4C81] transition-colors">
                <a href={featuredArticle.href}>{featuredArticle.title}</a>
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed font-medium line-clamp-4">
                {featuredArticle.desc}
              </p>
            </div>

            <div className="pt-6 mt-8 border-t border-slate-200 flex items-center justify-between flex-wrap gap-4 text-slate-500 text-xs font-semibold uppercase tracking-wider">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1.5">
                  <CalendarDays size={14} className="text-slate-400" />
                  <span>{featuredArticle.date}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock size={14} className="text-slate-400" />
                  <span>{featuredArticle.readTime}</span>
                </div>
              </div>
              <a
                href={featuredArticle.href}
                className="inline-flex items-center text-[#0F4C81] group-hover:text-[#0c3c66]"
              >
                <span>Read Brief</span>
                <ArrowRight size={14} className="ml-1" />
              </a>
            </div>
          </div>

          {/* Supporting Articles Grid */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {supportingArticles.map((art, idx) => (
              <div
                key={idx}
                className="group relative p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-350 flex flex-col justify-between h-40 shadow-sm"
              >
                <div>
                  <span className="text-[9px] font-extrabold text-[#0F4C81] uppercase tracking-widest block mb-2">
                    {art.category}
                  </span>
                  <h4 className="text-[15px] font-bold text-slate-900 tracking-tight leading-snug group-hover:text-[#0F4C81] transition-colors line-clamp-2">
                    <a href={art.href}>{art.title}</a>
                  </h4>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-4 border-t border-slate-100 pt-3">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <CalendarDays size={12} className="text-slate-400" />
                      <span>{art.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock size={12} className="text-slate-400" />
                      <span>{art.readTime}</span>
                    </span>
                  </div>
                  <a href={art.href} className="text-[#0F4C81] group-hover:text-[#0c3c66]">
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
