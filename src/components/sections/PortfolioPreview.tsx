import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PORTFOLIO } from "@/lib/content";

export function PortfolioPreview() {
  const placeholders = Array.from({ length: PORTFOLIO.placeholderCount });

  return (
    <section className="bg-ivory py-24 lg:py-32">
      <Container size="wide">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>Portfolio</Eyebrow>
        </Reveal>

        <StaggerGroup as="ul" className="mt-14 grid list-none grid-cols-2 gap-5 sm:grid-cols-3">
          {placeholders.map((_, index) => (
            <StaggerItem as="li" key={index}>
              <div className="flex aspect-[4/5] flex-col items-center justify-center border border-dashed border-line bg-sand/40" />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.1} className="mt-10">
          <Button href="/contact" variant="link">
            Discuss Your Project
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
