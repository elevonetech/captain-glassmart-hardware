import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, MessageCircle, MapPin, Phone, Mail, Clock } from "lucide-react";
import logo from "@/assets/captain-logo.png.asset.json";
import { PHONE, EMAIL, ADDRESS, HOURS, WHATSAPP, categories } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/70">
      <div className="container-x py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <img src={logo.url} alt="Captain Glassmart & Hardware" className="h-16 w-auto mb-4" />
          <p className="text-sm max-w-sm">
            Your trusted partner for building materials, glass solutions, aluminium fabrication, and hardware supplies. Building quality. Delivering trust.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[Facebook, Instagram, Linkedin, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href={i === 3 ? WHATSAPP : "#"}
                className="w-9 h-9 grid place-items-center rounded-full border border-white/15 hover:bg-orange hover:border-orange hover:text-white transition-colors"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white text-sm font-bold tracking-widest uppercase mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About Us" },
              { to: "/products", label: "Products" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}><Link to={l.to} className="hover:text-orange transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-bold tracking-widest uppercase mb-4">Categories</h4>
          <ul className="space-y-2 text-sm">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}><Link to="/products" className="hover:text-orange transition-colors">{c.name}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-bold tracking-widest uppercase mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3"><MapPin className="h-4 w-4 text-orange shrink-0 mt-0.5" /><span>{ADDRESS}</span></li>
            <li className="flex gap-3"><Phone className="h-4 w-4 text-orange shrink-0 mt-0.5" /><span>{PHONE}</span></li>
            <li className="flex gap-3"><Mail className="h-4 w-4 text-orange shrink-0 mt-0.5" /><span>{EMAIL}</span></li>
            <li className="flex gap-3"><Clock className="h-4 w-4 text-orange shrink-0 mt-0.5" /><span>{HOURS}</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Captain Glassmart & Hardware. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-orange">Terms & Conditions</a>
            <a href="#" className="hover:text-orange">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
