import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheck, Lock, Mail, ArrowRight, Building2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please provide both email and password.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg("");
      await signIn(email, password);
      toast.success("Welcome to Captain Glassmart Admin Portal!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
      setErrorMsg(err.message || "Invalid credentials. Please check your details.");
      toast.error("Authentication failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#0d1117] px-4 font-sans text-gray-100 overflow-hidden">
      {/* Dynamic Background Glow & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange/20 via-transparent to-transparent opacity-60 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Header Branding */}
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-3 mb-3 group">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center group-hover:scale-105 transition-transform">
              <img src="/captain-logo.png" alt="Captain Glassmart & Hardware" className="h-full w-full object-contain drop-shadow-md" />
            </div>
            <div className="text-left">
              <span className="block font-display text-xl font-bold tracking-tight text-white leading-tight">
                Captain Glassmart<br/>& Hardware
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-orange font-semibold mt-1">
                HARDWARE & FABRICATION
              </span>
            </div>
          </Link>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white font-display">
            Admin Control Center
          </h1>
          <p className="mt-1 text-xs text-gray-400">
            Sign in to manage products, categories & catalog settings
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-gray-800 bg-[#161b22]/90 p-8 shadow-2xl backdrop-blur-xl">
          {errorMsg && (
            <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@captainglassmart.co.ke"
                  className="w-full rounded-lg border border-gray-700 bg-gray-900/80 py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-700 bg-gray-900/80 py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-orange btn-orange-hover flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold shadow-lg shadow-orange/20 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Back Link */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-gray-500 hover:text-orange transition-colors">
            ← Return to Main Store Website
          </Link>
        </div>
      </div>
    </div>
  );
}
