"use client";

import { useRef, useState } from "react";
import { uploadFileWithProgress } from "@/lib/upload-with-progress";

type Slot = "desktopImage" | "mobileImage" | "desktopVideo" | "mobileVideo";
type Asset = { url: string; resourceType: "image" | "video" };
type Banner = Partial<Record<Slot, Asset>>;

const SLOTS: { slot: Slot; label: string; hint: string; kind: "image" | "video" }[] = [
  { slot: "desktopImage", label: "Desktop image", hint: "JPG, PNG, WEBP or AVIF — up to 5 MB. Shown ≥768px and behind the video.", kind: "image" },
  { slot: "mobileImage", label: "Mobile image", hint: "JPG, PNG, WEBP or AVIF — up to 5 MB. Shown <768px (falls back to the desktop image).", kind: "image" },
  { slot: "desktopVideo", label: "Desktop video", hint: "MP4 or WEBM — up to 65 MB. Autoplays muted on ≥768px.", kind: "video" },
  { slot: "mobileVideo", label: "Mobile video", hint: "MP4 or WEBM — up to 65 MB. Autoplays muted on <768px.", kind: "video" },
];

export function BannerForm({ initial, canEdit }: { initial: Banner; canEdit: boolean }) {
  const [banner, setBanner] = useState<Banner>(initial);
  const [files, setFiles] = useState<Partial<Record<Slot, File>>>({});
  const [removals, setRemovals] = useState<Slot[]>([]);
  const [progress, setProgress] = useState<number | null>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [previews, setPreviews] = useState<Partial<Record<Slot, string>>>({});
  const inputs = useRef<Partial<Record<Slot, HTMLInputElement | null>>>({});

  const dirty = Object.keys(files).length > 0 || removals.length > 0;

  function pick(slot: Slot, file: File | undefined) {
    if (!file) return;
    const limit = SLOTS.find((s) => s.slot === slot)!.kind === "image" ? 5 : 65;
    if (file.size > limit * 1024 * 1024) {
      setMessage({ ok: false, text: `${file.name} exceeds the ${limit} MB limit.` });
      if (inputs.current[slot]) inputs.current[slot]!.value = "";
      return;
    }
    setMessage(null);
    setFiles((prev) => ({ ...prev, [slot]: file }));
    setRemovals((prev) => prev.filter((s) => s !== slot));
    setPreviews((prev) => {
      if (prev[slot]) URL.revokeObjectURL(prev[slot]);
      return { ...prev, [slot]: URL.createObjectURL(file) };
    });
  }

  function clearPending(slot: Slot) {
    setFiles((prev) => {
      const next = { ...prev };
      delete next[slot];
      return next;
    });
    setPreviews((prev) => {
      if (prev[slot]) URL.revokeObjectURL(prev[slot]);
      const next = { ...prev };
      delete next[slot];
      return next;
    });
  }

  function markRemove(slot: Slot) {
    clearPending(slot);
    setRemovals((prev) => (prev.includes(slot) ? prev : [...prev, slot]));
  }

  async function save() {
    setMessage(null);
    const formData = new FormData();
    for (const [slot, file] of Object.entries(files)) formData.append(slot, file);
    for (const slot of removals) formData.append("remove", slot);

    setProgress(0);
    const result = await uploadFileWithProgress<Banner>("/api/admin/landing-banner", formData, setProgress, "PATCH");
    setProgress(null);

    if (!result.ok) {
      setMessage({ ok: false, text: result.error });
      return;
    }
    Object.values(previews).forEach((url) => url && URL.revokeObjectURL(url));
    setPreviews({});
    setFiles({});
    setRemovals([]);
    setBanner(result.data);
    for (const input of Object.values(inputs.current)) if (input) input.value = "";
    setMessage({ ok: true, text: "Landing banner updated." });
  }

  async function deleteAll() {
    if (!window.confirm("Delete all banner images and videos? They will also be permanently removed from Cloudinary.")) return;
    setMessage(null);
    setProgress(0);
    try {
      const res = await fetch("/api/admin/landing-banner", { method: "DELETE" });
      if (!res.ok) throw new Error();
      Object.values(previews).forEach((url) => url && URL.revokeObjectURL(url));
      setPreviews({});
      setFiles({});
      setRemovals([]);
      setBanner({});
      for (const input of Object.values(inputs.current)) if (input) input.value = "";
      setMessage({ ok: true, text: "All banner assets deleted." });
    } catch {
      setMessage({ ok: false, text: "Could not delete banner assets." });
    } finally {
      setProgress(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-5 md:grid-cols-2">
        {SLOTS.map(({ slot, label, hint, kind }) => {
          const pendingUrl = previews[slot];
          const removed = removals.includes(slot);
          const currentUrl = removed ? undefined : (pendingUrl ?? banner[slot]?.url);
          return (
            <div key={slot} className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-4">
              <div>
                <p className="text-sm font-medium text-neutral-800">{label}</p>
                <p className="text-xs text-neutral-500">{hint}</p>
              </div>

              <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-neutral-100">
                {currentUrl ? (
                  kind === "image" ? (
                    // eslint-disable-next-line @next/next/no-img-element -- admin-only preview
                    <img src={currentUrl} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <video src={currentUrl} className="h-full w-full object-cover" muted controls playsInline preload="metadata" />
                  )
                ) : (
                  <p className="px-4 text-center text-xs text-neutral-400">
                    {removed ? "Will be removed on save" : "Not set"}
                  </p>
                )}
              </div>

              {pendingUrl && <p className="text-xs text-amber-600">Unsaved: {files[slot]?.name}</p>}

              {canEdit && (
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    ref={(el) => {
                      inputs.current[slot] = el;
                    }}
                    type="file"
                    accept={kind === "image" ? "image/jpeg,image/png,image/webp,image/avif" : "video/mp4,video/webm"}
                    onChange={(event) => pick(slot, event.target.files?.[0])}
                    className="max-w-full text-xs text-neutral-600 file:mr-3 file:rounded-lg file:border file:border-neutral-300 file:bg-white file:px-3 file:py-1.5 file:text-sm file:font-medium hover:file:bg-neutral-50"
                  />
                  {pendingUrl ? (
                    <button type="button" onClick={() => clearPending(slot)} className="text-sm text-neutral-600 underline">
                      Discard
                    </button>
                  ) : banner[slot] && !removed ? (
                    <button type="button" onClick={() => markRemove(slot)} className="text-sm text-red-600 underline">
                      Remove
                    </button>
                  ) : removed ? (
                    <button type="button" onClick={() => setRemovals((p) => p.filter((s) => s !== slot))} className="text-sm text-neutral-600 underline">
                      Undo remove
                    </button>
                  ) : null}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {progress !== null && (
        <div className="flex flex-col gap-1">
          <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
            <div className="h-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-neutral-500">{progress < 100 ? `Uploading… ${progress}%` : "Processing…"}</p>
        </div>
      )}

      {message && (
        <p
          role={message.ok ? "status" : "alert"}
          className={`rounded-lg px-3 py-2 text-sm ${message.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}
        >
          {message.text}
        </p>
      )}

      {canEdit && (
        <button
          type="button"
          onClick={save}
          disabled={!dirty || progress !== null}
          className="w-fit rounded bg-neutral-900 px-4 py-2 text-white disabled:opacity-60"
        >
          {progress !== null ? "Saving…" : "Save Changes"}
        </button>
      )}
      {canEdit && Object.keys(banner).length > 0 && (
        <button type="button" onClick={deleteAll} disabled={progress !== null} className="w-fit text-sm text-red-600 underline disabled:opacity-60">
          Delete all banner assets
        </button>
      )}
    </div>
  );
}
