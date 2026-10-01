import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CTA } from "@/lib/content";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-espresso py-28 text-ivory lg:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 size-[560px] rounded-full bg-gold/15 blur-[120px]"
      />
      <Container className="relative flex flex-col items-start gap-8">
        <Reveal>
          <Eyebrow tone="light">Final CTA</Eyebrow>
        </Reveal>
        <Reveal delay={0.16} className="flex flex-wrap items-center gap-4">
          <Button href={CTA.primaryCta.href} variant="gold">
            {CTA.primaryCta.label}
          </Button>
          <Button href={CTA.secondaryCta.href} variant="outline">
            {CTA.secondaryCta.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
