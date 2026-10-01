import Image from "next/image";
import Link from "next/link";
import { INDUSTRIES } from "@/lib/content";

const img = (id: string) => `/images/industries/${id}.jpg`;
const ROWS = INDUSTRIES.slice(0, 4);

export function IndustriesDirectory() {
  return (
    <section aria-labelledby="industries-directory-title" className="bg-white py-16 text-cocoa-umber md:py-24">
      <div className="roofer-container">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
          <div className="order-2 grid grid-cols-2 gap-5 lg:order-1">
            <div className="relative col-span-2 aspect-[3/2] overflow-hidden rounded-xl">
              <Image src={img("fmcg")} alt="FMCG packaging" fill sizes="(max-width: 1024px) 100vw, 35vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image src={img("retail-ecommerce")} alt="Retail and e-commerce packaging" fill sizes="(max-width: 1024px) 50vw, 17vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image src={img("export-businesses")} alt="Export packaging" fill sizes="(max-width: 1024px) 50vw, 17vw" className="object-cover" />
            </div>
          </div>

          <div className="order-1 flex flex-col lg:order-2">
            <h2 id="industries-directory-title" className="mb-8 text-4xl font-bold uppercase leading-tight tracking-tight md:text-5xl">We Manufacture All Types of Corrugated Boxes, (Cartons) within your budget</h2>
            <div className="relative min-h-[380px] flex-1 overflow-hidden rounded-xl">
              <Image src={img("premium-brands")} alt="" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                <h3 className="mb-3 text-2xl font-bold uppercase md:text-3xl">Packaging for every sector</h3>
                <p className="mb-5 max-w-xl text-sm text-white/90 md:text-base">From food and cosmetics to electronics and export, we tailor structure, material and print to how your industry ships and sells.</p>
                <Link href="/industries" className="inline-block rounded-full border border-white/80 px-6 py-2.5 text-sm font-medium transition hover:bg-white hover:text-cocoa-umber">Learn More</Link>
              </div>
            </div>
          </div>
        </div>

        <ul className="mt-14 border-t border-cocoa-lightest">
          {ROWS.map((item, i) => (
            <li key={item.id} className="grid items-start gap-3 border-b border-cocoa-lightest py-8 md:grid-cols-[1fr_1.2fr_1.3fr] md:gap-8">
              <span className="flex items-center gap-4 text-xl font-medium md:text-2xl">
                <span className="h-3 w-3 shrink-0 rounded-full bg-gold-medium" aria-hidden="true" />
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-semibold md:text-2xl">{item.name}</h3>
              <p className="text-sm leading-relaxed text-cocoa-light">
                {item.description}{" "}
                <Link href={`/industries#${item.id}`} className="font-semibold text-cocoa-umber underline decoration-gold-medium underline-offset-4 hover:text-cocoa-light">View Details</Link>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
