import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Insights | HyperCode Blog',
  description: 'Read our latest insights on business intelligence, data analytics, and technology trends.',
};

const articles = [
  {
    id: 1,
    title: 'The Future of Business Intelligence in 2024',
    excerpt: 'Explore emerging trends in BI, from AI-driven insights to real-time analytics, and how organizations can stay ahead.',
    date: 'December 15, 2024',
    category: 'Business Intelligence',
    readTime: '8 min read',
  },
  {
    id: 2,
    title: 'Modernizing Your Data Warehouse: A Strategic Guide',
    excerpt: 'Learn the key considerations for migrating to cloud-based data warehouses and maximizing ROI.',
    date: 'December 10, 2024',
    category: 'Data Warehousing',
    readTime: '10 min read',
  },
  {
    id: 3,
    title: 'AI and Machine Learning in Data Analytics',
    excerpt: 'Discover how AI and ML are transforming data analytics and creating new possibilities for organizations.',
    date: 'December 5, 2024',
    category: 'Data Analytics',
    readTime: '7 min read',
  },
  {
    id: 4,
    title: 'Staffing Trends 2025: What to Expect',
    excerpt: 'Insights into the changing IT staffing landscape and strategies for hiring top talent.',
    date: 'November 28, 2024',
    category: 'Staffing',
    readTime: '6 min read',
  },
  {
    id: 5,
    title: 'Building a Data-Driven Organization',
    excerpt: 'From culture to tools, learn the essential components of becoming truly data-driven.',
    date: 'November 20, 2024',
    category: 'Strategy',
    readTime: '9 min read',
  },
  {
    id: 6,
    title: 'Cloud Data Platforms: Choosing the Right Solution',
    excerpt: 'Compare leading cloud data platforms and understand how to choose the best fit for your organization.',
    date: 'November 15, 2024',
    category: 'Cloud',
    readTime: '11 min read',
  },
];

export default function InsightsPage() {
  return (
    <main className="relative w-full bg-white text-left">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-slate-50 pt-36 pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Latest Insights & <span className="text-[#0F4C81]">Articles</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
              Stay informed with our latest thoughts on business intelligence, data analytics, technology trends, and industry insights.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="flex flex-col p-6 rounded-2xl border border-slate-200 bg-white shadow-sm justify-between"
              >
                <div>
                  {/* Category Badge */}
                  <span className="inline-block w-fit px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-4">
                    {article.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-6">
                    {article.excerpt}
                  </p>
                </div>

                <div>
                  {/* Meta Information */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-[11px] font-semibold text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      <span>{article.date}</span>
                    </div>
                    <span>{article.readTime}</span>
                  </div>

                  {/* Read More Button */}
                  <div className="pt-4">
                    <Link
                      href={`/insights/${article.id}`}
                      className="inline-flex items-center justify-center h-9 px-4 bg-white border border-[#0F4C81] text-[#0F4C81] font-semibold text-xs rounded-xl hover:bg-slate-50 transition-colors duration-200"
                    >
                      <span>Read Article</span>
                      <ArrowRight size={12} className="ml-1.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-none">Stay Updated</h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Subscribe to our newsletter to receive the latest insights and updates directly in your inbox.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="your.email@company.com"
                required
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] text-sm font-semibold"
              />
              <button
                type="submit"
                className="h-11 px-6 bg-[#0F4C81] text-white rounded-xl font-semibold text-xs hover:bg-[#0c3c66] transition-colors duration-200"
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

      {/* Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">TOPICS</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">Browse by Category</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Business Intelligence',
              'Data Analytics',
              'Data Warehousing',
              'Cloud Solutions',
              'IT Staffing',
              'Case Studies',
              'Industry Trends',
              'Technology News',
            ].map((category, i) => (
              <Link
                key={i}
                href={`/insights?category=${category.toLowerCase()}`}
                className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-[#0F4C81] transition-all text-center text-xs font-semibold text-slate-700 hover:text-[#0F4C81]"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
