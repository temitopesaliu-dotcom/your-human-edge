/**
 * One-time script: add all subscribers from each archetype group (H/C/S/G)
 * into their matching funnel drip group so they enter the 5-day sequence.
 *
 * Each archetype gets its own drip group → its own automation → its own emails.
 *
 * Run once:
 *   npx tsx scripts/add-to-funnel-drip.ts
 *
 * Prerequisites:
 *   npm install tsx --save-dev   (if you don't have it)
 *
 * Env vars required (must be in .env.local):
 *   MAILERLITE_API_KEY
 *   MAILERLITE_GROUP_H, _C, _S, _G        (source archetype groups)
 *   MAILERLITE_FUNNEL_DRIP_GROUP_H, _C, _S, _G  (destination drip groups)
 *   MAILERLITE_BUYERS_GROUP_ID             (buyers to exclude)
 */

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const API_KEY = process.env.MAILERLITE_API_KEY!;
const BUYERS_GROUP_ID = process.env.MAILERLITE_BUYERS_GROUP_ID!;

type ArchetypeKey = "H" | "C" | "S" | "G";

const ARCHETYPE_SOURCE_GROUPS: Record<ArchetypeKey, string> = {
  H: process.env.MAILERLITE_GROUP_H!,
  C: process.env.MAILERLITE_GROUP_C!,
  S: process.env.MAILERLITE_GROUP_S!,
  G: process.env.MAILERLITE_GROUP_G!,
};

const ARCHETYPE_DRIP_GROUPS: Record<ArchetypeKey, string> = {
  H: process.env.MAILERLITE_FUNNEL_DRIP_GROUP_H!,
  C: process.env.MAILERLITE_FUNNEL_DRIP_GROUP_C!,
  S: process.env.MAILERLITE_FUNNEL_DRIP_GROUP_S!,
  G: process.env.MAILERLITE_FUNNEL_DRIP_GROUP_G!,
};

// Validate env vars before doing anything
if (!API_KEY) {
  console.error("❌  Missing MAILERLITE_API_KEY in .env.local");
  process.exit(1);
}

const missingDrip = (Object.keys(ARCHETYPE_DRIP_GROUPS) as ArchetypeKey[]).filter(
  (k) => !ARCHETYPE_DRIP_GROUPS[k]
);
if (missingDrip.length > 0) {
  console.error(
    `❌  Missing drip group env vars for archetypes: ${missingDrip.join(", ")}\n` +
    `   Make sure MAILERLITE_FUNNEL_DRIP_GROUP_H/C/S/G are all set in .env.local`
  );
  process.exit(1);
}

const BASE = "https://connect.mailerlite.com/api";

function headers() {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  };
}

/** Fetch all active subscribers from a group, handling cursor-based pagination. */
async function fetchGroupSubscribers(
  groupId: string
): Promise<{ id: string; email: string }[]> {
  const all: { id: string; email: string }[] = [];
  let cursor: string | null = null;

  do {
    const url = new URL(`${BASE}/groups/${groupId}/subscribers`);
    url.searchParams.set("limit", "1000");
    url.searchParams.set("filter[status]", "active");
    if (cursor) url.searchParams.set("cursor", cursor);

    const res = await fetch(url.toString(), { headers: headers() });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to fetch group ${groupId}: ${res.status} ${text}`);
    }

    const data = await res.json();
    for (const sub of data.data ?? []) {
      all.push({ id: sub.id, email: sub.email });
    }

    cursor = data.meta?.next_cursor ?? null;
  } while (cursor);

  return all;
}

/** Fetch all buyer subscriber IDs so we can exclude them. */
async function fetchBuyerIds(): Promise<Set<string>> {
  if (!BUYERS_GROUP_ID) {
    console.log("   No MAILERLITE_BUYERS_GROUP_ID set — skipping buyer exclusion.");
    return new Set();
  }
  const buyers = await fetchGroupSubscribers(BUYERS_GROUP_ID);
  return new Set(buyers.map((b) => b.id));
}

/** Add a single subscriber to a drip group. Returns true on success or already-in-group. */
async function addToDripGroup(subscriberId: string, dripGroupId: string): Promise<boolean> {
  const res = await fetch(
    `${BASE}/subscribers/${subscriberId}/groups/${dripGroupId}`,
    { method: "POST", headers: headers() }
  );
  // 409 = already in group — that's fine, treat as success
  return res.ok || res.status === 409;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function processArchetype(
  archetype: ArchetypeKey,
  buyerIds: Set<string>
): Promise<{ added: number; failed: number }> {
  const sourceGroupId = ARCHETYPE_SOURCE_GROUPS[archetype];
  const dripGroupId = ARCHETYPE_DRIP_GROUPS[archetype];

  if (!sourceGroupId) {
    console.log(`   ⚠️  No source group configured for archetype ${archetype} — skipping.`);
    return { added: 0, failed: 0 };
  }

  console.log(`\n── Archetype ${archetype} ──────────────────────────`);
  console.log(`   Source group:  ${sourceGroupId}`);
  console.log(`   Drip group:    ${dripGroupId}`);

  console.log(`   Fetching subscribers...`);
  const subscribers = await fetchGroupSubscribers(sourceGroupId);
  console.log(`   Found ${subscribers.length} active subscribers.`);

  const eligible = subscribers.filter((s) => !buyerIds.has(s.id));
  const skippedBuyers = subscribers.length - eligible.length;

  if (skippedBuyers > 0) {
    console.log(`   Skipping ${skippedBuyers} buyer(s).`);
  }
  console.log(`   Adding ${eligible.length} eligible subscriber(s) to drip group...`);

  let added = 0;
  let failed = 0;

  for (let i = 0; i < eligible.length; i++) {
    const sub = eligible[i];
    const ok = await addToDripGroup(sub.id, dripGroupId);

    if (ok) {
      added++;
    } else {
      failed++;
      console.error(`   ❌  Failed: ${sub.email}`);
    }

    if ((i + 1) % 25 === 0 || i === eligible.length - 1) {
      console.log(`   Progress: ${i + 1}/${eligible.length}`);
    }

    // ~3 requests/second to stay within MailerLite rate limits
    await sleep(340);
  }

  return { added, failed };
}

async function main() {
  console.log("🚀  Funnel drip bulk-add — per-archetype\n");

  console.log("🛒  Fetching buyers to exclude...");
  const buyerIds = await fetchBuyerIds();
  console.log(`   Found ${buyerIds.size} buyer(s) to skip.`);

  const archetypes: ArchetypeKey[] = ["H", "C", "S", "G"];
  const totals = { added: 0, failed: 0 };

  for (const archetype of archetypes) {
    const result = await processArchetype(archetype, buyerIds);
    totals.added += result.added;
    totals.failed += result.failed;
  }

  console.log(`
✅  All done!
   Total added:  ${totals.added}
   Total failed: ${totals.failed}

   Each subscriber is now in their archetype-specific drip group
   and will receive their first email in ~30 minutes.
  `);
}

main().catch((err) => {
  console.error("💥  Script failed:", err);
  process.exit(1);
});
