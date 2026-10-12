"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { CONTENT_STATUSES } from "@/lib/constants";
import { slugify } from "@/lib/utils";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { MediaPicker } from "@/components/admin/media-picker";
import type { MediaItem } from "@/types/media";
import type { BlogFormState } from "./actions";
import { PublishDateField } from "./publish-date-field";

export type BlogFormAction = (state: BlogFormState, formData: FormData) => Promise<BlogFormState>;

export type BlogFormDefaults = {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featuredImage?: MediaItem | null;
  authorName?: string;
  /** ISO string. */
  publishedAt?: string;
  status?: string;
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
    keywords?: string[];
    ogImage?: string;
  };
};

const STATUS_LABELS: Record<string, string> = { DRAFT: "Draft", PUBLISHED: "Published", ARCHIVED: "Archived" };

export function BlogForm({
  action,
  defaultValues,
  submitLabel,
  canPublish,
}: {
  action: BlogFormAction;
  defaultValues?: BlogFormDefaults;
  submitLabel: string;
  canPublish: boolean;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  // After a rejected save React resets uncontrolled fields to their
  // defaultValue, so feed the submitted values back in as the new defaults.
  const submitted = state?.values;

  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [slug, setSlug] = useState(defaultValues?.slug ?? "");
  // New posts derive the slug from the title until it is edited by hand;
  // existing posts never change URL behind the editor's back.
  const [slugEdited, setSlugEdited] = useState(Boolean(defaultValues?.slug));
  const [excerptLength, setExcerptLength] = useState((defaultValues?.excerpt ?? "").length);

  const errors = state?.errors;

  return (
    <form action={formAction} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]" noValidate>
      <div className="flex min-w-0 flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            value={title}
            required
            maxLength={200}
            onChange={(event) => {
              setTitle(event.target.value);
              if (!slugEdited) setSlug(slugify(event.target.value));
            }}
            className="rounded border border-neutral-300 px-3 py-2"
          />
          {errors?.title && <p className="text-sm text-red-600">{errors.title[0]}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="slug" className="text-sm font-medium">
            Slug
          </label>
          <div className="flex items-center rounded border border-neutral-300 focus-within:ring-2 focus-within:ring-neutral-300">
            <span className="select-none pl-3 text-sm text-neutral-400">/blog/</span>
            <input
              id="slug"
              name="slug"
              value={slug}
              required
              maxLength={120}
              onChange={(event) => {
                setSlugEdited(true);
                setSlug(event.target.value.toLowerCase());
              }}
              onBlur={() => setSlug((current) => slugify(current))}
              className="min-w-0 flex-1 rounded px-1 py-2 focus:outline-none"
            />
          </div>
          {errors?.slug && <p className="text-sm text-red-600">{errors.slug[0]}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="excerpt" className="text-sm font-medium">
            Short description
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={3}
            maxLength={300}
            defaultValue={submitted?.excerpt ?? defaultValues?.excerpt}
            onChange={(event) => setExcerptLength(event.target.value.length)}
            className="rounded border border-neutral-300 px-3 py-2"
          />
          <p className="text-xs text-neutral-500">
            Shown on the blog listing cards and used as the meta description fallback · {excerptLength}/300
          </p>
          {errors?.excerpt && <p className="text-sm text-red-600">{errors.excerpt[0]}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Content</span>
          <RichTextEditor name="content" initialContent={defaultValues?.content} placeholder="Write your post…" />
          {errors?.content && <p className="text-sm text-red-600">{errors.content[0]}</p>}
        </div>

        <fieldset className="flex flex-col gap-3 rounded border border-neutral-200 p-4">
          <legend className="px-1 text-sm font-medium">SEO</legend>
          <p className="text-xs text-neutral-500">
            Optional. Empty fields fall back to the post title, short description, and featured image.
          </p>
          <Field label="SEO Title" name="seoTitle" maxLength={70} defaultValue={submitted?.seoTitle ?? defaultValues?.seo?.title} />
          <Field
            label="SEO Description"
            name="seoDescription"
            maxLength={160}
            defaultValue={submitted?.seoDescription ?? defaultValues?.seo?.description}
          />
          <Field label="Canonical URL" name="seoCanonical" defaultValue={submitted?.seoCanonical ?? defaultValues?.seo?.canonical} />
          <Field
            label="Keywords (comma separated)"
            name="seoKeywords"
            defaultValue={submitted?.seoKeywords ?? defaultValues?.seo?.keywords?.join(", ")}
          />
          <Field label="OG Image URL" name="seoOgImage" defaultValue={submitted?.seoOgImage ?? defaultValues?.seo?.ogImage} />
          {errors?.seo && <p className="text-sm text-red-600">{errors.seo[0]}</p>}
        </fieldset>
      </div>

      <aside className="flex flex-col gap-5 lg:sticky lg:top-6 lg:self-start">
        <div className="flex flex-col gap-4 rounded border border-neutral-200 bg-white p-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="status" className="text-sm font-medium">
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={submitted?.status ?? defaultValues?.status ?? "DRAFT"}
              className="rounded border border-neutral-300 px-3 py-2"
            >
              {CONTENT_STATUSES.map((status) => (
                <option key={status} value={status} disabled={status === "PUBLISHED" && !canPublish}>
                  {STATUS_LABELS[status] ?? status}
                </option>
              ))}
            </select>
            {!canPublish && (
              <p className="text-xs text-neutral-500">Your role can save drafts; an admin publishes them.</p>
            )}
          </div>

          <PublishDateField
            name="publishedAt"
            defaultValue={submitted?.publishedAt ?? defaultValues?.publishedAt}
            error={errors?.publishedAt}
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="authorName" className="text-sm font-medium">
              Author
            </label>
            <input
              id="authorName"
              name="authorName"
              maxLength={100}
              defaultValue={submitted?.authorName ?? defaultValues?.authorName}
              className="rounded border border-neutral-300 px-3 py-2"
            />
            {errors?.authorName && <p className="text-sm text-red-600">{errors.authorName[0]}</p>}
          </div>

          {state?.message && (
            <p role="alert" className="text-sm text-red-600">
              {state.message}
            </p>
          )}
          {errors && !state?.message && (
            <p role="alert" className="text-sm text-red-600">
              Please fix the highlighted fields.
            </p>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={pending}
              className="rounded bg-neutral-900 px-4 py-2 text-white disabled:opacity-60"
            >
              {pending ? "Saving…" : submitLabel}
            </button>
            <Link href="/admin/blog" className="text-sm text-neutral-600 underline">
              Cancel
            </Link>
          </div>
        </div>

        <div className="rounded border border-neutral-200 bg-white p-4">
          <MediaPicker
            name="featuredImage"
            label="Featured Image"
            folder="blog"
            initial={defaultValues?.featuredImage ?? null}
          />
          {errors?.featuredImage && <p className="mt-2 text-sm text-red-600">{errors.featuredImage[0]}</p>}
        </div>
      </aside>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  error,
  maxLength,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  error?: string[];
  maxLength?: number;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        defaultValue={defaultValue}
        maxLength={maxLength}
        className="rounded border border-neutral-300 px-3 py-2"
      />
      {error && <p className="text-sm text-red-600">{error[0]}</p>}
    </div>
  );
}
