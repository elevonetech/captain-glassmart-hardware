import React, { useState } from "react";
import { useProducts } from "@/context/ProductContext";
import { Layers, Plus, Trash2, X, Tag } from "lucide-react";
import { toast } from "sonner";

export default function AdminCategories() {
  const { categories, products, addCategory, deleteCategory } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    blurb: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Category name is required.");
      return;
    }

    addCategory(formData);
    setFormData({ name: "", blurb: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold font-display text-white tracking-tight sm:text-3xl flex items-center gap-2.5">
            <Layers className="h-7 w-7 text-orange" />
            <span>Categories Management</span>
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Organize hardware and glass products into catalog groups
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-orange flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg shadow-lg shadow-orange/20 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          const productCount = products.filter(
            (p) =>
              p.categorySlug === category.slug ||
              p.category?.toLowerCase() === category.name?.toLowerCase(),
          ).length;

          return (
            <div
              key={category.slug}
              className="rounded-xl border border-gray-800 bg-[#161c26] p-5 shadow-lg flex flex-col justify-between hover:border-gray-700 transition-all"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-orange/10 px-2.5 py-1 text-xs font-semibold text-orange border border-orange/20">
                    <Tag className="h-3 w-3" />
                    <span>{category.slug}</span>
                  </span>

                  <span className="text-xs text-gray-400 font-medium">
                    {productCount} {productCount === 1 ? "Product" : "Products"}
                  </span>
                </div>

                <h3 className="mt-3 text-base font-bold text-white font-display">
                  {category.name}
                </h3>
                <p className="mt-1 text-xs text-gray-400 line-clamp-2">
                  {category.blurb || "Standard category for hardware products."}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-gray-800/80 pt-3">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                  Catalog Group
                </span>
                <button
                  onClick={() => deleteCategory(category.slug)}
                  title="Delete Category"
                  className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ADD CATEGORY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-[#161c26] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <h2 className="text-base font-bold font-display text-white">Add Category</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Electrical & Wiring"
                  className="w-full rounded-lg border border-gray-700 bg-gray-900/80 py-2 px-3 text-sm text-white placeholder-gray-500 focus:border-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Description / Blurb
                </label>
                <textarea
                  rows={3}
                  value={formData.blurb}
                  onChange={(e) => setFormData({ ...formData, blurb: e.target.value })}
                  placeholder="Short description of items in this category"
                  className="w-full rounded-lg border border-gray-700 bg-gray-900/80 py-2 px-3 text-xs text-white placeholder-gray-500 focus:border-orange focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-xs font-semibold text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-orange px-4 py-2 text-xs font-semibold rounded-lg shadow-md shadow-orange/20"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
