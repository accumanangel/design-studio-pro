import { createFileRoute, Link } from "@tanstack/react-router";
import roomMaster from "@/assets/room-master.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — IXIA London" },
      { name: "description", content: "IXIA London is a Chiswick-based interior design studio led by Kirsty, designing family-focused, editorial interiors." },
      { property: "og:title", content: "About — IXIA London" },
      { property: "og:description", content: "A Chiswick interior design studio for modern family life." },
    ],
  }),
  component: () => (
    <>
      <section className="mx-auto max-w-[1440px] px-6 lg:px-12 py-20 grid gap-16 lg:grid-cols-[1fr_1fr] items-center">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-taupe">The studio</p>
          <h1 className="mt-4 font-serif text-5xl lg:text-6xl leading-[1.03]">
            Beautiful homes, designed around real life.
          </h1>
          <div className="mt-8 space-y-5 text-charcoal/80 leading-relaxed max-w-xl">
            <p>
              IXIA London is a Chiswick-based interior design studio led by Kirsty. We create
              modern, warm, and quietly luxurious homes for families that want their houses to
              feel considered — but also lived-in.
            </p>
            <p>
              We work through a project's full arc: pre-construction planning, space layouts,
              finishes, joinery, furniture, lighting, and final styling. Where the collection
              cannot answer a brief, we design a piece for it.
            </p>
          </div>
          <Link to="/contact" className="mt-8 inline-block border-b border-ink pb-1 text-[11px] uppercase tracking-[0.2em]">
            Discuss your project →
          </Link>
        </div>
        <img src={roomMaster} alt="A styled interior" className="w-full aspect-[4/5] object-cover" />
      </section>
    </>
  ),
});
