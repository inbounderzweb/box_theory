"use client";

import { useRef } from "react";
import { getImageProps } from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { title } from "node:process";

const EASE = [0.22, 1, 0.36, 1] as const;

// const FEATURES = [
//   { title: "Innovative Child Safety", body: "Detects child height and weight to restrict lift operation." },
//   { title: "Automatic Rescue Device", body: "Moves the lift to the nearest floor and opens doors during power failure." },
//   { title: "Inbuilt Stabiliser", body: "Inbuilt stabiliser with automatic low-voltage adjustment up to 330 V." },
//   { title: "40% Power Saving", body: "Sleep mode with frequency converter, saving up to 40% power." },
//   { title: "Smooth, Level Stops", body: "High-accuracy levelling for smooth, jerk-free stops at every floor." },
//   { title: "Three levels of protection", body: "Safety circuit to prevent over-travel at the ends of the shaft." },
// ] as const;

const FEATURES = [
  { title:" Packaging Consultancy", body:"In-depth product briefings and competitor research to find the right packaging for your product."},
  { title:"Smart Sourcing.", body:"The right materials and manufacturing partners at the right cost."},
  { title:"End-to-End Execution with Prototyping", body:"From competitor research, design, and prototyping to manufacturing and delivery." },
  { title:"Product Protection",body:"Packaging tailored to your product's handling, transit, and storage needs."},
  { title:"Scalable Solutions", body:"Packaging that adapts as your business grows."},
  { title:"One-Point Coordination", body:"One partner managing your packaging, vendors, and production."}
]

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
      className="relative isolate flex min-h-svh items-center bg-cocoa-umber py-24 text-gold-lightest [clip-path:inset(0)] md:py-32"
    >
      <motion.div aria-hidden="true" style={reduceMotion ? undefined : { scale }} className="fixed inset-x-0 top-0 -z-20 h-lvh will-change-transform">
        <picture>
          <source media="(max-width: 767px)" srcSet={mobile.srcSet} />
          <source media="(min-width: 768px)" srcSet={desktop.srcSet} />
          <img {...desktop} alt="" className="h-full w-full object-cover object-center" />
        </picture>
      </motion.div>
      {/* Legibility: an even tint on narrow screens, and on wide ones a left-weighted fade that keeps the copy
          readable while the bright, box-filled right side of the photo stays visible. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[rgb(40_30_25/.6)] md:hidden" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 hidden bg-[linear-gradient(90deg,rgb(40_30_25/.74)_0%,rgb(40_30_25/.52)_52%,rgb(40_30_25/.1)_100%)] md:block" />
      {/* Soft edges into the marquee above and the industries section below. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-cocoa-umber to-transparent md:h-32" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-[#322a24] to-transparent md:h-32" />

      <div className="roofer-container relative">
        <div className="max-w-[940px] [text-shadow:0_1px_18px_rgb(40_30_25/.45)] xl:ml-[clamp(0px,6vw,140px)]">
          <motion.p {...rise(0)} className="mb-5 flex items-center gap-4 text-[12px] font-medium tracking-[.2em] text-[#d4b06c] md:mb-6">
            {/* WHY BOX THEORY */}
            WHAT'S INSIDE THE BOX THEORY 
            <span aria-hidden="true" className="h-px w-16 bg-[#d4b06c]/80 md:w-[72px]" />
          </motion.p>
          <motion.h2 {...rise(0.1)} id="why-choose-title" className="max-w-[780px] font-display text-[clamp(24px,3vw,42px)] font-semibold leading-[1.25] tracking-[-.02em]">
            Thinking Outside the <span className="text-[#d4b06c]">Box </span> 
          </motion.h2>
          <p>
                from product research to prototyping and delivery, we bring every packaging detail together.</p>

          <ul className="mt-9 grid gap-3.5 min-[640px]:grid-cols-2 lg:grid-cols-3 lg:gap-[18px] md:mt-11">
            {FEATURES.map((item, index) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 36, scale: reduceMotion ? 1 : 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: reduceMotion ? 0.2 : 0.75, delay: 0.3 + index * 0.08, ease: EASE }}
                className="group relative overflow-hidden rounded-[4px] border border-gold-lightest/30 bg-[linear-gradient(135deg,rgb(74_56_49/.62),rgb(74_56_49/.34))] p-5 shadow-[0_18px_40px_-26px_rgb(20_14_10/.7)] backdrop-blur-[6px] transition duration-500 hover:-translate-y-1 hover:border-[#d4b06c]/80 motion-reduce:transform-none lg:p-6"
              >
                <span aria-hidden="true" className="pointer-events-none absolute -right-1 -top-4 select-none font-display text-[84px] font-semibold leading-none text-[#d4b06c]/10 transition duration-500 group-hover:text-[#d4b06c]/20">
                  {index + 1}
                </span>
                <motion.span
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: reduceMotion ? 0.2 : 0.55, delay: 0.45 + (index % 3) * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
                  className="grid size-[40px] place-items-center rounded-full bg-[linear-gradient(145deg,#e6cb8a,#b98c45)] font-display text-[15px] font-semibold text-[#3b2b24] shadow-[0_6px_16px_-8px_rgb(20_14_10/.8)]"
                >
                  {index + 1}
                </motion.span>
                <h3 className="relative mt-4 font-display text-[18px] font-semibold leading-[1.22] tracking-[-.01em]">{item.title}</h3>
                <motion.span
                  aria-hidden="true"
                  initial={{ scaleX: reduceMotion ? 1 : 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: reduceMotion ? 0.2 : 0.7, delay: 0.6 + (index % 3) * 0.08, ease: EASE }}
                  className="mt-3 block h-px w-10 origin-left bg-[#d4b06c]/70"
                />
                <p className="relative mt-3 text-[13.5px] leading-[1.6] text-gold-lightest/80">{item.body}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
