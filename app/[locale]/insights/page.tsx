import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { getLocalizedArticles, getLocalizedCategories } from '@/lib/insights-localizer';
import { InsightsList } from '@/components/insights-list';
import { NewsletterForm } from '@/components/newsletter-form';
import { Suspense } from 'react';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Insights' });
  return {
    title: `${t('title')} | HyperCode`,
    description: t('subtitle'),
    alternates: {
      canonical: `https://www.hypercode.com/${locale}/insights`,
    },
  };
}

export default async function InsightsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Insights');

  // Fetch localized articles & categories
  const localizedArticles = getLocalizedArticles(locale);
  const localizedCategories = getLocalizedCategories(locale);

  return (
    <main className="relative w-full bg-white text-left">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-slate-50 pt-36 pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {locale === 'es' ? 'Liderazgo' : locale === 'fr' ? 'Leadership' : locale === 'de' ? 'Vordenkertum' : locale === 'ja' ? '思想的' : locale === 'ko' ? '사상적' : locale === 'zh' ? '思想' : locale === 'ar' ? 'فكر' : 'Thought'}{' '}
              <span className="text-[#0F4C81]">
                {locale === 'es' ? 'Pensamiento' : locale === 'fr' ? 'd\'Opinion' : locale === 'de' ? 'für IT' : locale === 'ja' ? 'リーダーシップ' : locale === 'ko' ? '리더십' : locale === 'zh' ? '领导力' : locale === 'ar' ? 'الريادة' : 'Leadership'}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Insights Panel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="text-center py-12 text-slate-500">Loading articles...</div>}>
            <InsightsList initialArticles={localizedArticles} translatedCategories={localizedCategories} />
          </Suspense>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
              {t('newsletterTitle')}
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-medium">
              {t('newsletterSubtitle')}
            </p>

            <NewsletterForm />

            <p className="text-[11px] font-semibold text-slate-400">
              {locale === 'es' ? 'Nunca compartiremos su correo electrónico. Dese de baja en cualquier momento.' : 
               locale === 'fr' ? 'Nous ne partagerons jamais votre e-mail. Désabonnez-vous à tout moment.' : 
               locale === 'de' ? 'Wir geben Ihre E-Mail-Adresse niemals weiter. Melden Sie sich jederzeit ab.' : 
               locale === 'it' ? 'Non condivideremo mai la tua email. Annulla l\'iscrizione in qualsiasi momento.' : 
               locale === 'pt' ? 'Nunca partilharemos o seu e-mail. Cancele a assinatura a qualquer momento.' : 
               locale === 'nl' ? 'We zullen uw e-mail nooit delen. Meld u op elk moment af.' : 
               locale === 'ja' ? 'メールアドレスは開示いたしません。いつでも配信停止できます。' : 
               locale === 'ko' ? '이메일 주소는 절대 공유하지 않습니다. 언제든지 수신 거부할 수 있습니다.' : 
               locale === 'zh' ? '我们绝不会分享您的电子邮件。可随时退订。' : 
               locale === 'ar' ? 'لن نشارك بريدك الإلكتروني أبدًا. إلغاء الاشتراك في أي وقت.' : 
               'We\'ll never share your email. Unsubscribe anytime.'}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
