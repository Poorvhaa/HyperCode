'use client';

import { Award, Users, Globe, Handshake } from 'lucide-react';
import { useLocale } from 'next-intl';

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

  return (
    <section className="py-24 bg-slate-50 border-t border-b border-slate-100 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Timeline Comparison */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">{curr.badge}</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              {curr.title}
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              {curr.description}
            </p>

            {/* Comparison timelines */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase block">
                {curr.timelineHeader}
              </span>
              
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px] text-slate-500 font-bold uppercase">
                  <span>{curr.traditional}</span>
                  <span className="text-rose-600">18-24 Weeks</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-rose-500/30 rounded-full" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px] text-slate-800 font-bold uppercase">
                  <span>{curr.accelerated}</span>
                  <span className="text-emerald-600 font-bold">4-6 Weeks</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0F4C81] rounded-full w-[25%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Grid of Differentiators */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 text-[#0F4C81] flex items-center justify-center mb-4">
                      <Icon size={18} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                      {reason.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {reason.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
