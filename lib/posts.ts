// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// const postsDirectory = path.join(process.cwd(), "posts");
const basePostsDirectory = path.join(process.cwd(), "posts");

// 定义文章元数据的类型
export interface PostMeta {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
}

// 获取所有文章的元数据，并按日期排序
export function getAllPostsMeta(lang: string): PostMeta[] {
  const postsDirectory = path.join(basePostsDirectory, lang);
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        ...data,
        slug,
      } as PostMeta;
    });

  // 按日期降序排序
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 根据 slug 获取单篇文章的内容和元数据
export function getPostBySlug(
  slug: string,
  lang: string
): { meta: Omit<PostMeta, "slug">; content: string } {
  const fullPath = path.join(basePostsDirectory, lang, `${slug}.mdx`);
  // const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    meta: data as Omit<PostMeta, "slug">,
    content,
  };
}
