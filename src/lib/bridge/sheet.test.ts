import { describe, it, expect } from "vitest";
import { clean, EMAIL_RE } from "./sheet";

describe("bridge sheet helpers", () => {
  it("strips control characters, collapses spaces and caps length", () => {
    expect(clean("  Ada\n\tLovelace  ")).toBe("Ada Lovelace");
    expect(clean("x".repeat(500), 10)).toHaveLength(10);
    expect(clean({ a: 1 })).toBe("");
    expect(clean(42)).toBe("42");
  });
  it("accepts normal emails and rejects broken ones", () => {
    expect(EMAIL_RE.test("ada@example.com")).toBe(true);
    expect(EMAIL_RE.test("ada@example")).toBe(false);
    expect(EMAIL_RE.test("ada example@x.com")).toBe(false);
  });
});
