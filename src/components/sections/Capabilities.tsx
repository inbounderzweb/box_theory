import Link from "next/link";

import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CAPABILITIES } from "@/lib/content";

export function Capabilities() {
  return (
    <section id="services" className="bg-ivory py-24 lg:py-32">
      <Container size="wide">
        <Reveal>
          <Eyebrow>Capabilities</Eyebrow>
        </Reveal>

        <StaggerGroup as="ul" className="mt-16 grid list-none grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((capability) => (
            <StaggerItem as="li" key={capability.id} className="group relative border-b border-r border-line">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-gold transition-transform duration-300 group-hover:scale-x-100"
              />
              <Link href="/services" className="flex h-full min-h-[180px] flex-col gap-6 p-8 transition-colors duration-300 hover:bg-sand/40 lg:p-10">
                <span className="font-display text-[15px] font-semibold text-gradient-gold">{capability.number}</span>
                <ArrowIcon className="mt-auto text-[1.4em] text-copper opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
