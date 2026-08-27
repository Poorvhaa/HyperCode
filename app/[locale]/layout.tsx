import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import '../globals.css'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import AIConsultant from '@/components/ai-consultant'
import { CookieProvider } from '@/components/CookieProvider'
import { CookieBanner } from '@/components/CookieBanner'
import { CookiePreferencesModal } from '@/components/CookiePreferencesModal'
import {
  COMPANY,
  getOrganizationJsonLd,
  getWebSiteJsonLd,
  localeUrl,
} from '@/lib/seo/company'

import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  // Custom SEO titles and descriptions mapped for 2 languages
  const seoMap: Record<string, { title: string; desc: string }> = {
    en: {
      title: 'HyperCode LLC | AI, Software & Digital Transformation',
      desc: 'HyperCode LLC helps organizations grow with AI consulting, custom software, data analytics, cloud engineering, and IT staffing. Headquartered in Schaumburg, IL.',
    },
    es: {
      title: 'HyperCode LLC | IA, Software y Transformación Digital',
      desc: 'HyperCode LLC ayuda a las organizaciones a crecer con consultoría en IA, software personalizado, analítica de datos, ingeniería en la nube y personal IT. Sede en Schaumburg, IL.',
    },
  };

  const currentSeo = seoMap[locale] || seoMap.en;

  const languageAlternates: Record<string, string> = {
    'en-US': localeUrl('en'),
    'es-US': localeUrl('es'),
    'x-default': localeUrl('en'),
  };

  return {
    metadataBase: new URL(COMPANY.siteUrl),
    title: {
      default: currentSeo.title,
      template: '%s',
    },
    description: currentSeo.desc,
    alternates: {
      canonical: localeUrl(locale),
      languages: languageAlternates,
    },
    openGraph: {
      title: currentSeo.title,
      description: currentSeo.desc,
      url: localeUrl(locale),
      siteName: COMPANY.brandName,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
      type: 'website',
      images: [
        {
          url: COMPANY.logoPath,
          alt: `${COMPANY.brandName} logo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: currentSeo.title,
      description: currentSeo.desc,
      images: [COMPANY.logoPath],
    },
    icons: {
      icon: [
        {
          url: '/icon-light-32x32.png',
          media: '(prefers-color-scheme: light)',
        },
        {
          url: '/icon-dark-32x32.png',
          media: '(prefers-color-scheme: dark)',
        },
        {
          url: '/icon.svg',
          type: 'image/svg+xml',
        },
      ],
      apple: '/apple-icon.png',
    },
  };
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf8' },
    { media: '(prefers-color-scheme: dark)', color: '#1f1f1d' },
  ],
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const organizationJsonLd = getOrganizationJsonLd(locale);
  const websiteJsonLd = getWebSiteJsonLd();

  return (
    <html lang={locale} dir="ltr" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <head />
      <body className="font-sans antialiased bg-background">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <CookieProvider>
            {children}
            <AIConsultant />
            <CookieBanner />
            <CookiePreferencesModal />
          </CookieProvider>
        </NextIntlClientProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
