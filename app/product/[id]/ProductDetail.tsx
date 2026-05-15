"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Product } from "@/backend/types";
import { useCart } from "@/lib/CartContext";
import ProductCard from "@/components/ProductCard";

function GalleryMain({ product }: { product: Product }) {
  if (product.image) {
    return (
      <Image
        src={product.image}
        alt={product.name}
        width={400}
        height={400}
        className="w-full h-full object-cover"
      />
    );
  }
  const [c1, c2, c3] = product.colors;
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="gmain" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor={c3} />
          <stop offset="100%" stopColor={c1} />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill={`url(#gmain)`} />
      {[
        { x: 30,  y: 90,  w: 55, h: 120, rx: 27, c: c1, r: -18 },
        { x: 100, y: 60,  w: 62, h: 145, rx: 31, c: c2, r: -8  },
        { x: 175, y: 50,  w: 65, h: 155, rx: 32, c: c1, r: 0   },
        { x: 255, y: 60,  w: 60, h: 145, rx: 30, c: c3, r: 8   },
        { x: 325, y: 88,  w: 52, h: 120, rx: 26, c: c2, r: 18  },
      ].map((n, i) => (
        <g key={i} transform={`rotate(${n.r} ${n.x + n.w / 2} ${n.y + n.h / 2})`}>
          <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={n.rx} fill={n.c} stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" />
          <ellipse cx={n.x + n.w / 2} cy={n.y + n.h * 0.22} rx={n.w * 0.28} ry={n.h * 0.1} fill="white" opacity="0.4" />
        </g>
      ))}
      <text x="200" y="365" textAnchor="middle" fontSize="48">{product.emoji}</text>
    </svg>
  );
}

function GalleryFlatLay({ product }: { product: Product }) {
  const [c1, c2, c3] = product.colors;
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="400" fill="#FFF8F0" />
      <rect x="60" y="40" width="280" height="200" rx="16" fill="white" stroke="#1A0A2E" strokeWidth="2" />
      <text x="200" y="78" textAnchor="middle" fontFamily="sans-serif" fontSize="11" fontWeight="700" fill="#1A0A2E" letterSpacing="2">NAIL STICKER SET • 16 SIZES</text>
      {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
        const col = i % 6, row = Math.floor(i / 6);
        const cx = 88 + col * 40, cy = 100 + row * 60;
        const c = [c1,c2,c3][i % 3];
        return (
          <g key={i}>
            <rect x={cx - 13} y={cy - 22} width={26} height={44} rx={13} fill={c} stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
            <ellipse cx={cx} cy={cy - 10} rx={6} ry={4} fill="white" opacity="0.4" />
          </g>
        );
      })}
      <text x="200" y="278" textAnchor="middle" fontFamily="sans-serif" fontSize="20" fontWeight="800" fill="#1A0A2E">{product.name}</text>
      <text x="200" y="300" textAnchor="middle" fontFamily="sans-serif" fontSize="11" fill="#4A3560" opacity="0.6">{product.tag}</text>
      <circle cx="167" cy="336" r="16" fill={c1} stroke="#1A0A2E" strokeWidth="2" />
      <circle cx="200" cy="336" r="16" fill={c2} stroke="#1A0A2E" strokeWidth="2" />
      <circle cx="233" cy="336" r="16" fill={c3} stroke="#1A0A2E" strokeWidth="2" />
      <text x="200" y="375" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fill="#4A3560" opacity="0.5">shade palette</text>
    </svg>
  );
}

