'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Calendar, BookOpen, User, Search } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { Article } from '@/lib/insights';
import { useTranslations } from 'next-intl';

interface InsightsListProps {
  initialArticles: Article[];
  translatedCategories: string[];
}

export function InsightsList({ initialArticles, translatedCategories }: InsightsListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale as string || 'en';
  
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
      router.push(`/${locale}/insights`, { scroll: false });
    } else {
      // Make it URL safe by slugifying, but also keeping the raw english categories fallback if needed
      const slugified = category.toLowerCase().replace(/\s+/g, '-');
      router.push(`/${locale}/insights?category=${slugified}`, { scroll: false });
    }
  };

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
    <div className="space-y-10">
      {/* Search Bar */}
      <div className="max-w-md mx-auto flex items-center bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl gap-2.5 shadow-sm focus-within:ring-2 focus-within:ring-[#0F4C81]/20 focus-within:border-[#0F4C81] transition-all">
        <Search size={16} className="text-slate-400 flex-shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={locale === 'es' ? 'Buscar artículos o casos de éxito...' : 'Search articles or case studies...'}
          className="bg-transparent border-none text-slate-800 text-xs placeholder:text-slate-400 w-full focus:outline-none font-semibold"
        />
      </div>

      {/* Category Tabs Filter Bar */}
      <div className="border-b border-slate-200 pb-2">
        <div className="flex flex-wrap gap-2 md:justify-center">
          {translatedCategories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategorySelect(category)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all border ${
                  isActive
                    ? 'border-[#0F4C81] bg-[#0F4C81] text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-500 italic">
            {t('noArticles')}
          </div>
        ) : (
          filteredArticles.map((article) => (
            <article
              key={article.slug}
              className="flex flex-col p-6 rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 justify-between group"
            >
              <div>
                {/* Category Badge */}
                <div className="flex justify-between items-center mb-4">
                  <span className="inline-block w-fit px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                    <BookOpen size={10} />
                    {article.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#0F4C81] transition-colors">
                  <Link href={`/${locale}/insights/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-6 line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div>
                {/* Author Information */}
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-4">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200 flex-shrink-0">
                    <User size={12} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-800 leading-none">{article.author.name}</p>
                    <p className="text-[9px] font-semibold text-slate-400 mt-0.5 leading-none">{article.author.role}</p>
                  </div>
                </div>

                {/* Meta Information & CTA */}
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    <span>{article.date}</span>
                  </div>
                  
                  <Link
                    href={`/${locale}/insights/${article.slug}`}
                    className="inline-flex items-center text-[#0F4C81] hover:text-[#0c3c66] gap-1"
                  >
                    <span>{t('readArticle')}</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
