import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { listPublishedPages } from "@/services/page.service";
import { listPublishedBlogSlugs } from "@/services/blog.service";
import { SERVICES } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: new Date() },
    { url: `${siteConfig.url}/about`, lastModified: new Date() },
    { url: `${siteConfig.url}/services`, lastModified: new Date() },
    ...SERVICES.map((service) => ({
      url: `${siteConfig.url}/services/${service.slug}`,
      lastModified: new Date(),
    })),
    { url: `${siteConfig.url}/industries`, lastModified: new Date() },
    { url: `${siteConfig.url}/portfolio`, lastModified: new Date() },
    { url: `${siteConfig.url}/future-solutions`, lastModified: new Date() },
    { url: `${siteConfig.url}/blog`, lastModified: new Date() },
    { url: `${siteConfig.url}/contact`, lastModified: new Date() },
  ];

  try {
    const [pages, posts] = await Promise.all([listPublishedPages(), listPublishedBlogSlugs()]);

    const pageRoutes: MetadataRoute.Sitemap = pages.map((page) => ({
      url: `${siteConfig.url}/${page.slug}`,
      lastModified: page.updatedAt,
    }));

    const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: post.updatedAt,
    }));

    return [...staticRoutes, ...pageRoutes, ...blogRoutes];
  } catch (error) {
    console.error("Failed to build sitemap from database", error);
    return staticRoutes;
  }
}
