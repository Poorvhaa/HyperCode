import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ConsultationForm } from '@/components/consultation-form';
import { ShieldCheck, BarChart4, Users2, FileCode2 } from 'lucide-react';

export const metadata = {
  title: 'Schedule Consultation | HyperCode Enterprise Solutions',
  description: 'Request a project consultation or staffing review with our practice directors and solutions architects.',
  alternates: {
    canonical: 'https://www.hypercode.com/consultation',
  },
};

export default function ConsultationPage() {
  return (
    <main className="relative w-full bg-white text-left">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-slate-50 pt-36 pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Request a <span className="text-[#0F4C81]">Consultation</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
              Partner with HyperCode to architect robust cloud data systems, optimize analytics dashboards, or scale your engineering capabilities.
            </p>
          </div>
        </div>
      </section>

      {/* Consultation Layout Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            
            {/* Consultation Value Props (Left Columns) */}
            <div className="lg:col-span-1 space-y-8">
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">WHY HYPERCODE</h3>
                <h2 className="text-2xl font-extrabold text-slate-900">What to Expect From Our Call</h2>
              </div>
              
              <p className="text-sm text-slate-655 leading-relaxed font-medium">
                Our introductory sessions are technically focused discussions directly with practice leads, not standard high-pressure sales calls.
              </p>

              <div className="space-y-6 pt-4 border-t border-slate-100">
                {/* Prop 1 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0F4C81]/5 border border-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                    <FileCode2 size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Technical Alignment</h4>
                    <p className="text-xs text-slate-550 leading-relaxed font-medium mt-1">
                      We outline high-level pipeline and architecture drafts matching your Snowflake, dbt, or Power BI scope.
                    </p>
                  </div>
                </div>

                {/* Prop 2 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0F4C81]/5 border border-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                    <BarChart4 size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Budget & Scoping</h4>
                    <p className="text-xs text-slate-550 leading-relaxed font-medium mt-1">
                      Receive rough order of magnitude (ROM) pricing models and agile phase break downs based on your timeline.
                    </p>
                  </div>
                </div>

                {/* Prop 3 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0F4C81]/5 border border-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                    <Users2 size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Resource Sourcing</h4>
                    <p className="text-xs text-slate-550 leading-relaxed font-medium mt-1">
                      We map your required tech stacks to our active network of pre-vetted senior engineering talent.
                    </p>
                  </div>
                </div>

                {/* Prop 4 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0F4C81]/5 border border-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">NDA Protected</h4>
                    <p className="text-xs text-slate-550 leading-relaxed font-medium mt-1">
                      Your business challenges and data structures remain fully confidential. We happily execute mutual NDAs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Consultation Request Form (Right Columns) */}
            <div className="lg:col-span-2">
              <div className="p-6 sm:p-10 rounded-3xl border border-slate-200 bg-white shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Consultation Request Form</h2>
                <ConsultationForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
