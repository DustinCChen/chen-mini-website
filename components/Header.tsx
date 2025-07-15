// components/Header.tsx
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LangSwitcher } from "./LangSwitcher"; // 如果你有语言切换器组件的话
// 你也可以在这里创建一个 LanguageSwitcher 组件

export function Header() {
  return (
    <header className="container mx-auto max-w-3xl px-4 py-4 flex justify-end">
      <LangSwitcher />
      <ThemeSwitcher />
    </header>
  );
}
