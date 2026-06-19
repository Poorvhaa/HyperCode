import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Target, Eye, ShieldCheck, Award, Lightbulb, Users, Cpu, Zap, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const tc = await getTranslations({ locale, namespace: 'Common' });
  const t = await getTranslations({ locale, namespace: 'About' });
  
  return {
    title: `${tc('about')} | HyperCode`,
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
    <main className="relative w-full bg-white text-left">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-slate-50 pt-36 pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {t('title')} <span className="text-[#0F4C81]">{t('titleHighlight')}</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Storytelling Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t('storyTitle')}</h2>
            <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              <p>{t('storyP1')}</p>
              <p>{t('storyP2')}</p>
            </div>
          </div>

          {/* Simple Clean Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate-200">
            <div>
              <div className="text-3xl font-bold text-[#0F4C81]">{t('stats.projects')}</div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">
                {t('stats.projectsLabel')}
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#0F4C81]">{t('stats.satisfaction')}</div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">
                {t('stats.satisfactionLabel')}
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#0F4C81]">{t('stats.consultants')}</div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">
                {t('stats.consultantsLabel')}
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#0F4C81]">{t('stats.experience')}</div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">
                {t('stats.experienceLabel')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-9 h-9 bg-slate-50 border border-slate-100 rounded-lg text-[#0F4C81] flex items-center justify-center">
                  <Target size={18} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{t('mission')}</h3>
              </div>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                {t('missionDesc')}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-9 h-9 bg-slate-50 border border-slate-100 rounded-lg text-[#0F4C81] flex items-center justify-center">
                  <Eye size={18} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{t('vision')}</h3>
              </div>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                {t('visionDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Clients Choose HyperCode Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">
              {t('whyChooseTitle')}
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
              {t('whyChooseSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Leadership */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 text-[#0F4C81] flex items-center justify-center mb-4">
                  <Award size={18} />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  {t('whyChoose.leadership.title')}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {t('whyChoose.leadership.desc')}
                </p>
              </div>
            </div>

            {/* Agnostic & Scalable Solutions */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 text-[#0F4C81] flex items-center justify-center mb-4">
                  <Cpu size={18} />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  {t('whyChoose.custom.title')}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {t('whyChoose.custom.desc')}
                </p>
              </div>
            </div>

            {/* Rapid Talent Mobilization */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 text-[#0F4C81] flex items-center justify-center mb-4">
                  <Zap size={18} />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  {t('whyChoose.talent.title')}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {t('whyChoose.talent.desc')}
                </p>
              </div>
            </div>

            {/* Mentoring & Handover */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 text-[#0F4C81] flex items-center justify-center mb-4">
                  <BookOpen size={18} />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  {t('whyChoose.handover.title')}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {t('whyChoose.handover.desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-xs font-bold text-[#0F4C81] tracking-widest uppercase mb-3">{t('pillars')}</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">{t('valuesTitle')}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreValues.map((value, i) => {
              const Icon = value.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                    <Icon size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-slate-900">{t(`values.${value.key}.title`)}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{t(`values.${value.key}.desc`)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Approach & Nationwide Presence Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t('approachTitle')}</h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              {t('approachDesc')}
            </p>
          </div>

          <div className="space-y-6 pt-10 border-t border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t('presenceTitle')}</h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              {t('presenceDesc')}
            </p>
            <div className="pt-4">
              <Link
                href={`/${locale}/consultation`}
                className="inline-flex items-center justify-center h-10 px-5 bg-[#0F4C81] hover:bg-[#0A365D] text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
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


