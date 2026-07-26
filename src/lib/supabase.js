import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const STORAGE_BUCKET = "product-images";

/**
 * Uploads a single product image file to Supabase Storage.
 * @param {File} file
 * @returns {Promise<string>} Public URL of the uploaded image
 */
export async function uploadProductImage(file) {
  if (!file) return null;

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (uploadError) {
    console.error("Supabase image upload error:", uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);

  return data.publicUrl;
}

/**
 * Deletes a product image from Supabase storage if it was stored there.
 * @param {string} imageUrl
 */
export async function deleteProductImage(imageUrl) {
  if (!imageUrl || !supabase) return;

  try {
    // Extract file path inside bucket from full URL
    if (imageUrl.includes(`/storage/v1/object/public/${STORAGE_BUCKET}/`)) {
      const relativePath = imageUrl.split(`/storage/v1/object/public/${STORAGE_BUCKET}/`)[1];
      if (relativePath) {
        await supabase.storage.from(STORAGE_BUCKET).remove([relativePath]);
      }
    }
  } catch (err) {
    console.warn("Failed to delete image from storage:", err);
  }
}
