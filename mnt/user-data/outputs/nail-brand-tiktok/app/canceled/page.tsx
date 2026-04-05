import Link from "next/link";

export default function CanceledPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6 pt-16">
      <div className="max-w-lg w-full text-center py-20">

        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-champagne/40 border border-champagne flex items-center justify-center mx-auto mb-8">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink/60">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>

        <p className="label-caps text-mid mb-3">Payment Cancelled</p>
        <h1 className="font-display text-5xl text-ink mb-4">
          No Problem
        </h1>
        <p className="text-mid font-light text-lg leading-relaxed mb-10 max-w-sm mx-auto">
          Your order wasn't placed and you haven't been charged.
          Your bag is still saved — head back whenever you're ready.
        </p>

        {/* Reassurance points */}
        <div className="bg-ivory border border-ink/10 p-6 mb-10 text-left space-y-4">
          {[
            { icon: "◎", text: "Your bag items are still saved" },
            { icon: "◈", text: "No payment was taken" },
            { icon: "◉", text: "Free returns on all orders" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-3 text-sm text-mid">
              <span className="text-gold">{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop" className="btn-chunky">
            Return to Shop
          </Link>
          <Link href="/" className="btn-outline-chunky">
            Back to Home
          </Link>
        </div>

        <p className="text-xs text-mid/40 mt-10">
          Need help?{" "}
          <a href="mailto:hello@nailz.club" className="underline hover:text-ink transition-colors">
            Contact us
          </a>
        </p>
      </div>
    </div>
  );
}
