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
