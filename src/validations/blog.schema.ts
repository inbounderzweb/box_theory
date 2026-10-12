import { z } from "zod";
import { CONTENT_STATUSES } from "@/lib/constants";
import { seoInputSchema } from "@/validations/seo.schema";

/**
 * Tiptap serialises an empty editor as `<p></p>`, which would satisfy a plain
 * length check — require visible text or at least one embedded image.
 */
function hasMeaningfulContent(html: string): boolean {
  if (/<img\b/i.test(html)) return true;
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim().length > 0;
}

export const blogPostInputSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200, "Title must be 200 characters or fewer"),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(120, "Slug must be 120 characters or fewer")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase, alphanumeric, and hyphen-separated"),
  excerpt: z.string().trim().max(300, "Short description must be 300 characters or fewer").optional(),
  content: z.string().refine(hasMeaningfulContent, "Content is required"),
  featuredImage: z
    .string()
    .trim()
    .regex(/^[a-f\d]{24}$/i, "Select a valid image from the media library")
    .optional(),
  authorName: z.string().trim().max(100, "Author must be 100 characters or fewer").optional(),
  publishedAt: z.coerce.date({ error: "Enter a valid publication date" }).optional(),
  status: z.enum(CONTENT_STATUSES).default("DRAFT"),
  seo: seoInputSchema.optional(),
});

export type BlogPostInput = z.infer<typeof blogPostInputSchema>;
