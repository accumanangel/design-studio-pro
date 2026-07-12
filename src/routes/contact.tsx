import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — IXIA London" },
      { name: "description", content: "Get in touch with the IXIA London design studio in Chiswick." },
    ],
  }),
  component: () => {
    const [sent, setSent] = useState(false);
    const submit = (e: FormEvent) => {
      e.preventDefault();
      setSent(true);
    };
    return (
      <section className="mx-auto max-w-[1440px] px-6 lg:px-12 py-20 grid gap-16 lg:grid-cols-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-taupe">Contact</p>
          <h1 className="mt-4 font-serif text-5xl lg:text-6xl leading-[1.03]">
            We'd love to hear from you.
          </h1>
          <div className="mt-10 space-y-6 text-charcoal/80 leading-relaxed">
            <p>
              The studio<br />
              Chiswick, London W4<br />
              <span className="text-taupe">By appointment</span>
            </p>
            <p>
              hello@ixialondon.com<br />
              +44 (0)20 8000 0000
            </p>
          </div>
        </div>
        {sent ? (
          <div className="border border-ink/10 p-10 bg-ivory/40">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-taupe">Received</p>
            <h2 className="mt-4 font-serif text-3xl">Thank you.</h2>
            <p className="mt-4 text-charcoal/75">A member of the studio will reply shortly.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5 border border-ink/10 p-10">
            <label className="block">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-2">Name</span>
              <input required className="w-full bg-transparent border-b border-ink/15 py-2 text-sm focus:border-ink focus:outline-none" />
            </label>
            <label className="block">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-2">Email</span>
              <input required type="email" className="w-full bg-transparent border-b border-ink/15 py-2 text-sm focus:border-ink focus:outline-none" />
            </label>
            <label className="block">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-2">Message</span>
              <textarea required rows={5} className="w-full bg-transparent border-b border-ink/15 py-2 text-sm focus:border-ink focus:outline-none resize-none" />
            </label>
            <button type="submit" className="w-full bg-olive text-background py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-charcoal transition-colors">
              Send message
            </button>
          </form>
        )}
      </section>
    );
  },
});
