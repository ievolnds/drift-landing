# drift US landing page

The mobile-first acquisition site for drift. It introduces the product in English and sends visitors to the live iOS and Android store listings.

Meta Pixel `1807919130381082` records a `PageView` on entry and a custom `StoreClick` event from every App Store and Google Play button. `StoreClick` includes the store, button placement, page path, and available UTM fields; it does not rely on the Meta App SDK.

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
