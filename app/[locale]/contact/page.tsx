import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ContactForm } from '@/components/contact-form';
import { Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: 'Common' });
  return {
    title: `HyperCode | Contact | General Inquiries & Partnerships`,
    description: "HyperCode can be contacted for general business inquiries, career questions, partnership proposals, and media requests. Headquartered in Schaumburg, IL.",
    alternates: {
      canonical: `https://www.hypercode.com/${locale}/contact`,
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Translations for all 11 languages
  const localTrans: Record<string, {
    title: string;
    titleHighlight: string;
    subtitle: string;
    hq: string;
    hqDesc: string;
    hours: string;
    hoursDesc: string;
    hoursSub: string;
    slaBadge: string;
    slaTitle: string;
    slaDesc: string;
    formTitle: string;
    boxConsultingTitle: string;
    boxConsultingDesc: string;
    boxConsultingLink: string;
    boxStaffingTitle: string;
    boxStaffingDesc: string;
    boxStaffingLink: string;
    boxPartnershipTitle: string;
    boxPartnershipDesc: string;
    boxPartnershipFooter: string;
  }> = {
    en: {
      title: "Contact",
      titleHighlight: "HyperCode",
      subtitle: "Have a general question, career inquiry, or partnership opportunity? We would love to hear from you.",
      hq: "Headquarters",
      hqDesc: "Serving clients nationwide",
      hours: "Business Hours",
      hoursDesc: "Monday - Friday: 8:00 AM - 6:00 PM CST",
      hoursSub: "After-hours by request",
      slaBadge: "Response SLA",
      slaTitle: "Within 24 Hours",
      slaDesc: "We review every inquiry and route it to the appropriate department promptly.",
      formTitle: "Send a Message",
      boxConsultingTitle: "For Consulting",
      boxConsultingDesc: "Looking to architect a new cloud solution, optimize analytics, or scope an enterprise data project?",
      boxConsultingLink: "Request Consultation",
      boxStaffingTitle: "For Staffing",
      boxStaffingDesc: "Need contract talent, team augmentation, or permanent placements for your engineering squads?",
      boxStaffingLink: "Request Staffing",
      boxPartnershipTitle: "For Partnerships",
      boxPartnershipDesc: "Interested in joint technology offerings, reseller options, or strategic system integration alliances?",
      boxPartnershipFooter: 'Select "Partnership Opportunity" above',
    },
    es: {
      title: "Contacto",
      titleHighlight: "HyperCode",
      subtitle: "¿Tiene alguna pregunta general, consulta sobre carreras o alguna oportunidad de asociación? Nos encantaría saber de usted.",
      hq: "Sede Central",
      hqDesc: "Sirviendo a clientes en todo el país",
      hours: "Horario Comercial",
      hoursDesc: "Lunes - Viernes: 8:00 AM - 6:00 PM CST",
      hoursSub: "Fuera de horario a petición",
      slaBadge: "SLA de Respuesta",
      slaTitle: "En 24 Horas",
      slaDesc: "Revisamos cada consulta y la dirigimos rápidamente al departamento correspondiente.",
      formTitle: "Enviar un Mensaje",
      boxConsultingTitle: "Para Consultoría",
      boxConsultingDesc: "¿Busca diseñar una nueva solución en la nube, optimizar el análisis o definir el alcance de un proyecto de datos empresarial?",
      boxConsultingLink: "Solicitar Consulta",
      boxStaffingTitle: "Para Personal",
      boxStaffingDesc: "¿Necesita personal por contrato, aumento de equipo o colocaciones permanentes para sus equipos de ingeniería?",
      boxStaffingLink: "Solicitar Personal",
      boxPartnershipTitle: "Para Asociaciones",
      boxPartnershipDesc: "¿Interesado en ofertas conjuntas de tecnología, opciones de revendedor o alianzas estratégicas de integración de sistemas?",
      boxPartnershipFooter: 'Seleccione "Oportunidad de Asociación" arriba',
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

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              {/* Location */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4C81]">
                    <MapPin size={20} />
                  </div>
                  <h3 className="font-bold text-slate-900">{activeTrans.hq}</h3>
                </div>
                <div className="pl-13 space-y-1">
                  <p className="text-sm font-semibold text-slate-700">Schaumburg, Illinois</p>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{activeTrans.hqDesc}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4C81]">
                    <Clock size={20} />
                  </div>
                  <h3 className="font-bold text-slate-900">{activeTrans.hours}</h3>
                </div>
                <div className="pl-13 space-y-1.5 text-sm font-semibold text-slate-700">
                  <p>{activeTrans.hoursDesc}</p>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{activeTrans.hoursSub}</p>
                </div>
              </div>

              {/* Response Time Card */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm space-y-2">
                <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">{activeTrans.slaBadge}</p>
                <p className="text-2xl font-bold text-[#0F4C81]">{activeTrans.slaTitle}</p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {activeTrans.slaDesc}
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="p-6 sm:p-10 rounded-3xl border border-slate-200 bg-white shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">{activeTrans.formTitle}</h2>
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Additional Info Cards Grid */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Box 1 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">{activeTrans.boxConsultingTitle}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                  {activeTrans.boxConsultingDesc}
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href={`/${locale}/consultation`}
                  className="inline-flex items-center text-xs font-bold text-[#0F4C81] hover:text-[#0c3c66] transition-colors gap-1"
                >
                  <span>{activeTrans.boxConsultingLink}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Box 2 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">{activeTrans.boxStaffingTitle}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                  {activeTrans.boxStaffingDesc}
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href={`/${locale}/consultation?service=IT%20Staffing`}
                  className="inline-flex items-center text-xs font-bold text-[#0F4C81] hover:text-[#0c3c66] transition-colors gap-1"
                >
                  <span>{activeTrans.boxStaffingLink}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Box 3 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">{activeTrans.boxPartnershipTitle}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                  {activeTrans.boxPartnershipDesc}
                </p>
              </div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {activeTrans.boxPartnershipFooter}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
