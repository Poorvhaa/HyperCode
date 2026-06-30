import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { getLocalizedCategories } from '@/lib/insights-localizer';
import { InsightsList } from '@/components/insights-list';
import { NewsletterForm } from '@/components/newsletter-form';
import { db } from '@/lib/db';
import { Suspense } from 'react';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Insights' });
  return {
    title: `HyperCode | ${t('title')}`,
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

  // Fetch published articles from Supabase
  let dbArticlesFormatted: any[] = [];
  try {
    const dbArticles = await db.getAllArticles();
    const publishedDbArticles = dbArticles.filter(a => a.is_published && a.language === locale);
    dbArticlesFormatted = publishedDbArticles.map(a => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      content: a.content,
      date: new Date(a.created_at).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
      category: a.category,
      readTime: a.reading_time || `${Math.ceil(a.content.split(/\s+/).length / 200)} min read`,
      author: a.author ? {
        name: a.author.name,
        role: a.author.role,
        avatar: a.author.avatar || '/placeholder-user.jpg'
      } : {
        name: 'HyperCode Consultant',
        role: 'Technical Advisor',
        avatar: '/placeholder-user.jpg'
      },
      related: []
    }));
  } catch (err) {
    console.error('Failed to load DB articles for index page:', err);
  }

  // Fetch published case studies from Supabase
  let dbCaseStudiesFormatted: any[] = [];
  try {
    const dbCaseStudies = await db.getAllCaseStudies();
    const publishedDbCaseStudies = dbCaseStudies.filter(c => c.is_published && c.language === locale);
    dbCaseStudiesFormatted = publishedDbCaseStudies.map(c => ({
      slug: c.slug,
      title: c.title,
      excerpt: c.challenge,
      content: `<h2>Challenge</h2><p>${c.challenge}</p><h2>Solution</h2><p>${c.solution}</p><h2>Results</h2><p>${c.results}</p>`,
      date: new Date(c.created_at).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
      category: locale === 'es' ? 'Casos de Éxito' : 'Case Studies',
      readTime: locale === 'es' ? 'Lectura de 5 min' : '5 min read',
      author: {
        name: 'HyperCode Solutions',
        role: c.client_type || 'Case Study',
        avatar: '/placeholder-user.jpg'
      },
      isCaseStudy: true,
      related: []
    }));
  } catch (err) {
    console.error('Failed to load DB case studies for index page:', err);
  }

  // 100% database-driven content: merge articles and case studies
  const mergedArticles = [...dbArticlesFormatted, ...dbCaseStudiesFormatted];

  const rawCategories = getLocalizedCategories(locale);
  const localizedCategories = [...rawCategories];
  const caseStudiesCat = locale === 'es' ? 'Casos de Éxito' : 'Case Studies';
  localizedCategories.splice(1, 0, caseStudiesCat);

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
            <InsightsList initialArticles={mergedArticles} translatedCategories={localizedCategories} />
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
