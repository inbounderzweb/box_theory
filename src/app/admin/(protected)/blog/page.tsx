import type { Metadata } from "next";
import Link from "next/link";
import { listBlogPostsAdmin } from "@/services/blog.service";
import { getCurrentUser } from "@/lib/dal";
import { can } from "@/lib/permissions";
import { CONTENT_STATUSES, type ContentStatus } from "@/lib/constants";
import { deleteBlogPostAction, setBlogPostStatusAction } from "./actions";
import { asPopulatedMedia } from "@/types/media";
import { asPopulatedAuthor } from "@/types/blog";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { BlogImageViewer } from "./blog-image-viewer";

export const metadata: Metadata = { title: "Blog" };

const STATUS_LABELS: Record<string, string> = { DRAFT: "Draft", PUBLISHED: "Published", ARCHIVED: "Archived" };

function parseStatus(value: string | undefined): ContentStatus | undefined {
  return CONTENT_STATUSES.includes(value as ContentStatus) ? (value as ContentStatus) : undefined;
}

function pageHref(page: number, params: { status?: string; search?: string }) {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.status) query.set("status", params.status);
  if (page > 1) query.set("page", String(page));
  const search = query.toString();
  return search ? `/admin/blog?${search}` : "/admin/blog";
}

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string; search?: string }>;
}) {
  const params = await searchParams;
  const status = parseStatus(params.status);
  const [user, result] = await Promise.all([
    getCurrentUser(),
    listBlogPostsAdmin({
      page: params.page,
      status,
      search: params.search,
    }),
  ]);

  const canCreate = can(user.role, "create", "blog");
  const canDelete = can(user.role, "delete", "blog");
  const canPublish = can(user.role, "publish", "blog");
  const now = new Date();
  const filters = { status, search: params.search };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900">Blog</h1>
        {canCreate && (
          <Link href="/admin/blog/new" className="rounded bg-neutral-900 px-4 py-2 text-sm text-white">
            New Post
          </Link>
        )}
      </div>

      <form method="get" className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          name="search"
          defaultValue={params.search}
          placeholder="Search by title…"
          className="rounded border border-neutral-300 px-3 py-2 text-sm"
        />
        <select
          name="status"
          defaultValue={status ?? ""}
          className="rounded border border-neutral-300 px-3 py-2 text-sm"
        >
          <option value="">All statuses</option>
          {CONTENT_STATUSES.map((value) => (
            <option key={value} value={value}>
              {STATUS_LABELS[value] ?? value}
            </option>
          ))}
        </select>
        <button type="submit" className="rounded border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-50">
          Filter
        </button>
        {(status || params.search) && (
          <Link href="/admin/blog" className="text-sm text-neutral-600 underline">
            Clear
          </Link>
        )}
      </form>

      <div className="overflow-x-auto rounded border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-500">
            <tr>
              <th className="p-3 font-medium">Image</th>
              <th className="p-3 font-medium">Title</th>
              <th className="p-3 font-medium">Author</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Published</th>
              <th className="p-3 font-medium">Updated</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {result.items.length === 0 && (
              <tr>
                <td colSpan={7} className="p-4 text-neutral-500">
                  {status || params.search ? "No posts match these filters." : "No blog posts yet."}
                </td>
              </tr>
            )}
            {result.items.map((item) => {
              const id = item._id.toString();
              const image = asPopulatedMedia(item.featuredImage);
              const author = item.authorName || asPopulatedAuthor(item.author)?.name;
              const isScheduled = item.status === "PUBLISHED" && !!item.publishedAt && item.publishedAt > now;
              const isLive = item.status === "PUBLISHED" && !isScheduled;
              return (
                <tr key={id}>
                  <td className="p-3">
                    <BlogImageViewer image={image ? { secureUrl: image.secureUrl, altText: image.altText } : null} title={item.title} />
                  </td>
                  <td className="max-w-xs p-3">
                    <Link href={`/admin/blog/${id}/edit`} className="font-medium text-neutral-900 hover:underline">
                      {item.title}
                    </Link>
                    <p className="truncate text-xs text-neutral-500">/blog/{item.slug}</p>
                  </td>
                  <td className="p-3 text-neutral-600">{author ?? "—"}</td>
                  <td className="p-3">
                    <StatusBadge status={isScheduled ? "SCHEDULED" : item.status} />
                  </td>
                  <td className="whitespace-nowrap p-3 text-neutral-500">
                    {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="whitespace-nowrap p-3 text-neutral-500">{new Date(item.updatedAt).toLocaleDateString()}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      {isLive && (
                        <Link href={`/blog/${item.slug}`} target="_blank" className="text-neutral-700 underline">
                          View
                        </Link>
                      )}
                      <Link href={`/admin/blog/${id}/preview`} className="text-neutral-700 underline">
                        Preview
                      </Link>
                      <Link href={`/admin/blog/${id}/edit`} className="text-neutral-700 underline">
                        Edit
                      </Link>
                      {canPublish && item.status !== "PUBLISHED" && (
                        <form action={setBlogPostStatusAction.bind(null, id, "PUBLISHED")}>
                          <button type="submit" className="text-green-700 underline">
                            Publish
                          </button>
                        </form>
                      )}
                      {canPublish && item.status === "PUBLISHED" && (
                        <form action={setBlogPostStatusAction.bind(null, id, "DRAFT")}>
                          <button type="submit" className="text-yellow-700 underline">
                            Unpublish
                          </button>
                        </form>
                      )}
                      {canDelete && (
                        <form action={deleteBlogPostAction.bind(null, id)}>
                          <ConfirmSubmitButton
                            message={`Delete “${item.title}”? This cannot be undone.`}
                            className="text-red-600 underline"
                          >
                            Delete
                          </ConfirmSubmitButton>
                        </form>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-neutral-500">
        <span>
          Page {result.page} of {result.pages} · {result.total} total
        </span>
        <div className="flex gap-2">
          {result.page > 1 && (
            <Link href={pageHref(result.page - 1, filters)} className="underline">
              Previous
            </Link>
          )}
          {result.page < result.pages && (
            <Link href={pageHref(result.page + 1, filters)} className="underline">
              Next
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const labels: Record<string, string> = { ...STATUS_LABELS, SCHEDULED: "Scheduled" };
  const colors: Record<string, string> = {
    PUBLISHED: "bg-green-100 text-green-800",
    SCHEDULED: "bg-blue-100 text-blue-800",
    DRAFT: "bg-yellow-100 text-yellow-800",
    ARCHIVED: "bg-neutral-200 text-neutral-700",
  };
  return <span className={`rounded px-2 py-1 text-xs font-medium ${colors[status] ?? ""}`}>{labels[status] ?? status}</span>;
}
