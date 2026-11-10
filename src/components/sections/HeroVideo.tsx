"use client";

import { useEffect, useState } from "react";

/** Autoplaying hero video replacing the hero image (hidden by CSS unless reduced motion is on); only the video for the current screen size loads. */
export function HeroVideo({ desktopSrc, mobileSrc }: { desktopSrc?: string; mobileSrc?: string }) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const small = window.matchMedia("(max-width: 767px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSrc(reduce.matches ? null : (small.matches ? mobileSrc : desktopSrc) ?? null);
    update();
    small.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => { small.removeEventListener("change", update); reduce.removeEventListener("change", update); };
  }, [desktopSrc, mobileSrc]);

  if (!src) return null;
  return <video key={src} className="roofer-hero-video" src={src} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />;
}
