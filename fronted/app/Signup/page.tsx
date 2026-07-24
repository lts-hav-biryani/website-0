"use client"
import { useRouter } from "next/navigation";
import React from "react";

const Signup = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0B1F2E] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-[#112A3C] border border-[#2C4A5F] rounded-2xl p-6 md:p-8 flex flex-col gap-6">

        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Create Account 🚀</h1>
          <p className="text-[#9CA3AF] text-sm mt-1">
            Join us and enjoy delicious food
          </p>
        </div>

        <div className="flex flex-col gap-4">

          <input
            placeholder="Full Name"
            className="bg-[#1E3A4C] p-3 rounded-xl text-white outline-none border border-[#2C4A5F]"
          />

          <input
            type="email"
            placeholder="Email"
            className="bg-[#1E3A4C] p-3 rounded-xl text-white outline-none border border-[#2C4A5F]"
          />

          <input
            type="password"
            placeholder="Password"
            className="bg-[#1E3A4C] p-3 rounded-xl text-white outline-none border border-[#2C4A5F]"
          />

          <button className="bg-[#F4B400] text-[#0B1F2E] py-3 rounded-xl font-semibold hover:bg-[#D99A00]">
            Sign Up
          </button>

        </div>

        <p className="text-center text-sm text-[#9CA3AF]">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/Login")}
            className="text-[#F4B400] font-semibold"
          >
            Login
          </button>
        </p>

      </div>
    </div>
  );
};

export default Signup;