function GalleryOnHand({ product }: { product: Product }) {
  const [c1, c2, c3] = product.colors;
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="ghand" cx="40%" cy="60%" r="70%">
          <stop offset="0%" stopColor="#fde8d0" />
          <stop offset="100%" stopColor="#f5d5b8" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill={`${c1}22`} />
      <ellipse cx="200" cy="290" rx="130" ry="80" fill="url(#ghand)" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" />
      {[
        { cx: 90,  cy: 220, w: 36, h: 100, rx: 18, c: c2, r: -20 },
        { cx: 143, cy: 175, w: 40, h: 118, rx: 20, c: c1, r: -8  },
        { cx: 200, cy: 158, w: 42, h: 128, rx: 21, c: c3, r: 0   },
        { cx: 257, cy: 170, w: 39, h: 118, rx: 19, c: c1, r: 9   },
        { cx: 310, cy: 210, w: 32, h: 95,  rx: 16, c: c2, r: 22  },
      ].map((f, i) => (
        <g key={i} transform={`rotate(${f.r} ${f.cx} ${f.cy + f.h / 2})`}>
          <rect x={f.cx - f.w / 2} y={f.cy - 10} width={f.w} height={f.h + 30} rx={f.rx} fill="url(#ghand)" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
          <rect x={f.cx - f.w / 2 + 3} y={f.cy} width={f.w - 6} height={f.h * 0.55} rx={f.rx - 2} fill={f.c} stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />
          <ellipse cx={f.cx} cy={f.cy + f.h * 0.12} rx={(f.w - 8) * 0.3} ry={f.h * 0.06} fill="white" opacity="0.45" />
        </g>
      ))}
      <text x="200" y="392" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fontWeight="700" fill="#1A0A2E" opacity="0.5" letterSpacing="1">{product.name.toUpperCase()}</text>
    </svg>
  );
}

const steps = [
  { q: "1. prep ur nails 🫧", a: "Start with clean, dry nails. Remove any old polish or oils with a nail wipe or a bit of acetone. Lightly buff the surface for extra grip — this makes your stickers last longer. Don't skip this step!" },
  { q: "2. pick ur size 💅", a: "Each pack comes with 16 different sizes to fit every finger. Hold the sticker up to your nail before peeling — it should match or be slightly smaller than your nail width. Starting from your pinky is a great move." },
  { q: "3. peel & press ✨", a: "Peel the sticker from the backing using the tab. Align from your cuticle first, then press down towards the tip. Use a cuticle stick or your thumbnail to press out any air bubbles and seal the edges tight." },
  { q: "4. file & finish 🔥", a: "Fold the excess over the tip of your nail and file downward to snap it off cleanly. Add a top coat if you want extra shine and an extended wear of up to 21 days. That's it — you're obsessed-worthy." },
  { q: "how long do they last? ⏱", a: "14 days minimum with proper prep. Add a top coat and avoid soaking your hands and you can push to 21 days. Shower, swim, gym — they hold up to real life." },
  { q: "how do i remove them? 💧", a: "Soak a cotton pad in acetone or nail polish remover, hold it on the nail for 30 seconds, then gently peel or slide off. No damage, no drama. Or just peel them off dry if your nails are strong — works too." },
];

function Accordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="flex flex-col gap-2">
      {steps.map((s, i) => (
        <li key={i} className="border-2 border-ink rounded-2xl overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left font-display font-700 text-sm text-ink hover:bg-lemon/30 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span>{s.q}</span>
            <span className={`text-bubblegum text-xl leading-none transition-transform duration-200 ${open === i ? "rotate-45" : "rotate-0"}`}>+</span>
          </button>
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ maxHeight: open === i ? "200px" : "0px" }}
          >
            <p className="px-5 pb-4 text-sm text-mid leading-relaxed font-light border-t border-ink/10 pt-3">
              {s.a}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

interface Props {
  product: Product;
  related: Product[];
}

export default function ProductDetail({ product, related }: Props) {
  const { addItem, updateQuantity } = useCart();
  const [qty, setQty] = useState(1);
  const [activeView, setActiveView] = useState(0);

  const views = [
    { label: "nails", component: <GalleryMain product={product} /> },
    { label: "sheet", component: <GalleryFlatLay product={product} /> },
    { label: "on hand", component: <GalleryOnHand product={product} /> },
  ];

  const handleAddToCart = () => {
    addItem(product);
    if (qty > 1) updateQuantity(product.id, qty);
  };

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
          <div className="flex flex-col gap-4">
            <div className={`aspect-square bg-gradient-to-br ${product.bg ?? ""} rounded-3xl border-2 border-ink shadow-[6px_6px_0_#1A0A2E] overflow-hidden relative`}>
              {views[activeView].component}
              {product.badge && (
                <span className="absolute top-5 left-5 pill bg-bubblegum text-white border border-white/20 text-xs font-bold">
                  {product.badge}
                </span>
              )}
              <div className="absolute bottom-5 left-5 flex gap-2">
                <span className="pill bg-black/30 text-white backdrop-blur text-[10px]">👁 {product.views}</span>
                <span className="pill bg-black/30 text-white backdrop-blur text-[10px]">❤️ {product.likes}</span>
              </div>
            </div>
            <div className="flex gap-3">
              {views.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setActiveView(i)}
                  className={`flex-1 aspect-square bg-gradient-to-br ${product.bg ?? ""} rounded-xl border-2 overflow-hidden transition-all duration-200 ${
                    activeView === i ? "border-bubblegum shadow-[3px_3px_0_#FF3CAC]" : "border-ink hover:border-bubblegum/50"
                  }`}
                >
                  <div className="w-full h-full scale-75 origin-center pointer-events-none">
                    {v.component}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:pt-4">
            <div className="pill bg-lemon text-ink mb-3 text-[11px]">{product.tag}</div>
            <h1 className="font-display font-800 text-5xl text-ink leading-tight mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-bubblegum text-sm">⭐⭐⭐⭐⭐</span>
              <span className="text-xs text-mid/50 font-semibold">4.9 (248 reviews)</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="font-display font-800 text-4xl text-ink">£{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-lg text-mid/40 line-through">£{product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <p className="text-mid text-base leading-relaxed mb-7 bg-lemon/20 rounded-2xl p-4 border-l-4 border-lemon font-light">
              {product.description}
            </p>

            <div className="mb-7">
              <p className="text-xs font-display font-700 uppercase tracking-widest text-mid/50 mb-3">shade palette</p>
              <div className="flex gap-3">
                {product.colors.map((c, i) => (
                  <button key={i} className="w-9 h-9 rounded-full border-2 border-ink hover:scale-110 transition-transform shadow-[2px_2px_0_#1A0A2E]" style={{ background: c }} />
                ))}
              </div>
            </div>

            <div className="flex gap-3 mb-4">
              <div className="flex items-center border-2 border-ink rounded-full overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-3 hover:bg-lemon transition-colors">−</button>
                <span className="px-5 py-3 text-sm font-bold border-x-2 border-ink min-w-[48px] text-center">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="px-4 py-3 hover:bg-lemon transition-colors">+</button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-ink text-lemon font-display font-700 text-sm py-3 rounded-full border-2 border-ink hover:bg-bubblegum hover:text-white hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#1A0A2E] transition-all"
              >
                add to cart 🛒
              </button>
            </div>
            <button className="w-full bg-bubblegum text-white font-display font-700 text-sm py-3.5 rounded-full border-2 border-ink hover:bg-lemon hover:text-ink hover:-translate-y-0.5 transition-all mb-8">
              buy it now ⚡
            </button>

            <div className="grid grid-cols-3 gap-3 mb-10">
              {[["🚀","next-day delivery"],["🔒","secure checkout"],["↩","free returns"]].map(([emoji, label]) => (
                <div key={label} className="bg-cream border border-ink/10 rounded-xl p-3 text-center">
                  <span className="text-xl block mb-1">{emoji}</span>
                  <p className="text-[9px] font-display font-700 uppercase tracking-wider text-mid/60">{label}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="font-display font-800 text-2xl text-ink mb-4">how to apply 💅</h2>
              <Accordion />
            </div>
          </div>
        </div>

        <div className="mt-24">
          <div className="pill bg-bubblegum text-white mb-5 inline-flex">✨ u might also want</div>
          <h2 className="font-display font-800 text-4xl text-ink mb-8">more nails, more problems 💅</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
