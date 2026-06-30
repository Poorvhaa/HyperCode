import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import AIConsultant from '@/components/ai-consultant'
import GoogleAnalytics from '@/components/google-analytics'


const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

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
  const seoMap: Record<string, { title: string; desc: string; keywords: string[] }> = {
    en: {
      title: "HyperCode | Data Analytics, Web Development & IT Staffing Consulting",
      desc: "Transform your business with HyperCode. Enterprise-grade Web Development, Business Intelligence, Data Analytics, and IT Staffing solutions.",
      keywords: ["Business Intelligence", "Data Analytics", "IT & Non-IT Staffing", "Data Engineering", "Web Development"]
    },
    es: {
      title: "HyperCode | Consultoría de Análisis de Datos, Desarrollo Web y Personal de TI",
      desc: "Transforme su negocio con HyperCode. Soluciones de desarrollo web empresarial, inteligencia de negocios, análisis de datos y personal de TI.",
      keywords: ["Inteligencia de Negocios", "Análisis de Datos", "Personal de TI y no relacionado con TI", "Ingeniería de Datos", "Desarrollo Web"]
    }
  };

  const currentSeo = seoMap[locale] || seoMap.en;

  // Language alternates for hreflang tags
  const languageAlternates: Record<string, string> = {
    'en-US': `https://www.hypercode.com/en`,
    'es-US': `https://www.hypercode.com/es`,
    'x-default': 'https://www.hypercode.com/en'
  };

  return {
    metadataBase: new URL('https://www.hypercode.com'),
    title: {
      default: currentSeo.title,
      template: `%s | HyperCode`,
    },
    description: currentSeo.desc,
    generator: 'v0.app',
    alternates: {
      canonical: `https://www.hypercode.com/${locale}`,
      languages: languageAlternates,
    },
    openGraph: {
      title: currentSeo.title,
      description: currentSeo.desc,
      url: `https://www.hypercode.com/${locale}`,
      siteName: 'HyperCode',
      locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: currentSeo.title,
      description: currentSeo.desc,
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

  // Localized JSON-LD description matching the locale
  const descriptionMap: Record<string, string> = {
    en: 'Enterprise Web Development, Business Intelligence, Data Analytics, and IT Staffing consulting firm.',
    es: 'Firma de consultoría de desarrollo web empresarial, inteligencia de negocios, análisis de datos y personal de TI.'
  };

  const jsonLdDescription = descriptionMap[locale] || descriptionMap.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    'name': 'HyperCode',
    'url': `https://www.hypercode.com/${locale}`,
    'logo': 'https://www.hypercode.com/icon.svg',
    'description': jsonLdDescription,
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Schaumburg',
      'addressRegion': 'IL',
      'postalCode': '60173',
      'addressCountry': 'US'
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+1-800-555-0199',
      'contactType': 'customer service',
      'areaServed': 'US',
      'availableLanguage': ['en', 'es']
    },
    'sameAs': [
      'https://www.linkedin.com/company/hypercode'
    ]
  };

  return (
    <html lang={locale} dir="ltr" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased bg-background">
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
          <AIConsultant />
        </NextIntlClientProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
