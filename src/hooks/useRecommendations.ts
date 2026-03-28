import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/data/products";
import { fetchProducts, trackUserActivity, fetchRecommendations } from "@/lib/api";

export interface UserActivity {
  productId: string;
  type: "view" | "click" | "purchase";
  timestamp: number;
}

export function useRecommendations() {
  const [lastViewed, setLastViewed] = useState<Product | null>(null);

  // Fetch all products
  const { data: allProducts = [], isLoading: isLoadingProducts, error: productError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Track activity
  const trackActivity = useCallback(async (productId: string, type: UserActivity["type"]) => {
    trackUserActivity(productId, type);
    
    if (type === "view" || type === "click") {
      const product = allProducts.find((p) => p.id === productId);
      if (product) setLastViewed(product);
    }
  }, [allProducts]);

  // Fetch content-based recommendations
  const { data: contentBased = [], isLoading: isLoadingContentBased } = useQuery({
    queryKey: ["recommendations", "content", lastViewed?.id],
    queryFn: () => fetchRecommendations(lastViewed?.id),
    enabled: !!allProducts.length, // Only run after products are loaded
  });

  // Collaborative: for now let's assume the backend handles this or we can reuse fetchRecommendations
  // In a real app, this might be a separate endpoint /api/recommendations/collaborative
  const collaborative = contentBased.slice(0, 2); // Mocking for now from the same API

  return { 
    trackActivity, 
    contentBased, 
    collaborative, 
    lastViewed, 
    isLoading: isLoadingProducts || isLoadingContentBased,
    error: productError
  };
}
