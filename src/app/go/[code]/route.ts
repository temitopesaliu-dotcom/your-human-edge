import { NextResponse } from "next/server";

// Short tracked links for emails: temitopesaliu.com/go/<code>
// Each code redirects to its page with UTM tags, so clicks can be traced to sales.
const LINKS: Record<string, string> = {
  "e1": "/business-of-expertise-webinar?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-invite&utm_content=invite1-rename",
  "b1": "/offers/?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-bridge2&utm_content=b1-next-year",
  "b2": "/offers/?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-bridge2&utm_content=b2-skills",
  "b3": "/offers/?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-bridge2&utm_content=b3-decisions",
  "b4": "/offers/?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-bridge2&utm_content=b4-one-question",
  "b5": "/offers/?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-bridge2&utm_content=b5",
  "b6": "/offers/?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-bridge2&utm_content=b6",
  "b7": "/offers/?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-bridge2&utm_content=b7",
  "b8": "/offers/?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-bridge2&utm_content=b8",
  "a1": "/offers/?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-earlybird&utm_content=a1-sat",
  "a2": "/offers/?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-earlybird&utm_content=a2-sun",
  "a3": "/offers/?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-earlybird&utm_content=a3-mon",
  "a4": "/offers/?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-earlybird&utm_content=a4-tue",
  "m1": "/business-of-expertise-webinar?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-missed&utm_content=m1"
};

// Social links, no code change needed per post: /go/<channel>-<placement>[-<post>]
// e.g. /go/ig-bio, /go/ig-story-14nov, /go/li-post-pricing-video, /go/wa-status
// Each goes to the free webinar page tagged channel / placement / boe / post.
const CHANNELS: Record<string, string> = {
  ig: "ig", li: "linkedin", fb: "facebook", wa: "whatsapp", yt: "youtube",
  tt: "tiktok", th: "threads", x: "x",
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

export function GET(req: Request) {
  const url = new URL(req.url);
  const code = (url.pathname.split("/").pop() || "").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 60);
  const dest = LINKS[code] || socialDest(code) || "/offers/";
  return NextResponse.redirect(new URL(dest, url.origin), 307);
}
