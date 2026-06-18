'use client';

import Link from 'next/link';
import Image from "next/image";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
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

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const pathname = usePathname();

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

  const megaMenuData = {
    dataAnalytics: {
      title: 'Data & Analytics',
      items: [
        {
          title: 'Business Intelligence',
          desc: 'Interactive dashboards and executive reporting systems.',
          href: '/solutions/business-intelligence-consulting',
          icon: BarChart3,
        },
        {
          title: 'Data Analytics',
          desc: 'Predictive modeling and statistical insights.',
          href: '/solutions/data-analytics-services',
          icon: TrendingUp,
        },
        {
          title: 'Data Warehousing',
          desc: 'Scalable cloud architecture and ETL pipelines.',
          href: '/solutions/data-warehousing-services',
          icon: Database,
        },
        {
          title: 'Data Engineering',
          desc: 'Robust data pipeline development and integration.',
          href: '/solutions/data-engineering-solutions',
          icon: Cpu,
        },
      ],
    },
    digitalSolutions: {
      title: 'Digital Solutions',
      items: [
        {
          title: 'Web Development',
          desc: 'Modern, high-performance React & Next.js applications.',
          href: '/solutions/web-development-services',
          icon: Globe,
        },
        {
          title: 'Custom Applications',
          desc: 'Tailored SaaS systems and custom business tools.',
          href: '/solutions/web-development-services#custom-applications',
          icon: Layers,
        },
        {
          title: 'API Integrations',
          desc: 'Connecting internal ERPs and third-party systems.',
          href: '/solutions/web-development-services#api-integrations',
          icon: Cpu,
        },
        {
          title: 'Cloud Applications',
          desc: 'Deploying secure cloud applications to AWS and Azure.',
          href: '/solutions/web-development-services#cloud-applications',
          icon: Cloud,
        },
      ],
    },
    consulting: {
      title: 'Consulting Services',
      items: [
        {
          title: 'Business Analysis',
          desc: 'Aligning technology strategy with business objectives.',
          href: '/solutions#business-analysis',
          icon: FileText,
        },
        {
          title: 'Technology Consulting',
          desc: 'Strategic guidance on modern tech stack selection.',
          href: '/solutions#technology-consulting',
          icon: Lightbulb,
        },
        {
          title: 'Agile Project Management',
          desc: 'Efficient, iterative delivery of complex technical projects.',
          href: '/solutions#agile-project-management',
          icon: Layers,
        },
      ],
    },
    staffing: {
      title: 'Staffing Solutions',
      items: [
        {
          title: 'IT Staffing',
          desc: 'Sourcing and placing specialized technical talent.',
          href: '/solutions/it-staffing-solutions',
          icon: Users,
        },
        {
          title: 'Staff Augmentation',
          desc: 'Seamlessly scaling your existing tech team.',
          href: '/solutions/staff-augmentation-services',
          icon: UserCheck,
        },
        {
          title: 'Contract Staffing',
          desc: 'Flexible contract resources for project-based needs.',
          href: '/staffing#contract-staffing',
          icon: Clock,
        },
        {
          title: 'Direct Placement',
          desc: 'Permanent recruitment solutions for key technical roles.',
          href: '/staffing#direct-placement',
          icon: ShieldCheck,
        },
      ],
    },
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ease-in-out bg-white border-b border-slate-100 ${
          isScrolled ? 'shadow-sm' : 'shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full w-full">
            <div className="flex items-center h-full gap-16 xl:gap-20">
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
              <div className="hidden lg:flex items-center space-x-8 h-full">
                <Link
                  href="/"
                  className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}
                >
                  Home
                </Link>

                {/* Solutions Mega Menu Trigger */}
                <div
                  className="h-full flex items-center"
                  onMouseEnter={() => setIsMegaMenuOpen(true)}
                  onMouseLeave={() => setIsMegaMenuOpen(false)}
                >
                  <button className={`flex items-center gap-1.5 nav-link ${isActive('/solutions') ? 'nav-link-active' : ''} cursor-pointer bg-transparent border-none`}>
                    <span>Solutions</span>
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
                  Careers
                </Link>

                <Link
                  href="/about"
                  className={`nav-link ${isActive('/about') ? 'nav-link-active' : ''}`}
                >
                  About
                </Link>

                <Link
                  href="/contact"
                  className={`nav-link ${isActive('/contact') ? 'nav-link-active' : ''}`}
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Right: Desktop CTA */}
            <div className="hidden lg:flex justify-end">
              <Link
                href="/consultation"
                className="h-10 px-6 flex items-center justify-center bg-[#0F4C81] hover:bg-[#0A365D] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                Schedule Consultation
              </Link>
            </div>

            {/* Mobile Menu Button Trigger */}
            <div className="lg:hidden flex items-center">
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
              className="fixed top-0 right-0 bottom-0 w-[300px] sm:w-[350px] bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col justify-between lg:hidden overflow-hidden animate-none"
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
                  className={`flex items-center space-x-3 py-2.5 text-[16px] font-semibold transition-colors border-b border-slate-50 ${isActive('/') ? 'text-[#0F4C81] border-l-2 border-[#0F4C81] pl-2' : 'text-slate-800 hover:text-[#0F4C81]'}`}
                >
                  <Home size={16} className={isActive('/') ? 'text-[#0F4C81]' : 'text-slate-400'} />
                  <span>Home</span>
                </Link>

                {/* Mobile solutions accordion */}
                <div>
                  <button
                    onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                    className={`flex items-center justify-between w-full py-2.5 text-[16px] font-semibold transition-colors border-b border-slate-50 cursor-pointer bg-transparent border-none ${isActive('/solutions') ? 'text-[#0F4C81] border-l-2 border-[#0F4C81] pl-2' : 'text-slate-800 hover:text-[#0F4C81]'}`}
                  >
                    <div className="flex items-center space-x-3">
                      <Database size={16} className={isActive('/solutions') ? 'text-[#0F4C81]' : 'text-slate-400'} />
                      <span>Solutions</span>
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
                          Data & Analytics
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
                          Digital Solutions
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
                          Consulting Services
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
                          Staffing Solutions
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
                  <span><span>Careers</span></span>
                </Link>

                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 py-2.5 text-[16px] font-semibold transition-colors border-b border-slate-50 ${isActive('/about') ? 'text-[#0F4C81] border-l-2 border-[#0F4C81] pl-2' : 'text-slate-800 hover:text-[#0F4C81]'}`}
                >
                  <FileText size={16} className={isActive('/about') ? 'text-[#0F4C81]' : 'text-slate-400'} />
                  <span>About</span>
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 py-2.5 text-[16px] font-semibold transition-colors border-b border-slate-50 ${isActive('/contact') ? 'text-[#0F4C81] border-l-2 border-[#0F4C81] pl-2' : 'text-slate-800 hover:text-[#0F4C81]'}`}
                >
                  <Mail size={16} className={isActive('/contact') ? 'text-[#0F4C81]' : 'text-slate-400'} />
                  <span>Contact</span>
                </Link>
              </div>

              {/* Drawer Footer CTA */}
              <div className="p-6 border-t border-slate-100 bg-white flex-shrink-0">
                <Link
                  href="/consultation"
                  onClick={() => setIsOpen(false)}
                  className="w-full h-10 flex items-center justify-center bg-[#0F4C81] hover:bg-[#0A365D] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  Schedule Consultation
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
