import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import jsPDF from "jspdf";
import { QUOTE_DRAFT_KEY, type QuoteDraft } from "@/routes/shop.bedside-tables.$productSlug";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/request-a-quote")({
  head: () => ({
    meta: [
      { title: "Request a quote — IXIA London" },
      {
        name: "description",
        content: "Enquire about a bespoke IXIA London piece — outside standard configurations.",
      },
    ],
  }),
  component: QuotePage,
});

interface QuoteFormValues {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  notes: string;
}

function QuotePage() {
  const [draft, setDraft] = useState<QuoteDraft | null>(null);
  const [sent, setSent] = useState(false);
  const [quoteRef, setQuoteRef] = useState<string>("");

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(QUOTE_DRAFT_KEY);
      if (raw) setDraft(JSON.parse(raw) as QuoteDraft);
    } catch {
      /* ignore */
    }
  }, []);

  const handle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const values: QuoteFormValues = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      postcode: String(fd.get("postcode") ?? "").trim(),
      notes: String(fd.get("notes") ?? "").trim(),
    };
    const ref = `IXIA-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    setQuoteRef(ref);
    generateQuotePdf(ref, values, draft);
    setSent(true);
    try {
      sessionStorage.removeItem(QUOTE_DRAFT_KEY);
    } catch {
      /* ignore */
    }
  };

  return (
    <section className="mx-auto max-w-[1440px] px-6 lg:px-12 py-20 grid gap-16 lg:grid-cols-[1fr_1fr]">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-taupe">Bespoke</p>
        <h1 className="mt-4 font-serif text-5xl lg:text-6xl leading-[1.03]">
          Request a bespoke quote.
        </h1>
        <p className="mt-6 text-charcoal/75 leading-relaxed max-w-lg">
          Every IXIA piece is made to order. Share your details and — once submitted — a PDF
          summary of your configuration will download automatically. The studio will confirm
          delivery and any bespoke variations.
        </p>

        {draft && (
          <div className="mt-10 border border-ink/10 p-6 bg-ivory/40">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-taupe">Your configuration</p>
            <h2 className="mt-2 font-serif text-2xl">{draft.productName}</h2>
            <p className="text-[11px] uppercase tracking-[0.2em] text-charcoal/60 mt-1">
              {draft.collectionLabel}
            </p>
            <dl className="mt-5 space-y-2 text-sm">
              <Row label="Size" value={draft.sizeLabel} />
              {draft.selections.map((s) => (
                <Row
                  key={s.stepLabel}
                  label={s.stepLabel}
                  value={`${s.optionLabel}${s.priceDelta ? ` (+${formatPrice(s.priceDelta)})` : ""}`}
                />
              ))}
              <Row label="Lead time" value={draft.leadTime} />
              <Row label="Package price" value={formatPrice(draft.totalPrice)} strong />
            </dl>
          </div>
        )}
      </div>

      {sent ? (
        <div className="border border-ink/10 p-10 bg-ivory/40">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-taupe">Received</p>
          <h2 className="mt-4 font-serif text-3xl">Thank you.</h2>
          <p className="mt-4 text-charcoal/75 leading-relaxed">
            Your quote request <span className="font-mono text-ink">{quoteRef}</span> has been
            logged and a PDF summary has downloaded to your device. A member of the studio will
            be in touch shortly.
          </p>
          <Link
            to="/shop/bedside-tables"
            className="mt-8 inline-block border-b border-ink pb-1 text-[11px] uppercase tracking-[0.2em]"
          >
            Continue browsing →
          </Link>
        </div>
      ) : (
        <form onSubmit={handle} className="space-y-5 border border-ink/10 p-10">
          <Field label="Full name" name="name" required />
          <Field label="Email" type="email" name="email" required />
          <Field label="Phone" name="phone" />
          <Field label="Delivery postcode" name="postcode" />
          <div>
            <label className="block">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-2">
                Notes for the studio
              </span>
              <textarea
                name="notes"
                rows={5}
                placeholder={
                  draft
                    ? "Anything you'd like us to know — a matched pair, alternative dimensions, timing constraints…"
                    : "Tell us what you'd like us to make."
                }
                className="w-full bg-transparent border-b border-ink/15 py-2 text-sm placeholder:text-taupe/60 focus:border-ink focus:outline-none resize-none"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-olive text-background py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-charcoal transition-colors"
          >
            Submit & download quote PDF
          </button>
        </form>
      )}
    </section>
  );
}

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex justify-between gap-6 border-b border-ink/8 pb-2">
      <dt className="text-[11px] uppercase tracking-[0.2em] text-taupe">{label}</dt>
      <dd className={`text-right ${strong ? "font-serif text-lg text-ink" : "text-charcoal"}`}>
        {value}
      </dd>
    </div>
  );
}

function Field({
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
        className="w-full bg-transparent border-b border-ink/15 py-2 text-sm placeholder:text-taupe/50 focus:border-ink focus:outline-none"
      />
    </label>
  );
}

function generateQuotePdf(ref: string, values: QuoteFormValues, draft: QuoteDraft | null) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 56;
  let y = margin;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text("IXIA LONDON", margin, y);
  doc.text(`REF ${ref}`, pageWidth - margin, y, { align: "right" });
  y += 40;

  doc.setFontSize(22);
  doc.setTextColor(30);
  doc.text("Bespoke quote request", margin, y);
  y += 14;
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }), margin, y);
  y += 30;

  const section = (title: string) => {
    doc.setDrawColor(220);
    doc.line(margin, y, pageWidth - margin, y);
    y += 18;
    doc.setFontSize(9);
    doc.setTextColor(140);
    doc.text(title.toUpperCase(), margin, y);
    y += 18;
    doc.setFontSize(11);
    doc.setTextColor(30);
  };

  const row = (label: string, value: string) => {
    doc.setFontSize(9);
    doc.setTextColor(140);
    doc.text(label, margin, y);
    doc.setFontSize(11);
    doc.setTextColor(30);
    const wrapped = doc.splitTextToSize(value || "—", pageWidth - margin * 2 - 140);
    doc.text(wrapped, margin + 140, y);
    y += Math.max(18, wrapped.length * 14);
  };

  section("Customer");
  row("Name", values.name);
  row("Email", values.email);
  if (values.phone) row("Phone", values.phone);
  if (values.postcode) row("Delivery postcode", values.postcode);
  y += 8;

  if (draft) {
    section("Piece");
    row("Product", draft.productName);
    row("Collection", draft.collectionLabel);
    row("Size", draft.sizeLabel);
    row("Lead time", draft.leadTime);
    row("Base price", formatPrice(draft.basePrice));
    if (draft.sizePriceDelta) row("Size surcharge", `+${formatPrice(draft.sizePriceDelta)}`);
    row("Package price", formatPrice(draft.totalPrice));
    y += 8;

    section("Configuration");
    for (const s of draft.selections) {
      row(
        s.stepLabel,
        `${s.optionLabel}${s.priceDelta ? ` (+${formatPrice(s.priceDelta)})` : " (Included)"}`,
      );
    }
    y += 8;
  }

  if (values.notes) {
    section("Notes");
    doc.setFontSize(11);
    doc.setTextColor(30);
    const wrapped = doc.splitTextToSize(values.notes, pageWidth - margin * 2);
    doc.text(wrapped, margin, y);
    y += wrapped.length * 14 + 8;
  }

  y = doc.internal.pageSize.getHeight() - margin;
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text(
    "IXIA London · Chiswick Studio · Package price excludes unconfirmed delivery or bespoke variations.",
    margin,
    y,
  );

  doc.save(`IXIA-quote-${ref}.pdf`);
}
