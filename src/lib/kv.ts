// Vercel KV (Redis) data layer
// Replaces Netlify Blobs — same three logical stores:
//   validated-sessions  → kv key: "session:{stripeSessionId}"
//   email-sequences     → kv key: "seq:{base64Email}"
//   analytics-events    → kv key: "evt:{timestamp}-{random}"

import { kv } from '@vercel/kv';

// ── Session records (validated Stripe purchases) ──────────────
export interface SessionRecord {
  createdAt: number;
  visitCount: number;
  lastVisit: number | null;
  firstIP: string;
  lastIP: string;
  email: string;
  name: string;
  archetype: string;
  paid: boolean;
  webhookSource?: boolean;
}

export async function getSession(sessionId: string): Promise<SessionRecord | null> {
  try {
    return await kv.get<SessionRecord>(`session:${sessionId}`);
  } catch { return null; }
}

export async function setSession(sessionId: string, data: SessionRecord): Promise<void> {
  await kv.set(`session:${sessionId}`, data);
}

// ── Email sequence records ────────────────────────────────────
export interface SequenceRecord {
  email: string;
  name: string;
  archetype: string;
  signupAt: number;
  emailsSent: number;
  lastSentAt: number;
  active: boolean;
}

function seqKey(email: string): string {
  return `seq:${Buffer.from(email).toString('base64').replace(/=/g, '')}`;
}

export async function getSequenceRecord(email: string): Promise<SequenceRecord | null> {
  try {
    return await kv.get<SequenceRecord>(seqKey(email));
  } catch { return null; }
}

export async function setSequenceRecord(email: string, data: SequenceRecord): Promise<void> {
  await kv.set(seqKey(email), data);
}

export async function listActiveSequences(limit = 50): Promise<SequenceRecord[]> {
  // Scan keys with seq: prefix
  const keys = await kv.keys('seq:*');
  const records: SequenceRecord[] = [];
  for (const key of keys.slice(0, limit)) {
    try {
      const r = await kv.get<SequenceRecord>(key);
      if (r && r.active) records.push(r);
    } catch { /* skip */ }
  }
  return records;
}

// ── Analytics events ──────────────────────────────────────────
export async function writeAnalyticsEvent(payload: Record<string, unknown>): Promise<void> {
  const key = `evt:${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  await kv.set(key, payload, { ex: 60 * 60 * 24 * 90 }); // 90-day TTL
}
