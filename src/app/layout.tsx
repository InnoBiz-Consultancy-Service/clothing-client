import type { Metadata } from "next";
import "./globals.css";
import NextSessionProvider from "@/providers/NextSessionProvider";


export const metadata: Metadata = {
  title: "TenRus",
  description: "TenRus is an e-commerce website.",
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
        <NextSessionProvider>
          {children}
        </NextSessionProvider>
      </body>
    </html>
  );
}
