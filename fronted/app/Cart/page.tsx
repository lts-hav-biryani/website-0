"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FaArrowLeft,
  FaCartShopping,
  FaTrash,
  FaLocationDot,
  FaSpinner,
} from "react-icons/fa6";
import { useCart } from "@/app/context/GlobalContext";
import { generateOrderId } from "@/lib/cart-utils";
import type { DeliveryAddress } from "@/lib/types";
import type { OrderSummary } from "@/lib/types";
import Script from "next/script";
import { calculateCartTotals } from "../../lib/cart-utils"
const emptyAddress: DeliveryAddress = {
  name: "",
  phone: "",
  street: "",
  city: "",
  pincode: "",
};

function validateAddress(address: DeliveryAddress): string | null {
  if (!address.name.trim()) return "Please enter your full name.";
  if (!/^[6-9]\d{9}$/.test(address.phone.trim()))
    return "Please enter a valid 10-digit phone number.";
  if (!address.street.trim()) return "Please enter your street address.";
  if (!address.city.trim()) return "Please enter your city.";
  if (!/^\d{6}$/.test(address.pincode.trim()))
    return "Please enter a valid 6-digit pincode.";
  return null;
}

export const orderDetails: Partial<OrderSummary> = {
  paymentStatus: "pending",
  paymentMethod: "ONLINE"
}
const CartPage = () => {
  const {
    cart,
    totals,
    appliedCoupon,
    removeItem,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon
  } = useCart()
  const router = useRouter();
  const [message, setMessage] = useState("");
  // export orderDetails
  const [address, setAddress] = useState<DeliveryAddress>(emptyAddress);
  const [couponInput, setCouponInput] = useState("");
  const [couponMessage, setCouponMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const handleAddressChange = (field: keyof DeliveryAddress, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };
  const handleApplyCoupon = () => {
    const result = applyCoupon(couponInput);
    setCouponMessage({
      type: result.success ? "success" : "error",
      text: result.message,
    });
    if (result.success) setCouponInput("");
  };
  orderDetails.address = address;
  orderDetails.items = cart;
  orderDetails.subtotal = totals.subtotal;
  orderDetails.discount = totals.discount;
  orderDetails.delivery = totals.delivery;
  orderDetails.finalTotal = totals.finalTotal;
  const orderId = generateOrderId();
  orderDetails.id = orderId;
  const handlePlaceOrder = async () => {
    try {
      setCheckoutError(null);
      const validationError = validateAddress(address);
      if (validationError) {
        setCheckoutError(validationError);
        return;
      }
      if (cart.length === 0) {
        setCheckoutError("Your cart is empty.");
        return;
      }
      setIsProcessing(true);
      const response = await fetch(`http://localhost:8010/api/pay/razorpayCreateOrder`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ amount: orderDetails.finalTotal })
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message);
        setIsProcessing(false);
        alert(data.message)
        return
      }
      console.log(data)
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.finalTotal,
        currency: "INR",
        order_id: data.order.id,
        handler: async function (response: any) {
          console.log("Handler called")
          const backendHit = await fetch(`http://localhost:8010/api/pay/verifyPayment`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ response: response, orderDetails: orderDetails })
          })
          const data = await backendHit.json();
          if (backendHit.ok) {
            alert(data.message);
            orderDetails.paymentMethod = "ONLINE";
            orderDetails.paymentStatus = "paid";
            orderDetails.paymentId = response.razorpay_payment_id;
            router.push("/OrderS");
          }
          if (!backendHit.ok) {
            setMessage(data.message);
            alert(data.message)
          }
        }
      }
      if (response.ok) {
        // console.log(window.Razorpay)
        const rzp = new window.Razorpay(options);
        rzp.open()
      }
      setIsProcessing(false)
    } catch (error: any) {
      setIsProcessing(false)
      console.log(error)
      setMessage(error.message);
      return
    }
  };
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B1F2E] text-[#F9FAFB] px-3 md:px-10 py-16 flex flex-col items-center justify-center text-center">
        <FaCartShopping className="text-[#2C4A5F] text-6xl mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
        <p className="text-[#9CA3AF] mb-6 max-w-sm">
          Browse our menu and add some delicious biryani to get started.
        </p>
        <button
          onClick={() => router.push("/Menu")}
          className="btn-primary px-8 py-3 text-lg"
        >
          Explore Menu
        </button>
        <style jsx>{`
          .btn-primary {
            background: #f4b400;
            color: #0b1f2e;
            font-weight: 600;
            border-radius: 10px;
            transition: 0.2s;
          }
          .btn-primary:hover {
            background: #d99a00;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1F2E] text-[#F9FAFB] px-3 md:px-10 py-6 pb-28 md:pb-6">
      {message}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push("/Menu")}
          className="flex items-center gap-2 text-sm bg-[#1E3A4C] px-4 py-2 rounded-lg border border-[#2C4A5F] hover:bg-[#F4B400] hover:text-[#0B1F2E] transition"
        >
          <FaArrowLeft /> Back
        </button>

        <h1 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
          <FaCartShopping className="text-[#F4B400]" /> Cart
          <span className="text-sm font-normal text-[#9CA3AF]">
            ({cart.length} items)
          </span>
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-[#112A3C] border border-[#2C4A5F] rounded-2xl p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Your Items</h2>

            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div
                  key={item.itemId}
                  className="flex flex-col md:flex-row gap-4 bg-[#1E3A4C] border border-[#2C4A5F] p-4 rounded-xl"
                >
                  <img
                    src={item.itemImageLink}
                    className="w-full md:w-28 h-24 object-cover rounded-lg"
                    alt={item.itemTitle}
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium">{item.itemTitle}</h3>
                    <p className="text-[#F4B400] font-semibold mt-1">
                      ₹ {item.itemPrice}
                    </p>
                    <p className="text-xs text-[#9CA3AF] mt-1">
                      Line total: ₹ {item.itemPrice * item.itemQuantity}
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-xs text-[#9CA3AF]">Qty</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.itemId, item.itemQuantity - 1)
                        }
                        className="w-8 h-8 rounded-md bg-[#2C4A5F] hover:bg-[#F4B400] hover:text-black transition font-medium"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm">
                        {item.itemQuantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.itemId, item.itemQuantity + 1)
                        }
                        className="w-8 h-8 rounded-md bg-[#2C4A5F] hover:bg-[#F4B400] hover:text-black transition font-medium"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="flex items-center gap-2 text-sm text-[#F4B400] border border-[#F4B400] px-3 py-1.5 rounded-lg hover:bg-[#F4B400] hover:text-black transition self-start md:self-center"
                    onClick={() => removeItem(item.itemId)}
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#112A3C] border border-[#2C4A5F] rounded-2xl p-5">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaLocationDot className="text-[#F4B400]" /> Delivery Address
            </h2>

            <div className="grid md:grid-cols-2 gap-3">
              <input
                className="input"
                placeholder="Full Name *"
                value={address.name}
                onChange={(e) => handleAddressChange("name", e.target.value)}
              />
              <input
                className="input"
                placeholder="Phone Number *"
                value={address.phone}
                onChange={(e) => handleAddressChange("phone", e.target.value)}
                inputMode="numeric"
                maxLength={10}
              />
              <input
                className="input md:col-span-2"
                placeholder="Street Address *"
                value={address.street}
                onChange={(e) => handleAddressChange("street", e.target.value)}
              />
              <input
                className="input"
                placeholder="City *"
                value={address.city}
                onChange={(e) => handleAddressChange("city", e.target.value)}
              />
              <input
                className="input"
                placeholder="Pincode *"
                value={address.pincode}
                onChange={(e) => handleAddressChange("pincode", e.target.value)}
                inputMode="numeric"
                maxLength={6}
              />
            </div>
          </div>

          <div className="bg-[#112A3C] border border-[#2C4A5F] rounded-2xl p-5">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>

            <label className="flex items-center justify-between bg-[#1E3A4C] border border-[#F4B400] p-4 rounded-xl cursor-default">
              <div className="flex flex-col">
                <span className="font-medium">Online Payment</span>
                <span className="text-sm text-[#9CA3AF]">
                  UPI / Card / Net Banking via Razorpay
                </span>
              </div>
              <input
                type="radio"
                name="payment"
                className="accent-[#F4B400]"
                checked
                readOnly
              />
            </label>

            <label className="flex items-center justify-between bg-[#1E3A4C] border border-[#2C4A5F] p-4 rounded-xl opacity-50 cursor-not-allowed mt-3">
              <div className="flex flex-col">
                <span className="font-medium">Cash on Delivery</span>
                <span className="text-sm text-[#9CA3AF]">
                  Not available for this location
                </span>
              </div>
              <input
                type="radio"
                name="payment"
                className="accent-[#F4B400]"
                disabled
              />
            </label>
          </div>

          <div className="bg-[#112A3C] border border-[#2C4A5F] rounded-2xl p-5">
            <h2 className="text-lg font-semibold mb-3">Coupon</h2>
            <p className="text-xs text-[#9CA3AF] mb-3">
              {/* Try <span className="text-[#F4B400]">HAV10</span> for 10% off or{" "} */}
              {/* <span className="text-[#F4B400]">BIRYANI50</span> for ₹50 off */}
              {/* (orders above ₹500) */}
            </p>

            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-[#1E3A4C] border border-[#22C55E]/40 p-3 rounded-xl">
                <span className="text-[#22C55E] text-sm font-medium">
                  {appliedCoupon} applied — ₹{totals.discount} saved
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-sm text-[#9CA3AF] hover:text-white"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  className="input flex-1"
                  placeholder="Enter coupon code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                />
                <button className="btn-primary" onClick={handleApplyCoupon}>
                  Apply
                </button>
              </div>
            )}

            {couponMessage && (
              <p
                className={`text-sm mt-2 ${couponMessage.type === "success" ? "text-[#22C55E]" : "text-red-400"}`}
              >
                {couponMessage.text}
              </p>
            )}
          </div>
        </div>

        <div className="sticky top-20 h-fit">
          <div className="bg-[#112A3C] border border-[#2C4A5F] rounded-2xl p-5">
            <h2 className="text-lg font-semibold mb-4">Summary</h2>

            <div className="flex flex-col gap-2 text-sm text-[#9CA3AF]">
              <div className="flex justify-between">
                <span>Items Total</span>
                <span className="text-white">₹ {totals.subtotal}</span>
              </div>

              {totals.discount > 0 && (
                <div className="flex justify-between text-[#22C55E]">
                  <span>Discount</span>
                  <span>− ₹ {totals.discount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-white">
                  {totals.delivery === 0 ? (
                    <span className="text-[#22C55E]">Free</span>
                  ) : (
                    `₹ ${totals.delivery}`
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                {/* <span>Taxes (5% GST)</span> */}
                {/* <span className="text-white">₹ {totals.tax}</span> */}
              </div>

              <hr className="border-[#2C4A5F] my-2" />

              <div className="flex justify-between text-base font-semibold text-white">
                <span>Total</span>
                <span className="text-[#F4B400]">₹ {totals.finalTotal}</span>
              </div>
            </div>

            {checkoutError && (
              <p className="text-red-400 text-sm mt-4 bg-red-400/10 border border-red-400/30 rounded-lg p-3">
                {checkoutError}
              </p>
            )}

            <button
              className="btn-primary w-full mt-5 text-lg py-3 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={handlePlaceOrder}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <FaSpinner className="animate-spin" /> Processing...
                </>
              ) : (
                "Pay & Place Order"
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-[#112A3C] border-t border-[#2C4A5F] p-3 md:hidden flex justify-between items-center z-30">
        <div>
          <span className="font-semibold text-[#F4B400] text-lg">
            ₹ {totals.finalTotal}
          </span>
          <p className="text-xs text-[#9CA3AF]">{cart.length} items</p>
        </div>
        <button
          className="btn-primary px-6 py-2.5 disabled:opacity-60"
          onClick={handlePlaceOrder}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Checkout"}
        </button>
      </div>

      <style jsx>{`
        .input {
          background: #0b1f2e;
          border: 1px solid #2c4a5f;
          padding: 10px;
          border-radius: 10px;
          outline: none;
          color: white;
        }

        .input:focus {
          border-color: #f4b400;
        }

        .btn-primary {
          background: #f4b400;
          color: #0b1f2e;
          font-weight: 600;
          padding: 10px 16px;
          border-radius: 10px;
          transition: 0.2s;
        }

        .btn-primary:hover:not(:disabled) {
          background: #d99a00;
        }
      `}</style>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Razorpay SDK loaded");
          console.log(window.Razorpay);
        }}
      />
    </div>
  );
};

export default CartPage;