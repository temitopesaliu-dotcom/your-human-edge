import { kv } from '@vercel/kv';
import type { EfpResultRecord } from './types';

const key = (code: string) => `efp:result:${code}`;
/** Results stay available for a year, long enough for email follow-ups and retakes. */
const TTL_SECONDS = 60 * 60 * 24 * 365;

export async function saveResult(record: EfpResultRecord): Promise<void> {
  await kv.set(key(record.code), record, { ex: TTL_SECONDS });
}

export async function getResult(code: string): Promise<EfpResultRecord | null> {
  if (!/^[a-z0-9]{10,40}$/.test(code)) return null;
  try { return await kv.get<EfpResultRecord>(key(code)); } catch { return null; }
}
