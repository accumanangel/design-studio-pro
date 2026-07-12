import { createFileRoute, Link } from "@tanstack/react-router";
import craftSamples from "@/assets/craft-samples.jpg";

const services = [
  { n: "01", label: "Pre-construction design", body: "Define goals and align the project before construction begins." },
  { n: "02", label: "Space planning", body: "Confirm layouts, circulation, proportions, and furniture fit." },
  { n: "03", label: "Finishes & materials", body: "A cohesive material palette drawn from the workshop and its makers." },
  { n: "04", label: "Furniture selection", body: "Curated from the collection and our trusted maker network." },
  { n: "05", label: "Custom built-in design", body: "Cabinetry, joinery, and considered storage drawn to fit." },
  { n: "06", label: "Lighting design", body: "Layers of light for daily rhythms and quieter evenings." },
  { n: "07", label: "Curtains & blinds", body: "Weight, texture and drop calibrated per window." },
  { n: "08", label: "Project coordination", body: "Trades, timelines and installation, managed end to end." },
  { n: "09", label: "Interior styling", body: "Final layers — art, objects and softness." },
];

export const Route = createFileRoute("/interior-design")({
  head: () => ({
    meta: [
      { title: "Interior Design — IXIA London" },
      { name: "description", content: "Full-service interior design for modern family life — from pre-construction to final styling." },
      { property: "og:title", content: "Interior Design — IXIA London" },
      { property: "og:description", content: "Full-service interior design from the IXIA London studio." },
    ],
  }),
  component: () => (
    <>
      <section className="mx-auto max-w-[1440px] px-6 lg:px-12 py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-taupe">Interior design</p>
        <h1 className="mt-4 font-serif text-5xl lg:text-6xl leading-[1.03] max-w-3xl">
          Let's work together.
        </h1>
        <p className="mt-6 max-w-xl text-charcoal/75 leading-relaxed">
          A complete journey, from pre-construction planning through to final styling.
        </p>
      </section>
      <section className="mx-auto max-w-[1440px] px-6 lg:px-12 pb-24 grid gap-16 lg:grid-cols-[1fr_400px] items-start">
        <ol className="divide-y divide-ink/10 border-y border-ink/10">
          {services.map((s) => (
            <li key={s.n} className="py-8 grid grid-cols-[80px_1fr] gap-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-taupe">{s.n}</span>
              <div>
                <h3 className="font-serif text-2xl">{s.label}</h3>
                <p className="mt-2 text-sm text-charcoal/70 max-w-lg">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <aside className="border border-ink/10 p-8 bg-ivory/40 lg:sticky lg:top-24">
          <img src={craftSamples} alt="Studio material samples" className="w-full aspect-square object-cover mb-6" />
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-taupe">Book</p>
          <h3 className="mt-3 font-serif text-2xl">A studio consultation</h3>
          <p className="mt-3 text-sm text-charcoal/70">
            An hour with the studio to talk through your project, in Chiswick or by video.
          </p>
          <Link to="/contact" className="mt-6 block text-center bg-olive text-background py-3 text-[11px] uppercase tracking-[0.25em] hover:bg-charcoal transition-colors">
            Discuss your project
          </Link>
        </aside>
      </section>
    </>
  ),
});
