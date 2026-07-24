"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaCircleCheck,
  FaCircleXmark,
  FaWhatsapp,
  FaArrowLeft,
} from "react-icons/fa6";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import type { OrderSummary } from "@/lib/types";
import { orderDetails } from "../Cart/page";
const OrderSuccessPage = () => {
  const router = useRouter();
  // const [order, setOrder] = useState<OrderSummary | null>(null);
  const isSuccess = orderDetails?.paymentStatus === "paid";
  const isFailed = orderDetails?.paymentStatus === "failed";
  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-[#0B1F2E] text-white flex flex-col items-center justify-center px-4 text-center">
        <p className="text-[#9CA3AF] mb-4">No order details found.</p>
        <button
          onClick={() => router.push("/Menu")}
          className="bg-[#F4B400] text-[#0B1F2E] px-6 py-2 rounded-lg font-semibold"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(`
Order Help Request

Order ID: ${orderDetails.id}

Items:
${orderDetails.items.map((i) => `${i.itemTitle} x${i.itemQuantity}`).join("\n")}

Total: ₹${orderDetails.finalTotal}

Payment: ${orderDetails.paymentMethod}
Payment Status: ${orderDetails.paymentStatus}
${orderDetails.paymentId ? `Payment ID: ${orderDetails.paymentId}` : ""}

Address:
${orderDetails.address.name}
${orderDetails.address.phone}
${orderDetails.address.street}, ${orderDetails.address.city} - ${orderDetails.address.pincode}
  `);

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-[#0B1F2E] text-white px-4 md:px-10 py-8">
      <div className="flex flex-col items-center text-center mb-8">
        {isSuccess ? (
          <>
            <FaCircleCheck className="text-[#22C55E] text-5xl mb-3" />
            <h1 className="text-2xl md:text-3xl font-bold">
              Order Placed Successfully
            </h1>
            <p className="text-[#9CA3AF] mt-2">
              Your delicious food is on the way!
            </p>
          </>
        ) : isFailed ? (
          <>
            <FaCircleXmark className="text-red-400 text-5xl mb-3" />
            <h1 className="text-2xl md:text-3xl font-bold">Payment Failed</h1>
            <p className="text-[#9CA3AF] mt-2">
              Something went wrong with your payment. Please try again.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl md:text-3xl font-bold">Order Details</h1>
            <p className="text-[#9CA3AF] mt-2">Order ID: {order.id}</p>
          </>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-[#112A3C] border border-[#2C4A5F] rounded-2xl p-5">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold">Order Details</h2>
              <span className="text-xs text-[#9CA3AF] bg-[#1E3A4C] px-2 py-1 rounded">
                {orderDetails.id}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {orderDetails.items.map((item) => (
                <div
                  key={item.itemId}
                  className="flex justify-between text-sm gap-4"
                >
                  <span className="min-w-0">
                    {item.itemTitle} x{item.itemQuantity}
                  </span>
                  <span className="text-[#F4B400] shrink-0">
                    ₹ {item.itemPrice * item.itemQuantity}
                  </span>
                </div>
              ))}
            </div>

            <hr className="border-[#2C4A5F] my-4" />

            <div className="flex justify-between text-sm text-[#9CA3AF]">
              <span>Subtotal</span>
              <span className="text-white">₹ {orderDetails.subtotal}</span>
            </div>

            {orderDetails.discount > 0 && (
              <div className="flex justify-between text-sm text-[#22C55E] mt-1">
                <span>Discount</span>
                <span>− ₹ {orderDetails.discount}</span>
              </div>
            )}

            <div className="flex justify-between text-sm text-[#9CA3AF] mt-1">
              <span>Delivery</span>
              <span className="text-white">
                {orderDetails.delivery === 0 ? "Free" : `₹ ${orderDetails.delivery}`}
              </span>
            </div>

            <div className="flex justify-between text-sm text-[#9CA3AF] mt-1">
              <span>Tax</span>
              <span className="text-white">₹ {orderDetails.tax}</span>
            </div>

            <div className="flex justify-between text-base font-semibold mt-3">
              <span>Total</span>
              <span className="text-[#F4B400]">₹ {orderDetails.finalTotal}</span>
            </div>
          </div>

          <div className="bg-[#112A3C] border border-[#2C4A5F] rounded-2xl p-5">
            <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
            <div className="text-sm text-[#9CA3AF]">
              <p className="text-white font-medium">{orderDetails.address.name}</p>
              <p>{orderDetails.address.phone}</p>
              <p>{orderDetails.address.street}</p>
              <p>
                {orderDetails.address.city} - {orderDetails.address.pincode}
              </p>
            </div>
          </div>

          <div className="bg-[#112A3C] border border-[#2C4A5F] rounded-2xl p-5">
            <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
            <div className="flex justify-between text-sm">
              <span className="text-[#9CA3AF]">Method</span>
              <span className="text-white">{orderDetails.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-[#9CA3AF]">Status</span>
              <span
                className={`font-medium ${orderDetails.paymentStatus === "paid" ? "text-[#22C55E]" : "text-red-400"}`}
              >
                {orderDetails.paymentStatus === "paid" ? "Paid" : "Failed"}
              </span>
            </div>
            {orderDetails.paymentId && (
              <div className="flex justify-between text-sm mt-2">
                <span className="text-[#9CA3AF]">Payment ID</span>
                <span className="text-white text-xs">{orderDetails.paymentId}</span>
              </div>
            )}
          </div>
        </div>

        <div className="h-fit flex flex-col gap-4">
          <div className="bg-[#112A3C] border border-[#2C4A5F] rounded-2xl p-5">
            <h2 className="text-lg font-semibold mb-4">Need Help?</h2>
            <p className="text-sm text-[#9CA3AF] mb-4">
              Facing any issue with your order? Contact us instantly on WhatsApp.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-black font-semibold py-3 rounded-xl hover:opacity-90 transition"
            >
              <FaWhatsapp /> Chat on WhatsApp
            </a>
          </div>

          <button
            onClick={() => router.push("/Menu")}
            className="flex items-center justify-center gap-2 bg-[#1E3A4C] border border-[#2C4A5F] text-white py-3 rounded-xl hover:border-[#F4B400] transition"
          >
            <FaArrowLeft /> Order More
          </button>
        </div>
      </div>
    </div>
  );
};
export default OrderSuccessPage;