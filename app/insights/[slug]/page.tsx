import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ArrowLeft, Calendar, Clock, User, Share2, Mail } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, Article } from '@/lib/insights';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for prerendering during build
export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = articles.find((art) => art.slug === resolvedParams.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found | HyperCode',
    };
  }

  return {
    title: `${article.title} | HyperCode Insights`,
    description: article.excerpt,
    alternates: {
      canonical: `https://www.hypercode.com/insights/${article.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  const article = articles.find((art) => art.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  // Find related articles objects
  const relatedArticles = articles
    .filter((art) => article.related.includes(art.slug))
    .slice(0, 3);

  // If we don't have enough explicitly related, fill with articles from the same category
  if (relatedArticles.length < 3) {
    const extra = articles
      .filter((art) => art.category === article.category && art.slug !== article.slug && !relatedArticles.some(r => r.slug === art.slug))
      .slice(0, 3 - relatedArticles.length);
    relatedArticles.push(...extra);
  }

  // Fallback to general articles if still less than 3
  if (relatedArticles.length < 3) {
    const extra = articles
      .filter((art) => art.slug !== article.slug && !relatedArticles.some(r => r.slug === art.slug))
      .slice(0, 3 - relatedArticles.length);
    relatedArticles.push(...extra);
  }

  const shareUrl = `https://www.hypercode.com/insights/${article.slug}`;
  const shareText = encodeURIComponent(article.title);

  return (
    <main className="relative w-full bg-white text-left">
      <Navigation />

      {/* Hero Header Section */}
      <section className="bg-slate-50 pt-36 pb-16 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Link href="/" className="hover:text-[#0F4C81] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/insights" className="hover:text-[#0F4C81] transition-colors">Insights</Link>
            <span>/</span>
            <span className="text-slate-500 truncate max-w-[200px] sm:max-w-xs">{article.category}</span>
          </nav>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {article.title}
          </h1>

          {/* Meta Information Bar */}
          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-250 text-xs font-bold text-slate-500 uppercase tracking-wider">
            {/* Author */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-655 flex-shrink-0">
                <User size={14} />
              </div>
              <div>
                <p className="text-slate-800 font-extrabold">{article.author.name}</p>
                <p className="text-[10px] text-slate-400 font-semibold leading-tight mt-0.5">{article.author.role}</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-slate-400" />
              <span>{article.date}</span>
            </div>

            {/* Reading Time */}
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-slate-400" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Left/Sidebar: Share Bar */}
            <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-28">
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#0F4C81] hover:text-[#0c3c66] transition-colors uppercase tracking-wider"
              >
                <ArrowLeft size={14} />
                <span>Back to Insights</span>
              </Link>

              <div className="pt-6 border-t border-slate-100 space-y-4">
                <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Share2 size={12} />
                  <span>Share Article</span>
                </h4>
                <div className="flex lg:flex-col gap-2">
                  {/* LinkedIn */}
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:border-[#0F4C81] hover:text-[#0F4C81] hover:bg-slate-50 transition-all cursor-pointer animate-none"
                    title="Share on LinkedIn"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </a>
                  {/* Twitter / X */}
                  <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:border-black hover:text-black hover:bg-slate-50 transition-all cursor-pointer animate-none"
                    title="Share on X"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:border-blue-600 hover:text-blue-600 hover:bg-slate-50 transition-all cursor-pointer animate-none"
                    title="Share on Facebook"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                    </svg>
                  </a>
                  {/* Email */}
                  <a
                    href={`mailto:?subject=${shareText}&body=Check%20out%20this%20article%20from%20HyperCode:%20${shareUrl}`}
                    className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:border-slate-800 hover:text-slate-800 hover:bg-slate-50 transition-all cursor-pointer"
                    title="Share via Email"
                  >
                    <Mail size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Center/Right: Article Content & Author Bio */}
            <div className="lg:col-span-3 space-y-12">
              {/* Rich-text content rendered with custom classes for clean spacing */}
              <div 
                className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed font-medium [&>p]:leading-relaxed [&>p]:mb-6 [&>h2]:text-xl [&>h2]:font-extrabold [&>h2]:text-slate-900 [&>h2]:mt-8 [&>h2]:mb-4 [&>blockquote]:pl-4 [&>blockquote]:border-l-4 [&>blockquote]:border-[#0F4C81] [&>blockquote]:italic [&>blockquote]:text-slate-850 [&>blockquote]:my-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>li]:pl-1 [&>em]:text-slate-800"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Author Bio Card */}
              <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-655 flex-shrink-0">
                  <User size={20} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-900">About the Author</h4>
                  <p className="text-base font-extrabold text-[#0F4C81] leading-none">{article.author.name}</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider leading-none mt-1">{article.author.role}</p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium pt-2">
                    {article.author.bio || 'Consultant at HyperCode specializing in cloud solutions, advanced database systems, and strategic enterprise architectures.'}
                  </p>
                </div>
              </div>

              {/* Strong CTA Banner */}
              <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-6 border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,76,129,0.2)_0%,transparent_100%)] pointer-events-none" />
                <div className="relative z-10 space-y-4">
                  <h4 className="text-xs font-bold text-cyan-400 tracking-wider uppercase">READY TO EXECUTE?</h4>
                  <h3 className="text-2xl font-extrabold tracking-tight">Implement These Strategies Today</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium max-w-xl">
                    Schedule a consultation with our technology practice directors to scope your specific data warehousing, business intelligence, or staff augmentation requirements.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/consultation"
                      className="inline-flex items-center justify-center h-10 px-6 bg-[#0F4C81] hover:bg-[#0A365D] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors"
                    >
                      Book Consultation
                    </Link>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Related Articles Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-left">
            <h4 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">READ MORE</h4>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Related Articles</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((art) => (
              <article
                key={art.slug}
                className="flex flex-col p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow hover:border-slate-300 transition-all justify-between text-left group"
              >
                <div>
                  <span className="inline-block w-fit px-2.5 py-0.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 text-[9px] font-bold uppercase tracking-wider mb-3">
                    {art.category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#0F4C81] transition-colors line-clamp-2">
                    <Link href={`/insights/${art.slug}`}>{art.title}</Link>
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-3 mb-4">{art.excerpt}</p>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider pt-3 border-t border-slate-100">
                  <span>{art.date}</span>
                  <Link href={`/insights/${art.slug}`} className="text-[#0F4C81]">
                    Read Brief
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
