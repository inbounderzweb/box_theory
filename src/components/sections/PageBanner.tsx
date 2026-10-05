import Image from "next/image";
import Link from "next/link";

type Crumb = { label: string; href?: string };

/** Inner-page header: warm photo banner with the page title, then a breadcrumb strip. */
export function PageBanner({ title, crumbs }: { title: string; crumbs: Crumb[] }) {
  return (
    <>
      <section aria-labelledby="page-title" className="relative isolate flex min-h-[220px] items-end overflow-hidden bg-cocoa-umber text-white sm:min-h-[260px] lg:min-h-[320px]">
        <Image src="/images/hero_section/desktop_banner_img1.png" alt="" fill priority sizes="100vw" className="-z-20 object-cover object-[80%_center] sm:object-[72%_center]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-cocoa-umber/80 via-cocoa-umber/45 to-cocoa-umber/10 sm:from-cocoa-umber/90 sm:via-cocoa-umber/60 sm:to-cocoa-umber/20" />
        <div className="roofer-container pb-9 pt-16 md:pb-12">
          <h1 id="page-title" className="font-display text-[clamp(30px,5vw,56px)] font-semibold leading-[1.08] tracking-[-.03em] [text-shadow:0_1px_14px_rgb(74_56_49/0.5)]">{title}</h1>
        </div>
      </section>
      <nav aria-label="Breadcrumb" className="border-b border-gold-light/70 bg-white">
        <ol className="roofer-container flex flex-wrap items-center gap-x-3 gap-y-1 py-4 text-[13px] text-cocoa-light">
          {crumbs.map((crumb, i) => (
            <li key={crumb.label} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden="true">›</span>}
              {crumb.href ? <Link href={crumb.href} className="hover:text-cocoa-umber">{crumb.label}</Link> : <span aria-current="page" className="font-medium text-gold-medium">{crumb.label}</span>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
