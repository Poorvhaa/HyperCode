import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { AIAssistant } from '@/components/ai-assistant'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.hypercode.com'),
  title: {
    default: 'HyperCode | Data Analytics, Web Development & IT Staffing Consulting',
    template: '%s | HyperCode',
  },
  description: 'Transform your business with HyperCode. Enterprise-grade Web Development, Business Intelligence, Data Analytics, and IT Staffing solutions. Headquartered in Schaumburg, IL, serving clients nationwide.',
  generator: 'v0.app',
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'HyperCode | Data Analytics, Web Development & IT Staffing Solutions',
    description: 'Transform your business with HyperCode. Enterprise-grade Web Development, BI, Data Analytics, and IT Staffing solutions. Nationwide delivery.',
    url: 'https://www.hypercode.com',
    siteName: 'HyperCode',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HyperCode | Data Analytics, Web Development & IT Staffing',
    description: 'Transform your business with HyperCode. Professional Web Development, BI, Data Analytics, and IT Staffing solutions.',
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
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf8' },
    { media: '(prefers-color-scheme: dark)', color: '#1f1f1d' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    'name': 'HyperCode',
    'url': 'https://www.hypercode.com',
    'logo': 'https://www.hypercode.com/icon.svg',
    'description': 'Enterprise Web Development, Business Intelligence, Data Analytics, and IT Staffing consulting firm.',
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
      'availableLanguage': 'en'
    },
    'sameAs': [
      'https://www.linkedin.com/company/hypercode'
    ]
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased bg-background">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <AIAssistant />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
