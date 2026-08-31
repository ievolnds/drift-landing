# drift — website-first growth operations

## Fixed operating rules

- Funnel: Meta ad → `https://drift-landing-ten.vercel.app` → App Store or Google Play.
- Do not use App Ads, the Meta App SDK, or the old `drift` app data source.
- Use the `Drift Web` dataset (`1807919130381082`) and the `huh` ad account (`1569185924798046`).
- Keep one funded campaign at a time with a **$10/day total budget**. Never increase the budget without Howard's approval.
- Lead with taste, sensibility, and mutual curiosity. Do not lead with distance, “nearby,” match volume, or generic dating claims.

## Daily scorecard

Record the same date range and attribution window before comparing results.

1. Meta delivery: spend, impressions, reach, frequency, link CTR, CPC, and landing-page views.
2. Website intent: `PageView`, `StoreClick`, Apple clicks, Google clicks, hero clicks, and final-section clicks.
3. Derived metrics:
   - landing rate = landing-page views ÷ link clicks
   - store-click rate = StoreClick ÷ landing-page views
   - cost per store click = spend ÷ StoreClick
4. Store outcomes: App Store Connect first-time downloads and Google Play new installers. Treat these as aggregate cross-checks, not exact Meta attribution.
5. Log one decision: hold, pause, rotate creative, narrow placement, revise copy, or revise the landing page.

## Decision cadence at a $10/day budget

- Read results daily, but avoid changing the live test more than once every 72 hours unless delivery is broken or spend is duplicated.
- Do not judge a creative before roughly 2,000 impressions or 50 landing-page views.
- Review the landing page after at least 100 landing-page views; small daily changes make the signal impossible to read.
- Consider rotating a creative when link CTR stays below 0.5% after 2,000 impressions or its cost per StoreClick is more than 1.5× the recent account baseline.
- Call a direction promising only after at least 30 StoreClicks and a stable improvement across three days. These are operating thresholds, not forecasts.
- Change one major variable per test: creative/copy, audience, placement, or landing page—not several at once.

## Campaign URL convention

Use the landing page for every ad and keep these parameters consistent:

`?utm_source=meta&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}`

`StoreClick` carries the available UTM fields, store (`apple` or `google`), and placement (`hero` or `final`).

## Current first hypothesis

The strongest early signal came from the “same city” visual, particularly Instagram Reels, but its old “nearby” language was off-brand. The next controlled version keeps the human after-rain scene and reframes the promise as:

> Same city. Similar sensibility.

The active headline should be English: `Meet people through taste.`
