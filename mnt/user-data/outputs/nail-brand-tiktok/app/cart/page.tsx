import Link from "next/link";
import { products } from "@/lib/products";
export const metadata = { title: "Cart — NAILZ.CLUB 💅" };

const cartItems = [
  { product: products[0], qty: 1 },
  { product: products[2], qty: 1 },
];

export default function CartPage() {
  const subtotal = cartItems.reduce((s, { product, qty }) => s + product.price * qty, 0);
  const shipping = subtotal >= 25 ? 0 : 3.99;
  const progress = Math.min((subtotal / 25) * 100, 100);

  return (
    <div className="pt-16 min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="pill bg-ink text-lemon mb-4">🛒 ur bag</div>
        <h1 className="font-display font-800 text-5xl text-ink mb-8">
          cart ({cartItems.length} items)
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(({ product, qty }) => (
              <div key={product.id} className="bg-white border-2 border-ink rounded-2xl p-5 flex gap-5 shadow-[3px_3px_0_#1A0A2E]">
                <div className={`w-24 h-28 rounded-xl bg-gradient-to-br ${product.bg} border-2 border-ink flex items-center justify-center text-4xl shrink-0`}>
                  {product.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold text-mid/50 uppercase tracking-wider mb-1">{product.tag}</p>
                  <h3 className="font-display font-700 text-lg text-ink">{product.name}</h3>
                  <p className="text-xs text-mid/50 mt-1 line-clamp-1">{product.desc}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border-2 border-ink rounded-full overflow-hidden">
                      <button className="px-3 py-1 text-sm hover:bg-lemon transition-colors">−</button>
                      <span className="px-3 py-1 text-sm font-bold border-x-2 border-ink">{qty}</span>
                      <button className="px-3 py-1 text-sm hover:bg-lemon transition-colors">+</button>
                    </div>
                    <button className="text-xs text-mid/40 hover:text-bubblegum transition-colors font-semibold">remove</button>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display font-700 text-xl text-ink">£{(product.price * qty).toFixed(2)}</p>
                </div>
              </div>
            ))}

            {subtotal < 25 && (
              <div className="bg-lemon/20 border-2 border-ink rounded-2xl p-4">
                <p className="text-sm font-semibold text-ink mb-2">
                  add <span className="text-bubblegum font-bold">£{(25 - subtotal).toFixed(2)}</span> more for free shipping 🚀
                </p>
                <div className="h-3 bg-lemon/30 rounded-full overflow-hidden border border-ink/20">
                  <div className="h-full bg-bubblegum rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-ink rounded-2xl p-7 shadow-[4px_4px_0_#1A0A2E] sticky top-24">
              <h2 className="font-display font-700 text-2xl text-ink mb-6">order summary</h2>
              <div className="space-y-3 text-sm border-b-2 border-ink/10 pb-5 mb-5">
                <div className="flex justify-between text-mid/70">
                  <span>subtotal</span><span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-mid/70">
                  <span>shipping</span>
                  <span>{shipping === 0 ? <span className="text-mint font-bold">FREE 🎉</span> : `£${shipping.toFixed(2)}`}</span>
                </div>
              </div>
              <div className="flex justify-between font-display font-700 text-xl text-ink mb-6">
                <span>total</span><span>£{(subtotal + shipping).toFixed(2)}</span>
              </div>

              <div className="flex gap-2 mb-5">
                <input type="text" placeholder="promo code 🎁"
                  className="flex-1 border-2 border-ink rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-bubblegum text-ink" />
                <button className="bg-ink text-lemon px-4 py-2.5 rounded-xl text-xs font-display font-700 hover:bg-bubblegum hover:text-white transition-colors">apply</button>
              </div>

              <button className="w-full bg-bubblegum text-white font-display font-700 text-sm py-4 rounded-xl border-2 border-ink hover:bg-ink hover:text-lemon transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#FF3CAC]">
                checkout 💅
              </button>
              <Link href="/shop" className="block text-center text-xs text-mid/40 hover:text-bubblegum transition-colors mt-4 font-semibold">
                + keep shopping
              </Link>

              <div className="mt-5 pt-5 border-t border-ink/10 grid grid-cols-3 gap-2 text-center">
                {[["🔒","secure checkout"],["↩","free returns"],["🚀","next-day delivery"]].map(([i,l])=>(
                  <div key={l as string}><span className="text-lg block">{i}</span><p className="text-[9px] text-mid/50 font-semibold uppercase tracking-wider mt-1">{l as string}</p></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
