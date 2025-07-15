import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";
import { getTranslations } from "next-intl/server";
// import { useTranslations } from "next-intl"; // Use the hook for Server Components in v14

type HomePageProps = {
  params: { lang: string };
};

export default async function HomePage(props: HomePageProps) {
  const { lang } = await props.params; // 移除 await，因为 params 是同步的

  // 传递语言
  const posts = getAllPostsMeta(lang); // 这里不需要 await，因为 getAllPostsMeta 是同步的
  const t = await getTranslations("HomePage"); // 需要 await 因为是异步的

  return (
    <main className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">{t("title")}</h1>
      {/* <h1 className="mb-8 text-4xl font-bold">Chen Changchao&#39;s Blog</h1> */}
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug}>
            <h2 className="text-2xl font-semibold hover:text-blue-600">
              {/* Link需要包含语言 */}
              <Link href={`/${lang}/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-gray-500">
              {new Date(post.date).toLocaleDateString()}
            </p>
            <p className="mt-2 text-gray-700">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
