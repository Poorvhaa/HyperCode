'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import {
  ArrowRight,
  Cpu,
  Globe,
  Users,
  Layers,
  Shield,
  Brain,
  Network,
  Zap,
  Cloud,
} from 'lucide-react';
import { getCaseStudies, type CaseStudyItem } from '@/lib/case-studies-data';
import Image from 'next/image';
import { standardReveal } from '@/lib/motion-tokens';

const INDUSTRIES_SERVED = [
  { id: 'manufacturing', icon: Cpu, tags: ['IIoT', 'ERP', 'Supply Chain'] },
  { id: 'education', icon: Globe, tags: ['EdTech', 'LMS', 'Portals'] },
  { id: 'logistics', icon: Cloud, tags: ['Fleet Tracking', 'Routing', 'Warehouse'] },
  { id: 'hospitality', icon: Users, tags: ['Booking Systems', 'Automation', 'CRM'] },
  { id: 'construction', icon: Layers, tags: ['Project Management', 'Databases', 'Collaboration'] },
  { id: 'legal', icon: Shield, tags: ['Document Storage', 'Contracts', 'Billing'] },
  { id: 'pharma', icon: Brain, tags: ['Biotech', 'Databases', 'FDA Compliance'] },
  { id: 'government', icon: Network, tags: ['GovTech', 'Citizen Portals', 'Audit Tools'] },
  { id: 'technology', icon: Zap, tags: ['SaaS MVP', 'Cloud scaling', 'Vulnerability Scans'] },
];

