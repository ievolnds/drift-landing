import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  return readFile(new URL("../out/index.html", import.meta.url), "utf8");
}

test("renders the complete public drift landing page", async () => {
  const html = await render();
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
  assert.match(html, /\/drift-landing\/scenes\/station\.webp/);
  assert.match(html, /\/drift-landing\/store-badges\/app-store\.svg/);
  assert.match(html, /\/drift-landing\/store-badges\/google-play\.png/);
  assert.match(html, /og\.png/);
  assert.match(html, /1807919130381082/);
  assert.match(html, /ev=PageView/);
  assert.doesNotMatch(html, /[\u3400-\u9fff]/);
  assert.doesNotMatch(html, /Your site is taking shape|SkeletonPreview/);
  assert.doesNotMatch(html, /phone--|A preview of the drift/i);
});

test("ships mobile, motion, attribution, and campaign assets", async () => {
  const [landing, pixel, css, campaign, readme, adFiles] = await Promise.all([
    readFile(new URL("../app/LandingPage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/MetaPixel.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../AD_CAMPAIGNS.md", import.meta.url), "utf8"),
    readFile(new URL("../README.md", import.meta.url), "utf8"),
    readdir(new URL("../public/ads/", import.meta.url)),
  ]);

  assert.match(landing, /IntersectionObserver/);
  assert.match(landing, /typeof window\.IntersectionObserver === "undefined"/);
  assert.match(landing, /prefers-reduced-motion/);
  assert.match(landing, /drift:store-click/);
  assert.match(landing, /dataLayer\?\.push/);
  assert.match(landing, /fbq\?\.\("trackCustom", "StoreClick", detail\)/);
  assert.match(landing, /utm_campaign/);
  assert.match(pixel, /1807919130381082/);
  assert.match(pixel, /connect\.facebook\.net\/en_US\/fbevents\.js/);
  assert.match(pixel, /fbq\('track','PageView'\)/);
  assert.match(landing, /store-row store-row--hero/);
  assert.match(landing, /Download on the App Store/);
  assert.match(landing, /Get it on Google Play/);
  assert.doesNotMatch(landing, /mobile-download/);
  assert.match(css, /@media \(max-width: 820px\)/);
  assert.match(css, /\.store-badge--apple/);
  assert.match(css, /\.store-badge--google/);
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
