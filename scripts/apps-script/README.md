# Expert profile form → Sheet + Doc + MailerLite

`consulting-profile-form.gs` is the Google Apps Script web app behind
`GOOGLE_SHEETS_CONSULTING_FORM_WEBHOOK_URL`. On every submission from
`/expert-profile` it:

1. Appends a row to a Google Sheet (with the photo as an `=IMAGE()` formula).
2. Copies a Google Doc template, fills in that person's answers and photo,
   and shares it link-viewable.
3. Upserts the person into MailerLite with a `doc_link` custom field and adds
   them to a group, so a MailerLite automation can email them the doc link.

## 1. Create the Doc template

1. Create a new Google Doc — design it however you want the finished
   "Expert Profile" document to look (headings, your branding, etc).
2. Anywhere you want a piece of their form data to appear, type a
   placeholder in **exactly** this form: `{{fullName}}` — **camelCase**,
   matching the property names in the `DOC_PLACEHOLDER_KEYS` array at the
   top of `consulting-profile-form.gs`, not the snake_case field names used
   in the form itself. `route.ts` converts every field to camelCase before
   it reaches this script, so `{{full_name}}` (snake_case) will never match
   anything and silently leaves the placeholder blank.

   The full list, copy the exact spelling and casing:
   `{{submittedAt}}` `{{fullName}}` `{{preferredName}}` `{{email}}`
   `{{country}}` `{{timezone}}` `{{linkedin}}` `{{currentRole}}`
   `{{yearsExperience}}` `{{industry}}` `{{adviceAreas}}`
   `{{greatestStrength}}` `{{coreProblem}}` `{{proudestWork}}`
   `{{orgTypes}}` `{{whyJoined}}` `{{bestWorkshop}}` `{{keyQuestion}}`
   `{{aiConfidence}}` `{{aiTools}}` `{{aiTransformative}}`
   `{{businessName}}` `{{businessIndustry}}` `{{businessSize}}`
   `{{businessChallenge}}` `{{businessFriction}}` `{{businessWhy}}`
   `{{sixMonthsVision}}` `{{anythingElse}}` `{{marketingConsent}}`
   (this last one renders as the literal text "Yes" or "No")
3. Put `{{photo}}` **alone on its own line** wherever you want their uploaded
   photo to appear — don't share that line with any other text or
   placeholder. The script clears that entire line and drops the image in,
   so anything else on it would be wiped out too. The form only accepts
   JPG/PNG uploads (WEBP can't be embedded into a Doc via Apps Script), so
   any photo that made it through the form will embed fine.
4. Open the doc's URL — the ID is the long string between `/d/` and `/edit`:
   `https://docs.google.com/document/d/`**`THIS_PART`**`/edit`. Save it, you'll
   paste it into a script property below.

## 2. Set up the Sheet + script

1. Open the target Google Sheet → **Extensions → Apps Script**.
2. Replace `Code.gs` with the contents of `consulting-profile-form.gs`.
3. Project Settings (gear icon, left sidebar) → **Script Properties** → add:
   | Property | Value |
   |---|---|
   | `DOC_TEMPLATE_ID` | the Doc ID from step 1.4 |
   | `MAILERLITE_API_KEY` | from MailerLite, see step 3 |
   | `MAILERLITE_GROUP_ID` | from MailerLite, see step 4 |

   (`DOCS_FOLDER_NAME` is optional — omit it and generated docs land in a
   Drive folder called "Expert Profile Docs", auto-created on first run.)

## 3. Get a MailerLite API key

1. In MailerLite: **Integrations → API** (or **Integrations → Developer API**
   depending on your account) → **Generate new token**.
2. Copy it straight into the `MAILERLITE_API_KEY` script property — MailerLite
   only shows it once.

## 4. Create the MailerLite group + custom field

1. **Subscribers → Groups → Create group** — name it something like
   "Expert Profile Submitted". Open the group and copy its ID from the URL
   (or **Subscribers → Groups**, the ID is shown next to each group) into
   the `MAILERLITE_GROUP_ID` script property.
2. **Subscribers → Fields** (custom fields) → create a new field named
   `doc_link`, type **Text**. The script sends the key `doc_link` exactly —
   check the field's key (not just its display label) matches after you
   create it, since MailerLite may auto-adjust the key from what you typed.

## 5. Build the MailerLite automation

1. **Automations → Create automation**.
2. Trigger: **Subscriber joins a group** → select the group from step 4.1.
3. Add a **Send email** step. In the email editor, use the
   personalization/merge-tag picker (don't hand-type the tag) and insert the
   `doc_link` custom field wherever you want the link to appear — e.g. as a
   button or a plain link.
4. Turn the automation on.

## 6. Deploy the web app

1. Back in the Apps Script editor: **Deploy → New deployment** → type
   **Web app** → Execute as **Me** → Who has access **Anyone** → **Deploy**.
2. Approve the OAuth prompts (Sheets, Drive, Docs, and external URL access
   for the MailerLite call) the first time.
3. Copy the web app URL into `GOOGLE_SHEETS_CONSULTING_FORM_WEBHOOK_URL`
   (`.env.local` and your Vercel project's env vars).

**Whoever clicks Deploy is whose Google Drive the photos and docs get saved
to** ("Execute as Me" binds to that account) — deploy from the account that
should own them.

After any future edit to the script: **Deploy → Manage deployments → edit
the existing deployment → New version → Deploy**. Saving the script alone
does not update the live web app URL.

## Notes

- If `DOC_TEMPLATE_ID` isn't set, the script still appends the sheet row —
  it just skips doc generation and logs a warning in its response.
- If the MailerLite properties aren't set, or the API call fails, the sheet
  row and doc still get created — MailerLite sync failing never blocks the
  submission. Check the response body (`warnings` array) or **Executions**
  in the Apps Script editor to debug.

## Troubleshooting

**Sheet doesn't seem to get a new row.** The script writes to a tab
literally named `Consulting Profile Form` (creating it if it doesn't
exist yet) — it does not touch `Sheet1`. Check the tab bar at the bottom of
your spreadsheet for that tab specifically before concluding nothing
happened. If it's genuinely not there, open **Executions** (clock icon,
left sidebar of the Apps Script editor) and check the most recent run for
an error — `appendRow` failing would show up there.

**MailerLite adds the subscriber to the group but `doc_link` is blank on
their profile.** This means the custom field's actual API key doesn't
match `doc_link` exactly. MailerLite returns a 200/201 success and *still*
adds the subscriber to the group even when it silently drops a field it
doesn't recognize by key — a plain status-code check can't catch that. The
script now re-checks MailerLite's own response and confirms `doc_link` was
actually saved; if it wasn't, `upsertMailerliteSubscriber_` throws and
you'll see it in the `warnings` array of the web app's JSON response (or in
**Executions**), naming the exact mismatch. Go to **Subscribers → Fields**
in MailerLite and check the field's key (not just its display name) — if
you named it something other than exactly `doc_link`, either rename it or
change the `doc_link:` key in `upsertMailerliteSubscriber_()` to match.

**Doc gets created but fields are empty.** Almost always a placeholder
casing/spelling mismatch — see the camelCase list in step 1.2 above. Open
the generated Doc and compare each `{{...}}` against that exact list.

**General debugging.** The web app's JSON response includes `docUrl` and a
`warnings` array describing anything that was skipped or failed — call the
webhook URL directly with `curl` and a full JSON payload (all the camelCase
keys above) to see it without going through the Next.js form:
```
curl -sL -X POST "<your webhook URL>" \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"you@example.com","currentRole":"Business owner"}'
```
