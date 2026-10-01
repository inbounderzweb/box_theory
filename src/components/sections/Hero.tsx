import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HERO } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative flex min-h-[92svh] w-full items-center overflow-hidden bg-espresso pt-[76px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 size-[520px] rounded-full bg-gold/20 blur-[140px]"
      />

      <div className="relative grid w-full gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-6">
        <div className="relative z-10 flex flex-col gap-7 px-5 sm:px-8 lg:pl-12 lg:pr-0">
          <Eyebrow tone="light">Hero</Eyebrow>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            <Button href={HERO.primaryCta.href} variant="gold">
              {HERO.primaryCta.label}
            </Button>
            <Button href={HERO.secondaryCta.href} variant="outline">
              {HERO.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className="relative h-[46vh] w-full lg:h-[92svh]">
          <Image
            src={HERO.image}
            alt={HERO.imageAlt}
            fill
            unoptimized
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
