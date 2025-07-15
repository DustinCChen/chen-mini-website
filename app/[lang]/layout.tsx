import localFont from "next/font/local";
import "@/app/globals.css";
import { locales } from "@/i18n"; // 确保路径正确
import type { Metadata } from "next";
// 1. 导入 Provider 和用于获取消息的钩子
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server"; // 导入 getMessages
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { notFound } from "next/dist/client/components/navigation";

// const inter = Inter({ subsets: ["latin"] });
const inter = localFont({
  src: "../fonts/Inter-Italic-VariableFont_opsz,wght.ttf", // 路径相对于当前文件
  display: "swap", // 推荐的字体显示策略
});

export const metadata: Metadata = {
  title: "Chen Changchao's space",
  description:
    "A personal website for Chen Changchao to share tech, life,  thoughts and more.",
};

// 为SEO生成备用语言链接
export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type RootLayoutProps = {
  children: React.ReactNode;
  params: { lang: string };
};

export default async function RootLayout(props: RootLayoutProps) {
  const { children } = props;
  const { lang } =await props.params; // 移除 await，这里不需要

  // 2. 在服务器组件(Layout)中获取当前语言环境的翻译消息
  if (!["en-us", "zh-hans", "zh-hant"].includes(lang)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed for Chen Changchao's Blog"
          href="/rss.xml"
        />
      </head>
      <body
        className={`${inter.className} bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
