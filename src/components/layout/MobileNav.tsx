"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { BrandMark } from "@/components/layout/BrandMark";
import { NAV_CTA, NAV_ITEMS, SITE } from "@/lib/content";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

const EASE = [0.22, 1, 0.36, 1] as const;
// Menu grows out of (and shrinks back into) the hamburger button's position.
const ORIGIN = "calc(100% - 46px) 46px";

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ clipPath: `circle(0px at ${ORIGIN})` }}
          animate={{ clipPath: `circle(150% at ${ORIGIN})` }}
          exit={{ clipPath: `circle(0px at ${ORIGIN})`, transition: { duration: 0.5, ease: EASE } }}
          transition={{ duration: 0.75, ease: EASE }}
          className="fixed inset-0 z-[60] flex h-dvh flex-col overflow-y-auto bg-espresso px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3 text-ivory xl:hidden"
        >
          {/* soft glow for depth */}
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-gold/20 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-24 size-80 rounded-full bg-rust/25 blur-3xl" />

          <div className="relative flex h-[68px] shrink-0 items-center justify-between pl-2">
            <BrandMark tone="light" />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="relative grid size-11 place-items-center rounded-full bg-ivory text-espresso active:scale-90"
            >
              <span aria-hidden className="absolute h-[1.5px] w-5 rotate-45 rounded-full bg-current" />
              <span aria-hidden className="absolute h-[1.5px] w-5 -rotate-45 rounded-full bg-current" />
            </button>
          </div>

          <nav aria-label="Mobile" className="relative flex flex-1 flex-col justify-center py-6">
            <ul>
              {NAV_ITEMS.map((item, i) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li key={item.label} className="overflow-hidden border-b border-ivory/10">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0, transition: { delay: 0.25 + i * 0.06, duration: 0.7, ease: EASE } }}
                      exit={{ y: "110%", transition: { duration: 0.25 } }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className="group flex items-baseline gap-4 py-3.5 active:opacity-70"
                      >
                        <span className="w-6 text-[12px] tabular-nums text-ivory/40">{String(i + 1).padStart(2, "0")}</span>
                        <span
                          className={`font-display text-[clamp(1.75rem,8vw,2.5rem)] font-semibold leading-none tracking-[-0.02em] transition-colors ${
                            active ? "text-gold-light" : "text-ivory group-hover:text-gold-light"
                          }`}
                        >
                          {item.label}
                        </span>
                        <span aria-hidden className="ml-auto text-xl text-ivory/30 transition-transform group-hover:translate-x-1">
                          {active ? "●" : "→"}
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <motion.div
            className="relative flex shrink-0 flex-col gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.65, duration: 0.6, ease: EASE } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            <Link
              href={NAV_CTA.href}
              onClick={onClose}
              className="flex h-14 items-center justify-center gap-2 rounded-full bg-gold text-[16px] font-semibold text-espresso active:scale-[0.98]"
            >
              {NAV_CTA.label} <span aria-hidden>→</span>
            </Link>
            <div className="flex flex-col gap-1 text-center text-[14px] text-ivory/70 sm:flex-row sm:justify-center sm:gap-6">
              <a href={`tel:${SITE.phoneHref}`} className="py-1 hover:text-gold-light">
                {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="py-1 hover:text-gold-light">
                {SITE.email}
              </a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
