import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { WHY_ITEMS } from "@/lib/content";

export function WhyBoxTheory() {
  return (
    <section className="bg-espresso py-24 text-ivory lg:py-32">
      <Container size="wide">
        <Reveal>
          <Eyebrow tone="light">Why Box Theory</Eyebrow>
        </Reveal>

        <StaggerGroup as="ul" className="mt-16 flex list-none flex-col divide-y divide-ivory/10 border-t border-ivory/10">
          {WHY_ITEMS.map((item) => (
            <StaggerItem as="li" key={item.id} className="group">
              <div className="grid grid-cols-[56px_1fr] items-baseline gap-6 border-l-2 border-transparent py-7 pl-4 -ml-4 transition-colors duration-300 group-hover:border-gold sm:items-center">
                <span className="font-display text-[15px] font-semibold text-gradient-gold">{item.number}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
