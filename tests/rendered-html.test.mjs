import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete drift landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>drift — Meet people, not profiles\.<\/title>/i);
  assert.match(html, /A quieter social app for your city/);
  assert.match(html, /You are more interesting/);
  assert.match(html, /You each get five messages/i);
  assert.match(html, /No follower counts/);
  assert.match(html, /apps\.apple\.com\/us\/app\/drift-dting\/id6788133398/);
  assert.match(html, /play\.google\.com\/store\/apps\/details\?id=com\.howard\.drift/);
  assert.match(html, /og-drift\.png/);
  assert.doesNotMatch(html, /[\u3400-\u9fff]/);
  assert.doesNotMatch(html, /Your site is taking shape|SkeletonPreview/);
});

test("ships mobile, motion, attribution, and campaign assets", async () => {
  const [landing, css, campaign, adFiles] = await Promise.all([
    readFile(new URL("../app/LandingPage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../AD_CAMPAIGNS.md", import.meta.url), "utf8"),
    readdir(new URL("../public/ads/", import.meta.url)),
  ]);

  assert.match(landing, /IntersectionObserver/);
  assert.match(landing, /prefers-reduced-motion/);
  assert.match(landing, /drift:store-click/);
  assert.match(landing, /dataLayer\?\.push/);
  assert.match(css, /@media \(max-width: 800px\)/);
  assert.match(css, /\.mobile-download/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(campaign, /Dating-app fatigue/);
  assert.match(campaign, /Quiet, creative people/);
  assert.match(campaign, /City discovery/);
  assert.match(campaign, /Mutual, low-pressure connection/);
  assert.deepEqual(adFiles.sort(), [
    "ad-01-less-swiping.png",
    "ad-02-no-performance.png",
    "ad-03-same-city.png",
    "ad-04-mutual-choice.png",
  ]);

  await access(new URL("../public/og-drift.png", import.meta.url));
});
