import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/sections/PageBanner";
import { CAPABILITIES, PORTFOLIO } from "@/lib/content";

export const metadata: Metadata = { title: "Portfolio" };

const ICONS: Record<string, string> = {
  "packaging-consultancy": "M12 3 4 6v6c0 4.5 3.2 7.6 8 9 4.8-1.4 8-4.5 8-9V6l-8-3Zm-3.5 9 2.5 2.5 4.5-5",
  "design-development": "M4 20l4-1 11-11a2.1 2.1 0 0 0-3-3L5 16l-1 4Zm10-13 3 3",
  "manufacturing-coordination": "M3 20V9l6 3V9l6 3V5h6v15H3Zm4-4h2m4 0h2m4 0h0",
  "packaging-sourcing": "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm5 12 5 5",
  "end-to-end-execution": "M4 12h13m-5-5 5 5-5 5M20 5v14",
  "b2b-packaging": "m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 9 8-4.5M12 12v9M12 12 4 7.5",
};

export default function Page() {
  return (
    <div className="bg-white text-cocoa-umber">
      <PageBanner title="Portfolio" crumbs={[{ label: "Home", href: "/" }, { label: "Portfolio" }]} />

      <section aria-labelledby="portfolio-intro" className="py-14 md:py-20">
        <div className="roofer-container grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[.3em] text-gold-medium">{PORTFOLIO.eyebrow}</p>
            <h2 id="portfolio-intro" className="font-display text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.12] tracking-[-.03em]">{PORTFOLIO.heading}</h2>
          </div>
          <p className="text-[16px] leading-[1.8] text-cocoa-light md:text-[17px]">{PORTFOLIO.body}</p>
        </div>
      </section>

      <section aria-labelledby="pillars-title" className="relative isolate overflow-hidden bg-gold-lightest py-16 md:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 55% 45% at 90% 0%, rgb(222 210 188 / .75), transparent 70%), radial-gradient(ellipse 45% 40% at 5% 100%, rgb(207 192 159 / .45), transparent 70%)" }} />
        <div className="roofer-container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mx-auto mb-5 flex max-w-[380px] items-center gap-4 text-[12px] font-semibold tracking-[.25em] text-cocoa-light">
              <span className="h-px flex-1 bg-champagne-gold/70" />OUR CORE PILLARS<span className="h-px flex-1 bg-champagne-gold/70" />
            </p>
            <h2 id="pillars-title" className="text-balance font-display text-[clamp(32px,4.6vw,56px)] font-semibold leading-[1.08] tracking-[-.04em]">
              What Every Project <span className="text-gold-medium">Stands On</span>
            </h2>
            <p className="mt-5 text-[16px] leading-[1.75] text-cocoa-light md:text-[18px]">Six capabilities that work together, from the first conversation to the final delivery.</p>
          </div>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {CAPABILITIES.map(item => (
              <li key={item.id}>
                <Link
                  href={item.id === "end-to-end-execution" ? "/contact" : `/services/${item.id}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-7 ring-1 ring-gold-light/80 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_56px_-28px_rgb(74_56_49/0.5)] md:p-8"
                >
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-gold-medium to-cocoa-umber transition-transform duration-500 group-hover:scale-x-100" />
                  <span aria-hidden="true" className="pointer-events-none absolute -right-2 -top-4 font-display text-[110px] font-semibold leading-none text-gold-lightest transition-colors duration-300 group-hover:text-gold-light">{item.number}</span>
                  <span className="relative grid size-14 place-items-center rounded-xl bg-cocoa-umber text-gold-lightest transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                    <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ICONS[item.id] ?? ICONS["b2b-packaging"]} /></svg>
                  </span>
                  <h3 className="relative mt-6 font-display text-[22px] font-semibold leading-tight tracking-[-.01em]">{item.title}</h3>
                  <p className="relative mt-3 flex-1 text-[15px] leading-[1.75] text-cocoa-light">{item.description}</p>
                  <span className="relative mt-6 inline-flex items-center gap-2 text-[14px] font-semibold">
                    Learn more <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Start a project" className="bg-cocoa-umber py-14 text-gold-lightest md:py-16">
        <div className="roofer-container flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <p className="max-w-xl font-display text-[clamp(22px,2.6vw,32px)] font-semibold leading-snug">Have a packaging challenge? Let&apos;s talk about the work that fits your category.</p>
          <Link href="/contact" className="inline-flex shrink-0 items-center gap-3 rounded-md bg-gold-medium px-8 py-3.5 text-[15px] font-semibold text-cocoa-umber transition hover:bg-gold-soft">Discuss Your Project <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </div>
  );
}
