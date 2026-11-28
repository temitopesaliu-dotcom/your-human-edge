import { describe, it, expect } from 'vitest';
import { isEarlyBird, workshopAmount } from './early-bird';

describe('isEarlyBird', () => {
  it('is closed on Saturday before 12:30 London', () => {
    expect(isEarlyBird(Date.parse('2026-11-28T12:29:00Z'))).toBe(false); // GMT in November
  });
  it('opens Saturday 12:30 London', () => {
    expect(isEarlyBird(Date.parse('2026-11-28T12:30:00Z'))).toBe(true);
  });
  it('is open on Sunday', () => {
    expect(isEarlyBird(Date.parse('2026-11-29T09:00:00Z'))).toBe(true);
  });
  it('closes Monday 12:30 London (48 hours)', () => {
    expect(isEarlyBird(Date.parse('2026-11-30T12:29:00Z'))).toBe(true);
    expect(isEarlyBird(Date.parse('2026-11-30T12:30:00Z'))).toBe(false);
  });
  it('is closed on Tuesday', () => {
    expect(isEarlyBird(Date.parse('2026-12-01T10:00:00Z'))).toBe(false);
  });
  it('follows London summer time', () => {
    // 11:30 UTC on a Saturday in July is 12:30 BST.
    expect(isEarlyBird(Date.parse('2026-07-18T11:29:00Z'))).toBe(false);
    expect(isEarlyBird(Date.parse('2026-07-18T11:30:00Z'))).toBe(true);
  });
});

describe('workshopAmount', () => {
  it('charges the early price inside the window and full price outside', () => {
    expect(workshopAmount('USD', Date.parse('2026-11-29T10:00:00Z'))).toBe(9000);
    expect(workshopAmount('USD', Date.parse('2026-12-01T10:00:00Z'))).toBe(12900);
    expect(workshopAmount('GBP', Date.parse('2026-11-29T10:00:00Z'))).toBe(6900);
    expect(workshopAmount('GBP', Date.parse('2026-12-01T10:00:00Z'))).toBe(9900);
  });
});
