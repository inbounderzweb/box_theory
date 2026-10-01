"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { SITE } from "@/lib/content";
import styles from "./IndustriesDirectory.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;
const CONSIDERATIONS = [
  {
    id: "fit",
    title: "The right fit.",
    body: "Dimensions built around your product and how it travels.",
    note: "A considered fit, from the inside out.",
    detail: "Length, width and height are specified around your product, with space for the protection it needs.",
    annotation: "CUSTOM DIMENSIONS",
    icon: "M4 9V4h5m6 0h5v5m0 6v5h-5m-6 0H4v-5M8 8h8v8H8Z",
  },
  {
    id: "strength",
    title: "The right strength.",
    body: "Materials selected for protection, handling and cost.",
    note: "Protection that works through the journey.",
    detail: "Board and structure are matched to your product’s weight, handling conditions and shipping requirements.",
    annotation: "CONSIDERED STRUCTURE",
    icon: "m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 4 9 5 9-5",
  },
  {
    id: "finish",
    title: "The right impression.",
    body: "Print and finishing that make the packaging yours.",
    note: "Your brand, carried through every detail.",
    detail: "Artwork, print and finishing are coordinated to bring your identity onto the final carton.",
    annotation: "YOUR BRAND, YOUR BOX",
    icon: "m15 4 5 5-10 10-6 1 1-6L15 4Zm-8 8 5 5M13 6l5 5M4 20h16",
  },
] as const;

const USE_CASES = [
  { title: "Shipping & transit", body: "Protect products through handling and delivery.", icon: "m12 3 9 5v9l-9 5-9-5V8l9-5Zm0 10 9-5M3 8l9 5v9" },
  { title: "Retail & display", body: "Bring structure and presentation to the shelf.", icon: "M4 21V9h16v12M3 9l2-6h14l2 6M8 21v-7h8v7M2 21h20M3 9h18" },
  { title: "E-commerce & mailers", body: "Make the arrival part of your brand experience.", icon: "M3 9h18v12H3V9Zm0 0 4-5h10l4 5M3 9l9 5 9-5M12 14v7" },
] as const;

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg>;
}

function LineIcon({ path }: { path: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path} /></svg>;
}

export function IndustriesDirectory() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const selected = CONSIDERATIONS[active];
  const quoteHref = `mailto:${SITE.email}?subject=${encodeURIComponent("Custom corrugated packaging enquiry")}&body=${encodeURIComponent("Hello Box Theory,\n\nI would like to discuss corrugated packaging for my product.\n\nProduct:\nDimensions (length × width × height):\nEstimated quantity:\nPrint requirements:\nDelivery location:\n\nThank you.")}`;

  return (
    <section id="corrugated-packaging" className={styles.section} aria-labelledby="industries-directory-title">
      <div className={styles.container}>
        <div className={styles.layout}>
          <motion.div
            data-reveal
            className={styles.copy}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: reduceMotion ? 0 : 0.8, ease: EASE }}
          >
            <p className={styles.eyebrow}><span aria-hidden="true" /> CUSTOM CORRUGATED PACKAGING</p>
            <h2 id="industries-directory-title" className={styles.title}>Every kind<br /> of carton.<br /><span>Made for your budget.</span></h2>
            <p className={styles.lead}>Custom corrugated boxes and cartons, with the right dimensions, strength and finish for your business.</p>
            <p className={styles.supporting}>From sourcing to manufacturing coordination, we bring your requirements and the right production partners together.</p>
            <div className={styles.considerations} role="group" aria-label="Explore your carton options">
              {CONSIDERATIONS.map((item, index) => <button key={item.id} type="button" className={styles.consideration} onClick={() => setActive(index)} aria-pressed={index === active} aria-controls="carton-detail">
                <span className={styles.optionIcon}><LineIcon path={item.icon} /></span><span><strong>{item.title}</strong><small>{item.body}</small></span><span className={styles.optionArrow}><Arrow /></span>
              </button>)}
            </div>
            <div className={styles.actions}><a href={quoteHref} className={styles.primaryCta}>Request a packaging quote<Arrow /></a><span>Let’s start with what you need.</span></div>
          </motion.div>

          <motion.div
            data-reveal
            className={styles.showcase}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: reduceMotion ? 0 : 0.95, delay: reduceMotion ? 0 : 0.12, ease: EASE }}
          >
            <div className={styles.board} data-consideration={selected.id}>
              <div className={styles.boardTop}><span>BOX THEORY / PACKAGING STUDIO</span><span>0{active + 1} <span>/ 03</span></span></div>
              <span className={styles.boardGrid} aria-hidden="true" />
              <span className={styles.orbit} aria-hidden="true" />
              <div className={styles.dimensionTop} aria-hidden="true"><span />YOUR DIMENSIONS<span /></div>
              <span className={styles.dimensionSide} aria-hidden="true">DESIGNED AROUND YOUR PRODUCT</span>
              <div className={styles.productStage}>
                <motion.div className={styles.product} animate={{ rotate: reduceMotion ? 0 : [-6, -2, 2][active], y: reduceMotion ? 0 : [0, -5, 0][active] }} transition={{ duration: reduceMotion ? 0 : 0.85, ease: EASE }}>
                  <Image src="/images/hero_section/box_png.png" alt="Custom kraft corrugated shipping carton with Box Theory branding" fill sizes="(max-width: 900px) 90vw, 50vw" className={styles.productImage} />
                </motion.div>
              </div>
              <div className={styles.materialLabel} aria-hidden="true"><svg viewBox="0 0 80 30" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M2 5h76M2 25h76M2 15C8-1 12-1 18 15s10 16 16 0S44-1 50 15s10 16 16 0 10-16 12 0" /></svg><span>CORRUGATED.<br />CONSIDERED.</span></div>
              <div className={styles.annotation} aria-hidden="true"><span /><span>{selected.annotation}</span></div>
            </div>
            <div className={styles.mobileOptions} role="group" aria-label="Explore your carton options">
              {CONSIDERATIONS.map((item, index) => <button key={item.id} type="button" className={styles.mobileOption} onClick={() => setActive(index)} aria-pressed={index === active} aria-controls="carton-detail"><LineIcon path={item.icon} /><span>{["Fit", "Strength", "Brand"][index]}</span></button>)}
            </div>
            <div className={styles.detail} id="carton-detail" aria-live="polite" aria-atomic="true">
              <motion.div key={selected.id} initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}>
                <span className={styles.detailEyebrow}>THOUGHT THROUGH, INSIDE & OUT</span>
                <h3>{selected.note}</h3>
                <p>{selected.detail}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className={styles.useCases}>
          {USE_CASES.map((item, index) => <motion.div key={item.title} data-reveal className={styles.useCase} initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : index * 0.1, ease: EASE }}><LineIcon path={item.icon} /><div><h3>{item.title}</h3><p>{item.body}</p></div></motion.div>)}
        </div>
      </div>
    </section>
  );
}
