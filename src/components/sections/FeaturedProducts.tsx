"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent } from "react";
import { SOLUTIONS } from "@/lib/content";
import type { Solution } from "@/lib/types";
import { FeaturedEnquiry } from "./FeaturedEnquiry";
import styles from "./FeaturedProducts.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

const PRESENTATION: Record<string, {
  image: string;
  alt: string;
  cutout?: boolean;
  objectPosition?: string;
}> = {
  "corrugated-boxes": {
    image: "/images/hero_section/box_png.png",
    alt: "Kraft corrugated shipping carton with Box Theory branding and packing tape",
    cutout: true,
  },
  "rigid-boxes": {
    image: "/images/industries/premium-brands.jpg",
    alt: "Kraft gift boxes with a botanical print and a black ribbon",
    objectPosition: "center 85%",
  },
  "flexible-packaging": {
    image: "/images/industries/food-beverage.jpg",
    alt: "A coffee pouch held by a barista",
  },
};

const products = SOLUTIONS.filter(product => PRESENTATION[product.id]);
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
        {media.cutout && <><span className={styles.orbit} aria-hidden="true" /><span className={styles.floorShadow} aria-hidden="true" /></>}
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
      </div>
      <div className={styles.cardBody}>
        <h3>{product.title}</h3>
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
        </motion.div>

        <div className={styles.grid}>
          {products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
        </div>

        <hr className={styles.divider} aria-hidden="true" />

        <FeaturedEnquiry />
      </div>
    </section>
  );
}
