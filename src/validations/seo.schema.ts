import { z } from "zod";

export const seoInputSchema = z.object({
  title: z.string().trim().max(70, "SEO title must be 70 characters or fewer").optional(),
  description: z.string().trim().max(160, "SEO description must be 160 characters or fewer").optional(),
  canonical: z.string().trim().url("Canonical URL must be a full URL").optional().or(z.literal("")),
  keywords: z.array(z.string().trim()).optional(),
  ogTitle: z.string().trim().optional(),
  ogDescription: z.string().trim().optional(),
  ogImage: z.string().trim().optional(),
  robots: z.string().trim().optional(),
});

export type SeoInput = z.infer<typeof seoInputSchema>;
