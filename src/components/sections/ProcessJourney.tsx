"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { type CSSProperties, type KeyboardEvent, useRef, useState } from "react";
import { PROCESS_STEPS } from "@/lib/content";
import styles from "./ProcessJourney.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;
// Centre of each stage in the original carton illustration.
const STAGE_X = [15.7, 30, 43.9, 58.2, 72.7, 87.3];
const DESCRIPTIONS = [
  "Understand your product, market, logistics and packaging requirements.",
  "Build a packaging strategy around cost, protection, presentation and scalability.",
  "Identify suitable materials, suppliers and manufacturing partners.",
  "Move from concept to prototypes, samples and production-ready packaging.",
  "Coordinate manufacturing, printing, quality control and delivery.",
  "Deliver packaging that is ready for your operation and your customer.",
];

function Arrow({ next = false }: { next?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={next ? "M5 12h14m-5-5 5 5-5 5" : "M6 18 18 6M6 6h12v12"} /></svg>;
}

export function ProcessJourney() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = PROCESS_STEPS[active];

  const selectStep = (index: number) => {
    setActive(index);
    tabs.current[index]?.focus({ preventScroll: true });
  };

  const navigateSteps = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = PROCESS_STEPS.length - 1;
    let next: number;
    switch (event.key) {
      case "ArrowRight": next = (index + 1) % PROCESS_STEPS.length; break;
      case "ArrowLeft": next = (index + last) % PROCESS_STEPS.length; break;
      case "Home": next = 0; break;
      case "End": next = last; break;
      default: return;
    }
    event.preventDefault();
    selectStep(next);
  };

  return (
    <section id="process" aria-labelledby="process-title" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          data-reveal
          className={styles.heading}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
        >
          <div>
            <p className={styles.eyebrow}><span aria-hidden="true" />OPERATING PROCESS</p>
            <h2 id="process-title" className={styles.title}>From Your First Idea to<br /><span>Your Next Milestone.</span></h2>
          </div>
          <div className={styles.intro}>
            <p>A streamlined process to bring your packaging vision to life.</p>
            <span className={styles.stepCount}><span>06</span> connected steps. One packaging partner.</span>
          </div>
        </motion.div>

        <motion.div
          data-reveal
          className={styles.journey}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: reduceMotion ? 0 : 0.85, delay: reduceMotion ? 0 : 0.1, ease: EASE }}
        >
          <div className={styles.artwork} style={{ "--stage-x": `${STAGE_X[active]}%` } as CSSProperties}>
            <span className={styles.stageGlow} aria-hidden="true" />
            <Image
              src="/images/process/process_desktop.webp"
              alt="Six packaging stages connected by a gold ribbon: planning, materials, sourcing, prototypes, production and delivery"
              width={2170}
              height={386}
              sizes="(max-width: 640px) 1000px, (max-width: 1200px) 90vw, 1120px"
              className={styles.illustration}
            />
            <span className={styles.artworkCaption} aria-hidden="true">{selected.step} / {String(PROCESS_STEPS.length).padStart(2, "0")}<span>{selected.title}</span></span>
          </div>

          <div className={styles.tabArea}>
            <div className={styles.rail} aria-hidden="true"><span style={{ width: `${(active / (PROCESS_STEPS.length - 1)) * 100}%` }} /></div>
            <div className={styles.tabs} role="tablist" aria-label="Packaging process stages">
              {PROCESS_STEPS.map((step, index) => (
                <button
                  key={step.id}
                  ref={node => { tabs.current[index] = node; }}
                  type="button"
                  role="tab"
                  id={`process-tab-${step.id}`}
                  aria-controls={`process-panel-${step.id}`}
                  aria-selected={active === index}
                  tabIndex={active === index ? 0 : -1}
                  onClick={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onKeyDown={event => navigateSteps(event, index)}
                  className={styles.tab}
                >
                  <span className={styles.stepNumber}>{step.step}</span>
                  <span className={styles.stepTitle}>{step.title}</span>
                  <span className={styles.stepDot} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.details}>
            {PROCESS_STEPS.map((step, index) => (
              <div key={step.id} role="tabpanel" id={`process-panel-${step.id}`} aria-labelledby={`process-tab-${step.id}`} hidden={active !== index} tabIndex={0} className={styles.panel}>
                {active === index && <motion.div key={step.id} className={styles.panelContent} initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.45, ease: EASE }}>
                  <span className={styles.panelNumber} aria-hidden="true">{step.step}</span>
                  <div className={styles.panelCopy}><h3>{step.title}</h3><p>{DESCRIPTIONS[index]}</p></div>
                  {index < PROCESS_STEPS.length - 1 ? <button type="button" onClick={() => selectStep(index + 1)} className={styles.nextStep}>Next step<Arrow next /></button> : <a href="#enquire" className={styles.nextStep}>Start your project<Arrow /></a>}
                </motion.div>}
              </div>
            ))}
          </div>
          <p className={styles.hint}><span aria-hidden="true">↳</span> Select a step to explore the journey.</p>
        </motion.div>
      </div>
    </section>
  );
}
