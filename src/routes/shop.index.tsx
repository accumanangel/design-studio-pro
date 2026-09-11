import { createFileRoute, Link } from "@tanstack/react-router";
import heroBedroom from "@/assets/hero-master-bedroom.jpg";
import { collections, products } from "@/lib/products";
import { ProductCardImage } from "@/components/product-card-image";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop — IXIA London Furniture Collection" },
      {
        name: "description",
        content:
          "The IXIA London made-to-order furniture collection — bedside tables and cabinetry, drawn in Chiswick and built by hand.",
      },
      { property: "og:title", content: "Shop — IXIA London Furniture Collection" },
      { property: "og:description", content: "The made-to-order IXIA London furniture collection." },
    ],
  }),
  component: ShopLanding,
});

function ShopLanding() {
  return (
    <>
      <section className="relative">
        <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
          <img src={heroBedroom} alt="A styled bedroom" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-ink/25" />
          <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-end px-6 lg:px-12 pb-16">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-background/80">The shop</p>
              <h1 className="mt-4 max-w-2xl font-serif text-5xl lg:text-6xl text-background leading-[1.03]">
                A small collection, made properly.
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 lg:px-12 py-20 grid gap-6 md:grid-cols-3">
        {collections.map((c) => (
          <Link
            key={c.slug}
            to={`/shop/bedside-tables/${c.slug}`}
            className="group block"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
              <img src={c.image} alt={c.label} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]" />
            </div>
            <h3 className="mt-4 font-serif text-xl">{c.short} Bedside Tables</h3>
            <p className="text-sm text-charcoal/60 mt-1">{c.story}</p>
          </Link>
        ))}
      </section>

      <section className="bg-ivory/50 border-y border-ink/8">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-taupe">Featured</p>
          <h2 className="mt-3 font-serif text-4xl">All bedside tables</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {products.map((p) => (
              <Link
                key={p.slug}
                to="/shop/bedside-tables/$productSlug"
                params={{ productSlug: p.slug }}
                className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive"
              >
                <ProductCardImage
                  src={p.heroImage}
                  productName={p.name}
                  backgroundClassName="bg-background"
                />
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-taupe">{p.collectionLabel}</p>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-xl">{p.name}</h3>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-taupe">Made to order</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
