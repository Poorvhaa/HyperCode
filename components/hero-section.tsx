'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Award,
  Activity,
  HardDrive,
  Cpu,
  Server,
  BarChart3,
  Brain,
  RefreshCw,
  Zap,
  AlertCircle,
  ArrowUpRight
} from 'lucide-react';

export function HeroSection() {
  const [revenue, setRevenue] = useState(3429180);
  const [accuracy, setAccuracy] = useState(99.85);
  const [activePipelineStep, setActivePipelineStep] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time metrics updating slightly
      setRevenue(prev => prev + Math.floor(Math.random() * 120) - 40);
      setAccuracy(prev => {
        const next = prev + (Math.random() * 0.04 - 0.02);
        return Math.min(100, Math.max(99.7, parseFloat(next.toFixed(2))));
      });
      // Cycle through pipeline steps
      setActivePipelineStep(prev => (prev + 1) % 5);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -12, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-background via-background to-muted/30 pt-32 pb-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse duration-5000" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse duration-7000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <div className="space-y-8 lg:col-span-5">
            <motion.div variants={itemVariants}>
              <motion.div
                className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <TrendingUp size={16} className="text-accent" />
                <span className="text-sm font-medium text-accent">Fortune 500 Ready</span>
              </motion.div>
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Data-Driven Solutions for Modern Enterprises
              </h1>
            </motion.div>

            <motion.p variants={itemVariants} className="text-xl text-foreground/70 leading-relaxed">
              Helping organizations unlock the power of Business Intelligence, Data Analytics, and Strategic IT Staffing. Transform your data into competitive advantage.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1 group"
              >
                Get Started
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-all duration-300"
              >
                Talk to an Expert
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 pt-8 border-t border-border/40">
              <div>
                <div className="text-3xl font-bold text-primary">100+</div>
                <p className="text-sm text-foreground/60">Projects Delivered</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">95%</div>
                <p className="text-sm text-foreground/60">Client Satisfaction</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <p className="text-sm text-foreground/60">Expert Consultants</p>
              </div>
            </motion.div>
          </div>

          {/* Right Visual - Executive BI Command Center */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 w-full h-auto min-h-[580px] flex items-center justify-center relative z-10"
          >
            {/* Blurry Background Glow behind the dashboard */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-500/10 blur-3xl rounded-2xl -z-10 pointer-events-none" />

            {/* Master Glassmorphism Container with Floating Motion */}
            <motion.div
              variants={floatVariants}
              initial="initial"
              animate="animate"
              className="w-full bg-slate-950/80 border border-white/10 dark:border-white/5 backdrop-blur-2xl rounded-2xl p-6 shadow-2xl space-y-6 relative overflow-hidden text-left"
            >
              {/* Dashboard Header */}
              <div className="flex justify-between items-center pb-4 border-b border-white/10 flex-wrap gap-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                    <Activity size={16} className="text-blue-400 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white tracking-widest uppercase">EXECUTIVE BI DASHBOARD</h3>
                    <p className="text-[9px] text-slate-400 tracking-wider">HYPERCODE ENGINE v4.2</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1.5 bg-emerald-500/15 border border-emerald-500/25 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-semibold text-emerald-400 tracking-wider">SYSTEM ACTIVE</span>
                  </div>
                  <button
                    onClick={() => setRefreshKey(prev => prev + 1)}
                    className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                    title="Refresh Visualizations"
                  >
                    <RefreshCw size={14} className="hover:rotate-180 transition-transform duration-500" />
                  </button>
                </div>
              </div>

              {/* Top Row: KPI Cards (Grid of 3) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* KPI Card 1: Revenue Growth */}
                <div className="bg-white/5 border border-white/5 hover:border-blue-500/30 rounded-xl p-3 flex flex-col justify-between hover:bg-white/10 transition-all duration-300 shadow-md">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-semibold text-slate-400 tracking-wider uppercase">REVENUE (YoY)</span>
                    <div className="p-1.5 bg-blue-500/15 text-blue-400 rounded-md">
                      <DollarSign size={12} />
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-lg font-bold text-white tracking-tight">
                      ${(revenue / 1000000).toFixed(3)}M
                    </span>
                    <div className="flex items-center space-x-1 text-emerald-400 text-[9px] font-medium mt-0.5">
                      <ArrowUpRight size={10} />
                      <span>+34.2% Growth</span>
                    </div>
                  </div>
                  <div className="mt-3 h-8 w-full">
                    <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="blue-spark-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,25 Q15,5 30,18 T60,8 T90,20"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M0,25 Q15,5 30,18 T60,8 T90,20 L90,30 L0,30 Z"
                        fill="url(#blue-spark-grad)"
                      />
                    </svg>
                  </div>
                </div>

                {/* KPI Card 2: Data Accuracy */}
                <div className="bg-white/5 border border-white/5 hover:border-cyan-500/30 rounded-xl p-3 flex flex-col justify-between hover:bg-white/10 transition-all duration-300 shadow-md">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-semibold text-slate-400 tracking-wider uppercase">DATA ACCURACY</span>
                    <div className="p-1.5 bg-cyan-500/15 text-cyan-400 rounded-md">
                      <CheckCircle2 size={12} />
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-lg font-bold text-white tracking-tight">
                      {accuracy}%
                    </span>
                    <div className="flex items-center space-x-1 text-emerald-400 text-[9px] font-medium mt-0.5">
                      <ArrowUpRight size={10} />
                      <span>99.9% Target</span>
                    </div>
                  </div>
                  <div className="mt-3 h-8 w-full">
                    <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="cyan-spark-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,20 Q10,18 20,22 T40,15 T60,18 T80,10 T90,12"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M0,20 Q10,18 20,22 T40,15 T60,18 T80,10 T90,12 L90,30 L0,30 Z"
                        fill="url(#cyan-spark-grad)"
                      />
                    </svg>
                  </div>
                </div>

                {/* KPI Card 3: Project Success */}
                <div className="bg-white/5 border border-white/5 hover:border-purple-500/30 rounded-xl p-3 flex flex-col justify-between hover:bg-white/10 transition-all duration-300 shadow-md">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-semibold text-slate-400 tracking-wider uppercase">PROJECT SUCCESS</span>
                    <div className="p-1.5 bg-purple-500/15 text-purple-400 rounded-md">
                      <Award size={12} />
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-lg font-bold text-white tracking-tight">
                      96.4%
                    </span>
                    <div className="flex items-center space-x-1 text-purple-400 text-[9px] font-medium mt-0.5">
                      <ArrowUpRight size={10} />
                      <span>+1.2% Q/Q</span>
                    </div>
                  </div>
                  <div className="mt-3 h-8 w-full">
                    <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="purple-spark-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,28 Q15,25 30,10 T60,15 T90,5"
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M0,28 Q15,25 30,10 T60,15 T90,5 L90,30 L0,30 Z"
                        fill="url(#purple-spark-grad)"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Middle Row: Revenue Trend & Donut Chart */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Revenue Trend Area Chart */}
                <div className="bg-white/5 border border-white/5 rounded-xl p-4 md:col-span-3 flex flex-col justify-between hover:bg-white/8 transition-all duration-300 shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-slate-300 tracking-wider">Revenue Trend & Forecast</span>
                    <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">On Track</span>
                  </div>
                  <div className="relative w-full h-36 mt-2">
                    <svg key={`rev-chart-${refreshKey}`} className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Grid Lines */}
                      <line x1="0" y1="30" x2="300" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="0" y1="60" x2="300" y2="60" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="0" y1="90" x2="300" y2="90" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3,3" />
                      
                      {/* Area Under Path */}
                      <motion.path
                        d="M0,105 C30,95 60,65 90,80 C120,95 150,55 180,45 C210,35 240,20 300,10 L300,120 L0,120 Z"
                        fill="url(#area-grad)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                      />
                      
                      {/* Smooth Area Path */}
                      <motion.path
                        d="M0,105 C30,95 60,65 90,80 C120,95 150,55 180,45 C210,35 240,20 300,10"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                      />
                      
                      {/* Data dots */}
                      <motion.circle cx="90" cy="80" r="3" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.5" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }} />
                      <motion.circle cx="180" cy="45" r="3" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.5" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }} />
                      <motion.circle cx="300" cy="10" r="4" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2 }} />
                    </svg>
                  </div>
                  <div className="flex justify-between items-center text-[9px] text-slate-400 mt-2 font-medium tracking-wider">
                    <span>JAN</span>
                    <span>FEB</span>
                    <span>MAR</span>
                    <span>APR</span>
                    <span>MAY</span>
                    <span>JUN (FC)</span>
                  </div>
                </div>

                {/* Project Distribution Donut Chart */}
                <div className="bg-white/5 border border-white/5 rounded-xl p-4 md:col-span-2 flex flex-col justify-between hover:bg-white/8 transition-all duration-300 shadow-md">
                  <span className="text-xs font-semibold text-slate-300 tracking-wider mb-2">Industry Breakdown</span>
                  <div className="flex items-center justify-around h-36">
                    <div className="relative w-24 h-24">
                      {/* SVG Donut */}
                      <svg key={`donut-${refreshKey}`} width="100%" height="100%" viewBox="0 0 100 100" className="rotate-[-90deg]">
                        {/* Background track */}
                        <circle cx="50" cy="50" r="38" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="7" />
                        
                        {/* Segment 1: Finance (45%) */}
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="transparent"
                          stroke="#3b82f6"
                          strokeWidth="7"
                          strokeDasharray="238.76"
                          initial={{ strokeDashoffset: 238.76 }}
                          animate={{ strokeDashoffset: 238.76 * (1 - 0.45) }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                        />
                        {/* Segment 2: Healthcare (35%) */}
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="transparent"
                          stroke="#10b981"
                          strokeWidth="7"
                          strokeDasharray="238.76"
                          initial={{ strokeDashoffset: 238.76 }}
                          animate={{ strokeDashoffset: 238.76 * (1 - 0.35) }}
                          style={{
                            transformOrigin: '50px 50px',
                            transform: 'rotate(162deg)',
                          }}
                          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        />
                        {/* Segment 3: Retail/Other (20%) */}
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="transparent"
                          stroke="#a855f7"
                          strokeWidth="7"
                          strokeDasharray="238.76"
                          initial={{ strokeDashoffset: 238.76 }}
                          animate={{ strokeDashoffset: 238.76 * (1 - 0.20) }}
                          style={{
                            transformOrigin: '50px 50px',
                            transform: 'rotate(288deg)',
                          }}
                          transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                        />
                      </svg>
                      {/* Center label */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-sm font-bold text-white leading-none">100+</span>
                        <span className="text-[8px] text-slate-400 font-semibold mt-0.5 tracking-wider">PROJECTS</span>
                      </div>
                    </div>
                    {/* Legend */}
                    <div className="flex flex-col space-y-2 text-[10px] font-medium text-slate-300">
                      <div className="flex items-center space-x-1.5">
                        <div className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
                        <span>Finance (45%)</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                        <span>Health (35%)</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <div className="w-2.5 h-2.5 rounded-sm bg-purple-500" />
                        <span>Retail (20%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row: AI Insights Panel & Data Pipeline Flow */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* AI Insights Panel */}
                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:bg-white/8 transition-all duration-300 shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1.5 text-purple-400">
                      <Brain size={14} className="animate-pulse" />
                      <span className="text-xs font-bold tracking-wider uppercase">AI Predictive Insights</span>
                    </div>
                    <span className="text-[8px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-1.5 py-0.5 rounded font-bold uppercase tracking-widest animate-pulse">
                      PROCESSING
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {/* Insight 1 */}
                    <div className="bg-white/5 border border-white/5 rounded-lg p-2.5 flex items-start gap-2.5 hover:bg-white/10 transition-colors">
                      <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded-md mt-0.5 flex-shrink-0">
                        <TrendingUp size={12} />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-white flex items-center gap-1.5">
                          <span>Government adoption surge</span>
                          <span className="w-1 h-1 rounded-full bg-blue-400 animate-ping" />
                        </div>
                        <p className="text-[9px] text-slate-400 leading-relaxed mt-0.5">
                          Analytics adoption across federal agency sectors increased by 23% this quarter.
                        </p>
                      </div>
                    </div>

                    {/* Insight 2 */}
                    <div className="bg-white/5 border border-white/5 rounded-lg p-2.5 flex items-start gap-2.5 hover:bg-white/10 transition-colors">
                      <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-md mt-0.5 flex-shrink-0">
                        <Zap size={12} />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-white">Efficiency Gain</div>
                        <p className="text-[9px] text-slate-400 leading-relaxed mt-0.5">
                          Cloud pipeline automation reduced data delivery latency by 45% for enterprise clients.
                        </p>
                      </div>
                    </div>

                    {/* Insight 3 */}
                    <div className="bg-white/5 border border-white/5 rounded-lg p-2.5 flex items-start gap-2.5 hover:bg-white/10 transition-colors">
                      <div className="p-1.5 bg-purple-500/10 text-purple-400 rounded-md mt-0.5 flex-shrink-0">
                        <AlertCircle size={12} />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-white">Predictive Forecast</div>
                        <p className="text-[9px] text-slate-400 leading-relaxed mt-0.5">
                          Annual data warehousing load capacity expected to grow by 17% next month.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Pipeline Panel */}
                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:bg-white/8 transition-all duration-300 relative overflow-hidden shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-slate-300 tracking-wider">Enterprise Data Pipeline</span>
                    <span className="text-[8px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                      FLOWING
                    </span>
                  </div>
                  
                  {/* Pipeline animation inline style */}
                  <style>{`
                    @keyframes pipelineFlow {
                      from { stroke-dashoffset: 16; }
                      to { stroke-dashoffset: 0; }
                    }
                    .animate-pipeline-flow {
                      animation: pipelineFlow 1.5s linear infinite;
                    }
                  `}</style>
                  
                  {/* Horizontal Flow Container */}
                  <div className="flex justify-between items-center relative py-6 w-full z-10 px-2">
                    {/* SVG Connector Line */}
                    <svg className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 w-full -z-10 pointer-events-none" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <line x1="0" y1="5" x2="100" y2="5" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="3,3" className="animate-pipeline-flow opacity-60" />
                    </svg>

                    {/* Nodes */}
                    {[
                      { label: 'Sources', icon: HardDrive },
                      { label: 'Process', icon: Cpu },
                      { label: 'Warehouse', icon: Server },
                      { label: 'Analytics', icon: TrendingUp },
                      { label: 'BI', icon: BarChart3 }
                    ].map((step, idx) => {
                      const StepIcon = step.icon;
                      const isActive = activePipelineStep === idx;
                      return (
                        <div key={idx} className="flex flex-col items-center space-y-1.5 relative">
                          <motion.div
                            animate={{
                              scale: isActive ? [1, 1.15, 1] : 1,
                              borderColor: isActive ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                              boxShadow: isActive ? '0 0 10px rgba(59,130,246,0.4)' : 'none'
                            }}
                            transition={{ duration: 0.6 }}
                            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border ${
                              isActive ? 'bg-blue-600/35 text-white' : 'bg-slate-900/60 text-slate-400 border-white/10'
                            }`}
                          >
                            <StepIcon size={14} className={isActive ? 'animate-pulse' : ''} />
                          </motion.div>
                          <span className={`text-[8px] font-bold tracking-wider uppercase ${isActive ? 'text-blue-400 font-extrabold' : 'text-slate-500'}`}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Status subtext */}
                  <div className="mt-3 bg-white/5 border border-white/5 rounded-lg p-2.5 text-[9px] text-slate-400 leading-relaxed">
                    <span className="font-semibold text-slate-200 uppercase tracking-wide">METRICS:</span> Latency 14ms | Ingesting 2.4 GB/s from transactional API endpoints. Schema synchronization completed successfully.
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
