import React, { useState } from "react";
import {
  Database,
  Copy,
  Check,
  Terminal,
  ExternalLink,
  ShieldCheck,
  HardDrive,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminSetupGuide() {
  const [copiedSql, setCopiedSql] = useState(false);
  const [copiedStorage, setCopiedStorage] = useState(false);

  const SQL_SCHEMA = `-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  category_slug TEXT,
  variant TEXT,
  price TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
-- Allow public to read products
CREATE POLICY "Allow public read access to products"
  ON public.products FOR SELECT
  USING (true);

-- Allow authenticated admins full CRUD access
CREATE POLICY "Allow authenticated full access to products"
  ON public.products FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow anon insert/update for demo testing if needed (Optional)
CREATE POLICY "Allow anon write for demo testing"
  ON public.products FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);
`;

  const STORAGE_SETUP = `-- Storage Bucket Setup for Product Images:
-- Step 1: Go to Supabase Dashboard -> Storage -> New Bucket
-- Bucket Name: product-images
-- Set Public Bucket: ENABLED (Toggle ON)

-- Step 2: Run SQL Policy for Public Storage Access:
CREATE POLICY "Public Read Access for Product Images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Allow Uploads to Product Images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow Deletes from Product Images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'product-images');
`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_SCHEMA);
    setCopiedSql(true);
    toast.success("SQL Schema script copied to clipboard!");
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleCopyStorage = () => {
    navigator.clipboard.writeText(STORAGE_SETUP);
    setCopiedStorage(true);
    toast.success("Storage Policy SQL copied to clipboard!");
    setTimeout(() => setCopiedStorage(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="border-b border-gray-800 pb-5">
        <h1 className="text-2xl font-bold font-display text-white tracking-tight sm:text-3xl flex items-center gap-2.5">
          <Database className="h-7 w-7 text-orange" />
          <span>Supabase SQL Setup Guide</span>
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          Instructions to configure your live PostgreSQL database & image storage bucket on Supabase
        </p>
      </div>

      {/* Step 1: Create Table */}
      <div className="rounded-xl border border-gray-800 bg-[#161c26] p-6 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
            <Terminal className="h-5 w-5 text-orange" />
            <span>Step 1: Run Table Schema SQL in Supabase</span>
          </h2>
          <button
            onClick={handleCopySql}
            className="flex items-center gap-1.5 rounded-lg border border-gray-700 bg-gray-800 px-3 py-1.5 text-xs font-semibold text-gray-200 hover:bg-orange hover:text-white transition-colors cursor-pointer"
          >
            {copiedSql ? (
              <Check className="h-4 w-4 text-emerald-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span>{copiedSql ? "Copied!" : "Copy SQL Script"}</span>
          </button>
        </div>

        <p className="text-xs text-gray-400">
          Open your{" "}
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange underline font-semibold"
          >
            Supabase Dashboard <ExternalLink className="inline h-3 w-3" />
          </a>
          , navigate to <span className="text-white font-semibold">SQL Editor</span>, paste the
          snippet below and click <span className="text-white font-semibold">Run</span>:
        </p>

        <div className="relative rounded-lg border border-gray-800 bg-gray-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
          <pre>{SQL_SCHEMA}</pre>
        </div>
      </div>

      {/* Step 2: Storage Bucket */}
      <div className="rounded-xl border border-gray-800 bg-[#161c26] p-6 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
            <HardDrive className="h-5 w-5 text-blue-400" />
            <span>Step 2: Create Storage Bucket for Product Images</span>
          </h2>
          <button
            onClick={handleCopyStorage}
            className="flex items-center gap-1.5 rounded-lg border border-gray-700 bg-gray-800 px-3 py-1.5 text-xs font-semibold text-gray-200 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
          >
            {copiedStorage ? (
              <Check className="h-4 w-4 text-emerald-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span>{copiedStorage ? "Copied!" : "Copy Storage SQL"}</span>
          </button>
        </div>

        <ol className="text-xs text-gray-300 space-y-2 list-decimal list-inside">
          <li>
            In Supabase Dashboard, click <span className="text-white font-semibold">Storage</span>{" "}
            on the left menu.
          </li>
          <li>
            Click <span className="text-white font-semibold">New Bucket</span>, enter name:{" "}
            <span className="text-orange font-bold font-mono">product-images</span>
          </li>
          <li>
            Toggle <span className="text-emerald-400 font-semibold">Public bucket</span> to{" "}
            <span className="text-white font-semibold">ON</span> so product images can be viewed
            publicly.
          </li>
          <li>Paste and run the Storage Policies snippet below in SQL Editor:</li>
        </ol>

        <div className="relative rounded-lg border border-gray-800 bg-gray-950 p-4 font-mono text-xs text-blue-400 overflow-x-auto">
          <pre>{STORAGE_SETUP}</pre>
        </div>
      </div>

      {/* Step 3: Environment Variables */}
      <div className="rounded-xl border border-gray-800 bg-[#161c26] p-6 shadow-lg space-y-3">
        <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-400" />
          <span>Step 3: Add Credentials to `.env` File</span>
        </h2>
        <p className="text-xs text-gray-400">
          Create a file named <span className="text-white font-mono font-semibold">.env</span> in
          your project root folder and insert your Supabase project URL and anon API key:
        </p>

        <div className="rounded-lg border border-gray-800 bg-gray-950 p-4 font-mono text-xs text-orange">
          VITE_SUPABASE_URL=https://your-project-ref.supabase.co
          <br />
          VITE_SUPABASE_ANON_KEY=your-actual-anon-key
        </div>
      </div>
    </div>
  );
}
