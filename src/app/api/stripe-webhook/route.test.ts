import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const { constructEvent } = vi.hoisted(() => ({ constructEvent: vi.fn() }));

vi.mock("@/lib/services/stripe", () => ({
  stripe: { webhooks: { constructEvent } },
}));
vi.mock("@/lib/services/kv", () => ({
  getSession: vi.fn(() => null),
  setSession: vi.fn(),
}));
vi.mock("@/lib/services/mailer", () => ({
  addBuyerToMailerLite: vi.fn(),
  addStadiumBuyerToMailerLite: vi.fn(),
  addIntelligenceLayerPaidSubscriber: vi.fn(),
  addBusinessArchitectBuyerToMailerLite: vi.fn(),
  addIntelligenceLayerCourseBuyerToMailerLite: vi.fn(),
  addBlueprintAuditPriorityBuyerToMailerLite: vi.fn(),
}));

import { getSession, setSession } from "@/lib/services/kv";
import {
  addBuyerToMailerLite,
  addStadiumBuyerToMailerLite,
  addIntelligenceLayerPaidSubscriber,
  addBusinessArchitectBuyerToMailerLite,
  addIntelligenceLayerCourseBuyerToMailerLite,
  addBlueprintAuditPriorityBuyerToMailerLite,
} from "@/lib/services/mailer";
import { POST } from "./route";

const ORIGINAL_ENV = process.env;

function makeRequest(body = "{}", signature: string | null = "sig_test"): NextRequest {
  const headers: Record<string, string> = {};
  if (signature) headers["stripe-signature"] = signature;
  return new NextRequest("http://localhost/api/stripe-webhook", {
    method: "POST",
    body,
    headers,
  });
}

function checkoutCompletedEvent(overrides: Partial<{
  payment_status: string;
  customer_email: string | null;
  customer_details: { email?: string | null; name?: string | null } | null;
  metadata: Record<string, string>;
  success_url: string;
  id: string;
}> = {}) {
  return {
    type: "checkout.session.completed",
    data: {
      object: {
        id: "cs_test_123",
        payment_status: "paid",
        customer_email: "buyer@example.com",
        customer_details: { email: "buyer@example.com", name: "Buyer Name" },
        metadata: {},
        success_url: "https://example.com/success",
        ...overrides,
      },
    },
  };
}

