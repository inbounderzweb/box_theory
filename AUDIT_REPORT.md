# The Boxtheory — Technical & Reusability Audit

**Scope:** full codebase (`boxtheory/`), Next.js 16 + MongoDB CMS. Verified via static review, `tsc --noEmit`, `eslint`, and a live dev-server smoke test (all public/admin routes, HTML output diffed against source).
**Not verified:** Lighthouse/Core Web Vitals, cross-device visual QA, and any check requiring the MongoDB Atlas connection — the database is unreachable from this environment (IP not whitelisted), so DB-backed flows were reviewed by reading code, not exercised end-to-end. Say so explicitly rather than claiming coverage I don't have.

## What this codebase actually is

Not a static template — it's a full CMS (MongoDB + admin panel with auth, blog, testimonials, media library, dynamic pages, audit log). It was built by forking a purchased physiotherapy/medical clinic template ("Mednix," per `public/icons/physio-highlights/SOURCES.md`, converted **5 days before this audit**) and its content was never genericized. The backend data models (`Service`, `TeamMember`, `Page`, `Testimonial`, `ContactEnquiry`, etc.) were already industry-agnostic — the medical branding lived entirely in the static frontend content (`src/lib/content.ts`) and the bundled images/icons.

## Work completed in this pass

- Rewrote `src/lib/content.ts` (the single source of truth for all homepage copy) from medical/clinic content to box/packaging content — hero, about, services, service carousel, team, quote-request form, case studies, testimonials, blog teasers, footer.
- Renamed `Doctor` → `TeamMember`, `PhysioService` → `CarouselService` in `src/lib/types.ts`; removed the dead `HeroSlide`/`HERO_SLIDES` export (never rendered anywhere).
- Renamed components: `PhysioHighlights` → `ServiceHighlights`, `PhysioServices` → `ServiceCarousel`, `Appointment` → `QuoteRequest` (including the `#appointment` anchor → `#quote`, and the "Doctor/Department" form fields → "Service/Preferred contact method").
- Fixed a broken nav link: `NAV_ITEMS` pointed "About" at `/about`, a CMS route with no seeded page (guaranteed 404 on a fresh deploy) while the homepage already has a full `#about` section. Repointed it to match the single-page pattern used by every other nav item.
- Replaced every medical stock photo and Mednix-derived icon with original, hand-authored SVG placeholder art (brand palette, isometric box motifs) — see "Licensing" below for why this wasn't optional.
- Fixed hardcoded medical strings that lived outside `content.ts`: `PhysioHighlights.tsx`'s inline highlight copy, `testimonials-section.tsx` ("What Our Patients Say"), admin login page ("patient enquiries"), admin dashboard ("share patient success stories"), blog page metadata/empty-state copy, and the logo/header/footer's baked-in `"— Wellness Simplified"` alt text.
- Found and fixed a leftover from the original client ("Fysit," confirmed by the Mongo database name in `.env.local`): the PWA/app icon (`src/app/icon.tsx`) and the admin sidebar's collapsed-state avatar both hardcoded the letter **"F"**. Both now derive from `siteConfig.name`.
- Fixed a real bug introduced by the archive step: `PageBanner.tsx` (used by `/blog` and every CMS page) defaulted its background to `/images/banner-care.jpg`, a clinic photo, with no caller overriding it — every inner page was showing clinic photography by default. Repointed to the new placeholder and made `unoptimized` conditional on file extension so a real photo passed in later still gets Next's image optimization.
- Archived (moved, not deleted — **this repo has no git history**, see Critical #1) all now-orphaned original assets to `_original-assets-archive/` outside `public/`, so nothing is served but nothing is destroyed. This included several files that were already dead before this audit (`map.png`, `about-arrow.svg`, `slider-next.svg`, `case-studies-heading.webp`, four unused `case-*.jpg` photos) — pre-existing, not caused by this pass. Final state: `public/` now contains zero JPG/PNG files from the original template — the only raster/binary image left is `map2.jpg` (a plain world map, not clinic-specific) plus one decorative `.webp` glyph (Low #12).
- Found and fixed two more identity leaks outside the folders the first sweep covered: `/admin/login`'s background photo and an unused-but-correctly-sized OG image both carried the original client's real name, "Fysit" — see Critical #3.
- Deleted the five unmodified `create-next-app` boilerplate icons (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`) sitting at the public root — generic framework scaffolding, unreferenced, no project-specific content, safe to remove outright rather than archive.
- Verified with `tsc --noEmit` (clean), `eslint` (clean), and a live dev-server request to `/`, `/blog`, `/contact`, `/admin/login`, and a bad route (all correct status codes, HTML spot-checked for leftover strings).

---

## Critical

**1. No version control (`git init` was never run).**
*Why it matters:* Every change in this pass — and every change any future developer makes — is unrecoverable if something goes wrong. There is no diff history, no blame, no branch, no way to review what changed before deploying it.
*Recommendation:* `git init`, commit the current state, and adopt normal branch/PR hygiene before continuing. `.gitignore` is already correct (`.env*.local` is excluded), so this is safe to do immediately.
*Priority:* Critical — do this before any further work, by anyone.

**2. Bundled photography and icons likely carry licensing exposure.**
`public/icons/physio-highlights/SOURCES.md` states the icon artwork was converted directly from a **purchased** ThemeForest template ("Mednix — Physiotherapy & Medical," `mednix.themeht.com`) via font-outline extraction, "no artwork was redrawn," dated 5 days before this audit. The photography (doctor headshots, clinic interiors) almost certainly came from the same source. Standard commercial template licenses (e.g. Envato's Regular License) typically cover **one end product** — reusing that art across multiple future client sites, which is explicitly this project's stated goal, is very likely outside the license terms actually purchased.
*Current implementation:* All Mednix-derived assets have been replaced in this pass with original SVG artwork and moved to `_original-assets-archive/` (not deleted, not served).
*Recommendation:* Before treating this as a resolved legal question, locate the original Envato purchase and read the license type. If it's a Regular License, the archived assets should not be restored into any future deployment, medical-themed or otherwise, beyond the one site it was originally licensed for.
*Files:* `_original-assets-archive/**`, originally `public/images/*.jpg`, `public/icons/*.svg`.

**3. The original client's real brand name and a watermarked stock photo were live on the admin login screen and in an unused OG-image file.**
Two files outside the directories I first swept (`public/`'s root, not `public/images/` or `public/icons/`) still carried the original client's actual identity:
- `public/login-page-cover-photo.png` — **actively rendered** as the full-height background photo on `/admin/login` — a real stock photo of a physiotherapist working with a patient, with a "F" logo baked directly into the pixels. Every admin who logs in was seeing this.
- `public/og-default.png` — unreferenced anywhere in code, but a correctly-sized (1200×630) Open Graph image reading "The Fysit — Wellness Simplified" with the same "F" logo. Had anyone wired this into `layout.tsx` (a very plausible next step, since it's the right size for the job) it would have put the prior client's real name into every social share card.
Both are now archived to `_original-assets-archive/images/`; the login page uses a new original placeholder illustration (`public/images/login-cover.svg`).
*Why it matters:* "Fysit" is a real business name, not a demo placeholder — shipping it in a client-facing template is a direct brand/confidentiality leak of whoever "Fysit" actually is, independent of the medical-content problem this whole audit is about.
*Recommendation:* when auditing a forked/cloned project like this one, check the full `public/` tree (including its root and any subfolder, not just the obviously-named ones) for leftover identity assets, not just the folders a first pass of `content.ts` points you to — that's exactly how these two survived the first sweep in this session.
*Files:* `src/app/admin/login/page.tsx`, `_original-assets-archive/images/og-default.png`, `_original-assets-archive/images/login-page-cover-photo.png`.

**4. Live production credentials sit in plaintext in `.env.local`.**
A real MongoDB Atlas connection string (with password), a session-signing secret, and a Cloudinary API secret are all present in `.env.local`. `.gitignore` correctly excludes `.env*.local`, so these were never at risk of being committed — but they have now been read into this AI session's context as part of this audit.
*Recommendation:* Rotate the MongoDB password, `SESSION_SECRET`, and Cloudinary API secret as a precaution before this codebase is used as a client-facing template. Going forward, keep secrets out of any file that gets pasted, screen-shared, or fed to a tool.
*Files:* `.env.local`.

---

## High Priority

**5. DB-connectivity failures aren't handled consistently.**
`src/app/sitemap.ts` wraps its database calls in try/catch and falls back to static routes — correct. `src/app/(public)/blog/page.tsx` and `src/app/(public)/[slug]/page.tsx` call `listPublishedBlogPosts` / `getPublishedPageBySlug` with no such handling; observed directly in this session (the Atlas cluster is unreachable from this sandbox) — the failure propagates to the nearest error boundary (`src/app/error.tsx`) instead of a friendly inline empty-state like the blog page already has for "no posts."
*Recommendation:* Wrap public-facing data fetches in try/catch with a graceful fallback, consistent with `sitemap.ts`'s existing pattern.
*Files:* `src/app/(public)/blog/page.tsx`, `src/app/(public)/[slug]/page.tsx`, `src/app/(public)/blog/[slug]/page.tsx`.

**6. A Server→Client serialization error was observed in the dev log.**
`⨯ Error: Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported.` This means somewhere a Mongoose document (not a plain object) is being passed as a prop into a `"use client"` component — Mongoose documents carry prototype methods that React can't serialize across the server/client boundary. I could not pin down the exact call site because it only surfaces on a route that also depends on the (unreachable, in this sandbox) database, but it is a real, reproducible class of bug.
*Recommendation:* Audit `src/services/*.ts` for any Mongoose query missing `.lean()` (or an explicit `.toObject()`) before its result is threaded into a component tree that includes a Client Component — the admin dashboard's chart/stat components are the most likely candidates given the timing of the error.
*Files:* likely `src/services/enquiry.service.ts`, `src/components/admin/enquiries-chart.tsx`, or similar — needs live-DB verification to confirm.

**7. `SERVICES` (icon-tile grid) is fully built but commented out; `TestimonialsSection` is fully built but never imported anywhere.**
*Why it matters:* both are real, working, DB/content-integrated components that a future developer will either duplicate (not realizing they exist) or delete (not realizing why they're there).
*Recommendation:* decide intent — either wire `<Services />` and `<TestimonialsSection />` into a page, or delete them. Left them in place since removing working functionality wasn't asked for; the comment at the `<Services />` call site now documents why it's disabled.
*Files:* `src/app/(public)/page.tsx`, `src/components/sections/Services.tsx`, `src/components/public/testimonials-section.tsx`.

**8. `defaultOgImage` and OG/Twitter images now point at an SVG.**
Facebook, LinkedIn, and most Twitter/X clients render Open Graph images unreliably (or not at all) when they're SVG rather than JPG/PNG. The project already had a correctly-sized 1200×630 PNG ready for this (`public/og-default.png`) — but it had to be archived rather than reused, since it read "The Fysit — Wellness Simplified" (see Critical #3).
*Recommendation:* export a fresh static PNG at 1200×630 from whatever design tool produces the final hero art and point `siteConfig.defaultOgImage` and the layout metadata at that instead of the SVG placeholder.
*Files:* `src/config/site.ts`, `src/app/(public)/layout.tsx`.

---

## Medium Priority

**9. Duplicated site identity between `src/config/site.ts` and `src/lib/content.ts`'s `SITE` export.**
Both hold name/tagline/description/url, kept manually in sync (there's a comment acknowledging this: "Real values should move into SiteSettings... once the Settings screen ships"). A `SiteSettings` Mongoose model already exists (`src/models/SiteSettings.ts`) and an admin Settings screen already exists (`src/app/admin/(protected)/settings/`) — this looks like an intentional, tracked migration that just hasn't happened yet, not an oversight.
*Recommendation:* finish wiring `siteConfig`/`SITE` to read from the `SiteSettings` document (with the current constants as the seed/fallback), which is exactly the reusability goal requested — one admin-editable source of truth instead of two hardcoded files.
*Files:* `src/config/site.ts`, `src/lib/content.ts`, `src/models/SiteSettings.ts`, `src/app/admin/(protected)/settings/`.

**10. New placeholder illustrations are original but intentionally generic.**
The replacement SVGs (isometric box clusters, generic avatar silhouette) are deliberately simple flat-vector art — appropriate for a template placeholder, but they are not photography and won't carry the same visual weight as the original design's full-bleed photo treatment (hero, About, DarkBanner, FeatureBand, QuoteRequest all expect a real photo). A production deployment needs real product/warehouse photography dropped into the same `content.ts` fields.
*Files:* `public/images/*.svg`, `public/images/cards/*.svg`, `src/lib/content.ts`.

**11. Tailwind arbitrary-value classes throughout (`px-[35px]`, `leading-[26px]`, etc.) flagged by the editor's own linter as convertible to canonical utilities** (`px-8.75`, `leading-6.5`). This is a deliberate, documented choice (comments throughout cite exact Figma pixel values), not an oversight, and changing it risks subtly drifting off those measurements. Left as-is; noting it only because the audit asked for a code-quality pass.
*Priority:* Low, not Medium, if the Figma-fidelity goal still applies — bump this only if pixel-parity with the original design is no longer a requirement.

---

## Low Priority

**12. `heading-cross.webp`** is a decorative rotating "+"/sparkle glyph (confirmed via `BandHeading.tsx`'s own doc comment), not a medical cross — the filename is just unfortunate. Cosmetic rename only if it bothers a future maintainer.

**13. Admin seed script logs a default password to stdout** (`scripts/seed.ts`: `admin@boxtheory.local` / `ChangeMe123!`). Fine for local dev seeding, already named generically, just flagging that this shouldn't be the flow used to create a real production admin.

**14. `public/masks/hero-card.svg` is an unreferenced, orphaned clip-path mask** — generic rounded-rectangle geometry, not brand-sensitive, just dead weight. Safe to delete whenever someone's doing a dependency-free-file pass.

---

## Performance note (not a defect, a design decision made in this pass)

`Hero.tsx` previously autoplayed a full-bleed `<video>` background. I replaced it with a static image for two independent reasons: (1) the source video was almost certainly clinic footage inherited from the same template and there's no replacement video to drop in, and (2) removing an autoplaying video background is a straightforward, real improvement to LCP/INP and mobile data usage regardless of content — video backgrounds are one of the more common Core Web Vitals regressions in template-derived marketing sites. If a real brand video becomes available later, restoring `<video>` in `Hero.tsx` is a small, isolated change.

---

## What I did not verify

- **Core Web Vitals / Lighthouse** — no headless browser run in this pass; the placeholder SVG swap and video removal should help LCP, but this is not measured.
- **Cross-device responsive/visual QA** — reviewed the Tailwind breakpoints in source, did not visually render at multiple viewports.
- **Accessibility contrast, screen-reader pass, keyboard-trap testing** — spot-checked (skip link, focus-visible ring, aria-labels are already present throughout) but not run through an automated or manual a11y audit tool.
- **Any DB-backed flow** (admin login, blog CRUD, testimonial CRUD, contact form submission, media upload) — the MongoDB Atlas cluster is unreachable from this environment, so these were reviewed by reading the service/model code, not exercised live.
- **Dependency vulnerability scan** (`npm audit` or equivalent) — not run.

If any of these matter before shipping, they need a follow-up pass with actual DB access and a browser.
