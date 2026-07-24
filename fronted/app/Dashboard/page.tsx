"use client"
import React, { useState } from "react";

const Dashboard = () => {
    const [access, setAccess] = useState(false);

    const verifyCred = async () => {
        const user = await fetch("")
    }

    const [tab, setTab] = useState("orders");

    return (
        <div className="min-h-screen bg-[#0B1F2E] text-white flex">

            {/* SIDEBAR */}
            <div className="w-60 bg-[#112A3C] border-r border-[#2C4A5F] p-4 hidden md:flex flex-col gap-3">

                <h2 className="text-lg font-semibold mb-4">My Account</h2>

                {["orders", "profile", "address", "help"].map((item) => (
                    <button
                        key={item}
                        onClick={() => setTab(item)}
                        className={`text-left px-3 py-2 rounded-lg ${tab === item
                            ? "bg-[#F4B400] text-black"
                            : "text-[#9CA3AF] hover:bg-[#1E3A4C]"
                            }`}
                    >
                        {item.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* CONTENT */}
            <div className="flex-1 p-5 flex flex-col gap-5">

                {/* HEADER */}
                <h1 className="text-2xl font-bold capitalize">{tab}</h1>
                {/* MOBILE TABS */}
                <div className="md:hidden flex gap-2 overflow-x-auto pb-2">

                    {["orders", "profile", "address", "help"].map((item) => (
                        <button
                            key={item}
                            onClick={() => setTab(item)}
                            className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm ${tab === item
                                ? "bg-[#F4B400] text-black"
                                : "bg-[#1E3A4C] text-[#9CA3AF]"
                                }`}
                        >
                            {item}
                        </button>
                    ))}

                </div>

                {/* ORDERS */}
                {tab === "orders" && (
                    <div className="flex flex-col gap-3">
                        <div className="bg-[#1E3A4C] p-4 rounded-xl border border-[#2C4A5F]">
                            <p>Chicken Biryani x2</p>
                            <span className="text-sm text-[#9CA3AF]">Delivered</span>
                        </div>
                    </div>
                )}

                {/* PROFILE */}
                {tab === "profile" && (
                    <div className="flex flex-col gap-3 max-w-md">
                        <input className="bg-[#1E3A4C] p-3 rounded-xl" placeholder="Name" />
                        <input className="bg-[#1E3A4C] p-3 rounded-xl" placeholder="Email" />
                        <button className="bg-[#F4B400] text-black py-2 rounded-xl">
                            Update Profile
                        </button>
                    </div>
                )}

                {/* ADDRESS */}
                {tab === "address" && (
                    <div className="flex flex-col gap-3">
                        <div className="bg-[#1E3A4C] p-4 rounded-xl">
                            <p>Home - Bangalore</p>
                        </div>
                        <button className="bg-[#F4B400] text-black py-2 rounded-xl w-fit px-4">
                            Add Address
                        </button>
                    </div>
                )}

                {/* HELP */}
                {tab === "help" && (
                    <div className="flex flex-col gap-3">
                        <textarea
                            className="bg-[#1E3A4C] p-3 rounded-xl"
                            placeholder="Describe your issue..."
                        />
                        <button className="bg-[#F4B400] text-black py-2 rounded-xl w-fit px-4">
                            Submit
                        </button>
                    </div>
                )}

            </div>

        </div>
    );
};

export default Dashboard;