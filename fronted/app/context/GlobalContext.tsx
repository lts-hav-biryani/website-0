"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { calculateCartTotals, getCartItemCount } from "@/lib/cart-utils";
import type { CartItem, CartTotals, MenuItem } from "@/lib/types";

const CART_STORAGE_KEY = "ltshav-cart";

type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  totals: CartTotals;
  appliedCoupon: string;
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function GlobalContext({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setCart(loadCartFromStorage());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart, isHydrated]);

  const addItem = useCallback((item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.itemId === item.itemId);
      if (existing) {
        return prev.map((c) =>
          c.itemId === item.itemId
            ? { ...c, itemQuantity: c.itemQuantity + 1 }
            : c
        );
      }
      return [...prev, { ...item, itemQuantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setCart((prev) => prev.filter((item) => item.itemId !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) {
      setCart((prev) => prev.filter((item) => item.itemId !== itemId));
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.itemId === itemId ? { ...item, itemQuantity: quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setAppliedCoupon("");
  }, []);

  const applyCoupon = useCallback(
    (code: string) => {
      const normalized = code.trim().toUpperCase();
      if (!normalized) {
        return { success: false, message: "Please enter a coupon code." };
      }

      const totals = calculateCartTotals(cart, normalized);
      if (totals.discount === 0) {
        return {
          success: false,
          message: "Invalid coupon or minimum order not met.",
        };
      }

      setAppliedCoupon(normalized);
      return { success: true, message: "Coupon applied successfully!" };
    },
    [cart]
  );
  const removeCoupon = useCallback(() => {
    setAppliedCoupon("");
  }, []);
  const cartCount = useMemo(() => getCartItemCount(cart), [cart]);
  const totals = useMemo(
    () => calculateCartTotals(cart, appliedCoupon),
    [cart, appliedCoupon]
  );

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      totals,
      appliedCoupon,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      applyCoupon,
      removeCoupon,
    }),
    [
      cart,
      cartCount,
      totals,
      appliedCoupon,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      applyCoupon,
      removeCoupon,
    ]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within GlobalContext provider");
  }
  return context;
}

/** @deprecated Use useCart instead */
export const GlobalContextProvider = CartContext;
