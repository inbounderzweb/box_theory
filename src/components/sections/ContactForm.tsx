"use client";

import { type FormEvent } from "react";
import { CONTACT_PAGE, SITE } from "@/lib/content";

const F = CONTACT_PAGE.form;
const FIELD = "w-full rounded-md border border-gold-light bg-white px-4 py-3 text-[15px] text-cocoa-umber outline-none transition placeholder:text-cocoa-muted focus:border-gold-medium focus:ring-2 focus:ring-gold-medium/30";
const LABEL = "mb-2 block text-[13px] font-semibold";

/** There is no enquiry backend yet, so submitting opens the visitor's mail app with the details filled in. */
export function ContactForm() {
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const d = new FormData(event.currentTarget);
    const lines = [
      `Name: ${d.get("name")}`, `Company: ${d.get("company") || "-"}`, `Email: ${d.get("email")}`, `Phone: ${d.get("phone") || "-"}`,
      `Packaging requirement: ${d.get("requirement") || "-"}`, `Estimated quantity: ${d.get("quantity") || "-"}`, "", `${d.get("message") || ""}`,
    ];
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("Packaging project enquiry")}&body=${encodeURIComponent(lines.join("\n"))}`;
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div><label htmlFor="c-name" className={LABEL}>{F.name} *</label><input id="c-name" name="name" required autoComplete="name" className={FIELD} /></div>
      <div><label htmlFor="c-company" className={LABEL}>{F.company}</label><input id="c-company" name="company" autoComplete="organization" className={FIELD} /></div>
      <div><label htmlFor="c-email" className={LABEL}>{F.email} *</label><input id="c-email" name="email" type="email" required autoComplete="email" className={FIELD} /></div>
      <div><label htmlFor="c-phone" className={LABEL}>{F.phone}</label><input id="c-phone" name="phone" type="tel" autoComplete="tel" className={FIELD} /></div>
      <div><label htmlFor="c-req" className={LABEL}>{F.packagingRequirement}</label><input id="c-req" name="requirement" placeholder="e.g. corrugated mailer boxes" className={FIELD} /></div>
      <div><label htmlFor="c-qty" className={LABEL}>{F.estimatedQuantity}</label><input id="c-qty" name="quantity" placeholder="e.g. 5,000 units" className={FIELD} /></div>
      <div className="sm:col-span-2"><label htmlFor="c-msg" className={LABEL}>{F.message}</label><textarea id="c-msg" name="message" rows={5} className={FIELD} /></div>
      <div className="sm:col-span-2">
        <button type="submit" className="inline-flex items-center gap-3 rounded-md bg-cocoa-umber px-8 py-3.5 text-[15px] font-medium text-gold-lightest transition hover:bg-cocoa-light">{F.submit} <span aria-hidden="true">→</span></button>
      </div>
    </form>
  );
}
