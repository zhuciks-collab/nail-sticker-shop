import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

// Editorial SVG hero image placeholder
function HeroImage() {
  return (
    <svg viewBox="0 0 600 720" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5F0EB" />
          <stop offset="100%" stopColor="#E8D5B7" />
        </linearGradient>
        <linearGradient id="nail1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8C4B8" />
          <stop offset="100%" stopColor="#C9847A" />
        </linearGradient>
        <linearGradient id="nail2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F0D5CC" />
          <stop offset="100%" stopColor="#D4A090" />
        </linearGradient>
        <linearGradient id="skin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5D5B8" />
          <stop offset="100%" stopColor="#E8C4A0" />
        </linearGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <radialGradient id="gloss" cx="35%" cy="30%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.55" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="600" height="720" fill="url(#bg)" />

      {/* Soft background texture circle */}
      <circle cx="420" cy="180" r="280" fill="#C9847A" opacity="0.07" />
      <circle cx="100" cy="580" r="200" fill="#C4A882" opacity="0.06" />

      {/* Editorial hand — elegant long fingers */}
      {/* Palm base */}
      <ellipse cx="300" cy="580" rx="145" ry="95" fill="url(#skin)" opacity="0.95" />

      {/* Fingers — long and elegant */}
      {[
        { cx: 138, baseY: 490, w: 42, h: 210, rx: 21, nailH: 90, angle: -22, nailGrad: "nail2" },
        { cx: 210, baseY: 450, w: 48, h: 240, rx: 24, nailH: 105, angle: -9,  nailGrad: "nail1" },
        { cx: 292, baseY: 435, w: 52, h: 260, rx: 26, nailH: 115, angle: 0,   nailGrad: "nail1" },
        { cx: 375, baseY: 448, w: 47, h: 248, rx: 23, nailH: 108, angle: 9,   nailGrad: "nail2" },
        { cx: 450, baseY: 490, w: 36, h: 195, rx: 18, nailH: 82,  angle: 22,  nailGrad: "nail2" },
      ].map((f, i) => (
        <g key={i} transform={`rotate(${f.angle} ${f.cx} ${f.baseY + f.h / 2})`}>
          {/* Finger body */}
          <rect
            x={f.cx - f.w / 2} y={f.baseY}
            width={f.w} height={f.h} rx={f.rx}
            fill="url(#skin)"
            stroke="rgba(180,140,110,0.15)" strokeWidth="1"
          />
          {/* Knuckle subtle lines */}
          <line
            x1={f.cx - f.w * 0.35} y1={f.baseY + f.h * 0.55}
            x2={f.cx + f.w * 0.35} y2={f.baseY + f.h * 0.55}
            stroke="rgba(180,140,110,0.12)" strokeWidth="1" strokeLinecap="round"
          />
          <line
            x1={f.cx - f.w * 0.3} y1={f.baseY + f.h * 0.7}
            x2={f.cx + f.w * 0.3} y2={f.baseY + f.h * 0.7}
            stroke="rgba(180,140,110,0.1)" strokeWidth="1" strokeLinecap="round"
          />
          {/* Nail */}
          <rect
            x={f.cx - (f.w - 6) / 2} y={f.baseY + 4}
            width={f.w - 6} height={f.nailH} rx={(f.w - 6) / 2}
            fill={`url(#${f.nailGrad})`}
            stroke="rgba(180,120,100,0.2)" strokeWidth="0.5"
          />
          {/* Nail gloss */}
          <rect
            x={f.cx - (f.w - 6) / 2} y={f.baseY + 4}
            width={f.w - 6} height={f.nailH} rx={(f.w - 6) / 2}
            fill="url(#gloss)"
          />
          {/* Cuticle arc */}
          <path
            d={`M ${f.cx - (f.w - 8) / 2} ${f.baseY + 22} Q ${f.cx} ${f.baseY + 14} ${f.cx + (f.w - 8) / 2} ${f.baseY + 22}`}
            fill="none" stroke="rgba(180,120,100,0.18)" strokeWidth="1"
          />
        </g>
      ))}

      {/* Decorative elements */}
      {/* Thin gold line top-right */}
      <line x1="460" y1="40" x2="460" y2="200" stroke="#C4A882" strokeWidth="0.8" opacity="0.5" />
      <line x1="480" y1="60" x2="480" y2="180" stroke="#C4A882" strokeWidth="0.4" opacity="0.3" />

      {/* Small dot cluster */}
      {[0,1,2,3,4,5].map(i => (
        <circle key={i} cx={520 + (i % 3) * 12} cy={90 + Math.floor(i / 3) * 12} r="1.5" fill="#C4A882" opacity="0.4" />
      ))}

      {/* Bottom label */}
      <rect x="160" y="650" width="280" height="38" rx="1" fill="rgba(28,25,23,0.04)" />
      <text x="300" y="664" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="9" fontWeight="600" letterSpacing="4" fill="#57534E" opacity="0.7">NAILZ.CLUB</text>
      <text x="300" y="679" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fill="#57534E" opacity="0.5">salon-quality, effortlessly</text>
    </svg>
  );
}

