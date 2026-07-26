import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";
import {
  Package,
  Layers,
  Image as ImageIcon,
  Database,
  Plus,
  ExternalLink,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function AdminDashboard() {
  const { products, categories, loading } = useProducts();

  const totalProducts = products.length;
  const totalCategories = categories.length;
  const productsWithImages = products.filter((p) => Boolean(p.image)).length;
  const productsWithoutImages = totalProducts - productsWithImages;

  // Prepare chart data for products per category
  const categoryCounts = categories.map((cat) => {
    const count = products.filter(
      (p) => p.categorySlug === cat.slug || p.category?.toLowerCase() === cat.name?.toLowerCase(),
    ).length;
    return {
      name: cat.name,
      count: count,
    };
  });

  const COLORS = ["#f97316", "#3b82f6", "#10b981", "#8b5cf6", "#ec4899", "#f59e0b", "#06b6d4"];

  const recentProducts = products.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Top Banner Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold font-display text-white tracking-tight sm:text-3xl">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Real-time management summary for Captain Glassmart Hardware
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="btn-orange flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg shadow-md shadow-orange/20"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Total Products Card */}
        <div className="rounded-xl border border-gray-800 bg-[#161c26] p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Total Products
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange/10 text-orange border border-orange/20">
              <Package className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-display text-white">{totalProducts}</span>
            <span className="text-xs text-emerald-400 font-medium">Active Items</span>
          </div>
          <p className="mt-2 text-xs text-gray-500">In shop catalog database</p>
        </div>

        {/* Total Categories */}
        <div className="rounded-xl border border-gray-800 bg-[#161c26] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Categories
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Layers className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-display text-white">{totalCategories}</span>
            <span className="text-xs text-blue-400 font-medium font-sans">Sections</span>
          </div>
          <p className="mt-2 text-xs text-gray-500">Hardware & building groups</p>
        </div>
      </div>

      {/* Analytics & Quick Action Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Category Distribution Bar Chart */}
        <div className="lg:col-span-2 rounded-xl border border-gray-800 bg-[#161c26] p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Products Distribution by Category
              </h3>
              <p className="text-xs text-gray-400">Overview of inventory spread across catalog</p>
            </div>
            <Link
              to="/admin/categories"
              className="text-xs font-semibold text-orange hover:underline flex items-center gap-1"
            >
              <span>Manage Categories</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="h-64 w-full">
            {loading ? (
              <div className="flex h-full items-center justify-center text-sm text-gray-500">
                Loading chart analytics...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryCounts}
                  margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
                >
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    fontSize={11}
                    tickLine={false}
                    interval={0}
                    angle={-25}
                    textAnchor="end"
                  />
                  <YAxis stroke="#6b7280" fontSize={11} tickLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      borderColor: "#374151",
                      borderRadius: "0.5rem",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {categoryCounts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Quick Tools & Setup Banner */}
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-800 bg-[#161c26] p-6 shadow-lg">
            <h3 className="text-base font-bold text-white font-display">Storefront Link</h3>
            <p className="mt-1 text-xs text-gray-400">
              Preview how changes appear to customers visiting Captain Glassmart.
            </p>
            <Link
              to="/products"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-700 bg-gray-800/80 py-2.5 text-xs font-semibold text-white hover:bg-gray-700 transition-all"
            >
              <span>Open Public Catalog</span>
              <ExternalLink className="h-3.5 w-3.5 text-orange" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Items Preview Table */}
      <div className="rounded-xl border border-gray-800 bg-[#161c26] p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white font-display">
              Recently Updated Products
            </h3>
            <p className="text-xs text-gray-400">Quick list of products in catalog</p>
          </div>
          <Link
            to="/admin/products"
            className="text-xs font-semibold text-orange hover:underline flex items-center gap-1"
          >
            <span>View All ({products.length})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-gray-800 bg-gray-900/60 text-gray-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Variant / Spec</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-gray-300">
              {recentProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="h-10 w-10 overflow-hidden rounded-lg border border-gray-700 bg-gray-800 flex items-center justify-center">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                      ) : (
                        <ImageIcon className="h-5 w-5 text-gray-600" />
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-white">{p.name}</td>
                  <td className="py-3 px-4 text-gray-400">{p.category}</td>
                  <td className="py-3 px-4 text-gray-400">{p.variant || "Standard"}</td>
                  <td className="py-3 px-4 font-semibold text-orange">{p.price}</td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      to="/admin/products"
                      className="text-xs text-gray-400 hover:text-white font-medium underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
