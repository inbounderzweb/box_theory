"use client";

import type { FormEvent } from "react";
import { SITE } from "@/lib/content";
import styles from "./ProjectEnquiry.module.css";

const FAQS = [
  ["What packaging services do you offer?", "We support packaging consultancy, structural and print design, sourcing, manufacturing coordination, and end-to-end project execution. We tailor the scope to your product, budget, and volumes."],
  ["Can you help with a new product launch?", "Yes. We can help develop your packaging from the initial brief through material selection, prototypes, sampling, and production coordination."],
  ["Is there a minimum order quantity?", "Minimum quantities depend on the material, structure, finishes, and manufacturing partner. Share your estimated quantity and we’ll help identify suitable options."],
  ["Do you work with businesses outside India?", "Box Theory serves brands in India, the GCC, and international markets. Contact us to discuss your destination and project requirements."],
  ["How do I get a quote?", "Send us your product details, dimensions, estimated quantity, and any design references. We’ll discuss the requirements with you before recommending the next steps."],
] as const;

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg>;
}

export function LandingFAQ() {
  return (
    <section className={styles.faq} aria-labelledby="faq-title">
      <div className={`${styles.container} ${styles.faqLayout}`}>
        <div className={styles.faqIntro}>
          <p className={styles.eyebrow}>A LITTLE MORE CLARITY</p>
          <h2 className={styles.faqTitle} id="faq-title">Good questions.<br /><span>Straight answers.</span></h2>
          <p className={styles.faqDescription}>Every packaging project is different. Here are a few things to know before we get started.</p>
          <a className={styles.textLink} href={`mailto:${SITE.email}`}>Ask us something else <Arrow /></a>
        </div>
        <div className={styles.questions}>
          {FAQS.map(([question, answer], index) => (
            <details className={styles.question} key={question} name="packaging-faq" open={index === 0}>
              <summary>
                <span className={styles.questionNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span>{question}</span>
                <span className={styles.toggle} aria-hidden="true" />
              </summary>
              <div className={styles.answer}><p>{answer}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectEnquiry() {
  function prepareEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const product = String(fields.get("product") ?? "").trim();

    if (!product) {
      const input = form.elements.namedItem("product") as HTMLInputElement;
      input.setCustomValidity("Tell us what product you’re packaging.");
      input.reportValidity();
      return;
    }

    const packaging = String(fields.get("packaging") ?? "Not sure yet");
    const quantity = String(fields.get("quantity") ?? "").trim() || "To be discussed";
    const subject = `Packaging enquiry — ${product}`;
    const body = `Hello Box Theory,\n\nI’d like to discuss a packaging project.\n\nProduct: ${product}\nPackaging type: ${packaging}\nEstimated quantity: ${quantity}\n\nDimensions (if known):\nDelivery location:\nAnything else you should know:\n\nThank you.`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section className={styles.enquiry} id="enquire" aria-labelledby="enquiry-title">
      <div className={`${styles.container} ${styles.enquiryLayout}`}>
        <div className={styles.enquiryIntro}>
          <p className={styles.eyebrow}>LET’S MAKE IT HAPPEN</p>
          <h2 className={styles.enquiryTitle} id="enquiry-title">Good packaging starts with <span>a conversation.</span></h2>
          <p className={styles.enquiryDescription}>A new idea, a growing brand, or a box that could work harder. Tell us what you have in mind.</p>
          <div className={styles.contactLinks}>
            <div><span>WRITE TO US</span><a href={`mailto:${SITE.email}`}>{SITE.email} <Arrow /></a></div>
            <div><span>GIVE US A CALL</span><a href={`tel:${SITE.phoneHref}`}>{SITE.phone} <Arrow /></a></div>
          </div>
        </div>

        <form className={styles.brief} action={`mailto:${SITE.email}`} onSubmit={prepareEnquiry} aria-labelledby="brief-title">
          <div className={styles.briefTop}>
            <span className={styles.briefLabel}>YOUR NEXT PROJECT</span>
            <svg className={styles.boxMark} viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true"><path d="m18 4 13 7.5v13L18 32 5 24.5v-13L18 4Z" /><path d="m5 11.5 13 7.6 13-7.6M18 19v13M11.5 7.7l13 7.6" /></svg>
          </div>
          <h3 className={styles.briefTitle} id="brief-title">What are you packaging?</h3>
          <p className={styles.briefDescription}>A few details are all we need to get started.</p>

          <div className={styles.fields}>
            <div className={styles.field}>
              <label htmlFor="brief-product">Your product <span>(required)</span></label>
              <input id="brief-product" name="product" type="text" placeholder="e.g. skincare products or specialty coffee" required maxLength={120} onInput={event => event.currentTarget.setCustomValidity("")} />
            </div>
            <div className={styles.fieldPair}>
              <div className={styles.field}>
                <label htmlFor="brief-packaging">Packaging type</label>
                <div className={styles.selectWrap}>
                  <select id="brief-packaging" name="packaging" defaultValue="Not sure yet">
                    <option>Not sure yet</option>
                    <option>Corrugated cartons</option>
                    <option>Ecommerce mailers</option>
                    <option>Retail & display boxes</option>
                    <option>Premium gift boxes</option>
                    <option>Something else</option>
                  </select>
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m5 7.5 5 5 5-5" /></svg>
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="brief-quantity">Quantity <span>(optional)</span></label>
                <input id="brief-quantity" name="quantity" type="number" inputMode="numeric" min="1" step="1" placeholder="e.g. 1,000" />
              </div>
            </div>
          </div>
          <button className={styles.submit} type="submit" aria-describedby="brief-email-note">Email my brief <Arrow /></button>
          <p className={styles.emailNote} id="brief-email-note">Opens your email app. Add more details before sending.</p>
        </form>
      </div>
    </section>
  );
}
