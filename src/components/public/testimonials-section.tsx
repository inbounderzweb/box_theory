import Image from "next/image";
import { listActiveTestimonials } from "@/services/testimonial.service";
import { asPopulatedMedia } from "@/types/media";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** Renders nothing until real testimonials exist in the CMS — no placeholder quotes. */
export async function TestimonialsSection() {
  const testimonials = await listActiveTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <section className="bg-ivory py-24 lg:py-32">
      <Container size="wide">
        <Eyebrow>Testimonials</Eyebrow>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => {
            const image = asPopulatedMedia(testimonial.image);
            return (
              <figure key={testimonial._id.toString()} className="flex flex-col gap-5 border border-line bg-white p-8">
                {testimonial.rating ? (
                  <div aria-label={`${testimonial.rating} out of 5 stars`} className="text-champagne">
                    {"★".repeat(testimonial.rating)}
                    <span className="text-line">{"★".repeat(5 - testimonial.rating)}</span>
                  </div>
                ) : null}
                <blockquote className="text-[15px] leading-[24px] text-espresso">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                <figcaption className="mt-auto flex items-center gap-3">
                  {image && (
                    <Image
                      src={image.secureUrl}
                      alt={image.altText ?? testimonial.authorName}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="text-[14px] font-medium text-espresso">{testimonial.authorName}</p>
                    {(testimonial.authorRole || testimonial.company) && (
                      <p className="text-[13px] text-muted">
                        {[testimonial.authorRole, testimonial.company].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
