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

`vercel.json` is retained as an optional path for a future Vercel custom-domain deployment.
