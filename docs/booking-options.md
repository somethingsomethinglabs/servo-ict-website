# Consultation request and booking options

Research checked against first-party sources on 10 September 2026.

## Recommendation

Build a small consultation request form into the Astro site. On submission, a server-side endpoint should:

1. validate the request and reject bots;
2. email the request to `support@servoict.com` or another chosen address;
3. attach a standards-based iCalendar event marked as a tentative consultation request; and
4. send the visitor a plain confirmation that their requested time is not booked until Servo ICT replies.

This matches the workflow described: the visitor proposes a time, it appears in email and can appear in the calendar, and Servo ICT decides whether to accept it. It does not expose availability or let an unknown visitor claim a confirmed slot.

The domain's current MX records point to Fastmail. That makes an emailed calendar request a particularly good fit if the working calendar is also in Fastmail. Fastmail can automatically add new invitations received by email to a selected Fastmail calendar, including invitations that have not received a response. It can limit automatic handling to contacts or named groups, or require a manual click on "Add to calendar" instead. [Fastmail documents these invitation-handling choices](https://www.fastmail.help/hc/en-us/articles/360058752694-Calendar-events-and-invitations).

No persistent calendar access is needed for this design. The site sends an invitation rather than holding a Fastmail, Google, or Microsoft calendar credential. Fastmail supports two-way calendar sync over CalDAV if that is useful later, but its Basic plan does not provide CalDAV, SMTP, or app passwords. [Fastmail server and CalDAV details](https://www.fastmail.help/hc/en-us/articles/1500000278342-Server-names-and-ports).

There is one honest limitation. An `.ics` attachment is a calendar request, not a guaranteed database write. The recipient's calendar settings decide whether it appears automatically or waits for approval. That is useful here because the requested time is deliberately tentative. iCalendar defines the event fields, while iTIP defines `METHOD:REQUEST` as the mechanism an organiser uses to invite an attendee. [RFC 5545](https://www.rfc-editor.org/rfc/rfc5545.html) and [RFC 5546](https://www.rfc-editor.org/rfc/rfc5546.html).

If the requirement changes to "show my live availability and confirm bookings immediately," do not recreate a booking engine in Astro. Use Google Calendar Appointment Schedules when Google Calendar is the source of truth, or test hosted Cal.com Free if the calendar is elsewhere.

## What the custom form would contain

Ask only for information needed to reply:

- name;
- email address;
- organisation, optional;
- preferred date and time;
- visitor time zone;
- a second acceptable time, optional;
- phone or video preference; and
- a short description of what they want help with.

The confirmation page and email should say "request received" rather than "booking confirmed." A sensible default is a 30-minute requested hold. The generated calendar item should include the visitor's name and contact details, use a unique event ID, and remain tentative until accepted.

The current project is statically generated and has no deployment adapter in [`astro.config.mjs`](../astro.config.mjs). Astro can expose a live form endpoint, but the route needs on-demand rendering and a deployment adapter. Astro's endpoint guide explains that a static route runs at build time, while an on-demand route can receive POST requests and keep secrets on the server. [Astro server endpoints](https://docs.astro.build/en/guides/endpoints/) and [Astro on-demand rendering](https://docs.astro.build/en/guides/on-demand-rendering/).

The deployment can stay mostly static. Only the form route needs server-side execution. If the eventual host is Cloudflare Pages, Pages Functions are designed for form submissions and share the Workers Free allowance of 100,000 requests per day. Static asset requests remain free and unlimited. [Pages Functions](https://developers.cloudflare.com/pages/functions/) and [Pages Functions pricing](https://developers.cloudflare.com/pages/functions/pricing/). Cloudflare is an example, not a requirement. The final endpoint should use whichever function runtime hosts the site.

For delivery, Resend is a practical HTTP email service. Its current Free plan allows 3,000 transactional emails per month, capped at 100 per day, with three verified domains and 30-day data retention. Its send API accepts file attachments, so the endpoint can attach the generated calendar event. [Resend pricing](https://resend.com/pricing) and [Resend send-email API](https://resend.com/docs/api-reference/emails/send-email). This volume is far beyond a small consultation form. Fastmail SMTP is another option if the deployment runtime supports outbound SMTP and the account plan supports app passwords, but an HTTP email API is usually easier to run on serverless hosts.

Use a honeypot, strict server-side field limits, basic rate limiting, and bot verification. Cloudflare Turnstile's Free plan permits up to 20 widgets and unlimited challenges and works even when the site is not hosted by Cloudflare. The server must validate every Turnstile token. [Turnstile plans](https://developers.cloudflare.com/turnstile/plans/) and [Turnstile setup](https://developers.cloudflare.com/turnstile/get-started/). Turnstile processes IP address, browser and TLS signals for bot detection but does not read form entries. [Turnstile privacy addendum](https://www.cloudflare.com/turnstile-privacy-policy/).

Expected recurring software cost is $0 while the site, function, Turnstile and email traffic stay inside their free allowances. The existing domain, hosting and Fastmail subscription are separate.

## Comparison

| Option | Cost and limits | Email and calendar behaviour | Astro integration | Operations and privacy | Verdict |
| --- | --- | --- | --- | --- | --- |
| Custom Astro request form plus `.ics` | About $0 at this volume. Resend Free has 3,000 emails per month and 100 per day. Function-host free allowances vary. | Sends an owner notification and visitor acknowledgement. Fastmail can auto-add or manually add the attached request. It does not inspect live availability. | Native form and styling. One on-demand endpoint or host function is required. | No booking database and no calendar OAuth token. The host and mail provider process the submitted details. Resend says Free-plan email data retention is 30 days. | Best match for a request that Servo ICT must approve. |
| Cal.com hosted Free | $0 for one user. Cal.com lists unlimited event types, calendar connections and meetings for individuals. Teams is US$12 per user per month when billed yearly. [Cal.com pricing](https://cal.com/pricing). | Checks connected calendars, creates events and sends notifications. Its "Requires Confirmation" option can keep a request pending until the host accepts or rejects it. [Cal.com confirmation setting](https://cal.com/help/event-types/how-to-requires). | Inline, floating-button and element-click embeds are available. [Cal.com embeds](https://cal.com/embed). | No server upkeep, but Cal.com stores names, emails, booking answers, event details and free/busy data as the customer's processor. [Cal.com privacy policy](https://cal.com/privacy). | Strong hosted fallback, but test calendar compatibility before committing. |
| Cal.diy self-hosted, formerly Cal.com's community edition | No licence fee. It is MIT licensed and has no managed edition. | Can provide a full booking system, but calendar and mail integrations require separate credentials and configuration. | Runs as a separate Next.js application rather than becoming part of this Astro build. Link or embed it. | Requires Node 18+, PostgreSQL 13+, secret management, database migrations, backups, upgrades and security work. The project's own README says it is strongly recommended only for personal, non-production use. [Cal.diy repository](https://github.com/calcom/cal.diy). | Do not use for this business site. It saves a subscription and creates a maintenance job. |
| Google Calendar Appointment Schedules | A personal Google Account or Workspace Business Starter can create one booking page. More than one schedule, automatic reminders, multi-calendar checks and guest email verification require an eligible paid subscription. [Google feature comparison](https://support.google.com/calendar/answer/16287038?hl=en). | Shows conflict-aware availability and puts confirmed appointments directly into Google Calendar. Supports Meet, phone, in-person, or a location specified later, plus custom booking questions. [Google setup guide](https://support.google.com/calendar/answer/10729749?hl=en). | Google supplies an inline embed and a popup-button embed. [Google embed instructions](https://support.google.com/calendar/answer/10733297?hl=en). | Almost no maintenance if Google Calendar already holds the real schedule. The booking page is public to anyone with its link and displays the account name and profile photo. Free/basic users cannot require email verification, so spam control is weaker. [Google email verification requirements](https://support.google.com/calendar/answer/11902347?hl=en). | Best for immediate booking into Google Calendar. Poor fit if Fastmail Calendar is the source of truth or approval is required first. |
| Calendly Free | $0 for one event type, one connected calendar and unlimited one-to-one meetings. Standard is US$10 per seat per month billed yearly and adds unlimited event types, up to six calendars and automated reminders. [Calendly pricing](https://calendly.com/pricing/). | Checks for conflicts, writes the meeting to a chosen connected calendar and sends confirmations. The supported list names Google, Office 365/Outlook.com and Exchange. [Calendly calendar connections](https://calendly.com/help/connect-your-calendar-to-calendly). | Inline, popup text and popup widget embeds are available on all plans. [Calendly embed options](https://calendly.com/help/embed-options-overview). | No server upkeep. Calendly processes booking data on behalf of the account owner and passes meeting data to the connected calendar. [Calendly privacy notice](https://calendly.com/legal/privacy-notice). | Adequate for one simple event type, but less generous than Cal.com and not a direct Fastmail Calendar fit. |
| Easy!Appointments self-hosted | Free for personal and commercial use under GPLv3. | Includes customer and appointment management, working rules, email notifications and Google Calendar sync. | Separate PHP application. The official project does not document a native Astro or JavaScript embed, so use a booking link or an iframe after testing. | Requires Apache or Nginx, PHP 8.2+, MySQL, TLS, SMTP, backups, upgrades and calendar OAuth configuration. [Easy!Appointments repository and production requirements](https://github.com/alextselegidis/easyappointments). | Credible and lighter than Cal.diy, but still much more machinery than one consultation form needs. |

### Cal.com and Fastmail need a real compatibility test

Cal.com supports Apple Calendar and several CalDAV systems, and its Free plan permits multiple calendars. Its current CalDAV integration is marked beta and lists Baikal, Kerio Connect, Nextcloud and Radicale as confirmed providers. Fastmail is not on that confirmed list. [Cal.com CalDAV integration page](https://ai.cal.com/apps/caldav-calendar). This does not prove that Fastmail fails, but it means Servo ICT should test two-way conflict detection and event creation before making Cal.com the public booking route.

Cal.com's hosted Free plan is otherwise the best no-cost scheduler in this comparison. It supports more than Calendly Free, and the host-confirmation feature matches the desire to review requests. If the `.ics` form feels too manual after a trial, Cal.com is the next option to test.

## Data handling for the recommended form

Keep the data path short:

```text
visitor -> Servo ICT form endpoint -> email service -> Servo ICT inbox -> Fastmail calendar
```

Do not add a database for consultation requests. Do not write names, messages, phone numbers or email addresses to function logs. Keep the calendar attachment and email subject generic enough that sensitive client details do not appear on a lock screen. The site's privacy notice should name the form's purpose, fields, email delivery provider, spam-protection provider and retention approach.

Resend states that message metadata, addresses, content and attachments are personal data handled by the service and that data may be transferred to the United States. [Resend privacy policy](https://resend.com/legal/privacy-policy) and [Resend data processing addendum](https://resend.com/legal/dpa). Hosted schedulers collect roughly the same contact information but also keep a booking record and receive some calendar data. Self-hosting removes a booking SaaS from the path, but it makes Servo ICT responsible for patching and protecting a public database.

## Decisions needed before implementation

1. Confirm whether the working calendar is a Fastmail calendar, not merely that the email inbox is hosted by Fastmail.
2. Choose the destination inbox and calendar. `support@servoict.com` is the obvious default.
3. Choose manual calendar approval or Fastmail automatic invitation handling. I recommend automatic addition to a separate calendar named "Consultation requests," with every item marked tentative.
4. Choose the default hold length, probably 30 minutes, and the minimum notice visitors should see in the form copy.
5. Confirm the website's deployment host. That determines the Astro adapter or host-function implementation.
6. Create the email-sending credential. The low-friction choice is a Resend account and DNS verification for a sender such as `bookings@servoict.com`. Fastmail SMTP can be used instead if the final runtime and account plan support it.
7. Decide whether to use Turnstile immediately. A public email form should have it, or at minimum add it before the site is promoted.

The user does not need to grant this project ongoing calendar access under the recommended design. The only calendar-side setup is choosing how Fastmail handles invitation emails. If live availability later becomes essential, then authorise a booking provider against a dedicated business calendar rather than giving custom site code broad access to the primary calendar.
