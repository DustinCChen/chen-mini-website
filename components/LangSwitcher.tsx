"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { locales } from "@/i18n";

const languageNames: { [key: string]: string } = {
  "en-us": "English",
  "zh-hans": "简体中文",
  "zh-hant": "繁體中文",
};

export function LangSwitcher() {
  const pathname = usePathname();

  // Get the current path without the locale
  const pathWithoutLocale = pathname.split("/").slice(2).join("/");

  return (
    <div className="flex gap-2">
      {locales.map((locale) => {
        const isActive = pathname.startsWith(`/${locale}`);
        return (
          <Link
            key={locale}
            href={`/${locale}/${pathWithoutLocale}`}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              isActive
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {languageNames[locale]}
          </Link>
        );
      })}
    </div>
  );
}
