# Enquiry form setup

`EnquiryForm.svelte` supports two delivery modes. The selected preview can use `email`, which opens a prepared draft in the visitor's email app and offers a copy fallback. This needs no credentials and does not claim that Servo received the enquiry.

The `server` mode posts to `/api/consultation`. It sends the owner notification first. If the visitor supplied an email address, it then attempts an acknowledgement. A failed acknowledgement does not tell the visitor to submit again because the owner already has the enquiry. Phone-only enquiries do not receive an acknowledgement.

## Component contract

```svelte
<EnquiryForm
  client:load
  baseUrl={import.meta.env.BASE_URL}
  turnstileSiteKey={import.meta.env.PUBLIC_TURNSTILE_SITE_KEY}
  consultationMode="email"
/>
```

- `baseUrl` defaults to `/` and keeps both the API URL and the no-JavaScript result page's return link correct under an Astro base path.
- `turnstileSiteKey` defaults to blank. Supply the public Cloudflare Turnstile site key when server delivery is enabled.
- `consultationMode` defaults to `server`. Use `email` for a static deployment.
- Keep the component hydrated so it can show server errors and prepare the email fallback. In server mode, the native POST remains usable without JavaScript.

The form keeps the `consultation-form` ID used by page links. Its request fields are `name`, `contact`, `message`, `service`, `returnPath`, `companyWebsite`, and the Turnstile response. The server also accepts the previous `email`, `phone`, and `organisation` fields.

Use `resolveConsultationMode` from `src/lib/consultationEmail.ts` when choosing the prop. It accepts `staticSite`, `hasTurnstileSiteKey`, `allowInsecureLocal`, and `isDevelopment`. It selects direct server delivery only when a public spam-check key is present, or when the insecure local option is explicitly enabled during development. Static output and production pages without a visible spam check use the email draft.

Links from a service page can add `?service=website`, `technology`, `security`, `consulting`, or `other`. The form preserves a recognised value and uses `starter` for a missing or unknown value. A URL query cannot show a success message. JavaScript submissions require a successful HTTP response with a valid success body, while native submissions receive a server-rendered result page after the delivery attempt.

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

Before switching production to `server`, verify the sender address in Fastmail, add the real recipient through the host's secret settings, configure Turnstile for the production hostname, and submit one test enquiry from the deployed site. The repository contains no production credentials and does not select a real inbox on its own.
