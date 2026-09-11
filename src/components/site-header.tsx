import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import ixiaLogo from "@/assets/ixia-logo-white.png";
import galleryImage from "@/assets/room-master.jpg";

const liveMenuItems = [
  { label: "Home", href: "https://ixialondon.com/" },
  { label: "About", href: "https://ixialondon.com/about/" },
  { label: "Portfolio", href: "https://ixialondon.com/portfolio/", badge: "Latest" },
  { label: "Services", href: "https://ixialondon.com/services/", active: true },
  { label: "Blog", href: "https://ixialondon.com/blog/" },
  { label: "Contact", href: "https://ixialondon.com/contact/" },
] as const;

export function SiteHeader() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-dark text-white">
      <nav
        className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between px-6 lg:px-12"
        aria-label="IXIA London navigation"
      >
        <Link to="/shop" className="shrink-0 py-3" aria-label="IXIA London shop">
          <img src={ixiaLogo} alt="IXIA London Interior Design" className="h-12 w-auto" />
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="relative grid size-11 place-items-center transition-colors hover:text-brand-accent"
            aria-label={`Basket${count ? `, ${count} item${count === 1 ? "" : "s"}` : ""}`}
          >
            <ShoppingBag className="size-5" strokeWidth={1.6} />
            {count > 0 && (
              <span className="absolute right-0 top-0 flex size-5 items-center justify-center rounded-full bg-brand-accent text-[10px] font-semibold text-white">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="grid size-11 place-items-center transition-colors hover:text-brand-accent"
          >
            <Menu className="size-7" strokeWidth={1.8} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/55" role="presentation" onClick={() => setOpen(false)}>
          <aside
            className="flex h-full w-[min(430px,88vw)] flex-col overflow-y-auto bg-brand-dark text-white shadow-2xl"
            aria-label="Live IXIA website menu"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex min-h-20 items-center justify-between border-b border-white/10 px-7">
              <img src={ixiaLogo} alt="IXIA London Interior Design" className="h-10 w-auto" />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid size-11 place-items-center text-white/75 transition-colors hover:text-brand-accent"
              >
                <X className="size-7" strokeWidth={1.8} />
              </button>
            </div>

            <div className="flex items-center gap-4 px-7 py-5 text-sm font-semibold">
              <span>Follow Us:</span>
              <a href="https://www.facebook.com/ixialondon" aria-label="IXIA London on Facebook" className="grid size-8 place-items-center rounded-full bg-white text-brand-accent hover:bg-brand-accent hover:text-white">
                <Facebook className="size-4" fill="currentColor" />
              </a>
              <a href="https://www.instagram.com/ixialondon/" aria-label="IXIA London on Instagram" className="grid size-8 place-items-center rounded-full bg-white text-brand-accent hover:bg-brand-accent hover:text-white">
                <Instagram className="size-4" />
              </a>
            </div>

            <nav className="px-7 py-7" aria-label="Live website pages">
              <ul className="space-y-1">
                {liveMenuItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`group flex items-center gap-3 py-3 text-[15px] font-semibold uppercase tracking-[0.08em] transition-colors hover:text-brand-accent ${item.active ? "text-brand-accent" : "text-white"}`}
                    >
                      {item.label}
                      {item.badge && <span className="bg-brand-accent px-1.5 py-0.5 text-[8px] uppercase tracking-normal text-white">{item.badge}</span>}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-white/30 pt-5">
                <p className="flex items-center gap-4 text-[15px] font-semibold uppercase tracking-[0.08em]">Gallery <span className="h-px flex-1 bg-white/70" /></p>
                <a href="https://ixialondon.com/portfolio/" onClick={() => setOpen(false)} className="mt-6 block overflow-hidden">
                  <img src={galleryImage} alt="View the IXIA London gallery" className="aspect-[4/3] w-full object-cover opacity-90 transition-transform duration-700 hover:scale-105" />
                </a>
              </div>
            </nav>

            <div className="mt-auto border-t border-white/10 px-7 py-5">
              <Link to="/shop" onClick={() => setOpen(false)} className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-accent hover:text-white">
                Shop the collection →
              </Link>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
