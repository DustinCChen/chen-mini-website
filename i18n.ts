// i18n.ts
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en-us", "zh-hans", "zh-hant"];
export const defaultLocale = "zh-hans";

// export default getRequestConfig(async ({ locale }: { locale?: string }) => {
//   if (!locales.includes(locale || "")) {
//     notFound();
//   }
//   const resolvedLocale = locale ?? defaultLocale;
//   return {
//     locale: resolvedLocale,
//     messages: (await import(`./messages/${resolvedLocale}.json`)).default,
//   };
// });

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  if (!locales.includes(locale || "")) {
    notFound();
  }
  const resolvedLocale = locale ?? defaultLocale;
  return {
    locale: resolvedLocale,
    messages: (await import(`./messages/${resolvedLocale}.json`)).default,
  };
});
