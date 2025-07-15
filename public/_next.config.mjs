// next.config.ts
// import type { NextConfig } from "next"; // Removed because 'import type' is not valid in .mjs files
import createMDX from "@next/mdx";
import createNextIntlPlugin from 'next-intl/plugin'; // 1. 导入 next-intl 插件

// 2. 初始化 next-intl 插件
const withNextIntl = createNextIntlPlugin(
  // 这里是 next-intl 插件的配置文件路径，
  // 如果你的 i18n.ts 在根目录，这个路径就是正确的
  './i18n.ts' 
);

// 3. 定义你的基础 Next.js 配置
const nextConfig = {
  // 注意：使用 @next/mdx 时，pageExtensions 会被它自动处理，
  // 你可以不写在这里，或者保持原样也可以。
  pageExtensions: ["tsx", "ts", "mdx"],
  /* 其他 config options here */
};

// 4. 初始化 MDX 插件，和之前一样
const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // 你可以在这里添加你的 remark 和 rehype 插件
    // 例如：import remarkGfm from 'remark-gfm';
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

// 5. 导出组合后的配置
// 这是一个标准的组合模式：
// 插件A(插件B(基础配置))
export default withNextIntl(withMDX(nextConfig));