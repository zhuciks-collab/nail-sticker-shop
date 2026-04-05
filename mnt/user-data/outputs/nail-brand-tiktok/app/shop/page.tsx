import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata = { title: "Shop All — NAILZ.CLUB 💅" };

export default function ShopPage() {
  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-ink text-cream py-20 relative overflow-hidden border-b-2 border-ink">
        <div className="absolute inset-0 opacity-5 pointer-events-none text-8xl flex flex-wrap gap-8 p-8">
          {"💅✨🔥🍓💎🌸🫧💿🩰💅✨🔥🍓💎🌸🫧💿🩰".split("").map((e,i)=><span key={i}>{e}</span>)}
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="pill bg-cream/10 text-cream mb-5">💅 all drops</div>
          <h1 className="font-display font-800 text-6xl lg:text-7xl text-cream leading-none">
            shop everything<span className="text-lemon">.</span>
          </h1>
          <p className="text-cream/50 mt-3 text-base">200+ designs. new ones every friday. u won't be able to pick just one, fair warning 🔥</p>
        </div>
      </div>

      {/* Filter pills */}
      <div className="sticky top-16 z-30 bg-cream/90 backdrop-blur border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {["All 🔥","New In ✨","Best Sellers 💅","Viral on TikTok 📱","Under £10 💸","Collections 🌸","Sale 🎉"].map(f => (
            <button key={f} className="pill bg-ink text-cream whitespace-nowrap hover:bg-bubblegum cursor-none transition-colors font-semibold text-[11px]">
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-mid/60 font-semibold">{products.length} styles available</p>
          <select className="text-sm border-2 border-ink bg-cream px-3 py-2 rounded-xl font-semibold text-ink focus:outline-none focus:border-bubblegum cursor-none">
            <option>Sort: Trending 🔥</option>
            <option>Newest first ✨</option>
            <option>Price: low to high 💸</option>
            <option>Most viewed 👁</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
          {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </div>
  );
}
