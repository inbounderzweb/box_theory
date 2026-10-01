import Link from "next/link";

import { BrandMark } from "@/components/layout/BrandMark";
import { Container } from "@/components/ui/Container";
import { FOOTER, FOOTER_BLOG_LINK, SITE } from "@/lib/content";

export function Footer() {
  return (
    <footer className="roofer-footer bg-espresso text-ivory">
      <Container size="wide" className="pb-10 pt-20 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-5">
            <BrandMark tone="light" />
            <p className="max-w-xs text-sm leading-7 text-ivory/65">{FOOTER.blurb}</p>
          </div>

          {FOOTER.navGroups.map((group, groupIndex) => {
            const isLastGroup = groupIndex === FOOTER.navGroups.length - 1;
            const links = isLastGroup ? [...group.links, FOOTER_BLOG_LINK] : group.links;

            return (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="label text-ivory/40">{group.title}</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-[15px] text-ivory/80 transition-colors hover:text-champagne">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}

          <div>
            <h2 className="label text-ivory/40">Contact</h2>
            <ul className="mt-5 flex flex-col gap-3 text-[15px]">
              <li>
                <a href={`tel:${SITE.phoneHref}`} className="text-ivory/80 transition-colors hover:text-champagne">
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="text-ivory/80 transition-colors hover:text-champagne">
                  {SITE.email}
                </a>
              </li>
              <li className="pt-2 text-ivory/50">{SITE.serviceAreas.join(" · ")}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-ivory/40">{FOOTER.copyright}</p>
          <ul className="flex gap-6">
            {FOOTER.legal.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-[13px] text-ivory/40 transition-colors hover:text-champagne">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
