import type { Metadata, Viewport } from "next";
import "../globals.css";
import { MetaPixel } from "../MetaPixel";
import { ASSET_PREFIX, LANGUAGE_ALTERNATES, METADATA_BASE } from "../seo";

// 繁體中文頁自成一個 root layout，才能把 <html lang> 換成 zh-Hant-TW。
// Next.js App Router 只有 root layout 會輸出 <html>，巢狀 layout 改不了它，
// 所以 en 與 zh-TW 各自放在一個 route group 底下。

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: {
    default: "drift — 有些人，從喜歡的事就認得出來。",
    template: "%s — drift",
  },
  description:
    "一首重播的歌、一本捨不得看完的書。從日常裡的品味，慢慢認識一個人。drift 是一個安靜一點的交友 app。",
  keywords: ["drift", "交友", "交友 app", "品味", "認識新朋友", "安靜社交"],
  alternates: {
    canonical: "/zh-tw",
    languages: LANGUAGE_ALTERNATES,
  },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    siteName: "drift",
    title: "有些人，從喜歡的事就認得出來。",
    description: "從日常裡的品味，慢慢認識一個人。",
    images: [
      {
        url: `${ASSET_PREFIX}/og.png`,
        width: 1200,
        height: 630,
        alt: "drift — 有些人，從喜歡的事就認得出來。",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "drift — 有些人，從喜歡的事就認得出來。",
    description: "從日常裡的品味，慢慢認識一個人。",
    images: [`${ASSET_PREFIX}/og.png`],
  },
  icons: {
    icon: `${ASSET_PREFIX}/favicon.svg`,
    shortcut: `${ASSET_PREFIX}/favicon.svg`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#11100e",
};

export default function ZhTwLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant-TW">
      <body>
        {children}
        <MetaPixel locale="zh-TW" />
      </body>
    </html>
  );
}
