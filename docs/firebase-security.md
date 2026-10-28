# Dwx Firebase enquiry service

Project: `dwx-agency-leads` (216254759943). Firestore and the callable function
`submitInquiry` run in `europe-west1` (Belgium). The original Sites/D1 hosting
configuration remains intact; enquiries now use the Firebase callable endpoint.

## Access and abuse controls

- Firestore rules deny **all** browser reads, writes and queries, including signed-in users.
- Owner-authorised operators and the dedicated enquiry runtime identity
  `dwx-inquiries@dwx-agency-leads.iam.gserviceaccount.com` access enquiry data through IAM. The assistant runtime has a separate identity and only uses Firestore for abuse counters; see the chat section below.
  Runtime roles: Firestore data user and App Check token verifier. HMAC secret access
  is scoped to the one Secret Manager secret; no downloaded service-account keys.
- App Check with reCAPTCHA Enterprise (score threshold 0.5), a one-hour attestation
  TTL, and limited-use tokens are required. The exact registered app ID is checked.
  Firestore App Check enforcement is also enabled; deny-all rules remain the
  primary browser data-access boundary.
- Firebase token consumption is enabled. Additionally, an atomic Firestore
  `usedTokens` record enforces successful-use replay protection. Live testing found
  the provider's replay flag alone insufficient for the tested token exchange.
- Exact production origin allowlist and restricted browser API key; neither CORS
  nor API keys are treated as an authentication boundary. No wildcard origin.
- Server schema allowlist, type/length/UTF-8 byte limits, honeypot, control-character
  rejection, website protocol validation and credential-bearing URL rejection.
  Submitted website addresses are never fetched by the backend.
- One atomic transaction enforces quotas and creates the durable record. Limits:
  5 successful submissions per network / 10-minute UTC-aligned window,
  20 per network / day, 3 per normalised email / hour and 100 globally / day.
  Rejected attempts do not create enquiries. Retries with the same UUID and payload
  return the same receipt with a fresh token; changed payloads require a new UUID.
- Network identity uses the final forwarded address appended by the direct managed
  Cloud Run ingress; caller-prepended addresses are ignored. IPv6 is grouped by /64.
  This hop assumption must be reviewed if adding a CDN or external load balancer.
  Email and global limits remain independent safeguards. HMAC keys conceal email/IP
  values in quota-document IDs; raw network addresses are not stored in leads.
- Firestore transactions prevent quota races across instances. TTL deletion is
  never relied on to reset quotas: explicit time windows determine eligibility.
- Runtime: 0 minimum / 2 maximum instances, one request per instance, 20-second
  timeout, 256 MiB. These reduce exposure; they are not a monetary spending cap.
- Legacy `/api/inquiries` returns 410. There is no unprotected D1 fallback and no
  public listing endpoint. Existing D1 records have not been deleted or migrated.
- The UI displays success only after Firebase returns a durable receipt. Failures
  preserve typed values. Browser errors do not expose server internals.

## Retention and operations

- Enquiry records: scheduled deletion after 180 days via Firestore TTL.
- Rate-limit records: scheduled expiry within two days. Used-token hashes: one day.
- TTL deletion is asynchronous; expired data may remain until the service deletes it.
- Long messages and direct identifiers are excluded from unnecessary indexes.
- Firestore database deletion protection is enabled.
- No contact data or tokens are written to application logs. Google-managed HTTP
  logs may contain IPs and transport metadata; access is controlled by project IAM.
- Secret material is in Secret Manager. Do **not** rotate the HMAC secret casually:
  it changes quota/idempotency keys. Plan a migration and key overlap when rotating.
- Google-managed at-rest encryption and HTTPS transport are used. No claim of end-
  to-end encryption is made: authorised operators can read enquiries.
- $10 USD monthly project budget with actual-spend thresholds at 50%, 90%, 100%
  and a 100% forecast threshold. Default billing IAM recipients receive alerts.
  Alerts do not stop charges. Artifact images are cleaned up after seven days.
- Read new enquiries in Firebase Console > Firestore > inquiries (sort createdAt).
  No email notification provider is configured; monitor Firebase for new leads.
  Review operator IAM periodically, enable MFA on the owner's Google account,
  and remove operators when access is no longer needed. Account-wide MFA settings
  were not modified by this implementation.
- This is layered abuse protection, not a DDoS guarantee. Distributed bot traffic
  can still incur verification/compute costs; quotas limit accepted submissions.

## Production domains and local development

Registered production domains: `dwx.agency`, `www.dwx.agency`,
`dwx-agency-leads.web.app`, `dwx-agency-leads.firebaseapp.com`.
The final public hosting origin must match these lists before launch. Add a new
origin to the function, reCAPTCHA key and API-key referrers together. Do not use `*`.
Production App Check does not allow localhost or permanent public debug tokens.
The production website bundle is now published at https://dwx-agency-leads.web.app.

