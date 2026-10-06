/**
 * Adds a quiz taker to the "Expert Framework Profile Quiz V2" group with their
 * first name and the link to their results page. No quiz answers go to
 * MailerLite. Never throws.
 */
export async function addEfpSubscriber(email: string, firstName: string, lastName: string, resultsUrl: string): Promise<boolean> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_EFP_QUIZ_V2_GROUP_ID;
  if (!apiKey || !groupId) {
    console.error('[efp-mailer] MAILERLITE_API_KEY or MAILERLITE_EFP_QUIZ_V2_GROUP_ID not set');
    return false;
  }
  try {
    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ email, fields: { name: firstName, last_name: lastName, efp_results_url: resultsUrl }, groups: [groupId] }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) console.error('[efp-mailer] add failed', res.status, (await res.text()).slice(0, 200));
    return res.ok;
  } catch (err) {
    console.error('[efp-mailer]', err instanceof Error ? err.message : String(err));
    return false;
  }
}

/** Group whose automation emails a "we hit a snag, try again" note. Not a secret, so it has a default. */
const FAILED_GROUP_ID = process.env.MAILERLITE_EFP_FAILED_GROUP_ID || '200592275985663592';

/**
 * Adds someone whose build failed (after the quiet retry) to the "Build failed"
 * group, which sends them an instant try-again email. Never throws.
 */
export async function addEfpFailedSubscriber(email: string, firstName: string, lastName: string): Promise<boolean> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    console.error('[efp-mailer] MAILERLITE_API_KEY not set');
    return false;
  }
  try {
    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ email, fields: { name: firstName, last_name: lastName }, groups: [FAILED_GROUP_ID] }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) console.error('[efp-mailer] failed-group add failed', res.status, (await res.text()).slice(0, 200));
    return res.ok;
  } catch (err) {
    console.error('[efp-mailer]', err instanceof Error ? err.message : String(err));
    return false;
  }
}
