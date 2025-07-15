// i18n.ts
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en-us", "zh-hans", "zh-hant"];
export const defaultLocale = "zh-hans";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale || "")) {
    notFound();
  }
  const resolvedLocale = locale ?? defaultLocale;
  return {
    locale: resolvedLocale,
    messages: (await import(`./messages/${resolvedLocale}.json`)).default,
  };
});
