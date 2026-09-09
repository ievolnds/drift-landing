import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const CJK = /[㐀-鿿]/;

function readOut(relative) {
  return readFile(new URL(`../out/${relative}`, import.meta.url), "utf8");
}

function readApp(relative) {
  return readFile(new URL(`../app/${relative}`, import.meta.url), "utf8");
}

// 語言切換鈕刻意在英文頁上顯示「中文」（無障礙慣例：用目標語言自己的寫法）。
// 英文頁「除了這顆按鈕以外不得出現中文」這條規則要保留，所以先把它剝掉再檢查。
function withoutLangSwitch(html) {
  return html.replace(/<a[^>]*class="lang-switch"[\s\S]*?<\/a>/g, "");
}

test("renders the complete public drift landing page", async () => {
  const html = await readOut("index.html");
  assert.match(html, /<html lang="en"/);
  assert.match(html, /<title>drift — Meet people, not profiles\.<\/title>/i);
  assert.match(html, /A quieter social app for people with taste/);
  assert.match(html, /People with taste rarely need to announce it/);
  assert.match(html, /Now · one hour/);
  assert.match(html, /Encounter · once a day/);
  assert.match(html, /A postcard before/);
  assert.match(html, /Five messages each/);
  assert.match(html, /Resonate/);
  assert.match(html, /apps\.apple\.com\/us\/app\/drift-dting\/id6788133398/);
  assert.match(html, /play\.google\.com\/store\/apps\/details\?id=com\.howard\.drift/);
  assert.match(html, /hl=en_US/);
  assert.match(html, /gl=US/);
  assert.match(html, /\/drift-landing\/scenes\/station\.webp/);
  assert.match(html, /\/drift-landing\/store-badges\/app-store\.svg/);
  assert.match(html, /\/drift-landing\/store-badges\/google-play\.png/);
  assert.match(html, /og\.png/);
  assert.match(html, /1807919130381082/);
  assert.match(html, /ev=PageView/);
  assert.doesNotMatch(withoutLangSwitch(html), CJK);
  assert.doesNotMatch(html, /Your site is taking shape|SkeletonPreview/);
  assert.doesNotMatch(html, /phone--|A preview of the drift/i);
});

