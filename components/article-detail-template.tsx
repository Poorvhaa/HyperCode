import { ArrowLeft, ArrowRight, Calendar, Clock, List } from 'lucide-react';
import Image from 'next/image';
import { BrandButton } from '@/components/brand-button';
import { Footer } from '@/components/footer';
import { Navigation } from '@/components/navigation';
import { Link } from '@/i18n/routing';
import { prepareArticleContent } from '@/lib/article-content';
import { absoluteUrl } from '@/lib/seo/company';
import { ARTICLE_LABELS, type ArticleLocale, type LocalizedArticle } from '@/lib/articles-catalog';

interface ArticleDetailTemplateProps {
  article: LocalizedArticle;
  relatedArticles: LocalizedArticle[];
  locale: ArticleLocale;
}

function getServiceCta(category: LocalizedArticle['category']['slug'], locale: ArticleLocale) {
  const ctas = {
    'ai-automation': {
      href: '/solutions/ai-consulting',
      en: 'Explore AI consulting',
      es: 'Explore la consultoría de IA',
    },
    'business-intelligence': {
      href: '/solutions/business-intelligence-consulting',
      en: 'Explore business intelligence',
      es: 'Explore la inteligencia de negocios',
    },
    'data-analytics': {
      href: '/solutions/data-analytics-services',
      en: 'Explore data and analytics',
      es: 'Explore datos y analítica',
    },
    'cloud-it': {
      href: '/solutions/managed-it-services',
      en: 'Explore cloud and IT services',
      es: 'Explore servicios de nube y TI',
    },
    'software-development': {
      href: '/solutions/web-development-services',
      en: 'Explore software development',
      es: 'Explore el desarrollo de software',
    },
    'talent-staffing': {
      href: '/solutions/it-staffing-solutions',
      en: 'Explore talent solutions',
      es: 'Explore soluciones de personal',
    },
  } as const;

  return ctas[category] ?? ctas['software-development'];
}

export function ArticleDetailTemplate({
  article,
  relatedArticles,
  locale,
}: ArticleDetailTemplateProps) {
  const labels = ARTICLE_LABELS[locale];
  const { html, tableOfContents } = prepareArticleContent(article.content);
  const serviceCta = getServiceCta(article.category.slug, locale);
  const publishedDate = new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-US', {
    dateStyle: 'long',
  }).format(new Date(article.publishedAt));
  const articleUrl = absoluteUrl(`${locale}/articles/${article.slug}`);

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'HyperCode LLC',
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/hypercodeit.logo.webp'),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  };

  return (
    <main className="relative w-full bg-white text-left">
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />

      <section className="border-b border-slate-100 bg-slate-50 pb-16 pt-36">
        <div className="mx-auto w-full max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Link href="/" className="transition-colors hover:text-royal-blue">
              {labels.home}
            </Link>
            <span>/</span>
            <Link href="/articles" className="transition-colors hover:text-royal-blue">
              {labels.title}
            </Link>
            <span>/</span>
            <span className="max-w-[220px] truncate text-slate-500">{article.category.label[locale]}</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 text-eyebrow text-royal-blue">
            <span className="h-1.5 w-1.5 rounded-full bg-royal-blue" />
            {article.category.label[locale]}
          </span>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <p className="max-w-3xl text-lead font-medium text-slate-600">{article.excerpt}</p>
          <Image
            src={article.image}
            alt=""
            width={1200}
            height={675}
            className="aspect-[16/9] w-full rounded-2xl object-cover"
            priority
          />

          <div className="flex flex-wrap items-center gap-5 border-t border-slate-200 pt-4 text-xs font-bold uppercase tracking-wider text-slate-500">
            <span>{article.author.name}</span>
            <span className="flex items-center gap-2">
              <Calendar size={14} className="text-slate-400" aria-hidden="true" />
              {publishedDate}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={14} className="text-slate-400" aria-hidden="true" />
              {labels.readingTime(article.readingTimeMinutes)}
            </span>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-button uppercase tracking-wider text-royal-blue transition-colors hover:text-[#0c3c66]"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              {labels.backToArticles}
            </Link>

            {tableOfContents.length > 0 && (
              <nav className="border-t border-slate-100 pt-6" aria-label={labels.tableOfContents}>
                <h2 className="mb-3 flex items-center gap-2 text-eyebrow text-slate-400">
                  <List size={13} aria-hidden="true" />
                  {labels.tableOfContents}
                </h2>
                <ol className="space-y-2 text-sm font-medium text-slate-600">
                  {tableOfContents.map((item) => (
                    <li key={item.id} className={item.level === 3 ? 'pl-3' : undefined}>
                      <a href={`#${item.id}`} className="transition-colors hover:text-royal-blue">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </aside>

          <div className="space-y-12 lg:col-span-3">
            {html ? (
              <div
                className="space-y-6 text-base font-medium leading-relaxed text-slate-700 [&>blockquote]:my-6 [&>blockquote]:border-l-4 [&>blockquote]:border-royal-blue [&>blockquote]:pl-4 [&>h2]:mb-4 [&>h2]:mt-8 [&>h2]:text-xl [&>h2]:font-extrabold [&>h2]:text-slate-900 [&>h3]:mb-3 [&>h3]:mt-6 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-slate-900 [&>ol]:list-decimal [&>ol]:space-y-2 [&>ol]:pl-6 [&>p]:mb-6 [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-6"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                <p className="text-body font-medium text-slate-600">{labels.comingSoonDescription}</p>
              </div>
            )}

            <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-slate-900 p-8 text-white">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,76,129,0.2)_0%,transparent_100%)]" />
              <div className="relative z-10 space-y-4">
                <p className="text-eyebrow text-cyan-400">{labels.serviceCtaEyebrow}</p>
                <h2 className="text-2xl font-extrabold tracking-tight">{labels.serviceCtaTitle}</h2>
                <p className="max-w-xl text-body-sm font-medium leading-relaxed text-slate-300">
                  {labels.serviceCtaDescription}
                </p>
                <BrandButton href={serviceCta.href} variant="primary">
                  {serviceCta[locale]}
                  <ArrowRight size={14} className="ml-1 inline" aria-hidden="true" />
                </BrandButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedArticles.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50 py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-slate-900">
              {labels.relatedArticles}
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {relatedArticles.map((related) => (
                <article key={related.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="text-caption font-semibold uppercase tracking-wider text-slate-500">
                    {related.category.label[locale]}
                  </span>
                  <h3 className="mt-3 text-card-title text-slate-900">
                    <Link href={`/articles/${related.slug}`} className="transition-colors hover:text-royal-blue">
                      {related.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-body-sm font-medium text-slate-600">{related.excerpt}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
