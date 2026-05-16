import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import CursorDot from "@/components/CursorDot";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "NAILZ.CLUB — Salon-Quality Nail Stickers",
  description:
    "Press-on nail stickers crafted for a flawless, long-lasting finish. No dry time, no damage — effortlessly beautiful nails, every day.",
  openGraph: {
    title: "NAILZ.CLUB",
    description: "Salon-quality nail stickers delivered to your door.",
    siteName: "NAILZ.CLUB",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <CursorDot />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartSidebar />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
