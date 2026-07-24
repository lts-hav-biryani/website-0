import {
  COUPONS,
  DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  TAX_RATE,
} from "./constants";
import type { CartItem, CartTotals } from "./types";

export function calculateCartTotals(
  cart: CartItem[],
  couponCode?: string
): CartTotals {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.itemPrice * item.itemQuantity,
    0
  );

  let discount = 0;
  const coupon = couponCode?.trim().toUpperCase();

  if (coupon === "BIRYANI50" && subtotal >= 500) {
    discount = 50;
  } else if (coupon && COUPONS[coupon]?.discountPercent) {
    discount = Math.round((subtotal * COUPONS[coupon].discountPercent) / 100);
  }

  const discountedSubtotal = Math.max(subtotal - discount, 0);
  const delivery =
    discountedSubtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const tax = Math.round(discountedSubtotal * TAX_RATE);
  const finalTotal = discountedSubtotal + delivery + tax;

  return { subtotal, delivery, tax, discount, finalTotal };
}

export function getCartItemCount(cart: CartItem[]): number {
  return cart.reduce((count, item) => count + item.itemQuantity, 0);
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}
