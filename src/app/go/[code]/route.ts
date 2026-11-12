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
  "b8": "/offers/?utm_source=mailerlite&utm_medium=email&utm_campaign=boe-bridge2&utm_content=b8"
};

export function GET(req: Request) {
  const url = new URL(req.url);
  const code = (url.pathname.split("/").pop() || "").toLowerCase();
  const dest = LINKS[code] || "/offers/";
  return NextResponse.redirect(new URL(dest, url.origin), 307);
}
