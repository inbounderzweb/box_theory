import type { Metadata } from "next";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { CountUp } from "@/components/common/CountUp";
import { ABOUT_PAGE, INDUSTRIES, PROCESS_STEPS } from "@/lib/content";

export const metadata: Metadata = { title: "About" };

const FEATURES = [
  { label: "Strategic Consultancy", path: "M12 3 4 6v6c0 4.5 3.2 7.6 8 9 4.8-1.4 8-4.5 8-9V6l-8-3Zm-3.5 9 2.5 2.5 4.5-5" },
  { label: "Sourcing Expertise", path: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm5 12 5 5" },
  { label: "Custom Solutions", path: "m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 9 8-4.5M12 12v9M12 12 4 7.5" },
  { label: "Execution Partners", path: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-6 9c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11a2.5 2.5 0 1 0 0-5M21 19c0-2.4-1.5-4.4-3.6-5.2" },
] as const;

const QUALITY_POINTS = [
  { label: "Affordable Custom Packaging", path: "m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 9 8-4.5M12 12v9M12 12 4 7.5" },
  { label: "Short Lead-Time Delivery", path: "M3 7h11v9H3V7Zm11 3h4l3 3v3h-7M7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" },
] as const;

const STATS = [
  { value: INDUSTRIES.length, suffix: "", label: "Industries Served" },
  { value: PROCESS_STEPS.length, suffix: "", label: "Step Process" },
  { value: 3, suffix: "", label: "Markets: India, GCC, Global" },
] as const;

const STACK = [
  { src: "/images/industries/export-businesses.jpg", alt: "Containers at a shipping port", box: "left-0 top-[14%] h-[58%] w-[34%]", z: 1 },
  { src: "/images/industries/fmcg.jpg", alt: "Packaged goods on retail shelves", box: "left-[10%] top-[6%] h-[72%] w-[46%]", z: 2 },
  { src: "/images/industries/retail-ecommerce.jpg", alt: "Corrugated shipping carton with a label", box: "left-[24%] top-[18%] h-[78%] w-[76%]", z: 3 },
] as const;

// Dieline palette, drawn from the site's gold / cocoa tokens.
const TAB = "#b99a60";
const PANEL = "#ded2bc";

/** An unfolded carton whose side panels are cut from the hero banner photo. */
function Dieline({ photo }: { photo: string }) {
  return (
    <svg viewBox="0 0 680 640" role="img" aria-label="An unfolded Box Theory carton showing our packaging in warm light" className="h-auto w-full drop-shadow-[0_24px_30px_rgb(74_56_49/0.25)]">
      <defs>
        <clipPath id="about-panels"><rect x="70" y="170" width="580" height="290" /></clipPath>
        <linearGradient id="about-fade-l" x1="0" x2="1"><stop offset="0" stopColor="#4a3831" stopOpacity=".78" /><stop offset="1" stopColor="#4a3831" stopOpacity=".05" /></linearGradient>
        <linearGradient id="about-fade-r" x1="1" x2="0"><stop offset="0" stopColor="#4a3831" stopOpacity=".7" /><stop offset="1" stopColor="#4a3831" stopOpacity="0" /></linearGradient>
      </defs>

      <g fill={TAB} stroke={TAB} strokeWidth="8" strokeLinejoin="round">
        <path d="M108 62h104l-8-44h-88z" />
        <path d="M268 170h84l-8-60h-68z" />
        <path d="M558 170h84l-8-64h-68z" />
        <path d="M268 460h84l-8 60h-68z" />
        <path d="M558 460h84l-8 60h-68z" />
        <path d="M70 236 30 250v168l40 22z" />
        <path d="M398 562h124l-10 48h-104z" />
      </g>
      <g fill={PANEL} stroke={PANEL} strokeWidth="2" strokeLinejoin="round">
        <rect x="70" y="62" width="175" height="108" />
        <rect x="375" y="460" width="170" height="102" />
      </g>

      <g clipPath="url(#about-panels)">
        <image href={photo} x="70" y="170" width="580" height="290" preserveAspectRatio="xMaxYMid slice" />
        <rect x="70" y="170" width="175" height="290" fill="url(#about-fade-l)" />
        <rect x="545" y="170" width="105" height="290" fill="url(#about-fade-r)" />
      </g>
      <g stroke="#fff" strokeOpacity=".55" strokeWidth="1.5">
        <path d="M245 170v290M375 170v290M545 170v290" />
      </g>

      {/* Panel copy is dropped on small screens, where it would render too small to read. */}
      <g className="hidden sm:inline" fill="#fff" fontWeight="600" style={{ textShadow: "0 1px 6px rgb(74 56 49 / .6)" }}>
        <text x="88" y="262" fontSize="17">Better</text>
        <text x="88" y="285" fontSize="17">packaging.</text>
        <text x="88" y="308" fontSize="17">From idea</text>
        <text x="88" y="331" fontSize="17">to delivery.</text>
        <rect x="88" y="344" width="26" height="2" fill="#c3ac7f" />
        <text x="560" y="300" fontSize="14">Design.</text>
        <text x="560" y="320" fontSize="14">Source.</text>
        <text x="560" y="340" fontSize="14">Deliver.</text>
        <rect x="560" y="352" width="22" height="2" fill="#c3ac7f" />
      </g>
    </svg>
  );
}

export default function Page() {
  const { props: photo } = getImageProps({ src: "/images/hero_section/desktop_banner_img1.png", alt: "", width: 1200, height: 675, quality: 75 });

  return (
    <div className="bg-white text-cocoa-umber">
      <section aria-labelledby="about-title" className="relative isolate overflow-hidden bg-gradient-to-br from-white via-white to-gold-lightest">
        <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 hidden w-[58%] bg-gold-light/45 [clip-path:polygon(38%_0,100%_0,100%_100%,0_100%)] lg:block" />
        <div className="roofer-container grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-8 lg:py-24">
          <div>
            <p className="mb-5 text-[12px] font-semibold uppercase tracking-[.3em] text-gold-medium">About Us</p>
            <h1 id="about-title" className="font-display text-[clamp(34px,5vw,60px)] font-semibold leading-[1.08] tracking-[-.03em]">
              Bridging Brands<br />&amp; Manufacturing
            </h1>
            <p className="mt-6 max-w-xl text-[16px] leading-[1.8] text-cocoa-light md:text-[18px]">{ABOUT_PAGE.intro}</p>

            <ul className="mt-9 grid max-w-xl gap-x-8 gap-y-5 sm:grid-cols-2">
              {FEATURES.map(item => (
                <li key={item.label} className="flex items-center gap-4">
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-gold-lightest text-cocoa-umber ring-1 ring-gold-light">
                    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={item.path} /></svg>
                  </span>
                  <span className="text-[16px] font-semibold leading-snug">{item.label}</span>
                </li>
              ))}
            </ul>

            <Link href="/contact" className="mt-10 inline-flex items-center gap-3 rounded-md bg-cocoa-umber px-7 py-3.5 text-[15px] font-medium text-gold-lightest transition hover:bg-cocoa-light">
              Know More <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="order-first mx-auto w-full max-w-[640px] lg:order-none lg:max-w-none">
            <Dieline photo={photo.src} />
          </div>
        </div>
      </section>

      <nav aria-label="Breadcrumb" className="bg-gold-lightest/70">
        <ol className="roofer-container flex items-center gap-3 py-4 text-[14px] text-cocoa-light">
          <li><Link href="/" className="inline-flex items-center gap-2 hover:text-cocoa-umber">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 11 9-8 9 8M5 10v10h14V10" /></svg>Home
          </Link></li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" className="font-medium text-gold-medium">About Us</li>
        </ol>
      </nav>

      <section aria-labelledby="story-title" className="py-16 md:py-24">
        <div className="roofer-container grid items-center gap-10 md:gap-14 lg:grid-cols-2">
          {/* Layered photo stack: the front photo overlaps two receding ones. */}
          <div className="relative mx-auto aspect-[5/4] w-full max-w-[640px] lg:max-w-none">
            {STACK.map(card => (
              <div key={card.src} className={`absolute overflow-hidden rounded-lg border-[6px] border-white bg-gold-lightest shadow-[0_22px_44px_-16px_rgb(74_56_49/0.45)] ${card.box}`} style={{ zIndex: card.z }}>
                <Image src={card.src} alt={card.alt} fill sizes="(max-width: 1024px) 80vw, 40vw" className="object-cover" />
              </div>
            ))}
          </div>
          <div>
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[.3em] text-gold-medium">Our Story</p>
            <h2 id="story-title" className="font-display text-[clamp(30px,4vw,48px)] font-semibold leading-[1.1] tracking-[-.03em]">Built on Purpose</h2>
            <p className="mt-5 text-[16px] leading-[1.8] text-cocoa-light md:text-[18px]">{ABOUT_PAGE.mission}</p>
            <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {ABOUT_PAGE.strengths.map(item => (
                <li key={item} className="flex items-start gap-3 text-[15px]">
                  <span aria-hidden="true" className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold-light text-[11px] text-cocoa-umber">✓</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="advantages-title" className="pb-16 md:pb-24">
        <h2 id="advantages-title" className="roofer-container pb-8 text-center text-[15px] font-semibold tracking-wide md:pb-10">
          Our Advantages <span className="font-normal text-cocoa-light">/ By the Numbers</span>
        </h2>
        {/* The photo is fixed to the viewport and revealed through this band, so it stays put while the page scrolls. */}
        <div className="relative [clip-path:inset(0)]">
          <div aria-hidden="true" className="fixed inset-0 -z-0 h-svh">
            <Image src="/images/hero_section/desktop_banner_img1.png" alt="" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-cocoa-umber/80" />
          </div>
          <div className="roofer-container relative py-14 text-center text-gold-lightest md:py-20">
            <p className="mb-10 text-lg font-semibold tracking-wide md:mb-14 md:text-xl">Real Numbers, Real Packaging</p>
            <dl className="grid gap-10 sm:grid-cols-3 sm:gap-6">
              {STATS.map(stat => (
                <div key={stat.label}>
                  <dd className="font-display text-[clamp(52px,8vw,88px)] font-semibold leading-none tracking-tight tabular-nums">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dt className="mt-3 text-[14px] tracking-[.12em] text-gold-soft md:text-[15px]">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <section aria-labelledby="quality-title" className="pb-16 md:pb-24">
        <div className="roofer-container grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div className="relative mx-auto grid w-full max-w-[560px] grid-cols-[0.8fr_1fr] gap-4 lg:max-w-none">
            <div className="grid gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[22px]">
                <Image src="/images/industries/export-businesses.jpg" alt="Containers stacked at a shipping port" fill sizes="(max-width: 1024px) 30vw, 14vw" className="object-cover" />
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[22px]">
                <Image src="/images/industries/industrial-products.jpg" alt="Heavy-duty packaging for industrial goods" fill sizes="(max-width: 1024px) 30vw, 14vw" className="object-cover" />
              </div>
            </div>
            <div className="relative min-h-[320px] overflow-hidden rounded-[22px]">
              <Image src="/images/industries/electronics.jpg" alt="Protective packaging for electronics" fill sizes="(max-width: 1024px) 50vw, 24vw" className="object-cover" />
            </div>
            <div className="absolute left-[34%] top-[40%] grid size-[104px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-gold-medium p-2 text-center text-cocoa-umber shadow-[0_14px_30px_-12px_rgb(74_56_49/0.5)] sm:size-[124px]">
              <p className="font-display text-[34px] font-semibold leading-none sm:text-[40px]"><CountUp to={INDUSTRIES.length} suffix="+" /></p>
              <p className="-mt-3 text-[11px] font-medium leading-tight sm:text-[12px]">Industries<br />Served</p>
            </div>
          </div>

          <div>
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[.3em] text-gold-medium">About Us</p>
            <h2 id="quality-title" className="font-display text-[clamp(30px,4vw,48px)] font-semibold leading-[1.1] tracking-[-.03em]">
              We Provide Packaging Solutions <span className="text-cocoa-light">Focused On Quality</span>
            </h2>
            <p className="mt-5 max-w-xl text-[16px] leading-[1.8] text-cocoa-light md:text-[17px]">
              From the first sketch to the final pallet, we handle design, sourcing and manufacturing so your product arrives protected and on brand. One team, clear timelines, and packaging built around your budget.
            </p>
            <Link href="/services" className="mt-8 inline-flex items-center gap-3 rounded-md bg-cocoa-umber px-7 py-3.5 text-[15px] font-medium text-gold-lightest transition hover:bg-cocoa-light">
              Read More <span aria-hidden="true">→</span>
            </Link>
            <ul className="mt-10 grid gap-5 rounded-2xl bg-white p-6 shadow-[0_18px_44px_-20px_rgb(74_56_49/0.3)] ring-1 ring-gold-light/70 sm:grid-cols-2">
              {QUALITY_POINTS.map(item => (
                <li key={item.label} className="flex items-center gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gold-lightest text-cocoa-umber">
                    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={item.path} /></svg>
                  </span>
                  <span className="text-[15px] font-semibold">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
