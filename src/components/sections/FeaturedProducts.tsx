"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent } from "react";
import { SITE, SOLUTIONS } from "@/lib/content";
import type { Solution } from "@/lib/types";
import styles from "./FeaturedProducts.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

const PRESENTATION: Record<string, {
  image: string;
  alt: string;
  category: string;
  detail: string;
  cutout?: boolean;
  objectPosition?: string;
}> = {
  "corrugated-boxes": {
    image: "/images/hero_section/box_png.png",
    alt: "Kraft corrugated shipping carton with Box Theory branding and packing tape",
    category: "PROTECT & DELIVER",
    detail: "Shipping · E-commerce · Transit",
    cutout: true,
  },
  "rigid-boxes": {
    image: "/images/industries/premium-brands.jpg",
    alt: "Kraft gift boxes with a botanical print and a black ribbon",
    category: "PRESENT & IMPRESS",
    objectPosition: "center 85%",
    detail: "Gifting · Premium retail",
  },
  "flexible-packaging": {
    image: "/images/industries/food-beverage.jpg",
    alt: "A coffee pouch held by a barista",
    category: "PACK & PRESERVE",
    detail: "Food · Personal care · Everyday essentials",
  },
};

const products = SOLUTIONS.filter(product => PRESENTATION[product.id]);
const otherProducts = SOLUTIONS.filter(product => !PRESENTATION[product.id]);
const enquiryHref = (title: string) => `mailto:${SITE.email}?subject=${encodeURIComponent(`Packaging enquiry — ${title}`)}`;

function Arrow({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg>;
}

function ProductCard({ product, index }: { product: Solution; index: number }) {
  const media = PRESENTATION[product.id];
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 90, damping: 24 });
  const rotateY = useSpring(y, { stiffness: 90, damping: 24 });

  const followPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * 5);
    y.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 5);
  };

  return (
    <motion.article
      data-reveal
      className={`${styles.card} ${media.cutout ? styles.heroCard : ""}`}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0 : 0.95, delay: reduceMotion ? 0 : index * 0.13, ease: EASE }}
    >
      <div className={styles.visual} onPointerMove={followPointer} onPointerLeave={() => { x.set(0); y.set(0); }}>
        <div className={styles.cardMeta}><span>{media.category}</span><span>{String(index + 1).padStart(2, "0")}</span></div>
        {media.cutout && <><span className={styles.orbit} aria-hidden="true" /><span className={styles.dimension} aria-hidden="true">BUILT AROUND YOUR PRODUCT</span><span className={styles.floorShadow} aria-hidden="true" /></>}
        <motion.div className={styles.imagePlane} style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 900 }}>
          <Image
            src={media.image}
            alt={media.alt}
            fill
            sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 960px) 50vw, 40vw"
            className={media.cutout ? styles.cutout : styles.photo}
            style={media.objectPosition ? { objectPosition: media.objectPosition } : undefined}
          />
        </motion.div>
        <span className={styles.visualCaption}>{media.detail}</span>
        <span className={styles.cornerMark} aria-hidden="true">↗</span>
      </div>
      <div className={styles.cardBody}>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <a className={styles.productLink} href={enquiryHref(product.title)} aria-label={`Discuss this product: ${product.title}`}><span>Discuss this product</span><Arrow /></a>
      </div>
    </motion.article>
  );
}

export function FeaturedProducts() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="featured-products" className={styles.section} aria-labelledby="featured-products-title">
      <div className="roofer-container">
        <motion.div
          data-reveal
          className={styles.heading}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.9, ease: EASE }}
        >
          <div>
            <p className={styles.eyebrow}><span aria-hidden="true" /> FEATURED PRODUCTS</p>
            <h2 id="featured-products-title">Great things come<br />in <span>thoughtful packaging.</span></h2>
          </div>
          <div className={styles.headingAside}>
            <p>From the first impression to the final delivery. Find the right format for what you make.</p>
            <a href="#enquire">Find your packaging <Arrow /></a>
          </div>
        </motion.div>

        <div className={styles.grid}>
          {products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
        </div>

        <div className={styles.moreFormats}>
          <p>More ways to make it yours<span>Explore our packaging range</span></p>
          <ul aria-label="More packaging products">
            {otherProducts.map(product => <li key={product.id}><a href={enquiryHref(product.title)} aria-label={`Enquire about ${product.title}`}>{product.title}<Arrow /></a></li>)}
          </ul>
        </div>
        <div className={styles.customNote}><span className={styles.noteIcon} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="m12 3 9 5v9l-9 5-9-5V8l9-5Zm0 10 9-5M3 8l9 5v9M7.5 5.5l9 5v4" /></svg></span><p>Your product. Your dimensions. Your brand.<span> Let’s find the right fit.</span></p><a href="#enquire">Talk to Box Theory <Arrow /></a></div>
      </div>
    </section>
  );
}
