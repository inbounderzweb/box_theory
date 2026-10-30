"use client";

import { useEffect, useState } from "react";

const DESKTOP_SRC = "/videos/9169674-uhd_4096_2160_25fps.mp4";
const MOBILE_SRC = "/videos/9169681-uhd_2160_4096_25fps.mp4";

/** Autoplaying hero video replacing the hero image (hidden by CSS unless reduced motion is on); only the video for the current screen size loads. */
export function HeroVideo({}: object) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const small = window.matchMedia("(max-width: 767px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSrc(reduce.matches ? null : small.matches ? MOBILE_SRC : DESKTOP_SRC);
    update();
    small.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => { small.removeEventListener("change", update); reduce.removeEventListener("change", update); };
  }, []);

  if (!src) return null;
  return <video key={src} className="roofer-hero-video" src={src} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />;
}
