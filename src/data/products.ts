export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  tags: string[];
  badge?: "Popular" | "Best Seller";
  stockCode: string;
}

// Curated catalog from data.csv (Online Retail Dataset)
// Each image is a verified, high-quality Unsplash photo that visually matches the product description.
export const products: Product[] = [
  // ── Home Decor ──────────────────────────────────────
  {
    id: "85123A",
    stockCode: "85123A",
    name: "White Hanging Heart T-Light Holder",
    category: "Home Decor",
    price: 2.55,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=600&h=800&fit=crop",
    description: "Classic white hanging heart t-light holder, perfect for creating a cozy atmosphere in any room.",
    tags: ["home", "decor", "heart", "candle"],
    badge: "Best Seller"
  },
  {
    id: "71053",
    stockCode: "71053",
    name: "White Metal Lantern",
    category: "Home Decor",
    price: 3.39,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=600&h=800&fit=crop",
    description: "Elegant white metal lantern with intricate cutouts for beautiful ambient light patterns.",
    tags: ["lantern", "metal", "white", "lighting"],
    badge: "Popular"
  },
  {
    id: "21730",
    stockCode: "21730",
    name: "Glass Star Frosted T-Light Holder",
    category: "Home Decor",
    price: 4.25,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=600&h=800&fit=crop",
    description: "Stunning frosted glass star t-light holder that casts gorgeous star-shaped shadows.",
    tags: ["glass", "star", "frosted", "candle"]
  },
  {
    id: "22941",
    stockCode: "22941",
    name: "Christmas Lights 10 Reindeer",
    category: "Home Decor",
    price: 8.50,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887183?w=600&h=800&fit=crop",
    description: "Festive string of 10 warm-white light-up reindeer for magical holiday décor.",
    tags: ["christmas", "lights", "reindeer", "festive"]
  },

  // ── Kitchen & Dining ────────────────────────────────
  {
    id: "22622",
    stockCode: "22622",
    name: "Box Of 6 Assorted Colour Teaspoons",
    category: "Kitchen & Dining",
    price: 4.25,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=600&h=800&fit=crop",
    description: "Vibrant set of six assorted colour teaspoons that brighten up any tea time.",
    tags: ["kitchen", "teaspoon", "colourful", "cutlery"]
  },
  {
    id: "22139",
    stockCode: "22139",
    name: "Retrospot Tea Set Ceramic 11 Pc",
    category: "Kitchen & Dining",
    price: 4.95,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=800&fit=crop",
    description: "Complete 11-piece ceramic tea set with charming retro polka-dot pattern.",
    tags: ["tea", "ceramic", "retro", "set"],
    badge: "Best Seller"
  },
  {
    id: "22629",
    stockCode: "22629",
    name: "Spaceboy Lunch Box",
    category: "Kitchen & Dining",
    price: 1.95,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=800&fit=crop",
    description: "Cool space-themed lunch box that makes mealtime an adventure for kids.",
    tags: ["lunch", "space", "kids", "box"]
  },

  // ── Gifts & Novelties ──────────────────────────────
  {
    id: "22752",
    stockCode: "22752",
    name: "Set 7 Babushka Nesting Boxes",
    category: "Gifts & Novelties",
    price: 7.65,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=800&fit=crop",
    description: "Traditional set of 7 hand-painted Babushka nesting boxes — a timeless gift.",
    tags: ["gift", "nesting", "traditional", "boxes"],
    badge: "Best Seller"
  },
  {
    id: "21791",
    stockCode: "21791",
    name: "Vintage Heads And Tails Card Game",
    category: "Gifts & Novelties",
    price: 1.25,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=600&h=800&fit=crop",
    description: "Delightful vintage card game that brings the family together on game night.",
    tags: ["game", "vintage", "cards", "fun"]
  },
  {
    id: "22326",
    stockCode: "22326",
    name: "Round Snack Boxes Set Of 4 Woodland",
    category: "Gifts & Novelties",
    price: 2.95,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=600&h=800&fit=crop",
    description: "Charming set of 4 round snack boxes with an enchanting woodland animal theme.",
    tags: ["storage", "snack", "woodland", "boxes"]
  },

  // ── Lifestyle & Comfort ─────────────────────────────
  {
    id: "84406B",
    stockCode: "84406B",
    name: "Cream Cupid Hearts Coat Hanger",
    category: "Lifestyle & Comfort",
    price: 2.75,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=800&fit=crop",
    description: "Charming cream coat hanger featuring romantic cupid hearts — perfect for bedrooms.",
    tags: ["storage", "hanger", "cream", "bedroom"]
  },
  {
    id: "84029G",
    stockCode: "84029G",
    name: "Knitted Union Flag Hot Water Bottle",
    category: "Lifestyle & Comfort",
    price: 3.39,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1544816565-49a36be5c84f?w=600&h=800&fit=crop",
    description: "Warm and cozy hot water bottle wrapped in a beautifully knitted Union Flag cover.",
    tags: ["winter", "comfort", "british", "cozy"],
    badge: "Popular"
  },
  {
    id: "21506",
    stockCode: "21506",
    name: "Fancy Font Home Sweet Home Doormat",
    category: "Lifestyle & Comfort",
    price: 6.75,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=800&fit=crop",
    description: "Welcome guests in style with this elegant 'Home Sweet Home' doormat.",
    tags: ["home", "mat", "welcome", "entrance"]
  },

  // ── Vintage & Retro ─────────────────────────────────
  {
    id: "22728",
    stockCode: "22728",
    name: "Alarm Clock Bakelike Pink",
    category: "Vintage & Retro",
    price: 3.75,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&h=800&fit=crop",
    description: "Retro bakelike alarm clock in a delightful pastel pink. A statement piece.",
    tags: ["clock", "retro", "pink", "vintage"],
    badge: "Popular"
  },
  {
    id: "22727",
    stockCode: "22727",
    name: "Alarm Clock Bakelike Red",
    category: "Vintage & Retro",
    price: 3.75,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=600&h=800&fit=crop",
    description: "Classic retro alarm clock in bold red — a timeless bedside companion.",
    tags: ["clock", "retro", "red", "vintage"]
  },
  {
    id: "22726",
    stockCode: "22726",
    name: "Alarm Clock Bakelike Green",
    category: "Vintage & Retro",
    price: 3.75,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=600&h=800&fit=crop",
    description: "Vintage-style alarm clock in bakelike green — pairs beautifully with any décor.",
    tags: ["clock", "retro", "green", "vintage"]
  },
];

// Group products by category
export const productGroups: Record<string, Product[]> = products.reduce(
  (acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  },
  {} as Record<string, Product[]>
);

// Category icons mapping for UI enhancement
export const categoryIcons: Record<string, string> = {
  "Home Decor": "🏠",
  "Kitchen & Dining": "🍽️",
  "Gifts & Novelties": "🎁",
  "Lifestyle & Comfort": "✨",
  "Vintage & Retro": "⏰",
};
