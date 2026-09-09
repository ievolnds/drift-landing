/* eslint-disable @next/next/no-img-element -- official store badge artwork is rendered directly */
"use client";

import {
  ASSET_PREFIX,
  STORE_BADGE_LABELS,
  STORE_URLS,
  type Locale,
  type Store,
} from "./site";

type TrackingValue = string | undefined;

type DriftWindow = typeof window & {
  dataLayer?: Array<Record<string, TrackingValue>>;
  fbq?: (
    action: "trackCustom",
    eventName: "StoreClick",
    parameters: Record<string, TrackingValue>,
  ) => void;
};

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export function getAttribution() {
  const search = new URLSearchParams(window.location.search);

  return Object.fromEntries(
    ATTRIBUTION_KEYS.map((key) => [key, search.get(key) ?? undefined]),
  );
}

// 既有的 StoreClick 事件與 dataLayer 欄位一律不動，只多帶一個 locale，
// 讓 en 與 zh-TW 兩頁的成效可以分開看。⛔ 不新增 SDK 或追蹤供應商。
function trackStoreClick(store: Store, placement: string, locale: Locale) {
  const detail = {
    event: "store_click",
    store,
    placement,
    locale,
    page_path: window.location.pathname,
    ...getAttribution(),
  };
  window.dispatchEvent(new CustomEvent("drift:store-click", { detail }));
  const driftWindow = window as DriftWindow;
  driftWindow.dataLayer?.push(detail);
  driftWindow.fbq?.("trackCustom", "StoreClick", detail);
}

export function StoreLink({
  store,
  placement,
  locale,
}: {
  store: Store;
  placement: string;
  locale: Locale;
}) {
  const apple = store === "apple";
  const label = STORE_BADGE_LABELS[locale][store];
  const badge = locale === "zh-TW"
    ? (apple ? "app-store-zh-tw.svg" : "google-play-zh-tw.png")
    : (apple ? "app-store.svg" : "google-play.png");

  return (
    <a
      className={`store-badge store-badge--${store}`}
      href={STORE_URLS[locale][store]}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackStoreClick(store, placement, locale)}
      aria-label={label}
    >
      <img
        src={`${ASSET_PREFIX}/store-badges/${badge}`}
        alt={label}
      />
    </a>
  );
}
