"use client";

import { useActionState } from "react";
import { submitEnquiryAction, type ContactFormState } from "./actions";
import { CONTACT_PAGE } from "@/lib/content";

const initialState: ContactFormState = undefined;

const FIELD =
  "h-[52px] w-full border border-line bg-white px-4 text-[15px] text-espresso placeholder:text-muted/70 focus:border-champagne focus:outline-none";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitEnquiryAction, initialState);
  const { form } = CONTACT_PAGE;

  if (state?.success) {
    return (
      <div className="border border-champagne/40 bg-sand/40 p-8">
        <p className="display-subheading text-[19px] text-espresso">Thanks for reaching out.</p>
        <p className="mt-2 text-[15px] leading-[24px] text-muted">
          We&apos;ve received your enquiry and will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label={form.name} name="name" error={state?.errors?.name} required />
        <Field label={form.company} name="company" error={state?.errors?.company} />
        <Field label={form.email} name="email" type="email" error={state?.errors?.email} required />
        <Field label={form.phone} name="phone" type="tel" error={state?.errors?.phone} />
        <Field label={form.packagingRequirement} name="packagingRequirement" error={state?.errors?.packagingRequirement} />
        <Field label={form.estimatedQuantity} name="estimatedQuantity" error={state?.errors?.estimatedQuantity} />
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-[13px] font-medium text-espresso">{form.message}</span>
        <textarea
          name="message"
          rows={5}
          required
          className={`${FIELD} resize-none py-3`}
        />
        {state?.errors?.message && <p className="text-[13px] text-red-700">{state.errors.message[0]}</p>}
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[13px] font-medium text-espresso">{form.referenceFile}</span>
        <input
          type="file"
          name="referenceFile"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          className="text-[14px] text-muted file:mr-4 file:h-10 file:border file:border-line file:bg-white file:px-4 file:text-[13px] file:font-medium file:text-espresso"
        />
        <span className="text-[12px] text-muted/70">JPG, PNG, WEBP, or PDF — up to 5 MB.</span>
      </label>

      {/* Honeypot: hidden from real visitors via CSS, not `type="hidden"`,
          so form-filling bots that skip hidden inputs still populate it. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {state?.message && (
        <p role="alert" className="border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 h-[52px] w-fit bg-espresso px-8 text-[15px] font-medium text-ivory transition-colors hover:bg-espresso-light disabled:opacity-60"
      >
        {pending ? "Sending…" : form.submit}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string[];
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[13px] font-medium text-espresso">{label}</span>
      <input id={name} name={name} type={type} required={required} className={FIELD} />
      {error && <p className="text-[13px] text-red-700">{error[0]}</p>}
    </label>
  );
}
