// 兩個語系共用的商店連結、徽章標籤與資產前綴。
//
// 商店網址依語系分流：Apple 用地區路徑 /us/ 與 /tw/，Google Play 用 hl/gl 參數。
// ⛔ 兩邊都是官方商店網址，徽章一律用官方素材（public/store-badges/），不自製仿圖。

export type Locale = "en" | "zh-TW";

export type Store = "apple" | "google";

export const ASSET_PREFIX = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const APPLE_APP_ID = "id6788133398";

export const STORE_URLS: Record<Locale, Record<Store, string>> = {
  en: {
    apple: `https://apps.apple.com/us/app/drift-dting/${APPLE_APP_ID}`,
    google:
      "https://play.google.com/store/apps/details?id=com.howard.drift&hl=en_US&gl=US",
  },
  "zh-TW": {
    apple: `https://apps.apple.com/tw/app/drift-dting/${APPLE_APP_ID}`,
    google:
      "https://play.google.com/store/apps/details?id=com.howard.drift&hl=zh_TW&gl=TW",
  },
};

// 徽章圖片本身是官方英文版素材；只有 alt／aria 依語系翻譯，
// Apple／App Store／Google Play 這些品牌與服務名保持原文。
export const STORE_BADGE_LABELS: Record<Locale, Record<Store, string>> = {
  en: {
    apple: "Download on the App Store",
    google: "Get it on Google Play",
  },
  "zh-TW": {
    apple: "從 App Store 下載 drift",
    google: "在 Google Play 取得 drift",
  },
};

export const LOCALE_PATHS: Record<Locale, string> = {
  en: "/",
  "zh-TW": "/zh-tw",
};
