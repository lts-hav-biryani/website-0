"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaShoppingBasket, FaCheck } from "react-icons/fa";
import { useCart } from "@/app/context/GlobalContext";
import { menuItems } from "@/data/menu";

const Menu = () => {
  const router = useRouter();
  const { addItem, cartCount } = useCart();
  const [showAddedBar, setShowAddedBar] = useState(false);
  const [lastAddedTitle, setLastAddedTitle] = useState("");

  useEffect(() => {
    if (!showAddedBar) return;
    const timer = setTimeout(() => setShowAddedBar(false), 4000);
    return () => clearTimeout(timer);
  }, [showAddedBar]);

  const handleAdd = (item: (typeof menuItems)[0]) => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(100);
    }
    addItem(item);
    setLastAddedTitle(item.itemTitle);
    setShowAddedBar(true);
  };

  return (
    <div className="w-full px-4 md:px-6 lg:px-10 pb-24">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Our Menu</h1>
        <p className="text-[#9CA3AF] mt-1 text-sm">
          Fresh biryani made to order — add items to your cart
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.itemId}
            className="bg-[#1E3A4C] border border-[#2C4A5F] rounded-2xl overflow-hidden hover:scale-[1.02] hover:border-[#F4B400]/40 transition duration-200 flex flex-col"
          >
            <div className="relative">
              <img
                src={item.itemImageLink}
                className="w-full h-44 object-cover"
                alt={item.itemTitle}
              />
              <button
                onClick={() => handleAdd(item)}
                className="absolute bottom-3 right-3 bg-[#F4B400] text-[#0B1F2E] px-3 py-1.5 rounded-lg font-semibold hover:bg-[#D99A00] transition shadow-lg"
              >
                Add +
              </button>
            </div>

            <div className="p-4 flex flex-col gap-2 flex-1">
              <h2 className="text-base font-semibold text-white line-clamp-2">
                {item.itemTitle}
              </h2>
              <p className="text-sm text-[#9CA3AF] line-clamp-2 flex-1">
                {item.itemDescription}
              </p>
              <span className="text-[#F4B400] font-semibold text-lg">
                ₹ {item.itemPrice}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showAddedBar && (
        <div className="fixed bottom-0 left-0 w-full bg-[#112A3C] border-t border-[#2C4A5F] px-4 py-3 flex justify-between items-center shadow-lg z-40 animate-in slide-in-from-bottom">
          <div className="flex items-center gap-2 text-sm text-white min-w-0">
            <FaCheck className="text-[#22C55E] shrink-0" />
            <span className="truncate">
              Added: {lastAddedTitle}
              {cartCount > 0 && (
                <span className="text-[#9CA3AF] ml-1">
                  ({cartCount} in cart)
                </span>
              )}
            </span>
          </div>
          <button
            onClick={() => router.push("/Cart")}
            className="bg-[#F4B400] text-[#0B1F2E] px-5 py-2 rounded-lg flex items-center gap-2 font-semibold shrink-0 ml-3 hover:bg-[#D99A00] transition"
          >
            Go to Cart <FaShoppingBasket />
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
