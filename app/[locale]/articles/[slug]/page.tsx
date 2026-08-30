import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ArticleDetailTemplate } from '@/components/article-detail-template';
import {
  getLocalizedArticle,
  getRelatedArticles,
  ARTICLE_LABELS,
  type ArticleLocale,
} from '@/lib/articles-catalog';
import { localeAlternates, localeUrl } from '@/lib/site-url';

interface ArticlePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const articleLocale: ArticleLocale = locale === 'es' ? 'es' : 'en';
  const article = getLocalizedArticle(slug, articleLocale);

  if (!article) {
    const labels = ARTICLE_LABELS[articleLocale];
    return {
      title: `HyperCode | ${labels.articleNotFound}`,
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `HyperCode | ${article.title}`,
    description: article.excerpt,
    alternates: {
      canonical: localeUrl(articleLocale, `articles/${article.slug}`),
      languages: localeAlternates(`articles/${article.slug}`),
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: localeUrl(articleLocale, `articles/${article.slug}`),
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params;
  const articleLocale: ArticleLocale = locale === 'es' ? 'es' : 'en';
  setRequestLocale(articleLocale);
  const article = getLocalizedArticle(slug, articleLocale);

  if (!article) {
    notFound();
  }

  return (
    <ArticleDetailTemplate
      article={article}
      relatedArticles={getRelatedArticles(article, articleLocale)}
      locale={articleLocale}
    />
  );
}
