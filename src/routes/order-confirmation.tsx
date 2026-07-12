import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/order-confirmation")({
  head: () => ({
    meta: [
      { title: "Order confirmed — IXIA London" },
      { name: "description", content: "Thank you for your IXIA London order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <section className="mx-auto max-w-2xl px-6 lg:px-12 py-32 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-taupe">Order confirmed</p>
      <h1 className="mt-6 font-serif text-5xl leading-[1.05]">
        Thank you. Your piece is now with the workshop.
      </h1>
      <p className="mt-6 text-charcoal/75 leading-relaxed">
        A confirmation is on its way to your inbox. A member of the studio will be in touch to
        schedule white-glove delivery once your piece is complete.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="border border-ink px-8 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-ink hover:text-background transition-colors"
        >
          Return home
        </Link>
        <Link
          to="/shop/bedside-tables"
          className="border border-ink/20 px-8 py-4 text-[11px] uppercase tracking-[0.25em] hover:border-ink transition-colors"
        >
          Continue exploring
        </Link>
      </div>
    </section>
  ),
});
