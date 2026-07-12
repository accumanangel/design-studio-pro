import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — IXIA London" },
      { name: "description", content: "Complete your IXIA London order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      clear();
      navigate({ to: "/order-confirmation" });
    }, 900);
  };

  return (
    <section className="mx-auto max-w-[1440px] px-6 lg:px-12 py-16 lg:py-20">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-taupe">Checkout</p>
      <h1 className="mt-4 font-serif text-5xl">Confirm your order</h1>

      <form onSubmit={handleSubmit} className="mt-12 grid gap-16 lg:grid-cols-[1fr_400px] items-start">
        <div className="space-y-14">
          <Fieldset title="Contact">
            <Input label="Email" type="email" name="email" required />
            <Input label="Phone" type="tel" name="phone" />
          </Fieldset>

          <Fieldset title="Delivery">
            <Input label="Full name" name="name" required />
            <Input label="Address line 1" name="address1" required />
            <Input label="Address line 2" name="address2" />
            <div className="grid grid-cols-2 gap-4">
              <Input label="City" name="city" required />
              <Input label="Postcode" name="postcode" required />
            </div>
            <Input label="Delivery notes" name="notes" />
          </Fieldset>

          <Fieldset title="Payment">
            <p className="text-xs text-charcoal/60 mb-4">
              This is a demonstration checkout — no card is charged.
            </p>
            <Input label="Card number" name="card" placeholder="0000 0000 0000 0000" />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Expiry" name="expiry" placeholder="MM / YY" />
              <Input label="CVC" name="cvc" placeholder="123" />
            </div>
          </Fieldset>
        </div>

        <aside className="lg:sticky lg:top-24 border border-ink/10 p-8 bg-ivory/40">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-taupe">Order</p>
          <div className="mt-6 space-y-6">
            {items.map((i) => (
              <div key={i.id} className="flex gap-4 items-start">
                <img src={i.image} alt="" className="size-16 object-cover bg-background" />
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-base">{i.productName}</p>
                  <p className="text-[10px] text-taupe">{i.sizeLabel}</p>
                  <p className="text-[10px] text-charcoal/60 mt-1 truncate">
                    {i.selections.map((s) => s.optionLabel).join(" · ")}
                  </p>
                </div>
                <p className="text-sm">{formatPrice(i.unitPrice * i.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-ink/10 space-y-2 text-sm">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row label="Delivery" value="Included" />
            <Row label="Total" value={formatPrice(subtotal)} strong />
          </div>
          <button
            type="submit"
            disabled={submitting || items.length === 0}
            className="mt-8 w-full bg-olive text-background py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-charcoal transition-colors disabled:opacity-40"
          >
            {submitting ? "Placing order…" : "Place order"}
          </button>
        </aside>
      </form>
    </section>
  );
}

function Fieldset({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="font-mono text-[10px] uppercase tracking-[0.25em] text-taupe mb-6">
        {title}
      </legend>
      <div className="space-y-4">{children}</div>
    </fieldset>
  );
}

function Input({
  label,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-2">
        {label}
      </span>
      <input
        {...rest}
        className="w-full bg-transparent border-b border-ink/15 py-2 text-sm text-ink placeholder:text-taupe/50 focus:border-ink focus:outline-none transition-colors"
      />
    </label>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className={strong ? "text-[11px] uppercase tracking-[0.2em]" : "text-charcoal/70"}>
        {label}
      </span>
      <span className={strong ? "font-serif text-xl" : ""}>{value}</span>
    </div>
  );
}
