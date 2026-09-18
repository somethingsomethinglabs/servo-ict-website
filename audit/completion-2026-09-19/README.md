# Customer-flow completion checks

19 September 2026. These checks concern the local implementation. No production email was sent and no live customer baseline was collected.

## Results

- 43 tests pass across eight files, including real Nodemailer delivery through a loopback SMTP test server, owner/visitor messages, phone-only delivery, failure handling, source sanitisation, aggregate storage and confirmed-delivery counting.
- Astro check: 61 files, zero errors, warnings or hints.
- Node and static production builds pass. Isolated build directories prevent another session's static build from replacing files used by the Node browser review.
- The static build contains 17 pages. All 477 checked links within its base path resolve, including fragment targets. Cross-page Contact links retain source context. See `static-links.json`. External destinations were excluded.
- Desktop homepage screenshot inspected at an actual 1600 CSS-pixel viewport. The headline and calls to action are near the top; the original oversized hero image and blank area are absent.
- Home and starter page full-page mobile screenshots inspected at an actual 400 CSS-pixel viewport. The annual allowance, visible exclusions, proof enquiry action and form are present.
- Mobile case-study and new article entry screens inspected. Case-study starter and custom-website actions have distinct topics and the same case-study source.
- Home, starter, Websites, case study and Contact have no horizontal document overflow at actual widths of 320 and 400 CSS pixels. Desktop Websites has no document overflow at 1600 CSS pixels.
- Website ownership, care limits and exclusions are ordinary visible sections. Desktop disclosure screenshot inspected. Some long mobile website screenshot attempts timed out or captured incomplete browser painting; DOM/geometry checks and desktop inspection supplement those captures.
- Clicking the case-study starter action opens Contact with the starter topic. Copying the filled enquiry and pasting into the local form confirms `Project type: New business essentials`, `Source: case_study`, and `Page: /contact/`.
- Invalid contact input shows an inline error, focuses the contact field and preserves the entered name and description.
- Opening the privacy notice creates a separate tab; the original draft's name and contact remain unchanged.
- The production-build browser collector wrote page-view, enquiry-click, form-start and validation-failure counts to `/tmp/servo-enquiry-metrics`. `local-measurements.txt` is synthetic QA evidence, not a customer baseline. Confirmation counts were verified by automated endpoint tests after SMTP acceptance.

## Evidence

- `home-desktop.png`
- `home-mobile.png` and `home-mobile-sheet.png`
- `start-a-business-mobile.png` and `start-a-business-mobile-sheet.png`
- `websites-terms-desktop.png`
- `work12grapes-mobile.png`
- `what-does-a-small-business-website-and-email-cost-each-year-mobile.png`
- `can-you-start-a-website-before-your-content-is-ready-mobile.png`
- `contact-validation-mobile.png`
- `static-links.json`
- `local-measurements.txt`

Screenshots can include padding from the browser capture. Viewport claims above come from the page's measured `innerWidth`, not the requested override.

## Remaining external work

Deploy the selected Node build, supply production SMTP and Turnstile settings, provide persistent measurement storage, and verify receipt in the actual inbox. Collect real traffic before establishing a baseline. The target-customer task protocol in `docs/customer-flow-completion-2026-09-19.md` has not been run. Real Business IT/security client proof remains dependent on suitable work and permission.
