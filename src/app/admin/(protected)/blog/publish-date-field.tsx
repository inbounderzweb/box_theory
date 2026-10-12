"use client";

import { useState, useSyncExternalStore } from "react";

const subscribeNoop = () => () => {};

/** `YYYY-MM-DDTHH:mm` in the browser's own timezone, as datetime-local expects. */
function toLocalInputValue(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function toIso(local: string): string {
  const date = new Date(local);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

/**
 * The editor picks a date in their own timezone; the form submits it as a
 * UTC ISO string so the server never has to guess which zone was meant.
 * The visible input only renders after hydration because the server cannot
 * know the browser's timezone.
 */
export function PublishDateField({
  name,
  defaultValue,
  error,
}: {
  name: string;
  /** ISO string, or empty for "not set". */
  defaultValue?: string;
  error?: string[];
}) {
  const hydrated = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const [local, setLocal] = useState<string | null>(null);

  const visible = local ?? (hydrated && defaultValue ? toLocalInputValue(defaultValue) : "");
  const submitted = local === null ? (defaultValue ?? "") : toIso(local);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={`${name}-input`} className="text-sm font-medium">
        Publication date
      </label>
      <input type="hidden" name={name} value={submitted} />
      <div className="flex gap-2">
        <input
          id={`${name}-input`}
          type="datetime-local"
          value={visible}
          disabled={!hydrated}
          onChange={(event) => setLocal(event.target.value)}
          className="min-w-0 flex-1 rounded border border-neutral-300 px-3 py-2"
        />
        {/* A saved date is kept when the field is emptied, so only offer
            clearing before one exists. */}
        {visible && !defaultValue && (
          <button
            type="button"
            onClick={() => setLocal("")}
            className="rounded border border-neutral-300 px-3 text-sm hover:bg-neutral-50"
          >
            Clear
          </button>
        )}
      </div>
      <p className="text-xs text-neutral-500">
        {defaultValue
          ? "Change to backdate or reschedule. A future date hides the post until then."
          : "Leave empty to use the moment it is published. A future date schedules the post."}
      </p>
      {error && <p className="text-sm text-red-600">{error[0]}</p>}
    </div>
  );
}
