"use client";

import { useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { create } from "zustand";
// import { useTagStore } from "../util/useTagStore";
// import { LocaleTypes } from "app/[locale]/i18n/settings";

interface Props {
  text: string;
}

interface TagStore {
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
}
type LocaleTypes = "zh-hans" | "zh-hant" | "en-us";
export const useTagStore = create<TagStore>((set) => ({
  selectedTag: "",
  setSelectedTag: (tag) => set({ selectedTag: tag }),
}));
const Tag = ({ text }: Props) => {
  const locale = useParams()?.locale as LocaleTypes;
  const { setSelectedTag } = useTagStore();

  const handleClick = useCallback(() => {
    setSelectedTag(text);
  }, [text, setSelectedTag]);

  return (
    <Link
      href={`/${locale}/blog`}
      onClick={handleClick}
      className="mr-3 cursor-pointer text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {text.split(" ").join("-")}
    </Link>
  );
};

export default Tag;
