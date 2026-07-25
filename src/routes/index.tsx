import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Truck, Wrench, Headphones, ShieldCheck, Sparkles, MessageCircle, Phone } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { categories, products, WHATSAPP, PHONE_HREF } from "@/lib/site-data";
import heroImg from "@/assets/hero-hardware.jpg";
import aboutStore from "@/assets/about-store.jpg";
import aboutWorker from "@/assets/about-worker.jpg";
import catGlass from "@/assets/cat-glass.jpg";
import catBuilding from "@/assets/cat-building.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Captain Glassmart & Hardware — Building Quality. Delivering Trust." },
      { name: "description", content: "Premium hardware, glass, aluminium, tools and finishing solutions for every construction and renovation project in Nairobi." },
      { property: "og:title", content: "Captain Glassmart & Hardware" },
      { property: "og:description", content: "Modern industrial. Bold by design. Built for quality." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.slice(0, 8);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-charcoal text-white">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/20" />
        <div className="absolute inset-0 grid-bg opacity-60" />

        <div className="container-x relative py-24 md:py-36 lg:py-44 max-w-5xl">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-10 bg-orange" />
            Modern Industrial Hardware
          </p>
          <h1 className="text-hero mt-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            Building <span className="text-orange">Quality.</span>
            <br />
            Delivering Trust.
          </h1>
          <p className="mt-8 max-w-xl text-base md:text-lg text-white/70">
            Captain Glassmart & Hardware supplies premium building materials, glass, aluminium fabrication, furniture fittings, tools, adhesives and finishing products — for the trades that build, repair and finish with confidence.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/products" className="btn-orange btn-orange-hover">
              Explore Our Products <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-ghost-light">Get a Quote</Link>
          </div>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl border-t border-white/10 pt-8">
            {[
              { k: "1,400+", v: "SKU Range" },
              { k: "08", v: "Categories" },
              { k: "10+", v: "Years Trading" },
              { k: "500+", v: "Trade Clients" },
            ].map((s) => (
              <div key={s.v}>
                <div className="text-hero text-3xl md:text-4xl text-white">{s.k}</div>
                <div className="text-xs tracking-widest uppercase text-white/50 mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST FEATURES */}
      <section className="bg-charcoal-2 text-white border-t border-white/5">
        <div className="container-x grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          {[
            { Icon: Award, t: "Quality Products", d: "We source the best materials for durability." },
            { Icon: Wrench, t: "Expert Solutions", d: "Professional advice and craftsmanship." },
            { Icon: Truck, t: "Reliable Delivery", d: "On-time delivery for every project." },
            { Icon: Headphones, t: "Customer Support", d: "We're here to support you always." },
          ].map(({ Icon, t, d }) => (
            <div key={t} className="p-6 md:p-8 flex items-start gap-4">
              <div className="w-11 h-11 shrink-0 grid place-items-center rounded-md border border-orange/40 text-orange">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold uppercase tracking-wider">{t}</div>
                <p className="text-sm text-white/60 mt-1">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <p className="eyebrow">Shop by Category</p>
              <h2 className="text-hero text-4xl md:text-5xl mt-3 text-charcoal">
                Everything you need. <br className="hidden sm:block" />
                <span className="text-orange">All in one place.</span>
              </h2>
            </div>
            <Link to="/products" className="text-sm font-semibold text-charcoal hover:text-orange inline-flex items-center gap-2">
              Browse all products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((c) => (
              <Link
                to="/products"
                key={c.slug}
                className="group relative aspect-[4/5] overflow-hidden rounded-md bg-charcoal"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                  <div className="text-xs eyebrow text-orange">Category</div>
                  <h3 className="text-hero text-xl md:text-2xl mt-1">{c.name}</h3>
                  <p className="text-xs text-white/60 mt-1 hidden md:block">{c.blurb}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-orange">
                    View products <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 md:py-28 bg-secondary/50">
        <div className="container-x">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <p className="eyebrow">Featured Products</p>
              <h2 className="text-hero text-4xl md:text-5xl mt-3 text-charcoal">
                From the <span className="text-orange">catalogue.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((p) => (
              <article key={p.id} className="group bg-white border border-border rounded-md overflow-hidden hover:border-orange transition-colors">
                <div className="aspect-square overflow-hidden bg-secondary">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <div className="text-[10px] eyebrow text-orange">{p.category}</div>
                  <h3 className="mt-1 text-sm font-bold text-charcoal">{p.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.variant}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-bold text-charcoal">{p.price}</span>
                    <a
                      href={`${WHATSAPP}?text=Hi, I'd like to enquire about ${encodeURIComponent(p.name)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 grid place-items-center rounded bg-orange text-white hover:bg-orange-glow transition-colors"
                      aria-label="Enquire via WhatsApp"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/products" className="btn-orange btn-orange-hover">
              View All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="py-20 md:py-28">
        <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="eyebrow">About Us</p>
            <h2 className="text-hero text-4xl md:text-5xl mt-3 text-charcoal">
              Building <span className="text-orange">Better</span> Together.
            </h2>
            <p className="mt-6 text-muted-foreground">
              Captain Glassmart & Hardware is a leading supplier of quality building materials, finishing products, and hardware solutions. With a focus on reliability, craftsmanship and customer satisfaction, we help clients successfully complete construction, renovation and finishing projects of all sizes.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "High-quality materials from trusted brands",
                "Competitive pricing for every budget",
                "Experienced team and professional advice",
                "Commitment to customer satisfaction",
              ].map((li) => (
                <li key={li} className="flex items-start gap-3 text-sm">
                  <ShieldCheck className="h-5 w-5 text-orange shrink-0" />
                  <span>{li}</span>
                </li>
              ))}
            </ul>
            <Link to="/about" className="btn-orange btn-orange-hover mt-8">
              Learn More About Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 relative">
            <img src={aboutStore} alt="Store" loading="lazy" className="rounded-md aspect-[4/3] object-cover" />
            <img src={catBuilding} alt="Materials" loading="lazy" className="rounded-md aspect-[4/3] object-cover" />
            <img src={aboutWorker} alt="Craftsman" loading="lazy" className="rounded-md aspect-[4/3] object-cover col-span-1" />
            <img src={catGlass} alt="Glass" loading="lazy" className="rounded-md aspect-[4/3] object-cover" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl border border-border rounded-md px-6 py-4 text-center">
              <div className="text-hero text-4xl text-orange">10+</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Years of Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange text-white">
        <div className="container-x py-14 md:py-16 grid md:grid-cols-[1fr_auto] items-center gap-8">
          <div>
            <h2 className="text-hero text-3xl md:text-4xl">Ready to start your project?</h2>
            <p className="mt-2 text-white/85 max-w-xl">Get quality materials and expert solutions for your next construction or renovation project.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-charcoal font-semibold px-6 py-3 rounded-md hover:bg-white/90 transition">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={PHONE_HREF} className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-6 py-3 rounded-md hover:bg-white/10 transition">
              <Phone className="h-4 w-4" /> Contact Us
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
