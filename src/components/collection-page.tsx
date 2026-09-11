import { Link, notFound } from "@tanstack/react-router";
import { collections, formatPrice, productsByCollection, type CollectionSlug, type Product } from "@/lib/products";
import { ProductCardImage } from "@/components/product-card-image";

export function CollectionPage({ slug }: { slug: CollectionSlug }) {
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) throw notFound();
  const list: Product[] = productsByCollection(slug);

  return (
    <>
      <section className="relative">
        <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
          <img src={collection.image} alt={collection.label} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-ink/30" />
          <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-end px-6 lg:px-12 pb-16">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-background/80">
                Bedside tables
              </p>
              <h1 className="mt-4 max-w-2xl font-serif text-5xl lg:text-6xl text-background leading-[1.03]">
                {collection.label}
              </h1>
              <p className="mt-4 max-w-lg text-background/85 leading-relaxed">{collection.story}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 lg:px-12 py-20">
        <div className="grid gap-12 md:grid-cols-3">
          {list.map((p) => (
            <Link
              key={p.slug}
              to="/shop/bedside-tables/$productSlug"
              params={{ productSlug: p.slug }}
              className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive"
            >
              <ProductCardImage src={p.heroImage} productName={p.name} />
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-taupe">{p.collectionLabel}</p>
              <div className="mt-1 flex items-baseline justify-between">
                <h3 className="font-serif text-xl">{p.name}</h3>
                <span className="text-sm font-semibold text-charcoal">From {formatPrice(p.basePrice)}</span>
              </div>
              <p className="mt-2 text-xs text-charcoal/60">{p.strapline}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-ivory/60 border-y border-ink/8">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-20 grid gap-12 md:grid-cols-[1fr_1fr] items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-taupe">Materials & lead time</p>
            <h2 className="mt-4 font-serif text-3xl lg:text-4xl leading-[1.1]">
              Built by hand — six to ten weeks from order.
            </h2>
            <p className="mt-6 max-w-lg text-charcoal/75 leading-relaxed">
              Every {collection.short.toLowerCase()} piece is made to order in the IXIA workshop
              using FSC-certified timbers, workshop-mixed paints, and hardware sourced from
              small British foundries. White-glove delivery is included across mainland UK.
            </p>
            <Link to="/request-a-quote" className="mt-8 inline-block border-b border-brand-accent pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-accent">
              Request a bespoke configuration →
            </Link>
          </div>
          <img src={collection.image} alt="" className="w-full aspect-[4/3] object-cover" loading="lazy" />
        </div>
      </section>
    </>
  );
}

export function collectionHead(slug: CollectionSlug) {
  const c = collections.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    meta: [
      { title: `${c.label} — IXIA London` },
      { name: "description", content: c.story },
      { property: "og:title", content: `${c.label} — IXIA London` },
      { property: "og:description", content: c.story },
      { property: "og:image", content: c.image },
      { name: "twitter:image", content: c.image },
    ],
  };
}
