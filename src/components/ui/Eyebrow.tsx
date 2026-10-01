import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: React.ReactNode;
  /** `dark` text for light/ivory backgrounds (default), `light` for dark/espresso backgrounds. */
  tone?: "dark" | "light";
  className?: string;
};

/** Uppercase micro-label with a champagne rule — the section-identity marker used throughout. */
export function Eyebrow({ children, tone = "dark", className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "label inline-flex items-center gap-2.5",
        tone === "dark" ? "text-muted" : "text-ivory/70",
        className,
      )}
    >
      <span className="h-[2px] w-6 shrink-0 bg-gradient-gold" aria-hidden />
      {children}
    </span>
  );
}
