import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

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
