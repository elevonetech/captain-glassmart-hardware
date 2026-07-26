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
import productsHeros from "@/assets/products-heros.png";
import heroImg from "@/assets/hero-hardware.jpg";

const ITEMS_PER_PAGE = 12;

const HERO_FEATURES = [
  { Icon: Award, t: "Top Quality" },
  { Icon: Tag, t: "Best Prices" },
  { Icon: Package, t: "Wide Selection" },
  { Icon: Headphones, t: "Expert Support" },
];

export default function Products() {
  const { products, categories } = useProducts();
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
    [products],
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 7000);
    return () => window.clearInterval(interval);
  }, [heroSlides.length]);

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

  // Reset to page 1 whenever filters/search/sort change
  useEffect(() => {
    setPage(1);
  }, [active, query, sort]);

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  return (
    <SiteLayout>
      <HeroSection heroSlides={heroSlides} heroIndex={heroIndex} />

      {/* CATALOGUE */}
      <section className="py-12 md:py-16">
        <div className="container-x grid lg:grid-cols-[240px_1fr] gap-10">
          <CategorySidebar
            categories={filterCategories}
            active={active}
            setActive={setActive}
          />

          <div>
            <Toolbar
              query={query}
              setQuery={setQuery}
              sort={sort}
              setSort={setSort}
              view={view}
              setView={setView}
              filtered={filtered}
              page={page}
            />

            {view === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginated.map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {paginated.map((p) => (
                  <ProductListItem key={p.id} p={p} />
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

function HeroSection({ heroSlides, heroIndex }) {
  return (
    <section className="relative overflow-hidden text-white min-h-[520px] md:min-h-[560px]">
      <img
        src={heroImg}
        alt="Bright hardware showroom background"
        className="absolute inset-0 h-full w-full object-cover brightness-95"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/40 to-slate-950/60" />

      <div className="container-x relative py-12 md:py-16 flex items-center min-h-[520px] md:min-h-[560px]">
        <div className="grid lg:grid-cols-[1.4fr_420px] gap-10 items-center w-full">
          <HeroCopy />
          <HeroCarousel heroSlides={heroSlides} heroIndex={heroIndex} />
        </div>
      </div>
    </section>
  );
}

function HeroCopy() {
  return (
    <div className="max-w-xl">
      <p className="eyebrow flex items-center gap-3">
        <span className="h-px w-10 bg-orange" />
        Catalogue
      </p>
      <h1 className="text-hero text-4xl md:text-5xl lg:text-6xl mt-4 leading-tight text-balance text-white">
        Explore <span className="text-orange">Products</span> built to perform.
      </h1>
      <p className="mt-4 max-w-xl text-white/80 text-base md:text-lg">
        Discover premium hardware, glass, aluminium, fittings, tools and finishing
        materials with clear pricing and fast support.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-orange btn-orange-hover">
          Request a Quote
        </a>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 text-sm text-white/75">
        {HERO_FEATURES.map(({ Icon, t }) => (
          <div
            key={t}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 min-w-0"
          >
            <div className="w-10 h-10 shrink-0 grid place-items-center rounded-2xl border border-orange/30 text-orange bg-white/10">
              <Icon className="h-4 w-4" />
            </div>
            <span className="truncate">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroCarousel({ heroSlides, heroIndex }) {
  const edgeFadeStyle = {
    maskImage: "radial-gradient(ellipse 85% 80% at center, black 55%, transparent 100%)",
    WebkitMaskImage:
      "radial-gradient(ellipse 85% 80% at center, black 55%, transparent 100%)",
  };

  return (
    <div className="relative w-full lg:w-[420px] mx-auto shrink-0 h-[320px] sm:h-[400px] overflow-hidden">
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          width: `${heroSlides.length * 100}%`,
          transform: `translateX(-${(heroIndex * 100) / heroSlides.length}%)`,
        }}
      >
        {heroSlides.map((slide, i) => (
          <div key={i} className="h-full shrink-0" style={{ width: `${100 / heroSlides.length}%` }}>
            <img
              src={slide.image}
              alt={slide.label}
              className="h-full w-full object-cover"
              style={edgeFadeStyle}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function CategorySidebar({ categories, active, setActive }) {
  return (
    <aside className="space-y-6">
      <div>
        <h3 className="text-xs uppercase tracking-widest font-bold text-orange mb-3">
          Product Categories
        </h3>
        <ul className="border border-border rounded-md overflow-hidden bg-white">
          {categories.map((c) => (
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
  );
}

function Toolbar({ query, setQuery, sort, setSort, view, setView, filtered, page }) {
  return (
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

function ProductListItem({ p }) {
  return (
    <div className="flex gap-4 border border-border rounded-md p-3 bg-white hover:border-orange transition-colors">
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
  );
}