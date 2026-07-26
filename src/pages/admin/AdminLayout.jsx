import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Package,
  Layers,
  Database,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Building2,
  CheckCircle2,
  User,
  ChevronRight,
} from "lucide-react";

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const navItems = [
    { label: "Overview", path: "/admin", icon: LayoutDashboard, end: true },
    { label: "Products", path: "/admin/products", icon: Package },
    { label: "Categories", path: "/admin/categories", icon: Layers },
  ];

  return (
    <div className="flex min-h-screen bg-[#0f141c] text-gray-100 font-sans">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-gray-800 bg-[#161c26] transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-800 px-5">
          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center">
              <img src="/captain-logo.png" alt="Captain Glassmart & Hardware" className="h-full w-full object-contain drop-shadow-sm" />
            </div>
            <div>
              <span className="block font-display text-[13px] font-bold tracking-tight text-white leading-tight">
                Captain Glassmart <br/>& Hardware
              </span>
              <span className="block text-[9px] uppercase tracking-widest text-orange font-semibold mt-0.5">
                ADMIN PANEL
              </span>
            </div>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-400 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
            Management
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-orange text-white font-semibold shadow-md shadow-orange/20"
                    : "text-gray-400 hover:bg-gray-800/60 hover:text-white"
                }`
              }
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}

          <div className="pt-6 px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
            Public Storefront
          </div>
          <Link
            to="/products"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 hover:bg-gray-800/60 hover:text-white transition-all"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="h-4 w-4 shrink-0 text-orange" />
              <span>View Customer Catalog</span>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-gray-600" />
          </Link>
        </div>


        {/* User Footer Profile */}
        <div className="border-t border-gray-800 p-3">
          <div className="flex items-center justify-between rounded-lg px-2 py-2">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-800 text-orange border border-gray-700">
                <User className="h-4 w-4" />
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">
                  {user?.email || "Admin User"}
                </p>
                <p className="text-[10px] text-gray-400 capitalize">
                  {user?.role || "Administrator"}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        {/* Topbar Header */}
        <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-[#161c26]/80 px-4 sm:px-6 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-gray-400 hover:text-white lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="text-sm font-semibold text-gray-300">Admin Portal</h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/products"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-orange px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-orange/90 shadow-sm shadow-orange/30 transition-all"
            >
              <Package className="h-3.5 w-3.5" />
              <span>Manage Products</span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
