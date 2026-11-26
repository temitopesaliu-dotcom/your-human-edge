import { NextResponse, after } from "next/server";

// Short tracked links for emails: temitopesaliu.com/go/<code>
// Each code redirects to its page with UTM tags, so clicks can be traced to sales.
const LINKS: Record<string, string> = {
  "e1": "/business-of-expertise-webinar?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-invite&utm_content=invite1-rename",
  "b1": "/the-business-of-expertise-intensive?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-bridge2&utm_content=b1-next-year",
  "b2": "/the-business-of-expertise-intensive?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-bridge2&utm_content=b2-skills",
  "b3": "/the-business-of-expertise-intensive?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-bridge2&utm_content=b3-decisions",
  "b4": "/the-business-of-expertise-intensive?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-bridge2&utm_content=b4-one-question",
  "b5": "/the-business-of-expertise-intensive?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-bridge2&utm_content=b5",
  "b6": "/the-business-of-expertise-intensive?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-bridge2&utm_content=b6",
  "b7": "/the-business-of-expertise-intensive?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-bridge2&utm_content=b7",
  "b8": "/the-business-of-expertise-intensive?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-bridge2&utm_content=b8",
  "a1": "/the-business-of-expertise-intensive?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-earlybird&utm_content=a1-sat",
  "a2": "/the-business-of-expertise-intensive?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-earlybird&utm_content=a2-sun",
  "a3": "/the-business-of-expertise-intensive?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-earlybird&utm_content=a3-mon",
  "a4": "/the-business-of-expertise-intensive?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-earlybird&utm_content=a4-tue",
  "m1": "/business-of-expertise-webinar?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-missed&utm_content=m1"
};

// Social links, no code change needed per post: /go/<channel>-<placement>[-<post>]
// e.g. /go/ig-bio, /go/ig-story-14nov, /go/li-post-pricing-video, /go/wa-status
// Each goes to the free webinar page tagged channel / placement / boe / post.
const CHANNELS: Record<string, string> = {
  ig: "ig", li: "linkedin", fb: "facebook", wa: "whatsapp", yt: "youtube",
  tt: "tiktok", th: "threads", x: "x",
  // Personal emails sent from Temitope's own Gmail: /go/gm-<list>-<recipientId>
  // e.g. /go/gm-alumni-k7m2x. The recipient ID maps to an email in the sheet tab "Gmail recipients".
  gm: "organic-email",
};

function socialDest(code: string): string | null {
  const parts = code.split("-").filter(Boolean);
  const channel = CHANNELS[parts[0] || ""];
  if (!channel) return null;
  const placement = parts[1] || "social";
  const post = parts.slice(2).join("-");
  const q = new URLSearchParams({ utm_source: channel, utm_medium: placement, utm_campaign: "boe" });
  if (post) q.set("utm_content", post);
  return "/business-of-expertise-webinar?" + q.toString();
}

// Logs the click to the sheet tab "Link clicks" after the redirect is sent, so it never slows anyone down.
function logClick(code: string, dest: string, req: Request) {
  const hook = process.env.GOOGLE_SHEETS_BRIDGE_WEBHOOK_URL;
  const secret = process.env.BRIDGE_SHEET_SECRET;
  if (!hook || !secret) return;
  const ua = req.headers.get("user-agent") || "";
  if (/bot|crawler|spider|preview|scanner|safelinks|proofpoint|mimecast|barracuda/i.test(ua)) return;
  const q = new URL(dest, "https://x").searchParams;
  after(async () => {
    try {
      await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          action: "click", secret, code,
          source: q.get("utm_source") || "", medium: q.get("utm_medium") || "",
          campaign: q.get("utm_campaign") || "", content: q.get("utm_content") || "",
          country: req.headers.get("x-vercel-ip-country") || "",
          device: /mobile|android|iphone/i.test(ua) ? "mobile" : "desktop",
        }),
        redirect: "follow",
        signal: AbortSignal.timeout(8000),
      });
    } catch {}
  });
}

export function GET(req: Request) {
  const url = new URL(req.url);
  const code = (url.pathname.split("/").pop() || "").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 60);
  const dest = LINKS[code] || socialDest(code) || "/the-business-of-expertise-intensive";
  logClick(code, dest, req);
  return NextResponse.redirect(new URL(dest, url.origin), 307);
}
