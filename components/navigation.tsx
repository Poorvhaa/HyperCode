'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
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
  Mail
} from 'lucide-react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);

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
          href: '/solutions#business-intelligence',
          icon: BarChart3,
        },
        {
          title: 'Data Analytics',
          desc: 'Predictive modeling and statistical insights.',
          href: '/solutions#data-analytics',
          icon: TrendingUp,
        },
        {
          title: 'Data Warehousing',
          desc: 'Scalable cloud architecture and ETL pipelines.',
          href: '/solutions#data-warehousing',
          icon: Database,
        },
        {
          title: 'Data Engineering',
          desc: 'Robust data pipeline development and integration.',
          href: '/solutions#data-engineering',
          icon: Cpu,
        },
        {
          title: 'Big Data',
          desc: 'High-volume stream processing and distributed computing.',
          href: '/solutions#big-data',
          icon: Globe,
        },
      ],
    },
    consulting: {
      title: 'Consulting Services',
      items: [
        {
          title: 'Business Analysis',
          desc: 'Aligning technology strategy with business objectives.',
          href: '/solutions',
          icon: FileText,
        },
        {
          title: 'Agile Project Management',
          desc: 'Efficient, iterative delivery of complex technical projects.',
          href: '/solutions',
          icon: Layers,
        },
        {
          title: 'Technology Consulting',
          desc: 'Strategic guidance on modern tech stack selection.',
          href: '/solutions',
          icon: Lightbulb,
        },
      ],
    },
    staffing: {
      title: 'Staffing Solutions',
      items: [
        {
          title: 'IT Staffing',
          desc: 'Sourcing and placing specialized technical talent.',
          href: '/staffing#it-staffing',
          icon: Users,
        },
        {
          title: 'Staff Augmentation',
          desc: 'Seamlessly scaling your existing tech team.',
          href: '/staffing#staff-augmentation',
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
          href: '/staffing#direct-hire',
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
          <div className="flex items-center justify-between h-full">
            {/* Left: Logo */}
            <div className="flex-1 flex justify-start">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-9 h-9 bg-[#0F4C81] rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-[15px]">HC</span>
                </div>
                <span className="font-bold text-lg tracking-tight text-slate-900 hidden sm:inline">HyperCode</span>
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 h-full">
              <Link
                href="/"
                className="text-[15px] font-semibold text-slate-700 hover:text-[#0F4C81] transition-colors relative py-2"
              >
                Home
              </Link>

              {/* Solutions Mega Menu Trigger */}
              <div
                className="h-full flex items-center"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
              >
                <button className="flex items-center gap-1.5 text-[15px] font-semibold text-slate-700 hover:text-[#0F4C81] transition-colors cursor-pointer bg-transparent border-none py-2">
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
                      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8 grid grid-cols-3 gap-8 text-left">
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

                        {/* Column 2: Consulting Services */}
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

                        {/* Column 3: Staffing Solutions */}
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
                href="/industries"
                className="text-[15px] font-semibold text-slate-700 hover:text-[#0F4C81] transition-colors relative py-2"
              >
                Industries
              </Link>

              <Link
                href="/careers"
                className="text-[15px] font-semibold text-slate-700 hover:text-[#0F4C81] transition-colors relative py-2"
              >
                Careers
              </Link>

              <Link
                href="/about"
                className="text-[15px] font-semibold text-slate-700 hover:text-[#0F4C81] transition-colors relative py-2"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="text-[15px] font-semibold text-slate-700 hover:text-[#0F4C81] transition-colors relative py-2"
              >
                Contact
              </Link>
            </div>

            {/* Right: Desktop CTA */}
            <div className="hidden lg:flex flex-1 justify-end">
              <Link
                href="/contact"
                className="h-11 px-5 flex items-center justify-center bg-[#0F4C81] text-white font-semibold text-[14px] rounded-xl hover:bg-[#0c3c66] transition-all duration-200 shadow-sm"
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
                  className="flex items-center space-x-3 py-2.5 text-[16px] font-semibold text-slate-800 hover:text-[#0F4C81] transition-colors border-b border-slate-50"
                >
                  <Home size={16} className="text-slate-400" />
                  <span>Home</span>
                </Link>

                {/* Mobile solutions accordion */}
                <div>
                  <button
                    onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                    className="flex items-center justify-between w-full py-2.5 text-[16px] font-semibold text-slate-800 hover:text-[#0F4C81] transition-colors border-b border-slate-50 cursor-pointer bg-transparent border-none"
                  >
                    <div className="flex items-center space-x-3">
                      <Database size={16} className="text-slate-400" />
                      <span>Solutions</span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        mobileSolutionsOpen ? 'rotate-180' : ''
                      } text-slate-400`}
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
                                className="flex items-center gap-2 py-1.5 text-sm text-slate-600 hover:text-[#0F4C81] transition-colors"
                              >
                                <Icon size={14} className="text-slate-400 flex-shrink-0" />
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
                                className="flex items-center gap-2 py-1.5 text-sm text-slate-600 hover:text-[#0F4C81] transition-colors"
                              >
                                <Icon size={14} className="text-slate-400 flex-shrink-0" />
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
                                className="flex items-center gap-2 py-1.5 text-sm text-slate-600 hover:text-[#0F4C81] transition-colors"
                              >
                                <Icon size={14} className="text-slate-400 flex-shrink-0" />
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
                  href="/industries"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 py-2.5 text-[16px] font-semibold text-slate-800 hover:text-[#0F4C81] transition-colors border-b border-slate-50"
                >
                  <Globe size={16} className="text-slate-400" />
                  <span>Industries</span>
                </Link>

                <Link
                  href="/careers"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 py-2.5 text-[16px] font-semibold text-slate-800 hover:text-[#0F4C81] transition-colors border-b border-slate-50"
                >
                  <Users size={16} className="text-slate-400" />
                  <span>Careers</span>
                </Link>

                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 py-2.5 text-[16px] font-semibold text-slate-800 hover:text-[#0F4C81] transition-colors border-b border-slate-50"
                >
                  <FileText size={16} className="text-slate-400" />
                  <span>About</span>
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 py-2.5 text-[16px] font-semibold text-slate-800 hover:text-[#0F4C81] transition-colors border-b border-slate-50"
                >
                  <Mail size={16} className="text-slate-400" />
                  <span>Contact</span>
                </Link>
              </div>

              {/* Drawer Footer CTA */}
              <div className="p-6 border-t border-slate-100 bg-white flex-shrink-0">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full h-11 flex items-center justify-center bg-[#0F4C81] text-white font-semibold text-sm rounded-xl hover:bg-[#0c3c66] transition-colors duration-200"
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
