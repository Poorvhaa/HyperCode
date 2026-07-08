import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ContactForm } from '@/components/contact-form';
import { Mail, MapPin, Clock, ArrowRight, Award, Shield } from 'lucide-react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { HeroBanner } from '@/components/hero-banner';

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

  // Translations for English and Spanish
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
      title: "Connect with",
      titleHighlight: "HyperCode",
      subtitle: "Whether you have an upcoming project, a staffing request, or a strategic partnership proposal, we are ready to accelerate your goals.",
      hq: "Headquarters",
      hqDesc: "Serving commercial & government clients nationwide",
      hours: "Business Hours",
      hoursDesc: "Monday - Friday: 8:00 AM - 6:00 PM CST",
      hoursSub: "After-hours response on request",
      slaBadge: "Response Service SLA",
      slaTitle: "Within 24 Hours",
      slaDesc: "Every inquiry is assigned to a practice director and reviewed with priority.",
      formTitle: "Send Us a Message",
      boxConsultingTitle: "For Consulting",
      boxConsultingDesc: "Looking to architect a new cloud solution, optimize analytics, or scope an enterprise data project?",
      boxConsultingLink: "Request Consultation",
      boxStaffingTitle: "For Staffing",
      boxStaffingDesc: "Need contract talent, team augmentation, or permanent placements for your engineering squads?",
      boxStaffingLink: "Request Staffing",
      boxPartnershipTitle: "For Partnerships",
      boxPartnershipDesc: "Interested in joint technology offerings, reseller options, or strategic system integration alliances?",
      boxPartnershipFooter: 'Select "Partnership Opportunity" in dropdown',
    },
    es: {
      title: "Conéctese con",
      titleHighlight: "HyperCode",
      subtitle: "Ya sea que tenga un próximo proyecto, una solicitud de personal o una propuesta de asociación estratégica, estamos listos para acelerar sus metas.",
      hq: "Sede Central",
      hqDesc: "Sirviendo a clientes comerciales y gubernamentales en todo el país",
      hours: "Horario Comercial",
      hoursDesc: "Lunes - Viernes: 8:00 AM - 6:00 PM CST",
      hoursSub: "Respuesta fuera de horario bajo solicitud",
      slaBadge: "SLA de Respuesta de Servicio",
      slaTitle: "En 24 Horas",
      slaDesc: "Cada consulta se asigna a un director de práctica y se revisa con prioridad.",
      formTitle: "Envíenos un Mensaje",
      boxConsultingTitle: "Para Consultoría",
      boxConsultingDesc: "¿Busca diseñar una nueva solución en la nube, optimizar el análisis o definir el alcance de un proyecto de datos empresarial?",
      boxConsultingLink: "Solicitar Consulta",
      boxStaffingTitle: "Para Personal",
      boxStaffingDesc: "¿Necesita personal por contrato, aumento de equipo o colocaciones permanentes para sus equipos de ingeniería?",
      boxStaffingLink: "Solicitar Personal",
      boxPartnershipTitle: "Para Asociaciones",
      boxPartnershipDesc: "¿Interesado en ofertas conjuntas de tecnología, opciones de revendedor o alianzas estratégicas de integración de sistemas?",
      boxPartnershipFooter: 'Seleccione "Oportunidad de Asociación" en el formulario',
    }
  };

  const activeTrans = localTrans[locale] || localTrans.en;

  return (
    <main className="relative w-full bg-white text-left min-h-screen bg-dot-pattern">
      <Navigation />

      {/* Contact Reusable Hero Banner */}
      <HeroBanner
        bgImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=1600"
        categoryLabel={locale === 'es' ? 'CONTACTAR NUESTRO EQUIPO' : 'GET IN TOUCH'}
        title={activeTrans.title}
        titleHighlight={activeTrans.titleHighlight}
        subtitle={activeTrans.subtitle}
        breadcrumbs={[
          { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
          { label: locale === 'es' ? 'Contacto' : 'Contact Us' }
        ]}
      />

      {/* Contact Split Layout */}
      <section className="section-padding bg-white border-b border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Contact Cards & Office Details (5 columns) */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Welcoming Office Visual */}
              <div className="relative w-full h-[220px] rounded-[24px] overflow-hidden border border-slate-200 shadow-md">
                <Image
                  src="/images/contact-office.png"
                  alt="HyperCode Office Environment"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-500 select-none pointer-events-none"
                />
                <div className="absolute inset-0 bg-slate-900/10" />
              </div>

              {/* Location Card */}
              <div className="premium-card bg-white border border-slate-200 rounded-[24px] p-7 shadow-sm space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0F4C81] shadow-sm">
                    <MapPin size={20} />
                  </div>
                  <h3 className="font-extrabold text-slate-900 uppercase text-xs tracking-wider">{activeTrans.hq}</h3>
                </div>
                <div className="pl-13 space-y-2">
                  <p className="text-[16px] font-bold text-slate-800">2095 Hammond Dr, Suite C</p>
                  <p className="text-[16px] font-bold text-slate-800">Schaumburg, IL 60173</p>
                  <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">{activeTrans.hqDesc}</p>
                </div>
              </div>

              {/* Hours Card */}
              <div className="premium-card bg-white border border-slate-200 rounded-[24px] p-7 shadow-sm space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0F4C81] shadow-sm">
                    <Clock size={20} />
                  </div>
                  <h3 className="font-extrabold text-slate-900 uppercase text-xs tracking-wider">{activeTrans.hours}</h3>
                </div>
                <div className="pl-13 space-y-2 text-[16px] font-bold text-slate-800">
                  <p>{activeTrans.hoursDesc}</p>
                  <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">{activeTrans.hoursSub}</p>
                </div>
              </div>

              {/* Response Time SLA Card */}
              <div className="premium-card p-7 bg-[#0F4C81]/5 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-extrabold tracking-wider text-slate-500 uppercase">{activeTrans.slaBadge}</span>
                </div>
                <p className="text-3xl font-black text-[#0F4C81]">{activeTrans.slaTitle}</p>
                <p className="text-[16px] md:text-[17px] text-slate-655 leading-[1.7] font-semibold">
                  {activeTrans.slaDesc}
                </p>
              </div>

              {/* Secure Trust Badge */}
              <div className="flex items-center gap-3 px-6 py-4 bg-slate-50 border border-slate-200 rounded-[16px]">
                <Shield size={16} className="text-[#0F4C81]" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SSL Encrypted Intake System</span>
              </div>

            </div>

            {/* Right Column: Contact Form (7 columns) */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-[24px] p-8 sm:p-10 shadow-lg">
              <div className="space-y-2 mb-8">
                <h2 className="text-[28px] sm:text-[32px] font-black text-slate-900 tracking-tight leading-[1.2]">{activeTrans.formTitle}</h2>
                <p className="text-[16px] font-semibold text-slate-500">Complete the form below to route directly to our solutions directors.</p>
              </div>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* Grid of Solutions Specific CTAs */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Box 1 */}
            <div className="premium-card p-8 bg-white border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between hover:-translate-y-1 hover:border-[#0F4C81] transition-all duration-300">
              <div className="space-y-4">
                <h3 className="text-[22px] font-bold text-slate-900 leading-[1.2]">{activeTrans.boxConsultingTitle}</h3>
                <p className="text-[16px] md:text-[17px] text-slate-655 leading-[1.7] font-semibold">
                  {activeTrans.boxConsultingDesc}
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/consultation"
                  className="inline-flex items-center text-xs font-bold text-[#0F4C81] hover:gap-2 transition-all gap-1"
                >
                  <span>{activeTrans.boxConsultingLink}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Box 2 */}
            <div className="premium-card p-8 bg-white border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between hover:-translate-y-1 hover:border-[#0F4C81] transition-all duration-300">
              <div className="space-y-4">
                <h3 className="text-[22px] font-bold text-slate-900 leading-[1.2]">{activeTrans.boxStaffingTitle}</h3>
                <p className="text-[16px] md:text-[17px] text-slate-655 leading-[1.7] font-semibold">
                  {activeTrans.boxStaffingDesc}
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/consultation?service=IT%20Staffing"
                  className="inline-flex items-center text-xs font-bold text-[#0F4C81] hover:gap-2 transition-all gap-1"
                >
                  <span>{activeTrans.boxStaffingLink}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Box 3 */}
            <div className="premium-card p-8 bg-white border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between hover:-translate-y-1 hover:border-[#0F4C81] transition-all duration-300">
              <div className="space-y-4">
                <h3 className="text-[22px] font-bold text-slate-900 leading-[1.2]">{activeTrans.boxPartnershipTitle}</h3>
                <p className="text-[16px] md:text-[17px] text-slate-655 leading-[1.7] font-semibold">
                  {activeTrans.boxPartnershipDesc}
                </p>
              </div>
              <p className="text-[10px] font-extrabold text-[#0F4C81] uppercase tracking-wider">
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
