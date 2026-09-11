import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroBedroom from "@/assets/hero-master-bedroom.jpg";
import { ProductCardImage } from "@/components/product-card-image";
import { collections, formatPrice, products } from "@/lib/products";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop Made-to-Order Furniture — IXIA London" },
      {
        name: "description",
        content: "Explore made-to-order bedside tables from the IXIA London furniture collection.",
      },
      { property: "og:title", content: "The Furniture Collection — IXIA London" },
      { property: "og:description", content: "Thoughtful furniture, made to order in London." },
    ],
  }),
  component: ShopLanding,
});

function ShopLanding() {
  return (
    <>
      <section className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:px-12 lg:py-20">
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent">IXIA London Shop</p>
          <h1 className="mt-5 font-serif text-5xl leading-[1.08] text-ink lg:text-6xl">The Furniture Collection</h1>
          <p className="mt-6 text-base leading-8 text-charcoal/75">
            Thoughtful bedside tables, carefully proportioned and made to order. Choose the size,
            finish and details that suit the room they will live in.
          </p>
          <Link
            to="/shop/bedside-tables"
            className="mt-9 inline-flex min-h-11 items-center gap-3 bg-brand-accent px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-brand-dark"
          >
            Shop bedside tables <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="relative overflow-hidden bg-ivory">
          <img src={heroBedroom} alt="IXIA bedside table styled in a calm bedroom" className="aspect-[16/10] w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-dark/65 to-transparent px-6 pb-6 pt-20 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.18em]">Made to order · UK delivery</p>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-ivory/55">
        <div className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-4 px-6 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal/70 lg:px-12">
          <span>Solid timber</span><span>Hand-finished</span><span>Configured by you</span><span>Made in Britain</span>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent">Shop by room</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-ink">Designed for the way each room is lived in.</h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {collections.map((collection) => (
            <Link key={collection.slug} to={`/shop/bedside-tables/${collection.slug}`} className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent">
              <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
                <img src={collection.image} alt={collection.label} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
                <span className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-white text-brand-accent shadow-sm transition-colors group-hover:bg-brand-accent group-hover:text-white" aria-hidden="true">
                  <ArrowRight className="size-4" />
                </span>
              </div>
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-accent">Collection</p>
              <h3 className="mt-2 font-serif text-2xl text-ink">{collection.short} Bedside Tables</h3>
              <p className="mt-3 text-sm leading-6 text-charcoal/65">{collection.story}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-ink/10 bg-[#fafafa]">
        <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent">The collection</p>
              <h2 className="mt-4 font-serif text-4xl text-ink">All bedside tables</h2>
            </div>
            <Link to="/shop/bedside-tables" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-brand-dark">View the full collection <ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {products.map((product) => (
              <Link key={product.slug} to="/shop/bedside-tables/$productSlug" params={{ productSlug: product.slug }} className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent">
                <ProductCardImage src={product.heroImage} productName={product.name} backgroundClassName="bg-white" />
                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-accent">{product.collectionLabel}</p>
                <div className="mt-2 flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-2xl text-ink">{product.name}</h3>
                  <span className="shrink-0 text-sm font-semibold text-charcoal">From {formatPrice(product.basePrice)}</span>
                </div>
                <p className="mt-2 text-sm text-charcoal/60">{product.strapline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
