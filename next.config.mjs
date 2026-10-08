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
    const retiredContent = {
      'insights/power-bi-vs-tableau': 'solutions/power-bi-dashboards',
      'insights/designing-executive-power-bi-dashboards': 'solutions/power-bi-dashboards',
      'insights/business-intelligence-vs-data-analytics': 'solutions/business-intelligence',
      'insights/the-future-of-business-intelligence-in-2025': 'solutions/business-intelligence',
      'insights/microsoft-fabric-and-snowflake-coexistence': 'solutions/data-warehousing',
      'insights/cloud-data-platforms-choosing-the-right-solution': 'solutions/data-warehousing',
      'insights/data-engineering-best-practices': 'solutions/etl-pipelines',
      'insights/custom-web-applications': 'solutions/custom-software-development',
      'insights/staffing-trends-2025': 'staffing',
      'insights/it-staff-augmentation-for-digital-transformation': 'solutions/staff-augmentation',
      'case-studies': 'solutions',
    };
    return [
      ...Object.entries(retiredSolutionSlugs).map(([from, to]) => ({
        source: `/:locale(en|es)/solutions/${from}`,
        destination: `/:locale/solutions/${to}`,
        permanent: true,
      })),
      ...Object.entries(retiredContent).map(([from, to]) => ({
        source: `/:locale(en|es)/${from}`,
        destination: `/:locale/${to}`,
        permanent: true,
      })),
    ];
  },
}

export default withNextIntl(nextConfig)

