import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    const retiredSolutionSlugs = {
      'ai-automation': 'ai-workflow-automation',
      'software-dev': 'custom-software-development',
      'web-dev': 'customer-portals',
      'mobile-dev': 'enterprise-mobile-apps',
      'cloud-infrastructure': 'infrastructure-automation',
      'digital-transformation': 'digital-transformation-consulting',
    };
    return Object.entries(retiredSolutionSlugs).map(([from, to]) => ({
      source: `/:locale(en|es)/solutions/${from}`,
      destination: `/:locale/solutions/${to}`,
      permanent: true,
    }));
  },
}

export default withNextIntl(nextConfig)

