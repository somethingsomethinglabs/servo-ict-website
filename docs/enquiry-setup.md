# Enquiry form setup

`EnquiryForm.svelte` supports two delivery modes. `email` opens a prepared draft in the visitor's email app and offers a copy fallback. This needs no credentials and does not claim that Servo received the enquiry.

The `server` mode posts to `/api/consultation`. It sends the owner notification first. If the visitor supplied an email address, it then attempts an acknowledgement. A failed acknowledgement does not tell the visitor to submit again because the owner already has the enquiry. Phone-only enquiries do not receive an acknowledgement.

## Component contract

```svelte
<EnquiryForm
  client:load
  baseUrl={import.meta.env.BASE_URL}
  turnstileSiteKey={import.meta.env.PUBLIC_TURNSTILE_SITE_KEY}
  consultationMode="email"
  defaultService="website"
  source="websites"
/>
```

- `baseUrl` defaults to `/` and keeps both the API URL and the no-JavaScript result page's return link correct under an Astro base path.
- `turnstileSiteKey` defaults to blank. Supply the public Cloudflare Turnstile site key when server delivery is enabled.
- `consultationMode` defaults to `server`. Use `email` for a static deployment.
- `defaultService` sets the editable topic. The visitor can change it or choose "I'm not sure yet".
- `source` is an optional coarse source label. The component also sends the current path without its query string.
- `expanded` remains accepted for existing embeds. All embeds now use the same fields and validation.
- Keep the component hydrated so it can show server errors and prepare the email fallback. In server mode, the native POST remains usable without JavaScript.

The form keeps the `consultation-form` ID used by page links. Its request fields are `name`, `contact`, `message`, `service`, `organisation`, `timing`, `source`, `originPath`, `returnPath`, `companyWebsite`, and the Turnstile response. Name, one email address or phone number, and a short description are required. The server also accepts the previous `email` and `phone` fields.

Use `getEnquirySettings` from `src/lib/server/enquirySettings.ts` when rendering the form. It selects direct server delivery only when the SMTP settings are valid and matching public and secret spam-check keys are present. The explicit local bypass can replace the spam check during development, but it does not replace SMTP configuration. Static output and incomplete or malformed production configuration use the email draft.

Links from a service page can add `?service=starter`, `website`, `technology`, `security`, `consulting`, or `other`. A missing or unknown value becomes `unsure`. Links may also add a bounded source such as `source=/websites/`; the client converts known paths to coarse labels and does not retain query strings. A URL query cannot show a success message. JavaScript submissions require a successful HTTP response with a valid success body, while native submissions receive a server-rendered result page after the delivery attempt.

## Measurement hook

`src/lib/enquiryEvents.ts` dispatches `servo:enquiry` browser events for form starts, confirmed submissions, failures and email-draft launches. `initializeEnquiryLinkTracking()` adds delegated tracking for enquiry, phone and email links. Event details contain only the event name, topic, a coarse source label, the page path without its query string, delivery mode and a short failure category. They never contain names, contact details, business names or enquiry text.

The shared `EnquiryMeasurement` component connects those events to the optional first-party Node collector described below. Configure its persistent directory to enable storage. Establish a baseline only after deployment and a report check.

## Enabling server delivery

Set these values in the production host's secret or environment settings. Do not commit them.

```text
SMTP_HOST=smtp.fastmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=<Fastmail SMTP username>
SMTP_PASSWORD=<Fastmail app password>
CONSULTATION_TO_EMAIL=<verified Servo inbox>
CONSULTATION_FROM_EMAIL=<verified Fastmail sender>
CONSULTATION_FROM_NAME=Servo ICT Website
TURNSTILE_SECRET_KEY=<Cloudflare Turnstile secret key>
PUBLIC_TURNSTILE_SITE_KEY=<matching public site key>
```

The production host must run Astro's Node server output so `/api/consultation` exists. A static build should pass `consultationMode="email"`; it cannot run the endpoint.

`FORM_ALLOW_INSECURE_LOCAL=true` bypasses Turnstile only during Astro development. Leave it unset in production. SMTP delivery still needs a controlled local SMTP server or test doubles during development.

Before relying on direct production delivery, verify the sender address in Fastmail, add the real recipient through the host's secret settings, configure Turnstile for the production hostname, and submit one explicitly controlled enquiry from the deployed site. Confirm that it reaches the owner inbox and that the acknowledgement reaches the visitor. The repository tests validation and transport behavior with test doubles. It contains no production credentials and cannot prove inbox delivery or the two-business-day response aim.

## Stored funnel counts on the Node host

Set `ENQUIRY_METRICS_DIR` to a persistent writable directory outside `public/`, such as `/var/lib/servo/enquiry-metrics`, and restart the Node server. This enables the shared browser collector on all pages. Static previews keep collection disabled. There is no analytics vendor or subscription to configure.

The server stores daily aggregate counts for page views, enquiry/phone/email clicks, form starts, failures and draft launches. Successful owner-email handoffs are counted inside the consultation endpoint after SMTP accepts the email. Browser requests cannot increment that confirmed-delivery counter. A failed visitor acknowledgement does not undo an accepted owner notification. SMTP acceptance still does not prove final inbox placement.

Only fixed categories are stored. Names, contact details, enquiry text, query strings, IP addresses, cookies and visitor/session identifiers are not stored by this collector. Browser activity respects Do Not Track and Global Privacy Control. Operational delivery totals remain counted. The host's own access logs are separate. Counts older than 90 days are removed on the next recorded event; if collection is disabled, remove or archive that directory according to your retention policy.

Use one Node process with persistent local storage. The file counter is not designed for multiple workers or ephemeral/serverless disks. Do not expose the directory through the web server. File permissions are owner-only. Set ordinary request-rate limits at the reverse proxy; public browser activity can include bots and repeated clicks.

Read a report on the host:

```sh
ENQUIRY_METRICS_DIR=/var/lib/servo/enquiry-metrics node scripts/enquiry-report.mjs 2026-09-19 2026-10-18
```

Both dates are optional. The default covers 30 UTC dates through today; supplied dates are inclusive. The report groups counts by event, service, source, page, delivery mode and failure category. It exposes no public reporting endpoint. Establish the first real baseline after deployment, then compare equal-length periods. Counts are not unique customers or a session conversion rate. Compare confirmed enquiries per period alongside page views and form starts; review repeated validation/delivery failures and the split between starter and established-business enquiries. Keep local test data in a separate directory.

## Node launch checks

The owner selected Node hosting with direct enquiries. Build with `npm ci` and `npm run build`, then run `npm start` under the host's process manager. Supply `HOST=0.0.0.0` and the host's `PORT` where needed. Configure HTTPS at the hosting layer. Keep SMTP and Turnstile credentials in the host environment, never in the public build or repository.

1. Visit the deployed Home and Contact pages. Both must show **Send enquiry**, not **Open email draft**. If they show the fallback, fix configuration first.
2. With an explicitly agreed test recipient, submit an email-contact enquiry. Confirm owner inbox receipt, source/topic details and the visitor acknowledgement. Then verify a phone-only enquiry reaches the owner without an acknowledgement attempt.
3. Read the private metric report. Check one confirmed enquiry per accepted owner email. Confirm link clicks/form starts are collected and draft launches remain separate.
4. Check the form on a phone, follow the privacy notice, and return to the still-open draft. Invalid or failed submissions must retain the entered details.

No deployment target or production credentials are present in this checkout. Local tests cannot verify production inbox placement, spam filtering, HTTPS/proxy settings or ongoing response time.
