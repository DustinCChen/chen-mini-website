// middleware.ts
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n";

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale,
  localePrefix: "always", // Always include the locale prefix in the URL
});

export const config = {
  // Match only internationalized pathnames
  // matcher: ['/zh-hans/', '/zh-hant/', '/en-us/']
  // matcher: ['/', '/(zh-hans|zh-hant|en-us)/*']
  matcher: [
    "/",
    "/(zh-hans|zh-hant|en-us)/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
// 这里的 matcher 确保了国际化路径名被正确匹配，同时排除了 API 路径和静态资源路径