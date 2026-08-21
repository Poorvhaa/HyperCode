'use client';

import Image from "next/image";
import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { SERVICE_REGISTRY, ALIAS_MAP } from '@/lib/services-details';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Globe
} from 'lucide-react';
import { solutionMenu, type MenuCategory, type MenuService } from '@/lib/navigation-links';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' }
];

function getServiceLabel(service: MenuService, locale: string) {
  if (service.label) return service.label[locale === 'es' ? 'es' : 'en'];
  const registrySlug = ALIAS_MAP[service.slug] || service.slug;
  const registryService = SERVICE_REGISTRY[registrySlug];
  return registryService
    ? registryService[locale === 'es' ? 'esName' : 'enName']
    : service.slug;
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [activeSolutionCategory, setActiveSolutionCategory] = useState(0);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const [mobileSolutionCategory, setMobileSolutionCategory] = useState<number | null>(0);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const solutionsTriggerRef = useRef<HTMLAnchorElement>(null);
  const solutionsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Redesign scroll theme states
  const [navTheme, setNavTheme] = useState<'hero' | 'light' | 'transformation' | 'final-cta'>('light');
  const [transformationProgress, setTransformationProgress] = useState(0);

  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Navigation');
  const tc = useTranslations('Common');
  
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    if (href === '/solutions') {
      return pathname === '/solutions' || pathname.startsWith('/solutions/');
    }
    return pathname.startsWith(href);
  };

  const isDarkTheme = false;

  const getLinkClass = (href: string) => {
    const base = "text-button transition-all duration-200 relative py-2 cursor-pointer bg-transparent border-none outline-none flex items-center h-full hover:text-royal-blue";
    let textColor = 'text-slate-700';

    if (isDarkTheme) {
      textColor = isActive(href) ? 'text-white font-bold' : 'text-[#A9B8D1] hover:text-white';
    } else {
      textColor = isActive(href) ? 'text-royal-blue font-bold' : 'text-slate-750';
    }

    return `${base} ${textColor}`;
  };

  const getLangButtonClass = () => {
    if (isDarkTheme) {
      return "flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/10 text-body-sm font-semibold transition-all duration-200 cursor-pointer text-white hover:bg-white/5 bg-transparent shadow-sm";
    }
    return "flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-body-sm font-semibold transition-all duration-200 cursor-pointer text-slate-700 hover:bg-slate-50 bg-white shadow-sm";
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.theme) {
        setNavTheme(customEvent.detail.theme);
      }
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
    const handlePointerDown = (event: PointerEvent) => {
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setIsSolutionsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isSolutionsOpen) {
        setIsSolutionsOpen(false);
        solutionsTriggerRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      if (solutionsCloseTimer.current) clearTimeout(solutionsCloseTimer.current);
    };
  }, [isSolutionsOpen]);

  const openSolutions = () => {
    if (solutionsCloseTimer.current) clearTimeout(solutionsCloseTimer.current);
    setIsSolutionsOpen(true);
  };

  const closeSolutionsWithDelay = () => {
    if (solutionsCloseTimer.current) clearTimeout(solutionsCloseTimer.current);
    solutionsCloseTimer.current = setTimeout(() => setIsSolutionsOpen(false), 160);
  };

  const handleLanguageChange = (code: string) => {
    localStorage.setItem('NEXT_LOCALE', code);
    router.replace(pathname, { locale: code });
    setIsLangOpen(false);
    setIsMobileLangOpen(false);
  };

  const activeLangName = languages.find((lang) => lang.code === locale)?.name || 'English';

  const getNavClasses = () => {
    const baseHeight = isScrolled ? 'h-20 lg:h-[88px]' : 'h-20 lg:h-[120px]';
    return `bg-white/95 backdrop-blur-md text-slate-700 border-b border-slate-200/60 shadow-sm ${baseHeight}`;
  };

  return (
    <>
      <motion.nav
        className={`fixed z-50 transition-all duration-300 ease-in-out top-0 left-0 right-0 w-full ${getNavClasses()}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Active progress indicator for transformation stages */}
        {navTheme === 'transformation' && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800 pointer-events-none">
            <div
              className="h-full bg-gradient-to-r from-royal-blue to-green transition-all duration-150"
              style={{ width: `${transformationProgress * 100}%` }}
            />
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative">
          <div className="flex items-center justify-between h-full w-full">
            <div className="flex items-center h-full">
              <Link href="/" className="flex items-center flex-shrink-0">
                <Image
                  src="/hypercodeit.logo.webp"
                  alt="HyperCode"
                  width={115}
                  height={80}
                  priority
                  quality={100}
                  style={{ height: 'auto' }}
                  className={`object-contain transition-all duration-300 ${
                    isScrolled 
                      ? 'w-[92px] sm:w-[100px] lg:w-[112px]' 
                      : 'w-[102px] sm:w-[118px] lg:w-[135px]'
                  } ${
                    isDarkTheme ? 'brightness-0 invert' : ''
                  }`}
                />
              </Link>
            </div>

            {/* Center Navigation Links */}
            <div className="hidden lg:flex items-center justify-center space-x-8 h-full rtl:space-x-reverse flex-1">
              <Link href="/" className={`${getLinkClass('/')} group`}>
                <span className="relative py-1">
                  {t('home')}
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-royal-blue to-green transform transition-transform duration-300 origin-left ${
                    isActive('/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </span>
              </Link>

              {/* Solutions two-level mega menu */}
              <div
                ref={solutionsRef}
                className="h-full flex items-center"
                onMouseEnter={openSolutions}
                onMouseLeave={closeSolutionsWithDelay}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                    setIsSolutionsOpen(false);
                  }
                }}
              >
                <Link
                  ref={solutionsTriggerRef}
                  href="/solutions"
                  className={`${getLinkClass('/solutions')} group`}
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
                  <span className="relative py-1 flex items-center gap-1">
                    <span>{tc('solutions')}</span>
                    <ChevronDown size={13} className={`transition-transform duration-150 ${isSolutionsOpen ? 'rotate-180' : ''}`} />
                    <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-royal-blue to-green transform transition-transform duration-300 origin-left ${
                      isActive('/solutions') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
                  </span>
                </Link>

                <AnimatePresence>
                  {isSolutionsOpen && (
                    <motion.div
                      id="solutions-mega-menu"
                      aria-label={locale === 'es' ? 'Categorías de servicios' : 'Service categories'}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.14 }}
                      className="absolute top-[calc(100%-12px)] left-1/2 -translate-x-1/2 w-[calc(100vw-32px)] max-w-[1100px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl z-[70]"
                      onMouseEnter={openSolutions}
                    >
                      <div className="grid grid-cols-[31%_69%] max-h-[calc(100vh-112px)]">
                        <div className="border-r border-slate-200 bg-slate-50 p-2.5 overflow-y-auto">
                          <div className="px-3 py-2 text-eyebrow text-slate-500">
                            {locale === 'es' ? 'Categorías' : 'Categories'}
                          </div>
                          <div className="flex flex-col space-y-0.5">
                            {solutionMenu.map((category, index) => (
                              <button
                                key={category.label.en}
                                type="button"
                                onMouseEnter={() => setActiveSolutionCategory(index)}
                                onFocus={() => setActiveSolutionCategory(index)}
                                onClick={() => setActiveSolutionCategory(index)}
                                className={`w-full rounded-xl px-3 py-1.5 text-left text-body-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue focus-visible:ring-inset whitespace-normal break-words ${
                                  activeSolutionCategory === index
                                    ? 'bg-royal-blue text-white'
                                    : 'text-slate-700 hover:bg-white hover:text-royal-blue'
                                }`}
                              >
                                {category.label[locale === 'es' ? 'es' : 'en']}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="p-5 overflow-y-auto bg-white flex flex-col justify-between">
                          <div>
                            <div className="mb-3 border-b border-slate-100 pb-2">
                              <p className="text-eyebrow text-royal-blue">{tc('solutions')}</p>
                              <p className="mt-0.5 text-h4 text-slate-900">
                                {solutionMenu[activeSolutionCategory].label[locale === 'es' ? 'es' : 'en']}
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                              {solutionMenu[activeSolutionCategory].services.map((service) => (
                                <Link
                                  key={service.slug}
                                  href={service.href || `/solutions/${service.slug}`}
                                  onClick={() => setIsSolutionsOpen(false)}
                                  className="rounded-xl border border-transparent px-3 py-1.5 text-body-sm font-semibold text-slate-700 transition-colors hover:border-royal-blue/20 hover:bg-royal-blue/5 hover:text-royal-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue"
                                >
                                  {getServiceLabel(service, locale)}
                                </Link>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4">
                            <Link
                              href="/solutions"
                              onClick={() => setIsSolutionsOpen(false)}
                              className="inline-flex rounded-lg px-2 py-1.5 text-body-sm font-bold text-royal-blue hover:bg-royal-blue/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue"
                            >
                              {locale === 'es' ? 'Ver todos los servicios' : 'View all services'}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/about" className={`${getLinkClass('/about')} group`}>
                <span className="relative py-1">
                  {t('about')}
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-royal-blue to-green transform transition-transform duration-300 origin-left ${
                    isActive('/about') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </span>
              </Link>

              <Link href="/careers" className={`${getLinkClass('/careers')} group`}>
                <span className="relative py-1">
                  {t('careers')}
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-royal-blue to-green transform transition-transform duration-300 origin-left ${
                    isActive('/careers') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </span>
              </Link>

              <Link href="/contact" className={`${getLinkClass('/contact')} group`}>
                <span className="relative py-1">
                  {t('contact')}
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-royal-blue to-green transform transition-transform duration-300 origin-left ${
                    isActive('/contact') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </span>
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className={getLangButtonClass()}
                >
                  <Globe size={13} className="text-slate-600" />
                  <span>{activeLangName}</span>
                  <ChevronDown size={11} className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-36 bg-white border border-slate-200 rounded-2xl shadow-xl py-1.5 z-50 overflow-hidden"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`w-full text-left px-4 py-2.5 text-body-sm font-semibold hover:bg-slate-50 cursor-pointer transition-colors ${
                            locale === lang.code ? 'text-royal-blue' : 'text-slate-700'
                          }`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Schedule Consultation highlighted CTA */}
              <Link
                href="/consultation"
                className="PrimaryBrandButton flex items-center justify-center gap-2"
              >
                <span>{t('schedule') || 'Schedule Consultation'}</span>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
                aria-expanded={isMobileLangOpen}
                aria-label="Toggle language menu"
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-body-sm font-semibold text-slate-700 bg-white"
              >
                {locale.toUpperCase()}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label={isOpen ? t('closeMenu') : t('openMenu')}
                aria-controls="mobile-navigation"
                className="p-2 rounded-xl text-slate-605 hover:bg-slate-50"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-slate-200 bg-white overflow-hidden shadow-xl absolute top-20 left-0 right-0 z-55 max-h-[calc(100vh-80px)] overflow-y-auto"
            >
              <div className="px-4 pt-2 pb-6 space-y-3">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 text-body font-bold text-slate-800 hover:bg-slate-50 rounded-xl"
                >
                  {t('home')}
                </Link>

                {/* Mobile Solutions accordion */}
                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <div className={`flex items-center ${isActive('/solutions') ? 'bg-royal-blue/5' : 'bg-white'}`}>
                    <Link
                      href="/solutions"
                      onClick={() => setIsOpen(false)}
                      className={`flex-1 px-3 py-2.5 text-body font-bold ${
                        isActive('/solutions') ? 'text-royal-blue' : 'text-slate-800'
                      }`}
                      aria-current={isActive('/solutions') ? 'page' : undefined}
                    >
                      {tc('solutions')}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsMobileSolutionsOpen((open) => !open)}
                      aria-expanded={isMobileSolutionsOpen}
                      aria-controls="mobile-solutions-categories"
                      aria-label={locale === 'es' ? 'Mostrar categorías de servicios' : 'Show service categories'}
                      className="m-1 rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue"
                    >
                      <ChevronDown size={18} className={`transition-transform duration-150 ${isMobileSolutionsOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {isMobileSolutionsOpen && (
                    <div id="mobile-solutions-categories" className="border-t border-slate-200 bg-slate-50 p-2 space-y-1">
                      {solutionMenu.map((category, index) => {
                        const isCategoryOpen = mobileSolutionCategory === index;
                        return (
                          <div key={category.label.en} className="rounded-lg bg-white border border-slate-200 overflow-hidden">
                            <button
                              type="button"
                              onClick={() => setMobileSolutionCategory(isCategoryOpen ? null : index)}
                              aria-expanded={isCategoryOpen}
                              aria-controls={`mobile-solution-category-${index}`}
                              className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 text-left text-body-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-royal-blue ${
                                isCategoryOpen ? 'text-royal-blue bg-royal-blue/5' : 'text-slate-700'
                              }`}
                            >
                              <span>{category.label[locale === 'es' ? 'es' : 'en']}</span>
                              <ChevronDown size={16} className={`flex-shrink-0 transition-transform duration-150 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isCategoryOpen && (
                              <div id={`mobile-solution-category-${index}`} className="border-t border-slate-100 px-2 py-1.5">
                                {category.services.map((service) => (
                                  <Link
                                    key={service.slug}
                                    href={service.href || `/solutions/${service.slug}`}
                                    onClick={() => setIsOpen(false)}
                                    className="block rounded-lg px-3 py-2.5 text-body-sm font-medium text-slate-655 hover:bg-royal-blue/5 hover:text-royal-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue"
                                  >
                                    {getServiceLabel(service, locale)}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 text-body font-bold text-slate-800 hover:bg-slate-50 rounded-xl"
                >
                  {t('about')}
                </Link>

                <Link
                  href="/careers"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 text-body font-bold text-slate-800 hover:bg-slate-50 rounded-xl"
                >
                  {t('careers')}
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 text-body font-bold text-slate-800 hover:bg-slate-50 rounded-xl"
                >
                  {t('contact')}
                </Link>

                {/* Mobile Consultation CTA */}
                <div className="pt-4 px-3">
                  <Link
                    href="/consultation"
                    onClick={() => setIsOpen(false)}
                    className="PrimaryBrandButton w-full flex items-center justify-center gap-2"
                  >
                    <span>{t('schedule') || 'Schedule Consultation'}</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Language Mobile Dropdown Panel Overlay */}
      {isMobileLangOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-xs shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-eyebrow text-slate-550">{locale === 'es' ? 'Seleccionar Idioma' : 'Select Language'}</h3>
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full py-3 px-4 rounded-2xl border text-body-sm font-bold text-left transition-all ${
                    locale === lang.code ? 'bg-royal-blue border-royal-blue text-white' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsMobileLangOpen(false)}
              className="w-full text-center text-eyebrow text-slate-500 hover:text-slate-700 pt-2 cursor-pointer bg-transparent border-none"
            >
              {locale === 'es' ? 'Cerrar' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
