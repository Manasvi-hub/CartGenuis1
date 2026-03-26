import { useState, useCallback, useMemo } from "react";
import { products, alsoViewed, Product } from "@/data/products";

export interface UserActivity {
  productId: string;
  type: "view" | "click" | "purchase";
  timestamp: number;
}

export function useRecommendations() {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [lastViewed, setLastViewed] = useState<Product | null>(null);

  const trackActivity = useCallback((productId: string, type: UserActivity["type"]) => {
    setActivities((prev) => [...prev, { productId, type, timestamp: Date.now() }]);
    if (type === "view" || type === "click") {
      const product = products.find((p) => p.id === productId);
      if (product) setLastViewed(product);
    }
  }, []);

  // Content-based: recommend by same category, weighted by interaction count
  const contentBased = useMemo(() => {
    if (activities.length === 0) return products.slice(0, 4);

    const categoryScore: Record<string, number> = {};
    activities.forEach(({ productId, type }) => {
      const product = products.find((p) => p.id === productId);
      if (!product) return;
      const weight = type === "purchase" ? 3 : type === "click" ? 2 : 1;
      categoryScore[product.category] = (categoryScore[product.category] || 0) + weight;
    });

    const viewedIds = new Set(activities.map((a) => a.productId));
    return products
      .filter((p) => !viewedIds.has(p.id))
      .sort((a, b) => (categoryScore[b.category] || 0) - (categoryScore[a.category] || 0))
      .slice(0, 4);
  }, [activities]);

  // Collaborative: "people also viewed"
  const collaborative = useMemo(() => {
    if (!lastViewed) return [];
    const ids = alsoViewed[lastViewed.id] || [];
    return ids.map((id) => products.find((p) => p.id === id)!).filter(Boolean);
  }, [lastViewed]);

  return { trackActivity, contentBased, collaborative, lastViewed, activities };
}
