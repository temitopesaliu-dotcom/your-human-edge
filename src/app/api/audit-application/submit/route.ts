import { NextRequest, NextResponse } from "next/server";
import { addBuildAuditApplicantToMailerLite } from "@/lib/services/mailer";
import { rateLimit } from "@/lib/services/rate-limit";
import { getClientIp } from "@/lib/utils/get-client-ip";
import { isValidEmail } from "@/lib/utils/validation";

/**
 * Application form for the $1,000 build audit (the /get-this-built audience).
 *
 * Deliberately separate from /the-blueprint-audit/apply: that funnel takes
 * payment first. This one is application-first — the applicant is reviewed,
 * then sent a payment link if it is a fit. At $1,000 non-refundable, screening
 * before the money changes hands avoids refund disputes and wasted calls.
 *
 * Submissions go to the Apps Script webhook (spreadsheet row + email to
 * ts@temitopesaliu.com) and to MailerLite as a durable backup record.
 */

const FIELDS = [
  "fullName",
  "email",
  "phone",
  "country",
  "businessName",
  "website",
  "whatYouDo",
  "currentOffer",
  "monthlyRevenue",
  "revenueTarget",
  "blocker",
  "whatToBuild",
  "aiExperience",
  "budgetReady",
  "timeline",
  "howHeard",
  "anythingElse",
] as const;

type FieldKey = (typeof FIELDS)[number];
type Payload = Partial<Record<FieldKey, string>>;

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers);
  if (!(await rateLimit(ip, 5, 300, "audit-application"))) {
    return NextResponse.json(
      { error: "Too many submissions. Try again shortly." },
      { status: 429 }
    );
  }

  try {
    const data = (await request.json()) as Payload & { website_hp?: string };

    // Honeypot — bots fill hidden fields, humans do not.
    if (data.website_hp) return NextResponse.json({ ok: true });

    const email = (data.email || "").trim();
    const fullName = (data.fullName || "").trim();

    if (!fullName) {
      return NextResponse.json({ error: "Your name is required." }, { status: 400 });
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    const clean: Record<string, string> = {
      formType: "build-audit-application",
      submittedAt: new Date().toISOString(),
    };
    for (const key of FIELDS) {
      clean[key] = String(data[key] ?? "").trim().slice(0, 2000);
    }

    // Dedicated Apps Script (scripts/apps-script/build-audit-application.gs):
    // writes a sheet row and emails ts@temitopesaliu.com with reply-to set to
    // the applicant. Do NOT fall back to GOOGLE_SHEETS_WEBHOOK_URL — that
    // script belongs to a different form and expects a different payload.
    const webhookUrl = process.env.AUDIT_APPLICATION_WEBHOOK_URL;
    let webhookOk = false;

    if (webhookUrl) {
      try {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(clean),
        });
        webhookOk = res.ok;
        if (!res.ok) {
          console.error(
            "[audit-application] webhook returned",
            res.status,
            (await res.text()).slice(0, 300)
          );
        }
      } catch (err) {
        console.error(
          "[audit-application] webhook threw:",
          err instanceof Error ? err.message : err
        );
      }
    } else {
      console.error("[audit-application] AUDIT_APPLICATION_WEBHOOK_URL not set");
    }

    // Durable backup: even if the webhook is down, the lead is captured.
    let mailerOk = false;
    try {
      await addBuildAuditApplicantToMailerLite(email, fullName, clean);
      mailerOk = true;
    } catch (err) {
      console.error(
        "[audit-application] MailerLite add failed:",
        err instanceof Error ? err.message : err
      );
    }

    if (!webhookOk && !mailerOk) {
      // Nothing persisted anywhere — do not tell the applicant it worked.
      console.error("[audit-application] LOST SUBMISSION:", JSON.stringify(clean));
      return NextResponse.json(
        { error: "We could not save your application. Please email ts@temitopesaliu.com directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(
      "[audit-application] unexpected error:",
      err instanceof Error ? err.message : err
    );
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
