'use client';

import Image from "next/image";
import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, Link } from '@/i18n/routing';
import { BrandButton } from '@/components/brand-button';
import { useLocale, useTranslations } from 'next-intl';
import { SERVICE_REGISTRY, ALIAS_MAP } from '@/lib/services-details';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Bot,
  MonitorSmartphone,
  Code2,
  CloudCog,
  BarChart3,
  Shield,
  Users,
  Palette,
  type LucideIcon,
} from 'lucide-react';
import { solutionMenu, solutionMenuColumns, type MenuService } from '@/lib/navigation-links';

/** Sidebar highlights + in-list tags — slugs from solutionMenuColumns only */
const MEGA_MENU_FEATURED_SLUGS = ['ai-consulting', 'custom-software-development', 'cloud-migration'] as const;
const MEGA_MENU_POPULAR_SLUGS = new Set<string>(['ai-consulting', 'custom-software-development']);

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  'AI & Automation': Bot,
  'Web & Mobile': MonitorSmartphone,
  'Software Development': Code2,
  'Cloud & DevOps': CloudCog,
  'Data & Analytics': BarChart3,
  Cybersecurity: Shield,
  'Talent & Staffing': Users,
  'Digital & Experience': Palette,
};

function getMegaMenuFeaturedServices(): MenuService[] {
  const bySlug = new Map<string, MenuService>();
  for (const column of solutionMenuColumns) {
    for (const category of column) {
      for (const service of category.services) {
        bySlug.set(service.slug, service);
      }
    }
  }
  return MEGA_MENU_FEATURED_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (service): service is MenuService => service != null
  );
}

const megaMenuFeaturedServices = getMegaMenuFeaturedServices();

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' }
];

const NAV_HEIGHT_MOBILE_PX = 80;
const NAV_HEIGHT_TABLET_PX = 84;
const NAV_HEIGHT_DESKTOP_PX = 88;
const NAV_HEIGHT = 'h-[80px] sm:h-[84px] lg:h-[88px]';

const MAIN_NAV_LINKS = [
  { href: '/about', labelKey: 'about' },
  { href: '/insights', labelKey: 'insights' },
  { href: '/careers', labelKey: 'careers' },
  { href: '/contact', labelKey: 'contactUs' },
] as const;

function getServiceLabel(service: MenuService, locale: string) {
  if (service.label) return service.label[locale === 'es' ? 'es' : 'en'];
  const registrySlug = ALIAS_MAP[service.slug] || service.slug;
  const registryService = SERVICE_REGISTRY[registrySlug];
  return registryService
    ? registryService[locale === 'es' ? 'esName' : 'enName']
    : service.slug;
}

