import { products } from "@/lib/products";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

interface Props { params: { slug: string } }
export function generateStaticParams() { return products.map(p => ({ slug: p.id })); }
export function generateMetadata({ params }: Props) {
  const p = products.find(p => p.id === params.slug);
  return { title: `${p?.name ?? "Product"} — NAILZ.CLUB 💅` };
}

export default function ProductPage({ params }: Props) {
  const product = products.find(p => p.id === params.slug);
  if (!product) notFound();
  const related = products.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <nav className="flex gap-2 text-xs text-mid/50 mb-8 items-center font-semibold">
          <Link href="/" className="hover:text-bubblegum transition-colors">home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-bubblegum transition-colors">shop</Link>
          <span>/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Image */}
          <div className={`aspect-square bg-gradient-to-br ${product.bg} rounded-3xl border-2 border-ink shadow-[6px_6px_0_#1A0A2E] flex items-center justify-center overflow-hidden relative`}>
            <span className="text-[120px]">{product.emoji}</span>
            {product.badge && (
              <span className="absolute top-5 left-5 pill bg-bubblegum text-white border border-white/20 text-xs font-bold">{product.badge}</span>
            )}
            <div className="absolute bottom-5 left-5 flex gap-2">
              <span className="pill bg-black/30 text-white backdrop-blur text-[10px]">👁 {product.views}</span>
              <span className="pill bg-black/30 text-white backdrop-blur text-[10px]">❤️ {product.likes}</span>
            </div>
          </div>

          {/* Details */}
          <div className="lg:pt-4">
            <div className="pill bg-lemon text-ink mb-3 text-[11px]">{product.tag}</div>
            <h1 className="font-display font-800 text-5xl text-ink leading-tight mb-4">{product.name}</h1>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-bubblegum text-sm">⭐⭐⭐⭐⭐</span>
              <span className="text-xs text-mid/50 font-semibold">4.9 (248 reviews)</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <span className="font-display font-800 text-4xl text-ink">£{product.price.toFixed(2)}</span>
              {product.originalPrice && <span className="text-lg text-mid/40 line-through">£{product.originalPrice.toFixed(2)}</span>}
            </div>
            <p className="text-mid text-base leading-relaxed mb-8 bg-lemon/20 rounded-2xl p-4 border-l-4 border-lemon font-light">
              {product.desc}
            </p>

            {/* Colors */}
            <div className="mb-7">
              <p className="text-xs font-display font-700 uppercase tracking-widest text-mid/50 mb-3">shade palette</p>
              <div className="flex gap-3">
                {product.colors.map((c, i) => (
                  <button key={i} className="w-9 h-9 rounded-full border-2 border-ink hover:scale-110 transition-transform shadow-[2px_2px_0_#1A0A2E]" style={{ background: c }} />
                ))}
              </div>
            </div>

            {/* Qty + CTA */}
            <div className="flex gap-3 mb-4">
              <div className="flex items-center border-2 border-ink rounded-full overflow-hidden">
                <button className="px-4 py-3 hover:bg-lemon transition-colors">−</button>
                <span className="px-5 py-3 text-sm font-bold border-x-2 border-ink">1</span>
                <button className="px-4 py-3 hover:bg-lemon transition-colors">+</button>
              </div>
              <button className="flex-1 bg-ink text-lemon font-display font-700 text-sm py-3 rounded-full border-2 border-ink hover:bg-bubblegum hover:text-white hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#1A0A2E] transition-all">
                add to cart 🛒
              </button>
            </div>
            <button className="w-full bg-bubblegum text-white font-display font-700 text-sm py-3.5 rounded-full border-2 border-ink hover:bg-lemon hover:text-ink hover:-translate-y-0.5 transition-all mb-8">
              buy it now ⚡
            </button>

            {/* Trust */}
            <div className="grid grid-cols-3 gap-3">
              {[["🚀","next-day delivery"],["🔒","secure checkout"],["↩","free returns"]].map(([emoji, label])=>(
                <div key={label as string} className="bg-cream border border-ink/10 rounded-xl p-3 text-center">
                  <span className="text-xl block mb-1">{emoji}</span>
                  <p className="text-[9px] font-display font-700 uppercase tracking-wider text-mid/60">{label as string}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mt-20">
          <div className="pill bg-bubblegum text-white mb-5">✨ u might also want</div>
          <h2 className="font-display font-800 text-4xl text-ink mb-8">more nails, more problems 💅</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
