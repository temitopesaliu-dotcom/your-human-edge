/**
 * Adds a free-training sign-up to Kit (email list) so it gets the broadcast emails.
 * Needs KIT_API_KEY (Kit > Settings > Developer > API keys). Without it this does
 * nothing, so sign-ups never fail because of email-list problems.
 */
const KIT_API = 'https://api.kit.com/v4';

export async function addToKit(email: string, firstName: string, tagId?: number): Promise<boolean> {
  const key = process.env.KIT_API_KEY;
  if (!key) return false;
  try {
    const res = await fetch(`${KIT_API}/subscribers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Kit-Api-Key': key },
      body: JSON.stringify({ email_address: email, first_name: firstName }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) console.error('[kit] subscribe failed', res.status);
    if (res.ok && tagId) await tagKitSubscriber(email, tagId, key);
    return res.ok;
  } catch (err) {
    console.error('[kit] subscribe error:', err instanceof Error ? err.message : String(err));
    return false;
  }
}


// Kit tag applied to everyone who registers for the free Bridge training, so the
// daily awareness emails can leave them out. Tag: "Bridge Training - Registered".
export const BRIDGE_REGISTERED_TAG_ID = 25336261;

async function tagKitSubscriber(email: string, tagId: number, key: string): Promise<boolean> {
  try {
    const res = await fetch(`${KIT_API}/tags/${tagId}/subscribers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Kit-Api-Key': key },
      body: JSON.stringify({ email_address: email }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) console.error('[kit] tag failed', res.status);
    return res.ok;
  } catch (err) {
    console.error('[kit] tag error:', err instanceof Error ? err.message : String(err));
    return false;
  }
}
