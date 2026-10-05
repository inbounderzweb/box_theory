import type { Metadata } from "next";
import { ServiceDetailView } from "@/components/sections/ServiceDetailView";
import { SERVICES } from "@/lib/content";

export const metadata: Metadata = { title: "Services" };

// /services opens on the first service; the sidebar links to the rest.
export default function Page() {
  return <ServiceDetailView service={SERVICES[0]} bannerTitle="Our Services" crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]} />;
}
