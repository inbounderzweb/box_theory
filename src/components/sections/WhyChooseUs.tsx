"use client";

import { useRef } from "react";
import Link from "next/link";
import { getImageProps } from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const LEAD = ["Packaging is not just a box. It is the journey of your product", "from your warehouse to your customer."] as const;

// Line-icon paths on a 24x24 grid, drawn with a 1.6 stroke.
const ICONS = {
  people: "M9 11a2.6 2.6 0 1 0 0-5.2A2.6 2.6 0 0 0 9 11Zm-5.5 8c0-3.1 2.4-5.2 5.5-5.2s5.5 2.1 5.5 5.2M17 10.2a2.2 2.2 0 1 0 0-4.4M17.2 13.9c2.1.3 3.5 2 3.5 4.4",
  cube: "m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 9 8-4.5M12 12v9M12 12 4 7.5",
  gear: "M12.2 2h-.4a2 2 0 0 0-2 2v.2a2 2 0 0 1-1 1.7l-.4.3a2 2 0 0 1-2 0l-.2-.1a2 2 0 0 0-2.7.7l-.2.4a2 2 0 0 0 .7 2.7l.2.1a2 2 0 0 1 1 1.7v.5a2 2 0 0 1-1 1.7l-.2.1a2 2 0 0 0-.7 2.7l.2.4a2 2 0 0 0 2.7.7l.2-.1a2 2 0 0 1 2 0l.4.3a2 2 0 0 1 1 1.7v.2a2 2 0 0 0 2 2h.4a2 2 0 0 0 2-2v-.2a2 2 0 0 1 1-1.7l.4-.3a2 2 0 0 1 2 0l.2.1a2 2 0 0 0 2.7-.7l.2-.4a2 2 0 0 0-.7-2.7l-.2-.1a2 2 0 0 1-1-1.7v-.5a2 2 0 0 1 1-1.7l.2-.1a2 2 0 0 0 .7-2.7l-.2-.4a2 2 0 0 0-2.7-.7l-.2.1a2 2 0 0 1-2 0l-.4-.3a2 2 0 0 1-1-1.7V4a2 2 0 0 0-2-2ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  shield: "M12 3 5 6v5.5c0 4.3 2.8 7.6 7 9.5 4.2-1.9 7-5.2 7-9.5V6l-7-3Zm-3 9 2.2 2.2L15.5 10",
  chart: "M4 20.5h16M6.5 20v-5.5M11 20v-8.5M15.5 20V8M20 20V4.5",
  network: "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM5.5 7.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm13 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm-13 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm13 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7 7l3.4 3.4M17 7l-3.4 3.4M7 17l3.4-3.4M17 17l-3.4-3.4",
} as const;

// Titles are split in two so the three-column layout can break them onto separate lines.
const CARDS = [
  { title: ["Packaging", "Consultancy"], body: "Strategic packaging solutions built around your product and business needs.", href: "/services/packaging-consultancy", icon: "people" },
  { title: ["Smart", "Sourcing"], body: "Reliable vendor coordination and cost-efficient material sourcing.", href: "/services/packaging-sourcing", icon: "cube" },
  { title: ["End-to-End", "Execution"], body: "From concept and development to production and delivery.", href: "/services/manufacturing-coordination", icon: "gear" },
  { title: ["Product", "Protection"], body: "Packaging designed to withstand handling, transit and fulfillment.", href: "/services/design-development", icon: "shield" },
  { title: ["Scalable", "Solutions"], body: "Systems that can grow with your business.", href: "/services/b2b-packaging", icon: "chart" },
  { title: ["One-Point", "Coordination"], body: "A single partner managing your packaging requirements.", href: "/services", icon: "network" },
] as const satisfies readonly { title: readonly [string, string]; body: string; href: string; icon: keyof typeof ICONS }[];

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
            WHY BOX THEORY <span aria-hidden="true" className="h-px w-16 bg-[#d4b06c]/80 md:w-[72px]" />
          </motion.p>
          <motion.h2 {...rise(0.1)} id="why-choose-title" className="font-display text-[clamp(34px,5vw,64px)] font-semibold leading-[1.04] tracking-[-.035em]">
            <span className="text-[#d4b06c]">Packaging</span> intelligence <br className="max-sm:hidden" />that moves your <br className="max-sm:hidden" />business forward.
          </motion.h2>
          <motion.p {...rise(0.25)} className="mt-6 max-w-[34em] text-[clamp(16px,1.4vw,20px)] leading-[1.55] text-gold-lightest/90 md:mt-7">{LEAD[0]} <br className="max-sm:hidden" />{LEAD[1]}</motion.p>

          <ul className="mt-9 grid gap-3.5 min-[640px]:grid-cols-2 lg:grid-cols-3 lg:gap-[18px] md:mt-11">
            {CARDS.map((card, index) => (
              <motion.li key={card.title.join(" ")} {...rise(0.35 + index * 0.07)}>
                <Link
                  href={card.href}
                  className="group relative flex h-full gap-4 rounded-[4px] border border-gold-lightest/35 bg-[linear-gradient(135deg,rgb(74_56_49/.62),rgb(74_56_49/.36))] p-4 shadow-[0_18px_40px_-26px_rgb(20_14_10/.7)] backdrop-blur-[6px] transition duration-500 hover:-translate-y-1 hover:border-[#d4b06c]/80 hover:bg-[linear-gradient(135deg,rgb(74_56_49/.74),rgb(74_56_49/.5))] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4b06c] motion-reduce:transform-none min-[640px]:p-5"
                >
                  <span aria-hidden="true" className="grid size-[46px] shrink-0 place-items-center rounded-full bg-[linear-gradient(145deg,#e6cb8a,#b98c45)] text-[#3b2b24] shadow-[0_6px_16px_-8px_rgb(20_14_10/.8)] lg:size-[52px]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-6 lg:size-[26px]">
                      <path d={ICONS[card.icon]} />
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1">
                    <h3 className="pr-7 font-display text-[18px] font-semibold leading-[1.22] tracking-[-.01em]">
                      <span>{card.title[0]}</span> <span className="lg:block">{card.title[1]}</span>
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.55] text-gold-lightest/80">{card.body}</p>
                  </span>
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="absolute right-4 top-4 size-5 text-gold-lightest/85 transition duration-500 group-hover:translate-x-1 group-hover:text-[#d4b06c] motion-reduce:transform-none">
                    <path d="M4 12h15M13.5 6 19.5 12l-6 6" />
                  </svg>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
