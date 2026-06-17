'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Users2 } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-24 bg-slate-50 border-t border-b border-slate-100 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">GET IN TOUCH</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
            Accelerate Your Enterprise Transformation
          </h3>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-medium">
            Whether you need to architect a new cloud platform, optimize Power BI models, or scale your engineering teams, HyperCode has the expertise to deliver.
          </p>
        </div>

        {/* Dual Path Conversion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Card 1: Enterprise Solutions */}
          <div className="p-8 rounded-3xl border border-slate-200 bg-white flex flex-col justify-between h-[280px] shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 text-[#0F4C81] flex items-center justify-center mb-6">
                <BarChart3 size={20} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Need a Data Solution?</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Talk to our principal consultants to analyze your data pipelines, set up clean dashboards, and deploy a secure data platform.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center w-full h-11 bg-[#0F4C81] text-white rounded-xl font-bold text-xs hover:bg-[#0c3c66] transition-colors duration-200"
              >
                <span>Schedule Consultation</span>
                <ArrowRight size={14} className="ml-1.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Strategic Staffing */}
          <div className="p-8 rounded-3xl border border-slate-200 bg-white flex flex-col justify-between h-[280px] shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 text-[#0F4C81] flex items-center justify-center mb-6">
                <Users2 size={20} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Need Technical Talent?</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Connect with our national recruiting coordinators to deploy certified contract developers, data engineers, or scrum teams.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center w-full h-11 bg-white border border-[#0F4C81] text-[#0F4C81] rounded-xl font-bold text-xs hover:bg-slate-50 transition-colors duration-200"
              >
                <span>Request Talent Now</span>
                <ArrowRight size={14} className="ml-1.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
