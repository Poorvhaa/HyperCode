import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Target, Eye, ShieldCheck, Award, Lightbulb, Users, Cpu, Zap, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
    <main className="relative w-full bg-[#fcfdfe] dark:bg-[#07090e] text-left bg-dot-pattern min-h-screen">
      <Navigation />

      {/* About Immersive Hero Section */}
      <section className="relative pt-40 pb-28 overflow-hidden bg-[#07090e] border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact-office.png"
            alt="About HyperCode Office"
            fill
            priority
            className="object-cover object-center opacity-30 scale-105 select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent z-10" />
          <div className="absolute inset-0 bg-slate-950/40 z-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              {locale === 'es' ? 'CONÓCENOS' : 'ABOUT US'}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-white tracking-tight leading-[1.1]">
              {t('title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{t('titleHighlight')}</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-semibold max-w-xl">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Storytelling Section (Alternating Left) */}
      <section className="py-24 bg-white dark:bg-[#07090e] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t('storyTitle')}</h2>
              <div className="space-y-4 text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed font-semibold">
                <p>{t('storyP1')}</p>
                <p>{t('storyP2')}</p>
              </div>
            </div>

            <div className="lg:col-span-5 relative w-full h-[360px] rounded-[32px] overflow-hidden border border-slate-200/50 dark:border-slate-800 shadow-xl">
              <Image
                src="/images/staffing-team.png"
                alt="HyperCode Team Collaboration"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/20" />
            </div>

          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-slate-100 dark:border-slate-900">
            <div className="bg-slate-50 dark:bg-slate-900/35 p-6 rounded-2xl border border-slate-200/40 dark:border-slate-850 shadow-sm text-center">
              <div className="text-3xl font-black text-[#0F4C81] dark:text-blue-400">{t('stats.projects')}</div>
              <p className="text-[10px] text-slate-450 dark:text-slate-500 font-extrabold uppercase tracking-widest mt-2">{t('stats.projectsLabel')}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/35 p-6 rounded-2xl border border-slate-200/40 dark:border-slate-850 shadow-sm text-center">
              <div className="text-3xl font-black text-[#0F4C81] dark:text-blue-400">{t('stats.satisfaction')}</div>
              <p className="text-[10px] text-slate-450 dark:text-slate-500 font-extrabold uppercase tracking-widest mt-2">{t('stats.satisfactionLabel')}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/35 p-6 rounded-2xl border border-slate-200/40 dark:border-slate-850 shadow-sm text-center">
              <div className="text-3xl font-black text-[#0F4C81] dark:text-blue-400">{t('stats.consultants')}</div>
              <p className="text-[10px] text-slate-450 dark:text-slate-500 font-extrabold uppercase tracking-widest mt-2">{t('stats.consultantsLabel')}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/35 p-6 rounded-2xl border border-slate-200/40 dark:border-slate-850 shadow-sm text-center">
              <div className="text-3xl font-black text-[#0F4C81] dark:text-blue-400">{t('stats.experience')}</div>
              <p className="text-[10px] text-slate-450 dark:text-slate-500 font-extrabold uppercase tracking-widest mt-2">{t('stats.experienceLabel')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section (Alternating Right) */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950/40 border-t border-b border-slate-100 dark:border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Image left */}
            <div className="lg:col-span-5 relative w-full h-[400px] rounded-[32px] overflow-hidden border border-slate-200/50 dark:border-slate-800 shadow-xl order-last lg:order-first">
              <Image
                src="/images/hero-enterprise.png"
                alt="HyperCode Digital Transformation Systems"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/20" />
            </div>

            {/* Text right */}
            <div className="lg:col-span-7 space-y-6">
              {/* Mission */}
              <div className="bg-white dark:bg-[#0b0f19] p-8 rounded-3xl border border-slate-200/50 dark:border-slate-850 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-[#0F4C81] dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                    <Target size={20} />
                  </div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">{t('mission')}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed font-semibold">
                  {t('missionDesc')}
                </p>
              </div>

              {/* Vision */}
              <div className="bg-white dark:bg-[#0b0f19] p-8 rounded-3xl border border-slate-200/50 dark:border-slate-850 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-[#0F4C81] dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                    <Eye size={20} />
                  </div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">{t('vision')}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed font-semibold">
                  {t('visionDesc')}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Clients Choose HyperCode Section */}
      <section className="py-24 bg-white dark:bg-[#07090e] border-b border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-4 animate-fadeIn">
            <span className="text-xs font-bold text-[#0F4C81] dark:text-blue-400 uppercase tracking-widest">
              {t('whyChooseTitle')}
            </span>
            <p className="text-lg sm:text-xl text-slate-650 dark:text-slate-350 leading-relaxed font-semibold">
              {t('whyChooseSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Leadership */}
            <div className="p-8 rounded-[28px] border border-slate-200/60 dark:border-slate-850 bg-white dark:bg-[#0b0f19] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-[#0F4C81] dark:text-blue-400 flex items-center justify-center mb-5">
                <Award size={20} />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-200 mb-3">
                {t('whyChoose.leadership.title')}
              </h4>
              <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed font-semibold">
                {t('whyChoose.leadership.desc')}
              </p>
            </div>

            {/* Agnostic & Scalable Solutions */}
            <div className="p-8 rounded-[28px] border border-slate-200/60 dark:border-slate-850 bg-white dark:bg-[#0b0f19] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-[#0F4C81] dark:text-blue-400 flex items-center justify-center mb-5">
                <Cpu size={20} />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-200 mb-3">
                {t('whyChoose.custom.title')}
              </h4>
              <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed font-semibold">
                {t('whyChoose.custom.desc')}
              </p>
            </div>

            {/* Rapid Talent Mobilization */}
            <div className="p-8 rounded-[28px] border border-slate-200/60 dark:border-slate-850 bg-white dark:bg-[#0b0f19] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-[#0F4C81] dark:text-blue-400 flex items-center justify-center mb-5">
                <Zap size={20} />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-200 mb-3">
                {t('whyChoose.talent.title')}
              </h4>
              <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed font-semibold">
                {t('whyChoose.talent.desc')}
              </p>
            </div>

            {/* Mentoring & Handover */}
            <div className="p-8 rounded-[28px] border border-slate-200/60 dark:border-slate-850 bg-white dark:bg-[#0b0f19] shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-[#0F4C81] dark:text-blue-400 flex items-center justify-center mb-5">
                <BookOpen size={20} />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-200 mb-3">
                {t('whyChoose.handover.title')}
              </h4>
              <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed font-semibold">
                {t('whyChoose.handover.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950/40 border-t border-b border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-3">
            <span className="text-xs font-bold text-[#0F4C81] dark:text-blue-400 uppercase tracking-widest">{t('pillars')}</span>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none">{t('valuesTitle')}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreValues.map((value, i) => {
              const Icon = value.icon;
              return (
                <div
                  key={i}
                  className="p-7 rounded-[24px] border border-slate-200/60 dark:border-slate-850 bg-white dark:bg-[#0b0f19] shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow animate-fadeIn"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 flex items-center justify-center text-[#0F4C81] dark:text-blue-400 flex-shrink-0">
                    <Icon size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight">{t(`values.${value.key}.title`)}</h4>
                    <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-450 leading-relaxed font-semibold">{t(`values.${value.key}.desc`)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Approach & Nationwide Presence Section */}
      <section className="py-24 bg-white dark:bg-[#07090e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t('approachTitle')}</h2>
            <p className="text-sm sm:text-base text-slate-555 dark:text-slate-400 leading-relaxed font-semibold">
              {t('approachDesc')}
            </p>
          </div>

          <div className="space-y-6 pt-12 border-t border-slate-100 dark:border-slate-900">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t('presenceTitle')}</h2>
            <p className="text-sm sm:text-base text-slate-555 dark:text-slate-400 leading-relaxed font-semibold">
              {t('presenceDesc')}
            </p>
            <div className="pt-4">
              <Link
                href={`/${locale}/consultation`}
                className="inline-flex items-center justify-center h-12 px-8 bg-[#0F4C81] hover:bg-[#0A365D] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
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
