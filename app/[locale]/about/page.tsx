import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Target, Eye, ShieldCheck, Award, Lightbulb, Users, Cpu, Zap, BookOpen } from 'lucide-react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { HeroBanner } from '@/components/hero-banner';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: 'Common' });
  const t = await getTranslations({ locale, namespace: 'About' });
  
  return {
    title: `HyperCode | ${tc('about')}`,
    description: t('subtitle'),
    alternates: {
      canonical: `https://www.hypercode.com/${locale}/about`,
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('About');
  const tc = await getTranslations('Common');

  const coreValues = [
    {
      key: 'innovation',
      icon: Lightbulb,
    },
    {
      key: 'integrity',
      icon: ShieldCheck,
    },
    {
      key: 'excellence',
      icon: Award,
    },
    {
      key: 'partnership',
      icon: Users,
    },
  ];

  return (
    <main className="relative w-full bg-white text-left bg-dot-pattern min-h-screen">
      <Navigation />

      {/* About Reusable Hero Banner */}
      <HeroBanner
        bgImage="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600"
        categoryLabel={locale === 'es' ? 'CONÓCENOS' : 'ABOUT US'}
        title={t('title')}
        titleHighlight={t('titleHighlight')}
        subtitle={t('subtitle')}
        breadcrumbs={[
          { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
          { label: locale === 'es' ? 'Nosotros' : 'About Us' }
        ]}
      />

      {/* Storytelling Section (Alternating Left) */}
      <section className="section-padding bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-[28px] sm:text-[32px] lg:text-[40px] font-black text-slate-900 tracking-tight leading-[1.2]">{t('storyTitle')}</h2>
              <div className="space-y-4 text-[16px] md:text-[17px] lg:text-[18px] text-slate-650 leading-[1.7] font-semibold">
                <p>{t('storyP1')}</p>
                <p>{t('storyP2')}</p>
              </div>
            </div>

            <div className="lg:col-span-5 relative w-full h-[360px] rounded-[24px] overflow-hidden border border-slate-200 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=1200"
                alt="HyperCode Team Collaboration"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-900/10" />
            </div>

          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-slate-200">
            <div className="premium-card p-6 bg-slate-50 border border-slate-200 shadow-sm text-center">
              <div className="text-3xl font-black text-[#0F4C81]">{t('stats.projects')}</div>
              <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest mt-2">{t('stats.projectsLabel')}</p>
            </div>
            <div className="premium-card p-6 bg-slate-50 border border-slate-200 shadow-sm text-center">
              <div className="text-3xl font-black text-[#0F4C81]">{t('stats.satisfaction')}</div>
              <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest mt-2">{t('stats.satisfactionLabel')}</p>
            </div>
            <div className="premium-card p-6 bg-slate-50 border border-slate-200 shadow-sm text-center">
              <div className="text-3xl font-black text-[#0F4C81]">{t('stats.consultants')}</div>
              <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest mt-2">{t('stats.consultantsLabel')}</p>
            </div>
            <div className="premium-card p-6 bg-slate-50 border border-slate-200 shadow-sm text-center">
              <div className="text-3xl font-black text-[#0F4C81]">{t('stats.experience')}</div>
              <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest mt-2">{t('stats.experienceLabel')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section (Alternating Right) */}
      <section className="section-padding bg-[#F8FAFC] border-b border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Image left */}
            <div className="lg:col-span-5 relative w-full h-[400px] rounded-[24px] overflow-hidden border border-slate-200 shadow-xl order-last lg:order-first">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200"
                alt="HyperCode Digital Transformation Systems"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-900/10" />
            </div>

            {/* Text right */}
            <div className="lg:col-span-7 space-y-6">
              {/* Mission */}
              <div className="premium-card p-8 bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-[#0F4C81] flex items-center justify-center flex-shrink-0">
                    <Target size={20} />
                  </div>
                  <h3 className="text-[16px] lg:text-[18px] font-black text-slate-900 uppercase tracking-wider">{t('mission')}</h3>
                </div>
                <p className="text-[16px] md:text-[17px] text-slate-650 leading-[1.7] font-semibold">
                  {t('missionDesc')}
                </p>
              </div>

              {/* Vision */}
              <div className="premium-card p-8 bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-[#0F4C81] flex items-center justify-center flex-shrink-0">
                    <Eye size={20} />
                  </div>
                  <h3 className="text-[16px] lg:text-[18px] font-black text-slate-900 uppercase tracking-wider">{t('vision')}</h3>
                </div>
                <p className="text-[16px] md:text-[17px] text-slate-650 leading-[1.7] font-semibold">
                  {t('visionDesc')}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Clients Choose HyperCode Section */}
      <section className="section-padding bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-4 animate-fadeIn">
            <span className="text-xs font-bold text-[#0F4C81] uppercase tracking-widest">
              {t('whyChooseTitle')}
            </span>
            <p className="text-lg sm:text-xl text-slate-650 leading-relaxed font-semibold">
              {t('whyChooseSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Leadership */}
            <div className="premium-card p-8 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-[#0F4C81] flex items-center justify-center mb-5">
                <Award size={20} />
              </div>
              <h4 className="text-[22px] font-bold text-slate-900 mb-3 leading-[1.2]">
                {t('whyChoose.leadership.title')}
              </h4>
              <p className="text-[16px] md:text-[17px] text-slate-650 leading-[1.7] font-semibold">
                {t('whyChoose.leadership.desc')}
              </p>
            </div>

            {/* Agnostic & Scalable Solutions */}
            <div className="premium-card p-8 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-[#0F4C81] flex items-center justify-center mb-5">
                <Cpu size={20} />
              </div>
              <h4 className="text-[22px] font-bold text-slate-900 mb-3 leading-[1.2]">
                {t('whyChoose.custom.title')}
              </h4>
              <p className="text-[16px] md:text-[17px] text-slate-655 leading-[1.7] font-semibold">
                {t('whyChoose.custom.desc')}
              </p>
            </div>

            {/* Rapid Talent Mobilization */}
            <div className="premium-card p-8 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-[#0F4C81] flex items-center justify-center mb-5">
                <Zap size={20} />
              </div>
              <h4 className="text-[22px] font-bold text-slate-900 mb-3 leading-[1.2]">
                {t('whyChoose.talent.title')}
              </h4>
              <p className="text-[16px] md:text-[17px] text-slate-655 leading-[1.7] font-semibold">
                {t('whyChoose.talent.desc')}
              </p>
            </div>

            {/* Mentoring & Handover */}
            <div className="premium-card p-8 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-[#0F4C81] flex items-center justify-center mb-5">
                <BookOpen size={20} />
              </div>
              <h4 className="text-[22px] font-bold text-slate-900 mb-3 leading-[1.2]">
                {t('whyChoose.handover.title')}
              </h4>
              <p className="text-[16px] md:text-[17px] text-slate-655 leading-[1.7] font-semibold">
                {t('whyChoose.handover.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section-padding bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-3">
            <span className="text-xs font-bold text-[#0F4C81] uppercase tracking-widest">{t('pillars')}</span>
            <h3 className="text-[28px] sm:text-[32px] lg:text-[40px] font-black text-slate-900 tracking-tight leading-[1.2]">{t('valuesTitle')}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {coreValues.map((value, i) => {
              const Icon = value.icon;
              return (
                <div
                  key={i}
                  className="premium-card bg-white flex items-start gap-4 p-8 shadow-sm hover:shadow-md transition-shadow animate-fadeIn"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0F4C81] flex-shrink-0 animate-pulse">
                    <Icon size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[22px] font-bold text-slate-900 leading-[1.2]">{t(`values.${value.key}.title`)}</h4>
                    <p className="text-[16px] md:text-[17px] text-slate-650 leading-[1.7] font-semibold">{t(`values.${value.key}.desc`)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Approach & Nationwide Presence Section */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="space-y-6">
            <h2 className="text-[28px] sm:text-[32px] lg:text-[40px] font-black text-slate-900 tracking-tight leading-[1.2]">{t('approachTitle')}</h2>
            <p className="text-[16px] md:text-[17px] lg:text-[18px] text-slate-655 leading-[1.7] font-semibold">
              {t('approachDesc')}
            </p>
          </div>

          <div className="space-y-6 pt-12 border-t border-slate-200">
            <h2 className="text-[28px] sm:text-[32px] lg:text-[40px] font-black text-slate-900 tracking-tight leading-[1.2]">{t('presenceTitle')}</h2>
            <p className="text-[16px] md:text-[17px] lg:text-[18px] text-slate-655 leading-[1.7] font-semibold">
              {t('presenceDesc')}
            </p>
            <div className="pt-4">
              <Link
                href="/consultation"
                className="btn-primary"
              >
                {tc('consultation')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
