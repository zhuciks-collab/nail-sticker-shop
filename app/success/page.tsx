import Link from "next/link";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

interface Props {
  searchParams: { session_id?: string };
}

async function getSession(sessionId: string) {
  try {
    return await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
  } catch {
    return null;
  }
}

export default async function SuccessPage({ searchParams }: Props) {
  const session = searchParams.session_id
    ? await getSession(searchParams.session_id)
    : null;

  const customerEmail = session?.customer_details?.email;
  const orderTotal = session?.amount_total
    ? `£${(session.amount_total / 100).toFixed(2)}`
    : null;
  const orderId = session?.id?.slice(-8).toUpperCase();

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6 pt-16">
      <div className="max-w-lg w-full text-center py-20">

        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-mint/30 border border-mint flex items-center justify-center mx-auto mb-8">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <p className="label-caps text-mid mb-3">Order Confirmed</p>
        <h1 className="font-display text-5xl text-ink mb-4">
          Thank You
        </h1>
        <p className="text-mid font-light text-lg leading-relaxed mb-8 max-w-sm mx-auto">
          Your order has been placed. You'll receive a confirmation email shortly.
        </p>

        {/* Order summary card */}
        <div className="bg-ivory border border-ink/10 rounded-sm p-6 mb-10 text-left space-y-4">
          {orderId && (
            <div className="flex items-center justify-between text-sm">
              <span className="label-caps">Order Reference</span>
              <span className="font-medium text-ink tracking-widest">#{orderId}</span>
            </div>
          )}
          {customerEmail && (
            <div className="flex items-center justify-between text-sm">
              <span className="label-caps">Confirmation sent to</span>
              <span className="font-medium text-ink">{customerEmail}</span>
            </div>
          )}
          {orderTotal && (
            <div className="flex items-center justify-between text-sm border-t border-ink/8 pt-4">
              <span className="label-caps">Total Charged</span>
              <span className="font-display text-xl text-ink">{orderTotal}</span>
            </div>
          )}
        </div>

        {/* Delivery timeline */}
        <div className="flex items-start gap-0 mb-10 border border-ink/10 divide-x divide-ink/10">
          {[
            { step: "1", label: "Order Placed", note: "Just now" },
            { step: "2", label: "Processing", note: "Today" },
            { step: "3", label: "Dispatched", note: "1–2 days" },
            { step: "4", label: "Delivered", note: "2–5 days" },
          ].map((s) => (
            <div key={s.step} className="flex-1 p-4 text-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mx-auto mb-2 ${
                s.step === "1" ? "bg-ink text-cream" : "bg-ivory text-mid/40 border border-ink/10"
              }`}>
                {s.step === "1" ? "✓" : s.step}
              </div>
              <p className="text-xs font-medium text-ink leading-tight">{s.label}</p>
              <p className="text-[10px] text-mid/50 mt-0.5">{s.note}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop" className="btn-chunky">
            Continue Shopping
          </Link>
          <Link href="/" className="btn-outline-chunky">
            Back to Home
          </Link>
        </div>

        <p className="text-xs text-mid/40 mt-10">
          Questions? Email us at{" "}
          <a href="mailto:hello@nailz.club" className="underline hover:text-ink transition-colors">
            hello@nailz.club
          </a>
        </p>
      </div>
    </div>
  );
}
