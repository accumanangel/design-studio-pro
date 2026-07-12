import { Link } from "@tanstack/react-router";
import { Menu, Search, User, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

const primaryLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/interior-design", label: "Interior Design" },
  { to: "/shop", label: "Shop" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ink/8 bg-background/90 backdrop-blur-sm">
      <nav className="relative mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:px-12">
        <div className="hidden lg:flex items-center gap-7 text-[11px] font-medium uppercase tracking-[0.18em] text-ink">
          {primaryLinks.slice(0, 4).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-taupe transition-colors"
              activeProps={{ className: "text-olive" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl italic tracking-tight text-ink"
          aria-label="IXIA London"
        >
          IXIA
        </Link>

        <div className="hidden lg:flex items-center gap-6 text-[11px] font-medium uppercase tracking-[0.18em] text-ink">
          {primaryLinks.slice(4).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-taupe transition-colors"
              activeProps={{ className: "text-olive" }}
            >
              {l.label}
            </Link>
          ))}
          <button aria-label="Search" className="hover:text-taupe">
            <Search className="size-4" strokeWidth={1.5} />
          </button>
          <button aria-label="Account" className="hover:text-taupe">
            <User className="size-4" strokeWidth={1.5} />
          </button>
          <Link to="/cart" className="relative hover:text-taupe" aria-label="Basket">
            <ShoppingBag className="size-4" strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -right-3 -top-2 flex size-4 items-center justify-center rounded-full bg-olive text-[9px] text-background font-sans">
                {count}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex lg:hidden items-center gap-4">
          <Link to="/cart" className="relative" aria-label="Basket">
            <ShoppingBag className="size-5" strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -right-2 -top-1 flex size-4 items-center justify-center rounded-full bg-olive text-[9px] text-background">
                {count}
              </span>
            )}
          </Link>
          <button aria-label="Menu" onClick={() => setOpen(true)}>
            <Menu className="size-5" strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 bg-background lg:hidden">
          <div className="flex items-center justify-between px-6 h-16 border-b border-ink/8">
            <span className="font-serif text-2xl italic">IXIA</span>
            <button aria-label="Close menu" onClick={() => setOpen(false)}>
              <X className="size-5" />
            </button>
          </div>
          <div className="flex flex-col gap-6 px-8 py-12 text-lg font-serif">
            {primaryLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="border-b border-ink/8 pb-3"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
