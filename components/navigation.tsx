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
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm'
            : 'bg-transparent border-b border-transparent shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Left: Logo */}
            <div className="flex-1 flex justify-start">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">HC</span>
                </div>
                <span className="font-bold text-lg text-foreground hidden sm:inline">HyperCode</span>
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-10 h-full">
              <Link
                href="/"
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors relative group py-2"
              >
                Home
                <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-primary origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </Link>

              {/* Solutions Mega Menu Trigger */}
              <div
                className="h-full flex items-center"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-primary transition-colors relative group py-2 cursor-pointer bg-transparent border-none">
                  <span>Solutions</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`}
                  />
                  <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-primary origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </button>

                <AnimatePresence>
                  {isMegaMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4 sm:px-6 lg:px-8 z-50 pointer-events-auto"
                    >
                      <div className="bg-background/98 backdrop-blur-xl border border-border/60 rounded-2xl shadow-xl p-8 grid grid-cols-3 gap-8 text-left">
                        {/* Column 1: Data & Analytics */}
                        <div>
                          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                            {megaMenuData.dataAnalytics.title}
                          </h3>
                          <div className="space-y-1">
                            {megaMenuData.dataAnalytics.items.map((item, idx) => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  key={idx}
                                  href={item.href}
                                  className="group flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                  <div className="p-2 bg-muted rounded-lg text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors flex-shrink-0">
                                    <Icon size={16} />
                                  </div>
                                  <div>
                                    <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                      {item.title}
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
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
                          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                            {megaMenuData.consulting.title}
                          </h3>
                          <div className="space-y-1">
                            {megaMenuData.consulting.items.map((item, idx) => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  key={idx}
                                  href={item.href}
                                  className="group flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                  <div className="p-2 bg-muted rounded-lg text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors flex-shrink-0">
                                    <Icon size={16} />
                                  </div>
                                  <div>
                                    <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                      {item.title}
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
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
                          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                            {megaMenuData.staffing.title}
                          </h3>
                          <div className="space-y-1">
                            {megaMenuData.staffing.items.map((item, idx) => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  key={idx}
                                  href={item.href}
                                  className="group flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                  <div className="p-2 bg-muted rounded-lg text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors flex-shrink-0">
                                    <Icon size={16} />
                                  </div>
                                  <div>
                                    <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                      {item.title}
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
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
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors relative group py-2"
              >
                Industries
                <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-primary origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </Link>

              <Link
                href="/careers"
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors relative group py-2"
              >
                Careers
                <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-primary origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </Link>

              <Link
                href="/about"
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors relative group py-2"
              >
                About
                <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-primary origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </Link>

              <Link
                href="/contact"
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors relative group py-2"
              >
                Contact
                <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-primary origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </Link>
            </div>

            {/* Right: Desktop CTA */}
            <div className="hidden lg:flex flex-1 justify-end">
              <Link
                href="/contact"
                className="h-12 px-8 flex items-center justify-center bg-[#071A35] text-white font-semibold text-sm rounded-[14px] hover:bg-[#0f2d57] shadow-sm hover:shadow-md hover:shadow-[#071a35]/15 transition-all duration-250 hover:-translate-y-0.5 active:scale-98 tracking-wide"
              >
                Schedule Consultation
              </Link>
            </div>

            {/* Mobile Menu Button Trigger */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-foreground/80 hover:bg-muted rounded-lg transition-colors cursor-pointer bg-transparent border-none"
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
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 right-0 bottom-0 w-[300px] sm:w-[350px] bg-background border-l border-border/40 shadow-2xl z-50 flex flex-col justify-between lg:hidden overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/40 flex-shrink-0">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-2">
                  <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold text-base flex-shrink-0">
                    HC
                  </div>
                  <span className="font-bold text-base text-foreground">HyperCode</span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-foreground/75 hover:bg-muted rounded-lg transition-colors cursor-pointer bg-transparent border-none"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Navigation Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 py-3 text-lg font-medium text-foreground/80 hover:text-primary transition-colors border-b border-border/10"
                >
                  <Home size={18} className="text-muted-foreground" />
                  <span>Home</span>
                </Link>

                {/* Mobile solutions accordion */}
                <div>
                  <button
                    onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                    className="flex items-center justify-between w-full py-3 text-lg font-medium text-foreground/80 hover:text-primary transition-colors border-b border-border/10 cursor-pointer bg-transparent border-none"
                  >
                    <div className="flex items-center space-x-3">
                      <Database size={18} className="text-muted-foreground" />
                      <span>Solutions</span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${
                        mobileSolutionsOpen ? 'rotate-180' : ''
                      } text-muted-foreground`}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: mobileSolutionsOpen ? 'auto' : 0,
                      opacity: mobileSolutionsOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden bg-muted/20 rounded-xl mt-2 pl-4 pr-2"
                  >
                    <div className="py-3 space-y-4 text-left">
                      {/* Data & Analytics */}
                      <div className="space-y-2">
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
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
                                className="flex items-center gap-2 py-2 text-sm text-foreground/70 hover:text-primary transition-colors"
                              >
                                <Icon size={14} className="text-muted-foreground flex-shrink-0" />
                                <span>{item.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* Consulting Services */}
                      <div className="space-y-2">
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
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
                                className="flex items-center gap-2 py-2 text-sm text-foreground/70 hover:text-primary transition-colors"
                              >
                                <Icon size={14} className="text-muted-foreground flex-shrink-0" />
                                <span>{item.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* Staffing Solutions */}
                      <div className="space-y-2">
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
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
                                className="flex items-center gap-2 py-2 text-sm text-foreground/70 hover:text-primary transition-colors"
                              >
                                <Icon size={14} className="text-muted-foreground flex-shrink-0" />
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
                  className="flex items-center space-x-3 py-3 text-lg font-medium text-foreground/80 hover:text-primary transition-colors border-b border-border/10"
                >
                  <Globe size={18} className="text-muted-foreground" />
                  <span>Industries</span>
                </Link>

                <Link
                  href="/careers"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 py-3 text-lg font-medium text-foreground/80 hover:text-primary transition-colors border-b border-border/10"
                >
                  <Users size={18} className="text-muted-foreground" />
                  <span>Careers</span>
                </Link>

                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 py-3 text-lg font-medium text-foreground/80 hover:text-primary transition-colors border-b border-border/10"
                >
                  <FileText size={18} className="text-muted-foreground" />
                  <span>About</span>
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 py-3 text-lg font-medium text-foreground/80 hover:text-primary transition-colors border-b border-border/10"
                >
                  <Mail size={18} className="text-muted-foreground" />
                  <span>Contact</span>
                </Link>
              </div>

              {/* Drawer Footer sticky CTA button */}
              <div className="p-6 border-t border-border/40 bg-background/95 backdrop-blur-md flex-shrink-0">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full h-12 flex items-center justify-center bg-[#071A35] text-white font-semibold text-base rounded-[14px] hover:bg-[#0f2d57] shadow-sm hover:shadow-md hover:shadow-[#071a35]/15 transition-all duration-250 hover:-translate-y-0.5 active:scale-98 tracking-wide"
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
