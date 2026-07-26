import React, { useState, useEffect } from "react";
import { useProducts } from "@/context/ProductContext";
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Upload,
  X,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminProducts() {
  const { products, categories, addProduct, updateProduct, deleteProduct, loading } = useProducts();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null = CREATE mode, object = EDIT mode

  // Form Fields State
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    variant: "",
    price: "",
  });

  // Image Upload Control State
  // Mode CREATE: imageFile (File|null), imagePreview (string|null)
  // Mode EDIT:
  //   - maintain: imageFile = null, deletePhoto = false, existingImage = product.image
  //   - delete: deletePhoto = true
  //   - upload new: imageFile = File, deletePhoto = false
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [deletePhoto, setDeletePhoto] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete Confirmation Dialog State
  const [productToDelete, setProductToDelete] = useState(null);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.variant && p.variant.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.price && p.price.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" ||
      p.category === selectedCategory ||
      p.categorySlug === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Pagination State & Logic
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, products.length]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Open modal for Create
  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      category: categories[0]?.name || "Hardware & Tools",
      variant: "",
      price: "KSh ",
    });
    setImageFile(null);
    setImagePreview(null);
    setDeletePhoto(false);
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      variant: product.variant || "",
      price: product.price,
    });
    setImageFile(null);
    setImagePreview(null);
    setDeletePhoto(false);
    setIsModalOpen(false);
    setIsModalOpen(true);
  };

  // Single Image Input Change handler (Enforces ONLY 1 image file)
  const handleSingleImageChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (files.length > 1) {
      toast.warning("Only 1 image file can be uploaded per product.");
    }

    const file = files[0]; // Strict 1 image constraint

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (PNG, JPG, WEBP, etc.)");
      return;
    }

    // Check size limit (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image file size should be less than 5MB.");
      return;
    }

    setImageFile(file);
    setDeletePhoto(false);

    // Create local object URL for instant preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  // Handle Action: Delete Photo on Edit
  const handleDeletePhotoClick = () => {
    setDeletePhoto(true);
    setImageFile(null);
    setImagePreview(null);
  };

  // Handle Action: Restore / Maintain Existing Photo on Edit
  const handleMaintainPhotoClick = () => {
    setDeletePhoto(false);
    setImageFile(null);
    setImagePreview(null);
  };

  // Submit Form (Create or Edit)
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.category.trim() || !formData.price.trim()) {
      toast.error("Please fill in all required fields (Name, Category, Price).");
      return;
    }

    try {
      setIsSubmitting(true);

      const categorySlug =
        categories.find((c) => c.name.toLowerCase() === formData.category.toLowerCase())?.slug ||
        formData.category.toLowerCase().replace(/[^a-z0-9]+/g, "-");

      const payload = {
        name: formData.name,
        category: formData.category,
        categorySlug,
        variant: formData.variant,
        price: formData.price,
      };

      if (editingProduct) {
        // EDIT MODE: pass options { imageFile, deletePhoto }
        await updateProduct(editingProduct.id, payload, {
          imageFile: imageFile,
          deletePhoto: deletePhoto,
        });
      } else {
        // CREATE MODE: pass single imageFile
        await addProduct(payload, imageFile);
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Submit Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Confirm Delete Product
  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete.id);
      setProductToDelete(null);
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold font-display text-white tracking-tight sm:text-3xl flex items-center gap-2.5">
            <Package className="h-7 w-7 text-orange" />
            <span>Products Management</span>
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Create, view, edit photos, and remove items in Captain Glassmart catalog
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="btn-orange flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg shadow-lg shadow-orange/20 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-gray-800 bg-[#161c26] p-4 shadow-md">
        {/* Search bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by title, price or specification..."
            className="w-full rounded-lg border border-gray-700 bg-gray-900/80 py-2 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-900/80 py-2 px-3 text-xs text-white focus:border-orange focus:outline-none cursor-pointer"
          >
            <option value="All">All Categories ({products.length})</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Data Table */}
      <div className="rounded-xl border border-gray-800 bg-[#161c26] shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-gray-800 bg-gray-900/80 text-gray-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Photo</th>
                <th className="py-3.5 px-4">Product Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Variant / Spec</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/70 text-gray-300">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <RefreshCw className="h-6 w-6 animate-spin text-orange" />
                      <span>Loading products catalog...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    No products found matching your search or category criteria.
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-800/40 transition-colors">
                    {/* Image Thumbnail */}
                    <td className="py-3 px-4">
                      <div className="h-12 w-12 overflow-hidden rounded-lg border border-gray-700 bg-gray-900 flex items-center justify-center relative group">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="h-5 w-5 text-gray-600" />
                        )}
                      </div>
                    </td>

                    {/* Name */}
                    <td className="py-3 px-4 font-semibold text-white">{product.name}</td>

                    {/* Category Badge */}
                    <td className="py-3 px-4">
                      <span className="inline-block rounded-md bg-gray-800 px-2.5 py-1 text-[11px] font-medium text-gray-300 border border-gray-700">
                        {product.category}
                      </span>
                    </td>

                    {/* Variant */}
                    <td className="py-3 px-4 text-gray-400">
                      {product.variant || <span className="text-gray-600 italic">None</span>}
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-bold text-orange">{product.price}</td>

                    {/* Action buttons */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          title="Edit Product & Image"
                          className="flex items-center gap-1 rounded-md bg-gray-800 px-2.5 py-1.5 text-xs text-gray-300 hover:bg-orange hover:text-white transition-all cursor-pointer border border-gray-700"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => setProductToDelete(product)}
                          title="Delete Product"
                          className="flex items-center gap-1 rounded-md bg-red-500/10 px-2.5 py-1.5 text-xs text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer border border-red-500/20"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {filteredProducts.length > 0 && (
        <div className="flex items-center justify-between rounded-xl border border-gray-800 bg-[#161c26] px-4 py-3 sm:px-6 shadow-lg">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-xs font-medium text-gray-300 hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-xs font-medium text-gray-300 hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Rows per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="rounded-md border border-gray-700 bg-gray-900 px-2 py-1 text-xs text-white focus:border-orange focus:outline-none cursor-pointer"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
              <p className="text-xs text-gray-400 border-l border-gray-700 pl-4">
                Showing <span className="font-semibold text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-semibold text-white">{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</span> of <span className="font-semibold text-white">{filteredProducts.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-700 hover:bg-gray-800 focus:z-20 focus:outline-offset-0 disabled:opacity-50 transition-colors cursor-pointer"
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                  </svg>
                </button>
                {/* Pages */}
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 text-xs font-semibold focus:z-20 focus:outline-offset-0 ring-1 ring-inset ring-gray-700 transition-colors cursor-pointer ${
                      currentPage === i + 1 ? 'z-10 bg-orange text-white ring-orange' : 'text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-700 hover:bg-gray-800 focus:z-20 focus:outline-offset-0 disabled:opacity-50 transition-colors cursor-pointer"
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-2xl border border-gray-800 bg-[#161c26] p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <Package className="h-5 w-5 text-orange" />
                <span>
                  {editingProduct ? "Edit Product Details & Photo" : "Add New Hardware Product"}
                </span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="mt-5 space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. 6mm Clear Glass or Concealed Hinges"
                  className="w-full rounded-lg border border-gray-700 bg-gray-900/80 py-2.5 px-3 text-sm text-white placeholder-gray-500 focus:border-orange focus:outline-none"
                />
              </div>

              {/* Category & Price Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-lg border border-gray-700 bg-gray-900/80 py-2.5 px-3 text-sm text-white focus:border-orange focus:outline-none cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Price Label *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. KSh 850 or KSh 620 /pair"
                    className="w-full rounded-lg border border-gray-700 bg-gray-900/80 py-2.5 px-3 text-sm text-white placeholder-gray-500 focus:border-orange focus:outline-none"
                  />
                </div>
              </div>

              {/* Variant / Specs */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Variant / Specification (Optional)
                </label>
                <input
                  type="text"
                  value={formData.variant}
                  onChange={(e) => setFormData({ ...formData, variant: e.target.value })}
                  placeholder="e.g. Box of 500 · 4x40mm or Soft-close · 35mm"
                  className="w-full rounded-lg border border-gray-700 bg-gray-900/80 py-2.5 px-3 text-sm text-white placeholder-gray-500 focus:border-orange focus:outline-none"
                />
              </div>

              {/* IMAGE UPLOAD SECTION (1 IMAGE LIMIT & MAINTAIN/DELETE/REPLACE CONTROLS) */}
              <div className="pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Product Image (Strictly 1 Image)
                </label>

                <div className="rounded-xl border border-gray-700 bg-gray-900/90 p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-gray-700 bg-black/40 flex items-center justify-center">
                      {(imagePreview || (editingProduct?.image && !deletePhoto)) ? (
                        <img
                          src={imagePreview || editingProduct.image}
                          alt="Product preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="h-8 w-8 text-gray-600" />
                      )}
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <label className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-800 px-3 py-2 text-xs font-semibold text-white hover:bg-gray-700 border border-gray-600 transition-colors cursor-pointer">
                        <Upload className="h-3.5 w-3.5 text-orange" />
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple={false}
                          onChange={handleSingleImageChange}
                          className="hidden"
                        />
                      </label>
                      {(imagePreview || (editingProduct?.image && !deletePhoto)) && (
                        <button
                          type="button"
                          onClick={() => {
                            if (imageFile) {
                              setImageFile(null);
                              setImagePreview(null);
                            }
                            if (editingProduct && editingProduct.image) {
                              setDeletePhoto(true);
                            }
                          }}
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Remove Photo</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="flex items-center justify-end gap-3 border-t border-gray-800 pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-xs font-semibold text-gray-300 hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-orange flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg shadow-md shadow-orange/20 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Saving Product...</span>
                    </>
                  ) : (
                    <span>{editingProduct ? "Save Product Changes" : "Create Product"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-[#161c26] p-6 shadow-2xl text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400 border border-red-500/20 mb-4">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-white">Delete Product?</h3>
            <p className="mt-2 text-xs text-gray-400">
              Are you sure you want to delete{" "}
              <span className="text-white font-semibold">"{productToDelete.name}"</span>? This action cannot be undone.
            </p>

            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setProductToDelete(null)}
                className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-xs font-semibold text-gray-300 hover:bg-gray-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 shadow-lg shadow-red-600/30 transition-colors cursor-pointer"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
