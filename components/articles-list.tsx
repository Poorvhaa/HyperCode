'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  ARTICLE_LABELS,
  type ArticleCategory,
  type LocalizedArticle,
} from '@/lib/articles-catalog';

interface ArticlesListProps {
  articles: LocalizedArticle[];
  categories: readonly ArticleCategory[];
}

export function ArticlesList({ articles, categories }: ArticlesListProps) {
  const locale = useLocale() === 'es' ? 'es' : 'en';
  const labels = ARTICLE_LABELS[locale];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredArticles =
    selectedCategory === 'all'
      ? articles
      : articles.filter((article) => article.category.slug === selectedCategory);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap justify-center gap-2" aria-label={labels.categories}>
        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={`rounded-xl border px-4 py-2 text-xs font-semibold transition-all ${
            selectedCategory === 'all'
              ? 'border-royal-blue bg-royal-blue text-white shadow-sm'
              : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-900'
          }`}
        >
          {labels.allCategories}
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            type="button"
            onClick={() => setSelectedCategory(category.slug)}
            className={`rounded-xl border px-4 py-2 text-xs font-semibold transition-all ${
              selectedCategory === category.slug
                ? 'border-royal-blue bg-royal-blue text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-900'
            }`}
          >
            {category.label[locale]}
          </button>
        ))}
      </div>

      {filteredArticles.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-20 text-center">
          <BookOpen className="mx-auto mb-4 text-royal-blue/70" size={28} aria-hidden="true" />
          <h2 className="text-card-title text-slate-900">{labels.comingSoonTitle}</h2>
          <p className="mx-auto mt-2 max-w-xl text-body text-slate-600">{labels.comingSoonDescription}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <article
              key={article.slug}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <Image
                src={article.image}
                alt=""
                width={640}
                height={360}
                className="mb-6 aspect-[16/9] w-full rounded-2xl object-cover"
              />
              <div>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-caption font-semibold uppercase tracking-wider text-slate-500">
                    {article.category.label[locale]}
                  </span>
                  <span className="flex items-center gap-1 text-caption font-semibold text-slate-400">
                    <BookOpen size={11} aria-hidden="true" />
                    {labels.readingTime(article.readingTimeMinutes)}
                  </span>
                </div>
                <h2 className="text-card-title mb-3 text-slate-900 transition-colors group-hover:text-royal-blue">
                  <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                </h2>
                <p className="text-body font-medium text-slate-600">{article.excerpt}</p>
              </div>
              <Link
                href={`/articles/${article.slug}`}
                className="mt-6 inline-flex items-center gap-1.5 text-button text-royal-blue transition-colors hover:text-[#0c3c66]"
              >
                {labels.readArticle}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
