import Image from "next/image";

import { Reveal } from "@/components/animations/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SUSTAINABILITY } from "@/lib/content";

export function Sustainability() {
  return (
    <section className="grid bg-ivory lg:grid-cols-2">
      <Reveal className="flex flex-col justify-center gap-6 px-5 py-20 sm:px-8 lg:order-2 lg:px-16 lg:py-0">
        <Eyebrow>Sustainability</Eyebrow>
        <ul className="mt-2 flex flex-col gap-2.5">
          {SUSTAINABILITY.points.map((point) => (
            <li key={point} className="flex items-center gap-3 text-[14px] text-espresso">
              <span className="h-[2px] w-5 bg-gradient-gold" aria-hidden />
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="relative h-[360px] lg:order-1 lg:h-auto">
        <Image
          src={SUSTAINABILITY.image}
          alt={SUSTAINABILITY.imageAlt}
          fill
          unoptimized
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
