import React, { useMemo, useState, useEffect } from "react";
import {
  Search,
  Award,
  Tag,
  Package,
  Headphones,
  MessageCircle,
  Grid3x3,
  List,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Pagination } from "@/components/site/Pagination";
import { products, filterCategories, WHATSAPP } from "@/lib/site-data";
import productsHeros from "@/assets/products-heros.png";
import heroImg from "@/assets/hero-hardware.jpg";

const ITEMS_PER_PAGE = 12;

export default function Products() {
  const [active, setActive] = useState("All Products");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [heroIndex, setHeroIndex] = useState(0);

  const heroSlides = useMemo(
    () => [
      {
        image: productsHeros,
        label: "Product showcase",
        detail: "Featured product visual from our catalogue.",
      },
      ...products.slice(0, 4).map((p) => ({
        image: p.image,
        label: p.name,
        detail: p.category,
      })),
    ],
    [],
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 7000);
    return () => window.clearInterval(interval);
  }, [heroSlides.length]);

  const filtered = useMemo(() => {
    let list = products.slice();
    if (active !== "All Products") list = list.filter((p) => p.category === active);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
      );
    }
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [active, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  // reset to page 1 whenever filters/search/sort change
  useEffect(() => {
    setPage(1);
  }, [active, query, sort]);

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  return (
    <SiteLayout>
      {/* HEADER */}
      <section className="relative overflow-hidden text-white">
        <img
          src={heroImg}
          alt="Bright hardware showroom background"
          className="absolute inset-0 h-full w-full object-cover brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/65 via-slate-900/30 to-slate-950/50" />
        <div className="container-x relative py-12 md:py-16 lg:py-20 max-w-5xl">
          <div className="grid lg:grid-cols-[1.4fr_auto] gap-10 items-center">
            <div className="max-w-xl">
              <p className="eyebrow flex items-center gap-3">
                <span className="h-px w-10 bg-orange" />
                Catalogue
              </p>
              <h1 className="text-hero text-4xl md:text-5xl lg:text-6xl mt-4 leading-tight text-white">
                Explore <span className="text-orange">Products</span> built to perform.
              </h1>
              <p className="mt-4 max-w-xl text-white/80 text-base md:text-lg">
                Discover premium hardware, glass, aluminium, fittings, tools and finishing materials
                with clear pricing and fast support.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-orange btn-orange-hover"
                >
                  Request a Quote
                </a>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 text-sm text-white/75">
                {[
                  { Icon: Award, t: "Top Quality" },
                  { Icon: Tag, t: "Best Prices" },
                  { Icon: Package, t: "Wide Selection" },
                  { Icon: Headphones, t: "Expert Support" },
                ].map(({ Icon, t }) => (
                  <div
                    key={t}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
                  >
                    <div className="w-10 h-10 grid place-items-center rounded-2xl border border-orange/30 text-orange bg-white/10">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-xl">
              <img
                src={heroSlides[heroIndex].image}
                alt={heroSlides[heroIndex].label}
                className="h-[320px] w-full object-cover sm:h-[400px]"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent">
                <div className="inline-flex items-center gap-2 rounded-full bg-orange/95 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-white">
                  Featured
                </div>
                <div className="mt-4 text-xl font-semibold text-white">
                  {heroSlides[heroIndex].label}
                </div>
                <p className="mt-1 text-sm text-white/80">{heroSlides[heroIndex].detail}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOGUE */}
      <section className="py-12 md:py-16">
        <div className="container-x grid lg:grid-cols-[240px_1fr] gap-10">
          {/* SIDEBAR */}
          <aside className="space-y-6">
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold text-orange mb-3">
                Product Categories
              </h3>
              <ul className="border border-border rounded-md overflow-hidden bg-white">
                {filterCategories.map((c) => (
                  <li key={c}>
                    <button
                      onClick={() => setActive(c)}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors border-b border-border last:border-0 ${
                        active === c
                          ? "bg-orange text-white font-semibold"
                          : "hover:bg-secondary text-charcoal"
                      }`}
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-secondary rounded-md p-5 border border-border">
              <h4 className="text-sm font-bold text-charcoal">Need something specific?</h4>
              <p className="text-xs text-muted-foreground mt-2">
                We source special materials and custom solutions for your project.
              </p>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange hover:text-charcoal"
              >
                <MessageCircle className="h-4 w-4" /> Request a Quote
              </a>
            </div>
          </aside>

          {/* MAIN */}
          <div>
            {/* TOOLBAR */}
            <div className="flex flex-wrap items-center gap-3 justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-bold text-charcoal">
                  {filtered.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1}
                  {"–"}
                  {Math.min(page * ITEMS_PER_PAGE, filtered.length)}
                </span>{" "}
                of {filtered.length} products
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="pl-9 pr-3 py-2 text-sm border border-border rounded-md bg-white w-56 focus:outline-none focus:border-orange"
                  />
                </div>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="text-sm border border-border rounded-md bg-white px-3 py-2 focus:outline-none focus:border-orange"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="name">Sort by: Name</option>
                </select>
                <div className="flex border border-border rounded-md overflow-hidden bg-white">
                  <button
                    onClick={() => setView("grid")}
                    className={`p-2 ${view === "grid" ? "bg-orange text-white" : "text-charcoal"}`}
                    aria-label="Grid"
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-2 ${view === "list" ? "bg-orange text-white" : "text-charcoal"}`}
                    aria-label="List"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* GRID */}
            {view === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginated.map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {paginated.map((p) => (
                  <div
                    key={p.id}
                    className="flex gap-4 border border-border rounded-md p-3 bg-white hover:border-orange transition-colors"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="w-28 h-28 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] eyebrow text-orange">{p.category}</div>
                      <h3 className="text-sm font-bold text-charcoal">{p.name}</h3>
                      <p className="text-xs text-muted-foreground">{p.variant}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm font-bold">{p.price}</span>
                        <a
                          href={`${WHATSAPP}?text=Hi, I'd like to enquire about ${encodeURIComponent(p.name)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-orange hover:text-charcoal"
                        >
                          <MessageCircle className="h-3.5 w-3.5" /> Enquire
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                No products match your search.
              </div>
            )}

            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function ProductCard({ p }) {
  return (
    <article className="group bg-white border border-border rounded-md overflow-hidden hover:border-orange transition-colors">
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
        <p className="text-xs text-muted-foreground">{p.variant}</p>
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
  );
}
