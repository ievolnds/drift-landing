// 兩個 root layout 共用的 metadata 基礎設定（server 端專用，不要從 client component 匯入）。

export const ASSET_PREFIX = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const METADATA_BASE = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
);

// hreflang：兩頁互指，讓搜尋引擎知道這是同一份內容的兩個語言版本。
export const LANGUAGE_ALTERNATES = {
  en: "/",
  "zh-Hant-TW": "/zh-tw",
};
