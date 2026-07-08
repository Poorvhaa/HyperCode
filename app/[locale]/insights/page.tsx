import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { getLocalizedCategories } from '@/lib/insights-localizer';
import { InsightsList } from '@/components/insights-list';
import { NewsletterForm } from '@/components/newsletter-form';
import { db } from '@/lib/db';
import { Suspense } from 'react';
import { HeroBanner } from '@/components/hero-banner';

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
    <main className="relative w-full bg-white text-left min-h-screen bg-dot-pattern">
      <Navigation />

      {/* Hero Section */}
      <HeroBanner
        bgImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600"
        categoryLabel={locale === 'es' ? 'INSIGHTS Y ANÁLISIS' : 'INSIGHTS & ANALYSIS'}
        title={locale === 'es' ? 'Liderazgo de Pensamiento' : 'Thought Leadership'}
        titleHighlight=""
        subtitle={t('subtitle')}
        breadcrumbs={[
          { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
          { label: locale === 'es' ? 'Insights' : 'Insights' }
        ]}
      />

      {/* Main Insights Panel */}
      <section className="section-padding bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="text-center py-12 text-slate-500">Loading articles...</div>}>
            <InsightsList initialArticles={mergedArticles} translatedCategories={localizedCategories} />
          </Suspense>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="premium-card p-8 sm:p-12 bg-white border border-slate-200 shadow-sm space-y-6 text-center">
            <h2 className="text-[28px] sm:text-[32px] font-black text-slate-900 tracking-tight leading-[1.2]">
              {t('newsletterTitle')}
            </h2>
            <p className="text-[16px] text-slate-655 leading-[1.7] font-semibold">
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
