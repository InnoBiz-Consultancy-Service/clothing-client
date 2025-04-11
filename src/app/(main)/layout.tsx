import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";
import TopNav from "@/components/Shared/Navbar/TopNav/TopNav";


export const metadata: Metadata = {
  title: "TenRus",
  description: "TenRus is an e-commerce website",
  icons: {
    icon: "/clothing.png",
    shortcut: "/clothing.png",
    apple: "/clothing.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <TopNav />
        <div className="sticky top-0 w-full z-50">
          <Navbar />
        </div>
        {children}
        <div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
