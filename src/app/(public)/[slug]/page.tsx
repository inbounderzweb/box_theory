import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedPageBySlug } from "@/services/page.service";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPublishedPageBySlug(slug).catch(() => null);
  if (!page) return {};

  return buildMetadata(
    { ...page.seo, canonical: page.seo?.canonical || `${siteConfig.url}/${page.slug}` },
    { title: page.title, description: page.excerpt ?? undefined }
  );
}

export default async function CmsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPublishedPageBySlug(slug).catch(() => null);

  if (!page) {
    notFound();
  }

  return (
    <>
      <PageHero eyebrow="Box Theory" heading={page.title} />
      <section className="bg-ivory pb-24 lg:pb-32">
        <Container>
          {/* Content is authored exclusively by authenticated admins with
              pages permissions, not public user input, so rendering the
              stored HTML directly is safe here. */}
          <div className="blog-prose max-w-none" dangerouslySetInnerHTML={{ __html: page.content }} />
        </Container>
      </section>
    </>
  );
}
