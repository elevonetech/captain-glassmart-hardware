import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables. Please check your .env file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const sampleProducts = [
  // 1. Building Materials
  {
    name: "Cement (50kg Bag)",
    category: "Building Materials",
    category_slug: "building-materials",
    variant: "OPC 42.5N High Strength",
    price: "KSh 650",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
  },
  {
    name: "TMT Steel Rebars (12mm)",
    category: "Building Materials",
    category_slug: "building-materials",
    variant: "12 Metre Length · High Tensile",
    price: "KSh 1,250",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
  },
  {
    name: "River Building Sand (Ton)",
    category: "Building Materials",
    category_slug: "building-materials",
    variant: "Cleaned Coarse Sand",
    price: "KSh 2,400",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
  },

  // 2. Glass Products
  {
    name: "6mm Clear Float Glass",
    category: "Glass Products",
    category_slug: "glass-products",
    variant: "Per SQM · Architectural Grade",
    price: "KSh 950",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
  },
  {
    name: "Chrome Mirror Clips",
    category: "Glass Products",
    category_slug: "glass-products",
    variant: "Set of 4 · Heavy Duty",
    price: "KSh 240",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
  },
  {
    name: "Glass Catches & Magnetic Locks",
    category: "Glass Products",
    category_slug: "glass-products",
    variant: "Chrome · Single Door",
    price: "KSh 180",
    image: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
  },

  // 3. Aluminium & Fabrication
  {
    name: "Aluminium Window Profile",
    category: "Aluminium & Fabrication",
    category_slug: "aluminium",
    variant: "Standard Anodized Profile",
    price: "KSh 1,800 /m",
    image: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
  },
  {
    name: "Aluminium Sliding Track",
    category: "Aluminium & Fabrication",
    category_slug: "aluminium",
    variant: "3 Metre Profile Length",
    price: "KSh 2,100",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
  },
  {
    name: "Corner Cleats (Pack of 10)",
    category: "Aluminium & Fabrication",
    category_slug: "aluminium",
    variant: "Heavy Duty Metal Joint",
    price: "KSh 750",
    image: "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
  },

  // 4. Finishing Products
  {
    name: "Weather Guard Exterior Paint",
    category: "Finishing Products",
    category_slug: "finishing",
    variant: "20 Litre Bucket · Brilliant White",
    price: "KSh 9,500",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
  },
  {
    name: "Pure Mineral Turpentine",
    category: "Finishing Products",
    category_slug: "finishing",
    variant: "1 Litre Bottle",
    price: "KSh 380",
    image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
  },
  {
    name: "Wood Stain (Mahogany)",
    category: "Finishing Products",
    category_slug: "finishing",
    variant: "1 Litre Tin · Gloss Finish",
    price: "KSh 850",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
  },

  // 5. Hardware & Tools
  {
    name: "Professional Glass Cutter",
    category: "Hardware & Tools",
    category_slug: "tools",
    variant: "Diamond Tip · Self-Oiling",
    price: "KSh 720",
    image: "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
  },
  {
    name: "MDF Screws (Box of 500)",
    category: "Hardware & Tools",
    category_slug: "tools",
    variant: "4x40mm · Zinc Plated",
    price: "KSh 850",
    image: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
  },
  {
    name: "Heavy Duty Screwdriver Set",
    category: "Hardware & Tools",
    category_slug: "tools",
    variant: "12-Piece Magnetic Set",
    price: "KSh 1,650",
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
  },

  // 6. Furniture Fittings
  {
    name: "Ball-Bearing Drawer Rails",
    category: "Furniture Fittings",
    category_slug: "fittings",
    variant: "450mm · Full Extension",
    price: "KSh 620 /pair",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
  },
  {
    name: "Concealed Soft-Close Hinges",
    category: "Furniture Fittings",
    category_slug: "fittings",
    variant: "35mm Cup · Nickel Finish",
    price: "KSh 220 /pc",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
  },
  {
    name: "Brass Cylinder Door Lock",
    category: "Furniture Fittings",
    category_slug: "fittings",
    variant: "Security Lock · 3 Keys",
    price: "KSh 1,450",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
  },

  // 7. Adhesives & Accessories
  {
    name: "Ponal PVA Wood Glue",
    category: "Adhesives & Accessories",
    category_slug: "adhesives",
    variant: "500g Bottle · Water Resistant",
    price: "KSh 620",
    image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
  },
  {
    name: "Clear Silicone Sealant",
    category: "Adhesives & Accessories",
    category_slug: "adhesives",
    variant: "300ml Cartridge · Waterproof",
    price: "KSh 450",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
  },
  {
    name: "Heavy Duty Contact Adhesive",
    category: "Adhesives & Accessories",
    category_slug: "adhesives",
    variant: "1 Litre Tin",
    price: "KSh 890",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
  },

  // 8. Plumbing & Electrical
  {
    name: "Heavy Duty PVC Pipes (110mm)",
    category: "Plumbing & Electrical",
    category_slug: "plumbing",
    variant: "6 Metre Length · Class D",
    price: "KSh 850",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
  },
  {
    name: "PPR Brass Gate Valve",
    category: "Plumbing & Electrical",
    category_slug: "plumbing",
    variant: "32mm Core · High Pressure",
    price: "KSh 1,100",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
  },
  {
    name: "Twin & Earth Copper Cable",
    category: "Plumbing & Electrical",
    category_slug: "plumbing",
    variant: "2.5mm · 100m Roll",
    price: "KSh 7,800",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    created_at: new Date().toISOString(),
  },
];

async function seed() {
  console.log("Seeding 24 products into Supabase...");
  const { data, error } = await supabase.from("products").insert(sampleProducts).select();
  if (error) {
    console.error("Error inserting products:", error);
    process.exit(1);
  }
  console.log(`Successfully seeded ${data.length} products to Supabase!`);
}

seed();
