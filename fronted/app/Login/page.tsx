"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCart } from "../context/GlobalContext";
const Login = () => {
  const { setLoggedIn } = useCart();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: ""
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
  }
  const [message, setMessage] = useState("");
  const router = useRouter();
  const loginAuth = async () => {
    console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
    const response = await fetch(`http://localhost:8010/api/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userDetails)
    });
    const data = await response.json()
    if (response.ok) {
      setLoggedIn(true);
      router.push("/Dashboard");
    }
    setMessage(data.message)
  }
  return (
    <div className="min-h-screen bg-[#0B1F2E] flex items-center justify-center px-4">
      {/* CARD */}
      <div className="w-full max-w-md bg-[#112A3C] border border-[#2C4A5F] rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-lg">
        {/* TITLE */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Welcome Back 👋</h1>
          <p className="text-[#9CA3AF] text-sm mt-1">
            Login to continue your order
          </p>
        </div>
        {/* FORM */}
        <div className="flex flex-col gap-4">
          {/* EMAIL */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#9CA3AF]">Email</label>
            <input

              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="bg-[#1E3A4C] border border-[#2C4A5F] p-3 rounded-xl outline-none text-white focus:border-[#F4B400]"
            />
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#9CA3AF]">Password</label>
            <input
              type="password"
              name="password"
              value={userDetails.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="bg-[#1E3A4C] border border-[#2C4A5F] p-3 rounded-xl outline-none text-white focus:border-[#F4B400]"
            />
          </div>
          <div className="text-white" >
            {message}
          </div>
          {/* FORGOT */}
          <div className="flex justify-end">
            <button onClick={() => { router.push("/ForgotPswd") }} className="text-sm text-[#F4B400] hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <button
            className="bg-[#F4B400] text-[#0B1F2E] py-3 rounded-xl font-semibold hover:bg-[#D99A00] transition"
            onClick={loginAuth}
          >
            Login
          </button>

        </div>

        {/* DIVIDER */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-[1px] bg-[#2C4A5F]" />
          <span className="text-xs text-[#9CA3AF]">OR</span>
          <div className="flex-1 h-[1px] bg-[#2C4A5F]" />
        </div>

        {/* GOOGLE LOGIN (UI only) */}
        <button className="bg-[#1E3A4C] border border-[#2C4A5F] py-3 rounded-xl text-white hover:bg-[#223F52] transition">
          Continue with Google
        </button>

        {/* SIGNUP */}
        <p className="text-center text-sm text-[#9CA3AF]">
          Don’t have an account?{" "}
          <button
            onClick={() => router.push("/Signup")}
            className="text-[#F4B400] font-semibold hover:underline"
          >
            Sign up
          </button>
        </p>

      </div>

    </div>
  );
};

export default Login;