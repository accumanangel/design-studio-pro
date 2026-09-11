import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { collections, formatPrice, products, type CollectionSlug } from "@/lib/products";
import { ProductCardImage } from "@/components/product-card-image";

type Filter = "all" | CollectionSlug;

export const Route = createFileRoute("/shop/bedside-tables/")({
  head: () => ({
    meta: [
      { title: "Bedside Tables — IXIA London" },
      {
        name: "description",
        content:
          "Made-to-order bedside tables from IXIA London — for small rooms, guest suites and master bedrooms. Configure size, finish and hardware.",
      },
      { property: "og:title", content: "Bedside Tables — IXIA London" },
      { property: "og:description", content: "Made-to-order bedside tables from IXIA London." },
    ],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<"featured" | "name-asc" | "name-desc">("featured");

  const list = useMemo(() => {
    let base = filter === "all" ? products : products.filter((p) => p.collection === filter);
    if (sort === "name-asc") base = [...base].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "name-desc") base = [...base].sort((a, b) => b.name.localeCompare(a.name));
    return base;
  }, [filter, sort]);

  return (
    <>
      {/* Intro */}
      <section className="mx-auto max-w-[1440px] px-6 lg:px-12 pt-16 lg:pt-24 pb-12">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-accent">
          Shop / Bedside tables
        </p>
        <h1 className="mt-6 font-serif text-5xl lg:text-6xl max-w-2xl leading-[1.02] text-ink">
          Bedside tables, made for the room they’ll live in.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-charcoal/75">
          Three families — for small rooms, guest suites and the master. Each configured by
          size, finish, and hardware, then built by hand to order.
        </p>
      </section>

      {/* Tabs + sort */}
      <div className="border-y border-ink/10 bg-[#fafafa]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1 text-[11px] uppercase tracking-[0.2em]">
            {(["all", "childrens", "guest-room", "master-suite"] as Filter[]).map((f) => {
              const label = f === "all" ? "All" : collections.find((c) => c.slug === f)?.short;
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 border transition-colors ${
                    active
                      ? "bg-brand-accent text-white border-brand-accent"
                      : "border-transparent hover:border-brand-accent/40 text-charcoal/70"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <label className="text-[11px] uppercase tracking-[0.2em] text-charcoal/70 flex items-center gap-3">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="bg-transparent border-b border-ink/20 py-1 tracking-normal text-sm normal-case focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="name-asc">Name · A to Z</option>
              <option value="name-desc">Name · Z to A</option>
            </select>
          </label>
        </div>
      </div>

      {/* Grid */}
      <section className="mx-auto max-w-[1440px] px-6 lg:px-12 py-16">
        <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-taupe mb-6">
              {list.length} piece{list.length === 1 ? "" : "s"}
            </p>
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <Link
                  key={p.slug}
                  to="/shop/bedside-tables/$productSlug"
                  params={{ productSlug: p.slug }}
                  className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive"
                >
                  <ProductCardImage src={p.heroImage} productName={p.name} />
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-taupe">
                    {p.collectionLabel}
                  </p>
                  <div className="mt-1 flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-xl">{p.name}</h3>
                    <span className="text-sm font-semibold text-charcoal whitespace-nowrap">
                      From {formatPrice(p.basePrice)}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-charcoal/60">{p.strapline}</p>
                  <div className="mt-3 flex gap-1.5">
                    {p.steps
                      .flatMap((s) => s.options)
                      .filter((o) => o.colour)
                      .slice(0, 5)
                      .map((o) => (
                        <span
                          key={o.id}
                          className="size-3 rounded-full ring-1 ring-ink/10"
                          style={{ background: o.colour }}
                        />
                      ))}
                  </div>
                </Link>
              ))}
            </div>
        </div>
      </section>
    </>
  );
}
