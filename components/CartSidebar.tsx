"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/CartContext";

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, total, count, isOpen, closeCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(({ product, quantity }) => ({
            productId: product.id,
            quantity,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Checkout failed");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Sidebar */}
          <motion.div
            key="sidebar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-cream border-l-2 border-ink flex flex-col shadow-[-8px_0_0_#1A0A2E]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b-2 border-ink bg-ink text-cream">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🛒</span>
                <h2 className="font-display font-800 text-xl">your cart</h2>
                {count > 0 && (
                  <span className="bg-lemon text-ink text-xs font-800 w-6 h-6 rounded-full flex items-center justify-center font-display">
                    {count}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-full border-2 border-cream/30 flex items-center justify-center hover:bg-cream/10 transition-colors text-sm"
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <span className="text-6xl">💅</span>
                  <p className="font-display font-700 text-xl text-ink">ur cart is naked</p>
                  <p className="text-mid/50 text-sm">add some nails and let's fix that</p>
                  <button
                    onClick={closeCart}
                    className="btn-chunky mt-2"
                  >
                    shop the drop 💅
                  </button>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  <AnimatePresence initial={false}>
                    {items.map(({ product, quantity }) => (
                      <motion.li
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 60 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-4 bg-white border-2 border-ink rounded-2xl p-4 shadow-[3px_3px_0_#1A0A2E]"
                      >
                        {/* Swatch */}
                        <div
                          className={`w-16 h-16 rounded-xl border-2 border-ink flex items-center justify-center text-2xl shrink-0 bg-gradient-to-br ${product.bg ?? ""}`}
                        >
                          {product.emoji}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-700 text-sm text-ink leading-tight truncate">{product.name}</p>
                          <p className="text-[10px] text-mid/50 mb-2">{product.tag}</p>
                          <div className="flex items-center justify-between">
                            {/* Qty stepper */}
                            <div className="flex items-center border-2 border-ink rounded-full overflow-hidden text-xs">
                              <button
                                onClick={() => updateQuantity(product.id, quantity - 1)}
                                className="px-2.5 py-1 hover:bg-lemon transition-colors font-bold"
                              >
                                −
                              </button>
                              <span className="px-3 py-1 font-bold border-x-2 border-ink">{quantity}</span>
                              <button
                                onClick={() => updateQuantity(product.id, quantity + 1)}
                                className="px-2.5 py-1 hover:bg-lemon transition-colors font-bold"
                              >
                                +
                              </button>
                            </div>
                            <span className="font-display font-700 text-sm text-ink">
                              £{(product.price * quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(product.id)}
                          className="self-start text-mid/30 hover:text-bubblegum transition-colors text-lg leading-none"
                        >
                          ×
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t-2 border-ink px-6 py-5 bg-white">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-mid/50 font-semibold">subtotal</span>
                  <span className="font-display font-700 text-2xl text-ink">£{total.toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-mid/40 mb-4">shipping calculated at checkout</p>

                {error && (
                  <p className="text-xs text-red-500 mb-3 text-center">{error}</p>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-ink text-lemon font-display font-700 py-4 rounded-full border-2 border-ink hover:bg-bubblegum hover:text-white hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#1A0A2E] transition-all text-sm mb-2 disabled:opacity-60 disabled:pointer-events-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                        <path d="M12 2a10 10 0 0 1 10 10" />
                      </svg>
                      Redirecting…
                    </>
                  ) : (
                    <>checkout ⚡ £{total.toFixed(2)}</>
                  )}
                </button>

                <button
                  onClick={closeCart}
                  className="w-full text-center text-xs text-mid/50 hover:text-ink transition-colors py-2"
                >
                  continue shopping →
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
