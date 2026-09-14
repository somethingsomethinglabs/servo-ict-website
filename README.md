# Servo ICT website

The Servo ICT website for small-business websites and technology projects, built with Astro, Svelte and TypeScript. It has two production targets:

- The standalone Node server validates project enquiries and sends them through Fastmail.
- The GitHub Pages build is fully static. The consultation form packages the entered details into an email draft for the visitor to review and send. Visitors can also copy the prepared enquiry into their preferred email service.

## What the consultation form does

1. A visitor provides their contact details, project type and a short description.
2. Cloudflare Turnstile checks the submission for spam.
3. The server emails Servo ICT through Fastmail SMTP and uses the visitor's address as `Reply-To`.
4. The visitor receives an acknowledgement that Servo ICT will reply by email.

No form submissions are stored in a database. The email inbox is the record of the enquiry.

## Local setup

This project requires Node.js 22.12 or newer.

```sh
npm install
cp .env.example .env
npm run astro -- dev --background
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
6. Set `CONSULTATION_TO_EMAIL` to the inbox that should receive enquiries.

The template uses Fastmail's TLS SMTP endpoint on port 465. To use STARTTLS instead, set `SMTP_PORT=587` and `SMTP_SECURE=false`.

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
| `CONSULTATION_FROM_EMAIL` | Authorised sender address | Required |
| `CONSULTATION_FROM_NAME` | Sender display name | `Servo ICT Website` |
| `PUBLIC_TURNSTILE_SITE_KEY` | Browser-visible Turnstile key | Required in production |
| `TURNSTILE_SECRET_KEY` | Server-only Turnstile key | Required in production |
| `FORM_ALLOW_INSECURE_LOCAL` | Dev-only Turnstile bypass | `false` |

## Commands

| Command | Action |
| --- | --- |
| `npm run astro -- dev --background` | Start the local development server in the background |
| `npm run astro -- dev status` | Check the background development server |
| `npm run check` | Type-check Astro and Svelte files |
| `npm test` | Run the project enquiry validation tests |
| `npm run build` | Build the standalone Node service into `dist/` |
| `npm run build:static` | Build the GitHub Pages version into `dist/` |
| `npm start` | Run the built service, loading `.env` if present |

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` runs the static build whenever `main` is pushed. That build switches the consultation button to **Open email draft**, removes the Turnstile widget and does not include the consultation API route. The email-app requirement is explained before the fields. **Copy enquiry** validates the same fields and copies the recipient, subject and message without opening an email app. If clipboard access fails, a selectable text field provides the same enquiry for manual copying. Neither action reports an enquiry as sent; the visitor sends it from their email service. Entered values stay in the form during these actions. The copy option is also available in server mode as a fallback.

Service-page enquiry links carry an allow-listed `service` query value into the form: `website`, `technology` or `security`. The selection is applied on initial page load, can be changed by the visitor and clears after a successful server submission.

### Activating direct submission

The default Node build already supports sending from the page through `/api/consultation`. GitHub Pages cannot run that endpoint. To use direct submission publicly, configure the SMTP and Turnstile values above and deploy the Node build on an HTTPS host using the existing Docker or standalone setup below. Check the privacy notice against the chosen host before publishing, then verify delivery and acknowledgement with a controlled test.

Changing the button label or the static build's form mode does not activate delivery. Keep the email-draft and copy flow until the server and its credentials are configured.

In the GitHub repository, open **Settings → Pages** and choose **GitHub Actions** as the source. The site is published at `https://somethingsomethinglabs.com/servo-ict-website/`. The `servoict.com` domain can be added later after its public DNS records point to GitHub Pages.

## Production with Docker

Copy `.env.example` to `.env`, enter the real secrets, then run:

```sh
docker compose -f compose.example.yaml up -d --build
```

The service listens on port `4321`. Put it behind the existing HTTPS reverse proxy and forward the public hostname to that port. The `.env` file is excluded from both Git and the Docker build context.

Without Docker, run `npm ci`, `npm run build`, and `npm start` under a process manager such as systemd. The server respects the `HOST` and `PORT` environment variables supported by the Astro Node adapter.