Use the emulator for data/security tests; never disable production enforcement:

```sh
npm ci
npm --prefix firebase/functions ci
firebase emulators:exec --only firestore --project demo-dwx-security 'npm --prefix firebase/functions test'
npm run build
node --test tests/rendered-html.test.mjs
```

Deployment:

```sh
firebase deploy --only functions,firestore --project dwx-agency-leads
```

Public Firebase identifiers and reCAPTCHA site key are intentionally committed.
The HMAC secret and debug tokens must never be committed. The runtime uses the
managed service account identity, without long-lived private keys in the website.

## Verification on 10 October 2026

- Four emulator tests passed: schema validation, anonymous/authenticated rule
  denials, concurrent quotas/idempotency/replay protection, and network identity.
- The website production build and all six rendered-page/API tests passed.
- Live deployment accepted and persisted synthetic enquiries, returned the same
  receipt on a fresh-token retry, and rejected missing/invalid/reused App Check
  tokens (401), disallowed origins (403), invalid URLs (400), and email quota
  exhaustion (429). Anonymous Firestore reads and writes returned 403.
- Temporary test attestation was revoked and synthetic enquiry records removed.
  All three Firestore TTL policies report ACTIVE. Billing is enabled and the
  project-filtered $10 budget was verified through the billing API.
- The Firebase functions dependency audit and the website production dependency
  audit reported zero known vulnerabilities. The full website development-tool
  audit still reports transitive advisories; this is not an audit-clean claim for
  every development dependency. The server-rendering React package was updated
  to 19.3.0, and the existing compatible Vinext version retained after verification.
- No point-in-time recovery or independent backup schedule is configured.
- The website is deployed to Firebase Hosting at
  https://dwx-agency-leads.web.app. A browser submission from that origin passed
  production reCAPTCHA/App Check, displayed a receipt and was verified in Firestore.
  The synthetic enquiry was removed. The former Sites project remains unavailable.

## Firebase Hosting release

Run `npm run deploy:firebase`. Its predeploy hook runs `npm run build:firebase`,
which exports pages and assets, generates metadata routes and verifies the output.
Only `dist/client` is uploaded; server bundles, private credentials and hidden
build metadata are excluded. Hosting applies security headers and immutable cache
headers to content-hashed assets; HTML is revalidated. Unknown routes return 404.
The Firebase build disables the previous D1 analytics requests because Hosting
does not provide that binding. Contact submissions continue to use the protected
callable function. The `dwx.agency` custom domain has not been connected to Hosting.

## Dwx Assist (10 October 2026)

`assistantChat` is a separate App Check protected callable in europe-west1. It uses
Google Vertex AI's global endpoint with `gemini-3.1-flash-lite`; chat processing
is **not** covered by the Belgium enquiry-storage location. Public privacy copy
discloses this. There is no server-side transcript storage, chat analytics or
prompt/answer logging. Page memory is cleared by reset/reload. Google provider
processing and service logs remain subject to Google's terms.

- Dedicated managed runtime `dwx-assistant@dwx-agency-leads.iam.gserviceaccount.com`,
  with custom `dwxAssistantPredict` (prediction + service usage), datastore.user,
  App Check token verifier and access to the existing HMAC secret only. The model
  uses managed credentials; no model keys are shipped to the browser. Firestore
  IAM does not isolate individual collections: the deployed chat code only reads
  counters and token receipts, and has no enquiry lookup or model tools.
- Strict payload allowlist: 1–7 alternating user/assistant turns, final user,
  900 characters per turn, 10KB total request body. Prior replies are truncated
  to the context limit by the client; the current user question is not truncated.
- Separate atomic quotas: 12 requests/network/10 minutes, 60/network/day and
  500 globally/day; provider failures count toward quotas. Used-token ledger
  is shared with enquiries, preventing cross-endpoint replay. Counters use the
  existing TTL policies and keyed network identifiers.
- Same origin/app ID allowlists and limited-use App Check checks as enquiries.
  Maximum 2 instances, concurrency 1, 256MiB, 30s timeout; provider request 20s.
  Output limited to 350 tokens and 2400 characters. These are abuse/cost controls,
  not a hard billing cap. Existing $10 project budget alerts remain in place.
- No booking, payment, email or external-tool capabilities. System instructions
  prohibit fabricated commercial terms, testimonials and outcomes, label AI
  honestly and direct visitors to the contact form for a person. Model replies
  are untrusted plain text rendered through React; never raw HTML.
- Six emulator tests pass, including malformed chat payloads, atomic chat limits
  and replay protection. Re-run them after changing either security endpoint.

Deploy only this callable with:
`firebase deploy --only functions:enquiries:assistantChat --project dwx-agency-leads`
