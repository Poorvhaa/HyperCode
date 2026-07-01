import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { CareersForm } from '@/components/careers-form';
import { ChevronLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ position?: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: 'Common' });
  return {
    title: `HyperCode | ${tc('careers')} | Apply`,
    description: "Submit your technical credentials and resume to join HyperCode's elite engineering and data squads.",
    alternates: {
      canonical: `https://www.hypercode.com/${locale}/careers/apply`,
    },
  };
}

export default async function CareersApplyPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { position } = await searchParams;
  setRequestLocale(locale);

  // Localized hero strings
  const localTrans = {
    en: {
      backBtn: "Back to Careers",
      title: "Join Our Team",
      subtitle: "Submit your details and upload your technical credentials to begin the interview process."
    },
    es: {
      backBtn: "Volver a Carreras",
      title: "Únase a Nuestro Equipo",
      subtitle: "Envíe sus detalles y cargue sus credenciales técnicas para comenzar el proceso de entrevista."
    }
  };

  const activeTrans = localTrans[locale as 'en' | 'es'] || localTrans.en;

  return (
    <main className="relative w-full bg-white text-left">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-slate-50 pt-36 pb-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-4">
            <div>
              <Link
                href="/careers"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] hover:text-[#0c3c66] transition-colors"
              >
                <ChevronLeft size={16} />
                <span>{activeTrans.backBtn}</span>
              </Link>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-none mt-2">
              {activeTrans.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-655 font-medium leading-relaxed max-w-2xl">
              {activeTrans.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Form Container */}
      <section className="py-16 bg-white min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CareersForm initialPosition={position} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
