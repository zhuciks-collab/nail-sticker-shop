import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import CursorDot from "@/components/CursorDot";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 1. Import the Next.js Script component
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Site Title",
  description: "Your Site Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        {/* 2. Load the main Google Tag script */}
        <Script
          src="https://googletagmanager.com"
          strategy="afterInteractive"
        />
        
        {/* 3. Initialize the dataLayer and tracking */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8404NPPSZN');
          `}
        </Script>
      </body>
    </html>
  );
}


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
      </body>
    </html>
  );
}
