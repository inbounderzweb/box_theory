"use client";

import { useEffect } from "react";

/** Homepage scroll choreography: hero parallax progress (--hero-p) and AOS-style reveals for the sections below. */
export function ScrollEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const home = document.querySelector<HTMLElement>(".roofer-home");
    const hero = home?.querySelector<HTMLElement>(".roofer-hero");
    if (!home || !hero) return;

    // Hero: progress 0→1 across the first viewport of scrolling, drives zoom / fade in CSS.
    let raf = 0;
    const update = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / Math.max(1, hero.offsetHeight)));
      hero.style.setProperty("--hero-p", p.toFixed(4));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Reveals: container children (or grandchildren when the container wraps one block) fade and rise in once.
    const targets: HTMLElement[] = [];
    home.querySelectorAll<HTMLElement>(":scope section, :scope > div > section").forEach(section => {
      if (section === hero || section.classList.contains("roofer-marquee")) return;
      const container = section.firstElementChild as HTMLElement | null;
      if (!container) return;
      let items = Array.from(container.children) as HTMLElement[];
      if (items.length === 1 && items[0].children.length > 1) items = Array.from(items[0].children) as HTMLElement[];
      items.forEach((el, i) => { el.style.setProperty("--rv-delay", `${Math.min(i, 5) * 90}ms`); targets.push(el); });
    });

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("rv-in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    targets.forEach(el => { el.classList.add("rv"); io.observe(el); });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      targets.forEach(el => el.classList.remove("rv", "rv-in"));
    };
  }, []);

  return null;
}
