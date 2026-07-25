import { Link } from "@tanstack/react-router";
import { Phone, Menu, X, MessageCircle } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/captain-logo.png.asset.json";
import { PHONE, PHONE_HREF, EMAIL, ADDRESS, HOURS } from "@/lib/site-data";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/products", label: "Products" },
  { to: "/contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
      {/* top strip */}
      <div className="hidden md:block bg-charcoal text-white/70 text-xs">
        <div className="container-x flex items-center justify-between py-2">
          <div className="flex items-center gap-6">
            <span>{ADDRESS}</span>
            <span className="text-white/40">|</span>
            <span>{HOURS}</span>
          </div>
          <a href={`mailto:${EMAIL}`} className="hover:text-orange transition-colors">{EMAIL}</a>
        </div>
      </div>

      <div className="container-x flex items-center justify-between gap-4 py-3">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo.url} alt="Captain Glassmart & Hardware" className="h-14 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-4 py-2 text-sm font-semibold text-charcoal hover:text-orange transition-colors relative"
              activeProps={{ className: "px-4 py-2 text-sm font-semibold text-orange" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={PHONE_HREF} className="hidden sm:inline-flex btn-orange btn-orange-hover">
            <Phone className="h-4 w-4" />
            {PHONE}
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-charcoal"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="container-x py-3 flex flex-col">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-semibold border-b border-border last:border-0"
                activeProps={{ className: "py-3 text-sm font-semibold text-orange border-b border-border last:border-0" }}
              >
                {l.label}
              </Link>
            ))}
            <a href={PHONE_HREF} className="btn-orange btn-orange-hover mt-4">
              <Phone className="h-4 w-4" /> Call {PHONE}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
