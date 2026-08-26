# drift US landing page

The mobile-first acquisition site for drift. It introduces the product in English, sends visitors to the live iOS and Android store listings, and exposes a lightweight `store_click` event hook for future Meta Pixel wiring.

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

`npm test` runs a production vinext build and checks the rendered landing page, store links, mobile treatment, reduced-motion support, event hook, and campaign asset set.

## Campaign assets

The four Meta-ready 4:5 creatives are in `public/ads/`. Final English copy, audience rationale, and a recommended first-city test structure are documented in `AD_CAMPAIGNS.md`.

## Production

This project is deployed with OpenAI Sites. Site identity and optional service bindings are declared in `.openai/hosting.json`.
