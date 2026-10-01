import { existsSync } from "node:fs";
import path from "node:path";
import { INDUSTRIES } from "@/lib/content";
import { IndustriesCarousel, type IndustryCard } from "./IndustriesCarousel";

// Short, card-sized copy. Falls back to the longer description in content.ts.
const SHORT: Record<string, string> = {
  "food-beverage": "Safe, sustainable and appealing packaging for food and beverages.",
  fmcg: "Reliable packaging for fast-moving consumer goods.",
  cosmetics: "Premium packaging that enhances brand value.",
  "retail-ecommerce": "Durable and attractive packaging for modern retail and online brands.",
  apparel: "Stylish and protective packaging for fashion brands.",
  "consumer-products": "Everyday products packaged for shelf and online alike.",
  electronics: "Protective packaging engineered for sensitive components.",
  healthcare: "Compliant, tamper-evident packaging for regulated products.",
  "industrial-products": "Heavy-duty packaging built for weight and freight handling.",
  "export-businesses": "Packaging built for international shipping standards.",
  "premium-brands": "Packaging as brand experience, for products that lead on presentation.",
  "d2c-startups": "Right-sized packaging for brands scaling from first batch to bulk.",
};

const EXTENSIONS = ["jpg", "jpeg", "png", "webp", "avif", "svg"];

/** Looks for public/images/industries/<id>.<ext>; cards fall back to an illustrated panel without one. */
function findImage(id: string): string | undefined {
  const ext = EXTENSIONS.find(e => existsSync(path.join(process.cwd(), "public", "images", "industries", `${id}.${e}`)));
  return ext ? `/images/industries/${id}.${ext}` : undefined;
}

export function IndustriesServed() {
  const cards: IndustryCard[] = INDUSTRIES.map(item => ({
    id: item.id,
    name: item.name,
    description: SHORT[item.id] ?? item.description,
    image: findImage(item.id),
  }));
  return <IndustriesCarousel cards={cards} />;
}
