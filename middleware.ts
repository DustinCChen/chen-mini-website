// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/zh-hans/', '/zh-hant/', '/en-us/']
  // matcher: ['/', '/(zh-hans|zh-hant|en-us)/*']
  // matcher: ['/', '/(zh-hans|zh-hant|en-us)/:path*']
  // matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)']
};