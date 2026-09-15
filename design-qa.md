# Page concepts build QA

final result: passed

Reviewed 15 September 2026. No actionable P0, P1 or P2 findings remain for the local build. The owner approved the seven concepts with additional negative space between sections.

## Source and implementation

Source directory: `docs/design/page-concepts-2026-09-15/`.

| Page | Approved source | Route |
| --- | --- | --- |
| Websites | `01-websites-v2.png` | `/websites/` |
| Business IT | `02-business-it.png` | `/business-it/` |
| Security | `03-security.png` | `/security/` |
| Project and About | `04-project-and-about.png` | `/work/12grapes/` |
| Advice | `05-advice.png` | `/blog/` |
| Article | `06-advice-article.png` | `/3-key-steps-to-protect-your-business-accounts/` |
| Contact | `07-contact.png` | `/contact/` |

Preview: `http://localhost:4321/servo-ict-website/`. Browser captures used the equivalent IPv6 loopback URL on the same server.

The homepage reference is `docs/design/customer-journey-2026-09-14/merged-style-e0c09cc/concepts/concept-3.png`. Its previous review is preserved in `docs/design/page-concepts-build/previous-homepage-qa.md`.

## Evidence and normalization

Sources are 887 × 1774 pixels. These are generated concepts without a recorded browser viewport. Comparisons assess composition, typography and assets, with the owner's spacing change explicitly allowed.

Final desktop captures used 1440 × 1000 and 887 × 1000 CSS viewports at approximately 1 device pixel per CSS pixel. Mobile captures used 390 × 844; the homepage and contact form were also checked at 320 pixels wide. The homepage before/after comparison used a 1600-pixel desktop viewport.

Full-page capture became unreliable in Chrome. Final evidence uses settled viewport screenshots, advanced through the page with Page Down, and assembled at measured scroll positions. Each frame was checked for overflow and unloaded visible images. Cropping out the scrollbar leaves content widths of 1425, 872, 375 or 305 pixels. Comparison sheets scale each content image to 887 pixels wide. No page content was painted over or reconstructed.

Measurements and raw frame paths: `audit/page-concepts-build/viewport-captures.json`.

| Page | Final height at 887 CSS pixels | Final height at 1440 CSS pixels |
| --- | ---: | ---: |
| Websites | 3834 | 4089 |
| Business IT | 3916 | 4296 |
| Security | 3935 | 4274 |
| Project and About | 2947 | 3419 |
| Advice | 2970 | 3627 |
| Article | 3430 | 3659 |
| Contact | 3020 | 3375 |

Full comparisons place the source on the left and implementation on the right. For each of `websites`, `business-it`, `security`, `work`, `advice`, `article` and `contact`, the final files are `audit/page-concepts-build/PAGE-comparison-final-887.png` and `PAGE-comparison-final-1440.png`. The corresponding `PAGE-final-WIDTH-assembled.png` files contain the implementation alone.

Focused comparisons are `PAGE-hero-final-887.png` and `PAGE-hero-final-1440.png`. Full-resolution viewport frames provide readable pricing, forms, handovers and article text. `websites-hero-final-887.png` shows corrected annotation clearance; `contact-320-form.jpg` shows the narrow form with validation feedback.

Mobile evidence is in `PAGE-mobile-390-assembled.png`. Homepage regression evidence includes `homepage-before-after.png`, `home-desktop-1600-assembled.png`, `home-mobile-390-assembled.png` and `home-mobile-320-assembled.png`.

The article contents navigation stays visible while scrolling on desktop, so it appears more than once in the assembled screenshot. Individual frames show its actual position. Mobile uses a static contents list. This is a stitching artifact, not duplicated page content.

## Findings and fixes

