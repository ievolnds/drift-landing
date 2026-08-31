import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const width = 1080;
const height = 1350;

const ads = [
  {
    source: "station.webp",
    output: "ad-01-less-swiping.png",
    headline: ["Less swiping.", "More noticing."],
    subline: "Meet people, not profiles.",
    position: "attention",
  },
  {
    source: "rain-cafe.webp",
    output: "ad-02-no-performance.png",
    headline: ["You don’t have to", "perform here."],
    subline: "Share one real moment.",
    position: "attention",
  },
  {
    source: "after-rain.webp",
    output: "ad-03-same-city.png",
    headline: ["Same city.", "Similar sensibility."],
    subline: "Meet people through taste.",
    position: "centre",
  },
  {
    source: "bookstore.webp",
    output: "ad-04-mutual-choice.png",
    headline: ["Five messages.", "Two yeses."],
    subline: "Keep talking when it’s mutual.",
    position: "attention",
  },
];

const escapeXml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function overlay({ headline, subline }) {
  const [lineOne, lineTwo] = headline.map(escapeXml);
  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#090908" stop-opacity="0.83"/>
          <stop offset="0.48" stop-color="#090908" stop-opacity="0.25"/>
          <stop offset="0.72" stop-color="#090908" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="bottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.55" stop-color="#090908" stop-opacity="0"/>
          <stop offset="1" stop-color="#090908" stop-opacity="0.56"/>
        </linearGradient>
      </defs>
      <rect width="1080" height="760" fill="url(#top)"/>
      <rect width="1080" height="1350" fill="url(#bottom)"/>
      <text x="68" y="82" fill="#F3EDE3" font-family="Baskerville, 'Times New Roman', serif" font-size="47" font-style="italic" letter-spacing="-2">drift<tspan fill="#D18E62">.</tspan></text>
      <text x="68" y="188" fill="#F3EDE3" font-family="Baskerville, 'Times New Roman', serif" font-size="82" letter-spacing="-3.4">
        <tspan x="68" dy="0">${lineOne}</tspan>
        <tspan x="68" dy="82">${lineTwo}</tspan>
      </text>
      <text x="72" y="395" fill="#F3EDE3" fill-opacity="0.86" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" font-weight="400" letter-spacing="0.4">${escapeXml(subline)}</text>
      <rect x="68" y="1221" width="236" height="58" rx="29" fill="#F3EDE3"/>
      <text x="186" y="1258" text-anchor="middle" fill="#10100F" font-family="Helvetica Neue, Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="1.8">DOWNLOAD FREE</text>
      <text x="1012" y="1258" text-anchor="end" fill="#F3EDE3" fill-opacity="0.8" font-family="Helvetica Neue, Arial, sans-serif" font-size="14" font-weight="600" letter-spacing="1.5">A QUIETER SOCIAL APP</text>
    </svg>
  `);
}

await mkdir(resolve(root, "public/ads"), { recursive: true });

for (const ad of ads) {
  const source = resolve(root, "public/scenes", ad.source);
  const output = resolve(root, "public/ads", ad.output);

  await sharp(source)
    .resize(width, height, { fit: "cover", position: ad.position })
    .composite([{ input: overlay(ad), blend: "over" }])
    .png({ compressionLevel: 9, palette: false })
    .toFile(output);

  console.log(output);
}
