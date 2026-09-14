# Concept 3 implementation

The owner selected Concept 3 after reviewing the published Concept 1 page. This supersedes the earlier selection, while retaining the confirmed audience and existing service terms.

Visual target: `docs/design/customer-journey-2026-09-14/merged-style-e0c09cc/concepts/concept-3.png`, the third displayed concept restyled to merge e0c09cc. The image is 887 by 1774 pixels. Use its composition with the repository's exact Inter, cream, charcoal, pink and mint tokens.

## Page sequence

1. Recognise the startup need. Broad headline on the left, portrait storefront and handwritten note on the right. Retain the primary enquiry action and locality.
2. Understand the combined setup. "One setup. Ready for customers." above a large website-to-business-email example. A mint ownership statement follows it.
3. Understand costs. Compact setup, recurring and optional rows, with the quoted scope, timing and approval conditions accessible in a disclosure.
4. See real work. A compact pink strip with the actual 12Grapes screenshot, project name, outcome and link.
5. Understand the customer's part. A dark section with three steps and a visible explanation of later changes. Extra feature and booking detail remains optional.
6. Enquire. An open mint section with the working existing form. Keep the phone route and reply expectations.
7. Find supporting services and owner information in the footer.

## Assets and layout

- Hero photo: new generated portrait of a timber New Business sign in a teal storefront. Approximately 330 by 410 CSS pixels at a 1200-pixel desktop viewport.
- Hero annotation: generated handwritten note, "From ideas to customers".
- Connected example: reuse the real 12Grapes screenshot beside a generated illustrative business-email screen. Both have real HTML explanations, and the section labels the example as illustrative. Do not imply the sample message was sent by a real client.
- Client proof: the actual 12Grapes project screenshot and existing internal project link.
- Icons: existing Phosphor set, extended with matching shield and credit-card icons. No hand-drawn icons.

The mock is a desktop reference. On phones the hero and connected example stack in reading order. Essential information never needs a horizontal swipe. Match the mock's region proportions at desktop while keeping real body text readable, touch targets usable, and the longer production form honest.

## Intentional adaptations

- The static published site still opens an email draft or copies the enquiry. Its button cannot say "Send enquiry" until a direct receiving service is chosen and configured.
- Preserve actual service information, phone hours, reply target, account ownership and quote boundaries. Correct generated mock copy that calls email setup a draft.
- The real client screenshot replaces the mock's reconstructed site image. The sample inbox is only an illustration.
- Keep existing supporting routes, navigation anchors, keyboard menu behaviour and form validation. Supporting service pages retain the existing shared brand.
- Numerical starter prices, guaranteed turnaround and unlimited account quantities remain unpublished.

## Validation

Compare browser screenshots against the selected reference, including focused hero and connected-example regions. Review mobile and desktop, menu and anchor behaviour, form validation, costs and extra-feature disclosures. Run Astro checks, existing tests and both builds. Record evidence and any remaining limitations in `design-qa.md`.
