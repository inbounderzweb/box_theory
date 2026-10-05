import Image from "next/image";
import Link from "next/link";

import { PageBanner } from "@/components/sections/PageBanner";
import { SERVICES, SITE, WHY_ITEMS } from "@/lib/content";
import type { ServiceDetail } from "@/lib/types";
import { SERVICE_IMAGES } from "@/lib/service-images";

const ICON = "m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 9 8-4.5M12 12v9M12 12 4 7.5";

function Icon({ path, className = "size-6" }: { path: string; className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path} /></svg>;
}

const H3 = "relative pb-4 font-display text-[20px] font-semibold uppercase tracking-wide after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-10 after:bg-gold-medium";

export function ServiceDetailView({ service, bannerTitle, crumbs }: { service: ServiceDetail; bannerTitle?: string; crumbs: { label: string; href?: string }[] }) {
  const photo = SERVICE_IMAGES[service.slug] ?? SERVICE_IMAGES.default;

  return (
    <div className="bg-white text-cocoa-umber">
      <PageBanner title={bannerTitle ?? service.title} crumbs={crumbs} />

      <div className="roofer-container grid gap-12 py-12 md:py-16 lg:grid-cols-[280px_1fr] lg:gap-14">
        <aside className="order-2 flex flex-col gap-10 lg:order-1 lg:sticky lg:top-6 lg:self-start">
          <div>
            <h2 className={H3}>Our Services</h2>
            <ul className="mt-6 border border-gold-light/80">
              {SERVICES.map(item => (
                <li key={item.slug} className="border-b border-gold-light/80 last:border-b-0">
                  <Link href={`/services/${item.slug}`} aria-current={item.slug === service.slug ? "page" : undefined} className={`flex items-center justify-between gap-3 px-4 py-3 text-[14px] transition ${item.slug === service.slug ? "bg-cocoa-umber font-semibold text-gold-lightest" : "hover:bg-gold-lightest"}`}>
                    {item.title}<span aria-hidden="true">›</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={H3}>Contact Us</h2>
            <ul className="mt-6 divide-y divide-gold-light/80 text-[14px]">
              <li className="flex gap-3 pb-4"><Icon className="mt-0.5 size-5 shrink-0 text-gold-medium" path="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" /><span><strong className="block">Serving</strong><span className="text-cocoa-light">{SITE.serviceAreas.join(" · ")}</span></span></li>
              <li className="flex gap-3 py-4"><Icon className="mt-0.5 size-5 shrink-0 text-gold-medium" path="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /><span><strong className="block">Call us on</strong><a href={`tel:${SITE.phoneHref}`} className="text-cocoa-light hover:text-cocoa-umber">{SITE.phone}</a></span></li>
              <li className="flex gap-3 pt-4"><Icon className="mt-0.5 size-5 shrink-0 text-gold-medium" path="M4 6h16v12H4V6Zm0 1 8 6 8-6" /><span className="min-w-0"><strong className="block">Mail us at</strong><a href={`mailto:${SITE.email}`} className="break-words text-cocoa-light hover:text-cocoa-umber">{SITE.email}</a></span></li>
            </ul>
            <Link href="/contact" className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-md bg-cocoa-umber px-6 py-3.5 text-[15px] font-medium text-gold-lightest transition hover:bg-cocoa-light">Get a Quote <span aria-hidden="true">→</span></Link>
          </div>
        </aside>

        <div className="order-1 min-w-0 lg:order-2">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gold-lightest">
            <Image src={photo} alt={service.title} fill priority sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover" />
          </div>

          <section aria-labelledby="desc-title" className="mt-12 grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 id="desc-title" className={H3}>Description</h2>
              <p className="mt-6 text-[16px] leading-[1.85] text-cocoa-light">{service.heroDescription}</p>
              <p className="mt-4 text-[15px] leading-[1.85] text-cocoa-light">{service.shortDescription}</p>
            </div>
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[360px] overflow-hidden rounded-xl md:max-w-none">
              <Image src="/images/industries/retail-ecommerce.jpg" alt="" fill sizes="(max-width: 768px) 80vw, 28vw" className="object-cover" />
            </div>
          </section>

          <section aria-labelledby="incl-title" className="mt-14 border-t border-gold-light/80 pt-10">
            <h2 id="incl-title" className={H3}>What It Includes</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {service.whatItIncludes.map(item => (
                <li key={item} className="flex items-start gap-4 rounded-xl border border-gold-light/80 p-6">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gold-lightest text-cocoa-umber"><Icon path={ICON} /></span>
                  <span className="pt-2.5 text-[15px] font-semibold leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="benefits-title" className="mt-14">
            <h2 id="benefits-title" className={H3}>Benefits of Working With Us</h2>
            <div className="mt-8 border border-gold-light/80">
              {WHY_ITEMS.slice(0, 4).map((item, i) => (
                <details key={item.id} name="benefits" open={i === 0} className="group border-b border-gold-light/80 last:border-b-0">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-semibold marker:hidden group-open:text-cocoa-light [&::-webkit-details-marker]:hidden">
                    {item.title}
                    <span aria-hidden="true" className="text-gold-medium transition-transform group-open:rotate-90">›</span>
                  </summary>
                  <p className="px-5 pb-5 text-[15px] leading-[1.8] text-cocoa-light">{item.description}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>

      <section aria-label="Contact details" className="bg-cocoa-umber text-gold-lightest">
        <div className="roofer-container grid gap-8 py-12 text-center sm:grid-cols-3 sm:text-left">
          <div><p className="text-[12px] uppercase tracking-[.2em] text-gold-soft">Serving</p><p className="mt-2 font-semibold">{SITE.serviceAreas.join(" · ")}</p></div>
          <div><p className="text-[12px] uppercase tracking-[.2em] text-gold-soft">Call us</p><a href={`tel:${SITE.phoneHref}`} className="mt-2 block font-semibold hover:underline">{SITE.phone}</a></div>
          <div><p className="text-[12px] uppercase tracking-[.2em] text-gold-soft">Email</p><a href={`mailto:${SITE.email}`} className="mt-2 block break-words font-semibold hover:underline">{SITE.email}</a></div>
        </div>
      </section>
    </div>
  );
}
