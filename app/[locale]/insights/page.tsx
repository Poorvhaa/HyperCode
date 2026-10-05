import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { getLocalizedCategories, getLocalizedArticles } from '@/lib/insights-localizer';
import { ARTICLE_IMAGES, ARTICLE_ALT_TEXTS } from '@/lib/insights';
import { InsightsList } from '@/components/insights-list';
import { NewsletterForm } from '@/components/newsletter-form';
import { db } from '@/lib/db';
import { Suspense } from 'react';
import { Link } from '@/i18n/routing';
import { buildAlternates, localeUrl } from '@/lib/site-url';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Insights' });
  const title = `${t('listingTitle')} | HyperCode`;
  const description = t('subtitle');
  const path = 'insights';

  return {
    title: { absolute: title },
    description,
    alternates: buildAlternates(locale, path),
    openGraph: {
      title,
      description,
      url: localeUrl(locale, path),
      siteName: 'HyperCode',
      locale: locale === 'es' ? 'es_US' : 'en_US',
      type: 'website',
    },
  };
}

export default async function InsightsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Insights');
  const tc = await getTranslations('Common');

  // Allowed article slugs (only the 2 uploaded articles)
  const ALLOWED_ARTICLE_SLUGS = new Set([
    'enterprise-generative-ai-strategic-innovation',
    'ai-in-healthcare',
    'scaling-success-custom-enterprise-software',
    'choosing-right-enterprise-ai-platform-for-scale',
    'how-to-build-an-enterprise-ai-strategy',
    'top-5-ai-enterprise-software-use-cases-2026',
    'maximizing-roi-with-enterprise-automation-tools',
    'building-intelligent-systems-enterprise-ai-companies-2026'
  ]);

  // Fetch published articles from Supabase
  let dbArticlesFormatted: any[] = [];
  try {
    const dbArticles = await db.getAllArticles();
    const publishedDbArticles = dbArticles.filter(
      a => a.is_published && a.language === locale && ALLOWED_ARTICLE_SLUGS.has(a.slug)
    );
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
      image: ARTICLE_IMAGES[a.slug],
      imageAlt: ARTICLE_ALT_TEXTS[a.slug]?.[locale] || ARTICLE_ALT_TEXTS[a.slug]?.en,
      related: []
    }));
  } catch (err) {
    console.error('Failed to load DB articles for index page:', err);
  }

  // Merge static articles not already in database
  let staticArticlesFormatted: any[] = [];
  try {
    const staticArticles = getLocalizedArticles(locale);
    const dbSlugs = new Set(dbArticlesFormatted.map((a) => a.slug));
    staticArticlesFormatted = staticArticles
      .filter((a) => !dbSlugs.has(a.slug))
      .map((a) => ({
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        content: a.content,
        date: a.date,
        category: a.category,
        readTime: a.readTime,
        author: a.author,
        image: a.image,
        imageAlt: a.imageAlt,
        related: a.related,
        publishedIso: a.publishedIso,
      }));
  } catch (err) {
    console.error('Failed to load static articles for index page:', err);
  }

  const mergedArticles = [...dbArticlesFormatted, ...staticArticlesFormatted];

  const localizedCategories = getLocalizedCategories(locale);

  return (
    <main className="relative w-full bg-white text-left min-h-screen bg-dot-pattern">
      <Navigation />

      <section className="bg-white border-b border-slate-200 pt-[104px] pb-14 sm:pt-[116px] sm:pb-16 lg:pt-[124px] lg:pb-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-6 sm:mb-8">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1.5 text-[0.6875rem] sm:text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                <li>
                  <Link href="/" className="rounded hover:text-royal-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-blue transition-colors">
                    {tc('home')}
                  </Link>
                </li>
                <li aria-hidden="true" className="text-slate-300">/</li>
                <li aria-current="page" className="text-slate-700">{t('breadcrumbLabel')}</li>
              </ol>
            </nav>
            <h1 className="mt-2.5 text-[1.75rem] sm:text-[2.125rem] lg:text-[2.5rem] font-extrabold leading-tight tracking-tight text-[#0A1F6B]">
              {t('listingTitle')}
            </h1>
            <p className="mt-2 max-w-2xl text-[0.9375rem] sm:text-base leading-relaxed font-medium text-slate-600">
              {t('listingSubtitle')}
            </p>
          </header>

          <Suspense fallback={<div className="text-center py-12 text-slate-500">Loading articles...</div>}>
            <InsightsList initialArticles={mergedArticles} translatedCategories={localizedCategories} />
          </Suspense>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="premium-card p-8 sm:p-12 bg-white border border-slate-200 shadow-sm space-y-6 text-center">
            <h2 className="text-h2 text-slate-900">
              {t('newsletterTitle')}
            </h2>
            <p className="text-body text-slate-655 font-medium">
              {t('newsletterSubtitle')}
            </p>

            <NewsletterForm />

            <p className="text-caption font-medium text-slate-400">
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
