import type { Metadata } from "next";
import Link from "next/link";

import { BlogCard } from "@/components/blog/BlogCard";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { PageBanner } from "@/components/sections/PageBanner";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { formatPostDate, toDateTimeAttr } from "@/lib/utils";
import { listPublishedBlogPosts, listRecentPublishedBlogPosts } from "@/services/blog.service";
import {
  getCategoryBySlug,
  getTagBySlug,
  listBlogCategories,
  listBlogTags,
} from "@/services/taxonomy.service";
import { asPopulatedAuthor, asPopulatedTerm } from "@/types/blog";
import { asPopulatedMedia } from "@/types/media";

const PAGE_SIZE = 8;

const INTRO = {
  eyebrow: "Insights",
  heading: "Notes on packaging, sourcing & execution",
  body: "Practical thinking from our consultancy work: materials, structures, supplier coordination, and what it takes to get packaging right from the first sample to full production.",
};

type SearchParams = { page?: string; category?: string; tag?: string; q?: string };

/** Query values arrive as `string | string[]`; anything but a plain string is ignored. */
function single(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, 100) : undefined;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const params = await searchParams;
  const isFiltered = Boolean(single(params.category) || single(params.tag) || single(params.q));

  return buildMetadata(
    {
      canonical: `${siteConfig.url}/blog`,
      // Filtered and searched views are thin duplicates of the main listing.
      robots: isFiltered ? "noindex, follow" : undefined,
    },
    { title: "Blog", description: INTRO.body },
  );
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const category = single(params.category);
  const tag = single(params.tag);
  const search = single(params.q);

  const [result, recent, categories, tags, activeCategory, activeTag] = await Promise.all([
    listPublishedBlogPosts({ page: params.page, limit: PAGE_SIZE, categorySlug: category, tagSlug: tag, search }).catch(
      (error) => {
        console.error("Failed to load blog posts", error);
        return null;
      },
    ),
    listRecentPublishedBlogPosts(3).catch(() => []),
    listBlogCategories().catch(() => []),
    listBlogTags().catch(() => []),
    category ? getCategoryBySlug(category).catch(() => null) : null,
    tag ? getTagBySlug(tag).catch(() => null) : null,
  ]);

  const filterLabel = search
    ? `Search results for “${search}”`
    : category
      ? `Category: ${activeCategory?.name ?? category}`
      : tag
        ? `Tag: ${activeTag?.name ?? tag}`
        : null;

  return (
    <div className="bg-white text-cocoa-umber">
      <PageBanner title="Blog" crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

      <section aria-labelledby="blog-intro" className="pb-10 pt-14 md:pb-12 md:pt-20">
        <div className="roofer-container grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[.3em] text-gold-medium">{INTRO.eyebrow}</p>
            <h2 id="blog-intro" className="font-display text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.12] tracking-[-.03em]">
              {INTRO.heading}
            </h2>
          </div>
          <p className="text-[16px] leading-[1.8] text-cocoa-light md:text-[17px]">{INTRO.body}</p>
        </div>
      </section>

      <section aria-label="Blog posts" className="pb-16 md:pb-24">
        <div className="roofer-container grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
          <div className="min-w-0">
            {filterLabel && (
              <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-gold-lightest px-5 py-4 text-[15px]">
                <p>
                  <span className="font-semibold">{filterLabel}</span>
                  {result && (
                    <span className="text-cocoa-light">
                      {" "}
                      · {result.total} {result.total === 1 ? "post" : "posts"}
                    </span>
                  )}
                </p>
                <Link href="/blog" className="text-[14px] font-semibold underline underline-offset-4 hover:text-gold-medium">
                  Clear filter
                </Link>
              </div>
            )}

            {!result ? (
              <EmptyState
                title="The blog is temporarily unavailable"
                body="We couldn’t load articles right now. Please try again in a moment."
              />
            ) : result.items.length === 0 ? (
              filterLabel || Number(params.page) > 1 ? (
                <EmptyState title="No articles found" body="Nothing matches this filter yet. Try another search or browse all articles." showReset />
              ) : (
                <EmptyState title="Articles are on the way" body="We’re preparing our first insights. Check back soon." />
              )
            ) : (
              <>
                <ul className="grid gap-6 sm:grid-cols-2 lg:gap-8">
                  {result.items.map((post, index) => {
                    const image = asPopulatedMedia(post.featuredImage);
                    return (
                      <li key={post._id.toString()}>
                        <BlogCard
                          slug={post.slug}
                          title={post.title}
                          excerpt={post.excerpt}
                          image={image ? { src: image.secureUrl, alt: image.altText || post.title } : null}
                          date={formatPostDate(post.publishedAt)}
                          dateTime={toDateTimeAttr(post.publishedAt)}
                          author={post.authorName || asPopulatedAuthor(post.author)?.name || null}
                          category={asPopulatedTerm(post.category)}
                          readingTime={post.readingTime}
                          priority={index < 2}
                        />
                      </li>
                    );
                  })}
                </ul>

                <BlogPagination page={result.page} pages={result.pages} query={{ category, tag, q: search }} />
              </>
            )}
          </div>

          <BlogSidebar recent={recent} categories={categories} tags={tags} search={search} />
        </div>
      </section>
    </div>
  );
}

function EmptyState({ title, body, showReset = false }: { title: string; body: string; showReset?: boolean }) {
  return (
    <div className="rounded-2xl bg-gold-lightest px-6 py-14 text-center ring-1 ring-gold-light/80 md:py-20">
      <h2 className="font-display text-[clamp(22px,2.4vw,28px)] font-semibold">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-[1.75] text-cocoa-light">{body}</p>
      {showReset && (
        <Link
          href="/blog"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-cocoa-umber px-6 py-3 text-[14px] font-semibold text-gold-lightest transition hover:bg-cocoa-light"
        >
          View all articles <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}
