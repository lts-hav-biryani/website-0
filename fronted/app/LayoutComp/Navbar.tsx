"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "@/app/context/GlobalContext";

const Navbar = () => {
  const router = useRouter();
  const { cartCount } = useCart();

  return (
    <div className="sticky top-0 z-50 bg-[#0B1F2E]/90 backdrop-blur border-b border-[#2C4A5F]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src="/Logo.svg"
            width={40}
            height={40}
            alt="Logo"
            className="rounded-xl"
          />
          <span className="font-semibold text-[#F9FAFB] text-lg hidden sm:block">
            LtsHavBiryani
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 text-sm">
          <button onClick={() => router.push("/Menu")} className="nav-btn">
            Menu
          </button>

          <button
            onClick={() => router.push("/Cart")}
            className="nav-btn flex items-center gap-2 relative"
          >
            <FaCartShopping />
            <span className="hidden sm:block">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 sm:static sm:ml-0 min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-[#F4B400] text-[#0B1F2E] text-xs font-bold rounded-full">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          <button onClick={() => router.push("/Login")} className="btn-primary">
            Login
          </button>
        </div>
      </div>

      <style jsx>{`
        .nav-btn {
          color: #9ca3af;
          padding: 8px 12px;
          border-radius: 10px;
          transition: 0.2s;
        }

        .nav-btn:hover {
          color: #f9fafb;
          background: #1e3a4c;
        }

        .btn-primary {
          background: #f4b400;
          color: #0b1f2e;
          padding: 8px 14px;
          border-radius: 10px;
          font-weight: 600;
          transition: 0.2s;
        }

        .btn-primary:hover {
          background: #d99a00;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
