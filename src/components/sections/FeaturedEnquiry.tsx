"use client";

import { startTransition, useActionState, useEffect, useId, useRef, useState } from "react";
import type { ChangeEvent, DragEvent, FormEvent, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SITE } from "@/lib/content";
import { submitProductEnquiryAction, type ProductEnquiryState } from "@/app/(public)/product-enquiry-actions";
import styles from "./FeaturedEnquiry.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;
const MAX_PDF_BYTES = 5 * 1024 * 1024;

const STEPS = [
  ["Tell us about your product", "What you make and what you need it to do."],
  ["We talk it through", "We go over your requirements with you."],
  ["You get a clear next step", "The right format, then samples and production."],
] as const;

// A rejected server-action call (offline, dropped connection) would otherwise throw into the page's error
// boundary and replace the whole page; surface it as an inline message instead.
async function submitSafely(previous: ProductEnquiryState, data: FormData): Promise<ProductEnquiryState> {
  try {
    return await submitProductEnquiryAction(previous, data);
  } catch {
    return { message: `We couldn't reach the server. Please check your connection and try again, or call us on ${SITE.phone}.` };
  }
}

const formatSize = (bytes: number) => (bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`);

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

function FieldError({ id, messages }: { id: string; messages?: string[] }) {
  if (!messages?.length) return null;
  return <p className={styles.error} id={id}><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><circle cx="10" cy="10" r="7.5" /><path d="M10 6v4.5M10 13.4v.1" /></svg>{messages[0]}</p>;
}

function Field({ id, label, required, optional, error, children }: { id: string; label: string; required?: boolean; optional?: boolean; error?: string[]; children: ReactNode }) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required && <span className={styles.req} aria-hidden="true"> *</span>}
        {optional && <span className={styles.opt}> (optional)</span>}
      </label>
      {children}
      <FieldError id={`${id}-error`} messages={error} />
    </div>
  );
}

export function FeaturedEnquiry() {
  const reduceMotion = useReducedMotion();
  const uid = useId();
  const [state, formAction, pending] = useActionState<ProductEnquiryState, FormData>(submitSafely, undefined);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const fileInput = useRef<HTMLInputElement>(null);
  const successPanel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state?.success) successPanel.current?.focus();
  }, [state?.success]);

  const id = (name: string) => `${uid}-${name}`;
  const errors = state?.errors;
  const describe = (name: string, hasError?: string[]) => (hasError?.length ? `${id(name)}-error` : undefined);
  const pdfError = fileError ? [fileError] : errors?.referenceFile;

  function clearFile() {
    if (fileInput.current) fileInput.current.value = "";
    setFile(null);
  }

  function acceptFile(next: File | undefined) {
    if (!next) return clearFile();
    if (next.type !== "application/pdf" && !next.name.toLowerCase().endsWith(".pdf")) {
      clearFile();
      return setFileError("Please attach a PDF file.");
    }
    if (next.size > MAX_PDF_BYTES) {
      clearFile();
      return setFileError(`That PDF is ${formatSize(next.size)}. Please keep it under 5 MB.`);
    }
    setFileError(null);
    setFile(next);
    if (fileInput.current && fileInput.current.files?.[0] !== next) {
      const transfer = new DataTransfer();
      transfer.items.add(next);
      fileInput.current.files = transfer.files;
    }
  }

  function onPick(event: ChangeEvent<HTMLInputElement>) {
    acceptFile(event.target.files?.[0]);
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    acceptFile(event.dataTransfer.files[0]);
  }

  // Dispatched manually (rather than <form action>) so React doesn't reset the form: after a failed
  // submit the visitor keeps everything they typed and the attached PDF.
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const data = new FormData(event.currentTarget);
    startTransition(() => formAction(data));
  }

  const rise = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reduceMotion ? 0 : 0.95, ease: EASE },
  } as const;

  return (
    <motion.section id="product-enquiry" data-reveal className={styles.wrap} aria-labelledby={id("title")} {...rise}>
      <div className={styles.intro}>
        <svg className={styles.boxArt} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth=".6" aria-hidden="true"><path d="m20 5 14 8v15l-14 8-14-8V13L20 5Z" /><path d="m6 13 14 8 14-8M20 21v15M13 9l14 8" /></svg>
        <p className={styles.eyebrow}><span aria-hidden="true" /> START A CONVERSATION</p>
        <h3 className={styles.title} id={id("title")}>Not sure which format fits? <span>Tell us what you make.</span></h3>
        <p className={styles.lede}>Share a few details, or attach your brief as a PDF. We&rsquo;ll read it and come back to you personally.</p>

        <ol className={styles.steps}>
          {STEPS.map(([title, body], index) => (
            <li key={title}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><strong>{title}</strong><p>{body}</p></div></li>
          ))}
        </ol>

        <div className={styles.direct}>
          <span>PREFER TO TALK?</span>
          <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>
      </div>

      <div className={styles.formSide}>
        {state?.success ? (
          <div className={styles.success} role="status" tabIndex={-1} ref={successPanel}>
            <span className={styles.check} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m5.5 12.5 4.2 4.2 8.8-9.4" /></svg></span>
            <h4>Thank you, {state.name?.split(" ")[0]}.</h4>
            <p>We&rsquo;ve received your enquiry and will get back to you on the number you shared.</p>
            <a href={`tel:${SITE.phoneHref}`}>Need us sooner? Call {SITE.phone}</a>
          </div>
        ) : (
          <form onSubmit={onSubmit} aria-labelledby={id("title")}>
            <div className={styles.formTop}><span>YOUR DETAILS</span><span><b aria-hidden="true">*</b> Required</span></div>

            <div className={styles.fields}>
              <Field id={id("name")} label="Your name" required error={errors?.name}>
                <input id={id("name")} name="name" type="text" autoComplete="name" required maxLength={120} placeholder="Full name" aria-describedby={describe("name", errors?.name)} aria-invalid={errors?.name ? true : undefined} />
              </Field>

              <div className={styles.pair}>
                <Field id={id("phone")} label="Mobile number" required error={errors?.phone}>
                  <input id={id("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" required maxLength={20} pattern="[0-9+\s\(\)\-]{7,20}" title="Digits only, optionally with + and spaces" placeholder="+91 98765 43210" aria-describedby={describe("phone", errors?.phone)} aria-invalid={errors?.phone ? true : undefined} />
                </Field>
                <Field id={id("email")} label="Email" optional error={errors?.email}>
                  <input id={id("email")} name="email" type="email" autoComplete="email" maxLength={254} placeholder="you@company.com" aria-describedby={describe("email", errors?.email)} aria-invalid={errors?.email ? true : undefined} />
                </Field>
              </div>

              <Field id={id("message")} label="What are you packaging?" required error={errors?.message}>
                <textarea id={id("message")} name="message" required rows={4} maxLength={2000} placeholder="Your product, the kind of packaging you have in mind, estimated quantity, anything that helps." onChange={event => setMessageLength(event.target.value.length)} aria-describedby={describe("message", errors?.message)} aria-invalid={errors?.message ? true : undefined} />
                {messageLength > 1500 && <span className={styles.count} aria-hidden="true">{messageLength} / 2000</span>}
              </Field>

              <div className={styles.field}>
                <span className={styles.label} id={id("file-label")}>Attach a brief <span className={styles.opt}>(PDF, optional)</span></span>
                <input ref={fileInput} id={id("file")} className={styles.fileInput} name="referenceFile" type="file" accept="application/pdf,.pdf" tabIndex={file ? -1 : 0} onChange={onPick} aria-labelledby={id("file-label")} aria-describedby={describe("file", pdfError)} />
                {file ? (
                  <div className={styles.chip}>
                    <span className={styles.pdfBadge} aria-hidden="true">PDF</span>
                    <span className={styles.chipName}><strong title={file.name}>{file.name}</strong><span>{formatSize(file.size)}</span></span>
                    <button type="button" onClick={() => { clearFile(); setFileError(null); }} aria-label={`Remove ${file.name}`}>
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="m5.5 5.5 9 9M14.5 5.5l-9 9" /></svg>
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor={id("file")}
                    className={`${styles.drop} ${dragging ? styles.dragging : ""}`}
                    onDragOver={event => { event.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={onDrop}
                  >
                    <span className={styles.dropIcon} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15.5V4.5M7.5 9 12 4.5 16.5 9M4.5 15v3.2c0 .7.6 1.3 1.3 1.3h12.4c.7 0 1.3-.6 1.3-1.3V15" /></svg></span>
                    <span className={styles.dropText}><strong>Drop your PDF here or <u>browse</u></strong><span>Specs, dimensions or artwork · up to 5 MB</span></span>
                  </label>
                )}
                <FieldError id={id("file-error")} messages={pdfError} />
              </div>

              {/* Honeypot: hidden from visitors with CSS (not type="hidden") so form-filling bots still populate it. */}
              <div className={styles.trap} aria-hidden="true">
                <label htmlFor={id("website")}>Website</label>
                <input id={id("website")} name="website" tabIndex={-1} autoComplete="off" />
              </div>
            </div>

            {state?.message && <p className={styles.alert} role="alert">{state.message}</p>}

            <div className={styles.actions}>
              <button className={styles.submit} type="submit" disabled={pending}>
                {pending ? <><span className={styles.spinner} aria-hidden="true" />Sending&hellip;</> : <>Send my enquiry <Arrow /></>}
              </button>
              <p>We&rsquo;ll use your number to get back to you about this enquiry.</p>
            </div>
          </form>
        )}
      </div>
    </motion.section>
  );
}
