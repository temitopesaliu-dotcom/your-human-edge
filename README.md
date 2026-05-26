# Your Human Edge — Next.js on Vercel

Full-stack AI archetype quiz funnel. Rebuilt from Netlify static + serverless functions into a production-ready Next.js 14 App Router project.

## KPI Status

| # | KPI | Status |
|---|---|---|
| 1 | URL changes per page for analytics | ✅ `/`, `/gate`, `/results/[slug]`, `/playbook` |
| 2 | Concise result + paywalled CTA | ✅ Free profile + $5.99 paywall block |
| 3 | 4 Stripe flows → correct playbook | ✅ arch key carried through checkout + success URL |
| 4 | Emails in All + per-archetype MailerLite groups | ✅ MAILERLITE_GROUP_ALL + H/C/S/G per signup |
| 5 | 5-day drip for non-buyers | ✅ Day 1 immediate, Days 2–5 via Vercel Cron |
| 6 | Analytics | ✅ Custom events → Vercel KV |
| 7 | 50 AI Career Paths page | ✅ /paths — all 50 paths, income ranges |
| 8 | Community links → coming-soon | ✅ /coming-soon |

## Deploy Steps

### 1. Push to GitHub
```bash
git init && git add . && git commit -m "initial commit"
gh repo create your-human-edge --private --push
```

### 2. Import to Vercel
Go to vercel.com/new → import the repo. Do NOT deploy yet.

### 3. Create Vercel KV Store
Vercel Dashboard → Storage → Create Database → KV → Connect to Project.
This auto-populates KV_URL, KV_REST_API_URL, KV_REST_API_TOKEN.

### 4. Set Environment Variables
Add everything from .env.example to Project Settings → Environment Variables.

Required minimum:
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- RESEND_API_KEY + EMAIL_FROM
- MAILERLITE_API_KEY + MAILERLITE_GROUP_ALL + MAILERLITE_GROUP_H/C/S/G
- NEXT_PUBLIC_SITE_URL=https://temitopesaliu.com
- CRON_SECRET (generate: openssl rand -base64 32)

### 5. Deploy
```bash
vercel --prod
```

### 6. Register Stripe Webhook
Stripe Dashboard → Webhooks → Add endpoint:
  URL: https://temitopesaliu.com/api/stripe-webhook
  Event: checkout.session.completed
Copy Signing Secret → STRIPE_WEBHOOK_SECRET in Vercel env vars.

### 7. Verify Resend Domain
resend.com → Domains → Add temitopesaliu.com → add DNS records.

### 8. Create MailerLite Groups
Create 5 groups: YHE All, YHE Human Bridge, YHE Creative Amplifier, YHE Systems Architect, YHE Growth Catalyst.
Copy each Group ID into the corresponding env var.

## Post-Deploy Checklist
- [ ] Stripe test purchase end-to-end
- [ ] Day 1 email arrives within 60 seconds
- [ ] Access link in email opens /playbook correctly
- [ ] /playbook without session_id → /access-denied
- [ ] /paths loads all 50 paths
- [ ] /coming-soon loads
- [ ] Cron job visible in Vercel dashboard

## Local Development
```bash
npm install
cp .env.example .env.local   # fill in test values
npx vercel link && npx vercel env pull
npm run dev
```

## Structure
src/app/
  page.tsx                     Quiz (/)
  gate/page.tsx                Email capture (/gate)
  results/[slug]/page.tsx      Archetype result pages
  playbook/page.tsx            Gated playbook
  paths/page.tsx               50 AI Paths
  coming-soon/page.tsx         Community placeholder
  access-denied/page.tsx       Playbook bounce page
  api/subscribe/               Email capture + Day 1 email
  api/create-checkout/         Stripe checkout session
  api/stripe-webhook/          Post-payment: KV + email + MailerLite
  api/validate-session/        Playbook access guard
  api/track/                   Analytics events
  api/download-pdf/            PDF generation
  api/cron/send-sequence/      Daily drip (Vercel Cron)
src/lib/
  archetypes.ts                All archetype data + quiz questions
  email-sender.ts              6 email templates + Resend send()
  kv.ts                        Vercel KV data layer
  mailer.ts                    MailerLite per-archetype segmentation

## Notes
- Price: all email templates updated to $5.99 (from original $9.99)
- PDF download: run `npm install @sparticuz/chromium puppeteer-core`
- KV scan: capped at 50/run; add pagination at >200 active subscribers
