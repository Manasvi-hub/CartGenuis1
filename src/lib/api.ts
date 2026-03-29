import { Product, products as mockProducts } from "@/data/products";

const API_BASE = "/api";

// Helper to simulate backend delay for the animation
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchProducts(): Promise<Product[]> {
  try {
    // Artificial delay to show the animation (you asked for it!)
    await delay(300);
    
    const response = await fetch(`${API_BASE}/products`);
    if (!response.ok) {
      console.warn("Backend /products failed, falling back to mock data");
      return mockProducts;
    }
    const data = await response.json();
    
    if (Array.isArray(data)) {
      return data.map((item: any) => ({
        id: item.StockCode || item.stockCode || Math.random().toString(),
        stockCode: item.StockCode || item.stockCode,
        name: (item.Description || item.description || "Unnamed Product")
          .toLowerCase()
          .replace(/\b\w/g, (l: string) => l.toUpperCase()),
        price: parseFloat(item.UnitPrice || item.price || "0"),
        rating: item.rating || (4 + Math.random()),
        image: item.image || `https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=600&h=800&fit=crop`,
        category: item.Country || item.category || "General Retail",
        description: item.Description || "No description available",
        tags: ["retail", "ecommerce"]
      }));
    }
    return mockProducts;
  } catch (err) {
    console.error("API fetch error, falling back to mock data:", err);
    return mockProducts;
  }
}

export async function fetchRecommendations(productId?: string): Promise<Product[]> {
  try {
    // If we have a productId, translate it or search by it
    const url = productId 
      ? `${API_BASE}/recommendations?productId=${productId}`
      : `${API_BASE}/recommendations`;
    const response = await fetch(url);
    if (!response.ok) return mockProducts.slice(0, 4);
    const data = await response.json();
    return Array.isArray(data) ? data : mockProducts.slice(0, 4);
  } catch {
    return mockProducts.slice(0, 4);
  }
}

export async function trackUserActivity(productId: string, type: string) {
  try {
    await fetch(`${API_BASE}/activity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, type, timestamp: Date.now() }),
    });
  } catch (err) {
    // Silent fail for tracking
  }
}