// Instagram placeholder image
function InstaImage({ index }: { index: number }) {
  const palettes = [
    { bg: ["#E8D5C4", "#D4B8A8"], nail: "#C9847A", accent: "#B87060" },
    { bg: ["#D4DDD8", "#C4D0CC"], nail: "#8BA898", accent: "#6A8878" },
    { bg: ["#E0D4E8", "#CFC4DA"], nail: "#9B84A8", accent: "#7A6488" },
    { bg: ["#EAE0D4", "#DDD0C4"], nail: "#C4A882", accent: "#A88860" },
  ];
  const p = palettes[index % 4];
  const captions = ["glazed donut 🍩", "mermaid core 🌊", "golden glitz ✨", "midnight marble 🖤"];
  const users = ["@nailz.club", "@nailz.club", "@nailz.club", "@nailz.club"];

  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id={`ibg${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={p.bg[0]} />
          <stop offset="100%" stopColor={p.bg[1]} />
        </linearGradient>
        <linearGradient id={`inail${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={p.nail} stopOpacity="0.9" />
          <stop offset="100%" stopColor={p.accent} />
        </linearGradient>
        <linearGradient id={`iovl${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="50%" stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(28,25,23,0.55)" />
        </linearGradient>
        <radialGradient id={`igloss${index}`} cx="35%" cy="25%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill={`url(#ibg${index})`} />

      {/* Three elegant nail shapes */}
      {[
        { cx: 140, cy: 170, w: 52, h: 140, rx: 26, angle: -10 },
        { cx: 200, cy: 148, w: 58, h: 158, rx: 29, angle: 0 },
        { cx: 260, cy: 168, w: 50, h: 142, rx: 25, angle: 10 },
      ].map((n, i) => (
        <g key={i} transform={`rotate(${n.angle} ${n.cx} ${n.cy + n.h / 2})`}>
          <rect x={n.cx - n.w / 2} y={n.cy} width={n.w} height={n.h} rx={n.rx}
            fill={`url(#inail${index})`} stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
          <rect x={n.cx - n.w / 2} y={n.cy} width={n.w} height={n.h} rx={n.rx}
            fill={`url(#igloss${index})`} />
        </g>
      ))}

      {/* Gradient overlay for text */}
      <rect width="400" height="400" fill={`url(#iovl${index})`} />

      {/* Caption */}
      <text x="20" y="368" fontFamily="'Space Grotesk', sans-serif" fontSize="12" fontWeight="600" fill="white" opacity="0.95">{captions[index]}</text>
      <text x="20" y="386" fontFamily="'Space Grotesk', sans-serif" fontSize="10" fill="white" opacity="0.6">{users[index]}</text>
    </svg>
  );
}

export default function HomePage() {
  const featured = products.slice(0, 4);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-cream pt-16">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-16 grid lg:grid-cols-2 gap-0 items-center">

          {/* Text side */}
          <div className="lg:pr-16 py-12">
            <p className="label-caps mb-8 anim-fade-up d1">New Collection — 2024</p>

            <h1 className="font-display text-[56px] md:text-[72px] lg:text-[80px] leading-[1.05] tracking-tight text-ink mb-8 anim-fade-up d2">
              Salon-Quality
              <br />
              <em className="not-italic grad-text">Nails</em> in
              <br />
              Minutes.
            </h1>

            <p className="text-mid text-lg leading-relaxed mb-10 max-w-md font-light anim-fade-up d3">
              Press-on nail stickers crafted for a flawless, long-lasting finish.
              No dry time, no damage — just effortlessly beautiful nails, every day.
            </p>

            <div className="flex flex-wrap gap-4 anim-fade-up d4">
              <Link href="/shop" className="btn-chunky">
                Shop the Collection
              </Link>
              <Link href="/shop?filter=new" className="btn-outline-chunky">
                What's New
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex items-center gap-8 mt-14 pt-10 border-t border-ink/10 anim-fade-up d5">
              {[
                { stat: "50K+", label: "Happy customers" },
                { stat: "4.9★", label: "Average rating" },
                { stat: "14 days", label: "Wear guarantee" },
              ].map(({ stat, label }) => (
                <div key={label}>
                  <p className="font-display text-2xl text-ink">{stat}</p>
                  <p className="label-caps mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image side */}
          <div className="relative anim-pop d3 hidden lg:block">
            {/* Main image frame */}
            <div className="relative aspect-[5/6] rounded-sm overflow-hidden shadow-[0_40px_80px_rgba(28,25,23,0.15)]">
              <HeroImage />
            </div>
            {/* Floating badge */}
            <div className="absolute -left-8 bottom-24 bg-cream border border-ink/10 rounded-sm px-5 py-4 shadow-[0_8px_30px_rgba(28,25,23,0.12)]">
              <p className="label-caps mb-1">Trending now</p>
              <p className="font-display text-xl text-ink">Glazed Donut</p>
              <p className="text-sm text-mid mt-0.5">£11.99</p>
            </div>
            {/* Decorative dot grid */}
            <div className="absolute -right-6 top-12 grid grid-cols-4 gap-2 opacity-30">
              {Array(16).fill(null).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-gold" />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile hero image */}
        <div className="lg:hidden absolute inset-0 opacity-10 pointer-events-none">
          <HeroImage />
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div className="border-y border-ink/10 py-4 overflow-hidden bg-ivory">
        <div className="marquee-track flex w-max gap-0">
          {Array(6).fill(["PEEL", "PRESS", "SLAY", "14-DAY WEAR", "FREE RETURNS", "NEXT-DAY DELIVERY", "4.9 STARS"]).flat().map((t, i) => (
            <span key={i} className="label-caps px-10 whitespace-nowrap opacity-60">
              {t}
              <span className="ml-10 inline-block w-1 h-1 rounded-full bg-gold align-middle opacity-60" />
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="label-caps mb-3">Bestsellers</p>
            <h2 className="font-display text-5xl lg:text-6xl text-ink leading-tight">
              The Edit
            </h2>
          </div>
          <Link href="/shop" className="hidden md:flex btn-outline-chunky text-sm">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>

        <div className="text-center mt-10 md:hidden">
          <Link href="/shop" className="btn-chunky">View All</Link>
        </div>
      </section>

      {/* ── BRAND STRIP ── */}
      <section className="bg-ink py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="label-caps text-cream/40 mb-6">Our Promise</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream leading-snug">
            "The art of beautiful nails,<br />
            <em>simplified.</em>"
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-10 mt-12">
            {[
              { icon: "◎", text: "No UV Lamp Needed" },
              { icon: "◈", text: "Salon-Finish Results" },
              { icon: "◉", text: "Zero Nail Damage" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <span className="text-gold text-xl">{icon}</span>
                <span className="label-caps text-cream/50">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="text-center mb-16">
          <p className="label-caps mb-3">So easy it's effortless</p>
          <h2 className="font-display text-5xl text-ink">Three Steps</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-ink/10">
          {[
            { n: "01", title: "Prep", desc: "Clean, dry nails. A light buff for extra grip. 30 seconds of prep for up to 14 days of wear." },
            { n: "02", title: "Press", desc: "Peel from the backing, align from the cuticle, press firmly. Smooth out any air — that's it." },
            { n: "03", title: "Slay", desc: "File off the excess, seal with a top coat for extra longevity. Now go turn heads." },
          ].map(s => (
            <div key={s.n} className="bg-cream p-10 lg:p-14">
              <p className="font-display text-6xl text-ink/10 mb-6">{s.n}</p>
              <h3 className="font-display text-2xl text-ink mb-3">{s.title}</h3>
              <p className="text-mid text-sm leading-relaxed font-light">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── INSTAGRAM ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="label-caps mb-3">Stay Connected</p>
            <h2 className="font-display text-4xl lg:text-5xl text-ink">
              Follow Us on Instagram
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 btn-outline-chunky"
          >
            @nailz.club ↗
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
          {[0, 1, 2, 3].map(i => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-sm bg-ivory block"
            >
              <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                <InstaImage index={i} />
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-cream text-sm font-medium tracking-widest uppercase">
                  View
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn-outline-chunky">
            @nailz.club ↗
          </a>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="bg-ivory border-y border-ink/10 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <p className="label-caps mb-3">Customer Stories</p>
            <h2 className="font-display text-5xl text-ink">They're Obsessed</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Emma R.", text: "I've tried every press-on brand on the market. NAILZ.CLUB is genuinely miles ahead — the finish looks like I walked out of a salon.", rating: 5 },
              { name: "Chloe M.", text: "Strangers stop me in the street to ask where I got my nails done. The Chrome Party set is everything.", rating: 5 },
              { name: "Priya S.", text: "Ordered at 9pm, arrived next morning. The packaging is beautiful and the nails lasted my entire two-week holiday.", rating: 5 },
            ].map(r => (
              <div key={r.name} className="bg-cream p-8 border border-ink/8">
                <div className="flex gap-1 mb-5 text-gold text-sm">{"★".repeat(r.rating)}</div>
                <p className="font-display text-lg leading-relaxed text-ink mb-6 italic">
                  "{r.text}"
                </p>
                <p className="label-caps">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMAIL CTA ── */}
      <section className="bg-cream py-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="label-caps mb-4">Join the Club</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-4">
            New Drops, Every Friday.
          </h2>
          <p className="text-mid font-light mb-10">
            Get early access and 15% off your first order.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-ivory border border-ink/20 focus:border-ink px-5 py-4 text-sm text-ink placeholder:text-mid/40 outline-none rounded-sm transition-colors font-body"
            />
            <button className="btn-chunky whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-mid/40 text-xs mt-4 tracking-wide">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  );
}
