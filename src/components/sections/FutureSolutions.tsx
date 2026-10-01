import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { FUTURE_ITEMS } from "@/lib/content";

export function FutureSolutions() {
  return (
    <section className="bg-sand py-24 lg:py-32">
      <Container size="wide">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <Eyebrow>Future Solutions</Eyebrow>
          <Button href="/future-solutions" variant="link" className="hidden sm:inline-flex">
            Explore Future Solutions
          </Button>
        </Reveal>

        <StaggerGroup as="ul" className="mt-14 grid list-none grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {FUTURE_ITEMS.map((item) => (
            <StaggerItem as="li" key={item.id} className="min-h-[140px] bg-sand p-7" />
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
