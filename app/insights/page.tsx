'use client';

import { useState, useEffect, Suspense } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ArrowRight, Calendar, BookOpen, User } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { articles } from '@/lib/insights';

const categories = [
  'All',
  'Business Intelligence',
  'Data Analytics',
  'Data Warehousing',
  'Cloud Solutions',
  'IT Staffing',
  'Data Engineering',
  'Web Development',
  'Strategy',
];

function InsightsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Sync state with URL category parameter
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      // Find case-insensitive match
      const matched = categories.find(
        (cat) => cat.toLowerCase() === categoryParam.toLowerCase() ||
                 cat.toLowerCase().replace(/\s+/g, '-') === categoryParam.toLowerCase()
      );
      if (matched) {
        setSelectedCategory(matched);
      }
    } else {
      setSelectedCategory('All');
    }
  }, [searchParams]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      router.push('/insights', { scroll: false });
    } else {
      const slugified = category.toLowerCase().replace(/\s+/g, '-');
      router.push(`/insights?category=${slugified}`, { scroll: false });
    }
  };

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter((art) => art.category === selectedCategory);

  return (
    <div className="space-y-16">
      {/* Category Tabs Filter Bar */}
      <div className="border-b border-slate-200 pb-2">
        <div className="flex flex-wrap gap-2 md:justify-center">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategorySelect(category)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all border ${
                  isActive
                    ? 'border-[#0F4C81] bg-[#0F4C81] text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-655 hover:border-slate-300 hover:text-slate-900'
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
            No articles found in this category.
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
                  <Link href={`/insights/${article.slug}`}>
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
                    href={`/insights/${article.slug}`}
                    className="inline-flex items-center text-[#0F4C81] hover:text-[#0c3c66] gap-1"
                  >
                    <span>Read Article</span>
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

export default function InsightsPage() {
  return (
    <main className="relative w-full bg-white text-left">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-slate-50 pt-36 pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Thought <span className="text-[#0F4C81]">Leadership</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
              Perspectives, guides, and engineering patterns from HyperCode consulting directors and solutions architects.
            </p>
          </div>
        </div>
      </section>

      {/* Main Insights Panel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="text-center py-12 text-slate-500">Loading articles...</div>}>
            <InsightsContent />
          </Suspense>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-none">Stay Updated</h2>
            <p className="text-sm sm:text-base text-slate-655 font-medium">
              Subscribe to our newsletter to receive the latest insights and updates directly in your inbox.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="your.email@company.com"
                required
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm font-semibold"
              />
              <button
                type="submit"
                className="h-11 px-6 bg-[#0F4C81] text-white rounded-xl font-semibold text-xs hover:bg-[#0c3c66] transition-colors duration-200 cursor-pointer border-none"
              >
                Subscribe
              </button>
            </form>

            <p className="text-[11px] font-semibold text-slate-400">
              We&apos;ll never share your email. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
