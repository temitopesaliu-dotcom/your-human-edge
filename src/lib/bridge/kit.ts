/**
 * Adds a free-training sign-up to Kit (email list) so it gets the broadcast emails.
 * Needs KIT_API_KEY (Kit > Settings > Developer > API keys). Without it this does
 * nothing, so sign-ups never fail because of email-list problems.
 */
const KIT_API = 'https://api.kit.com/v4';

export async function addToKit(email: string, firstName: string): Promise<boolean> {
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
    return res.ok;
  } catch (err) {
    console.error('[kit] subscribe error:', err instanceof Error ? err.message : String(err));
    return false;
  }
}
