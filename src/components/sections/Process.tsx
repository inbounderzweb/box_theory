import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PROCESS_STEPS } from "@/lib/content";

export function Process() {
  return (
    <section className="bg-espresso py-24 text-ivory lg:py-32">
      <Container size="wide">
        <Reveal>
          <Eyebrow tone="light">Process</Eyebrow>
        </Reveal>

        <StaggerGroup
          as="ul"
          className="mt-16 grid list-none grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-8"
        >
          {PROCESS_STEPS.map((step) => (
            <StaggerItem as="li" key={step.id} className="flex flex-col gap-4">
              <span className="font-display text-[32px] font-semibold text-gradient-gold">{step.step}</span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
