import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SolutionDetailPage } from '@/components/solution-detail-page';
import { getServiceDetails, SERVICE_REGISTRY } from '@/lib/services-details';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const paths: Array<{ locale: string; slug: string }> = [];
  const slugs = Object.keys(SERVICE_REGISTRY);

  for (const locale of routing.locales) {
    for (const slug of slugs) {
      paths.push({ locale, slug });
    }
  }

  return paths;
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const tc = await getTranslations({ locale, namespace: 'Common' });
  const details = getServiceDetails(slug, locale);

  if (!details) {
    return {
      title: 'HyperCode | Solution Not Found',
    };
  }

  const pageTitle = `HyperCode | ${details.title}`;
  return {
    title: pageTitle,
    description: details.description,
    alternates: {
      canonical: `https://www.hypercode.com/${locale}/solutions/${slug}`,
      languages: {
        'en-US': `https://www.hypercode.com/en/solutions/${slug}`,
        'es-US': `https://www.hypercode.com/es/solutions/${slug}`,
        'x-default': `https://www.hypercode.com/en/solutions/${slug}`,
      }
    },
    openGraph: {
      title: pageTitle,
      description: details.description,
      url: `https://www.hypercode.com/${locale}/solutions/${slug}`,
      siteName: 'HyperCode',
      locale: locale === 'en' ? 'en_US' : 'es_ES',
      type: 'website',
      images: [
        {
          url: details.heroImage,
          width: 1200,
          height: 630,
          alt: details.title,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: details.description,
      images: [details.heroImage]
    }
  };
}

export default async function DynamicServicePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const details = getServiceDetails(slug, locale);

  if (!details) {
    notFound();
  }

  // Generate breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': locale === 'es' ? 'Inicio' : 'Home',
        'item': `https://www.hypercode.com/${locale}`
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': locale === 'es' ? 'Soluciones' : 'Solutions',
        'item': `https://www.hypercode.com/${locale}/solutions`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': details.title,
        'item': `https://www.hypercode.com/${locale}/solutions/${slug}`
      }
    ]
  };

  // Generate service schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': details.title,
    'serviceType': details.title,
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'HyperCode',
      'image': 'https://www.hypercode.com/icon.svg',
      'telephone': '+1-800-555-0199',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Schaumburg',
        'addressRegion': 'IL',
        'postalCode': '60173',
        'addressCountry': 'US'
      }
    },
    'areaServed': 'US',
    'description': details.description
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <SolutionDetailPage locale={locale} pageKey={slug} />
    </>
  );
}
