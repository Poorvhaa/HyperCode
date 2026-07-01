'use client';

import { useState } from 'react';
import { ClipboardList, Users, Search, UserCheck, ShieldCheck, GraduationCap, CalendarDays, ArrowRight, UserPlus } from 'lucide-react';
import { Link } from '@/i18n/routing';

interface StaffingOffer {
  title: string;
  desc: string;
  icon: any;
}

interface WorkflowStep {
  title: string;
  icon: any;
  detailTitle: string;
  detailDesc: string;
  metric: string;
}

export function StaffingExperience() {
  const [activeStep, setActiveStep] = useState(0);

  const staffingOffers: StaffingOffer[] = [
    {
      title: 'Contract Staffing',
      desc: 'Inject specialized technology talent into active projects to meet critical development cycles without long-term overhead.',
      icon: Users,
    },
    {
      title: 'Staff Augmentation',
      desc: 'Scale your internal teams seamlessly with our highly vetted developers, BI analysts, and data architects.',
      icon: UserPlus,
    },
    {
      title: 'Direct Placement',
      desc: 'Access our nationwide recruitment pipeline to secure permanent, top-tier leadership and technical staff.',
      icon: ShieldCheck,
    },
    {
      title: 'Project Teams',
      desc: 'Deploy pre-configured, co-managed engineering squads capable of executing projects from design to rollout.',
      icon: ClipboardList,
    },
  ];

  const workflowSteps: WorkflowStep[] = [
    {
      title: 'Requirements',
      icon: ClipboardList,
      detailTitle: 'Talent Alignment & Tech Audit',
      detailDesc: 'We coordinate with your technical leads to document strict requirements, including tech stack nuances, security clearance mandates, and cultural fit factors.',
      metric: '24 hr intake alignment',
    },
    {
      title: 'Screening',
      icon: Search,
      detailTitle: 'Multi-Phase Sourcing',
      detailDesc: 'We query our national database and screen candidates, verifying engineering histories, checks, and references.',
      metric: 'Top 5% candidate funnel',
    },
    {
      title: 'Evaluation',
      icon: GraduationCap,
      detailTitle: 'Strict Technical Assessment',
      detailDesc: 'Candidates undergo technical vetting, including scenario evaluations overseen by our senior consultants.',
      metric: '85% technical pass bar',
    },
    {
      title: 'Interview',
      icon: CalendarDays,
      detailTitle: 'Seamless Client Panels',
      detailDesc: 'We coordinate interview sessions between your managers and pre-vetted devs, delivering deep developer profiles beforehand.',
      metric: '2.5 avg interviews to hire',
    },
    {
      title: 'Placement',
      icon: UserCheck,
      detailTitle: 'Onboarding Support',
      detailDesc: 'We manage full onboarding, setup, and 30/60/90-day checkpoints with your team leads to assure project success.',
      metric: '98% retention rate',
    },
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-b border-slate-100 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">STAFFING SOLUTIONS</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
            Scale With Strategic Talent
          </h3>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-medium">
            From temporary staffing surges to permanent executive hires, we provide enterprise-ready talent to accelerate your digital projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left offerings column */}
          <div className="lg:col-span-5 space-y-6">
            <h4 className="text-lg font-bold text-slate-900 mb-2">Flexible Engagement Models</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {staffingOffers.map((offer, idx) => {
                const Icon = offer.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 text-[#0F4C81] flex items-center justify-center mb-4">
                      <Icon size={18} />
                    </div>
                    <h5 className="text-sm font-bold text-slate-900 mb-1">{offer.title}</h5>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{offer.desc}</p>
                  </div>
                );
              })}
            </div>
            <div className="pt-2">
              <Link
                href="/consultation?service=IT%20Staffing"
                className="inline-flex items-center text-xs font-bold text-[#0F4C81] hover:text-[#0c3c66] transition-colors group"
              >
                <span>Request talent from our coordinators</span>
                <ArrowRight size={14} className="ml-1.5" />
              </Link>
            </div>
          </div>

          {/* Right interactive workflow pipeline column */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
              <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase">Talent Pipeline Steps</h4>
              <span className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Vetting Active
              </span>
            </div>

            {/* Simple Stepper Nodes */}
            <div className="flex justify-between items-center mb-8 w-full border-b border-slate-100 pb-6">
              {workflowSteps.map((step, idx) => {
                const StepIcon = step.icon;
                const isActive = idx === activeStep;

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className="flex flex-col items-center focus:outline-none relative cursor-pointer bg-transparent border-none"
                  >
                    <div
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200 ${
                        isActive
                          ? 'bg-[#0F4C81] text-white border-[#0F4C81]'
                          : 'bg-slate-50 text-slate-400 border-slate-200 hover:border-slate-350'
                      }`}
                    >
                      <StepIcon size={14} />
                    </div>
                    <span
                      className={`text-[9px] font-bold tracking-wider uppercase mt-1.5 transition-colors ${
                        isActive ? 'text-[#0F4C81]' : 'text-slate-500'
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Step detail panel */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 min-h-[160px] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start flex-wrap gap-2 text-left">
                  <div>
                    <span className="text-[9px] font-bold text-[#0F4C81] uppercase tracking-widest block mb-0.5">
                      STEP {activeStep + 1} Pipeline
                    </span>
                    <h5 className="text-base font-bold text-slate-900">
                      {workflowSteps[activeStep].detailTitle}
                    </h5>
                  </div>
                  <div className="px-2 py-0.5 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold rounded uppercase">
                    {workflowSteps[activeStep].metric}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium text-left">
                  {workflowSteps[activeStep].detailDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
