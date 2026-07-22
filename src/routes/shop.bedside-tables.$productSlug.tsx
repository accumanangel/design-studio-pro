import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, Plus, Minus } from "lucide-react";
import { getProduct, formatPrice, type ConfigStep, type Swatch } from "@/lib/products";
import complementaryLamp from "@/assets/complementary-lamp.jpg";
import complementaryThrow from "@/assets/complementary-throw.jpg";
import complementaryBed from "@/assets/complementary-bed.jpg";
import craftHands from "@/assets/craft-hands.jpg";

export interface QuoteDraft {
  productSlug: string;
  productName: string;
  collectionLabel: string;
  sizeLabel: string;
  selections: { stepLabel: string; optionLabel: string }[];
  leadTime: string;
}
export const QUOTE_DRAFT_KEY = "ixia-quote-draft-v1";

export const Route = createFileRoute("/shop/bedside-tables/$productSlug")({
  loader: ({ params }) => {
    const product = getProduct(params.productSlug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Piece not found — IXIA London" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} — ${p.collectionLabel} · IXIA London` },
        { name: "description", content: p.strapline },
        { property: "og:title", content: `${p.name} — IXIA London` },
        { property: "og:description", content: p.strapline },
        { property: "og:image", content: p.heroImage },
        { name: "twitter:image", content: p.heroImage },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="font-serif text-4xl">This piece isn't in the collection.</h1>
      <Link
        to="/shop/bedside-tables"
        className="mt-6 inline-block border-b border-ink pb-1 text-[11px] uppercase tracking-[0.2em]"
      >
        View all bedside tables
      </Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: import("@/lib/products").Product };
  const navigate = useNavigate();

  const [sizeId, setSizeId] = useState<string>(product.sizes[0].id);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [activeThumb, setActiveThumb] = useState(0);

  // Steps visible given current selections (conditional reveal)
  const visibleSteps: ConfigStep[] = useMemo(() => {
    return product.steps.filter((s) => {
      if (!s.requires) return true;
      return selections[s.requires.step] === s.requires.value;
    });
  }, [product.steps, selections]);

  // If a parent selection changes, drop any now-invalid child selections.
  const setSelection = (stepKey: string, value: string) => {
    setSelections((prev) => {
      const next = { ...prev, [stepKey]: value };
      const stillVisible = product.steps.filter((s) => {
        if (!s.requires) return true;
        if (s.requires.step === stepKey) return value === s.requires.value;
        return next[s.requires.step] === s.requires.value;
      });
      const validKeys = new Set(stillVisible.map((s) => s.key));
      for (const k of Object.keys(next)) {
        if (!validKeys.has(k) && k !== stepKey) delete next[k];
      }
      return next;
    });
  };

  const size = product.sizes.find((s) => s.id === sizeId)!;

  const currentStepIndex = visibleSteps.findIndex((s) => !selections[s.key]);

  const { previewImage, resolvedSelections } = useMemo(() => {
    let preview = product.heroImage;
    const resolved: { stepLabel: string; optionLabel: string }[] = [];
    for (const step of visibleSteps) {
      const val = selections[step.key];
      if (!val) continue;
      const opt = step.options.find((o) => o.id === val);
      if (!opt) continue;
      if (opt.image) preview = opt.image;
      resolved.push({ stepLabel: step.label, optionLabel: opt.label });
    }
    return { previewImage: preview, resolvedSelections: resolved };
  }, [product, visibleSteps, selections]);

  const gallery = useMemo(() => {
    const first = previewImage;
    const rest = product.galleryImages.filter((g) => g !== first);
    return [first, ...rest].slice(0, 4);
  }, [product.galleryImages, previewImage]);

  const isComplete = visibleSteps.every((s) => selections[s.key]);

  const handleQuote = () => {
    const draft: QuoteDraft = {
      productSlug: product.slug,
      productName: product.name,
      collectionLabel: product.collectionLabel,
      sizeLabel: `${size.label} · ${size.dims}`,
      selections: resolvedSelections,
      leadTime: product.leadTime,
    };
    try {
      sessionStorage.setItem(QUOTE_DRAFT_KEY, JSON.stringify(draft));
    } catch {
      /* ignore */
    }
    navigate({ to: "/request-a-quote" });
  };

  return (
    <>
      <div className="relative">
        <div className="flex flex-col lg:flex-row lg:min-h-[calc(100vh-64px)]">
          {/* Left: media */}
          <section className="w-full lg:w-[62%] relative bg-ivory">
            <div className="relative w-full h-full min-h-[520px] lg:h-[calc(100vh-64px)]">
              <img
                key={gallery[activeThumb]}
                src={gallery[activeThumb]}
                alt={`${product.name} preview`}
                className="absolute inset-0 h-full w-full object-cover animate-fade-in"
              />
              {/* Thumbnails */}
              <div className="absolute bottom-6 left-6 flex gap-2">
                {gallery.map((g, i) => (
                  <button
                    key={g + i}
                    aria-label={`Gallery image ${i + 1}`}
                    onClick={() => setActiveThumb(i)}
                    className={`size-16 bg-background p-1 border transition-colors ${
                      i === activeThumb ? "border-ink" : "border-ink/10 hover:border-ink/40"
                    }`}
                  >
                    <img src={g} alt="" className="size-full object-cover" />
                  </button>
                ))}
                <div className="size-16 bg-background/90 border border-ink/10 flex flex-col items-center justify-center gap-1">
                  <span className="font-mono text-[9px] tracking-widest text-taupe">DIM</span>
                  <span className="font-mono text-[9px] text-charcoal/70">{size.dims.split(" ")[0]}</span>
                </div>
              </div>
              <div className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-[0.25em] text-charcoal/60 bg-background/80 px-3 py-1">
                Preview represents selected finish
              </div>
            </div>
          </section>

          {/* Right: configurator inset card */}
          <section className="w-full lg:w-[46%] lg:-ml-[8%] relative z-10 pt-10 lg:pt-16 pb-16 px-6 lg:px-8 animate-fade-up">
            <div className="bg-background border border-ink/8 shadow-[0_30px_80px_-40px_rgba(36,34,31,0.25)] p-8 lg:p-12">
              <nav className="mb-6 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-taupe">
                <Link to="/shop">Shop</Link>
                <span className="opacity-30">/</span>
                <Link to="/shop/bedside-tables">Bedside tables</Link>
                <span className="opacity-30">/</span>
                <Link
                  to={`/shop/bedside-tables/${product.collection}`}
                  className="text-ink"
                >
                  {product.collectionLabel}
                </Link>
              </nav>

              <h1 className="font-serif text-4xl lg:text-5xl leading-[1.05] text-ink">{product.name}</h1>
              <p className="mt-2 font-serif italic text-taupe">{product.strapline}</p>
              <p className="mt-6 text-sm leading-relaxed text-charcoal/75 max-w-md">
                {product.description}
              </p>

              {/* Size (always visible, first step) */}
              <div className="mt-10">
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-mono text-[10px] text-taupe">01</span>
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">Size</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {product.sizes.map((s) => {
                    const active = s.id === sizeId;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSizeId(s.id)}
                        className={`text-left p-4 border transition-all ${
                          active
                            ? "border-ink bg-ivory/40"
                            : "border-ink/10 hover:border-ink/40"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold uppercase tracking-wider">{s.label}</span>
                          {active && <Check className="size-3.5 text-olive" />}
                        </div>
                        <p className="mt-2 font-mono text-[10px] text-charcoal/60">{s.dims}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Configurator steps */}
              <div className="mt-8 divide-y divide-ink/8">
                {visibleSteps.map((step, i) => {
                  const stepNumber = String(i + 2).padStart(2, "0");
                  const selectedId = selections[step.key];
                  const isCollapsed = !!selectedId && currentStepIndex !== -1 && currentStepIndex > i;
                  const isFuture = currentStepIndex !== -1 && currentStepIndex < i;

                  return (
                    <StepBlock
                      key={step.key}
                      stepNumber={stepNumber}
                      step={step}
                      selectedId={selectedId}
                      collapsed={isCollapsed}
                      future={isFuture}
                      onSelect={(id) => setSelection(step.key, id)}
                      onEdit={() => {
                        // Reopen: remove selection to make it the active step
                        setSelections((prev) => {
                          const next = { ...prev };
                          delete next[step.key];
                          return next;
                        });
                      }}
                    />
                  );
                })}
              </div>

              {/* Action block */}
              <div className="mt-10 pt-8 border-t border-ink/10">
                <div className="mb-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-sage mb-1">
                    Lead time
                  </p>
                  <p className="text-xs text-charcoal/70">{product.leadTime}</p>
                </div>

                <button
                  onClick={handleQuote}
                  disabled={!isComplete}
                  className="w-full bg-olive text-background py-4 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-charcoal transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isComplete ? "Request a bespoke quote" : "Complete configuration to request a quote"}
                </button>
                <p className="mt-3 text-[11px] text-taupe text-center">
                  Each piece is made to order. We reply with pricing within two working days.
                </p>
              </div>

              {/* Expandables */}
              <div className="mt-10 space-y-2">
                {[
                  { title: "Dimensions", body: product.sizes.map((s) => `${s.label}: ${s.dims}`).join("  ·  ") },
                  { title: "Materials & care", body: "FSC-certified European timbers, hand-finished with organic oils and workshop-mixed paints. Dust with a dry, lint-free cloth; refresh oiled surfaces annually." },
                  { title: "Delivery & returns", body: "White-glove delivery included across mainland UK, scheduled after production. Returns accepted within 14 days of receipt on stock configurations." },
                ].map((row) => (
                  <details key={row.title} className="group border-b border-ink/8">
                    <summary className="list-none flex items-center justify-between py-3 cursor-pointer text-[11px] uppercase tracking-[0.2em] text-charcoal hover:text-ink">
                      {row.title}
                      <Plus className="size-3 group-open:hidden" />
                      <Minus className="size-3 hidden group-open:block" />
                    </summary>
                    <p className="pb-4 text-sm leading-relaxed text-charcoal/70">{row.body}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Craftsmanship strip */}
      <section className="bg-ivory/60 border-y border-ink/8 mt-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-24 grid gap-16 md:grid-cols-2 items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-taupe">The making</p>
            <h2 className="mt-4 font-serif text-4xl italic leading-[1.05]">The art of the slow build.</h2>
            <p className="mt-6 max-w-lg text-charcoal/75 leading-relaxed">
              Each piece begins as a conversation between the grain of the timber and the maker's
              hand. We don't hold showrooms — we build to order, one considered piece at a time,
              signed and numbered.
            </p>
            <Link
              to="/interior-design"
              className="mt-8 inline-block border-b border-ink pb-1 text-[11px] uppercase tracking-[0.2em]"
            >
              Our process →
            </Link>
          </div>
          <img src={craftHands} alt="Hands finishing a walnut edge" loading="lazy" className="w-full aspect-[4/3] object-cover" />
        </div>
      </section>

      {/* Complementary pieces */}
      <section className="mx-auto max-w-[1440px] px-6 lg:px-12 py-24">
        <h3 className="font-serif text-3xl text-center">Complementary pieces</h3>
        <div className="mt-14 grid gap-12 md:grid-cols-3">
          {[
            { image: complementaryBed, label: "Master Suite", name: "The Halloway Bedframe", price: "From £3,200" },
            { image: complementaryLamp, label: "Lighting", name: "Ode Ceramic Lamp", price: "£480" },
            { image: complementaryThrow, label: "Textiles", name: "Pure Wool Throw", price: "£220" },
          ].map((c) => (
            <div key={c.name} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-ivory">
                <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]" />
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-taupe">{c.label}</p>
              <h4 className="font-serif text-xl mt-1">{c.name}</h4>
              <p className="text-xs text-charcoal/60 mt-1">{c.price}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function StepBlock({
  stepNumber,
  step,
  selectedId,
  collapsed,
  future,
  onSelect,
  onEdit,
}: {
  stepNumber: string;
  step: ConfigStep;
  selectedId?: string;
  collapsed: boolean;
  future: boolean;
  onSelect: (id: string) => void;
  onEdit: () => void;
}) {
  const selected = selectedId ? step.options.find((o) => o.id === selectedId) : undefined;

  if (collapsed && selected) {
    return (
      <div className="py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] text-taupe">{stepNumber}</span>
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">{step.label}</span>
          <span className="text-[11px] normal-case tracking-normal text-charcoal/60">
            · {selected.label}
          </span>
        </div>
        <button
          onClick={onEdit}
          className="text-[10px] uppercase tracking-[0.2em] text-olive hover:text-charcoal"
        >
          Change
        </button>
      </div>
    );
  }

  if (future) {
    return (
      <div className="py-4 flex items-center gap-4 opacity-40">
        <span className="font-mono text-[10px] text-taupe">{stepNumber}</span>
        <span className="text-[11px] uppercase tracking-[0.2em]">{step.label}</span>
      </div>
    );
  }

  return (
    <div className="py-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-2">
        <span className="font-mono text-[10px] text-olive">{stepNumber}</span>
        <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">{step.label}</span>
      </div>
      {step.eyebrow && (
        <p className="ml-8 text-[11px] italic text-taupe mb-4">{step.eyebrow}</p>
      )}
      <div className="grid grid-cols-2 gap-3">
        {step.options.map((opt) => (
          <SwatchButton
            key={opt.id}
            opt={opt}
            active={selectedId === opt.id}
            onClick={() => !opt.disabled && onSelect(opt.id)}
          />
        ))}
      </div>
    </div>
  );
}

function SwatchButton({
  opt,
  active,
  onClick,
}: {
  opt: Swatch;
  active: boolean;
  onClick: () => void;
}) {
  const hasImage = !!opt.swatchImage;
  return (
    <button
      onClick={onClick}
      disabled={opt.disabled}
      aria-pressed={active}
      aria-label={opt.label}
      className={`group flex items-center gap-3 p-3 text-left border transition-all ${
        active
          ? "border-ink bg-ivory/40"
          : opt.disabled
          ? "border-ink/10 opacity-50 cursor-not-allowed"
          : "border-ink/10 hover:border-ink/40"
      }`}
    >
      {hasImage ? (
        <span className="shrink-0 size-12 overflow-hidden bg-ivory ring-1 ring-ink/10">
          <img
            src={opt.swatchImage}
            alt=""
            loading="lazy"
            width={96}
            height={96}
            className="size-full object-cover"
          />
        </span>
      ) : (
        <span
          className="shrink-0 size-8 rounded-full ring-1 ring-ink/10"
          style={{ background: opt.colour }}
        />
      )}
      <span className="flex-1 min-w-0">
        <span className="block text-[11px] font-semibold uppercase tracking-wider truncate">
          {opt.label}
        </span>
        <span className="block text-[10px] text-taupe truncate">
          {opt.disabled
            ? opt.disabledReason ?? "Unavailable"
            : opt.priceDelta
            ? `+ ${formatPrice(opt.priceDelta)}`
            : "Included"}
        </span>
      </span>
      {active && <Check className="size-3.5 text-olive shrink-0" />}
    </button>
  );
}
