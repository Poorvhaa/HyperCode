'use client';

import { 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Zap, 
  Users, 
  Server, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';

export function WhyHypercodeSection() {
  const locale = useLocale();

  const trans: Record<string, {
    badge: string;
    title: string;
    description: string;
    timelineHeader: string;
    traditional: string;
    accelerated: string;
    comparisonTitle: string;
    comparisonSub: string;
    r1Title: string; r1Desc: string;
    r2Title: string; r2Desc: string;
    r3Title: string; r3Desc: string;
    r4Title: string; r4Desc: string;
    r5Title: string; r5Desc: string;
    r6Title: string; r6Desc: string;
  }> = {
    en: {
      badge: "WHY PARTNER WITH US",
      title: "Built for Enterprise Acceleration",
      description: "Traditional enterprise consulting requires months of bloated planning and slow onboarding. HyperCode merges strategic blueprints with an agile nationwide talent pool to deploy production-ready systems in weeks.",
      timelineHeader: "AVERAGE DEPLOYMENT TIMELINE",
      traditional: "Traditional Integrators",
      accelerated: "HyperCode Accelerated Engine",
      comparisonTitle: "Feature Comparison",
      comparisonSub: "Enterprise Class",
      r1Title: "AI-First Innovation", r1Desc: "Infusing generative AI and intelligent agent automation into core business workflows.",
      r2Title: "Enterprise-Grade Delivery", r2Desc: "A proven track record of engineering high-availability, secure, and compliant digital products.",
      r3Title: "Certified Tech Experts", r3Desc: "Top-tier solutions architects and developers skilled in modern cloud and database systems.",
      r4Title: "Agile Project Execution", r4Desc: "Direct, transparent delivery pipelines that eliminate administrative bloat and cut cycles in half.",
      r5Title: "Dedicated Success Manager", r5Desc: "A single senior point of contact to align project deliverables with your long-term business goals.",
      r6Title: "Secure & Scalable Tech", r6Desc: "Security-first custom architectures built for SOC 2, HIPAA, and GDPR compliance."
    },
    es: {
      badge: "POR QUÉ ASOCIARSE CON NOSOTROS",
      title: "Construido para la Aceleración Empresarial",
      description: "La consultoría tradicional requiere meses de planificación lenta e incorporación inflada. HyperCode fusiona planes estratégicos con un grupo ágil de talentos para implementar sistemas listos para producción en semanas.",
      timelineHeader: "CRONOGRAMA PROMEDIO DE IMPLEMENTACIÓN",
      traditional: "Integradores Tradicionales",
      accelerated: "Motor Acelerado HyperCode",
      comparisonTitle: "Matriz Comparativa",
      comparisonSub: "Clase Empresarial",
      r1Title: "Innovación AI-First", r1Desc: "Inyección de IA generativa y agentes inteligentes en los flujos clave de su negocio.",
      r2Title: "Entrega de Clase Empresarial", r2Desc: "Una trayectoria comprobada en la ingeniería de productos digitales seguros y de alta disponibilidad.",
      r3Title: "Expertos Certificados", r3Desc: "Arquitectos de soluciones y desarrolladores de primer nivel en sistemas de datos y nube modernos.",
      r4Title: "Ejecución de Proyectos Ágil", r4Desc: "Líneas de entrega transparentes y directas que eliminan la burocracia y reducen los tiempos a la mitad.",
      r5Title: "Gestor de Éxito Dedicado", r5Desc: "Un único punto de contacto senior para alinear las entregas del proyecto con sus objetivos comerciales.",
      r6Title: "Arquitectura Segura y Escalable", r6Desc: "Arquitecturas personalizadas creadas bajo un enfoque de seguridad y listas para SOC 2, HIPAA y GDPR."
    }
  };

  const curr = trans[locale] || trans.en;

  const reasons = [
    {
      icon: Sparkles,
      title: curr.r1Title,
      desc: curr.r1Desc,
    },
    {
      icon: ShieldCheck,
      title: curr.r2Title,
      desc: curr.r2Desc,
    },
    {
      icon: Award,
      title: curr.r3Title,
      desc: curr.r3Desc,
    },
    {
      icon: Zap,
      title: curr.r4Title,
      desc: curr.r4Desc,
    },
    {
      icon: Users,
      title: curr.r5Title,
      desc: curr.r5Desc,
    },
    {
      icon: Server,
      title: curr.r6Title,
      desc: curr.r6Desc,
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
    <section className="section-padding bg-white border-t border-b border-slate-200 text-left relative overflow-hidden bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="max-w-3xl mb-20 space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C81]" />
            {curr.badge}
          </span>
          <h2 className="text-[28px] sm:text-[32px] lg:text-[40px] font-black text-slate-900 tracking-tight leading-[1.2]">
            {curr.title}
          </h2>
          <p className="text-[16px] md:text-[17px] lg:text-[18px] text-slate-650 leading-[1.7] font-semibold">
            {curr.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Timeline & Grid Matrix */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Timeline comparison */}
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-[24px] p-8 space-y-6 shadow-sm">
              <span className="text-[10px] font-extrabold text-[#0F4C81] tracking-widest uppercase block">
                {curr.timelineHeader}
              </span>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-500">
                  <span>{curr.traditional}</span>
                  <span className="text-rose-600 font-extrabold">18-24 Weeks</span>
                </div>
                <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-rose-450 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-800">
                  <span>{curr.accelerated}</span>
                  <span className="text-[#0F4C81] font-extrabold">4-6 Weeks</span>
                </div>
                <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#0F4C81]"
                    initial={{ width: 0 }}
                    whileInView={{ width: '25%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>

            {/* Comparison Matrix Table */}
            <div className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-sm">
              <div className="px-6 py-4 bg-[#F8FAFC] border-b border-slate-200 flex justify-between items-center">
                <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">{curr.comparisonTitle}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{curr.comparisonSub}</span>
              </div>
              <div className="divide-y divide-slate-100">
                {comparisonRows.map((row, index) => (
                  <div key={index} className={`p-5 flex justify-between items-center gap-4 ${row.highlight ? 'bg-blue-50/20' : ''}`}>
                    <div className="text-xs font-bold text-slate-700">{row.metric}</div>
                    <div className="flex items-center gap-6 text-right">
                      <div className="text-xs font-extrabold text-[#0F4C81] flex items-center gap-1.5">
                        <CheckCircle2 size={12} className="text-emerald-500" />
                        {row.hc}
                      </div>
                      <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                        <XCircle size={12} className="text-slate-350" />
                        {row.trad}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Grid of Differentiators */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={index}
                  className="premium-card flex flex-col justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="space-y-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 text-[#0F4C81] flex items-center justify-center">
                      <Icon size={24} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-[22px] font-bold text-slate-900 leading-[1.2]">
                        {reason.title}
                      </h4>
                      <p className="text-[16px] md:text-[17px] text-slate-600 leading-[1.7] font-medium">
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
