"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import { PROCESS_STEPS } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

// Horizontal centre of each box in the desktop artwork (% of image width).
const STAGE_X = [15.7, 30, 43.9, 58.2, 72.7, 87.3];

// Shared label lines, just above and below the tallest box (% of artwork height) so all six align.
const BOX_TOP = [12, 12, 12, 12, 12, 12];
const BOX_BOTTOM = [76, 76, 76, 76, 76, 76];
// Staggered rise (px) of each stage's label above its box, and drop (px) of its description below, so the text zig-zags instead of forming rigid rows.
const LABEL_RISE = [6, 30, 14, 38, 4, 24];
const DESC_DROP = [8, 26, 12, 34, 6, 20];

// Phone layout: which side each stage's text sits on, and where it starts (% of artwork height).
const PHONE_STAGES: { side: "l" | "r"; top: number; width: number }[] = [
  { side: "l", top: 8, width: 31 },
  { side: "r", top: 17, width: 34 },
  { side: "r", top: 47, width: 34 },
  { side: "l", top: 48, width: 27 },
  { side: "r", top: 72, width: 34 },
  { side: "l", top: 78, width: 34 },
];

const DESCRIPTIONS = [
  "Understand your product, market, logistics and packaging requirements.",
  "Build a packaging strategy around cost, protection, presentation and scalability.",
  "Identify suitable materials, suppliers and manufacturing partners.",
  "Move from concept to prototypes, samples and production-ready packaging.",
  "Coordinate manufacturing, printing, quality control and delivery.",
  "Deliver packaging that is ready for your operation and your customer.",
];

const ICONS = [
  "M4 5h16v11H9l-5 4V5Zm4 4h8m-8 3h5", // conversation
  "M12 4a2 2 0 1 0 0 .01M5 18a2 2 0 1 0 0 .01M19 18a2 2 0 1 0 0 .01M12 6v5m0 0-6 5m6-5 6 5", // network
  "m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 4 9 5 9-5", // layers
  "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0-6v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1m-8.6 8.6-2.1 2.1", // gear
  "M3 21V10l5 3V9l5 3V5h3v7l5 2v7H3Zm4 0v-4m4 4v-4m4 4v-4", // factory
  "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z", // pin
];

function StageIcon({ index, className }: { index: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d={ICONS[index]} />
    </svg>
  );
}

