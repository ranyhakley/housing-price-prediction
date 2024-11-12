

import type { Metadata } from "next";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "Housing Price Prediction",
  description: "Written by Rany",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-inter text-[#121212]">
        <Header></Header>
        <SmoothScrolling>{children}</SmoothScrolling>
        <Footer/>
      </body>
    </html>
  );
}
