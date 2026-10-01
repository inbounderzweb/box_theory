import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";

type HeadingProps = {
  label?: string;
  lead: string;
  /** A trailing clause rendered in champagne gold. */
  accent?: string;
  as?: "h1" | "h2" | "h3";
  tone?: "dark" | "light";
  className?: string;
  headingClassName?: string;
};

/** The section-heading pattern used throughout: label, then a large display heading. */
export function Heading({
  label,
  lead,
  accent,
  as: Tag = "h2",
  tone = "dark",
  className,
  headingClassName,
}: HeadingProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {label ? <Eyebrow tone={tone}>{label}</Eyebrow> : null}
      <Tag
        className={cn(
          "display-heading text-balance",
          tone === "dark" ? "text-espresso" : "text-ivory",
          headingClassName,
        )}
      >
        {lead}
        {accent ? <span className="text-gradient-gold"> {accent}</span> : null}
      </Tag>
    </div>
  );
}
