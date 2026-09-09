# drift landing page

The mobile-first acquisition site for drift. It introduces the product and sends visitors to the live iOS and Android store listings.

Meta Pixel `1807919130381082` records a `PageView` on entry and a custom `StoreClick` event from every App Store and Google Play button. `StoreClick` includes the store, button placement, page path, locale, and available UTM fields; it does not rely on the Meta App SDK.

## Locales

| Route | Language | Store links |
|---|---|---|
| `/` | English (US) | `apps.apple.com/us/…`, Play `hl=en_US&gl=US` |
| `/zh-tw` | 繁體中文（台灣） | `apps.apple.com/tw/…`, Play `hl=zh_TW&gl=TW` |

Each locale is its own **root layout** under a route group — `app/(en)/` and `app/(zh-tw)/`. This is required rather than cosmetic: in the App Router only a root layout renders `<html>`, so a nested layout cannot change `lang`. Splitting them is what lets `/zh-tw` ship `<html lang="zh-Hant-TW">`. Do not collapse them back into a single `app/layout.tsx`.

Shared pieces live at `app/` root: `site.ts` (store URLs per locale), `StoreLink.tsx` (badges plus `StoreClick`), `LangSwitch.tsx`, `Sections.tsx`, `useReveal.ts`, `seo.ts`.

The language switch keeps the current query string, so UTM parameters survive a switch. It navigates with a full page load on purpose — the Pixel is injected `afterInteractive`, and only a real navigation re-fires `PageView` with the new locale.

`globals.css` ends with a small `html[lang="zh-Hant-TW"]` block. The display headings use negative tracking down to `-0.064em` and line heights below `1`, which are tuned for Latin type and make full-width CJK glyphs collide. The override relaxes both for Chinese only; English rendering is untouched.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm test
```

`npm test` runs the public static build and checks the rendered landing page, store links, mobile treatment, reduced-motion support, Pixel wiring, event hook, and campaign asset set.

## Campaign assets

The four Meta-ready 4:5 creatives are in `public/ads/`. Final English copy, audience rationale, and a recommended first-city test structure are documented in `AD_CAMPAIGNS.md`.

The daily website-first measurement and decision rules are documented in `GROWTH_OPERATIONS.md`.

## Production

The public site is deployed from the `gh-pages` branch of the public `ievolnds/drift-landing` repository:

`https://ievolnds.github.io/drift-landing/`

目前正式入口為 `https://drift-landing-ten.vercel.app/` 與 `/zh-tw`，由 `main` 觸發原 Vercel 專案部署；上方 GitHub Pages 為既有相容出口，不是本輪主要交付網址。

## 網站中的真實 App 畫面

2026-09-09 依 Howard 要求新增，不取代既有人物場景、功能段落或下載按鈕。`AppScreens.tsx` 在兩語系中穿插三組：日常（貼文／相機／音樂）、相識（交會／個人頁）、對話（手繪貼圖／聊天室／自訂反應）。每組可左右滑動、按箭頭與點圖放大；放大使用原生 dialog，支援 Esc 關閉及焦點返回。

八張來源為已製作的 `store-assets/us/apple/iphone-6.9/*.png`，不是新生成的 UI。`public/app-screens/*.webp` 只作無損格式轉換；1320×2868 原尺寸與解碼後像素逐一比對一致，不裁切、不變造畫面。延遲載入，不拖慢原首屏圖片與下載鈕。

英文頁保留原本八張 iOS 商店素材。繁中頁獨立使用 `public/app-screens/zh-tw/*.webp`，不設英文圖 fallback；放大視窗也使用同語系路徑。

繁中素材於 2026-09-09 以原 App 的正式元件、繁中 i18n、離線示範資料在 iOS 模擬器重新渲染，原始畫面 1206×2622，再由 Goldie 排成 1320×2868 海報。照片沿用已核可的夜間街景與書店素材；相機感光輸入與音樂播放進度為隔離示範狀態，不讀寫正式用戶資料。月亮星星由觸控在原貼圖畫布繪製。保留 App 原有固定英文品牌用語（如 say hi、resonates、Undo、相機標語），不重畫或竄改 UI。網站註明「iOS 繁中介面・示範內容」。此批只部署網站，不送商店審核或 App OTA。
