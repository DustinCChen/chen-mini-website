"use client";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t py-8 text-center text-gray-500">
      <div className="container mx-auto">
        <p>
          {t("contactMe")}:{" "}
          <a
            href="mailto:contact@chenchangchao.com"
            className="text-blue-600 hover:underline"
          >
            contact@chenchangchao.com
          </a>
        </p>
        <p className="mt-2">
          © {currentYear} Chen Changchao. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
