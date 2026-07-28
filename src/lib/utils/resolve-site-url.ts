import type { NextRequest } from "next/server";

/**
 * Resolve the public site URL from the request headers,
 * falling back to environment variables and defaults.
 */
export function resolveSiteUrl(req: NextRequest): string {
  const origin = req.headers.get("origin");
  if (origin && !/localhost|127\.0\.0\.1/.test(origin)) return origin;

  const forwardedHost = req.headers.get("x-forwarded-host");
  const forwardedProto = req.headers.get("x-forwarded-proto") || "https";
  if (forwardedHost && !/localhost|127\.0\.0\.1/.test(forwardedHost)) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl && !/localhost|127\.0\.0\.1/.test(envUrl)) return envUrl;

  if (process.env.NODE_ENV === "development") return "http://localhost:3000";
  return "https://temitopesaliu.com";
}
