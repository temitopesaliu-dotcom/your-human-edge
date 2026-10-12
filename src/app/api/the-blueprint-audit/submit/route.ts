import { NextRequest, NextResponse } from "next/server";
import { addBlueprintAuditApplicantToMailerLite } from "@/lib/services/mailer";
import { rateLimit } from "@/lib/services/rate-limit";
import { getClientIp } from "@/lib/utils/get-client-ip";
import { isValidEmail } from "@/lib/utils/validation";
import type { BlueprintQuizRequest, BlueprintQuizResponse } from "@/types/blueprint-apply";

/**
 * Blueprint Audit quiz (/the-blueprint-audit/apply). Every completed quiz,
 * paid or not, is sent to the Apps Script webhook, which writes one row per
 * person to the "Blueprint Audit Applications" sheet and emails Temitope the
 * full set of answers. Column order lives in
 * scripts/apps-script/blueprint-audit-application.gs.
 */

const FIELDS = [
  "route", "bestFit", "firstName", "email", "companyName", "website", "businessDesc",
  "teamSize", "revenue", "automate", "tools", "dataLives", "dataOwner", "timeGoes",
  "manualHours", "lookingFor", "investment", "techLevel", "security", "matters",
  "timeline", "decider", "whoDoesWhat", "breaksDown", "anythingElse",
] as const;

export async function POST(request: NextRequest): Promise<NextResponse<BlueprintQuizResponse>> {
  const ip = getClientIp(request.headers);
  if (!(await rateLimit(ip, 10, 60, "blueprint-quiz"))) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  let data: BlueprintQuizRequest;
  try {
    data = (await request.json()) as BlueprintQuizRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = String(data.email || "").trim();
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  const payload: Record<string, string> = {};
  for (const key of FIELDS) payload[key] = String(data[key] ?? "").slice(0, 4000);
  payload.email = email;

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[blueprint-quiz] GOOGLE_SHEETS_WEBHOOK_URL not configured");
    return NextResponse.json({ error: "Not configured." }, { status: 500 });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    // Apps Script returns 200 even when the script fails; the body says so.
    const body = await res.text();
    if (!res.ok) {
      console.error("[blueprint-quiz] Sheets webhook error:", res.status, body.substring(0, 300));
      return NextResponse.json({ error: "Could not save your answers." }, { status: 502 });
    }
    if (body.includes('"ok":false')) {
      console.error("[blueprint-quiz] Sheets webhook reported failure:", body.substring(0, 300));
    }
  } catch (err) {
    console.error("[blueprint-quiz] Sheets webhook threw:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not save your answers." }, { status: 502 });
  }

  addBlueprintAuditApplicantToMailerLite(email, payload.firstName, payload.route).catch((err) =>
    console.error("[blueprint-quiz] MailerLite add failed:", err instanceof Error ? err.message : err)
  );

  return NextResponse.json({ ok: true });
}
