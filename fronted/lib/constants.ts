export const DELIVERY_FEE = 0;
export const TAX_RATE = 0.00;
export const FREE_DELIVERY_THRESHOLD = 0;

export const COUPONS: Record<string, { label: string; discountPercent: number }> = {
  // HAV10: { label: "10% off", discountPercent: 10 },
  // BIRYANI50: { label: "₹50 off on orders above ₹500", discountPercent: 0 },
};

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "8147503170";

export const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "";
