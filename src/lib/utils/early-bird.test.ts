import { describe, it, expect } from 'vitest';
import { isEarlyBird, workshopAmount } from './early-bird';

describe('isEarlyBird', () => {
  it('is closed on Saturday morning before 12:00 London', () => {
    expect(isEarlyBird(Date.parse('2026-11-21T11:59:00Z'))).toBe(false); // GMT in November
  });
  it('opens Saturday 12:00 London', () => {
    expect(isEarlyBird(Date.parse('2026-11-21T12:00:00Z'))).toBe(true);
  });
  it('is open on Monday', () => {
    expect(isEarlyBird(Date.parse('2026-11-23T09:00:00Z'))).toBe(true);
  });
  it('closes Tuesday 12:00 London', () => {
    expect(isEarlyBird(Date.parse('2026-11-24T11:59:00Z'))).toBe(true);
    expect(isEarlyBird(Date.parse('2026-11-24T12:00:00Z'))).toBe(false);
  });
  it('follows London summer time', () => {
    // 11:00 UTC on a Saturday in July is 12:00 BST.
    expect(isEarlyBird(Date.parse('2026-07-18T10:59:00Z'))).toBe(false);
    expect(isEarlyBird(Date.parse('2026-07-18T11:00:00Z'))).toBe(true);
  });
});

describe('workshopAmount', () => {
  it('charges the early price inside the window and full price outside', () => {
    expect(workshopAmount('USD', Date.parse('2026-11-22T10:00:00Z'))).toBe(9000);
    expect(workshopAmount('USD', Date.parse('2026-11-25T10:00:00Z'))).toBe(12900);
    expect(workshopAmount('GBP', Date.parse('2026-11-22T10:00:00Z'))).toBe(6900);
    expect(workshopAmount('GBP', Date.parse('2026-11-25T10:00:00Z'))).toBe(9900);
  });
});
