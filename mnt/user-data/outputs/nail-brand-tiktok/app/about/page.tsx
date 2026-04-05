import Link from "next/link";
export const metadata = { title: "About — NAILZ.CLUB 💅" };

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <div className="bg-lemon border-b-2 border-ink py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="pill bg-ink text-lemon mb-6">💌 our story</div>
          <h1 className="font-display font-800 text-6xl lg:text-7xl text-ink leading-tight mb-6">
            started on fyp,
            <br />took over tiktok
            <span className="text-bubblegum">.</span>
          </h1>
          <p className="text-ink/60 text-xl font-light max-w-xl">
            nailz.club started as a last-minute video that got 2M views overnight. the rest is history (and 50k orders 💅).
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-display font-800 text-4xl text-ink mb-6">the origin story 🌸</h2>
          <div className="space-y-4 text-mid text-base leading-relaxed font-light">
            <p>it started when our founder mia couldn't afford gel nails at uni but refused to have bad nails. she started making her own stickers, posted a "how i do my nails for £3" video at 2am, and woke up to 800k views.</p>
            <p>the comments were flooded with "where can i buy these?" — so she started selling. first 100 orders went out from her kitchen table. now it's 50k+ orders and counting.</p>
            <p>every design is still made by our small in-house team of nail artists who are literally chronically online and know exactly what's trending before it trends. we don't use pr or gifting — just real nails, real people, real fyps.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { num: "50k+", label: "orders shipped", emoji: "📦" },
            { num: "200+", label: "active designs",  emoji: "🎨" },
            { num: "50M", label: "tiktok views",    emoji: "📱" },
            { num: "14",  label: "days of wear",    emoji: "⏱" },
          ].map(s => (
            <div key={s.label} className="bg-cream border-2 border-ink rounded-2xl p-6 shadow-[3px_3px_0_#1A0A2E] text-center card-lift">
              <span className="text-3xl">{s.emoji}</span>
              <p className="font-display font-800 text-4xl text-ink mt-2">{s.num}</p>
              <p className="text-xs text-mid/60 font-semibold uppercase tracking-wider mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="bg-bubblegum border-y-2 border-ink py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-display font-800 text-5xl text-white text-center mb-12">we stan 💅</h2>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { icon: "🌿", title: "cruelty-free", desc: "vegan formula, no animal testing. ever." },
              { icon: "♻️", title: "plastic neutral", desc: "we offset all plastic in every order." },
              { icon: "💰", title: "actually affordable", desc: "salon quality shouldn't cost salon prices." },
              { icon: "🚀", title: "next-day delivery", desc: "order by 5pm and it's at ur door tomorrow." },
            ].map(v => (
              <div key={v.title} className="bg-white/15 border border-white/30 rounded-2xl p-6 text-center">
                <span className="text-4xl block mb-3">{v.icon}</span>
                <h3 className="font-display font-700 text-white text-lg mb-2">{v.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h2 className="font-display font-800 text-5xl text-ink mb-5">ok but have you seen the nails?</h2>
        <p className="text-mid/60 text-base mb-10">200+ designs, new drops every friday, free shipping over £25.</p>
        <Link href="/shop" className="btn-chunky">shop the drop 💅</Link>
      </div>
    </div>
  );
}
