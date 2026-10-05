"use client";

import { useRef } from "react";
import { getImageProps } from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const LEAD = "Packaging is not just a box. It is the journey of your product from your warehouse to your customer.";
const BODY = "Box Theory combines packaging consultancy, manufacturing coordination, sourcing intelligence, and execution management to create packaging systems that protect products, strengthen brands, and support business growth.";
// Phrases picked out in champagne gold.
const HIGHLIGHTS = ["packaging consultancy", "manufacturing coordination", "sourcing intelligence", "execution management", "protect products", "strengthen brands", "support business growth"];

function highlight(text: string) {
  const pattern = new RegExp(`(${HIGHLIGHTS.join("|")})`, "gi");
  return text.split(pattern).map((part, i) =>
    i % 2 === 1 ? <mark key={i} className="bg-transparent text-champagne-gold">{part}</mark> : part,
  );
}

export function WhyChooseUs() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // 0 as the section enters at the bottom of the viewport, 1 as it leaves at the top.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  const common = { alt: "", fill: true, quality: 80, sizes: "100vw", loading: "eager" } as const;
  const { props: desktop } = getImageProps({ ...common, src: "/images/why-choose/desktop_background.png" });
  const { props: mobile } = getImageProps({ ...common, src: "/images/why-choose/mobile_background.png" });

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: reduceMotion ? 0.2 : 0.8, delay, ease: EASE },
  });

  return (
    // Fixed-background window: the image is pinned to the viewport and clip-path (which, unlike overflow,
    // also clips position:fixed children) shows it only inside this section. The picture stays still while the
    // section and its copy scroll past. Works on iOS, where background-attachment: fixed does not.
    <section
      ref={sectionRef}
      id="why-choose-us"
      aria-labelledby="why-choose-title"
      className="relative isolate flex min-h-svh items-center justify-center bg-cocoa-umber py-28 text-gold-lightest [clip-path:inset(0)] md:py-36"
    >
      <motion.div aria-hidden="true" style={reduceMotion ? undefined : { scale }} className="fixed inset-x-0 top-0 -z-20 h-lvh will-change-transform">
        <picture>
          <source media="(max-width: 767px)" srcSet={mobile.srcSet} />
          <source media="(min-width: 768px)" srcSet={desktop.srcSet} />
          <img {...desktop} alt="" className="h-full w-full object-cover object-center" />
        </picture>
      </motion.div>
      {/* Even tint, plus a deeper pool behind the copy so it stays legible over the bright window light. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-cocoa-umber/45" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_55%_at_center,rgb(74_56_49/0.55),transparent)]" />
      {/* Soft edges into the marquee above and the industries section below. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-cocoa-umber to-transparent md:h-32" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-[#322a24] to-transparent md:h-32" />

      <div className="mx-auto w-[calc(100%-40px)] max-w-[900px] text-center [text-shadow:0_1px_18px_rgb(74_56_49/0.45)] md:w-[calc(100%-96px)]">
        <motion.p {...rise(0)} className="mb-5 flex items-center justify-center gap-3 text-[11px] font-semibold tracking-[.16em] text-gold-soft">
          <span className="size-[7px] rounded-full bg-champagne-gold" /> WHY BOX THEORY
        </motion.p>
        <motion.h2 {...rise(0.1)} id="why-choose-title" className="font-display text-[clamp(38px,6vw,72px)] font-semibold leading-[1.06] tracking-[-.05em]">
          Why Choose Us
        </motion.h2>
        <motion.span
          aria-hidden="true"
          initial={{ scaleX: reduceMotion ? 1 : 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          className="mx-auto my-6 block h-px w-24 origin-center bg-champagne-gold md:my-8"
        />
        <motion.p {...rise(0.35)} className="text-[19px] font-medium leading-[1.6] md:text-[clamp(22px,2.4vw,32px)]">{LEAD}</motion.p>
        <motion.p {...rise(0.5)} className="mt-5 text-[16px] leading-[1.9] text-gold-lightest/90 md:text-[18px]">{highlight(BODY)}</motion.p>
      </div>
    </section>
  );
}
