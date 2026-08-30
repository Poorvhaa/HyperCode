import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ArticlesList } from '@/components/articles-list';
import { Footer } from '@/components/footer';
import { HeroBanner } from '@/components/hero-banner';
import { Navigation } from '@/components/navigation';
import {
  ARTICLE_CATEGORIES,
  getLocalizedArticles,
  ARTICLE_LABELS,
  type ArticleLocale,
} from '@/lib/articles-catalog';
import { localeAlternates, localeUrl } from '@/lib/site-url';

interface ArticlesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ArticlesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const articleLocale: ArticleLocale = locale === 'es' ? 'es' : 'en';
  const labels = ARTICLE_LABELS[articleLocale];

  return {
    title: `HyperCode | ${labels.title}`,
    description: labels.description,
    alternates: {
      canonical: localeUrl(articleLocale, 'articles'),
      languages: localeAlternates('articles'),
    },
    openGraph: {
      title: `HyperCode | ${labels.title}`,
      description: labels.description,
      url: localeUrl(articleLocale, 'articles'),
      type: 'website',
    },
  };
}

export default async function ArticlesPage({ params }: ArticlesPageProps) {
  const { locale } = await params;
  const articleLocale: ArticleLocale = locale === 'es' ? 'es' : 'en';
  setRequestLocale(articleLocale);
  const labels = ARTICLE_LABELS[articleLocale];

  return (
    <main className="relative min-h-screen w-full bg-white text-left">
      <Navigation />
      <HeroBanner
        bgImage="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1600"
        categoryLabel={labels.eyebrow}
        title={labels.title}
        subtitle={labels.description}
        breadcrumbs={[
          { label: labels.home, href: '/' },
          { label: labels.title },
        ]}
      />
      <section className="section-padding border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ArticlesList
            articles={getLocalizedArticles(articleLocale)}
            categories={ARTICLE_CATEGORIES}
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}