function ProjectVisual({
  study,
  priority = false,
  className = '',
}: {
  study: CaseStudyItem;
  priority?: boolean;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const isReduced = !!prefersReducedMotion;

  return (
    <motion.div
      initial={standardReveal.hidden}
      whileInView={standardReveal.visible({ isReduced })}
      viewport={{ once: true, margin: '-60px' }}
      className={`group w-full min-w-0 ${className}`}
    >
      <div className="overflow-hidden border border-white/[0.08] bg-[#0A1E38]">
        <div
          className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5"
          aria-hidden="true"
        >
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
          </div>
          <div className="ml-2 h-2 flex-1 max-w-[12rem] rounded-sm bg-white/[0.06]" />
        </div>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0D2444]">
          <Image
            src={study.featuredImage}
            alt={study.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 720px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:group-hover:scale-100"
          />
        </div>
      </div>
    </motion.div>
  );
}

function ProjectInfo({
  study,
  index,
  tHome,
  tCase,
  isReduced,
}: {
  study: CaseStudyItem;
  index: number;
  tHome: ReturnType<typeof useTranslations<'HomepageRedesign.OurWork'>>;
  tCase: ReturnType<typeof useTranslations<'CaseStudies'>>;
  isReduced: boolean;
}) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={standardReveal.hidden}
      whileInView={standardReveal.visible({ isReduced, delay: 0.08 })}
      viewport={{ once: true, margin: '-60px' }}
      className="flex min-w-0 flex-col justify-center"
    >
      <span
        className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,4vw,4.5rem)] font-bold leading-none tracking-[-0.04em] text-white/[0.12]"
        aria-hidden="true"
      >
        {num}
      </span>

      <p className="mt-3 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-[#145BFF] sm:text-xs">
        {study.industry}
        <span className="mx-2 text-white/20">/</span>
        {study.clientType}
      </p>

      <h3 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.625rem,2.2vw+0.75rem,2.75rem)] font-bold leading-[1.15] tracking-[-0.025em] text-white">
        {study.title}
      </h3>

      <p className="mt-5 max-w-[34rem] text-[clamp(1rem,0.2vw+0.94rem,1.125rem)] leading-[1.7] text-white/60">
        {study.solution}
      </p>

      {study.metrics.length > 0 && (
        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          {study.metrics.slice(0, 2).map((metric) => (
            <div key={metric.label} className="min-w-0">
              <dt className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-white/40">
                {metric.label}
              </dt>
              <dd className="mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-7">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-white/35 sm:text-xs">
          {tCase('technologies')}
        </p>
        <p className="mt-2 text-[0.8125rem] font-medium leading-relaxed text-white/55 sm:text-sm">
          {study.technologies.join(' · ')}
        </p>
      </div>

      <Link
        href={`/case-studies/${study.slug}`}
        className="group/link mt-8 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#145BFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08162D]"
      >
        <span>{tHome('viewProject')}</span>
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover/link:translate-x-1 motion-reduce:group-hover/link:translate-x-0"
          aria-hidden="true"
        />
      </Link>
    </motion.div>
  );
}

function FeaturedProject({
  study,
  tHome,
  tCase,
  isReduced,
}: {
  study: CaseStudyItem;
  tHome: ReturnType<typeof useTranslations<'HomepageRedesign.OurWork'>>;
  tCase: ReturnType<typeof useTranslations<'CaseStudies'>>;
  isReduced: boolean;
}) {
  return (
    <article className="border-b border-white/[0.06] pb-14 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-28">
      <motion.div
        initial={standardReveal.hidden}
        whileInView={standardReveal.visible({ isReduced })}
        viewport={{ once: true, margin: '-80px' }}
        className="mb-8 sm:mb-10 lg:mb-12"
      >
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-[#145BFF] sm:text-xs">
          {tHome('featuredBadge')}
        </p>
      </motion.div>

      <div className="grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
        <div className="min-w-0 lg:col-span-7">
          <ProjectVisual study={study} priority />
        </div>

        <div className="flex min-w-0 flex-col justify-center lg:col-span-5">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-white/45 sm:text-xs">
            {study.industry}
            <span className="mx-2 text-white/20">/</span>
            {study.clientType}
          </p>

          <h3 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.75rem,2.5vw+0.75rem,3rem)] font-bold leading-[1.12] tracking-[-0.025em] text-white">
            {study.title}
          </h3>

          <p className="mt-5 text-[clamp(1rem,0.2vw+0.94rem,1.125rem)] leading-[1.7] text-white/60">
            {study.solution}
          </p>

          {study.metrics.length > 0 && (
            <dl className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
              {study.metrics.slice(0, 3).map((metric) => (
                <div key={metric.label} className="min-w-0 border-t border-white/[0.08] pt-4">
                  <dt className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-white/40">
                    {metric.label}
                  </dt>
                  <dd className="mt-1.5 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-7">
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-white/35 sm:text-xs">
              {tCase('technologies')}
            </p>
            <p className="mt-2 text-[0.8125rem] font-medium leading-relaxed text-white/55 sm:text-sm">
              {study.technologies.join(' · ')}
            </p>
          </div>

          <Link
            href={`/case-studies/${study.slug}`}
            className="group/link mt-8 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#145BFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08162D]"
          >
            <span>{tHome('viewCaseStudy')}</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover/link:translate-x-1 motion-reduce:group-hover/link:translate-x-0"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

function ProjectStory({
  study,
  index,
  reversed,
  tHome,
  tCase,
  isReduced,
}: {
  study: CaseStudyItem;
  index: number;
  reversed: boolean;
  tHome: ReturnType<typeof useTranslations<'HomepageRedesign.OurWork'>>;
  tCase: ReturnType<typeof useTranslations<'CaseStudies'>>;
  isReduced: boolean;
}) {
  return (
    <article
      className="border-b border-white/[0.06] py-14 sm:py-16 md:py-20 lg:py-24 xl:py-28 last:border-b-0"
    >
      <div className="grid min-w-0 grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-20">
        <ProjectVisual
          study={study}
          className={reversed ? 'lg:order-2' : 'lg:order-1'}
        />
        <div className={reversed ? 'lg:order-1' : 'lg:order-2'}>
          <ProjectInfo
            study={study}
            index={index}
            tHome={tHome}
            tCase={tCase}
            isReduced={isReduced}
          />
        </div>
      </div>
    </article>
  );
}

export function CaseStudiesSection() {
  const tHome = useTranslations('HomepageRedesign.OurWork');
  const tCase = useTranslations('CaseStudies');
  const tSolutions = useTranslations('SolutionsPage');
  const tHero = useTranslations('Hero');
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();
  const isReduced = !!prefersReducedMotion;

  const studies = getCaseStudies(locale).slice(0, 3);
  const [featured, ...remaining] = studies;

  return (
    <>
      <section
        id="our-work"
        data-section-theme="dark"
        className="relative w-full overflow-hidden border-b border-white/[0.06] bg-[#08162D] text-white scroll-mt-24"
        aria-label={tHome('title')}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(20, 91, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(20, 91, 255, 0.04) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
          }}
        />

        <div className="relative z-10 mx-auto min-w-0 max-w-[90rem] px-5 sm:px-8 lg:px-12 xl:px-16 py-14 sm:py-16 md:py-20 lg:py-24 xl:py-[7rem]">
          <motion.header
            initial={standardReveal.hidden}
            whileInView={standardReveal.visible({ isReduced })}
            viewport={{ once: true, margin: '-80px' }}
            className="mb-12 min-w-0 max-w-3xl sm:mb-14 md:mb-16 lg:mb-20 xl:mb-24"
          >
            <p className="text-[0.6875rem] font-medium tracking-[0.16em] uppercase text-[#145BFF] sm:text-xs">
              <span className="mr-1.5 text-white/35">//</span>
              {tHome('badge')}
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.875rem,1.2vw+1.25rem,3.5rem)] font-bold leading-[1.12] tracking-[-0.025em] text-white sm:mt-5">
              {tHome('title')}
            </h2>
            <p className="mt-5 max-w-[32rem] text-[clamp(1rem,0.25vw+0.94rem,1.1875rem)] leading-[1.7] text-white/55 sm:mt-6">
              {tHome('subtitle')}
            </p>
          </motion.header>

          {featured && (
            <FeaturedProject
              study={featured}
              tHome={tHome}
              tCase={tCase}
              isReduced={isReduced}
            />
          )}

          {remaining.map((study, idx) => (
            <ProjectStory
              key={study.slug}
              study={study}
              index={idx + 1}
              reversed={idx % 2 === 0}
              tHome={tHome}
              tCase={tCase}
              isReduced={isReduced}
            />
          ))}

          <motion.div
            initial={standardReveal.hidden}
            whileInView={standardReveal.visible({ isReduced })}
            viewport={{ once: true, margin: '-40px' }}
            className="mt-12 flex justify-start sm:mt-14 lg:mt-16"
          >
            <Link
              href="/case-studies"
              className="inline-flex min-h-11 items-center gap-2 border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08162D]"
            >
              <span>{tCase('viewAll')}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Industries We Serve — preserved subsection */}
      <section
        className="relative w-full overflow-hidden scroll-mt-24 border-b border-slate-200/90 bg-slate-50"
        aria-labelledby="industries-served-heading"
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.25]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(20, 91, 255, 0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(20, 91, 255, 0.015) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
              maskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto min-w-0 max-w-[90rem] px-5 sm:px-8 lg:px-12 xl:px-16 py-14 sm:py-16 md:py-20 lg:py-24 xl:py-[7rem]">
          <div className="mb-12 min-w-0 max-w-3xl sm:mb-14 lg:mb-16">
            <p className="text-[0.6875rem] sm:text-xs font-medium tracking-[0.16em] uppercase text-[#145BFF]">
              {tSolutions('industries')}
            </p>
            <h2
              id="industries-served-heading"
              className="mt-4 sm:mt-5 font-[family-name:var(--font-display)] font-bold text-[clamp(1.875rem,1.2vw+1.25rem,3.5rem)] leading-[1.12] tracking-[-0.025em] text-[#08162D] min-w-0"
            >
              {tSolutions('industriesTitle')}
            </h2>
            <p className="mt-5 sm:mt-6 max-w-[32rem] text-[clamp(1rem,0.25vw+0.94rem,1.1875rem)] leading-[1.7] text-slate-600 min-w-0">
              {tSolutions('industriesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {INDUSTRIES_SERVED.map((ind) => {
              const IndIcon = ind.icon;
              return (
                <div
                  key={ind.id}
                  className="group flex min-h-[220px] select-none flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs transition-all duration-300 hover:border-royal-blue/30 hover:shadow-xs"
                >
                  <div className="space-y-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition-all duration-300 group-hover:border-royal-blue/15 group-hover:bg-royal-blue/5 group-hover:text-royal-blue">
                      <IndIcon size={20} />
                    </div>
                    <div className="space-y-2 text-left min-w-0">
                      <h3 className="font-[family-name:var(--font-display)] font-semibold text-[clamp(1rem,0.4vw+0.9rem,1.125rem)] leading-snug tracking-[-0.015em] text-[#08162D] min-w-0">
                        {tSolutions(`industriesList.${ind.id}.title`)}
                      </h3>
                      <p className="line-clamp-3 text-[clamp(0.875rem,0.15vw+0.85rem,0.9375rem)] font-medium leading-[1.65] text-slate-600 min-w-0">
                        {tSolutions(`industriesList.${ind.id}.desc`)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4">
                    <div className="flex max-w-[65%] min-w-0 flex-wrap gap-1">
                      {ind.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wide text-slate-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href="/solutions"
                      className="-my-[14px] inline-flex min-h-11 shrink-0 items-center gap-1 px-2 py-[14px] text-[0.6875rem] font-semibold uppercase tracking-wider text-royal-blue transition-all hover:gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue/30 rounded-lg"
                    >
                      <span>{tHero('exploreSolutions')}</span>
                      <ArrowRight size={10} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
