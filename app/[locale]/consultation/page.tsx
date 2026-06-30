import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ConsultationForm } from '@/components/consultation-form';
import { ShieldCheck, BarChart4, Users2, FileCode2 } from 'lucide-react';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: 'Common' });
  return {
    title: `HyperCode | Schedule Consultation | Enterprise Solutions`,
    description: "Request a project consultation or staffing review with our practice directors and solutions architects. Headquartered in Schaumburg, IL.",
    alternates: {
      canonical: `https://www.hypercode.com/${locale}/consultation`,
    },
  };
}

export default async function ConsultationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Translations for all 11 languages
  const localTrans: Record<string, {
    title: string;
    titleHighlight: string;
    subtitle: string;
    badge: string;
    heading: string;
    description: string;
    formTitle: string;
    props: Array<{
      title: string;
      desc: string;
    }>;
  }> = {
    en: {
      title: "Request a",
      titleHighlight: "Consultation",
      subtitle: "Partner with HyperCode to architect robust cloud data systems, optimize analytics dashboards, or scale your engineering capabilities.",
      badge: "WHY HYPERCODE",
      heading: "What to Expect From Our Call",
      description: "Our introductory sessions are technically focused discussions directly with practice leads, not standard high-pressure sales calls.",
      formTitle: "Consultation Request Form",
      props: [
        {
          title: "Technical Alignment",
          desc: "We outline high-level pipeline and architecture drafts matching your Snowflake, dbt, or Power BI scope.",
        },
        {
          title: "Budget & Scoping",
          desc: "Receive rough order of magnitude (ROM) pricing models and agile phase breakdowns based on your timeline.",
        },
        {
          title: "Resource Sourcing",
          desc: "We map your required tech stacks to our active network of pre-vetted senior engineering talent.",
        },
        {
          title: "NDA Protected",
          desc: "Your business challenges and data structures remain fully confidential. We happily execute mutual NDAs.",
        },
      ],
    },
    es: {
      title: "Solicite una",
      titleHighlight: "Consulta",
      subtitle: "Asóciese con HyperCode para diseñar sistemas sólidos de datos en la nube, optimizar paneles de análisis o ampliar sus capacidades de ingeniería.",
      badge: "¿POR QUÉ HYPERCODE?",
      heading: "Qué esperar de nuestra llamada",
      description: "Nuestras sesiones introductorias son discusiones con un enfoque técnico directamente con directores de práctica, no llamadas de ventas de alta presión tradicionales.",
      formTitle: "Formulario de Solicitud de Consulta",
      props: [
        {
          title: "Alineación Técnica",
          desc: "Esbozamos borradores de flujo de datos y arquitectura de alto nivel que coincidan con su alcance de Snowflake, dbt o Power BI.",
        },
        {
          title: "Presupuesto y Alcance",
          desc: "Reciba modelos de precios de orden de magnitud aproximado (ROM) y desgloses de fases ágiles basados en su cronograma.",
        },
        {
          title: "Búsqueda de Recursos",
          desc: "Mapeamos sus pilas tecnológicas requeridas con nuestra red activa de talentos de ingeniería senior preseleccionados.",
        },
        {
          title: "Protección por NDA",
          desc: "Sus desafíos comerciales y estructuras de datos siguen siendo completamente confidenciales. Firmamos con gusto acuerdos de confidencialidad mutuos.",
        },
      ],
    }
  };

  const activeTrans = localTrans[locale] || localTrans.en;

  return (
    <main className="relative w-full bg-white text-left">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-slate-50 pt-36 pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {activeTrans.title} <span className="text-[#0F4C81]">{activeTrans.titleHighlight}</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
              {activeTrans.subtitle}
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
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{activeTrans.badge}</h3>
                <h2 className="text-2xl font-extrabold text-slate-900">{activeTrans.heading}</h2>
              </div>
              
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                {activeTrans.description}
              </p>

              <div className="space-y-6 pt-4 border-t border-slate-100">
                {/* Prop 1 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0F4C81]/5 border border-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                    <FileCode2 size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{activeTrans.props[0].title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium mt-1">
                      {activeTrans.props[0].desc}
                    </p>
                  </div>
                </div>

                {/* Prop 2 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0F4C81]/5 border border-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                    <BarChart4 size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{activeTrans.props[1].title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium mt-1">
                      {activeTrans.props[1].desc}
                    </p>
                  </div>
                </div>

                {/* Prop 3 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0F4C81]/5 border border-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                    <Users2 size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{activeTrans.props[2].title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium mt-1">
                      {activeTrans.props[2].desc}
                    </p>
                  </div>
                </div>

                {/* Prop 4 */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0F4C81]/5 border border-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{activeTrans.props[3].title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium mt-1">
                      {activeTrans.props[3].desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Consultation Request Form (Right Columns) */}
            <div className="lg:col-span-2">
              <div className="p-6 sm:p-10 rounded-3xl border border-slate-200 bg-white shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">{activeTrans.formTitle}</h2>
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
