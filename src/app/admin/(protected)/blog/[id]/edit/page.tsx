import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostByIdAdmin } from "@/services/blog.service";
import { getCurrentUser } from "@/lib/dal";
import { can } from "@/lib/permissions";
import { isObjectId } from "@/lib/utils";
import { asPopulatedAuthor } from "@/types/blog";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { BlogForm, type BlogFormDefaults } from "../../blog-form";
import { updateBlogPostAction, setBlogPostStatusAction, deleteBlogPostAction } from "../../actions";

export const metadata: Metadata = { title: "Edit Blog Post" };

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isObjectId(id)) notFound();

  const [user, post] = await Promise.all([getCurrentUser(), getBlogPostByIdAdmin(id)]);

  if (!post || !can(user.role, "read", "blog")) {
    notFound();
  }

  const boundUpdate = updateBlogPostAction.bind(null, id);
  const canPublish = can(user.role, "publish", "blog");
  const canDelete = can(user.role, "delete", "blog");
  const isLive = post.status === "PUBLISHED" && !!post.publishedAt && post.publishedAt <= new Date();

  const featuredImage =
    post.featuredImage && typeof post.featuredImage === "object" && "secureUrl" in post.featuredImage
      ? JSON.parse(JSON.stringify(post.featuredImage))
      : null;

  const defaultValues: BlogFormDefaults = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? undefined,
    content: post.content,
    featuredImage,
    authorName: post.authorName || asPopulatedAuthor(post.author)?.name || undefined,
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : undefined,
    status: post.status,
    seo: post.seo
      ? {
          title: post.seo.title ?? undefined,
          description: post.seo.description ?? undefined,
          canonical: post.seo.canonical ?? undefined,
          keywords: post.seo.keywords ?? undefined,
          ogImage: post.seo.ogImage ?? undefined,
        }
      : undefined,
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-neutral-900">Edit Blog Post</h1>
        <div className="flex flex-wrap items-center gap-2">
          {isLive && (
            <Link
              href={`/blog/${post.slug}`}
              target="_blank"
              className="rounded border border-neutral-300 px-3 py-1.5 text-sm hover:bg-neutral-50"
            >
              View live
            </Link>
          )}
          <Link
            href={`/admin/blog/${id}/preview`}
            className="rounded border border-neutral-300 px-3 py-1.5 text-sm hover:bg-neutral-50"
          >
            Preview
          </Link>
          {canPublish && post.status !== "PUBLISHED" && (
            <form action={setBlogPostStatusAction.bind(null, id, "PUBLISHED")}>
              <button type="submit" className="rounded bg-green-600 px-3 py-1.5 text-sm text-white">
                Publish
              </button>
            </form>
          )}
          {canPublish && post.status === "PUBLISHED" && (
            <form action={setBlogPostStatusAction.bind(null, id, "DRAFT")}>
              <button type="submit" className="rounded bg-yellow-600 px-3 py-1.5 text-sm text-white">
                Unpublish
              </button>
            </form>
          )}
          {canPublish && post.status !== "ARCHIVED" && (
            <form action={setBlogPostStatusAction.bind(null, id, "ARCHIVED")}>
              <button type="submit" className="rounded bg-neutral-600 px-3 py-1.5 text-sm text-white">
                Archive
              </button>
            </form>
          )}
          {canDelete && (
            <form action={deleteBlogPostAction.bind(null, id)}>
              <ConfirmSubmitButton
                message={`Delete “${post.title}”? This cannot be undone.`}
                className="rounded bg-red-600 px-3 py-1.5 text-sm text-white"
              >
                Delete
              </ConfirmSubmitButton>
            </form>
          )}
        </div>
      </div>

      {post.status === "PUBLISHED" && !canPublish && (
        <p className="rounded border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          This post is live. Only an admin can change published posts.
        </p>
      )}

      <BlogForm action={boundUpdate} submitLabel="Save Changes" defaultValues={defaultValues} canPublish={canPublish} />
    </div>
  );
}
