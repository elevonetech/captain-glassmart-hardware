import React, { createContext, useContext, useEffect, useState } from "react";
import { categories as initialCategories } from "@/lib/site-data";
import { supabase, uploadProductImage, deleteProductImage } from "@/lib/supabase";
import { toast } from "sonner";

const ProductContext = createContext({});

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  const refreshProducts = async () => {
    setLoading(true);
    try {
      const { data: dbProducts, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase fetch error:", error.message);
      } else if (dbProducts) {
        setProducts(dbProducts);
      }
    } catch (err) {
      console.error("Error reading from Supabase:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshProducts();
    // In a real app we might fetch categories from a Supabase table too,
    // for now we'll just keep a basic state if needed or we could remove it.
  }, []);

  /**
   * ADD PRODUCT
   * Handles 1 single image upload file or URL string.
   */
  const addProduct = async (productData, imageFile = null) => {
    try {
      let imageUrl = productData.image || null;

      if (imageFile) {
        toast.info("Uploading product image...");
        imageUrl = await uploadProductImage(imageFile);
      }

      const newProductPayload = {
        name: productData.name.trim(),
        category: productData.category.trim(),
        category_slug:
          productData.categorySlug ||
          productData.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        variant: productData.variant || "",
        price: productData.price.trim(),
        image: imageUrl,
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("products")
        .insert([newProductPayload])
        .select();

      if (error) throw error;
      toast.success("Product added successfully to Supabase!");
      await refreshProducts();
      return data?.[0];
    } catch (error) {
      console.error("Add Product Error:", error);
      toast.error(`Failed to add product: ${error.message || "Unknown error"}`);
      throw error;
    }
  };

  /**
   * UPDATE PRODUCT
   * Support for photo edit actions:
   * 1) Maintain existing: imageFile is null and keepExistingImage is true
   * 2) Delete photo: deletePhoto is true
   * 3) Upload new: imageFile is provided
   */
  const updateProduct = async (id, productData, { imageFile = null, deletePhoto = false } = {}) => {
    try {
      const existingProduct = products.find((p) => String(p.id) === String(id));
      let finalImageUrl = existingProduct?.image || null;

      // Handle Image deletion
      if (deletePhoto) {
        if (existingProduct?.image) {
          await deleteProductImage(existingProduct.image);
        }
        finalImageUrl = null;
      } else if (imageFile) {
        // Handle Image replacement
        toast.info("Uploading new product image...");
        if (existingProduct?.image) {
          await deleteProductImage(existingProduct.image);
        }
        finalImageUrl = await uploadProductImage(imageFile);
      }
      // If neither deletePhoto nor imageFile is provided, finalImageUrl remains existingProduct.image (Maintain existing)

      const updatedPayload = {
        name: productData.name.trim(),
        category: productData.category.trim(),
        category_slug:
          productData.categorySlug ||
          productData.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        variant: productData.variant || "",
        price: productData.price.trim(),
        image: finalImageUrl,
      };

      const { error } = await supabase.from("products").update(updatedPayload).eq("id", id);

      if (error) throw error;
      toast.success("Product updated in Supabase!");
      await refreshProducts();
    } catch (error) {
      console.error("Update Product Error:", error);
      toast.error(`Failed to update product: ${error.message || "Unknown error"}`);
      throw error;
    }
  };

  /**
   * DELETE PRODUCT
   */
  const deleteProduct = async (id) => {
    try {
      const targetProduct = products.find((p) => String(p.id) === String(id));
      if (targetProduct?.image) {
        await deleteProductImage(targetProduct.image);
      }

      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      toast.success("Product deleted from Supabase!");
      await refreshProducts();
    } catch (error) {
      console.error("Delete Product Error:", error);
      toast.error(`Failed to delete product: ${error.message || "Unknown error"}`);
      throw error;
    }
  };

  /**
   * ADD CATEGORY
   */
  const addCategory = (categoryData) => {
    const newCategory = {
      slug: categoryData.slug || categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: categoryData.name.trim(),
      blurb: categoryData.blurb || "",
      image: categoryData.image || null,
    };
    setCategories((prev) => [newCategory, ...prev]);
    toast.success("Category added locally!");
    return newCategory;
  };

  /**
   * DELETE CATEGORY
   */
  const deleteCategory = (slug) => {
    setCategories((prev) => prev.filter((c) => c.slug !== slug));
    toast.success("Category removed locally!");
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        loading,
        refreshProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        deleteCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
