'use client';

import { useState } from 'react';
import { FileText, Search, Phone, Users, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { useLocale } from 'next-intl';

export function HiringTimeline() {
  const locale = useLocale();
  const [activeStep, setActiveStep] = useState(0);
  const [openAccordions, setOpenAccordions] = useState<Record<number, boolean>>({ 0: true });

  const toggleAccordion = (index: number) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Local translations for the hiring timeline steps
  const translations: Record<string, {
    stepLabel: string;
    steps: Array<{
      number: string;
      title: string;
      shortDesc: string;
      longDesc: string;
    }>;
  }> = {
    en: {
      stepLabel: "Step",
      steps: [
        {
          number: '01',
          title: 'Apply',
          shortDesc: 'Submit your application online.',
          longDesc: 'Submit your resume and background details through our simplified online portal. Our recruiting technologies instantly route your profile to the practice teams matching your core technical background.',
        },
        {
          number: '02',
          title: 'Review',
          shortDesc: 'Recruiters evaluate qualifications and experience.',
          longDesc: 'Our technical sourcing experts evaluate your background, credentials, and project experience against active consulting needs, checking for alignment with our engineering standards.',
        },
        {
          number: '03',
          title: 'Connect',
          shortDesc: 'Initial discussion regarding career goals and opportunities.',
          longDesc: 'Engage in a professional, consultative discussion about your career goals, technological focus, compensation parameters, and client environment preferences to ensure mutual long-term alignment.',
        },
        {
          number: '04',
          title: 'Interview',
          shortDesc: 'Meet hiring managers and project teams.',
          longDesc: 'Participate in structured, human-centered assessments. Discuss technical architectures, walk through past project outcomes, and interface directly with the project delivery leaders you will support.',
        },
        {
          number: '05',
          title: 'Offer',
          shortDesc: 'Receive offer and onboarding support.',
          longDesc: 'Upon approval, receive a transparent, competitive offer outlining salary, comprehensive health plans, and retirement matching. Our team provides dedicated onboarding coordinators to guide you through project integration.',
        },
      ]
    },
    es: {
      stepLabel: "Paso",
      steps: [
        {
          number: '01',
          title: 'Aplicar',
          shortDesc: 'Presente su solicitud en línea.',
          longDesc: 'Envíe su currículum y detalles de antecedentes a través de nuestro portal simplificado en línea. Nuestras tecnologías de reclutamiento dirigen instantáneamente su perfil a los equipos de práctica que coinciden con su formación técnica principal.',
        },
        {
          number: '02',
          title: 'Revisión',
          shortDesc: 'Los reclutadores evalúan las cualificaciones y la experiencia.',
          longDesc: 'Nuestros expertos en abastecimiento técnico evalúan sus antecedentes, credenciales y experiencia en proyectos en relación con las necesidades de consultoría activas, verificando la alíneación con nuestros estándares de ingeniería.',
        },
        {
          number: '03',
          title: 'Conectar',
          shortDesc: 'Discusión inicial sobre metas profesionales y oportunidades.',
          longDesc: 'Participe en una discusión profesional y consultiva sobre sus metas profesionales, enfoque tecnológico, parámetros de compensación y preferencias de entorno del cliente para garantizar una alineación mutua a largo plazo.',
        },
        {
          number: '04',
          title: 'Entrevista',
          shortDesc: 'Reúnase con los gerentes de contratación y los equipos de proyecto.',
          longDesc: 'Participe en evaluaciones estructuradas y centradas en el ser humano. Discuta las arquitecturas técnicas, repase los resultados de proyectos anteriores e interactúe directamente con los líderes de entrega de proyectos a los que apoyará.',
        },
        {
          number: '05',
          title: 'Oferta',
          shortDesc: 'Reciba la oferta y apoyo para la incorporación.',
          longDesc: 'Tras la aprobación, reciba una oferta transparente y competitiva que detalla el salario, los planes de salud integrales y el emparejamiento de jubilación. Nuestro equipo proporciona coordinadores de incorporación dedicados para guiarlo a través de la integración del proyecto.',
        },
      ]
    }
  };

  const activeTranslation = translations[locale] || translations.en;
  const steps = activeTranslation.steps;
  const stepLabel = activeTranslation.stepLabel;

  // Render matching icons dynamically
  const icons = [FileText, Search, Phone, Users, Award];

  return (
    <div className="w-full">
      {/* Desktop Interactive Timeline */}
      <div className="hidden md:block space-y-12">
        {/* Progress Timeline Nodes */}
        <div className="relative flex justify-between items-center max-w-4xl mx-auto px-4">
          {/* Connector Line */}
          <div className="absolute left-10 right-10 top-6 h-0.5 bg-slate-200 -z-10">
            <div
              className="h-full bg-[#0F4C81] transition-all duration-500 ease-in-out"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {steps.map((step, idx) => {
            const Icon = icons[idx] || FileText;
            const isActive = idx === activeStep;
            const isCompleted = idx < activeStep;

            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className="flex flex-col items-center focus:outline-none group cursor-pointer"
              >
                <div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-[#0F4C81] border-[#0F4C81] text-white shadow-md shadow-slate-100 scale-110'
                      : isCompleted
                      ? 'bg-slate-50 border-[#0F4C81] text-[#0F4C81]'
                      : 'bg-white border-slate-200 text-slate-400 group-hover:border-slate-300 group-hover:text-slate-600'
                  }`}
                >
                  <Icon size={18} />
                </div>
                <span
                  className={`mt-3 text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                    isActive ? 'text-slate-900 font-extrabold' : 'text-slate-500 group-hover:text-slate-700'
                  }`}
                >
                  {step.title}
                </span>
                <span className="text-[10px] text-slate-400 font-bold mt-0.5">
                  {stepLabel} {step.number}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Step Detail Display */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex items-start gap-6 transition-all duration-300 hover:border-slate-300">
            <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
              {(() => {
                const ActiveIcon = icons[activeStep] || FileText;
                return <ActiveIcon size={24} />;
              })()}
            </div>
            
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-bold text-[#0F4C81] tracking-widest uppercase bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-md">
                  {stepLabel} {steps[activeStep].number}
                </span>
                <h4 className="text-lg font-bold text-slate-900">
                  {steps[activeStep].title}
                </h4>
              </div>
              <p className="text-sm font-semibold text-slate-800">
                {steps[activeStep].shortDesc}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {steps[activeStep].longDesc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Accordion */}
      <div className="md:hidden space-y-4">
        {steps.map((step, idx) => {
          const Icon = icons[idx] || FileText;
          const isOpen = !!openAccordions[idx];

          return (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full p-5 flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                    isOpen ? 'bg-[#0F4C81] border-[#0F4C81] text-white' : 'bg-slate-50 border-slate-100 text-[#0F4C81]'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#0F4C81] tracking-widest uppercase block">
                      {stepLabel} {step.number}
                    </span>
                    <span className="text-sm font-bold text-slate-900">{step.title}</span>
                  </div>
                </div>
                <div>
                  {isOpen ? (
                    <ChevronUp size={16} className="text-slate-400" />
                  ) : (
                    <ChevronDown size={16} className="text-slate-400" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-100 bg-slate-50/50 text-left space-y-2">
                  <p className="text-xs font-semibold text-slate-800">
                    {step.shortDesc}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {step.longDesc}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

