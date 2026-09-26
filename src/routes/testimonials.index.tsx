import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { TestimonialCard } from "@/components/testimonial-card";
import { testimonials } from "@/lib/testimonials";

const CONTACT_URL = "https://ixialondon.com/contact/";

export const Route = createFileRoute("/testimonials/")({
  head: () => ({
    meta: [
      { title: "Client Testimonials | IXIA London" },
      {
        name: "description",
        content: "Read what clients and creative partners say about working with IXIA London.",
      },
      { property: "og:title", content: "Client Testimonials | IXIA London" },
      {
        property: "og:description",
        content: "Read what clients and creative partners say about working with IXIA London.",
      },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  return (
    <>
      <section className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-24" aria-labelledby="client-reviews">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent">In their words</p>
          <h1 id="client-reviews" className="mt-4 font-serif text-4xl leading-tight text-ink">
            Kind words from clients and collaborators.
          </h1>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((testimonial) => (
            <li key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </li>
          ))}
        </ul>
      </section>

      <section className="-mb-24 border-t border-ink/10 bg-[#fafafa]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 text-center lg:px-12 lg:py-24">
          <h2 className="mx-auto max-w-2xl font-serif text-4xl leading-tight text-ink">
            Create a home that feels entirely yours
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-charcoal/75">
            The same care our clients describe goes into every IXIA piece — furniture designed by
            an interior studio and made to order for the rooms it will live in.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              className="inline-flex min-h-11 items-center gap-3 bg-brand-accent px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
            >
              Explore the collection <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href={CONTACT_URL}
              className="inline-flex min-h-11 items-center border border-ink px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
            >
              Contact the studio
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