function isServiceLinkActive(pathname: string, service: MenuService) {
  const href = service.href || `/solutions/${service.slug}`;
  if (href.includes('#')) return pathname === href.split('#')[0];
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Navigation');
  const tSolutions = useTranslations('SolutionsPage');

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const [mobileSolutionCategory, setMobileSolutionCategory] = useState<number | null>(0);

  const solutionsRef = useRef<HTMLDivElement>(null);
  const solutionsMenuRef = useRef<HTMLDivElement>(null);
  const solutionsTriggerRef = useRef<HTMLAnchorElement>(null);
  const solutionsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const [navTheme, setNavTheme] = useState<'hero' | 'light' | 'transformation' | 'final-cta'>(pathname === '/' ? 'hero' : 'light');
  const [transformationProgress, setTransformationProgress] = useState(0);

  const isDarkTheme = navTheme === 'hero';
  const isHeroOverlay = isDarkTheme && !isScrolled;

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '/solutions') return pathname === '/solutions' || pathname.startsWith('/solutions/');
    return pathname.startsWith(href);
  };

  const getLinkClass = (href: string) => {
    const base =
      'relative flex h-full items-center bg-transparent border-none outline-none cursor-pointer py-2 text-[0.8125rem] lg:text-[0.875rem] font-medium tracking-[-0.015em] transition-colors duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue focus-visible:ring-offset-2';
    if (isDarkTheme) {
      return `${base} ${isActive(href) ? 'text-white' : 'text-[#9AADCC] hover:text-white'}`;
    }
    return `${base} ${isActive(href) ? 'text-royal-blue' : 'text-slate-600 hover:text-royal-blue'}`;
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 16);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.theme) setNavTheme(customEvent.detail.theme);
    };
    const handleStageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && typeof customEvent.detail.progress === 'number') {
        setTransformationProgress(customEvent.detail.progress);
      }
    };
    window.addEventListener('hypercode-theme-change', handleThemeChange);
    window.addEventListener('hypercode-transformation-stage', handleStageChange);
    return () => {
      window.removeEventListener('hypercode-theme-change', handleThemeChange);
      window.removeEventListener('hypercode-transformation-stage', handleStageChange);
    };
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('hypercode-mobile-menu-toggle', { detail: { open: isOpen } }));
  }, [isOpen]);

  useEffect(() => {
    setIsSolutionsOpen(false);
    setIsOpen(false);
    setIsMobileSolutionsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      const insideTrigger = solutionsRef.current?.contains(target);
      const insideMenu = solutionsMenuRef.current?.contains(target);
      if (!insideTrigger && !insideMenu) {
        setIsSolutionsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isOpen) {
          setIsOpen(false);
          return;
        }
        if (isMobileLangOpen) {
          setIsMobileLangOpen(false);
          return;
        }
        if (isSolutionsOpen) {
          setIsSolutionsOpen(false);
          solutionsTriggerRef.current?.focus();
        }
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      if (solutionsCloseTimer.current) clearTimeout(solutionsCloseTimer.current);
    };
  }, [isOpen, isMobileLangOpen, isSolutionsOpen]);

  const openSolutions = () => {
    if (solutionsCloseTimer.current) clearTimeout(solutionsCloseTimer.current);
    setIsSolutionsOpen(true);
  };

  const closeSolutionsWithDelay = () => {
    if (solutionsCloseTimer.current) clearTimeout(solutionsCloseTimer.current);
    solutionsCloseTimer.current = setTimeout(() => setIsSolutionsOpen(false), 200);
  };

  const handleLanguageChange = (code: string) => {
    localStorage.setItem('NEXT_LOCALE', code);
    router.replace(pathname, { locale: code });
    setIsMobileLangOpen(false);
  };

  const getNavClasses = () => {
    if (isHeroOverlay) {
      return `${NAV_HEIGHT} bg-transparent text-white border-b border-transparent`;
    }
    if (isDarkTheme) {
      return `${NAV_HEIGHT} bg-[#030A14]/78 backdrop-blur-[10px] text-white border-b border-white/[0.06]`;
    }
    return `${NAV_HEIGHT} bg-white/[0.96] backdrop-blur-[10px] text-slate-700 border-b border-slate-200/60`;
  };

  const underlineClass = (href: string) =>
    `absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-royal-blue via-[#25B5FF] to-green transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 ${
      isActive(href) ? '!scale-x-100' : ''
    }`;

  const langToggleClass = (code: string) => {
    const active = locale === code;
    if (isDarkTheme) {
      return `min-h-[32px] min-w-[32px] rounded px-2 text-[0.6875rem] font-medium uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue ${
        active ? 'text-white' : 'text-[#8A9BB8] hover:text-white'
      }`;
    }
    return `min-h-[32px] min-w-[32px] rounded px-2 text-[0.6875rem] font-medium uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue ${
      active ? 'text-royal-blue' : 'text-slate-500 hover:text-royal-blue'
    }`;
  };

  return (
    <>
      <motion.nav
        aria-label={t('navLabel')}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-[background-color,border-color,backdrop-filter,box-shadow] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${getNavClasses()}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {navTheme === 'transformation' && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-royal-blue to-green transition-all duration-150"
              style={{ width: `${transformationProgress * 100}%` }}
            />
          </div>
        )}

        <div className="relative mx-auto h-full w-full max-w-[90rem] px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid h-full grid-cols-[auto_1fr_auto] items-center gap-4 lg:gap-8">
            {/* Logo — full-color asset on light tile (matches footer treatment) */}
            <Link
              href="/"
              aria-label="HyperCode Home"
              className="group relative flex shrink-0 items-center self-center rounded-[14px] outline-none transition-[transform,box-shadow] duration-200 ease-out focus-visible:ring-2 focus-visible:ring-royal-blue focus-visible:ring-offset-2"
            >
              <span className="flex h-[62px] w-[88px] items-center justify-center rounded-[14px] border border-slate-200/55 bg-[#F8FAFC] p-2 shadow-[0_1px_3px_rgba(15,23,42,0.08)] transition-[transform,box-shadow] duration-200 ease-out group-hover:-translate-y-px group-hover:shadow-[0_4px_12px_rgba(15,23,42,0.12)] sm:h-[70px] sm:w-[100px] sm:p-2.5 lg:h-[78px] lg:w-[112px] lg:p-3 xl:h-[80px] xl:w-[118px]">
                <Image
                  src="/hypercodeit.logo.png"
                  alt="HyperCode"
                  width={417}
                  height={368}
                  priority
                  quality={100}
                  sizes="(max-width: 639px) 72px, (max-width: 1023px) 84px, 112px"
                  className="h-full w-full object-contain"
                />
              </span>
            </Link>

            {/* Center — desktop navigation */}
            <div className="hidden min-w-0 items-center justify-center gap-2 lg:flex lg:gap-3 xl:gap-5 self-center">
              {/* What We Do mega menu */}
              <div
                ref={solutionsRef}
                className="relative flex h-full items-center"
                onMouseEnter={openSolutions}
                onMouseLeave={closeSolutionsWithDelay}
                onBlur={(event) => {
                  const related = event.relatedTarget as Node | null;
                  if (
                    related &&
                    (event.currentTarget.contains(related) || solutionsMenuRef.current?.contains(related))
                  ) {
                    return;
                  }
                  setIsSolutionsOpen(false);
                }}
              >
                <Link
                  ref={solutionsTriggerRef}
                  href="/solutions"
                  className={`${getLinkClass('/solutions')} group gap-1`}
                  aria-current={isActive('/solutions') ? 'page' : undefined}
                  aria-haspopup="menu"
                  aria-expanded={isSolutionsOpen}
                  aria-controls="solutions-mega-menu"
                  onFocus={openSolutions}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !isSolutionsOpen) {
                      event.preventDefault();
                      openSolutions();
                    }
                  }}
                >
                  <span className="relative flex items-center gap-1 py-1">
                    {t('solutions')}
                    <ChevronDown
                      size={12}
                      className={`opacity-70 transition-transform duration-150 ${isSolutionsOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                    <span className={underlineClass('/solutions')} aria-hidden="true" />
                  </span>
                </Link>

              </div>

              {MAIN_NAV_LINKS.map(({ href, labelKey }) => (
                <Link key={href} href={href} className={`${getLinkClass(href)} group`} aria-current={isActive(href) ? 'page' : undefined}>
                  <span className="relative py-1">
                    {t(labelKey)}
                    <span className={underlineClass(href)} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>

            {/* Right — desktop actions */}
            <div className="hidden shrink-0 items-center gap-3 self-center lg:flex lg:gap-4">
              <div
                className="flex items-center gap-0.5"
                role="group"
                aria-label={t('selectLanguage')}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleLanguageChange(lang.code)}
                    aria-current={locale === lang.code ? 'true' : undefined}
                    aria-label={lang.name}
                    className={langToggleClass(lang.code)}
                  >
                    {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>

              <Link
                href="/consultation"
                className="nav-cta-solid group inline-flex h-10 items-center gap-1.5 rounded-lg bg-[#145BFF] px-4 text-[0.8125rem] font-semibold text-white hover:bg-[#1a65ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue focus-visible:ring-offset-2"
              >
                {t('schedule')}
                <ArrowRight
                  size={14}
                  className="brand-button-icon-motion group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/* Mobile header actions */}
            <div className="flex items-center justify-end gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileLangOpen(true)}
                aria-label={t('selectLanguage')}
                className={`min-h-[44px] min-w-[44px] rounded-lg border px-3 text-[0.8125rem] font-semibold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue ${
                  isDarkTheme
                    ? 'border-white/15 text-white hover:bg-white/5'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {locale.toUpperCase()}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                aria-label={isOpen ? t('closeMenu') : t('openMenu')}
                className={`flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue ${
                  isDarkTheme ? 'text-white hover:bg-white/10' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* What We Do mega menu — container-centered to prevent viewport clipping */}
          <AnimatePresence>
            {isSolutionsOpen && (
              <div
                ref={solutionsMenuRef}
                className="absolute left-1/2 top-full z-[70] w-[min(1080px,calc(100vw-40px))] max-w-full -translate-x-1/2 pt-1.5"
                onMouseEnter={openSolutions}
                onMouseLeave={closeSolutionsWithDelay}
              >
                <motion.div
                  id="solutions-mega-menu"
                  role="menu"
                  aria-label={t('serviceCategories')}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 2 }}
                  transition={{ duration: 0.14 }}
                  className="overflow-hidden rounded-lg border border-slate-200/90 bg-white shadow-[0_4px_24px_-8px_rgba(8,22,45,0.14)]"
                >
                  <div className="flex max-h-[calc(100vh-80px-20px)] sm:max-h-[calc(100vh-84px-20px)] lg:max-h-[calc(100vh-88px-20px)]">
                    <div className="min-h-0 min-w-0 flex-1 overflow-y-auto custom-menu-scrollbar">
                      <div className="grid grid-cols-3 items-start gap-x-6 px-5 py-3.5">
                        {solutionMenuColumns.map((column, columnIndex) => (
                          <div key={columnIndex} className="flex flex-col gap-2.5">
                            {column.map((category) => {
                              const CategoryIcon = CATEGORY_ICONS[category.label.en] ?? Code2;
                              return (
                                <div key={category.label.en}>
                                  <p className="mb-1 flex items-center gap-1.5 border-b border-slate-100 pb-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                                    <CategoryIcon
                                      size={13}
                                      strokeWidth={2}
                                      aria-hidden="true"
                                      className="shrink-0 text-royal-blue/75"
                                    />
                                    {category.label[locale === 'es' ? 'es' : 'en']}
                                  </p>
                                  <ul className="space-y-0" role="none">
                                    {category.services.map((service) => {
                                      const href = service.href || `/solutions/${service.slug}`;
                                      const active = isServiceLinkActive(pathname, service);
                                      const isPopular = MEGA_MENU_POPULAR_SLUGS.has(service.slug);
                                      return (
                                        <li key={service.slug} role="none">
                                          <Link
                                            role="menuitem"
                                            href={href}
                                            onClick={() => setIsSolutionsOpen(false)}
                                            aria-current={active ? 'page' : undefined}
                                            className={`group -mx-1.5 flex items-center gap-1.5 rounded-md px-1.5 py-[0.3125rem] text-[0.875rem] font-medium leading-snug transition-[color,background-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue focus-visible:ring-offset-1 ${
                                              active
                                                ? 'bg-royal-blue/[0.06] font-semibold text-royal-blue'
                                                : 'text-slate-700 hover:bg-slate-50 hover:text-royal-blue'
                                            }`}
                                          >
                                            <span className="min-w-0 flex-1">{getServiceLabel(service, locale)}</span>
                                            {isPopular && (
                                              <span className="shrink-0 rounded bg-royal-blue/10 px-1 py-px text-[0.5625rem] font-semibold uppercase tracking-[0.06em] text-royal-blue">
                                                {locale === 'es' ? 'Top' : 'Popular'}
                                              </span>
                                            )}
                                            <ArrowRight
                                              size={12}
                                              aria-hidden="true"
                                              className={`shrink-0 opacity-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:translate-x-0.5 group-focus-visible:opacity-100 ${
                                                active ? 'opacity-70' : 'text-royal-blue'
                                              }`}
                                            />
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>

                    <aside className="flex w-[11.5rem] shrink-0 flex-col border-l border-slate-100 px-4 py-3.5 xl:w-[12.5rem]">
                      <p className="text-[0.8125rem] leading-snug text-slate-500">
                        {tSolutions('sidebarSubtitle')}
                      </p>

                      <div className="mt-3 rounded-md border border-slate-100/80 bg-slate-50/90 p-2.5">
                        <p className="mb-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-slate-400">
                          {locale === 'es' ? 'Destacados' : 'Featured'}
                        </p>
                        <ul className="space-y-0.5" role="none">
                          {megaMenuFeaturedServices.map((service) => {
                            const href = service.href || `/solutions/${service.slug}`;
                            const active = isServiceLinkActive(pathname, service);
                            return (
                              <li key={service.slug} role="none">
                                <Link
                                  role="menuitem"
                                  href={href}
                                  onClick={() => setIsSolutionsOpen(false)}
                                  aria-current={active ? 'page' : undefined}
                                  className={`block rounded px-1.5 py-1 text-[0.8125rem] font-medium leading-snug transition-[color,background-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue focus-visible:ring-offset-1 ${
                                    active
                                      ? 'bg-white font-semibold text-royal-blue shadow-sm'
                                      : 'text-slate-700 hover:bg-white/80 hover:text-royal-blue'
                                  }`}
                                >
                                  {getServiceLabel(service, locale)}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      <Link
                        href="/solutions"
                        onClick={() => setIsSolutionsOpen(false)}
                        className="group mt-4 inline-flex items-center gap-1 text-[0.875rem] font-semibold text-royal-blue transition-colors hover:text-royal-blue/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue focus-visible:ring-offset-1"
                      >
                        {t('viewAllSolutions')}
                        <ArrowRight
                          size={14}
                          aria-hidden="true"
                          className="transition-transform duration-150 group-hover:translate-x-0.5"
                        />
                      </Link>
                    </aside>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label={t('closeMenu')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-[2px] lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              id="mobile-navigation"
              ref={mobileMenuRef}
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-2xl lg:hidden"
              style={{ top: 0, paddingTop: `${NAV_HEIGHT_MOBILE_PX}px` }}
            >
              <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-8 pt-2">
                {/* What We Do accordion */}
                <div className="border-b border-slate-100">
                  <div className="flex items-center">
                    <Link
                      href="/solutions"
                      onClick={() => setIsOpen(false)}
                      className={`flex-1 py-3.5 text-[0.9375rem] font-semibold ${
                        isActive('/solutions') ? 'text-royal-blue' : 'text-slate-900'
                      }`}
                      aria-current={isActive('/solutions') ? 'page' : undefined}
                    >
                      {t('solutions')}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsMobileSolutionsOpen((open) => !open)}
                      aria-expanded={isMobileSolutionsOpen}
                      aria-controls="mobile-solutions-categories"
                      aria-label={t('showServiceCategories')}
                      className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-slate-500 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue"
                    >
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-150 ${isMobileSolutionsOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  <AnimatePresence initial={false}>
                    {isMobileSolutionsOpen && (
                      <motion.div
                        id="mobile-solutions-categories"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-1 pb-3 pl-1">
                          {solutionMenu.map((category, index) => {
                            const isCategoryOpen = mobileSolutionCategory === index;
                            return (
                              <div key={category.label.en}>
                                <button
                                  type="button"
                                  onClick={() => setMobileSolutionCategory(isCategoryOpen ? null : index)}
                                  aria-expanded={isCategoryOpen}
                                  aria-controls={`mobile-solution-category-${index}`}
                                  className={`flex w-full min-h-[44px] items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-[0.875rem] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-royal-blue ${
                                    isCategoryOpen ? 'bg-royal-blue/5 text-royal-blue' : 'text-slate-700'
                                  }`}
                                >
                                  <span className="min-w-0 flex-1">{category.label[locale === 'es' ? 'es' : 'en']}</span>
                                  <ChevronDown
                                    size={16}
                                    className={`shrink-0 transition-transform duration-150 ${isCategoryOpen ? 'rotate-180' : ''}`}
                                    aria-hidden="true"
                                  />
                                </button>
                                <AnimatePresence initial={false}>
                                  {isCategoryOpen && (
                                    <motion.div
                                      id={`mobile-solution-category-${index}`}
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.18 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="space-y-0.5 pb-2 pl-3">
                                        {category.services.map((service) => (
                                          <Link
                                            key={service.slug}
                                            href={service.href || `/solutions/${service.slug}`}
                                            onClick={() => setIsOpen(false)}
                                            className="block min-h-[44px] rounded-lg px-3 py-2.5 text-[0.875rem] font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-royal-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue"
                                          >
                                            {getServiceLabel(service, locale)}
                                          </Link>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                          <Link
                            href="/solutions"
                            onClick={() => setIsOpen(false)}
                            className="mt-1 block min-h-[44px] px-3 py-2.5 text-[0.875rem] font-semibold text-royal-blue"
                          >
                            {t('viewAllSolutions')}
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {MAIN_NAV_LINKS.map(({ href, labelKey }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`block min-h-[44px] border-b border-slate-100 py-3.5 text-[0.9375rem] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-royal-blue ${
                      isActive(href) ? 'text-royal-blue' : 'text-slate-900 hover:text-royal-blue'
                    }`}
                    aria-current={isActive(href) ? 'page' : undefined}
                  >
                    {t(labelKey)}
                  </Link>
                ))}

                {/* Language */}
                <div className="border-b border-slate-100 py-4">
                  <p className="mb-2 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-slate-500">
                    {t('language')}
                  </p>
                  <div className="flex gap-2" role="group" aria-label={t('selectLanguage')}>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => handleLanguageChange(lang.code)}
                        aria-current={locale === lang.code ? 'true' : undefined}
                        className={`min-h-[44px] flex-1 rounded-lg border text-[0.875rem] font-semibold uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue ${
                          locale === lang.code
                            ? 'border-royal-blue bg-royal-blue/5 text-royal-blue'
                            : 'border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {lang.code.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-5">
                  <BrandButton
                    href="/consultation"
                    variant="primary"
                    className="flex w-full items-center justify-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('schedule')}
                  </BrandButton>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile language overlay */}
      {isMobileLangOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-sm lg:hidden">
          <div
            className="w-full max-w-xs space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-xl"
            role="dialog"
            aria-label={t('selectLanguage')}
          >
            <h3 className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-slate-500">
              {t('selectLanguage')}
            </h3>
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full rounded-lg border px-4 py-3 text-left text-[0.875rem] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue ${
                    locale === lang.code
                      ? 'border-royal-blue bg-royal-blue text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIsMobileLangOpen(false)}
              className="w-full cursor-pointer border-none bg-transparent pt-1 text-center text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-slate-500 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue rounded-sm"
            >
              {t('close')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
