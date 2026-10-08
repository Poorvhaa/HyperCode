import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Permanently removed content with no equivalent page; answered with 410 so search engines drop it.
const GONE_PATHS = new Set([
  'insights/ats-and-vms-explained',
  'insights/building-a-data-driven-organization',
  'insights/nextjs-vs-traditional-development',
  'insights/responsive-design-guide',
  'insights/vetting-senior-data-engineers-rubric',
  'insights/web-security-best-practices',
  'case-studies/ecommerce-headless-web-development',
  'case-studies/financial-risk-data-analytics',
  'case-studies/financial-staff-augmentation',
  'case-studies/healthcare-patient-mobile-app',
  'case-studies/insurance-digital-transformation',
  'case-studies/saas-cloud-devops-migration',
]);

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/^\/(en|es)(?=\/)/, '').replace(/^\/+|\/+$/g, '');
  if (GONE_PATHS.has(path)) {
    return new NextResponse(
      '<!doctype html><html><head><meta name="robots" content="noindex"><title>410 Gone | HyperCode</title></head><body><h1>This page has been permanently removed.</h1><p><a href="https://www.hypercodeit.com/en">HyperCode home</a></p></body></html>',
      { status: 410, headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex' } }
    );
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match the root path
    '/',
    // Match all paths prefixed with our supported locales
    '/(en|es)/:path*',
    // Match paths without a locale prefix, excluding files and system routes
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
