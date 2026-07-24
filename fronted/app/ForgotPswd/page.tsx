"use client"
import { useRouter } from "next/navigation";
import React from "react";

const ForgotPassword = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0B1F2E] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-[#112A3C] border border-[#2C4A5F] rounded-2xl p-6 flex flex-col gap-6">

        <div className="text-center">
          <h1 className="text-xl font-bold text-white">Forgot Password 🔐</h1>
          <p className="text-sm text-[#9CA3AF]">
            Enter your email to reset password
          </p>
        </div>

        <input
          type="email"
          placeholder="Enter your email"
          className="bg-[#1E3A4C] p-3 rounded-xl text-white outline-none border border-[#2C4A5F]"
        />

        <button className="bg-[#F4B400] text-[#0B1F2E] py-3 rounded-xl font-semibold hover:bg-[#D99A00]">
          Send Reset Link
        </button>

        <button
          onClick={() => router.push("/Login")}
          className="text-[#F4B400] text-sm"
        >
          Back to Login
        </button>

      </div>
    </div>
  );
};

export default ForgotPassword;