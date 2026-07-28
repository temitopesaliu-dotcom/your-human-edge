import { kv } from '@vercel/kv';
import type { ProductType } from '../utils/products';

export interface SessionRecord {
  createdAt: number;
  visitCount: number;
  lastVisit: number | null;
  firstIP: string;
  lastIP: string;
  email: string;
  name: string;
  archetype: string;
  /** playbook (quiz), stadium tier, workshop, or Business Architect Programme tier. Omitted on legacy records = playbook. */
  product?: ProductType;
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

export async function writeAnalyticsEvent(payload: Record<string, unknown>): Promise<void> {
  const key = `evt:${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  await kv.set(key, payload, { ex: 60 * 60 * 24 * 90 }); // 90-day TTL
}

/**
 * Write multiple analytics events in a single pipeline.
 * Dramatically reduces KV round-trips when events are batched client-side.
 */
export async function writeAnalyticsEventsBatch(
  records: Record<string, unknown>[],
): Promise<void> {
  if (records.length === 0) return;
  const pipeline = kv.pipeline();
  const now = Date.now();
  for (const record of records) {
    const key = `evt:${now}-${Math.random().toString(36).slice(2, 8)}`;
    pipeline.set(key, record, { ex: 60 * 60 * 24 * 90 });
  }
  await pipeline.exec();
}

export interface SubscriberRecord {
  email: string;
  name: string;
  subscribedAt: number;
  /** Where they first subscribed: 'quiz' | 'paths' | etc. */
  source: string;
}

export async function getSubscriber(email: string): Promise<SubscriberRecord | null> {
  try {
    const normalized = email.trim().toLowerCase();
    return await kv.get<SubscriberRecord>(`sub:${normalized}`);
  } catch { return null; }
}

export async function setSubscriber(email: string, data: SubscriberRecord): Promise<void> {
  const normalized = email.trim().toLowerCase();
  await kv.set(`sub:${normalized}`, data);
}
