import Link from "next/link";

import { ArrowIcon } from "@/components/ui/ArrowIcon";

type Neighbour = { slug: string; title: string } | null;

type PostNavigationProps = {
  previous: Neighbour;
  next: Neighbour;
};

export function PostNavigation({ previous, next }: PostNavigationProps) {
  if (!previous && !next) return null;

  return (
    <nav aria-label="More posts" className="mt-14 grid gap-8 border-t border-line pt-10 sm:grid-cols-2">
      {previous ? (
        <Link href={`/blog/${previous.slug}`} rel="prev" className="group flex flex-col gap-2">
          <span className="label flex items-center gap-2 text-muted">
            <ArrowIcon className="rotate-180" /> Previous
          </span>
          <span className="display-subheading text-[18px] text-espresso transition-colors group-hover:text-copper">
            {previous.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}

      {next && (
        <Link href={`/blog/${next.slug}`} rel="next" className="group flex flex-col gap-2 sm:items-end sm:text-right">
          <span className="label flex items-center gap-2 text-muted">
            Next <ArrowIcon />
          </span>
          <span className="display-subheading text-[18px] text-espresso transition-colors group-hover:text-copper">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
