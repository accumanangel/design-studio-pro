import { createFileRoute, Link } from "@tanstack/react-router";
import heroBedroom from "@/assets/hero-master-bedroom.jpg";
import roomChildren from "@/assets/room-children.jpg";
import roomGuest from "@/assets/room-guest.jpg";
import roomMaster from "@/assets/room-master.jpg";
import craftHands from "@/assets/craft-hands.jpg";
import craftSamples from "@/assets/craft-samples.jpg";
import { products, formatPrice, collections } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IXIA London — Furniture made for beautiful, lived-in homes" },
      {
        name: "description",
        content:
          "Explore the IXIA London furniture collection — made-to-order bedside tables and cabinetry designed by a Chiswick interior design studio.",
      },
      { property: "og:title", content: "IXIA London — Furniture made for beautiful, lived-in homes" },
      {
        property: "og:description",
        content:
          "The IXIA furniture collection — hand-made bedside tables for children's rooms, guest suites and master bedrooms.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products;

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[86vh] min-h-[560px] w-full overflow-hidden">
          <img
            src={heroBedroom}
            alt="A sunlit master bedroom with a walnut bedside table"
            className="absolute inset-0 h-full w-full object-cover"
            width={1600}
            height={1200}
          />
          <div className="absolute inset-0 bg-ink/25" />
          <div className="relative z-10 flex h-full items-end">
            <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12 pb-16 lg:pb-24">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-background/80">
                The IXIA furniture collection
              </p>
              <h1 className="mt-6 max-w-3xl font-serif text-[clamp(2.75rem,6vw,5.25rem)] leading-[1.02] text-background">
                Furniture made for beautiful, lived-in homes.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-background/85">
                A quietly considered collection of made-to-order pieces, drawn in the studio and
                built by hand in our workshop.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/shop/bedside-tables"
                  className="bg-olive px-8 py-4 text-[11px] uppercase tracking-[0.25em] text-background hover:bg-charcoal transition-colors"
                >
                  Explore bedside tables
                </Link>
                <Link
                  to="/interior-design"
                  className="border border-background/60 px-8 py-4 text-[11px] uppercase tracking-[0.25em] text-background hover:bg-background/10 transition-colors"
                >
                  Discuss your interior project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-ink/8">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-6 flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.2em] text-charcoal/70">
          <span>16 Google reviews · ★ ★ ★ ★ ★</span>
          <span className="italic normal-case tracking-normal text-taupe">
            “Exceptional from start to finish.”
          </span>
          <span>Made-to-order · UK delivery</span>
        </div>
      </section>

      {/* Shop by collection */}
      <section className="mx-auto max-w-[1440px] px-6 lg:px-12 py-24 lg:py-32">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-taupe">
              Shop by room
            </p>
            <h2 className="mt-4 font-serif text-4xl lg:text-5xl text-ink max-w-xl">
              A quiet library of pieces for every room in the home.
            </h2>
          </div>
          <Link
            to="/shop/bedside-tables"
            className="hidden md:inline-block border-b border-ink pb-1 text-[11px] uppercase tracking-[0.2em]"
          >
            View all bedside tables
          </Link>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {collections.map((c, i) => {
            const img = [roomChildren, roomGuest, roomMaster][i] ?? c.image;
            return (
              <Link
                key={c.slug}
                to={`/shop/bedside-tables/${c.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
                  <img
                    src={img}
                    alt={c.label}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between">
                  <h3 className="font-serif text-xl text-ink">{c.short}</h3>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-taupe group-hover:text-olive">
                    Explore →
                  </span>
                </div>
                <p className="mt-2 text-sm text-charcoal/70 max-w-sm">{c.story}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-ivory/60 border-y border-ink/8">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-taupe">
                Featured pieces
              </p>
              <h2 className="mt-4 font-serif text-4xl text-ink">
                The bedside table collection.
              </h2>
            </div>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {featured.map((p) => (
              <Link
                key={p.slug}
                to="/shop/bedside-tables/$productSlug"
                params={{ productSlug: p.slug }}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-background">
                  <img
                    src={p.heroImage}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.02]"
                  />
                </div>
                <div className="mt-5 space-y-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-taupe">
                    {p.collectionLabel}
                  </p>
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif text-xl">{p.name}</h3>
                    <span className="text-sm">from {formatPrice(p.basePrice)}</span>
                  </div>
                  <p className="text-xs text-charcoal/60">{p.strapline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Made-to-order story */}
      <section className="mx-auto max-w-[1440px] px-6 lg:px-12 py-24 lg:py-32 grid gap-16 lg:grid-cols-2 items-center">
        <div className="grid grid-cols-2 gap-4">
          <img
            src={craftHands}
            alt="Artisan hand-finishing a walnut edge"
            loading="lazy"
            className="aspect-square w-full object-cover"
          />
          <img
            src={craftSamples}
            alt="Paint, stone and hardware samples on an oak workbench"
            loading="lazy"
            className="aspect-square w-full object-cover mt-16"
          />
        </div>
        <div className="max-w-xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-taupe">
            Made-to-order
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-[1.05] text-ink">
            Drawn in Chiswick, built in the workshop, delivered by hand.
          </h2>
          <div className="mt-8 space-y-6 text-base text-charcoal/80 leading-relaxed">
            <p>
              Every piece is built to order from FSC-certified European timbers, hand-finished
              with organic waxes, and signed by the maker. Lead times sit between six and ten
              weeks — the length of an honest thing being made properly.
            </p>
            <p>
              Materials, colours and hardware are configured in the studio's own vocabulary, so
              the piece you receive is the one you drew.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 text-[11px] uppercase tracking-[0.2em] text-charcoal/70">
            <div><p className="text-taupe">01</p><p className="mt-2">FSC timbers</p></div>
            <div><p className="text-taupe">02</p><p className="mt-2">Hand-finished</p></div>
            <div><p className="text-taupe">03</p><p className="mt-2">White-glove UK delivery</p></div>
          </div>
        </div>
      </section>

      {/* Interior design cross-sell */}
      <section className="bg-ink text-background">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-24 grid gap-12 lg:grid-cols-[1.2fr_1fr] items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-background/50">
              Beyond furniture
            </p>
            <h2 className="mt-4 font-serif text-4xl lg:text-5xl text-background max-w-xl leading-[1.05]">
              We can style this piece into a wider room, or a whole home.
            </h2>
            <p className="mt-6 max-w-lg text-background/75 leading-relaxed">
              IXIA London is first an interior design studio. If you would like the room the
              piece lives in designed as considerately as the piece itself, we'd love to hear
              from you.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:justify-self-end">
            <Link
              to="/interior-design"
              className="border border-background px-8 py-4 text-[11px] uppercase tracking-[0.25em] text-background hover:bg-background hover:text-ink transition-colors text-center"
            >
              Discuss your interior project
            </Link>
            <Link
              to="/contact"
              className="text-center text-[11px] uppercase tracking-[0.25em] text-background/60 hover:text-background"
            >
              Or send us a note →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
