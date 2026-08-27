/**
 * Canonical company and brand information for SEO structured data and metadata.
 * Source of truth for HyperCode LLC public-facing signals.
 */
export const COMPANY = {
  legalName: 'HyperCode LLC',
  brandName: 'HyperCode',
  /** Production canonical origin (non-www redirects to www on Vercel). */
  siteUrl: 'https://www.hypercodeit.com',
  email: 'hr@hypercodeit.com',
  phone: '+1 (224) 351-9727',
  phoneTel: '+12243519727',
  tagline: 'We Solve. We Build. You Grow.',
  address: {
    streetAddress: '2095 Hammond Dr, Suite C',
    addressLocality: 'Schaumburg',
    addressRegion: 'IL',
    postalCode: '60173',
    addressCountry: 'US',
  },
  logoPath: '/hypercodeit.logo.webp',
  /** Verified social profiles referenced elsewhere on the site. */
  sameAs: [
    'https://www.linkedin.com/company/hypercode-llc/',
    'https://www.instagram.com/hypercodeit',
  ],
} as const;

export function absoluteUrl(path: string = ''): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return path ? `${COMPANY.siteUrl}${normalizedPath}` : COMPANY.siteUrl;
}

export function localeUrl(locale: string, path: string = ''): string {
  const normalizedPath = path.startsWith('/') ? path : path ? `/${path}` : '';
  return `${COMPANY.siteUrl}/${locale}${normalizedPath}`;
}

export function getOrganizationJsonLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY.legalName,
    alternateName: COMPANY.brandName,
    url: absoluteUrl(),
    logo: absoluteUrl(COMPANY.logoPath),
    description:
      locale === 'es'
        ? 'HyperCode LLC ofrece consultoría en IA, desarrollo de software, analítica de datos y soluciones de personal IT y no IT.'
        : 'HyperCode LLC provides AI consulting, custom software development, data analytics, and IT & Non-IT staffing solutions for commercial and government clients.',
    email: COMPANY.email,
    telephone: COMPANY.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address.streetAddress,
      addressLocality: COMPANY.address.addressLocality,
      addressRegion: COMPANY.address.addressRegion,
      postalCode: COMPANY.address.postalCode,
      addressCountry: COMPANY.address.addressCountry,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: COMPANY.phone,
      email: COMPANY.email,
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: ['en', 'es'],
    },
    sameAs: COMPANY.sameAs,
  };
}

export function getWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: COMPANY.brandName,
    alternateName: COMPANY.legalName,
    url: absoluteUrl(),
  };
}

export function getOrganizationProviderJsonLd() {
  return {
    '@type': 'Organization',
    name: COMPANY.legalName,
    alternateName: COMPANY.brandName,
    url: absoluteUrl(),
    logo: absoluteUrl(COMPANY.logoPath),
    email: COMPANY.email,
    telephone: COMPANY.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address.streetAddress,
      addressLocality: COMPANY.address.addressLocality,
      addressRegion: COMPANY.address.addressRegion,
      postalCode: COMPANY.address.postalCode,
      addressCountry: COMPANY.address.addressCountry,
    },
  };
}
