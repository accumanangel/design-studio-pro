import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/request-a-quote")({
  head: () => ({
    meta: [
      { title: "Request a quote — IXIA London" },
      {
        name: "description",
        content: "Enquire about a bespoke IXIA London piece — outside standard configurations.",
      },
    ],
  }),
  component: QuotePage,
});

function QuotePage() {
  const [sent, setSent] = useState(false);
  const handle = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="mx-auto max-w-[1440px] px-6 lg:px-12 py-20 grid gap-16 lg:grid-cols-[1fr_1fr]">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-taupe">Bespoke</p>
        <h1 className="mt-4 font-serif text-5xl lg:text-6xl leading-[1.03]">
          Request a bespoke quote.
        </h1>
        <p className="mt-6 text-charcoal/75 leading-relaxed max-w-lg">
          For configurations outside the standard collection — a different size, a specified
          colour, a matched pair for either side of the bed — send us a note. We reply within
          two working days.
        </p>
      </div>

      {sent ? (
        <div className="border border-ink/10 p-10 bg-ivory/40">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-taupe">Received</p>
          <h2 className="mt-4 font-serif text-3xl">Thank you.</h2>
          <p className="mt-4 text-charcoal/75 leading-relaxed">
            A member of the studio will be in touch shortly with your bespoke quote.
          </p>
        </div>
      ) : (
        <form onSubmit={handle} className="space-y-5 border border-ink/10 p-10">
          <Field label="Full name" name="name" required />
          <Field label="Email" type="email" name="email" required />
          <Field label="Piece of interest" name="piece" placeholder="e.g. The Alcott, master suite" />
          <div>
            <label className="block">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-2">
                What would you like us to make?
              </span>
              <textarea
                required
                rows={5}
                className="w-full bg-transparent border-b border-ink/15 py-2 text-sm focus:border-ink focus:outline-none resize-none"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-olive text-background py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-charcoal transition-colors"
          >
            Send enquiry
          </button>
        </form>
      )}
    </section>
  );
}

function Field({ label, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-2">
        {label}
      </span>
      <input
        {...rest}
        className="w-full bg-transparent border-b border-ink/15 py-2 text-sm placeholder:text-taupe/50 focus:border-ink focus:outline-none"
      />
    </label>
  );
}
