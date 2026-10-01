import { cn } from "@/lib/utils";
import { SITE } from "@/lib/content";

type BrandMarkProps = {
  tone?: "dark" | "light";
  className?: string;
};

/** Box Theory's wordmark: a simple geometric corner mark plus set type — no image asset to swap per deployment. */
export function BrandMark({ tone = "dark", className }: BrandMarkProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 28 28" className="size-6 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="brandmark-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--color-gold-light)" />
            <stop offset="0.55" stopColor="var(--color-gold)" />
            <stop offset="1" stopColor="var(--color-rust)" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" className={tone === "dark" ? "text-espresso" : "text-ivory"} />
        <rect x="1" y="1" width="13" height="13" fill="url(#brandmark-gold)" />
      </svg>
      <span
        className={cn(
          "font-display text-[19px] font-semibold tracking-[-0.01em]",
          tone === "dark" ? "text-espresso" : "text-ivory",
        )}
      >
        {SITE.name}
      </span>
    </span>
  );
}
