import { NextRequest, NextResponse } from "next/server";
import type { TestimonialSubmitRequest, TestimonialSubmitResponse } from "@/types/testimonial";

function parseTestimonialBody(body: unknown): TestimonialSubmitRequest {
  const data = body as Record<string, unknown>;
  return {
    name: (data?.name as string) || "",
    country: (data?.country as string) || "",
    industry: (data?.industry as string) || "",
    experience: (data?.experience as string) || "",
    message: (data?.message as string) || "",
    rating: (data?.rating as number) || 0,
    consent: (data?.consent as boolean) || false,
  };
}

export async function POST(request: NextRequest): Promise<NextResponse<TestimonialSubmitResponse>> {
  try {
    const data = parseTestimonialBody(await request.json());

    const webhookUrl = process.env.GOOGLE_SHEETS_TESTIMONIAL_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        { error: "GOOGLE_SHEETS_TESTIMONIAL_WEBHOOK_URL not configured" },
        { status: 500 }
      );
    }

    const payload = {
      submittedAt: new Date().toISOString(),
      ...data,
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
