import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  /** `wide` for full-bleed editorial sections (1440px), `content` for reading-width sections (1280px). */
  size?: "wide" | "content";
  className?: string;
};

export function Container({
  children,
  size = "content",
  className,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        size === "wide" ? "max-w-wide" : "max-w-content",
        className,
      )}
    >
      {children}
    </div>
  );
}
