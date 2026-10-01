import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Statement() {
  return (
    <section className="bg-ivory py-24 lg:py-36">
      <Container>
        <Reveal>
          <Eyebrow>Statement</Eyebrow>
        </Reveal>
      </Container>
    </section>
  );
}
