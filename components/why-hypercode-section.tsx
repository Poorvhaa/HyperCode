'use client';

import { Award, Users, Globe, Handshake, CheckCircle2, XCircle, Zap, ShieldAlert, Cpu } from 'lucide-react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';

export function WhyHypercodeSection() {
  const locale = useLocale();

  // Local translation dictionary for self-contained differentiators
  const trans: Record<string, {
    badge: string;
    title: string;
    description: string;
    timelineHeader: string;
    traditional: string;
    accelerated: string;
    r1Title: string; r1Desc: string;
    r2Title: string; r2Desc: string;
    r3Title: string; r3Desc: string;
    r4Title: string; r4Desc: string;
  }> = {
    en: {
      badge: "WHY PARTNER WITH US",
      title: "Why Organizations Choose HyperCode",
      description: "Traditional enterprise IT consulting models require months of audits, spec drafting, and bloated onboarding cycles. HyperCode merges strategic blueprints with a pre-vetted national staffing pool to cut deployment speed in half.",
      timelineHeader: "AVERAGE DEPLOYMENT TIMELINE",
      traditional: "Traditional Integrators",
      accelerated: "HyperCode Accelerated Engine",
      r1Title: "Enterprise Expertise", r1Desc: "Deep experience in web applications, analytics, cloud databases, and enterprise systems.",
      r2Title: "Flexible Talent Solutions", r2Desc: "Contract, contract-to-hire, and direct placement services.",
      r3Title: "Nationwide Delivery", r3Desc: "Supporting commercial and government organizations across the United States.",
      r4Title: "Long-Term Partnerships", r4Desc: "Focused on trust, accountability, and measurable business outcomes."
    },
    es: {
      badge: "POR QUÉ ASOCIARSE CON NOSOTROS",
      title: "Por qué las Organizaciones Elijen HyperCode",
      description: "Los modelos tradicionales de consultoría de TI empresarial requieren meses de auditorías, redacción de especificaciones y ciclos de incorporación inflados. HyperCode fusiona planes estratégicos con un grupo nacional de personal preseleccionado para reducir la velocidad de implementación a la mitad.",
      timelineHeader: "CRONOGRAMA PROMEDIO DE IMPLEMENTACIÓN",
      traditional: "Integradores Tradicionales",
      accelerated: "Motor Acelerado HyperCode",
      r1Title: "Experiencia Empresarial", r1Desc: "Profunda experiencia en aplicaciones web, analítica, bases de datos en la nube y sistemas empresariales.",
      r2Title: "Soluciones Flexibles de Talento", r2Desc: "Servicios de contrato, contrato a contratación y colocación directa.",
      r3Title: "Entrega a Nivel Nacional", r3Desc: "Apoyo a organizaciones comerciales y gubernamentales en todo Estados Unidos.",
      r4Title: "Asociaciones a Largo Plazo", r4Desc: "Enfocado en la confianza, la responsabilidad y los resultados comerciales medibles."
    }
  };

  const curr = trans[locale] || trans.en;

  const reasons = [
    {
      icon: Award,
      title: curr.r1Title,
      desc: curr.r1Desc,
    },
    {
      icon: Users,
      title: curr.r2Title,
      desc: curr.r2Desc,
    },
    {
      icon: Globe,
      title: curr.r3Title,
      desc: curr.r3Desc,
    },
    {
      icon: Handshake,
      title: curr.r4Title,
      desc: curr.r4Desc,
    },
  ];

  const comparisonRows = [
    { metric: locale === 'es' ? 'Velocidad de Arranque' : 'Onboarding & Kickoff', hc: '4-6 Weeks', trad: '18-24 Weeks', highlight: true },
    { metric: locale === 'es' ? 'Integración de IA' : 'AI Engine & Agent Automation', hc: 'Standard / Custom Built', trad: 'Manual / Heavy Coding Add-ons', highlight: false },
    { metric: locale === 'es' ? 'Fuerza de Trabajo' : 'Talent Pool Reach', hc: 'Pre-Vetted Nationwide', trad: 'Local Sourcing / Slow Recruits', highlight: false },
    { metric: locale === 'es' ? 'Transparencia de Costos' : 'Billing & Overhead Structure', hc: 'Optimized / No Bloat', trad: 'Heavy Account Management Fees', highlight: false },
    { metric: locale === 'es' ? 'Modelo de Soporte' : 'Post-Delivery Handover', hc: 'Active Code & Mentoring', trad: 'Lock-in Retainers Required', highlight: true }
  ];

  return (
    <section className="py-32 bg-white dark:bg-[#07090e] border-t border-b border-slate-100 dark:border-slate-900 text-left relative overflow-hidden bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="max-w-3xl mb-20 space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C81]" />
            {curr.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {curr.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
            {curr.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Timeline & Grid Matrix */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Timeline comparison */}
            <div className="bg-slate-50 dark:bg-[#0b0f19] border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-8 space-y-6 shadow-sm">
              <span className="text-[10px] font-extrabold text-[#0F4C81] dark:text-blue-400 tracking-widest uppercase block">
                {curr.timelineHeader}
              </span>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-500">
                  <span>{curr.traditional}</span>
                  <span className="text-rose-600 font-extrabold">18-24 Weeks</span>
                </div>
                <div className="h-3 w-full bg-slate-200/50 dark:bg-slate-900 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-rose-500/40 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  <span>{curr.accelerated}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">4-6 Weeks</span>
                </div>
                <div className="h-3 w-full bg-slate-200/50 dark:bg-slate-900 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#0F4C81] to-emerald-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '25%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>

            {/* Comparison Matrix Table */}
            <div className="bg-white dark:bg-[#0b0f19]/40 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/60 dark:border-slate-800/60 flex justify-between items-center">
                <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">{locale === 'es' ? 'Matriz Comparativa' : 'Feature Comparison'}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enterprise Class</span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-900">
                {comparisonRows.map((row, index) => (
                  <div key={index} className={`p-5 flex justify-between items-center gap-4 ${row.highlight ? 'bg-blue-50/20 dark:bg-blue-950/10' : ''}`}>
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300">{row.metric}</div>
                    <div className="flex items-center gap-6 text-right">
                      <div className="text-xs font-extrabold text-[#0F4C81] dark:text-blue-400 flex items-center gap-1.5">
                        <CheckCircle2 size={12} className="text-emerald-500" />
                        {row.hc}
                      </div>
                      <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                        <XCircle size={12} className="text-slate-300 dark:text-slate-700" />
                        {row.trad}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Grid of Differentiators */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={index}
                  className="p-8 rounded-3xl border border-slate-200/60 dark:border-slate-850 bg-white dark:bg-[#0b0f19] shadow-sm hover:shadow-md hover:border-[#0F4C81] dark:hover:border-blue-500/80 transition-all duration-300 flex flex-col justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="space-y-5">
                    <div className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-[#0F4C81] dark:text-blue-400 flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-slate-900 dark:text-slate-200">
                        {reason.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                        {reason.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
