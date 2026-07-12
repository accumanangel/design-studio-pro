import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-background/85 mt-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-20 grid gap-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <span className="font-serif text-3xl italic tracking-tight text-background">IXIA</span>
          <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-background/45">
            London Atelier
          </p>
          <p className="mt-8 max-w-xs text-sm leading-relaxed text-background/70">
            A Chiswick-based interior design studio creating tailored, practical and beautiful
            homes for modern family life.
          </p>
        </div>

        <div className="space-y-4 text-[11px] uppercase tracking-[0.2em]">
          <p className="text-background/40">Shop</p>
          <ul className="space-y-3 text-background/85">
            <li><Link to="/shop">Furniture</Link></li>
            <li><Link to="/shop/bedside-tables">Bedside tables</Link></li>
            <li><Link to="/request-a-quote">Request a quote</Link></li>
          </ul>
        </div>

        <div className="space-y-4 text-[11px] uppercase tracking-[0.2em]">
          <p className="text-background/40">Studio</p>
          <ul className="space-y-3 text-background/85">
            <li><Link to="/about">About IXIA</Link></li>
            <li><Link to="/interior-design">Interior design</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="space-y-4 text-[11px] uppercase tracking-[0.2em]">
          <p className="text-background/40">Newsletter</p>
          <p className="text-sm normal-case tracking-normal text-background/70">
            Quiet dispatches from the studio. No noise.
          </p>
          <form className="flex border-b border-background/30 pb-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-transparent text-sm normal-case tracking-normal placeholder:text-background/40 focus:outline-none"
            />
            <button className="text-[11px] tracking-[0.2em] text-background/70 hover:text-background">
              Sign up
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-6 flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[0.25em] text-background/40">
          <span>© IXIA London Ltd — MMXXVI</span>
          <div className="flex gap-6">
            <a href="#">Delivery</a>
            <a href="#">Returns</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
