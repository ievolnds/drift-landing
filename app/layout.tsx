import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MetaPixel } from "./MetaPixel";

const assetPrefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  ),
  title: {
    default: "drift — Meet people, not profiles.",
    template: "%s — drift",
  },
  description:
    "A quieter way to meet people in your city. Share a real moment, say hi, and keep talking only when you both want to.",
  keywords: ["drift", "social app", "meet people", "local connections", "dating app alternative"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "drift",
    title: "Meet people, not profiles.",
    description: "A quieter way to meet people in your city.",
    images: [{ url: `${assetPrefix}/og.png`, width: 1200, height: 630, alt: "drift — Meet people, not profiles." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "drift — Meet people, not profiles.",
    description: "A quieter way to meet people in your city.",
    images: [`${assetPrefix}/og.png`],
  },
  icons: {
    icon: `${assetPrefix}/favicon.svg`,
    shortcut: `${assetPrefix}/favicon.svg`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#11100e",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <MetaPixel />
      </body>
    </html>
  );
}
