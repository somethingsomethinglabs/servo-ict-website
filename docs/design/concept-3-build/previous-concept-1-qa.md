# Concept 1 implementation review

15 September 2026. Review build on `main`, based on merged style commit `e0c09cc`.

## Result and scope

The selected Concept 1 is implemented for the new-business audience in `AUDIENCE.md`. The review covers the homepage, service-page handoff, responsive layout, static enquiry flow and tested server delivery logic. No actionable P0 or P1 issue remains in that scope. Review findings about text size, service context and form correctness were fixed before handoff.

This is a preview, not a production mail activation. The owner asked to choose between the existing server/Fastmail approach and a separate form service after reviewing it. No provider was selected, no production settings were changed and no real email was sent. The preview honestly opens a draft or copies an enquiry. Direct delivery remains available in the code, guarded by configuration.

## Design evidence

- Selected source: `docs/design/customer-journey-2026-09-14/merged-style-e0c09cc/concepts/concept-1.png`.
- Journey brief: `docs/design/customer-journey-2026-09-14/plan.md`.
- Full comparison before readability corrections: `audit/2026-09-15/concept-1-build/comparison-pass-1.png`.
- Full comparison after corrections: `audit/2026-09-15/concept-1-build/comparison-pass-2.png`.
- Focused comparisons: `comparison-hero.png` and `comparison-enquiry.png` in that audit directory.
- Desktop: `desktop-final.png` and `preview-ready.jpg`.
- Mobile: `mobile-final.png` and `mobile-menu.jpg`.
- Interaction evidence: `enquiry-copy-result.jpg` and `booking-details.jpg`.

Both comparison images contain the source on the left and the implementation on the right. The source raster is 887 × 1774. The implementation was reviewed at 1440 CSS pixels, then normalized to the same 887-pixel width. The longer implementation is not compressed vertically to force identical section heights. It includes the agreed scope, account, later-help, contact and fallback details absent from the illustrative mockup.

Chrome used a 90% zoom setting during viewport overrides. Requested dimensions were adjusted to obtain the measured CSS widths. Full-page captures included extra blank padding from the browser capture; normalized files crop that padding. Desktop content width was 1423 pixels with a scrollbar; mobile was 373 within a 390-pixel viewport. The source has no mobile design, so mobile is an adaptation. Default browser sizing was restored for the delivered preview.

## Comparison and correction history

1. The first build retained the cream, charcoal, pink and mint sequence, four-line hero, illustration, three outcomes, cost panel, local proof, process and short enquiry. Independent Sol reviews found small decision-critical text, excessive proof spacing, missing connecting arrows, service context lost at the form and unclear account boundaries.
2. Increased outcome, cost, process, proof and contact text; enlarged the illustration; shortened repeated copy; restored connecting arrows and numbered circles; moved booking and extra-feature boundaries into a native disclosure. Added concrete quote boundaries for pages, addresses, people and devices. The client screenshot remains real; the hero is explicitly labelled illustrative.
3. Fixed shared form validation, personal-email/phone support, draft context, DOM-order error focus, copy feedback, stale copy completion, malformed-response handling, sending locks and read-only fields during delivery. Removed query-string success assertions. Native submissions now receive an escaped result page only after the server outcome, with a safe return link.
4. The second visual review rated audience fit 8.5/10 and found no P1 visual issue. Its remaining mobile proof readability finding was addressed by increasing ownership text to 16px and captions to 14px. The final computed styles and loaded images were checked at 390 pixels. The saved full mobile image precedes that small type increase and the reduction of outcome paragraph spacing; subsequent mobile screenshot attempts intermittently timed out in Chrome.

The score is a simulated audience/expert review, not a real-customer study. A numerical starter price remains an offer decision; the approved concept uses a written quote.

## Fidelity and accessibility

- Inter Variable, heavy tight display type, rectangular surfaces, 2px outlines and hard shadows preserve the merged identity. Core colours are ink `#242126`, cream `#f7f3ec`, off-white `#fffdfa`, pink `#f27ab5` and mint `#c5eddc`.
- Official Phosphor icons provide one consistent family. The hero uses a generated raster illustration; the case study uses the existing 12Grapes screenshot. The delivered hero WebP is about 94 KB. Images have dimensions and descriptive alt text; the decorative logo and icons are hidden from redundant announcements.
- The browser showed no content overflow at 1440 or 390 pixels. Additional DOM checks at 320 and 768 pixels found no visible content outside the viewport; the intentional honeypot is excluded. Full visual captures at those two additional sizes were limited by intermittent screenshot timeouts.
- Mobile navigation opens, Escape closes it and returns focus. The primary action reaches the form. Native booking details expand and collapse from the keyboard. Inputs use 16px text; labels, error descriptions and high-contrast focus rings remain visible.
- Reduced-motion CSS disables smooth scrolling and button movement. A complete assistive-technology audit and OS-level reduced-motion session were not performed.

## Functional checks

- Empty-copy validation showed required-field errors. Malformed contact input showed a specific message and focused the contact field. The final validation order follows name, contact, then description.
- A phone-only enquiry copied successfully through keyboard navigation. The page stayed on the preview, retained the entered details and explicitly instructed the visitor to send the copied text from email.
- A Business IT draft retained its project type and used “What I would like help with.” The browser exposed the prepared mailto URL. Its configured Fastmail handler was at a login screen; no message was sent or saved in a signed-in inbox.
- Server tests cover phone-only delivery, validation without transport, owner transport failure, acknowledgement-only failure, safe native result links, HTML escaping, unknown service values, response parsing and the production/local mode guard.
- `npm run check`: 23 files, zero errors, warnings or hints.
- `npm test`: 3 files, 17 passing tests.
- `npm run build:static` and `npm run build`: pass.
- Static artifact check: 10 pages, 198 internal links and 43 asset references; no missing path, missing anchor or duplicate ID. Details: `audit/2026-09-15/concept-1-build/static-link-check.json`.
- `git diff --check`: pass.

## Preview

`http://localhost:4321/servo-ict-website/`

Restart if needed with `PUBLIC_SITE_MODE=static npm run astro -- dev --background`. Use `npm run astro -- dev status`, `logs` or `stop` to manage it.

Production activation requirements are in `docs/enquiry-setup.md`. The live delivery decision and a deployed end-to-end mail test remain for after the preview.

final result: passed for the approved review-build scope, with the browser-capture and production-delivery limits above.
