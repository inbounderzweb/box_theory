import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { PostNavigation } from "@/components/blog/PostNavigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import {
  getAdjacentBlogPosts,
  getPublishedBlogPostBySlug,
  listRecentPublishedBlogPosts,
} from "@/services/blog.service";
import { listBlogCategories, listBlogTags } from "@/services/taxonomy.service";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { formatPostDate, toDateTimeAttr } from "@/lib/utils";
import { asPopulatedMedia } from "@/types/media";
import { asPopulatedAuthor, asPopulatedTerm, asPopulatedTerms } from "@/types/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug).catch(() => null);
  if (!post) return {};

  return buildMetadata(
    { ...post.seo, canonical: post.seo?.canonical || `${siteConfig.url}/blog/${post.slug}` },
    { title: post.title, description: post.excerpt ?? undefined }
  );
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug).catch(() => null);

  if (!post) {
    notFound();
  }

  const [adjacent, recent, categories, tags] = await Promise.all([
    getAdjacentBlogPosts(post).catch(() => ({ previous: null, next: null })),
    listRecentPublishedBlogPosts(3, post.slug).catch(() => []),
    listBlogCategories().catch(() => []),
    listBlogTags().catch(() => []),
  ]);

  const image = asPopulatedMedia(post.featuredImage);
  const author = asPopulatedAuthor(post.author);
  const category = asPopulatedTerm(post.category);
  const postTags = asPopulatedTerms(post.tags);
  const publishedOn = formatPostDate(post.publishedAt);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: image?.secureUrl,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: author ? { "@type": "Person", name: author.name } : undefined,
    publisher: { "@type": "Organization", name: siteConfig.name },
  };

  const meta: React.ReactNode[] = [];
  if (author) meta.push(author.name);
  if (publishedOn) {
    meta.push(<time dateTime={toDateTimeAttr(post.publishedAt)}>{publishedOn}</time>);
  }
  if (post.readingTime) meta.push(`${post.readingTime} min read`);
  if (category) {
    meta.push(
      <Link href={`/blog?category=${encodeURIComponent(category.slug)}`} className="transition-colors hover:text-copper">
        {category.name}
      </Link>
    );
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero eyebrow="Insights" heading={post.title} />

      <section className="bg-ivory pb-24 lg:pb-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[2fr_1fr] lg:gap-0">
            <article>
              {image && (
                <Image
                  src={image.secureUrl}
                  alt={image.altText ?? post.title}
                  width={image.width ?? 1200}
                  height={image.height ?? 675}
                  sizes="(max-width: 1024px) 100vw, 840px"
                  loading="eager"
                  className="h-auto w-full object-cover"
                />
              )}

              <div className={image ? "pt-10 lg:pt-12" : undefined}>
                {meta.length > 0 && (
                  <ul className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line pb-8 text-[13px] font-medium uppercase tracking-wide text-muted">
                    {meta.map((item, index) => (
                      <li key={index} className={index < meta.length - 1 ? "relative after:absolute after:-right-3.5 after:top-0 after:content-['/']" : undefined}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Content is authored exclusively by authenticated admins with
                    blog permissions via the Tiptap editor — not public user
                    input — so rendering the stored HTML directly is safe here. */}
                <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.content }} />

                {postTags.length > 0 && (
                  <div className="mt-10 flex flex-wrap items-center gap-2">
                    <span className="mr-2 label text-muted">Tags:</span>
                    {postTags.map((tag) => (
                      <Link
                        key={tag.slug}
                        href={`/blog?tag=${encodeURIComponent(tag.slug)}`}
                        className="border border-line px-3 py-1.5 text-[13px] text-espresso transition-colors hover:border-champagne hover:text-champagne"
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <PostNavigation
                previous={adjacent.previous ? { slug: adjacent.previous.slug, title: adjacent.previous.title } : null}
                next={adjacent.next ? { slug: adjacent.next.slug, title: adjacent.next.title } : null}
              />
            </article>

            <BlogSidebar recent={recent} categories={categories} tags={tags} />
          </div>
        </Container>
      </section>
    </>
  );
}
