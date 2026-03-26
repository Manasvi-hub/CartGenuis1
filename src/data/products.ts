export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  tags: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Red Dress",
    category: "Fashion",
    price: 2499,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop",
    description: "Elegant red evening dress with modern cut",
    tags: ["dress", "fashion", "evening", "women"],
  },
  {
    id: "2",
    name: "Blue Jeans",
    category: "Fashion",
    price: 1899,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop",
    description: "Classic slim-fit blue denim jeans",
    tags: ["jeans", "fashion", "casual", "unisex"],
  },
  {
    id: "3",
    name: "Laptop Pro",
    category: "Electronics",
    price: 74999,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=800&fit=crop",
    description: "High-performance laptop for professionals",
    tags: ["laptop", "electronics", "tech", "work"],
  },
  {
    id: "4",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 3499,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=800&fit=crop",
    description: "Premium noise-cancelling wireless headphones",
    tags: ["headphones", "electronics", "audio", "wireless"],
  },
  {
    id: "5",
    name: "Running Shoes",
    category: "Lifestyle",
    price: 4999,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop",
    description: "Lightweight running shoes with superior comfort",
    tags: ["shoes", "lifestyle", "sports", "fitness"],
  },
  {
    id: "6",
    name: "Smart Watch",
    category: "Electronics",
    price: 12999,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=800&fit=crop",
    description: "Feature-rich smartwatch with health tracking",
    tags: ["watch", "electronics", "wearable", "fitness"],
  },
  {
    id: "7",
    name: "Leather Jacket",
    category: "Fashion",
    price: 6999,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop",
    description: "Premium genuine leather biker jacket",
    tags: ["jacket", "fashion", "leather", "outerwear"],
  },
  {
    id: "8",
    name: "Yoga Mat",
    category: "Lifestyle",
    price: 1299,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=800&fit=crop",
    description: "Non-slip eco-friendly yoga mat",
    tags: ["yoga", "lifestyle", "fitness", "wellness"],
  },
  {
    id: "9",
    name: "Sunglasses",
    category: "Fashion",
    price: 2199,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=800&fit=crop",
    description: "UV-protected polarized sunglasses",
    tags: ["sunglasses", "fashion", "accessories", "summer"],
  },
  {
    id: "10",
    name: "Backpack",
    category: "Lifestyle",
    price: 2999,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop",
    description: "Water-resistant travel backpack with laptop compartment",
    tags: ["backpack", "lifestyle", "travel", "bags"],
  },
  {
    id: "11",
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 4499,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=800&fit=crop",
    description: "Portable waterproof bluetooth speaker",
    tags: ["speaker", "electronics", "audio", "portable"],
  },
  {
    id: "12",
    name: "Sneakers",
    category: "Fashion",
    price: 5499,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=800&fit=crop",
    description: "Trendy limited-edition streetwear sneakers",
    tags: ["sneakers", "fashion", "shoes", "streetwear"],
  },
];

// Collaborative filtering simulation data
export const alsoViewed: Record<string, string[]> = {
  "1": ["2", "7", "9"],
  "2": ["1", "7", "12"],
  "3": ["4", "6", "11"],
  "4": ["3", "6", "11"],
  "5": ["8", "10", "12"],
  "6": ["3", "4", "11"],
  "7": ["1", "2", "9"],
  "8": ["5", "10", "12"],
  "9": ["1", "7", "12"],
  "10": ["5", "8", "12"],
  "11": ["3", "4", "6"],
  "12": ["2", "5", "9"],
};
