import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/services/rate-limit", () => ({
  rateLimit: vi.fn(),
}));
vi.mock("@/lib/utils/get-client-ip", () => ({
  getClientIp: vi.fn(() => "127.0.0.1"),
}));
vi.mock("@/lib/services/kv", () => ({
  getSubscriber: vi.fn(),
  setSubscriber: vi.fn(),
}));
vi.mock("@/lib/services/mailer", () => ({
  addSubscriberToMailerLite: vi.fn(),
  addFreeResourceSubscriberToMailerLite: vi.fn(),
  addCoachToMailerLite: vi.fn(),
  isMailerLiteBuyer: vi.fn(() => false),
}));

import { rateLimit } from "@/lib/services/rate-limit";
import { getSubscriber, setSubscriber } from "@/lib/services/kv";
import {
  addSubscriberToMailerLite,
  addFreeResourceSubscriberToMailerLite,
  addCoachToMailerLite,
} from "@/lib/services/mailer";
import { POST } from "./route";

function makeRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/subscribe", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

describe("POST /api/subscribe", () => {
  beforeEach(() => {
    vi.mocked(rateLimit).mockResolvedValue(true);
    vi.mocked(getSubscriber).mockResolvedValue(null);
  });

  it("returns 429 when rate limited", async () => {
    vi.mocked(rateLimit).mockResolvedValue(false);

    const res = await POST(makeRequest({ email: "a@b.com" }));

    expect(res.status).toBe(429);
  });

  it("returns 400 for an invalid email", async () => {
    const res = await POST(makeRequest({ email: "not-an-email" }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json).toEqual({ error: "A valid email address is required." });
  });

  it("returns 400 for malformed JSON", async () => {
    const req = new NextRequest("http://localhost/api/subscribe", {
      method: "POST",
      body: "not json",
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("subscribes a new default-role signup and upserts KV", async () => {
    const res = await POST(makeRequest({ email: "New@Example.com", name: "New Person", archetype: "c" }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ success: true, isNew: true });
    expect(addSubscriberToMailerLite).toHaveBeenCalledWith("new@example.com", "New Person", "C", false);
    expect(setSubscriber).toHaveBeenCalledWith(
      "new@example.com",
      expect.objectContaining({ email: "new@example.com", source: "quiz" })
    );
  });

  it("falls back to archetype H when an invalid archetype is supplied", async () => {
    await POST(makeRequest({ email: "a@b.com", archetype: "Z" }));

    expect(addSubscriberToMailerLite).toHaveBeenCalledWith("a@b.com", "", "H", false);
  });

  it("routes coach signups through addCoachToMailerLite", async () => {
    await POST(makeRequest({ email: "coach@b.com", signupType: "coach" }));

    expect(addCoachToMailerLite).toHaveBeenCalledWith("coach@b.com", "", "coach");
  });

  it("routes paths-source company signups through the free-resource group", async () => {
    await POST(makeRequest({ email: "biz@b.com", source: "paths", isCompany: true }));

    expect(addFreeResourceSubscriberToMailerLite).toHaveBeenCalledWith("biz@b.com", "", true, "professional");
  });

  it("preserves the original subscribedAt and source for an existing subscriber", async () => {
    vi.mocked(getSubscriber).mockResolvedValue({
      email: "existing@b.com",
      name: "Existing",
      subscribedAt: 1000,
      source: "b2b-prompt",
    });

    const res = await POST(makeRequest({ email: "existing@b.com", source: "quiz" }));
    const json = await res.json();

    expect(json).toEqual({ success: true, isNew: false });
    expect(setSubscriber).toHaveBeenCalledWith(
      "existing@b.com",
      expect.objectContaining({ subscribedAt: 1000, source: "b2b-prompt" })
    );
  });
});
