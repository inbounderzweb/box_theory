import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { PopulatedTerm } from "@/types/blog";

type BlogCardProps = {
  slug: string;
  title: string;
  image: { src: string; alt: string } | null;
  date: string | null;
  dateTime?: string;
  author: string | null;
  category: PopulatedTerm | null;
  className?: string;
};

export function BlogCard({
  slug,
  title,
  image,
  date,
  dateTime,
  author,
  category,
  className,
}: BlogCardProps) {
  const href = `/blog/${slug}`;

  return (
    <article className={cn("group flex h-full flex-col border border-line bg-white", className)}>
      {image ? (
        <Link href={href} tabIndex={-1} aria-hidden className="block overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            width={700}
            height={600}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
            className="aspect-[700/600] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>
      ) : (
        <div aria-hidden className="aspect-[700/600] w-full bg-sand" />
      )}

      <div className="flex flex-1 flex-col gap-4 p-7">
        {date && (
          <time dateTime={dateTime} className="label text-muted">
            {date}
          </time>
        )}

        <h3 className="display-subheading text-[20px] text-espresso">
          <Link href={href} className="transition-colors hover:text-copper">
            {title}
          </Link>
        </h3>

        {(author || category) && (
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-2 text-[13px] text-muted">
            {author && <span>{author}</span>}
            {category && (
              <Link
                href={`/blog?category=${encodeURIComponent(category.slug)}`}
                className="border border-line px-3 py-1 transition-colors hover:border-champagne hover:text-champagne"
              >
                {category.name}
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
