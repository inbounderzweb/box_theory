import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ServiceDetailView } from "@/components/sections/ServiceDetailView";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { SERVICES } from "@/lib/content";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

function getService(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return buildMetadata(
    { canonical: `${siteConfig.url}/services/${service.slug}` },
    { title: service.title, description: service.shortDescription }
  );
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    redirect("/");
  }

  return <ServiceDetailView service={service} crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]} />;
}
