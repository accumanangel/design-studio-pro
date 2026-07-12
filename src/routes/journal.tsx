import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — IXIA London" },
      { name: "description", content: "Dispatches from the IXIA London studio — process, projects, and inspirations." },
    ],
  }),
  component: () => (
    <section className="mx-auto max-w-3xl px-6 lg:px-12 py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-taupe">Journal</p>
      <h1 className="mt-4 font-serif text-5xl">The studio journal.</h1>
      <p className="mt-6 text-charcoal/75 leading-relaxed">
        Dispatches from the studio and the workshop — process notes, project stories and quiet
        inspirations. New writing is added slowly.
      </p>
      <div className="mt-16 border-y border-ink/10 py-16 text-center text-taupe italic font-serif text-xl">
        First entries coming soon.
      </div>
    </section>
  ),
});
