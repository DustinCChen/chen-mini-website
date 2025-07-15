// components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setTheme("light")}
        className={theme === "light" ? "font-bold" : ""}
      >
        Light
      </button>
      <span>/</span>
      <button
        onClick={() => setTheme("dark")}
        className={theme === "dark" ? "font-bold" : ""}
      >
        Dark
      </button>
      <span>/</span>
      <button
        onClick={() => setTheme("system")}
        className={theme === "system" ? "font-bold" : ""}
      >
        System
      </button>
    </div>
  );
}
