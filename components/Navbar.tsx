"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-cream/95 backdrop-blur-md border-b border-ink/10" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-full bg-rose flex items-center justify-center text-cream text-xs">
            ◎
          </div>
          <span className="font-display text-lg tracking-tight text-ink">
            NAILZ<span className="text-rose italic">.CLUB</span>
          </span>
        </Link>

        {/* Nav center */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { label: "Shop", href: "/shop" },
            { label: "New In", href: "/shop?filter=new" },
            { label: "Collections", href: "/shop?filter=collections" },
            { label: "About", href: "/about" },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-mid hover:text-ink transition-colors tracking-wide"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 text-sm font-medium text-ink hover:text-rose transition-colors tracking-wide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span className="hidden sm:inline">Bag</span>
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose text-cream text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          <button
            className="md:hidden w-9 h-9 flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="text-ink text-lg">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden bg-cream border-b border-ink/10 transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-64" : "max-h-0"}`}>
        <nav className="px-6 py-4 flex flex-col gap-0.5">
          {[
            { label: "Shop All", href: "/shop" },
            { label: "New In", href: "/shop?filter=new" },
            { label: "Collections", href: "/shop?filter=collections" },
            { label: "About", href: "/about" },
          ].map(item => (
            <Link key={item.href} href={item.href}
              onClick={() => setMenuOpen(false)}
              className="px-2 py-3 text-sm font-medium text-mid hover:text-ink border-b border-ink/5 last:border-0 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => { openCart(); setMenuOpen(false); }}
            className="px-2 py-3 text-sm font-medium text-mid hover:text-ink text-left transition-colors"
          >
            Bag{count > 0 ? ` (${count})` : ""}
          </button>
        </nav>
      </div>
    </header>
  );
}
