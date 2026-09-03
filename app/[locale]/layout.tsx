import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import '../globals.css'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import AIConsultant from '@/components/ai-consultant'
import { CookieProvider } from '@/components/CookieProvider'
import { CookieBanner } from '@/components/CookieBanner'
import { CookiePreferencesModal } from '@/components/CookiePreferencesModal'
import { SITE_URL, localeUrl, localeAlternates, absoluteUrl } from '@/lib/site-url'

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
  const seoMap: Record<string, { title: string; desc: string; keywords: string[] }> = {
    en: {
      title: "HyperCode | AI Solutions | IT & Non-IT Staffing | Web Development| Custom Software Development| Digital Transformation| AI Automation| Enterprise Consulting| Business Process Automation",
      desc: "HyperCode provides AI Solutions, IT & Non-IT Staffing, Custom Software Development, Web Development, Digital Transformation, AI Automation, Enterprise Consulting, and Business Process Automation.",
      keywords: [
        "AI Solutions",
        "IT & Non-IT Staffing",
        "Permanent Staffing",
        "Contract Staffing",
        "Executive Search",
        "Talent Acquisition",
        "Recruitment Services",
        "Staff Augmentation",
        "Business Staffing",
        "AI Consulting",
        "Digital Transformation",
        "Software Development",
        "Web Development",
        "Cloud Solutions",
        "Automation Services",
        "Enterprise AI",
        "Artificial Intelligence",
        "Machine Learning",
        "Business Intelligence",
        "Technology Consulting",
        "Hiring Solutions",
        "Workforce Solutions"
      ]
    },
    es: {
      title: "HyperCode | Soluciones de IA | Contratación de Personal de TI y No TI | Desarrollo Web",
      desc: "HyperCode ofrece Soluciones de IA, Contratación de Personal de TI y No TI, Desarrollo de Software Personalizado, Desarrollo Web, Transformación Digital, Automatización de IA, Consultoría Empresarial y Automatización de Procesos de Negocio.",
      keywords: [
        "Soluciones de IA",
        "Contratación de Personal de TI y No TI",
        "Personal Permanente",
        "Personal por Contrato",
        "Búsqueda Ejecutiva",
        "Adquisición de Talento",
        "Servicios de Reclutamiento",
        "Aumento de Personal",
        "Personal de Negocios",
        "Consultoría de IA",
        "Transformación Digital",
        "Desarrollo de Software",
        "Desarrollo Web",
        "Soluciones en la Nube",
        "Servicios de Automatización",
        "IA Empresarial",
        "Inteligencia Artificial",
        "Aprendizaje Automático",
        "Inteligencia de Negocios",
        "Consultoría Tecnológica",
        "Soluciones de Contratación",
        "Soluciones de Fuerza Laboral"
      ]
    }
  };

  const currentSeo = seoMap[locale] || seoMap.en;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: currentSeo.title,
      template: `HyperCode | %s`,
    },
    description: currentSeo.desc,
    generator: 'v0.app',
    alternates: {
      canonical: localeUrl(locale),
      languages: localeAlternates(),
    },
    openGraph: {
      title: currentSeo.title,
      description: currentSeo.desc,
      url: localeUrl(locale),
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
    en: 'HyperCode LLC is a Schaumburg, Illinois-based technology consulting firm founded in 2014, delivering Business Intelligence, Data Analytics, enterprise solutions, software engineering, and IT staffing across the United States.',
    es: 'HyperCode LLC es una firma de consultoría tecnológica con sede en Schaumburg, Illinois, fundada en 2014, que ofrece Inteligencia de Negocios, Análisis de Datos, soluciones empresariales, ingeniería de software y dotación de personal de TI en todo Estados Unidos.'
  };

  const jsonLdDescription = descriptionMap[locale] || descriptionMap.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    'name': 'HyperCode LLC',
    'legalName': 'HyperCode LLC',
    'foundingDate': '2014',
    'url': localeUrl(locale),
    'logo': absoluteUrl('/hypercodeit.logo.png'),
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
      'telephone': '+1 (224) 351-9727',
      'contactType': 'customer service',
      'areaServed': 'US',
      'availableLanguage': ['en', 'es']
    },
    'sameAs': [
      'https://www.linkedin.com/company/hypercode'
    ],
    'knowsAbout': [
      'AI Solutions',
      'IT & Non-IT Staffing',
      'Web Development',
      'Custom Software Development',
      'Digital Transformation',
      'Enterprise AI',
      'Technology Consulting',
      'Recruitment Services'
    ]
  };

  return (
    <html lang={locale} dir="ltr" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <head />
      <body className="font-sans antialiased bg-background">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-343HPGGDKS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-343HPGGDKS');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
