// app/rss.xml/route.ts
import RSS from "rss";
import { getAllPostsMeta } from "@/lib/posts";
import { locales } from "@/i18n";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://chenchangchao.com";

export async function GET() {
  const feed = new RSS({
    title: "陈常超的博客 | Chen Changchao's Blog",
    description: "关于技术、生活和思考的个人博客。",
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/rss.xml`,
    language: "zh-hans", // 主语言
    pubDate: new Date(),
  });

  // 为所有语言生成 RSS 条目
  for (const lang of locales) {
    const posts = getAllPostsMeta(lang);
    posts.forEach((post) => {
      feed.item({
        title: post.title,
        description: post.excerpt,
        url: `${SITE_URL}/${lang}/blog/${post.slug}`,
        guid: `${SITE_URL}/${lang}/blog/${post.slug}`,
        date: post.date,
      });
    });
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
