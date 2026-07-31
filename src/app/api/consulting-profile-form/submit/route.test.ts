import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";

const ORIGINAL_ENV = process.env;

function makeRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/consulting-profile-form/submit", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

describe("POST /api/consulting-profile-form/submit", () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV, GOOGLE_SHEETS_CONSULTING_FORM_WEBHOOK_URL: "https://sheets.example/hook" };
    vi.stubGlobal("fetch", vi.fn());
  });

  it("returns 500 when the webhook URL is not configured", async () => {
    process.env = { ...ORIGINAL_ENV };
    delete process.env.GOOGLE_SHEETS_CONSULTING_FORM_WEBHOOK_URL;

    const res = await POST(makeRequest({ full_name: "A" }));
    expect(res.status).toBe(500);
  });

  it("maps snake_case fields to the camelCase sheets payload and forwards it", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 200 }));

    const res = await POST(
      makeRequest({
        full_name: "Ada Lovelace",
        preferred_name: "Ada",
        email: "ada@example.com",
        current_role: "Independent consultant",
        photo_base64: "data:image/jpeg;base64,AAAA",
        marketing_consent: "true",
      })
    );
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ ok: true });

    const [url, init] = vi.mocked(fetch).mock.calls[0];
    expect(url).toBe("https://sheets.example/hook");
    const sentBody = JSON.parse((init as RequestInit).body as string);
    expect(sentBody).toMatchObject({
      fullName: "Ada Lovelace",
      preferredName: "Ada",
      email: "ada@example.com",
      currentRole: "Independent consultant",
      photoBase64: "data:image/jpeg;base64,AAAA",
      marketingConsent: "Yes",
      businessName: "",
    });
    expect(sentBody.submittedAt).toEqual(expect.any(String));
  });

  it("maps a missing marketing_consent to \"No\"", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 200 }));

    await POST(makeRequest({ full_name: "Ada Lovelace" }));

    const [, init] = vi.mocked(fetch).mock.calls[0];
    const sentBody = JSON.parse((init as RequestInit).body as string);
    expect(sentBody.marketingConsent).toBe("No");
  });

  it("returns 502 when the sheets webhook responds with a non-2xx status", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response("boom", { status: 500 }));

    const res = await POST(makeRequest({ full_name: "A" }));
    const json = await res.json();

    expect(res.status).toBe(502);
    expect(json).toEqual({ error: "Google Sheets webhook returned 500" });
  });

  it("returns 500 when the request body is malformed", async () => {
    const req = new NextRequest("http://localhost/api/consulting-profile-form/submit", {
      method: "POST",
      body: "not json",
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req);
    expect(res.status).toBe(500);
  });
});
