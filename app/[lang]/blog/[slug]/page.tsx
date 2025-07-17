// app/blog/[slug]/page.tsx
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPostsMeta } from "@/lib/posts";
import { notFound } from "next/navigation";
import { Callout } from "@/components/Callout"; // 导入组件
// import { useTranslations } from 'next-intl';
import { getTranslations } from "next-intl/server";
import { locales } from "@/i18n"; // 确保路径正确

// 告诉 Next.js 在构建时需要为哪些 slug 生成静态页面
// generateStaticParams 需要为所有语言生成
export async function generateStaticParams() {
  const params: { slug: string; lang: string }[] = [];
  for (const lang of locales) {
    const posts = getAllPostsMeta(lang);
    posts.forEach((post) => {
      params.push({ slug: post.slug, lang });
    });
  }
  return params;
}

// 为页面生成元数据（例如，浏览器标签页的标题）
export async function generateMetadata({
  params,
}: {
  params: { slug: string; lang: string };
}) {
  const lang = await params.lang;
  const slug = await params.slug;
  try {
    const { meta } = getPostBySlug(slug, lang);
    return {
      title: meta.title,
      description: meta.excerpt,
    };
  } catch (e) {
    // 如果找不到文章，返回默认的元数据
    console.error(e);
    return {
      title: "Post Not Found",
    };
  }
}

type PostPageProps = {
  params: { slug: string; lang: string };
};

export default async function PostPage({ params }: PostPageProps) {
  // const t = await getTranslations({
  //   locale: params.lang,
  //   namespace: "PostPage",
  // });
  const lang = params.lang;
  const slug = params.slug;
  const t = await getTranslations("PostPage");
  try {
    const { meta, content } = getPostBySlug(slug, lang);
    const components = {
      Callout, // 注册 Callout 组件
      // 你可以在这里注册其他自定义组件
    };

    return (
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <article className="prose lg:prose-xl dark:prose-invert">
          <h1>{meta.title}</h1>
          <p className="text-sm text-gray-500">
            {t("publishedOn")} {new Date(meta.date).toLocaleDateString()}
          </p>
          <hr className="my-4" />
          <MDXRemote source={content} components={components} />
        </article>
      </main>
    );
  } catch (e) {
    // 如果找不到文章，显示 404 页面
    console.error(e);
    return notFound();
  }
}
