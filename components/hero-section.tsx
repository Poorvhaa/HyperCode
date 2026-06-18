'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  TrendingUp,
  Database,
  Cpu,
  Server,
  BarChart3,
  Award
} from 'lucide-react';

const nodes = [
  {
    id: 0,
    label: 'Data Sources',
    icon: Database,
    description: 'Ingests raw database feeds, APIs, cloud files, and streaming events.',
    x: '25%',
    y: '12%',
  },
  {
    id: 1,
    label: 'Data Engineering',
    icon: Cpu,
    description: 'Builds robust ETL/ELT pipelines and automates schema integration.',
    x: '75%',
    y: '12%',
  },
  {
    id: 2,
    label: 'Data Platform',
    icon: Server,
    description: 'Consolidates storage lakes and secure cloud data warehouses.',
    x: '75%',
    y: '48%',
  },
  {
    id: 3,
    label: 'Analytics',
    icon: TrendingUp,
    description: 'Deploys advanced forecasting models and tracks statistical trends.',
    x: '25%',
    y: '48%',
  },
  {
    id: 4,
    label: 'Business Intelligence',
    icon: BarChart3,
    description: 'Translates clean data assets into visual reports and dashboards.',
    x: '25%',
    y: '84%',
  },
  {
    id: 5,
    label: 'Strategic Outcomes',
    icon: Award,
    description: 'Empowers executive stakeholders to drive operational growth and ROI.',
    x: '75%',
    y: '84%',
  },
];

export function HeroSection() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  // Determine active flow path segment based on hovered node
  const getActiveFlowPath = () => {
    if (hoveredNode === null) return null;
    switch (hoveredNode) {
      case 0: return 'M 25 12 L 75 12'; // Node 1 -> 2
      case 1: return 'M 75 12 L 75 48'; // Node 2 -> 3
      case 2: return 'M 75 48 L 25 48'; // Node 3 -> 4
      case 3: return 'M 25 48 L 25 84'; // Node 4 -> 5
      case 4: return 'M 25 84 L 75 84'; // Node 5 -> 6
      default: return null;
    }
  };

  const activeFlowPath = getActiveFlowPath();

  return (
    <section className="relative min-h-[85vh] bg-white pt-36 pb-24 flex items-center overflow-hidden text-left">
      {/* Subtle light background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Content Column (55% space) */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-full">
                <TrendingUp size={14} className="text-[#0F4C81]" />
                <span className="text-[11px] font-extrabold text-[#0F4C81] uppercase tracking-widest">
                  Enterprise Strategy & Talent
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Transforming Data Into{' '}
                <span className="text-[#0F4C81]">
                  Strategic Intelligence
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl font-medium">
                HyperCode helps organizations unlock growth through Business Intelligence, Data Analytics, Data Engineering, Web Development, and Strategic IT Staffing.
              </p>
            </motion.div>

            {/* Clean Button System */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center h-11 px-6 bg-[#0F4C81] hover:bg-[#0A365D] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                <span>Schedule Consultation</span>
                <ArrowRight size={14} className="ml-2" />
              </Link>
              <a
                href="#services"
                className="inline-flex items-center justify-center h-11 px-6 bg-white border border-[#0F4C81] hover:bg-slate-50 text-[#0F4C81] font-bold text-xs uppercase tracking-wider rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                Explore Solutions
              </a>
            </motion.div>
          </div>

          {/* Right Visual Column - Ecosystem Visualization (45% space) */}
          <div className="lg:col-span-5 w-full flex items-center justify-center min-h-[500px] relative z-10">
            
            {/* Desktop / Tablet Grid flow layout */}
            <div className="hidden md:block w-full h-[520px] relative">
              {/* Connection Pipelines (SVG) */}
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {/* Background static line */}
                <path
                  d="M 25 12 L 75 12 L 75 48 L 25 48 L 25 84 L 75 84"
                  fill="none"
                  stroke="rgba(15, 76, 129, 0.15)"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                />

                {/* Hover active path */}
                {activeFlowPath && (
                  <path
                    d={activeFlowPath}
                    fill="none"
                    stroke="#0F4C81"
                    strokeWidth="2.5"
                  />
                )}
              </svg>

              {/* Glassmorphic Nodes */}
              {nodes.map((node) => {
                const Icon = node.icon;
                const isHovered = hoveredNode === node.id;
                
                return (
                  <div
                    key={node.id}
                    style={{ left: node.x, top: node.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-[190px] lg:w-[220px] z-10"
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <div
                      className={`flex items-center gap-3 p-3 lg:p-4 rounded-xl border bg-white/90 backdrop-blur-sm transition-all duration-350 ${
                        isHovered
                          ? 'border-[#0F4C81] shadow-md -translate-y-0.5 scale-[1.01]'
                          : 'border-slate-200 shadow-sm'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                          isHovered ? 'bg-[#0F4C81] text-white' : 'bg-slate-50 text-[#0F4C81]'
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                      
                      <div className="text-left">
                        <span className="text-xs font-bold text-slate-800 leading-tight block">
                          {node.label}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold tracking-wide uppercase mt-0.5 block">
                          Step 0{node.id + 1}
                        </span>
                      </div>
                    </div>

                    {/* Description Tooltip */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 5, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 3, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-30 top-[115%] left-1/2 -translate-x-1/2 w-[220px] bg-white border border-slate-200 shadow-lg p-3 rounded-xl text-left pointer-events-none backdrop-blur-sm"
                        >
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 rotate-45 w-2 h-2 bg-white border-t border-l border-slate-200" />
                          <p className="text-[11px] font-semibold text-slate-600 leading-relaxed">
                            {node.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Mobile Stacked flow layout */}
            <div className="block md:hidden w-full space-y-4 pl-6 relative py-2">
              {/* Vertical flow path */}
              <div className="absolute left-[17px] top-4 bottom-4 w-[2px] bg-slate-100" />

              {nodes.map((node) => {
                const Icon = node.icon;
                return (
                  <div key={node.id} className="relative flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0F4C81] z-10 flex-shrink-0">
                      <Icon size={16} />
                    </div>
                    <div className="bg-white border border-slate-200/85 p-4 rounded-xl shadow-sm text-left flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-xs font-bold text-slate-800">{node.label}</h4>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">0{node.id + 1}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                        {node.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