describe("POST /api/stripe-webhook", () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV, STRIPE_WEBHOOK_SECRET: "whsec_test" };
    constructEvent.mockReset();
    vi.mocked(getSession).mockResolvedValue(null);
    vi.mocked(setSession).mockClear();
    vi.mocked(addBuyerToMailerLite).mockClear();
    vi.mocked(addStadiumBuyerToMailerLite).mockClear();
    vi.mocked(addIntelligenceLayerPaidSubscriber).mockClear();
    vi.mocked(addBusinessArchitectBuyerToMailerLite).mockClear();
    vi.mocked(addIntelligenceLayerCourseBuyerToMailerLite).mockClear();
  });

  it("returns 400 when the stripe-signature header is missing", async () => {
    const res = await POST(makeRequest("{}", null));
    expect(res.status).toBe(400);
  });

  it("returns 500 when STRIPE_WEBHOOK_SECRET is not configured", async () => {
    process.env = { ...ORIGINAL_ENV };
    delete process.env.STRIPE_WEBHOOK_SECRET;

    const res = await POST(makeRequest());
    expect(res.status).toBe(500);
  });

  it("returns 400 when signature verification fails", async () => {
    constructEvent.mockImplementation(() => {
      throw new Error("bad signature");
    });

    const res = await POST(makeRequest());
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json).toEqual({ error: "bad signature" });
  });

  it("ignores non-checkout.session.completed events", async () => {
    constructEvent.mockReturnValue({ type: "payment_intent.succeeded", data: { object: {} } });

    const res = await POST(makeRequest());

    expect(res.status).toBe(200);
    expect(setSession).not.toHaveBeenCalled();
  });

  it("ignores unpaid sessions", async () => {
    constructEvent.mockReturnValue(checkoutCompletedEvent({ payment_status: "unpaid" }));

    await POST(makeRequest());

    expect(setSession).not.toHaveBeenCalled();
    expect(addBuyerToMailerLite).not.toHaveBeenCalled();
  });

  it("records a playbook purchase and adds the buyer to MailerLite", async () => {
    constructEvent.mockReturnValue(
      checkoutCompletedEvent({ metadata: { product: "playbook", archetype: "S" } })
    );

    const res = await POST(makeRequest());
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ received: true });
    expect(setSession).toHaveBeenCalledWith(
      "cs_test_123",
      expect.objectContaining({ email: "buyer@example.com", product: "playbook", archetype: "S", paid: true })
    );
    expect(addBuyerToMailerLite).toHaveBeenCalledWith(
      "buyer@example.com",
      "Buyer Name",
      "S",
      expect.stringContaining("cs_test_123"),
      expect.stringContaining("cs_test_123")
    );
    // The PDF link must be the payment-checked route. It was previously a
    // public Google Drive URL that worked for anyone it was forwarded to.
    const pdfLink = vi.mocked(addBuyerToMailerLite).mock.calls[0][4];
    expect(pdfLink).toContain("/api/playbook/pdf");
    expect(pdfLink).not.toContain("drive.google.com");
  });

  it("does not duplicate the KV session record when one already exists", async () => {
    vi.mocked(getSession).mockResolvedValue({
      createdAt: 1,
      visitCount: 1,
      lastVisit: null,
      firstIP: "",
      lastIP: "",
      email: "buyer@example.com",
      name: "Buyer Name",
      archetype: "H",
      paid: true,
    });
    constructEvent.mockReturnValue(checkoutCompletedEvent({ metadata: { product: "playbook" } }));

    await POST(makeRequest());

    expect(setSession).not.toHaveBeenCalled();
  });

  it("routes stadium-live purchases to the stadium mailer with the live-class tag", async () => {
    constructEvent.mockReturnValue(checkoutCompletedEvent({ metadata: { product: "stadium-live" } }));

    await POST(makeRequest());

    expect(addStadiumBuyerToMailerLite).toHaveBeenCalledWith("buyer@example.com", "Buyer Name", "live-class");
  });

  it("routes bap-accelerator purchases with the accelerator tier", async () => {
    constructEvent.mockReturnValue(checkoutCompletedEvent({ metadata: { product: "bap-accelerator" } }));

    await POST(makeRequest());

    expect(addBusinessArchitectBuyerToMailerLite).toHaveBeenCalledWith(
      "buyer@example.com",
      "Buyer Name",
      "accelerator"
    );
  });

  it("routes intelligence-layer-workshop purchases to the paid subscriber mailer", async () => {
    constructEvent.mockReturnValue(
      checkoutCompletedEvent({ metadata: { product: "intelligence-layer-workshop" } })
    );

    await POST(makeRequest());

    expect(addIntelligenceLayerPaidSubscriber).toHaveBeenCalledWith("buyer@example.com", "Buyer Name");
  });

  it("routes intelligence-layer-course purchases to the course buyer mailer with the access link", async () => {
    constructEvent.mockReturnValue(
      checkoutCompletedEvent({ metadata: { product: "intelligence-layer-course" } })
    );

    await POST(makeRequest());

    expect(addIntelligenceLayerCourseBuyerToMailerLite).toHaveBeenCalledWith(
      "buyer@example.com",
      "Buyer Name",
      expect.stringContaining("/expert-framework/access?session_id=cs_test_123")
    );
  });

  it("falls back to the success_url arch param when metadata has no archetype", async () => {
    constructEvent.mockReturnValue(
      checkoutCompletedEvent({
        metadata: { product: "playbook" },
        success_url: "https://example.com/success?arch=g",
      })
    );

    await POST(makeRequest());

    expect(setSession).toHaveBeenCalledWith("cs_test_123", expect.objectContaining({ archetype: "G" }));
  });

  it("defaults to archetype H when neither metadata nor success_url provide one", async () => {
    constructEvent.mockReturnValue(
      checkoutCompletedEvent({ metadata: { product: "playbook" }, success_url: "not a url" })
    );

    await POST(makeRequest());

    expect(setSession).toHaveBeenCalledWith("cs_test_123", expect.objectContaining({ archetype: "H" }));
  });

  it("skips MailerLite calls when there is no buyer email", async () => {
    constructEvent.mockReturnValue(
      checkoutCompletedEvent({
        metadata: { product: "playbook" },
        customer_email: null,
        customer_details: null,
      })
    );

    await POST(makeRequest());

    expect(addBuyerToMailerLite).not.toHaveBeenCalled();
  });

  describe("second Stripe account (Glide)", () => {
    function signedOnlyByGlide(event: unknown) {
      constructEvent.mockImplementation((_body: string, _sig: string, secret: string) => {
        if (secret === "whsec_glide") return event;
        throw new Error("bad signature");
      });
    }

    beforeEach(() => {
      process.env = { ...ORIGINAL_ENV, STRIPE_WEBHOOK_SECRET: "whsec_test", STRIPE_WEBHOOK_SECRET_GLIDE: "whsec_glide" };
      vi.mocked(addBlueprintAuditPriorityBuyerToMailerLite).mockClear();
    });

    it("fulfils blueprint-audit sessions signed by the Glide secret", async () => {
      signedOnlyByGlide(checkoutCompletedEvent({ metadata: { product: "blueprint-audit" } }));
      const res = await POST(makeRequest());
      expect(res.status).toBe(200);
      expect(addBlueprintAuditPriorityBuyerToMailerLite).toHaveBeenCalledTimes(1);
    });

    it("ignores untagged Glide sessions so they never fall through to playbook", async () => {
      signedOnlyByGlide(checkoutCompletedEvent({ metadata: {} }));
      const res = await POST(makeRequest());
      expect(res.status).toBe(200);
      expect(addBuyerToMailerLite).not.toHaveBeenCalled();
      expect(setSession).not.toHaveBeenCalled();
    });

    it("still rejects a signature neither secret accepts", async () => {
      constructEvent.mockImplementation(() => { throw new Error("bad signature"); });
      const res = await POST(makeRequest());
      expect(res.status).toBe(400);
    });
  });

  describe("blueprint buyer emails via Apps Script", () => {
    it("posts strategy-session buyers to the sheet webhook", async () => {
      process.env = { ...ORIGINAL_ENV, STRIPE_WEBHOOK_SECRET: "whsec_test", GOOGLE_SHEETS_WEBHOOK_URL: "https://script.example/exec" };
      const fetchMock = vi.fn<(url: string, init?: RequestInit) => Promise<Response>>(async () => new Response("{}", { status: 200 }));
      vi.stubGlobal("fetch", fetchMock);
      constructEvent.mockReturnValue(checkoutCompletedEvent({ metadata: { product: "blueprint-audit", tier: "founder" } }));
      await POST(makeRequest());
      const call = fetchMock.mock.calls.find((c) => String(c[0]) === "https://script.example/exec");
      expect(call).toBeTruthy();
      const body = JSON.parse(String((call as unknown as [string, RequestInit])[1].body));
      expect(body).toMatchObject({ action: "blueprint_buyer", email: "buyer@example.com", tier: "founder", sessionId: "cs_test_123" });
      vi.unstubAllGlobals();
    });

    it("does not post other products", async () => {
      process.env = { ...ORIGINAL_ENV, STRIPE_WEBHOOK_SECRET: "whsec_test", GOOGLE_SHEETS_WEBHOOK_URL: "https://script.example/exec" };
      const fetchMock = vi.fn<(url: string, init?: RequestInit) => Promise<Response>>(async () => new Response("{}", { status: 200 }));
      vi.stubGlobal("fetch", fetchMock);
      constructEvent.mockReturnValue(checkoutCompletedEvent({ metadata: { product: "playbook" } }));
      await POST(makeRequest());
      expect(fetchMock.mock.calls.some((c) => String(c[0]) === "https://script.example/exec")).toBe(false);
      vi.unstubAllGlobals();
    });
  });
});
