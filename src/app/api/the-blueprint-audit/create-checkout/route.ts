import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { resolveSiteUrl } from "@/lib/resolve-site-url";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (!(await rateLimit(ip, 10, 60, "blueprint-checkout"))) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  try {
    const body = await req.json();
    const email = (body.email || "").trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "A valid email is required." },
        { status: 400 }
      );
    }

    const priceId = process.env.STRIPE_BLUEPRINT_AUDIT_PRICE_ID;
    if (!priceId) {
      return NextResponse.json(
        { error: "STRIPE_BLUEPRINT_AUDIT_PRICE_ID is not set." },
        { status: 500 }
      );
    }

    const siteUrl = resolveSiteUrl(req);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      metadata: {
        product: "blueprint-audit",
        source: "blueprint-audit-apply",
      },
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/the-blueprint-audit/apply/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/the-blueprint-audit/apply`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[blueprint-audit/create-checkout] Stripe error:", message);

    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "production"
            ? "Failed to create checkout session."
            : message,
      },
      { status: 500 }
    );
  }
}
