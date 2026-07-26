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
  Image as ImageIcon,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Pagination } from "@/components/site/Pagination";
import { WHATSAPP } from "@/lib/site-data";
import { useProducts } from "@/context/ProductContext";
import heroImg from "@/assets/hero-hardware.jpg";

const ITEMS_PER_PAGE = 12;

export default function Products() {
  const { products, categories } = useProducts();
  const [active, setActive] = useState("All Products");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);

  const filterCategories = useMemo(() => {
    const list = ["All Products"];
    categories.forEach((c) => {
      if (!list.includes(c.name)) list.push(c.name);
    });
    return list;
  }, [categories]);

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
  }, [products, active, query, sort]);

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
      <section className="relative bg-charcoal text-white overflow-hidden">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/60" />
        <div className="container-x relative py-16 md:py-24">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">Catalogue</p>
              <h1 className="text-hero text-5xl md:text-7xl mt-4">
                Our <span className="text-orange">Products.</span>
              </h1>
              <p className="mt-4 text-white/70">
                High-quality building materials, finishing products and hardware solutions for every
                construction and renovation need.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {[
                { Icon: Award, t: "Top Quality", d: "Built to last" },
                { Icon: Tag, t: "Best Prices", d: "Every budget" },
                { Icon: Package, t: "Wide Selection", d: "One roof" },
                { Icon: Headphones, t: "Expert Support", d: "You can trust" },
              ].map(({ Icon, t, d }) => (
                <div key={t} className="flex flex-col items-start gap-2">
                  <div className="w-10 h-10 grid place-items-center rounded-md border border-orange/40 text-orange">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="text-sm font-bold uppercase tracking-wider">{t}</div>
                  <div className="text-xs text-white/50">{d}</div>
                </div>
              ))}
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
                    <div className="w-28 h-28 shrink-0 overflow-hidden rounded bg-secondary flex items-center justify-center border border-border">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
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
      <div className="aspect-square overflow-hidden bg-secondary flex items-center justify-center">
        {p.image ? (
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <ImageIcon className="h-10 w-10 text-gray-300" />
        )}
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
