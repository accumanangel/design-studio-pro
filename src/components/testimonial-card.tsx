import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ExternalLink, Star } from "lucide-react";
import { testimonialSourceLabels, type Testimonial } from "@/lib/testimonials";

const MAX_STARS = 5;

const cardLinkClassName =
  "inline-flex min-h-11 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-accent transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent";

export function StarRating({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`${rating} out of ${MAX_STARS} stars`}
      className={`flex items-center gap-1 text-brand-accent ${className}`}
    >
      {Array.from({ length: MAX_STARS }, (_, index) => {
        const filled = index < rating;
        return (
          <Star
            key={index}
            aria-hidden="true"
            className={`size-4 ${filled ? "" : "text-charcoal/30"}`}
            strokeWidth={1.4}
            fill={filled ? "currentColor" : "none"}
          />
        );
      })}
    </div>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const sourceLabel = testimonialSourceLabels[testimonial.source];

  return (
    <article className="flex h-full flex-col border border-ink/10 bg-white p-8 lg:p-10">
      <figure className="flex flex-1 flex-col">
        {testimonial.rating && <StarRating rating={testimonial.rating} className="mb-6" />}
        <blockquote className="flex-1 text-[15px] leading-7 text-charcoal/80">
          <p>“{testimonial.excerpt}”</p>
        </blockquote>
        <figcaption className="mt-8 flex items-end justify-between gap-4 border-t border-ink/10 pt-5">
          <div>
            <cite className="block text-sm font-semibold not-italic text-ink">{testimonial.name}</cite>
            <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-charcoal/70">
              {testimonial.affiliation ? `${testimonial.affiliation} · ${sourceLabel}` : sourceLabel}
            </p>
          </div>
          {testimonial.sourceUrl && (
            <a
              href={testimonial.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read ${testimonial.name}'s original ${sourceLabel} (opens in a new tab)`}
              className="grid size-11 shrink-0 place-items-center text-charcoal/60 transition-colors hover:text-brand-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
            >
              <ExternalLink className="size-4" strokeWidth={1.6} aria-hidden="true" />
            </a>
          )}
        </figcaption>
      </figure>

      <div className="mt-4 flex flex-wrap gap-x-6">
        <Link
          to="/testimonials/$testimonialId"
          params={{ testimonialId: testimonial.id }}
          className={cardLinkClassName}
        >
          Read the review
          <span className="sr-only"> from {testimonial.name}</span>
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
        {testimonial.project && (
          <a href={testimonial.project.url} className={cardLinkClassName}>
            View the project
            <span className="sr-only">: {testimonial.project.title}</span>
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}
