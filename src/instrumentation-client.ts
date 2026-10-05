/**
 * Dev-only workaround for: "Failed to execute 'measure' on 'Performance': '<Component>' cannot have a
 * negative time stamp."
 *
 * In development, React 19.2 records server-component timings with `performance.measure`. The start time is the
 * server's render timestamp minus the browser's `performance.timeOrigin`, which goes negative whenever the RSC
 * payload was produced before this page's time origin (HMR refreshes, restored/prefetched payloads, clock skew).
 * Chrome then throws. The same code is in Next 16.3.8 and the 16.4 canary, so there is nothing to upgrade to yet.
 *
 * Clamping to 0 keeps the timing entry and avoids the throw. `NODE_ENV` is inlined at build time, so none of this
 * ships in production. Delete this file once Next bundles a React that guards the value.
 */
if (process.env.NODE_ENV !== "production" && typeof performance !== "undefined" && typeof performance.measure === "function") {
  const nativeMeasure = performance.measure.bind(performance);
  const clamp = (value: string | number | undefined) => (typeof value === "number" && value < 0 ? 0 : value);

  performance.measure = ((name: string, startOrOptions?: string | PerformanceMeasureOptions, endMark?: string) => {
    if (startOrOptions && typeof startOrOptions === "object") {
      return nativeMeasure(name, { ...startOrOptions, start: clamp(startOrOptions.start), end: clamp(startOrOptions.end) });
    }
    return nativeMeasure(name, startOrOptions, endMark);
  }) as typeof performance.measure;
}

export {};
