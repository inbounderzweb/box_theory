"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/dal";
import { can } from "@/lib/permissions";
import { isObjectId } from "@/lib/utils";
import { blogPostInputSchema, type BlogPostInput } from "@/validations/blog.schema";
import * as blogService from "@/services/blog.service";
import { logAction } from "@/services/audit.service";
import type { ContentStatus } from "@/lib/constants";

/** The raw text fields as submitted, echoed back so a failed save keeps the editor's input. */
export type BlogFormValues = Record<
  | "title"
  | "slug"
  | "excerpt"
  | "authorName"
  | "publishedAt"
  | "status"
  | "seoTitle"
  | "seoDescription"
  | "seoCanonical"
  | "seoKeywords"
  | "seoOgImage",
  string
>;

export type BlogFormState = {
  errors?: Partial<Record<keyof BlogPostInput, string[]>>;
  message?: string;
  values?: BlogFormValues;
} | undefined;

function text(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "");
}

function readFormValues(formData: FormData): BlogFormValues {
  return {
    title: text(formData, "title"),
    slug: text(formData, "slug"),
    excerpt: text(formData, "excerpt"),
    authorName: text(formData, "authorName"),
    publishedAt: text(formData, "publishedAt"),
    status: text(formData, "status"),
    seoTitle: text(formData, "seoTitle"),
    seoDescription: text(formData, "seoDescription"),
    seoCanonical: text(formData, "seoCanonical"),
    seoKeywords: text(formData, "seoKeywords"),
    seoOgImage: text(formData, "seoOgImage"),
  };
}

function buildInputFromFormData(formData: FormData) {
  const keywordsRaw = String(formData.get("seoKeywords") ?? "");
  return {
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt") || undefined,
    content: formData.get("content"),
    featuredImage: formData.get("featuredImage") || undefined,
    authorName: formData.get("authorName") || undefined,
    publishedAt: formData.get("publishedAt") || undefined,
    // A disabled (but selected) option is not submitted; let the schema default apply.
    status: formData.get("status") ?? undefined,
    seo: {
      title: formData.get("seoTitle") || undefined,
      description: formData.get("seoDescription") || undefined,
      canonical: formData.get("seoCanonical") || undefined,
      keywords: keywordsRaw
        ? keywordsRaw.split(",").map((k) => k.trim()).filter(Boolean)
        : undefined,
      ogImage: formData.get("seoOgImage") || undefined,
    },
  };
}

const SLUG_TAKEN = "This slug is already used by another post.";

function isDuplicateKeyError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === 11000;
}

function revalidateBlogPages(...slugs: (string | null | undefined)[]) {
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  for (const slug of new Set(slugs)) {
    if (slug) revalidatePath(`/blog/${slug}`);
  }
}

export async function createBlogPostAction(_prev: BlogFormState, formData: FormData): Promise<BlogFormState> {
  const user = await getCurrentUser();
  const values = readFormValues(formData);
  if (!can(user.role, "create", "blog")) {
    return { message: "You do not have permission to create blog posts.", values };
  }

  const validated = blogPostInputSchema.safeParse(buildInputFromFormData(formData));
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors, values };
  }

  if (validated.data.status === "PUBLISHED" && !can(user.role, "publish", "blog")) {
    return { message: "You do not have permission to publish directly. Save as draft instead.", values };
  }

  if (await blogService.isBlogSlugTaken(validated.data.slug)) {
    return { errors: { slug: [SLUG_TAKEN] }, values };
  }

  let post;
  try {
    post = await blogService.createBlogPost(validated.data, user.id);
  } catch (error) {
    // Two saves racing past the check above still hit the unique index.
    if (isDuplicateKeyError(error)) return { errors: { slug: [SLUG_TAKEN] }, values };
    throw error;
  }

  await logAction({ userId: user.id, action: "CREATE", entity: "BlogPost", entityId: post._id.toString() });
  revalidateBlogPages(post.slug);
  redirect("/admin/blog");
}

export async function updateBlogPostAction(
  id: string,
  _prev: BlogFormState,
  formData: FormData
): Promise<BlogFormState> {
  const user = await getCurrentUser();
  const values = readFormValues(formData);
  if (!can(user.role, "update", "blog")) {
    return { message: "You do not have permission to edit blog posts.", values };
  }
  if (!isObjectId(id)) {
    return { message: "Blog post not found.", values };
  }

  const validated = blogPostInputSchema.safeParse(buildInputFromFormData(formData));
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors, values };
  }

  const existing = await blogService.getBlogPostByIdAdmin(id);
  if (!existing) {
    return { message: "Blog post not found.", values };
  }

  // Publishing — or editing a post that is already live — needs publish rights,
  // otherwise an editor could change public content without review.
  if (
    (validated.data.status === "PUBLISHED" || existing.status === "PUBLISHED") &&
    !can(user.role, "publish", "blog")
  ) {
    return { message: "You do not have permission to publish or edit published posts.", values };
  }

  if (await blogService.isBlogSlugTaken(validated.data.slug, id)) {
    return { errors: { slug: [SLUG_TAKEN] }, values };
  }

  let updated;
  try {
    updated = await blogService.updateBlogPost(id, validated.data, user.id);
  } catch (error) {
    if (isDuplicateKeyError(error)) return { errors: { slug: [SLUG_TAKEN] }, values };
    throw error;
  }
  if (!updated) {
    return { message: "Blog post not found.", values };
  }

  await logAction({ userId: user.id, action: "UPDATE", entity: "BlogPost", entityId: id });
  // A slug change leaves the old URL cached until it is revalidated too.
  revalidateBlogPages(existing.slug, updated.slug);
  redirect("/admin/blog");
}

export async function setBlogPostStatusAction(id: string, status: ContentStatus) {
  const user = await getCurrentUser();
  // Every status change moves a post on or off the public site.
  if (!can(user.role, "publish", "blog")) {
    throw new Error("You do not have permission to change this post's status.");
  }
  if (!isObjectId(id)) {
    throw new Error("Blog post not found.");
  }

  const updated = await blogService.setBlogPostStatus(id, status, user.id);
  if (!updated) {
    throw new Error("Blog post not found.");
  }

  await logAction({
    userId: user.id,
    action: status === "PUBLISHED" ? "PUBLISH" : status === "ARCHIVED" ? "ARCHIVE" : "UNPUBLISH",
    entity: "BlogPost",
    entityId: id,
  });
  revalidateBlogPages(updated.slug);
  revalidatePath("/admin/blog");
  revalidatePath(`/admin/blog/${id}/edit`);
}

export async function deleteBlogPostAction(id: string) {
  const user = await getCurrentUser();
  if (!can(user.role, "delete", "blog")) {
    throw new Error("You do not have permission to delete blog posts.");
  }
  if (!isObjectId(id)) {
    throw new Error("Blog post not found.");
  }

  const deleted = await blogService.deleteBlogPost(id);
  if (deleted) {
    await logAction({ userId: user.id, action: "DELETE", entity: "BlogPost", entityId: id });
  }
  revalidateBlogPages(deleted?.slug);
  redirect("/admin/blog");
}
