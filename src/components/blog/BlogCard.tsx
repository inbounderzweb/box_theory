import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { PopulatedTerm } from "@/types/blog";

type BlogCardProps = {
  slug: string;
  title: string;
  excerpt?: string | null;
  image: { src: string; alt: string } | null;
  date: string | null;
  dateTime?: string;
  author: string | null;
  category: PopulatedTerm | null;
  readingTime?: number | null;
  /** Load the image eagerly — for cards in the first viewport. */
  priority?: boolean;
  className?: string;
};

export function BlogCard({
  slug,
  title,
  excerpt,
  image,
  date,
  dateTime,
  author,
  category,
  readingTime,
  priority = false,
  className,
}: BlogCardProps) {
  const href = `/blog/${slug}`;

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-gold-light/80 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_-28px_rgb(74_56_49/0.5)]",
        className,
      )}
    >
      {/* The image link duplicates the title link, so keep it out of the tab order and accessibility tree. */}
      <Link href={href} tabIndex={-1} aria-hidden className="relative block overflow-hidden bg-gold-lightest">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            width={800}
            height={500}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 440px"
            loading={priority ? "eager" : "lazy"}
            className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <span className="grid aspect-[16/10] w-full place-items-center font-display text-[15px] font-semibold uppercase tracking-[.3em] text-gold-medium">
            Box Theory
          </span>
        )}
        {category && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[12px] font-semibold text-cocoa-umber">
            {category.name}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        {(date || readingTime) && (
          <p className="flex flex-wrap items-center gap-x-2 text-[12px] font-semibold uppercase tracking-[.18em] text-gold-medium">
            {date && <time dateTime={dateTime}>{date}</time>}
            {date && readingTime ? <span aria-hidden="true">·</span> : null}
            {readingTime ? <span>{readingTime} min read</span> : null}
          </p>
        )}

        <h2 className="mt-3 font-display text-[21px] font-semibold leading-snug tracking-[-.01em] text-cocoa-umber">
          <Link href={href} className="transition-colors hover:text-gold-medium">
            {title}
          </Link>
        </h2>

        {excerpt && <p className="mt-3 line-clamp-3 text-[15px] leading-[1.7] text-cocoa-light">{excerpt}</p>}

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          {author ? <span className="truncate text-[13px] text-cocoa-muted">By {author}</span> : <span />}
          <Link
            href={href}
            className="inline-flex shrink-0 items-center gap-2 text-[14px] font-semibold text-cocoa-umber"
          >
            Read More<span className="sr-only">: {title}</span>
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
