import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
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
    notFound();
  }

  return (
    <>
      <PageHero eyebrow="Service Detail" />

      <section className="bg-ivory pb-24 lg:pb-32">
        <Container>
          <Reveal className="max-w-2xl">
            <ul className="mt-6 flex flex-col gap-4 border-t border-line pt-6">
              {service.whatItIncludes.map((item) => (
                <li key={item} className="flex items-start gap-3 py-2" aria-hidden>
                  <span className="h-px w-5 shrink-0 bg-champagne" />
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