| Severity | Earlier finding | Fix and post-fix evidence |
| --- | --- | --- |
| P1, resolved | IT and Security ended with contact links instead of the forms shown in their concepts. | Added inline forms with the existing delivery modes and correct service context. Final service comparisons show both forms. Copied enquiries retained the appropriate project type. |
| P2, resolved | Full FAQs dominated the service pages. | Kept scope and support details behind one compact disclosure per page. Final service comparisons show the shorter section and surrounding whitespace. |
| P2, resolved | The Websites annotation entered the introduction at tablet width. | Restricted the introduction measure between 701 and 1050 pixels. The final 887-pixel comparison shows separation; measured horizontal clearance is 15 pixels. |
| P2, resolved | An early tablet breakpoint hid annotations and expanded portrait photos. | Preserved the desktop art grid at the concept width and moved the mobile layout to 700 pixels. Final 887-pixel comparisons and 390-pixel captures verify both states. |
| P2, resolved | The About logo stretched in its flex row. | Preserved its aspect ratio and prevented shrinking. Final Work comparisons show the circular mark. |
| P2, resolved | Large related-article cards overwhelmed the end of the article. | Replaced them with simple related links and a compact mint close. Final article comparisons show the revised hierarchy. |
| P2, resolved | Escape could reopen Services because of a native toggle race. | Made the summary toggle explicit. First Escape closes Services and focuses its summary; the next closes mobile navigation and focuses its button. |
| P2, resolved | Error text became part of some input accessible names. | Added explicit label references. Validation keeps stable field names and moves focus to the first invalid field. |

Initial comparisons remain as `PAGE-comparison-first.png`; intermediate comparisons are `PAGE-comparison-revised.png`. Final evidence follows the fixes at the same desktop and source-width viewports.

A preview-only issue appeared after switching build modes: the running Astro development process omitted a scoped service stylesheet. Restarting the background server restored it. Production HTML contained the styles. Final service captures followed the restart; the details section has 44-pixel vertical padding on mobile and 64.8 pixels at the wider desktop viewport.

## Required fidelity surfaces

- Fonts and typography: Inter Variable continues the homepage's heavy display type and clear body hierarchy. Focused comparisons confirm readable labels and headings. Paragraphs and inputs remain readable on mobile without truncation. Longer real copy wraps differently from the compressed concepts.
- Spacing and layout: divided rows, framed artwork, pink proof panels, charcoal process sections and mint enquiry panels follow the approved compositions. Additional padding is intentional. Columns stack cleanly on mobile. The homepage is about 12% taller at the reviewed desktop width, with its content and form layout preserved.
- Colors and tokens: existing cream, charcoal, pink and mint tokens carry across the pages. Active links, focus states and error text are visible. Notes use darker magenta for legibility. There are no decorative gradients.
- Images and icons: supplied branding and the real 12Grapes screenshot are retained. Generated desk photos, handovers and handwritten notes share the concept palette. WebP assets remain sharp at their displayed sizes; transparent notes have no visible pale box. UI icons use the existing Phosphor library.
- Copy and content: startup positioning, approved website prices, managed-payment total, care limits, ownership and exclusions remain present. IT and security use project quotes and availability language. Original article dates and full copy remain. No testimonials, certifications or performance claims were invented.

## Interaction and build checks

- Checked all seven designs, the homepage and Privacy at 390 pixels. Checked the homepage and contact form at 320 pixels. No horizontal overflow or missing visible images was found.
- Tested navigation, Services, keyboard Escape and focus return.
- Advice filters return four articles for All advice, three for Accounts & security and one for Computers. Keyboard activation works.
- Tested article links, the contents anchor and the article-to-security-enquiry journey.
- Tested empty-form errors, focus, Email and Phone preferences, a mismatched phone value, optional business/timing fields and valid local copying.
- Copied enquiries retained IT, Security and startup service context. The homepage still asks “What are you starting?”
- Browser console review returned no warnings or errors on the reviewed pages.
- Astro check: 33 files, zero errors, warnings or hints. Tests: 23 passed across three files.
- Static build: 12 pages. Server production build: passed.
- Final static output: 376 local links/assets across 12 HTML pages, zero errors. `git diff --check` passed.

No email was sent during browser QA. The static site clearly offers a draft or copied enquiry. Automated endpoint tests cover server delivery logic; live SMTP and Turnstile delivery were not exercised.

## Accepted differences and follow-up polish

More whitespace was expressly requested. Real articles and commercial terms make the implementation longer than the concepts. All four published articles remain available, including the Windows article omitted from the main concept composition.

The real client screenshot replaces reconstructed browser artwork. The enquiry diagram is labelled illustrative. Static hosting uses truthful draft/copy actions instead of “Send enquiry”; configured server mode retains direct delivery.

P3: small accent underlines and the pink word in the Security process heading are not reproduced everywhere. Desk props and handwriting vary between generated assets and the concepts. These differences do not obstruct the hierarchy or enquiry journey.

Implementation checklist complete: layouts, assets, spacing, responsive states, primary interactions, homepage regression review and production builds.
