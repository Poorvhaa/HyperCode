'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock, Search } from 'lucide-react';
import { Link, useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { Article } from '@/lib/insights';
import { useTranslations } from 'next-intl';

interface InsightsListProps {
  initialArticles: Article[];
  translatedCategories: string[];
}

export function InsightsList({ initialArticles, translatedCategories }: InsightsListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const t = useTranslations('Insights');
  const [selectedCategory, setSelectedCategory] = useState(translatedCategories[0]);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync state with URL category parameter
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      // Find case-insensitive match
      const matched = translatedCategories.find(
        (cat) => cat.toLowerCase() === categoryParam.toLowerCase() ||
                 cat.toLowerCase().replace(/\s+/g, '-') === categoryParam.toLowerCase()
      );
      if (matched) {
        setSelectedCategory(matched);
      }
    } else {
      setSelectedCategory(translatedCategories[0]); // e.g. "All" or "Todos"
    }
  }, [searchParams, translatedCategories]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category === translatedCategories[0]) {
      router.push('/insights', { scroll: false });
    } else {
      // Make it URL safe by slugifying, but also keeping the raw english categories fallback if needed
      const slugified = category.toLowerCase().replace(/\s+/g, '-');
      router.push(`/insights?category=${slugified}`, { scroll: false });
    }
  };

  const latestSlug = initialArticles.reduce<Article | undefined>((latest, art) => {
    if (!art.publishedIso) return latest;
    return !latest?.publishedIso || art.publishedIso > latest.publishedIso ? art : latest;
  }, undefined)?.slug;

  // Filter by category first
  let filteredArticles = selectedCategory === translatedCategories[0]
    ? initialArticles
    : initialArticles.filter((art) => art.category === selectedCategory);

  // Then filter by search query keywords
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    filteredArticles = filteredArticles.filter((art) => 
      art.title.toLowerCase().includes(q) || 
      art.excerpt.toLowerCase().includes(q)
    );
  }

  return (
    <div>
      <div className="max-w-xl">
        <label htmlFor="insights-search" className="sr-only">{t('searchLabel')}</label>
        <div className="flex h-12 items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 shadow-sm transition-colors focus-within:border-royal-blue focus-within:ring-2 focus-within:ring-royal-blue/20">
          <Search size={18} className="flex-shrink-0 text-slate-400" aria-hidden="true" />
          <input
            id="insights-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full border-none bg-transparent text-[0.9375rem] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
        </div>
      </div>

      <div role="group" aria-label={t('filterLabel')} className="mt-5 flex flex-wrap gap-2">
        {translatedCategories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => handleCategorySelect(category)}
              className={`min-h-[40px] rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue focus-visible:ring-offset-2 ${
                isActive
                  ? 'border-royal-blue bg-royal-blue text-white shadow-sm'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-royal-blue/40 hover:text-royal-blue'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {filteredArticles.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-500 italic">
            {t('noArticles')}
          </div>
        ) : (
          filteredArticles.map((article) => (
            <article
              key={article.slug}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-[box-shadow,transform,border-color] duration-300 hover:border-slate-300 hover:shadow-lg motion-safe:hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-royal-blue focus-within:ring-offset-2"
            >
              {article.image && (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={article.image}
                    alt={article.imageAlt || article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
                    className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold">
                  <span className="rounded-full bg-royal-blue/10 px-2.5 py-1 uppercase tracking-wider text-royal-blue">
                    {article.category}
                  </span>
                  {article.slug === latestSlug && (
                    <span className="rounded-full bg-[#48B900]/15 px-2.5 py-1 uppercase tracking-wider text-[#2f7a00]">
                      {t('latest')}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-slate-500">
                    <Clock size={13} aria-hidden="true" />
                    {article.readTime}
                  </span>
                </div>

                <h2 className="mt-3 text-lg sm:text-xl font-bold leading-snug text-[#0A1F6B] transition-colors group-hover:text-royal-blue">
                  <Link
                    href={`/insights/${article.slug}`}
                    className="focus:outline-none after:absolute after:inset-0 after:content-['']"
                  >
                    {article.title}
                  </Link>
                </h2>

                <p className="mt-2 mb-5 line-clamp-3 text-[0.9375rem] leading-relaxed font-medium text-slate-600">
                  {article.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4 text-[0.8125rem] font-semibold">
                  <span className="inline-flex items-center gap-1.5 text-slate-500">
                    <Calendar size={13} aria-hidden="true" />
                    {article.date}
                  </span>
                  <span className="inline-flex items-center gap-1 text-royal-blue" aria-hidden="true">
                    {t('readArticle')}
                    <ArrowRight size={14} className="transition-transform motion-safe:group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
