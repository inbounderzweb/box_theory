import Link from "next/link";

import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  /** `solid` — filled espresso. `gold` — the one saturated CTA, for hero/dark sections. `outline` — bordered, for dark surfaces. `link` — text + arrow only. */
  variant?: "solid" | "gold" | "outline" | "link";
  className?: string;
  onClick?: () => void;
};

/** The one CTA pattern used across the site: label + a magnetic arrow. */
export function Button({ href, children, variant = "solid", className, onClick }: ButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group inline-flex items-center gap-2.5 text-[15px] font-medium transition-colors duration-300",
        variant === "solid" &&
          "h-[52px] rounded-full bg-espresso px-6 text-ivory hover:bg-espresso-light",
        variant === "gold" &&
          "h-[52px] rounded-full bg-gradient-gold px-6 text-espresso shadow-[0_8px_24px_-8px_rgba(200,154,68,0.6)] transition-shadow hover:shadow-[0_10px_30px_-6px_rgba(200,154,68,0.75)]",
        variant === "outline" &&
          "h-[52px] rounded-full border border-ivory/25 px-6 text-ivory hover:border-champagne hover:text-champagne",
        variant === "link" && "text-espresso hover:text-copper",
        className,
      )}
    >
      {children}
      <ArrowIcon className="text-[1.1em] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}
