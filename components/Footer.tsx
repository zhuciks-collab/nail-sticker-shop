import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-7 h-7 rounded-full bg-rose flex items-center justify-center text-cream text-xs">◎</div>
            <span className="font-display text-lg tracking-tight">
              NAILZ<span className="text-rose italic">.CLUB</span>
            </span>
          </div>
          <p className="text-cream/45 text-sm leading-relaxed font-light mb-6">
            Salon-quality nail stickers, delivered. Effortless beauty for every occasion.
          </p>
          <div className="flex gap-3">
            {["In", "Tk", "Pi"].map((s, i) => (
              <a key={i} href="#"
                className="w-9 h-9 border border-cream/15 flex items-center justify-center text-cream/40 hover:border-cream/40 hover:text-cream transition-colors text-xs font-medium rounded-sm">
                {s}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="label-caps text-cream/30 mb-6">Shop</h4>
          {["All Nails", "New Arrivals", "Bestsellers", "Collections", "Gift Cards"].map(l => (
            <Link key={l} href="/shop"
              className="block text-sm text-cream/45 hover:text-cream transition-colors mb-3 font-light">
              {l}
            </Link>
          ))}
        </div>

        <div>
          <h4 className="label-caps text-cream/30 mb-6">Help</h4>
          {["How to Apply", "Shipping Info", "Returns", "FAQ", "Track Order"].map(l => (
            <Link key={l} href="#"
              className="block text-sm text-cream/45 hover:text-cream transition-colors mb-3 font-light">
              {l}
            </Link>
          ))}
        </div>

        <div>
          <h4 className="label-caps text-cream/30 mb-6">Stay in the Loop</h4>
          <p className="text-sm text-cream/40 font-light mb-5 leading-relaxed">
            New drops every Friday. Be first to know.
          </p>
          <div className="flex border border-cream/15 focus-within:border-cream/40 transition-colors">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/25 outline-none font-body"
            />
            <button className="px-4 text-cream/60 hover:text-cream transition-colors text-sm">→</button>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-cream/25 font-light">© 2024 NAILZ.CLUB — All rights reserved.</p>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms", "Cookies"].map(l => (
            <Link key={l} href="#" className="text-xs text-cream/25 hover:text-cream/50 transition-colors">{l}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
