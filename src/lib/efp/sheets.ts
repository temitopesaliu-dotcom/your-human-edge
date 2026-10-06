/**
 * Writes Expert Framework Profile answers to the private Google Sheet through
 * its Apps Script web app (GOOGLE_SHEETS_EFP_WEBHOOK_URL). Never throws: saving
 * answers must not be able to stop someone getting their results.
 */
type SheetAction =
  | { action: 'append'; row: Record<string, string | number | boolean> }
  | { action: 'update'; submission_id: string; fields: Record<string, string | number> }
  | { action: 'purchase'; email: string; purchased_at: string; purchase_amount: number | string; purchase_currency: string };

export async function sendToSheet(payload: SheetAction): Promise<boolean> {
  const url = process.env.GOOGLE_SHEETS_EFP_WEBHOOK_URL;
  if (!url) {
    console.error('[efp-sheet] GOOGLE_SHEETS_EFP_WEBHOOK_URL not set');
    return false;
  }
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload),
      redirect: 'follow',
      signal: AbortSignal.timeout(15_000),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!data?.ok) console.error('[efp-sheet]', payload.action, res.status, data?.error);
    return Boolean(data?.ok);
  } catch (err) {
    console.error('[efp-sheet]', payload.action, err instanceof Error ? err.message : String(err));
    return false;
  }
}