test("renders the Traditional Chinese landing page at /zh-tw", async () => {
  const html = await readOut("zh-tw/index.html");
  assert.match(html, /<html lang="zh-Hant-TW"/);
  assert.match(html, /<title>drift — 有些人，從喜歡的事就認得出來。<\/title>/);
  assert.match(html, /一首重播的歌、一本捨不得看完的書。/);
  assert.match(html, /從日常裡的品味，慢慢認識一個人。/);
  assert.match(html, /品味不太需要說出口。/);

  // 五個功能段落各自不同，不重複講同一件事
  assert.match(html, /當下 · 一天最多兩篇/);
  assert.match(html, /此刻 · 一小時後消失/);
  assert.match(html, /交會 · 一天一次/);
  assert.match(html, /各五句話，然後兩次同意。/);
  assert.match(html, /自訂標籤/);
  assert.match(html, /手繪貼圖/);
  assert.match(html, /自訂訊息反應/);

  // 台灣官方商店網址
  assert.match(html, /apps\.apple\.com\/tw\/app\/drift-dting\/id6788133398/);
  assert.match(html, /play\.google\.com\/store\/apps\/details\?id=com\.howard\.drift/);
  assert.match(html, /hl=zh_TW/);
  assert.match(html, /gl=TW/);
  assert.doesNotMatch(html, /apps\.apple\.com\/us\//);
  assert.doesNotMatch(html, /hl=en_US/);

  // 沿用既有 Pixel 與既有事件，只多帶 locale
  assert.match(html, /1807919130381082/);
  assert.match(html, /ev=PageView/);
  assert.match(html, /cd\[locale\]=zh-TW/);

  // 重用既有場景照片，沒有假造的 app 畫面
  assert.match(html, /\/drift-landing\/scenes\/station\.webp/);
  assert.match(html, /\/drift-landing\/scenes\/bookstore\.webp/);
  assert.match(html, /\/drift-landing\/store-badges\/app-store\.svg/);
  assert.doesNotMatch(html, /phone--|screenshot|app-preview/i);

  // 首屏（hero，第一個 section）就要有下載鈕。
  // 切到 id="what-is-drift" 那個 section 為止——不能用 "what-is-drift"，
  // 因為 nav 的錨點連結在 hero 之前就出現了。
  const firstScreen = html.slice(0, html.indexOf('id="what-is-drift"'));
  assert.match(firstScreen, /store-row store-row--hero/);
  assert.match(firstScreen, /store-badge--apple/);
  assert.match(firstScreen, /store-badge--google/);
});

test("zh-TW copy stays inside the product's factual and naming limits", async () => {
  const source = await readApp("LandingPageZhTw.tsx");
  const html = await readOut("zh-tw/index.html");

  // ⛔ 全專案禁用詞
  assert.doesNotMatch(html, /配對/);
  assert.doesNotMatch(html, /\bmatch(ing|ed)?\b/i);

  // ⛔ feed 全球互通、刻意沒有同城 filter（docs/UIUX_PLAN.md 第 2 節），
  //    距離也早已不顯示（PostCard.tsx:86），所以不得出現同城／附近／距離訴求
  assert.doesNotMatch(html, /同城|附近的人|你附近|公里|km 內/);

  // ⛔ 不承諾一定遇得到人／一定成功
  assert.doesNotMatch(html, /保證|一定能|包你|成功率/);

  // ⛔ 此刻不得宣稱「只有雙向解鎖看得到」——src/lib/statuses.ts:10 與 :231
  //    說明 Now 是同一個 region 可見，不是僅限雙向解鎖
  assert.doesNotMatch(html, /只有.{0,8}解鎖.{0,8}看得到|僅.{0,6}解鎖.{0,6}可見/);

  // 定位仍要講清楚「不比距離」
  assert.match(html, /不比距離。/);
  assert.ok(source.includes("statuses.ts"), "文案紅線註解要指回原始碼出處");
});

test("links the two locales together and keeps UTM across the switch", async () => {
  const [en, zh, langSwitch] = await Promise.all([
    readOut("index.html"),
    readOut("zh-tw/index.html"),
    readApp("LangSwitch.tsx"),
  ]);

  // 雙向互連
  assert.match(en, /class="lang-switch"[^>]*href="\/drift-landing\/zh-tw\/"/);
  assert.match(zh, /class="lang-switch"[^>]*href="\/drift-landing\/"/);

  // 可見標籤用目標語言、aria-label 用當頁語言
  assert.match(en, /aria-label="Switch to Traditional Chinese"/);
  assert.match(en, /<span lang="zh-Hant-TW">中文<\/span>/);
  assert.match(zh, /aria-label="切換到英文版網頁"/);
  assert.match(zh, /<span lang="en">English<\/span>/);

  // hreflang 互指
  assert.match(en, /hrefLang="zh-Hant-TW"[^>]*drift-landing\/zh-tw\//);
  assert.match(zh, /hrefLang="en"[^>]*drift-landing\//);
  assert.match(en, /rel="canonical" href="[^"]*drift-landing\/"/);
  assert.match(zh, /rel="canonical" href="[^"]*drift-landing\/zh-tw\/"/);

  // 切換語言時把 query string（含 UTM）帶過去；沒有 query 就走原本的連結
  assert.match(langSwitch, /const \{ search \} = window\.location;/);
  assert.match(langSwitch, /if \(!search\) return;/);
  assert.match(langSwitch, /url\.search = search;/);
  assert.match(langSwitch, /window\.location\.assign\(url\.toString\(\)\)/);
});

test("ships mobile, motion, attribution, and campaign assets", async () => {
  const [landing, zhLanding, storeLink, reveal, pixel, css, campaign, readme, adFiles] =
    await Promise.all([
      readApp("LandingPage.tsx"),
      readApp("LandingPageZhTw.tsx"),
      readApp("StoreLink.tsx"),
      readApp("useReveal.ts"),
      readApp("MetaPixel.tsx"),
      readApp("globals.css"),
      readFile(new URL("../AD_CAMPAIGNS.md", import.meta.url), "utf8"),
      readFile(new URL("../README.md", import.meta.url), "utf8"),
      readdir(new URL("../public/ads/", import.meta.url)),
    ]);

  // 進場動效與 reduced-motion 由兩頁共用的 hook 負責
  assert.match(reveal, /IntersectionObserver/);
  assert.match(reveal, /typeof window\.IntersectionObserver === "undefined"/);
  assert.match(reveal, /prefers-reduced-motion/);
  assert.match(landing, /useReveal\(\)/);
  assert.match(zhLanding, /useReveal\(\)/);

  // 追蹤欄位集中在 StoreLink，兩頁共用；locale 是這次唯一新增的欄位
  assert.match(storeLink, /drift:store-click/);
  assert.match(storeLink, /dataLayer\?\.push/);
  assert.match(storeLink, /fbq\?\.\("trackCustom", "StoreClick", detail\)/);
  assert.match(storeLink, /utm_campaign/);
  assert.match(storeLink, /locale,/);
  assert.match(pixel, /1807919130381082/);
  assert.match(pixel, /connect\.facebook\.net\/en_US\/fbevents\.js/);
  assert.match(pixel, /fbq\('track','PageView',\{locale:'\$\{locale\}'\}\)/);

  // 官方徽章，兩個語系都用同一組官方素材
  assert.match(landing, /store-row store-row--hero/);
  assert.match(zhLanding, /store-row store-row--hero/);
  assert.match(storeLink, /Download on the App Store|store-badges/);
  assert.doesNotMatch(landing, /mobile-download/);

  assert.match(css, /@media \(max-width: 820px\)/);
  assert.match(css, /\.store-badge--apple/);
  assert.match(css, /\.store-badge--google/);
  assert.match(css, /\.lang-switch/);
  assert.match(css, /min-height: 44px/);
  assert.doesNotMatch(css, /\.mobile-download/);
  assert.match(css, /\.motion-ready \[data-reveal\]/);
  assert.doesNotMatch(css, /\.js \[data-reveal\]/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);

  assert.match(campaign, /Dating-app fatigue/);
  assert.match(campaign, /Quiet, creative people/);
  assert.match(campaign, /City discovery/);
  assert.match(campaign, /Mutual, low-pressure connection/);
  assert.match(campaign, /\$10\/day/);
  assert.doesNotMatch(campaign, /approximate distance|Someone nearby|happening nearby/i);
  assert.match(readme, /Meta Pixel `1807919130381082`/);
  assert.deepEqual(adFiles.sort(), [
    "ad-01-less-swiping.png",
    "ad-02-no-performance.png",
    "ad-03-same-city.png",
    "ad-04-mutual-choice.png",
  ]);

  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../public/store-badges/app-store.svg", import.meta.url));
  await access(new URL("../public/store-badges/google-play.png", import.meta.url));
  await access(new URL("../out/.nojekyll", import.meta.url));
});
