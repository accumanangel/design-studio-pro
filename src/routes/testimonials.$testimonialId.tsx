import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { StarRating, TestimonialCard } from "@/components/testimonial-card";
import { getTestimonial, testimonialSourceLabels, testimonials } from "@/lib/testimonials";

const CONTACT_URL = "https://ixialondon.com/contact/";
const RELATED_COUNT = 3;

export const Route = createFileRoute("/testimonials/$testimonialId")({
  loader: ({ params }) => {
    const testimonial = getTestimonial(params.testimonialId);
    if (!testimonial) throw notFound();
    return { testimonial };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Testimonial not found | IXIA London" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { testimonial } = loaderData;
    const title = `${testimonial.name} | Client Testimonials | IXIA London`;
    return {
      meta: [
        { title },
        { name: "description", content: testimonial.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: testimonial.excerpt },
      ],
    };
  },
  component: TestimonialPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="font-serif text-4xl text-ink">We couldn’t find that testimonial.</h1>
      <Link
        to="/testimonials"
        className="mt-8 inline-flex min-h-11 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-accent hover:text-brand-dark"
      >
        <ArrowLeft className="size-4" aria-hidden="true" /> All testimonials
      </Link>
    </div>
  ),
});

function TestimonialPage() {
  const { testimonial } = Route.useLoaderData();
  const sourceLabel = testimonialSourceLabels[testimonial.source];
  const { project } = testimonial;

  const index = testimonials.findIndex((item) => item.id === testimonial.id);
  const related = Array.from(
    { length: Math.min(RELATED_COUNT, testimonials.length - 1) },
    (_, offset) => testimonials[(index + offset + 1) % testimonials.length],
  );

  return (
    <>
      <div className="mx-auto max-w-[1440px] px-6 pt-10 lg:px-12 lg:pt-12">
        <Link
          to="/testimonials"
          className="inline-flex min-h-11 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal/70 transition-colors hover:text-brand-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> All testimonials
        </Link>
      </div>

      <section className="mx-auto grid max-w-[1440px] gap-14 px-6 pb-20 pt-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-20 lg:px-12 lg:pb-24">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent">Client testimonial</p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.08] text-ink lg:text-5xl">{testimonial.name}</h1>
          {testimonial.affiliation && (
            <p className="mt-3 text-sm font-semibold text-charcoal/70">{testimonial.affiliation}</p>
          )}
          {testimonial.rating && <StarRating rating={testimonial.rating} className="mt-6" />}

          <figure className="mt-10 max-w-[68ch]">
            <span aria-hidden="true" className="block font-serif text-[6rem] leading-[0.7] text-brand-accent">
              “
            </span>
            <blockquote className="mt-2 space-y-6 text-base leading-8 text-charcoal/80 lg:text-[17px] lg:leading-9">
              {testimonial.review.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </blockquote>
            <figcaption className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-5">
              <div>
                <cite className="block text-sm font-semibold not-italic text-ink">{testimonial.name}</cite>
                <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-charcoal/70">
                  {sourceLabel}
                </p>
              </div>
              {testimonial.sourceUrl && (
                <a
                  href={testimonial.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-accent transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
                >
                  Read on Google
                  <span className="sr-only"> (opens in a new tab)</span>
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              )}
            </figcaption>
          </figure>
        </div>

        <aside className="self-start border border-ink/10 bg-ivory/55 p-8 lg:sticky lg:top-28 lg:p-10">
          {project ? (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent">The project</p>
              <h2 className="mt-4 font-serif text-2xl leading-snug text-ink">{project.title}</h2>
              <p className="mt-4 text-sm leading-7 text-charcoal/75">{project.summary}</p>
              <a
                href={project.url}
                className="mt-8 inline-flex min-h-11 items-center gap-3 bg-brand-accent px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
              >
                View the project <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </>
          ) : (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent">Work with IXIA</p>
              <h2 className="mt-4 font-serif text-2xl leading-snug text-ink">Start your own project</h2>
              <p className="mt-4 text-sm leading-7 text-charcoal/75">
                Tell us about your home and how you would like it to feel, and we’ll talk you
                through how the studio can help.
              </p>
              <a
                href={CONTACT_URL}
                className="mt-8 inline-flex min-h-11 items-center border border-ink px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
              >
                Contact the studio
              </a>
            </>
          )}
        </aside>
      </section>

      <section className="-mb-24 border-t border-ink/10 bg-[#fafafa]" aria-labelledby="more-testimonials">
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent">In their words</p>
              <h2 id="more-testimonials" className="mt-4 font-serif text-4xl text-ink">More kind words</h2>
            </div>
            <Link
              to="/testimonials"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
            >
              View all testimonials <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {related.map((item) => (
              <li key={item.id}>
                <TestimonialCard testimonial={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
