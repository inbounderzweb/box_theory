"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { SITE } from "@/lib/content";
import styles from "./IndustriesCarousel.module.css";

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

const PRIORITIES: Record<string, string[]> = {
  "food-beverage": ["Shelf life", "Food safety", "Shelf appeal"],
  fmcg: ["High volumes", "Consistency", "Speed to market"],
  cosmetics: ["Brand expression", "Premium finishes", "Product protection"],
  "retail-ecommerce": ["Transit protection", "Unboxing", "Brand recall"],
  apparel: ["Brand identity", "Right-sized formats", "Presentation"],
  "consumer-products": ["Shelf presence", "Everyday use", "Online delivery"],
  electronics: ["Impact protection", "Secure transit", "Product fit"],
  healthcare: ["Tamper evidence", "Product integrity", "Clear labelling"],
  "industrial-products": ["Heavy-duty strength", "Freight handling", "Bulk formats"],
  "export-businesses": ["Transit performance", "Shipping requirements", "Protection"],
  "premium-brands": ["First impressions", "Fine finishes", "Brand experience"],
  "d2c-startups": ["Unboxing", "Brand identity", "Room to scale"],
};

const IMAGE_POSITION: Record<string, string> = {
  "premium-brands": "center 70%",
  "d2c-startups": "center 55%",
  cosmetics: "center 55%",
};

function Arrow({ direction = "diagonal" }: { direction?: "previous" | "next" | "diagonal" }) {
  const path = direction === "previous" ? "M19 12H5m5-5-5 5 5 5" : direction === "next" ? "M5 12h14m-5-5 5 5-5 5" : "M6 18 18 6M6 6h12v12";
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path} /></svg>;
}

/** An industry explorer with manual selection and no automatic content changes. */
export function IndustriesCarousel({ cards }: { cards: IndustryCard[] }) {
  const [activeId, setActiveId] = useState(cards[0]?.id ?? "");
  const reduceMotion = useReducedMotion();
  const index = Math.max(0, cards.findIndex(card => card.id === activeId));
  const selected = cards[index];
  if (!selected) return null;

  const pad = (n: number) => String(n).padStart(2, "0");
  const go = (offset: number) => setActiveId(cards[(index + offset + cards.length) % cards.length].id);
  const enquiry = `mailto:${SITE.email}?subject=${encodeURIComponent(`Packaging enquiry — ${selected.name}`)}`;

  return (
    <section id="industries" aria-labelledby="industries-title" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          data-reveal
          className={styles.heading}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease: EASE }}
        >
          <div>
            <p className={styles.eyebrow}><span aria-hidden="true" />INDUSTRIES SERVED</p>
            <h2 id="industries-title" className={styles.title}>Industries We <span>Serve.</span></h2>
          </div>
          <div className={styles.intro}><p>Packaging solutions tailored<br />for every industry.</p><span>YOUR WORLD. OUR PACKAGING EXPERTISE.</span></div>
        </motion.div>

        <motion.div
          data-reveal
          className={styles.explorer}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.12, ease: EASE }}
        >
          <div className={styles.directory}>
            <div className={styles.directoryHeading}><h3>Find your industry.</h3><span>{pad(index + 1)} <span>/ {pad(cards.length)}</span></span></div>
            <p className={styles.directoryHint}>Different products. Different priorities. Select yours.</p>
            <ul className={styles.sectorList} aria-label="Select an industry">
              {cards.map((card, i) => <li key={card.id}>
                <button type="button" className={styles.sector} aria-pressed={selected.id === card.id} aria-controls="industry-preview" onClick={() => setActiveId(card.id)}>
                  <span className={styles.sectorNumber}>{pad(i + 1)}</span><span className={styles.sectorName}>{card.name}</span><span className={styles.sectorArrow}><Arrow /></span>
                </button>
              </li>)}
            </ul>
            <div className={styles.mobilePicker}>
              <label htmlFor="industry-select">EXPLORE YOUR INDUSTRY</label>
              <div className={styles.pickerControls}>
                <div className={styles.selectWrap}><select id="industry-select" value={selected.id} onChange={event => setActiveId(event.target.value)} aria-controls="industry-preview">{cards.map((card, i) => <option value={card.id} key={card.id}>{pad(i + 1)} — {card.name}</option>)}</select><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg></div>
                <button type="button" onClick={() => go(-1)} aria-label="Previous industry"><Arrow direction="previous" /></button>
                <button type="button" onClick={() => go(1)} aria-label="Next industry"><Arrow direction="next" /></button>
              </div>
            </div>
            <div className={styles.directoryFooter}><span className={styles.boxMark} aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="m16 3 12 7v13l-12 7-12-7V10l12-7Zm0 14 12-7M4 10l12 7v13M10 6.5l12 7v7" /></svg></span><p>Built around your product.<br /><span>Considered at every step.</span></p></div>
          </div>

          <div id="industry-preview" role="region" aria-labelledby="industry-preview-title" className={styles.preview}>
            <AnimatePresence initial={false}>
              <motion.div key={selected.id} className={styles.imageLayer} initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.75, ease: EASE }} aria-hidden="true">
                {selected.image ? <Image src={selected.image} alt="" fill sizes="(max-width: 900px) calc(100vw - 40px), 55vw" unoptimized={selected.image.endsWith(".svg")} className={styles.image} style={{ objectPosition: IMAGE_POSITION[selected.id] ?? "center" }} /> : <div className={styles.imageFallback}><Icon id={selected.id} /></div>}
              </motion.div>
            </AnimatePresence>
            <div className={styles.shade} aria-hidden="true" />
            <div className={styles.previewTop}><span className={styles.previewBadge}><Icon id={selected.id} />TAILORED TO YOUR WORLD</span><span className={styles.previewNumber}>{pad(index + 1)}<span> / {pad(cards.length)}</span></span></div>
            <div className={styles.previewContent}>
              <motion.div key={selected.id} initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 9 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}>
                <h3 id="industry-preview-title" className={styles.previewTitle}>{selected.name}</h3>
                <p className={styles.description}>{selected.description}</p>
                <ul className={styles.priorities} aria-label="Packaging priorities">{(PRIORITIES[selected.id] ?? ["Product protection", "Brand presentation"]).map(priority => <li key={priority}>{priority}</li>)}</ul>
              </motion.div>
              <a href={enquiry} className={styles.previewLink} aria-label={`Discuss your packaging: ${selected.name}`}><span>Discuss your packaging</span><span className={styles.ctaArrow}><Arrow /></span></a>
            </div>
          </div>
        </motion.div>

        <div className={styles.footer}><p><span className={styles.footerDot} aria-hidden="true" />From everyday essentials to extraordinary brands.</p><a href="#enquire">Let’s find your fit<Arrow /></a></div>
        <p className={styles.srOnly} role="status" aria-atomic="true">{selected.name} selected.</p>
      </div>
    </section>
  );
}
