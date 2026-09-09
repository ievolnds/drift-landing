/* eslint-disable @next/next/no-img-element -- Meta requires a noscript tracking pixel */
"use client";

import Script from "next/script";

import type { Locale } from "./site";

export const META_PIXEL_ID = "1807919130381082";

// 沿用既有的 Pixel 與既有的 PageView 事件，只多帶一個 locale 參數，
// 讓 en 與 zh-TW 兩頁的成效可以分開看。
// ⛔ 不換 Pixel ID、不加任何新的 SDK 或追蹤供應商。
const baseCode = (locale: Locale) => `
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window,document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init','${META_PIXEL_ID}');
  fbq('track','PageView',{locale:'${locale}'});
`;

export function MetaPixel({ locale }: { locale: Locale }) {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {baseCode(locale)}
      </Script>
      <noscript>
        <img
          alt=""
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&cd[locale]=${locale}&noscript=1`}
        />
      </noscript>
    </>
  );
}
