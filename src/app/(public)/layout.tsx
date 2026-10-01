import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";

import { SITE } from "@/lib/content";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import "./globals.css";

/** Geometric grotesk used for all display type — hero, section headings. */
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-archivo",
});

/** Body/UI face. */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "packaging consultancy",
    "packaging sourcing",
    "packaging design and development",
    "manufacturing coordination",
    "B2B packaging solutions",
    "custom corrugated boxes",
    "rigid box manufacturing",
    "packaging India",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: "/images/hero-packaging.svg",
        width: 1600,
        height: 900,
        alt: SITE.tagline,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: ["/images/hero-packaging.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // No explicit `icons` override — Next.js picks up the generated icon from
  // src/app/icon.tsx (and favicon.ico) via file convention.
};

export const viewport: Viewport = {
  themeColor: "#4a3831",
  width: "device-width",
  initialScale: 1,
};

// Fonts, the public-only stylesheet (./globals.css, not loaded on admin
// routes), and the marketing header/footer live here instead of the shared
// root layout, so admin pages never inherit this site's fonts, tokens, or
// chrome. See src/app/layout.tsx for why the split works.
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${archivo.variable} ${inter.variable} min-h-screen font-sans antialiased`}
      style={{
        background: "#ffffff",
      }}
    >
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
