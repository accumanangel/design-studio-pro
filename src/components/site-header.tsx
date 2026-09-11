import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import ixiaLogo from "@/assets/ixia-logo-white.png";

const shopLinks = [
  { to: "/shop", label: "Shop" },
  { to: "/shop/bedside-tables", label: "Bedside Tables" },
  { to: "/shop/bedside-tables/childrens", label: "Children’s" },
  { to: "/shop/bedside-tables/guest-room", label: "Guest Room" },
  { to: "/shop/bedside-tables/master-suite", label: "Master Suite" },
] as const;

export function SiteHeader() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-brand-dark text-white">
      <nav
        className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-8 px-6 lg:px-12"
        aria-label="Shop navigation"
      >
        <Link to="/shop" className="shrink-0 py-3" aria-label="IXIA London shop">
          <img src={ixiaLogo} alt="IXIA London Interior Design" className="h-12 w-auto" />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {shopLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="py-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80 transition-colors hover:text-brand-accent"
              activeProps={{ className: "text-brand-accent" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <Link
            to="/cart"
            className="relative grid size-11 place-items-center transition-colors hover:text-brand-accent"
            aria-label={`Basket${count ? `, ${count} item${count === 1 ? "" : "s"}` : ""}`}
          >
            <ShoppingBag className="size-5" strokeWidth={1.6} />
            {count > 0 && (
              <span className="absolute right-0 top-0 flex size-5 items-center justify-center rounded-full bg-brand-accent text-[10px] font-semibold text-white">{count}</span>
            )}
          </Link>
          <button
            type="button"
            aria-label="Open shop menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="grid size-11 place-items-center transition-colors hover:text-brand-accent lg:hidden"
          >
            <Menu className="size-6" strokeWidth={1.8} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 bg-brand-dark text-white lg:hidden">
          <div className="flex min-h-20 items-center justify-between border-b border-white/10 px-6">
            <img src={ixiaLogo} alt="IXIA London Interior Design" className="h-10 w-auto" />
            <button type="button" aria-label="Close shop menu" onClick={() => setOpen(false)} className="grid size-11 place-items-center hover:text-brand-accent">
              <X className="size-6" />
            </button>
          </div>
          <div className="flex flex-col px-6 py-8">
            {shopLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-5 font-serif text-2xl text-white/90 transition-colors hover:text-brand-accent"
                activeProps={{ className: "text-brand-accent" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
