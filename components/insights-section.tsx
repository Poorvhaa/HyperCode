'use client';

import { useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import {
  ARTICLE_FEATURED_IMAGES,
  HOMEPAGE_FEATURED_SLUG,
  HOMEPAGE_INSIGHT_SLUGS,
} from '@/lib/insights';
import { getLocalizedArticles } from '@/lib/insights-localizer';
import { LandingReveal } from '@/components/motion/landing-reveal';

function FeaturedArticle({
  slug,
  category,
  title,
  excerpt,
  date,
  readLabel,
}: {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readLabel: string;
}) {
  const imageSrc = ARTICLE_FEATURED_IMAGES[slug];

  return (
    <article className="min-w-0">
      <Link
        href={`/insights/${slug}`}
        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145BFF] focus-visible:ring-offset-2"
      >
        {imageSrc && (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#DDE3EC] rounded-xl shadow-[var(--landing-depth-sm)]">
            <Image
              src={imageSrc}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 58vw, 720px"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:group-hover:scale-100"
            />
          </div>
        )}

        <div className="mt-6 sm:mt-7 lg:mt-8">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-[#145BFF] sm:text-xs">
            {category}
          </p>

          <h3 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.625rem,1.8vw+0.75rem,2.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-[#08162D] transition-colors group-hover:text-[#145BFF]">
            {title}
          </h3>

          <p className="mt-4 text-[clamp(1rem,0.2vw+0.94rem,1.125rem)] leading-[1.7] text-slate-600">
            {excerpt}
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <time
              dateTime={date}
              className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-slate-400 sm:text-xs"
            >
              {date}
            </time>

            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#145BFF] transition-colors group-hover:text-[#0c3c66]">
              {readLabel}
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function SecondaryArticleRow({
  slug,
  category,
  title,
  excerpt,
  readLabel,
}: {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readLabel: string;
}) {
  return (
    <li className="border-t border-[rgba(8,22,45,0.08)] first:border-t-0">
      <Link
        href={`/insights/${slug}`}
        className="group block py-7 sm:py-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145BFF] focus-visible:ring-offset-2"
      >
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-[#145BFF] sm:text-xs">
          {category}
        </p>

        <h3 className="mt-2.5 font-[family-name:var(--font-display)] text-[clamp(1.125rem,0.8vw+0.85rem,1.625rem)] font-bold leading-[1.25] tracking-[-0.02em] text-[#08162D] transition-colors group-hover:text-[#145BFF]">
          {title}
        </h3>

        <p className="mt-3 text-[clamp(0.9375rem,0.15vw+0.9rem,1.0625rem)] leading-[1.65] text-slate-600">
          {excerpt}
        </p>

        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#145BFF] transition-colors group-hover:text-[#0c3c66]">
          {readLabel}
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
            aria-hidden="true"
          />
        </span>
      </Link>
    </li>
  );
}

export function InsightsSection() {
  const t = useTranslations('HomepageRedesign.Insights');
  const tInsights = useTranslations('Insights');
  const locale = useLocale();

  const { featured, secondary } = useMemo(() => {
    const localized = getLocalizedArticles(locale);
    const curated = HOMEPAGE_INSIGHT_SLUGS.map((slug) =>
      localized.find((article) => article.slug === slug),
    ).filter(Boolean) as NonNullable<(typeof localized)[number]>[];

    const featuredArticle =
      curated.find((article) => article.slug === HOMEPAGE_FEATURED_SLUG) ?? curated[0];

    const supporting = curated.filter((article) => article.slug !== featuredArticle?.slug);

    return { featured: featuredArticle, secondary: supporting };
  }, [locale]);

  if (!featured) return null;

  const readLabel = tInsights('readArticle');

  return (
    <section
      data-section-theme="neutral"
      className="relative overflow-hidden border-b landing-divider-light bg-[var(--landing-neutral)] text-left"
      aria-labelledby="insights-section-heading"
    >
      <div className="mx-auto min-w-0 max-w-[90rem] px-5 py-16 sm:px-8 sm:py-20 md:py-24 lg:px-12 lg:py-28 xl:px-16 xl:py-32">
        <div className="mb-12 flex min-w-0 flex-col gap-8 md:mb-14 md:flex-row md:items-end md:justify-between lg:mb-16 xl:mb-20">
          <LandingReveal className="min-w-0 max-w-2xl">
            <p className="landing-eyebrow landing-eyebrow-light">
              <span className="mr-2 text-[#B0BAC8]">//</span>
              {t('eyebrow')}
            </p>

            <h2
              id="insights-section-heading"
              className="mt-5 sm:mt-6 landing-headline text-[#08162D]"
            >
              {t('title')}
            </h2>

            <p className="mt-6 sm:mt-7 landing-lead text-[#5A6578] max-w-[32rem]">
              {t('subtitle')}
            </p>
          </LandingReveal>

          <LandingReveal delay={0.06} className="shrink-0">
            <Link
              href="/insights"
              className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-[#145BFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145BFF] focus-visible:ring-offset-2"
            >
              {t('viewAll')}
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
                aria-hidden="true"
              />
            </Link>
          </LandingReveal>
        </div>

        <LandingReveal delay={0.08}>
          <div className="grid min-w-0 grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            <div className="min-w-0 lg:col-span-7">
              <FeaturedArticle
                slug={featured.slug}
                category={featured.category}
                title={featured.title}
                excerpt={featured.excerpt}
                date={featured.date}
                readLabel={readLabel}
              />
            </div>

            <div className="min-w-0 lg:col-span-5 lg:pt-2">
              <ul className="m-0 list-none p-0">
                {secondary.map((article) => (
                  <SecondaryArticleRow
                    key={article.slug}
                    slug={article.slug}
                    category={article.category}
                    title={article.title}
                    excerpt={article.excerpt}
                    readLabel={readLabel}
                  />
                ))}
              </ul>
            </div>
          </div>
        </LandingReveal>
      </div>
    </section>
  );
}
