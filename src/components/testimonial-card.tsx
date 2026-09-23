import { ExternalLink, Star } from "lucide-react";
import { testimonialSourceLabels, type Testimonial } from "@/lib/testimonials";

const MAX_STARS = 5;

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
    <figure className="flex h-full flex-col border border-ink/10 bg-white p-8 lg:p-10">
      <StarRating rating={testimonial.rating} />
      <blockquote className="mt-6 flex-1 text-[15px] leading-7 text-charcoal/80">
        <p>“{testimonial.excerpt}”</p>
      </blockquote>
      <figcaption className="mt-8 flex items-end justify-between gap-4 border-t border-ink/10 pt-5">
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
            aria-label={`Read ${testimonial.name}'s full ${sourceLabel} (opens in a new tab)`}
            className="grid size-11 shrink-0 place-items-center text-charcoal/60 transition-colors hover:text-brand-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
          >
            <ExternalLink className="size-4" strokeWidth={1.6} aria-hidden="true" />
          </a>
        )}
      </figcaption>
    </figure>
  );
}
