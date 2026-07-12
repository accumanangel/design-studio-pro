import { createFileRoute, Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Basket — IXIA London" },
      { name: "description", content: "Review your configured IXIA London pieces before checkout." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  return (
    <section className="mx-auto max-w-[1440px] px-6 lg:px-12 py-16 lg:py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-taupe">Basket</p>
      <h1 className="mt-4 font-serif text-5xl">Your basket</h1>

      {items.length === 0 ? (
        <div className="mt-16 border-t border-ink/10 pt-16 text-center">
          <p className="text-charcoal/70">Your basket is quiet.</p>
          <Link
            to="/shop/bedside-tables"
            className="mt-8 inline-block border border-ink px-8 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-ink hover:text-background transition-colors"
          >
            Explore bedside tables
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-16 lg:grid-cols-[1fr_360px] items-start">
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {items.map((item) => (
              <div key={item.id} className="py-8 grid gap-6 md:grid-cols-[140px_1fr_auto]">
                <div className="aspect-[4/5] w-[140px] bg-ivory">
                  <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-taupe">
                    {item.collectionLabel}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl">{item.productName}</h3>
                  <p className="mt-1 text-sm text-charcoal/60">{item.sizeLabel}</p>
                  <ul className="mt-4 space-y-1 text-xs text-charcoal/70">
                    {item.selections.map((s) => (
                      <li key={s.stepLabel}>
                        <span className="text-taupe">{s.stepLabel}:</span> {s.optionLabel}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center gap-6">
                    <div className="flex items-center border border-ink/15">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-sm hover:bg-ivory"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="px-4 py-1 text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-sm hover:bg-ivory"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[11px] uppercase tracking-[0.2em] text-taupe hover:text-ink flex items-center gap-1"
                    >
                      <X className="size-3" /> Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-serif text-xl">{formatPrice(item.unitPrice * item.quantity)}</p>
                  {item.quantity > 1 && (
                    <p className="text-[11px] text-taupe">{formatPrice(item.unitPrice)} each</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <aside className="lg:sticky lg:top-24 border border-ink/10 p-8 bg-ivory/40">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-taupe">Summary</p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal/70">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/70">Delivery</span>
                <span className="text-charcoal/70">Included · UK</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-ink/10 flex justify-between items-baseline">
              <span className="text-[11px] uppercase tracking-[0.2em]">Total</span>
              <span className="font-serif text-2xl">{formatPrice(subtotal)}</span>
            </div>
            <Link
              to="/checkout"
              className="mt-8 block w-full text-center bg-olive text-background py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-charcoal transition-colors"
            >
              Proceed to checkout
            </Link>
            <p className="mt-6 text-[11px] leading-relaxed text-charcoal/60">
              Made-to-order lead time applies from confirmation. A member of the studio will be in
              touch to schedule white-glove delivery.
            </p>
          </aside>
        </div>
      )}
    </section>
  );
}
