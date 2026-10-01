import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

type PageHeroProps = {
  /** The section/page name — doubles as the on-page label while content is blank. */
  eyebrow: string;
  heading?: string;
  body?: string;
  tone?: "dark" | "light";
};

/** The standard interior-page header: eyebrow (section name), optional display heading/supporting line. */
export function PageHero({ eyebrow, heading, body, tone = "dark" }: PageHeroProps) {
  return (
    <section className={tone === "dark" ? "bg-ivory" : "bg-espresso"}>
      <Container size="wide" className="pb-16 pt-[calc(76px+64px)] lg:pb-24 lg:pt-[calc(76px+96px)]">
        <Reveal className="flex flex-col gap-6">
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
          {heading ? (
            <h1 className={`display-heading max-w-3xl text-balance ${tone === "dark" ? "text-espresso" : "text-ivory"}`}>
              {heading}
            </h1>
          ) : null}
          {body ? (
            <p className={`max-w-xl text-[17px] leading-[27px] ${tone === "dark" ? "text-muted" : "text-ivory/70"}`}>
              {body}
            </p>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
