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
    <main className="relative w-full">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-[50vh] bg-gradient-to-b from-background to-muted/30 pt-32 pb-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Latest Insights & Articles
            </h1>
            <p className="text-xl text-foreground/60 max-w-3xl mx-auto">
              Stay informed with our latest thoughts on business intelligence, data analytics, technology trends, and industry insights.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="group flex flex-col p-6 rounded-xl border border-border/40 bg-card hover:border-accent/50 transition-all hover:shadow-lg hover:-translate-y-2"
              >
                {/* Category Badge */}
                <span className="inline-block w-fit px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wide mb-4">
                  {article.category}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-foreground/70 text-sm leading-relaxed mb-6 flex-1">
                  {article.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex items-center justify-between pt-6 border-t border-border/40 text-xs text-foreground/60">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{article.date}</span>
                  </div>
                  <span>{article.readTime}</span>
                </div>

                {/* Read More */}
                <Link
                  href={`/insights/${article.id}`}
                  className="inline-flex items-center gap-2 text-accent font-medium mt-6 group-hover:gap-3 transition-all"
                >
                  Read Article
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-12 rounded-2xl border border-border/40 bg-card space-y-6 text-center">
            <h2 className="text-3xl font-bold text-foreground">Stay Updated</h2>
            <p className="text-lg text-foreground/60">
              Subscribe to our newsletter to receive the latest insights and updates directly in your inbox.
            </p>

            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your.email@company.com"
                required
                className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                Subscribe
              </button>
            </form>

            <p className="text-xs text-foreground/60">
              We&apos;ll never share your email. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">Browse by Category</h2>
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
                className="p-4 rounded-lg border border-border/40 bg-card hover:border-accent/50 hover:shadow-lg transition-all text-center font-medium text-foreground/70 hover:text-primary"
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
