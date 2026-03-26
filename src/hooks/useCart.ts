import { useState, useCallback, useEffect } from "react";
import type { Product } from "@/data/products";
import { products } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_KEY = "cartgenius_cart";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed: { id: string; quantity: number }[] = JSON.parse(raw);
    return parsed
      .map((item) => {
        const product = products.find((p) => p.id === item.id);
        return product ? { product, quantity: item.quantity } : null;
      })
      .filter(Boolean) as CartItem[];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(
    CART_KEY,
    JSON.stringify(items.map((i) => ({ id: i.product.id, quantity: i.quantity })))
  );
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addToCart = useCallback((productId: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === productId);
      if (existing) {
        return prev.map((i) =>
          i.product.id === productId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      const product = products.find((p) => p.id === productId);
      if (!product) return prev;
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.product.id === productId
            ? { ...i, quantity: Math.max(0, i.quantity + delta) }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalCount = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return {
    items,
    isOpen,
    setIsOpen,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    totalCount,
    subtotal,
  };
}
