import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { asPopulatedMedia } from "@/types/media";
import type { TermWithCount } from "@/types/blog";
import { formatPostDate } from "@/lib/utils";

type RecentPost = {
  slug: string;
  title: string;
  publishedAt?: Date | null;
  featuredImage?: unknown;
};

type BlogSidebarProps = {
  recent: RecentPost[];
  categories: TermWithCount[];
  tags: TermWithCount[];
  search?: string;
  className?: string;
};

function Widget({
  title,
  children,
  labelledBy,
}: {
  title?: string;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  return (
    <section aria-labelledby={labelledBy} className="border border-line bg-white p-7">
      {title && (
        <h2 id={labelledBy} className="label mb-6 text-muted">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

export function BlogSidebar({
  recent,
  categories,
  tags,
  search,
  className,
}: BlogSidebarProps) {
  return (
    <aside aria-label="Blog sidebar" className={cn("flex flex-col gap-6 lg:pl-12", className)}>
      {/* Search — a plain GET form, so it works with JavaScript disabled. */}
      <Widget>
        <form action="/blog" className="relative">
          <label htmlFor="blog-search" className="sr-only">
            Search the blog
          </label>
          <input
            id="blog-search"
            type="search"
            name="q"
            defaultValue={search}
            placeholder="Search"
            className="h-[46px] w-full border border-line bg-white pl-4 pr-[54px] text-[14px] text-espresso placeholder:text-muted/60 focus:border-champagne focus:outline-none"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 grid size-[46px] place-items-center bg-espresso text-ivory transition-colors hover:bg-espresso-light"
          >
            <svg viewBox="0 0 16 16" aria-hidden className="size-[16px] fill-current">
              <path d="M11.74 10.34a6 6 0 1 0-1.4 1.4l3.2 3.2a1 1 0 0 0 1.4-1.4l-3.2-3.2ZM6.5 10.5a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
      </Widget>

      {recent.length > 0 && (
        <Widget title="Recent Articles" labelledBy="widget-recent">
          <ul className="flex flex-col gap-4">
            {recent.map((post) => {
              const image = asPopulatedMedia(post.featuredImage);
              const date = formatPostDate(post.publishedAt, "short");

              return (
                <li key={post.slug} className="flex items-center gap-4">
                  {image ? (
                    <Image
                      src={image.secureUrl}
                      alt={image.altText ?? post.title}
                      width={64}
                      height={64}
                      sizes="64px"
                      className="size-16 shrink-0 object-cover"
                    />
                  ) : (
                    <span aria-hidden className="size-16 shrink-0 bg-sand" />
                  )}

                  <div className="min-w-0">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="line-clamp-2 text-[14px] font-medium leading-[20px] text-espresso transition-colors hover:text-copper"
                    >
                      {post.title}
                    </Link>
                    {date && <span className="mt-1 block text-[12px] text-muted">{date}</span>}
                  </div>
                </li>
              );
            })}
          </ul>
        </Widget>
      )}

      {categories.length > 0 && (
        <Widget title="Categories" labelledBy="widget-categories">
          <ul className="flex flex-col gap-3">
            {categories.map((category) => (
              <li key={category.slug} className="flex items-center justify-between text-[14px]">
                <Link
                  href={`/blog?category=${encodeURIComponent(category.slug)}`}
                  className="text-espresso transition-colors hover:text-copper"
                >
                  {category.name}
                </Link>
                <span className="text-muted">({category.count})</span>
              </li>
            ))}
          </ul>
        </Widget>
      )}

      {tags.length > 0 && (
        <Widget title="Popular Tags" labelledBy="widget-tags">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/blog?tag=${encodeURIComponent(tag.slug)}`}
                className="border border-line px-3 py-1.5 text-[13px] text-espresso transition-colors hover:border-champagne hover:text-champagne"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </Widget>
      )}
    </aside>
  );
}
