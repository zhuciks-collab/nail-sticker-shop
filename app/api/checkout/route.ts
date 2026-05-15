import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getProductBySlug } from "@/backend/queries.products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

interface CartItemPayload {
  productId: string; // slug, e.g. "midnight-marble"
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const body: { items: CartItemPayload[] } = await req.json();

    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Build Stripe line items using server-side Sanity data — never trust client prices
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const { productId, quantity } of body.items) {
      // productId is the slug
      const product = await getProductBySlug(productId);

      if (!product) {
        return NextResponse.json(
          { error: `Unknown product: ${productId}` },
          { status: 400 }
        );
      }

      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
        return NextResponse.json(
          { error: `Invalid quantity for ${product.name}` },
          { status: 400 }
        );
      }

      line_items.push({
        quantity,
        price_data: {
          currency: "gbp",
          unit_amount: Math.round(product.price * 100), // convert £ to pence
          product_data: {
            name: product.name,
            description: product.description ?? undefined,
            ...(product.image ? { images: [product.image] } : {}),
            metadata: { productId: product.id },
          },
        },
      });
    }

    const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_BASE_URL;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      currency: "gbp",
      shipping_address_collection: { allowed_countries: ["GB"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "gbp" },
            display_name: "Standard Delivery",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 2 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 499, currency: "gbp" },
            display_name: "Next-Day Delivery",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 1 },
              maximum: { unit: "business_day", value: 1 },
            },
          },
        },
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/canceled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
