import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { PageBanner } from "@/components/sections/PageBanner";
import { CONTACT_PAGE, SITE } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };

const INFO = [
  { label: "Call us on", value: SITE.phone, href: `tel:${SITE.phoneHref}`, path: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" },
  { label: "Mail us at", value: SITE.email, href: `mailto:${SITE.email}`, path: "M4 6h16v12H4V6Zm0 1 8 6 8-6" },
  { label: "Serving", value: SITE.serviceAreas.join(" · "), path: "M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" },
] as const;

export default function Page() {
  return (
    <div className="bg-white text-cocoa-umber">
      <PageBanner title="Contact Us" crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <div className="roofer-container grid gap-12 py-12 md:py-16 lg:grid-cols-[320px_1fr] lg:gap-14">
        <aside className="flex flex-col gap-8">
          <div>
            <h2 className="relative pb-4 font-display text-[20px] font-semibold uppercase tracking-wide after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-10 after:bg-gold-medium">{CONTACT_PAGE.heading}</h2>
            <p className="mt-6 text-[15px] leading-[1.8] text-cocoa-light">{CONTACT_PAGE.body}</p>
          </div>
          <ul className="divide-y divide-gold-light/80 border border-gold-light/80">
            {INFO.map(item => (
              <li key={item.label} className="flex items-start gap-4 p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold-lightest text-cocoa-umber">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={item.path} /></svg>
                </span>
                <span className="min-w-0 text-[14px]">
                  <strong className="block">{item.label}</strong>
                  {"href" in item ? <a href={item.href} className="break-words text-cocoa-light hover:text-cocoa-umber">{item.value}</a> : <span className="text-cocoa-light">{item.value}</span>}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        <section id="enquire" aria-labelledby="enquiry-title" className="min-w-0">
          <h2 id="enquiry-title" className="relative pb-4 font-display text-[20px] font-semibold uppercase tracking-wide after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-10 after:bg-gold-medium">{CONTACT_PAGE.form.title}</h2>
          <div className="mt-8 rounded-xl border border-gold-light/80 p-6 shadow-[0_18px_44px_-24px_rgb(74_56_49/0.3)] sm:p-8">
            <ContactForm />
          </div>
        </section>
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
