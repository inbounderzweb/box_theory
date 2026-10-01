// Brand identity, mirrored from the public site's own SITE object
// (src/lib/content.ts) so sitemap/robots/manifest/SEO fallbacks agree with
// what visitors actually see. Real values should move into SiteSettings
// (admin-editable) once the Settings screen ships; this file stays as the
// build-time fallback for metadata and structured data.
export const siteConfig = {
  name: "Box Theory",
  tagline: "Packaging Intelligence Into Modern Packaging",
  description:
    "Box Theory bridges the gap between brands and packaging manufacturing partners through consultancy, sourcing intelligence, design & development, manufacturing coordination, and end-to-end execution.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  defaultOgImage: "/images/hero-packaging.svg",
  locale: "en_US",
} as const;
