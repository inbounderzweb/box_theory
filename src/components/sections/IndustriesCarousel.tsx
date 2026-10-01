"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProcessJourney } from "./ProcessJourney";

export type IndustryCard = { id: string; name: string; description: string; image?: string };

const EASE = [0.22, 1, 0.36, 1] as const;

const ICONS: Record<string, string> = {
  "food-beverage": "M6 9h12l-1.2 10H7.2L6 9Zm-1-4h14v4H5V5Zm10 5v8",
  fmcg: "M7 4h4v3l1 2v11H6V9l1-2V4Zm8 6h3v10h-3M6 14h6",
  cosmetics: "M10 21v-8h4v8h-4Zm1-8V8l3-3v8M9 21h6",
  "retail-ecommerce": "M3 4h3l2 11h10l2-8H7M10 20h.01M17 20h.01",
  apparel: "M12 8a2 2 0 1 0-2-2M12 8v2l9 6a1 1 0 0 1-.6 1.8H3.6A1 1 0 0 1 3 16l9-6",
  "consumer-products": "M5 8h14l-1 12H6L5 8Zm4 0V6a3 3 0 0 1 6 0v2",
  electronics: "M8 8h8v8H8V8Zm-3 3h3m-3 2h3m8-2h3m-3 2h3M11 5v3m2-3v3m-2 8v3m2-3v3",
  healthcare: "M9 4h6v5h5v6h-5v5H9v-5H4V9h5V4Z",
  "industrial-products": "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0-6v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1m-8.6 8.6-2.1 2.1",
  "export-businesses": "M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Zm0 0h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
  "premium-brands": "M6 4h12l3 5-9 11L3 9l3-5Zm-3 5h18M9 4l3 5 3-5m-3 5v11",
  "d2c-startups": "m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 9 8-4.5M12 12v9M12 12 4 7.5",
};

function Icon({ id, className }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d={ICONS[id] ?? ICONS["d2c-startups"]} />
    </svg>
  );
}

