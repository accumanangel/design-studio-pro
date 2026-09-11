import { Link } from "@tanstack/react-router";
import ixiaLogo from "@/assets/ixia-logo-white.png";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-brand-dark text-footer-muted">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-16 md:grid-cols-3 lg:px-12 lg:py-20">
        <div>
          <Link to="/shop" className="inline-flex items-center gap-3 text-white" aria-label="IXIA London shop">
            <img src={ixiaLogo} alt="IXIA London Interior Design" className="h-16 w-auto" />
          </Link>
          <h2 className="mt-7 font-serif text-2xl font-bold text-white">The Collection</h2>
          <p className="mt-4 max-w-sm text-sm leading-7">
            Thoughtful, made-to-order furniture from an interior design studio creating inviting
            and functional spaces for modern family life.
          </p>
          <Link to="/shop/bedside-tables" className="mt-6 inline-block text-sm font-semibold text-brand-accent hover:text-white">
            Explore the collection
          </Link>
        </div>

        <div className="md:text-center">
          <h2 className="font-serif text-2xl font-bold text-white">Working Hours</h2>
          <div className="mt-4 space-y-1 text-sm leading-6">
            <p>Daily – 09:00–19:00</p>
            <p>Saturday – available upon request</p>
            <p>Sunday – available until 12:00 upon request</p>
          </div>
          <p className="mt-6 text-sm font-semibold">
            Questions about a piece?{" "}
            <Link to="/request-a-quote" className="text-brand-accent hover:text-white">Request a quote</Link>.
          </p>
        </div>

        <div className="md:text-right">
          <h2 className="font-serif text-2xl font-bold text-white">Find Us</h2>
          <div className="mt-4 space-y-5 text-sm leading-6">
            <p><strong className="block text-white/75">Address</strong>Unit 115, Barley Mow Centre<br />London, W4 4PH</p>
            <p><strong className="block text-white/75">Phone</strong><a href="tel:07932781807" className="text-brand-accent hover:text-white">07932781807</a></p>
            <p><strong className="block text-white/75">Email</strong><a href="mailto:kirsty@ixialondon.com" className="text-brand-accent hover:text-white">kirsty@ixialondon.com</a></p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-6 py-6 text-xs text-white/75 md:flex-row md:items-center md:justify-between lg:px-12">
          <p>Copyright © 2026 All Rights Reserved</p>
          <p>COMPANY NO. <span className="text-brand-accent">11845610</span> | VAT NO. 449 4191 69</p>
        </div>
      </div>
    </footer>
  );
}
