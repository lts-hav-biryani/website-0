export type MenuItem = {
  itemId: string;
  itemImageLink: string;
  itemTitle: string;
  itemDescription: string;
  itemPrice: number;
};

export type CartItem = MenuItem & {
  itemQuantity: number;
};

export type DeliveryAddress = {
  name: string;
  phone: string;
  street: string;
  city: string;
  pincode: string;
};

export type OrderSummary = {
  id: string;
  items: CartItem[];
  subtotal: number;
  delivery: number;
  tax: number;
  discount: number;
  finalTotal: number;
  paymentMethod: "ONLINE"|"OFFLINE";
  paymentStatus: "paid" | "failed" | "pending";
  paymentId?: string;
  address: DeliveryAddress;
  createdAt: string;
};

export type CartTotals = {
  subtotal: number;
  delivery: number;
  tax: number;
  discount: number;
  finalTotal: number;
};