/** How many cards are visible at once: 5 desktop, 3 tablet, 1 (with peeking neighbours) on phones. */
function useVisible() {
  const [visible, setVisible] = useState(5);
  useEffect(() => {
    const update = () => setVisible(window.innerWidth >= 1100 ? 5 : window.innerWidth >= 700 ? 3 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return visible;
}

const LAYOUT = {
  5: { width: 19, step: 20.6, reach: 2 },
  3: { width: 29, step: 31.5, reach: 1 },
  1: { width: 66, step: 72, reach: 1 },
} as const;

export function IndustriesCarousel({ cards }: { cards: IndustryCard[] }) {
  const count = cards.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  // Don't animate five blurred cards while the user is scrolling past other sections.
  const onScreen = useInView(sectionRef, { margin: "100px 0px" });
  const reduceMotion = useReducedMotion();
  const visible = useVisible();
  const { width, step, reach } = LAYOUT[visible as 1 | 3 | 5];

  const go = useCallback((delta: number) => setActive(a => (a + delta + count) % count), [count]);

  useEffect(() => {
    if (paused || reduceMotion || !onScreen) return;
    const timer = setInterval(() => go(1), 4800);
    return () => clearInterval(timer);
  }, [paused, reduceMotion, onScreen, go]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      id="industries"
      aria-roledescription="carousel"
      aria-labelledby="industries-title"
      className="relative overflow-hidden bg-gold-lightest py-20 text-cocoa-umber md:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Soft window-light wash, echoing the warm warehouse photography. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 85% 10%, rgb(222 210 188 / .7), transparent 70%), radial-gradient(ellipse 50% 45% at 8% 90%, rgb(207 192 159 / .5), transparent 70%)", maskImage: "linear-gradient(to bottom, #000 75%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, #000 75%, transparent)" }} />

      <div className="relative mx-auto w-[calc(100%-40px)] max-w-[1280px] md:w-[calc(100%-96px)]">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center"
        >
          <p className="mx-auto flex max-w-[420px] items-center gap-4 text-[12px] font-medium tracking-[.2em] text-cocoa-light">
            <span className="h-px flex-1 bg-champagne-gold/70" />INDUSTRIES SERVED<span className="h-px flex-1 bg-champagne-gold/70" />
          </p>
          <h2 id="industries-title" className="mt-5 font-display text-[clamp(38px,5.4vw,68px)] font-semibold leading-[1.08] tracking-[-.045em]">
            Industries We <span className="text-champagne-gold">Serve</span>
          </h2>
          <p className="mt-4 text-[16px] text-cocoa-light md:text-[18px]">Packaging solutions tailored for every industry.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          className="relative mt-12 md:mt-16"
        >
          <div
            className="relative h-[430px] touch-pan-y select-none md:h-[470px]"
            role="group"
            aria-label="Industries"
          >
            <motion.div className="absolute inset-0" onPanEnd={(_, info) => { if (Math.abs(info.offset.x) > 50) go(info.offset.x < 0 ? 1 : -1); }}>
              {cards.map((card, i) => {
                const offset = ((i - active + Math.floor(count / 2) + count) % count) - Math.floor(count / 2);
                const shown = Math.abs(offset) <= reach;
                const isActive = offset === 0;
                return (
                  <motion.article
                    key={card.id}
                    aria-hidden={!shown}
                    aria-label={`${i + 1} of ${count}: ${card.name}`}
                    initial={false}
                    animate={{
                      left: `${50 + offset * step}%`,
                      scale: isActive ? 1 : 0.9,
                      opacity: shown ? (isActive ? 1 : visible === 1 ? 0.55 : 0.92) : 0,
                    }}
                    transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
                    style={{ width: `${width}%`, x: "-50%", zIndex: 10 - Math.abs(offset), pointerEvents: shown ? "auto" : "none" }}
                    onClick={() => shown && !isActive && setActive(i)}
                    className={`absolute inset-y-0 flex flex-col overflow-hidden rounded-[20px] border bg-white/55 backdrop-blur-sm transition-[box-shadow,background-color,border-color] duration-500 ${isActive ? "border-gold-soft bg-white/85 shadow-[0_28px_60px_-24px_rgb(74_56_49/0.45)]" : "cursor-pointer border-gold-light shadow-[0_14px_34px_-22px_rgb(74_56_49/0.35)] hover:border-gold-soft"}`}
                  >
                    <div className="relative m-2.5 mb-0 basis-[54%] overflow-hidden rounded-[14px] bg-gradient-to-br from-gold-light via-gold-soft/70 to-gold-medium/60">
                      {card.image ? (
                        <Image src={card.image} alt={card.name} unoptimized={card.image.endsWith(".svg")} fill sizes="(max-width: 700px) 70vw, 22vw" className={`object-cover transition-transform duration-[1200ms] ease-out ${isActive ? "scale-105" : "scale-100"}`} />
                      ) : (
                        <Icon id={card.id} className="absolute left-1/2 top-1/2 size-[46%] -translate-x-1/2 -translate-y-1/2 text-cocoa-umber/25" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col items-center px-4 pb-5 pt-4 text-center">
                      <Icon id={card.id} className={`size-7 text-cocoa-umber transition-transform duration-500 ${isActive ? "-translate-y-0.5 scale-110" : ""}`} />
                      <h3 className="mt-3 font-display text-[16px] font-semibold leading-tight tracking-[-.01em] md:text-[17px]">{card.name}</h3>
                      <p className="mt-2 text-[13px] leading-[1.6] text-cocoa-light">{card.description}</p>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>

          {(["prev", "next"] as const).map(dir => (
            <button
              key={dir}
              type="button"
              onClick={() => go(dir === "next" ? 1 : -1)}
              aria-label={dir === "next" ? "Next industry" : "Previous industry"}
              className={`absolute top-[38%] z-20 grid size-11 place-items-center rounded-full border border-gold-light bg-white/90 text-cocoa-umber shadow-md transition hover:scale-110 hover:bg-white focus-visible:outline-2 focus-visible:outline-champagne-gold md:size-12 ${dir === "prev" ? "-left-2 md:-left-5" : "-right-2 md:-right-5"}`}
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={dir === "next" ? "m9 5 7 7-7 7" : "m15 5-7 7 7 7"} />
              </svg>
            </button>
          ))}
        </motion.div>

        <div className="mt-10 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <span aria-hidden="true" className="hidden h-px bg-gold-soft md:block" />
          <div className="col-span-3 flex justify-center gap-2 md:col-span-1" role="tablist" aria-label="Choose industry">
            {cards.map((card, i) => (
              <button
                key={card.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={card.name}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-500 ${i === active ? "w-7 bg-champagne-gold" : "w-2 bg-gold-soft/70 hover:bg-gold-soft"}`}
              />
            ))}
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <span aria-hidden="true" className="h-px flex-1 bg-gold-soft" />
            <span className="text-[13px] tabular-nums tracking-[.1em] text-cocoa-light" aria-live="polite">{pad(active + 1)} / {pad(count)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
