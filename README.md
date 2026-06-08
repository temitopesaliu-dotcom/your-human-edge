# Your Human Edge — Next.js on Vercel

Full-stack AI archetype quiz funnel. Next.js App Router on Vercel with Stripe, MailerLite, and Vercel KV.

## KPI Status

| # | KPI | Status |
|---|---|---|
| 1 | URL changes per page for analytics | ✅ `/`, `/gate`, `/results/[slug]`, `/playbook` |
| 2 | Concise result + paywalled CTA | ✅ Free profile + $5.99 paywall block |
| 3 | 4 Stripe flows → correct playbook | ✅ archetype from Stripe session (not URL) |
| 4 | Emails in All + per-archetype MailerLite groups | ✅ MAILERLITE_GROUP_ALL + H/C/S/G per signup |
| 5 | Email sequences (quiz + buyers) | ✅ MailerLite automations (see below) |
| 6 | Analytics | ✅ Custom events → Vercel KV |
| 7 | 50 AI Career Paths page | ✅ /paths — all 50 paths public |
| 8 | Community links → resources | ✅ /resources |

## Email: MailerLite only (no app cron)

All drip and post-purchase emails run in **MailerLite automations**. The app only adds subscribers to groups via API.

### Quiz takers (non-buyers) — Days 1–5 sales sequence

1. **Trigger:** Subscriber joins `MAILERLITE_GROUP_ALL` (and archetype group) via `/api/subscribe`.
2. **Automation:** “Quiz drip” — triggered on *joins group* → All (or a dedicated drip group).
3. **Emails:** Day 1 immediately, Days 2–5 with ~24h delays. Use fields `{$name}`, `{$ai_archetype}`, CTA to quiz/checkout.
4. **On purchase:** Stripe webhook adds subscriber to **buyers group** and sets `is_buyer`, `access_link`. In MailerLite, add automation rule: *if joins buyers group → exit quiz drip* (or use separate triggers so buyers never enter the sales sequence).

### Paths guide ($19.99) — email delivery

1. **Trigger:** `/api/stripe-webhook` → `addPathsGuideBuyerToMailerLite()` → `MAILERLITE_PATHS_GUIDE_GROUP_ID`.
2. **Automation:** Fires on *joins paths guide group* — send the full step-by-step guide (PDF or email body) immediately.
3. **Post-checkout UX:** User lands on `/guide/success` — confirmation only; content is not on the site.

### Buyers — purchase + ongoing daily emails

1. **Trigger:** `/api/stripe-webhook` → `addBuyerToMailerLite()` → buyers group + fields `access_link`, `pdf_download_link`.
2. **Automation A:** Purchase confirmation (immediate) using `{$fields.access_link}`.
3. **Automation B:** Post-purchase daily sequence (your choice of length) — triggered on *joins buyers group*. This replaces the old Resend cron; buyers **keep** receiving emails after purchase.

### Community waitlist

- `/api/waitlist` → `MAILERLITE_WAITLIST_GROUP_ID` (optional env).

### Env vars (email-related)

- `MAILERLITE_API_KEY`
- `MAILERLITE_GROUP_ALL`, `MAILERLITE_GROUP_H`, `C`, `S`, `G`
- `MAILERLITE_BUYERS_GROUP_ID` (archetype playbook buyers)
- `MAILERLITE_PATHS_GUIDE_GROUP_ID` ($19.99 guide — automation emails the PDF/guide)
- `MAILERLITE_WAITLIST_GROUP_ID` (optional)

Resend is **not** required unless you add it back for transactional mail outside MailerLite.

## Deploy Steps

### 1–3. GitHub, Vercel import, KV store

Same as before — connect Vercel KV to the project.

### 4. Environment variables

Required minimum:

- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_ID` (archetype playbook)
- `STRIPE_PATHS_GUIDE_PRICE_ID` ($19.99 step-by-step guide from `/paths`)
- `MAILERLITE_API_KEY` + group IDs above
- `NEXT_PUBLIC_SITE_URL` (e.g. `https://temitopesaliu.com`)
- KV vars (auto from Vercel Storage)

### 5–8. Deploy, Stripe webhook, MailerLite groups

Stripe webhook URL: `https://your-domain.com/api/stripe-webhook`
Event: `checkout.session.completed`

Create MailerLite groups and automations as described in **Email: MailerLite only**.

## Post-Deploy Checklist

- [ ] Stripe test purchase end-to-end
- [ ] MailerLite Day 1 fires on quiz signup
- [ ] MailerLite purchase email + buyer daily sequence fire on purchase
- [ ] Access link opens `/playbook?session_id=...` (sets cookie for return visits)
- [ ] `/playbook` without valid session → `/access-denied`
- [ ] `/paths` loads all 50 paths (public)
- [ ] Quiz drip stops (or switches) when buyer joins buyers group in MailerLite

## Local Development

```bash
npm install
npx vercel link && npx vercel env pull
npm run dev
```

Use `NEXT_PUBLIC_SITE_URL=http://localhost:3000` and Stripe test keys.

## Structure

```
src/app/
  quiz/, gate/, results/[slug]/   Funnel pages (server metadata + client UI)
  playbook/page.tsx              Server-gated playbook (no client bundle leak)
  paths/page.tsx                 50 AI paths (public)
  guide/page.tsx                 $19.99 paths guide checkout
  guide/success/page.tsx         Post-purchase confirmation (guide sent by email)
  api/subscribe/                 MailerLite quiz signup
  api/create-checkout/           Stripe checkout (rate-limited)
  api/stripe-webhook/            KV session + MailerLite buyer
  api/validate-session/          Access check + cookie
  api/track/                     Analytics
src/lib/
  playbook-access.ts             Shared Stripe/KV access validation
  archetypes.ts, playbook-document.ts, kv.ts, mailer.ts
```

## Access model

- Playbook content is rendered **on the server** after validating the Stripe session.
- Paid archetype comes from **Stripe metadata**, not the `arch` query param.
- `yhe_access` HttpOnly cookie (90 days) avoids relying on IP or `session_id` in every URL.
