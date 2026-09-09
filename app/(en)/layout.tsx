import type { Metadata, Viewport } from "next";
import "../globals.css";
import { MetaPixel } from "../MetaPixel";
import { ASSET_PREFIX, LANGUAGE_ALTERNATES, METADATA_BASE } from "../seo";

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: {
    default: "drift — Meet people, not profiles.",
    template: "%s — drift",
  },
  description:
    "A quieter way to meet people in your city. Share a real moment, say hi, and keep talking only when you both want to.",
  keywords: ["drift", "social app", "meet people", "local connections", "dating app alternative"],
  alternates: {
    canonical: "/",
    languages: LANGUAGE_ALTERNATES,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "drift",
    title: "Meet people, not profiles.",
    description: "A quieter way to meet people in your city.",
    images: [{ url: `${ASSET_PREFIX}/og.png`, width: 1200, height: 630, alt: "drift — Meet people, not profiles." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "drift — Meet people, not profiles.",
    description: "A quieter way to meet people in your city.",
    images: [`${ASSET_PREFIX}/og.png`],
  },
  icons: {
    icon: `${ASSET_PREFIX}/favicon.svg`,
    shortcut: `${ASSET_PREFIX}/favicon.svg`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#11100e",
};

export default function EnLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <MetaPixel locale="en" />
      </body>
    </html>
  );
}
