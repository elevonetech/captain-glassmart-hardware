import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const delta = 1; // how many neighbors to show around current page

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  const goTo = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-10" aria-label="Pagination">
      <button
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 grid place-items-center rounded-md border border-border bg-white text-charcoal disabled:opacity-40 disabled:cursor-not-allowed hover:border-orange hover:text-orange transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {getPageNumbers().map((p, i) =>
        p === "..." ? (
          <span
            key={`dots-${i}`}
            className="w-9 h-9 grid place-items-center text-sm text-muted-foreground"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => goTo(p)}
            className={`w-9 h-9 grid place-items-center rounded-md text-sm font-semibold border transition-colors ${
              p === currentPage
                ? "bg-orange text-white border-orange"
                : "bg-white text-charcoal border-border hover:border-orange hover:text-orange"
            }`}
            aria-current={p === currentPage ? "page" : undefined}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 grid place-items-center rounded-md border border-border bg-white text-charcoal disabled:opacity-40 disabled:cursor-not-allowed hover:border-orange hover:text-orange transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
