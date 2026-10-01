import Image from "next/image";
import Link from "next/link";

import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SOLUTIONS } from "@/lib/content";

export function Solutions() {
  return (
    <section className="bg-ivory py-24 lg:py-32">
      <Container size="wide">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <Eyebrow>Solutions</Eyebrow>
          <Button href="/services" variant="link" className="hidden sm:inline-flex">
            View All Solutions
          </Button>
        </Reveal>

        <StaggerGroup as="ul" className="mt-14 grid list-none grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {SOLUTIONS.map((solution) => (
            <StaggerItem as="li" key={solution.id} className="group">
              <Link href="/services" className="flex flex-col gap-5">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={solution.image}
                    alt=""
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-gold transition-transform duration-300 group-hover:scale-x-100"
                  />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-10 sm:hidden">
          <Button href="/services" variant="link">
            View All Solutions
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
