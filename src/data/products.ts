export interface Product {
  id: string;
  name: string;
  category: string;
  baseType: string;
  variant: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  tags: string[];
  badge?: "Popular Variant" | "Best Seller";
}

export const products: Product[] = [
  // ── Red Dress variants ──
  {
    id: "1",
    name: "Red Dress – Casual",
    category: "Fashion",
    baseType: "Red Dress",
    variant: "Casual",
    price: 1499,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop",
    description: "Relaxed-fit red dress for everyday wear",
    tags: ["dress", "fashion", "casual", "women"],
  },
  {
    id: "1b",
    name: "Red Dress – Party Wear",
    category: "Fashion",
    baseType: "Red Dress",
    variant: "Party Wear",
    price: 2499,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
    description: "Stunning red party dress with sequin accents",
    tags: ["dress", "fashion", "party", "women"],
    badge: "Best Seller",
  },
  {
    id: "1c",
    name: "Red Dress – Floral",
    category: "Fashion",
    baseType: "Red Dress",
    variant: "Floral",
    price: 1899,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&h=800&fit=crop",
    description: "Red floral print dress with elegant drape",
    tags: ["dress", "fashion", "floral", "women"],
  },

  // ── Blue Jeans variants ──
  {
    id: "2",
    name: "Blue Jeans – Slim Fit",
    category: "Fashion",
    baseType: "Blue Jeans",
    variant: "Slim Fit",
    price: 1899,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop",
    description: "Classic slim-fit blue denim jeans",
    tags: ["jeans", "fashion", "slim", "unisex"],
    badge: "Popular Variant",
  },
  {
    id: "2b",
    name: "Blue Jeans – Ripped",
    category: "Fashion",
    baseType: "Blue Jeans",
    variant: "Ripped",
    price: 2199,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop",
    description: "Distressed ripped blue jeans with frayed edges",
    tags: ["jeans", "fashion", "ripped", "streetwear"],
  },
  {
    id: "2c",
    name: "Blue Jeans – Regular Fit",
    category: "Fashion",
    baseType: "Blue Jeans",
    variant: "Regular Fit",
    price: 1699,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&h=800&fit=crop",
    description: "Comfortable regular-fit blue denim jeans",
    tags: ["jeans", "fashion", "regular", "unisex"],
  },

  // ── Laptop variants ──
  {
    id: "3",
    name: "Laptop – Gaming",
    category: "Electronics",
    baseType: "Laptop",
    variant: "Gaming",
    price: 89999,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600&h=800&fit=crop",
    description: "High-performance gaming laptop with RTX graphics",
    tags: ["laptop", "electronics", "gaming", "tech"],
    badge: "Best Seller",
  },
  {
    id: "3b",
    name: "Laptop – Business",
    category: "Electronics",
    baseType: "Laptop",
    variant: "Business",
    price: 74999,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=800&fit=crop",
    description: "Sleek business laptop for professionals",
    tags: ["laptop", "electronics", "business", "work"],
  },
  {
    id: "3c",
    name: "Laptop – Student",
    category: "Electronics",
    baseType: "Laptop",
    variant: "Student",
    price: 42999,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=800&fit=crop",
    description: "Affordable laptop perfect for students",
    tags: ["laptop", "electronics", "student", "budget"],
  },

  // ── Headphones variants ──
  {
    id: "4",
    name: "Headphones – Wireless",
    category: "Electronics",
    baseType: "Headphones",
    variant: "Wireless",
    price: 3499,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=800&fit=crop",
    description: "Premium wireless over-ear headphones",
    tags: ["headphones", "electronics", "wireless", "audio"],
    badge: "Popular Variant",
  },
  {
    id: "4b",
    name: "Headphones – Noise Cancelling",
    category: "Electronics",
    baseType: "Headphones",
    variant: "Noise Cancelling",
    price: 5999,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=800&fit=crop",
    description: "Active noise-cancelling headphones for focus",
    tags: ["headphones", "electronics", "anc", "premium"],
    badge: "Best Seller",
  },
  {
    id: "4c",
    name: "Headphones – Budget",
    category: "Electronics",
    baseType: "Headphones",
    variant: "Budget",
    price: 1299,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=800&fit=crop",
    description: "Affordable wired headphones with clear sound",
    tags: ["headphones", "electronics", "budget", "wired"],
  },

  // ── Sneakers variants ──
  {
    id: "5",
    name: "Sneakers – Running",
    category: "Footwear",
    baseType: "Sneakers",
    variant: "Running",
    price: 4999,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop",
    description: "Lightweight running sneakers with cushioned sole",
    tags: ["sneakers", "footwear", "running", "sports"],
  },
  {
    id: "5b",
    name: "Sneakers – Casual",
    category: "Footwear",
    baseType: "Sneakers",
    variant: "Casual",
    price: 3499,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=800&fit=crop",
    description: "Everyday casual sneakers with clean design",
    tags: ["sneakers", "footwear", "casual", "everyday"],
    badge: "Popular Variant",
  },
  {
    id: "5c",
    name: "Sneakers – High-Top",
    category: "Footwear",
    baseType: "Sneakers",
    variant: "High-Top",
    price: 5499,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=800&fit=crop",
    description: "Retro high-top sneakers for street style",
    tags: ["sneakers", "footwear", "high-top", "streetwear"],
  },

  // ── Smartwatch variants ──
  {
    id: "6",
    name: "Smartwatch – Fitness",
    category: "Electronics",
    baseType: "Smartwatch",
    variant: "Fitness",
    price: 8999,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=800&fit=crop",
    description: "Fitness-focused smartwatch with heart rate monitor",
    tags: ["smartwatch", "electronics", "fitness", "health"],
  },
  {
    id: "6b",
    name: "Smartwatch – Premium",
    category: "Electronics",
    baseType: "Smartwatch",
    variant: "Premium",
    price: 24999,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=800&fit=crop",
    description: "Luxury smartwatch with sapphire crystal display",
    tags: ["smartwatch", "electronics", "premium", "luxury"],
    badge: "Best Seller",
  },
  {
    id: "6c",
    name: "Smartwatch – Budget",
    category: "Electronics",
    baseType: "Smartwatch",
    variant: "Budget",
    price: 3999,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&h=800&fit=crop",
    description: "Affordable smartwatch with essential features",
    tags: ["smartwatch", "electronics", "budget", "value"],
  },

  // ── Backpack variants ──
  {
    id: "10",
    name: "Backpack – Travel",
    category: "Lifestyle",
    baseType: "Backpack",
    variant: "Travel",
    price: 3999,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop",
    description: "Spacious travel backpack with laptop compartment",
    tags: ["backpack", "lifestyle", "travel", "bags"],
    badge: "Popular Variant",
  },
  {
    id: "10b",
    name: "Backpack – Urban",
    category: "Lifestyle",
    baseType: "Backpack",
    variant: "Urban",
    price: 2499,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1581605405669-fcdf81165b94?w=600&h=800&fit=crop",
    description: "Sleek urban backpack for daily commute",
    tags: ["backpack", "lifestyle", "urban", "commute"],
  },
  {
    id: "10c",
    name: "Backpack – Hiking",
    category: "Lifestyle",
    baseType: "Backpack",
    variant: "Hiking",
    price: 4999,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1622260614153-03223fb72052?w=600&h=800&fit=crop",
    description: "Rugged hiking backpack with hydration pack",
    tags: ["backpack", "lifestyle", "hiking", "outdoor"],
  },

  // ── Sunglasses variants ──
  {
    id: "9",
    name: "Sunglasses – Aviator",
    category: "Accessories",
    baseType: "Sunglasses",
    variant: "Aviator",
    price: 2199,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=800&fit=crop",
    description: "Classic aviator sunglasses with UV protection",
    tags: ["sunglasses", "accessories", "aviator", "summer"],
    badge: "Best Seller",
  },
  {
    id: "9b",
    name: "Sunglasses – Wayfarer",
    category: "Accessories",
    baseType: "Sunglasses",
    variant: "Wayfarer",
    price: 2499,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=800&fit=crop",
    description: "Iconic wayfarer sunglasses with polarized lenses",
    tags: ["sunglasses", "accessories", "wayfarer", "polarized"],
  },
  {
    id: "9c",
    name: "Sunglasses – Sport",
    category: "Accessories",
    baseType: "Sunglasses",
    variant: "Sport",
    price: 1799,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=800&fit=crop",
    description: "Lightweight sport sunglasses for active lifestyles",
    tags: ["sunglasses", "accessories", "sport", "outdoor"],
  },
];

