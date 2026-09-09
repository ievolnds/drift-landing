"use client";

import Link from "next/link";
import type { MouseEvent } from "react";

import { LOCALE_PATHS, type Locale } from "./site";

const TARGET: Record<Locale, { locale: Locale; label: string; lang: string; aria: string }> = {
  // 目前是英文頁 → 提供切到繁中的入口
  en: {
    locale: "zh-TW",
    label: "中文",
    lang: "zh-Hant-TW",
    aria: "Switch to Traditional Chinese",
  },
  // 目前是繁中頁 → 提供切回英文的入口。
  // 可見標籤用該語言自己的寫法（無障礙慣例），aria-label 才是當頁語言。
  "zh-TW": {
    locale: "en",
    label: "English",
    lang: "en",
    aria: "切換到英文版網頁",
  },
};

// 語言切換要保留廣告帶進來的 UTM，否則從英文頁切到繁中頁會斷掉歸因。
//
// 靜態輸出的 href 保持乾淨（沒有 JS 也點得動、爬蟲拿到的是正規網址），
// 有 query string 時才在點擊當下改寫並整頁導覽。
// 整頁導覽是刻意的：Meta Pixel 用 afterInteractive 注入，只有真正換頁
// 才會以新的 locale 重新送出 PageView，client-side 導覽不會。
export function LangSwitch({ current }: { current: Locale }) {
  const target = TARGET[current];

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const { search } = window.location;
    if (!search) return;

    event.preventDefault();
    // currentTarget.href 已經解析過 basePath，直接沿用比自己拼字串安全
    const url = new URL(event.currentTarget.href);
    url.search = search;
    window.location.assign(url.toString());
  }

  return (
    <Link
      className="lang-switch"
      href={LOCALE_PATHS[target.locale]}
      hrefLang={target.lang}
      aria-label={target.aria}
      onClick={handleClick}
    >
      <span lang={target.lang}>{target.label}</span>
    </Link>
  );
}
