import { NextRequest, NextResponse } from "next/server";
import { addBlueprintAuditApplicantToMailerLite } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        { error: "GOOGLE_SHEETS_WEBHOOK_URL not configured" },
        { status: 500 }
      );
    }

    const payload = {
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      businessName: data.businessName || "",
      website: data.website || "",
      businessType: data.businessType || "",
      industry: data.industry || "",
      teamSize: data.teamSize || "",
      businessDesc: data.businessDesc || "",
      biggestPain: data.biggestPain || "",
      bottleneck: data.bottleneck || "",
      systematize: Array.isArray(data.systematize)
        ? data.systematize.join(", ")
        : "",
      currentTools: data.currentTools || "",
      implementationBudget: data.implementationBudget || "",
      timeline: data.timeline || "",
      howHeard: data.howHeard || "",
      additionalContext: data.additionalContext || "",
      contactPref: data.contactPref || "",
    };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[submit] Google Sheets webhook error:", res.status, body);
      return NextResponse.json(
        { error: `Google Sheets webhook returned ${res.status}` },
        { status: 502 }
      );
    }

    // Add applicant to MailerLite blueprint audit group (non-blocking)
    const name = [data.firstName, data.lastName].filter(Boolean).join(" ");
    addBlueprintAuditApplicantToMailerLite(data.email, name).catch((err) =>
      console.error("[submit] MailerLite blueprint audit add failed:", err instanceof Error ? err.message : err)
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
