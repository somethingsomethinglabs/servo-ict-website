# Servo ICT website

The Servo ICT landing page and consultation-request service, built with Astro, Svelte and TypeScript. Astro runs as a standalone Node server so the website can validate the form, send email through Fastmail and create a tentative calendar invitation without a separate booking SaaS.

## What the consultation form does

1. A visitor provides their details and suggests a preferred and optional alternate time.
2. Cloudflare Turnstile checks the submission for spam.
3. The server emails Servo ICT through Fastmail SMTP. The message includes a tentative `.ics` calendar invitation and uses the visitor's address as `Reply-To`.
4. The visitor receives an acknowledgement explaining that the time is not confirmed until Servo ICT replies.

No form submissions are stored in a database. The calendar request and email inbox are the record of the enquiry.

## Local setup

This project requires Node.js 22.12 or newer.

```sh
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:4321`. The form will render without credentials, but it will not deliver a request until `.env` has been configured.

For UI-only local testing, you can temporarily set `FORM_ALLOW_INSECURE_LOCAL=true`. This bypasses only Turnstile in Astro's development mode; valid SMTP settings are still required. The bypass cannot activate in a production build.

## Fastmail setup

In Fastmail:

1. Open **Settings → Privacy & Security → Manage app passwords**.
2. Create an app password with mail access for this website.
3. Put the generated password in `SMTP_PASSWORD` in `.env`. Do not use the normal Fastmail account password.
4. Set `SMTP_USER` to the full Fastmail login address.
5. Set `CONSULTATION_FROM_EMAIL` to a sending address that Fastmail has authorised for the account. The template uses `website@servoict.com`; create it as an alias or replace it with another authorised address.
6. Set `CONSULTATION_TO_EMAIL` to the inbox that should receive enquiries and `CONSULTATION_CALENDAR_EMAIL` to the address whose calendar should receive the invitation.

The template uses Fastmail's TLS SMTP endpoint on port 465. To use STARTTLS instead, set `SMTP_PORT=587` and `SMTP_SECURE=false`.

For reliable invitation handling, keep `CONSULTATION_FROM_EMAIL` different from `CONSULTATION_CALENDAR_EMAIL`; otherwise Fastmail may treat it as a self-invite. For a tidy calendar, create a separate **Consultation requests** calendar in Fastmail and review Fastmail's invitation-handling setting for the calendar recipient. Calendar items are intentionally marked tentative; replying to the visitor is still the confirmation step.

## Turnstile setup

Create a free Cloudflare Turnstile widget for the production hostname, then copy its keys into:

```dotenv
PUBLIC_TURNSTILE_SITE_KEY=your-site-key
TURNSTILE_SECRET_KEY=your-secret-key
```

The public key is rendered into the page. The secret is used only by the server. Production submissions fail closed if the secret is missing or invalid.

## Configuration reference

| Variable | Purpose | Default |
| --- | --- | --- |
| `SMTP_HOST` | SMTP server | `smtp.fastmail.com` |
| `SMTP_PORT` | SMTP port | `465` |
| `SMTP_SECURE` | Use implicit TLS | `true` |
| `SMTP_USER` | Full Fastmail login address | Required |
| `SMTP_PASSWORD` | Fastmail app password | Required |
| `CONSULTATION_TO_EMAIL` | Inbox receiving the full request | Required |
| `CONSULTATION_CALENDAR_EMAIL` | Calendar invitation recipient | Same as inbox |
| `CONSULTATION_FROM_EMAIL` | Authorised sender address | Required |
| `CONSULTATION_FROM_NAME` | Sender display name | `Servo ICT Website` |
| `CONSULTATION_TIMEZONE` | Fallback IANA timezone | `Australia/Melbourne` |
| `CONSULTATION_DURATION_MINUTES` | Tentative event length | `30` |
| `CONSULTATION_MIN_NOTICE_HOURS` | Earliest allowed request | `24` |
| `PUBLIC_TURNSTILE_SITE_KEY` | Browser-visible Turnstile key | Required in production |
| `TURNSTILE_SECRET_KEY` | Server-only Turnstile key | Required in production |
| `SITE_URL` | Canonical production URL | `https://servoict.com` |
| `FORM_ALLOW_INSECURE_LOCAL` | Dev-only Turnstile bypass | `false` |

## Commands

| Command | Action |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run check` | Type-check Astro and Svelte files |
| `npm test` | Run the consultation validation and calendar tests |
| `npm run build` | Build the standalone Node service into `dist/` |
| `npm start` | Run the built service, loading `.env` if present |

## Production with Docker

Copy `.env.example` to `.env`, enter the real secrets, then run:

```sh
docker compose -f compose.example.yaml up -d --build
```

The service listens on port `4321`. Put it behind the existing HTTPS reverse proxy and forward the public hostname to that port. The `.env` file is excluded from both Git and the Docker build context.

Without Docker, run `npm ci`, `npm run build`, and `npm start` under a process manager such as systemd. The server respects the `HOST` and `PORT` environment variables supported by the Astro Node adapter.
