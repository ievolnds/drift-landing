# drift — website-first growth operations

## Fixed operating rules

- Current market: Taiwan, Traditional Chinese. Funnel: Meta ad → `https://drift-landing-ten.vercel.app/zh-tw` → Taiwan App Store or Google Play. Preserve the English US page at `/`; do not switch back to US from older notes.
- Do not use App Ads, the Meta App SDK, or the old `drift` app data source.
- Use the `Drift Web` dataset (`1807919130381082`) and the `huh` ad account (`1569185924798046`).
- Keep one funded campaign at a time with a **US$10/day maximum spend**. The existing configured daily budget is **US$5.70**, with Meta displaying a US$9.98 daily maximum; retain the US$9 stop rule. Do not increase the budget, create another funded campaign, or extend the 2026-09-11 08:00 Asia/Taipei end time without Howard's approval.
- 2026-09-10 19:34 UTC：Howard 已明確核准存取帳號、發布台灣廣告並確認既有廣告主／出資者。account 存取阻擋已解除。Meta 確認 adset `52588902730922`、ad `52588902730722` 更新成功；campaign `52588902730522` 已開啟並顯示「檢閱中」。這不是已產生曝光的證據。保留其他草稿，不發布無關項目，不延長原期限。
- Lead with taste, sensibility, and mutual curiosity. Do not lead with distance, “nearby,” match volume, or generic dating claims.

## Daily scorecard

Record the same date range, report timezone and attribution window before comparing results. Meta uses Asia/Taipei; the previously observed Events Manager report used America/Chicago. Do not divide counts across those different daily windows.

1. Meta delivery: spend, impressions, reach, frequency, link CTR, CPC, and landing-page views.
2. Website intent: `PageView`, `StoreClick`, Apple clicks, Google clicks, hero clicks, and final-section clicks.
3. Derived metrics:
   - landing rate = landing-page views ÷ link clicks
   - store-click rate = StoreClick ÷ landing-page views, only when reporting windows/timezones and measurement scope are aligned; otherwise report separately
   - cost per store click = spend ÷ StoreClick
4. Store outcomes: App Store Connect first-time downloads and Google Play new installers. Treat these as aggregate cross-checks, not exact Meta attribution.
5. Supabase: SELECT aggregates only; exclude admins and the two designated test accounts. NON_US is not Taiwan. Report city-inferred Taiwan separately from unknown/other; profile creation is not an attributed install and next-day posting is not general app retention.
6. Log one decision: hold, pause, rotate creative, narrow placement, revise copy, or revise the landing page.

## Decision cadence at a $10/day budget

- Read results daily, but avoid changing the live test more than once every 72 hours unless delivery is broken or spend is duplicated.
- Do not judge a creative before roughly 2,000 impressions or 50 landing-page views.
- Review the landing page after at least 100 landing-page views; small daily changes make the signal impossible to read.
- Consider rotating a creative when link CTR stays below 0.5% after 2,000 impressions or its cost per StoreClick is more than 1.5× the recent account baseline.
- Call a direction promising only after at least 30 StoreClicks and a stable improvement across three days. These are operating thresholds, not forecasts.
- Change one major variable per test: creative/copy, audience, placement, or landing page—not several at once.

## Campaign URL convention

Use the landing page for every ad and keep these parameters consistent:

本次已發布台灣廣告使用固定值，避免動態名稱參數沿用原美國名稱：`?utm_source=meta&utm_medium=paid_social&utm_campaign=tw_taste_202609&utm_content=taste_v1&utm_term=tw_25_44`。

`StoreClick` carries the available UTM fields, store (`apple` or `google`), and placement (`hero` or `final`).

## Current Taiwan hypothesis

已發布受眾為台灣、所有性別、Advantage+ 建議年齡 25–44（不是強制年齡限制），詳細興趣空白。US 儲備受眾僅解除關聯，未刪除。品味 v1 單一素材主題：動態消息／右欄群組用 `taste.png`，直式群組用 `taste-reels-v1.png`。已視覺檢查手機動態消息與 Facebook 插播 Reel，不宣稱全部裝置／版位已驗收。備用文案及四組素材見 `AD_CAMPAIGNS_TW.md` 與 `public/ads/tw/`。

> 有些人，從喜歡的事就認得出來。

Proposed headline: `從喜歡的事開始認識`. US campaign results are historical context, not proof of Taiwanese conversion intent. Keep the English page and assets intact for a separately authorized future US run.
