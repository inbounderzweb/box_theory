import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { INDUSTRIES } from "@/lib/content";
import { cn } from "@/lib/utils";

const TONES = ["bg-sand", "bg-white border border-line", "bg-espresso text-ivory"] as const;

export function IndustriesStrip() {
  return (
    <section className="bg-ivory py-24 lg:py-32">
      <Container size="wide">
        <Reveal>
          <Eyebrow>Industries</Eyebrow>
        </Reveal>
      </Container>

      <Reveal delay={0.1}>
        <ul
          className={cn(
            "mt-14 flex list-none snap-x snap-mandatory gap-5 overflow-x-auto pb-4",
            "pl-5 sm:pl-8 lg:pl-[max(3rem,calc((100vw-1440px)/2+3rem))]",
            "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          )}
        >
          {INDUSTRIES.map((industry, index) => {
            const tone = TONES[index % TONES.length];
            return (
              <li
                key={industry.id}
                className={cn(
                  "group relative flex w-[260px] shrink-0 snap-start flex-col justify-between gap-10 overflow-hidden p-7",
                  "h-[320px]",
                  tone,
                )}
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-gold transition-transform duration-300 group-hover:scale-x-100"
                />
                <span className="label font-semibold text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </li>
            );
          })}
          {/* Trailing spacer so the last card doesn't sit flush against the viewport edge. */}
          <li className="w-px shrink-0" aria-hidden />
        </ul>
      </Reveal>
    </section>
  );
}
