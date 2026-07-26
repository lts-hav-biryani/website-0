"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";
const Signup = () => {
  const [message, setMessage] = useState("")
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: ""
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
  }
  const registerAuth = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(userDetails)
    });
    const resmessage = await response.json()
    if (response.ok) {
      router.push("/Login");
    }
    setMessage(resmessage.message)
  }
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
            name="fullName"
            value={userDetails.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="bg-[#1E3A4C] p-3 rounded-xl text-white outline-none border border-[#2C4A5F]"
          />
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            placeholder="Email"
            className="bg-[#1E3A4C] p-3 rounded-xl text-white outline-none border border-[#2C4A5F]"
          />
          <input
            type="text"
            name="phoneNumber"
            value={userDetails.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className="bg-[#1E3A4C] p-3 rounded-xl text-white outline-none border border-[#2C4A5F]"
            maxLength={10}
          />
          <input
            type="password"
            name="password"
            value={userDetails.password}
            onChange={handleChange}
            placeholder="Password"
            className="bg-[#1E3A4C] p-3 rounded-xl text-white outline-none border border-[#2C4A5F]"
          />
          <button className="bg-[#F4B400] text-[#0B1F2E] py-3 rounded-xl font-semibold hover:bg-[#D99A00]" onClick={registerAuth}>
            Sign Up
          </button>
          <div className="text-white" >
            {message}
          </div>
        </div>
        <p className="text-center text-sm text-[#9CA3AF]">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
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