// Get unique base types
export const baseTypes = [...new Set(products.map((p) => p.baseType))];

// Group products by baseType
export const productGroups: Record<string, Product[]> = products.reduce(
  (acc, product) => {
    if (!acc[product.baseType]) acc[product.baseType] = [];
    acc[product.baseType].push(product);
    return acc;
  },
  {} as Record<string, Product[]>
);

// Collaborative filtering — variants of the same type + cross-type
export const alsoViewed: Record<string, string[]> = {
  // Red Dress
  "1": ["1b", "1c", "2"],
  "1b": ["1", "1c", "9"],
  "1c": ["1", "1b", "2b"],
  // Blue Jeans
  "2": ["2b", "2c", "1"],
  "2b": ["2", "2c", "5b"],
  "2c": ["2", "2b", "10"],
  // Laptop
  "3": ["3b", "3c", "4b"],
  "3b": ["3", "3c", "6"],
  "3c": ["3", "3b", "4c"],
  // Headphones
  "4": ["4b", "4c", "6"],
  "4b": ["4", "4c", "3"],
  "4c": ["4", "4b", "6c"],
  // Sneakers
  "5": ["5b", "5c", "10"],
  "5b": ["5", "5c", "2"],
  "5c": ["5", "5b", "9"],
  // Smartwatch
  "6": ["6b", "6c", "4"],
  "6b": ["6", "6c", "3"],
  "6c": ["6", "6b", "4c"],
  // Backpack
  "10": ["10b", "10c", "5"],
  "10b": ["10", "10c", "9b"],
  "10c": ["10", "10b", "5c"],
  // Sunglasses
  "9": ["9b", "9c", "1b"],
  "9b": ["9", "9c", "10b"],
  "9c": ["9", "9b", "5"],
};
