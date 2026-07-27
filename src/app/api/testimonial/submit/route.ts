import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const webhookUrl = process.env.GOOGLE_SHEETS_TESTIMONIAL_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        { error: "GOOGLE_SHEETS_TESTIMONIAL_WEBHOOK_URL not configured" },
        { status: 500 }
      );
    }

    const payload = {
      submittedAt: new Date().toISOString(),
      name: data.name || "",
      country: data.country || "",
      industry: data.industry || "",
      experience: data.experience || "",
      message: data.message || "",
      rating: data.rating || "",
      consent: data.consent || false,
    };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[testimonial] Google Sheets webhook error:", res.status, body);
      return NextResponse.json(
        { error: `Google Sheets webhook returned ${res.status}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
