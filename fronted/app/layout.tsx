import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./LayoutComp/Navbar";
import Footer from "./LayoutComp/Footer";
import { GlobalProviderWrapper } from "./GlobalWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LtsHavBiryani — Order Authentic Biryani Online",
  description:
    "Order fresh, authentic chicken and mutton biryani online. Fast delivery with secure Razorpay payments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col p-0 m-0 bg-[#0F172A] antialiased`}
      >
        <GlobalProviderWrapper>
          <div>
            <Navbar />
          </div>
          <div>
            {children}
          </div>
          <div>
            <Footer />
          </div>
        </GlobalProviderWrapper>
      </body>
    </html>
  );
}
