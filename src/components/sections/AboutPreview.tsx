import Image from "next/image";

import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ABOUT_PREVIEW } from "@/lib/content";

export function AboutPreview() {
  return (
    <section className="grid bg-ivory lg:grid-cols-2">
      <div className="relative h-[360px] lg:h-auto">
        <Image
          src={ABOUT_PREVIEW.image}
          alt={ABOUT_PREVIEW.imageAlt}
          fill
          unoptimized
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <Reveal className="flex flex-col justify-center gap-6 px-5 py-20 sm:px-8 lg:px-16 lg:py-0">
        <Eyebrow>About</Eyebrow>
        <Button href={ABOUT_PREVIEW.cta.href} variant="link" className="w-fit">
          {ABOUT_PREVIEW.cta.label}
        </Button>
      </Reveal>
    </section>
  );
}
