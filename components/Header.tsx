// components/Header.tsx
import { ThemeSwitcher } from "./ThemeSwitcher";
// 你也可以在这里创建一个 LanguageSwitcher 组件

export function Header() {
  return (
    <header className="container mx-auto max-w-3xl px-4 py-4 flex justify-end">
      <ThemeSwitcher />
    </header>
  );
}
// 你可以在这里添加其他头部内容，比如网站标题或导航链接
// 如果需要多语言切换，可以创建一个 LanguageSwitcher 组件并在这里使用