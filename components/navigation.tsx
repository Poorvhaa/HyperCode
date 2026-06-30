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
  Sparkles,
  Cpu,
  Globe,
  Database,
  ShieldCheck,
  Layers,
  TrendingUp,
  Settings,
  Zap,
  Network,
  Users,
  Code,
  ShoppingCart,
  Lightbulb,
  Shuffle,
  Palette
} from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' }
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'solutions' | null>(null);
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

  const triggerOpenChat = () => {
    window.dispatchEvent(new CustomEvent('open-hypercode-chat'));
    setIsOpen(false);
  };

  // Grouped 13 service categories
  const solutionsMegaMenu = {
    consultingAI: {
      title: locale === 'es' ? 'Consultoría y Automatización de IA' : 'Consulting & AI Automation',
      items: [
        { title: t('aiAutomation'), href: '/solutions/business-intelligence-consulting#ai', desc: locale === 'es' ? 'Soluciones generativas de IA, RAG y agentes de voz.' : 'Generative AI, RAG, and voice agents.', icon: Sparkles },
        { title: t('techConsulting'), href: '/solutions/business-intelligence-consulting#cto', desc: locale === 'es' ? 'Estrategia de IA, CTO as a Service y arquitectura.' : 'AI strategy, CTO as a Service, and architecture.', icon: Cpu },
        { title: t('digitalTrans'), href: '/solutions/business-intelligence-consulting#digital', desc: locale === 'es' ? 'Optimización de procesos y transformación empresarial.' : 'Process optimization and digital shifts.', icon: Zap },
        { title: t('cybersecurity'), href: '/solutions/business-intelligence-consulting#security', desc: locale === 'es' ? 'Auditorías de cumplimiento, pruebas de penetración e IAM.' : 'Compliance audits, pentesting, and IAM.', icon: ShieldCheck }
      ]
    },
    engineering: {
      title: locale === 'es' ? 'Ingeniería de Software a Medida' : 'Custom Software Engineering',
      items: [
        { title: t('softwareDev'), href: '/solutions/web-development-services#software', desc: locale === 'es' ? 'SaaS, ERP, CRM y modernización de sistemas legados.' : 'SaaS, ERP, CRM, and legacy modernization.', icon: Layers },
        { title: t('webDev'), href: '/solutions/web-development-services', desc: locale === 'es' ? 'Portales corporativos y aplicaciones web de alto rendimiento.' : 'Corporate portals and high-performance web apps.', icon: Globe },
        { title: t('mobileDev'), href: '/solutions/web-development-services#mobile', desc: locale === 'es' ? 'Aplicaciones nativas e híbridas (iOS, Android, Flutter).' : 'Native and hybrid apps (iOS, Android, Flutter).', icon: Settings },
        { title: t('ecommerce'), href: '/solutions/web-development-services#ecommerce', desc: locale === 'es' ? 'Plataformas Shopify, WooCommerce y pasarelas de pago.' : 'Shopify, WooCommerce, and payment integrations.', icon: ShoppingCart },
        { title: t('uiUx'), href: '/solutions/web-development-services#design', desc: locale === 'es' ? 'Investigación de usuarios, prototipos y sistemas de diseño.' : 'User research, prototyping, and design systems.', icon: Palette }
      ]
    },
    dataTalent: {
      title: locale === 'es' ? 'Alianzas de Datos y Talento' : 'Data & Talent Partnerships',
      items: [
        { title: t('dataAnalytics'), href: '/solutions/data-analytics-services', desc: locale === 'es' ? 'Power BI, Tableau y almacenes de datos en la nube.' : 'Power BI, Tableau, and cloud data warehouses.', icon: Database },
        { title: t('cloudDevOps'), href: '/solutions/data-engineering-solutions#cloud', desc: locale === 'es' ? 'Migración a AWS/Azure, Docker, Kubernetes y CI/CD.' : 'AWS/Azure migration, Kubernetes, and CI/CD.', icon: Network },
        { title: t('talentSolutions'), href: '/solutions/it-staffing-solutions', desc: locale === 'es' ? 'Contratación permanente, temporal y aumento de personal.' : 'Permanent, contract, and staff augmentation.', icon: Users },
        { title: t('marketing'), href: '/solutions/web-development-services#marketing', desc: locale === 'es' ? 'SEO local, campañas de Google Ads y LinkedIn.' : 'Local SEO, Google Ads, and LinkedIn marketing.', icon: TrendingUp }
      ]
    }
  };

  const activeLangName = languages.find((lang) => lang.code === locale)?.name || 'English';

  const closeDropdowns = () => setActiveDropdown(null);

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

              {/* Center Navigation Links */}
              <div className="hidden lg:flex items-center space-x-8 h-full rtl:space-x-reverse">
                <Link
                  href="/"
                  className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}
                >
                  {t('home')}
                </Link>

                {/* Solutions Mega Menu Dropdown */}
                <div
                  className="h-full flex items-center relative"
                  onMouseEnter={() => setActiveDropdown('solutions')}
                  onMouseLeave={closeDropdowns}
                >
                  <button className={`flex items-center gap-1.5 nav-link ${isActive('/solutions') ? 'nav-link-active' : ''} cursor-pointer bg-transparent border-none`}>
                    <span>{tc('solutions')}</span>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === 'solutions' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4 sm:px-6 lg:px-8 z-50 pointer-events-auto"
                      >
                        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8 grid grid-cols-3 gap-8 text-left">
                          {/* Column 1 */}
                          <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{solutionsMegaMenu.consultingAI.title}</h3>
                            <div className="space-y-1">
                              {solutionsMegaMenu.consultingAI.items.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                  <Link key={idx} href={item.href} onClick={closeDropdowns} className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="p-2 bg-slate-50 rounded-lg text-slate-500 group-hover:bg-[#0F4C81]/10 group-hover:text-[#0F4C81] transition-colors"><Icon size={16} /></div>
                                    <div>
                                      <div className="text-sm font-semibold text-slate-800 group-hover:text-[#0F4C81] transition-colors">{item.title}</div>
                                      <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{item.desc}</div>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                          {/* Column 2 */}
                          <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{solutionsMegaMenu.engineering.title}</h3>
                            <div className="space-y-1">
                              {solutionsMegaMenu.engineering.items.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                  <Link key={idx} href={item.href} onClick={closeDropdowns} className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="p-2 bg-slate-50 rounded-lg text-slate-500 group-hover:bg-[#0F4C81]/10 group-hover:text-[#0F4C81] transition-colors"><Icon size={16} /></div>
                                    <div>
                                      <div className="text-sm font-semibold text-slate-800 group-hover:text-[#0F4C81] transition-colors">{item.title}</div>
                                      <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{item.desc}</div>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                          {/* Column 3 */}
                          <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{solutionsMegaMenu.dataTalent.title}</h3>
                            <div className="space-y-1">
                              {solutionsMegaMenu.dataTalent.items.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                  <Link key={idx} href={item.href} onClick={closeDropdowns} className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="p-2 bg-slate-50 rounded-lg text-slate-500 group-hover:bg-[#0F4C81]/10 group-hover:text-[#0F4C81] transition-colors"><Icon size={16} /></div>
                                    <div>
                                      <div className="text-sm font-semibold text-slate-800 group-hover:text-[#0F4C81] transition-colors">{item.title}</div>
                                      <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{item.desc}</div>
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
                  href="/about"
                  className={`nav-link ${isActive('/about') ? 'nav-link-active' : ''}`}
                >
                  {t('about')}
                </Link>

                <Link
                  href="/careers"
                  className={`nav-link ${isActive('/careers') ? 'nav-link-active' : ''}`}
                >
                  {t('careers')}
                </Link>

                <Link
                  href="/contact"
                  className={`nav-link ${isActive('/contact') ? 'nav-link-active' : ''}`}
                >
                  {t('contact')}
                </Link>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-650 hover:bg-slate-50 cursor-pointer font-medium"
                >
                  <span>{activeLangName}</span>
                  <ChevronDown size={12} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLangOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 cursor-pointer ${
                          locale === lang.code ? 'text-[#0F4C81] font-semibold' : 'text-slate-700'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* AI Consultant highlighted CTA */}
              <button
                onClick={triggerOpenChat}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#0F4C81] hover:bg-[#0D3F6D] transition-colors cursor-pointer shadow-md shadow-blue-500/10 flex items-center gap-2 border-none"
              >
                <Sparkles size={14} className="animate-pulse" />
                <span>{t('aiConsultant') || 'AI Consultant'}</span>
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-3">
              <button
                onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
                className="px-2.5 py-1.5 rounded-md border border-slate-200 text-xs font-semibold text-slate-600 bg-white"
              >
                {locale.toUpperCase()}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-slate-600 hover:text-slate-900 focus:outline-none"
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-100 bg-white overflow-hidden shadow-lg absolute top-20 left-0 right-0 z-55 max-h-[calc(100vh-80px)] overflow-y-auto"
            >
              <div className="px-4 pt-2 pb-6 space-y-3">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
                >
                  {t('home')}
                </Link>

                {/* Mobile Solutions Accordion */}
                <div>
                  <button
                    onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg text-left"
                  >
                    <span>{tc('solutions')}</span>
                    <ChevronDown size={16} className={`transform transition-transform ${mobileSolutionsOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {mobileSolutionsOpen && (
                    <div className="pl-6 space-y-2 mt-1">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-2">{solutionsMegaMenu.consultingAI.title}</div>
                      {solutionsMegaMenu.consultingAI.items.map((item, idx) => (
                        <Link key={idx} href={item.href} onClick={() => setIsOpen(false)} className="block py-1.5 text-sm text-slate-600 hover:text-[#0F4C81]">{item.title}</Link>
                      ))}

                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-3">{solutionsMegaMenu.engineering.title}</div>
                      {solutionsMegaMenu.engineering.items.map((item, idx) => (
                        <Link key={idx} href={item.href} onClick={() => setIsOpen(false)} className="block py-1.5 text-sm text-slate-600 hover:text-[#0F4C81]">{item.title}</Link>
                      ))}

                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-3">{solutionsMegaMenu.dataTalent.title}</div>
                      {solutionsMegaMenu.dataTalent.items.map((item, idx) => (
                        <Link key={idx} href={item.href} onClick={() => setIsOpen(false)} className="block py-1.5 text-sm text-slate-600 hover:text-[#0F4C81]">{item.title}</Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
                >
                  {t('about')}
                </Link>

                <Link
                  href="/careers"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
                >
                  {t('careers')}
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
                >
                  {t('contact')}
                </Link>

                {/* Mobile AI Consultant CTA */}
                <div className="pt-4 px-3">
                  <button
                    onClick={triggerOpenChat}
                    className="w-full text-center py-3 rounded-xl font-bold text-white bg-[#0F4C81] border-none flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles size={16} />
                    <span>{t('aiConsultant') || 'AI Consultant'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Language Mobile Dropdown Panel Overlay */}
      {isMobileLangOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xs shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">{locale === 'es' ? 'Seleccionar Idioma' : 'Select Language'}</h3>
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full py-3 px-4 rounded-xl border text-sm font-semibold text-left transition-all ${
                    locale === lang.code ? 'bg-[#0F4C81] border-[#0F4C81] text-white' : 'bg-slate-50 border-slate-200 text-slate-770'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsMobileLangOpen(false)}
              className="w-full text-center text-xs text-slate-400 font-semibold uppercase tracking-widest pt-2 cursor-pointer"
            >
              {locale === 'es' ? 'Cerrar' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
