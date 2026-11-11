"use client";

import { useId, useState, type ReactNode } from "react";

type Item = { label: string; title: string; text: string };

export function PurposeTabs({ items, media }: { items: readonly Item[]; media: ReactNode }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const current = items[active];

  return (
    <div className="roofer-container">
      <div className="flex justify-center">
      <div role="tablist" aria-label="Vision and Mission" className="grid w-full max-w-[420px] grid-cols-2 rounded-full border border-cocoa-umber/20 bg-white p-1 sm:w-auto sm:inline-flex">
        {items.map((item, i) => (
          <button
            key={item.label}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={e => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                const next = (active + (e.key === "ArrowRight" ? 1 : items.length - 1)) % items.length;
                setActive(next);
                document.getElementById(`${id}-tab-${next}`)?.focus();
              }
            }}
            className={`min-h-11 rounded-full px-6 py-2.5 text-[13px] font-semibold uppercase tracking-[.2em] transition sm:px-10 sm:text-[14px] ${
              i === active ? "bg-cocoa-umber text-gold-lightest" : "text-cocoa-light hover:text-cocoa-umber"
            }`}
          >
            {item.label.replace("Our ", "")}
          </button>
        ))}
      </div>

      </div>

      <div className="mt-10 grid items-center gap-10 md:mt-14 md:gap-14 lg:grid-cols-2">
        {media}
        <div key={active} role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`} className="mx-auto w-full max-w-[620px] animate-[fadeIn_.35s_ease] text-center">
          <p className="mb-5 flex items-center justify-center gap-4 text-[13px] font-semibold uppercase tracking-[.25em] text-gold-medium md:text-[15px]">
            <span aria-hidden="true" className="h-px w-8 bg-gold-medium/60 sm:w-14" />
            {current.label}
            <span aria-hidden="true" className="h-px w-8 bg-gold-medium/60 sm:w-14" />
          </p>
          <h2 id="story-title" className="font-display text-[clamp(28px,4vw,48px)] font-semibold leading-[1.12] tracking-[-.03em] text-balance">{current.title}</h2>
          <p className="mt-5 text-[16px] leading-[1.75] text-cocoa-light md:text-[18px] md:leading-[1.8]">{current.text}</p>
        </div>
      </div>
    </div>
  );
}
