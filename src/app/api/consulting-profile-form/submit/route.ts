import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const webhookUrl = process.env.GOOGLE_SHEETS_CONSULTING_FORM_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        { error: "GOOGLE_SHEETS_CONSULTING_FORM_WEBHOOK_URL not configured" },
        { status: 500 }
      );
    }

    const payload = {
      submittedAt: new Date().toISOString(),
      fullName: data.full_name || "",
      preferredName: data.preferred_name || "",
      email: data.email || "",
      country: data.country || "",
      timezone: data.timezone || "",
      linkedin: data.linkedin || "",
      currentRole: data.current_role || "",
      yearsExperience: data.years_experience || "",
      industry: data.industry || "",
      adviceAreas: data.advice_areas || "",
      greatestStrength: data.greatest_strength || "",
      coreProblem: data.core_problem || "",
      proudestWork: data.proudest_work || "",
      orgTypes: data.org_types || "",
      whyJoined: data.why_joined || "",
      bestWorkshop: data.best_workshop || "",
      keyQuestion: data.key_question || "",
      aiConfidence: data.ai_confidence || "",
      aiTools: data.ai_tools || "",
      aiTransformative: data.ai_transformative || "",
      businessName: data.business_name || "",
      businessIndustry: data.business_industry || "",
      businessSize: data.business_size || "",
      businessChallenge: data.business_challenge || "",
      businessFriction: data.business_friction || "",
      businessWhy: data.business_why || "",
      sixMonthsVision: data.six_months_vision || "",
      anythingElse: data.anything_else || "",
    };

    console.log("[consulting-form] Calling webhook:", webhookUrl);
    console.log("[consulting-form] Payload keys:", Object.keys(payload).join(", "));

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("[consulting-form] Webhook response status:", res.status);

    // Always log the response body — Apps Script returns 200 even on errors
    const responseBody = await res.text();
    console.log("[consulting-form] Webhook response body:", responseBody);

    if (!res.ok) {
      console.error("[consulting-form] Google Sheets webhook error:", res.status, responseBody);
      return NextResponse.json(
        { error: `Google Sheets webhook returned ${res.status}` },
        { status: 502 }
      );
    }

    // Check if Apps Script returned an error in its body (it returns 200 even on failure)
    try {
      const parsed = JSON.parse(responseBody);
      if (parsed.ok === false) {
        console.error("[consulting-form] Apps Script reported error:", parsed.error);
      }
    } catch {
      // Response wasn't JSON — that's fine
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[consulting-form] Submission error:", message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
