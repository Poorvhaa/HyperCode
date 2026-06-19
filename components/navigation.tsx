'use client';

import Image from "next/image";
import { useState, useEffect } from 'react';
import { usePathname, useRouter, Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  BarChart3,
  TrendingUp,
  Database,
  Cpu,
  Globe,
  FileText,
  Layers,
  Lightbulb,
  Users,
  UserCheck,
  Clock,
  ShieldCheck,
  Home,
  Mail,
  Cloud
} from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' }
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Navigation');
  const tc = useTranslations('Common');

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = (code: string) => {
    localStorage.setItem('NEXT_LOCALE', code);
    router.replace(pathname, { locale: code });
    setIsLangOpen(false);
    setIsMobileLangOpen(false);
  };

  const megaMenuData = {
    dataAnalytics: {
      title: t('dataAnalytics'),
      items: [
        {
          title: t('businessIntelligence'),
          desc: t('dataAnalyticsDesc'),
          href: '/solutions/business-intelligence-consulting',
          icon: BarChart3,
        },
        {
          title: t('predictiveAnalytics'),
          desc: t('predictiveAnalyticsDesc'),
          href: '/solutions/data-analytics-services',
          icon: TrendingUp,
        },
        {
          title: t('dataWarehousing'),
          desc: t('dataWarehousingDesc'),
          href: '/solutions/data-warehousing-services',
          icon: Database,
        },
        {
          title: t('dataEngineering'),
          desc: t('dataEngineeringDesc'),
          href: '/solutions/data-engineering-solutions',
          icon: Cpu,
        },
      ],
    },
    digitalSolutions: {
      title: t('digitalSolutions'),
      items: [
        {
          title: t('webDevelopment'),
          desc: t('webDevelopmentDesc'),
          href: '/solutions/web-development-services',
          icon: Globe,
        },
        {
          title: t('customApplications'),
          desc: t('customApplicationsDesc'),
          href: '/solutions/web-development-services#custom-applications',
          icon: Layers,
        },
        {
          title: t('apiIntegrations'),
          desc: t('apiIntegrationsDesc'),
          href: '/solutions/web-development-services#api-integrations',
          icon: Cpu,
        },
        {
          title: t('cloudApplications'),
          desc: t('cloudApplicationsDesc'),
          href: '/solutions/web-development-services#cloud-applications',
          icon: Cloud,
        },
      ],
    },
    consulting: {
      title: t('consultingServices'),
      items: [
        {
          title: t('businessAnalysis'),
          desc: t('businessAnalysisDesc'),
          href: '/solutions#business-analysis',
          icon: FileText,
        },
        {
          title: t('technologyConsulting'),
          desc: t('technologyConsultingDesc'),
          href: '/solutions#technology-consulting',
          icon: Lightbulb,
        },
        {
          title: t('agileProject'),
          desc: t('agileProjectDesc'),
          href: '/solutions#agile-project-management',
          icon: Layers,
        },
      ],
    },
    staffing: {
      title: t('staffingSolutions'),
      items: [
        {
          title: t('itStaffing'),
          desc: t('itStaffingDesc'),
          href: '/solutions/it-staffing-solutions',
          icon: Users,
        },
        {
          title: t('staffAugmentation'),
          desc: t('staffAugmentationDesc'),
          href: '/solutions/staff-augmentation-services',
          icon: UserCheck,
        },
        {
          title: t('contractStaffing'),
          desc: t('contractStaffingDesc'),
          href: '/staffing#contract-staffing',
          icon: Clock,
        },
        {
          title: t('directPlacement'),
          desc: t('directPlacementDesc'),
          href: '/staffing#direct-placement',
          icon: ShieldCheck,
        },
      ],
    },
  };

  const activeLangName = languages.find((lang) => lang.code === locale)?.name || 'English';

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ease-in-out bg-white border-b border-slate-100 ${
          isScrolled ? 'shadow-sm' : 'shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full w-full">
            <div className="flex items-center h-full gap-8 xl:gap-12">
              <Link href="/" className="flex items-center flex-shrink-0">
                <Image
                  src="/logo.jpg"
                  alt="HyperCode"
                  width={320}
                  height={40}
                  priority
                  className="h-15 w-auto object-contain"
                />
              </Link>

              {/* Center: Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-6 h-full rtl:space-x-reverse">
                <Link
                  href="/"
                  className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}
                >
                  {t('home')}
                </Link>

                {/* Solutions Mega Menu Trigger */}
                <div
                  className="h-full flex items-center"
                  onMouseEnter={() => setIsMegaMenuOpen(true)}
                  onMouseLeave={() => setIsMegaMenuOpen(false)}
                >
                  <button className={`flex items-center gap-1.5 nav-link ${isActive('/solutions') ? 'nav-link-active' : ''} cursor-pointer bg-transparent border-none`}>
                    <span>{t('solutions')}</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''} text-slate-500`}
                    />
                  </button>

                  <AnimatePresence>
                    {isMegaMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4 sm:px-6 lg:px-8 z-50 pointer-events-auto"
                      >
                        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8 grid grid-cols-4 gap-6 text-left">
                          {/* Column 1: Data & Analytics */}
                          <div>
                            <h3 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">
                              {megaMenuData.dataAnalytics.title}
                            </h3>
                            <div className="space-y-1">
                              {megaMenuData.dataAnalytics.items.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                  <Link
                                    key={idx}
                                    href={item.href}
                                    className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                                  >
                                    <div className="p-2 bg-slate-50 rounded-lg text-slate-500 group-hover:bg-[#0F4C81]/10 group-hover:text-[#0F4C81] transition-colors flex-shrink-0">
                                      <Icon size={16} />
                                    </div>
                                    <div>
                                      <div className="text-sm font-semibold text-slate-800 group-hover:text-[#0F4C81] transition-colors">
                                        {item.title}
                                      </div>
                                      <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                                        {item.desc}
                                      </div>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>

                          {/* Column 2: Digital Solutions */}
                          <div>
                            <h3 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">
                              {megaMenuData.digitalSolutions.title}
                            </h3>
                            <div className="space-y-1">
                              {megaMenuData.digitalSolutions.items.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                  <Link
                                    key={idx}
                                    href={item.href}
                                    className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                                  >
                                    <div className="p-2 bg-slate-50 rounded-lg text-slate-500 group-hover:bg-[#0F4C81]/10 group-hover:text-[#0F4C81] transition-colors flex-shrink-0">
                                      <Icon size={16} />
                                    </div>
                                    <div>
                                      <div className="text-sm font-semibold text-slate-800 group-hover:text-[#0F4C81] transition-colors">
                                        {item.title}
                                      </div>
                                      <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                                        {item.desc}
                                      </div>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>

                          {/* Column 3: Consulting Services */}
                          <div>
                            <h3 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">
                              {megaMenuData.consulting.title}
                            </h3>
                            <div className="space-y-1">
                              {megaMenuData.consulting.items.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                  <Link
                                    key={idx}
                                    href={item.href}
                                    className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                                  >
                                    <div className="p-2 bg-slate-50 rounded-lg text-slate-500 group-hover:bg-[#0F4C81]/10 group-hover:text-[#0F4C81] transition-colors flex-shrink-0">
                                      <Icon size={16} />
                                    </div>
                                    <div>
                                      <div className="text-sm font-semibold text-slate-800 group-hover:text-[#0F4C81] transition-colors">
                                        {item.title}
                                      </div>
                                      <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                                        {item.desc}
                                      </div>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>

                          {/* Column 4: Staffing Solutions */}
                          <div>
                            <h3 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">
                              {megaMenuData.staffing.title}
                            </h3>
                            <div className="space-y-1">
                              {megaMenuData.staffing.items.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                  <Link
                                    key={idx}
                                    href={item.href}
                                    className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                                  >
                                    <div className="p-2 bg-slate-50 rounded-lg text-slate-500 group-hover:bg-[#0F4C81]/10 group-hover:text-[#0F4C81] transition-colors flex-shrink-0">
                                      <Icon size={16} />
                                    </div>
                                    <div>
                                      <div className="text-sm font-semibold text-slate-800 group-hover:text-[#0F4C81] transition-colors">
                                        {item.title}
                                      </div>
                                      <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                                        {item.desc}
                                      </div>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href="/careers"
                  className={`nav-link ${isActive('/careers') ? 'nav-link-active' : ''}`}
                >
                  {t('careers')}
                </Link>

                <Link
                  href="/about"
                  className={`nav-link ${isActive('/about') ? 'nav-link-active' : ''}`}
                >
                  {t('about')}
                </Link>

                <Link
                  href="/contact"
                  className={`nav-link ${isActive('/contact') ? 'nav-link-active' : ''}`}
                >
                  {t('contact')}
                </Link>
              </div>
            </div>

            {/* Right: Desktop CTA & Language Switcher */}
            <div className="hidden lg:flex items-center gap-4 justify-end rtl:flex-row-reverse">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  onBlur={() => setTimeout(() => setIsLangOpen(false), 200)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer focus:outline-none"
                >
                  <Globe size={14} className="text-[#0F4C81]" />
                  <span>{activeLangName}</span>
                  <ChevronDown
                    size={12}
                    className={`text-slate-400 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-44 bg-white border border-slate-250 rounded-2xl shadow-xl z-50 overflow-hidden text-left"
                    >
                      <div className="py-1 max-h-64 overflow-y-auto">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onMouseDown={() => handleLanguageChange(lang.code)}
                            className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors hover:bg-slate-50 cursor-pointer ${
                              locale === lang.code ? 'text-[#0F4C81] bg-[#0F4C81]/5' : 'text-slate-700'
                            }`}
                          >
                            {lang.name}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/consultation"
                className="h-10 px-5 flex items-center justify-center bg-[#0F4C81] hover:bg-[#0A365D] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                {t('schedule')}
              </Link>
            </div>

            {/* Mobile Menu Button Trigger & Language Switcher */}
            <div className="lg:hidden flex items-center gap-3">
              {/* Simple Mobile Language selector icon */}
              <div className="relative">
                <button
                  onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
                  onBlur={() => setTimeout(() => setIsMobileLangOpen(false), 200)}
                  className="p-2 border border-slate-200 bg-white rounded-lg transition-colors cursor-pointer"
                >
                  <Globe size={18} className="text-[#0F4C81]" />
                </button>
                <AnimatePresence>
                  {isMobileLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden"
                    >
                      <div className="py-1 max-h-60 overflow-y-auto">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onMouseDown={() => handleLanguageChange(lang.code)}
                            className={`w-full text-left px-4 py-2 text-xs font-bold ${
                              locale === lang.code ? 'text-[#0F4C81] bg-[#0F4C81]/5' : 'text-slate-700'
                            }`}
                          >
                            {lang.name}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-slate-800 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer bg-transparent border-none"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Slide-in Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900 z-40 lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
              className="fixed top-0 right-0 bottom-0 w-[300px] sm:w-[350px] bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col justify-between lg:hidden overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100 flex-shrink-0">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#0F4C81] rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    HC
                  </div>
                  <span className="font-bold text-base text-slate-900">HyperCode</span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer bg-transparent border-none"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Navigation Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-3">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 py-2.5 text-[16px] font-semibold transition-colors border-b border-slate-55 ${isActive('/') ? 'text-[#0F4C81] border-l-2 border-[#0F4C81] pl-2' : 'text-slate-800 hover:text-[#0F4C81]'}`}
                >
                  <Home size={16} className={isActive('/') ? 'text-[#0F4C81]' : 'text-slate-400'} />
                  <span>{t('home')}</span>
                </Link>

                {/* Mobile solutions accordion */}
                <div>
                  <button
                    onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                    className={`flex items-center justify-between w-full py-2.5 text-[16px] font-semibold transition-colors border-b border-slate-50 cursor-pointer bg-transparent border-none ${isActive('/solutions') ? 'text-[#0F4C81] border-l-2 border-[#0F4C81] pl-2' : 'text-slate-800 hover:text-[#0F4C81]'}`}
                  >
                    <div className="flex items-center space-x-3">
                      <Database size={16} className={isActive('/solutions') ? 'text-[#0F4C81]' : 'text-slate-400'} />
                      <span>{t('solutions')}</span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        mobileSolutionsOpen ? 'rotate-180' : ''
                      } ${isActive('/solutions') ? 'text-[#0F4C81]' : 'text-slate-400'}`}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: mobileSolutionsOpen ? 'auto' : 0,
                      opacity: mobileSolutionsOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.15 }}
                    className="overflow-hidden bg-slate-50 rounded-xl mt-1.5 pl-4 pr-2"
                  >
                    <div className="py-2.5 space-y-3.5 text-left">
                      {/* Data & Analytics */}
                      <div className="space-y-1.5">
                        <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                          {megaMenuData.dataAnalytics.title}
                        </div>
                        <div className="space-y-1 pl-1">
                          {megaMenuData.dataAnalytics.items.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={idx}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-2 py-1.5 text-sm transition-colors ${isActive(item.href) ? 'text-[#0F4C81] font-semibold' : 'text-slate-600 hover:text-[#0F4C81]'}`}
                              >
                                <Icon size={14} className={isActive(item.href) ? 'text-[#0F4C81]' : 'text-slate-400 flex-shrink-0'} />
                                <span>{item.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* Digital Solutions */}
                      <div className="space-y-1.5">
                        <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                          {megaMenuData.digitalSolutions.title}
                        </div>
                        <div className="space-y-1 pl-1">
                          {megaMenuData.digitalSolutions.items.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={idx}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-2 py-1.5 text-sm transition-colors ${isActive(item.href) ? 'text-[#0F4C81] font-semibold' : 'text-slate-600 hover:text-[#0F4C81]'}`}
                              >
                                <Icon size={14} className={isActive(item.href) ? 'text-[#0F4C81]' : 'text-slate-400 flex-shrink-0'} />
                                <span>{item.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* Consulting Services */}
                      <div className="space-y-1.5">
                        <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                          {megaMenuData.consulting.title}
                        </div>
                        <div className="space-y-1 pl-1">
                          {megaMenuData.consulting.items.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={idx}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-2 py-1.5 text-sm transition-colors ${isActive(item.href) ? 'text-[#0F4C81] font-semibold' : 'text-slate-600 hover:text-[#0F4C81]'}`}
                              >
                                <Icon size={14} className={isActive(item.href) ? 'text-[#0F4C81]' : 'text-slate-400 flex-shrink-0'} />
                                <span>{item.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* Staffing Solutions */}
                      <div className="space-y-1.5">
                        <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                          {megaMenuData.staffing.title}
                        </div>
                        <div className="space-y-1 pl-1">
                          {megaMenuData.staffing.items.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={idx}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-2 py-1.5 text-sm transition-colors ${isActive(item.href) ? 'text-[#0F4C81] font-semibold' : 'text-slate-600 hover:text-[#0F4C81]'}`}
                              >
                                <Icon size={14} className={isActive(item.href) ? 'text-[#0F4C81]' : 'text-slate-400 flex-shrink-0'} />
                                <span>{item.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <Link
                  href="/careers"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 py-2.5 text-[16px] font-semibold transition-colors border-b border-slate-50 ${isActive('/careers') ? 'text-[#0F4C81] border-l-2 border-[#0F4C81] pl-2' : 'text-slate-800 hover:text-[#0F4C81]'}`}
                >
                  <Users size={16} className={isActive('/careers') ? 'text-[#0F4C81]' : 'text-slate-400'} />
                  <span>{t('careers')}</span>
                </Link>

                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 py-2.5 text-[16px] font-semibold transition-colors border-b border-slate-50 ${isActive('/about') ? 'text-[#0F4C81] border-l-2 border-[#0F4C81] pl-2' : 'text-slate-800 hover:text-[#0F4C81]'}`}
                >
                  <FileText size={16} className={isActive('/about') ? 'text-[#0F4C81]' : 'text-slate-400'} />
                  <span>{t('about')}</span>
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 py-2.5 text-[16px] font-semibold transition-colors border-b border-slate-50 ${isActive('/contact') ? 'text-[#0F4C81] border-l-2 border-[#0F4C81] pl-2' : 'text-slate-800 hover:text-[#0F4C81]'}`}
                >
                  <Mail size={16} className={isActive('/contact') ? 'text-[#0F4C81]' : 'text-slate-400'} />
                  <span>{t('contact')}</span>
                </Link>
              </div>

              {/* Drawer Footer CTA */}
              <div className="p-6 border-t border-slate-100 bg-white flex-shrink-0">
                <Link
                  href="/consultation"
                  onClick={() => setIsOpen(false)}
                  className="w-full h-10 flex items-center justify-center bg-[#0F4C81] hover:bg-[#0A365D] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  {t('schedule')}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