export function ProcessJourney() {
  const reduceMotion = useReducedMotion();
  const view = { once: true, margin: "-80px" } as const;
  const rise = (delay: number, y = 28) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : y },
    whileInView: { opacity: 1, y: 0 },
    viewport: view,
    transition: { duration: reduceMotion ? 0.2 : 0.8, delay: reduceMotion ? 0 : delay, ease: EASE },
  });

  return (
    <section id="process" aria-labelledby="process-title" className="relative overflow-hidden bg-gold-lightest py-20 text-cocoa-umber md:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 40% at 50% 30%, rgb(222 210 188 / .65), transparent 72%)" }} />

      <div className="relative mx-auto w-[calc(100%-40px)] max-w-[1280px] text-center md:w-[calc(100%-96px)]">
        <motion.div {...rise(0, 24)}>
          <p className="mx-auto flex max-w-[460px] items-center gap-4 text-[12px] font-medium tracking-[.3em] text-cocoa-light">
            <span className="h-px flex-1 bg-champagne-gold/70" />OPERATING PROCESS<span className="h-px flex-1 bg-champagne-gold/70" />
          </p>
          <h2 id="process-title" className="mt-5 font-display text-[clamp(34px,4.8vw,62px)] font-semibold leading-[1.08] tracking-[-.045em]">
            From Your First Idea to<br /><span className="text-champagne-gold">Your Next Milestone.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-[1.8] text-cocoa-light md:text-[18px]">
            A streamlined process to bring your packaging vision to life.
          </p>
        </motion.div>
      </div>

      {/* Desktop: labels above each box, descriptions below, all centred on the artwork. */}
      <div className="relative mx-auto hidden w-[calc(100%-96px)] max-w-[1180px] pb-[150px] pt-[120px] min-[1100px]:block">
        <motion.div {...rise(0.15, 40)} className="relative aspect-[2170/386]">
          <picture>
            <img
              src="/images/process/process_desktop.webp"
              width={2170}
              height={386}
              loading="lazy"
              decoding="async"
              alt="A ribbon of open cartons moving from an idea through planning, sourcing and development to production and truck delivery."
              className="h-full w-full drop-shadow-[0_24px_24px_rgb(74_56_49/0.16)]"
            />
          </picture>

          <ol className="absolute inset-0">
            {PROCESS_STEPS.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={view}
                transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.3 + i * 0.12, ease: EASE }}
                style={{ "--x": `${STAGE_X[i]}%`, "--top": `${BOX_TOP[i]}%`, "--bottom": `${BOX_BOTTOM[i]}%` } as CSSProperties}
                className="group absolute inset-y-0 left-[var(--x)] w-[13%] -translate-x-1/2"
              >
                {/* Number + title sit right on top of the box, tied to it by a short drawn line. */}
                <div className="absolute inset-x-0 bottom-[calc(100%-var(--top)+2px)] flex flex-col items-center text-center">
                  <motion.span
                    initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={view}
                    transition={{ type: "spring", stiffness: 220, damping: 14, delay: reduceMotion ? 0 : 0.5 + i * 0.12 }}
                    className="block bg-gradient-to-b from-champagne-gold to-[#8f7340] bg-clip-text font-display text-[30px] font-semibold leading-none tabular-nums text-transparent transition-transform duration-500 group-hover:scale-110"
                  >
                    {item.step}
                  </motion.span>
                  <h3 className="relative mt-1 font-display text-[16px] font-semibold tracking-[-.015em]">
                    {item.title}
                    <span aria-hidden="true" className="absolute -bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-champagne-gold transition-all duration-500 group-hover:w-full" />
                  </h3>
                  <motion.span
                    aria-hidden="true"
                    initial={{ scaleY: reduceMotion ? 1 : 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={view}
                    transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.8 + i * 0.12, ease: EASE }}
                    className="mt-1.5 w-px origin-top bg-champagne-gold"
                    style={{ height: 8 + LABEL_RISE[i] }}
                  />
                </div>

                {/* Icon + description tucked directly under the box. */}
                <div className="absolute inset-x-0 top-[calc(var(--bottom)+2px)] flex flex-col items-center text-center">
                  <span aria-hidden="true" className="w-px bg-champagne-gold/70" style={{ height: 8 + DESC_DROP[i] }} />
                  <span
                    className="grid size-9 place-items-center rounded-full border border-champagne-gold/50 bg-gold-lightest/80 text-cocoa-umber shadow-[0_8px_18px_-10px_rgb(74_56_49/0.5)] transition-colors duration-500 group-hover:border-champagne-gold group-hover:bg-champagne-gold group-hover:text-white"
                    style={reduceMotion ? undefined : { animation: `process-float 4.6s ease-in-out ${i * 0.4}s infinite` }}
                  >
                    <StageIcon index={i} className="size-[18px]" />
                  </span>
                  <p className="mt-2.5 text-[12px] leading-[1.55] text-cocoa-umber/85">{DESCRIPTIONS[i]}</p>
                  <span aria-hidden="true" className="mt-3 h-[2px] w-7 rounded-full bg-champagne-gold transition-all duration-500 group-hover:w-11" />
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>

      {/* Phones: text follows the winding artwork, switching sides where there is room beside each box. */}
      <div className="relative mx-auto mt-12 w-[calc(100%-24px)] max-w-[480px] pb-10 md:hidden">
        <motion.div {...rise(0.1, 40)} className="mx-auto w-[62%]">
          <picture>
            <img
              src="/images/process/process_mobile.webp"
              width={720}
              height={1809}
              loading="lazy"
              decoding="async"
              alt="A ribbon of open cartons winding down the page from an idea through planning, sourcing and development to production and truck delivery."
              className="h-auto w-full drop-shadow-[0_24px_24px_rgb(74_56_49/0.16)]"
            />
          </picture>
        </motion.div>

        <ol className="absolute inset-0">
          {PROCESS_STEPS.map((item, i) => {
            const { side, top, width } = PHONE_STAGES[i];
            const left = side === "l";
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: reduceMotion ? 0 : left ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.1, ease: EASE }}
                style={{ top: `${top}%`, width: `${width}%` }}
                className={`absolute ${left ? "left-0 text-left" : "right-0 text-right"}`}
              >
                <span className="block bg-gradient-to-b from-champagne-gold to-[#8f7340] bg-clip-text font-display text-[26px] font-semibold leading-none tabular-nums text-transparent">{item.step}</span>
                <h3 className="mt-1 font-display text-[16px] font-semibold tracking-[-.015em]">{item.title}</h3>
                <span aria-hidden="true" className={`mt-1.5 block h-[2px] w-7 rounded-full bg-champagne-gold ${left ? "" : "ml-auto"}`} />
                <p className="mt-1.5 text-[11px] leading-[1.5] text-cocoa-umber/85">{DESCRIPTIONS[i]}</p>
              </motion.li>
            );
          })}
        </ol>
      </div>

      {/* Tablet: artwork, then a card per stage. */}
      <div className="relative hidden md:max-[1099px]:block">
        <motion.div {...rise(0.15, 40)} className="relative mx-auto mt-14 w-full max-w-[1000px]">
          <picture>
            <img
              src="/images/process/process_desktop.webp"
              width={2170}
              height={386}
              loading="lazy"
              decoding="async"
              alt="A ribbon of open cartons moving from an idea through planning, sourcing and development to production and truck delivery."
              className="h-auto w-full drop-shadow-[0_24px_24px_rgb(74_56_49/0.16)]"
            />
          </picture>
        </motion.div>

        <ol className="mx-auto mt-10 grid w-[calc(100%-96px)] max-w-[1000px] grid-cols-3 gap-5">
          {PROCESS_STEPS.map((item, i) => (
            <motion.li key={item.id} {...rise(0.05 + (i % 3) * 0.1, 30)} className="flex gap-4 rounded-2xl border border-gold-light bg-white/60 p-5 backdrop-blur-sm">
              <span className="font-display text-[30px] font-semibold leading-none tabular-nums text-champagne-gold">{item.step}</span>
              <div>
                <h3 className="font-display text-[19px] font-semibold tracking-[-.015em]">{item.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-[1.7] text-cocoa-light">{DESCRIPTIONS[i]}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
