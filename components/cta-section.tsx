'use client';

import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-32 bg-slate-900 text-white text-left relative overflow-hidden">
      {/* Background radial gradient decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,76,129,0.18)_0%,transparent_100%)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <h2 className="text-xs font-bold text-[#38bdf8] tracking-widest uppercase">
          GET IN TOUCH
        </h2>
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight max-w-2xl mx-auto">
          Ready to Transform Data Into Strategic Intelligence?
        </h3>
        <p className="text-sm sm:text-base lg:text-lg text-slate-350 max-w-xl mx-auto leading-relaxed font-medium">
          Whether you need to architect a new cloud platform, optimize BI dashboards, or scale your engineering teams, HyperCode has the expertise to deliver.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-12 px-8 bg-[#0F4C81] text-white font-semibold text-sm rounded-xl hover:bg-[#0c3c66] transition-colors duration-200 shadow-sm w-full sm:w-auto"
          >
            Schedule Consultation
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-12 px-8 bg-slate-800 border border-slate-700 text-white font-semibold text-sm rounded-xl hover:bg-slate-700 transition-colors duration-200 w-full sm:w-auto"
          >
            Contact HyperCode
          </Link>
        </div>
      </div>
    </section>
  );
}
