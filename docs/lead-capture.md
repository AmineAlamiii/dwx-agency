# Dwx enquiries and conversion measurement

Contact submissions use the Firebase callable `submitInquiry` in project
`dwx-agency-leads`. A receipt confirms durable Firestore storage, not email
notification. No email notification provider is configured. Read new enquiries
in the owner's Firebase Console > Firestore > inquiries.

See [Firebase security and deployment](firebase-security.md) for the implemented
App Check, atomic rate limits, private rules, retention, IAM and operating limits.
The former `/api/inquiries` D1 endpoint is retired (410); existing D1 records are
preserved, but new submissions cannot use that weaker path.

The site is deployed at https://dwx-agency-leads.web.app using Firebase Hosting.
Run `npm run deploy:firebase` to rebuild, verify and release it. The export includes
the home page, privacy page, branded 404, robots and sitemap. Firebase provides
HTTPS and configured security/cache headers. The contact form was verified from
this public origin using production reCAPTCHA/App Check and a durable receipt;
the synthetic test enquiry was removed afterward.

Anonymous, aggregated conversion counters still use `POST /api/events` and the
existing D1 binding when running the Worker deployment. Firebase Hosting has no
D1 binding, so its build disables these requests with
`NEXT_PUBLIC_AGGREGATE_TRACKING=disabled`. It does not silently claim to collect
analytics. Counts on the Worker contain day, event, source and count only;
Do Not Track disables that measurement. These are not unique visitors or sales.

The Morocco trust statement is based on supplied Simo Life and ElGrandeToto
references. Individual names are not presented as a two-client logo strip. The
EGT showcase, image and project route remain removed. Approved quotes, measured
results and pricing must be supplied before adding such claims.
